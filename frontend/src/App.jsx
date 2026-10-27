import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MultiTeacherPlayer from './components/MultiTeacherPlayer';
import QuestionSolver from './components/QuestionSolver';
import GamifiedArena from './components/GamifiedArena';
import EBookPdfViewer from './components/EBookPdfViewer';
import LiveStudioClass from './components/LiveStudioClass';
import AudioPodcastPlayer from './components/AudioPodcastPlayer';
import ErrorNotebook from './components/ErrorNotebook';
import AiCoachModal from './components/AiCoachModal';
import MiniGamesArcade from './components/MiniGamesArcade';
import ThemeDecorations from './components/ThemeDecorations';
import WanderingMascots from './components/WanderingMascots';
import MascotStudioPanel from './components/MascotStudioPanel';
import OfficialCurriculumExplorer from './components/OfficialCurriculumExplorer';
import { Bot, Sparkles, Palette } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('lesson');
  const [curriculumMode, setCurriculumMode] = useState('maarif_2028');
  const [selectedGrade, setSelectedGrade] = useState('okul_oncesi');
  const [isAiCoachOpen, setIsAiCoachOpen] = useState(false);
  const [coachContext, setCoachContext] = useState(null);
  const [isGamesArcadeOpen, setIsGamesArcadeOpen] = useState(false);
  const [activeEbookId, setActiveEbookId] = useState(null);

  // WinUI 3 Fluent Light & Dark Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('acikmaarif_theme') || 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('acikmaarif_theme', nextTheme);
      return nextTheme;
    });
  };

  // 3D Mascot Studio State (Live designer)
  const [mascotConfig, setMascotConfig] = useState({
    isVisible: true,
    animal: 'tavsan',
    colorHex: '#ffffff',
    scale: 0.48
  });
  const [isMascotStudioOpen, setIsMascotStudioOpen] = useState(false);

  // Multiple Roaming Mascots on screen (Default: Tavşan & Panda)
  const [mascots, setMascots] = useState([
    { id: 'm-tavsan', animal: 'tavsan', colorHex: '#ffffff', scale: 0.48, x: 20, dir: 1, speed: 0.04 },
    { id: 'm-panda', animal: 'panda', colorHex: '#1e293b', scale: 0.48, x: 68, dir: -1, speed: 0.04 }
  ]);
  const [speedMultiplier, setSpeedMultiplier] = useState(0.5); // Default to calm, relaxing speed

  // Grade Level Mapping (0: Okul Öncesi, 1-12: Sınıflar)
  const GRADE_LEVEL_MAP = {
    'okul_oncesi': 0,
    'sinif_1': 1,
    'sinif_2': 2,
    'sinif_3': 3,
    'sinif_4': 4,
    'sinif_5': 5,
    'sinif_6': 6,
    'sinif_7': 7,
    'sinif_8': 8,
    'lgs_8': 8,
    'sinif_9': 9,
    'sinif_10': 10,
    'sinif_11': 11,
    'sinif_12': 12,
    'yks_12': 12
  };

  // User Stats & Gamification State
  const [userStats, setUserStats] = useState({
    hearts: 5,
    streak: 14,
    gold: 1450,
    xp: 8920,
    tier: 'ALTIN LİG'
  });

  // Data loaded from backend (Pre-school to Grade 12)
  const [grades, setGrades] = useState([
    { id: 'okul_oncesi', name: 'Okul Öncesi (3-6 Yaş)', level: 0 },
    { id: 'sinif_1', name: '1. Sınıf (İlk Okuma & Sayılar)', level: 1 },
    { id: 'sinif_2', name: '2. Sınıf', level: 2 },
    { id: 'sinif_3', name: '3. Sınıf', level: 3 },
    { id: 'sinif_4', name: '4. Sınıf', level: 4 },
    { id: 'sinif_5', name: '5. Sınıf', level: 5 },
    { id: 'sinif_6', name: '6. Sınıf', level: 6 },
    { id: 'sinif_7', name: '7. Sınıf', level: 7 },
    { id: 'sinif_8', name: '8. Sınıf (LGS Hazırlık)', level: 8 },
    { id: 'sinif_9', name: '9. Sınıf (Maarif Modeli)', level: 9 },
    { id: 'sinif_10', name: '10. Sınıf (Maarif Modeli)', level: 10 },
    { id: 'sinif_11', name: '11. Sınıf (Maarif Modeli)', level: 11 },
    { id: 'sinif_12', name: '12. Sınıf & Mezun - YKS (TYT/AYT/YDT)', level: 12 },
  ]);

  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [ebooks, setEbooks] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [errorList, setErrorList] = useState([]);

  // Fetch initial data from local server
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/curriculum/grades')
      .then(res => res.json())
      .then(d => { if (d.grades && d.grades.length > 0) setGrades(d.grades); })
      .catch(() => {});

    fetch('http://127.0.0.1:8000/api/curriculum/topics')
      .then(res => res.json())
      .then(d => { if (d.topics && d.topics.length > 0) setTopics(d.topics); })
      .catch(() => {});

    fetch('http://127.0.0.1:8000/api/questions')
      .then(res => res.json())
      .then(d => { if (d.questions && d.questions.length > 0) setQuestions(d.questions); })
      .catch(() => {});

    fetch('http://127.0.0.1:8000/api/ebooks')
      .then(res => res.json())
      .then(d => { if (d.ebooks && d.ebooks.length > 0) setEbooks(d.ebooks); })
      .catch(() => {});

    fetch('http://127.0.0.1:8000/api/podcasts')
      .then(res => res.json())
      .then(d => { if (d.podcasts && d.podcasts.length > 0) setPodcasts(d.podcasts); })
      .catch(() => {});
  }, []);

  const handleAnswerSubmit = (result) => {
    if (result.isCorrect) {
      setUserStats(prev => ({
        ...prev,
        xp: prev.xp + 50,
        gold: prev.gold + 100
      }));
    } else {
      setUserStats(prev => ({
        ...prev,
        hearts: Math.max(0, prev.hearts - 1)
      }));
      // Add to Error Notebook
      const questionObj = questions.find(q => q.id === result.questionId);
      if (questionObj) {
        setErrorList(prev => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            subject: questionObj.subject,
            topic: questionObj.topic,
            question: questionObj.question_text.slice(0, 60) + '...',
            errorReason: 'Çeldiriciye Takılma',
            nextReviewDate: 'Yarın (Ebbinghaus)',
            reviewStage: '1. Tekrar',
            isMastered: false
          }
        ]);
      }
    }

    // Call backend CAT evaluate endpoint
    fetch('http://127.0.0.1:8000/api/exam/cat-evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current_theta: 0.2,
        is_correct: result.isCorrect,
        difficulty_b: result.difficulty_b,
        attempt_count: 1
      })
    }).catch(() => {});
  };

  const handleUpdateStats = ({ goldAdd = 0, xpAdd = 0 }) => {
    setUserStats(prev => ({
      ...prev,
      gold: prev.gold + goldAdd,
      xp: prev.xp + xpAdd
    }));
  };

  const handleOpenAiCoach = (context = null) => {
    setCoachContext(context);
    setIsAiCoachOpen(true);
  };

  // Determine current active numeric grade level
  const currentLevel = GRADE_LEVEL_MAP[selectedGrade] !== undefined 
    ? GRADE_LEVEL_MAP[selectedGrade] 
    : 12;

  // Dynamically filtered topic according to selected grade (Okul Öncesi ... 12. Sınıf)
  const activeTopic = topics.find(t => t.grade_level === currentLevel) || topics[0] || {
    id: 'mat_default',
    subject: 'Matematik',
    grade_level: 11,
    skill_layer: 'KB3',
    sub_outcome_code: 'MAT.11.1.2.1',
    title: 'Üstel ve Logaritmik Fonksiyonların Hayat Modelleri',
    summary: 'Deprem büyüklüğü (Richter) ve ses şiddeti (Desibel) gibi gerçek hayat bağlamlarında logaritmik modelleme.',
    teachers: [
      { id: 't1', name: 'Prof. Dr. Selim Hoca', mode: 'İspatlı & Bilimsel', quote: 'Logaritmanın Euler kökenlerine inerek formülü zihninize kazıyacağız.' },
      { id: 't2', name: 'Burak Hoca (YKS Başarı Koçu)', mode: 'Derece Odaklı / Pratik', quote: "ÖSYM'nin ters fonksiyon tuzaklarını 15 saniyede eleyeceğiz." },
      { id: 't3', name: 'Ayşe Hoca (Bilişsel & Mnemonic)', mode: 'Hafıza Teknikleri & Hikaye', quote: 'Görsel hafıza kartlarıyla taban ile üssün dansını unutamayacaksınız.' },
      { id: 't4', name: 'Mehmet Hoca', mode: 'Başlangıç / Adım Adım', quote: 'Temel kurallardan başlayarak sakin inşa ediyoruz.' }
    ]
  };

  // Dynamically filtered questions according to selected grade
  const gradeQuestions = questions.filter(q => q.grade_level === currentLevel);
  const activeQuestions = gradeQuestions.length > 0 ? gradeQuestions : questions;

  // Dynamically filtered eBooks
  const gradeEbooks = ebooks.filter(b => b.grade_level === currentLevel);
  const handleSelectBookForReader = (officialBook) => {
    const existing = ebooks.find(b => b.id === officialBook.id);
    if (!existing) {
      const newBook = {
        id: officialBook.id,
        title: officialBook.textbook_title,
        source: officialBook.source_repository || 'MEB & EBA Kütüphanesi',
        grade_level: officialBook.grade_level,
        subject: officialBook.subject,
        cover_color: 'from-blue-600 to-indigo-900',
        total_pages: officialBook.total_pages || 180,
        current_page: 1,
        toc: officialBook.units ? officialBook.units.map((u, i) => ({ 
          title: `${u.unit_number}. Ünite: ${u.unit_title}`, 
          page: (i + 1) * 20 
        })) : [
          { title: '1. Bölüm: Konu Anlatımı', page: 1 },
          { title: '2. Bölüm: Çözümlü Sorular', page: 20 },
          { title: '3. Bölüm: Değerlendirme Testi', page: 40 }
        ],
        pdf_download_url: officialBook.pdf_url
      };
      setEbooks(prev => [newBook, ...prev]);
    }
    setActiveEbookId(officialBook.id);
    setActiveTab('ebook');
  };

  // Dynamic Background and Theme Styling based on Educational Stage & WinUI 3 Theme
  const getThemeClasses = () => {
    if (theme === 'light') {
      if (currentLevel === 0) {
        return 'bg-gradient-to-br from-sky-50 via-teal-50 to-slate-100 text-slate-800 theme-preschool transition-all duration-500';
      } else if (currentLevel >= 1 && currentLevel <= 4) {
        return 'bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 text-slate-800 theme-primary transition-all duration-500';
      } else {
        return 'bg-[#f8fafc] text-slate-900 theme-high transition-all duration-500';
      }
    } else {
      if (currentLevel === 0) {
        return 'bg-gradient-to-br from-sky-950 via-teal-950 to-slate-900 text-slate-100 theme-preschool transition-all duration-700';
      } else if (currentLevel >= 1 && currentLevel <= 4) {
        return 'bg-gradient-to-br from-slate-950 via-sky-950/80 to-slate-900 text-slate-100 theme-primary transition-all duration-700';
      } else {
        return 'bg-slate-950 text-slate-100 theme-high transition-all duration-700';
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-blue-500 selection:text-white relative ${
      theme === 'light' ? 'bg-[#f8fafc] text-slate-800' : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* Top Navigation Bar: Her sayfada aynı kalan sabit üst menü (WinUI 3 Fluent) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        curriculumMode={curriculumMode}
        setCurriculumMode={setCurriculumMode}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        grades={grades}
        userStats={userStats}
        gradeLevel={currentLevel}
        onOpenArcade={() => setIsGamesArcadeOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Sadece Alt Sayfa Teması ve İçeriği Değişir (Dinamik Alt Sayfa Katmanı) */}
      <div className={`flex-1 flex flex-col relative ${getThemeClasses()}`}>
        {/* Dynamic Theme & Mascot Background Animations */}
        <ThemeDecorations gradeLevel={currentLevel} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full relative z-10">
        {activeTab === 'lesson' && (
          <MultiTeacherPlayer
            topic={activeTopic}
            onOpenAiCoach={() => handleOpenAiCoach(activeTopic)}
          />
        )}

        {activeTab === 'practice' && (
          <QuestionSolver
            questions={activeQuestions}
            onAnswerSubmit={handleAnswerSubmit}
            onOpenAiCoach={handleOpenAiCoach}
            userStats={userStats}
          />
        )}

        {activeTab === 'official' && (
          <OfficialCurriculumExplorer
            onSelectBookForReader={handleSelectBookForReader}
            theme={theme}
            selectedGradeLevel={currentLevel}
          />
        )}

        {activeTab === 'arena' && (
          <GamifiedArena
            questions={activeQuestions}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
          />
        )}

        {activeTab === 'arcade' && (
          <div className="py-2 animate-fadeIn">
            {/* The Arcade Modal is triggered, and we also provide an inline launcher card if modal is dismissed */}
            <div className={`glass-panel p-8 text-center rounded-3xl border-2 max-w-xl mx-auto shadow-2xl ${
              theme === 'light' 
                ? 'bg-white/95 border-amber-400 text-slate-800' 
                : 'border-amber-500/40 bg-slate-900/90 text-white'
            }`}>
              <span className="text-5xl mb-3 block">🎮</span>
              <h2 className="text-xl font-black mb-2">Maarif Mini Oyunlar Kulübü</h2>
              <p className={`text-xs mb-5 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                Mario Koşucusu, Pacman Labirenti, Hafıza Kartları, 6x6 Sudoku ve XOX!
              </p>
              <button
                onClick={() => setIsGamesArcadeOpen(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black text-sm shadow-xl transition transform hover:scale-105"
              >
                Oyun Salonunu Aç 🎮
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ebook' && (
          <EBookPdfViewer 
            ebooks={ebooks && ebooks.length > 0 ? ebooks : gradeEbooks} 
            initialBookId={activeEbookId}
            theme={theme}
          />
        )}

        {activeTab === 'live' && (
          <LiveStudioClass />
        )}

        {activeTab === 'podcast' && (
          <AudioPodcastPlayer podcasts={podcasts} />
        )}

        {activeTab === 'errors' && (
          <ErrorNotebook
            errors={errorList}
            onSolveAgain={() => setActiveTab('practice')}
          />
        )}
      </main>
      </div>

      {/* Wandering 3D Mascots on screen (Zero click blocking, freely roaming) */}
      <WanderingMascots
        mascots={mascots}
        onRemoveMascot={(id) => setMascots(prev => prev.filter(m => m.id !== id))}
        onOpenStudio={() => setIsMascotStudioOpen(true)}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
      />

      {/* Mascot Customizer Studio Side Drawer */}
      <MascotStudioPanel
        mascotConfig={mascotConfig}
        setMascotConfig={setMascotConfig}
        mascots={mascots}
        setMascots={setMascots}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        isOpen={isMascotStudioOpen}
        onClose={() => setIsMascotStudioOpen(false)}
      />

      {/* Persistent Floating AI Coach (Bilge & KANKA) Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleOpenAiCoach(activeTopic)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-2xl shadow-indigo-500/40 border border-white/20 transition transform hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
          </div>
          <span className="hidden sm:inline-block">Bilge & KANKA Yapay Zekâ Koçu</span>
          <span className="sm:hidden">Koça Sor</span>
        </button>
      </div>

      {/* AI Coach Dialog Modal */}
      <AiCoachModal
        isOpen={isAiCoachOpen}
        onClose={() => setIsAiCoachOpen(false)}
        questionContext={coachContext}
      />

      {/* 5-in-1 Mini Games Arcade Modal */}
      <MiniGamesArcade
        isOpen={isGamesArcadeOpen}
        onClose={() => setIsGamesArcadeOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Türkiye Yüzyılı Maarif Modeli · MEB EBA & OGM Materyal · DÖGM · ÖSYM Entegre
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Bilişsel & Mnemonic Hafıza Motoru</span>
            <span>·</span>
            <span>Çok Boyutlu Açık Anlatım Modeli</span>
            <span>·</span>
            <span>Kahoot & Blooket Oyun Arenası</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
