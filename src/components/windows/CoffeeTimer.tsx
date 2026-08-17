"use client";

import { useEffect, useState, useCallback } from "react";

interface CoffeeTimerProps {
  onComplete: () => void;
  duration?: number; // in minutes, default 25
}

export default function CoffeeTimer({ onComplete, duration = 25 }: CoffeeTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setShowMessage(true);
          setTimeout(() => {
            onComplete();
          }, 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const handleStop = () => {
    setIsRunning(false);
    onComplete();
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-xl p-8"
      style={{
        background: "linear-gradient(135deg, #1a0f08 0%, #2a1810 100%)",
        border: "1px solid rgba(232,85,46,0.3)",
        boxShadow: "0 0 40px rgba(232,85,46,0.2)",
      }}
    >
      {/* Coffee Cup Icon */}
      <div
        className="mb-6 text-6xl"
        style={{
          animation: "steam 2s ease-in-out infinite",
        }}
      >
        ☕
      </div>

      {/* Timer Display */}
      <div
        className="mb-4 font-mono text-5xl font-bold tracking-wider"
        style={{ color: "#e8552e" }}
      >
        {formatTime(timeLeft)}
      </div>

      {/* Progress Bar */}
      <div
        className="mb-6 h-2 w-64 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #e8552e, #ff6b4a)",
          }}
        />
      </div>

      {/* Status Text */}
      <div
        className="mb-6 text-center text-sm"
        style={{ color: "#c4a088", fontFamily: "var(--font-mono)" }}
      >
        {showMessage ? (
          <span className="text-[#e8552e] font-bold animate-pulse">
            Focus complete! Time for a break ☕
          </span>
        ) : (
          <>
            <div className="mb-1">Focus Session</div>
            <div className="text-xs opacity-70">Stay in the zone</div>
          </>
        )}
      </div>

      {/* Stop Button */}
      {!showMessage && (
        <button
          onClick={handleStop}
          className="rounded-lg px-6 py-2 text-sm font-medium transition-all hover:scale-105 active:scale-95"
          style={{
            background: "rgba(232,85,46,0.2)",
            border: "1px solid rgba(232,85,46,0.4)",
            color: "#e8552e",
            fontFamily: "var(--font-mono)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(232,85,46,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(232,85,46,0.2)";
          }}
        >
          Stop Timer
        </button>
      )}

      {/* Completion Message */}
      {showMessage && (
        <div
          className="mt-4 text-center"
          style={{
            animation: "fade-in 0.5s ease-out",
          }}
        >
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-sm" style={{ color: "#c4a088" }}>
            Great work! Take 5 minutes to recharge.
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes steam {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-5px) scale(1.05); opacity: 0.9; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
