'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!transparent) return;

    // Flip to the solid bar once we've scrolled past the hero (full viewport),
    // not on the first pixel — keeps the transparent look over the hero photo.
    const updateNav = () => setIsScrolled(window.scrollY > window.innerHeight - 80);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
    return () => window.removeEventListener('scroll', updateNav);
  }, [transparent]);

  const isHeroNav = transparent && !isScrolled;

  // African-Journey layout: HOME first, links spread across the right, current
  // page rendered bright/bold, the rest dimmed.
  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Inquire" },
  ];
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
      isHeroNav
        ? 'bg-gradient-to-b from-stone-950/45 to-transparent border-b border-white/10'
        : 'bg-[#0c211b]/85 backdrop-blur-xl border-b border-white/10 shadow-lg'
    }`}>
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight group text-white">
          Diarch <span className="italic transition-colors text-[#e5ad76] group-hover:text-emerald-300">Organic</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.25em] uppercase font-semibold text-white/70">
          {links.map((link) => {
            const active = isActive(link.href);
            const activeColor = 'text-white';
            const hoverColor = 'hover:text-[#e5ad76]';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-colors duration-300 ${active ? activeColor : hoverColor}`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-[#e5ad76]" />
                )}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden transition-colors text-white hover:text-[#e5ad76]"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c211b] border-b border-white/10 overflow-hidden"
          >
            <div className="px-8 py-8 flex flex-col gap-6 text-sm tracking-widest uppercase font-semibold text-white/80">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-[#e5ad76]">
                  {link.label}
                </Link>
              ))}
              <hr className="border-white/10" />
              <Link href="/contact" onClick={() => setIsOpen(false)} className="text-[#e5ad76] font-bold">
                Inquire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
