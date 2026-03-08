"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import { recommendPlan } from "@/data/training-data";
import { getPlan, normalizeRecommendedPlan } from "@/lib/training";
import { isoDate } from "@/lib/utils";
import type {
  ActiveWorkoutState,
  AssessmentResult,
  ProgressEntry,
  UserProfile,
  VideoReviewEntry,
  WeeklyPlan,
  WorkoutStatusEntry
} from "@/types/training";

type AssessmentInput = {
  playDaysPerWeek: number;
  availableTrainingDays: number;
  fitnessLevel: UserProfile["fitnessLevel"];
  equipment: string[];
  goals: string[];
};

type WorkoutLogInput = Omit<ProgressEntry, "date">;

type AppStateShape = {
  hydrated: boolean;
  userProfile: UserProfile | null;
  assessmentResult: AssessmentResult | null;
  planFormat: WeeklyPlan["format"];
  selectedWeek: number;
  selectedPlan: WeeklyPlan;
  progressEntries: ProgressEntry[];
  workoutStatuses: WorkoutStatusEntry[];
  dayNotes: Record<string, string>;
  techniqueNotes: Record<string, string>;
  favoriteExerciseIds: string[];
  videoReviews: VideoReviewEntry[];
  activeWorkout: ActiveWorkoutState | null;
  saveAssessment: (input: AssessmentInput) => void;
  setPlanFormat: (format: WeeklyPlan["format"]) => void;
  setSelectedWeek: (week: number) => void;
  setWorkoutStatus: (workoutId: string, status: WorkoutStatusEntry["status"], notes?: string) => void;
  setDayNote: (workoutId: string, notes: string) => void;
  setTechniqueNote: (skillId: string, notes: string) => void;
  toggleFavoriteExercise: (exerciseId: string) => void;
  addVideoReview: (entry: VideoReviewEntry) => void;
  startWorkout: (workoutId: string) => void;
  setCurrentExercise: (exerciseId: string) => void;
  toggleExerciseComplete: (exerciseId: string) => void;
  clearActiveWorkout: () => void;
  saveWorkoutLog: (entry: WorkoutLogInput) => void;
};

const STORAGE_KEY = "summon-fitness-state";

