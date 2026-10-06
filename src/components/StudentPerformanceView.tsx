import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, TrendingUp, CheckSquare, Award, BookOpen, Star, FileText, 
  CheckCircle2, Clock, Eye, Download, Search, Filter, Sparkles, AlertCircle,
  BarChart3, ChevronRight, ArrowUpRight, GraduationCap, X, Calendar, UserCheck
} from 'lucide-react';
import { 
  TeacherAnswerSubmission, 
  INITIAL_TEACHER_SUBMISSIONS 
} from '../data/vivaAndTestSessionsData';
import { ALL_CHAPTER_MOCK_PAPERS_20M } from '../data/chapterMockPapersData';
import { 
  getSubjectCatalogForUser, 
  getTeacherSubmissionsForUser, 
  parseStudentGrade 
} from '../data/gradeCurriculumAdapter';

interface StudentPerformanceViewProps {
  userProfile?: any;
  quizScore: number;
  totalQuizAttempts: number;
  checkedChapters: Record<string, boolean>;
  onNavigateToQuiz: (subjectId?: string) => void;
  onNavigateToCourses: (subjectId?: string, chapterTitle?: string) => void;
  triggerToast: (msg: string) => void;
  onResetOrientation?: () => void;
}

export const StudentPerformanceView: React.FC<StudentPerformanceViewProps> = ({
  userProfile,
  quizScore,
  totalQuizAttempts,
  checkedChapters,
  onNavigateToQuiz,
  onNavigateToCourses,
  triggerToast,
  onResetOrientation
}) => {
  const std = userProfile?.studentMeta?.std;
  const board = userProfile?.studentMeta?.board;
  const studying = userProfile?.studentMeta?.studying;

  const parsedGrade = useMemo(() => parseStudentGrade(std, board, studying), [std, board, studying]);
  const subjectCatalog = useMemo(() => getSubjectCatalogForUser(std, board, studying), [std, board, studying]);

  // Submissions state synced with localStorage
  const [submissions, setSubmissions] = useState<TeacherAnswerSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('study_nest_teacher_submissions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    if (parsedGrade.stdNumber === 10) return INITIAL_TEACHER_SUBMISSIONS;
    return getTeacherSubmissionsForUser(std, board, studying);
  });

  // Active view modal for checked paper
  const [activeCheckedPaperModal, setActiveCheckedPaperModal] = useState<TeacherAnswerSubmission | null>(null);

  // Filter tabs: 'overview' | 'checked_papers' | 'subject_marks' | 'chapter_breakdown'
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'checked_papers' | 'subject_marks' | 'chapter_breakdown'>('overview');

  // Filter by subject
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync with localStorage whenever submissions change or when tab opens
  useEffect(() => {
    try {
      const saved = localStorage.getItem('study_nest_teacher_submissions');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Filtered evaluated checked papers
  const checkedPapers = useMemo(() => {
    return submissions.filter(sub => sub.status === 'evaluated');
  }, [submissions]);

  // Subject options
  const subjectList = useMemo(() => {
    return [
      { id: 'all', title: 'All Subjects', icon: '🌟' },
      ...subjectCatalog.map(s => ({
        id: s.id,
        title: s.title,
        icon: s.subject.includes('Math') ? '📐' : s.subject.includes('Sci') ? '🔬' : s.subject.includes('Lang') ? '📖' : '🏛️'
      }))
    ];
  }, [subjectCatalog]);

  // Icon map for subjects
  const subjectIconMap: Record<string, string> = {
    sci1: '🔬',
    sci2: '🧬',
    math1: '🧮',
    math2: '📐',
    hist: '🏛️',
    geo: '🌍',
    eng: '📖',
    mar: '📚',
    hin: '📝',
    sanskrit: '🕉️'
  };

  // Calculate statistics across all subjects
  const overallStats = useMemo(() => {
    const totalChecked = checkedPapers.length;
    const totalMarksScored = checkedPapers.reduce((acc, p) => acc + (p.evaluation?.marksAwarded || 0), 0);
    const totalPossibleMarks = checkedPapers.reduce((acc, p) => acc + (p.evaluation?.totalMarks || 20), 0);
    const averagePercentage = totalPossibleMarks > 0 ? (totalMarksScored / totalPossibleMarks) * 100 : 0;

    // Completed syllabus chapters count
    const completedChaptersCount = Object.values(checkedChapters).filter(Boolean).length;
    
    // Quiz success rate
    const quizSuccessRate = totalQuizAttempts > 0 ? Math.round((quizScore / totalQuizAttempts) * 100) : 0;

    return {
      totalChecked,
      totalMarksScored: Number(totalMarksScored.toFixed(1)),
      totalPossibleMarks,
      averagePercentage: Number(averagePercentage.toFixed(1)),
      completedChaptersCount,
      quizSuccessRate
    };
  }, [checkedPapers, checkedChapters, quizScore, totalQuizAttempts]);

  // Subject-wise performance aggregation
  const subjectPerformanceMap = useMemo(() => {
    const map: Record<string, {
      subjectId: string;
      subjectTitle: string;
      papersEvaluated: number;
      totalScored: number;
      totalMax: number;
      avgPercentage: number;
      bestScore: number;
      recentPaper?: TeacherAnswerSubmission;
      checkedChaptersInSubject: number;
      totalChaptersInSubject: number;
    }> = {};

    subjectCatalog.forEach((sub: any) => {
      // Find total chapters from catalog
      const subChapters = (sub as any).sections ? (sub as any).sections.flatMap((s: any) => s.chapters) : (sub as any).chapters || (sub as any).allChapters || [];
      const totalChaps = subChapters.length || 10;
      
      // Count completed chapters
      let checkedCount = 0;
      subChapters.forEach((ch: string) => {
        if (checkedChapters[`${sub.id}-${ch}`]) {
          checkedCount++;
        }
      });

      // Filter evaluated papers for this subject
      const subPapers = checkedPapers.filter(p => p.subjectId === sub.id);
      const papersEvaluated = subPapers.length;
      const totalScored = subPapers.reduce((acc, p) => acc + (p.evaluation?.marksAwarded || 0), 0);
      const totalMax = subPapers.reduce((acc, p) => acc + (p.evaluation?.totalMarks || 20), 0);
      const avgPercentage = totalMax > 0 ? (totalScored / totalMax) * 100 : 0;
      const bestScore = subPapers.reduce((max, p) => Math.max(max, p.evaluation?.marksAwarded || 0), 0);
      const recentPaper = subPapers[0];

      map[sub.id] = {
        subjectId: sub.id,
        subjectTitle: sub.title,
        papersEvaluated,
        totalScored: Number(totalScored.toFixed(1)),
        totalMax,
        avgPercentage: Number(avgPercentage.toFixed(1)),
        bestScore,
        recentPaper,
        checkedChaptersInSubject: checkedCount,
        totalChaptersInSubject: totalChaps
      };
    });

    return map;
  }, [checkedPapers, checkedChapters]);

  // Filtered checked papers list based on subject filter and search query
  const displayedCheckedPapers = useMemo(() => {
    return checkedPapers.filter(paper => {
      const matchesSubject = selectedSubjectFilter === 'all' || paper.subjectId === selectedSubjectFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        paper.chapterTitle.toLowerCase().includes(query) ||
        paper.setName.toLowerCase().includes(query) ||
        (paper.evaluation?.teacherName && paper.evaluation.teacherName.toLowerCase().includes(query)) ||
        (paper.evaluation?.overallRemark && paper.evaluation.overallRemark.toLowerCase().includes(query));

      return matchesSubject && matchesSearch;
    });
  }, [checkedPapers, selectedSubjectFilter, searchQuery]);

  // Chapter-wise marks and test coverage table data
  const chapterWiseCoverage = useMemo(() => {
    // Map chapters from ALL_CHAPTER_MOCK_PAPERS_20M
    const map = new Map<string, {
      subjectId: string;
      subjectTitle: string;
      chapterNumber: number;
      chapterTitle: string;
      evaluatedSubmission?: TeacherAnswerSubmission;
      isStudyDone: boolean;
    }>();

    ALL_CHAPTER_MOCK_PAPERS_20M.forEach(paper => {
      const key = `${paper.subjectId}-${paper.chapterNumber}`;
      if (!map.has(key)) {
        // Find if any evaluated submission exists for this chapter
        const sub = checkedPapers.find(p => p.subjectId === paper.subjectId && (p.chapterTitle === paper.chapterTitle || p.paperId.includes(`ch${paper.chapterNumber}`)));
        const isDone = !!checkedChapters[`${paper.subjectId}-${paper.chapterTitle}`];

        map.set(key, {
          subjectId: paper.subjectId,
          subjectTitle: paper.subjectTitle,
          chapterNumber: paper.chapterNumber,
          chapterTitle: paper.chapterTitle,
          evaluatedSubmission: sub,
          isStudyDone: isDone
        });
      }
    });

    let list = Array.from(map.values());
    if (selectedSubjectFilter !== 'all') {
      list = list.filter(item => item.subjectId === selectedSubjectFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(item => item.chapterTitle.toLowerCase().includes(q) || item.subjectTitle.toLowerCase().includes(q));
    }

    return list;
  }, [checkedPapers, checkedChapters, selectedSubjectFilter, searchQuery]);

  // Helper for performance rating badge
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    if (percentage >= 75) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (percentage >= 60) return 'bg-blue-100 text-blue-900 border-blue-300';
    return 'bg-stone-100 text-stone-800 border-stone-300';
  };

  return (
    <div className="text-left space-y-7 animate-fade-in pb-12 font-sans">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-700 font-serif font-bold">
              Student Academic Analytics & Assessment Report
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-amber-100 text-amber-900 border border-amber-300 font-bold">
              Maharashtra SSC Board Std 10
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-1">
            Progress Report & Checked Answer Papers
          </h2>
          <p className="text-xs text-stone-600 font-sans mt-0.5 max-w-2xl leading-relaxed">
            Examine verified teacher valuations, chapter-wise marks, performance metrics, and red-pen examiner notes for all submitted test papers.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateToQuiz()}
            className="px-4 py-2.5 bg-[#1C1917] hover:bg-stone-850 text-amber-200 hover:text-white rounded-xl text-xs font-serif font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <CheckSquare className="w-4 h-4 text-amber-400" />
            <span>Take New Mock Test</span>
          </button>
        </div>
      </div>

      {/* 2. Key Summary KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* KPI 1: Evaluated Papers */}
        <div className="bg-white border-2 border-stone-850 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Evaluated Papers
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Award className="w-4 h-4 text-amber-800" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
              {overallStats.totalChecked}
            </div>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              Verified by State Board Moderators
            </span>
          </div>
        </div>

        {/* KPI 2: Overall Score & Average % */}
        <div className="bg-white border-2 border-stone-850 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Average Marks %
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4 text-emerald-800" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-emerald-700">
              {overallStats.averagePercentage}%
            </div>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              {overallStats.totalMarksScored} / {overallStats.totalPossibleMarks} Total Marks Scored
            </span>
          </div>
        </div>

        {/* KPI 3: Practice Quiz Success */}
        <div className="bg-white border-2 border-stone-850 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Quiz Accuracy
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <CheckSquare className="w-4 h-4 text-blue-800" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
              {overallStats.quizSuccessRate}%
            </div>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              {quizScore} correct out of {totalQuizAttempts} questions
            </span>
          </div>
        </div>

        {/* KPI 4: Syllabus Mastered */}
        <div className="bg-white border-2 border-stone-850 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Chapters Mastered
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4 text-amber-800" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
              {overallStats.completedChaptersCount} <span className="text-xs font-normal text-stone-500">/ 90</span>
            </div>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              Checked across 10 Subjects
            </span>
          </div>
        </div>

      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'overview'
              ? 'bg-[#1C1917] text-amber-300 shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Academic Overview</span>
        </button>

        <button
          onClick={() => setActiveSubTab('checked_papers')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'checked_papers'
              ? 'bg-[#1C1917] text-amber-300 shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Checked Answer Papers ({checkedPapers.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('subject_marks')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'subject_marks'
              ? 'bg-[#1C1917] text-amber-300 shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Subject Marks Card</span>
        </button>

        <button
          onClick={() => setActiveSubTab('chapter_breakdown')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'chapter_breakdown'
              ? 'bg-[#1C1917] text-amber-300 shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chapter-by-Chapter Marks</span>
        </button>
      </div>

      {/* 4. Filter Toolbar for Search and Subject Selection */}
      {(activeSubTab === 'checked_papers' || activeSubTab === 'chapter_breakdown' || activeSubTab === 'subject_marks') && (
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
          
          {/* Subject Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[10px] font-mono uppercase text-stone-500 mr-1 shrink-0 font-bold">
              Subject:
            </span>
            {subjectList.map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectFilter(sub.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-serif transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  selectedSubjectFilter === sub.id
                    ? 'bg-amber-800 text-white font-bold shadow-2xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.title}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative shrink-0 w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapter or examiner..."
              className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-600 shadow-2xs"
            />
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: ACADEMIC OVERVIEW (Executive Progress Report)                       */}
      {/* ========================================================================= */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Progress Card with Performance Grade */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-950 text-white rounded-3xl p-6 md:p-8 shadow-md border-2 border-stone-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                    Official Student Board Report Card
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {userProfile?.fullName || 'Shivtej Pol'} — SSC Class 10th
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Syllabus calibrated to <strong>Maharashtra State Board (Balbharati)</strong>. You have taken unit mock assessments across sciences, mathematics, humanities, and languages with an aggregate score of <strong>{overallStats.averagePercentage}% (Distinction Grade A+)</strong>.
                </p>
              </div>

              {/* Distinction Badge */}
              <div className="bg-white/10 border border-white/20 p-5 rounded-2xl text-center shrink-0 min-w-[200px] backdrop-blur-xs">
                <span className="text-[10px] font-mono uppercase text-amber-300 tracking-wider block font-bold">
                  Board Performance Status
                </span>
                <div className="text-2xl sm:text-3xl font-serif font-extrabold text-white my-1">
                  Grade A+
                </div>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold block">
                  Top 5% State Merit Benchmark
                </span>
              </div>

            </div>

            {/* Quick stats footer inside dark banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Total Unit Tests Checked</span>
                <strong className="text-amber-200 text-sm font-serif">{checkedPapers.length} Papers Evaluated</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Total Marks Awarded</span>
                <strong className="text-amber-200 text-sm font-serif">{overallStats.totalMarksScored} / {overallStats.totalPossibleMarks}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Objective Quiz Retention</span>
                <strong className="text-amber-200 text-sm font-serif">{overallStats.quizSuccessRate}% Accuracy</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Examiner Signatures</span>
                <strong className="text-amber-200 text-sm font-serif">10 Verified Evaluators</strong>
              </div>
            </div>
          </div>

          {/* Subject Performance Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Subject-wise Assessment & Mastery Summary
              </h3>
              <button
                onClick={() => setActiveSubTab('subject_marks')}
                className="text-xs font-serif font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Marks Card</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectCatalog.map((sub: any) => {
                const perf = subjectPerformanceMap[sub.id];
                if (!perf) return null;

                return (
                  <div 
                    key={sub.id}
                    className="bg-white border-2 border-stone-200 hover:border-stone-850 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-base">{subjectIconMap[sub.id] || '📚'}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getGradeColor(perf.avgPercentage)}`}>
                          {perf.papersEvaluated > 0 ? `${perf.avgPercentage}% Score` : 'Mock Pending'}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-stone-900 mt-2">
                        {sub.title}
                      </h4>

                      <div className="mt-2 space-y-1.5 text-xs text-stone-600">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-stone-500">Checked Papers:</span>
                          <span className="font-mono font-bold text-stone-900">
                            {perf.papersEvaluated > 0 ? `${perf.papersEvaluated} unit paper(s)` : '0 papers'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-stone-500">Highest Score:</span>
                          <span className="font-mono font-bold text-emerald-700">
                            {perf.papersEvaluated > 0 ? `${perf.bestScore} / 20` : '—'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-stone-500">Syllabus Mastered:</span>
                          <span className="font-mono text-stone-800">
                            {perf.checkedChaptersInSubject} / {perf.totalChaptersInSubject} chapters
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      {perf.recentPaper ? (
                        <button
                          onClick={() => setActiveCheckedPaperModal(perf.recentPaper!)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-serif font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-700" />
                          <span>View Checked Paper</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigateToQuiz(sub.id)}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-serif font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <CheckSquare className="w-3.5 h-3.5 text-stone-600" />
                          <span>Take 20M Test</span>
                        </button>
                      )}

                      <button
                        onClick={() => onNavigateToCourses(sub.id)}
                        className="text-xs font-serif font-bold text-stone-500 hover:text-stone-900 cursor-pointer flex items-center gap-0.5"
                      >
                        <span>Curriculum</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orientation Profile Codex */}
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                Academic Orientation Profile
              </span>
              <h4 className="font-serif font-bold text-base text-stone-900">
                Syllabus Calibrated for Standard: {userProfile?.studentMeta?.std || '10th SSC State Board'}
              </h4>
              <p className="text-xs text-stone-600 font-sans">
                Student Board: <strong>{userProfile?.studentMeta?.board || 'Maharashtra State Board'}</strong> • Age: <strong>{userProfile?.studentMeta?.age || '15'} Years</strong> • Focus Area: <strong>{userProfile?.studentMeta?.studying || 'Board Exam Distinction 95%+ Target'}</strong>
              </p>
            </div>

            {onResetOrientation && (
              <button
                onClick={onResetOrientation}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-850 text-amber-100 rounded-xl text-xs font-serif font-bold transition-all shrink-0 cursor-pointer shadow-xs"
              >
                Reset Orientation Codex
              </button>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CHECKED ANSWER PAPERS (Teacher Valued Sheets)                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'checked_papers' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Evaluated Handwritten Answer Sheets ({displayedCheckedPapers.length})
            </h3>
            <span className="text-xs font-mono text-stone-500">
              Click any paper to inspect red pen step corrections and remarks
            </span>
          </div>

          {displayedCheckedPapers.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-stone-300 rounded-3xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-amber-700" />
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900">
                No Evaluated Papers Found for Selected Filter
              </h4>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                No answer papers match your search. Choose a different subject filter or take a new mock test to submit your handwritten answer sheets for teacher evaluation.
              </p>
              <button
                onClick={() => setSelectedSubjectFilter('all')}
                className="px-4 py-2 bg-stone-900 text-amber-200 rounded-xl text-xs font-serif font-bold cursor-pointer"
              >
                Clear Subject Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedCheckedPapers.map((paper) => {
                const evalInfo = paper.evaluation;
                if (!evalInfo) return null;

                return (
                  <div
                    key={paper.id}
                    onClick={() => setActiveCheckedPaperModal(paper)}
                    className="bg-white border-2 border-stone-200 hover:border-amber-600 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-mono text-[10px] font-bold border border-amber-200">
                            {paper.setName}
                          </span>
                          <span className="text-[11px] font-mono text-stone-500">
                            {paper.submittedAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-mono text-xs font-bold border border-emerald-300">
                            {evalInfo.marksAwarded} / {evalInfo.totalMarks} ({evalInfo.percentage}%)
                          </span>
                        </div>
                      </div>

                      {/* Chapter Title */}
                      <div className="mt-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                          Chapter Mock Examination
                        </span>
                        <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-700 transition-colors">
                          {paper.chapterTitle}
                        </h4>
                      </div>

                      {/* Examiner Signature Note */}
                      <div className="bg-stone-50 rounded-2xl p-3.5 mt-3 space-y-1.5 border border-stone-200/70">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                          <span className="text-xs font-serif font-bold text-stone-900">
                            {evalInfo.teacherName}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500">
                            • {evalInfo.teacherRole}
                          </span>
                        </div>
                        <p className="text-[11px] font-serif text-stone-700 italic line-clamp-2 leading-relaxed">
                          "{evalInfo.overallRemark}"
                        </p>
                      </div>

                      {/* Question-wise summary preview */}
                      <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1">
                        {evalInfo.questionWiseMarks.map((q, idx) => (
                          <div key={idx} className="bg-white border border-stone-200 px-2 py-1 rounded-lg text-center shrink-0">
                            <span className="text-[9px] font-mono text-stone-400 block">{q.qNumber}</span>
                            <span className="text-[11px] font-mono font-bold text-stone-900">{q.awarded}/{q.max}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-serif">
                      <span className="font-bold text-amber-800 flex items-center gap-1 group-hover:underline">
                        <span>Open Complete Valued Sheet</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerToast(`Downloaded Checked Sheet PDF for ${paper.chapterTitle}!`);
                        }}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[10px] font-mono transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SUBJECT MARKS CARD (Consolidated Scoreboard)                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'subject_marks' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Consolidated Subject Marks Table
            </h3>
            <button
              onClick={() => triggerToast('Printed Official Subject Marks Card!')}
              className="px-3.5 py-1.5 bg-[#1C1917] text-amber-200 rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-stone-850"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Full Marks Card</span>
            </button>
          </div>

          <div className="bg-white border-2 border-stone-850 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#1C1917] text-amber-200 font-serif text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Subject</th>
                    <th className="py-3.5 px-3 text-center">Unit Tests Evaluated</th>
                    <th className="py-3.5 px-3 text-center">Marks Scored</th>
                    <th className="py-3.5 px-3 text-center">Max Marks</th>
                    <th className="py-3.5 px-3 text-center">Percentage</th>
                    <th className="py-3.5 px-3 text-center">Grade</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {subjectCatalog.filter((sub: any) => selectedSubjectFilter === 'all' || sub.id === selectedSubjectFilter).map((sub: any) => {
                    const perf = subjectPerformanceMap[sub.id];
                    const hasEvaluated = perf && perf.papersEvaluated > 0;

                    return (
                      <tr key={sub.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{subjectIconMap[sub.id] || '📚'}</span>
                            <div>
                              <strong className="font-serif font-bold text-stone-900 block text-xs">
                                {sub.title}
                              </strong>
                              <span className="text-[10px] text-stone-500 font-mono">
                                {parsedGrade.stdLabel} Curriculum
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-center font-mono font-semibold text-stone-800">
                          {hasEvaluated ? `${perf.papersEvaluated} Paper(s)` : <span className="text-stone-400">None</span>}
                        </td>

                        <td className="py-3.5 px-3 text-center font-mono font-bold text-stone-900">
                          {hasEvaluated ? perf.totalScored : <span className="text-stone-400">—</span>}
                        </td>

                        <td className="py-3.5 px-3 text-center font-mono text-stone-600">
                          {hasEvaluated ? perf.totalMax : <span className="text-stone-400">—</span>}
                        </td>

                        <td className="py-3.5 px-3 text-center font-mono font-extrabold text-stone-900">
                          {hasEvaluated ? (
                            <span className={perf.avgPercentage >= 90 ? 'text-emerald-700' : 'text-amber-700'}>
                              {perf.avgPercentage}%
                            </span>
                          ) : (
                            <span className="text-stone-400">—</span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 text-center font-mono">
                          {hasEvaluated ? (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getGradeColor(perf.avgPercentage)}`}>
                              {perf.avgPercentage >= 90 ? 'A+ (Distinction)' : perf.avgPercentage >= 75 ? 'A (First Class)' : 'Pass'}
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-400 font-mono">Pending</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {hasEvaluated && perf.recentPaper ? (
                              <button
                                onClick={() => setActiveCheckedPaperModal(perf.recentPaper!)}
                                className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[10px] font-serif font-bold transition-colors cursor-pointer"
                              >
                                View Paper
                              </button>
                            ) : null}

                            <button
                              onClick={() => onNavigateToQuiz(sub.id)}
                              className="px-2.5 py-1 bg-stone-900 hover:bg-stone-850 text-amber-200 rounded-lg text-[10px] font-serif font-bold transition-colors cursor-pointer"
                            >
                              Take Test
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer with Totals */}
            <div className="bg-stone-100 px-5 py-3 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs font-mono font-bold text-stone-800">
              <span>Grand Total across Checked Subjects:</span>
              <div className="flex items-center gap-4">
                <span>Total Marks: {overallStats.totalMarksScored} / {overallStats.totalPossibleMarks}</span>
                <span>•</span>
                <span className="text-emerald-700 font-extrabold">Aggregated: {overallStats.averagePercentage}%</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CHAPTER-BY-CHAPTER MARKS (Detailed Granular Breakdown)             */}
      {/* ========================================================================= */}
      {activeSubTab === 'chapter_breakdown' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Chapter-Wise Mock Examination Marks & Learning Status
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Detailed chapter score tracking across all Maharashtra SSC Board chapters with 20-mark mock papers.
              </p>
            </div>
            <span className="text-xs font-mono text-stone-500">
              Showing {chapterWiseCoverage.length} chapters
            </span>
          </div>

          <div className="bg-white border-2 border-stone-850 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#1C1917] text-amber-200 font-serif text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 font-bold">Chapter Name</th>
                    <th className="py-3 px-3">Subject</th>
                    <th className="py-3 px-3 text-center">Study Notes</th>
                    <th className="py-3 px-3 text-center">Checked Mock Paper</th>
                    <th className="py-3 px-3 text-center">Marks Awarded</th>
                    <th className="py-3 px-3 text-center">Teacher Evaluation</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {chapterWiseCoverage.map((item, idx) => {
                    const sub = item.evaluatedSubmission;
                    const marks = sub?.evaluation?.marksAwarded;
                    const total = sub?.evaluation?.totalMarks || 20;

                    return (
                      <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3 px-4">
                          <strong className="font-serif text-stone-900 block text-xs">
                            {item.chapterNumber}. {item.chapterTitle}
                          </strong>
                        </td>

                        <td className="py-3 px-3 text-stone-600 font-serif text-[11px]">
                          {item.subjectTitle}
                        </td>

                        <td className="py-3 px-3 text-center">
                          {item.isStudyDone ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Mastered</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-stone-400">
                              To Learn
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-center font-mono">
                          {sub ? (
                            <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px]">
                              {sub.setName} Checked
                            </span>
                          ) : (
                            <span className="text-stone-400 text-[10px]">Not Uploaded</span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-center font-mono font-bold">
                          {marks !== undefined ? (
                            <span className="text-emerald-700 font-extrabold text-sm">
                              {marks} / {total}
                            </span>
                          ) : (
                            <span className="text-stone-400">—</span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-center font-mono text-[11px]">
                          {sub?.evaluation ? (
                            <span className="text-stone-700">
                              {sub.evaluation.teacherName} ({sub.evaluation.grade})
                            </span>
                          ) : (
                            <span className="text-stone-400">—</span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {sub ? (
                              <button
                                onClick={() => setActiveCheckedPaperModal(sub)}
                                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[10px] font-serif font-bold transition-colors cursor-pointer"
                              >
                                View Paper
                              </button>
                            ) : null}

                            <button
                              onClick={() => onNavigateToCourses(item.subjectId, item.chapterTitle)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[10px] font-serif transition-colors cursor-pointer"
                            >
                              Notes
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* DEDICATED FULL CHECKED PAPER EVALUATION MODAL (Pop-up with Red Pen Notes) */}
      {/* ========================================================================= */}
      {activeCheckedPaperModal && activeCheckedPaperModal.evaluation && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
          <div className="bg-white border-2 border-stone-850 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col justify-between my-auto">
            
            {/* Modal Header */}
            <div className="bg-[#1C1917] text-white px-5 py-4 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-amber-400" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                    Maharashtra SSC Board Certified Valuation Report
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg">
                    {activeCheckedPaperModal.chapterTitle} — {activeCheckedPaperModal.setName} (Checked Paper)
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveCheckedPaperModal(null)}
                className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-xs font-sans">
              
              {/* Scorecard Hero Banner */}
              <div className="bg-gradient-to-r from-amber-50 via-stone-50 to-amber-100/40 border-2 border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900 font-bold block">
                    Total Marks Awarded by Moderator:
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-serif font-extrabold text-stone-900">
                      {activeCheckedPaperModal.evaluation.marksAwarded}
                    </span>
                    <span className="text-sm font-mono text-stone-500 font-bold">
                      / {activeCheckedPaperModal.evaluation.totalMarks} Marks
                    </span>
                    <span className="ml-2 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {activeCheckedPaperModal.evaluation.grade}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-600 block mt-1">
                    Percentage: <strong>{activeCheckedPaperModal.evaluation.percentage}%</strong> • Evaluated on: <strong>{activeCheckedPaperModal.evaluation.signedAt}</strong>
                  </span>
                </div>

                {/* Examiner Signature Seal */}
                <div className="bg-white border-2 border-dashed border-amber-400 p-3.5 rounded-2xl text-center shadow-2xs self-start sm:self-center">
                  <span className="text-[9px] font-mono uppercase text-amber-800 font-bold block">
                    VERIFIED STATE BOARD MODERATOR
                  </span>
                  <div className="font-['Kalam',cursive] text-lg font-bold text-amber-950 my-0.5">
                    {activeCheckedPaperModal.evaluation.teacherName}
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 block">
                    {activeCheckedPaperModal.evaluation.teacherRole}
                  </span>
                </div>
              </div>

              {/* Teacher's Overall Observation */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Teacher's Detailed Assessment Remarks:</span>
                </h4>
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-800 leading-relaxed font-serif text-sm">
                  "{activeCheckedPaperModal.evaluation.overallRemark}"
                </div>
              </div>

              {/* Step-Marking & Question-wise Corrections */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider">
                  Step-Marking & Question-wise Corrections:
                </h4>

                <div className="space-y-2.5">
                  {activeCheckedPaperModal.evaluation.questionWiseMarks.map((q, idx) => (
                    <div key={idx} className="border border-stone-200 rounded-2xl p-4 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="font-serif text-stone-900 text-sm">
                          {q.qNumber} Step Valuation
                        </strong>
                        <span className="px-2.5 py-0.5 rounded-md font-mono font-bold bg-stone-100 text-stone-900">
                          {q.awarded} / {q.max} Marks
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed">
                        <strong className="text-red-700 font-bold">Examiner Red Pen Note:</strong> {q.remark}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Presentation Advice */}
              <div className="bg-amber-50/80 border-l-4 border-amber-600 p-4 rounded-r-2xl space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold block">
                  💡 Examiner Handwriting & Board Presentation Tip:
                </span>
                <p className="text-xs font-serif italic text-stone-800 leading-relaxed">
                  "{activeCheckedPaperModal.evaluation.handwritingPresentationAdvice}"
                </p>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-stone-50 px-6 py-3.5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-10">
              <span className="text-xs text-stone-600 font-mono">
                Original Submitted Answer PDF: {activeCheckedPaperModal.pdfFileName}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerToast(`Downloaded Teacher Marked Sheet PDF for ${activeCheckedPaperModal.chapterTitle}!`)}
                  className="px-4 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-200 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Teacher Evaluated PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
