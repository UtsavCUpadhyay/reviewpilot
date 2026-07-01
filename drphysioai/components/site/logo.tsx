import { cn } from "@/lib/utils";

/** DrPhysioAI wordmark: an activity/pulse glyph in a gradient tile + name. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient shadow-glow">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-white"
          aria-hidden="true"
        >
          <path
            d="M2 12h3l2 6 4-14 3 10 2-4h6"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        Dr<span className="text-gradient">Physio</span>AI
      </span>
    </span>
  );
}
