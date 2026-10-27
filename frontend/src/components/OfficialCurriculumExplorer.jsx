import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Filter, ExternalLink, Download, 
  CheckCircle2, Sparkles, Layers, Award, FileText, 
  ChevronDown, ChevronUp, Bookmark, Globe2, ShieldCheck, 
  BookMarked, Eye, ArrowRight, Library, PenTool
} from 'lucide-react';
import InAppDocumentViewerModal from './InAppDocumentViewerModal';

export default function OfficialCurriculumExplorer({ 
  onSelectBookForReader,
  theme = 'dark',
  selectedGradeLevel = 12
}) {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [previewModalBook, setPreviewModalBook] = useState(null);

  // Fetch official resources from backend API
  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/curriculum/official-resources')
      .then(res => res.json())
      .then(data => {
        if (data.resources) {
          setResources(data.resources);
          setFilteredResources(data.resources);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load official resources:', err);
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let list = [...resources];

    if (selectedGradeFilter !== 'all') {
      const gNum = parseInt(selectedGradeFilter, 10);
      list = list.filter(r => r.grade_level === gNum);
    }

    if (selectedSubjectFilter !== 'all') {
      const sub = selectedSubjectFilter.toLowerCase();
      list = list.filter(r => r.subject.toLowerCase().includes(sub));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(r => {
        const titleMatch = r.textbook_title.toLowerCase().includes(q);
        const subMatch = r.subject.toLowerCase().includes(q);
        const pubMatch = r.official_publisher.toLowerCase().includes(q);
        const unitMatch = r.units?.some(u => 
          u.unit_title.toLowerCase().includes(q) || 
          u.topics?.some(t => t.toLowerCase().includes(q)) ||
          u.outcomes?.some(o => o.code.toLowerCase().includes(q) || o.desc.toLowerCase().includes(q))
        );
        return titleMatch || subMatch || pubMatch || unitMatch;
      });
    }

    setFilteredResources(list);
  }, [searchQuery, selectedGradeFilter, selectedSubjectFilter, resources]);

  const toggleExpand = (id) => {
    setExpandedCardId(prev => prev === id ? null : id);
  };

  const isLight = theme === 'light';

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Fluent Header Banner */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isLight 
          ? 'bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-slate-50 border-blue-200/80 text-slate-800 shadow-sm' 
          : 'bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                isLight ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                Resmî Bakanlık Veritabanı
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                Türkiye Yüzyılı Maarif Modeli (TYMM) Uyumlu
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isLight ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                TTKB Onaylı Devlet Kitapları
              </span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Resmî Müfredat, Dersler & Kitaplar Gezgini
            </h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-3xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Okul Öncesinden 12. Sınıfa ve YKS/LGS'ye kadar Millî Eğitim Bakanlığı (MEB), Talim ve Terbiye Kurulu (TTKB), 
              EBA, OGM Materyal ve MEBİ resmî veritabanlarından çekilen güncel öğretim programları, üniteler, kazanımlar ve onaylı ders kitapları.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`p-4 rounded-xl border text-center ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-950/80 border-slate-800'
            }`}>
              <span className="text-2xl font-black text-blue-500 block">
                {resources.length}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Resmî Kitap</span>
            </div>
            <div className={`p-4 rounded-xl border text-center ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-950/80 border-slate-800'
            }`}>
              <span className="text-2xl font-black text-emerald-500 block">
                100%
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Açık Kaynak</span>
            </div>
          </div>
        </div>
      </div>

      {/* WinUI 3 Fluent Search & Filter Bar */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center gap-3 transition-all ${
        isLight ? 'bg-white/95 border-slate-200/90 shadow-sm' : 'bg-slate-900/90 border-slate-800 shadow-md'
      }`}>
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ders adı, ünite, konu (logaritma, fotosentez, 1453), kazanım kodu veya kitap ara..."
            className={`w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLight 
                ? 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400' 
                : 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500'
            }`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Grade Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedGradeFilter}
            onChange={(e) => setSelectedGradeFilter(e.target.value)}
            aria-label="Kademeye Göre Filtrele"
            className={`text-xs rounded-lg px-3 py-2 border font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto ${
              isLight 
                ? 'bg-slate-50 border-slate-300 text-slate-800' 
                : 'bg-slate-950 border-slate-700 text-slate-200'
            }`}
          >
            <option value="all">Tüm Kademeler (Okul Öncesi - 12. Sınıf)</option>
            <option value="0">Okul Öncesi (3-6 Yaş)</option>
            <option value="1">1. Sınıf (İlk Okuma & Sayılar)</option>
            <option value="2">2. Sınıf</option>
            <option value="3">3. Sınıf</option>
            <option value="4">4. Sınıf</option>
            <option value="5">5. Sınıf (Maarif Modeli)</option>
            <option value="8">8. Sınıf (LGS Hazırlık)</option>
            <option value="9">9. Sınıf (Maarif Modeli)</option>
            <option value="11">11. Sınıf</option>
            <option value="12">12. Sınıf & YKS (TYT / AYT)</option>
          </select>

          {/* Subject Filter */}
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            aria-label="Derse Göre Filtrele"
            className={`text-xs rounded-lg px-3 py-2 border font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto ${
              isLight 
                ? 'bg-slate-50 border-slate-300 text-slate-800' 
                : 'bg-slate-950 border-slate-700 text-slate-200'
            }`}
          >
            <option value="all">Tüm Dersler</option>
            <option value="matematik">Matematik</option>
            <option value="türkçe">Türkçe & Edebiyat</option>
            <option value="fen">Fen Bilimleri & Biyoloji</option>
            <option value="sosyal">Sosyal Bilgiler & Tarih</option>
            <option value="gelişim">Okul Öncesi Gelişim</option>
          </select>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Toplam <strong className="text-blue-400">{filteredResources.length}</strong> resmî kaynak listelendi.
        </span>
        <span className="text-[11px] flex items-center gap-1 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Doğrudan Resmî Sunucu Bağlantılı
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-12 text-center text-slate-400">
          <Sparkles className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold">Resmî Bakanlık Veritabanı Sorgulanıyor...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredResources.length === 0 && (
        <div className={`p-12 text-center rounded-2xl border ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-50" />
          <h3 className={`text-base font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
            Arama kriterine uygun resmî kaynak bulunamadı.
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Filtreleri sıfırlayarak veya farklı bir anahtar kelime (ör. 'matematik', '1453', 'fen') yazarak tekrar deneyin.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedGradeFilter('all'); setSelectedSubjectFilter('all'); }}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredResources.map((item) => {
          const isExpanded = expandedCardId === item.id;
          return (
            <div 
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                isLight 
                  ? 'bg-white border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-md' 
                  : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700 shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/15 text-blue-400 border border-blue-500/20">
                      {item.grade_name}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {item.subject}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Resmî
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {item.total_pages} Sayfa
                  </span>
                </div>

                <h3 className={`text-base font-bold leading-snug mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {item.textbook_title}
                </h3>

                {/* Metadata Pill Box */}
                <div className={`p-3 rounded-xl border text-[11px] space-y-1 mb-4 ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950/70 border-slate-800/80 text-slate-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-500">Yayımcı / Komisyon:</span>
                    <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>{item.official_publisher}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-500">Talim Terbiye Onayı:</span>
                    <span className="font-mono text-amber-500 text-[10px]">{item.ttkb_approval}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-500">Veritabanı Sunucusu:</span>
                    <span className="text-blue-400 flex items-center gap-1">
                      <Globe2 className="w-3 h-3" /> {item.source_repository}
                    </span>
                  </div>
                </div>

                {/* Units & Curriculum Preview (Accordion) */}
                {item.units && item.units.length > 0 && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className={`w-full py-2 px-3 rounded-lg flex items-center justify-between text-xs font-semibold border transition ${
                        isLight 
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' 
                          : 'bg-slate-950/90 hover:bg-slate-800 text-slate-300 border-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-blue-400" />
                        Üniteler ve Resmî Kazanımlar ({item.units.length} Ünite)
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Expanded Units Details */}
                    {isExpanded && (
                      <div className={`mt-2 p-3 rounded-xl border space-y-3 animate-fadeIn text-xs ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                      }`}>
                        {item.units.map((unit, uIdx) => (
                          <div key={uIdx} className="space-y-1.5 pb-2 border-b border-slate-800/40 last:border-b-0 last:pb-0">
                            <div className="flex items-center gap-1.5 font-bold text-blue-400">
                              <span>{unit.unit_number}. Ünite:</span>
                              <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{unit.unit_title}</span>
                            </div>
                            
                            {/* Topics pills */}
                            <div className="flex flex-wrap gap-1">
                              {unit.topics?.map((topic, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className={`text-[10px] px-2 py-0.5 rounded ${
                                    isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300'
                                  }`}
                                >
                                  • {topic}
                                </span>
                              ))}
                            </div>

                            {/* Learning outcomes */}
                            {unit.outcomes && (
                              <div className="mt-1 space-y-1">
                                {unit.outcomes.map((out, oIdx) => (
                                  <div key={oIdx} className="text-[11px] flex items-start gap-1.5 text-slate-400">
                                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1 rounded shrink-0">
                                      {out.code}
                                    </span>
                                    <span>{out.desc}</span>
                                    {out.skill && (
                                      <span className="text-[9px] text-amber-400/90 font-medium shrink-0 ml-auto">
                                        ({out.skill})
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions (Tarayıcıda Önizle + Kalemli E-Kitap + İndir) */}
              <div className={`p-4 border-t flex items-center justify-between gap-2 flex-wrap ${
                isLight ? 'bg-slate-50 border-slate-200/90' : 'bg-slate-950/60 border-slate-800/90'
              }`}>
                {/* Action 1: Tarayıcı İçi Önizleme (In-App Browser Document Preview) */}
                <button
                  onClick={() => setPreviewModalBook(item)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow transition transform active:scale-95"
                  title="Belgeyi ve Orijinal PDF'i Doğrudan Tarayıcı İçinde Önizle"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Tarayıcıda Önizle</span>
                </button>

                {/* Action 2: Open in Stylus E-Book Reader */}
                <button
                  onClick={() => onSelectBookForReader && onSelectBookForReader(item)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                    isLight 
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200' 
                      : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
                  }`}
                  title="AçıkMaarif E-Kitap Okuyucusunda Sayfa Sayfa Çizerek Kalemle İncele"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Kalemli E-Kitap</span>
                </button>

                {/* Action 3: Official MEB / EBA PDF Link */}
                <a
                  href={item.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                    isLight 
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                  title="Resmî MEB / EBA PDF Dosyasını İndir"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">İndir</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Footnote / Accreditation Notice */}
      <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
        isLight ? 'bg-amber-50/80 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-900/40 text-amber-300'
      }`}>
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Resmî Açık Eğitim Kaynakları Güvencesi:</strong>
          <span className="ml-1 opacity-90">
            AçıkMaarif platformu, T.C. Millî Eğitim Bakanlığı Talim ve Terbiye Kurulu Başkanlığı onaylı ders kitapları, 
            EBA, OGM Materyal ve MEBİ açık eğitim veritabanlarıyla tam entegredir. Tüm içerikler öğrencilere ve öğretmenlere 
            özgürce sunulmakta olup ticari telifli materyal içermez.
          </span>
        </div>
      </div>

      {/* In-App Direct Browser Document Preview Modal */}
      <InAppDocumentViewerModal
        book={previewModalBook}
        isOpen={!!previewModalBook}
        onClose={() => setPreviewModalBook(null)}
        onOpenInStylusReader={onSelectBookForReader}
        theme={theme}
      />

    </div>
  );
}
