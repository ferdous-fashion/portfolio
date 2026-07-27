import type { Metadata } from 'next'; import { Inter, Space_Grotesk } from 'next/font/google'; import './globals.css';
const inter=Inter({subsets:['latin'],variable:'--font-inter'});
const space=Space_Grotesk({subsets:['latin'],variable:'--font-space'});
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),title:{default:'Ferdous Rahman Fakir | Fashion Portfolio',template:'%s | Ferdous Rahman Fakir'},description:'Fashion design portfolio of Ferdous Rahman Fakir — Fashion Design & Technology student in Chattogram.',openGraph:{type:'website',title:'Ferdous Rahman Fakir — Fashion Portfolio',description:'Concept, craft, and contemporary fashion.'},twitter:{card:'summary_large_image'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${inter.variable} ${space.variable}`}>{children}</body></html>}
