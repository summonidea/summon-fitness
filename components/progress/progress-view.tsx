"use client";

import { NeedsProfile } from "@/components/needs-profile";
import { useAppState } from "@/components/providers/app-state-provider";
import { SectionCard } from "@/components/section-card";
import { Metric, Pill } from "@/components/ui/primitives";
import {
  getCurrentStreak,
  findWorkoutDay,
  getReadinessTrend,
  getSkillConfidenceSummary,
  getWeeklyCompletion
} from "@/lib/training";
import { average, formatLongDate } from "@/lib/utils";

const Sparkline = ({ values, color }: { values: number[]; color: string }) => {
  if (!values.length) {
    return <div className="rounded-[20px] bg-slate-100 p-5 text-sm text-slate-500">No trend data yet.</div>;
  }

  const width = 240;
  const height = 80;
  const max = Math.max(...values, 1);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - (value / max) * (height - 10) - 5;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-24 w-full overflow-visible">
      <polyline points={points} className="chart-line" style={{ color }} />
      {points.split(" ").map((point) => {
        const [cx, cy] = point.split(",");
        return <circle key={point} cx={cx} cy={cy} fill={color} r="4" />;
      })}
    </svg>
  );
};

export const ProgressView = () => {
  const { hydrated, progressEntries, userProfile, videoReviews, workoutStatuses } = useAppState();

  if (!hydrated) {
    return <div className="rounded-[32px] bg-white/70 p-6 shadow-soft">Loading progress...</div>;
  }

  if (!userProfile) {
    return <NeedsProfile />;
  }

  const weeklyCompletion = getWeeklyCompletion(workoutStatuses);
  const streak = getCurrentStreak(workoutStatuses);
  const confidence = getSkillConfidenceSummary(progressEntries);
  const readinessTrend = getReadinessTrend(progressEntries);
  const averageEffort = average(progressEntries.map((entry) => entry.effortRating));
  const baselineConfidence = progressEntries[0]
    ? average(Object.values(progressEntries[0].confidenceRatings))
    : 0;
  const recentConfidence = progressEntries[progressEntries.length - 1]
    ? average(Object.values(progressEntries[progressEntries.length - 1].confidenceRatings))
    : 0;

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Completed workouts" value={workoutStatuses.filter((entry) => entry.status === "completed").length} />
        <Metric label="Current streak" value={`${streak} day${streak === 1 ? "" : "s"}`} />
        <Metric label="Average effort" value={progressEntries.length ? `${averageEffort.toFixed(1)}/10` : "0"} />
        <Metric label="Video reviews" value={videoReviews.length} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard eyebrow="Completion" title="Weekly consistency">
          <div className="grid gap-3">
            {weeklyCompletion.map((item) => (
              <div key={item.label} className="rounded-[22px] bg-white/65 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{item.label}</span>
                  <span className="text-slate-500">{item.total} completed</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(item.total * 20, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Confidence" title="Baseline vs recent">
          <div className="grid gap-4">
            <div className="rounded-[24px] bg-white/65 p-4">
              <p className="text-sm font-semibold text-ink">Early confidence</p>
              <p className="mt-2 text-3xl font-semibold text-ink">{baselineConfidence ? baselineConfidence.toFixed(1) : "0.0"}</p>
            </div>
            <div className="rounded-[24px] bg-ink p-4 text-white">
              <p className="text-sm font-semibold text-white/80">Latest confidence</p>
              <p className="mt-2 text-3xl font-semibold">{recentConfidence ? recentConfidence.toFixed(1) : "0.0"}</p>
            </div>
            <p className="text-sm text-slate-600">
              Use this as a practical week 1 to week 4 comparison once you have several logs.
            </p>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard eyebrow="Trend" title="Readiness over time">
          <Sparkline values={readinessTrend.map((item) => item.readiness)} color="#0f766e" />
          <div className="mt-4 flex flex-wrap gap-2">
            {readinessTrend.map((item) => (
              <Pill key={item.label}>{item.label}</Pill>
            ))}
          </div>
        </SectionCard>
        <SectionCard eyebrow="Trend" title="Effort over time">
          <Sparkline values={readinessTrend.map((item) => item.effort)} color="#d9480f" />
          <div className="mt-4 flex flex-wrap gap-2">
            {readinessTrend.map((item) => (
              <Pill key={`${item.label}-effort`}>{item.label}</Pill>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard eyebrow="Skill ratings" title="Average confidence by shot">
        <div className="grid gap-3">
          {confidence.map((item) => (
            <div key={item.skill} className="grid gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium capitalize text-ink">{item.skill.replace(/([A-Z])/g, " $1")}</span>
                <span className="text-slate-500">{item.value.toFixed(1)} / 5</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-ink" style={{ width: `${(item.value / 5) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard eyebrow="Workout history" title="Recent logs">
          {progressEntries.length ? (
            <div className="grid gap-3">
              {progressEntries
                .slice()
                .reverse()
                .slice(0, 6)
                .map((entry) => (
                  <div key={`${entry.date}-${entry.workoutId}`} className="rounded-[24px] bg-white/65 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-ink">
                        {findWorkoutDay(entry.workoutId)?.title ?? entry.workoutId}
                      </p>
                      <Pill>{formatLongDate(entry.date)}</Pill>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{entry.notes || "No notes added."}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                      Effort {entry.effortRating}/10, readiness {entry.readinessScore ?? 0}/10
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">Finish a workout and save the log to start seeing history here.</p>
          )}
        </SectionCard>

        <SectionCard eyebrow="Video review" title="Recent review history">
          {videoReviews.length ? (
            <div className="grid gap-3">
              {videoReviews
                .slice()
                .reverse()
                .slice(0, 6)
                .map((review, index) => (
                  <div key={`${review.skillId}-${review.date}-${index}`} className="rounded-[24px] bg-white/65 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold capitalize text-ink">{review.skillId.replace("-", " ")}</p>
                      <Pill>{review.angle}</Pill>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{review.notes}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{formatLongDate(review.date)}</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">Save video review notes from any technique page to build history.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
};
