import { skillIds } from "@/data/training-data";
import { TechniqueDetailView } from "@/components/technique/technique-detail-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return skillIds.map((skillId) => ({ skillId }));
}

export default async function TechniqueDetailPage({ params }: { params: Promise<{ skillId: string }> }) {
  const { skillId } = await params;
  return <TechniqueDetailView skillId={skillId} />;
}
