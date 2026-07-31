"use client";

import { useState } from "react";
import { Award, Briefcase, Mail, PenLine, User } from "lucide-react";
import AboutWindow from "./AboutWindow";
import DiagnosticWindow from "./DiagnosticWindow";
import ContactWindow from "./ContactWindow";
import CredentialsWindow from "./CredentialsWindow";
import ExperienceWindow from "./ExperienceWindow";

type TabId = "about" | "offer" | "credentials" | "experience" | "contact";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "about", label: "About", icon: <User size={13} strokeWidth={1.8} /> },
  { id: "offer", label: "Work With Me", icon: <PenLine size={13} strokeWidth={1.8} /> },
  { id: "credentials", label: "Credentials", icon: <Award size={13} strokeWidth={1.8} /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={13} strokeWidth={1.8} /> },
  { id: "contact", label: "Contact", icon: <Mail size={13} strokeWidth={1.8} /> },
];

export default function EngageWindow() {
  const [tab, setTab] = useState<TabId>("about");

  return (
    <div className="flex h-full flex-col">
      {/* tab bar */}
      <div
        className="flex flex-shrink-0 items-center gap-1 border-b px-3 pt-3"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
        role="tablist"
        aria-label="About and contact"
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-1.5 rounded-t-lg border-b-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                borderBottomColor: active ? "var(--ys-accent)" : "transparent",
                color: active ? "var(--ys-accent-strong)" : "var(--ys-text-soft)",
                background: active ? "rgba(207,79,39,0.05)" : "transparent",
              }}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* tab content */}
      <div className="flex-1 overflow-y-auto">
        {tab === "about" && <AboutWindow hideHeader />}
        {tab === "offer" && <DiagnosticWindow onStart={() => setTab("contact")} />}
        {tab === "credentials" && <CredentialsWindow />}
        {tab === "experience" && <ExperienceWindow />}
        {tab === "contact" && <ContactWindow />}
      </div>
    </div>
  );
}
