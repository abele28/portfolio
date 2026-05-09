import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ellie - Mechanical Engineer & Aerospace Builder',
  description: 'Vanderbilt ME student building thermal systems for Mars rovers. Aerospace engineer. Former Division I athlete. Always building something.',
  keywords: ['mechanical engineering', 'aerospace', 'engineer', 'portfolio', 'NASA'],
  openGraph: {
    title: 'Ellie - Mechanical Engineer & Aerospace Builder',
    description: 'Vanderbilt ME student building thermal systems for Mars rovers.',
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
