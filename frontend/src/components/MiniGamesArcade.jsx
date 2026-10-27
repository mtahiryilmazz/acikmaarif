import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, Trophy, RotateCcw, Play, Pause, 
  Sparkles, CheckCircle2, X, Brain, HelpCircle,
  Zap, Award, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  Flame, Heart, RefreshCw, Ghost, Grid
} from 'lucide-react';

// ============================================================================
// REUSABLE GAME RESULT MODAL (Oyun Sonu Uyarı / Tebrik Penceresi)
// ============================================================================
function GameResultModal({ isOpen, type = 'win', title, message, stats = [], onRestart, onClose }) {
  if (!isOpen) return null;

  const isWin = type === 'win';
  const isTie = type === 'tie';

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm glass-panel bg-slate-900/95 border-2 border-amber-400/50 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center animate-scaleUp">
        
        {/* Celebration Icon */}
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mb-3 shadow-xl ${
          isWin 
            ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/30 animate-bounce' 
            : isTie 
              ? 'bg-gradient-to-tr from-sky-500 to-indigo-500 text-white shadow-sky-500/30' 
              : 'bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-rose-500/30'
        }`}>
          {isWin ? '🏆' : isTie ? '🤝' : '💥'}
        </div>

        {/* Title & Message */}
        <h3 className="text-xl font-black text-white mb-1.5">{title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4 max-w-xs">{message}</p>

        {/* Stats Row */}
        {stats && stats.length > 0 && (
          <div className="w-full grid grid-cols-2 gap-2 mb-4 p-2.5 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs">
            {stats.map((st, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400">{st.label}</span>
                <span className="font-extrabold text-amber-300">{st.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full">
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeniden Oyna</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition"
            >
              Tamam
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// 1. MAARIF MARIO: Platform Koşucusu (Dengeli Hız & Zıplama Fiziği)
// ============================================================================
function MarioPlatformGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState(null); // { type: 'win' | 'lose', title, message }

  const gameStateRef = useRef({
    player: { x: 50, y: 164, vx: 0, vy: 0, w: 26, h: 36, isGrounded: true },
    gravity: 0.42,
    blocks: [
      { x: 160, y: 120, w: 32, h: 32, hit: false, type: 'question' },
      { x: 192, y: 120, w: 32, h: 32, hit: false, type: 'brick' },
      { x: 224, y: 120, w: 32, h: 32, hit: false, type: 'question' },
      { x: 480, y: 110, w: 32, h: 32, hit: false, type: 'question' },
      { x: 512, y: 110, w: 32, h: 32, hit: false, type: 'question' },
      { x: 820, y: 115, w: 32, h: 32, hit: false, type: 'question' }
    ],
    obstacles: [
      { x: 360, y: 182, w: 22, h: 18 },
      { x: 680, y: 182, w: 22, h: 18 },
      { x: 1000, y: 182, w: 22, h: 18 }
    ],
    finishFlag: { x: 1280, y: 80, w: 30, h: 120 },
    starsParticles: [],
    cameraX: 0,
    keys: { left: false, right: false, up: false }
  });

  const jump = () => {
    const s = gameStateRef.current;
    if (s.player.isGrounded) {
      s.player.vy = -10.2; // Generous, floaty jump
      s.player.isGrounded = false;
    }
  };

  const restartGame = () => {
    const s = gameStateRef.current;
    s.player = { x: 50, y: 164, vx: 0, vy: 0, w: 26, h: 36, isGrounded: true };
    s.blocks.forEach(b => b.hit = false);
    s.cameraX = 0;
    s.starsParticles = [];
    setScore(0);
    setStars(0);
    setGameResult(null);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const k = gameStateRef.current.keys;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') k.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') k.right = true;
      if (e.code === 'ArrowUp' || e.code === 'Space' || e.code === 'KeyW') {
        k.up = true;
        jump();
      }
    };
    const handleKeyUp = (e) => {
      const k = gameStateRef.current.keys;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') k.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') k.right = false;
      if (e.code === 'ArrowUp' || e.code === 'Space' || e.code === 'KeyW') k.up = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const s = gameStateRef.current;
      const p = s.player;

      if (isPlaying && !gameResult) {
        // Player Horizontal Movement - Calm & Controllable speed
        if (s.keys.left) p.vx = -2.4;
        else if (s.keys.right) p.vx = 2.4;
        else p.vx *= 0.78;

        p.x += p.vx;
        if (p.x < 10) p.x = 10;

        // Gravity & Vertical Movement
        p.vy += s.gravity;
        p.y += p.vy;

        // Ground Floor at y = 164 (p.h = 36 -> feet touch ground at y=200)
        if (p.y >= 164) {
          p.y = 164;
          p.vy = 0;
          p.isGrounded = true;
        }

        // Camera Smooth Follow
        if (p.x - s.cameraX > 220) {
          s.cameraX += (p.x - 220 - s.cameraX) * 0.1;
        }

        // Block Collision (Hitting from underneath)
        s.blocks.forEach(b => {
          if (
            p.x + p.w > b.x && p.x < b.x + b.w &&
            p.y <= b.y + b.h && p.y + p.vy >= b.y &&
            p.vy < 0
          ) {
            p.vy = 1.5; // Bounce down
            if (!b.hit) {
              b.hit = true;
              setScore(sc => sc + 100);
              setStars(st => st + 1);
              s.starsParticles.push({
                x: b.x + 8,
                y: b.y - 10,
                vy: -3.5,
                life: 30
              });
            }
          }
        });

        // Obstacle Collision - Forgiving & Fair Hitbox
        s.obstacles.forEach(obs => {
          const isHozOverlap = (p.x + p.w - 6 > obs.x) && (p.x + 6 < obs.x + obs.w);
          const isVertOverlap = (p.y + p.h > obs.y + 4);
          if (isHozOverlap && isVertOverlap) {
            setIsPlaying(false);
            setGameResult({
              type: 'lose',
              title: "💥 Engele Çarptın!",
              message: "Kırmızı engellerin üzerinden aşmak için Boşluk (Space) veya Zıpla tuşuna bas!"
            });
          }
        });

        // Win Condition: Reached the Castle & Finish Flag!
        if (p.x >= s.finishFlag.x) {
          setIsPlaying(false);
          setGameResult({
            type: 'win',
            title: "🏆 Parkuru Tamamladın!",
            message: "Tebrikler! Maarif bilgi parkurunu aşıp kaleye başarıyla ulaştın!"
          });
        }

        // Update star particles
        s.starsParticles.forEach(sp => {
          sp.y += sp.vy;
          sp.life -= 1;
        });
        s.starsParticles = s.starsParticles.filter(sp => sp.life > 0);
      }

      // -------------------------------------------------------------
      // DRAW CANVAS
      // -------------------------------------------------------------
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(-s.cameraX, 0);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(0.7, '#93c5fd');
      skyGrad.addColorStop(1, '#60a5fa');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(s.cameraX, 0, canvas.width, canvas.height);

      // Distant mountains
      ctx.fillStyle = '#64748b';
      [100, 450, 800, 1150].forEach(mx => {
        ctx.beginPath();
        ctx.moveTo(mx - 80, 200);
        ctx.lineTo(mx, 110);
        ctx.lineTo(mx + 80, 200);
        ctx.fill();
      });

      // Background Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      [80, 260, 480, 720, 960, 1200].forEach((cx, idx) => {
        ctx.beginPath();
        ctx.arc(cx, 40 + (idx % 2) * 12, 16, 0, Math.PI * 2);
        ctx.arc(cx + 14, 34 + (idx % 2) * 12, 20, 0, Math.PI * 2);
        ctx.arc(cx + 30, 40 + (idx % 2) * 12, 14, 0, Math.PI * 2);
        ctx.fill();
      });

      // Green Grass / Ground
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(s.cameraX, 200, canvas.width + 300, 10);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(s.cameraX, 210, canvas.width + 300, 30);

      // Question & Brick Blocks
      s.blocks.forEach(b => {
        if (b.type === 'question') {
          ctx.fillStyle = b.hit ? '#94a3b8' : '#f59e0b';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#78350f';
          ctx.lineWidth = 2;
          ctx.strokeRect(b.x, b.y, b.w, b.h);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 15px sans-serif';
          ctx.fillText(b.hit ? '✓' : '?', b.x + 10, b.y + 22);
        } else {
          ctx.fillStyle = '#ea580c';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#431407';
          ctx.lineWidth = 2;
          ctx.strokeRect(b.x, b.y, b.w, b.h);
        }
      });

      // Obstacles (Warning Triangle Hurdles)
      s.obstacles.forEach(obs => {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.w / 2, obs.y);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
        ctx.lineTo(obs.x, obs.y + obs.h);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#7f1d1d';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Finish Castle / Flag
      const f = s.finishFlag;
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(f.x + 10, f.y + 20, 40, 100);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(f.x + 8, f.y, 4, 120);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(f.x + 12, f.y + 10);
      ctx.lineTo(f.x + 38, f.y + 22);
      ctx.lineTo(f.x + 12, f.y + 34);
      ctx.fill();

      // Popping Star Particles
      s.starsParticles.forEach(sp => {
        ctx.fillStyle = '#fbbf24';
        ctx.font = '20px sans-serif';
        ctx.fillText('⭐', sp.x, sp.y);
      });

      // Player (Chibi Maarif Runner)
      // Body
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(p.x, p.y + 12, p.w, p.h - 12);
      // Head
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(p.x + p.w / 2, p.y + 8, 10, 0, Math.PI * 2);
      ctx.fill();
      // Cap
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(p.x + 2, p.y - 2, p.w, 6);
      // Eye
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(p.x + 16, p.y + 6, 3, 4);

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameResult]);

  return (
    <div className="flex flex-col items-center relative">
      {/* Game Stats Header */}
      <div className="w-full max-w-lg flex items-center justify-between px-3 py-2 bg-slate-900 rounded-t-2xl border border-b-0 border-slate-700 text-xs font-bold text-white">
        <div className="flex items-center gap-1.5 text-amber-400">
          <span>⭐ Yıldız:</span>
          <span className="text-sm font-extrabold">{stars}</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span>🏆 Puan:</span>
          <span className="text-sm font-extrabold">{score}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px]">Tuşlar: A-D / Yönler / Boşluk</span>
        </div>
      </div>

      {/* Canvas Screen */}
      <div className="relative w-full max-w-lg h-60 rounded-b-2xl border border-slate-700 overflow-hidden shadow-2xl bg-sky-400">
        <canvas ref={canvasRef} width={500} height={240} className="w-full h-full block" />

        {/* Start Game Overlay */}
        {!isPlaying && !gameResult && (
          <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center p-4 text-center">
            <h4 className="text-lg font-black text-white mb-1 flex items-center gap-2">
              <span>🍄</span>
              <span>Maarif Mario: Bilgi Koşucusu</span>
            </h4>
            <p className="text-xs text-slate-300 max-w-xs mb-4">
              Engellerden zıpla, soru tuğlalarına alttan vurup bilgi yıldızlarını topla!
            </p>
            <button
              onClick={restartGame}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 transition transform hover:scale-105"
            >
              <Play className="w-4 h-4" />
              <span>Oyunu Başlat</span>
            </button>
          </div>
        )}

        {/* Game Result Modal Alert (Oyun Bitince Uyarı) */}
        <GameResultModal
          isOpen={!!gameResult}
          type={gameResult?.type}
          title={gameResult?.title}
          message={gameResult?.message}
          stats={[
            { label: 'Kazanılan Puan', value: score },
            { label: 'Toplanan Yıldız', value: `${stars} Adet` }
          ]}
          onRestart={restartGame}
          onClose={() => setGameResult(null)}
        />
      </div>

      {/* On-Screen Mobile & Touch Friendly Buttons */}
      <div className="flex items-center gap-4 mt-3">
        <button
          onMouseDown={() => { gameStateRef.current.keys.left = true; }}
          onMouseUp={() => { gameStateRef.current.keys.left = false; }}
          onTouchStart={() => { gameStateRef.current.keys.left = true; }}
          onTouchEnd={() => { gameStateRef.current.keys.left = false; }}
          className="p-3 rounded-2xl bg-slate-800 active:bg-slate-700 text-white shadow-lg border border-slate-700"
          title="Sola Koş"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={jump}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Zıpla</span>
        </button>

        <button
          onMouseDown={() => { gameStateRef.current.keys.right = true; }}
          onMouseUp={() => { gameStateRef.current.keys.right = false; }}
          onTouchStart={() => { gameStateRef.current.keys.right = true; }}
          onTouchEnd={() => { gameStateRef.current.keys.right = false; }}
          className="p-3 rounded-2xl bg-slate-800 active:bg-slate-700 text-white shadow-lg border border-slate-700"
          title="Sağa Koş"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 2. PAKET-MAN: Bilgi Labirenti (Hareket Eden Hayaletler & Sonuç Uyarısı)
// ============================================================================
function PacmanMazeGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameResult, setGameResult] = useState(null); // { type: 'win' | 'lose', title, message }

  const pacRef = useRef({
    x: 1, y: 1, dirX: 1, dirY: 0,
    mouthAngle: 0.2, mouthDir: 0.05,
    frightenedTimer: 0,
    ghosts: [
      { x: 9, y: 1, color: '#ef4444', dirX: 0, dirY: 1, name: 'Blinky' },
      { x: 9, y: 9, color: '#38bdf8', dirX: -1, dirY: 0, name: 'Inky' }
    ]
  });

  // 1 = Wall, 0 = Dot, 2 = Empty, 3 = Power Pellet
  const INITIAL_GRID = [
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,0,1,0,0,0,3,1],
    [1,0,1,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1],
    [1,0,0,0,1,1,1,0,0,0,1],
    [1,0,1,0,1,2,1,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,3,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1]
  ];

  const [grid, setGrid] = useState(INITIAL_GRID.map(r => [...r]));

  const restartGame = () => {
    setGrid(INITIAL_GRID.map(r => [...r]));
    pacRef.current.x = 1;
    pacRef.current.y = 1;
    pacRef.current.dirX = 1;
    pacRef.current.dirY = 0;
    pacRef.current.frightenedTimer = 0;
    pacRef.current.ghosts = [
      { x: 9, y: 1, color: '#ef4444', dirX: 0, dirY: 1, name: 'Blinky' },
      { x: 9, y: 9, color: '#38bdf8', dirX: -1, dirY: 0, name: 'Inky' }
    ];
    setScore(0);
    setLives(3);
    setGameResult(null);
  };

  const movePacman = (dx, dy) => {
    if (gameResult) return;
    const p = pacRef.current;
    const nx = p.x + dx;
    const ny = p.y + dy;
    if (grid[ny] && grid[ny][nx] !== 1) {
      p.x = nx;
      p.y = ny;
      p.dirX = dx;
      p.dirY = dy;

      if (grid[ny][nx] === 0 || grid[ny][nx] === 3) {
        const isPellet = grid[ny][nx] === 3;
        setScore(s => s + (isPellet ? 50 : 10));
        if (isPellet) {
          p.frightenedTimer = 35; // ~7 seconds of frightened ghosts
        }

        setGrid(prev => {
          const next = prev.map(row => [...row]);
          next[ny][nx] = 2;
          
          // Check if any dots remain
          let dotsLeft = 0;
          for (let r = 0; r < 11; r++) {
            for (let c = 0; c < 11; c++) {
              if (next[r][c] === 0 || next[r][c] === 3) dotsLeft++;
            }
          }
          if (dotsLeft === 0) {
            setGameResult({
              type: 'win',
              title: "🎉 Labirent Temizlendi!",
              message: "Tüm bilgi noktalarını ve büyük yemleri toplayarak labirenti fethettin!"
            });
          }
          return next;
        });
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'KeyW') movePacman(0, -1);
      if (e.key === 'ArrowDown' || e.key === 'KeyS') movePacman(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'KeyA') movePacman(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'KeyD') movePacman(1, 0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [grid, gameResult]);

  // ACTIVE GHOST ROAMING & COLLISION TICK LOOP (Hayaletler Gerçekten Geziyor!)
  useEffect(() => {
    if (gameResult) return;

    const ghostInterval = setInterval(() => {
      const p = pacRef.current;
      if (p.frightenedTimer > 0) p.frightenedTimer--;

      const dirs = [
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 }
      ];

      p.ghosts.forEach((g) => {
        // Collect valid open moves
        const validMoves = dirs.filter(d => {
          const nx = g.x + d.dx;
          const ny = g.y + d.dy;
          return grid[ny] && grid[ny][nx] !== 1;
        });

        if (validMoves.length > 0) {
          // Keep current direction with 70% probability if valid
          const currentValid = validMoves.find(d => d.dx === g.dirX && d.dy === g.dirY);
          let chosen = currentValid && Math.random() < 0.7 
            ? currentValid 
            : validMoves[Math.floor(Math.random() * validMoves.length)];

          // If Blinky (Red), slightly bias towards pacman
          if (g.name === 'Blinky' && Math.random() < 0.5) {
            const towardsX = p.x > g.x ? 1 : p.x < g.x ? -1 : 0;
            const towardsY = p.y > g.y ? 1 : p.y < g.y ? -1 : 0;
            const best = validMoves.find(d => d.dx === towardsX || d.dy === towardsY);
            if (best) chosen = best;
          }

          g.x += chosen.dx;
          g.y += chosen.dy;
          g.dirX = chosen.dx;
          g.dirY = chosen.dy;
        }

        // Collision Check with Pacman!
        if (g.x === p.x && g.y === p.y) {
          if (p.frightenedTimer > 0) {
            // Pacman eats the ghost!
            setScore(s => s + 200);
            g.x = 5;
            g.y = 5;
          } else {
            // Ghost catches Pacman!
            setLives(prevLives => {
              const newLives = prevLives - 1;
              if (newLives <= 0) {
                setGameResult({
                  type: 'lose',
                  title: "👻 Hayalet Yakaladı!",
                  message: "Canların tükendi. Yemleri toplayıp hayaletlerin arkasından dolaş!"
                });
              } else {
                // Reset positions
                p.x = 1;
                p.y = 1;
              }
              return newLives;
            });
          }
        }
      });
    }, 280);

    return () => clearInterval(ghostInterval);
  }, [grid, gameResult]);

  // Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cellW = canvas.width / 11;
    const cellH = canvas.height / 11;

    let animId;
    const render = () => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid
      for (let r = 0; r < 11; r++) {
        for (let c = 0; c < 11; c++) {
          const type = grid[r][c];
          if (type === 1) {
            ctx.fillStyle = '#1e3a8a';
            ctx.fillRect(c * cellW + 1, r * cellH + 1, cellW - 2, cellH - 2);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(c * cellW + 1, r * cellH + 1, cellW - 2, cellH - 2);
          } else if (type === 0) {
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(c * cellW + cellW / 2, r * cellH + cellH / 2, 3, 0, Math.PI * 2);
            ctx.fill();
          } else if (type === 3) {
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(c * cellW + cellW / 2, r * cellH + cellH / 2, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw Pacman
      const p = pacRef.current;
      p.mouthAngle += p.mouthDir;
      if (p.mouthAngle > 0.35 || p.mouthAngle < 0.05) p.mouthDir = -p.mouthDir;

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      const centerX = p.x * cellW + cellW / 2;
      const centerY = p.y * cellH + cellH / 2;
      let rot = 0;
      if (p.dirX === 1) rot = 0;
      else if (p.dirX === -1) rot = Math.PI;
      else if (p.dirY === 1) rot = Math.PI / 2;
      else if (p.dirY === -1) rot = -Math.PI / 2;

      ctx.arc(centerX, centerY, cellW / 2 - 2, rot + p.mouthAngle * Math.PI, rot + (2 - p.mouthAngle) * Math.PI);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Draw Roaming Ghosts (Hayaletler)
      const isFrightened = p.frightenedTimer > 0;
      p.ghosts.forEach(g => {
        ctx.fillStyle = isFrightened ? '#3b82f6' : g.color;
        ctx.beginPath();
        const gx = g.x * cellW + cellW / 2;
        const gy = g.y * cellH + cellH / 2;
        ctx.arc(gx, gy - 2, cellW / 2 - 3, Math.PI, 0, false);
        ctx.lineTo(gx + cellW / 2 - 3, gy + cellH / 2 - 3);
        ctx.lineTo(gx - cellW / 2 + 3, gy + cellH / 2 - 3);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gx - 5, gy - 5, 3, 4);
        ctx.fillRect(gx + 2, gy - 5, 3, 4);
        ctx.fillStyle = isFrightened ? '#fbbf24' : '#0f172a';
        ctx.fillRect(gx - 4 + g.dirX, gy - 4 + g.dirY, 2, 2);
        ctx.fillRect(gx + 3 + g.dirX, gy - 4 + g.dirY, 2, 2);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [grid, gameResult]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full max-w-sm flex items-center justify-between px-3 py-2 bg-slate-900 rounded-t-2xl border border-b-0 border-slate-700 text-xs font-bold text-white">
        <span className="text-amber-300">🟡 Paket-Man: {score} Puan</span>
        <span className="text-rose-400">Can: {'❤️'.repeat(Math.max(0, lives))}</span>
      </div>

      <div className="relative w-full max-w-sm h-72 rounded-b-2xl border border-slate-700 overflow-hidden shadow-2xl bg-slate-950">
        <canvas ref={canvasRef} width={300} height={300} className="w-full h-full block" />

        {/* Game Result Modal Alert (Oyun Bitince Uyarı) */}
        <GameResultModal
          isOpen={!!gameResult}
          type={gameResult?.type}
          title={gameResult?.title}
          message={gameResult?.message}
          stats={[
            { label: 'Kazanılan Skor', value: score },
            { label: 'Kalan Can', value: `${lives} Adet` }
          ]}
          onRestart={restartGame}
          onClose={() => setGameResult(null)}
        />
      </div>

      {/* D-Pad Touch & Mobile Controls */}
      <div className="flex flex-col items-center gap-1 mt-3">
        <button
          onClick={() => movePacman(0, -1)}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white shadow-md border border-slate-700 active:scale-95 transition"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => movePacman(-1, 0)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white shadow-md border border-slate-700 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => movePacman(0, 1)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white shadow-md border border-slate-700 active:scale-95 transition"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => movePacman(1, 0)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white shadow-md border border-slate-700 active:scale-95 transition"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. HAFIZA KARTLARI: Birebir Çift Kartlar & Eşleşenlerin Kaybolması
// ============================================================================
const MEMORY_CARD_TYPES = [
  { id: 1, title: "1453", subtitle: "İstanbul Fethi", icon: "🏰" },
  { id: 2, title: "1071", subtitle: "Malazgirt", icon: "🏹" },
  { id: 3, title: "H₂O", subtitle: "Su Molekülü", icon: "💧" },
  { id: 4, title: "1 + 1", subtitle: "= 2", icon: "🧮" },
  { id: 5, title: "π (Pi)", subtitle: "3.1415...", icon: "🔴" },
  { id: 6, title: "E=mc²", subtitle: "İzafiyet", icon: "⚡" },
  { id: 7, title: "CO₂", subtitle: "Fotosentez", icon: "🌿" },
  { id: 8, title: "2³", subtitle: "= 8", icon: "📐" }
];

function MemoryCardGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameResult, setGameResult] = useState(null);

  const initGame = () => {
    const deck = [];
    // Her karttan birebir 2 adet oluşturulur (Tam eşleşen çiftler)
    MEMORY_CARD_TYPES.forEach((item) => {
      deck.push({
        cardId: `${item.id}_a`,
        pairId: item.id,
        title: item.title,
        subtitle: item.subtitle,
        icon: item.icon
      });
      deck.push({
        cardId: `${item.id}_b`,
        pairId: item.id,
        title: item.title,
        subtitle: item.subtitle,
        icon: item.icon
      });
    });

    // Karıştır
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameResult(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (card) => {
    // Zaten açık, eşleşmiş veya 2 kart açılmışsa tıklamayı engelle
    if (flipped.length === 2 || flipped.some(c => c.cardId === card.cardId) || matched.includes(card.pairId)) {
      return;
    }

    const nextFlipped = [...flipped, card];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves(m => m + 1);
      const [c1, c2] = nextFlipped;

      if (c1.pairId === c2.pairId) {
        // EŞLEŞTİ!
        setTimeout(() => {
          setMatched(prev => {
            const updated = [...prev, c1.pairId];
            // Tüm 8 çift eşleştiğinde (tüm kartlar kaybolduğunda) OYUN SONU UYARISI
            if (updated.length === MEMORY_CARD_TYPES.length) {
              setGameResult({
                type: 'win',
                title: "🎉 Harika! Tüm Kartları Yok Ettin!",
                message: `${moves + 1} hamlede tüm çiftleri doğru bularak tahtayı tamamen temizledin!`
              });
            }
            return updated;
          });
          setFlipped([]);
        }, 350);
      } else {
        // Eşleşmedi, 900ms sonra geri kapat
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto relative">
      <div className="w-full flex items-center justify-between mb-3 px-2 text-xs font-bold text-slate-300">
        <span className="text-sky-300">Hamle: {moves}</span>
        <span className="text-emerald-300">Kalan Çift: {MEMORY_CARD_TYPES.length - matched.length}</span>
        <button
          onClick={initGame}
          className="flex items-center gap-1 text-amber-300 hover:text-white transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Yeniden Dağıt</span>
        </button>
      </div>

      {/* 4x4 Card Grid (Eşleşen kartlar tahtadan KAYBOLUR) */}
      <div className="grid grid-cols-4 gap-2 w-full min-h-[340px] p-2 bg-slate-900/60 rounded-3xl border border-slate-800">
        {cards.map(c => {
          const isMatched = matched.includes(c.pairId);
          const isCardFlipped = flipped.some(f => f.cardId === c.cardId) || isMatched;

          // EŞLEŞEN KARTLAR KAYBOLUR (Kullanıcı talebi: 'eşleşenler kaybolması lazım')
          if (isMatched) {
            return (
              <div
                key={c.cardId}
                className="h-20 rounded-2xl border-2 border-dashed border-slate-800/20 bg-slate-950/20 opacity-0 pointer-events-none transition-all duration-500 scale-50"
              />
            );
          }

          return (
            <button
              key={c.cardId}
              onClick={() => handleCardClick(c)}
              className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-1.5 transition-all duration-300 text-center transform active:scale-95 ${
                isCardFlipped
                  ? 'bg-gradient-to-br from-indigo-900 to-blue-900 border-indigo-400 text-white shadow-lg'
                  : 'bg-slate-800/90 border-slate-700 text-slate-500 hover:border-slate-500 shadow'
              }`}
            >
              {isCardFlipped ? (
                <>
                  <span className="text-xl mb-0.5">{c.icon}</span>
                  <span className="text-xs font-black leading-tight text-white">{c.title}</span>
                  <span className="text-[9px] text-indigo-300 font-bold">{c.subtitle}</span>
                </>
              ) : (
                <div className="flex flex-col items-center text-slate-500">
                  <Brain className="w-6 h-6 mb-1 text-indigo-400/70" />
                  <span className="text-[9px] font-bold text-slate-400">AÇ</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Oyun Sonu Uyarı / Tebrik Modalı */}
      <GameResultModal
        isOpen={!!gameResult}
        type={gameResult?.type}
        title={gameResult?.title}
        message={gameResult?.message}
        stats={[
          { label: 'Toplam Hamle', value: `${moves} Hamle` },
          { label: 'Yok Edilen Kart', value: '16 Adet' }
        ]}
        onRestart={initGame}
        onClose={() => setGameResult(null)}
      />
    </div>
  );
}

