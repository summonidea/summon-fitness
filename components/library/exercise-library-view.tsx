"use client";

import { useState } from "react";
import { exercises } from "@/data/training-data";
import { ExerciseCard } from "@/components/workout/exercise-card";
import { useAppState } from "@/components/providers/app-state-provider";
import { SectionCard } from "@/components/section-card";
import { Button, Pill } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const tags = [
  "power",
  "agility",
  "speed",
  "balance",
  "rotational",
  "footwork",
  "forehand",
  "backhand",
  "dink",
  "volley",
  "technique",
  "conditioning",
  "mobility",
  "recovery"
];

export const ExerciseLibraryView = () => {
  const { favoriteExerciseIds, hydrated, toggleFavoriteExercise } = useAppState();
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [favoriteOnly, setFavoriteOnly] = useState(false);

  if (!hydrated) {
    return <div className="rounded-[32px] bg-white/70 p-6 shadow-soft">Loading drill library...</div>;
  }

  const filteredExercises = exercises.filter((exercise) => {
    const tagMatch = selectedTag === "all" || exercise.tags.includes(selectedTag);
    const equipmentMatch =
      selectedEquipment === "all" ||
      (selectedEquipment === "bodyweight"
        ? exercise.equipment.length === 0 || exercise.equipment.some((item) => item.includes("bodyweight"))
        : exercise.equipment.some((item) => item.includes(selectedEquipment)));
    const favoriteMatch = !favoriteOnly || favoriteExerciseIds.includes(exercise.id);
    return tagMatch && equipmentMatch && favoriteMatch;
  });

  return (
    <div className="grid gap-4">
      <SectionCard eyebrow="Exercise library" title="Drills, swaps, and home training options">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-slate-700">Filter by tag</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["all", ...tags].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    "rounded-full px-3 py-2 text-xs font-medium capitalize transition",
                    selectedTag === tag ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Filter by equipment</p>
            <select value={selectedEquipment} onChange={(event) => setSelectedEquipment(event.target.value)} className="mt-3">
              <option value="all">All equipment</option>
              <option value="bodyweight">Bodyweight</option>
              <option value="band">Resistance band</option>
              <option value="kettlebell">Kettlebell / dumbbell</option>
              <option value="wall">Wall access</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button type="button" variant={favoriteOnly ? "primary" : "secondary"} onClick={() => setFavoriteOnly((current) => !current)}>
              {favoriteOnly ? "Showing favorites" : "Filter favorites"}
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">{filteredExercises.length} exercises match your filters.</p>
          <Pill>{favoriteExerciseIds.length} favorites</Pill>
        </div>
      </SectionCard>

      <div className="grid gap-4">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="grid gap-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => toggleFavoriteExercise(exercise.id)}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-medium transition",
                  favoriteExerciseIds.includes(exercise.id) ? "bg-ink text-white" : "bg-white/70 text-slate-700"
                )}
              >
                {favoriteExerciseIds.includes(exercise.id) ? "Favorited" : "Favorite"}
              </button>
            </div>
            <ExerciseCard exercise={exercise} isComplete={false} isCurrent={false} />
          </div>
        ))}
      </div>
    </div>
  );
};
