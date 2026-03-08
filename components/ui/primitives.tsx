import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonClasses = (variant: "primary" | "secondary" | "ghost" = "primary", className?: string) =>
  cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
    variant === "primary" &&
      "bg-ink text-white shadow-soft hover:bg-[#0f2222] disabled:bg-slate-300 disabled:text-slate-500",
    variant === "secondary" &&
      "border border-white/50 bg-white/70 text-ink hover:bg-white disabled:border-slate-200 disabled:text-slate-400",
    variant === "ghost" && "bg-transparent text-ink hover:bg-white/60",
    className
  );

export const Button = ({
  className,
  children,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) => (
  <button className={buttonClasses(variant, className)} {...props}>
    {children}
  </button>
);

export const Pill = ({
  className,
  children,
  active
}: HTMLAttributes<HTMLSpanElement> & {
  active?: boolean;
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
      active ? "border-ink bg-ink text-white" : "border-white/50 bg-white/65 text-slate-700",
      className
    )}
  >
    {children}
  </span>
);

export const Metric = ({
  label,
  value,
  hint
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) => (
  <div className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-soft">
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
    {hint ? <p className="mt-1 text-sm text-slate-600">{hint}</p> : null}
  </div>
);

export const Meter = ({
  value,
  total,
  colorClassName = "bg-accent"
}: {
  value: number;
  total: number;
  colorClassName?: string;
}) => {
  const percent = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;

  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
      <div className={cn("h-full rounded-full transition-all", colorClassName)} style={{ width: `${percent}%` }} />
    </div>
  );
};
