"use client";

import { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const stats = [
  { value: "1B+",  label: "Data Points Daily", num: null },
  { value: "23",   label: "GitHub Repos",       num: 23  },
  { value: "50K",  label: "Game Downloads",     num: null },
  { value: "21",   label: "States Ridden",       num: 21  },
];

const dataVolumeChart = [
  { month: "Jan", points: 120 },
  { month: "Mar", points: 280 },
  { month: "May", points: 450 },
  { month: "Jul", points: 620 },
  { month: "Sep", points: 810 },
  { month: "Nov", points: 980 },
  { month: "Dec", points: 1000 },
];

function useCounter(target: number, isVisible: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const start = performance.now();
    const raf = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [isVisible, target, duration]);
  return count;
}

function StatCard({ stat, visible }: { stat: typeof stats[0]; visible: boolean }) {
  const counted = useCounter(stat.num ?? 0, visible && stat.num !== null);
  const display = stat.num !== null
    ? counted.toLocaleString() + (stat.value.includes("+") ? "+" : "")
    : stat.value;

  return (
    <div className="bg-[rgba(251,191,36,0.06)] border border-[rgba(251,191,36,0.14)] p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:border-[rgba(251,191,36,0.35)] transition-colors">
      <span
        className="text-3xl md:text-4xl font-black text-[#fbbf24] mb-2 leading-none"
        style={{ fontFamily: "var(--font-headline)" }}
      >
        {display}
      </span>
      <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold">
        {stat.label}
      </span>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="bg-[#0d0d0d] border-l-[3px] border-[rgba(251,191,36,0.28)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-12">
          <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
          <span
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#fbbf24]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            ABOUT
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Manifesto + Bio */}
          <div className="lg:col-span-8">
            <div className="mb-10 space-y-1">
              <h2
                className="text-4xl md:text-5xl font-black text-white tracking-[-0.03em] leading-tight uppercase"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                1B+ data points.
              </h2>
              <h2
                className="text-4xl md:text-5xl font-black text-white tracking-[-0.03em] leading-tight uppercase"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Processed daily.
              </h2>
              <h2
                className="text-4xl md:text-5xl text-[#fbbf24] leading-tight"
                style={{
                  fontFamily: "var(--font-serif-display)",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                One operator.
              </h2>
            </div>

            <p className="text-[0.9rem] leading-[1.8] text-neutral-400 max-w-[660px] mb-8">
              CryptoPrism is AI-powered crypto intelligence for independent traders — not
              institutions. Three-database GCP architecture processing over 1 billion data
              points daily across 1,000+ coins, 130+ indicators, 99.9% uptime.
              DPIIT-recognised, raising pre-seed Q2 2026. Before that: Ubisoft. A mobile
              game to 110 countries in 21 days. An e-sports franchise network. MS FinTech at
              Strathclyde — dissertation topper, applied TimesFM to live crypto markets.
            </p>

            {/* Recharts mini area chart */}
            <div className="mb-8">
              <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-600 font-bold mb-3">
                Data Points Processed (M/day) — 2025
              </p>
              <div className="h-20 w-full max-w-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dataVolumeChart}>
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#fbbf24" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" hide />
                    <Tooltip
                      contentStyle={{
                        background: "#111",
                        border: "1px solid rgba(251,191,36,0.2)",
                        borderRadius: "4px",
                        fontSize: "10px",
                        color: "#fbbf24",
                      }}
                      formatter={(v) => [`${v}M`, "Data points"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="points"
                      stroke="#fbbf24"
                      strokeWidth={1.5}
                      fill="url(#goldGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">
                Accepting Fractional CTO mandates
              </span>
            </div>
          </div>

          {/* Right: decorative portrait placeholder */}
          <div className="lg:col-span-4 flex items-end">
            <div className="w-full h-72 bg-neutral-900 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[5rem] font-black text-[#fbbf24]/10"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  YS
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] uppercase tracking-[0.18em] text-neutral-600 font-bold">
                  Portrait — coming soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-20">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
