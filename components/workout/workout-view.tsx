"use client";

import Link from "next/link";
import { useState } from "react";
import { exerciseMap } from "@/data/training-data";
import { NeedsProfile } from "@/components/needs-profile";
import { useAppState } from "@/components/providers/app-state-provider";
import { SectionCard } from "@/components/section-card";
import { Button, Meter, Pill, buttonClasses } from "@/components/ui/primitives";
import { ExerciseCard } from "@/components/workout/exercise-card";
import { SessionRunner } from "@/components/workout/session-runner";
import { findWorkoutDay, getDayStatus } from "@/lib/training";
import { clamp } from "@/lib/utils";

const ratingSkills = [
  { key: "forehand", label: "Forehand" },
  { key: "backhand", label: "Backhand" },
  { key: "dinks", label: "Dinks" },
  { key: "volleys", label: "Volleys" },
  { key: "wideRecovery", label: "Wide recovery" },
  { key: "splitStepFootwork", label: "Split-step footwork" }
] as const;

export const WorkoutView = ({ dayId }: { dayId: string }) => {
  const {
    activeWorkout,
    clearActiveWorkout,
    dayNotes,
    hydrated,
    planFormat,
    progressEntries,
    saveWorkoutLog,
    selectedWeek,
    setCurrentExercise,
    setDayNote,
    setWorkoutStatus,
    startWorkout,
    toggleExerciseComplete,
    userProfile,
    workoutStatuses
  } = useAppState();
  const [swapMap, setSwapMap] = useState<Record<string, string>>({});
  const [effortRating, setEffortRating] = useState(7);
  const [readinessScore, setReadinessScore] = useState(7);
  const [recoveryCheckin, setRecoveryCheckin] = useState(7);
  const [playedPickleballToday, setPlayedPickleballToday] = useState(false);
  const [notes, setNotes] = useState("");
  const [courtPerformanceNote, setCourtPerformanceNote] = useState("");
  const [agilityBenchmark, setAgilityBenchmark] = useState("");
  const [balanceBenchmark, setBalanceBenchmark] = useState("");
  const [powerBenchmark, setPowerBenchmark] = useState("");
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, number>>({
    forehand: 3,
    backhand: 3,
    dinks: 3,
    volleys: 3,
    wideRecovery: 3,
    splitStepFootwork: 3
  });

  if (!hydrated) {
    return <div className="rounded-[32px] bg-white/70 p-6 shadow-soft">Loading workout...</div>;
  }

  if (!userProfile) {
    return <NeedsProfile />;
  }

  const day = findWorkoutDay(dayId, planFormat, selectedWeek);

  if (!day) {
    return (
      <SectionCard eyebrow="Workout" title="Session not found">
        <p className="text-sm text-slate-600">The requested workout does not exist in the current export.</p>
      </SectionCard>
    );
  }

  const activeForDay = activeWorkout?.workoutId === day.id ? activeWorkout : null;
  const latestWorkoutLog = [...progressEntries].reverse().find((entry) => entry.workoutId === day.id);
  const visibleCompletedIds = activeForDay?.completedExerciseIds ?? latestWorkoutLog?.completedExercises ?? [];
  const mapExercise = (exerciseId: string) => exerciseMap[swapMap[exerciseId] ?? exerciseId];
  const orderedExercises = Array.from(
    new Set(
      [
        ...day.warmupIds,
        ...day.blocks.flatMap((block) => block.exerciseIds),
        ...day.techniqueIds,
        ...day.recoveryIds
      ].flatMap((exerciseId) => {
        const displayExercise = mapExercise(exerciseId);
        return displayExercise ? [displayExercise.id] : [];
      })
    )
  ).map((exerciseId) => exerciseMap[exerciseId]);

  const completion = {
    total: orderedExercises.length,
    completed: orderedExercises.filter((exercise) => visibleCompletedIds.includes(exercise.id)).length
  };
  const status = getDayStatus(day.id, workoutStatuses)?.status;

  const handleSaveLog = () => {
    saveWorkoutLog({
      workoutId: day.id,
      completedExercises: visibleCompletedIds,
      effortRating,
      confidenceRatings,
      notes,
      agilityBenchmark,
      balanceBenchmark,
      powerBenchmark,
      courtPerformanceNote,
      playedPickleballToday,
      readinessScore,
      recoveryCheckin
    });
  };

  const renderExerciseList = (exerciseIds: string[]) =>
    exerciseIds.map((exerciseId) => {
      const displayExercise = mapExercise(exerciseId);

      if (!displayExercise) {
        return null;
      }

      return (
        <ExerciseCard
          key={`${exerciseId}-${displayExercise.id}`}
          exercise={displayExercise}
          isComplete={visibleCompletedIds.includes(displayExercise.id)}
          isCurrent={activeForDay?.currentExerciseId === displayExercise.id}
          onComplete={
            activeForDay
              ? () => {
                  toggleExerciseComplete(displayExercise.id);
                }
              : undefined
          }
          onFocus={
            activeForDay
              ? () => {
                  setCurrentExercise(displayExercise.id);
                }
              : undefined
          }
          onSwap={(swapId) => setSwapMap((current) => ({ ...current, [exerciseId]: swapId }))}
        />
      );
    });

  return (
    <div className="grid gap-4">
      <SectionCard
        eyebrow={`Day ${day.dayNumber}`}
        title={day.title}
        action={<Pill active={status === "completed"}>{status ?? "planned"}</Pill>}
      >
        <div className="grid gap-4 md:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm text-slate-600">{day.focus}</p>
            <p className="mt-2 text-sm text-slate-500">{day.notes}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["completed", "modified", "skipped"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setWorkoutStatus(day.id, item, dayNotes[day.id] ?? "")}
                  className={`rounded-full px-3 py-2 text-xs font-medium capitalize ${
                    status === item ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                  }`}
                >
                  Mark {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-white/70 bg-white/65 p-4">
            <p className="text-sm font-semibold text-ink">Session progress</p>
            <p className="mt-2 text-sm text-slate-600">
              {completion.completed} of {completion.total} exercises complete
            </p>
            <div className="mt-4">
              <Meter value={completion.completed} total={completion.total} />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {activeForDay ? (
                <Button type="button" onClick={() => clearActiveWorkout()}>
                  End workout mode
                </Button>
              ) : (
                <Button type="button" onClick={() => startWorkout(day.id)}>
                  Start workout mode
                </Button>
              )}
              <Link href="/plan" className={buttonClasses("secondary")}>
                Back to plan
              </Link>
            </div>
          </div>
        </div>
      </SectionCard>

      {activeForDay ? (
        <SessionRunner
          exercises={orderedExercises}
          completedIds={activeForDay.completedExerciseIds}
          currentExerciseId={activeForDay.currentExerciseId}
          onSelectExercise={setCurrentExercise}
          onToggleComplete={toggleExerciseComplete}
        />
      ) : null}

      {day.warmupIds.length ? (
        <SectionCard eyebrow="Warm-up" title="Prepare to move">
          <div className="grid gap-4">{renderExerciseList(day.warmupIds)}</div>
        </SectionCard>
      ) : null}

      {day.blocks.map((block) => (
        <SectionCard key={block.id} eyebrow={block.focus} title={block.title}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {block.rounds ? <Pill>{block.rounds} rounds</Pill> : null}
            {block.notes ? <Pill>{block.notes}</Pill> : null}
          </div>
          <div className="grid gap-4">{renderExerciseList(block.exerciseIds)}</div>
        </SectionCard>
      ))}

      {day.techniqueIds.length ? (
        <SectionCard eyebrow="Technique" title="Shot pattern block">
          <div className="grid gap-4">{renderExerciseList(day.techniqueIds)}</div>
        </SectionCard>
      ) : null}

      {day.recoveryIds.length ? (
        <SectionCard eyebrow="Cooldown" title="Recovery and reset">
          <div className="grid gap-4">{renderExerciseList(day.recoveryIds)}</div>
        </SectionCard>
      ) : null}

      <SectionCard eyebrow="Notes" title="Day note">
        <textarea
          value={dayNotes[day.id] ?? ""}
          onChange={(event) => setDayNote(day.id, event.target.value)}
          placeholder="What felt quick, what broke down, what to revisit on court..."
        />
      </SectionCard>

      <SectionCard eyebrow="Post-session log" title="Effort, confidence, and court transfer">
        <div className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Effort", value: effortRating, setter: setEffortRating },
              { label: "Readiness", value: readinessScore, setter: setReadinessScore },
              { label: "Recovery", value: recoveryCheckin, setter: setRecoveryCheckin }
            ].map(({ label, value, setter }) => (
              <div key={String(label)} className="rounded-[24px] bg-white/60 p-4">
                <label className="text-sm font-semibold text-ink">{String(label)}: {value}/10</label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={value}
                  onChange={(event) => setter(clamp(Number(event.target.value), 1, 10))}
                  className="mt-3"
                />
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Technique confidence</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {ratingSkills.map((skill) => (
                <div key={skill.key} className="rounded-[24px] bg-white/60 p-4">
                  <label className="text-sm font-medium text-slate-700">
                    {skill.label}: {confidenceRatings[skill.key]}/5
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={confidenceRatings[skill.key]}
                    onChange={(event) =>
                      setConfidenceRatings((current) => ({
                        ...current,
                        [skill.key]: clamp(Number(event.target.value), 1, 5)
                      }))
                    }
                    className="mt-3"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-slate-700">Agility benchmark note</label>
              <input value={agilityBenchmark} onChange={(event) => setAgilityBenchmark(event.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Balance benchmark note</label>
              <input value={balanceBenchmark} onChange={(event) => setBalanceBenchmark(event.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Power benchmark note</label>
              <input value={powerBenchmark} onChange={(event) => setPowerBenchmark(event.target.value)} />
            </div>
          </div>

          <div className="grid gap-4">
            <label className="inline-flex items-center gap-3 rounded-[24px] bg-white/60 px-4 py-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={playedPickleballToday}
                onChange={(event) => setPlayedPickleballToday(event.target.checked)}
                className="h-4 w-4"
              />
              I played pickleball today
            </label>
            <div>
              <label className="text-sm font-medium text-slate-700">Session notes</label>
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">On-court performance note</label>
              <textarea value={courtPerformanceNote} onChange={(event) => setCourtPerformanceNote(event.target.value)} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleSaveLog}>
              Save workout log
            </Button>
            <Link href="/progress" className={buttonClasses("secondary")}>
              View progress
            </Link>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
