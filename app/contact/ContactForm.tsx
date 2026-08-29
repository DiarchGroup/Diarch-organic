'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { diarchData } from '@/data/diarchData';
import { CircleCheck as CheckCircle2 } from 'lucide-react';

// Full-bleed leaf photo pinned behind everything — mirrors the reference split screen.
const BG_IMG = '/images/contact-bg-premium.webp';
const bgStyle = {
  backgroundImage: `url(${BG_IMG})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
} as const;

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [subscribe, setSubscribe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const labelClass = 'block text-sm font-bold text-white mb-2';
  const fieldClass =
    'w-full bg-transparent border-b border-white/25 pb-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white transition-colors';

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1a2621] text-white font-sans antialiased">
      <Navbar transparent />

      {/* Full-bleed photo + dark scrim */}
      <div className="absolute inset-0 z-0" style={bgStyle} aria-hidden />
      <div className="absolute inset-0 z-[1] bg-[#161f1a]/75" />
      {/* Right-side darker glass panel (desktop) */}
      <div className="absolute inset-y-0 right-0 z-[2] hidden w-1/2 bg-[#131b16]/80 backdrop-blur-md md:block" />

      {/* Split grid */}
      <div className="relative z-10 grid min-h-screen md:grid-cols-2">
        {/* Left — imagery only (visible through the scrim), with a corner tagline */}
        <div className="hidden md:flex flex-col justify-end p-12 lg:p-16">
          <span className="text-[11px] tracking-[0.35em] uppercase text-emerald-300/80 font-bold">
            Diarch Organic
          </span>
        </div>

        {/* Right — form */}
        <div className="flex items-center justify-center px-7 py-28 sm:px-12 md:py-24 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            {isSubmitted ? (
              <div className="text-center flex flex-col items-center">
                <div className="h-16 w-16 bg-emerald-500/15 text-emerald-300 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h1 className="font-serif text-4xl text-white">Message received</h1>
                <p className="mt-3 text-white/60 leading-relaxed">
                  Thank you for reaching out. We will respond within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Get in touch</h1>
                  <p className="mt-3 text-white/55">Please share your details.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input type="text" name="name" required value={formState.name} onChange={handleInputChange}
                      className={fieldClass} placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className={labelClass}>E-mail</label>
                    <input type="email" name="email" required value={formState.email} onChange={handleInputChange}
                      className={fieldClass} placeholder="Enter your e-mail" />
                  </div>
                  <div>
                    <label className={labelClass}>Subject</label>
                    <input type="text" name="subject" required value={formState.subject} onChange={handleInputChange}
                      className={fieldClass} placeholder="Inquiry type" />
                  </div>
                  <div>
                    <label className={labelClass}>Message</label>
                    <textarea name="message" required rows={3} value={formState.message} onChange={handleInputChange}
                      className={`${fieldClass} resize-none`} placeholder="How can we help..." />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2.5 text-white/70 cursor-pointer select-none">
                      <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)}
                        className="h-4 w-4 rounded border-white/30 bg-transparent accent-emerald-500" />
                      Keep me updated
                    </label>
                    <a href={`mailto:${diarchData.contact.email}`} className="font-bold text-white hover:text-emerald-300 transition-colors">
                      Prefer email?
                    </a>
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors disabled:opacity-70">
                    {isSubmitting ? 'Sending...' : 'Send inquiry'}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-white/55">
                  Looking for our range?{' '}
                  <Link href="/products" className="font-bold text-white hover:text-emerald-300 transition-colors">
                    Browse products
                  </Link>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
