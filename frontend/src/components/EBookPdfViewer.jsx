import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  BookOpen, ChevronLeft, ChevronRight, PenTool, 
  Eraser, Trash2, Download, Search, ZoomIn, ZoomOut,
  Highlighter, Palette, CheckCircle2, Maximize2, Minimize2,
  PanelLeftClose, PanelLeft, RefreshCw, FileText, Layers,
  Sparkles, HelpCircle, Share2, Printer
} from 'lucide-react';

export default function EBookPdfViewer({ 
  ebooks = [], 
  initialBookId = null,
  theme = 'dark' 
}) {
  // Ensure we have a valid default list
  const safeEbooks = ebooks && ebooks.length > 0 ? ebooks : [
    {
      id: 'ebook_ogm_3adim_mat',
      title: 'MEB OGM 3 Adım TYT & AYT Matematik Soru Bankası',
      source: 'ogmmateryal.eba.gov.tr',
      grade_level: 12,
      subject: 'Matematik',
      cover_color: 'from-blue-600 to-indigo-900',
      total_pages: 448,
      current_page: 42,
      toc: [
        { title: '1. Ünite: Sayılar ve Fonksiyonlar', page: 12 },
        { title: '2. Ünite: Üstel ve Logaritmik Modeller', page: 42 },
        { title: '3. Ünite: Türev ve Maks-Min Optimizasyon', page: 110 },
        { title: '4. Ünite: İntegral ve Alan Hesabı', page: 180 }
      ],
      pdf_download_url: 'https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematik/3adim/ayt.pdf'
    }
  ];

  const [selectedBookId, setSelectedBookId] = useState(initialBookId || safeEbooks[0].id);
  const [currentPage, setCurrentPage] = useState(42);
  const [activeTool, setActiveTool] = useState('pen'); // pen, highlighter, eraser
  const [penColor, setPenColor] = useState('#f59e0b'); // amber
  const [penWidth, setPenWidth] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEdgeToEdge, setIsEdgeToEdge] = useState(false); // Full width & Edge-to-Edge mode
  const [zoomLevel, setZoomLevel] = useState(100);
  const [readerMode, setReaderMode] = useState('canvas'); // 'canvas' | 'pdf'

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Sync initialBookId prop if updated externally
  useEffect(() => {
    if (initialBookId && safeEbooks.some(b => b.id === initialBookId)) {
      setSelectedBookId(initialBookId);
      setCurrentPage(1);
    }
  }, [initialBookId]);

  const activeBook = safeEbooks.find(b => b.id === selectedBookId) || safeEbooks[0];

  const previewPdfUrl = activeBook.local_preview_pdf || 
    (activeBook.subject?.includes('Fen') ? '/docs/mebi_yks_fen_12.pdf' : 
     activeBook.grade_level === 1 ? '/docs/ilkokul_turkce_1.pdf' :
     activeBook.grade_level === 8 ? '/docs/lgs_matematik_8.pdf' : 
     '/docs/ogm_matematik_12.pdf');

  // Resize and initialize canvas smoothly
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    
    // Save previous drawing if possible or sync dimensions
    const rect = canvas.parentElement.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      // Avoid resetting if size didn't change significantly
      if (canvas.width !== Math.floor(rect.width) || canvas.height !== Math.floor(rect.height)) {
        canvas.width = Math.floor(rect.width);
        canvas.height = Math.floor(rect.height);
      }
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resizeCanvas, isSidebarOpen, isEdgeToEdge, selectedBookId, currentPage]);

  // Drawing Handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    if (activeTool === 'eraser') {
      ctx.clearRect(x - 18, y - 18, 36, 36);
    } else {
      ctx.strokeStyle = activeTool === 'highlighter' ? `${penColor}55` : penColor;
      ctx.lineWidth = activeTool === 'highlighter' ? penWidth * 5 : penWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const isLight = theme === 'light';

  // Dynamic simulated curriculum page generator based on book topic & page
  const renderBookPageContent = () => {
    const title = activeBook.title || '';
    const subject = activeBook.subject || '';

    if (subject.includes('Matematik')) {
      return (
        <div className="space-y-6 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
            <div>
              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest block">
                Ölçme, Değerlendirme ve Sınav Hizmetleri · MEB OGM 3 Adım
              </span>
              <h2 className={`text-lg sm:text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Ünite 2: Üstel ve Logaritmik Fonksiyonların Uygulamaları
              </h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 font-mono font-bold">
              Kazanım: MAT.12.1.2
            </span>
          </div>

          {/* Theoretical Concept Card */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-amber-50/70 border-amber-200 text-slate-800' : 'bg-amber-950/20 border-amber-500/30 text-amber-100'
          }`}>
            <h4 className="font-bold text-sm mb-1.5 flex items-center gap-1.5 text-amber-500">
              <Sparkles className="w-4 h-4" /> Temel Kural & Formül Özeti:
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed">
              <strong>Richter Deprem Ölçeği:</strong> Bir depremin $M$ büyüklüğü, açığa çıkan $E$ enerjisiyle 
              <span className="mx-1 px-2 py-0.5 rounded bg-amber-500/20 font-mono font-bold text-amber-400">
                $\log_{10}(E) = 11.8 + 1.5 \cdot M$
              </span>
              bağıntısıyla modellenir. Her 1 birimlik büyüme enerjinin yaklaşık <strong>31.6 katına</strong> çıkması demektir.
            </p>
          </div>

          {/* Model Question with Stylus Space */}
          <div className={`p-6 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-blue-400">Örnek Soru 42 (YKS / Maarif Modeli Tarzı):</span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Zorluk: 3. Adım</span>
            </div>
            <p className={`text-sm sm:text-base font-semibold leading-relaxed mb-4 ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>
              Richter ölçeğinde 7.2 büyüklüğünde kaydedilen bir depremin açığa çıkardığı enerji $E_1$, 
              5.2 büyüklüğündeki artçı depremin açığa çıkardığı enerji $E_2$ olduğuna göre, 
              <strong> $\frac{E_1}{E_2}$ oranı kaçtır?</strong>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs font-bold my-4">
              {['A) 100', 'B) 500', 'C) 1000', 'D) 1000√10', 'E) 10000'].map((opt, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    i === 2 
                      ? 'bg-blue-600/15 border-blue-500/50 text-blue-400' 
                      : isLight ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>

            {/* Scribble Workspace area */}
            <div className={`mt-6 p-4 rounded-xl border-2 border-dashed flex items-center justify-between ${
              isLight ? 'border-blue-200 bg-blue-50/30 text-slate-500' : 'border-slate-800 bg-slate-950/40 text-slate-400'
            }`}>
              <div className="flex items-center gap-2 text-xs">
                <PenTool className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>Çözüm Çalışma Alanı: Dijital kaleminizle bu alanın üzerine doğrudan yazıp çizebilirsiniz.</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Tuval Aktif</span>
            </div>
          </div>
        </div>
      );
    } else if (subject.includes('Fen') || subject.includes('Biyoloji') || subject.includes('Fizik')) {
      return (
        <div className="space-y-6 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest block">
                MEB Fen ve Teknoloji Yayınları · Görsel Deney Atlası
              </span>
              <h2 className={`text-lg sm:text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Hücresel Enerji Dönüşümleri: Fotosentez ve Solunum
              </h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">
              Kazanım: FEN.12.2.1
            </span>
          </div>

          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-emerald-50/70 border-emerald-200 text-slate-800' : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
          }`}>
            <h4 className="font-bold text-sm mb-1.5 flex items-center gap-1.5 text-emerald-500">
              🌿 Biyokimyasal Reaksiyon Denklemi:
            </h4>
            <p className="text-xs sm:text-sm font-mono text-center py-2 bg-emerald-500/10 rounded-lg font-bold">
              6CO₂ + 6H₂O + Güneş Işığı ➔ C₆H₁₂O₆ (Glikoz) + 6O₂ ↑
            </p>
            <p className="text-xs mt-2 opacity-90">
              Işığa bağımlı evre kloroplastın tilakoit zarında gerçekleşirken, Calvin döngüsü stromada yürütülür.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
          }`}>
            <p className="text-sm font-semibold mb-3">
              Yukarıdaki şemada numaralandırılmış organel kısımlarına dijital kaleminizle doğru enzim ve maddeleri yazınız.
            </p>
            <div className="h-44 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-xs text-slate-500">
              (Kloroplast Tilakoit ve Stroma Çizim Şeması — Kalemle Not Alınız)
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
            <div>
              <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest block">
                MEB Resmî Devlet Kitapları · Talim Terbiye Onaylı
              </span>
              <h2 className={`text-lg sm:text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {activeBook.title}
              </h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 font-mono font-bold">
              Sayfa {currentPage}
            </span>
          </div>

          <div className={`p-6 rounded-2xl border text-sm leading-relaxed ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'
          }`}>
            <h3 className="font-bold text-base text-blue-400 mb-3">
              Bölüm Özeti ve Rehber Çalışmalar:
            </h3>
            <p className="mb-3">
              Bu kitap, T.C. Millî Eğitim Bakanlığı Talim ve Terbiye Kurulu Başkanlığı'nın müfredat standartlarına tam uyumlu olarak hazırlanmıştır. 
              Öğrenciler ilgili kazanımları pekiştirmek için dijital kalem, fosforlu kalem ve silgi araçlarını kullanarak doğrudan sayfa üzerinde serbestçe not alabilir.
            </p>
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Orijinal Bakanlık PDF çıktısıyla birebir uyumlu kazanım sırası</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dokunmatik ekran ve grafik tablet ile gecikmesiz çizim (Stylus Canvas)</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`transition-all duration-300 flex flex-col ${
        isEdgeToEdge 
          ? 'fixed inset-0 z-50 p-4 sm:p-6 bg-slate-950/98 backdrop-blur-2xl overflow-y-auto' 
          : 'w-full space-y-4'
      }`}
    >
      
      {/* Top Header Controls: WinUI 3 Fluent Ribbon */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-md transition-colors ${
        isLight ? 'bg-white/95 border-slate-200 text-slate-800' : 'bg-slate-900/90 border-slate-800 text-slate-100'
      }`}>
        {/* Left: Book Meta & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className={`p-2 rounded-xl border transition ${
              isSidebarOpen 
                ? 'bg-blue-600/15 border-blue-500/40 text-blue-400' 
                : isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title={isSidebarOpen ? 'İçindekiler Kenar Çubuğunu Gizle (Tam Genişlik)' : 'İçindekiler Kenar Çubuğunu Aç'}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                MEB Resmî Kitap & Fasikül
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {activeBook.source}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black truncate max-w-md sm:max-w-xl">
              {activeBook.title}
            </h1>
          </div>
        </div>

        {/* Right: Book Switcher, Download & Edge-to-Edge Maximizer */}
        <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
          <select
            value={selectedBookId}
            onChange={(e) => {
              setSelectedBookId(e.target.value);
              setCurrentPage(1);
              clearCanvas();
            }}
            aria-label="Ders Kitabı Seçimi"
            className={`text-xs rounded-xl px-3 py-1.5 border font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-950 border-slate-700 text-slate-200'
            }`}
          >
            {safeEbooks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>

          {/* View Mode Toggle: Stylus Canvas vs In-Browser Native PDF */}
          <div className={`flex items-center p-0.5 rounded-xl border text-xs font-semibold ${
            isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-700'
          }`}>
            <button
              onClick={() => setReaderMode('canvas')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                readerMode === 'canvas'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Etkileşimli Sayfa ve Dijital Kalemle Not Alma Modu"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Kalemli Not</span>
            </button>
            <button
              onClick={() => setReaderMode('pdf')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                readerMode === 'pdf'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Resmî PDF Belgesini Doğrudan Tarayıcı İçinde Önizle"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tarayıcıda PDF</span>
            </button>
          </div>

          {/* Download Official PDF */}
          <a
            href={activeBook.pdf_download_url}
            target="_blank"
            rel="noreferrer"
            className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
            title="Orijinal MEB / EBA PDF Dosyasını İndir"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Resmî PDF</span>
          </a>

          {/* Edge-to-Edge Full Width Maximizer Toggle */}
          <button
            onClick={() => setIsEdgeToEdge(prev => !prev)}
            className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
              isEdgeToEdge
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                : isLight ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : 'bg-blue-600/20 text-blue-300 border-blue-500/40 hover:bg-blue-600/30'
            }`}
            title={isEdgeToEdge ? 'Normal Görünüme Dön' : 'Sayfanın Boyuna ve Kenarlara Kadar Uzat (Tam Ekran)'}
          >
            {isEdgeToEdge ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isEdgeToEdge ? 'Pencereye Dön' : 'Kenarlara Uzat'}</span>
          </button>
        </div>
      </div>

      {/* Main Reader Workspace (Sidebar + Canvas Book Page) */}
      <div className="flex gap-4 items-stretch relative flex-1 min-h-[750px]">
        
        {/* Left Sidebar: Table of Contents & Stylus Palette (Collapsible) */}
        {isSidebarOpen && (
          <aside className={`w-72 shrink-0 p-4 rounded-2xl border flex flex-col justify-between space-y-4 animate-fadeIn transition-colors ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/90 border-slate-800 shadow-lg'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  İçindekiler & Üniteler
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {activeBook.total_pages} s.
                </span>
              </div>

              {/* TOC Items List */}
              <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                {(activeBook.toc || []).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentPage(item.page || (idx + 1) * 15);
                      clearCanvas();
                    }}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                      currentPage === item.page
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                        : isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">{item.title}</span>
                      <span className="font-mono text-[10px] opacity-75 shrink-0">s.{item.page || (idx + 1) * 15}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stylus Digital Pen Controls */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-400 block">
                Stylus & Dijital Kalem
              </span>

              {/* Tool Buttons */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setActiveTool('pen')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                    activeTool === 'pen'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" /> Kalem
                </button>
                <button
                  onClick={() => setActiveTool('highlighter')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                    activeTool === 'highlighter'
                      ? 'bg-yellow-400 text-slate-950 shadow'
                      : isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Highlighter className="w-3.5 h-3.5" /> Fosforlu
                </button>
                <button
                  onClick={() => setActiveTool('eraser')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                    activeTool === 'eraser'
                      ? 'bg-rose-500 text-white shadow'
                      : isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" /> Silgi
                </button>
              </div>

              {/* Color Palette */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  {['#f59e0b', '#38bdf8', '#ef4444', '#10b981', '#a855f7'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setPenColor(c)}
                      className={`w-5 h-5 rounded-full border-2 transition ${
                        penColor === c ? 'scale-125 border-white ring-2 ring-blue-500' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                <button
                  onClick={clearCanvas}
                  className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs flex items-center gap-1"
                  title="Tüm Çizimi Temizle"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Temizle</span>
                </button>
              </div>

              {/* Pen Width Slider */}
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
                <span>Kalınlık:</span>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={penWidth}
                  onChange={(e) => setPenWidth(parseInt(e.target.value, 10))}
                  aria-label="Kalem Kalınlığı"
                  className="flex-1 accent-blue-500 cursor-pointer"
                />
                <span className="font-mono text-xs w-3">{penWidth}</span>
              </div>
            </div>
          </aside>
        )}

        {/* Right / Center: Book Page Canvas or In-Browser Native PDF Viewer */}
        <section className={`flex-1 rounded-2xl border flex flex-col justify-between overflow-hidden shadow-2xl relative transition-all duration-300 min-h-[750px] ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          {readerMode === 'pdf' ? (
            /* MODE A: In-Browser Direct PDF Viewer */
            <div className="w-full flex-1 flex flex-col h-full min-h-[750px] relative bg-slate-950">
              <iframe
                src={`${previewPdfUrl}#toolbar=1&navpanes=1&view=FitH`}
                title={activeBook.title}
                className="w-full flex-1 h-[780px] border-none"
              />
              <div className={`p-2.5 border-t text-[11px] px-4 flex items-center justify-between shrink-0 ${
                isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>Resmî PDF doğrudan tarayıcı içinde görüntülenmektedir.</span>
                </span>
                <button
                  onClick={() => setReaderMode('canvas')}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <PenTool className="w-3.5 h-3.5" /> Kalemle Çizim & Soru Moduna Geç
                </button>
              </div>
            </div>
          ) : (
            /* MODE B: Interactive Canvas + Lesson Workspace */
            <>
              <div className="relative flex-1 p-6 sm:p-10 md:p-14 overflow-y-auto flex flex-col justify-between select-none">
                
                {/* Header info bar inside page */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-6 text-xs text-slate-400">
                  <span className="font-semibold text-blue-400">{activeBook.title}</span>
                  <span className="font-mono font-bold text-amber-400">
                    Sayfa {currentPage} / {activeBook.total_pages}
                  </span>
                </div>

                {/* Dynamic Curriculum Page Content */}
                <div className="my-auto py-4">
                  {renderBookPageContent()}
                </div>

                {/* Book Footer */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-8 text-[11px] text-slate-500">
                  <span>T.C. Millî Eğitim Bakanlığı · Talim ve Terbiye Kurulu Başkanlığı</span>
                  <span>Türkiye Yüzyılı Maarif Modeli Resmî Ders Kitabı</span>
                </div>

                {/* Interactive HTML5 Canvas Drawing Layer */}
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="absolute inset-0 z-20 cursor-crosshair touch-none"
                  style={{ pointerEvents: 'auto' }}
                />
              </div>

              {/* Bottom Floating Navigation Toolbar */}
              <footer className={`p-3.5 border-t flex items-center justify-between text-xs transition-colors shrink-0 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-slate-800'
              }`}>
                <button
                  onClick={() => {
                    setCurrentPage(Math.max(1, currentPage - 1));
                    clearCanvas();
                  }}
                  disabled={currentPage <= 1}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border transition disabled:opacity-40 ${
                    isLight 
                      ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' 
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Önceki Sayfa
                </button>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-300">
                    Sayfa <span className="text-amber-400 font-mono">{currentPage}</span> / {activeBook.total_pages}
                  </span>
                  <span className="text-slate-500 hidden sm:inline">|</span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    {isEdgeToEdge ? 'Tam Ekran Modu Açık' : 'Kenarlara Genişletilebilir'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(Math.min(activeBook.total_pages, currentPage + 1));
                    clearCanvas();
                  }}
                  disabled={currentPage >= activeBook.total_pages}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border transition disabled:opacity-40 ${
                    isLight 
                      ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' 
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  Sonraki Sayfa <ChevronRight className="w-4 h-4" />
                </button>
              </footer>
            </>
          )}
        </section>

      </div>

    </div>
  );
}
