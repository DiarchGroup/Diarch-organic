'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { diarchData } from '@/data/diarchData';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowRight, ArrowDown, ArrowLeft, Target, Warehouse, Sprout, Globe, Flower, Calendar, Shield, Sparkles, ChefHat } from 'lucide-react';

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

// The hero photo, used both as the section background and as the fill of the
// knockout title. `backgroundAttachment: fixed` pins both to the viewport, so the
// image inside the letters lines up pixel-for-pixel with the image behind them.
const HERO_IMG = '/images/hero-spices.jpg';
const heroBg = {
  backgroundImage: `url(${HERO_IMG})`,
  backgroundSize: 'cover',
  backgroundPosition: '62% center',
  backgroundAttachment: 'fixed',
} as const;

// Shared metrics for both title layers so the knockout and white copies overlap exactly.
const TITLE_CLASS =
  'whitespace-nowrap font-serif font-semibold leading-[0.92] tracking-[-0.015em] text-[3.6rem] sm:text-[4.8rem] md:text-[10.5vw]';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const products = diarchData.products;
  const [active, setActive] = useState(0);
  const go = (dir: number) => setActive((a) => (a + dir + products.length) % products.length);

  return (
    <main className="min-h-screen organic-canvas text-stone-900 font-sans antialiased overflow-x-hidden">
      <Navbar transparent />

      {/* ════════════════════════════════════════════
          1. SPLIT EDITORIAL HERO
      ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[760px] overflow-hidden bg-stone-950">
        {/* Full-bleed fixed background photo */}
        <div className="absolute inset-0 z-0" style={heroBg} aria-label="Diarch Organic Premium Spices" role="img" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/60" />

        {/* Frosted dark-green glass — full-width scrim on mobile, left half on desktop.
            Blurs the photo behind it; the knockout title above stays sharp. */}
        <div className="absolute inset-y-0 left-0 z-[2] w-full bg-emerald-950/55 backdrop-blur-xl md:w-1/2" />
        <div className="absolute inset-y-0 left-1/2 z-[2] hidden w-px bg-white/15 md:block" />

        {/* Editorial column — everything sits ABOVE the glass */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-10 flex h-full flex-col justify-between pt-36 pb-10 px-7 sm:px-12 md:px-24 lg:px-32"
        >
          {/* Top/Middle Section: Mobile Titles */}
          <div className="flex-1 flex flex-col justify-center text-left">
            {/* Mobile Title — hidden on desktop */}
            <motion.div variants={fadeUp} custom={1} className="md:hidden mb-8">
              <h1 className={`${TITLE_CLASS} text-white`}>Diarch</h1>
              <h1 className={`${TITLE_CLASS} italic font-normal text-white mt-3`}>Organic</h1>
            </motion.div>
          </div>

          {/* Bottom Left Section: Description */}
          <div className="max-w-sm md:max-w-md text-left z-20">
            {/* Sub-text */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base md:text-lg text-stone-300/90 leading-relaxed font-light"
            >
              A luxury Indian pantry house — curated for the world's discerning kitchens.
            </motion.p>

          </div>

          {/* Desktop "Diarch" — absolute positioned on the left side of the divider, close to center */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            style={{ ...heroBg, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}
            className={`${TITLE_CLASS} hidden md:block absolute right-[calc(50%+1rem)] top-[42%] -translate-y-1/2 text-right`}
          >
            Diarch
          </motion.h1>

          {/* Desktop "Organic" — absolute positioned on the right side of the divider, close to center */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className={`${TITLE_CLASS} italic font-normal text-white absolute left-[calc(50%+1rem)] top-[54%] -translate-y-1/2 hidden md:block`}
          >
            Organic
          </motion.h1>
        </motion.div>

        {/* Right-side composition marker */}
        <div className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-4 text-white/75 md:flex lg:right-12">
          <span className="text-[10px] tracking-[0.32em] uppercase [writing-mode:vertical-rl] rotate-180">Purely Indian</span>
          <span className="h-24 w-px bg-white/45" />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 right-7 z-10 md:bottom-10 md:right-12"
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

      {/* Wrap everything below the hero in our custom textured dark moss-green theme container */}
      <div className="organic-theme-dark relative text-white">

        {/* ════════════════════════════════════════════
            2. BRAND INTRO & FEATURE FIELD
        ════════════════════════════════════════════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="relative max-w-[1400px] mx-auto px-8 lg:px-20 pt-28 pb-16 md:pt-40 md:pb-24"
        >
          {/* Subtle background items */}
          <div aria-hidden className="organic-orb organic-orb-left opacity-35" />
          
          {/* Title Header */}
          <motion.div variants={fadeUp} className="relative z-10 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,.8fr)] gap-10 lg:gap-20 items-end mb-20 md:mb-28">
            <div>
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#e5ad76] font-bold mb-6 block">
                {diarchData.introduction.title}
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[5.8rem] font-serif text-[#fff4df] leading-[.94]">
                An Indian pantry,<br />
                <span className="italic text-[#e5ad76] font-normal">beautifully considered.</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-[#c3ccb9] leading-relaxed font-light lg:pb-2">
              {diarchData.introduction.content}
            </p>
          </motion.div>

          {/* Feature Bar (4 Pillars) */}
          <motion.div variants={fadeUp} custom={1} className="relative z-10 mb-24 md:mb-32">
            <div className="organic-feature-bar rounded-[2.5rem] p-8 md:py-12 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
              {[
                {
                  number: '01',
                  title: 'Distinct harvests',
                  description: 'Selected ingredients from India’s most celebrated growing belts.',
                  icon: Target
                },
                {
                  number: '02',
                  title: 'Thoughtful processing',
                  description: 'Hygienic, food-grade handling designed to preserve character and aroma.',
                  icon: Warehouse
                },
                {
                  number: '03',
                  title: 'Made for the shelf',
                  description: 'International-grade packaging with clarity, care, and quiet confidence.',
                  icon: Sprout
                },
                {
                  number: '04',
                  title: 'A global Indian pantry',
                  description: 'Made to travel beautifully from Indian homes to diaspora kitchens.',
                  icon: Globe
                }
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.number} className="relative px-6 flex flex-col items-center text-center">
                    {/* Icon Badge */}
                    <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 text-[#e5ad76] drop-shadow-[0_0_8px_rgba(229,173,118,0.15)] transition-transform duration-500 hover:scale-105">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {/* Title */}
                    <h4 className="font-serif text-xl text-[#fff4df] mb-3">{item.title}</h4>
                    {/* Description */}
                    <p className="text-xs leading-relaxed text-[#c3ccb9] font-light max-w-[15rem]">{item.description}</p>
                    
                    {/* Curved Divider Line */}
                    {i < 3 && (
                      <svg className="absolute -right-3 top-1/2 -translate-y-1/2 h-[75%] w-6 text-white/10 hidden md:block" viewBox="0 0 24 100" fill="none" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M12 0 C22 30 2 70 12 100" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Section Divider/Header for the 6-Card Grid */}
          <motion.div variants={fadeUp} custom={2} className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-[11px] tracking-[0.32em] uppercase text-[#e5ad76] font-bold block mb-4">Core Dimensions</span>
            <h3 className="font-serif text-3xl md:text-5xl leading-tight text-[#fff4df]">The standards that define Diarch Organic.</h3>
          </motion.div>

          {/* 6-Card Checkerboard Grid */}
          <motion.div variants={fadeUp} custom={3} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 z-10 relative">
            
            {/* Card 1: Sage Green (Text) */}
            <article className="organic-grid-card card-sage-green justify-center">
              <div className="organic-badge-disk bg-[#1c2b23] text-[#e5ad76] border border-white/5">
                <Flower className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-serif text-2xl text-[#fff4df] mb-4">Mithila Fox Nuts</h4>
              <p className="text-sm leading-relaxed text-[#c3ccb9] font-light">
                Grown in the historical wetlands of Bihar. Popped lotus seeds roasted with single-origin cow ghee and black pepper.
              </p>
            </article>

            {/* Card 2: Photographic Card (Kerala Hills) */}
            <div className="overflow-hidden rounded-[2.2rem] relative h-[360px] md:h-auto shadow-2xl border border-white/10 group">
              <img src="/images/spice-plantation-sunlight.png" alt="Kerala black pepper estates" className="group-hover:scale-105 transition-transform duration-700 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#e5ad76] font-semibold block mb-2">Single Origin</span>
                <h4 className="font-serif text-2xl text-white mb-2">Kerala Spice Estates</h4>
                <p className="text-xs text-[#c3ccb9] font-light leading-relaxed">
                  Sourcing bold black pepper from Kerala's estates, slowly ground at low speeds to retain natural complex oils.
                </p>
              </div>
            </div>

            {/* Card 3: Terracotta Brown (Text) */}
            <article className="organic-grid-card card-terracotta-brown justify-center">
              <div className="organic-badge-disk bg-[#4f3022] text-[#e5ad76] border border-white/5">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-serif text-2xl text-[#fff4df] mb-4">Champaran Blends</h4>
              <p className="text-sm leading-relaxed text-[#c3ccb9] font-light">
                Robust spice mixtures crafted to recreate the wood-fired clay handi slow-cooking traditions of northern India.
              </p>
            </article>

            {/* Card 4: Photographic Card (Cardamom close-up) */}
            <div className="overflow-hidden rounded-[2.2rem] relative h-[360px] md:h-auto shadow-2xl border border-white/10 group">
              <img src="/images/p-cardamom.jpg" alt="Close-up cardamom pods" className="group-hover:scale-105 transition-transform duration-700 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#e5ad76] font-semibold block mb-2">Heritage Blend</span>
                <h4 className="font-serif text-2xl text-white mb-2">Garam Masala Sourcing</h4>
                <p className="text-xs text-[#c3ccb9] font-light leading-relaxed">
                  Prized green cardamoms and cloves handpicked for our signature subcontinental blends.
                </p>
              </div>
            </div>

            {/* Card 5: Dark Chocolate (Text) */}
            <article className="organic-grid-card card-dark-chocolate justify-center">
              <div className="organic-badge-disk bg-[#0d0604] text-[#e5ad76] border border-white/5">
                <Sparkles className="w-6 h-6 text-[#e5ad76]" />
              </div>
              <h4 className="font-serif text-2xl text-[#fff4df] mb-4">Desert Harvesters</h4>
              <p className="text-sm leading-relaxed text-[#c3ccb9] font-light">
                Dry-roasted heritage cumin and high-heat red chillies dried in the dry sandy soils of Rajasthan.
              </p>
            </article>

            {/* Card 6: Styled Card (Sand Beige) with Floating Pouch mockup */}
            <article className="organic-grid-card card-sand-beige text-[#0c211b] relative overflow-hidden h-[360px] md:h-auto p-8 items-start text-left flex flex-col justify-between group">
              <div className="z-10 max-w-[65%]">
                <div className="organic-badge-hexagon mb-6">
                  <Shield className="w-6 h-6 text-[#dfc29f]" />
                </div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#6b472e] font-semibold block mb-2">Pouch Packaging</span>
                <h4 className="font-serif text-2xl text-[#0c211b] mb-3">Signature Pouches</h4>
                <p className="text-xs text-[#2c3d32] font-light leading-relaxed">
                  Export-grade, moisture-locked stand-up pouches preserving deep essential oils on premium aisles.
                </p>
              </div>
              
              {/* Floating pouch mockup asset */}
              <img 
                src="/images/champaran-meat-masala-pouch.png" 
                alt="Diarch Organic Champaran Meat Masala Pouch" 
                className="absolute -right-8 -bottom-4 w-44 drop-shadow-[0_15px_22px_rgba(12,33,27,0.35)] transform rotate-6 group-hover:rotate-12 group-hover:translate-y-[-4px] group-hover:scale-102 transition-all duration-700 pointer-events-none z-10"
              />
            </article>

          </motion.div>
        </motion.section>

        {/* ════════════════════════════════════════════
            3. UNIFIED PRODUCT GRID
        ════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-28 md:py-36">
          <div aria-hidden className="organic-field-glow" />
          <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="relative z-10 text-center max-w-3xl mx-auto mb-24"
            >
              <motion.span variants={fadeUp} className="text-[11px] tracking-[0.35em] uppercase text-[#e5ad76] font-bold mb-6 block">
                The Signature Range
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#fff4df] leading-[1.05]">
                Featured<br />
                <span className="italic text-[#e5ad76]">Products</span>
              </motion.h2>
            </motion.div>

            {/* Product Carousel */}
            <div className="relative z-10 mx-auto flex h-[560px] max-w-[1100px] items-center justify-center md:h-[600px]">
              {products.map((prod, i) => {
                let offset = i - active;
                const half = products.length / 2;
                if (offset > half) offset -= products.length;
                if (offset < -half) offset += products.length;
                const isActive = offset === 0;
                const hidden = Math.abs(offset) > 1;

                return (
                  <motion.article
                    key={prod.id}
                    aria-hidden={!isActive}
                    onClick={() => !isActive && setActive(i)}
                    animate={{
                      x: `${offset * 64}%`,
                      scale: isActive ? 1 : 0.8,
                      opacity: hidden ? 0 : isActive ? 1 : 0.5,
                      filter: isActive ? 'blur(0px)' : 'blur(3px)',
                      zIndex: 10 - Math.abs(offset),
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute w-[300px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl sm:w-[340px] md:w-[380px] ${
                      isActive ? 'cursor-default' : 'cursor-pointer'
                    } ${hidden ? 'pointer-events-none' : ''}`}
                  >
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-white/10 bg-white/5 p-6 lg:p-8">
                      <img
                        src={prod.pouch || prod.img}
                        alt={prod.name}
                        className="h-full w-full object-contain drop-shadow-xl"
                      />
                      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#fff4df] backdrop-blur-md">
                        {prod.tag}
                      </div>
                    </div>
                    <div className="bg-white/[0.03] p-6 text-center lg:p-8">
                      <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#e5ad76]">
                        {prod.origin}
                      </span>
                      <h3 className="font-serif text-2xl leading-snug text-[#fff4df] lg:text-3xl">
                        {prod.name}
                      </h3>
                      <p className="mx-auto mt-4 max-w-xs text-sm font-light leading-relaxed text-[#c3ccb9]">
                        {prod.desc}
                      </p>
                      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[#e5ad76]/80">
                        {prod.sizes.join(' · ')}
                      </p>
                    </div>
                  </motion.article>
                );
              })}

              {/* Arrow controls */}
              <button
                onClick={() => go(-1)}
                aria-label="Previous product"
                className="absolute left-0 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 md:left-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next product"
                className="absolute right-0 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15 md:right-4"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Dots + inquire */}
            <div className="relative z-10 mt-12 flex flex-col items-center gap-8">
              <div className="flex items-center gap-2.5">
                {products.map((prod, i) => (
                  <button
                    key={prod.id}
                    onClick={() => setActive(i)}
                    aria-label={`Go to ${prod.name}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-[#e5ad76]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <Link
                href="/contact"
                className="organic-sand-button inline-flex items-center gap-3 px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-xl"
              >
                Inquire About This Product
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            4. DARK VISION BAND
        ════════════════════════════════════════════ */}
        <section className="relative px-5 md:px-8 lg:px-16 py-16 md:py-24">
          <div className="organic-feature-bar max-w-[1400px] mx-auto p-12 md:p-16 rounded-[2.5rem] relative overflow-hidden border border-white/10 shadow-2xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 lg:gap-20 items-center"
            >
              {/* Left Column: Vision Focus */}
              <div>
                <motion.span variants={fadeUp} className="text-[#e5ad76] text-[11px] tracking-[0.4em] uppercase font-bold mb-6 block">
                  Vision 2032
                </motion.span>
                <motion.h3
                  variants={fadeUp}
                  custom={1}
                  className="text-4xl md:text-5xl font-serif text-[#fff4df] leading-tight font-light mb-8"
                >
                  To lead the premium Indian pantry shelf globally.
                </motion.h3>
                <motion.div variants={fadeUp} custom={2}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 text-[#e5ad76] text-[11px] tracking-[0.2em] uppercase font-bold hover:text-white transition-colors group"
                  >
                    Start an Inquiry
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>

              {/* Right Column: Strategic Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.article variants={fadeUp} custom={2} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-[#e5ad76] font-semibold block mb-2">Domestic Trade</span>
                  <p className="text-sm leading-relaxed text-[#c3ccb9] font-light">
                    Establish a premium presence on every modern trade shelf across key metropolitan centers in India.
                  </p>
                </motion.article>
                <motion.article variants={fadeUp} custom={3} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-[#e5ad76] font-semibold block mb-2">Global Diaspora</span>
                  <p className="text-sm leading-relaxed text-[#c3ccb9] font-light">
                    Sourcing directly to retail stores across the world's top 25 diaspora cities.
                  </p>
                </motion.article>
              </div>
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
          className="max-w-[1100px] mx-auto px-8 py-24 md:py-32"
        >
          <div className="bg-gradient-to-br from-[#2a1d17]/85 to-[#1c120e]/85 border border-white/5 shadow-2xl rounded-[2.5rem] p-12 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 text-left items-center">
              {/* Left Column: Bold Quote Splitting */}
              <div>
                <motion.span variants={fadeUp} className="text-[11px] tracking-[0.3em] uppercase text-[#e5ad76] font-bold mb-6 block">
                  Leadership
                </motion.span>
                <motion.blockquote variants={fadeUp} custom={1} className="text-2xl md:text-3xl font-serif text-[#fff4df] leading-relaxed italic mb-8 border-l-2 border-[#e5ad76]/50 pl-6">
                  &ldquo;True success lies not in one achievement, but in the ability to create lasting value across communities.&rdquo;
                </motion.blockquote>
                <motion.p variants={fadeUp} custom={2} className="text-sm text-[#c3ccb9] font-light leading-relaxed">
                  It is this conviction that inspired me to diversify the Diarch Group beyond its origins, channeling our resources, expertise, and networks into bringing the finest of India's organic produce to doorsteps around the world.
                </motion.p>
              </div>

              {/* Right Column: CEO Photo & Signature Block */}
              <div className="flex flex-col h-full justify-center py-2 border-l border-white/5 pl-0 lg:pl-10">
                <div className="flex flex-col sm:flex-row lg:flex-col gap-6 sm:items-center lg:items-start">
                  {/* CEO Portrait */}
                  <motion.div variants={fadeUp} custom={2} className="relative w-48 h-60 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                    <img 
                      src="/images/ranjan-kumar.webp" 
                      alt="Ranjan Kumar Ojha, CEO Diarch Group" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Signature Details */}
                  <motion.div variants={fadeUp} custom={2.2}>
                    <p className="font-serif font-bold text-[#e5ad76] text-2xl mb-1">
                      Ranjan Kumar Ojha
                    </p>
                    <p className="text-[#c3ccb9] text-[9px] tracking-[0.22em] uppercase font-semibold font-sans">
                      Founder & Managing Director
                    </p>
                    <p className="text-[#c3ccb9]/50 text-[8px] tracking-[0.2em] uppercase mt-0.5 font-sans">
                      Diarch Group
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            6. FOOTER
        ════════════════════════════════════════════ */}
        <footer className="text-[#c3ccb9] pt-24 pb-12 px-8 lg:px-16 border-t border-white/10 relative z-10">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
              <div className="lg:col-span-5 max-w-md">
                <div className="font-serif text-3xl text-[#fff4df] mb-5">
                  Diarch <span className="italic text-[#e5ad76]">Organic</span>
                </div>
                <p className="text-[#c3ccb9] text-sm leading-relaxed mb-4">
                  Premium, hygienically processed, export-grade pantry essentials. Sourced from celebrated agricultural belts.
                </p>
                <p className="text-[10px] text-[#e5ad76]/70 tracking-[0.2em] uppercase">
                  A Division of the Diarch Group · Est. 2016
                </p>
              </div>
              <div className="lg:col-span-3">
                <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#fff4df] font-bold mb-6">Navigate</h4>
                <ul className="space-y-4 text-sm text-[#c3ccb9]">
                  <li><Link href="/" className="hover:text-[#e5ad76] transition-colors">Home</Link></li>
                  <li><Link href="/contact" className="hover:text-[#e5ad76] transition-colors">Inquire</Link></li>
                </ul>
              </div>
              <div className="lg:col-span-4">
                <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#fff4df] font-bold mb-6">Contact</h4>
                <div className="space-y-3 text-sm text-[#c3ccb9]">
                  <p>{diarchData.contact.phone}</p>
                  <p>{diarchData.contact.email}</p>
                  <p className="text-xs leading-relaxed">{diarchData.contact.office}</p>
                </div>
              </div>
            </div>
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#c3ccb9]">
              <span>© 2026 Diarch Organic. All Rights Reserved.</span>
            </div>
          </div>
        </footer>

      </div> {/* End of organic-theme-dark */}
    </main>
  );
}
