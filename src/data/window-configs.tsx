import AboutWindow from "@/components/windows/AboutWindow";
import CapabilityGraphWindow from "@/components/windows/CapabilityGraphWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import DiagnosticWindow from "@/components/windows/DiagnosticWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ResourcesWindow from "@/components/windows/ResourcesWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import { type WindowConfig } from "@/hooks/useWindowManager";
import {
  Award,
  BookOpen,
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
    id: "resources",
    title: "Investors & Resources",
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
    id: "about",
    title: "About",
    icon: "about",
    defaultOpen: false,
    defaultPosition: { x: 160, y: 20 },
    defaultSize: { width: 720, height: 640 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: "projects",
    defaultOpen: false,
    defaultPosition: { x: 200, y: 40 },
    defaultSize: { width: 760, height: 620 },
  },
  {
    id: "diagnostic",
    title: "Diagnostic",
    icon: "diagnostic",
    defaultOpen: false,
    defaultPosition: { x: 180, y: 30 },
    defaultSize: { width: 840, height: 700 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: "contact",
    defaultOpen: false,
    defaultPosition: { x: 260, y: 30 },
    defaultSize: { width: 660, height: 600 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "terminal",
    defaultOpen: false,
    defaultPosition: { x: 160, y: 50 },
    defaultSize: { width: 740, height: 560 },
  },
  {
    id: "credentials",
    title: "Credentials",
    icon: "credentials",
    defaultOpen: false,
    defaultPosition: { x: 220, y: 40 },
    defaultSize: { width: 700, height: 580 },
  },
  {
    id: "experience",
    title: "Experience",
    icon: "experience",
    defaultOpen: false,
    defaultPosition: { x: 180, y: 40 },
    defaultSize: { width: 720, height: 600 },
  },
];

export const ICON_MAP: Record<string, ReactNode> = {
  resources: <BookOpen size={18} strokeWidth={1.5} />,
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
  resources: () => <ResourcesWindow />,
  "capability-graph": (onOpen) => <CapabilityGraphWindow onOpen={onOpen} />,
  about: () => <AboutWindow />,
  projects: () => <ProjectsWindow />,
  diagnostic: (onOpen) => <DiagnosticWindow onStart={() => onOpen("contact")} />,
  contact: () => <ContactWindow />,
  terminal: () => <TerminalWindow />,
  credentials: () => <CredentialsWindow />,
  experience: () => <ExperienceWindow />,
};
