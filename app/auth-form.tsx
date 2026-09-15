'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,Eye,EyeOff,X} from 'lucide-react';

export default function AuthForm({mode,onBack,onSignedIn}:{mode:'login'|'signup';onBack:()=>void;onSignedIn:()=>void}){
 const [view,setView]=useState<'credentials'|'recover'>('credentials');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [show,setShow]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [notice,setNotice]=useState('');
 const [height,setHeight]=useState<number|null>(null);
 const emailInput=useRef<HTMLInputElement>(null);

 useEffect(()=>{
  const viewport=window.visualViewport;
  const resize=()=>setHeight(viewport?.height??window.innerHeight);
  resize();
  viewport?.addEventListener('resize',resize);
  return()=>viewport?.removeEventListener('resize',resize);
 },[]);

 const cleanEmail=email.trim().toLowerCase();
 const validEmail=/^[^\s@]+@gmail\.com$/i.test(cleanEmail);
 const validPassword=mode==='signup'?password.length>=8:password.length>=1;

 const submit=async(action:'login'|'signup'|'recover')=>{
  if(busy)return;
  setError('');
  setNotice('');
  if(!validEmail){setError('Use um endereço do Gmail, por exemplo seu@gmail.com.');return}
  if(action!=='recover'&&!validPassword){setError(mode==='signup'?'Crie uma senha com pelo menos 8 caracteres.':'Digite sua senha.');return}
  setBusy(true);
  try{
   const response=await fetch('/api/auth',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action,email:cleanEmail,password})
   });
   const data:any=await response.json();
   if(!response.ok)throw Error(data.error??'Não foi possível continuar.');
   if(action==='recover'){
    setNotice('Se essa conta existir, você receberá um link para trocar a senha.');
    return;
   }
   if(data.confirmation){
    throw Error('A confirmação de e-mail ainda está ativa no Supabase. Desative “Confirm email” para usar cadastro direto com Gmail e senha.');
   }
   setPassword('');
   onSignedIn();
  }catch(e){
   setError(e instanceof Error?e.message:'Não foi possível continuar.');
  }finally{
   setBusy(false);
  }
 };

 const back=()=>{
  setError('');
  setNotice('');
  if(view==='recover')setView('credentials');
  else onBack();
 };

 return <main className="entry-screen email-flow" style={height?{height,minHeight:0}:undefined}>
  <header className="email-close"><button aria-label="Fechar" disabled={busy} onClick={onBack}><X size={18}/></button></header>
  <form className="email-step" onSubmit={e=>{e.preventDefault();void submit(view==='recover'?'recover':mode==='signup'?'signup':'login')}}>
   <div className="email-question" key={view}>
    <h1>{view==='recover'?'Recupere seu acesso':mode==='signup'?'Crie sua conta':'Entre no seu ritmo'}</h1>
    {view==='recover'?<p>Digite seu Gmail e enviaremos um link para trocar sua senha.</p>:<p>{mode==='signup'?'Por enquanto, sua conta precisa apenas de Gmail e senha.':'Use o mesmo Gmail e senha da sua conta.'}</p>}

    <label className="sr-only" htmlFor="entry-email">Gmail</label>
    <input ref={emailInput} id="entry-email" className="email-plain-input" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} autoFocus value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@gmail.com" required maxLength={254} disabled={busy}/>

    {view==='credentials'&&<>
     <label className="sr-only" htmlFor="entry-password">Senha</label>
     <div className="email-password">
      <input id="entry-password" type={show?'text':'password'} autoComplete={mode==='signup'?'new-password':'current-password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==='signup'?'Crie uma senha':'Sua senha'} required minLength={mode==='signup'?8:1} maxLength={128} disabled={busy}/>
      <button type="button" aria-label={show?'Ocultar senha':'Mostrar senha'} onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button>
     </div>
     {mode==='signup'&&<p className="auth-hint">Use pelo menos 8 caracteres.</p>}
     {mode==='login'&&<button type="button" className="email-alternative" onClick={()=>setView('recover')} disabled={busy}>Esqueci minha senha</button>}
    </>}

    {error&&<p className="email-error" role="alert">{error}</p>}
    {notice&&<p className="email-notice" role="status">{notice}</p>}
   </div>

   <div className="email-bottom">
    {view==='credentials'&&<p>{mode==='signup'?'Já usa o NivoStudy?':'Primeira vez por aqui?'} <a href={mode==='signup'?'/login':'/criar-conta'}>{mode==='signup'?'Entrar':'Criar conta'}</a></p>}
    <div className="email-controls">
     <button type="button" className="email-back" aria-label="Voltar" onClick={back} disabled={busy}><ArrowLeft size={18}/></button>
     <button className="email-continue" type="submit" disabled={busy||!validEmail||(view==='credentials'&&!validPassword)}>{busy?<span className="email-spinner" role="status" aria-label="Só um instante"/>:view==='recover'?'Enviar link':mode==='signup'?'Criar conta':'Entrar'}</button>
    </div>
   </div>
  </form>
 </main>
}
