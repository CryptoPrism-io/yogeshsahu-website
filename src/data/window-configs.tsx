import CapabilityGraphWindow from "@/components/windows/CapabilityGraphWindow";
import EngageWindow from "@/components/windows/EngageWindow";
import ResourcesWindow from "@/components/windows/ResourcesWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import { type WindowConfig } from "@/hooks/useWindowManager";
import { BookOpen, GitBranch, Mail, Terminal } from "lucide-react";
import type { ReactNode } from "react";

export const WINDOW_CONFIGS: WindowConfig[] = [
  {
    id: "resources",
    title: "Resources",
    icon: "resources",
    defaultOpen: false,
    defaultPosition: { x: 100, y: 30 },
    defaultSize: { width: 1020, height: 720 },
  },
  {
    id: "capability-graph",
    title: "Capability Graph",
    icon: "capability-graph",
    defaultOpen: false,
    defaultPosition: { x: 120, y: 46 },
    defaultSize: { width: 980, height: 700 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: "contact",
    defaultOpen: false,
    defaultPosition: { x: 200, y: 40 },
    defaultSize: { width: 900, height: 700 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "terminal",
    defaultOpen: false,
    defaultPosition: { x: 160, y: 50 },
    defaultSize: { width: 740, height: 560 },
  },
];

export const ICON_MAP: Record<string, ReactNode> = {
  resources: <BookOpen size={18} strokeWidth={1.5} />,
  "capability-graph": <GitBranch size={18} strokeWidth={1.5} />,
  contact: <Mail size={18} strokeWidth={1.5} />,
  terminal: <Terminal size={18} strokeWidth={1.5} />,
};

export const WINDOW_CONTENT: Record<string, (onOpen: (id: string) => void) => ReactNode> = {
  resources: () => <ResourcesWindow />,
  "capability-graph": (onOpen) => <CapabilityGraphWindow onOpen={onOpen} />,
  contact: () => <EngageWindow />,
  terminal: () => <TerminalWindow />,
};
