interface MarqueeProps {
  items: string[];
  variant?: "gold" | "dark";
  speed?: number;
}

export default function Marquee({ items, variant = "gold", speed = 28 }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden py-4 ${
        variant === "gold"
          ? "bg-[#fbbf24]"
          : "bg-[#0a0a0a] border-y border-white/5"
      }`}
    >
      <div
        className="flex items-center gap-0 animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-5 px-5 text-[0.62rem] font-black uppercase tracking-[0.18em] whitespace-nowrap ${
              variant === "gold" ? "text-[#080808]" : "text-neutral-500"
            }`}
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {item}
            <span
              className={`inline-block w-1 h-1 rounded-full flex-shrink-0 ${
                variant === "gold" ? "bg-[#080808]/40" : "bg-neutral-600"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
