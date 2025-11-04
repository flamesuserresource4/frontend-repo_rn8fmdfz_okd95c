import React, { useState } from 'react';
import VideoUploader from './components/VideoUploader.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import Timeline from './components/Timeline.jsx';
import EditorToolbar from './components/EditorToolbar.jsx';

function App() {
  const [video, setVideo] = useState(null); // { file, url }
  const [duration, setDuration] = useState(0);
  const [range, setRange] = useState({ start: 0, end: 0 });
  const [filter, setFilter] = useState('none');

  const handleSelect = ({ file, url }) => {
    if (video?.url) URL.revokeObjectURL(video.url);
    setVideo({ file, url });
    setDuration(0);
    setRange({ start: 0, end: 0 });
  };

  const handleDuration = (d) => {
    setDuration(d);
    if (!range.end || range.end === 0) {
      setRange({ start: 0, end: d });
    }
  };

  const handleExport = () => {
    if (!video?.file) return;
    // This demo exports the original file; trimming/filters are previewed live.
    const a = document.createElement('a');
    const nameBase = video.file.name.replace(/\.[^/.]+$/, '');
    a.href = video.url;
    a.download = `${nameBase}_clip_${range.start.toFixed(1)}-${range.end.toFixed(1)}s.mp4`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold text-slate-800">Simple Web Video Editor</h1>
          <p className="text-sm text-slate-500">Import, trim, add quick filters, and export a clip — all in your browser.</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl gap-6 p-4 md:grid md:grid-cols-5">
        <div className="md:col-span-3 space-y-4">
          <VideoPlayer
            src={video?.url}
            loopStart={range.start}
            loopEnd={range.end}
            filter={filter}
            onDuration={handleDuration}
          />
          <EditorToolbar
            hasVideo={!!video}
            filter={filter}
            onFilterChange={setFilter}
            onExport={handleExport}
            disabled={!video}
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <VideoUploader onSelect={handleSelect} />
          <Timeline
            duration={duration}
            start={range.start}
            end={range.end}
            onChange={setRange}
          />
          {video && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-700">Clip Settings</p>
              <ul className="mt-2 space-y-1 text-xs text-slate-500">
                <li>Duration: {duration.toFixed(1)}s</li>
                <li>Range: {range.start.toFixed(1)}s → {range.end.toFixed(1)}s</li>
                <li>Filter: {filter}</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-slate-400">
        Built for quick previews — exports the original file with your chosen name.
      </footer>
    </div>
  );
}

export default App;
