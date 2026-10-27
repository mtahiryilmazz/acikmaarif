import React from 'react';
import { 
  Palette, Sliders, X, Sparkles, Plus, Trash2, 
  RotateCcw, Heart, Smile, Users 
} from 'lucide-react';
import ChibiMascot3D, { playMascotSound } from './ChibiMascot3D';

// Animal configurations & vibrant color varieties
export const MASCOT_SPECIES = [
  { id: 'tavsan', name: 'Pamuk Tavşan', icon: '🐰', emoji: '🥕' },
  { id: 'panda', name: 'Tonton Panda', icon: '🐼', emoji: '🎋' },
  { id: 'kedi', name: 'Minnoş Kedi', icon: '🐱', emoji: '🐾' },
  { id: 'kopek', name: 'Karabaş Köpek', icon: '🐶', emoji: '🦴' },
  { id: 'kus', name: 'Maviş Kuş', icon: '🦜', emoji: '🪶' },
  { id: 'kaplumbaga', name: 'Tosbik Kaplumbağa', icon: '🐢', emoji: '🌿' },
  { id: 'anime', name: 'Anime Yıldızı', icon: '✨', emoji: '⭐' }
];

export const MASCOT_PALETTES = {
  tavsan: [
    { name: 'Pamuk', hex: '#ffffff', tag: 'Kutup Beyazı' },
    { name: 'Kül Grisi', hex: '#94a3b8', tag: 'Gümüşi' },
    { name: 'Fındık', hex: '#a16207', tag: 'Kahve Çıtır' },
    { name: 'Çilek', hex: '#fb7185', tag: 'Tatlı Pembe' }
  ],
  panda: [
    { name: 'Klasik Panda', hex: '#1e293b', tag: 'Siyah & Beyaz' },
    { name: 'Kızıl Panda', hex: '#ea580c', tag: 'Orman Kızılı' },
    { name: 'Buzul Panda', hex: '#38bdf8', tag: 'Gök Mavisi' },
    { name: 'Ametist', hex: '#0284c7', tag: 'Derin Mavi' }
  ],
  kedi: [
    { name: 'Zencefil', hex: '#f59e0b', tag: 'Turuncu Tekir' },
    { name: 'Van Kedisi', hex: '#ffffff', tag: 'Kutup Beyazı' },
    { name: 'Duman', hex: '#64748b', tag: 'Gümüş Gri' },
    { name: 'Gece', hex: '#1e293b', tag: 'Asil Siyah' },
    { name: 'Tarçın', hex: '#b45309', tag: 'Sıcak Kahve' },
    { name: 'Sakura', hex: '#f472b6', tag: 'Şeker Pembe' }
  ],
  kopek: [
    { name: 'Golden', hex: '#eab308', tag: 'Bal Sarısı' },
    { name: 'Çikolata', hex: '#78350f', tag: 'Kahverengi' },
    { name: 'Kar Tanesi', hex: '#f8fafc', tag: 'Bembeyaz' },
    { name: 'Dalmaçyalı', hex: '#334155', tag: 'Koyu Gri' },
    { name: 'Kızıl Bobi', hex: '#ea580c', tag: 'Kızıl Tilki' }
  ],
  kus: [
    { name: 'Cennet Turkuazı', hex: '#06b6d4', tag: 'Turkuaz' },
    { name: 'Muhabbet Yeşili', hex: '#22c55e', tag: 'Fıstık Yeşili' },
    { name: 'Kanarya Sarısı', hex: '#eab308', tag: 'Güneş' },
    { name: 'Flamingo', hex: '#ec4899', tag: 'Pembe' }
  ],
  kaplumbaga: [
    { name: 'Yosun Yeşili', hex: '#16a34a', tag: 'Doğal Yeşil' },
    { name: 'Zümrüt', hex: '#059669', tag: 'Derin Deniz' },
    { name: 'Çöl Tosbiği', hex: '#b45309', tag: 'Toprak' },
    { name: 'Altın Tosbik', hex: '#eab308', tag: 'Parlak Altın' }
  ],
  anime: [
    { name: 'Sakura Pembe', hex: '#f472b6', tag: 'Bahar Büyüsü' },
    { name: 'Gök Mavisi', hex: '#38bdf8', tag: 'Hava Elementi' },
    { name: 'Turkuaz Enerji', hex: '#06b6d4', tag: 'Kristal' },
    { name: 'Altın Savaşçı', hex: '#f59e0b', tag: 'Güneş Işığı' }
  ]
};

