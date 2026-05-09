import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eleanor Abel — Mechanical Engineer',
  description: 'Vanderbilt ME student designing thermal systems for Mars rovers. Former Division I athlete. Always building something.',
  keywords: ['mechanical engineering', 'aerospace', 'engineer', 'portfolio', 'NASA'],
  openGraph: {
    title: 'Eleanor Abel — Mechanical Engineer',
    description: 'Vanderbilt ME student designing thermal systems for Mars rovers.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
