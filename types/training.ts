export type Category = "power" | "agility" | "speed" | "technique" | "mobility" | "conditioning" | "recovery";

export interface MediaAsset {
  id: string;
  type: "video" | "animation" | "image-sequence";
  title: string;
  thumbnail: string;
  url?: string;
  durationLabel?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: Category;
  description: string;
  instructions: string[];
  sets?: number;
  reps?: string;
  durationSeconds?: number;
  restSeconds?: number;
  cues: string[];
  mistakes: string[];
  equipment: string[];
  regressions: string[];
  progressions: string[];
  media: MediaAsset[];
  tags: string[];
  howItShouldFeel?: string;
  relatedExerciseIds: string[];
  swapOptions: string[];
}

export interface Drill extends Exercise {
  relatedExerciseIds: string[];
}

export interface TechniqueSkill {
  id: string;
  name: string;
  cues: string[];
  commonMistakes: string[];
  drills: string[];
  media: MediaAsset[];
  selfCheckpoints: string[];
  shadowSuggestions: string[];
  wallSuggestions: string[];
  recordChecklistFront: string[];
  recordChecklistSide: string[];
}

export interface WorkoutBlock {
  id: string;
  title: string;
  focus: string;
  rounds?: number;
  notes?: string;
  exerciseIds: string[];
}

export interface WorkoutDay {
  id: string;
  dayNumber: number;
  title: string;
  focus: string;
  notes?: string;
  warmupIds: string[];
  blocks: WorkoutBlock[];
  techniqueIds: string[];
  recoveryIds: string[];
  estimatedMinutes: number;
}

export interface WeeklyPlan {
  id: string;
  name: string;
  format: "full-5day" | "condensed-3day" | "hybrid";
  weekNumber: number;
  progressionTheme: string;
  weeklyFocus: string;
  days: WorkoutDay[];
}

export interface ActiveWorkoutState {
  workoutId: string;
  completedExerciseIds: string[];
  currentExerciseId?: string;
  startedAt: string;
}

export interface UserProfile {
  id: string;
  playDaysPerWeek: number;
  availableTrainingDays: number;
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  equipment: string[];
  goals: string[];
  recommendedPlanId: string;
  createdAt: string;
}

export type DayStatus = "completed" | "skipped" | "modified";

export interface WorkoutStatusEntry {
  workoutId: string;
  date: string;
  status: DayStatus;
  notes?: string;
}

export interface ProgressEntry {
  date: string;
  workoutId: string;
  completedExercises: string[];
  effortRating: number;
  confidenceRatings: Record<string, number>;
  notes: string;
  agilityBenchmark?: string;
  balanceBenchmark?: string;
  powerBenchmark?: string;
  courtPerformanceNote?: string;
  playedPickleballToday?: boolean;
  readinessScore?: number;
  recoveryCheckin?: number;
}

export interface AssessmentResult {
  recommendedPlan: "full-5-day" | "condensed-3-day" | "hybrid";
  rationale: string;
}

export interface TechniqueConfidence {
  date: string;
  forehand: number;
  backhand: number;
  dinks: number;
  volleys: number;
  wideRecovery: number;
  splitStepFootwork: number;
}

export interface VideoReviewEntry {
  date: string;
  skillId: string;
  angle: "front" | "side";
  notes: string;
}
