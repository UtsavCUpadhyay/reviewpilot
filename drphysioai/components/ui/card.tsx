import * as React from "react";
import { cn } from "@/lib/utils";

/** Rounded, soft-shadowed surface used across the platform. */
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card text-card-foreground shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
