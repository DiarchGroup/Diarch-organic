'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { diarchData } from '@/data/diarchData';
import { MapPin, Leaf, Globe, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900">
      <Navbar />

      {/* Full-bleed Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,95,70,0.35),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-8 max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-5 mb-10">
              <span className="h-px w-16 bg-emerald-400/50" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-emerald-300/90 font-semibold">Our Heritage</span>
              <span className="h-px w-16 bg-emerald-400/50" />
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-7xl md:text-9xl lg:text-[11rem] font-serif text-white leading-[0.85] mb-8">
              Rooted in<br />
              <span className="italic text-emerald-300 font-normal">Bihar</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-stone-300/80 max-w-xl mx-auto leading-relaxed font-light">
              Where the Ganga has fed civilizations for millennia.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story — Minimal text, large typography */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="max-w-[1200px] mx-auto px-8 py-32 md:py-44"
      >
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto text-center mb-28">
          <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-800 font-bold mb-8 block">
            {diarchData.brandStory.title}
          </span>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-stone-800 leading-relaxed italic font-light">
            &ldquo;{diarchData.brandStory.content}&rdquo;
          </blockquote>
        </motion.div>

        {/* Three pillars — visual, minimal */}
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          <motion.div variants={fadeUp} className="text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
              <MapPin className="h-8 w-8 text-emerald-800" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-3">The Land</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              Bihar, where the Ganga has fed civilizations for millennia.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
              <Leaf className="h-8 w-8 text-emerald-800" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-3">The Harvest</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              Turmeric, makhana, and aromatic rice — grown for centuries.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
              <Globe className="h-8 w-8 text-emerald-800" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-3">The Reach</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              From Patna to Toronto — premium aisles worldwide.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Vision band */}
      <section className="bg-gradient-to-br from-emerald-950 via-stone-950 to-emerald-950 py-28 md:py-36 px-8">
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="text-emerald-400/80 text-[11px] tracking-[0.4em] uppercase font-bold mb-8 block">
              Vision 2032
            </motion.span>
            <motion.blockquote variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-serif text-white leading-tight font-light italic mb-14">
              &ldquo;{diarchData.visionMission.vision}&rdquo;
            </motion.blockquote>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-6">
              {diarchData.visionMission.mission.map((item, i) => (
                <span key={i} className="text-[10px] text-emerald-300/70 bg-emerald-900/40 border border-emerald-800/30 px-5 py-2.5 rounded-full tracking-wider uppercase">
                  {item.split(' ').slice(0, 4).join(' ')}…
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder — Quote only */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="max-w-[900px] mx-auto px-8 py-32 md:py-40 text-center"
      >
        <motion.span variants={fadeUp} className="text-[11px] tracking-[0.3em] uppercase text-emerald-800 font-bold mb-10 block">
          {diarchData.founderMessage.title}
        </motion.span>
        <motion.blockquote variants={fadeUp} custom={1} className="text-xl md:text-2xl font-serif text-stone-700 leading-relaxed italic mb-14 font-light">
          &ldquo;{diarchData.founderMessage.paragraphs[1]}&rdquo;
        </motion.blockquote>
        <motion.div variants={fadeUp} custom={2}>
          <p className="font-serif font-bold text-stone-900 text-2xl mb-2">
            — {diarchData.founderMessage.author}
          </p>
          <p className="text-stone-400 text-[10px] tracking-[0.2em] uppercase">
            {diarchData.founderMessage.designation}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} custom={3} className="mt-16">
          <a
            href="/philosophy"
            className="inline-flex items-center gap-3 text-emerald-800 text-[11px] tracking-[0.2em] uppercase font-bold hover:text-emerald-600 transition-colors group"
          >
            Read Our Philosophy
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
