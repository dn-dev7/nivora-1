import {NextRequest,NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {ACCESS,AuthError,authRequest,clearSession,getAuthUser,storeSession} from '@/lib/supabase-auth';
const reply=(body:unknown,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});
const SITE='https://nivostudy-dnmtfe3-cpus-projects.vercel.app';
export async function POST(req:NextRequest){
 try{
  if(req.headers.get('origin')!==req.nextUrl.origin)return reply({error:'Origem inválida.'},403);
  const raw=await req.text();if(raw.length>6000)return reply({error:'Pedido muito grande.'},413);
  const b=JSON.parse(raw);
  if(b.action==='logout'){const token=(await cookies()).get(ACCESS)?.value;try{if(token)await authRequest('logout?scope=local',{},token)}catch{}finally{await clearSession()}return reply({ok:true})}
  if(b.action==='session'){if(typeof b.access_token!=='string'||typeof b.refresh_token!=='string')return reply({error:'Sessão inválida.'},400);await authRequest('user',undefined,b.access_token);await storeSession({access_token:b.access_token,refresh_token:b.refresh_token,expires_in:3600});return reply({ok:true})}
  if(b.action==='password'){if(!await getAuthUser(true))return reply({error:'Abra novamente o link de recuperação.'},401);if(typeof b.password!=='string'||b.password.length<8||b.password.length>128)return reply({error:'Use uma senha de 8 a 128 caracteres.'},400);
   const token=(await cookies()).get(ACCESS)?.value;
   await authRequest('user',{password:b.password},token,'PUT');return reply({ok:true})
  }
  const email=typeof b.email==='string'?b.email.trim().toLowerCase():'';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return reply({error:'Digite um e-mail válido.'},400);
  if(b.action==='otp'){await authRequest('otp?redirect_to='+encodeURIComponent(SITE+'/auth/confirm'),{email,create_user:b.createUser===true});return reply({sent:true})}
  if(b.action==='verify'){if(typeof b.token!=='string'||!/^\d{6}$/.test(b.token))return reply({error:'Digite o código de 6 dígitos.'},400);const session=await authRequest('verify',{email,token:b.token,type:'email'});await storeSession(session);return reply({ok:true})}
  if(b.action==='recover'){await authRequest('recover?redirect_to='+encodeURIComponent(SITE+'/auth/confirm'),{email});return reply({sent:true})}
  if(b.action==='resend'){await authRequest('resend?redirect_to='+encodeURIComponent(SITE+'/auth/confirm'),{type:'signup',email});return reply({sent:true})}
  if(!['login','signup'].includes(b.action))return reply({error:'Ação inválida.'},400);
  if(typeof b.password!=='string'||b.password.length<(b.action==='signup'?8:1)||b.password.length>128)return reply({error:'Use uma senha de 8 a 128 caracteres.'},400);
  const session=await authRequest(b.action==='login'?'token?grant_type=password':'signup?redirect_to='+encodeURIComponent(SITE+'/auth/confirm'),{email,password:b.password});
  if(session.access_token){await storeSession(session);return reply({ok:true})}
  return reply({confirmation:true});
 }catch(error){
  if(error instanceof SyntaxError)return reply({error:'Pedido inválido.'},400);
  if(error instanceof AuthError){const messages:Record<string,string>={invalid_credentials:'E-mail ou senha incorretos.',email_not_confirmed:'Confirme seu e-mail antes de entrar.',over_email_send_rate_limit:'Aguarde um minuto antes de pedir outro e-mail.',over_request_rate_limit:'Muitas tentativas. Aguarde um pouco e tente novamente.',email_address_not_authorized:'O envio de e-mails ainda precisa ser configurado. Tente novamente mais tarde.',otp_expired:'O código expirou ou está incorreto. Peça outro código.',weak_password:'Escolha uma senha mais forte.'};return reply({error:messages[error.code]??'Não foi possível continuar. Confira os dados e tente novamente.'},error.status===429?429:400)}
  return reply({error:'Não foi possível conectar. Tente novamente.'},503);
 }
}
