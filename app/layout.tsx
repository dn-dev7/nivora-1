import type { Metadata, Viewport } from 'next';
import './globals.css';
import './mobile-nav.css';
import './refinements.css';
export const metadata:Metadata={title:'NivoStudy | Estudos, questões e revisões',description:'Estude, pratique questões e acompanhe sua evolução no NivoStudy.',icons:{icon:'/favicon.svg'}};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#050c09'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
