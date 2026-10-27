import React, { useState, useEffect } from 'react';
import { 
  X, Maximize2, Minimize2, Download, ExternalLink, 
  BookOpen, Eye, PenTool, CheckCircle2, FileText, 
  Layers, ShieldCheck, Sparkles, Printer, ZoomIn, ZoomOut,
  Globe2, Link as LinkIcon, RefreshCw, AlertCircle
} from 'lucide-react';

export default function InAppDocumentViewerModal({ 
  book, 
  isOpen, 
  onClose, 
  onOpenInStylusReader,
  theme = 'dark'
}) {
  if (!isOpen || !book) return null;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [activePdfUrl, setActivePdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Compute the initial stream URL
  useEffect(() => {
    if (book) {
      const rawUrl = book.pdf_url || book.local_preview_pdf || '/docs/ogm_matematik_12.pdf';
      setCustomUrl(rawUrl);
      
      // If it's an external web URL, route it through our proxy so the browser won't be blocked by X-Frame-Options/CORS
      if (rawUrl.startsWith('http')) {
        setActivePdfUrl(`http://127.0.0.1:8000/api/proxy-pdf?url=${encodeURIComponent(rawUrl)}`);
      } else {
        setActivePdfUrl(rawUrl);
      }
    }
  }, [book]);

  const handleApplyCustomUrl = (e) => {
    if (e) e.preventDefault();
    if (!customUrl.trim()) return;

    setIsLoading(true);
    const trimmed = customUrl.trim();
    if (trimmed.startsWith('http')) {
      setActivePdfUrl(`http://127.0.0.1:8000/api/proxy-pdf?url=${encodeURIComponent(trimmed)}`);
    } else {
      setActivePdfUrl(trimmed);
    }
    setTimeout(() => setIsLoading(false), 800);
  };

  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Dialog Container */}
      <div className={`w-full rounded-2xl border flex flex-col shadow-2xl transition-all duration-200 overflow-hidden ${
        isFullscreen ? 'h-full max-w-none' : 'max-w-7xl h-[94vh]'
      } ${
        isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        
        {/* Top Header Bar */}
        <div className={`p-3.5 border-b flex flex-col gap-2.5 shrink-0 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/95 border-slate-800'
        }`}>
          <div className="flex items-center justify-between gap-3">
            {/* Book Metadata */}
            <div className="flex items-center gap-3 truncate">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {book.grade_name || `${book.grade_level}. Sınıf`}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Doğrudan Resmî Web PDF Önizleme
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    {book.total_pages || 120} Sayfa
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-extrabold truncate max-w-md sm:max-w-xl">
                  {book.textbook_title || book.title}
                </h2>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Download button */}
              <a
                href={customUrl || activePdfUrl}
                download
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                }`}
                title="PDF Dosyasını İndir / Yeni Sekmede Aç"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">İndir</span>
              </a>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(prev => !prev)}
                className={`p-2 rounded-xl border transition ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                }`}
                title={isFullscreen ? 'Pencere Boyutuna Dön' : 'Tam Ekrana Yay'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition ${
                  isLight 
                    ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700' 
                    : 'bg-rose-950/40 hover:bg-rose-900/60 border-rose-900/50 text-rose-400'
                }`}
                title="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Web PDF URL Bar: Allows testing ANY remote web PDF URL directly */}
          <form onSubmit={handleApplyCustomUrl} className="flex items-center gap-2 w-full pt-1">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border flex-1 text-xs ${
              isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-slate-200'
            }`}>
              <Globe2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-slate-400 font-mono text-[11px] shrink-0 hidden sm:inline">Web PDF URL:</span>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="İncelemek istediğiniz herhangi bir Web PDF bağlantısını girin (https://...)..."
                className="bg-transparent border-none focus:outline-none flex-1 w-full text-xs font-mono"
              />
              {customUrl && (
                <button
                  type="button"
                  onClick={() => setCustomUrl('')}
                  className="text-slate-400 hover:text-slate-200 text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm shrink-0"
              title="Web'deki PDF'i Doğrudan Tarayıcıda Aç"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Yükle / Önizle</span>
            </button>
          </form>
        </div>

        {/* Main PDF Viewer Iframe: Direct Native In-Browser Streaming (No mock content) */}
        <div className="flex-1 relative overflow-hidden flex flex-col bg-slate-950">
          <iframe
            key={activePdfUrl}
            src={`${activePdfUrl}#toolbar=1&navpanes=1&view=FitH`}
            title={book.textbook_title || book.title || 'Web PDF Önizleyici'}
            className="w-full h-full border-none flex-1"
            style={{ backgroundColor: '#1c1c1e' }}
          />

          {/* Bottom Accreditation / Live Stream Status Bar */}
          <div className={`p-2.5 border-t text-[11px] flex items-center justify-between px-4 shrink-0 ${
            isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900/90 border-slate-800 text-slate-300'
          }`}>
            <span className="flex items-center gap-1.5 truncate max-w-xl">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                <strong>Doğrudan Web PDF Akışı:</strong> Belge, tarayıcınızın yerel PDF motorunda canlı olarak görüntülenmektedir.
              </span>
            </span>

            <span className="font-mono text-slate-400 text-[10px] hidden md:inline">
              Akış Bağlantısı: {activePdfUrl.slice(0, 55)}...
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
