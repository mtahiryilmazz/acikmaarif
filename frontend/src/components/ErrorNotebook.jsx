import React from 'react';
import { 
  AlertCircle, Calendar, RefreshCw, CheckCircle2, 
  TrendingUp, Sparkles, BookOpen, ArrowRight 
} from 'lucide-react';

export default function ErrorNotebook({ errors, onSolveAgain }) {
  const mockErrors = errors?.length ? errors : [
    {
      id: 'err_1',
      subject: 'Matematik',
      topic: 'Üstel ve Logaritmik Modeller',
      question: 'Bakteri popülasyonu ln(2) hesabı işlemi',
      errorReason: 'İşlem Hatası (ln alma kuralı)',
      nextReviewDate: 'Yarın (28 Ekim)',
      reviewStage: '1. Tekrar (Ebbinghaus 1 Gün)',
      isMastered: false
    },
    {
      id: 'err_2',
      subject: 'Fizik',
      topic: 'Young Deneyi & Çift Yarıkta Girişim',
      question: 'Kırıcılık indisi n ve dalga boyu saçak genişliği bağıntısı',
      errorReason: 'Kavram Yanılgısı (n arttıkça saçak küçülür)',
      nextReviewDate: '3 Gün Sonra (30 Ekim)',
      reviewStage: '2. Tekrar (Ebbinghaus 3 Gün)',
      isMastered: false
    },
    {
      id: 'err_3',
      subject: 'Türkçe',
      topic: 'Paragrafta Akışı Bozan Cümle',
      question: 'Yapay zeka ve bilinç felsefesi metni',
      errorReason: 'Çeldiriciye Takılma',
      nextReviewDate: '1 Hafta Sonra (3 Kasım)',
      reviewStage: '3. Tekrar (Ebbinghaus 7 Gün)',
      isMastered: false
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Akıllı Hata Defteri & Ebbinghaus Analizi
            </span>
            <span className="text-xs text-slate-400">
              Ebbinghaus Unutma Eğrisi ile Sıfır Net Kaybı
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Akıllı Hata Defteri & Eksik Kazanım İlaçlama
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold">Kurtarılan Net Potansiyeli</div>
            <div className="text-sm font-extrabold text-emerald-400">+4.75 Net</div>
          </div>
        </div>
      </div>

      {/* Spaced Repetition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockErrors.map((err) => (
          <div
            key={err.id}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold text-blue-400">{err.subject}</span>
                <span className="font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                  {err.nextReviewDate}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1">
                {err.topic}
              </h4>
              <p className="text-xs text-slate-400 mb-2">
                {err.question}
              </p>

              <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-[11px] text-rose-300">
                <strong>Hata Nedeni:</strong> {err.errorReason}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-semibold">
                {err.reviewStage}
              </span>

              <button
                onClick={() => onSolveAgain(err)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 transition"
              >
                <span>İkizini Çöz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
