import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star, Smile, Sun, Cloud, Music, Volume2 } from 'lucide-react';

// Web Audio API sound generator (Zero external asset dependency)
function playCuteSound(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'meow') {
      // Cute cat meow synthesis
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.4);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'bark') {
      // Friendly puppy bark
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'twinkle') {
      // Magic star chime
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const start = ctx.currentTime + i * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    } else if (type === 'pop') {
      // Balloon pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  } catch (e) {
    // AudioContext might be restricted until user gesture
  }
}

export default function ThemeDecorations({ gradeLevel }) {
  // gradeLevel: 0 (Okul Öncesi), 1..4 (İlkokul), 5..8 (Ortaokul), 9..12 (Lise)
  const isPreschool = gradeLevel === 0;
  const isPrimary = gradeLevel >= 1 && gradeLevel <= 4;

  // Wandering cat position and speech state
  const [catPos, setCatPos] = useState({ x: 20, dir: 1 });
  const [catSpeech, setCatSpeech] = useState("Miyav! Hoş geldin miniğim! 🐾");
  const [activeSpeechAnimal, setActiveSpeechAnimal] = useState(null);

  // Wandering animals loop for preschool
  useEffect(() => {
    if (!isPreschool) return;

    const interval = setInterval(() => {
      setCatPos(prev => {
        let nextX = prev.x + (prev.dir * 4);
        let nextDir = prev.dir;
        if (nextX > 85) {
          nextX = 85;
          nextDir = -1;
        } else if (nextX < 10) {
          nextX = 10;
          nextDir = 1;
        }
        return { x: nextX, dir: nextDir };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPreschool]);

  const handleAnimalClick = (name, sound, msg) => {
    playCuteSound(sound);
    setActiveSpeechAnimal(name);
    setCatSpeech(msg);
    setTimeout(() => setActiveSpeechAnimal(null), 3500);
  };

  // If high school or middle school, render subtle focus glow
  if (!isPreschool && !isPrimary) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>
    );
  }

  // 1. OKUL ÖNCESİ (GRADE 0) - Güneşli Gökyüzü, Uçuşan Kelebekler, Yıldızlar ve Renkli Balonlar (Mor Yok, Daire Balon Yok)
  if (isPreschool) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
        
        {/* Güneş Işıltılı ve Ferah Gökyüzü Atmosferi (Mor Gradient Yok!) */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-amber-300/10 to-emerald-400/10" />

        {/* Ambient Warm Sun in corner */}
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-300/15 to-transparent blur-2xl pointer-events-none" />

        {/* Gentle Floating Balloons, Stars, and Butterflies */}
        <div className="absolute top-16 left-6 animate-bounce" style={{ animationDuration: '4s' }}>
          <span 
            onClick={() => handleAnimalClick('balon', 'pop', 'Pof! Renkli balon havalandı! 🎈')}
            className="text-4xl filter drop-shadow-lg cursor-pointer pointer-events-auto transition transform hover:scale-125 inline-block"
            title="Balona tıkla!"
          >
            🎈
          </span>
        </div>

        <div className="absolute top-28 right-8 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
          <span 
            onClick={() => handleAnimalClick('kelebek', 'twinkle', 'Kelebek neşeyle uçuyor! 🦋')}
            className="text-3xl filter drop-shadow-md cursor-pointer pointer-events-auto transition transform hover:scale-125 inline-block"
            title="Kelebeğe tıkla!"
          >
            🦋
          </span>
        </div>

        <div className="absolute top-1/2 left-4 animate-pulse" style={{ animationDuration: '2.5s' }}>
          <span 
            onClick={() => handleAnimalClick('yildiz', 'twinkle', 'Pırıl pırıl parlayan yıldız! ⭐')}
            className="text-3xl cursor-pointer pointer-events-auto transition transform hover:rotate-45 inline-block"
          >
            ⭐
          </span>
        </div>

        <div className="absolute top-1/3 right-5 animate-bounce" style={{ animationDuration: '5s' }}>
          <span 
            onClick={() => handleAnimalClick('gokkusagi', 'twinkle', 'Renk renk gökkuşağı açtı! 🌈')}
            className="text-4xl cursor-pointer pointer-events-auto transition transform hover:scale-125 inline-block"
          >
            🌈
          </span>
        </div>

        {/* Subtle Floating Paws */}
        <div className="absolute bottom-28 left-12 text-amber-300/30 text-2xl rotate-12">🐾</div>
        <div className="absolute bottom-36 left-24 text-sky-300/30 text-xl -rotate-12">🐾</div>
        <div className="absolute bottom-24 right-20 text-emerald-300/30 text-2xl -rotate-12">🐾</div>
      </div>
    );
  }

  // 2. İLKOKUL (1, 2, 3, 4. SINIF) - Renkli, Sıcak, Eğlenceli ama Sade & Düzenli Tasarım
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* Soft Sky Blue & Sunshine Amber Horizon Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-amber-400/5 to-emerald-500/10" />

      {/* Neat Educational Motifs (Pencil, Book, Rocket, Lightbulb) */}
      <div className="absolute top-20 left-10 opacity-70 animate-pulse-slow">
        <span 
          onClick={() => playCuteSound('twinkle')} 
          className="text-3xl filter drop-shadow cursor-pointer pointer-events-auto hover:scale-125 transition inline-block"
          title="Çalışkan Kalem ✏️"
        >
          ✏️
        </span>
      </div>

      <div className="absolute top-32 right-12 opacity-70">
        <span 
          onClick={() => playCuteSound('twinkle')} 
          className="text-3xl filter drop-shadow cursor-pointer pointer-events-auto hover:scale-125 transition inline-block"
          title="Bilgi Roketi 🚀"
        >
          🚀
        </span>
      </div>

      <div className="absolute top-1/2 left-8 opacity-60">
        <span 
          onClick={() => playCuteSound('pop')} 
          className="text-3xl filter drop-shadow cursor-pointer pointer-events-auto hover:scale-125 transition inline-block"
          title="Kitap Kurdu 📚"
        >
          📚
        </span>
      </div>

      <div className="absolute top-1/3 right-8 opacity-60">
        <span 
          onClick={() => playCuteSound('pop')} 
          className="text-3xl filter drop-shadow cursor-pointer pointer-events-auto hover:scale-125 transition inline-block"
          title="Yaratıcı Fikir 💡"
        >
          💡
        </span>
      </div>

      {/* Gentle Encouraging Bottom Mascot (Bilge Kanka) */}
      <div className="absolute bottom-3 left-6 pointer-events-auto">
        <div 
          onClick={() => playCuteSound('twinkle')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 text-xs font-bold shadow-lg cursor-pointer hover:bg-slate-800 transition"
        >
          <span className="text-xl">🦊</span>
          <span>İlkokul Başarı Kulübü · Harika Gidiyorsun!</span>
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        </div>
      </div>

    </div>
  );
}
