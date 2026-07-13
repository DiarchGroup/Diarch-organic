import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diarch Organic | Pure, Homegrown Spices',
  description: 'Pure, homegrown spices straight from nature\'s lap. Cultivated with respect for the earth and traditional harvesting methods.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${cormorantGaramond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
