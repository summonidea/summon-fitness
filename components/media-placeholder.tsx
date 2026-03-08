import type { MediaAsset } from "@/types/training";

export const MediaPlaceholder = ({ asset }: { asset: MediaAsset }) => (
  <div className="relative overflow-hidden rounded-[24px] border border-white/40 bg-[linear-gradient(140deg,rgba(15,118,110,0.15),rgba(217,72,15,0.08),rgba(37,99,235,0.12))] p-4">
    <div className="absolute inset-0 demo-grid opacity-60" />
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{asset.type}</p>
          <p className="mt-1 text-sm font-semibold text-ink">{asset.title}</p>
        </div>
        <span className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700">
          {asset.durationLabel ?? "Demo"}
        </span>
      </div>
      <div className="mt-6 flex h-28 items-center justify-center rounded-[20px] border border-dashed border-white/70 bg-white/50">
        <div className="demo-figure">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-slate-600">Replace with your own video, GIF, or image sequence later.</p>
        <button className="rounded-full border border-white/70 bg-white/75 px-3 py-1 font-medium text-ink">
          Watch demo
        </button>
      </div>
    </div>
  </div>
);
