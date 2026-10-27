import React, { useState } from 'react';
import { 
  Headphones, Play, Pause, RotateCcw, RotateCw, 
  Volume2, Sparkles, Clock, Share2, Bookmark 
} from 'lucide-react';

export default function AudioPodcastPlayer({ podcasts }) {
  const [selectedPodId, setSelectedPodId] = useState(podcasts[0]?.id || 'pod_mat_logaritma');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(35);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const activePod = podcasts.find(p => p.id === selectedPodId) || podcasts[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Yolda & Dinlenirken Öğren
            </span>
            <span className="text-xs text-slate-400">
              Yapay Zekâ Destekli Sesli Ders Anlatımları
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Sesli Anlatım & Öğrenci Podcast Ekosistemi
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-300 font-semibold bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl">
            Kulaklık Modu Aktif
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Audio Player Card (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {activePod.subject} · {activePod.speaker}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-white">
              {activePod.title}
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              "{activePod.transcript_preview}"
            </p>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="my-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="h-16 flex items-center justify-center gap-1.5">
              {activePod.waveform_pattern.map((height, idx) => (
                <div
                  key={idx}
                  className={`w-2 rounded-full transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-gradient-to-t from-blue-600 via-indigo-500 to-purple-400' 
                      : 'bg-slate-700'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, (height * (idx % 2 === 0 ? 1.2 : 0.8)))}%` : `${height * 0.4}%`
                  }}
                />
              ))}
            </div>

            {/* Slider Bar */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>04:12</span>
              <input
                type="range"
                value={currentProgress}
                onChange={(e) => setCurrentProgress(e.target.value)}
                className="flex-1 mx-4 accent-blue-500 cursor-pointer"
              />
              <span>{activePod.duration}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-2">
            {/* Speed Selector */}
            <div className="flex items-center gap-1">
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setPlaybackSpeed(s)}
                  className={`px-2 py-1 rounded text-xs font-bold transition ${
                    playbackSpeed === s
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Main Play / Pause */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentProgress(Math.max(0, currentProgress - 10))}
                className="text-slate-300 hover:text-white p-2"
                title="10 saniye geri sar"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-blue-500/30 transition transform hover:scale-105"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <button 
                onClick={() => setCurrentProgress(Math.min(100, currentProgress + 10))}
                className="text-slate-300 hover:text-white p-2"
                title="10 saniye ileri sar"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* Volume indicator */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Volume2 className="w-4 h-4" />
              <span>%100</span>
            </div>
          </div>

        </div>

        {/* Podcast Playlist (Right Col) */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Headphones className="w-4 h-4 text-purple-400" />
            <span>Ders Podcastleri Listesi</span>
          </h3>

          <div className="space-y-3">
            {podcasts.map((pod) => {
              const isSelected = pod.id === selectedPodId;
              return (
                <div
                  key={pod.id}
                  onClick={() => setSelectedPodId(pod.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500 text-purple-300 ring-1 ring-purple-500/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-bold text-purple-400 mb-1">
                    {pod.subject} · {pod.speaker}
                  </div>
                  <div className="text-xs font-bold text-white mb-1.5">
                    {pod.title}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {pod.duration}
                    </span>
                    {isSelected && isPlaying && (
                      <span className="text-emerald-400 font-bold animate-pulse">Oynatılıyor ♫</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
