import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, BookOpen, FileText, Video, CheckSquare, 
  TrendingUp, Receipt, Bell, User, Sparkles, ArrowRight, 
  X, CornerDownLeft, Layers, BookMarked, HelpCircle, Flame
} from 'lucide-react';
import { SubjectCatalogItem } from '../data/syllabusCatalog';
import { parseStudentGrade } from '../data/gradeCurriculumAdapter';

export interface SearchResultItem {
  id: string;
  category: 'courses' | 'notes' | 'classes' | 'library' | 'quiz' | 'performance' | 'receipt' | 'notifications' | 'profile' | 'doubt';
  categoryLabel: string;
  title: string;
  subtitle: string;
  icon: any;
  targetTab: 'home' | 'courses' | 'classes' | 'library' | 'quiz' | 'performance' | 'doubt' | 'receipt' | 'notifications' | 'profile';
  subjectId?: string;
  chapterTitle?: string;
  badge?: string;
}

interface HeaderSearchBarProps {
  subjectCatalog: SubjectCatalogItem[];
  userProfile: any;
  onNavigateToTab: (tab: 'home' | 'courses' | 'classes' | 'library' | 'quiz' | 'performance' | 'doubt' | 'receipt' | 'notifications' | 'profile') => void;
  onSelectSubject?: (subjectId: string) => void;
  onSelectChapterNote?: (subjectId: string, chapterTitle: string) => void;
  triggerToast?: (msg: string) => void;
}

