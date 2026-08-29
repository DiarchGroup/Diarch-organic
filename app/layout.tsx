import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import { diarchData } from '@/data/diarchData';

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

const SITE_URL = 'https://www.diarchorganic.com';
const SITE_TITLE = 'Diarch Organic | Premium Homegrown Indian Spices & Fox Nuts';
const SITE_DESCRIPTION =
  'Export-grade homegrown Indian spices and Mithila fox nuts, from Patna to the world. Pure, hygienically processed pantry essentials from Diarch Organic.';
const SOCIAL_IMAGE = `${SITE_URL}/images/champaran-meat-masala-pouch.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Diarch Organic',
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Diarch Organic',
    images: [{ url: SOCIAL_IMAGE }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Diarch Organic',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'Premium, export-grade homegrown Indian spices and fox nuts.',
  parentOrganization: { '@type': 'Organization', name: 'Diarch Group' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No 12, Community Center, Okhla Phase One',
    addressLocality: 'New Delhi',
    postalCode: '110020',
    addressCountry: 'IN',
  },
  foundingDate: diarchData.brandInfo.since,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${cormorantGaramond.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
