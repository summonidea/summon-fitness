"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { cn } from "@/lib/utils";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isOnboarding = pathname.startsWith("/onboarding");

  return (
    <div className="min-h-screen pb-24 text-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(217,72,15,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(15,118,110,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-8 pt-4 md:px-6">
        <header className="mb-5">
          <div className="flex items-center justify-between gap-4 rounded-[30px] border border-white/60 bg-white/72 px-4 py-3 shadow-soft backdrop-blur">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-bold text-white">
                SP
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Pickleball home lab</p>
                <p className="text-base font-semibold">Summon Fitness</p>
              </div>
            </Link>
            <div
              className={cn(
                "hidden rounded-full border px-3 py-1 text-xs font-medium md:block",
                pathname === "/"
                  ? "border-accent/20 bg-accent/10 text-accent"
                  : "border-white/60 bg-white/60 text-slate-600"
              )}
            >
              {isOnboarding ? "Assessment" : "Minimal-equipment training"}
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
      {isOnboarding ? null : <BottomNav />}
    </div>
  );
};
