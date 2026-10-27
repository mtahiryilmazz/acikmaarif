import React, { useState, useEffect, useRef } from 'react';
import { 
  X, BrainCircuit, Sparkles, Send, Camera, 
  HelpCircle, MessageSquare, Bot, Mic, MicOff, 
  Volume2, VolumeX, Lightbulb, Play, CheckCircle2,
  Compass, Zap, Search, History
} from 'lucide-react';

const AI_AGENTS_LIST = [
  {
    id: "bilge",
    name: "Prof. Bilge Hoca",
    role: "Akademik & Maarif",
    badge: "Sokratik & İspat",
    avatar: "🎓",
    color: "from-blue-600 to-indigo-600",
    voice_pitch: 0.95,
    voice_rate: 0.95
  },
  {
    id: "kanka",
    name: "KANKA Koç",
    role: "YKS / LGS Strateji",
    badge: "Taktik & Net",
    avatar: "⚡",
    color: "from-amber-500 to-orange-600",
    voice_pitch: 1.15,
    voice_rate: 1.05
  },
  {
    id: "dedektif",
    name: "Soru Dedektifi",
    role: "Çeldirici Avcısı",
    badge: "Tuzak Dedektörü",
    avatar: "🕵️",
    color: "from-emerald-600 to-teal-600",
    voice_pitch: 1.0,
    voice_rate: 1.0
  },
  {
    id: "minik_kasif",
    name: "Minik Kaşif",
    role: "Erken Çocukluk & Oyun",
    badge: "Masal & Sayılar",
    avatar: "🎈",
    color: "from-pink-500 to-rose-600",
    voice_pitch: 1.3,
    voice_rate: 0.98
  }
];

