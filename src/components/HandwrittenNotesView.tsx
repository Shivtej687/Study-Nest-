import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Printer, 
  Copy, 
  Bookmark, 
  BookOpen, 
  Lightbulb, 
  HelpCircle, 
  FileText,
  Clock,
  Award,
  Layers,
  CheckCircle2,
  Calculator,
  Sigma,
  Compass,
  Eye,
  Atom,
  Binary
} from 'lucide-react';
import { getHandwrittenNotes, HandwrittenNoteData } from '../data/handwrittenNotes';
import { getAllChaptersForSubject } from '../data/syllabusCatalog';
import { getSubjectCatalogForUser } from '../data/gradeCurriculumAdapter';
import { ScienceDiagramRenderer } from './ScienceDiagramRenderer';
import { PoemAppreciationView } from './PoemAppreciationView';
import { SocialScienceQAView } from './SocialScienceQAView';

interface HandwrittenNotesViewProps {
  subjectId: string;
  chapterTitle: string;
  userProfile?: any;
  onBackToSubject: () => void;
  onBackToAllSubjects: () => void;
  onSelectChapter: (subjectId: string, chapterTitle: string) => void;
  isChapterCompleted: boolean;
  onToggleChapterCompleted: (subjectId: string, chapterTitle: string) => void;
  triggerToast: (msg: string) => void;
}

