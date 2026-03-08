"use client";

import Link from "next/link";
import { NeedsProfile } from "@/components/needs-profile";
import { useAppState } from "@/components/providers/app-state-provider";
import { SectionCard } from "@/components/section-card";
import { Pill, buttonClasses } from "@/components/ui/primitives";
import { getDayStatus } from "@/lib/training";
import { cn } from "@/lib/utils";
import type { WeeklyPlan } from "@/types/training";

const planLabels: Record<WeeklyPlan["format"], string> = {
  "full-5day": "Full 5-day",
  "condensed-3day": "Condensed 3-day",
  hybrid: "Hybrid"
};

const statuses: Array<"completed" | "modified" | "skipped"> = ["completed", "modified", "skipped"];

export const PlanView = () => {
  const {
    dayNotes,
    hydrated,
    planFormat,
    selectedPlan,
    selectedWeek,
    setDayNote,
    setPlanFormat,
    setSelectedWeek,
    setWorkoutStatus,
    userProfile,
    workoutStatuses
  } = useAppState();

  if (!hydrated) {
    return <div className="rounded-[32px] bg-white/70 p-6 shadow-soft">Loading plan...</div>;
  }

  if (!userProfile) {
    return <NeedsProfile />;
  }

  return (
    <div className="grid gap-4">
      <SectionCard eyebrow="Training plan" title="Weekly structure">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-medium text-slate-700">Plan version</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(planLabels) as WeeklyPlan["format"][]).map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setPlanFormat(format)}
                  className={cn(
                    "min-h-11 rounded-full px-4 text-sm font-medium transition",
                    planFormat === format ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                  )}
                >
                  {planLabels[format]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Progression week</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((week) => (
                <button
                  key={week}
                  type="button"
                  onClick={() => setSelectedWeek(week)}
                  className={cn(
                    "min-h-11 rounded-full px-4 text-sm font-medium transition",
                    selectedWeek === week ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                  )}
                >
                  Week {week}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[26px] bg-ink p-5 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Current focus</p>
            <p className="mt-2 text-xl font-semibold">{selectedPlan.name}</p>
            <p className="mt-3 text-sm text-white/80">{selectedPlan.progressionTheme}</p>
          </div>
          <div className="rounded-[26px] bg-white/60 p-5">
            <p className="text-sm font-semibold text-ink">Why this week matters</p>
            <p className="mt-2 text-sm text-slate-600">{selectedPlan.weeklyFocus}</p>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4">
        {selectedPlan.days.map((day) => {
          const status = getDayStatus(day.id, workoutStatuses)?.status;
          return (
            <SectionCard
              key={day.id}
              eyebrow={`Day ${day.dayNumber}`}
              title={day.title.replace(/^Day \d: /, "")}
              action={<Pill active={status === "completed"}>{status ?? "planned"}</Pill>}
            >
              <div className="grid gap-4 md:grid-cols-[1fr_280px]">
                <div>
                  <p className="text-sm text-slate-600">{day.focus}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {statuses.map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => setWorkoutStatus(day.id, state, dayNotes[day.id] ?? "")}
                        className={cn(
                          "rounded-full px-3 py-2 text-xs font-medium capitalize transition",
                          status === state ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                        )}
                      >
                        Mark {state}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor={`${day.id}-notes`}>
                      Notes for this day
                    </label>
                    <textarea
                      id={`${day.id}-notes`}
                      value={dayNotes[day.id] ?? ""}
                      onChange={(event) => setDayNote(day.id, event.target.value)}
                      placeholder="Energy, what felt sharp, what needs work on court..."
                    />
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/70 bg-white/65 p-4">
                  <p className="text-sm font-semibold text-ink">Session snapshot</p>
                  <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                    <li>{day.estimatedMinutes} minutes estimated</li>
                    <li>{day.blocks.length} main training blocks</li>
                    <li>{day.techniqueIds.length} technique drills</li>
                    <li>{day.recoveryIds.length} cooldown or recovery items</li>
                  </ul>
                  <div className="mt-4">
                    <Link href={`/workout/${day.id}`} className={buttonClasses()}>
                      Open workout
                    </Link>
                  </div>
                </div>
              </div>
            </SectionCard>
          );
        })}
      </div>

      <SectionCard eyebrow="Condensed option" title="3-day template at a glance">
        <div className="grid gap-3 md:grid-cols-5">
          {["Warm-up - 5 min", "Power - 8 min", "Footwork - 7 min", "Strength/stability - 5 min", "Technique - 5 min"].map(
            (item) => (
              <div key={item} className="rounded-[24px] bg-white/70 p-4 text-sm font-medium text-slate-700">
                {item}
              </div>
            )
          )}
        </div>
      </SectionCard>
    </div>
  );
};
