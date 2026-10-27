import React, { useState, useEffect } from 'react';
import ChibiMascot3D, { playMascotSound } from './ChibiMascot3D';
import { MASCOT_SPECIES } from './MascotStudioPanel';
import { Palette, X, Sparkles, Wind, Mountain, Rocket, Gauge } from 'lucide-react';

const MASCOT_SPEECHES = {
  tavsan: [
    "Zıp zıp! Havuç toplamaya hazır mısın? 🥕",
    "Hoppala! Üçgenin 3 köşesi vardır! 🔺",
    "Havuç kemiriyorum, enerji topluyorum! 🥕✨",
    "Duvara tırmanıyorum, tepeye çıkacağım! ⛰️",
    "Beyaz paraşütüm açıldı, süzülüyorum! 🎈",
    "Yumuşacık indim! 🌸"
  ],
  panda: [
    "Bambu zamanı! Çok lezzetli! 🎋",
    "Tonton panda sana kocaman sarılıyor! 🐼",
    "Daire yuvarlaktır, hiç köşesi yoktur! 🔴",
    "Zirveye tırmandım, manzara harika! ⛰️",
    "Beyaz paraşütümle gökyüzünden indim! 🎈",
    "Birlikte öğrenmek ne güzel! 🌿"
  ],
  kedi: [
    "Miyav! Şekilleri ve renkleri keşfedelim! 🐾",
    "Pati pati duvara tırmanıyorum! Miyav! ⛰️",
    "Mırrr... Harika bir soru çözücüsün! 💖",
    "Tepeden paraşütle atladım! 🎈",
    "Kelebeği yakalayacağım! 🦋"
  ],
  kopek: [
    "Hav hav! Harika gidiyorsun şampiyon! 🦴",
    "Kuyruğumu sallıyorum, çok mutluyum! 🐕",
    "Kare'nin 4 köşesi ve 4 kenarı var! 🟩",
    "Duvara tırmanıp paraşütle ineceğim! 🎈",
    "Hav hav! Seninle ders çalışmak çok zevkli! 🐶"
  ],
  kus: [
    "Cik cik! Bilgi gökyüzünde uçar! 🕊️✨",
    "Gökyüzünde süzülüyorum, cik cik! ☁️",
    "Cik cik! Şarkı söyleyelim mi? 🎵"
  ],
  kaplumbaga: [
    "Yavaş ama emin adımlarla zirveye! 🐢",
    "Tosbik bilge diyor ki: Merak eden kazanır! 🌿",
    "Zirveye çıktım, beyaz paraşütle süzülüyorum! 🎈",
    "Acele etme, sağlam bas! 🛡️"
  ],
  anime: [
    "Yıldız tozu seninle olsun! Başaracaksın! ✨",
    "Zirveden süzülen sihirli yıldız! 🎈",
    "Tırmanış tamamlandı, şimdi süzülme vakti! ⭐",
    "Harika odaklandın, devam et! 🚀"
  ]
};

