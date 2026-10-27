import React, { useState } from 'react';
import { 
  Radio, Users, MessageSquare, Send, ThumbsUp, 
  BarChart2, Sparkles, CheckCircle2, Video 
} from 'lucide-react';

export default function LiveStudioClass() {
  const [messages, setMessages] = useState([
    { user: 'Ahmet_YKS', text: 'Hocam türev alma kuralında neden katsayıyı öne alıyoruz?', time: '12:04' },
    { user: 'Zeynep_Sayisal', text: 'Ses ve görüntü mükemmel, 1080p harika akıyor.', time: '12:05' },
    { user: 'Mehmet_Maarif', text: 'Bu soru 2024 MEBİ denemesinde de çıkmıştı.', time: '12:06' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [pollVoted, setPollVoted] = useState(null);
  const [pollVotes, setPollVotes] = useState({ A: 64, B: 36 });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, { user: 'Sen', text: inputMsg, time: '12:07' }]);
    setInputMsg('');
  };

  const handleVotePoll = (option) => {
    if (pollVoted) return;
    setPollVoted(option);
    setPollVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              CANLI YAYIN
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-400" /> 1.482 Öğrenci İzliyor
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            YKS 2028 & Maarif Modeli: Canlı Soru Kampı ve Konsept Analizi
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300">
            Stüdyo 1 · 1080p Canlı
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Live Broadcast Video / Screen (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col justify-between">
            
            {/* Live Video Canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 p-8 flex flex-col justify-between">
              
              {/* Broadcast Overlay Info */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-700 text-xs text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <strong>Prof. Dr. Selim Hoca</strong> ile Canlı Matematik
                </div>
                <div className="text-xs bg-rose-600 text-white font-bold px-2 py-0.5 rounded">
                  CANLI
                </div>
              </div>

              {/* Central Whiteboard */}
              <div className="my-auto text-center space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/40 inline-block shadow-2xl">
                  <div className="text-xs text-indigo-300 font-mono mb-1">
                    [CANLI YAZI TAHTASI]
                  </div>
                  <div className="text-2xl font-black text-amber-300 font-mono">
                    lim_(x→0) (sin x / x) = 1  ⟹  Türev İspatı
                  </div>
                </div>
                <div className="text-xs text-slate-300">
                  Öğretmen mikrofonda: "Arkadaşlar, pay ve paydanın serilerini incelediğimizde..."
                </div>
              </div>

              {/* Live Poll Widget Overlay inside Screen */}
              <div className="z-10 p-4 rounded-xl bg-slate-950/90 border border-blue-500/40 max-w-md mx-auto w-full">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-blue-400" /> Anlık Sınıf Anketi:
                  </span>
                  <span className="text-[10px] text-slate-400">1.240 Oy</span>
                </div>
                <p className="text-xs text-slate-200 mb-2">
                  Sonraki adımda L'Hôpital kuralı uygulanabilir mi?
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleVotePoll('A')}
                    className={`p-2 rounded-lg border font-bold flex items-center justify-between ${
                      pollVoted === 'A' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>Evet (Belirsizlik var)</span>
                    <span className="font-mono text-[10px]">{pollVotes.A}%</span>
                  </button>
                  <button
                    onClick={() => handleVotePoll('B')}
                    className={`p-2 rounded-lg border font-bold flex items-center justify-between ${
                      pollVoted === 'B' ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-900 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>Hayır (Gerek yok)</span>
                    <span className="font-mono text-[10px]">{pollVotes.B}%</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Live Chat Panel (Right Col) */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col h-[420px] justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Canlı Sınıf Sohbeti</span>
            </h3>
            <span className="text-[10px] font-semibold text-emerald-400">
              Moderatör Aktif
            </span>
          </div>

          {/* Chat Messages Scrollable */}
          <div className="flex-1 overflow-y-auto space-y-2.5 py-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <strong className={m.user === 'Sen' ? 'text-amber-400' : 'text-blue-400'}>
                    {m.user}
                  </strong>
                  <span className="text-slate-500">{m.time}</span>
                </div>
                <p className="text-slate-300">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Hocaya canlı soru sor..."
              className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
