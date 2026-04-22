"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

interface Line {
  type: "input" | "output";
  text: string;
}

const COMMANDS: Record<string, string> = {
  help: [
    "Available commands:",
    "  whoami     - Operator profile",
    "  skills     - Core stack",
    "  experience - Work timeline",
    "  projects   - Featured outcomes",
    "  contact    - Reach out links",
    "  mandate    - Engagement format",
    "  clear      - Reset terminal",
  ].join("\n"),
  whoami: [
    "Yogesh Sahu",
    "-------------",
    "Role:     Founder, CryptoPrism",
    "Also:     Fractional CTO",
    "Focus:    FinTech infrastructure and AI products",
    "Status:   Open to Q2 2026 mandates",
  ].join("\n"),
  skills: [
    "Infrastructure: GCP | PostgreSQL | BigQuery | Redis",
    "Product:        Next.js | React | TypeScript | FastAPI",
    "Finance/AI:     TimesFM | NLP | Quant workflows",
  ].join("\n"),
  experience: [
    "2024-now   CryptoPrism   Founder and operator",
    "2024-now   Tesco Bank    Credit cards analyst",
    "2023-2024  Ubisoft       Data engineering",
    "2022-2023  Strathclyde   MS Financial Technology",
  ].join("\n"),
  projects: [
    "CryptoPrism DB       -> 1B+ points/day, 99.9% SLA",
    "CryptoPrism Platform -> Real-time analytics interface",
    "KARI Mobile Game     -> 50K downloads in 21 days",
    "TimesFM Quant        -> Dissertation topper (82/100)",
  ].join("\n"),
  contact: [
    "Email:    yogesh@cryptoprism.io",
    "LinkedIn: linkedin.com/in/yogeshsahu",
    "GitHub:   github.com/CryptoPrism-io",
    "Web:      yogeshsahu.xyz",
  ].join("\n"),
  mandate: [
    "Mandate flow:",
    "  1) Discovery call",
    "  2) Architecture and delivery plan",
    "  3) Execution with measurable milestones",
    "Response time: 24-48 hours",
  ].join("\n"),
};

export default function TerminalWindow() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "YogeshOS Terminal v2.0" },
    { type: "output", text: 'Type "help" for commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newLines: Line[] = [...lines, { type: "input", text: `yogesh@os ~ $ ${input}` }];

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (cmd in COMMANDS) {
      newLines.push({ type: "output", text: COMMANDS[cmd] });
    } else if (cmd) {
      newLines.push({ type: "output", text: `command not found: ${cmd}. Type "help" for commands.` });
    }

    setLines(newLines);
    setInput("");
  };

  return (
    <div
      className="flex h-full cursor-text flex-col text-[13px] leading-[1.8]"
      style={{ fontFamily: "var(--font-mono)", background: "#1a0f08" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto p-4">
        {lines.map((line, i) => (
          <div
            key={`${line.type}-${i}`}
            className={`whitespace-pre-wrap ${line.type === "input" ? "text-[#e8552e]" : "text-[#c4a088]"}`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center px-4 pb-4">
        <span className="mr-2 text-[#e8552e]">yogesh@os ~ $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="focus-ring flex-1 bg-transparent text-[#fff5eb] outline-none caret-[#e8552e]"
          aria-label="Terminal command input"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="animate-blink text-[#e8552e]">_</span>
      </form>
    </div>
  );
}
