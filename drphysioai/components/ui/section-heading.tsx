import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  center?: boolean;
  className?: string;
}

/** Consistent section header: eyebrow chip + display title + supporting copy. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        center && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
