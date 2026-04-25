"use client";

import { useState, useCallback, useEffect } from "react";

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

export interface WindowConfig {
  id: string;
  title: string;
  icon: string;
  defaultOpen?: boolean;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

let globalZIndex = 10;

function nextZ() {
  globalZIndex += 1;
  return globalZIndex;
}

export function useWindowManager(configs: WindowConfig[]) {
  const [windows, setWindows] = useState<Record<string, WindowState>>(() => {
    const map: Record<string, WindowState> = {};
    for (const c of configs) {
      map[c.id] = {
        id: c.id,
        title: c.title,
        icon: c.icon,
        isOpen: c.defaultOpen ?? false,
        isMinimized: false,
        isMaximized: false,
        position: { ...c.defaultPosition },
        size: { ...c.defaultSize },
        zIndex: c.defaultOpen ? nextZ() : 0,
        defaultPosition: { ...c.defaultPosition },
        defaultSize: { ...c.defaultSize },
      };
    }
    return map;
  });

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const w = prev[id];
      if (!w) return prev;
      return {
        ...prev,
        [id]: {
          ...w,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ(),
        },
      };
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const w = prev[id];
      if (!w) return prev;
      return {
        ...prev,
        [id]: {
          ...w,
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
          position: { ...w.defaultPosition },
          size: { ...w.defaultSize },
        },
      };
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const w = prev[id];
      if (!w) return prev;
      return { ...prev, [id]: { ...w, isMinimized: true } };
    });
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const w = prev[id];
      if (!w) return prev;
      if (w.isMaximized) {
        return {
          ...prev,
          [id]: {
            ...w,
            isMaximized: false,
            position: { ...w.defaultPosition },
            size: { ...w.defaultSize },
          },
        };
      }
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
      const vh = typeof window !== "undefined" ? window.innerHeight : 720;
      return {
        ...prev,
        [id]: {
          ...w,
          isMaximized: true,
          position: { x: 0, y: 0 },
          size: { width: vw, height: vh - 36 - 64 },
        },
      };
    });
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const w = prev[id];
      if (!w) return prev;
      return {
        ...prev,
        [id]: {
          ...w,
          isMinimized: false,
          zIndex: nextZ(),
        },
      };
    });
  }, []);

  const updatePosition = useCallback((id: string, pos: { x: number; y: number }) => {
    setWindows((prev) => {
      const w = prev[id];
      if (!w) return prev;
      return { ...prev, [id]: { ...w, position: pos } };
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const topWindow = Object.values(windows)
          .filter((w) => w.isOpen && !w.isMinimized)
          .sort((a, b) => b.zIndex - a.zIndex)[0];
        if (topWindow) {
          closeWindow(topWindow.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [windows, closeWindow]);

  const windowList = Object.values(windows);
  const openWindows = windowList.filter((w) => w.isOpen);
  const dockWindows = windowList;

  return {
    windows,
    windowList,
    openWindows,
    dockWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  };
}
