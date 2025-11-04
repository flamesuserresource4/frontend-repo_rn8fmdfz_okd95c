import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function VideoPlayer({ src, loopStart = 0, loopEnd, filter = 'none', onDuration }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      onDuration?.(v.duration || 0);
      // Ensure we start within loop range
      if (loopStart) v.currentTime = loopStart;
    };

    const onTimeUpdate = () => {
      if (loopEnd && v.currentTime > loopEnd) {
        v.currentTime = loopStart || 0;
        v.play();
      }
    };

    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [loopStart, loopEnd, onDuration]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) v.play();
    else v.pause();
  }, [isPlaying]);

  useEffect(() => {
    // Reset playback when source changes
    setIsPlaying(false);
  }, [src]);

  const filterClass = {
    none: '',
    grayscale: 'filter grayscale',
    sepia: 'filter sepia',
    contrast: 'filter contrast-150',
  }[filter] || '';

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
      {src ? (
        <div className="relative">
          <video
            ref={videoRef}
            src={src}
            className={`mx-auto max-h-[420px] w-full ${filterClass}`}
            playsInline
            controls={false}
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="rounded-full bg-white/90 p-2 shadow backdrop-blur transition hover:bg-white"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <span className="rounded-full bg-white/70 px-2 py-1 text-xs text-slate-700">
              Looping {Math.max(0, loopStart).toFixed(1)}s → {(loopEnd || 0).toFixed(1)}s
            </span>
          </div>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-slate-400">
          Select a video to preview
        </div>
      )}
    </div>
  );
}
