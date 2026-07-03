import { Star, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

/** Split-screen auth layout: brand story on the left, form on the right. */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-brand-gradient bg-[length:200%_200%] p-12 text-white animate-gradient-pan lg:flex lg:flex-col">
        <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <a href="/" className="relative">
          <Logo className="[&_span]:text-white [&_.text-gradient]:!bg-none [&_.text-gradient]:!text-white" />
        </a>

        <div className="relative mt-auto">
          <blockquote className="max-w-md font-display text-2xl font-bold leading-snug">
            “I cleared my BPT exams with DrPhysioAI. It explains like my favourite
            professor — but at 2am.”
          </blockquote>
          <p className="mt-4 text-sm text-white/80">Ananya R. · Final-year BPT student</p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" /> 4.9/5 rating
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> Doctor-reviewed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> 1.7L+ users
            </span>
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <main className="relative flex flex-col justify-center px-5 py-10 sm:px-10">
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>
        <div className="mx-auto w-full max-w-md">
          <a href="/" className="mb-8 inline-block lg:hidden">
            <Logo />
          </a>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
