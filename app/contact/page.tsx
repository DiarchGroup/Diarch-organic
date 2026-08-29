import type { Metadata } from 'next';
import ContactForm from './ContactForm';

const TITLE = 'Inquire — Diarch Organic';
const DESCRIPTION =
  'Get in touch with Diarch Organic for wholesale, export, or retail inquiries on our premium homegrown Indian spices and Mithila fox nuts.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.diarchorganic.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