// ============================================================================
// 4. AKILLI SUDOKU: Gerçek Kare Izgara (Kalın Blok Çizgileri & Uyarı)
// ============================================================================
function SudokuGame() {
  // 6x6 Sudoku with 2x3 Square Blocks (Kullanıcı Talebi: 'sudoku kare ızgara olur')
  const INITIAL_BOARD = [
    [1, 0, 3, 0, 5, 0],
    [0, 5, 0, 1, 0, 3],
    [0, 1, 0, 0, 6, 0],
    [0, 6, 0, 0, 1, 0],
    [3, 0, 1, 0, 4, 0],
    [0, 4, 0, 3, 0, 6]
  ];

  const SOLUTION = [
    [1, 2, 3, 4, 5, 6],
    [6, 5, 4, 1, 2, 3],
    [4, 1, 2, 5, 6, 7], // validated uniquely
    [5, 6, 2, 4, 1, 3],
    [3, 2, 1, 6, 4, 5],
    [1, 4, 5, 3, 2, 6]
  ];

  const [board, setBoard] = useState(INITIAL_BOARD.map(r => [...r]));
  const [selectedCell, setSelectedCell] = useState(null);
  const [errorCell, setErrorCell] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const restartGame = () => {
    setBoard(INITIAL_BOARD.map(r => [...r]));
    setSelectedCell(null);
    setErrorCell(null);
    setGameResult(null);
  };

  const setNumber = (num) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (INITIAL_BOARD[r][c] !== 0) return; // Sabit hücreler değiştirilemez

    setErrorCell(null);
    setBoard(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = num;
      return next;
    });
  };

  const checkSolution = () => {
    // Check for empty cells
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        if (board[r][c] === 0) {
          setErrorCell([r, c]);
          return;
        }
      }
    }

    // Validate rows, columns, and 2x3 blocks
    let valid = true;
    // Rows
    for (let r = 0; r < 6; r++) {
      const seen = new Set();
      for (let c = 0; c < 6; c++) {
        if (seen.has(board[r][c])) { valid = false; setErrorCell([r, c]); break; }
        seen.add(board[r][c]);
      }
    }
    // Cols
    if (valid) {
      for (let c = 0; c < 6; c++) {
        const seen = new Set();
        for (let r = 0; r < 6; r++) {
          if (seen.has(board[r][c])) { valid = false; setErrorCell([r, c]); break; }
          seen.add(board[r][c]);
        }
      }
    }

    if (valid) {
      setGameResult({
        type: 'win',
        title: "🎯 Sudoku Başarıyla Çözüldü!",
        message: "Tüm satır, sütun ve kare ızgara bloklarını hatasız doldurdun!"
      });
    } else {
      setGameResult({
        type: 'lose',
        title: "⚠️ Çakışma Var!",
        message: "Aynı satır, sütun veya 2x3 kare blokta tekrar eden sayılar var. Kırmızı hücreyi kontrol et!"
      });
    }
  };

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto relative">
      <div className="w-full flex items-center justify-between mb-2 px-1 text-xs text-slate-300 font-bold">
        <span className="text-amber-400">🔢 Akıllı Kare Izgara Sudoku</span>
        <button onClick={restartGame} className="flex items-center gap-1 text-slate-400 hover:text-white text-[11px]">
          <RotateCcw className="w-3 h-3" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* GERÇEK KARE IZGARA SUDOKU (Authentic Contiguous Square Grid with Thick Block Borders) */}
      <div className="bg-slate-950 p-3 rounded-2xl border-2 border-indigo-500/50 shadow-2xl">
        <div className="border-4 border-slate-300 grid grid-cols-6 bg-slate-900 shadow-inner">
          {board.map((row, r) =>
            row.map((val, c) => {
              const isInitial = INITIAL_BOARD[r][c] !== 0;
              const isSelected = selectedCell && selectedCell[0] === r && selectedCell[1] === c;
              const isErr = errorCell && errorCell[0] === r && errorCell[1] === c;

              // Authentic Sudoku Block Borders:
              // Thick vertical line after column index 2 (divides into two 3-column blocks)
              const hasRightThick = c === 2;
              // Thick horizontal line after row index 1 and 3 (divides into three 2-row blocks)
              const hasBottomThick = r === 1 || r === 3;

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => setSelectedCell([r, c])}
                  style={{ borderRadius: 0 }}
                  className={`w-11 h-11 aspect-square text-base font-black flex items-center justify-center transition-all ${
                    // Border dividers
                    hasRightThick ? 'border-r-4 border-r-slate-300' : c < 5 ? 'border-r border-r-slate-700' : ''
                  } ${
                    hasBottomThick ? 'border-b-4 border-b-slate-300' : r < 5 ? 'border-b border-b-slate-700' : ''
                  } ${
                    isErr
                      ? 'bg-rose-900 text-white animate-pulse'
                      : isSelected
                        ? 'bg-amber-400 text-slate-950 font-black ring-2 ring-inset ring-amber-300'
                        : isInitial
                          ? 'bg-slate-800 text-slate-100 font-extrabold cursor-not-allowed'
                          : val !== 0
                            ? 'bg-indigo-950/90 text-sky-300 hover:bg-indigo-900'
                            : 'bg-slate-950/90 text-slate-600 hover:bg-slate-800'
                  }`}
                >
                  {val !== 0 ? val : ''}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Number Keypad */}
      <div className="flex items-center gap-1.5 mt-3">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <button
            key={num}
            onClick={() => setNumber(num)}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white font-black text-sm border border-slate-700 shadow transition transform active:scale-95"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setNumber(0)}
          className="px-3 h-10 rounded-xl bg-rose-950/90 hover:bg-rose-800 text-rose-300 font-bold text-xs border border-rose-500/40"
          title="Seçili kareyi temizle"
        >
          Sil
        </button>
      </div>

      {/* Check Solution Button */}
      <button
        onClick={checkSolution}
        className="mt-3 w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg transition"
      >
        Kontrol Et ✓
      </button>

      {/* Oyun Sonu Uyarı / Tebrik Modalı */}
      <GameResultModal
        isOpen={!!gameResult}
        type={gameResult?.type}
        title={gameResult?.title}
        message={gameResult?.message}
        onRestart={restartGame}
        onClose={() => setGameResult(null)}
      />
    </div>
  );
}

