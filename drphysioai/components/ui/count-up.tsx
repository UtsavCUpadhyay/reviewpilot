"use client";

import * as React from "react";

/**
 * Counts a stat up from zero when it scrolls into view. Preserves the original
 * formatting — prefixes/suffixes ("+", " Cr+", "★"), decimals, and Indian digit
 * grouping (en-IN) — so "1,20,000+" and "4.2 Cr+" animate cleanly.
 */
export function CountUp({
  value,
  className,
  durationMs = 1600,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState<string>(value);

  const parsed = React.useMemo(() => {
    const m = /^([\d,]+(?:\.\d+)?)(.*)$/.exec(value.trim());
    if (!m) return null;
    const raw = m[1].replace(/,/g, "");
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    return { target: parseFloat(raw), decimals, suffix: m[2] };
  }, [value]);

  React.useEffect(() => {
    if (!parsed || typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion — show the final value immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    setDisplay(format(0, parsed.decimals) + parsed.suffix);
    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(format(parsed.target * eased, parsed.decimals) + parsed.suffix);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [parsed, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function format(n: number, decimals: number): string {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
