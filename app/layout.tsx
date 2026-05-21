import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eleanor Abel — Mechanical Engineer',
  description: 'Aerospace-focused mechanical engineer at Vanderbilt. Incoming intern at NASA Langley. Former Division I athlete.',
  keywords: ['mechanical engineering', 'aerospace', 'engineer', 'portfolio', 'NASA', 'Vanderbilt'],
  openGraph: {
    title: 'Eleanor Abel — Mechanical Engineer',
    description: 'Aerospace-focused mechanical engineer at Vanderbilt. Incoming intern at NASA Langley.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
