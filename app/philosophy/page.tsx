'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { diarchData } from '@/data/diarchData';
import { ShieldCheck, X, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,95,70,0.25),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-8 max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="text-[11px] tracking-[0.4em] uppercase text-emerald-400 font-bold mb-8 block"
            >
              Brand Philosophy
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-7xl md:text-9xl lg:text-[11rem] font-serif text-white leading-[0.85] mb-8"
            >
              We Are <span className="italic text-emerald-400">/ Not</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-stone-300/80 max-w-xl mx-auto leading-relaxed font-light"
            >
              A disciplined design framework and brand standard.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-[1400px] mx-auto px-8 py-32 md:py-44"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* We Are */}
          <motion.div
            variants={fadeUp}
            className="bg-white p-12 md:p-16 rounded-[2.5rem] border border-stone-200/60 shadow-sm"
          >
            <div className="flex items-center gap-4 text-emerald-800 mb-12">
              <ShieldCheck className="h-8 w-8" />
              <h2 className="text-4xl font-serif text-stone-900">We are</h2>
            </div>
            <ul className="space-y-8">
              {diarchData.philosophies.weAre.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-stone-700 text-lg md:text-xl font-medium">
                  <span className="text-emerald-700 bg-emerald-50 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* We Are Not */}
          <motion.div
            variants={fadeUp}
            className="bg-stone-900 p-12 md:p-16 rounded-[2.5rem] border border-stone-800"
          >
            <div className="flex items-center gap-4 text-stone-400 mb-12">
              <X className="h-8 w-8" />
              <h2 className="text-4xl font-serif text-white">We are not</h2>
            </div>
            <ul className="space-y-8">
              {diarchData.philosophies.weAreNot.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-stone-400 text-lg md:text-xl italic font-light">
                  <span className="text-stone-500 bg-stone-800/80 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Core Rule */}
        <motion.div
          variants={fadeUp}
          className="mt-20 bg-emerald-950 text-stone-200 p-12 md:p-20 rounded-[2.5rem] border border-emerald-900/50 text-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-400 font-bold mb-8 block">
            Philosophy Core Rule
          </span>
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white leading-relaxed max-w-4xl mx-auto italic font-light">
            &ldquo;{diarchData.philosophies.coreRule}&rdquo;
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12 text-[10px] tracking-[0.25em] text-emerald-400 uppercase font-bold">
            <span>(1) Shelf Recognition</span>
            <span>(2) Ingredient-Forward</span>
            <span>(3) Clear Trust Marks</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-20 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-stone-900 hover:bg-emerald-800 text-white text-[11px] tracking-[0.2em] uppercase font-bold px-12 py-5 transition-all duration-500"
          >
            Inquire Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.section>

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
