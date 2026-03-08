import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const SectionCard = ({
  title,
  eyebrow,
  action,
  className,
  children
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) => (
  <section className={cn("rounded-[28px] border border-white/60 bg-white/72 p-5 shadow-soft backdrop-blur", className)}>
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p> : null}
        <h2 className="mt-1 text-lg font-semibold text-ink">{title}</h2>
      </div>
      {action}
    </div>
    {children}
  </section>
);
