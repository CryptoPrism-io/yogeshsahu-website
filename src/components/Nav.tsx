"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Expertise", href: "#expertise" },
  { label: "Work",      href: "#work" },
  { label: "Mental OS", href: "#mental-os" },
  { label: "Blog",      href: "#blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-md border-white/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Wordmark */}
        <a
          href="#"
          className="text-[clamp(0.85rem,2vw,1rem)] font-black uppercase tracking-[0.18em] text-white"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Yogesh Sahu
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-neutral-400 hover:text-white transition-colors text-[0.72rem] font-bold uppercase tracking-[0.14em]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#fbbf24] text-[#080808] px-5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] hover:bg-[#d97706] transition-colors active:scale-95"
          >
            Connect
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#080808]/98 backdrop-blur-md border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-neutral-400 hover:text-white text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-block bg-[#fbbf24] text-[#080808] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-center"
          >
            Connect
          </a>
        </div>
      )}
    </nav>
  );
}
