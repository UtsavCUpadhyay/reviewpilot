import {
  Sparkles, FileText, Brain, Mic, Image, Trophy, Video, Activity,
  HeartPulse, Stethoscope, Dumbbell, Accessibility, MousePointerClick,
  Route, TrendingUp, BrainCircuit, ClipboardList, ShieldCheck, Lock,
  Users, FileClock, Building2, DatabaseBackup, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Sparkles, FileText, Brain, Mic, Image, Trophy, Video, Activity,
  HeartPulse, Stethoscope, Dumbbell, Accessibility, MousePointerClick,
  Route, TrendingUp, BrainCircuit, ClipboardList, ShieldCheck, Lock,
  Users, FileClock, Building2, DatabaseBackup,
};

/** Render a lucide icon by name (icons are referenced as strings in content.ts). */
export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
