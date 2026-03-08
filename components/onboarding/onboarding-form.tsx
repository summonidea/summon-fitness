"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { equipmentOptions, fitnessLevels, goalOptions, recommendPlan } from "@/data/training-data";
import { useAppState } from "@/components/providers/app-state-provider";
import { SectionCard } from "@/components/section-card";
import { Button, Pill } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export const OnboardingForm = () => {
  const router = useRouter();
  const { userProfile, saveAssessment } = useAppState();
  const [isPending, startTransition] = useTransition();
  const [playDaysPerWeek, setPlayDaysPerWeek] = useState(userProfile?.playDaysPerWeek ?? 2);
  const [availableTrainingDays, setAvailableTrainingDays] = useState(userProfile?.availableTrainingDays ?? 4);
  const [fitnessLevel, setFitnessLevel] = useState<typeof fitnessLevels[number]>(userProfile?.fitnessLevel ?? "intermediate");
  const [equipment, setEquipment] = useState<string[]>(userProfile?.equipment ?? ["bodyweight only"]);
  const [goals, setGoals] = useState<string[]>(userProfile?.goals ?? ["footwork", "technique", "speed"]);
  const previewRecommendation = recommendPlan({
    availableTrainingDays,
    playDaysPerWeek,
    goals
  });

  const toggleMultiValue = (value: string, current: string[], setState: (next: string[]) => void) => {
    setState(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const handleSubmit = () => {
    startTransition(() => {
      saveAssessment({
        playDaysPerWeek,
        availableTrainingDays,
        fitnessLevel,
        equipment,
        goals
      });
      router.push("/");
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
      <SectionCard
        eyebrow="Assessment"
        title="Build your home pickleball training plan"
        className="overflow-hidden"
      >
        <div className="grid gap-5">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">How many days per week do you currently play?</label>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 7 }).map((_, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPlayDaysPerWeek(value)}
                    className={cn(
                      "min-h-11 rounded-full px-4 text-sm font-medium transition",
                      playDaysPerWeek === value ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">How many days are available for training at home?</label>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 7 }).map((_, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAvailableTrainingDays(value)}
                    className={cn(
                      "min-h-11 rounded-full px-4 text-sm font-medium transition",
                      availableTrainingDays === value ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Current fitness level</label>
            <div className="flex flex-wrap gap-2">
              {fitnessLevels.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFitnessLevel(value)}
                  className={cn(
                    "min-h-11 rounded-full px-4 text-sm font-medium capitalize transition",
                    fitnessLevel === value ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Available equipment</label>
            <div className="flex flex-wrap gap-2">
              {equipmentOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleMultiValue(item, equipment, setEquipment)}
                  className={cn(
                    "min-h-11 rounded-full px-4 text-sm font-medium transition",
                    equipment.includes(item) ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Primary goals</label>
            <div className="flex flex-wrap gap-2">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleMultiValue(goal, goals, setGoals)}
                  className={cn(
                    "min-h-11 rounded-full px-4 text-sm font-medium capitalize transition",
                    goals.includes(goal) ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                  )}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={goals.length === 0 || equipment.length === 0 || isPending}>
            {isPending ? "Saving..." : "Generate my plan"}
          </Button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="Recommendation" title="What the app will optimize">
        <div className="grid gap-4">
          <div className="rounded-[24px] bg-ink p-5 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Plan output</p>
            <p className="mt-2 text-2xl font-semibold">
              {previewRecommendation.recommendedPlan === "full-5-day"
                ? "Full 5-day"
                : previewRecommendation.recommendedPlan === "condensed-3-day"
                  ? "Condensed 3-day"
                  : previewRecommendation.recommendedPlan === "hybrid"
                    ? "Hybrid"
                    : "Personalized"}
            </p>
            <p className="mt-3 text-sm text-white/80">
              {previewRecommendation.rationale}
            </p>
          </div>
          <div className="rounded-[24px] bg-white/60 p-4">
            <p className="text-sm font-semibold text-ink">What you will get</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>Power</Pill>
              <Pill>Footwork</Pill>
              <Pill>Rotation</Pill>
              <Pill>Balance</Pill>
              <Pill>Technique</Pill>
              <Pill>Recovery</Pill>
            </div>
          </div>
          <ul className="grid gap-3 text-sm text-slate-600">
            <li>Each session is designed for home practice with minimal equipment.</li>
            <li>Workout mode includes interval timing, tap-to-complete progress, and quick confidence logging.</li>
            <li>Technique pages include wall options, shadow options, and self-review prompts for front and side video.</li>
          </ul>
        </div>
      </SectionCard>
    </div>
  );
};
