import { ImageIcon, User } from "lucide-react";

type Variant = "profile" | "screenshot";

export default function ImagePlaceholder({
  variant = "screenshot",
  label,
  className = "",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const Icon = variant === "profile" ? User : ImageIcon;
  const defaultLabel = variant === "profile" ? "Profile photo" : "Screenshot";

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed ${className}`}
      style={{
        borderColor: "var(--ys-border)",
        background: "var(--ys-surface-strong)",
      }}
    >
      <Icon
        size={variant === "profile" ? 32 : 24}
        style={{ color: "var(--ys-text-soft)", opacity: 0.4 }}
      />
      <span
        className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em]"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--ys-text-soft)",
          opacity: 0.5,
        }}
      >
        {label ?? defaultLabel}
      </span>
    </div>
  );
}
