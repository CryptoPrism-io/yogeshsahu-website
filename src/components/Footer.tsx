import { Code2, UserRound, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[rgba(251,191,36,0.15)] py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Branding */}
        <div>
          <div
            className="text-base font-black text-white italic mb-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            yogeshsahu.xyz
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-600">
            © 2026 Yogesh Sahu. Built. Running.
          </p>
        </div>

        {/* Icon links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/CryptoPrism-io"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/4 border border-white/8 flex items-center justify-center hover:border-[#fbbf24]/60 hover:text-[#fbbf24] text-neutral-500 transition-all duration-300"
            aria-label="GitHub"
          >
            <Code2 size={15} strokeWidth={1.5} />
          </a>
          <a
            href="https://linkedin.com/in/yogeshsahu"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/4 border border-white/8 flex items-center justify-center hover:border-[#fbbf24]/60 hover:text-[#fbbf24] text-neutral-500 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <UserRound size={15} strokeWidth={1.5} />
          </a>
          <a
            href="mailto:yogesh@cryptoprism.io"
            className="w-9 h-9 rounded-full bg-white/4 border border-white/8 flex items-center justify-center hover:border-[#fbbf24]/60 hover:text-[#fbbf24] text-neutral-500 transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={15} strokeWidth={1.5} />
          </a>
        </div>

        {/* Text links */}
        <div className="flex items-center gap-8">
          {["LinkedIn", "GitHub", "Email"].map((l) => (
            <a
              key={l}
              href={
                l === "LinkedIn"
                  ? "https://linkedin.com/in/yogeshsahu"
                  : l === "GitHub"
                  ? "https://github.com/CryptoPrism-io"
                  : "mailto:yogesh@cryptoprism.io"
              }
              target={l !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.18em] font-bold text-neutral-600 hover:text-[#fbbf24] hover:translate-x-0.5 transition-all duration-300"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
