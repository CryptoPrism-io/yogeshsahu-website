"use client";

import { useEffect, useState } from "react";
import CustomCursor from "@/components/desktop/CustomCursor";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import Window from "@/components/desktop/Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { WINDOW_CONFIGS, ICON_MAP, WINDOW_CONTENT } from "@/data/window-configs";
import GlyphPanel from "@/components/landing/GlyphPanel";
import LaunchDeck from "@/components/landing/LaunchDeck";
import MobileHome from "@/components/landing/MobileHome";

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
      <CustomCursor />
      <MenuBar />

      <main id="main-content" className="absolute top-11 left-0 right-0 bottom-16 overflow-hidden">
        <LaunchDeck onOpen={openWindow} />
        <GlyphPanel onOpen={openWindow} />

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
      </main>

      <Dock windows={dockWindows} iconMap={ICON_MAP} onOpen={openWindow} onFocus={focusWindow} />
    </div>
  );
}