export const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({
  subjectCatalog,
  userProfile,
  onNavigateToTab,
  onSelectSubject,
  onSelectChapterNote,
  triggerToast
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const parsedGrade = useMemo(() => {
    return parseStudentGrade(
      userProfile?.studentMeta?.std,
      userProfile?.studentMeta?.board,
      userProfile?.studentMeta?.studying
    );
  }, [userProfile]);

  // Build a searchable index of the application
  const searchableIndex: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Static Feature Sections
    items.push(
      {
        id: 'nav-home',
        category: 'home' as any,
        categoryLabel: 'Overview',
        title: 'Home Dashboard',
        subtitle: 'Attendance index, syllabus mastery, study targets and daily progress',
        icon: TrendingUp,
        targetTab: 'home',
        badge: 'Dashboard'
      },
      {
        id: 'nav-receipt',
        category: 'receipt',
        categoryLabel: 'Fees & Receipt',
        title: 'Fees & Official Tax Invoice',
        subtitle: 'Official fee breakdown (₹40,000), payment receipt slip, EMI and transaction ledger',
        icon: Receipt,
        targetTab: 'receipt',
        badge: '₹40k Ledger'
      },
      {
        id: 'nav-notifications',
        category: 'notifications',
        categoryLabel: 'Alerts & Broadcasts',
        title: 'Notifications, Active Classes & Events',
        subtitle: 'Live class alerts, postponed sessions, annual fest, workshop schedules and timetable',
        icon: Bell,
        targetTab: 'notifications',
        badge: 'Live Alerts'
      },
      {
        id: 'nav-profile',
        category: 'profile',
        categoryLabel: 'My Profile',
        title: 'Student Profile & Digital ID Dossier',
        subtitle: `Official scholar identity, roll number, batch, parent details, and printable ID slip`,
        icon: User,
        targetTab: 'profile',
        badge: 'Digital ID'
      },
      {
        id: 'nav-doubt',
        category: 'doubt',
        categoryLabel: '24/7 AI Tutor',
        title: 'NestAI Doubt Circle & Study Buddy',
        subtitle: 'Ask any academic question, solve maths formulas step-by-step or chat casually',
        icon: Sparkles,
        targetTab: 'doubt',
        badge: '24/7 AI'
      },
      {
        id: 'nav-performance',
        category: 'performance',
        categoryLabel: 'Marks & Analytics',
        title: 'Student Performance & Evaluated Papers',
        subtitle: 'Subject marks cards, teacher evaluations, percentage tracker and chapter breakdown',
        icon: TrendingUp,
        targetTab: 'performance',
        badge: 'Marks Card'
      },
      {
        id: 'nav-classes',
        category: 'classes',
        categoryLabel: 'Live & Video Lectures',
        title: 'Classes & Digital Lecture Hall',
        subtitle: 'Ongoing live sessions, upcoming batches, and recorded video lecture archive',
        icon: Video,
        targetTab: 'classes',
        badge: 'Live Room'
      },
      {
        id: 'nav-library',
        category: 'library',
        categoryLabel: 'Study Library',
        title: 'Target & Navneet Study Library',
        subtitle: 'Target Publications digests, Navneet master notes, textbook solutions and PDF bundles',
        icon: BookMarked,
        targetTab: 'library',
        badge: 'PDF Digests'
      },
      {
        id: 'nav-quiz',
        category: 'quiz',
        categoryLabel: 'Tests & Quizzes',
        title: 'Tests, Oral Viva & 20M Mock Papers',
        subtitle: 'Voice interactive viva, 20-mark chapter papers, board papers and grand prelims',
        icon: CheckSquare,
        targetTab: 'quiz',
        badge: '20M Mocks'
      }
    );

    // 2. Index all Subjects
    subjectCatalog.forEach((subj, sIdx) => {
      items.push({
        id: `subj-${subj.id}`,
        category: 'courses',
        categoryLabel: 'Subject Curriculum',
        title: subj.title,
        subtitle: `${subj.categoryTag} • ${subj.subtitle} (${subj.sections.reduce((a, b) => a + b.chapters.length, 0)} Chapters)`,
        icon: BookOpen,
        targetTab: 'courses',
        subjectId: subj.id,
        badge: `Subject ${(sIdx + 1).toString().padStart(2, '0')}`
      });

      // 3. Index all Chapters under each subject
      subj.sections.forEach(sec => {
        sec.chapters.forEach(chap => {
          // Chapter in Course
          items.push({
            id: `chap-${subj.id}-${chap}`,
            category: 'courses',
            categoryLabel: 'Curriculum Chapter',
            title: chap,
            subtitle: `In ${subj.title} (${sec.title || 'Core Syllabus'})`,
            icon: Layers,
            targetTab: 'courses',
            subjectId: subj.id,
            chapterTitle: chap,
            badge: subj.categoryTag
          });

          // Handwritten Notes for this Chapter
          items.push({
            id: `notes-${subj.id}-${chap}`,
            category: 'notes',
            categoryLabel: 'Handwritten Notes',
            title: `${chap} — Handwritten Notes & Derivations`,
            subtitle: `Comprehensive formula sheet, model answers, swadhyay & diagrams for ${subj.title}`,
            icon: FileText,
            targetTab: 'courses',
            subjectId: subj.id,
            chapterTitle: chap,
            badge: 'Handwritten Notes'
          });

          // 20-Mark Mock Paper for this Chapter
          items.push({
            id: `mock-${subj.id}-${chap}`,
            category: 'quiz',
            categoryLabel: '20M Chapter Test',
            title: `${chap} — 20 Mark Chapter Mock Test`,
            subtitle: `Evaluated practice paper conforming to ${parsedGrade.board} rubrics`,
            icon: CheckSquare,
            targetTab: 'quiz',
            subjectId: subj.id,
            chapterTitle: chap,
            badge: '20 Marks'
          });

          // Target / Library Solution for this Chapter
          items.push({
            id: `lib-${subj.id}-${chap}`,
            category: 'library',
            categoryLabel: 'Library Digest',
            title: `${chap} — Target Digest & Textbook Solutions`,
            subtitle: `Verified solutions and question bank for ${subj.title}`,
            icon: BookMarked,
            targetTab: 'library',
            subjectId: subj.id,
            chapterTitle: chap,
            badge: 'Target Digest'
          });
        });
      });
    });

    return items;
  }, [subjectCatalog, parsedGrade]);

  // Filtered search results
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return searchableIndex.filter(item => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.chapterTitle && item.chapterTitle.toLowerCase().includes(q))
      );
    }).slice(0, 8); // Top 8 most relevant matches
  }, [query, searchableIndex]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle item selection & redirection
  const handleSelectResult = (item: SearchResultItem) => {
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();

    // 1. Direct redirection to targeted area
    if (item.subjectId && onSelectSubject) {
      onSelectSubject(item.subjectId);
    }
    if (item.subjectId && item.chapterTitle && onSelectChapterNote) {
      onSelectChapterNote(item.subjectId, item.chapterTitle);
    }

    onNavigateToTab(item.targetTab);

    if (triggerToast) {
      triggerToast(`🎯 Redirected to ${item.title}`);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredResults.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        e.preventDefault();
        // Fallback redirection to best match or Doubt AI
        if (filteredResults.length > 0) {
          handleSelectResult(filteredResults[0]);
        } else {
          // Redirect to AI Doubt Circle with search query
          onNavigateToTab('doubt');
          if (triggerToast) triggerToast(`🤖 Searching "${query}" in NestAI Doubt Solver`);
          setIsOpen(false);
          setQuery('');
        }
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectResult(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Quick popular search chips
  const popularKeywords = [
    { label: '📐 Maths 1 & 2', query: 'Mathematics' },
    { label: '🔬 Science 1', query: 'Science & Technology 1' },
    { label: '✍️ Notes', query: 'Handwritten Notes' },
    { label: '📝 Mock Tests', query: 'Mock Test' },
    { label: '💰 Fee Receipt', query: 'Fees' },
    { label: '🔔 Live Classes', query: 'Live Classes' }
  ];

  return (
    <div ref={containerRef} className="relative max-w-md w-full">
      
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input 
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search materials, chapters, mock papers, fees, classes..."
          className="w-full bg-[#FAF9F5] hover:bg-white focus:bg-white border border-stone-200/80 focus:border-amber-600 rounded-full pl-10 pr-9 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-sans text-stone-800 placeholder-stone-400 shadow-2xs"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Results Box */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-stone-850 rounded-2xl shadow-2xl overflow-hidden z-50 animate-scale-up text-left">
          
          {query.trim() === '' ? (
            /* Suggestions when search query is empty */
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                <span>⚡ Instant Redirection Suggestions</span>
                <span>{parsedGrade.stdLabel}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {popularKeywords.map((item, idx) => (
                  <button
                    key={idx}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setQuery(item.query);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 text-stone-700 hover:text-amber-900 rounded-lg text-xs font-serif transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-serif">
                <span>Type any subject, formula, chapter, test or bill keyword</span>
                <span className="font-mono text-[10px]">Enter ↵</span>
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            /* No direct match -> Offer AI Search Redirection */
            <div className="p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-stone-800">
                  Search "{query}" in NestAI Doubt Circle
                </h4>
                <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                  No exact curriculum heading matched, but NestAI can solve and explain this instantly!
                </p>
              </div>

              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onNavigateToTab('doubt');
                  if (triggerToast) triggerToast(`🤖 Asking NestAI about "${query}"`);
                  setIsOpen(false);
                  setQuery('');
                }}
                className="px-4 py-2 bg-stone-900 hover:bg-amber-600 text-amber-200 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Ask Doubt Circle AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Matching Results List */
            <div className="max-h-80 overflow-y-auto divide-y divide-stone-100 bg-white">
              <div className="px-3.5 py-2 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-500">
                <span>Found {filteredResults.length} matches across all sections</span>
                <span>Use ↑ ↓ keys to navigate • Press ↵ to open</span>
              </div>

              {filteredResults.map((item, idx) => {
                const IconComponent = item.icon || BookOpen;
                const isSelected = idx === selectedIndex;

                return (
                  <div
                    key={item.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected ? 'bg-amber-50/80 border-l-4 border-amber-600 pl-2' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 pr-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-900'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50/80 px-1.5 py-0.2 rounded border border-amber-200/50">
                            {item.categoryLabel}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono text-stone-400">
                              • {item.badge}
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                          {item.title}
                        </h4>

                        <p className="text-[10px] text-stone-500 font-sans line-clamp-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Jump</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer bar */}
          <div className="p-2.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-400 px-3">
            <span>Study Nest Unified Search Engine</span>
            <span>Esc to close</span>
          </div>

        </div>
      )}

    </div>
  );
};
