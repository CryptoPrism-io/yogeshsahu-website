"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/desktop/CustomCursor";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import Window from "@/components/desktop/Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { WINDOW_CONFIGS, ICON_MAP, WINDOW_CONTENT } from "@/data/window-configs";
import GlyphPanel from "@/components/landing/GlyphPanel";
import LaunchDeck from "@/components/landing/LaunchDeck";
import MobileHome from "@/components/landing/MobileHome";
import GuidedTour from "@/components/landing/GuidedTour";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const {
    openWindows,
    dockWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  } = useWindowManager(WINDOW_CONFIGS);
  const topZIndex = openWindows.reduce((max, current) => Math.max(max, current.zIndex), 0);

  if (isMobile) {
    return <MobileHome />;
  }

  return (
    <div className="desktop-surface desktop-pattern desktop-cursor relative h-screen w-screen overflow-hidden">
      {/* Grain overlay */}
      <svg className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.04]" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <CustomCursor />
      <MenuBar />

      <main id="main-content" className="absolute top-11 left-0 right-0 bottom-0 overflow-hidden">
        <LaunchDeck onOpen={openWindow} />
        <GlyphPanel onOpen={openWindow} />

        <AnimatePresence>
          {openWindows.map((w) => (
            <Window
              key={w.id}
              state={{ ...w, icon: "" }}
              isFocused={w.zIndex === topZIndex}
              titleIcon={ICON_MAP[w.id]}
              onClose={() => closeWindow(w.id)}
              onMinimize={() => minimizeWindow(w.id)}
              onMaximize={() => maximizeWindow(w.id)}
              onFocus={() => focusWindow(w.id)}
              onDragEnd={(pos) => updatePosition(w.id, pos)}
            >
              {WINDOW_CONTENT[w.id](openWindow)}
            </Window>
          ))}
        </AnimatePresence>
      </main>

      <Dock windows={dockWindows} iconMap={ICON_MAP} onOpen={openWindow} onFocus={focusWindow} />
      <GuidedTour onOpenWindow={openWindow} />
    </div>
  );
}
