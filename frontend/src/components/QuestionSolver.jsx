import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Video, Lightbulb, 
  HelpCircle, Sparkles, BookOpen, ChevronRight, 
  ChevronLeft, Award, BrainCircuit, RefreshCw, Star
} from 'lucide-react';

export default function QuestionSolver({ 
  questions, 
  onAnswerSubmit, 
  onOpenAiCoach,
  userStats 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showAiHint, setShowAiHint] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  const currentQ = questions[currentIndex] || questions[0];
  const isAnswered = submittedAnswers[currentQ.id] !== undefined;
  const isCorrect = submittedAnswers[currentQ.id] === currentQ.correct_option;

  const handleSelectOption = (key) => {
    if (isAnswered) return;
    setSelectedOption(key);
  };

  const handleSubmit = () => {
    if (!selectedOption || isAnswered) return;
    const correct = selectedOption === currentQ.correct_option;
    setSubmittedAnswers(prev => ({ ...prev, [currentQ.id]: selectedOption }));
    setShowSolution(true);

    if (onAnswerSubmit) {
      onAnswerSubmit({
        questionId: currentQ.id,
        isCorrect: correct,
        difficulty_b: currentQ.difficulty_irt,
        selectedOption: selectedOption
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(submittedAnswers[questions[currentIndex + 1]?.id] || null);
      setShowSolution(submittedAnswers[questions[currentIndex + 1]?.id] !== undefined);
      setShowAiHint(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(submittedAnswers[questions[currentIndex - 1]?.id] || null);
      setShowSolution(true);
      setShowAiHint(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Test Header & Filter Bar */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {currentQ.subject} · {currentQ.topic}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {currentQ.source_exam}
            </span>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Maarif Modeli {currentQ.skill_layer}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Çözümlü Soru Bankası & MEB Kazanım Testi
          </h2>
        </div>

        {/* Question Counter & Navigation */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Soru {currentIndex + 1} / {questions.length}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
        
        {/* Question Text */}
        <div className="text-slate-100 text-base md:text-lg leading-relaxed font-medium">
          {currentQ.question_text}
        </div>

        {/* Options A - E (With Preschool Colorful Shapes when grade 0) */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === opt.key;
            const isPreschoolQ = currentQ.grade_level === 0;

            const preschoolCardThemes = [
              { border: 'border-pink-500/40', bg: 'bg-gradient-to-r from-pink-950/50 to-purple-950/40', badge: '🔴', text: 'text-pink-100' },
              { border: 'border-blue-500/40', bg: 'bg-gradient-to-r from-blue-950/50 to-indigo-950/40', badge: '🔺', text: 'text-blue-100' },
              { border: 'border-emerald-500/40', bg: 'bg-gradient-to-r from-emerald-950/50 to-teal-950/40', badge: '🟩', text: 'text-emerald-100' },
              { border: 'border-amber-500/40', bg: 'bg-gradient-to-r from-amber-950/50 to-yellow-950/40', badge: '🟨', text: 'text-amber-100' },
            ];

            const theme = preschoolCardThemes[idx % preschoolCardThemes.length];

            let btnStyle = isPreschoolQ 
              ? `${theme.bg} ${theme.border} ${theme.text} hover:scale-[1.01] hover:border-white/60 shadow-md`
              : "bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700";

            if (isAnswered) {
              if (opt.key === currentQ.correct_option) {
                btnStyle = "bg-emerald-950/90 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/20";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500/40";
              }
            } else if (isSelected) {
              btnStyle = isPreschoolQ
                ? `${theme.bg} border-amber-300 ring-3 ring-amber-400/60 shadow-xl`
                : "bg-blue-600/20 border-blue-500 text-blue-200 ring-2 ring-blue-500/40";
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                className={`w-full p-4 md:p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${btnStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shadow ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200'
                  }`}>
                    {opt.key}
                  </span>
                  {isPreschoolQ && (
                    <span className="text-xl filter drop-shadow animate-pulse-slow">
                      {theme.badge}
                    </span>
                  )}
                  <span className={`font-bold ${isPreschoolQ ? 'text-base text-white' : 'text-sm'}`}>
                    {opt.text}
                  </span>
                </div>

                {isAnswered && opt.key === currentQ.correct_option && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls: Submit Answer / Socratic Hint / AI Coach */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {!isAnswered ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm disabled:opacity-40 shadow-lg shadow-blue-500/25 transition"
              >
                Cevabı Onayla
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm font-bold">
                {isCorrect ? (
                  <span className="text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/40 px-3 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /> Tebrikler! Doğru Cevap (+{currentQ.blooket_gold_reward} Altın, +50 XP)
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5 bg-rose-950/40 border border-rose-500/40 px-3 py-1 rounded-lg">
                    <XCircle className="w-4 h-4" /> Yanlış! Soru Akıllı Hata Defterine Eklendi
                  </span>
                )}
              </div>
            )}

            <button
              onClick={() => setShowAiHint(!showAiHint)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showAiHint ? 'İpucunu Kapat' : 'Sokratik İpucu Al'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAiCoach(currentQ)}
              className="px-4 py-2 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/50 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Bilge & KANKA'ya Bu Soruyu Sor</span>
            </button>
          </div>
        </div>

        {/* Socratic Hint Box */}
        {showAiHint && (
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3 animate-fadeIn">
            <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-300 mb-0.5">Bilge'nin Zihinsel İpucu:</div>
              <p>{currentQ.ai_hint}</p>
            </div>
          </div>
        )}

        {/* 3-Layer Solution Panel (Shown after answer submission) */}
        {showSolution && (
          <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>3 Katmanlı Çözüm Açıklaması</span>
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">
                Doğru Seçenek: <strong className="text-emerald-400">{currentQ.correct_option}</strong>
              </span>
            </div>

            {/* Step-by-Step LaTeX Solution */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
              {currentQ.solution_steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-mono text-slate-200">{step}</span>
                </div>
              ))}
            </div>

            {/* Video Solution Link Button */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Video className="w-4 h-4 text-rose-400" />
                <span>Bu sorunun <strong>Uzman Öğretmenden 1080p Tahta Çözümü</strong> hazır.</span>
              </div>
              <button 
                onClick={() => alert("Video çözüm oynatıcısı başlatıldı.")}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 transition"
              >
                Videoyu İzle
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
