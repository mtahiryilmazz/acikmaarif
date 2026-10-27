import React from 'react';
import { 
  GraduationCap, Flame, Heart, Coins, Trophy, 
  Sparkles, BookOpen, Layers, Radio, Headphones, 
  Gamepad2, AlertCircle, FileText, Code2, Sun, Moon,
  Library, ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  curriculumMode, 
  setCurriculumMode, 
  selectedGrade, 
  setSelectedGrade,
  grades = [],
  userStats = { hearts: 5, streak: 14, gold: 1450, xp: 8920, tier: 'ALTIN LİG' },
  gradeLevel = 12,
  onOpenArcade,
  theme = 'dark',
  onToggleTheme
}) {
  const isLight = theme === 'light';

  // Compact WinUI 3 Fluent Tabs (No horizontal scrolling, concise labels & direct icons)
  const navTabs = [
    { id: 'lesson', label: 'Dersler', fullTitle: 'Ders & Çoklu Anlatım', icon: Layers },
    { id: 'practice', label: 'Sorular', fullTitle: 'Soru Bankası & Adaptif Test', icon: BookOpen },
    { id: 'official', label: 'Resmî Kaynaklar', fullTitle: 'MEB & TTKB Müfredat ve Kitap Veritabanı', icon: Library, badge: 'MEB' },
    { id: 'arcade', label: 'Oyunlar', fullTitle: 'Mini Oyunlar Arcade (5 Oyun)', icon: Gamepad2, badge: '5 Oyun' },
    { id: 'arena', label: 'Düello', fullTitle: 'Eğlence Arenası (Canlı)', icon: Trophy, badge: 'Canlı' },
    { id: 'ebook', label: 'E-Kitap', fullTitle: 'E-Kitap & PDF Kalem', icon: FileText },
    { id: 'live', label: 'Canlı', fullTitle: 'Canlı Stüdyo Yayını', icon: Radio },
    { id: 'podcast', label: 'Podcast', fullTitle: 'Sesli Anlatım & Podcast', icon: Headphones },
    { id: 'errors', label: 'Hatalar', fullTitle: 'Akıllı Hata Defteri', icon: AlertCircle },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 border-b ${
      isLight 
        ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-800 shadow-sm' 
        : 'bg-slate-950/98 backdrop-blur-md border-slate-800 text-slate-100 shadow-md'
    }`}>
      {/* Top Banner: Consistent Global Notification */}
      <div className={`text-xs py-1.5 px-4 text-center border-b flex items-center justify-center gap-2 transition-colors ${
        isLight 
          ? 'bg-slate-100/90 text-slate-700 border-slate-200' 
          : 'bg-slate-900/95 text-slate-300 border-slate-800/80'
      }`}>
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>
          <strong className={isLight ? 'text-blue-700' : 'text-amber-300'}>AçıkMaarif Özgür Eğitim Platformu:</strong> Okul Öncesinden 12. Sınıfa Türkiye Yüzyılı Maarif Modeli & MEBİ Tam Entegre
        </span>
        <span className={`hidden md:inline-block px-2 py-0.5 rounded-full font-semibold text-[10px] border ${
          isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        }`}>
          KB1 · KB2 · KB3 Uyumlu
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Platform Title (100% Open Source Branding) */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setActiveTab('lesson')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-extrabold text-base sm:text-lg tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  AÇIK<span className="text-blue-500">MAARİF</span>
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                  isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  <Code2 className="w-2.5 h-2.5" /> ÖZGÜR
                </span>
              </div>
              <p className="text-[9px] text-slate-400 hidden sm:block">Özgür Millî Eğitim Teknolojileri</p>
            </div>
          </div>

          {/* Grade Selector & Maarif Mode Toggle */}
          <div className="flex items-center gap-2">
            <select
              id="grade-selector"
              aria-label="Sınıf Seçimi"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className={`text-xs rounded-lg px-2.5 py-1.5 border font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none max-w-[150px] sm:max-w-none transition-colors ${
                isLight 
                  ? 'bg-slate-50 border-slate-300 text-slate-800' 
                  : 'bg-slate-900 border-slate-700 text-slate-200'
              }`}
            >
              {grades.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            {/* Maarif 2028 vs Klasik Toggle */}
            <div className={`hidden md:flex items-center p-0.5 rounded-lg border text-xs ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}>
              <button
                onClick={() => setCurriculumMode('maarif_2028')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  curriculumMode === 'maarif_2028'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Maarif (TYMM)
              </button>
              <button
                onClick={() => setCurriculumMode('klasik_mezun')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  curriculumMode === 'klasik_mezun'
                    ? isLight ? 'bg-slate-700 text-white shadow-sm' : 'bg-slate-700 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Klasik / Mezun
              </button>
            </div>
          </div>

          {/* Gamification Stats & WinUI 3 Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Hearts */}
            <div className={`flex items-center gap-1 border px-2 py-1 rounded-full text-xs font-semibold ${
              isLight ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-rose-950/40 border-rose-900/40 text-rose-300'
            }`}>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{userStats.hearts}/5</span>
            </div>

            {/* Streak */}
            <div className={`hidden sm:flex items-center gap-1 border px-2 py-1 rounded-full text-xs font-semibold ${
              isLight ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-amber-950/40 border-amber-900/40 text-amber-300'
            }`}>
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{userStats.streak}G</span>
            </div>

            {/* Gold */}
            <div className={`hidden sm:flex items-center gap-1 border px-2 py-1 rounded-full text-xs font-semibold ${
              isLight ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-yellow-950/40 border-yellow-900/40 text-yellow-300'
            }`}>
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span>{userStats.gold.toLocaleString('tr-TR')}</span>
            </div>

            {/* WinUI 3 Fluent Light/Dark Theme Switcher */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold ${
                isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm' 
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-amber-300 shadow-md'
              }`}
              title={isLight ? 'WinUI 3 Koyu Moduna Geç' : 'WinUI 3 Açık Moduna Geç'}
            >
              {isLight ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden xl:inline text-[11px] font-medium text-slate-700">Koyu</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden xl:inline text-[11px] font-medium text-slate-300">Açık</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* WinUI 3 Navigation View Tabs: Metinler kompakt, kaydırma çubuğu yok, doğrudan simge & net etiket */}
        <nav className={`flex items-center justify-between overflow-x-hidden py-1.5 border-t gap-1 ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={tab.fullTitle}
                className={`relative flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex-1 text-center ${
                  isActive
                    ? isLight 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm font-bold'
                      : 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm font-bold'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-500' : ''}`} />
                <span className="truncate">{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[8px] font-extrabold px-1 rounded-full uppercase leading-tight ${
                    tab.badge === 'MEB'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {/* WinUI 3 Active Accent Indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
