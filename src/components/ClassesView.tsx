import React, { useState, useMemo } from 'react';
import { 
  LiveClassItem, 
  RecordedLectureItem 
} from '../data/classesData';
import { 
  getSubjectCatalogForUser, 
  getLiveClassesForUser, 
  getRecordedClassesForUser,
  parseStudentGrade
} from '../data/gradeCurriculumAdapter';
import { 
  Video, 
  Play, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Bell, 
  Radio, 
  X, 
  Maximize2, 
  Volume2, 
  Send, 
  Layers, 
  ArrowRight,
  Filter,
  Flame,
  Bookmark
} from 'lucide-react';

interface ClassesViewProps {
  userProfile?: any;
  onSelectChapterNote?: (subjectId: string, chapterTitle: string) => void;
  triggerToast: (msg: string) => void;
}

export const ClassesView: React.FC<ClassesViewProps> = ({ userProfile, onSelectChapterNote, triggerToast }) => {
  const std = userProfile?.studentMeta?.std;
  const board = userProfile?.studentMeta?.board;
  const studying = userProfile?.studentMeta?.studying;

  const parsedGrade = useMemo(() => parseStudentGrade(std, board, studying), [std, board, studying]);
  const subjectCatalog = useMemo(() => getSubjectCatalogForUser(std, board, studying), [std, board, studying]);
  const liveClassesList = useMemo(() => getLiveClassesForUser(std, board, studying), [std, board, studying]);
  const recordedClassesBySubject = useMemo(() => getRecordedClassesForUser(std, board, studying), [std, board, studying]);

  // Main view tab: 'live' or 'recorded'
  const [activeMainTab, setActiveMainTab] = useState<'live' | 'recorded'>('live');

  // Live classes filters
  const [liveStatusFilter, setLiveStatusFilter] = useState<'all' | 'live_now' | 'scheduled_today' | 'upcoming'>('all');
  const [liveSubjectFilter, setLiveSubjectFilter] = useState<string>('all');
  const [remindersSet, setRemindersSet] = useState<Record<string, boolean>>({});

  // Recorded classes state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => subjectCatalog[0]?.id || 'sci1');
  const [recordedSearchQuery, setRecordedSearchQuery] = useState<string>('');
  const [chapterFilter, setChapterFilter] = useState<string>('all');

  // If selected subject is not in current grade catalog, auto-switch to first subject
  React.useEffect(() => {
    if (subjectCatalog.length > 0 && !subjectCatalog.some(s => s.id === selectedSubjectId)) {
      setSelectedSubjectId(subjectCatalog[0].id);
      setChapterFilter('all');
    }
  }, [subjectCatalog, selectedSubjectId]);

  // Modals state
  const [activeLiveModal, setActiveLiveModal] = useState<LiveClassItem | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<RecordedLectureItem | null>(null);

  // Classroom interactive state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isTeacher?: boolean }>>([
    { sender: 'System', text: 'Connected to Study Nest HD Live Stream. Board audio and digital chalkboard synced.', time: '08:00 AM' },
    { sender: 'Dr. Deshmukh (Host)', text: 'Welcome students! Today we are deriving the 5-mark board numerical formulas. Open your notebooks!', time: '08:02 AM', isTeacher: true },
    { sender: 'Aarav Patil', text: 'Sir, will we get the PDF notes of this live chalkboard derivation after the lecture?', time: '08:14 AM' },
    { sender: 'Dr. Deshmukh (Host)', text: 'Yes Aarav! All chalkboard slides are auto-uploaded to the Recorded tab right after this session.', time: '08:15 AM', isTeacher: true }
  ]);
  const [inputChat, setInputChat] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Toggle Reminder
  const handleToggleReminder = (cls: LiveClassItem) => {
    const isSet = remindersSet[cls.id];
    setRemindersSet(prev => ({ ...prev, [cls.id]: !isSet }));
    if (!isSet) {
      triggerToast(`⏰ Reminder set for ${cls.subjectTitle} (${cls.chapterTitle}) at ${cls.timeSlot}!`);
    } else {
      triggerToast(`Removed reminder for ${cls.chapterTitle}.`);
    }
  };

  // Send chat in live room
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        sender: 'You',
        text: inputChat.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputChat('');
  };

  // Filtered Live classes
  const filteredLiveClasses = liveClassesList.filter(c => {
    if (liveStatusFilter !== 'all' && c.status !== liveStatusFilter) return false;
    if (liveSubjectFilter !== 'all' && c.subjectId !== liveSubjectFilter) return false;
    return true;
  });

  const liveNowCount = liveClassesList.filter(c => c.status === 'live_now').length;
  const scheduledCount = liveClassesList.filter(c => c.status !== 'live_now').length;

  // Filtered Recorded lectures
  const currentSubjectRecordings = recordedClassesBySubject[selectedSubjectId] || [];
  const uniqueChaptersForSelectedSubject = Array.from(new Set(currentSubjectRecordings.map(r => r.chapterTitle)));

  const filteredRecordings = currentSubjectRecordings.filter(rec => {
    if (chapterFilter !== 'all' && rec.chapterTitle !== chapterFilter) return false;
    if (recordedSearchQuery.trim()) {
      const q = recordedSearchQuery.toLowerCase();
      const matchTitle = rec.lectureTitle.toLowerCase().includes(q);
      const matchChapter = rec.chapterTitle.toLowerCase().includes(q);
      const matchEducator = rec.educator.toLowerCase().includes(q);
      return matchTitle || matchChapter || matchEducator;
    }
    return true;
  });

  const currentSubjectInfo = subjectCatalog.find(s => s.id === selectedSubjectId) || subjectCatalog[0] || { id: 'math', title: 'Mathematics', subtitle: 'Academic Mathematics' };

  return (
    <div className="text-left space-y-6 animate-fade-in">
      
      {/* Top Main Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-amber-700 font-serif font-bold">
            Virtual Classroom & Digital Lecture Hall
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-1">
            Classes & Video Lectures
          </h2>
          <p className="text-xs md:text-sm text-stone-600 font-sans mt-1">
            Join ongoing live classes, view arranged schedules, or watch high-definition recorded chapter videos.
          </p>
        </div>

        {/* Live Indicator Chip */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-100 text-red-900 border border-red-300">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>{liveNowCount} Live Now</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium bg-stone-100 text-stone-700 border border-stone-300">
            <span>{scheduledCount} Arranged</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          TOP TWO TABS SWITCHER: LIVE CLASSES vs RECORDED CLASSES
          ========================================================================= */}
      <div className="bg-stone-100/90 p-1.5 rounded-2xl border border-stone-300 flex items-center gap-2 max-w-xl">
        <button
          onClick={() => setActiveMainTab('live')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === 'live'
              ? 'bg-[#1C1917] text-amber-200 shadow-md'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Radio className={`w-4 h-4 ${activeMainTab === 'live' ? 'text-red-400 animate-pulse' : 'text-stone-400'}`} />
          <span>🔴 Live Classes</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${activeMainTab === 'live' ? 'bg-red-500/20 text-red-300 border border-red-400/30' : 'bg-stone-200 text-stone-600'}`}>
            {liveNowCount} In Session
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('recorded')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === 'recorded'
              ? 'bg-[#1C1917] text-amber-200 shadow-md'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Video className={`w-4 h-4 ${activeMainTab === 'recorded' ? 'text-amber-400' : 'text-stone-400'}`} />
          <span>📼 Recorded Classes</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${activeMainTab === 'recorded' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-stone-200 text-stone-600'}`}>
            All Subjects
          </span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: LIVE CLASSES (GOING ON + ARRANGED/SCHEDULED)
          ========================================================================= */}
      {activeMainTab === 'live' && (
        <div className="space-y-6">
          
          {/* Filter Sub-bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {[
                { id: 'all', label: 'All Sessions' },
                { id: 'live_now', label: `🔴 Going On Now (${liveNowCount})` },
                { id: 'scheduled_today', label: '⏰ Arranged Today' },
                { id: 'upcoming', label: '📅 This Week' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setLiveStatusFilter(st.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    liveStatusFilter === st.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Subject Dropdown Filter */}
            <div className="flex items-center gap-2 text-xs self-end sm:self-center">
              <span className="text-stone-500 font-mono hidden sm:inline">Subject:</span>
              <select
                value={liveSubjectFilter}
                onChange={(e) => setLiveSubjectFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-stone-800 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="all">All Subjects ({subjectCatalog.length})</option>
                {subjectCatalog.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 1.1 "GOING ON (IN SESSION / LIVE NOW)" CARDS */}
          {liveStatusFilter !== 'scheduled_today' && liveStatusFilter !== 'upcoming' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-red-900">
                  🔴 Ongoing Live Classes (In Session Right Now)
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {liveClassesList.filter((c: LiveClassItem) => c.status === 'live_now').map((liveCls: LiveClassItem) => (
                  <div 
                    key={liveCls.id}
                    className="bg-gradient-to-br from-[#1C1917] via-stone-900 to-amber-950 text-white rounded-3xl p-6 shadow-md border border-amber-600/30 flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600 text-white flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>LIVE NOW</span>
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/10 text-amber-200 border border-white/10">
                            {liveCls.subjectTitle}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-stone-300 font-mono">
                          <Users className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{liveCls.attendeesCount} Students</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                          Chapter: {liveCls.chapterTitle}
                        </span>
                        <h4 className="text-base md:text-lg font-serif font-bold text-white leading-snug mt-0.5">
                          {liveCls.topicTitle}
                        </h4>
                        <p className="text-xs text-stone-300 font-sans mt-1">
                          Educator: <strong className="text-amber-200">{liveCls.educator}</strong> • {liveCls.educatorRole}
                        </p>
                      </div>

                      {/* Agenda Highlights */}
                      <div className="bg-black/30 border border-white/10 rounded-2xl p-3.5 space-y-1.5 text-xs text-stone-300 font-sans">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block font-semibold">
                          📌 Live Board Topic Focus:
                        </span>
                        <ul className="space-y-1">
                          {liveCls.keyHighlights.map((hl: string, hlIdx: number) => (
                            <li key={hlIdx} className="flex items-start gap-1.5">
                              <span className="text-amber-400">•</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10 relative z-10">
                      <span className="text-xs font-mono text-amber-300/80">
                        {liveCls.timeSlot} ({liveCls.scheduledTime})
                      </span>

                      <button
                        onClick={() => setActiveLiveModal(liveCls)}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-red-900/40 cursor-pointer active:scale-95"
                      >
                        <Radio className="w-3.5 h-3.5 animate-pulse" />
                        <span>Join Live Classroom →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1.2 "ARRANGED / SCHEDULED CLASSES" LIST */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>Arranged Chapter Classes (Upcoming Agenda)</span>
              </h3>
              <span className="text-xs font-mono text-stone-500">
                {filteredLiveClasses.filter(c => c.status !== 'live_now').length} Lectures Scheduled
              </span>
            </div>

            <div className="bg-white border-2 border-stone-850 rounded-3xl p-6 shadow-sm overflow-hidden divide-y divide-stone-100">
              {filteredLiveClasses.filter(c => c.status !== 'live_now').map((cls) => {
                const isReminded = remindersSet[cls.id];
                return (
                  <div key={cls.id} className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#1C1917] text-amber-200">
                          {cls.subjectTitle}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-amber-100 text-amber-900 font-bold border border-amber-300">
                          {cls.dateString}
                        </span>
                        <span className="text-xs font-mono text-stone-500">
                          {cls.timeSlot}
                        </span>
                      </div>

                      <h4 className="font-serif text-base font-bold text-stone-900">
                        {cls.topicTitle}
                      </h4>
                      <p className="text-xs text-amber-900 font-serif">
                        Chapter: <strong className="text-stone-900">{cls.chapterTitle}</strong> • Faculty: {cls.educator}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-600 font-sans pt-1">
                        {cls.keyHighlights.slice(0, 2).map((pt, pIdx) => (
                          <span key={pIdx} className="bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md">
                            • {pt}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-center">
                      <button
                        onClick={() => handleToggleReminder(cls)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                          isReminded 
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold' 
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                        }`}
                        title="Get alerted before lecture starts"
                      >
                        <Bell className={`w-3.5 h-3.5 ${isReminded ? 'text-amber-700 fill-amber-700' : 'text-stone-500'}`} />
                        <span>{isReminded ? 'Reminder Set' : 'Set Reminder'}</span>
                      </button>

                      {onSelectChapterNote && (
                        <button
                          onClick={() => onSelectChapterNote(cls.subjectId, cls.chapterTitle)}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-medium border border-stone-300 flex items-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                          <span>View Notes</span>
                        </button>
                      )}

                      <button
                        onClick={() => setActiveLiveModal(cls)}
                        className="px-4 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-100 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        Enter Room
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: RECORDED CLASSES (SORTED & FILTERED BY PARTICULAR SUBJECT)
          ========================================================================= */}
      {activeMainTab === 'recorded' && (
        <div className="space-y-6">
          
          {/* 2.1 SUBJECT SELECTOR TABS BAR */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold block">
              1. Select a Subject to View All Recorded Video Lectures:
            </span>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {subjectCatalog.map(sub => {
                const count = recordedClassesBySubject[sub.id]?.length || 0;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubjectId(sub.id);
                      setChapterFilter('all');
                    }}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      selectedSubjectId === sub.id
                        ? 'bg-[#1C1917] text-amber-200 shadow-sm border border-stone-800'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
                    }`}
                  >
                    <span>{sub.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${selectedSubjectId === sub.id ? 'bg-amber-400/20 text-amber-300' : 'bg-stone-100 text-stone-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2.2 Search & Chapter Filter for the Selected Subject */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${currentSubjectInfo.title} recorded lectures by chapter or concept...`}
                value={recordedSearchQuery}
                onChange={(e) => setRecordedSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            {/* Chapter filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-mono hidden sm:inline">Chapter:</span>
              <select
                value={chapterFilter}
                onChange={(e) => setChapterFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-stone-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 cursor-pointer max-w-xs"
              >
                <option value="all">All Chapters ({currentSubjectRecordings.length} Videos)</option>
                {uniqueChaptersForSelectedSubject.map((ch, idx) => (
                  <option key={idx} value={ch}>{ch}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 2.3 RECORDED VIDEO LECTURE CARDS GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-stone-900 flex items-center gap-2">
                <span>📹 Recorded Video Library for</span>
                <span className="text-amber-800 font-semibold">{currentSubjectInfo.title}</span>
              </h3>
              <span className="text-xs font-mono text-stone-500">
                {filteredRecordings.length} Recorded Lectures Available
              </span>
            </div>

            {filteredRecordings.length === 0 ? (
              <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-3xl p-10 text-center space-y-2">
                <Video className="w-8 h-8 text-stone-400 mx-auto" />
                <h4 className="font-serif font-bold text-stone-700">No recorded lectures found matching your search.</h4>
                <p className="text-xs text-stone-500">Try changing the chapter dropdown or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRecordings.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-white border-2 border-stone-850 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    {/* Video Visual Slate / Thumbnail */}
                    <div 
                      onClick={() => setActiveVideoModal(rec)}
                      className={`h-40 bg-gradient-to-br ${rec.thumbnailTheme} p-4 relative cursor-pointer flex flex-col justify-between overflow-hidden select-none`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/20 text-white backdrop-blur-xs">
                          Lecture #{rec.lectureNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-stone-950">
                          {rec.duration}
                        </span>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-12 h-12 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>

                      <div className="relative z-10">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200/90 font-semibold block truncate">
                          {rec.chapterTitle}
                        </span>
                        <span className="text-[10px] font-mono text-stone-300">
                          {rec.viewsCount.toLocaleString()} Students Watched
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                          <span>{rec.recordedDate}</span>
                          <span className="px-2 py-0.5 rounded text-[9px] bg-stone-100 text-stone-700 font-bold border border-stone-200">
                            {rec.difficulty}
                          </span>
                        </div>

                        <h4 
                          onClick={() => setActiveVideoModal(rec)}
                          className="font-serif font-bold text-stone-900 text-sm md:text-base leading-snug group-hover:text-amber-800 transition-colors cursor-pointer"
                        >
                          {rec.lectureTitle}
                        </h4>

                        <p className="text-xs text-stone-600 font-serif">
                          Faculty: <strong className="text-stone-900">{rec.educator}</strong>
                        </p>

                        {/* Bullet Highlights */}
                        <div className="space-y-1 pt-1 border-t border-stone-100">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                            Core Takeaways:
                          </span>
                          <ul className="text-xs text-stone-700 font-sans space-y-1">
                            {rec.keyTakeaways.slice(0, 2).map((t, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-1.5 truncate">
                                <span className="text-amber-600 font-bold">•</span>
                                <span className="truncate">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Bottom CTA */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                        {onSelectChapterNote && (
                          <button
                            onClick={() => onSelectChapterNote(rec.subjectId, rec.chapterTitle)}
                            className="text-xs font-serif text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2 cursor-pointer"
                          >
                            Chapter Notes
                          </button>
                        )}

                        <button
                          onClick={() => setActiveVideoModal(rec)}
                          className="px-3.5 py-1.5 bg-[#1C1917] hover:bg-stone-850 text-amber-100 hover:text-white rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Watch Video</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: LIVE VIRTUAL CLASSROOM STREAM (JOIN CLASS MODAL)
          ========================================================================= */}
      {activeLiveModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-[#1C1917] text-white w-full max-w-5xl rounded-3xl overflow-hidden border border-amber-600/30 shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <div>
                  <h3 className="font-serif font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <span>{activeLiveModal.topicTitle}</span>
                    <span className="text-[10px] font-mono bg-red-600 px-2 py-0.5 rounded text-white font-bold">LIVE</span>
                  </h3>
                  <p className="text-xs text-amber-300/80 font-mono">
                    {activeLiveModal.subjectTitle} • Room: {activeLiveModal.roomCode}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveLiveModal(null)}
                className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Video Screen + Live Q&A Chat */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
              
              {/* Virtual Chalkboard Stream Canvas (2 Cols) */}
              <div className="lg:col-span-2 bg-black flex flex-col justify-between p-4 sm:p-6 relative border-r border-stone-800">
                {/* Chalkboard Display Area */}
                <div className="flex-1 bg-[#15241C] border-4 border-[#2A1D13] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-inner">
                  {/* Chalkboard Header */}
                  <div className="flex items-center justify-between text-xs text-emerald-200/80 font-mono border-b border-emerald-900/60 pb-2">
                    <span>STUDY NEST SMART CHALKBOARD • {activeLiveModal.chapterTitle}</span>
                    <span>HD 1080p • 60 FPS</span>
                  </div>

                  {/* Chalkboard Content Notes */}
                  <div className="space-y-4 my-auto py-4 text-emerald-100 font-['Kalam',serif]">
                    <div className="border-b border-dashed border-emerald-800/80 pb-2">
                      <span className="text-amber-300 text-lg font-bold">Derivation Step #02: Universal Gravitation Constant</span>
                      <p className="text-sm text-emerald-200 mt-1">
                        F = G · (m₁ · m₂) / r²  ➔  G = F · r² / (m₁ · m₂)
                      </p>
                    </div>

                    <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/50 space-y-1 text-xs">
                      <span className="text-amber-200 font-bold">SI Unit:</span> N·m²/kg²  |  <span className="text-amber-200 font-bold">Value:</span> 6.673 × 10⁻¹¹ N·m²/kg²
                      <p className="text-stone-300 italic">"Remember: Value of G remains constant throughout the universe!" — Prof. Kulkarni</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-emerald-300">
                      <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700">Question Bank 2024</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700">Board Weightage: 5 Marks</span>
                    </div>
                  </div>

                  {/* Teacher Webcam Picture-in-Picture */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-stone-900 rounded-xl border-2 border-amber-500 overflow-hidden shadow-2xl flex flex-col justify-between p-2">
                    <span className="text-[9px] font-mono text-amber-300 font-bold truncate">{activeLiveModal.educator}</span>
                    <div className="text-center text-stone-400 text-[10px]">
                      🎥 Live Camera
                    </div>
                    <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Mic Active
                    </span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="pt-3 flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Live Stream Active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Quality: 1080p Auto</span>
                    <button 
                      onClick={() => triggerToast("Switched to Full Screen")}
                      className="p-1.5 hover:text-white"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Q&A Chat Column (1 Col) */}
              <div className="flex flex-col h-full bg-[#171412]">
                <div className="px-4 py-3 border-b border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>💬 Live Doubts & Chat ({activeLiveModal.attendeesCount || 120} online)</span>
                </div>

                {/* Messages Box */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-80 lg:max-h-none text-xs">
                  {chatMessages.map((msg, mIdx) => (
                    <div 
                      key={mIdx} 
                      className={`p-2.5 rounded-xl space-y-1 ${
                        msg.isTeacher 
                          ? 'bg-amber-950/40 border border-amber-500/30 text-amber-200' 
                          : msg.sender === 'You'
                            ? 'bg-stone-800 text-white ml-4'
                            : 'bg-stone-900/80 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                        <span className={msg.isTeacher ? 'text-amber-400 font-bold' : 'font-semibold'}>
                          {msg.sender}
                        </span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="font-sans leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Send Input */}
                <form onSubmit={handleSendChat} className="p-3 border-t border-stone-800 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask educator a doubt live..."
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-sans"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: RECORDED LECTURE VIDEO PLAYER MODAL
          ========================================================================= */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-[#1C1917] text-white w-full max-w-4xl rounded-3xl overflow-hidden border border-amber-600/30 shadow-2xl flex flex-col max-h-[94vh]">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                  {activeVideoModal.subjectTitle} • Lecture #{activeVideoModal.lectureNumber}
                </span>
                <h3 className="font-serif font-bold text-white text-base md:text-lg leading-snug">
                  {activeVideoModal.lectureTitle}
                </h3>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Canvas */}
            <div className="relative aspect-video bg-black flex flex-col justify-between p-4 sm:p-6 select-none overflow-hidden">
              {/* Slate Canvas Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-black opacity-90" />

              {/* Chalkboard Display Simulation */}
              <div className="relative z-10 my-auto text-center space-y-3 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm max-w-xl mx-auto">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400 text-stone-950">
                  ▶ RECORDED LECTURE IN PROGRESS
                </span>
                <h4 className="font-serif font-bold text-lg md:text-xl text-white">
                  {activeVideoModal.chapterTitle}
                </h4>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {activeVideoModal.sampleVideoSummary}
                </p>
                <div className="pt-2 flex items-center justify-center gap-3 text-xs text-amber-300 font-mono">
                  <span>Educator: {activeVideoModal.educator}</span>
                  <span>•</span>
                  <span>Duration: {activeVideoModal.duration}</span>
                </div>
              </div>

              {/* Scrubber & Control Bar */}
              <div className="relative z-10 pt-4 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent p-2 rounded-xl">
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-stone-700 rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-amber-500 rounded-full w-2/5" />
                </div>

                <div className="flex items-center justify-between text-xs text-stone-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 hover:text-white"
                    >
                      {isPlaying ? <span className="font-bold">⏸ Pause</span> : <span className="font-bold text-amber-400">▶ Play</span>}
                    </button>
                    <span className="font-mono text-[11px] text-stone-400">18:42 / {activeVideoModal.duration}</span>
                  </div>

                  {/* Playback speed toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-400">Speed:</span>
                    {[1, 1.25, 1.5, 2].map(spd => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                          playbackSpeed === spd 
                            ? 'bg-amber-400 text-stone-950 font-bold' 
                            : 'bg-stone-800 text-stone-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lecture Summary & Study Handouts */}
            <div className="p-6 bg-[#171412] border-t border-stone-800 space-y-4 overflow-y-auto">
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-300">
                  Key Lecture Notes & Board Examination Points:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-300 font-sans">
                  {activeVideoModal.keyTakeaways.map((pt, pIdx) => (
                    <li key={pIdx} className="bg-stone-900/80 border border-stone-800 p-2.5 rounded-xl flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
                <span className="text-xs text-stone-400 font-sans">
                  Downloaded chalkboard PDF notes are saved in your Study Library.
                </span>

                <div className="flex items-center gap-2">
                  {onSelectChapterNote && (
                    <button
                      onClick={() => {
                        setActiveVideoModal(null);
                        onSelectChapterNote(activeVideoModal.subjectId, activeVideoModal.chapterTitle);
                      }}
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-200 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open Handwritten Notes</span>
                    </button>
                  )}

                  <button
                    onClick={() => triggerToast(`Downloaded Lecture Handout PDF for ${activeVideoModal.lectureTitle}!`)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-xs font-serif transition-all cursor-pointer shadow-md"
                  >
                    Download Slide PDF
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
