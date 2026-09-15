import fs from 'node:fs';import assert from 'node:assert/strict';import {createHash,randomUUID} from 'node:crypto';
const statements=JSON.parse(fs.readFileSync('supabase/statements.json','utf8'));
const endpoint=process.env.NIVO_TEST_SUPABASE_URL+'/functions/v1/nivostudy-database';
const encode=(sql,args)=>({key:createHash('sha256').update(sql).digest('hex'),args});
const call=async(items,token=process.env.NIVO_TEST_SUPABASE_TOKEN)=>{const response=await fetch(endpoint,{signal:AbortSignal.timeout(20000),method:'POST',headers:{'Content-Type':'application/json','X-NivoStudy-Server-Token':token??''},body:JSON.stringify({statements:items})});const body=await response.json();return {status:response.status,...body}};
const find=prefix=>{const sql=Object.values(statements).find(s=>s.startsWith(prefix));assert.ok(sql,'Registered statement: '+prefix);return sql};
const lookup=find('SELECT * FROM profiles WHERE id=');
const denied=await call([encode(lookup,['test'])],'');assert.equal(denied.status,401);
const rejected=await call([{key:'0'.repeat(64),args:[]}]);assert.equal(rejected.status,503);
const id='verification-'+randomUUID(),nickname="Verificação ' NivoStudy",handle='test_'+randomUUID().slice(0,12).replaceAll('-','');
const profile=find('INSERT INTO profiles');
const sid='verification-'+randomUUID();
try{
 const saved=await call([encode(profile,[id,nickname,handle,'["Ciências"]',5,Date.now()]),encode(lookup,[id])]);assert.equal(saved.status,200,JSON.stringify(saved));assert.equal(saved.results[1].results[0].nickname,nickname);
 const isolated=await call([encode(lookup,[id+'-other'])]);assert.equal(isolated.results[0].results.length,0);
 const invalidBatch=await call([encode(profile,[id,'Alterado',handle,'["Ciências"]',5,Date.now()]),{key:'0'.repeat(64),args:[]}]);assert.equal(invalidBatch.status,503);
 assert.equal((await call([encode(lookup,[id])])).results[0].results[0].nickname,nickname,'transaction rollback');
 const start=find('INSERT INTO sessions');assert.equal((await call([encode(start,[sid,id,'Ciências','Teste','Verificar persistência',1500,Date.now()])])).status,200);
 const active=find('SELECT * FROM sessions WHERE owner=');assert.equal((await call([encode(active,[id])])).results[0].results[0].id,sid);
 const pause=find('UPDATE sessions SET accumulated');assert.equal((await call([encode(pause,[75,sid,id])])).status,200);
 assert.equal((await call([encode(active,[id])])).results[0].results[0].accumulated,75);
 const feed=find('SELECT a.id,a.kind');assert.equal((await call([encode(feed,[id,id,id])])).status,200);
 console.log('PASS: Supabase bridge authorization, registered SQL, safe parameters, persisted profile/session, owner filtering, transactional rollback and feed query.');
}finally{console.log('CLEANUP_IDS '+JSON.stringify({id,sid}));}
