"use client";
// Terminal with coffee, matrix, weather, and secret commands

import { CURRENT_MONTH_YEAR } from "@/lib/availability";
import { useEffect, useRef, useState, type FormEvent } from "react";
import MatrixRain from "./MatrixRain";
import CoffeeTimer from "./CoffeeTimer";

interface Line {
  type: "input" | "output";
  text: string;
}

interface CommandResult {
  text: string;
  action?: "openWindow" | "startMatrix" | "startCoffee" | "showWeather" | "showSecret";
  windowId?: string;
}

const createCommands = (onOpenWindow?: (id: string) => void): Record<string, CommandResult> => ({
  help: {
    text: [
      "Available commands:",
      "  whoami     - Operator profile",
      "  diagnostic - Entry offer",
      "  skills     - Core stack",
      "  experience - Work timeline",
      "  projects   - Featured outcomes (opens projects window)",
      "  contact    - Reach out links (opens contact window)",
      "  mandate    - Engagement format",
      "  clear      - Reset terminal",
      "",
      "  matrix     - Enter the matrix",
      "  coffee     - Start a 25-min focus timer",
      "  weather    - Check local conditions",
      "  secret     - ???",
    ].join("\n"),
  },
  whoami: {
    text: [
      "Yogesh Sahu",
      "-------------",
      "Role:     Founder & Director, CryptoPrism / Trinetry Infotech",
      "Also:     Chief Solutions Architect / Fractional CTO",
      "Focus:    Discovery, architecture, hands-on delivery, client trust",
      "Offer:    Architecture diagnostic -> ongoing leadership",
      `Status:   Open for ${CURRENT_MONTH_YEAR} mandates`,
    ].join("\n"),
  },
  skills: {
    text: [
      "Infrastructure: GCP | PostgreSQL | BigQuery | Redis",
      "Product:        Next.js | React | TypeScript | FastAPI",
      "Finance/AI:     TimesFM | NLP | Quant workflows",
    ].join("\n"),
  },
  diagnostic: {
    text: [
      "Solutions architecture diagnostic",
      "--------------------------------",
      "Fit:      Discovery | architecture | delivery risk",
      "Output:   Decision memo + scoped 90-day execution plan",
      "Price:    USD 5k-7.5k",
      "Next:     Architecture leadership | focused execution | hiring brief",
    ].join("\n"),
  },
  experience: {
    text: [
      "2025-now   CryptoPrism     Founder & Director",
      "2024-2025  Times Internet  Chief Tech Architect",
      "2023-2024  Barclays        Credit Card Product & AI/ML",
      "2022-2023  Strathclyde     MSc FinTech",
      "2020-2021  Isha Foundation Product Lead",
      "2018-2020  Gamerz Nation   Founder & CEO",
      "2016-2018  Ubisoft         QA Lead",
    ].join("\n"),
  },
  projects: {
    text: "Opening projects window...",
    action: "openWindow",
    windowId: "resources",
  },
  contact: {
    text: "Opening contact window...",
    action: "openWindow",
    windowId: "contact",
  },
  mandate: {
    text: [
      "Engagement flow:",
      "  1) Architecture diagnostic",
      "  2) Discovery + architecture + delivery review",
      "  3) 90-day plan and next-step recommendation",
      "Response time: 24-48 hours",
    ].join("\n"),
  },
  matrix: {
    text: "Wake up, Neo...",
    action: "startMatrix",
  },
  coffee: {
    text: "Starting 25-minute focus timer... Grab your coffee!",
    action: "startCoffee",
  },
  weather: {
    text: [
      "Current Conditions (IST)",
      "------------------------",
      "Location:  India (UTC+5:30)",
      "Status:    Always building ☀️",
      "Temp:      72 commits/day",
      "Forecast:  Shipping with 99.9% SLA",
      "",
      "Real weather: Check your window! 🪟",
    ].join("\n"),
    action: "showWeather",
  },
  secret: {
    text: [
      "🗝️  You've found the secret command!",
      "",
      "The real treasure was the bugs we fixed along the way.",
      "",
      "    .--.",
      "   |o_o |",
      "   |:_/ |",
      "  //   \\ \\",
      " (|     | )",
      "/'\_   _/`\\",
      "\\___)=(___/",
      "",
      "Try: matrix, coffee, weather",
    ].join("\n"),
    action: "showSecret",
  },
});

