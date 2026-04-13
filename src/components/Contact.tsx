"use client";

import { motion } from "framer-motion";
import { Code2, UserRound, Mail, Calendar, Globe } from "lucide-react";

const contactCards = [
  {
    Icon: Code2,
    label: "GitHub",
    value: "CryptoPrism-io",
    href: "https://github.com/CryptoPrism-io",
    colSpan: false,
  },
  {
    Icon: UserRound,
    label: "LinkedIn",
    value: "/in/yogeshsahu",
    href: "https://linkedin.com/in/yogeshsahu",
    colSpan: false,
  },
  {
    Icon: Mail,
    label: "Email",
    value: "yogesh@cryptoprism.io",
    href: "mailto:yogesh@cryptoprism.io",
    colSpan: true,
  },
  {
    Icon: Globe,
    label: "CryptoPrism",
    value: "cryptoprism.io",
    href: "https://cryptoprism.io",
    colSpan: false,
  },
  {
    Icon: Calendar,
    label: "Book a Call",
    value: "30-min intro · Cal.com",
    href: "https://cal.com/yogeshsahu",
    colSpan: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0d0d0d] py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#fbbf24]/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: messaging */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
              <span
                className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#fbbf24]"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                CONTACT
              </span>
            </div>

            <h2
              className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Available.
              <br />
              <span
                className="text-[#fbbf24]"
                style={{
                  fontFamily: "var(--font-serif-display)",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                Selectively.
              </span>
            </h2>

            <p className="text-neutral-500 text-base leading-relaxed max-w-md">
              Open to Fractional CTO engagements — fintech, data infrastructure, AI/ML. I
              take on two to three clients at a time. Simultaneously raising pre-seed for
              CryptoPrism, Q2 2026.
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-400/5 border border-green-400/20 rounded-full self-start">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-green-400 text-[10px] font-bold uppercase tracking-[0.1em]">
                Accepting Fractional CTO mandates
              </span>
            </div>

            {/* Scarcity signal */}
            <p
              className="text-[10px] uppercase tracking-[0.18em] text-neutral-600 font-bold"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              2–3 mandates at a time · Currently open
            </p>
          </div>

          {/* Right: contact cards */}
          <div className="grid grid-cols-2 gap-4 max-w-sm lg:ml-auto w-full">
            {contactCards.map((card, i) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className={`group flex flex-col p-5 bg-white/4 border border-white/8 hover:border-[#fbbf24]/35 hover:translate-x-0.5 transition-all duration-300 ${
                  card.colSpan ? "col-span-2" : ""
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(251,191,36,0.08)] border border-[rgba(251,191,36,0.15)] mb-4">
                  <card.Icon size={18} className="text-[#fbbf24]" strokeWidth={1.5} />
                </div>
                <span
                  className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 mb-1"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {card.label}
                </span>
                <span className="text-sm font-bold text-white group-hover:text-[#fbbf24] transition-colors">
                  {card.value}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
