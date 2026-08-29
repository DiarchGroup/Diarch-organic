import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { diarchData } from '@/data/diarchData';
import Navbar from '@/components/Navbar';

const TITLE = 'Shop All Products — Premium Indian Spices & Fox Nuts';
const DESCRIPTION =
  "Browse Diarch Organic's full range of export-grade Indian spices, artisanal masala blends, and Mithila fox nuts — sourced from India's most celebrated growing belts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.diarchorganic.com/products',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ProductsPage() {
  const products = diarchData.products;

  return (
    <main className="min-h-screen organic-theme-dark text-white font-sans antialiased">
      <Navbar />

      <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
        <div aria-hidden className="organic-field-glow" />
        <div className="relative z-10 mx-auto max-w-[1800px] px-8 lg:px-16">
          <div className="mx-auto mb-20 max-w-3xl text-center md:mb-24">
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.35em] text-[#e5ad76]">
              The Signature Range
            </span>
            <h1 className="font-serif text-5xl leading-[1.05] text-[#fff4df] md:text-7xl">
              Shop All <span className="italic text-[#e5ad76]">Products</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[#c3ccb9] md:text-lg">
              Export-grade Indian spices, artisanal masala blends, and Mithila fox nuts — every harvest, sourced and processed with care.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((prod) => (
              <Link
                key={prod.id}
                href={`/products/${prod.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden border-b border-white/10 bg-white/5 p-6">
                  <img
                    src={prod.pouch || prod.img}
                    alt={`Diarch Organic ${prod.name}${prod.pouch ? ' pouch' : ''}`}
                    loading="lazy"
                    width={320}
                    height={320}
                    className="h-full w-full object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#fff4df] backdrop-blur-md">
                    {prod.tag}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#e5ad76]">
                    {prod.origin}
                  </span>
                  <h2 className="font-serif text-xl leading-snug text-[#fff4df]">{prod.name}</h2>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#e5ad76]/80">
                    {prod.sizes.join(' · ')}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors group-hover:text-[#e5ad76]">
                    View product
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Link
              href="/contact"
              className="organic-sand-button inline-flex items-center gap-3 rounded-xl px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500"
            >
              Inquire About Our Range
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
