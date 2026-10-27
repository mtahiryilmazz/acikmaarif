import React, { useState } from 'react';
import { Sparkles, Eye, Brain, HelpCircle, ArrowRight } from 'lucide-react';

export default function MemoryTechniqueCard({ topic, onAskAi }) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-950/20 via-slate-900/40 to-slate-900/60">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Hafıza Tekniği & Refleks Kodlaması</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                Bilişsel & Mnemonic Metot
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Görsel hafıza çemberi ile formülü ezberlemeden kalıcı kodla
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showExplanation ? 'Gizle' : 'Zihinsel Çapayı Aç'}</span>
        </button>
      </div>

      {/* Visual Memory Mnemonic Diagram */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-center gap-6">
        {/* Animated SVG Diagram */}
        <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" style={{ animationDuration: '3s' }} />
          <svg viewBox="0 0 100 100" className="w-28 h-28 text-amber-400 drop-shadow-md">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" className="animate-spin" style={{ animationDuration: '20s' }} />
            <circle cx="50" cy="50" r="28" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
            <text x="50" y="47" textAnchor="middle" fill="#fef08a" fontSize="14" fontWeight="bold">ln(x)</text>
            <text x="50" y="62" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">e^y</text>
            <path d="M 50 15 L 50 22 M 50 78 L 50 85 M 15 50 L 22 50 M 78 50 L 85 50" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Narrative & Memory Hook */}
        <div className="flex-1 space-y-2">
          <div className="text-xs font-bold text-amber-200">
            🎯 Hafıza Hikayesi: "Euler'in Asansörü ve Yer Çekimi Logaritması"
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Üs havaya zıplamak isterken, $e$ tabanı asansörün zeminini oluşturur. 
            Doğal logaritma $(\ln)$ devreye girdiğinde tavan açılır ve üs aşağıya serbest düşüş yaparak çarpım durumuna geçer:
            <span className="font-mono text-amber-300 font-bold ml-1">
              {'ln(e^(0.4t)) = 0.4t'}
            </span>. Artık üs yerde, işlem tek satırda çözüldü!
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => onAskAi("Bu hafıza tekniğini bana farklı bir görsel hikayeyle açıklar mısın?")}
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Bilge'ye Başka Bir Benzetim Sor</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
