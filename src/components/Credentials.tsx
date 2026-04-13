"use client";

import { motion } from "framer-motion";

const creds = [
  {
    abbr: "BB",
    issuer: "Bloomberg",
    title: "Bloomberg Market Concepts & ESG",
    year: "2023",
    tagLabel: "Finance",
    tagColor: "bg-amber-50 text-amber-700",
    iconBg: "#1a1a2e",
    iconColor: "#d97706",
  },
  {
    abbr: "LI",
    issuer: "LIBF, London",
    title: "Investment Banking Diploma",
    year: "2023",
    tagLabel: "Finance",
    tagColor: "bg-amber-50 text-amber-700",
    iconBg: "#1e3a5f",
    iconColor: "#fff",
  },
  {
    abbr: "SC",
    issuer: "Scrum Alliance",
    title: "CSPO — Certified Scrum Product Owner",
    year: "2022",
    tagLabel: "Product",
    tagColor: "bg-emerald-50 text-emerald-700",
    iconBg: "#fbbf24",
    iconColor: "#000",
  },
  {
    abbr: "PM",
    issuer: "PMI",
    title: "Project Management Professional",
    year: "2022",
    tagLabel: "Management",
    tagColor: "bg-emerald-50 text-emerald-700",
    iconBg: "#1e3a5f",
    iconColor: "#fff",
  },
  {
    abbr: "PB",
    issuer: "Microsoft",
    title: "Power BI PL-300",
    year: "2023",
    tagLabel: "Data",
    tagColor: "bg-violet-50 text-violet-700",
    iconBg: "#f59e0b",
    iconColor: "#fff",
  },
  {
    abbr: "GC",
    issuer: "Google",
    title: "Google Cloud Certified",
    year: "2023",
    tagLabel: "Cloud",
    tagColor: "bg-blue-50 text-blue-700",
    iconBg: "#4285f4",
    iconColor: "#fff",
  },
  {
    abbr: "MS",
    issuer: "Strathclyde Business School",
    title: "MS Financial Technology — Merit",
    year: "2024",
    tagLabel: "FinTech",
    tagColor: "bg-amber-50 text-amber-700",
    iconBg: "#003087",
    iconColor: "#fff",
  },
  {
    abbr: "DP",
    issuer: "Govt. of India",
    title: "DPIIT Recognised Startup",
    year: "2024",
    tagLabel: "Recognised",
    tagColor: "bg-emerald-50 text-emerald-700",
    iconBg: "#FF9933",
    iconColor: "#fff",
  },
];

export default function Credentials() {
  return (
    <section id="credentials" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
          <span
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d97706]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            CREDENTIALS
          </span>
        </div>
        <div className="mb-16 max-w-3xl">
          <h2
            className="text-4xl md:text-6xl font-black text-[#111] leading-tight tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            The proof behind{" "}
            <span
              className="text-[#d97706]"
              style={{
                fontFamily: "var(--font-serif-display)",
                fontStyle: "italic",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              the pitch.
            </span>
          </h2>
          <p className="text-neutral-500 text-base leading-relaxed">
            Bloomberg to Strathclyde. Finance to cloud. Every credential answers a different
            client objection.
          </p>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {creds.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group bg-[#fafafa] border border-neutral-200 p-6 flex flex-col justify-between min-h-[200px] hover:-translate-y-1 hover:border-[#d97706] transition-all duration-300"
            >
              <div>
                {/* Logo + year */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center text-[11px] font-black"
                    style={{ background: c.iconBg, color: c.iconColor }}
                  >
                    {c.abbr}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">
                    {c.year}
                  </span>
                </div>

                {/* Issuer + title */}
                <p
                  className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1 font-bold"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {c.issuer}
                </p>
                <h3
                  className="text-[13px] font-black text-[#111] leading-snug"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {c.title}
                </h3>
              </div>

              {/* Tag */}
              <div className="mt-4">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${c.tagColor}`}
                >
                  {c.tagLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-10 bg-neutral-50 border border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4
              className="text-xl font-black text-[#111] mb-2"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Looking for verification links?
            </h4>
            <p className="text-neutral-500 text-sm">
              Digital credentials available on request for institutional vetting.
            </p>
          </div>
          <a
            href="#contact"
            className="bg-[#fbbf24] text-[#080808] px-8 py-3 font-bold text-sm uppercase tracking-[0.1em] hover:bg-[#d97706] transition-colors whitespace-nowrap"
          >
            Contact Me →
          </a>
        </div>
      </div>
    </section>
  );
}
