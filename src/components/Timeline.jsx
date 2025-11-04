import React from 'react';
import { Scissors } from 'lucide-react';

export default function Timeline({ duration = 0, start = 0, end = 0, onChange }) {
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const safeStart = Math.min(Math.max(0, start), safeDuration);
  const safeEnd = Math.min(Math.max(safeStart, end || safeDuration), safeDuration);

  const updateStart = (val) => onChange?.({ start: val, end: Math.max(val, safeEnd) });
  const updateEnd = (val) => onChange?.({ start: Math.min(val, safeStart), end: val });

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2 text-slate-600">
        <Scissors className="h-4 w-4" />
        <span className="text-sm font-medium">Trim</span>
        <span className="ml-auto text-xs text-slate-500">
          {safeStart.toFixed(1)}s – {safeEnd.toFixed(1)}s of {safeDuration.toFixed(1)}s
        </span>
      </div>
      {safeDuration > 0 ? (
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={safeDuration}
            step={0.1}
            value={safeStart}
            onChange={(e) => updateStart(parseFloat(e.target.value))}
            className="range w-full"
          />
          <input
            type="range"
            min={0}
            max={safeDuration}
            step={0.1}
            value={safeEnd}
            onChange={(e) => updateEnd(parseFloat(e.target.value))}
            className="range w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Start</span>
            <span>End</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-sm text-slate-400">Load a video to adjust the timeline</div>
      )}
    </div>
  );
}
