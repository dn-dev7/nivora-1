import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'NivoStudy | Seu conhecimento em movimento',description:'Estude, pratique questões e acompanhe sua evolução no NivoStudy.',icons:{icon:'/nivostudy-logo.png',apple:'/nivostudy-logo.png'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
