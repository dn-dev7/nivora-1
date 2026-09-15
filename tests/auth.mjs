import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import os from 'node:os';
import path from 'node:path';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'nivo-auth-'));
const values=new Map(),writes=[];
globalThis.__authCookies={get:key=>values.has(key)?{value:values.get(key)}:undefined,set:(key,value,options)=>{writes.push({key,value,options});if(options.maxAge===0)values.delete(key);else values.set(key,value)}};
const compile=(input,output,transform)=>fs.writeFileSync(path.join(dir,output),ts.transpileModule(transform(fs.readFileSync(input,'utf8')),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText);
compile('lib/supabase-auth.ts','auth.mjs',s=>s.replace("import {cookies} from 'next/headers';","const cookies=async()=>globalThis.__authCookies;"));
compile('app/api/auth/route.ts','route.mjs',s=>s.replace("import {NextRequest,NextResponse} from 'next/server';","const NextResponse={json:(data,options)=>new Response(JSON.stringify(data),{...options,headers:{...options?.headers,'Content-Type':'application/json'}})};").replace("import {cookies} from 'next/headers';","const cookies=async()=>globalThis.__authCookies;").replace("from '@/lib/supabase-auth'","from './auth.mjs'"));
const {getAuthUser,ACCESS,REFRESH}=await import(path.join(dir,'auth.mjs'));
const {POST}=await import(path.join(dir,'route.mjs'));
let calls=[],mode='normal';
const realFetch=globalThis.fetch;
globalThis.fetch=async(url,options)=>{
 calls.push({url,options});const u=new URL(url),b=options.body?JSON.parse(options.body):{},token=options.headers.Authorization;
 assert.equal(u.origin,'https://dzvvyrcpreprqzvsswie.supabase.co');assert.match(options.headers.apikey,/^sb_publishable_/);
 const reply=(data,status=200)=>new Response(JSON.stringify(data),{status});
 if(mode==='unavailable')return reply({error_code:'unavailable'},503);
 if(u.pathname.endsWith('/user'))return token==='Bearer valid-alice'||token==='Bearer renewed-alice'?reply({id:'alice-uuid',email:'alice@example.test',user_metadata:{display_name:'Alice',userId:'attacker'}}):reply({error_code:'bad_jwt'},401);
 if(u.pathname.endsWith('/token')){
  if(u.searchParams.get('grant_type')==='refresh_token')return b.refresh_token==='refresh-alice'?reply({access_token:'renewed-alice',refresh_token:'rotated-alice',expires_in:3600}):reply({error_code:'refresh_token_not_found'},400);
  return b.password==='valid-password'?reply({access_token:'valid-alice',refresh_token:'refresh-alice',expires_in:3600}):reply({error_code:mode==='unconfirmed'?'email_not_confirmed':'invalid_credentials'},400);
 }
 if(u.pathname.endsWith('/signup'))return reply({user:{id:'new-uuid'}});
 if(u.pathname.endsWith('/recover')||u.pathname.endsWith('/resend')){assert.equal(u.searchParams.get('redirect_to'),'https://nivora.daniel-fe4.chatgpt.site/auth/confirm');return reply({})}
 if(u.pathname.endsWith('/logout'))return reply({error_code:'bad_jwt'},401);
 throw Error('Unexpected Auth request');
};
const call=async(body,origin='https://nivo.test')=>{const req=new Request('https://nivo.test/api/auth',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:typeof body==='string'?body:JSON.stringify(body)});req.nextUrl=new URL(req.url);const res=await POST(req);return {status:res.status,body:await res.json(),headers:res.headers}};
const reset=()=>{values.clear();writes.length=0;calls=[];mode='normal'};
try{
 reset();assert.equal(await getAuthUser(true),null);assert.equal(calls.length,0);
 values.set(ACCESS,'forged');assert.equal(await getAuthUser(true),null);assert.equal(values.size,0);
 values.set(ACCESS,'valid-alice');assert.equal((await getAuthUser()).userId,'alice-uuid');assert.equal((await getAuthUser()).fullName,'Alice');
 reset();values.set(REFRESH,'refresh-alice');assert.equal(await getAuthUser(),null);assert.equal((await getAuthUser(true)).userId,'alice-uuid');assert.equal(values.get(REFRESH),'rotated-alice');assert.ok(writes.every(x=>x.options.secure&&x.options.httpOnly&&x.options.sameSite==='lax'&&x.options.path==='/'));
 reset();values.set(REFRESH,'forged');assert.equal(await getAuthUser(true),null);assert.equal(values.size,0);
 reset();values.set(ACCESS,'valid-alice');mode='unavailable';await assert.rejects(()=>getAuthUser(true));assert.equal(values.get(ACCESS),'valid-alice');
 reset();assert.equal((await call({action:'login',email:'alice@example.test',password:'valid-password'},'https://evil.test')).status,403);assert.equal(calls.length,0);
 assert.equal((await call('{bad')).status,400);assert.equal((await call({action:'signup',email:'bad',password:'long-enough'})).status,400);
 assert.equal((await call({action:'signup',email:'alice@example.test',password:'short'})).status,400);
 const signup=await call({action:'signup',email:'alice@example.test',password:'valid-password'});assert.equal(signup.body.confirmation,true);assert.equal(values.size,0);
 const invalid=await call({action:'login',email:'alice@example.test',password:'wrong'});assert.equal(invalid.status,400);assert.match(invalid.body.error,/incorretos/);assert.equal(values.size,0);
 mode='unconfirmed';assert.match((await call({action:'login',email:'alice@example.test',password:'wrong'})).body.error,/Confirme/);mode='normal';
 const login=await call({action:'login',email:' ALICE@example.test ',password:'valid-password'});assert.equal(login.body.ok,true);assert.equal(values.get(ACCESS),'valid-alice');assert.equal(login.headers.get('cache-control'),'no-store');assert.ok(!JSON.stringify(login.body).includes('valid-alice'));
 assert.equal((await call({action:'recover',email:'alice@example.test'})).body.sent,true);
 assert.equal((await call({action:'resend',email:'alice@example.test'})).body.sent,true);
 assert.equal((await call({action:'session',access_token:'forged',refresh_token:'forged'})).status,400);assert.equal(values.get(ACCESS),'valid-alice');
 const password=await call({action:'password',password:'new-valid-password'});assert.equal(password.body.ok,true);assert.equal(calls.at(-1).options.method,'PUT');
 assert.equal((await call({action:'logout'})).body.ok,true);assert.equal(values.size,0);
 assert.equal((await call({action:'password',password:'new-valid-password'})).status,401);
 console.log('PASS: validação online de identidade, tokens inválidos, renovação, cookies protegidos, CSRF, confirmação, login, recuperação, alteração de senha e logout.');
}finally{globalThis.fetch=realFetch;fs.rmSync(dir,{recursive:true,force:true})}
