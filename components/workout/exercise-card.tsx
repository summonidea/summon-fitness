"use client";

import { useState } from "react";
import { categoryMeta, exerciseMap } from "@/data/training-data";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Button, Pill } from "@/components/ui/primitives";
import { cn, formatSeconds } from "@/lib/utils";
import type { Exercise } from "@/types/training";

const pillStyles = {
  power: "border-power/10 bg-power/10 text-power",
  agility: "border-agility/10 bg-agility/10 text-agility",
  speed: "border-speed/10 bg-speed/10 text-speed",
  technique: "border-technique/10 bg-technique/10 text-technique",
  mobility: "border-mobility/10 bg-mobility/10 text-mobility",
  conditioning: "border-conditioning/10 bg-conditioning/10 text-conditioning",
  recovery: "border-mobility/10 bg-mobility/10 text-mobility"
} as const;

export const ExerciseCard = ({
  exercise,
  isComplete,
  isCurrent,
  onComplete,
  onFocus,
  onSwap
}: {
  exercise: Exercise;
  isComplete: boolean;
  isCurrent: boolean;
  onComplete?: () => void;
  onFocus?: () => void;
  onSwap?: (swapId: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const category = categoryMeta[exercise.category] ?? categoryMeta.technique;

  return (
    <article
      className={cn(
        "rounded-[28px] border p-4 shadow-soft transition",
        isCurrent ? "border-ink bg-white" : "border-white/70 bg-white/72",
        isComplete && "ring-2 ring-accent/20"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill className={pillStyles[exercise.category]}>
              {category.label}
            </Pill>
            {isComplete ? <Pill className="border-accent/15 bg-accent/10 text-accent">Done</Pill> : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-ink">{exercise.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{exercise.description}</p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="rounded-full bg-white/80 px-3 py-2 text-xs font-medium text-slate-600"
        >
          {expanded ? "Less" : "Details"}
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[20px] bg-slate-50 p-3 text-sm text-slate-700">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Dose</p>
          <p className="mt-2 font-semibold text-ink">{exercise.sets ? `${exercise.sets} sets` : "Single block"}</p>
          <p>{exercise.reps ?? formatSeconds(exercise.durationSeconds) ?? "As coached"}</p>
        </div>
        <div className="rounded-[20px] bg-slate-50 p-3 text-sm text-slate-700">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Rest</p>
          <p className="mt-2 font-semibold text-ink">{formatSeconds(exercise.restSeconds) ?? "Minimal"}</p>
          <p>{exercise.equipment.length ? exercise.equipment.join(", ") : "Bodyweight / shadow"}</p>
        </div>
        <div className="rounded-[20px] bg-slate-50 p-3 text-sm text-slate-700 sm:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">How it should feel</p>
          <p className="mt-2 font-semibold text-ink">{exercise.howItShouldFeel ?? "Smooth, repeatable, and balanced."}</p>
        </div>
      </div>

      <div className="mt-4">
        <MediaPlaceholder asset={exercise.media[0]} />
      </div>

      {expanded ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] bg-white/80 p-4">
            <p className="text-sm font-semibold text-ink">Instructions</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              {exercise.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-ink">Coaching cues</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              {exercise.cues.map((cue) => (
                <li key={cue}>{cue}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] bg-white/80 p-4">
            <p className="text-sm font-semibold text-ink">Common mistakes</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              {exercise.mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-ink">Regressions / progressions</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              {exercise.regressions.map((item) => (
                <li key={item}>Regression: {item}</li>
              ))}
              {exercise.progressions.map((item) => (
                <li key={item}>Progression: {item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {exercise.swapOptions.length ? (
        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Swap exercise</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {exercise.swapOptions.map((swapId) => (
              <button
                key={swapId}
                type="button"
                onClick={() => onSwap?.(swapId)}
                className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700"
              >
                {exerciseMap[swapId]?.name ?? swapId}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3">
        {onFocus ? (
          <Button type="button" variant="secondary" onClick={onFocus}>
            Focus this exercise
          </Button>
        ) : null}
        {onComplete ? (
          <Button type="button" onClick={onComplete}>
            {isComplete ? "Undo complete" : "Mark complete"}
          </Button>
        ) : null}
      </div>
    </article>
  );
};
