import React, { useState } from 'react';
import { Sparkles, Palette, Volume2, X, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import ChibiMascot3D, { playMascotSound } from './ChibiMascot3D';
import { MASCOT_SPECIES } from './MascotStudioPanel';

export default function FloatingMascotWidget({
  mascotConfig,
  setMascotConfig,
  onOpenStudio
}) {
  const [speech, setSpeech] = useState("Merhaba! Ben senin 3D sevimli dostunum! 🐾");
  const [isMinimized, setIsMinimized] = useState(false);

  if (!mascotConfig.isVisible) return null;

  const currentSpecies = MASCOT_SPECIES.find(s => s.id === mascotConfig.animal) || MASCOT_SPECIES[0];

  const speechLines = {
    kedi: [
      "Miyav! Şekilleri ve renkleri keşfedelim mi? 🔴🔺",
      "Mırrr... Harika bir soru çözücüsün! 💖",
      "Miyav! Masal dinlemeyi çok severim! 📖"
    ],
    kopek: [
      "Hav hav! Harika gidiyorsun şampiyon! 🦴",
      "Hav hav! Sayıları birlikte sayalım mı? 🔢",
      "Kuyruğumu sallıyorum çünkü seni çok sevdim! 🐶"
    ],
    tavsan: [
      "Zıp zıp! Havuç toplamaya hazır mısın? 🥕",
      "Hoppala! Üçgenin 3 köşesi vardır! 🔺",
      "Zıp zıp! Çok akıllısın! 🌟"
    ],
    panda: [
      "Bambu zamanı! Çok tatlısın! 🎋",
      "Tonton panda sana kocaman sarılıyor! 🐼",
      "Daire yuvarlaktır, köşesi yoktur! 🔴"
    ],
    kus: [
      "Cik cik! Bilgi göklerde uçar! 🪶",
      "Cik cik! Renkler ne kadar güzel! 🌈",
      "Şarkı söyleyelim mi? 🎵"
    ],
    kaplumbaga: [
      "Yavaş ama emin adımlarla zafere! 🐢",
      "Tosbik bilge diyor ki: Düzenli çalışan kazanır! 🌿",
      "Kabuğum sağlam, zihnim açık! 🛡️"
    ],
    anime: [
      "Yıldız tozu seninle olsun! Başaracaksın! ⭐",
      "Sihirli soru avcısı devrede! ✨",
      "Harika odaklandın, devam et! 🚀"
    ]
  };

  const handleMascotClick = () => {
    playMascotSound('click', mascotConfig.animal);
    const pool = speechLines[mascotConfig.animal] || speechLines.kedi;
    const randomSpeech = pool[Math.floor(Math.random() * pool.length)];
    setSpeech(randomSpeech);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-auto select-none transition-all duration-300">
      
      {/* Interactive Speech Bubble */}
      {!isMinimized && (
        <div className="relative mb-2 ml-4 animate-bounce-slow">
          <div className="bg-white text-slate-900 border-2 border-pink-400 font-extrabold text-xs px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 max-w-[260px]">
            <span className="text-base">{currentSpecies.icon}</span>
            <span className="text-slate-800 leading-tight">{speech}</span>
            {/* Bubble Tail */}
            <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-white border-r-2 border-b-2 border-pink-400 rotate-45" />
          </div>
        </div>
      )}

      {/* Mascot Card Island */}
      <div className="glass-panel p-2.5 rounded-3xl border-2 border-pink-400/40 shadow-2xl flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl">
        
        {/* 3D Canvas Box (Compact Size so menus are completely free) */}
        <div 
          onClick={handleMascotClick}
          className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-pink-500/20 via-purple-500/15 to-amber-500/20 border border-white/20 flex items-center justify-center cursor-pointer overflow-hidden group hover:scale-105 active:scale-95 transition"
          title="Bana tıkla sevimli ses çıkarayım! 🐾"
        >
          <ChibiMascot3D
            animal={mascotConfig.animal}
            colorHex={mascotConfig.colorHex}
            scale={mascotConfig.scale}
            onMascotClick={handleMascotClick}
          />

          <span className="absolute bottom-1 bg-slate-950/80 text-white font-black text-[9px] px-1.5 py-0.2 rounded-full border border-white/10 opacity-80 group-hover:opacity-100">
            Tıkla 🐾
          </span>
        </div>

        {/* Mascot Info & Actions */}
        <div className="flex flex-col justify-between pr-2 py-0.5 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black text-white flex items-center gap-1">
                <span>{currentSpecies.name}</span>
              </div>
              <div className="text-[10px] text-pink-300 font-semibold">
                3D Eğitim Yoldaşı
              </div>
            </div>

            <button
              onClick={() => setMascotConfig(prev => ({ ...prev, isVisible: false }))}
              className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
              title="Maskotu Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenStudio}
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-extrabold text-[10px] flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition"
            >
              <Palette className="w-3 h-3" />
              <span>Maskotu Değiştir</span>
            </button>

            <button
              onClick={handleMascotClick}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition"
              title="Ses Çıkar"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
