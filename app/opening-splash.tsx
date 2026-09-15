'use client';
import {useEffect,useState} from 'react';

export default function OpeningSplash(){
 const [visible,setVisible]=useState(false),[leaving,setLeaving]=useState(false);
 useEffect(()=>{
  const key='nivostudy-opening-shown';
  try{if(sessionStorage.getItem(key))return;sessionStorage.setItem(key,'1')}catch{/* Still show once per mounted app when storage is unavailable. */}
  setVisible(true);
  const exit=setTimeout(()=>setLeaving(true),850);
  const finish=setTimeout(()=>setVisible(false),1030);
  return()=>{clearTimeout(exit);clearTimeout(finish)};
 },[]);
 if(!visible)return null;
 return <div className={'nivo-opening-splash'+(leaving?' is-leaving':'')} role="status" aria-label="Abrindo NivoStudy"><div className="nivo-opening-brand"><img src="/nivostudy-brand.png" alt="" width="160" height="160" fetchPriority="high"/><span>NivoStudy<span className="lime">.</span></span></div></div>;
}