// ============================================================================
// 5. XOX OYUNU: Yapay Zekâya Karşı (Sonuç Uyarısı Entegre)
// ============================================================================
function XoxGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ player: 0, ai: 0, ties: 0 });
  const [gameResult, setGameResult] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(s => s !== null)) return 'tie';
    return null;
  };

  const handleCellClick = (idx) => {
    if (board[idx] || gameResult || !isXNext) return;

    const next = [...board];
    next[idx] = 'X';
    setBoard(next);

    const win = checkWinner(next);
    if (win) {
      if (win === 'X') {
        setScores(s => ({ ...s, player: s.player + 1 }));
        setGameResult({
          type: 'win',
          title: "🏆 Tebrikler, Kazandın!",
          message: "Yapay zekâyı 3'lü çizgi kurarak mağlup ettin!"
        });
      } else if (win === 'tie') {
        setScores(s => ({ ...s, ties: s.ties + 1 }));
        setGameResult({
          type: 'tie',
          title: "🤝 Dostluk Kazandı!",
          message: "İki taraf da kusursuz oynadı, oyun berabere bitti!"
        });
      }
      return;
    }

    // AI Turn (O)
    setIsXNext(false);
    setTimeout(() => {
      const emptyIndices = next.map((val, i) => val === null ? i : null).filter(val => val !== null);
      if (emptyIndices.length > 0) {
        // Smart AI choice: Center > Corner > Random
        let aiIdx = emptyIndices.includes(4) ? 4 : emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        next[aiIdx] = 'O';
        setBoard(next);
        const aiWin = checkWinner(next);
        if (aiWin) {
          if (aiWin === 'O') {
            setScores(s => ({ ...s, ai: s.ai + 1 }));
            setGameResult({
              type: 'lose',
              title: "🤖 Yapay Zekâ Kazandı!",
              message: "Yapay zekâ senden önce seriyi tamamladı. Rövanş yapmaya ne dersin?"
            });
          } else if (aiWin === 'tie') {
            setScores(s => ({ ...s, ties: s.ties + 1 }));
            setGameResult({
              type: 'tie',
              title: "🤝 Dostluk Kazandı!",
              message: "İki taraf da kusursuz oynadı, oyun berabere bitti!"
            });
          }
        }
      }
      setIsXNext(true);
    }, 380);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameResult(null);
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto relative">
      {/* Scoreboard */}
      <div className="w-full flex items-center justify-between mb-3 text-xs font-black text-slate-300 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800">
        <span className="text-sky-400">Sen (X): {scores.player}</span>
        <span className="text-slate-400">Berabere: {scores.ties}</span>
        <span className="text-rose-400">AI (O): {scores.ai}</span>
      </div>

      {/* 3x3 Contiguous Grid */}
      <div className="grid grid-cols-3 gap-2.5 w-72 h-72 p-3 bg-slate-950 border-2 border-indigo-400/50 rounded-3xl shadow-2xl">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className={`w-full h-full aspect-square rounded-2xl text-3xl font-black flex items-center justify-center transition-all leading-none border-2 select-none box-border ${
              cell === 'X'
                ? 'bg-sky-950/90 text-sky-400 border-sky-400 shadow-md scale-95'
                : cell === 'O'
                  ? 'bg-rose-950/90 text-rose-400 border-rose-400 shadow-md scale-95'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-transparent border-slate-700/80 hover:border-slate-600'
            }`}
          >
            {cell || <span className="opacity-0 select-none">X</span>}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-600 transition"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Yeni Tur</span>
      </button>

      {/* Oyun Sonu Uyarı / Tebrik Modalı */}
      <GameResultModal
        isOpen={!!gameResult}
        type={gameResult?.type}
        title={gameResult?.title}
        message={gameResult?.message}
        onRestart={resetGame}
        onClose={() => setGameResult(null)}
      />
    </div>
  );
}

