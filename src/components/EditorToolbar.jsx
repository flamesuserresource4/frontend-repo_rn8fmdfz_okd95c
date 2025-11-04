import React from 'react';
import { Filter, Music, Type, Download } from 'lucide-react';

export default function EditorToolbar({ hasVideo, filter, onFilterChange, onExport, disabled }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-600" />
        <select
          value={filter}
          onChange={(e) => onFilterChange?.(e.target.value)}
          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700"
          disabled={!hasVideo}
        >
          <option value="none">No Filter</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="contrast">High Contrast</option>
        </select>
      </div>

      <button
        type="button"
        disabled
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400"
        title="Music overlay preview only in this demo"
      >
        <Music className="h-4 w-4" /> Add Music
      </button>

      <button
        type="button"
        disabled
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400"
        title="Text overlay preview only in this demo"
      >
        <Type className="h-4 w-4" /> Add Text
      </button>

      <div className="ml-auto" />

      <button
        type="button"
        onClick={onExport}
        disabled={disabled}
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        <Download className="h-4 w-4" /> Export Clip
      </button>
    </div>
  );
}