const AppStateContext = createContext<AppStateShape | null>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [planFormat, setPlanFormat] = useState<WeeklyPlan["format"]>("full-5day");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [workoutStatuses, setWorkoutStatuses] = useState<WorkoutStatusEntry[]>([]);
  const [dayNotes, setDayNotes] = useState<Record<string, string>>({});
  const [techniqueNotes, setTechniqueNotes] = useState<Record<string, string>>({});
  const [favoriteExerciseIds, setFavoriteExerciseIds] = useState<string[]>([]);
  const [videoReviews, setVideoReviews] = useState<VideoReviewEntry[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkoutState | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppStateShape>;

        setUserProfile((parsed.userProfile as UserProfile) ?? null);
        setAssessmentResult((parsed.assessmentResult as AssessmentResult) ?? null);
        setPlanFormat((parsed.planFormat as WeeklyPlan["format"]) ?? "full-5day");
        setSelectedWeek(parsed.selectedWeek ?? 1);
        setProgressEntries((parsed.progressEntries as ProgressEntry[]) ?? []);
        setWorkoutStatuses((parsed.workoutStatuses as WorkoutStatusEntry[]) ?? []);
        setDayNotes(parsed.dayNotes ?? {});
        setTechniqueNotes(parsed.techniqueNotes ?? {});
        setFavoriteExerciseIds(parsed.favoriteExerciseIds ?? []);
        setVideoReviews((parsed.videoReviews as VideoReviewEntry[]) ?? []);
        setActiveWorkout((parsed.activeWorkout as ActiveWorkoutState) ?? null);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        userProfile,
        assessmentResult,
        planFormat,
        selectedWeek,
        progressEntries,
        workoutStatuses,
        dayNotes,
        techniqueNotes,
        favoriteExerciseIds,
        videoReviews,
        activeWorkout
      })
    );
  }, [
    hydrated,
    userProfile,
    assessmentResult,
    planFormat,
    selectedWeek,
    progressEntries,
    workoutStatuses,
    dayNotes,
    techniqueNotes,
    favoriteExerciseIds,
    videoReviews,
    activeWorkout
  ]);

  const selectedPlan = getPlan(planFormat, selectedWeek);

  const saveAssessment = (input: AssessmentInput) => {
    const result = recommendPlan(input);
    const normalizedPlan = normalizeRecommendedPlan(result.recommendedPlan);

    setAssessmentResult(result);
    setPlanFormat(normalizedPlan);
    setSelectedWeek(1);
    setUserProfile({
      id: "local-user",
      playDaysPerWeek: input.playDaysPerWeek,
      availableTrainingDays: input.availableTrainingDays,
      fitnessLevel: input.fitnessLevel,
      equipment: input.equipment,
      goals: input.goals,
      recommendedPlanId: `${normalizedPlan}-week-1`,
      createdAt: new Date().toISOString()
    });
  };

  const setWorkoutStatus = (workoutId: string, status: WorkoutStatusEntry["status"], notes?: string) => {
    const today = isoDate();

    setWorkoutStatuses((current) => {
      const existingIndex = current.findIndex((entry) => entry.workoutId === workoutId && entry.date === today);

      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = { ...next[existingIndex], status, notes };
        return next;
      }

      return [...current, { workoutId, date: today, status, notes }];
    });

    if (typeof notes === "string") {
      setDayNotes((current) => ({ ...current, [workoutId]: notes }));
    }
  };

  const setDayNote = (workoutId: string, notes: string) => {
    setDayNotes((current) => ({ ...current, [workoutId]: notes }));
  };

  const setTechniqueNote = (skillId: string, notes: string) => {
    setTechniqueNotes((current) => ({ ...current, [skillId]: notes }));
  };

  const toggleFavoriteExercise = (exerciseId: string) => {
    setFavoriteExerciseIds((current) =>
      current.includes(exerciseId) ? current.filter((id) => id !== exerciseId) : [...current, exerciseId]
    );
  };

  const addVideoReview = (entry: VideoReviewEntry) => {
    setVideoReviews((current) => [...current, entry]);
  };

  const startWorkout = (workoutId: string) => {
    setActiveWorkout((current) => {
      if (current?.workoutId === workoutId) {
        return current;
      }

      return {
        workoutId,
        completedExerciseIds: [],
        startedAt: new Date().toISOString()
      };
    });
  };

  const setCurrentExercise = (exerciseId: string) => {
    setActiveWorkout((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        currentExerciseId: exerciseId
      };
    });
  };

  const toggleExerciseComplete = (exerciseId: string) => {
    setActiveWorkout((current) => {
      if (!current) {
        return current;
      }

      const completedExerciseIds = current.completedExerciseIds.includes(exerciseId)
        ? current.completedExerciseIds.filter((id) => id !== exerciseId)
        : [...current.completedExerciseIds, exerciseId];

      return {
        ...current,
        completedExerciseIds
      };
    });
  };

  const clearActiveWorkout = () => {
    setActiveWorkout(null);
  };

  const saveWorkoutLog = (entry: WorkoutLogInput) => {
    const fullEntry: ProgressEntry = {
      ...entry,
      date: isoDate()
    };

    setProgressEntries((current) => {
      const existingIndex = current.findIndex(
        (item) => item.workoutId === fullEntry.workoutId && item.date === fullEntry.date
      );

      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = fullEntry;
        return next;
      }

      return [...current, fullEntry];
    });

    setWorkoutStatus(fullEntry.workoutId, "completed", fullEntry.notes);

    setActiveWorkout((current) => (current?.workoutId === fullEntry.workoutId ? null : current));
  };

  return (
    <AppStateContext.Provider
      value={{
        hydrated,
        userProfile,
        assessmentResult,
        planFormat,
        selectedWeek,
        selectedPlan,
        progressEntries,
        workoutStatuses,
        dayNotes,
        techniqueNotes,
        favoriteExerciseIds,
        videoReviews,
        activeWorkout,
        saveAssessment,
        setPlanFormat,
        setSelectedWeek,
        setWorkoutStatus,
        setDayNote,
        setTechniqueNote,
        toggleFavoriteExercise,
        addVideoReview,
        startWorkout,
        setCurrentExercise,
        toggleExerciseComplete,
        clearActiveWorkout,
        saveWorkoutLog
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
};
