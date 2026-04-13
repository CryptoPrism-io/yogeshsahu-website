"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work",    href: "#work"    },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b-2 border-[#1a1a1a]">
      <div className="flex justify-between items-center px-6 md:px-10 py-3">
        <a
          href="#"
          className="text-[11px] font-black uppercase tracking-[0.28em] text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          YS.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#888] hover:text-[#1a1a1a] transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-[8px] font-black uppercase tracking-[0.15em] bg-[#1a1a1a] text-[#c8f59a] px-4 py-2 hover:bg-[#333] transition-colors"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            HIRE ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#1a1a1a]"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#e0e0e0] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[9px] font-bold uppercase tracking-widest text-[#888] hover:text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-[#1a1a1a] text-[#c8f59a] px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-center"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            HIRE ↗
          </a>
        </div>
      )}
    </nav>
  );
}