interface TerminalWindowProps {
  onOpen?: (id: string) => void;
}

export default function TerminalWindow({ onOpen }: TerminalWindowProps) {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "YogeshOS Terminal v2.0" },
    { type: "output", text: 'Type "help" for commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const [showMatrix, setShowMatrix] = useState(false);
  const [showCoffee, setShowCoffee] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const COMMANDS = createCommands(onOpen);

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
      setShowMatrix(false);
      setShowCoffee(false);
      setShowWeather(false);
      setShowSecret(false);
      return;
    }

    if (cmd in COMMANDS) {
      const result = COMMANDS[cmd];
      newLines.push({ type: "output", text: result.text });

      // Handle actions
      if (result.action === "openWindow" && result.windowId && onOpen) {
        setTimeout(() => onOpen(result.windowId!), 100);
      } else if (result.action === "startMatrix") {
        setShowMatrix(true);
        setShowCoffee(false);
        setShowWeather(false);
        setShowSecret(false);
      } else if (result.action === "startCoffee") {
        setShowCoffee(true);
        setShowMatrix(false);
        setShowWeather(false);
        setShowSecret(false);
      } else if (result.action === "showWeather") {
        setShowWeather(true);
        setShowMatrix(false);
        setShowCoffee(false);
        setShowSecret(false);
      } else if (result.action === "showSecret") {
        setShowSecret(true);
        setShowMatrix(false);
        setShowCoffee(false);
        setShowWeather(false);
      }
    } else if (cmd) {
      newLines.push({ type: "output", text: `command not found: ${cmd}. Type "help" for commands.` });
    }

    setLines(newLines);
    setInput("");
  };

  const handleMatrixComplete = () => {
    setShowMatrix(false);
    setLines((prev) => [...prev, { type: "output", text: "\n[Matrix simulation ended. Welcome back to reality.]\n" }]);
  };

  const handleCoffeeComplete = () => {
    setShowCoffee(false);
    setLines((prev) => [...prev, { type: "output", text: "\n[Focus session complete! Time for a break.]\n" }]);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Main Terminal */}
      <div
        className="flex h-full cursor-text flex-col text-[13px] leading-[1.8]"
        style={{
          fontFamily: "var(--font-mono)",
          background: showMatrix ? "#000" : "#1a0f08",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Matrix Effect */}
        {showMatrix && (
          <div className="absolute inset-0 z-10">
            <MatrixRain onComplete={handleMatrixComplete} />
          </div>
        )}

        {/* Coffee Timer */}
        {showCoffee && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80">
            <CoffeeTimer onComplete={handleCoffeeComplete} />
          </div>
        )}

        {/* Weather Effect */}
        {showWeather && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <WeatherEffect onComplete={() => setShowWeather(false)} />
          </div>
        )}

        {/* Secret Effect */}
        {showSecret && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <SecretEffect onComplete={() => setShowSecret(false)} />
          </div>
        )}

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
    </div>
  );
}

// Weather Effect Component
function WeatherEffect({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated sun rays */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: "2px",
            height: "60%",
            background: "linear-gradient(to bottom, rgba(232,85,46,0), rgba(232,85,46,0.3), rgba(232,85,46,0))",
            transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
            transformOrigin: "center",
            animation: "sun-ray 2s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      {/* Center sun */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,85,46,0.8) 0%, rgba(232,85,46,0) 70%)",
          transform: "translate(-50%, -50%)",
          animation: "pulse 2s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes sun-ray {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) rotate(var(--rotation)) scaleY(0.8); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) rotate(var(--rotation)) scaleY(1.2); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// Secret Effect Component
function SecretEffect({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="text-center"
        style={{
          animation: "fade-in-out 4s ease-in-out",
        }}
      >
        <div className="text-6xl mb-4">🏆</div>
        <div className="text-[#e8552e] text-lg font-bold">Achievement Unlocked!</div>
        <div className="text-[#c4a088] text-sm">Curiosity Level: Expert</div>
      </div>
      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: scale(0.8); }
          20% { opacity: 1; transform: scale(1.1); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}
