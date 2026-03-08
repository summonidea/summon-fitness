import { exerciseMap, techniqueSkillMap, weeklyPlans } from "@/data/training-data";
import type { Exercise, ProgressEntry, WeeklyPlan, WorkoutDay, WorkoutStatusEntry } from "@/types/training";
import { average } from "@/lib/utils";

export const normalizeRecommendedPlan = (
  value: "full-5-day" | "condensed-3-day" | "hybrid"
): WeeklyPlan["format"] => {
  if (value === "full-5-day") {
    return "full-5day";
  }

  if (value === "condensed-3-day") {
    return "condensed-3day";
  }

  return "hybrid";
};

export const getPlan = (format: WeeklyPlan["format"], weekNumber: number) =>
  weeklyPlans.find((plan) => plan.format === format && plan.weekNumber === weekNumber) ?? weeklyPlans[0];

export const findWorkoutDay = (dayId: string, format?: WeeklyPlan["format"], weekNumber = 1) => {
  if (format) {
    const plan = getPlan(format, weekNumber);
    const matched = plan.days.find((day) => day.id === dayId);

    if (matched) {
      return matched;
    }
  }

  return weeklyPlans.flatMap((plan) => plan.days).find((day) => day.id === dayId);
};

export const getProgramDayNumber = (date = new Date()) => {
  const weekday = date.getDay();
  return weekday === 0 ? 7 : weekday;
};

export const getTodayWorkout = (plan: WeeklyPlan) => {
  const currentDay = getProgramDayNumber();
  const sortedDays = [...plan.days].sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    sortedDays.find((day) => day.dayNumber === currentDay) ??
    sortedDays.find((day) => day.dayNumber > currentDay) ??
    sortedDays[0]
  );
};

export const getWorkoutExercises = (day: WorkoutDay): Exercise[] => {
  const ids = [
    ...day.warmupIds,
    ...day.blocks.flatMap((block) => block.exerciseIds),
    ...day.techniqueIds,
    ...day.recoveryIds
  ];

  return Array.from(new Set(ids)).map((id) => exerciseMap[id]).filter(Boolean);
};

export const getWorkoutCompletion = (day: WorkoutDay, completedExerciseIds: string[]) => {
  const ids = getWorkoutExercises(day).map((exercise) => exercise.id);
  const completed = ids.filter((id) => completedExerciseIds.includes(id)).length;
  return { completed, total: ids.length, percent: ids.length ? Math.round((completed / ids.length) * 100) : 0 };
};

export const getDayStatus = (dayId: string, entries: WorkoutStatusEntry[]) =>
  [...entries].reverse().find((entry) => entry.workoutId === dayId);

export const getCurrentStreak = (entries: WorkoutStatusEntry[]) => {
  const completedDates = new Set(entries.filter((entry) => entry.status === "completed").map((entry) => entry.date));
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const dateKey = cursor.toISOString().slice(0, 10);

    if (!completedDates.has(dateKey)) {
      break;
    }

    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

export const getWeeklyCompletion = (entries: WorkoutStatusEntry[]) => {
  const today = new Date();

  return Array.from({ length: 4 }).map((_, index) => {
    const end = new Date(today);
    end.setDate(today.getDate() - index * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);

    const total = entries.filter((entry) => {
      const value = new Date(entry.date);
      return value >= start && value <= end && entry.status === "completed";
    }).length;

    return {
      label: index === 0 ? "This week" : `${index + 1}w ago`,
      total
    };
  }).reverse();
};

export const getSkillConfidenceSummary = (entries: ProgressEntry[]) => {
  const buckets: Record<string, number[]> = {
    forehand: [],
    backhand: [],
    dinks: [],
    volleys: [],
    wideRecovery: [],
    splitStepFootwork: []
  };

  entries.forEach((entry) => {
    Object.entries(entry.confidenceRatings).forEach(([skill, value]) => {
      if (buckets[skill]) {
        buckets[skill].push(value);
      }
    });
  });

  return Object.entries(buckets).map(([skill, values]) => ({
    skill,
    value: Math.round(average(values) * 10) / 10
  }));
};

export const getReadinessTrend = (entries: ProgressEntry[]) =>
  entries.slice(-6).map((entry) => ({
    label: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    readiness: entry.readinessScore ?? 0,
    effort: entry.effortRating ?? 0
  }));

export const getNextScheduledWorkout = (plan: WeeklyPlan, statuses: WorkoutStatusEntry[]) => {
  const days = [...plan.days].sort((a, b) => a.dayNumber - b.dayNumber);
  const todayNumber = getProgramDayNumber();

  return (
    days.find((day) => day.dayNumber >= todayNumber && getDayStatus(day.id, statuses)?.status !== "completed") ??
    days.find((day) => getDayStatus(day.id, statuses)?.status !== "completed") ??
    days[0]
  );
};

export const getTechniqueSkill = (skillId: string) => techniqueSkillMap[skillId];
