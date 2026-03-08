import { workoutDayIds } from "@/data/training-data";
import { WorkoutView } from "@/components/workout/workout-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return workoutDayIds.map((dayId) => ({ dayId }));
}

export default async function WorkoutPage({ params }: { params: Promise<{ dayId: string }> }) {
  const { dayId } = await params;
  return <WorkoutView dayId={dayId} />;
}