export const HandwrittenNotesView: React.FC<HandwrittenNotesViewProps> = ({
  subjectId,
  chapterTitle,
  userProfile,
  onBackToSubject,
  onBackToAllSubjects,
  onSelectChapter,
  isChapterCompleted,
  onToggleChapterCompleted,
  triggerToast
}) => {
  const std = userProfile?.studentMeta?.std;
  const board = userProfile?.studentMeta?.board;
  const studying = userProfile?.studentMeta?.studying;

  const subjectCatalog = useMemo(() => getSubjectCatalogForUser(std, board, studying), [std, board, studying]);
  const currentSubject = subjectCatalog.find(s => s.id === subjectId) || subjectCatalog[0] || {
    id: subjectId,
    title: 'Subject Notes',
    subtitle: 'Comprehensive handwritten guide',
    categoryTag: 'Academic',
    sections: [{ title: 'Main Topics', chapters: [chapterTitle] }]
  };
  const allSubjectChapters = getAllChaptersForSubject(currentSubject);
  const currentChapterIdx = allSubjectChapters.indexOf(chapterTitle);

  const prevChapter = currentChapterIdx > 0 ? allSubjectChapters[currentChapterIdx - 1] : null;
  const nextChapter = currentChapterIdx < allSubjectChapters.length - 1 ? allSubjectChapters[currentChapterIdx + 1] : null;

  const notesData: HandwrittenNoteData = getHandwrittenNotes(subjectId, chapterTitle, currentSubject.title);
  const hasSums = Boolean(notesData.handwrittenSums && notesData.handwrittenSums.length > 0);
  const hasDerivations = Boolean(notesData.handwrittenDerivations && notesData.handwrittenDerivations.length > 0);
  const hasDiagrams = Boolean(notesData.handwrittenDiagrams && notesData.handwrittenDiagrams.length > 0);
  const hasAppreciation = Boolean(notesData.poemAppreciation);
  const hasSocialQA = Boolean(notesData.socialScienceQA);

  const [activeNoteTab, setActiveNoteTab] = useState<'all' | 'sums' | 'derivations' | 'diagrams' | 'appreciation' | 'socialqa' | 'formulas' | 'qa' | 'tips'>(
    hasSocialQA && (subjectId === 'hist' || subjectId === 'geo') ? 'socialqa' :
    hasAppreciation ? 'appreciation' :
    hasSums && (subjectId === 'math1' || subjectId === 'math2') ? 'sums' :
    hasDerivations && subjectId === 'sci1' ? 'derivations' :
    hasDiagrams && subjectId === 'sci2' ? 'diagrams' : 'all'
  );
  const [paperStyle, setPaperStyle] = useState<'ruled' | 'clean' | 'parchment'>('ruled');

  const handleCopy = () => {
    const textToCopy = `${notesData.subjectTitle} - ${notesData.chapterTitle}\n\n${notesData.coreOverview}\n\nRule: ${notesData.handwrittenRule}\n\nSections:\n` +
      notesData.sections.map(s => `${s.heading}:\n` + s.notes.join('\n')).join('\n\n');
    navigator.clipboard.writeText(textToCopy);
    triggerToast(`Copied handwritten notes for "${chapterTitle}" to clipboard!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Top Navigation & Toolbar Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200/60 pb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button 
            onClick={onBackToSubject}
            className="px-3.5 py-1.5 bg-[#1C1917] hover:bg-stone-850 text-amber-100 hover:text-white rounded-xl text-xs font-serif font-bold transition-all cursor-pointer inline-flex items-center gap-2 group shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to {currentSubject.title}</span>
          </button>

          <button 
            onClick={onBackToAllSubjects}
            className="px-3 py-1.5 border border-stone-200 hover:border-stone-850 bg-white rounded-xl text-[11px] font-serif text-stone-600 hover:text-stone-900 transition-all cursor-pointer"
          >
            All 10 Subjects
          </button>

          <span className="text-stone-300 hidden sm:inline">/</span>

          <span className="text-xs font-serif text-stone-500 font-medium truncate max-w-[200px] sm:max-w-xs">
            {chapterTitle}
          </span>
        </div>

        {/* Action Controls: Complete Button, Prev/Next, Copy, Print */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => onToggleChapterCompleted(subjectId, chapterTitle)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
              isChapterCompleted 
                ? 'bg-amber-600 text-white hover:bg-amber-700' 
                : 'bg-white border border-stone-300 text-stone-700 hover:border-amber-600 hover:text-amber-800'
            }`}
          >
            {isChapterCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mastered ✓</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-stone-400" />
                <span>Mark as Mastered</span>
              </>
            )}
          </button>

          <div className="flex items-center border border-stone-200 bg-white rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => prevChapter && onSelectChapter(subjectId, prevChapter)}
              disabled={!prevChapter}
              title={prevChapter ? `Previous: ${prevChapter}` : 'First chapter'}
              className="p-1.5 px-2 hover:bg-stone-50 text-stone-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-2 py-1 text-stone-400 border-x border-stone-100">
              {currentChapterIdx + 1} / {allSubjectChapters.length}
            </span>
            <button
              onClick={() => nextChapter && onSelectChapter(subjectId, nextChapter)}
              disabled={!nextChapter}
              title={nextChapter ? `Next: ${nextChapter}` : 'Last chapter'}
              className="p-1.5 px-2 hover:bg-stone-50 text-stone-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 border border-stone-200 hover:border-stone-850 bg-white text-stone-600 hover:text-stone-900 rounded-xl text-xs transition-colors cursor-pointer"
            title="Copy notes to clipboard"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePrint}
            className="p-2 border border-stone-200 hover:border-stone-850 bg-white text-stone-600 hover:text-stone-900 rounded-xl text-xs transition-colors cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Header Card for the Notes */}
      <div className="bg-gradient-to-r from-stone-900 to-[#2A2420] text-amber-100 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 font-mono">
                {currentSubject.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-stone-800 text-stone-300 border border-stone-700 font-mono">
                {notesData.categoryTag}
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                {notesData.standard}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white tracking-wide">
              {chapterTitle}
            </h1>

            <p className="text-xs md:text-sm text-stone-300 font-sans leading-relaxed">
              {notesData.coreOverview}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[220px] space-y-2.5 text-xs font-serif shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-stone-300">Board Weightage</span>
              <span className="font-mono font-bold text-amber-300">{notesData.boardWeightage}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-300">Exam Priority</span>
              <span className="font-mono font-bold text-amber-400">{notesData.examDifficulty}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-300">Revision Time</span>
              <span className="font-mono text-stone-200">{notesData.estimatedReadTime}</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-stone-300">Status</span>
              <span className={`font-semibold ${isChapterCompleted ? 'text-green-400' : 'text-amber-200'}`}>
                {isChapterCompleted ? 'Mastered ✓' : 'In Progress'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Paper Style Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { id: 'all', label: '📓 Handwritten Notebook', icon: BookOpen },
            ...(hasAppreciation ? [{ 
              id: 'appreciation', 
              label: subjectId === 'mar' 
                ? '📜 काव्यसौंदर्य व रसग्रहण' 
                : subjectId === 'hin' 
                  ? '📜 पद्य विश्लेषण एवं काव्य सौंदर्य' 
                  : '📜 Poem Appreciation (5 Marks)', 
              icon: Sparkles 
            }] : []),
            ...(hasSums ? [{ id: 'sums', label: `🧮 Solved Sums (${notesData.handwrittenSums?.length})`, icon: Calculator }] : []),
            ...(hasDerivations ? [{ id: 'derivations', label: `📐 Derivations (${notesData.handwrittenDerivations?.length})`, icon: Compass }] : []),
            ...(hasDiagrams ? [{ id: 'diagrams', label: `🔬 Labeled Diagrams (${notesData.handwrittenDiagrams?.length})`, icon: Eye }] : []),
            ...(hasSocialQA ? [{ 
              id: 'socialqa', 
              label: subjectId === 'hist' 
                ? '📜 Textbook Q&A, Reasons & Timelines' 
                : subjectId === 'geo' 
                  ? '🌍 Geographical Reasons & Q&A' 
                  : '📜 Textbook Q&A (स्वाध्याय)', 
              icon: FileText 
            }] : []),
            { id: 'formulas', label: subjectId === 'mar' ? '📝 शब्दार्थ व नियम' : subjectId === 'hin' ? '📝 शब्दार्थ व नियम' : '📝 Formulas & Defs', icon: Layers },
            { id: 'qa', label: subjectId === 'mar' ? '🎯 स्वाध्याय व प्रश्नोत्तरे' : subjectId === 'hin' ? '🎯 स्वाध्याय प्रश्नोत्तर' : '🎯 Board Model Q&A', icon: HelpCircle },
            { id: 'tips', label: subjectId === 'mar' ? '💡 टॉपर टिप्स' : subjectId === 'hin' ? '💡 टॉपर टिप्स' : '💡 Topper Tips', icon: Lightbulb }
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeNoteTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveNoteTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isTabActive
                    ? 'bg-[#1C1917] text-amber-200 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isTabActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Paper texture mode */}
        <div className="flex items-center gap-1 text-[11px] font-serif text-stone-500">
          <span className="mr-1 hidden sm:inline">Paper Style:</span>
          {(['ruled', 'clean', 'parchment'] as const).map(style => (
            <button
              key={style}
              onClick={() => setPaperStyle(style)}
              className={`px-2 py-0.5 rounded-md capitalize transition-all cursor-pointer ${
                paperStyle === style 
                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300' 
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          THE AUTHENTIC HANDWRITTEN NOTEBOOK CANVAS
          ========================================================================= */}
      <div 
        className={`rounded-3xl border-2 border-stone-850 p-6 md:p-10 shadow-lg relative transition-all duration-300 ${
          paperStyle === 'ruled' 
            ? 'bg-[#FAF8F2] border-stone-850' 
            : paperStyle === 'parchment'
              ? 'bg-[#F5EEDB] border-amber-900/40'
              : 'bg-white border-stone-850'
        }`}
        style={paperStyle === 'ruled' ? {
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, rgba(203, 213, 225, 0.45) 30px)'
        } : undefined}
      >
        {/* Red Margin Line on the Left (Classic Indian Ruled Notebook) */}
        {paperStyle === 'ruled' && (
          <div className="hidden md:block absolute top-0 bottom-0 left-12 w-[1.5px] bg-red-400/50 pointer-events-none" />
        )}

        {/* Top Header of Notebook Page */}
        <div className="md:pl-10 space-y-8">
          
          {/* Header Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-300 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded border border-amber-300">
                DATE: 2026–27 BOARD BATCH
              </span>
              <span className="text-xs font-serif font-bold text-stone-700">
                SUBJECT: {currentSubject.title.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-stone-500">
                PAGE NO: #{(currentChapterIdx + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-red-500 font-['Caveat'] text-lg font-bold ml-2">
                ★ 100/100 Target Note
              </span>
            </div>
          </div>

          {/* Golden Handwritten Rule Box */}
          <div className="bg-amber-100/60 border-2 border-amber-600/40 rounded-2xl p-5 shadow-xs relative">
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-amber-600 text-white rounded-full text-[10px] font-serif uppercase tracking-widest font-bold">
              Golden Exam Rule
            </div>
            <p className="font-['Kalam'] text-base md:text-lg text-amber-950 font-bold leading-relaxed pt-1">
              "{notesData.handwrittenRule}"
            </p>
          </div>

          {/* 1. SECTIONS / CORE CONTENT */}
          {(activeNoteTab === 'all' || activeNoteTab === 'formulas') && (
            <div className="space-y-8">
              {notesData.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  {/* Section Title */}
                  <div className="flex items-center gap-2 border-b border-stone-300/80 pb-2">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Sec {sIdx + 1}
                    </span>
                    <h3 className="text-lg md:text-xl font-serif font-bold text-stone-900 tracking-wide">
                      {section.heading}
                    </h3>
                  </div>

                  {/* Handwritten Point Notes */}
                  <div className="space-y-3 font-serif">
                    {section.notes.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3 text-stone-800 leading-relaxed text-sm md:text-base">
                        <span className="text-amber-700 font-bold font-mono text-xs mt-1 shrink-0">
                          {pIdx + 1}.
                        </span>
                        <p className="font-sans font-medium text-stone-850">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Teacher's Key Highlight (Red/Gold Remark) */}
                  {section.keyHighlight && (
                    <div className="bg-red-50/60 border-l-4 border-red-500 p-4 rounded-r-xl my-3">
                      <p className="font-['Kalam'] text-sm md:text-base text-red-900 font-bold leading-relaxed">
                        {section.keyHighlight}
                      </p>
                    </div>
                  )}

                  {/* Handwritten Diagram or Flowchart Box */}
                  {section.diagramTitle && section.diagramItems && (
                    <div className="bg-white/90 border border-stone-300 rounded-2xl p-5 shadow-xs space-y-3 my-4">
                      <div className="flex items-center gap-2 text-xs font-serif font-bold text-stone-700 uppercase tracking-wider">
                        <Layers className="w-3.5 h-3.5 text-amber-600" />
                        <span>{section.diagramTitle}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                        {section.diagramItems.map((item, dIdx) => (
                          <div 
                            key={dIdx} 
                            className="bg-amber-50/50 border border-amber-200 rounded-xl p-3 text-center flex flex-col justify-center items-center shadow-2xs"
                          >
                            <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-mono font-bold flex items-center justify-center mb-1.5">
                              {dIdx + 1}
                            </span>
                            <span className="font-['Kalam'] text-xs font-bold text-stone-900">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* =========================================================================
              HANDWRITTEN SOLVED SUMS (FOR MATHS 1 AND MATHS 2 CHAPTERS)
              ========================================================================= */}
          {(activeNoteTab === 'all' || activeNoteTab === 'sums') && hasSums && notesData.handwrittenSums && notesData.handwrittenSums.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-stone-300 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-300 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 bg-amber-600 text-white rounded-lg">
                    <Calculator className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base md:text-xl font-serif font-bold text-stone-900 tracking-wide">
                      Handwritten Solved Sums (Board Examination Format)
                    </h3>
                    <p className="text-xs text-stone-500 font-serif">
                      Complete step-by-step solutions with Given, Formulas, Scratchpad Margin & Boxed Answers
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-xl shrink-0 self-start sm:self-auto shadow-2xs">
                  {notesData.handwrittenSums.length} Solved Board Sums
                </span>
              </div>

              <div className="space-y-8">
                {notesData.handwrittenSums.map((sum, sIdx) => (
                  <div 
                    key={sum.id || sIdx} 
                    className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 relative overflow-hidden"
                  >
                    {/* Header: Title, Difficulty, Board Ref, Marks */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-200 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg">
                          SUM #{(sIdx + 1).toString().padStart(2, '0')}
                        </span>
                        <h4 className="text-base md:text-lg font-serif font-bold text-stone-900">
                          {sum.title}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {sum.difficulty && (
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                            sum.difficulty === 'Hot Sum (HOTS)'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : sum.difficulty === 'Board Repeated'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-stone-100 text-stone-700 border-stone-200'
                          }`}>
                            {sum.difficulty}
                          </span>
                        )}
                        {sum.boardReference && (
                          <span className="text-[10px] font-mono text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md hidden sm:inline">
                            {sum.boardReference}
                          </span>
                        )}
                        <span className="text-[11px] font-mono font-bold bg-[#1C1917] text-amber-200 px-2.5 py-1 rounded-lg shadow-2xs">
                          {sum.marks} Marks
                        </span>
                      </div>
                    </div>

                    {/* Problem Statement Box */}
                    <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-900 block mb-1">
                        Problem Statement / Board Question:
                      </span>
                      <p className="font-serif text-sm md:text-base font-semibold text-stone-900 leading-relaxed whitespace-pre-line">
                        {sum.problemStatement}
                      </p>
                    </div>

                    {/* Given & To Find / To Prove */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {sum.givenData && sum.givenData.length > 0 && (
                        <div className="bg-stone-50/80 border border-stone-200 rounded-xl p-3.5 space-y-1.5">
                          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-500 block">
                            Given:
                          </span>
                          <ul className="space-y-1 font-serif text-xs md:text-sm text-stone-800">
                            {sum.givenData.map((g, gIdx) => (
                              <li key={gIdx} className="flex items-start gap-1.5">
                                <span className="text-amber-600 font-bold">•</span>
                                <span>{g}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {sum.toFindOrProve && (
                        <div className="bg-stone-50/80 border border-stone-200 rounded-xl p-3.5 space-y-1.5">
                          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-500 block">
                            To Find / To Prove:
                          </span>
                          <p className="font-serif text-xs md:text-sm font-medium text-stone-800 leading-relaxed whitespace-pre-line">
                            {sum.toFindOrProve}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Formula Used Banner */}
                    {sum.formulaUsed && sum.formulaUsed.length > 0 && (
                      <div className="bg-yellow-50/90 border-l-4 border-yellow-500 p-3.5 rounded-r-xl space-y-1">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-yellow-900 block">
                          📐 Formula / Theorem Applied:
                        </span>
                        <div className="space-y-1 font-mono text-xs md:text-sm text-yellow-950 font-bold">
                          {sum.formulaUsed.map((f, fIdx) => (
                            <div key={fIdx}>• {f}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step-by-Step Solution Canvas with Indian Exam Scratchpad Margin */}
                    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-[#FAF8F2]">
                      <div className="flex flex-col lg:flex-row">
                        
                        {/* Main Solution Body (Handwritten step-by-step working) */}
                        <div className="flex-1 p-5 space-y-3 font-serif">
                          <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
                            <span className="text-xs uppercase font-mono font-bold tracking-wider text-stone-700">
                              Handwritten Step-by-Step Solution:
                            </span>
                            <span className="text-[10px] font-mono text-stone-400">Stepwise Marking</span>
                          </div>

                          {sum.stepByStepSolution.map((step, stIdx) => (
                            <div key={stIdx} className="bg-white/70 border border-stone-200/70 rounded-xl p-3.5 shadow-2xs">
                              <pre className="font-['Kalam'] text-xs md:text-sm text-stone-900 whitespace-pre-wrap leading-relaxed font-bold">
                                {step}
                              </pre>
                            </div>
                          ))}
                        </div>

                        {/* Right Margin: Scratchpad & Rough Calculations */}
                        {sum.roughWorkNotes && sum.roughWorkNotes.length > 0 && (
                          <div className="w-full lg:w-64 bg-amber-50/40 border-t lg:border-t-0 lg:border-l-2 border-dashed border-stone-300 p-4 shrink-0 space-y-2">
                            <div className="flex items-center justify-between border-b border-stone-300/80 pb-1">
                              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-600">
                                Rough Work
                              </span>
                              <span className="text-[9px] font-mono text-stone-400">Scratchpad</span>
                            </div>
                            <div className="space-y-1.5 font-['Kalam'] text-xs text-stone-700 font-bold">
                              {sum.roughWorkNotes.map((r, rIdx) => (
                                <div key={rIdx} className="bg-white/80 p-2 rounded-lg border border-stone-200/60 shadow-2xs">
                                  {r}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                    {/* Final Answer in Classical Double-Lined Box */}
                    <div className="border-4 border-double border-amber-700 bg-amber-50/80 rounded-2xl p-4 text-center shadow-xs">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-800 block mb-1">
                        Final Answer
                      </span>
                      <p className="font-['Kalam'] text-base md:text-lg font-bold text-amber-950 leading-snug">
                        {sum.finalAnswer}
                      </p>
                    </div>

                    {/* Examiner's Step-Marking Note */}
                    {sum.examinerNote && (
                      <div className="flex items-start gap-2 bg-red-50/60 border border-red-200 p-3 rounded-xl text-xs">
                        <span className="text-red-600 font-bold text-sm shrink-0">⭐</span>
                        <p className="font-['Kalam'] text-red-900 font-bold text-xs md:text-sm leading-snug">
                          Examiner's Step-Marking Tip: {sum.examinerNote}
                        </p>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              HANDWRITTEN SCIENTIFIC DERIVATIONS (SCIENCE 1 & CORE CHAPTERS)
              ========================================================================= */}
          {(activeNoteTab === 'all' || activeNoteTab === 'derivations') && hasDerivations && notesData.handwrittenDerivations && notesData.handwrittenDerivations.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-stone-300 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-300 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 bg-amber-700 text-white rounded-lg">
                    <Compass className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base md:text-xl font-serif font-bold text-stone-900 tracking-wide">
                      Handwritten Board Derivations & Mathematical Proofs
                    </h3>
                    <p className="text-xs text-stone-500 font-serif">
                      Step-by-step physical principles, algebraic progression, and boxed board results
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-xl shrink-0 self-start sm:self-auto shadow-2xs">
                  {notesData.handwrittenDerivations.length} Essential Board Derivations
                </span>
              </div>

              <div className="space-y-8">
                {notesData.handwrittenDerivations.map((derivation, dIdx) => (
                  <div 
                    key={derivation.id || dIdx} 
                    className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 relative overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-200 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg">
                          DERIVATION #{(dIdx + 1).toString().padStart(2, '0')}
                        </span>
                        <h4 className="text-base md:text-lg font-serif font-bold text-stone-900">
                          {derivation.title}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {derivation.difficulty && (
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border bg-amber-50 text-amber-900 border-amber-300">
                            {derivation.difficulty}
                          </span>
                        )}
                        {derivation.boardReference && (
                          <span className="text-[10px] font-mono text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md hidden sm:inline">
                            {derivation.boardReference}
                          </span>
                        )}
                        <span className="text-[11px] font-mono font-bold bg-[#1C1917] text-amber-200 px-2.5 py-1 rounded-lg shadow-2xs">
                          {derivation.marks} Marks
                        </span>
                      </div>
                    </div>

                    {/* Aim Box */}
                    <div className="bg-amber-50/70 border border-amber-300/80 rounded-2xl p-4">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-900 block mb-1">
                        Aim / Governing Principle:
                      </span>
                      <p className="font-serif text-sm md:text-base font-semibold text-stone-900 leading-relaxed">
                        {derivation.aim}
                      </p>
                    </div>

                    {/* Prerequisites & Assumptions */}
                    {derivation.prerequisitesOrAssumptions && derivation.prerequisitesOrAssumptions.length > 0 && (
                      <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-600 block">
                          Starting Assumptions & Physical Prerequisites:
                        </span>
                        <ul className="space-y-1 font-serif text-xs md:text-sm text-stone-800">
                          {derivation.prerequisitesOrAssumptions.map((p, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-1.5">
                              <span className="text-amber-600 font-bold">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Diagram Steps if available */}
                    {derivation.diagramTitle && derivation.diagramAsciiOrSteps && (
                      <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-800 block">
                          📐 {derivation.diagramTitle}:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-stone-700">
                          {derivation.diagramAsciiOrSteps.map((stepStr, sIdx) => (
                            <div key={sIdx} className="bg-white/80 p-2 rounded-lg border border-amber-200/60">
                              {stepStr}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step-by-Step Derivation */}
                    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-[#FAF8F2] p-5 space-y-4">
                      <span className="text-xs uppercase font-mono font-bold tracking-wider text-stone-700 block border-b border-stone-200 pb-2">
                        Handwritten Step-by-Step Mathematical Derivation:
                      </span>

                      <div className="space-y-4">
                        {derivation.stepByStepDerivation.map((step, sIdx) => (
                          <div key={sIdx} className="bg-white/80 border border-stone-200 rounded-xl p-4 shadow-2xs space-y-2">
                            <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                              <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                                Step {step.stepNumber}: {step.stepTitle}
                              </span>
                              {step.reasoning && (
                                <span className="text-[10px] font-mono text-stone-500 italic hidden sm:inline">
                                  [{step.reasoning}]
                                </span>
                              )}
                            </div>
                            <p className="font-sans text-xs md:text-sm text-stone-850 leading-relaxed">
                              {step.statement}
                            </p>
                            {step.mathEquation && (
                              <div className="bg-stone-900 text-amber-200 font-mono text-xs md:text-sm p-3 rounded-lg border border-stone-800 font-bold whitespace-pre-wrap">
                                {step.mathEquation}
                              </div>
                            )}
                            {step.reasoning && (
                              <p className="text-[10px] font-mono text-stone-500 italic sm:hidden">
                                Reason: {step.reasoning}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Final Boxed Result */}
                    <div className="border-4 border-double border-amber-700 bg-amber-50/90 rounded-2xl p-4 text-center shadow-xs">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-900 block mb-1">
                        ★ Final Boxed Board Result
                      </span>
                      <p className="font-['Kalam'] text-base md:text-xl font-bold text-amber-950 leading-snug">
                        {derivation.finalBoxedResult}
                      </p>
                    </div>

                    {/* Physical Significance */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-600 block">
                        Physical Significance & Board Conceptual Notes:
                      </span>
                      <p className="font-serif text-xs md:text-sm text-stone-800 leading-relaxed">
                        {derivation.physicalSignificance}
                      </p>
                    </div>

                    {/* Topper Tip / Warning */}
                    {derivation.topperTipOrWarning && (
                      <div className="flex items-start gap-2 bg-red-50/70 border border-red-200 p-3.5 rounded-xl text-xs">
                        <span className="text-red-600 font-bold text-base shrink-0">⭐</span>
                        <p className="font-['Kalam'] text-red-900 font-bold text-xs md:text-sm leading-snug">
                          Examiner's Warning: {derivation.topperTipOrWarning}
                        </p>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              HANDWRITTEN LABELED DIAGRAMS & EXPLANATIONS (SCIENCE 2 & BIOLOGY)
              ========================================================================= */}
          {(activeNoteTab === 'all' || activeNoteTab === 'diagrams') && hasDiagrams && notesData.handwrittenDiagrams && notesData.handwrittenDiagrams.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-stone-300 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-300 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 bg-emerald-700 text-white rounded-lg">
                    <Eye className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base md:text-xl font-serif font-bold text-stone-900 tracking-wide">
                      Handwritten Scientific Diagrams with Complete Explanations
                    </h3>
                    <p className="text-xs text-stone-500 font-serif">
                      Neat labeled diagrams, anatomical callouts, pencil drawing guidelines, and board Q&A
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-xl shrink-0 self-start sm:self-auto shadow-2xs">
                  {notesData.handwrittenDiagrams.length} Mandatory Board Diagrams
                </span>
              </div>

              <div className="space-y-8">
                {notesData.handwrittenDiagrams.map((diag, dIdx) => (
                  <div 
                    key={diag.id || dIdx} 
                    className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 relative overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-200 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg">
                          DIAGRAM #{(dIdx + 1).toString().padStart(2, '0')}
                        </span>
                        <h4 className="text-base md:text-lg font-serif font-bold text-stone-900">
                          {diag.title}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border bg-stone-100 text-stone-800 border-stone-300">
                          {diag.diagramCategory}
                        </span>
                        {diag.boardReference && (
                          <span className="text-[10px] font-mono text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md hidden sm:inline">
                            {diag.boardReference}
                          </span>
                        )}
                        <span className="text-[11px] font-mono font-bold bg-[#1C1917] text-amber-200 px-2.5 py-1 rounded-lg shadow-2xs">
                          {diag.marks} Marks
                        </span>
                      </div>
                    </div>

                    {/* Caption */}
                    <p className="text-xs md:text-sm text-stone-600 font-serif italic border-l-2 border-amber-600 pl-3">
                      {diag.caption}
                    </p>

                    {/* Visual Schematic Diagram Canvas */}
                    <ScienceDiagramRenderer diagram={diag} />

                    {/* Labeled Callouts Breakdown Table */}
                    <div className="space-y-3">
                      <span className="text-xs uppercase font-mono font-bold tracking-wider text-stone-700 block">
                        🏷️ Anatomical / Component Labels & Functional Roles:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {diag.labels.map((lbl) => (
                          <div key={lbl.id} className="bg-[#FAF8F2] border border-stone-200 rounded-xl p-3.5 space-y-1.5">
                            <div className="flex items-center justify-between border-b border-stone-200/80 pb-1">
                              <span className="font-serif font-bold text-stone-900 text-xs md:text-sm">
                                {lbl.label}
                              </span>
                              {lbl.positionDescription && (
                                <span className="text-[9px] font-mono text-stone-400">
                                  {lbl.positionDescription}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-700 font-sans leading-relaxed">
                              <strong className="text-stone-900 font-medium">Function: </strong>
                              {lbl.roleOrFunction}
                            </p>
                            <p className="text-[11px] text-amber-900 font-mono bg-amber-50 p-1.5 rounded border border-amber-200">
                              ⭐ Board key point: {lbl.boardKeyPoint}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step-by-Step Biological Explanation */}
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2.5">
                      <span className="text-xs uppercase font-mono font-bold tracking-wider text-stone-700 block border-b border-stone-200 pb-1.5">
                        📖 Step-by-Step Scientific Explanation:
                      </span>
                      <div className="space-y-2 font-serif text-xs md:text-sm text-stone-850 leading-relaxed">
                        {diag.stepByStepExplanation.map((exp, eIdx) => (
                          <p key={eIdx} className="whitespace-pre-line">
                            {exp}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Board Exam Drawing Guidelines (How to draw in exam) */}
                    <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-2">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-900 block">
                        ✏️ Board Answer Sheet Drawing Guidelines (How to Score Full Marks):
                      </span>
                      <ul className="space-y-1 text-xs text-blue-950 font-serif">
                        {diag.drawingGuidelines.map((guide, gIdx) => (
                          <li key={gIdx} className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{guide}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exam Questions Asked */}
                    {diag.examQuestionsAsked && diag.examQuestionsAsked.length > 0 && (
                      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1.5">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-600 block">
                          🎯 Typical Board Questions Asked from this Diagram:
                        </span>
                        <ul className="space-y-1 text-xs text-stone-800 font-serif">
                          {diag.examQuestionsAsked.map((q, qIdx) => (
                            <li key={qIdx} className="flex items-start gap-1.5">
                              <span className="text-amber-600 font-bold font-mono">Q{qIdx+1}.</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Golden Note */}
                    {diag.goldenNote && (
                      <div className="flex items-start gap-2 bg-amber-50/80 border border-amber-300 p-3.5 rounded-xl text-xs">
                        <span className="text-amber-700 font-bold text-base shrink-0">💡</span>
                        <p className="font-['Kalam'] text-amber-950 font-bold text-xs md:text-sm leading-snug">
                          Examiner's Golden Note: {diag.goldenNote}
                        </p>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              POEM APPRECIATION / KAVYASOUNDARYA (MARATHI, HINDI & ENGLISH POEMS)
              ========================================================================= */}
          {(activeNoteTab === 'all' || activeNoteTab === 'appreciation') && hasAppreciation && notesData.poemAppreciation && (
            <PoemAppreciationView appreciation={notesData.poemAppreciation} />
          )}

          {/* =========================================================================
              HISTORY, POLITICAL SCIENCE & GEOGRAPHY TEXTBOOK Q&A
              ========================================================================= */}
          {(activeNoteTab === 'all' || activeNoteTab === 'socialqa') && hasSocialQA && notesData.socialScienceQA && (
            <SocialScienceQAView socialData={notesData.socialScienceQA} />
          )}

          {/* 2. FORMULAS & DEFINITIONS CHEAT SHEET */}
          {(activeNoteTab === 'all' || activeNoteTab === 'formulas') && notesData.essentialFormulasOrDefinitions?.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-stone-300 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                  <span className="text-amber-600">📐</span>
                  <span>Key Formulas & Board Definitions Checklist</span>
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Essential Memory Bank</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {notesData.essentialFormulasOrDefinitions.map((f, fIdx) => (
                  <div key={fIdx} className="bg-white/80 border border-stone-300/80 rounded-2xl p-4 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-stone-900 text-sm">{f.term}</span>
                      {f.examTip && (
                        <span className="text-[9px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                          {f.examTip}
                        </span>
                      )}
                    </div>
                    <p className="font-['Kalam'] text-sm md:text-base text-stone-800 font-bold leading-snug">
                      {f.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. MODEL BOARD QUESTIONS & STEPWISE ANSWERS */}
          {(activeNoteTab === 'all' || activeNoteTab === 'qa') && notesData.modelExamQuestions?.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-stone-300 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                  <span className="text-amber-600">🎯</span>
                  <span>Frequent Board Examination Questions (Step-by-Step Model Answers)</span>
                </h3>
                <span className="text-[10px] font-mono text-red-600 font-bold">100% EXAM ACCURACY</span>
              </div>

              <div className="space-y-4">
                {notesData.modelExamQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white border-2 border-stone-850 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                      <span className="text-xs font-serif font-bold text-stone-900 flex items-center gap-1.5">
                        <span className="font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] border border-amber-200">
                          Q{qIdx + 1}
                        </span>
                        <span>{q.question}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {q.yearAppeared && (
                          <span className="text-[9px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                            {q.yearAppeared}
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-bold bg-amber-600 text-white px-2 py-0.5 rounded">
                          {q.marks} Marks
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#FAF8F2] border border-stone-200 rounded-xl p-4">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 block mb-1 font-bold">
                        Model Handwritten Solution:
                      </span>
                      <pre className="font-['Kalam'] text-xs md:text-sm text-stone-900 whitespace-pre-wrap leading-relaxed font-bold">
                        {q.answer}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. TOPPER MNEMONICS & EXAM ALERTS (STICKY NOTES STYLE) */}
          {(activeNoteTab === 'all' || activeNoteTab === 'tips') && (
            <div className="mt-8 pt-6 border-t-2 border-stone-300 grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Yellow Post-It Note: Topper's Mind Secrets */}
              <div className="bg-[#FEF9C3] border border-yellow-300 rounded-2xl p-5 shadow-md space-y-2.5 transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-2 border-b border-yellow-200/80 pb-2">
                  <Bookmark className="w-4 h-4 text-amber-700" />
                  <h4 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Topper's Revision Mnemonics
                  </h4>
                </div>
                <div className="space-y-2">
                  {notesData.topperMnemonics.map((tip, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2">
                      <span className="text-amber-800 text-xs">⭐</span>
                      <p className="font-['Kalam'] text-xs md:text-sm text-stone-850 font-bold leading-snug">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Red-Tinted Post-It Note: Board Mistakes to Avoid */}
              <div className="bg-[#FFE4E6] border border-red-300 rounded-2xl p-5 shadow-md space-y-2.5 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-2 border-b border-red-200/80 pb-2">
                  <Award className="w-4 h-4 text-red-700" />
                  <h4 className="font-serif font-bold text-red-950 text-xs uppercase tracking-wider">
                    Board Examiner Alert! Avoid These Mistakes
                  </h4>
                </div>
                <div className="space-y-2">
                  {notesData.mistakesToAvoid.map((mistake, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2">
                      <span className="text-red-700 text-xs">⚠️</span>
                      <p className="font-['Kalam'] text-xs md:text-sm text-red-950 font-bold leading-snug">
                        {mistake}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Bottom Navigation between Chapters */}
          <div className="mt-10 pt-6 border-t-2 border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevChapter ? (
              <button
                onClick={() => onSelectChapter(subjectId, prevChapter)}
                className="w-full sm:w-auto px-4 py-2 border-2 border-stone-850 bg-white hover:bg-stone-50 text-stone-900 rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
                <span>Prev Chapter: {prevChapter}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => onToggleChapterCompleted(subjectId, chapterTitle)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                isChapterCompleted
                  ? 'bg-amber-600 text-white'
                  : 'bg-[#1C1917] hover:bg-stone-850 text-amber-100'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isChapterCompleted ? 'Chapter Mastered (Click to Unmark)' : 'Mark Chapter as Mastered'}</span>
            </button>

            {nextChapter ? (
              <button
                onClick={() => onSelectChapter(subjectId, nextChapter)}
                className="w-full sm:w-auto px-4 py-2 border-2 border-stone-850 bg-white hover:bg-stone-50 text-stone-900 rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Next Chapter: {nextChapter}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </button>
            ) : (
              <button
                onClick={onBackToSubject}
                className="w-full sm:w-auto px-4 py-2 border-2 border-stone-850 bg-white hover:bg-stone-50 text-stone-900 rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Complete Subject Curriculum →</span>
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
