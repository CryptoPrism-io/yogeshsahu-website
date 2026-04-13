export default function Footer() {
  return (
    <footer className="bg-[#f7f4ee] border-t border-[#e0e0e0] py-5 px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-[11px] text-[#999] font-bold uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          © 2026 Yogesh Sahu · All Rights Reserved
        </p>
        <span
          className="text-[11px] font-black tracking-[0.28em] text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          YS.
        </span>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub",   href: "https://github.com/CryptoPrism-io" },
            { label: "LinkedIn", href: "https://linkedin.com/in/yogeshsahu" },
            { label: "Email",    href: "mailto:yogesh@cryptoprism.io" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#bbb] hover:text-[#1a1a1a] transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
