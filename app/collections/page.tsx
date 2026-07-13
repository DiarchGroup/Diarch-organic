'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { diarchData } from '@/data/diarchData';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const categories = ["All", "Ground Powders", "Artisanal Blends"];

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? diarchData.products
    : diarchData.products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900">
      <Navbar />

      {/* Hero header */}
      <section className="pt-36 pb-24 md:pb-32 bg-gradient-to-b from-emerald-950/5 to-transparent">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[11px] tracking-[0.35em] uppercase text-emerald-800 font-bold mb-6 block">
              The Signature Range
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-stone-900 leading-[0.95] mb-8">
              Our<br />
              <span className="italic text-emerald-800">Collections</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
              A curated edit of India's finest harvests, refined for the world's discerning kitchens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="max-w-[1600px] mx-auto px-8 lg:px-16 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] uppercase tracking-[0.22em] px-8 py-3.5 rounded-full border transition-all duration-500 font-bold ${
                activeCategory === cat
                  ? "bg-emerald-800 text-white border-emerald-800"
                  : "bg-transparent text-stone-500 border-stone-300 hover:border-stone-800 hover:text-stone-900"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-stone-400 tracking-wider font-medium">
            {filteredProducts.length} products
          </span>
        </div>
      </section>

      {/* Product Grid — Large visual cards */}
      <section className="max-w-[1800px] mx-auto px-8 lg:px-16 pb-28 md:pb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {filteredProducts.map((p, i) => (
              <motion.article
                key={p.id}
                variants={fadeUp}
                custom={i}
                className="group relative bg-white rounded-3xl border border-stone-200/60 overflow-hidden hover:shadow-2xl hover:border-emerald-800/15 transition-all duration-700"
              >
                {/* Large image area */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 flex items-center justify-center p-6 lg:p-8">
                  <img
                    src={p.pouch || p.img}
                    alt={p.name}
                    className="h-full w-full object-contain transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-5 left-5 bg-[#FAF9F5]/95 backdrop-blur-sm text-stone-800 text-[10px] tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full font-bold border border-stone-200/80">
                    {p.tag}
                  </div>
                </div>

                {/* Info — minimal text */}
                <div className="p-6 lg:p-8">
                  <span className="text-[9px] tracking-[0.22em] text-stone-400 uppercase font-bold mb-2 block">
                    {p.origin}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-stone-900 mb-3 group-hover:text-emerald-800 transition-colors duration-300 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-5 line-clamp-2 font-light">
                    {p.desc}
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t border-stone-100">
                    <span className="text-[9px] tracking-wider text-stone-400 uppercase font-semibold">
                      {p.sizes.join(' · ')}
                    </span>
                    <a
                      href="/contact"
                      className="text-emerald-800 text-[10px] tracking-[0.2em] uppercase font-bold hover:text-emerald-950 flex items-center gap-1.5 group/link"
                    >
                      Inquire
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* 10 Placeholder slots */}
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={`placeholder-${i}`}
                variants={fadeUp}
                custom={filteredProducts.length + i}
                className="relative bg-stone-100/40 rounded-3xl border-2 border-dashed border-stone-200/60 overflow-hidden"
              >
                <div className="aspect-[3/4] flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-dashed border-stone-300/50 flex items-center justify-center">
                      <div className="w-5 h-5 bg-stone-200/60 rounded-full" />
                    </div>
                    <span className="text-[10px] tracking-[0.25em] text-stone-400/80 uppercase font-semibold">
                      Coming Soon
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="h-2 w-16 bg-stone-200/50 rounded mb-3" />
                  <div className="h-3 w-28 bg-stone-200/40 rounded" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Product Category Directory */}
      <section className="bg-stone-900 py-28 md:py-36 px-8 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="text-emerald-400 text-[11px] tracking-[0.4em] uppercase font-bold mb-6 block">
              Full Range Directory
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-serif text-white mb-16">
              All Product Categories
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(diarchData.allProductCategories).map(([cat, data], i) => (
                <motion.div
                  key={cat}
                  variants={fadeUp}
                  custom={i}
                  className="bg-stone-800/40 p-8 rounded-2xl border border-stone-700/50 hover:border-emerald-700/30 transition-all duration-500 group"
                >
                  <h3 className="text-xl font-serif text-white mb-5 pb-4 border-b border-stone-700/50 flex items-center justify-between">
                    {cat}
                    <span className="h-2 w-2 rounded-full bg-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.items.map(item => (
                      <span key={item} className="text-[10px] text-stone-400 bg-stone-900/60 border border-stone-700/50 px-3 py-1.5 rounded hover:text-white hover:border-emerald-600/30 transition-all">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 pt-20 pb-10 px-8 border-t border-stone-800/50">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-wider uppercase">
          <span className="font-serif text-white text-xl not-italic tracking-normal normal-case">
            Diarch <span className="italic text-emerald-500">Organic</span>
          </span>
          <span>© 2026 Diarch Organic. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}