export default function MascotStudioPanel({
  mascotConfig,
  setMascotConfig,
  mascots = [],
  setMascots,
  speedMultiplier = 0.8,
  setSpeedMultiplier,
  isOpen,
  onClose
}) {
  const currentPalettes = MASCOT_PALETTES[mascotConfig.animal] || MASCOT_PALETTES.tavsan;

  const handleSelectAnimal = (animalId) => {
    const defaultColor = (MASCOT_PALETTES[animalId] && MASCOT_PALETTES[animalId][0]?.hex) || '#ffffff';
    setMascotConfig(prev => ({
      ...prev,
      animal: animalId,
      colorHex: defaultColor
    }));
    playMascotSound('click', animalId);
  };

  const handleSelectColor = (hex) => {
    setMascotConfig(prev => ({ ...prev, colorHex: hex }));
    playMascotSound('click', mascotConfig.animal);
  };

  // Add currently designed mascot to screen (immediately visible on floor at calm pace)
  const handleAddMascotToScreen = () => {
    const newId = `mascot_${Date.now()}`;
    const newMascot = {
      id: newId,
      animal: mascotConfig.animal,
      colorHex: mascotConfig.colorHex,
      scale: mascotConfig.scale || 0.48,
      x: 15 + Math.random() * 60,
      dir: Math.random() > 0.5 ? 1 : -1,
      speed: 0.04
    };
    if (setMascots) {
      setMascots(prev => [...prev, newMascot]);
    }
    playMascotSound('click', mascotConfig.animal);
  };

  // Remove individual mascot
  const handleRemoveMascot = (id) => {
    if (setMascots) {
      setMascots(prev => prev.filter(m => m.id !== id));
    }
  };

  // Preset: Rabbit & Panda
  const handlePresetRabbitAndPanda = () => {
    if (setMascots) {
      setMascots([
        { id: 'm-tavsan', animal: 'tavsan', colorHex: '#ffffff', scale: 0.48, x: 22, dir: 1, speed: 0.14 },
        { id: 'm-panda', animal: 'panda', colorHex: '#1e293b', scale: 0.48, x: 68, dir: -1, speed: 0.11 }
      ]);
    }
    playMascotSound('click', 'tavsan');
  };

  // Preset: All animals
  const handlePresetAllAnimals = () => {
    if (setMascots) {
      const all = MASCOT_SPECIES.map((spec, idx) => ({
        id: `all_${spec.id}`,
        animal: spec.id,
        colorHex: MASCOT_PALETTES[spec.id][0].hex,
        scale: 0.42,
        x: 8 + idx * 12,
        dir: idx % 2 === 0 ? 1 : -1,
        speed: 0.1 + (idx % 3) * 0.03
      }));
      setMascots(all);
    }
    playMascotSound('click', 'panda');
  };

  // Preset: Clear all
  const handleClearAll = () => {
    if (setMascots) {
      setMascots([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      {/* Slide-out Studio Card */}
      <div className="relative w-full max-w-md h-[92vh] glass-panel bg-slate-900/95 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar animate-slideInRight">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 text-xl">
                🎨
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>3D Maskot Stüdyosu</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    Gezinen Dostlar
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Birden fazla maskot ekle, ekranda özgürce gezinsinler!
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Live 3D Preview Stage */}
          <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-sky-950/60 via-slate-900/70 to-emerald-950/60 border-2 border-white/10 flex items-center justify-center overflow-hidden mb-4 shadow-inner">
            <div className="w-40 h-40">
              <ChibiMascot3D
                animal={mascotConfig.animal}
                colorHex={mascotConfig.colorHex}
                scale={mascotConfig.scale * 1.1}
                onMascotClick={() => playMascotSound('click', mascotConfig.animal)}
              />
            </div>
            
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 pointer-events-none">
              <span className="bg-slate-900/80 px-2 py-0.5 rounded-md border border-white/10 font-bold text-amber-300">
                Tıkla: Ses Çıkarır 🔊
              </span>
              <span className="text-sky-300 font-bold flex items-center gap-1">
                <span>3D Canlı Önizleme</span>
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Primary Action: Add to Screen Button */}
          <button
            id="btn-add-mascot-to-screen"
            onClick={handleAddMascotToScreen}
            className="w-full mb-4 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition transform hover:scale-[1.02] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Bu Maskotu Ekrana Ekle (Gezinsin) ✨</span>
          </button>

          {/* Currently Roaming Mascots on Screen */}
          <div className="mb-5 p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Users className="w-4 h-4 text-sky-400" />
                <span>Ekranda Gezinenler ({mascots.length})</span>
              </div>

              {mascots.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition"
                  title="Tüm maskotları ekrandan temizle"
                >
                  <Trash2 className="w-3 h-3" /> Tümünü Kaldır
                </button>
              )}
            </div>

            {mascots.length === 0 ? (
              <div className="text-[11px] text-slate-400 text-center py-2">
                Şu an ekranda maskot yok. Aşağıdan dilediğin maskotları ekleyebilirsin!
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
                {mascots.map((m) => {
                  const sp = MASCOT_SPECIES.find(s => s.id === m.animal) || MASCOT_SPECIES[0];
                  return (
                    <div
                      key={m.id}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                    >
                      <span>{sp.icon}</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/30"
                        style={{ backgroundColor: m.colorHex }}
                      />
                      <span className="text-[11px] font-medium">{sp.name.split(' ')[0]}</span>
                      <button
                        onClick={() => handleRemoveMascot(m.id)}
                        className="hover:text-rose-400 text-slate-500 ml-0.5"
                        title="Bu maskotu kaldır"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Presets */}
            <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400">Hızlı Paketler:</span>
              <button
                onClick={handlePresetRabbitAndPanda}
                className="px-2 py-1 rounded-lg bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-600/40 text-[10px] font-bold transition"
              >
                🐰 + 🐼 Tavşan & Panda
              </button>
              <button
                onClick={handlePresetAllAnimals}
                className="px-2 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-600/40 text-[10px] font-bold transition"
              >
                🐾 Tüm Hayvanlar (7)
              </button>
            </div>
          </div>

          {/* Animal Species Selection Grid */}
          <div className="space-y-2 mb-4">
            <label className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5">
              <span>1. Sevimli Türünü Seç:</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {MASCOT_SPECIES.map((spec) => {
                const isSelected = mascotConfig.animal === spec.id;
                return (
                  <button
                    key={spec.id}
                    onClick={() => handleSelectAnimal(spec.id)}
                    className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-600/30 to-sky-600/30 border-amber-400 text-white shadow-lg shadow-amber-500/20 scale-105'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-2xl filter drop-shadow">{spec.icon}</span>
                    <span className="text-[11px] font-bold text-center leading-tight">
                      {spec.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Palettes Grid */}
          <div className="space-y-2 mb-4">
            <label className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>2. Renk ve Kürk Çeşidi:</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {currentPalettes.map((pal) => {
                const isSelected = mascotConfig.colorHex.toLowerCase() === pal.hex.toLowerCase();
                return (
                  <button
                    key={pal.name}
                    onClick={() => handleSelectColor(pal.hex)}
                    className={`p-2 rounded-xl border flex items-center gap-2.5 transition text-left ${
                      isSelected
                        ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-white/30 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: pal.hex }}
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold truncate">{pal.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{pal.tag}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size / Scale Slider */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-200">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>3. Boyut:</span>
              </span>
              <span className="text-amber-300 font-bold">
                {mascotConfig.scale <= 0.4 ? 'Çok Minik' : mascotConfig.scale <= 0.55 ? 'Minik & Sevimli' : 'Büyük'}
              </span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/60 p-2 rounded-xl border border-slate-700/60">
              <span className="text-xs font-bold text-slate-400">Minik</span>
              <input
                type="range"
                min="0.35"
                max="0.70"
                step="0.05"
                value={mascotConfig.scale}
                onChange={(e) => setMascotConfig(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-400">Büyük</span>
            </div>
          </div>

          {/* 4. Walking Speed (Yürüme Hızı Ayarı - "çok hızlılar ayar menüsüne bunu da ekle") */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-200">
              <span className="flex items-center gap-1.5">
                <span className="text-sm">⏱️</span>
                <span>4. Maskot Yürüme Hızı:</span>
              </span>
              <span className="text-sky-300 font-bold">
                {speedMultiplier <= 0.35 
                  ? '🐌 Ağır Çekim (Slow-Mo)' 
                  : speedMultiplier <= 0.65 
                    ? '🐢 Çok Sakin' 
                    : speedMultiplier <= 1.1 
                      ? '🐾 Normal' 
                      : '⚡ Canlı'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: '🐌 Ağır Çekim', val: 0.25, desc: 'Ultra Yavaş' },
                { label: '🐢 Çok Sakin', val: 0.5, desc: 'Dinlendirici' },
                { label: '🐾 Normal', val: 0.85, desc: 'Dengeli' },
                { label: '⚡ Canlı', val: 1.3, desc: 'Hareketli' }
              ].map(opt => {
                const isActive = Math.abs(speedMultiplier - opt.val) < 0.15;
                return (
                  <button
                    key={opt.label}
                    onClick={() => {
                      if (setSpeedMultiplier) setSpeedMultiplier(opt.val);
                      playMascotSound('click', mascotConfig.animal);
                    }}
                    className={`p-2 rounded-xl border text-center transition ${
                      isActive
                        ? 'bg-amber-950/80 border-amber-400 text-amber-200 ring-2 ring-amber-400/40 font-extrabold shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-[11px] font-bold leading-tight">{opt.label}</div>
                    <div className="text-[9px] text-slate-400">{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              handlePresetRabbitAndPanda();
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Tavşan & Panda
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-400 hover:to-sky-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition"
          >
            Tamamla ✨
          </button>
        </div>

      </div>
    </div>
  );
}
