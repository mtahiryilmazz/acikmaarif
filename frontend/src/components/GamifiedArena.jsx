import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, Flame, Zap, Shield, Sparkles, 
  Coins, Clock, Gift, ShoppingBag, Users, CheckCircle2 
} from 'lucide-react';

export default function GamifiedArena({ questions, userStats, onUpdateStats }) {
  const [gameState, setGameState] = useState('lobby'); // lobby, playing, chest_reward, podium
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(1);
  const [score, setScore] = useState(0);
  const [goldEarned, setGoldEarned] = useState(0);
  const [selectedChest, setSelectedChest] = useState(null);
  const [activePowerups, setActivePowerups] = useState([]);
  const [roomPin] = useState('849 201');

  const currentQ = questions[currentQIndex] || questions[0];

  // Kahoot 4-Color Geometric Cards
  const KAHOOT_CARDS = [
    { key: 'A', color: 'from-red-600 to-rose-700', shape: '▲ Üçgen', border: 'border-red-400/40' },
    { key: 'B', color: 'from-blue-600 to-cyan-700', shape: '◆ Baklava', border: 'border-blue-400/40' },
    { key: 'C', color: 'from-amber-500 to-yellow-600', shape: '● Daire', border: 'border-amber-400/40' },
    { key: 'D', color: 'from-emerald-600 to-green-700', shape: '■ Kare', border: 'border-emerald-400/40' },
  ];

  // Game countdown timer
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleAnswerSelect('TIMEOUT');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(15);
    setScore(0);
    setStreak(1);
    setCurrentQIndex(0);
  };

  const handleAnswerSelect = (optionKey) => {
    const isCorrect = optionKey === currentQ.correct_option;
    
    if (isCorrect) {
      // Speed multiplier
      const earned = Math.floor(1000 * (timeLeft / 15) * (1 + streak * 0.2));
      const gold = currentQ.blooket_gold_reward || 150;
      setScore(prev => prev + earned);
      setGoldEarned(prev => prev + gold);
      setStreak(prev => prev + 1);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Switch to Blooket Mystery Chest state
      setGameState('chest_reward');
    } else {
      setStreak(1);
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setTimeLeft(15);
      } else {
        setGameState('podium');
      }
    }
  };

  const handleChestPick = (chestIdx) => {
    setSelectedChest(chestIdx);
    const bonusGold = chestIdx === 1 ? 250 : 100;
    
    if (onUpdateStats) {
      onUpdateStats({ goldAdd: goldEarned + bonusGold, xpAdd: score });
    }

    setTimeout(() => {
      setSelectedChest(null);
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setTimeLeft(15);
        setGameState('playing');
      } else {
        setGameState('podium');
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Kahoot · Blooket · Gimkit · Quizizz Hibrit
            </span>
            <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              Oda PIN: {roomPin}
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Eğlenceli Soru-Cevap Düello Arenası
          </h2>
        </div>

        {/* Live In-Game HUD */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-900/40 px-3 py-1.5 rounded-xl text-amber-300 font-bold text-xs">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>Streak: x{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-yellow-950/40 border border-yellow-900/40 px-3 py-1.5 rounded-xl text-yellow-300 font-bold text-xs">
            <Coins className="w-4 h-4" />
            <span>{score.toLocaleString('tr-TR')} Puan</span>
          </div>
        </div>
      </div>

      {/* STATE 1: LOBBY */}
      {gameState === 'lobby' && (
        <div className="glass-panel p-8 rounded-2xl text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-rose-500/25">
            <Trophy className="w-10 h-10 text-white animate-bounce" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              Sınıf & Bireysel Düello Modu
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
              Kahoot'un refleks puanlaması, Blooket'in altın sandıkları ve Gimkit'in mağaza stratejisiyle müfredat sorularını yarışarak çöz!
            </p>
          </div>

          {/* Room PIN Code Card */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 inline-block">
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
              Katılım PIN Kodu
            </div>
            <div className="text-3xl font-black font-mono text-amber-300 tracking-widest my-1">
              {roomPin}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Sınıf lobisinde 24 öğrenci hazır</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleStartGame}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-base shadow-xl shadow-rose-500/30 transition transform hover:scale-105"
            >
              Yarışmayı Başlat! 🚀
            </button>
          </div>
        </div>
      )}

      {/* STATE 2: PLAYING (Kahoot / Quizizz 4-Color Fast Arena) */}
      {gameState === 'playing' && (
        <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
          
          {/* Question & Timer Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">
                Soru {currentQIndex + 1} / {questions.length} · {currentQ.subject}
              </span>
              <div className="flex items-center gap-1.5 text-sm font-extrabold text-amber-400 bg-slate-900 px-3 py-1 rounded-full border border-amber-500/30">
                <Clock className="w-4 h-4 animate-spin" />
                <span>{timeLeft} sn</span>
              </div>
            </div>

            {/* Countdown progress bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 5 ? 'bg-rose-500 animate-pulse' : 'bg-blue-500'
                }`}
                style={{ width: `${(timeLeft / 15) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center text-lg md:text-xl font-bold text-white shadow-inner">
              {currentQ.question_text}
            </div>
          </div>

          {/* 4 Large Kahoot Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {currentQ.options.slice(0, 4).map((opt, idx) => {
              const card = KAHOOT_CARDS[idx];
              return (
                <button
                  key={opt.key}
                  onClick={() => handleAnswerSelect(opt.key)}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} text-white font-bold text-left shadow-lg border ${card.border} hover:opacity-95 transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-between group`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-xl font-black">
                      {card.shape.split(' ')[0]}
                    </span>
                    <span className="text-base md:text-lg">{opt.text}</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-black/30 px-2.5 py-1 rounded-md opacity-80 group-hover:opacity-100">
                    Tuş {opt.key}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      )}

      {/* STATE 3: BLOOKET MYSTERY CHEST REWARD */}
      {gameState === 'chest_reward' && (
        <div className="glass-panel p-8 rounded-2xl text-center space-y-6 max-w-xl mx-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" /> DOĞRU CEVAP!
          </div>

          <h3 className="text-2xl font-black text-white">
            🎁 Blooket Altın Sandığı Seçimi
          </h3>
          <p className="text-xs text-slate-300">
            Aşağıdaki 3 gizemli sandıktan birini aç ve ödülünü topla!
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                onClick={() => handleChestPick(idx)}
                className={`p-5 rounded-2xl border cursor-pointer transition transform hover:scale-105 ${
                  selectedChest === idx
                    ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="text-4xl mb-2 animate-bounce">
                  {selectedChest === idx ? '🔓' : '📦'}
                </div>
                <div className="text-xs font-bold text-amber-300">
                  {selectedChest === idx ? (idx === 1 ? '+250 Altın!' : '+100 Altın!') : `Sandık ${idx + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATE 4: PODIUM */}
      {gameState === 'podium' && (
        <div className="glass-panel p-8 rounded-2xl text-center space-y-6 max-w-xl mx-auto animate-fadeIn">
          <div className="text-5xl animate-bounce">🏆</div>
          <h3 className="text-2xl font-black text-white">
            Düello Şampiyonlar Kürsüsü!
          </h3>

          <div className="grid grid-cols-3 gap-3 items-end pt-4">
            {/* 2nd Place */}
            <div className="p-4 rounded-t-xl bg-slate-800/80 border border-slate-700 h-28 flex flex-col justify-end">
              <div className="text-xs font-bold text-slate-300">Ahmet_Fen</div>
              <div className="text-sm font-extrabold text-slate-400">2.450 P</div>
              <div className="text-xs font-black text-slate-400 mt-1">2. SIRA</div>
            </div>

            {/* 1st Place (User) */}
            <div className="p-4 rounded-t-2xl bg-gradient-to-t from-amber-600/40 to-yellow-500/20 border-2 border-amber-400 h-36 flex flex-col justify-end ring-4 ring-amber-400/20">
              <div className="text-xs font-black text-amber-300">SEN (Şampiyon)</div>
              <div className="text-base font-black text-white">{score.toLocaleString('tr-TR')} P</div>
              <div className="text-xs font-black text-amber-400 mt-1">🥇 1. SIRA</div>
            </div>

            {/* 3rd Place */}
            <div className="p-4 rounded-t-xl bg-slate-800/80 border border-slate-700 h-24 flex flex-col justify-end">
              <div className="text-xs font-bold text-slate-300">Ayse_YKS</div>
              <div className="text-sm font-extrabold text-slate-400">1.890 P</div>
              <div className="text-xs font-black text-amber-700 mt-1">3. SIRA</div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setGameState('lobby')}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition"
            >
              Yeni Bir Arenaya Katıl
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