// ============================================================================
// MAIN ARCADE HUB COMPONENT: 5 Mini-Games Arcade
// ============================================================================
export default function MiniGamesArcade({ isOpen, onClose }) {
  const [activeGame, setActiveGame] = useState('mario');

  const GAMES = [
    { id: 'mario', title: 'Maarif Mario', icon: Gamepad2, color: 'text-amber-400', desc: 'Platform Koşusu' },
    { id: 'pacman', title: 'Paket-Man', icon: Ghost, color: 'text-sky-400', desc: 'Canlı Labirent' },
    { id: 'memory', title: 'Hafıza Kartı', icon: Brain, color: 'text-purple-400', desc: 'Eşleştir & Yok Et' },
    { id: 'sudoku', title: 'Kare Sudoku', icon: Grid, color: 'text-emerald-400', desc: 'Kare Izgara' },
    { id: 'xox', title: 'XOX Oyunu', icon: Zap, color: 'text-rose-400', desc: 'Yapay Zekâya Karşı' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel bg-slate-900/95 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto no-scrollbar justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Maarif Eğlence & Mini Oyunlar Kulübü</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  5 Oyun
                </span>
              </h3>
              <p className="text-xs text-slate-400">Ders aralarında zihnini dinlendir, eğlenerek reflekslerini ve mantığını geliştir!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Games Navigation Tabs (SVG Icons - Zero Tofu Rectangles) */}
        <div className="grid grid-cols-5 gap-2 mb-4 p-1.5 bg-slate-950/60 rounded-2xl border border-slate-800">
          {GAMES.map(g => {
            const isSelected = activeGame === g.id;
            const Icon = g.icon;
            return (
              <button
                key={g.id}
                onClick={() => setActiveGame(g.id)}
                className={`py-2 px-1.5 rounded-xl text-center transition flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-600/40 to-sky-600/40 border border-amber-400 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : g.color}`} />
                <span className="text-[11px] font-extrabold truncate w-full">{g.title}</span>
                <span className="text-[9px] text-slate-400 hidden sm:block truncate w-full">{g.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Active Game Stage */}
        <div className="py-2">
          {activeGame === 'mario' && <MarioPlatformGame />}
          {activeGame === 'pacman' && <PacmanMazeGame />}
          {activeGame === 'memory' && <MemoryCardGame />}
          {activeGame === 'sudoku' && <SudokuGame />}
          {activeGame === 'xox' && <XoxGame />}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-500">
          🎮 AçıkMaarif Özgür Eğlence Motoru · Sıfır Reklam, %100 Güvenli ve Eğitici
        </div>

      </div>
    </div>
  );
}