export default function AiCoachModal({ isOpen, onClose, questionContext }) {
  const [activeAgentId, setActiveAgentId] = useState('bilge');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      agentId: 'bilge',
      text: 'Merhaba! Ben senin 7/24 yapay zekâ koçun Prof. Bilge Hoca. Türkiye Yüzyılı Maarif Modeli kazanımları, formül ispatları veya aklına takılan her soruda yanındayım. Ne sormak istersin?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [currentlySpeakingIdx, setCurrentlySpeakingIdx] = useState(null);
  
  // AI Type Prediction state
  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [activeTopic, setActiveTopic] = useState('genel');

  const recognitionRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Real-time AI Type Prediction as student types
  useEffect(() => {
    if (!inputVal.trim() || inputVal.trim().length < 2) {
      setPrediction(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsPredicting(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/api/ai/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: inputVal })
        });
        const data = await res.json();
        setPrediction(data);
      } catch (e) {
        // Fallback local heuristic prediction
        const q = inputVal.trim().toLowerCase();
        if (/^\d+[\+\-\*\/]\d+/.test(q)) {
          setPrediction({
            type: 'math_calc',
            category: '🧮 Matematik Hesaplama',
            title: `Aritmetik İşlem: ${q}`,
            quick_answer: 'İşlem sonucu hesaplanıyor...',
            suggested_queries: [`${q} adım adım ispatı`]
          });
        } else if (q.includes('1453') || q.includes('istanbul')) {
          setPrediction({
            type: 'history_event',
            category: '🏛️ Tarih & Medeniyet',
            title: "İstanbul'un Fethi (29 Mayıs 1453)",
            quick_answer: 'Fatih Sultan Mehmet komutasında Orta Çağ kapanıp Yeni Çağ başlamıştır.',
            suggested_queries: ["Fethin sonuçları", "Şahi topları"]
          });
        }
      } finally {
        setIsPredicting(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [inputVal]);

  // Speech Recognition (Speech-to-Text) Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'tr-TR';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputVal(transcript);
          handleSend(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [activeAgentId]);

  // Text-to-Speech (Spoken Voice Output)
  const speakText = (text, agentId = activeAgentId, msgIdx = null) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (msgIdx !== null && currentlySpeakingIdx === msgIdx) {
      setCurrentlySpeakingIdx(null);
      return;
    }

    const cleanText = text
      .replace(/[\$\*\#\>\`\_]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'tr-TR';

    const currentAgent = AI_AGENTS_LIST.find(a => a.id === agentId) || AI_AGENTS_LIST[0];
    utterance.pitch = currentAgent.voice_pitch || 1.0;
    utterance.rate = currentAgent.voice_rate || 1.0;

    // Pick best available Turkish voice
    const voices = window.speechSynthesis.getVoices();
    const trVoice = voices.find(v => v.lang.includes('tr') || v.lang.includes('TR'));
    if (trVoice) utterance.voice = trVoice;

    utterance.onstart = () => {
      setCurrentlySpeakingIdx(msgIdx);
    };
    utterance.onend = () => {
      setCurrentlySpeakingIdx(null);
    };
    utterance.onerror = () => {
      setCurrentlySpeakingIdx(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Tarayıcınız ses tanımayı desteklemiyor. Chrome veya Edge kullanabilirsiniz.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      window.speechSynthesis?.cancel();
      recognitionRef.current.start();
    }
  };

  if (!isOpen) {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    return null;
  }

  const handleSend = async (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputVal('');
    setPrediction(null);
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text, 
          question_context: questionContext,
          agent_id: activeAgentId,
          history: updatedHistory,
          topic: activeTopic
        })
      });
      const data = await response.json();
      setIsTyping(false);

      if (data.topic) {
        setActiveTopic(data.topic);
      }

      const newMsg = {
        sender: 'ai',
        agentId: activeAgentId,
        text: data.reply,
        spokenText: data.spoken_text || data.reply,
        actions: data.suggested_actions,
        prediction: data.prediction,
        topic: data.topic
      };

      setMessages(prev => [...prev, newMsg]);

      // Auto spoken voice readout if enabled
      if (isVoiceActive) {
        speakText(data.spoken_text || data.reply, activeAgentId, updatedHistory.length);
      }
    } catch (e) {
      setIsTyping(false);
      const fallbackMsg = {
        sender: 'ai',
        agentId: activeAgentId,
        text: 'Bu soruyu çözmek için önce temel formülleri ve verilenleri ayrıştıralım. Adım adım gidelim mi?',
        spokenText: 'Soruyu çözmek için adım adım gidelim mi?'
      };
      setMessages(prev => [...prev, fallbackMsg]);
      if (isVoiceActive) {
        speakText(fallbackMsg.spokenText, activeAgentId);
      }
    }
  };

  const currentAgent = AI_AGENTS_LIST.find(a => a.id === activeAgentId) || AI_AGENTS_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel bg-slate-900/95 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col h-[600px] justify-between overflow-hidden">
        
        {/* Top Header & Agent Picker */}
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${currentAgent.color} flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 text-xl font-bold`}>
                {currentAgent.avatar}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>{currentAgent.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                    {currentAgent.badge}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">{currentAgent.role}</p>
              </div>
            </div>

            {/* Controls: Voice Toggle, Close */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  const nextVoice = !isVoiceActive;
                  setIsVoiceActive(nextVoice);
                  if (!nextVoice && window.speechSynthesis) window.speechSynthesis.cancel();
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition ${
                  isVoiceActive 
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
                title={isVoiceActive ? "Sesli Yanıt: Açık (Kapatmak için tıkla)" : "Sesli Yanıt: Kapalı (Açmak için tıkla)"}
              >
                {isVoiceActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[10px] hidden sm:inline">{isVoiceActive ? 'Sesli Açık' : 'Sesli Kapalı'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 4 Specialized AI Agents Roster Tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            {AI_AGENTS_LIST.map((ag) => {
              const isSelected = ag.id === activeAgentId;
              return (
                <button
                  key={ag.id}
                  onClick={() => {
                    setActiveAgentId(ag.id);
                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                  }}
                  className={`py-1.5 px-2 rounded-xl text-left transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800 border border-indigo-400/50 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-base">{ag.avatar}</span>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-extrabold truncate">{ag.name.split(' ')[1] || ag.name}</div>
                    <div className="text-[9px] text-slate-400 truncate">{ag.role.split(' ')[0]}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat History & Interactive Dialogue */}
        <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs no-scrollbar">
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            const msgAgent = AI_AGENTS_LIST.find(a => a.id === m.agentId) || currentAgent;
            const isSpeakingThis = currentlySpeakingIdx === idx;

            return (
              <div
                key={idx}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fadeIn`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                    <span>{msgAgent.avatar}</span>
                    <span className="font-bold text-slate-300">{msgAgent.name}</span>
                  </div>
                )}

                <div
                  className={`relative max-w-[88%] p-3.5 rounded-2xl ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none shadow-lg'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>

                  {/* Audio Readout Replay Button for AI Messages */}
                  {!isUser && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px]">
                      <button
                        onClick={() => speakText(m.spokenText || m.text, m.agentId || activeAgentId, idx)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition font-bold ${
                          isSpeakingThis 
                            ? 'bg-amber-500 text-slate-950 animate-pulse' 
                            : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300'
                        }`}
                        title="Bu cevabı sesli oku / durdur"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{isSpeakingThis ? 'Konuşuyor...' : 'Sesli Dinle 🔊'}</span>
                      </button>

                      <span className="text-slate-400 text-[9px]">{m.prediction?.category || 'Pedagojik Çözüm'}</span>
                    </div>
                  )}
                </div>

                {/* Suggested Action Chips */}
                {m.actions && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {m.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleSend(act)}
                        className="px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-900/60 hover:text-white transition flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                        <span>{act}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold p-2 bg-slate-800/40 rounded-xl w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
              <span>{currentAgent.name} düşünüyor ve cevabı seslendiriyor...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Real-time AI Type Prediction Preview Bar ("1+1", "1453", "istanbul fethi", etc.) */}
        {prediction && prediction.type !== 'empty' && (
          <div className="mb-2 p-2.5 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-purple-950/90 border-2 border-amber-400/50 shadow-xl flex items-center justify-between gap-3 animate-slideInRight">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-base flex-shrink-0">
                {prediction.icon || '💡'}
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-amber-300">
                  <span>{prediction.category}</span>
                  <span className="text-slate-400">· Yapay Zekâ Tahmini</span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {prediction.title || prediction.quick_answer}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSend(prediction.quick_answer || inputVal)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-md flex items-center gap-1 flex-shrink-0 transition transform hover:scale-105 active:scale-95"
            >
              <span>Hemen Sor ➔</span>
            </button>
          </div>
        )}

        {/* Input Bar & Controls */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 pt-2 border-t border-slate-800">
          
          {/* Microphone Speech-to-Text Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`p-2.5 rounded-2xl border transition flex items-center justify-center shadow-md ${
              isListening
                ? 'bg-rose-600 border-white text-white animate-pulse ring-4 ring-rose-500/40'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title={isListening ? "Dinleniyor... (Durdurmak için tıkla)" : "Sesli Konuş (Mikrofonla Sor)"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-sky-400" />}
          </button>

          {/* Text Input with Type Prediction placeholder */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Sorunu yaz (Örn: '1+1', '1453', 'İstanbul kaçta fethedildi', 'fotosentez')..."
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-2xl pl-3 pr-8 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
            {isPredicting && (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            )}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold transition shadow-lg shadow-indigo-500/30 transform active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
