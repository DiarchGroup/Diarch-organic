import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { diarchData } from '@/data/diarchData';
import Navbar from '@/components/Navbar';

const SITE_URL = 'https://www.diarchorganic.com';

function getProduct(slug: string) {
  return diarchData.products.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return diarchData.products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};

  const title = `${product.name} — ${product.origin}`;
  const description = product.desc;
  const image = `${SITE_URL}${product.pouch || product.img}`;
  const url = `${SITE_URL}/products/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Diarch Organic`,
      description,
      url,
      images: [{ url: image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Diarch Organic`,
      description,
      images: [image],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const image = `${SITE_URL}${product.pouch || product.img}`;
  const alt = `Diarch Organic ${product.name}${product.pouch ? ' pouch' : ''}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image,
    description: product.desc,
    brand: { '@type': 'Brand', name: 'Diarch Organic' },
    category: product.category,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Origin', value: product.origin },
      { '@type': 'PropertyValue', name: 'Available sizes', value: product.sizes.join(', ') },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
    ],
  };

  const related = diarchData.products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  return (
    <main className="min-h-screen organic-theme-dark text-white font-sans antialiased">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        <div aria-hidden className="organic-field-glow" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-8 lg:px-16">
          <Link
            href="/products"
            className="mb-12 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c3ccb9] transition-colors hover:text-[#e5ad76]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Products
          </Link>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
            <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-2xl">
              <img
                src={product.pouch || product.img}
                alt={alt}
                width={480}
                height={480}
                className="h-full w-full object-contain drop-shadow-xl"
              />
              <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#fff4df] backdrop-blur-md">
                {product.tag}
              </div>
            </div>

            <div>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.32em] text-[#e5ad76]">
                {product.origin}
              </span>
              <h1 className="font-serif text-4xl leading-tight text-[#fff4df] md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-[#c3ccb9] md:text-lg">
                {product.desc}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-6 max-w-sm">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e5ad76]/80">Category</dt>
                  <dd className="mt-1 text-sm text-white/90">{product.category}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e5ad76]/80">Available Sizes</dt>
                  <dd className="mt-1 text-sm text-white/90">{product.sizes.join(' · ')}</dd>
                </div>
              </dl>

              <Link
                href="/contact"
                className="organic-sand-button mt-10 inline-flex items-center gap-3 rounded-xl px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500"
              >
                Inquire About This Product
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-28 border-t border-white/10 pt-16">
              <h2 className="mb-10 font-serif text-2xl text-[#fff4df] md:text-3xl">
                More from {product.category}
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/products/${r.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="flex aspect-square items-center justify-center overflow-hidden border-b border-white/10 bg-white/5 p-4">
                      <img
                        src={r.pouch || r.img}
                        alt={`Diarch Organic ${r.name}${r.pouch ? ' pouch' : ''}`}
                        loading="lazy"
                        width={200}
                        height={200}
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="p-4 text-center font-serif text-sm text-[#fff4df]">{r.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
