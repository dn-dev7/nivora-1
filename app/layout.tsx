import type { Metadata } from 'next';
import './globals.css';
import './mobile-nav.css';
export const metadata:Metadata={title:'NivoStudy | Seu conhecimento em movimento',description:'Estude, pratique questões e acompanhe sua evolução no NivoStudy.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
