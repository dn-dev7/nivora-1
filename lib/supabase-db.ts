import statements from '@/supabase/statements.json';
type Result={success:boolean;results:Record<string,unknown>[];meta:{changes:number}};
const registered=new Set(Object.values(statements));
export class SupabaseDatabase{
 constructor(private url:string,private token:string){}
 prepare(sql:string){if(!registered.has(sql))throw Error('SQL não registrada no NivoStudy.');return new Statement(this,sql)}
 async batch(items:Statement[]):Promise<Result[]>{
  const encoded=await Promise.all(items.map(async item=>({key:Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(item.sql)))).map(b=>b.toString(16).padStart(2,'0')).join(''),args:item.args})));
  const response=await fetch(this.url+'/functions/v1/nivostudy-database',{method:'POST',headers:{'Content-Type':'application/json','X-NivoStudy-Server-Token':this.token},body:JSON.stringify({statements:encoded}),signal:AbortSignal.timeout(20000)});
  const body=await response.json() as {results?:Result[];error?:string};
  if(!response.ok||!body.results)throw Error(body.error?.includes('UNIQUE')?'UNIQUE nome de usuário já existente.':'SQL armazenamento indisponível.');
  return body.results;
 }
}
class Statement{
 args:unknown[]=[];
 constructor(private db:SupabaseDatabase,public sql:string){}
 bind(...args:unknown[]){const statement=new Statement(this.db,this.sql);statement.args=args;return statement}
 async all(){return (await this.db.batch([this]))[0]}
 async run(){return this.all()}
 async first(column?:string){const row=(await this.all()).results[0]??null;return column?row?.[column]??null:row}
}
