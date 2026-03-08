"use client";

import Link from "next/link";
import { techniqueSkills } from "@/data/training-data";
import { NeedsProfile } from "@/components/needs-profile";
import { useAppState } from "@/components/providers/app-state-provider";
import { SectionCard } from "@/components/section-card";
import { Pill, buttonClasses } from "@/components/ui/primitives";

export const TechniqueLibraryView = () => {
  const { hydrated, userProfile } = useAppState();

  if (!hydrated) {
    return <div className="rounded-[32px] bg-white/70 p-6 shadow-soft">Loading technique library...</div>;
  }

  if (!userProfile) {
    return <NeedsProfile />;
  }

  return (
    <div className="grid gap-4">
      <SectionCard eyebrow="Technique library" title="Shot and movement learning">
        <p className="max-w-2xl text-sm text-slate-600">
          Each page includes key cues, mistakes to avoid, wall options, no-wall shadow options, and a checklist for filming yourself from the front and side.
        </p>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {techniqueSkills.map((skill) => (
          <article key={skill.id} className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Skill</p>
                <h2 className="mt-1 text-xl font-semibold text-ink">{skill.name}</h2>
              </div>
              <Pill>{skill.drills.length} drills</Pill>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600">
              {skill.cues.slice(0, 3).map((cue) => (
                <li key={cue}>{cue}</li>
              ))}
            </ul>
            <div className="mt-5">
              <Link href={`/technique/${skill.id}`} className={buttonClasses()}>
                Open skill page
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
