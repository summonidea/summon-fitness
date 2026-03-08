"use client";

import { useEffect, useState } from "react";
import { Button, Meter, Pill } from "@/components/ui/primitives";
import { formatSeconds } from "@/lib/utils";
import type { Exercise } from "@/types/training";

export const SessionRunner = ({
  exercises,
  completedIds,
  currentExerciseId,
  onSelectExercise,
  onToggleComplete
}: {
  exercises: Exercise[];
  completedIds: string[];
  currentExerciseId?: string;
  onSelectExercise: (exerciseId: string) => void;
  onToggleComplete: (exerciseId: string) => void;
}) => {
  const fallbackExercise = exercises.find((exercise) => !completedIds.includes(exercise.id)) ?? exercises[0];
  const currentExercise = exercises.find((exercise) => exercise.id === currentExerciseId) ?? fallbackExercise;
  const defaultSeconds = currentExercise?.durationSeconds ?? currentExercise?.restSeconds ?? 30;
  const [secondsRemaining, setSecondsRemaining] = useState(defaultSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSecondsRemaining(defaultSeconds);
    setRunning(false);
  }, [defaultSeconds, currentExercise?.id]);

  useEffect(() => {
    if (!running || secondsRemaining <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, secondsRemaining]);

  const completedCount = exercises.filter((exercise) => completedIds.includes(exercise.id)).length;

  if (!currentExercise) {
    return null;
  }

  return (
    <div className="sticky bottom-[5.5rem] z-30 rounded-[28px] border border-white/70 bg-[rgba(255,255,255,0.92)] p-4 shadow-soft backdrop-blur md:bottom-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Workout mode</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">{currentExercise.name}</h2>
          <p className="text-sm text-slate-600">
            {currentExercise.reps ?? formatSeconds(currentExercise.durationSeconds) ?? "Technique block"}
          </p>
        </div>
        <Pill active>{formatSeconds(secondsRemaining) ?? "Ready"}</Pill>
      </div>

      <div className="mt-4">
        <Meter value={completedCount} total={exercises.length} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={() => setRunning((current) => !current)}>
          {running ? "Pause timer" : "Start timer"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => setSecondsRemaining(defaultSeconds)}>
          Reset timer
        </Button>
        <Button type="button" variant="secondary" onClick={() => onToggleComplete(currentExercise.id)}>
          {completedIds.includes(currentExercise.id) ? "Undo exercise" : "Complete exercise"}
        </Button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            type="button"
            onClick={() => onSelectExercise(exercise.id)}
            className={`rounded-full px-3 py-2 text-xs font-medium transition ${
              currentExercise.id === exercise.id
                ? "bg-ink text-white"
                : completedIds.includes(exercise.id)
                  ? "bg-accent/10 text-accent"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {exercise.name}
          </button>
        ))}
      </div>
    </div>
  );
};
