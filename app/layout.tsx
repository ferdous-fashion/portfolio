import type { Metadata } from 'next';
import { Space_Mono, Inter } from 'next/font/google';
import './globals.css';

const space = Space_Mono({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ferdous Rahman Fakir — Premium Fashion Portfolio',
  description: 'Premium editorial-style fashion portfolio with curated collections and creative direction.',
  openGraph: {
    title: 'Ferdous Rahman Fakir — Premium Fashion Portfolio',
    description: 'Premium editorial-style fashion portfolio with curated collections and creative direction.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${space.variable} ${inter.variable}`}>
      <body className="bg-ink text-white">
        {children}
      </body>
    </html>
  );
}
