"use client";

import Link from "next/link";
import { exerciseMap, techniqueSkills } from "@/data/training-data";
import { NeedsProfile } from "@/components/needs-profile";
import { useAppState } from "@/components/providers/app-state-provider";
import { ProgressRing } from "@/components/progress-ring";
import { SectionCard } from "@/components/section-card";
import { Meter, Metric, Pill, buttonClasses } from "@/components/ui/primitives";
import {
  getCurrentStreak,
  getDayStatus,
  getNextScheduledWorkout,
  getTodayWorkout,
  getWeeklyCompletion,
  getWorkoutExercises
} from "@/lib/training";
import { formatLongDate } from "@/lib/utils";

export const DashboardView = () => {
  const { activeWorkout, assessmentResult, hydrated, progressEntries, selectedPlan, selectedWeek, userProfile, workoutStatuses } =
    useAppState();

  if (!hydrated) {
    return <div className="rounded-[32px] bg-white/70 p-6 shadow-soft">Loading your plan...</div>;
  }

  if (!userProfile) {
    return <NeedsProfile />;
  }

  const todayWorkout = getTodayWorkout(selectedPlan);
  const nextWorkout = getNextScheduledWorkout(selectedPlan, workoutStatuses);
  const streak = getCurrentStreak(workoutStatuses);
  const weeklyTotals = getWeeklyCompletion(workoutStatuses);
  const latestWorkoutLog = [...progressEntries].reverse().find((entry) => entry.workoutId === todayWorkout.id);
  const visibleCompletedIds =
    activeWorkout?.workoutId === todayWorkout.id
      ? activeWorkout.completedExerciseIds
      : latestWorkoutLog?.completedExercises ?? [];
  const todayExercises = getWorkoutExercises(todayWorkout);
  const todayCompletion = {
    total: todayExercises.length,
    completed: todayExercises.filter((exercise) => visibleCompletedIds.includes(exercise.id)).length,
    percent: todayExercises.length
      ? Math.round((todayExercises.filter((exercise) => visibleCompletedIds.includes(exercise.id)).length / todayExercises.length) * 100)
      : 0
  };
  const todayExercisePreview = getWorkoutExercises(todayWorkout).slice(0, 4);
  const completedThisWeek = weeklyTotals[weeklyTotals.length - 1]?.total ?? 0;
  const latestLog = progressEntries[progressEntries.length - 1];

  return (
    <div className="grid gap-4">
      <SectionCard
        eyebrow={`Week ${selectedWeek}`}
        title="Today's pickleball session"
        action={<Pill active>{selectedPlan.name}</Pill>}
      >
        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-ink p-5 text-white">
            <p className="text-sm text-white/70">{todayWorkout.focus}</p>
            <h1 className="mt-2 text-3xl font-semibold">{todayWorkout.title}</h1>
            <p className="mt-3 text-sm text-white/80">
              {todayWorkout.notes ?? selectedPlan.progressionTheme}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {todayExercisePreview.map((exercise) => (
                <Pill key={exercise.id} className="border-white/25 bg-white/10 text-white">
                  {exercise.name}
                </Pill>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/workout/${todayWorkout.id}`} className={buttonClasses()}>
                {activeWorkout?.workoutId === todayWorkout.id ? "Resume workout" : "Open workout"}
              </Link>
              <Link href="/technique" className={buttonClasses("secondary")}>
                Technique library
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] bg-white/65 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">Session progress</p>
                <p className="text-sm text-slate-500">{todayCompletion.completed}/{todayCompletion.total}</p>
              </div>
              <div className="mt-5 flex items-center justify-center">
                <ProgressRing value={todayCompletion.percent} label="Current workout" />
              </div>
              <div className="mt-5 text-sm text-slate-600">
                Next up: <span className="font-medium text-ink">{nextWorkout.title}</span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Completion streak" value={`${streak} day${streak === 1 ? "" : "s"}`} hint="Completed workout days in a row" />
        <Metric label="This week" value={`${completedThisWeek} sessions`} hint={`Recommended plan: ${assessmentResult?.recommendedPlan ?? "customized"}`} />
        <Metric
          label="Latest session"
          value={latestLog ? `${latestLog.effortRating}/10 effort` : "No logs yet"}
          hint={latestLog ? formatLongDate(latestLog.date) : "Finish a workout to start your trend line"}
        />
      </div>

      <SectionCard eyebrow="Weekly overview" title="Schedule and status">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {selectedPlan.days.map((day) => {
            const status = getDayStatus(day.id, workoutStatuses)?.status;
            return (
              <Link
                key={day.id}
                href={`/workout/${day.id}`}
                className="rounded-[24px] border border-white/70 bg-white/75 p-4 transition hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Day {day.dayNumber}</p>
                    <p className="mt-1 font-semibold text-ink">{day.title.replace(/^Day \d: /, "")}</p>
                  </div>
                  <Pill
                    className={
                      status === "completed"
                        ? "border-accent/15 bg-accent/10 text-accent"
                        : status === "skipped"
                          ? "border-amber-200 bg-amber-50 text-amber-700"
                          : status === "modified"
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : ""
                    }
                  >
                    {status ?? "planned"}
                  </Pill>
                </div>
                <p className="mt-3 text-sm text-slate-600">{day.focus}</p>
              </Link>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <SectionCard eyebrow="Progress" title="Last 4 weeks">
          <div className="grid gap-3">
            {weeklyTotals.map((week) => (
              <div key={week.label} className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{week.label}</span>
                  <span className="text-slate-500">{week.total} completed</span>
                </div>
                <Meter value={week.total} total={5} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Technique" title="Quick drill access">
          <div className="grid gap-3">
            {techniqueSkills.map((skill) => {
              const firstDrill = skill.drills[0] ? exerciseMap[skill.drills[0]] : null;
              return (
                <Link
                  key={skill.id}
                  href={`/technique/${skill.id}`}
                  className="rounded-[22px] border border-white/70 bg-white/75 p-4 transition hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{skill.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{firstDrill?.name ?? "Open drills"}</p>
                    </div>
                    <span className="text-sm font-medium text-accent">Open</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
