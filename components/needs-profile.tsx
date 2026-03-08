import Link from "next/link";
import { buttonClasses } from "@/components/ui/primitives";

export const NeedsProfile = () => (
  <div className="rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-soft">
    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Assessment needed</p>
    <h1 className="mt-2 text-2xl font-semibold text-ink">Set your plan before you start training.</h1>
    <p className="mt-3 max-w-xl text-sm text-slate-600">
      The app is static and local-first, so your recommendation, progress, and notes are stored directly in this browser.
    </p>
    <div className="mt-5">
      <Link href="/onboarding" className={buttonClasses()}>
        Start assessment
      </Link>
    </div>
  </div>
);
