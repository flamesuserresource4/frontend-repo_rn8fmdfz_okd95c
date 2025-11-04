import React from 'react';
import { Upload } from 'lucide-react';

export default function VideoUploader({ onSelect }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onSelect({ file, url });
  };

  return (
    <div className="w-full">
      <label
        htmlFor="video-input"
        className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white/60 p-6 text-slate-700 transition hover:border-slate-400 hover:bg-white"
      >
        <Upload className="h-5 w-5" />
        <span className="font-medium">Import Video</span>
        <input
          id="video-input"
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
      <p className="mt-2 text-center text-xs text-slate-500">
        MP4, MOV, or WEBM — processed locally in your browser
      </p>
    </div>
  );
}
