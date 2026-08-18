"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Briefcase, BookOpen, Mail, Home } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface TopNavProps {
  onOpenWindow?: (id: string) => void;
  activeWindow?: string | null;
}

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/", icon: Home, type: "link" as const },
  { id: "work", label: "Work", href: "/work", icon: Briefcase, type: "link" as const },
  { id: "log", label: "Log", href: "/log", icon: BookOpen, type: "link" as const },
  { id: "resources", label: "Resources", href: "/resources", icon: BookOpen, type: "link" as const },
  { id: "about", label: "About", icon: User, type: "window" as const, windowId: "about" },
  { id: "contact", label: "Contact", icon: Mail, type: "window" as const, windowId: "contact" },
];

export default function TopNav({ onOpenWindow, activeWindow }: TopNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    trackEvent("topnav_click", { destination: item.id });
    
    if (item.type === "window" && item.windowId && onOpenWindow) {
      onOpenWindow(item.windowId);
    }
  };

  return (
    <AnimatePresence>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[var(--z-header)] hidden lg:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.16, 0.84, 0.44, 1]
        }}
      >
        <motion.nav
          className="mx-auto mt-4 flex max-w-fit items-center gap-1 rounded-full border px-2 py-1.5"
          animate={{
            background: isScrolled 
              ? "rgba(34, 18, 11, 0.92)" 
              : "rgba(34, 18, 11, 0.65)",
            borderColor: isScrolled 
              ? "rgba(215, 189, 168, 0.35)" 
              : "rgba(215, 189, 168, 0.18)",
            backdropFilter: "blur(20px) saturate(1.4)",
            boxShadow: isScrolled 
              ? "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)" 
              : "0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo mark */}
          <Link 
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
          >
            <span 
              className="text-sm font-bold tracking-tight"
              style={{ 
                fontFamily: "var(--font-serif-display)",
                color: "rgba(255, 244, 233, 0.95)"
              }}
            >
              YS.
            </span>
          </Link>

          {/* Divider */}
          <span 
            className="mx-1 h-4 w-px"
            style={{ background: "rgba(215, 189, 168, 0.15)" }}
          />

          {/* Nav items */}
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.type === "window" 
              ? activeWindow === item.windowId 
              : false;

            if (item.type === "link") {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  className="group relative flex items-center gap-2 rounded-full px-3.5 py-2 transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(169, 61, 29, 0.25)" : "transparent",
                  }}
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon 
                      size={14} 
                      strokeWidth={1.5}
                      className="text-[rgba(230,201,179,0.7)] group-hover:text-[rgba(255,244,233,0.95)] transition-colors"
                    />
                    <span 
                      className="text-xs font-medium tracking-wide"
                      style={{ 
                        fontFamily: "var(--font-mono)",
                        color: isActive 
                          ? "rgba(255, 244, 233, 0.95)" 
                          : "rgba(230, 201, 179, 0.75)",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                  
                  {/* Hover indicator */}
                  <motion.span
                    className="absolute inset-x-2 bottom-1 h-px rounded-full"
                    style={{ 
                      background: "var(--ys-accent)",
                      opacity: 0 
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                </Link>
              );
            }

            // Window items
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="group relative flex items-center gap-2 rounded-full px-3.5 py-2 transition-all duration-200"
                style={{
                  background: isActive ? "rgba(169, 61, 29, 0.25)" : "transparent",
                }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon 
                    size={14} 
                    strokeWidth={1.5}
                    className="text-[rgba(230,201,179,0.7)] group-hover:text-[rgba(255,244,233,0.95)] transition-colors"
                  />
                  <span 
                    className="text-xs font-medium tracking-wide"
                    style={{ 
                      fontFamily: "var(--font-mono)",
                      color: isActive 
                        ? "rgba(255, 244, 233, 0.95)" 
                        : "rgba(230, 201, 179, 0.75)",
                    }}
                  >
                    {item.label}
                  </span>
                </motion.div>
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    layoutId="navActiveIndicator"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                    style={{ background: "var(--ys-accent)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
            );
          })}
        </motion.nav>
      </motion.header>
    </AnimatePresence>
  );
}
