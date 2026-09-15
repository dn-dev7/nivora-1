import {cookies} from 'next/headers';
const URL='https://dzvvyrcpreprqzvsswie.supabase.co';
// Publishable key: safe to include in source; it grants no privileged database access.
const KEY='sb_publishable_A1rZ91B2l0D1QS9xck1tGw_b5WeUrCu';
export const ACCESS='__Host-nivostudy-access',REFRESH='__Host-nivostudy-refresh',DEMO='__Host-nivostudy-demo';
export type AuthSession={access_token:string;refresh_token:string;expires_in:number};
export class AuthError extends Error{constructor(public status:number,public code:string){super(code)}}
export async function authRequest(path:string,body?:unknown,token?:string,method?:string){
 const response=await fetch(URL+'/auth/v1/'+path,{method:method??(body===undefined?'GET':'POST'),headers:{apikey:KEY,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body===undefined?{}:{body:JSON.stringify(body)}),signal:AbortSignal.timeout(15000),cache:'no-store'});
 const data:any=await response.json().catch(()=>({}));
 if(!response.ok)throw new AuthError(response.status,data.error_code??data.code??'auth_failed');
 return data;
}
export async function storeSession(session:AuthSession){
 if(!session.access_token||!session.refresh_token)throw new AuthError(401,'invalid_session');
 const jar=await cookies(),options={httpOnly:true,secure:true,sameSite:'lax' as const,path:'/'};
 jar.set(DEMO,'',{...options,maxAge:0});
 jar.set(ACCESS,session.access_token,{...options,maxAge:Math.min(3600,session.expires_in||3600)});
 jar.set(REFRESH,session.refresh_token,{...options,maxAge:60*60*24*30});
}
export async function clearSession(){const jar=await cookies();for(const key of [ACCESS,REFRESH,DEMO])jar.set(key,'',{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:0})}
export async function getAuthUser(allowRefresh=false){
 const jar=await cookies(),demo=jar.get(DEMO)?.value,token=jar.get(ACCESS)?.value,refresh=jar.get(REFRESH)?.value;
 if(demo){try{const email=decodeURIComponent(demo).trim().toLowerCase();if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return {userId:'demo:'+email,email,fullName:null}}catch{}}
 if(!token&&!refresh)return null;
 try{
  let user:any;
  if(token){try{user=await authRequest('user',undefined,token)}catch(error){if(!(error instanceof AuthError)||error.status>=500)throw error}}
  if(!user&&refresh&&allowRefresh){const session=await authRequest('token?grant_type=refresh_token',{refresh_token:refresh});await storeSession(session);user=await authRequest('user',undefined,session.access_token)}
  if(!user?.id||!user?.email){if(allowRefresh)await clearSession();return null}
  return {userId:user.id,email:user.email,fullName:typeof user.user_metadata?.display_name==='string'?user.user_metadata.display_name:null};
 }catch(error){if(error instanceof AuthError&&error.status<500){if(allowRefresh)await clearSession();return null}throw error}
}
