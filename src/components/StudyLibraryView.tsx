import React, { useState, useMemo } from 'react';
import { 
  NotePdfResource, 
  SubjectBundlePdf 
} from '../data/studyLibraryData';
import { 
  getSubjectCatalogForUser, 
  getLibraryNotesForUser, 
  getSubjectBundlesForUser,
  parseStudentGrade
} from '../data/gradeCurriculumAdapter';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  X, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  Bookmark, 
  Award, 
  Filter, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

interface StudyLibraryViewProps {
  userProfile?: any;
  onSelectChapterNote?: (subjectId: string, chapterTitle: string) => void;
  triggerToast: (msg: string) => void;
}

export const StudyLibraryView: React.FC<StudyLibraryViewProps> = ({ 
  userProfile,
  onSelectChapterNote, 
  triggerToast 
}) => {
  const std = userProfile?.studentMeta?.std;
  const board = userProfile?.studentMeta?.board;
  const studying = userProfile?.studentMeta?.studying;

  const parsedGrade = useMemo(() => parseStudentGrade(std, board, studying), [std, board, studying]);
  const subjectCatalog = useMemo(() => getSubjectCatalogForUser(std, board, studying), [std, board, studying]);
  const allLibraryNotes = useMemo(() => getLibraryNotesForUser(std, board, studying), [std, board, studying]);
  const allSubjectBundles = useMemo(() => getSubjectBundlesForUser(std, board, studying), [std, board, studying]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => subjectCatalog[0]?.id || 'sci1');
  const [selectedPublication, setSelectedPublication] = useState<'all' | 'Target Publications' | 'Navneet Digest'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<string>('all');

  // If selected subject is not in current grade catalog, auto-switch to first subject
  React.useEffect(() => {
    if (subjectCatalog.length > 0 && !subjectCatalog.some(s => s.id === selectedSubjectId)) {
      setSelectedSubjectId(subjectCatalog[0].id);
      setSelectedChapterFilter('all');
    }
  }, [subjectCatalog, selectedSubjectId]);
  
  // Interactive PDF Viewer Modal State
  const [activePdfModal, setActivePdfModal] = useState<NotePdfResource | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Download simulation trigger with realistic Blob generation
  const handleDownloadPdf = (pdf: NotePdfResource | SubjectBundlePdf) => {
    const isBundle = 'bundleTitle' in pdf;
    const title = isBundle ? (pdf as SubjectBundlePdf).bundleTitle : (pdf as NotePdfResource).title;
    const id = pdf.id;

    setDownloadingId(id);
    triggerToast(`⏳ Preparing PDF: ${title}...`);

    setTimeout(() => {
      // Create a downloadable document blob
      const content = `
================================================================================
STUDY NEST ACADEMIC SANCTUARY — ${parsedGrade.board.toUpperCase()} ${parsedGrade.stdLabel.toUpperCase()}
${title.toUpperCase()}
Publication: ${pdf.publication}
Subject: ${pdf.subjectTitle}
Edition: 2026-2027 Latest Curriculum Edition
================================================================================

[VERIFIED DIGITAL REPOSITORY RESOURCE]
This document contains the verified comprehensive notes, textbook solutions,
and model answers compiled from ${pdf.publication} for ${parsedGrade.stdLabel} (${parsedGrade.board}).

1. TOPICS & SYLLABUS INCLUDED:
${!isBundle ? (pdf as NotePdfResource).topicsCovered.map((t, idx) => `   ${idx + 1}. ${t}`).join('\n') : '   • Complete textbook syllabus with all chapters.'}

2. KEY HIGHLIGHTS:
   • 100% Textbook Exercises with step marks
   • Give Reasons / Explanations with Cause and Effect
   • Past examination high-yield questions
   • Topper exam answer-sheet layout and presentation tips

Happy Studying! StudyNest Sanctuary — Nurturing the Future & Success.
================================================================================
`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadingId(null);
      triggerToast(`✅ Download Complete! Saved ${title}`);
    }, 1000);
  };

  // Filtered Subject resources
  const subjectPdfs = allLibraryNotes.filter(r => r.subjectId === selectedSubjectId);
  const subjectBundles = allSubjectBundles.filter(b => b.subjectId === selectedSubjectId);

  // Unique chapters in this subject
  const subjectChapters = Array.from(new Set(subjectPdfs.map(p => p.chapterTitle)));

  // Filtered PDFs based on publication, search, and chapter
  const filteredPdfs = subjectPdfs.filter(pdf => {
    if (selectedPublication !== 'all' && pdf.publication !== selectedPublication) return false;
    if (selectedChapterFilter !== 'all' && pdf.chapterTitle !== selectedChapterFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = pdf.title.toLowerCase().includes(q);
      const matchChapter = pdf.chapterTitle.toLowerCase().includes(q);
      const matchTopics = pdf.topicsCovered.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchChapter || matchTopics;
    }
    return true;
  });

  const currentSubjectInfo = subjectCatalog.find(s => s.id === selectedSubjectId) || subjectCatalog[0] || { id: 'math', title: 'Mathematics', subtitle: 'Academic Mathematics' };

  return (
    <div className="text-left space-y-7 animate-fade-in">
      
      {/* 1. TOP HEADER & INTRO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-800 font-serif font-bold">
              Digital Reference Vault
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              180+ Chapter PDFs
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-1">
            Study Library — Target & Digest Notes
          </h2>
          <p className="text-xs md:text-sm text-stone-600 font-sans mt-1">
            Access complete <strong>Target Publications Perfect Notes</strong> and <strong>Navneet Master Key Digest</strong> full PDFs for all subjects, chapters, and topics.
          </p>
        </div>

        {/* Quick Highlights Badge */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <div className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 shadow-2xs text-xs font-mono text-stone-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% SSC Board Syllabus</span>
          </div>
        </div>
      </div>

      {/* 2. PUBLICATION TOGGLE SELECTOR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Publication Tabs */}
        <div className="bg-stone-100 p-1.5 rounded-2xl border border-stone-300 flex items-center gap-1.5 max-w-xl w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Publications (Target & Digest)', count: subjectPdfs.length },
            { id: 'Target Publications', label: '🎯 Target Notes', count: subjectPdfs.filter(p => p.publication === 'Target Publications').length },
            { id: 'Navneet Digest', label: '📚 Navneet Digest', count: subjectPdfs.filter(p => p.publication === 'Navneet Digest').length }
          ].map(pub => (
            <button
              key={pub.id}
              onClick={() => setSelectedPublication(pub.id as any)}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedPublication === pub.id
                  ? 'bg-[#1C1917] text-amber-200 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <span>{pub.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${selectedPublication === pub.id ? 'bg-amber-400/20 text-amber-300' : 'bg-stone-200 text-stone-600'}`}>
                {pub.count}
              </span>
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topic, chapter or concept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-600 font-sans shadow-2xs"
          />
        </div>
      </div>

      {/* 3. SUBJECT SELECTION PILLS */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold block">
          Select Subject ({parsedGrade.stdLabel}):
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {subjectCatalog.map(sub => {
            const count = allLibraryNotes.filter(r => r.subjectId === sub.id).length;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  setSelectedChapterFilter('all');
                }}
                className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedSubjectId === sub.id
                    ? 'bg-[#1C1917] text-amber-200 shadow-sm border border-stone-800'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
                }`}
              >
                <span>{sub.title}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${selectedSubjectId === sub.id ? 'bg-amber-400/20 text-amber-300' : 'bg-stone-100 text-stone-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. COMPLETE FULL SUBJECT BUNDLE DOWNLOAD SECTION */}
      <div className="bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-100/30 border-2 border-amber-300/80 rounded-3xl p-5 md:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif font-bold text-sm md:text-base text-stone-900">
                Complete Full Book Bundles for {currentSubjectInfo.title}
              </h3>
            </div>
            <p className="text-xs text-stone-600 font-sans mt-0.5">
              Download the entire book (all chapters combined) in one complete PDF package.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-900 font-bold bg-amber-200/60 px-3 py-1 rounded-xl self-start sm:self-center">
            {subjectChapters.length} Chapters Combined
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectBundles.map(bundle => (
            <div 
              key={bundle.id}
              className="bg-white border border-amber-300/80 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                    bundle.publication === 'Target Publications'
                      ? 'bg-red-100 text-red-900 border border-red-300'
                      : 'bg-blue-100 text-blue-900 border border-blue-300'
                  }`}>
                    {bundle.publication}
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 font-medium">
                    {bundle.totalPageCount} Pages • {bundle.fileSize}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base leading-snug">
                  {bundle.bundleTitle}
                </h4>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  {bundle.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-emerald-800 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Full Book Verified
                </span>

                <button
                  onClick={() => handleDownloadPdf(bundle)}
                  disabled={downloadingId === bundle.id}
                  className="px-4 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-200 hover:text-white rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingId === bundle.id ? 'Saving...' : 'Download Full Book PDF'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CHAPTER FILTER & COUNT BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <h3 className="font-serif font-bold text-base text-stone-900">
            Chapter-wise Full PDF Notes ({filteredPdfs.length} PDFs)
          </h3>
        </div>

        {/* Chapter select filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500 font-mono hidden sm:inline">Chapter:</span>
          <select
            value={selectedChapterFilter}
            onChange={(e) => setSelectedChapterFilter(e.target.value)}
            className="bg-white border border-stone-300 text-stone-800 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-600 cursor-pointer shadow-2xs max-w-xs"
          >
            <option value="all">All Chapters ({subjectChapters.length} Chapters)</option>
            {subjectChapters.map((ch, idx) => (
              <option key={idx} value={ch}>Chapter {idx + 1}: {ch}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 6. INDIVIDUAL CHAPTER PDF CARDS GRID */}
      {filteredPdfs.length === 0 ? (
        <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-3xl p-10 text-center space-y-2">
          <FileText className="w-8 h-8 text-stone-400 mx-auto" />
          <h4 className="font-serif font-bold text-stone-700">No note PDFs match your current filters.</h4>
          <p className="text-xs text-stone-500">Try selecting "All Publications" or clearing the search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPdfs.map((pdf) => {
            const isTarget = pdf.publication === 'Target Publications';
            return (
              <div
                key={pdf.id}
                className="bg-white border-2 border-stone-850 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                {/* Card Header */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isTarget 
                        ? 'bg-red-50 text-red-900 border border-red-300' 
                        : 'bg-blue-50 text-blue-900 border border-blue-300'
                    }`}>
                      {isTarget ? '🎯 Target Perfect Notes' : '📚 Navneet Master Key Digest'}
                    </span>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                      <span>{pdf.pageCount} Pages</span>
                      <span>•</span>
                      <span>{pdf.fileSize}</span>
                      <span>•</span>
                      <span className="flex items-center text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                        {pdf.rating}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                      Chapter {pdf.chapterNumber}: {pdf.chapterTitle}
                    </span>
                    <h4 className="font-serif font-bold text-stone-900 text-base md:text-lg leading-snug mt-0.5 group-hover:text-amber-800 transition-colors">
                      {pdf.title}
                    </h4>
                    <span className="text-[10px] font-mono text-stone-500">
                      Edition: {pdf.edition} • {pdf.downloadCount.toLocaleString()} Students Downloaded
                    </span>
                  </div>

                  {/* Topics Covered Pill Box */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-bold block">
                      📖 Topics & Concepts Inside This PDF:
                    </span>
                    <ul className="text-xs text-stone-700 font-sans space-y-1">
                      {pdf.topicsCovered.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-700 font-bold">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block">
                      Key PDF Features:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pdf.keyHighlights.slice(0, 2).map((hl, hlIdx) => (
                        <span key={hlIdx} className="text-[11px] font-sans bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-lg">
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5">
                  {onSelectChapterNote && (
                    <button
                      onClick={() => onSelectChapterNote(pdf.subjectId, pdf.chapterTitle)}
                      className="text-xs font-serif text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      Study Notes View →
                    </button>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => {
                        setActivePdfModal(pdf);
                        setCurrentPage(1);
                        setZoomLevel(100);
                      }}
                      className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-stone-300"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-600" />
                      <span>Preview PDF</span>
                    </button>

                    <button
                      onClick={() => handleDownloadPdf(pdf)}
                      disabled={downloadingId === pdf.id}
                      className="px-4 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-100 hover:text-white rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadingId === pdf.id ? 'Downloading...' : 'Download PDF'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE IN-APP PDF VIEWER MODAL
          ========================================================================= */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-fade-in">
          <div className="bg-stone-100 text-stone-900 w-full max-w-5xl rounded-3xl overflow-hidden border-2 border-stone-850 shadow-2xl flex flex-col h-[94vh]">
            
            {/* 1. PDF Reader Toolbar */}
            <div className="bg-[#1C1917] text-white px-5 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-serif font-bold text-white text-xs sm:text-sm line-clamp-1">
                    {activePdfModal.title}
                  </h3>
                  <span className="text-[10px] font-mono text-amber-300/80">
                    {activePdfModal.publication} • {activePdfModal.edition} • {activePdfModal.pageCount} Pages
                  </span>
                </div>
              </div>

              {/* Reader Controls */}
              <div className="flex items-center gap-2 text-xs">
                {/* Zoom buttons */}
                <div className="flex items-center gap-1 bg-stone-850 px-2 py-1 rounded-lg border border-stone-700">
                  <button 
                    onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                    className="p-1 hover:text-amber-300 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] w-9 text-center">{zoomLevel}%</span>
                  <button 
                    onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                    className="p-1 hover:text-amber-300 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Download in Reader */}
                <button
                  onClick={() => handleDownloadPdf(activePdfModal)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs font-serif transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save PDF</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. PDF Document Page Viewport */}
            <div className="flex-1 bg-stone-300 p-4 sm:p-8 overflow-y-auto flex justify-center">
              
              {/* Document Sheet Styled like Real Target/Digest Printed Page */}
              <div 
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className="bg-white text-stone-900 w-full max-w-3xl rounded-xl shadow-xl p-8 sm:p-12 border border-stone-300 space-y-6 transition-transform relative select-text"
              >
                {/* Official Publisher Header Banner */}
                <div className="border-b-2 border-stone-850 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-amber-800">
                      MAHARASHTRA STATE BOARD • STD X (SSC)
                    </span>
                    <h2 className="text-lg md:text-xl font-serif font-black text-stone-900 tracking-tight">
                      {activePdfModal.publication.toUpperCase()}
                    </h2>
                    <span className="text-xs font-serif text-stone-600 italic">
                      {activePdfModal.edition} — Comprehensive Study Compendium
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 bg-stone-100 rounded-md border border-stone-300 block">
                      CHAPTER {activePdfModal.chapterNumber}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 mt-1 block">
                      Page 1 of {activePdfModal.pageCount}
                    </span>
                  </div>
                </div>

                {/* Chapter Title Headline */}
                <div className="text-center py-2 bg-stone-50 border-y border-stone-200">
                  <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-950">
                    {activePdfModal.chapterTitle}
                  </h1>
                  <span className="text-xs font-mono text-amber-800 font-semibold">
                    Subject: {activePdfModal.subjectTitle}
                  </span>
                </div>

                {/* 1. Introduction & Learning Goals */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-1 rounded inline-block">
                    I. CHAPTER OVERVIEW & LEARNING OBJECTIVES
                  </h4>
                  <p className="text-xs md:text-sm font-sans leading-relaxed text-stone-800">
                    {activePdfModal.pdfPreviewExcerpt.chapterIntroduction}
                  </p>
                </div>

                {/* 2. Key Topics Table / Concept Map */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-1 rounded inline-block">
                    II. CORE CONCEPTS & FORMULA BLUEPRINTS
                  </h4>
                  <div className="space-y-2">
                    {activePdfModal.pdfPreviewExcerpt.keyFormulasOrDefinitions.map((item, iIdx) => (
                      <div key={iIdx} className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-1">
                        <span className="text-xs font-serif font-bold text-stone-900 block">
                          📌 {item.term}
                        </span>
                        <p className="text-xs font-sans text-stone-700 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Detailed Syllabus Outline */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-1 rounded inline-block">
                    III. DETAILED TOPIC BREAKDOWN IN THIS CHAPTER
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activePdfModal.topicsCovered.map((t, tIdx) => (
                      <div key={tIdx} className="bg-stone-50/80 border border-stone-200/80 p-2.5 rounded-xl text-xs font-sans text-stone-800 flex items-start gap-2">
                        <span className="text-amber-700 font-mono font-bold">{tIdx + 1}.</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Board Model Questions & Solutions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-1 rounded inline-block">
                    IV. BOARD MODEL QUESTIONS & SWADHYAY (स्वाध्याय)
                  </h4>
                  <div className="space-y-3">
                    {activePdfModal.pdfPreviewExcerpt.boardModelQuestions.map((qItem, qIdx) => (
                      <div key={qIdx} className="border-2 border-stone-200 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs font-serif">
                          <strong className="text-stone-900">Q.{qIdx + 1}: {qItem.q}</strong>
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono font-bold rounded">
                            [{qItem.marks} Marks]
                          </span>
                        </div>
                        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs font-sans text-stone-800 leading-relaxed">
                          <strong className="text-amber-800 block mb-1">Model Solution:</strong>
                          {qItem.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Topper Presentation Advice */}
                <div className="bg-gradient-to-r from-amber-50 to-stone-50 border-l-4 border-amber-600 p-4 rounded-r-2xl space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                    💡 TOPPER ADVICE & BOARD EXAMINER INSTRUCTIONS
                  </span>
                  <p className="text-xs font-serif italic text-stone-800 leading-relaxed">
                    "{activePdfModal.pdfPreviewExcerpt.topperStudyAdvice}"
                  </p>
                </div>

                {/* Footer of the Sheet */}
                <div className="border-t border-stone-200 pt-4 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>STUDY NEST VERIFIED • TARGET & NAVNEET REPOSITORY</span>
                  <span>CONFIDENTIAL BOARD PREP DOCUMENT</span>
                </div>

              </div>

            </div>

            {/* 3. Modal Bottom Bar */}
            <div className="bg-white px-5 py-3 border-t border-stone-300 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-stone-600 font-sans">
                Full <strong>{activePdfModal.pageCount} pages</strong> ready to save or print for offline board examination revision.
              </span>

              <div className="flex items-center gap-2">
                {onSelectChapterNote && (
                  <button
                    onClick={() => {
                      const subId = activePdfModal.subjectId;
                      const chTitle = activePdfModal.chapterTitle;
                      setActivePdfModal(null);
                      onSelectChapterNote(subId, chTitle);
                    }}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-stone-300"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                    <span>Open Chapter Notes</span>
                  </button>
                )}

                <button
                  onClick={() => handleDownloadPdf(activePdfModal)}
                  className="px-4 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-200 hover:text-white rounded-xl text-xs font-serif font-bold transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full Chapter PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
