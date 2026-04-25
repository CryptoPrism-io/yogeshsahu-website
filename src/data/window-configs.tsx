import AboutWindow from "@/components/windows/AboutWindow";
import CapabilityGraphWindow from "@/components/windows/CapabilityGraphWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import DiagnosticWindow from "@/components/windows/DiagnosticWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import { type WindowConfig } from "@/hooks/useWindowManager";
import {
  Award,
  Briefcase,
  FileText,
  FolderOpen,
  GitBranch,
  Mail,
  Search,
  Terminal,
} from "lucide-react";
import type { ReactNode } from "react";

export const WINDOW_CONFIGS: WindowConfig[] = [
  {
    id: "capability-graph",
    title: "Capability Graph",
    icon: "capability-graph",
    defaultOpen: false,
    defaultPosition: { x: 120, y: 46 },
    defaultSize: { width: 920, height: 650 },
  },
  {
    id: "about",
    title: "About",
    icon: "about",
    defaultOpen: false,
    defaultPosition: { x: 160, y: 20 },
    defaultSize: { width: 580, height: 540 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: "projects",
    defaultOpen: false,
    defaultPosition: { x: 240, y: 50 },
    defaultSize: { width: 540, height: 500 },
  },
  {
    id: "diagnostic",
    title: "Diagnostic",
    icon: "diagnostic",
    defaultOpen: false,
    defaultPosition: { x: 210, y: 38 },
    defaultSize: { width: 700, height: 640 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: "contact",
    defaultOpen: false,
    defaultPosition: { x: 300, y: 30 },
    defaultSize: { width: 460, height: 540 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "terminal",
    defaultOpen: false,
    defaultPosition: { x: 180, y: 60 },
    defaultSize: { width: 580, height: 420 },
  },
  {
    id: "credentials",
    title: "Credentials",
    icon: "credentials",
    defaultOpen: false,
    defaultPosition: { x: 260, y: 40 },
    defaultSize: { width: 560, height: 500 },
  },
  {
    id: "experience",
    title: "Experience",
    icon: "experience",
    defaultOpen: false,
    defaultPosition: { x: 200, y: 50 },
    defaultSize: { width: 520, height: 520 },
  },
];

export const ICON_MAP: Record<string, ReactNode> = {
  "capability-graph": <GitBranch size={18} strokeWidth={1.5} />,
  about: <FileText size={18} strokeWidth={1.5} />,
  projects: <FolderOpen size={18} strokeWidth={1.5} />,
  diagnostic: <Search size={18} strokeWidth={1.5} />,
  contact: <Mail size={18} strokeWidth={1.5} />,
  terminal: <Terminal size={18} strokeWidth={1.5} />,
  credentials: <Award size={18} strokeWidth={1.5} />,
  experience: <Briefcase size={18} strokeWidth={1.5} />,
};

export const WINDOW_CONTENT: Record<string, (onOpen: (id: string) => void) => ReactNode> = {
  "capability-graph": (onOpen) => <CapabilityGraphWindow onOpen={onOpen} />,
  about: () => <AboutWindow />,
  projects: () => <ProjectsWindow />,
  diagnostic: (onOpen) => <DiagnosticWindow onStart={() => onOpen("contact")} />,
  contact: () => <ContactWindow />,
  terminal: () => <TerminalWindow />,
  credentials: () => <CredentialsWindow />,
  experience: () => <ExperienceWindow />,
};
