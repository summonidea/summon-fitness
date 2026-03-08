"use client";

import { useState } from "react";
import Link from "next/link";
import { exerciseMap } from "@/data/training-data";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { NeedsProfile } from "@/components/needs-profile";
import { useAppState } from "@/components/providers/app-state-provider";
import { SectionCard } from "@/components/section-card";
import { Button, Pill, buttonClasses } from "@/components/ui/primitives";
import { getTechniqueSkill } from "@/lib/training";
import { formatLongDate } from "@/lib/utils";

export const TechniqueDetailView = ({ skillId }: { skillId: string }) => {
  const { addVideoReview, hydrated, techniqueNotes, setTechniqueNote, userProfile, videoReviews } = useAppState();
  const skill = getTechniqueSkill(skillId);
  const [angle, setAngle] = useState<"front" | "side">("front");
  const [reviewNote, setReviewNote] = useState("");

  if (!hydrated) {
    return <div className="rounded-[32px] bg-white/70 p-6 shadow-soft">Loading skill page...</div>;
  }

  if (!userProfile) {
    return <NeedsProfile />;
  }

  if (!skill) {
    return (
      <SectionCard eyebrow="Technique" title="Skill not found">
        <p className="text-sm text-slate-600">This skill is not available in the current export.</p>
      </SectionCard>
    );
  }

  const reviewsForSkill = videoReviews.filter((entry) => entry.skillId === skill.id).reverse();

  return (
    <div className="grid gap-4">
      <SectionCard eyebrow="Technique" title={skill.name}>
        <div className="grid gap-4 md:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm text-slate-600">
              Use this page for quick cue refreshers, wall progressions, self-recording checks, and notes from your own practice.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>Slow-motion concept</Pill>
              <Pill>Front view checklist</Pill>
              <Pill>Side view checklist</Pill>
            </div>
          </div>
          <MediaPlaceholder asset={skill.media[0]} />
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard eyebrow="Keys" title="Primary cues">
          <ul className="grid gap-2 text-sm text-slate-600">
            {skill.cues.map((cue) => (
              <li key={cue}>{cue}</li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard eyebrow="Avoid" title="Common mistakes">
          <ul className="grid gap-2 text-sm text-slate-600">
            {skill.commonMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard eyebrow="Shadow drills" title="No-wall suggestions">
          <ul className="grid gap-3 text-sm text-slate-600">
            {skill.shadowSuggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard eyebrow="Wall drills" title="If you have wall access">
          <ul className="grid gap-3 text-sm text-slate-600">
            {skill.wallSuggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard eyebrow="Drills" title="Recommended drill stack">
        <div className="grid gap-3 md:grid-cols-3">
          {skill.drills.map((drillId) => (
            <div key={drillId} className="rounded-[24px] border border-white/70 bg-white/70 p-4">
              <p className="font-semibold text-ink">{exerciseMap[drillId]?.name ?? drillId}</p>
              <p className="mt-2 text-sm text-slate-600">{exerciseMap[drillId]?.description}</p>
              <div className="mt-4">
                <Link href="/library" className={buttonClasses("secondary")}>
                  Open in library
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard eyebrow="Self-review" title="Checklist">
          <ul className="grid gap-2 text-sm text-slate-600">
            {skill.selfCheckpoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard eyebrow="Record yourself" title="Camera prompts">
          <div className="grid gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">Front view</p>
              <ul className="mt-2 grid gap-2 text-sm text-slate-600">
                {skill.recordChecklistFront.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Side view</p>
              <ul className="mt-2 grid gap-2 text-sm text-slate-600">
                {skill.recordChecklistSide.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard eyebrow="Personal note" title="What to remember next session">
          <textarea
            value={techniqueNotes[skill.id] ?? ""}
            onChange={(event) => setTechniqueNote(skill.id, event.target.value)}
            placeholder="One cue that makes this shot cleaner for you..."
          />
        </SectionCard>
        <SectionCard eyebrow="Video review" title="Log a filmed rep">
          <div className="grid gap-3">
            <div className="flex gap-2">
              {(["front", "side"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAngle(item)}
                  className={`rounded-full px-3 py-2 text-sm font-medium ${angle === item ? "bg-ink text-white" : "bg-white/70 text-slate-700"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <textarea
              value={reviewNote}
              onChange={(event) => setReviewNote(event.target.value)}
              placeholder="What did the video show?"
            />
            <Button
              type="button"
              onClick={() => {
                if (!reviewNote.trim()) {
                  return;
                }

                addVideoReview({
                  skillId: skill.id,
                  angle,
                  notes: reviewNote,
                  date: new Date().toISOString().slice(0, 10)
                });
                setReviewNote("");
              }}
            >
              Save video note
            </Button>
          </div>
        </SectionCard>
      </div>

      <SectionCard eyebrow="History" title="Recent video reviews">
        {reviewsForSkill.length ? (
          <div className="grid gap-3">
            {reviewsForSkill.map((entry, index) => (
              <div key={`${entry.date}-${entry.angle}-${index}`} className="rounded-[24px] bg-white/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-ink">{entry.angle} view</p>
                  <Pill>{formatLongDate(entry.date)}</Pill>
                </div>
                <p className="mt-2 text-sm text-slate-600">{entry.notes}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">No video review notes yet for this skill.</p>
        )}
      </SectionCard>
    </div>
  );
};