// Realistic Plain White Parachute Component
function PlainWhiteParachute({ swayDeg = 0 }) {
  return (
    <div 
      style={{
        transform: `rotate(${swayDeg}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="relative -mb-3 flex flex-col items-center pointer-events-none select-none filter drop-shadow-lg"
    >
      {/* 1. Top Apex Vent Hole (Gerçek paraşüt havalandırma deliği) */}
      <div className="w-4 h-1.5 rounded-full bg-slate-300 border border-slate-400 -mb-0.5 z-10" />

      {/* 2. Düz Beyaz İpek Paraşüt Kubbesi (Clean Plain White Dome with Fabric Paneling) */}
      <div className="relative w-28 h-16 rounded-t-full bg-gradient-to-b from-white via-slate-50 to-slate-200 border-2 border-slate-300 shadow-md flex items-end justify-between px-2 overflow-hidden">
        {/* Subtle fabric gore seams (Gerçek kumaş dilim çizgileri) */}
        <div className="w-px h-full bg-slate-300/60" />
        <div className="w-px h-full bg-slate-300/60" />
        <div className="w-px h-full bg-slate-300/60" />
        <div className="w-px h-full bg-slate-300/60" />
        <div className="w-px h-full bg-slate-300/60" />
        
        {/* Soft fabric highlight */}
        <div className="absolute top-1 inset-x-4 h-3 bg-white/70 rounded-full blur-[1px]" />
      </div>

      {/* 3. Tapered White Shroud Rigging Lines (Askı İpleri) */}
      <svg className="w-28 h-10 -mt-1 text-slate-300 filter drop-shadow-sm" viewBox="0 0 100 40">
        <line x1="6" y1="0" x2="50" y2="40" stroke="currentColor" strokeWidth="1.5" />
        <line x1="26" y1="0" x2="50" y2="40" stroke="currentColor" strokeWidth="1.2" />
        <line x1="50" y1="0" x2="50" y2="40" stroke="currentColor" strokeWidth="1.2" />
        <line x1="74" y1="0" x2="50" y2="40" stroke="currentColor" strokeWidth="1.2" />
        <line x1="94" y1="0" x2="50" y2="40" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// Single Dynamic Mascot Sprite
function WanderingMascotItem({
  mascot,
  onRemove,
  speedMultiplier = 1,
  forceAction
}) {
  const isBird = mascot.animal === 'kus';

  // State: 'walking' | 'climbing' | 'parachuting' | 'jumping' | 'eating' | 'flying'
  const [behavior, setBehavior] = useState(isBird ? 'flying' : 'walking');
  const [posX, setPosX] = useState(mascot.x || 30);
  const [posY, setPosY] = useState(isBird ? 180 : 0); // Bird starts flying in the air, others start on ground!
  const [dir, setDir] = useState(mascot.dir || 1);
  const [swayDeg, setSwayDeg] = useState(0);
  const [speech, setSpeech] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // External action trigger (e.g. Parachute trigger: climb to top then jump down!)
  useEffect(() => {
    if (!forceAction) return;
    if (forceAction.type === 'parachute') {
      if (isBird) {
        // Birds don't need parachutes, they soar in the sky!
        setBehavior('flying');
        setSpeech("Zaten kuşum, göklerde özgürce uçuyorum! 🕊️✨");
        playMascotSound('click', 'kus');
      } else {
        // Land animals climb to the apex then leap with white parachute!
        setBehavior('climbing');
        setPosY(280);
        setSpeech("Zirveye çıktım, paraşütle atlıyorum! 🎈");
        playMascotSound('click', mascot.animal);
      }
    } else if (forceAction.type === 'jump') {
      if (isBird) {
        setSpeech("Kanat çırpıp göklere yükseldim! 🕊️");
      } else {
        setBehavior('jumping');
        setSpeech("Hoppala! Süper zıplayış! 🚀");
      }
      playMascotSound('click', mascot.animal);
    } else if (forceAction.type === 'climb') {
      if (isBird) {
        setSpeech("Ağaçların tepesinde uçuyorum! 🌳");
      } else {
        setBehavior('climbing');
        setSpeech("Duvara tırmanıyorum! ⛰️");
      }
      playMascotSound('click', mascot.animal);
    }
  }, [forceAction, mascot.animal, isBird]);

  // Periodic random autonomous behaviors
  useEffect(() => {
    const timer = setInterval(() => {
      if (isBird) {
        // Bird speech while soaring
        if (Math.random() < 0.4 && !speech) {
          const pool = MASCOT_SPEECHES.kus;
          const line = pool[Math.floor(Math.random() * pool.length)];
          setSpeech(line);
          setTimeout(() => setSpeech(null), 3800);
        }
        return;
      }

      if (behavior !== 'walking') return;

      const dice = Math.random();
      if (dice < 0.20) {
        // High acrobatic hop
        setBehavior('jumping');
      } else if (dice < 0.40) {
        // Munch snack
        setBehavior('eating');
        setTimeout(() => setBehavior('walking'), 3000);
      }

      // Occasional cute speech
      if (Math.random() < 0.35 && !speech) {
        const pool = MASCOT_SPEECHES[mascot.animal] || MASCOT_SPEECHES.tavsan;
        const line = pool[Math.floor(Math.random() * pool.length)];
        setSpeech(line);
        setTimeout(() => setSpeech(null), 3800);
      }
    }, 8000 + Math.random() * 4000);

    return () => clearInterval(timer);
  }, [behavior, mascot.animal, speech, isBird]);

  // Main Motion Physics Loop (Calm, cute, relaxed speed with true Slow-Mo support!)
  useEffect(() => {
    let animId;
    let tick = Math.random() * 100;
    // Base walking speed calibrated to be peaceful
    const baseSpeed = (mascot.speed || 0.035) * speedMultiplier;

    const loop = () => {
      // Scale tick time progression with speedMultiplier so slow-motion slows DOWN everything!
      const deltaTick = 0.016 * Math.max(0.18, speedMultiplier);
      tick += deltaTick;

      // 0. BIRD FLIGHT: Kuş göklerde sakin, zarif ve süzülerek uçar!
      if (isBird) {
        // Yumuşak, dingin yükseklik dalgası (145px - 205px arası sakin salınım)
        const flightY = 175 + Math.sin(tick * 0.6) * 30;
        setPosY(flightY);

        // Uçuş sırasında aerodinamik hafif yatış açısı (titreme yok, yumuşak süzülüş)
        const bankAngle = (dir * 5) + (Math.sin(tick * 0.9) * 3);
        setSwayDeg(bankAngle);

        setPosX(prevX => {
          // Sakin, süzülen yatay hız
          let nextX = prevX + dir * (baseSpeed * 0.42);
          if (nextX >= 88) {
            nextX = 88;
            setDir(-1);
          } else if (nextX <= 5) {
            nextX = 5;
            setDir(1);
          }
          return nextX;
        });

        animId = requestAnimationFrame(loop);
        return;
      }

      // 1. PARACHUTING STATE: Zirveden düz beyaz paraşütle süzülüş
      if (behavior === 'parachuting') {
        setPosY(prevY => {
          // Ağır çekimde ipeksi yumuşak iniş
          const descentStep = 1.1 * Math.max(0.22, speedMultiplier);
          const nextY = prevY - descentStep;
          if (nextY <= 0) {
            // Yere yumuşakça indi! Paraşüt çıkarılır
            setBehavior('walking');
            setSwayDeg(0);
            playMascotSound('click', mascot.animal);
            setSpeech("Yumuşacık indim! 🌸");
            setTimeout(() => setSpeech(null), 3000);
            return 0;
          }
          return nextY;
        });

        // Paraşütün sağa-sola sakin salınımı
        setSwayDeg(Math.sin(tick * 1.5) * 8);

        // Havada hafif rüzgar sürüklenmesi
        setPosX(prevX => {
          const nextX = prevX + (Math.sin(tick * 0.8) * 0.04);
          return Math.max(5, Math.min(88, nextX));
        });
      }

      // 2. CLIMBING STATE: Yan duvardan zirveye tırmanış
      else if (behavior === 'climbing') {
        setPosY(prevY => {
          const climbStep = 1.3 * Math.max(0.25, speedMultiplier);
          const nextY = prevY + climbStep;
          if (nextY >= 290) {
            // EN ZİRVEYE ULAŞTI!
            // Boşluğa doğru atlar ve DÜZ BEYAZ PARAŞÜT açılır!
            setBehavior('parachuting');
            setSpeech("Zirveye ulaştım, beyaz paraşüt açıldı! 🪂");
            playMascotSound('click', mascot.animal);
            setDir(d => -d);
            return 290;
          }
          return nextY;
        });
        // Tırmanırken hafif gövde salınımı
        setSwayDeg(Math.sin(tick * 3.5) * 4);
      }

      // 3. JUMPING STATE: High joyful acrobatic leap (akıcı, süzülen zıplayış)
      else if (behavior === 'jumping') {
        const jumpProgress = (Math.sin(tick * 1.8) + 1) / 2; // 0..1..0
        const jumpHeight = mascot.animal === 'tavsan' ? 80 : 60;
        const currentJumpY = jumpProgress * jumpHeight;
        setPosY(currentJumpY);

        setPosX(prevX => {
          let nextX = prevX + dir * (baseSpeed * 1.2);
          if (nextX >= 88 || nextX <= 5) setDir(d => -d);
          return nextX;
        });

        if (Math.sin(tick * 1.8) < -0.95) {
          setPosY(0);
          setBehavior('walking');
        }
      }

      // 4. EATING STATE: Sits calmly and munches favorite snack
      else if (behavior === 'eating') {
        setPosY(0);
        setSwayDeg(Math.sin(tick * 2) * 2);
      }

      // 5. WALKING STATE: Gentle, calm roaming with cute hopping
      else {
        setSwayDeg(0);
        const bounceHeight = mascot.animal === 'tavsan' ? 8 : mascot.animal === 'panda' ? 3 : 5;
        const hop = Math.abs(Math.sin(tick * 1.6)) * bounceHeight;
        setPosY(hop);

        setPosX(prevX => {
          let nextX = prevX + dir * (baseSpeed * 0.7);
          // When reaching screen boundary:
          if (nextX >= 88) {
            nextX = 88;
            // 50% chance to climb wall up to the top and parachute down!
            if (Math.random() < 0.6) {
              setBehavior('climbing');
            } else {
              setDir(-1);
            }
          } else if (nextX <= 5) {
            nextX = 5;
            if (Math.random() < 0.6) {
              setBehavior('climbing');
            } else {
              setDir(1);
            }
          }
          return nextX;
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [behavior, dir, mascot.animal, mascot.speed, speedMultiplier]);

  const handleClick = (e) => {
    e.stopPropagation();
    playMascotSound('click', mascot.animal);

    if (isBird) {
      setSpeech("Göklerde özgürce uçuyorum! Cik cik! 🪶✨");
      setTimeout(() => setSpeech(null), 3500);
      return;
    }

    // Clicking cycles through actions or launches climb & parachute!
    if (behavior === 'walking') {
      if (Math.random() < 0.5) {
        setBehavior('jumping');
        setSpeech("Hoppala! Zıplıyorum! 🚀");
      } else {
        // Climb to top then parachute!
        setBehavior('climbing');
        setPosY(270);
        setSpeech("Tepeden beyaz paraşütle atlıyorum! 🪂");
      }
    } else {
      setBehavior('walking');
    }

    setTimeout(() => setSpeech(null), 3500);
  };

  const speciesInfo = MASCOT_SPECIES.find(s => s.id === mascot.animal) || MASCOT_SPECIES[0];

  return (
    <div
      style={{
        left: `${posX}%`,
        bottom: `${posY + 8}px`,
        transform: `rotate(${swayDeg}deg)`,
        transition: behavior === 'parachuting' ? 'none' : 'transform 0.05s ease-out'
      }}
      className="absolute flex flex-col items-center pointer-events-auto select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 🪂 DÜZ BEYAZ PARAŞÜT (Kuş asla paraşüt kullanmaz; sadece karadaki hayvanlar zirveden atlarken açar!) */}
      {!isBird && behavior === 'parachuting' && (
        <PlainWhiteParachute swayDeg={swayDeg} />
      )}

      {/* Speech Bubble Above Mascot */}
      {(speech || isHovered) && (
        <div className="mb-2 animate-bounce-slow z-50 pointer-events-none whitespace-nowrap">
          <div className="bg-white/95 text-slate-900 border-2 border-amber-400 font-extrabold text-[11px] px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 backdrop-blur-md">
            <span>{speciesInfo.icon}</span>
            <span className="text-slate-800">{speech || `${speciesInfo.name} burada! 🐾`}</span>
            {/* Bubble Tail */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-amber-400 rotate-45" />
          </div>
        </div>
      )}

      {/* Eating Snack Icon floating above paws */}
      {behavior === 'eating' && (
        <div className="absolute -top-3 text-2xl animate-bounce">
          {mascot.animal === 'tavsan' ? '🥕' : mascot.animal === 'panda' ? '🎋' : '🐟'}
        </div>
      )}

      {/* 3D Chibi Mascot Model (Kuş maskotu için daha net ve büyük boyut: w-32 h-32 ve scale: 0.62) */}
      <div
        onClick={handleClick}
        style={{
          transform: `scaleX(${dir === 1 ? 1 : -1})`,
          transition: 'transform 0.25s ease-in-out'
        }}
        className={`relative ${isBird ? 'w-32 h-32' : 'w-28 h-28'} cursor-pointer transform hover:scale-105 active:scale-95`}
        title={`${speciesInfo.name} (${behavior.toUpperCase()}) - Bana tıkla! 🐾`}
      >
        <ChibiMascot3D
          animal={mascot.animal}
          colorHex={mascot.colorHex}
          scale={isBird ? 0.62 : (mascot.scale || 0.48)}
          onMascotClick={handleClick}
        />
      </div>

      {/* Fluffy Drop Shadow on floor (contracts when high in air) */}
      <div
        style={{
          width: `${Math.max(12, 50 - posY * 0.35)}px`,
          height: '10px',
          opacity: Math.max(0.08, 0.5 - (posY / 160))
        }}
        className="rounded-full bg-slate-950/60 blur-[3px] -mt-2 transition-all duration-75 pointer-events-none"
      />

      {/* Mini mascot tag with remove button visible on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex items-center gap-1 bg-slate-900/90 border border-amber-400/30 px-2 py-0.5 rounded-full text-[10px] text-amber-200 shadow-md">
        <span>{speciesInfo.name}</span>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(mascot.id);
            }}
            className="hover:text-rose-400 text-slate-400 p-0.5 ml-1 transition"
            title="Ekranda gezinen bu maskotu kaldır"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

// Master Component managing all wandering mascots + bottom-left control dock
export default function WanderingMascots({
  mascots = [],
  onRemoveMascot,
  onOpenStudio,
  speedMultiplier = 1,
  setSpeedMultiplier
}) {
  const [forceAction, setForceAction] = useState(null);

  const triggerAction = (type) => {
    setForceAction({ type, timestamp: Date.now() });
    setTimeout(() => setForceAction(null), 1000);
  };

  const isSlowMo = speedMultiplier <= 0.35;

  return (
    <>
      {/* 1. Wandering Mascots Stage (100% Non-blocking, pointer-events-none container) */}
      <div 
        id="wandering-mascots-container"
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      >
        {mascots.map((mascot) => (
          <WanderingMascotItem
            key={mascot.id}
            mascot={mascot}
            onRemove={onRemoveMascot}
            speedMultiplier={speedMultiplier}
            forceAction={forceAction}
          />
        ))}
      </div>

      {/* 2. Bottom-Left Mascot Studio & Action Dock ("sol alt kısımda göster üst menü barına ekleme") */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 pointer-events-auto select-none">
        
        {/* Main Mascot Studio Button */}
        <button
          id="btn-bottom-mascot-studio"
          onClick={onOpenStudio}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500 hover:from-amber-400 hover:to-sky-400 text-white font-extrabold text-xs shadow-xl shadow-amber-500/25 border-2 border-white/30 transition transform hover:scale-105 active:scale-95"
          title="3D Maskot Stüdyosu: Maskot seç, renk değiştir, ekrana ekle / çıkar"
        >
          <div className="w-6 h-6 rounded-xl bg-white/20 flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <span>Maskot Stüdyosu 🐾</span>
          <span className="bg-slate-950/60 px-1.5 py-0.5 rounded-full text-[10px] text-amber-200">
            {mascots.length}
          </span>
        </button>

        {/* 🐌 Hızlı Ağır Çekim (Slow-Mo) Modu Butonu */}
        {setSpeedMultiplier && (
          <button
            id="btn-quick-slow-mo"
            onClick={() => {
              setSpeedMultiplier(isSlowMo ? 0.85 : 0.25);
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-2xl border text-xs font-bold transition shadow-lg backdrop-blur-md transform hover:scale-105 active:scale-95 ${
              isSlowMo
                ? 'bg-amber-500 text-slate-950 border-white ring-2 ring-amber-400 font-extrabold shadow-amber-500/40'
                : 'bg-slate-900/90 text-amber-300 border-amber-400/40 hover:bg-slate-800 hover:text-white'
            }`}
            title={isSlowMo ? "Ağır Çekim Aktif (0.25x) - Normale dönmek için tıkla" : "Ağır Çekim Modunu Aç (0.25x Slow-Mo)"}
          >
            <span className="text-sm">🐌</span>
            <span className="hidden sm:inline-block">
              {isSlowMo ? 'Ağır Çekim: Açık' : 'Ağır Çekim'}
            </span>
          </button>
        )}

        {/* Quick Fun Action Buttons (Parachute from top, Climb, Jump) */}
        {mascots.length > 0 && (
          <div className="flex items-center gap-1 bg-slate-900/90 border border-amber-400/30 p-1 rounded-2xl shadow-lg backdrop-blur-md">
            <button
              onClick={() => triggerAction('parachute')}
              className="p-2 rounded-xl hover:bg-slate-800 text-sky-300 hover:text-white transition"
              title="Tepeden Beyaz Paraşütle Atla! 🪂"
            >
              <span className="text-sm">🪂</span>
            </button>

            <button
              onClick={() => triggerAction('climb')}
              className="p-2 rounded-xl hover:bg-slate-800 text-amber-300 hover:text-white transition"
              title="Duvara Tırman! 🧗"
            >
              <span className="text-sm">🧗</span>
            </button>

            <button
              onClick={() => triggerAction('jump')}
              className="p-2 rounded-xl hover:bg-slate-800 text-emerald-300 hover:text-white transition"
              title="Süper Zıplayış! 🚀"
            >
              <span className="text-sm">🚀</span>
            </button>
          </div>
        )}

      </div>
    </>
  );
}
