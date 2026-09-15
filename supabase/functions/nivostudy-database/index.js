// Only the trusted NivoStudy server can call this bridge. User authorization
// stays in app/api/nivora; clients receive neither this token nor a service key.
const EXPECTED_TOKEN_HASH='affbe43c77078e8b7784d4b454add030194a942bcc9af4430439d264933a90d5';
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
Deno.serve(async req=>{
 if(req.method!=='POST')return reply({error:'Method not allowed'},405);
 const token=req.headers.get('X-NivoStudy-Server-Token')??'';
 if(token.length!==64)return reply({error:'Unauthorized'},401);
 const digest=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)));
 const expected=Uint8Array.from(EXPECTED_TOKEN_HASH.match(/../g),x=>parseInt(x,16));
 let mismatch=0;for(let i=0;i<digest.length;i++)mismatch|=digest[i]^expected[i];
 if(mismatch)return reply({error:'Unauthorized'},401);
 try{
  const raw=await req.text();if(raw.length>100000)return reply({error:'Request too large'},413);
  const body=JSON.parse(raw),items=body.statements;
  if(!Array.isArray(items)||items.length>50||items.some(s=>!s||!/^[a-f0-9]{64}$/.test(s.key)||!Array.isArray(s.args)||s.args.length>20||s.args.some(a=>a!==null&&!['string','number','boolean'].includes(typeof a))))return reply({error:'Invalid request'},400);
  const key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');if(!key)throw Error('Missing server configuration');
  const response=await fetch(Deno.env.get('SUPABASE_URL')+'/rest/v1/rpc/nivostudy_batch',{method:'POST',headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({p_statements:items})});
  const result=await response.json();
  if(!response.ok)return reply({error:result.code==='23505'?'UNIQUE username':'Storage unavailable'},503);
  return reply({results:result});
 }catch{return reply({error:'Storage unavailable'},503)}
});
