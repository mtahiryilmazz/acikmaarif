import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, 
  Sparkles, CheckCircle2, ChevronRight,
  BrainCircuit, Users, BookOpen, Video, Monitor, Radio
} from 'lucide-react';
import Hls from 'hls.js';
import MemoryTechniqueCard from './MemoryTechniqueCard';

// AçıkMaarif Özgür & Açık Kaynak HLS Akış Motoru (Açık Standart HLS/DASH - Teliften Tamamen Muaf)
const HLS_STREAM_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function MultiTeacherPlayer({ topic, onOpenAiCoach }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const playerContainerRef = useRef(null);

  const [selectedTeacherId, setSelectedTeacherId] = useState(topic?.teachers?.[0]?.id || 't_11_1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(136); // 136s for media_720.m3u8
  const [quality, setQuality] = useState('720p');
  const [isMuted, setIsMuted] = useState(false);
  const [playerMode, setPlayerMode] = useState('video'); // 'video' | 'blackboard'
  const [watermarkPos, setWatermarkPos] = useState({ top: '15%', left: '20%' });
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [checkpointAnswer, setCheckpointAnswer] = useState(null);
  const [isHlsSupported, setIsHlsSupported] = useState(true);

  // Initialize HLS.js streaming video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });
      hlsRef.current = hls;

      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsHlsSupported(true);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari HLS support
      video.src = HLS_STREAM_URL;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [playerMode]);

  // Video time & duration event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Trigger in-video checkpoint modal near 45s mark once
      if (Math.abs(video.currentTime - 45) < 0.5 && !showCheckpoint && !checkpointAnswer) {
        video.pause();
        setIsPlaying(false);
        setShowCheckpoint(true);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [showCheckpoint, checkpointAnswer]);

  // Dynamic moving forensic watermark (Open source DRM demonstration)
  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 65 + 15) + '%';
      const left = Math.floor(Math.random() * 65 + 15) + '%';
      setWatermarkPos({ top, left });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (topic?.teachers?.[0]?.id) {
      setSelectedTeacherId(topic.teachers[0].id);
    }
  }, [topic]);

  const activeTeacher = topic?.teachers?.find(t => t.id === selectedTeacherId) || topic?.teachers?.[0] || {
    id: 't_def',
    name: 'Uzman Öğretmen',
    mode: 'İspatlı & Bilimsel',
    quote: 'Kavramsal derinlik ile konuyu kalıcı olarak öğreniyoruz.'
  };

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const targetTime = pos * duration;
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleToggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Topic Header & State Sources Badges */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {topic.subject} · {topic.grade_level === 0 ? 'Okul Öncesi' : `${topic.grade_level}. Sınıf`}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Maarif Modeli: {topic.skill_layer}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
              Kazanım: {topic.sub_outcome_code}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            {topic.summary}
          </p>
        </div>

        {/* State Integrations Tags */}
        <div className="flex flex-wrap md:flex-col gap-1.5 text-right">
          <div className="text-[11px] font-semibold text-slate-400">Resmî Entegrasyonlar:</div>
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
              ✓ OGM 3 Adım
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold">
              ✓ MEBİ Tarama
            </span>
          </div>
        </div>
      </div>

      {/* Preschool Special Shape Banner */}
      {topic.grade_level === 0 && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-500/25 via-emerald-500/20 to-amber-500/25 border-3 border-sky-400/50 shadow-xl flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce">🎨</span>
            <div>
              <h3 className="text-sm md:text-base font-black text-amber-200">
                Minik Kaşifler Dünyası: Dokun, Keşfet, Şekilleri Bul! 🌟
              </h3>
              <p className="text-xs text-sky-200">
                Sevimli 3D dostlarımız ekranda gezinirken sesli masallarla geometrik şekilleri öğreniyoruz!
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-2xl bg-rose-500/30 border-2 border-rose-400 text-white font-extrabold text-xs shadow">
              🔴 Daire
            </span>
            <span className="px-3 py-1 rounded-2xl bg-blue-500/30 border-2 border-blue-400 text-white font-extrabold text-xs shadow">
              🔺 Üçgen
            </span>
            <span className="px-3 py-1 rounded-2xl bg-emerald-500/30 border-2 border-emerald-400 text-white font-extrabold text-xs shadow">
              🟩 Kare
            </span>
            <span className="px-3 py-1 rounded-2xl bg-amber-500/30 border-2 border-amber-400 text-white font-extrabold text-xs shadow">
              ⭐ Yıldız
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Video Player Container (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div 
            ref={playerContainerRef}
            className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between group select-none"
          >
            
            {/* Top Overlay Bar: Stream Engine & Mode Switcher */}
            <div className="absolute top-0 inset-x-0 p-3.5 z-20 flex items-center justify-between bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/60 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-slate-200">Açık HLS Video Akışı</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-sky-400 font-medium">{activeTeacher.mode}</span>
                </div>
              </div>

              {/* Player Mode Switcher (Video vs Smart Blackboard) */}
              <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-700/60 text-[11px]">
                <button
                  onClick={() => setPlayerMode('video')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition ${
                    playerMode === 'video'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="HLS Canlı Video Yayını"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Dersi</span>
                </button>
                <button
                  onClick={() => setPlayerMode('blackboard')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition ${
                    playerMode === 'blackboard'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="İnteraktif Akıllı Tahta & İspat"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Akıllı Tahta</span>
                </button>
              </div>
            </div>

            {/* VIDEO CANVAS / STREAM CONTAINER */}
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
              
              {playerMode === 'video' ? (
                /* 1. Real HTML5 + HLS.js Video Stream */
                <video
                  ref={videoRef}
                  playsInline
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={handleTogglePlay}
                />
              ) : (
                /* 2. Interactive Blackboard Mode */
                <div className="w-full h-full p-8 flex flex-col justify-between relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
                  <div className="my-auto text-center space-y-3 z-10 pt-8">
                    <div className="inline-block p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 shadow-inner">
                      <div className="text-sm font-mono text-indigo-300 mb-1">
                        [Kazanım İspatı & Kavramsal Model]
                      </div>
                      <div className="text-2xl font-extrabold text-amber-300 tracking-wider font-mono">
                        N(t) = N₀ · e^(k · t)  ⟹  ln(N/N₀) = k · t
                      </div>
                      <div className="text-xs text-slate-400 mt-2">
                        Euler Sabiti ile Üstel Büyümenin Doğal Logaritma Bağıntısı
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 italic max-w-md mx-auto">
                      "{activeTeacher.quote}"
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Forensic Watermark (DRM demonstration) */}
              <div 
                className="absolute pointer-events-none transition-all duration-1000 select-none z-20 text-[11px] font-mono font-bold text-white/30 tracking-wider rotate-12"
                style={{ top: watermarkPos.top, left: watermarkPos.left }}
              >
                AÇIKMAARİF · ÖZGÜR LİSANS · ID: USR-8492
              </div>

              {/* Interactive In-Video Question Checkpoint Modal */}
              {showCheckpoint && (
                <div className="absolute inset-4 z-30 glass-panel bg-slate-950/95 border-2 border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between animate-fadeIn shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    İnteraktif Video Durak Sorusu (Pekiştirme)
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-semibold text-white">
                      {'e^(0.4t) = 4'} denkleminde her iki tarafın doğal logaritmasını aldığımızda {'0.4t'} neye eşit olur?
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 mt-3">
                      {['ln 4', '4 / e', '0.4 / ln 2', 'e^4'].map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCheckpointAnswer(opt)}
                          className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all ${
                            checkpointAnswer === opt
                              ? opt === 'ln 4'
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30'
                                : 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-900/80 border-slate-700 hover:border-slate-500 text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400">
                      {checkpointAnswer === 'ln 4' ? '✓ Doğru! +50 XP kazandın.' : 'Cevabını seç ve devam et'}
                    </span>
                    <button
                      onClick={() => {
                        setShowCheckpoint(false);
                        if (videoRef.current) videoRef.current.play();
                      }}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition"
                    >
                      Videoya Devam Et
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Player Controls Bar */}
            <div className="relative z-20 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
              {/* Scrubbing Bar */}
              <div 
                onClick={handleSeek}
                className="relative w-full h-2 bg-slate-800 rounded-full mb-3 cursor-pointer group/bar"
              >
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-75"
                  style={{ width: `${Math.min(100, (currentTime / (duration || 1)) * 100)}%` }}
                />
                {/* Durak Sorusu Marker */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCheckpoint(true);
                  }}
                  title="İnteraktif Soru Durağı (00:45)"
                  className="absolute top-1/2 -translate-y-1/2 left-[33%] w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/30 cursor-pointer animate-pulse"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleTogglePlay}
                    className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition shadow-md shadow-blue-500/25"
                    title={isPlaying ? 'Durdur' : 'Oynat'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <button 
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
                      }
                    }}
                    className="hover:text-white p-1"
                    title="10 saniye geri"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={handleToggleMute}
                    className="hover:text-white p-1"
                    title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowCheckpoint(true)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] font-bold"
                  >
                    Durak Sorusu
                  </button>

                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-slate-300 rounded px-2 py-1 text-xs focus:outline-none"
                  >
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="480p">480p Mobil</option>
                  </select>

                  <button 
                    onClick={handleToggleFullscreen}
                    className="hover:text-white p-1"
                    title="Tam Ekran"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Cognitive Memory Technique Card */}
          <MemoryTechniqueCard topic={topic} onAskAi={onOpenAiCoach} />
        </div>

        {/* Right Sidebar: Multi-Teacher Selector */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Öğrenme & Anlatım Modları
                </h3>
                <p className="text-xs text-slate-400">
                  Farklı pedagojik stillerle aynı kazanımı kavra
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Açık Anlatım
              </span>
            </div>

            <div className="space-y-2.5">
              {topic.teachers?.map((teacher) => {
                const isSelected = teacher.id === selectedTeacherId;
                return (
                  <div
                    key={teacher.id}
                    onClick={() => setSelectedTeacherId(teacher.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500/50 ring-1 ring-blue-500/30 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        {teacher.name}
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {teacher.mode}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 italic">
                      "{teacher.quote}"
                    </p>
                    {isSelected && (
                      <div className="mt-2 text-[10px] text-blue-300 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        Şu anda oynatılıyor (Senkronize Geçiş)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick AI Coach Helper Card */}
          <div className="glass-panel p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900/60 to-purple-950/60 border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
              <BrainCircuit className="w-4 h-4" />
              <span>Anlamadığın bir nokta mı var?</span>
            </div>
            <p className="text-xs text-slate-300">
              Bilge & KANKA Yapay Zekâ Koçu, izlediğin saniyeye ve seçtiğin öğretmenin anlatım tarzına göre anında özel açıklamalar yapar.
            </p>
            <button
              onClick={onOpenAiCoach}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Yapay Zekâ Koçuna Soru Sor</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
