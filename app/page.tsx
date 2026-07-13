'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { diarchData } from '@/data/diarchData';
import Navbar from '@/components/Navbar';
import { ArrowRight, ArrowDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-stone-900 font-sans antialiased overflow-x-hidden">
      <Navbar />

      {/* ════════════════════════════════════════════
          1. FULL-BLEED CINEMATIC HERO
      ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src="/images/hero-spices.jpg"
            alt="Diarch Organic Premium Spices"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-emerald-950/40 to-stone-950/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/30 via-transparent to-transparent" />
        </motion.div>

        {/* Hero content — centered, immersive */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-white px-8 max-w-6xl mx-auto"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-5 mb-10">
              <span className="h-px w-20 bg-emerald-400/50" />
              <span className="text-emerald-300/90 text-[11px] tracking-[0.45em] uppercase font-semibold">
                {diarchData.brandInfo.tagline}
              </span>
              <span className="h-px w-20 bg-emerald-400/50" />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-8xl md:text-[10rem] lg:text-[12rem] font-serif font-medium leading-[0.85] mb-8 tracking-tight"
            >
              Diarch
              <br />
              <span className="italic text-emerald-300 font-normal">Organic</span>
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-xl text-lg md:text-xl text-stone-300/90 leading-relaxed mb-14 font-light"
            >
              A luxury Indian pantry house — curated for the world's discerning kitchens.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-5 justify-center">
              <a
                href="/collections"
                className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] tracking-[0.2em] uppercase font-bold px-12 py-5 transition-all duration-500 shadow-lg hover:shadow-emerald-500/20"
              >
                Explore Collections
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/story"
                className="flex items-center gap-3 border border-white/40 text-white hover:bg-white/10 text-[11px] tracking-[0.2em] uppercase font-bold px-12 py-5 transition-all duration-500 backdrop-blur-sm"
              >
                Our Heritage
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3 text-white/40"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          2. BRAND INTRO STRIP
      ════════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="max-w-[1400px] mx-auto px-8 lg:px-20 py-32 md:py-44"
      >
        <motion.div variants={fadeUp} className="text-center max-w-5xl mx-auto">
          <span className="text-[11px] tracking-[0.35em] uppercase text-emerald-800 font-bold mb-8 block">
            {diarchData.introduction.title}
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-[1] mb-10">
            Not another spice brand.<br />
            <span className="italic text-emerald-800 font-normal">A luxury pantry house.</span>
          </h2>
          <p className="text-lg md:text-xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-light">
            {diarchData.introduction.content}
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div variants={fadeUp} custom={1} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto text-center">
          <div>
            <span className="text-6xl font-serif text-emerald-800 block mb-2">25+</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold">Diaspora Cities</span>
          </div>
          <div>
            <span className="text-6xl font-serif text-emerald-800 block mb-2">10</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold">Signature Products</span>
          </div>
          <div>
            <span className="text-6xl font-serif text-emerald-800 block mb-2">9</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold">Product Categories</span>
          </div>
          <div>
            <span className="text-6xl font-serif text-emerald-800 block mb-2">2016</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold">Year Founded</span>
          </div>
        </motion.div>
      </motion.section>

      {/* ════════════════════════════════════════════
          3. UNIFIED PRODUCT GRID — ALL 10 PRODUCTS + 10 PLACEHOLDERS
      ════════════════════════════════════════════ */}
      <section className="bg-stone-50 border-t border-b border-stone-200/60 py-28 md:py-36">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <motion.span variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase text-emerald-800 font-bold mb-6 block">
              The Signature Range
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-[1.05]">
              Featured<br />
              <span className="italic text-emerald-800">Products</span>
            </motion.h2>
          </motion.div>

          {/* Product Grid — 5 columns, large cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-7"
          >
            {/* Real products */}
            {diarchData.products.map((prod, i) => (
              <motion.article
                key={prod.id}
                variants={scaleIn}
                custom={i}
                className="group bg-white rounded-3xl border border-stone-200/60 overflow-hidden hover:shadow-2xl hover:border-emerald-800/15 transition-all duration-700"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 flex items-center justify-center p-5 lg:p-8">
                  <img
                    src={prod.pouch || prod.img}
                    alt={prod.name}
                    className="h-full w-full object-contain transition-transform duration-[1500ms] ease-out group-hover:scale-108"
                  />
                  <div className="absolute top-4 left-4 bg-[#FAF9F5]/95 backdrop-blur-sm text-stone-800 text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full font-bold border border-stone-200/80">
                    {prod.tag}
                  </div>
                </div>
                <div className="p-5 lg:p-7">
                  <span className="text-[9px] tracking-[0.22em] text-stone-400 uppercase font-bold mb-1.5 block">
                    {prod.origin}
                  </span>
                  <h3 className="text-lg lg:text-xl font-serif text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors duration-300">
                    {prod.name}
                  </h3>
                  <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[9px] tracking-wider text-stone-400 uppercase font-semibold">
                      {prod.sizes.join(' · ')}
                    </span>
                    <a
                      href="/contact"
                      className="text-emerald-800 text-[10px] tracking-[0.18em] uppercase font-bold hover:text-emerald-950 flex items-center gap-1.5 group/link"
                    >
                      Inquire
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* 6 Placeholder slots for future products */}
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={`placeholder-${i}`}
                variants={scaleIn}
                custom={10 + i}
                className="relative bg-stone-100/40 rounded-3xl border-2 border-dashed border-stone-200/60 overflow-hidden flex flex-col"
              >
                <div className="aspect-[3/4] flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-dashed border-stone-300/50 flex items-center justify-center">
                      <div className="w-5 h-5 bg-stone-200/60 rounded-full" />
                    </div>
                    <span className="text-[10px] tracking-[0.25em] text-stone-400/80 uppercase font-semibold block">
                      Coming Soon
                    </span>
                  </div>
                </div>
                <div className="p-5 lg:p-7">
                  <div className="h-2 w-16 bg-stone-200/50 rounded mb-3" />
                  <div className="h-3 w-28 bg-stone-200/40 rounded" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View all CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-20"
          >
            <a
              href="/collections"
              className="inline-flex items-center gap-3 bg-stone-900 text-white text-[11px] tracking-[0.2em] uppercase font-bold px-12 py-5 hover:bg-emerald-800 transition-all duration-500"
            >
              View All Collections
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. DARK VISION BAND
      ════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-emerald-950 via-stone-950 to-emerald-950 py-32 md:py-40 px-8 lg:px-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="text-emerald-400/80 text-[11px] tracking-[0.4em] uppercase font-bold mb-8 block">
              Vision 2032
            </motion.span>
            <motion.blockquote
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight font-light"
            >
              &ldquo;{diarchData.visionMission.vision}&rdquo;
            </motion.blockquote>
            <motion.div variants={fadeUp} custom={2} className="mt-14">
              <a
                href="/story"
                className="inline-flex items-center gap-3 text-emerald-400 text-[11px] tracking-[0.2em] uppercase font-bold hover:text-white transition-colors group"
              >
                Read Our Full Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. FOUNDER QUOTE — MINIMAL
      ════════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="max-w-[1000px] mx-auto px-8 py-32 md:py-40 text-center"
      >
        <motion.span variants={fadeUp} className="text-[11px] tracking-[0.3em] uppercase text-emerald-800 font-bold mb-8 block">
          Leadership
        </motion.span>
        <motion.blockquote variants={fadeUp} custom={1} className="text-2xl md:text-3xl font-serif text-stone-700 leading-relaxed italic mb-12">
          &ldquo;{diarchData.founderMessage.paragraphs[0]}&rdquo;
        </motion.blockquote>
        <motion.div variants={fadeUp} custom={2}>
          <p className="font-serif font-bold text-stone-900 text-xl md:text-2xl">
            — {diarchData.founderMessage.author}
          </p>
          <p className="text-stone-400 text-[10px] tracking-[0.2em] uppercase mt-2">
            {diarchData.founderMessage.designation}
          </p>
        </motion.div>
      </motion.section>

      {/* ════════════════════════════════════════════
          6. FOOTER
      ════════════════════════════════════════════ */}
      <footer className="bg-stone-950 text-stone-400 pt-24 pb-12 px-8 lg:px-16 border-t border-stone-800/50">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800/60">
            <div className="lg:col-span-5 max-w-md">
              <div className="font-serif text-3xl text-white mb-5">
                Diarch <span className="italic text-emerald-500">Organic</span>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Premium, hygienically processed, export-grade pantry essentials. Sourced from celebrated agricultural belts.
              </p>
              <p className="text-[10px] text-stone-600 tracking-[0.2em] uppercase">
                A Division of the Diarch Group · Est. 2016
              </p>
            </div>
            <div className="lg:col-span-3">
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-white font-bold mb-6">Navigate</h4>
              <ul className="space-y-4 text-sm text-stone-500">
                <li><a href="/" className="hover:text-emerald-400 transition-colors">Home</a></li>
                <li><a href="/collections" className="hover:text-emerald-400 transition-colors">Collections</a></li>
                <li><a href="/story" className="hover:text-emerald-400 transition-colors">Our Story</a></li>
                <li><a href="/philosophy" className="hover:text-emerald-400 transition-colors">Philosophy</a></li>
                <li><a href="/contact" className="hover:text-emerald-400 transition-colors">Inquire</a></li>
              </ul>
            </div>
            <div className="lg:col-span-4">
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-white font-bold mb-6">Contact</h4>
              <div className="space-y-3 text-sm text-stone-500">
                <p>{diarchData.contact.phone}</p>
                <p>{diarchData.contact.email}</p>
                <p className="text-xs leading-relaxed">{diarchData.contact.office}</p>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-stone-500">
            <span>© 2026 Diarch Organic. All Rights Reserved.</span>
            <span className="tracking-[0.2em] uppercase text-stone-600">Roots of India · Reach of the World</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
