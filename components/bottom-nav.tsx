"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", short: "Home" },
  { href: "/plan", label: "Plan", short: "Plan" },
  { href: "/technique", label: "Technique", short: "Skills" },
  { href: "/library", label: "Library", short: "Library" },
  { href: "/progress", label: "Progress", short: "Progress" }
] as const;

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-[rgba(246,247,243,0.92)] px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-5 gap-2">
        {navItems.map((item) => {
          const active =
            item.href === "/" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition",
                active ? "bg-ink text-white" : "text-slate-500 hover:bg-white/80"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-6 rounded-full transition",
                  active ? "bg-[#7dd3c7]" : "bg-slate-300"
                )}
              />
              <span>{item.short}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
