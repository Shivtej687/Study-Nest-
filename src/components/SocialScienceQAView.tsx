import React, { useState } from 'react';
import { ChapterSocialQA } from '../data/socialScienceQA';
import { 
  HelpCircle, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Copy, 
  Check, 
  Sparkles, 
  Compass, 
  BookOpen, 
  Award,
  Eye,
  EyeOff,
  ChevronRight,
  Bookmark
} from 'lucide-react';

interface SocialScienceQAViewProps {
  socialData: ChapterSocialQA;
}

export const SocialScienceQAView: React.FC<SocialScienceQAViewProps> = ({ socialData }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'timeline' | 'giveReasons' | 'shortAnswers' | 'briefAnswers'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [studyTestMode, setStudyTestMode] = useState<boolean>(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswerReveal = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalQuestions = 
    (socialData.timelineEvents?.length ? 1 : 0) + 
    (socialData.conceptMapItems?.length ? 1 : 0) + 
    socialData.giveReasons.length + 
    socialData.shortAnswers.length + 
    socialData.briefAnswers.length;

  const getSubjectBadge = () => {
    switch (socialData.subjectType) {
      case 'History':
        return {
          title: '🏛️ इतिहास (History)',
          color: 'from-amber-900 to-stone-900 text-amber-200 border-amber-800/40',
          chip: 'bg-amber-100 text-amber-950 border-amber-300'
        };
      case 'Political Science':
        return {
          title: '⚖️ राज्यशास्त्र (Political Science)',
          color: 'from-indigo-950 to-stone-900 text-indigo-200 border-indigo-800/40',
          chip: 'bg-indigo-100 text-indigo-950 border-indigo-300'
        };
      case 'Geography':
        return {
          title: '🌍 भूगोल (Geography)',
          color: 'from-emerald-950 to-stone-900 text-emerald-200 border-emerald-800/40',
          chip: 'bg-emerald-100 text-emerald-950 border-emerald-300'
        };
    }
  };

  const badgeInfo = getSubjectBadge();

  return (
    <div className="mt-8 pt-6 border-t-2 border-stone-300 space-y-6 text-left">
      {/* Top Banner Header */}
      <div className={`bg-gradient-to-r ${badgeInfo.color} rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden border`}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-white/10 text-stone-200 border border-white/20">
              {badgeInfo.title}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              📜 संपूर्ण स्वाध्याय (Back Exercise Q&A)
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/10 text-stone-300">
              SSC Board Std 10 • 100% Textbook Covered
            </span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white tracking-wide">
            {socialData.chapterTitle}
          </h2>

          <p className="text-xs md:text-sm text-stone-300 font-serif leading-relaxed flex flex-wrap items-center gap-3">
            <span>📚 {totalQuestions} Master Exam Questions</span>
            <span>•</span>
            <span>⏱️ Timelines & Concept Maps</span>
            <span>•</span>
            <span>🎯 2-Mark Give Reasons & Short Notes</span>
            <span>•</span>
            <span>📝 3 & 4-Mark Brief Answers with Sub-headings</span>
          </p>
        </div>
      </div>

      {/* Filter and Study Mode Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-100 border border-stone-300 rounded-2xl p-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            All Questions ({totalQuestions})
          </button>
          
          {(socialData.timelineEvents?.length || socialData.conceptMapItems?.length) && (
            <button
              onClick={() => setActiveFilter('timeline')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === 'timeline'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timelines & Concept Maps ({socialData.timelineEvents ? socialData.timelineEvents.length : 0 + (socialData.conceptMapItems ? socialData.conceptMapItems.length : 0)})</span>
            </button>
          )}

          {socialData.giveReasons.length > 0 && (
            <button
              onClick={() => setActiveFilter('giveReasons')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === 'giveReasons'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Give Reasons ({socialData.giveReasons.length})</span>
            </button>
          )}

          {socialData.shortAnswers.length > 0 && (
            <button
              onClick={() => setActiveFilter('shortAnswers')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === 'shortAnswers'
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Answer in Short ({socialData.shortAnswers.length})</span>
            </button>
          )}

          {socialData.briefAnswers.length > 0 && (
            <button
              onClick={() => setActiveFilter('briefAnswers')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === 'briefAnswers'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Brief Answers ({socialData.briefAnswers.length})</span>
            </button>
          )}
        </div>

        {/* Study Recall Mode Toggle */}
        <button
          onClick={() => setStudyTestMode(!studyTestMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            studyTestMode
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
          }`}
          title="Hide answers so you can test yourself before revealing!"
        >
          {studyTestMode ? <Eye className="w-3.5 h-3.5 text-amber-700" /> : <EyeOff className="w-3.5 h-3.5 text-stone-500" />}
          <span>{studyTestMode ? 'Test Mode: ON (Answers Hidden)' : 'Test Yourself Mode'}</span>
        </button>
      </div>

      {/* Board Exam Golden Tip Box */}
      <div className="bg-[#FAF8F5] border-2 border-stone-300 rounded-2xl p-4 shadow-sm flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-stone-900 font-serif">
            Maharashtra State Board SSC Social Science Topper Evaluation Guidelines:
          </p>
          <p className="text-stone-700 leading-relaxed">
            • <strong>Give Reasons (2 Marks)</strong>: Must include exactly 2 distinct, logical, and numbered points (or 4 short valid clauses). Always begin with the contextual cause and end with the resulting effect.
            <br />
            • <strong>Answer in Short (2 Marks)</strong>: Write at least 4 clear bullet points or 2 comprehensive analytical paragraphs.
            <br />
            • <strong>Brief Answers (3 / 4 Marks)</strong>: Follow the topper structure: <em>Brief Introduction (1-2 sentences)</em> ➔ <em>Detailed Sub-headed Points</em> ➔ <em>Analytical Conclusion</em>.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. TIMELINES & CONCEPT MAPS                                               */}
      {/* ========================================================================= */}
      {(activeFilter === 'all' || activeFilter === 'timeline') && (socialData.timelineEvents?.length || socialData.conceptMapItems?.length) && (
        <section className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif font-bold text-stone-900 text-lg md:text-xl">
                {socialData.timelineOrConceptMapTitle || 'Timeline & Chronological Progression'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
              Board Q.2 (B) Concept Chart / Timeline
            </span>
          </div>

          {/* Timeline Events Vertical Stepper */}
          {socialData.timelineEvents && socialData.timelineEvents.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="relative border-l-2 border-amber-600/40 ml-4 md:ml-6 pl-6 space-y-6">
                {socialData.timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Stepper Dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-600 border-4 border-white shadow-sm" />
                    
                    <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4 shadow-xs space-y-1.5 hover:border-amber-400 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-amber-200/70 text-amber-950 border border-amber-300">
                          {evt.yearOrEra}
                        </span>
                        <span className="text-[11px] font-mono text-stone-500">
                          Step #{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
                        {evt.event}
                      </h4>
                      {evt.significance && (
                        <p className="text-xs text-stone-700 leading-relaxed font-serif pt-1 border-t border-stone-200/80">
                          <strong className="text-amber-900 font-mono">Significance:</strong> {evt.significance}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concept Map Groupings */}
          {socialData.conceptMapItems && socialData.conceptMapItems.length > 0 && (
            <div className="mt-6 pt-6 border-t border-stone-200 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-stone-600 tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-stone-600" />
                <span>Concept Map & Flow Categories (पूर्ण करा / संकल्पना चित्र)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialData.conceptMapItems.map((group, gIdx) => (
                  <div key={gIdx} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                    <h5 className="font-serif font-bold text-stone-900 text-sm border-b border-stone-200 pb-1.5 text-amber-950">
                      📂 {group.category}
                    </h5>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {group.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. GIVE REASONS (कारणे द्या — Board 2 Marks)                                */}
      {/* ========================================================================= */}
      {(activeFilter === 'all' || activeFilter === 'giveReasons') && socialData.giveReasons.length > 0 && (
        <section className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-700" />
              <h3 className="font-serif font-bold text-stone-900 text-lg md:text-xl">
                Give Reasons (पुढील विधाने सकारण स्पष्ट करा / भौगोलिक कारणे द्या)
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-red-100 text-red-900 border border-red-300 font-semibold">
              Board 2 Marks Each • {socialData.giveReasons.length} Questions
            </span>
          </div>

          <div className="space-y-5">
            {socialData.giveReasons.map((item, idx) => {
              const qId = `give-reason-${idx}`;
              const isHidden = studyTestMode && !revealedAnswers[qId];
              const fullAnswerText = `Q: ${item.statementOrQuestion}\nReasons:\n${item.reasons.map((r, rIdx) => `${rIdx + 1}. ${r}`).join('\n')}`;

              return (
                <div key={idx} className="bg-[#FAF8F5] border border-stone-300 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-red-900 border border-red-200">
                        Q.{idx + 1} • Give Reasons ({item.marks} Marks)
                      </span>
                      <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base leading-snug">
                        "{item.statementOrQuestion}"
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {studyTestMode && (
                        <button
                          onClick={() => toggleAnswerReveal(qId)}
                          className="p-1.5 rounded-lg border border-stone-300 bg-white text-stone-600 hover:text-stone-900"
                          title={isHidden ? 'Reveal Answer' : 'Hide Answer'}
                        >
                          {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-amber-700" />}
                        </button>
                      )}
                      <button
                        onClick={() => handleCopy(fullAnswerText, qId)}
                        className="p-1.5 rounded-lg border border-stone-300 bg-white text-stone-600 hover:text-stone-900"
                        title="Copy Question & Answer"
                      >
                        {copiedId === qId ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {isHidden ? (
                    <div 
                      onClick={() => toggleAnswerReveal(qId)}
                      className="cursor-pointer bg-white border border-dashed border-stone-300 rounded-xl p-4 text-center text-xs text-stone-500 hover:bg-stone-50"
                    >
                      🔒 <em>Answer hidden in Recall Mode. Click here or the eye button to check your memory!</em>
                    </div>
                  ) : (
                    <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider block">
                        कारण / Points of Reasoning:
                      </span>
                      <ol className="space-y-2 text-xs md:text-sm text-stone-800 list-decimal list-inside font-serif leading-relaxed">
                        {item.reasons.map((reason, rIdx) => (
                          <li key={rIdx} className="pl-1">
                            <span className="font-sans font-medium text-stone-900">{reason}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. ANSWER IN SHORT (थोडक्यात उत्तरे द्या — Board 2 Marks)                     */}
      {/* ========================================================================= */}
      {(activeFilter === 'all' || activeFilter === 'shortAnswers') && socialData.shortAnswers.length > 0 && (
        <section className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-800" />
              <h3 className="font-serif font-bold text-stone-900 text-lg md:text-xl">
                Answer in Short (थोडक्यात टिपा लिहा / उत्तरे द्या)
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-100 text-blue-900 border border-blue-300 font-semibold">
              Board 2 Marks Each • {socialData.shortAnswers.length} Questions
            </span>
          </div>

          <div className="space-y-5">
            {socialData.shortAnswers.map((item, idx) => {
              const qId = `short-ans-${idx}`;
              const isHidden = studyTestMode && !revealedAnswers[qId];
              const fullAnswerText = `Q: ${item.question}\nAnswer:\n${item.answerPoints.map((p, pIdx) => `${pIdx + 1}. ${p}`).join('\n')}`;

              return (
                <div key={idx} className="bg-[#FAF8F5] border border-stone-300 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-900 border border-blue-200">
                        Q.{idx + 1} • Short Answer ({item.marks} Marks)
                      </span>
                      <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base leading-snug">
                        {item.question}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {studyTestMode && (
                        <button
                          onClick={() => toggleAnswerReveal(qId)}
                          className="p-1.5 rounded-lg border border-stone-300 bg-white text-stone-600 hover:text-stone-900"
                          title={isHidden ? 'Reveal Answer' : 'Hide Answer'}
                        >
                          {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-amber-700" />}
                        </button>
                      )}
                      <button
                        onClick={() => handleCopy(fullAnswerText, qId)}
                        className="p-1.5 rounded-lg border border-stone-300 bg-white text-stone-600 hover:text-stone-900"
                        title="Copy Question & Answer"
                      >
                        {copiedId === qId ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {isHidden ? (
                    <div 
                      onClick={() => toggleAnswerReveal(qId)}
                      className="cursor-pointer bg-white border border-dashed border-stone-300 rounded-xl p-4 text-center text-xs text-stone-500 hover:bg-stone-50"
                    >
                      🔒 <em>Answer hidden in Recall Mode. Click to reveal.</em>
                    </div>
                  ) : (
                    <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider block">
                        महत्त्वाचे मुद्दे (Key Board Points):
                      </span>
                      <ul className="space-y-2 text-xs md:text-sm text-stone-800 font-serif leading-relaxed">
                        {item.answerPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-stone-300">
                              {pIdx + 1}
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. GIVE BRIEF ANSWERS (सविस्तर उत्तरे द्या — Board 3 / 4 Marks)               */}
      {/* ========================================================================= */}
      {(activeFilter === 'all' || activeFilter === 'briefAnswers') && socialData.briefAnswers.length > 0 && (
        <section className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-900" />
              <h3 className="font-serif font-bold text-stone-900 text-lg md:text-xl">
                Give Brief Answers (सविस्तर / दीर्घोत्तरी उत्तरे लिहा)
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-purple-100 text-purple-950 border border-purple-300 font-semibold">
              Board 3–4 Marks Each • {socialData.briefAnswers.length} Questions
            </span>
          </div>

          <div className="space-y-6">
            {socialData.briefAnswers.map((item, idx) => {
              const qId = `brief-ans-${idx}`;
              const isHidden = studyTestMode && !revealedAnswers[qId];
              const fullAnswerText = `Q: ${item.question}\nIntro: ${item.introduction || ''}\nPoints:\n${item.detailedPoints.map(dp => `${dp.subheading}: ${dp.description}`).join('\n')}\nConclusion: ${item.conclusion || ''}`;

              return (
                <div key={idx} className="bg-[#FAF8F5] border border-stone-300 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-950 border border-purple-200">
                        Q.{idx + 1} • Detailed Essay Answer ({item.marks} Marks)
                      </span>
                      <h4 className="font-serif font-bold text-stone-900 text-base md:text-lg leading-snug">
                        {item.question}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {studyTestMode && (
                        <button
                          onClick={() => toggleAnswerReveal(qId)}
                          className="p-1.5 rounded-lg border border-stone-300 bg-white text-stone-600 hover:text-stone-900"
                          title={isHidden ? 'Reveal Answer' : 'Hide Answer'}
                        >
                          {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-amber-700" />}
                        </button>
                      )}
                      <button
                        onClick={() => handleCopy(fullAnswerText, qId)}
                        className="p-1.5 rounded-lg border border-stone-300 bg-white text-stone-600 hover:text-stone-900"
                        title="Copy Full Answer"
                      >
                        {copiedId === qId ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {isHidden ? (
                    <div 
                      onClick={() => toggleAnswerReveal(qId)}
                      className="cursor-pointer bg-white border border-dashed border-stone-300 rounded-xl p-5 text-center text-xs text-stone-500 hover:bg-stone-50"
                    >
                      🔒 <em>Detailed Answer hidden in Recall Mode. Click to reveal.</em>
                    </div>
                  ) : (
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4">
                      {/* Introduction */}
                      {item.introduction && (
                        <div className="bg-stone-50 border-l-4 border-purple-800 p-3 rounded-r-xl text-xs md:text-sm text-stone-800 font-serif leading-relaxed">
                          <strong className="text-purple-950 font-mono block text-[11px] uppercase tracking-wider mb-0.5">
                            प्रस्तावना (Introduction):
                          </strong>
                          {item.introduction}
                        </div>
                      )}

                      {/* Detailed Sub-points */}
                      <div className="space-y-3">
                        <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider block">
                          सविस्तर मुद्दे (Detailed Points with Sub-headings):
                        </span>

                        <div className="grid grid-cols-1 gap-3">
                          {item.detailedPoints.map((pt, ptIdx) => (
                            <div key={ptIdx} className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-3.5 space-y-1">
                              <h5 className="font-serif font-bold text-stone-900 text-xs md:text-sm text-amber-950 flex items-center gap-1.5">
                                <Bookmark className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                                <span>{pt.subheading}</span>
                              </h5>
                              <p className="text-xs md:text-sm text-stone-700 font-serif leading-relaxed pl-5">
                                {pt.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Conclusion */}
                      {item.conclusion && (
                        <div className="bg-amber-50/60 border border-amber-200/80 p-3 rounded-xl text-xs md:text-sm text-stone-800 font-serif leading-relaxed">
                          <strong className="text-amber-950 font-mono block text-[11px] uppercase tracking-wider mb-0.5">
                            निष्कर्ष (Conclusion / Analytical Takeaway):
                          </strong>
                          {item.conclusion}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
