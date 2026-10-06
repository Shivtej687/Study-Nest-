import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  VIVA_QUESTIONS_LIST, 
  BOARD_QUESTION_PAPERS_LIST, 
  MOCK_TESTS_LIST,
  CHAPTER_MOCK_PAPERS_20M,
  INITIAL_TEACHER_SUBMISSIONS,
  VivaQuestionItem,
  BoardQuestionPaperItem,
  MockTestItem,
  ChapterMockPaper20M,
  TeacherAnswerSubmission
} from '../data/vivaAndTestSessionsData';
import { 
  getSubjectCatalogForUser, 
  getMockPapersForUser, 
  getVivaQuestionsForUser, 
  getBoardPapersForUser, 
  getMockTestsForUser,
  getTeacherSubmissionsForUser,
  parseStudentGrade
} from '../data/gradeCurriculumAdapter';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Clock, 
  RotateCcw, 
  FileText, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  Upload, 
  UploadCloud, 
  FileCheck, 
  CheckCircle, 
  Eye, 
  Trophy, 
  UserCheck, 
  X, 
  FileUp, 
  FileSearch, 
  MessageSquare, 
  AlertCircle 
} from 'lucide-react';

interface TestAndQuizViewProps {
  userProfile?: any;
  triggerToast: (msg: string) => void;
  onSelectChapterNote?: (subjectId: string, chapterTitle: string) => void;
}

export const TestAndQuizView: React.FC<TestAndQuizViewProps> = ({ 
  userProfile,
  triggerToast, 
  onSelectChapterNote 
}) => {
  const std = userProfile?.studentMeta?.std;
  const board = userProfile?.studentMeta?.board;
  const studying = userProfile?.studentMeta?.studying;

  const parsedGrade = useMemo(() => parseStudentGrade(std, board, studying), [std, board, studying]);
  const subjectCatalog = useMemo(() => getSubjectCatalogForUser(std, board, studying), [std, board, studying]);
  const allMockPapers = useMemo(() => {
    if (parsedGrade.stdNumber === 10) return CHAPTER_MOCK_PAPERS_20M;
    return getMockPapersForUser(std, board, studying);
  }, [std, board, studying, parsedGrade.stdNumber]);

  const allVivaQuestions = useMemo(() => {
    if (parsedGrade.stdNumber === 10) return VIVA_QUESTIONS_LIST;
    return getVivaQuestionsForUser(std, board, studying);
  }, [std, board, studying, parsedGrade.stdNumber]);

  const allBoardPapers = useMemo(() => {
    if (parsedGrade.stdNumber === 10) return BOARD_QUESTION_PAPERS_LIST;
    return getBoardPapersForUser(std, board, studying);
  }, [std, board, studying, parsedGrade.stdNumber]);

  const allMockTests = useMemo(() => {
    if (parsedGrade.stdNumber === 10) return MOCK_TESTS_LIST;
    return getMockTestsForUser(std, board, studying);
  }, [std, board, studying, parsedGrade.stdNumber]);

  // Main sub-tabs: 'chapter_mocks' | 'viva' | 'papers' | 'mock'
  const [activeSessionTab, setActiveSessionTab] = useState<'chapter_mocks' | 'viva' | 'papers' | 'mock'>('chapter_mocks');

  // =========================================================================
  // CHAPTER 20-MARK MOCK PAPERS & TEACHER EVALUATION STATE
  // =========================================================================
  const [selectedMockSubject, setSelectedMockSubject] = useState<string>(() => subjectCatalog[0]?.id || 'sci1');
  const [selectedMockChapter, setSelectedMockChapter] = useState<string>(() => {
    const firstSubj = subjectCatalog[0];
    return firstSubj?.sections?.[0]?.chapters?.[0] || 'Gravitation';
  });
  const [activePaperViewModal, setActivePaperViewModal] = useState<ChapterMockPaper20M | null>(null);
  const [activeUploadModal, setActiveUploadModal] = useState<ChapterMockPaper20M | null>(null);
  const [activeEvaluationModal, setActiveEvaluationModal] = useState<TeacherAnswerSubmission | null>(null);

  // If subjectCatalog changes, ensure selected subject is in catalog
  useEffect(() => {
    if (subjectCatalog.length > 0 && !subjectCatalog.some(s => s.id === selectedMockSubject)) {
      const firstSubj = subjectCatalog[0];
      setSelectedMockSubject(firstSubj.id);
      const chaps = allMockPapers.filter(p => p.subjectId === firstSubj.id).map(p => p.chapterTitle);
      if (chaps.length > 0) setSelectedMockChapter(chaps[0]);
    }
  }, [subjectCatalog, selectedMockSubject, allMockPapers]);

  // Submissions state (initialized with demo and stored locally)
  const [submissions, setSubmissions] = useState<TeacherAnswerSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('study_nest_teacher_submissions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    if (parsedGrade.stdNumber === 10) return INITIAL_TEACHER_SUBMISSIONS;
    return getTeacherSubmissionsForUser(std, board, studying);
  });

  // Save submissions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('study_nest_teacher_submissions', JSON.stringify(submissions));
    } catch (e) {
      // ignore
    }
  }, [submissions]);

  // Upload modal form state
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [uploadFileSize, setUploadFileSize] = useState<string>('');
  const [studentNote, setStudentNote] = useState<string>('');
  const [isSubmittingUpload, setIsSubmittingUpload] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available subjects for chapter mock papers
  const mockSubjectOptions = subjectCatalog.map(s => ({ id: s.id, label: s.title }));

  // Dynamically compute all chapters available for the selected subject
  const availableChaptersForSubject = Array.from(
    new Set(allMockPapers.filter(p => p.subjectId === selectedMockSubject).map(p => p.chapterTitle))
  );

  const handleSelectMockSubject = (subId: string) => {
    setSelectedMockSubject(subId);
    const chapters = Array.from(
      new Set(allMockPapers.filter(p => p.subjectId === subId).map(p => p.chapterTitle))
    );
    if (chapters.length > 0) {
      setSelectedMockChapter(chapters[0]);
    }
  };

  // Filter 20M papers
  const currentChapterPapers = allMockPapers.filter(
    p => p.subjectId === selectedMockSubject && p.chapterTitle === selectedMockChapter
  );

  // Handle PDF file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadFileSize(`${sizeMB} MB`);
      triggerToast(`📄 Selected file: ${file.name} (${sizeMB} MB)`);
    }
  };

  // Language Localization Helpers for pure Marathi, Hindi & Sanskrit
  const getLocalizedSetName = (subjectId: string, setName: string) => {
    if (subjectId === 'mar') {
      if (setName.includes('अ') || setName === 'Set A') return "संच 'अ'";
      if (setName.includes('ब') || setName === 'Set B') return "संच 'ब'";
      if (setName.includes('क') || setName === 'Set C') return "संच 'क'";
      return setName;
    }
    if (subjectId === 'hin') {
      if (setName.includes('अ') || setName === 'Set A') return "सेट 'अ'";
      if (setName.includes('ब') || setName === 'Set B') return "सेट 'ब'";
      if (setName.includes('क') || setName === 'Set C') return "सेट 'क'";
      return setName;
    }
    if (subjectId === 'sanskrit') {
      if (setName.includes('अ') || setName === 'Set A') return "संचः 'अ'";
      if (setName.includes('ब') || setName === 'Set B') return "संचः 'ब'";
      if (setName.includes('क') || setName === 'Set C') return "संचः 'क'";
      return setName;
    }
    return setName;
  };

  const getLocalizedMetaStr = (subjectId: string) => {
    if (subjectId === 'mar') return '२० गुण • ४५ मिनिटे';
    if (subjectId === 'hin') return '२० अंक • ४५ मिनट';
    if (subjectId === 'sanskrit') return '२० अंकाः • ४५ निमेषाः';
    return '20 Marks • 45 Mins';
  };

  const getLocalizedViewPaper = (subjectId: string) => {
    if (subjectId === 'mar') return 'पत्रिका पहा';
    if (subjectId === 'hin') return 'प्रश्नपत्र देखें';
    if (subjectId === 'sanskrit') return 'पत्रिकां पश्यतु';
    return 'View Paper';
  };

  const getLocalizedUploadBtn = (subjectId: string) => {
    if (subjectId === 'mar') return 'उत्तरपत्रिका शिक्षकांकडे पाठवा (PDF)';
    if (subjectId === 'hin') return 'उत्तरपुस्तिका शिक्षक को भेजें (PDF)';
    if (subjectId === 'sanskrit') return 'उत्तरपत्रिकां आचार्याय प्रेषयतु (PDF)';
    return 'Upload Solved PDF for Teacher';
  };

  const getLocalizedEvaluatorLabel = (subjectId: string) => {
    if (subjectId === 'mar') return 'नियुक्त मुख्य परीक्षक:';
    if (subjectId === 'hin') return 'नियुक्त राज्य परीक्षक:';
    if (subjectId === 'sanskrit') return 'नियुक्तः मुख्यपरीक्षकः:';
    return 'Assigned Evaluator:';
  };

  const getLocalizedBoardHeader = (subjectId: string) => {
    if (subjectId === 'mar') return 'महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ, पुणे';
    if (subjectId === 'hin') return 'महाराष्ट्र राज्य माध्यमिक एवं उच्च माध्यमिक शिक्षा मंडल, पुणे';
    if (subjectId === 'sanskrit') return 'महाराष्ट्र-राज्य-माध्यमिक-तथा-उच्च-माध्यमिक-शिक्षण-मण्डलम्, पुणे';
    return 'MAHARASHTRA SSC BOARD 20-MARK CHAPTER UNIT TEST';
  };

  const getLocalizedStructureTitle = (subjectId: string) => {
    if (subjectId === 'mar') return '२० गुण प्रश्नपत्रिका रचना:';
    if (subjectId === 'hin') return '२० अंक प्रश्न संरचना:';
    if (subjectId === 'sanskrit') return '२० अंकाः प्रश्नसंरचना:';
    return '20 Marks Question Structure:';
  };

  const getLocalizedOptionPrefix = (subjectId: string, idx: number) => {
    if (subjectId === 'mar' || subjectId === 'hin' || subjectId === 'sanskrit') {
      const devnagariLetters = ['(अ)', '(ब)', '(क)', '(ड)', '(इ)', '(फ)'];
      return devnagariLetters[idx] || `(${idx + 1})`;
    }
    return `(${String.fromCharCode(65 + idx)})`;
  };

  // Submit Answer Paper for Teacher Grading
  const handleSubmitAnswerPaper = () => {
    if (!activeUploadModal) return;
    if (!uploadFileName) {
      triggerToast('⚠️ Please choose a solved answer paper PDF or photo scan first.');
      return;
    }

    setIsSubmittingUpload(true);
    triggerToast(`📤 Uploading solved paper for ${getLocalizedSetName(activeUploadModal.subjectId, activeUploadModal.setName)}...`);

    setTimeout(() => {
      const newSubmissionId = `sub-${Date.now()}`;
      const subId = activeUploadModal.subjectId;
      
      let overallRemark = `Excellent solved paper for ${activeUploadModal.setName}! Most derivations and reasons are structured strictly according to the Maharashtra SSC Board answer scheme. Minor half-mark lost in final units.`;
      let grade = 'A+ (Distinction)';
      let questionWiseMarks = [
        { qNumber: 'Q.1', awarded: 4, max: 4, remark: 'All MCQs and objective questions solved accurately.' },
        { qNumber: 'Q.2', awarded: 5.5, max: 6, remark: 'Scientific reasons written in numbered cause-and-effect points. Well phrased.' },
        { qNumber: 'Q.3', awarded: 5.5, max: 6, remark: 'Step-by-step derivation is clear and diagrams are labeled.' },
        { qNumber: 'Q.4', awarded: 3.5, max: 4, remark: 'Good HOTS analytical approach. Remember to box your final answer with units.' }
      ];
      let handwritingAdvice = 'Maintain this neat presentation! Drawing double lines between question answers will impress the board moderator.';
      let signedAt = 'Just now • Verified Board Signature';

      if (subId === 'mar') {
        overallRemark = 'उत्कृष्ट उत्तरपत्रिका! सर्व प्रश्नांची उत्तरे शुद्धलेखनाच्या नियमांनुसार व सुवाच्य हस्ताक्षरात लिहिलेली आहेत. व्याकरण आणि स्वमत अभिव्यक्तीमध्ये परिपक्व विचार दिसून येतात.';
        grade = 'अ+ (विशेष प्रावीण्य)';
        questionWiseMarks = [
          { qNumber: 'प्र.१', awarded: 4, max: 4, remark: 'सर्व वस्तुनिष्ठ प्रश्न आणि पर्याय बिनचूक सोडवले आहेत.' },
          { qNumber: 'प्र.२', awarded: 5.5, max: 6, remark: 'व्याकरण घटक, वाक्यरूपांतर व समास अचूक आहेत.' },
          { qNumber: 'प्र.३', awarded: 5.5, max: 6, remark: 'काव्यसौंदर्य आणि विचारसौंदर्य प्रभावीपणे उलगडले आहे.' },
          { qNumber: 'प्र.४', awarded: 3.5, max: 4, remark: 'स्वमत अभिव्यक्तीमध्ये स्वतःचे चिंतन स्पष्टपणे जाणवते. उत्तर आदर्श आहे.' }
        ];
        handwritingAdvice = 'अक्षर अतिशय सुंदर व वळणदार आहे. मुख्य मुद्द्यांखाली पेन्सिलने अधोरेखित करण्याची पद्धत बोर्ड परीक्षेत नक्कीच पैकीच्या पैकी गुण मिळवून देईल.';
        signedAt = 'आत्ताच • अधिकृत राज्य मंडळ स्वाक्षरी व शिक्का';
      } else if (subId === 'hin') {
        overallRemark = 'अति उत्तम उत्तरपुस्तिका! भाषा शैली अत्यंत प्रवाहमयी, शुद्ध वर्तनीयुक्त एवं प्रभावी है। पद्य भावार्थ तथा व्याकरण का विश्लेषण राज्य मण्डल के मानकों के सर्वथा अनुकूल है।';
        grade = 'ए+ (विशेष योग्यता)';
        questionWiseMarks = [
          { qNumber: 'प्रश्न १', awarded: 4, max: 4, remark: 'सभी वस्तुनिष्ठ एवं रिक्त स्थान शुद्ध हल किए गए हैं।' },
          { qNumber: 'प्रश्न २', awarded: 5.5, max: 6, remark: 'संधि, मुहावरे एवं काल परिवर्तन पूर्णतः व्याकरण सम्मत हैं।' },
          { qNumber: 'प्रश्न ३', awarded: 5.5, max: 6, remark: 'पद्य भावार्थ में गहन विचार सौंदर्य झलकता है।' },
          { qNumber: 'प्रश्न ४', awarded: 3.5, max: 4, remark: 'स्वमत अभिव्यक्ति में मौलिकता एवं तार्किक दृष्टिकोण प्रशंसनीय है।' }
        ];
        handwritingAdvice = 'हस्ताक्षर अत्यंत स्वच्छ एवं पठनीय है। उत्तरों के बीच में दो रेखाएं खींचने की परिपाटी बोर्ड परीक्षा में अतिरिक्त प्रभाव छोड़ेगी।';
        signedAt = 'अभी-अभी • अधिकृत राज्य मण्डल हस्ताक्षर एवं मुहर';
      } else if (subId === 'sanskrit') {
        overallRemark = 'अतीव प्रशंसनीयम् उत्तरपत्रम्! देवनागरीलिप्यां शुद्धलेखनं, व्याकरणनियमानां पालनं तथा अन्वयपूर्तिः सर्वथा प्रामाणिका वर्तते।';
        grade = 'ए+ (परमोत्कृष्टम्)';
        questionWiseMarks = [
          { qNumber: 'प्रश्न १', awarded: 4, max: 4, remark: 'सुगमसंस्कृतस्य सर्वे पर्यायाः शुद्धाः वर्तन्ते।' },
          { qNumber: 'प्रश्न २', awarded: 5.5, max: 6, remark: 'नामरूपाणि धातुरूपाणि तथा समासाः शतप्रतिशतं शुद्धाः।' },
          { qNumber: 'प्रश्न ३', awarded: 5.5, max: 6, remark: 'अन्वयपूर्तिः श्लोकसरलार्थश्च सम्यक् उल्लिखितः।' },
          { qNumber: 'प्रश्न ४', awarded: 3.5, max: 4, remark: 'माध्यमभाषया स्वविचारप्रकटनं उत्कृष्टं वर्तते।' }
        ];
        handwritingAdvice = 'देवनागरीलिप्यां शिरोरेखायाः सम्यक् प्रयोगः कृतः। एतादृशी सुस्पष्टा लेखनशैली बोर्डपरीक्षार्थिभ्यः आदर्शभूता अस्ति।';
        signedAt = 'अद्यैव • अधिकृत मण्डल-हस्ताक्षरम् मुद्रा च';
      }

      const newSubmission: TeacherAnswerSubmission = {
        id: newSubmissionId,
        paperId: activeUploadModal.id,
        subjectId: activeUploadModal.subjectId,
        chapterTitle: activeUploadModal.chapterTitle,
        setName: activeUploadModal.setName,
        studentName: 'Student (You)',
        submittedAt: 'Just now',
        pdfFileName: uploadFileName,
        fileSizeStr: uploadFileSize || '2.8 MB',
        status: 'evaluated',
        evaluation: {
          teacherName: activeUploadModal.assignedTeacher.name,
          teacherRole: activeUploadModal.assignedTeacher.role,
          marksAwarded: 18.5,
          totalMarks: 20,
          percentage: 92.5,
          grade,
          overallRemark,
          questionWiseMarks,
          handwritingPresentationAdvice: handwritingAdvice,
          signedAt
        }
      };

      setSubmissions(prev => [newSubmission, ...prev.filter(s => s.paperId !== activeUploadModal.id)]);
      setIsSubmittingUpload(false);
      setActiveUploadModal(null);
      setUploadFileName('');
      setStudentNote('');
      triggerToast(`🎉 Solved paper successfully uploaded and evaluated by ${activeUploadModal.assignedTeacher.name}!`);
    }, 1200);
  };

  // Find submission for paper
  const getSubmissionForPaper = (paperId: string) => {
    return submissions.find(s => s.paperId === paperId);
  };

  // =========================================================================
  // VIVA VOCE (MICROPHONE DICTATION) STATE
  // =========================================================================
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [currentVivaIndex, setCurrentVivaIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [vivaEvaluations, setVivaEvaluations] = useState<Record<string, {
    score: number;
    matchedKeywords: string[];
    missedKeywords: string[];
    feedback: string;
    evaluatedAt: string;
  }>>({});
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  const filteredVivaQuestions = allVivaQuestions.filter(v => {
    if (selectedSubjectFilter !== 'all' && v.subjectId !== selectedSubjectFilter) return false;
    return true;
  });
  const currentViva: VivaQuestionItem | undefined = filteredVivaQuestions[currentVivaIndex] || filteredVivaQuestions[0];

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      // Dynamically use language code
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
        setSpokenTranscript(finalTranscript.trim());
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleMic = () => {
    if (!recognitionRef.current) {
      triggerToast('Speech Recognition not supported in this browser. You can type your answer in the box.');
      return;
    }
    if (isRecording) {
      try {
        recognitionRef.current.stop();
        setIsRecording(false);
        triggerToast('🎙️ Microphone paused.');
      } catch (err) {
        setIsRecording(false);
      }
    } else {
      try {
        if (currentViva?.subjectId === 'mar') {
          recognitionRef.current.lang = 'mr-IN';
        } else if (currentViva?.subjectId === 'hin') {
          recognitionRef.current.lang = 'hi-IN';
        } else if (currentViva?.subjectId === 'sanskrit') {
          recognitionRef.current.lang = 'sa-IN';
        } else {
          recognitionRef.current.lang = 'en-IN';
        }
        recognitionRef.current.start();
        setIsRecording(true);
        const micToast = currentViva?.subjectId === 'mar'
          ? '🎙️ मायक्रोफोन सुरू झाला! स्क्रीनसमोर आपले उत्तर स्पष्ट बोला.'
          : currentViva?.subjectId === 'hin'
          ? '🎙️ माइक्रोफ़ोन सक्रिय! स्क्रीन के सामने अपना उत्तर स्पष्ट बोलें।'
          : currentViva?.subjectId === 'sanskrit'
          ? '🎙️ ध्वनिग्राहकं सक्रियम्! स्क्रीन-समक्षं स्वकीयम् उत्तरं स्पष्टं वदतु।'
          : '🎙️ Microphone ON! Speak your answer clearly in front of the screen.';
        triggerToast(micToast);
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  };

  const handleSpeakQuestion = (text: string) => {
    if (!('speechSynthesis' in window)) {
      triggerToast('Speech synthesis not supported in your browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    if (currentViva?.subjectId === 'mar') {
      utterance.lang = 'mr-IN';
    } else if (currentViva?.subjectId === 'hin') {
      utterance.lang = 'hi-IN';
    } else if (currentViva?.subjectId === 'sanskrit') {
      utterance.lang = 'sa-IN';
    } else {
      utterance.lang = 'en-IN';
    }
    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    utterance.onerror = () => setIsAiSpeaking(false);
    window.speechSynthesis.speak(utterance);
    const speakToast = currentViva?.subjectId === 'mar'
      ? '🔊 परीक्षक प्रश्न मोठ्याने वाचत आहेत...'
      : currentViva?.subjectId === 'hin'
      ? '🔊 परीक्षक प्रश्न बोलकर पढ़ रहे हैं...'
      : currentViva?.subjectId === 'sanskrit'
      ? '🔊 आचार्यः प्रश्नम् उच्चैः पठति...'
      : '🔊 Examiner is reading question aloud...';
    triggerToast(speakToast);
  };

  const handleEvaluateViva = () => {
    if (!currentViva) return;
    if (!spokenTranscript.trim()) {
      triggerToast('⚠️ Please dictate or type your answer before evaluating!');
      return;
    }

    const transcriptLower = spokenTranscript.toLowerCase();
    const matched: string[] = [];
    const missed: string[] = [];

    currentViva.expectedKeywords.forEach(kw => {
      if (transcriptLower.includes(kw.toLowerCase())) {
        matched.push(kw);
      } else {
        missed.push(kw);
      }
    });

    const matchRatio = matched.length / currentViva.expectedKeywords.length;
    let score = Math.round(matchRatio * currentViva.marks);
    if (score === 0 && spokenTranscript.length > 20) score = 1;

    let feedback = '';
    if (currentViva.subjectId === 'mar') {
      if (matchRatio >= 0.8) {
        feedback = '🌟 उत्कृष्ट मौखिक सादरीकरण! संकल्पना, शुद्ध उच्चार आणि महत्त्वाच्या साहित्य/व्याकरण शब्दांचा अचूक वापर केला आहे.';
      } else if (matchRatio >= 0.5) {
        feedback = '👍 उत्तम प्रयत्न! मूलभूत विचार मांडला आहे, पण काही महत्त्वाचे संदर्भ व शब्द राहून गेले आहेत.';
      } else {
        feedback = '📖 अधिक सरावाची आवश्यकता आहे. खाली दिलेल्या अपेक्षित शब्दांचा समावेश करून पुन्हा बोलण्याचा सराव करा.';
      }
    } else if (currentViva.subjectId === 'hin') {
      if (matchRatio >= 0.8) {
        feedback = '🌟 अति उत्तम मौखिक प्रस्तुति! आपने सटीक शब्दावली, शुद्ध उच्चारण एवं विचार सौंदर्य का सुंदर समन्वय किया है।';
      } else if (matchRatio >= 0.5) {
        feedback = '👍 सराहनीय प्रयास! मुख्य भाव स्पष्ट है, किंतु कुछ मानक साहित्यिक शब्दों का समावेश अपेक्षित है।';
      } else {
        feedback = '📖 पुनरावृत्ति की आवश्यकता है। नीचे दिए गए अपेक्षित शब्दों के साथ पुनः बोलकर अभ्यास कीजिए।';
      }
    } else if (currentViva.subjectId === 'sanskrit') {
      if (matchRatio >= 0.8) {
        feedback = '🌟 अतीव उत्कृष्टं मौखिक-प्रकटनम्! शुद्धसंस्कृतस्य, व्याकरणनियमानां तथा मुख्यशब्दानां सम्यक् प्रयोगः कृतः।';
      } else if (matchRatio >= 0.5) {
        feedback = '👍 प्रशंसनीयः प्रयासः! मूलभावः स्पष्टः, किन्तु केचन मुख्याः शब्दाः अवशिष्टाः।';
      } else {
        feedback = '📖 पुनरभ्यासः आवश्यकः। अधोनिर्दिष्टानां मुख्यशब्दानां प्रयोगं कृत्वा पुनः वदत।';
      }
    } else {
      if (matchRatio >= 0.8) {
        feedback = '🌟 Outstanding Viva Performance! You demonstrated mastery of scientific terms and conceptual clarity.';
      } else if (matchRatio >= 0.5) {
        feedback = '👍 Good Effort! You explained the core logic well, but missed a few technical board terms.';
      } else {
        feedback = '📖 Needs Revision. Practice dictating with the required keywords listed below.';
      }
    }

    setVivaEvaluations(prev => ({
      ...prev,
      [currentViva.id]: {
        score,
        matchedKeywords: matched,
        missedKeywords: missed,
        feedback,
        evaluatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    }));
    triggerToast(`🎯 Viva Evaluated! Score: ${score}/${currentViva.marks}`);
  };

  // =========================================================================
  // MOCK TESTS STATE
  // =========================================================================
  const [activeMockTest, setActiveMockTest] = useState<MockTestItem>(() => allMockTests[0] || MOCK_TESTS_LIST[0]);
  const [mockUserAnswers, setMockUserAnswers] = useState<Record<string, number>>({});
  const [mockTimeRemaining, setMockTimeRemaining] = useState<number>(() => (allMockTests[0]?.durationMinutes || 45) * 60);
  const [isMockRunning, setIsMockRunning] = useState<boolean>(false);
  const [isMockSubmitted, setIsMockSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (allMockTests.length > 0 && (!activeMockTest || !allMockTests.some(t => t.id === activeMockTest.id))) {
      setActiveMockTest(allMockTests[0]);
      setMockTimeRemaining((allMockTests[0].durationMinutes || 45) * 60);
    }
  }, [allMockTests, activeMockTest]);

  useEffect(() => {
    let interval: any = null;
    if (isMockRunning && mockTimeRemaining > 0 && !isMockSubmitted) {
      interval = setInterval(() => setMockTimeRemaining(prev => prev - 1), 1000);
    } else if (mockTimeRemaining === 0 && !isMockSubmitted && isMockRunning) {
      setIsMockSubmitted(true);
      setIsMockRunning(false);
      triggerToast('⏰ Time Up! Mock test submitted.');
    }
    return () => clearInterval(interval);
  }, [isMockRunning, mockTimeRemaining, isMockSubmitted]);

  const startMockTest = (test: MockTestItem) => {
    setActiveMockTest(test);
    setMockUserAnswers({});
    setMockTimeRemaining(test.durationMinutes * 60);
    setIsMockRunning(true);
    setIsMockSubmitted(false);
    triggerToast(`⏱️ Mock Test Started: ${test.testTitle}.`);
  };

  const submitMockTest = () => {
    setIsMockSubmitted(true);
    setIsMockRunning(false);
    let correctCount = 0;
    (activeMockTest.questions || []).forEach(q => {
      if (mockUserAnswers[q.id] === q.correctIndex) correctCount++;
    });
    triggerToast(`🎉 Test Submitted! Score: ${correctCount} / ${activeMockTest.totalQuestions || 20}`);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Full Board Question Papers state
  const [selectedPaper, setSelectedPaper] = useState<BoardQuestionPaperItem>(() => allBoardPapers[0] || BOARD_QUESTION_PAPERS_LIST[0]);
  const [showAnswerKeys, setShowAnswerKeys] = useState<boolean>(false);

  useEffect(() => {
    if (allBoardPapers.length > 0 && (!selectedPaper || !allBoardPapers.some(p => p.id === selectedPaper.id))) {
      setSelectedPaper(allBoardPapers[0]);
    }
  }, [allBoardPapers, selectedPaper]);

  return (
    <div className="text-left space-y-7 animate-fade-in">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-800 font-serif font-bold">
              Assessment & Examination Desk
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              20 Marks Chapter Papers
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-1">
            Test, Quiz & Viva Examination Room
          </h2>
          <p className="text-xs md:text-sm text-stone-600 font-sans mt-1">
            Solve <strong>20-mark chapter mock papers (Set A, Set B, Set C)</strong>, upload your answered PDF for teacher grading, and practice live viva voce dictation.
          </p>
        </div>

        {/* Quick Highlights Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-mono font-bold text-stone-800 shadow-2xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Teacher Evaluated Papers</span>
          </span>
        </div>
      </div>

      {/* 2. SUB-TAB SELECTOR (CHAPTER MOCK PAPERS, VIVA VOCE, FULL PAPERS, TIMED MOCKS) */}
      <div className="bg-stone-100 p-1.5 rounded-2xl border border-stone-300 flex flex-wrap items-center gap-2 max-w-3xl">
        <button
          onClick={() => setActiveSessionTab('chapter_mocks')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSessionTab === 'chapter_mocks'
              ? 'bg-[#1C1917] text-amber-200 shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <FileCheck className={`w-4 h-4 ${activeSessionTab === 'chapter_mocks' ? 'text-amber-400' : 'text-stone-400'}`} />
          <span>📄 20-Mark Chapter Papers</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-amber-400/20 text-amber-900 font-bold border border-amber-400/30">
            Sets A, B, C
          </span>
        </button>

        <button
          onClick={() => setActiveSessionTab('viva')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSessionTab === 'viva'
              ? 'bg-[#1C1917] text-amber-200 shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Mic className={`w-4 h-4 ${activeSessionTab === 'viva' ? 'text-amber-400' : 'text-stone-400'}`} />
          <span>🎙️ Viva Voce (Oral Test)</span>
        </button>

        <button
          onClick={() => setActiveSessionTab('papers')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSessionTab === 'papers'
              ? 'bg-[#1C1917] text-amber-200 shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <FileText className={`w-4 h-4 ${activeSessionTab === 'papers' ? 'text-amber-400' : 'text-stone-400'}`} />
          <span>📝 Full Board Papers</span>
        </button>

        <button
          onClick={() => setActiveSessionTab('mock')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSessionTab === 'mock'
              ? 'bg-[#1C1917] text-amber-200 shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Clock className={`w-4 h-4 ${activeSessionTab === 'mock' ? 'text-amber-400' : 'text-stone-400'}`} />
          <span>⏱️ Timed Mock</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: CHAPTER-WISE 20-MARK MOCK PAPERS (SET A, SET B, SET C)
          ========================================================================= */}
      {activeSessionTab === 'chapter_mocks' && (
        <div className="space-y-6">
          
          {/* Controls: Subject & Chapter Selectors */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Subject Selector Pills (All 10 Subjects) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-mono text-stone-500 font-semibold shrink-0">Subject:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {mockSubjectOptions.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectMockSubject(sub.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedMockSubject === sub.id
                        ? 'bg-[#1C1917] text-amber-200 shadow-2xs'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter Selector Dropdown (All Chapters) */}
            <div className="flex items-center gap-2 text-xs shrink-0">
              <span className="text-stone-500 font-mono">Chapter:</span>
              <select
                value={selectedMockChapter}
                onChange={(e) => setSelectedMockChapter(e.target.value)}
                className="bg-stone-50 border border-stone-300 text-stone-800 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-600 font-serif font-bold cursor-pointer max-w-xs sm:max-w-md"
              >
                {availableChaptersForSubject.map((ch, idx) => {
                  let chLabel = `Chapter ${idx + 1}: ${ch} (3 Sets: A, B, C)`;
                  if (selectedMockSubject === 'mar') {
                    chLabel = `पाठ ${idx + 1}: ${ch} (३ संच: संच 'अ', संच 'ब', संच 'क')`;
                  } else if (selectedMockSubject === 'hin') {
                    chLabel = `पाठ ${idx + 1}: ${ch} (३ सेट: सेट 'अ', सेट 'ब', सेट 'क')`;
                  } else if (selectedMockSubject === 'sanskrit') {
                    chLabel = `पाठः ${idx + 1}: ${ch} (३ संचाः: संचः 'अ', संचः 'ब', संचः 'क')`;
                  }
                  return (
                    <option key={idx} value={ch}>
                      {chLabel}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Intro Banner for the 20 Marks Unit Papers */}
          <div className="bg-gradient-to-r from-amber-50/80 via-stone-50 to-amber-100/40 border-2 border-amber-300/80 rounded-3xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif font-bold text-base md:text-lg text-stone-900">
                  {selectedMockSubject === 'mar'
                    ? `${selectedMockChapter} — २० गुण सराव प्रश्नपत्रिका`
                    : selectedMockSubject === 'hin'
                    ? `${selectedMockChapter} — २० अंक अभ्यास प्रश्नपत्र`
                    : selectedMockSubject === 'sanskrit'
                    ? `${selectedMockChapter} — २० अंकाः सराव-प्रश्नपत्राणि`
                    : `${selectedMockChapter} — 20 Marks Mock Test Papers`}
                </h3>
              </div>
              <p className="text-xs text-stone-600 font-sans max-w-2xl leading-relaxed">
                {selectedMockSubject === 'mar' ? (
                  <>प्रत्येक पाठासाठी <strong>३ स्वतंत्र २० गुणांचे संच (संच 'अ', संच 'ब', संच 'क')</strong> महाराष्ट्र राज्य माध्यमिक शिक्षण मंडळाच्या अधिकृत आराखड्यानुसार तयार केलेले आहेत. उत्तरपत्रिकेत उत्तरे लिहा, पीडीएफ अपलोड करा आणि शिक्षकांकडून तपासणी व गुण मिळवा!</>
                ) : selectedMockSubject === 'hin' ? (
                  <>प्रत्येक पाठ हेतु <strong>३ अलग-अलग २० अंकों के सेट (सेट 'अ', सेट 'ब', सेट 'क')</strong> महाराष्ट्र राज्य शिक्षा मंडल के ब्लूप्रिंट पर आधारित हैं। उत्तरपुस्तिका में लिखें, हल की गई पीडीएफ अपलोड करें एवं शिक्षकों द्वारा मूल्यांकन प्राप्त करें!</>
                ) : selectedMockSubject === 'sanskrit' ? (
                  <>प्रत्येकपाठाय <strong>३ पृथक् २० अंकात्मकाः संचाः (संचः 'अ', संचः 'ब', संचः 'क')</strong> महाराष्ट्र-राज्य-माध्यमिक-मण्डलस्य प्रारूपानुसारं निर्मिताः सन्ति। उत्तरपत्रिकायां लिखत, पीडीएफ् सञ्चिकां प्रेषयतु, आचार्येभ्यः मूल्याङ्कनं च प्राप्नुवन्तु!</>
                ) : (
                  <>Every chapter contains <strong>3 distinct 20-mark sets (Set A, Set B, Set C)</strong> designed on the official Maharashtra SSC Board Unit Test blueprint. Solve on notebook, upload the answered PDF, and receive teacher-marked grades!</>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-white border border-amber-300 px-3 py-2 rounded-xl text-center shadow-2xs">
                <span className="text-[10px] font-mono uppercase text-stone-500 block">
                  {selectedMockSubject === 'mar' ? 'एकूण गुण' : selectedMockSubject === 'hin' ? 'कुल अंक' : selectedMockSubject === 'sanskrit' ? 'आहत्य अंकाः' : 'Total Marks'}
                </span>
                <span className="text-sm font-bold font-serif text-amber-900">
                  {selectedMockSubject === 'mar' ? '२० गुण' : selectedMockSubject === 'hin' ? '२० अंक' : selectedMockSubject === 'sanskrit' ? '२० अंकाः' : '20 Marks Each'}
                </span>
              </div>
              <div className="bg-white border border-amber-300 px-3 py-2 rounded-xl text-center shadow-2xs">
                <span className="text-[10px] font-mono uppercase text-stone-500 block">
                  {selectedMockSubject === 'mar' ? 'वेळ' : selectedMockSubject === 'hin' ? 'समय' : selectedMockSubject === 'sanskrit' ? 'समयः' : 'Time Duration'}
                </span>
                <span className="text-sm font-bold font-serif text-amber-900">
                  {selectedMockSubject === 'mar' ? '४५ मिनिटे' : selectedMockSubject === 'hin' ? '४५ मिनट' : selectedMockSubject === 'sanskrit' ? '४५ निमेषाः' : '45 Minutes'}
                </span>
              </div>
            </div>
          </div>

          {/* Cards for Set A, Set B, Set C */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {currentChapterPapers.map(paper => {
              const submission = getSubmissionForPaper(paper.id);
              const isEvaluated = submission && submission.status === 'evaluated';

              return (
                <div
                  key={paper.id}
                  className="bg-white border-2 border-stone-850 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#1C1917] text-amber-200">
                        {getLocalizedSetName(paper.subjectId, paper.setName)}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {getLocalizedMetaStr(paper.subjectId)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                        {paper.difficulty}
                      </span>
                      <h4 className="font-serif font-bold text-stone-900 text-base leading-snug mt-0.5">
                        {paper.chapterTitle} ({getLocalizedSetName(paper.subjectId, paper.setName)})
                      </h4>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">
                        {paper.subjectId === 'mar' ? 'घटक भर:' : paper.subjectId === 'hin' ? 'मुख्य केंद्र:' : paper.subjectId === 'sanskrit' ? 'मुख्यविषयः:' : 'Focus:'} {paper.setFocus}
                      </p>
                    </div>

                    {/* Assigned Teacher Box */}
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-stone-900 text-amber-200 flex items-center justify-center font-serif font-bold text-xs shrink-0">
                        {paper.assignedTeacher.avatarInitials}
                      </div>
                      <div className="text-xs">
                        <span className="text-[10px] font-mono text-stone-500 block uppercase">
                          {getLocalizedEvaluatorLabel(paper.subjectId)}
                        </span>
                        <strong className="text-stone-900 font-serif block">{paper.assignedTeacher.name}</strong>
                        <span className="text-[10px] text-stone-500 line-clamp-1">{paper.assignedTeacher.role}</span>
                      </div>
                    </div>

                    {/* Question Blueprint Breakdown */}
                    <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-3 space-y-1.5 text-xs text-stone-700 font-sans">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">
                        {getLocalizedStructureTitle(paper.subjectId)}
                      </span>
                      <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between">
                          <span>{paper.subjectId === 'mar' ? 'विभाग १: आकलन व बहुपर्यायी' : paper.subjectId === 'hin' ? 'विभाग १: आकलन एवं वस्तुनिष्ठ' : paper.subjectId === 'sanskrit' ? 'विभागः १: सुगमसंस्कृतम्' : 'Q.1 Objectives & MCQs'}</span>
                          <strong className="font-mono">{paper.subjectId === 'mar' ? '४ गुण' : paper.subjectId === 'hin' ? '४ अंक' : paper.subjectId === 'sanskrit' ? '४ अंकाः' : '4 Marks'}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>{paper.subjectId === 'mar' ? 'विभाग २: व्याकरण व भाषाभ्यास' : paper.subjectId === 'hin' ? 'विभाग २: व्याकरण एवं भाषा अध्ययन' : paper.subjectId === 'sanskrit' ? 'विभागः २: व्याकरणम्' : 'Q.2 Give Reasons & Concepts'}</span>
                          <strong className="font-mono">{paper.subjectId === 'mar' ? '६ गुण' : paper.subjectId === 'hin' ? '६ अंक' : paper.subjectId === 'sanskrit' ? '६ अंकाः' : '6 Marks'}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>{paper.subjectId === 'mar' ? 'विभाग ३: काव्यसौंदर्य व भावार्थ' : paper.subjectId === 'hin' ? 'विभाग ३: पद्य भावार्थ व विचार' : paper.subjectId === 'sanskrit' ? 'विभागः ३: पद्यम् अन्वयपूर्तिः' : 'Q.3 Derivation / Proof / Diagram'}</span>
                          <strong className="font-mono">{paper.subjectId === 'mar' ? '६ गुण' : paper.subjectId === 'hin' ? '६ अंक' : paper.subjectId === 'sanskrit' ? '६ अंकाः' : '6 Marks'}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>{paper.subjectId === 'mar' ? 'विभाग ४: स्वमत व अभिव्यक्ती' : paper.subjectId === 'hin' ? 'विभाग ४: स्वमत अभिव्यक्ति' : paper.subjectId === 'sanskrit' ? 'विभागः ४: माध्यमभाषया स्वमतम्' : 'Q.4 HOTS Board Challenge'}</span>
                          <strong className="font-mono">{paper.subjectId === 'mar' ? '४ गुण' : paper.subjectId === 'hin' ? '४ अंक' : paper.subjectId === 'sanskrit' ? '४ अंकाः' : '4 Marks'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Submission / Evaluation Status Pill */}
                    {submission && (
                      <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs bg-emerald-50 border-emerald-300 text-emerald-900 font-mono">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Graded: {submission.evaluation?.marksAwarded} / 20</span>
                        </span>
                        <span className="text-[10px] underline cursor-pointer" onClick={() => setActiveEvaluationModal(submission)}>
                          View Teacher Sheet
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActivePaperViewModal(paper)}
                        className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-stone-300"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{getLocalizedViewPaper(paper.subjectId)}</span>
                      </button>

                      <button
                        onClick={() => triggerToast(`Downloaded ${paper.chapterTitle} ${getLocalizedSetName(paper.subjectId, paper.setName)} 20-Mark Question Paper PDF!`)}
                        className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-all cursor-pointer border border-stone-300"
                        title="Download Question Paper PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Upload Solved Paper or View Evaluation */}
                    {submission ? (
                      <button
                        onClick={() => setActiveEvaluationModal(submission)}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-300" />
                        <span>View Teacher Evaluated Sheet ({submission.evaluation?.marksAwarded}/20)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveUploadModal(paper)}
                        className="w-full py-2.5 bg-[#1C1917] hover:bg-stone-850 text-amber-200 hover:text-white rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                        <span>{getLocalizedUploadBtn(paper.subjectId)}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submissions History Tray */}
          {submissions.length > 0 && (
            <div className="bg-white border-2 border-stone-850 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Your Solved Papers & Teacher Evaluation Reports ({submissions.length})
                  </h4>
                </div>
                <span className="text-xs font-mono text-stone-500">
                  Reviewed by State Board Faculty
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {submissions.map(sub => (
                  <div key={sub.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1C1917] text-amber-200">
                          {sub.chapterTitle} ({sub.setName})
                        </span>
                        <span className="text-xs font-mono text-stone-500">
                          Submitted: {sub.submittedAt}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-stone-700 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-stone-400" />
                        <span>File: <strong>{sub.pdfFileName}</strong> ({sub.fileSizeStr})</span>
                        <span>•</span>
                        <span>Evaluator: <strong>{sub.evaluation?.teacherName}</strong></span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg">
                          Score: {sub.evaluation?.marksAwarded} / {sub.evaluation?.totalMarks} ({sub.evaluation?.grade})
                        </span>
                      </div>

                      <button
                        onClick={() => setActiveEvaluationModal(sub)}
                        className="px-3.5 py-2 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Read Remarks</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          TAB 2: VIVA VOCE (MICROPHONE DICTATION TEST)
          ========================================================================= */}
      {activeSessionTab === 'viva' && currentViva && (
        <div className="space-y-6">
          
          {/* Subject Filter Bar for Viva */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-xs font-mono text-stone-500 font-semibold mr-1">Subject:</span>
              {[
                { id: 'all', label: 'All Subjects' },
                { id: 'sci1', label: 'Science 1' },
                { id: 'sci2', label: 'Science 2' },
                { id: 'math1', label: 'Maths 1' },
                { id: 'math2', label: 'Maths 2' },
                { id: 'eng', label: 'English' },
                { id: 'hist', label: 'History' },
                { id: 'geo', label: 'Geography' },
                { id: 'mar', label: 'मराठी' },
                { id: 'hin', label: 'हिन्दी' },
                { id: 'sanskrit', label: 'संस्कृतम्' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectFilter(sub.id);
                    setCurrentVivaIndex(0);
                    setSpokenTranscript('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    selectedSubjectFilter === sub.id
                      ? 'bg-stone-900 text-amber-200 shadow-2xs'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Question Navigator */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                disabled={currentVivaIndex === 0}
                onClick={() => {
                  setCurrentVivaIndex(prev => prev - 1);
                  setSpokenTranscript('');
                }}
                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>Question {currentVivaIndex + 1} of {filteredVivaQuestions.length}</span>
              <button
                disabled={currentVivaIndex >= filteredVivaQuestions.length - 1}
                onClick={() => {
                  setCurrentVivaIndex(prev => prev + 1);
                  setSpokenTranscript('');
                }}
                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Viva Arena */}
          <div className="bg-gradient-to-br from-[#1C1917] via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-600/30 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 relative z-10 border-b border-white/10 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase bg-amber-500 text-stone-950">
                    Viva Question #{currentViva.questionNumber}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/10 text-amber-200 border border-white/10">
                    {currentViva.subjectTitle} • {currentViva.chapterTitle}
                  </span>
                </div>

                <span className="text-xs font-mono text-amber-300">
                  Weightage: {currentViva.marks} Oral Marks
                </span>
              </div>

              {/* Examiner's Question Box */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      AI Board Examiner Question:
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white mt-1 leading-snug">
                      "{currentViva.questionText}"
                    </h3>
                  </div>

                  <button
                    onClick={() => handleSpeakQuestion(currentViva.examinerPrompt)}
                    className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-1.5 text-xs font-bold font-serif"
                    title="Listen to examiner"
                  >
                    <Volume2 className={`w-4 h-4 ${isAiSpeaking ? 'animate-bounce' : ''}`} />
                    <span className="hidden sm:inline">{isAiSpeaking ? 'Speaking...' : 'Listen'}</span>
                  </button>
                </div>

                <div className="text-xs text-stone-300 font-sans flex items-center gap-2 pt-1 border-t border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Evaluation criteria: {currentViva.evaluationCriteria}</span>
                </div>
              </div>
            </div>

            {/* Microphone Dictation & Spoken Wave Area */}
            <div className="space-y-4 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-3.5 h-3.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-stone-500'}`} />
                  <span className="font-serif font-bold text-sm text-stone-200">
                    {isRecording 
                      ? (currentViva?.subjectId === 'mar'
                          ? '🔴 ऐकत आहे... आपले उत्तर स्पष्ट बोला!'
                          : currentViva?.subjectId === 'hin'
                          ? '🔴 सुन रहा हूँ... उत्तर स्पष्ट बोलिए!'
                          : currentViva?.subjectId === 'sanskrit'
                          ? '🔴 शृणोति... उत्तरं स्पष्टं वदत!'
                          : '🔴 Listening... Dictate your answer now!')
                      : (currentViva?.subjectId === 'mar'
                          ? 'मायक्रोफोन सज्ज आहे'
                          : currentViva?.subjectId === 'hin'
                          ? 'माइक्रोफ़ोन तैयार है'
                          : currentViva?.subjectId === 'sanskrit'
                          ? 'ध्वनिग्राहकं सज्जम्'
                          : 'Microphone Ready')}
                  </span>
                </div>

                <button
                  onClick={handleToggleMic}
                  className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2.5 shadow-lg cursor-pointer active:scale-95 ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse shadow-red-900/50' 
                      : 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-amber-500/20'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>
                    {isRecording 
                      ? (currentViva?.subjectId === 'mar'
                          ? 'रेकॉर्डिंग थांबवा'
                          : currentViva?.subjectId === 'hin'
                          ? 'रिकॉर्डिंग रोकें'
                          : currentViva?.subjectId === 'sanskrit'
                          ? 'विरामयतु'
                          : 'Stop Recording')
                      : (currentViva?.subjectId === 'mar'
                          ? '🎙️ मायक्रोफोन सुरू करा व बोला'
                          : currentViva?.subjectId === 'hin'
                          ? '🎙️ माइक्रोफ़ोन चालू करें एवं बोलें'
                          : currentViva?.subjectId === 'sanskrit'
                          ? '🎙️ ध्वनिग्राहकं सक्रियं कुरुत'
                          : '🎙️ Turn ON Microphone & Dictate')}
                  </span>
                </button>
              </div>

              {/* Dictated Speech Transcript Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                  <span>
                    {currentViva?.subjectId === 'mar'
                      ? 'तुमचे उच्चारलेले उत्तर (ध्वनी-ते-मजकूर):'
                      : currentViva?.subjectId === 'hin'
                      ? 'आपका उच्चारित उत्तर (ध्वनि से पाठ):'
                      : currentViva?.subjectId === 'sanskrit'
                      ? 'भवताम् उच्चारितम् उत्तरम्:'
                      : 'Your Spoken Answer (Speech-to-Text):'}
                  </span>
                  <span>
                    {currentViva?.subjectId === 'mar'
                      ? `${spokenTranscript.split(' ').filter(Boolean).length} शब्द उच्चारले`
                      : currentViva?.subjectId === 'hin'
                      ? `${spokenTranscript.split(' ').filter(Boolean).length} शब्द उच्चारित`
                      : currentViva?.subjectId === 'sanskrit'
                      ? `${spokenTranscript.split(' ').filter(Boolean).length} शब्दाः`
                      : `${spokenTranscript.split(' ').filter(Boolean).length} words dictated`}
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={spokenTranscript}
                  onChange={(e) => setSpokenTranscript(e.target.value)}
                  placeholder={
                    currentViva?.subjectId === 'mar'
                      ? 'मायक्रोफोन चालू करा आणि स्क्रीनसमोर मोठ्याने आपले उत्तर बोला. तुमचा आवाज येथे आपोआप टाइप होईल, किंवा तुम्ही स्वतः लिहू शकता...'
                      : currentViva?.subjectId === 'hin'
                      ? 'माइक्रोफ़ोन चालू करें और स्क्रीन के सामने अपना उत्तर बोलें। आपकी आवाज़ यहाँ स्वतः टाइप होगी, अथवा आप स्वयं लिख सकते हैं...'
                      : currentViva?.subjectId === 'sanskrit'
                      ? 'ध्वनिग्राहकं चालू कुरुत स्क्रीन-समक्षम् उच्चैः वदत च। भवतां ध्वनिः अत्रैव टङ्कितः भविष्यति...'
                      : 'Turn on the microphone and speak your answer out loud. Your voice will automatically transcribe here, or you can edit/type manually...'
                  }
                  className="w-full bg-black/50 border border-white/15 focus:border-amber-400 rounded-2xl p-4 text-xs sm:text-sm text-stone-100 font-sans focus:outline-none placeholder-stone-500 leading-relaxed shadow-inner"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setSpokenTranscript('')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-stone-300 rounded-xl text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>
                    {currentViva?.subjectId === 'mar'
                      ? 'मजकूर पुसा'
                      : currentViva?.subjectId === 'hin'
                      ? 'उत्तर हटाएं'
                      : currentViva?.subjectId === 'sanskrit'
                      ? 'मार्जतु'
                      : 'Clear Transcript'}
                  </span>
                </button>

                <button
                  onClick={handleEvaluateViva}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {currentViva?.subjectId === 'mar'
                      ? 'माझ्या उत्तराचे मूल्यांकन करा'
                      : currentViva?.subjectId === 'hin'
                      ? 'मेरे उत्तर का मूल्यांकन करें'
                      : currentViva?.subjectId === 'sanskrit'
                      ? 'मम उत्तरस्य मूल्याङ्कनं कुरुत'
                      : 'Evaluate My Viva Answer'}
                  </span>
                </button>
              </div>
            </div>

            {/* AI Evaluator Feedback */}
            {vivaEvaluations[currentViva.id] && (
              <div className="bg-stone-950/90 border-2 border-amber-500/40 rounded-2xl p-5 space-y-4 animate-fade-in relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <h4 className="font-serif font-bold text-base text-white">
                      {currentViva.subjectId === 'mar'
                        ? 'परीक्षक मूल्यांकन व मार्गदर्शन'
                        : currentViva.subjectId === 'hin'
                        ? 'परीक्षक मूल्यांकन एवं मार्गदर्शन'
                        : currentViva.subjectId === 'sanskrit'
                        ? 'परीक्षक-मूल्याङ्कनम् तथा परामर्शः'
                        : 'Examiner Assessment & Feedback'}
                    </h4>
                  </div>

                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-amber-400 text-stone-950 shadow-sm">
                    {currentViva.subjectId === 'mar'
                      ? `प्राप्त गुण: ${vivaEvaluations[currentViva.id].score} / ${currentViva.marks} गुण`
                      : currentViva.subjectId === 'hin'
                      ? `प्राप्त अंक: ${vivaEvaluations[currentViva.id].score} / ${currentViva.marks} अंक`
                      : currentViva.subjectId === 'sanskrit'
                      ? `प्राप्ताङ्काः: ${vivaEvaluations[currentViva.id].score} / ${currentViva.marks} अंकाः`
                      : `Score: ${vivaEvaluations[currentViva.id].score} / ${currentViva.marks} Marks`}
                  </span>
                </div>

                <p className="text-xs text-amber-200 font-sans leading-relaxed">
                  {vivaEvaluations[currentViva.id].feedback}
                </p>

                {/* Key Terminology Check */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                    {currentViva.subjectId === 'mar'
                      ? 'महत्त्वपूर्ण संकल्पना व शब्दावली पडताळणी:'
                      : currentViva.subjectId === 'hin'
                      ? 'महत्वपूर्ण शब्दावली एवं संकल्पना जांच:'
                      : currentViva.subjectId === 'sanskrit'
                      ? 'पारिभाषिक-शब्दावली-परीक्षणम्:'
                      : 'Technical Terminology Check:'}
                  </span>
                  
                  <div className="flex flex-wrap gap-2 text-xs">
                    {vivaEvaluations[currentViva.id].matchedKeywords.map((kw, kIdx) => (
                      <span key={kIdx} className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{kw}</span>
                      </span>
                    ))}
                    {vivaEvaluations[currentViva.id].missedKeywords.map((kw, kIdx) => (
                      <span key={kIdx} className="bg-red-950/60 text-red-300 border border-red-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono">
                        <XCircle className="w-3 h-3 text-red-400" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Model Answer */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block font-semibold">
                    {currentViva.subjectId === 'mar'
                      ? 'आदर्श बोर्ड मौखिक उत्तर:'
                      : currentViva.subjectId === 'hin'
                      ? 'आदर्श बोर्ड मौखिक उत्तर:'
                      : currentViva.subjectId === 'sanskrit'
                      ? 'आदर्श-बोर्ड-मौखिक-उत्तरम्:'
                      : 'Ideal Board Model Answer:'}
                  </span>
                  <p className="text-stone-300 font-sans leading-relaxed">
                    {currentViva.modelAnswer}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: FULL BOARD QUESTION PAPERS
          ========================================================================= */}
      {activeSessionTab === 'papers' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-mono text-stone-500 font-semibold mr-1">Select Paper:</span>
              {BOARD_QUESTION_PAPERS_LIST.map(paper => (
                <button
                  key={paper.id}
                  onClick={() => {
                    setSelectedPaper(paper);
                    setShowAnswerKeys(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedPaper.id === paper.id
                      ? 'bg-[#1C1917] text-amber-200 shadow-2xs'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <span>{paper.subjectTitle}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAnswerKeys(!showAnswerKeys)}
                className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  showAnswerKeys 
                    ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {selectedPaper.subjectId === 'mar'
                    ? (showAnswerKeys ? 'आदर्श उत्तरे लपवा' : 'आदर्श उत्तरपत्रिका व गुणदान योजना पहा')
                    : selectedPaper.subjectId === 'hin'
                    ? (showAnswerKeys ? 'आदर्श उत्तर छिपाएं' : 'आदर्श उत्तर एवं अंक योजना देखें')
                    : selectedPaper.subjectId === 'sanskrit'
                    ? (showAnswerKeys ? 'उत्तराणि गोपयतु' : 'आदर्श-उत्तरपत्रिकां पश्यतु')
                    : (showAnswerKeys ? 'Hide Model Answers' : 'Show Model Answer Scheme')}
                </span>
              </button>

              <button
                onClick={() => triggerToast(
                  selectedPaper.subjectId === 'mar'
                    ? `${selectedPaper.paperTitle} डाऊनलोड झाली!`
                    : selectedPaper.subjectId === 'hin'
                    ? `${selectedPaper.paperTitle} डाउनलोड हो गया!`
                    : selectedPaper.subjectId === 'sanskrit'
                    ? `${selectedPaper.paperTitle} डाउनलोड अभवत्!`
                    : `Downloaded ${selectedPaper.paperTitle} PDF!`
                )}
                className="px-3.5 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-200 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {selectedPaper.subjectId === 'mar'
                    ? 'प्रश्नपत्रिका डाऊनलोड (PDF)'
                    : selectedPaper.subjectId === 'hin'
                    ? 'प्रश्नपत्र डाउनलोड (PDF)'
                    : selectedPaper.subjectId === 'sanskrit'
                    ? 'प्रश्नपत्रिकां डाउनलोड करोतु (PDF)'
                    : 'Download Paper PDF'}
                </span>
              </button>
            </div>
          </div>

          {/* Full Paper View */}
          <div className="bg-white border-2 border-stone-850 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b-2 border-stone-850 pb-5 text-center space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold block">
                {getLocalizedBoardHeader(selectedPaper.subjectId)}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                {selectedPaper.paperTitle}
              </h2>
              <div className="flex items-center justify-center gap-4 text-xs font-mono text-stone-600 pt-1">
                <span>
                  {selectedPaper.subjectId === 'mar'
                    ? `वेळ: ${selectedPaper.duration}`
                    : selectedPaper.subjectId === 'hin'
                    ? `समय: ${selectedPaper.duration}`
                    : selectedPaper.subjectId === 'sanskrit'
                    ? `समयः: ${selectedPaper.duration}`
                    : `Time: ${selectedPaper.duration}`}
                </span>
                <span>•</span>
                <span>
                  {selectedPaper.subjectId === 'mar'
                    ? `एकूण गुण: ${selectedPaper.totalMarks} गुण`
                    : selectedPaper.subjectId === 'hin'
                    ? `कुल अंक: ${selectedPaper.totalMarks} अंक`
                    : selectedPaper.subjectId === 'sanskrit'
                    ? `आहत्य अंकाः: ${selectedPaper.totalMarks} अंकाः`
                    : `Marks: ${selectedPaper.totalMarks} Marks`}
                </span>
              </div>
            </div>

            <div className="space-y-6 divide-y divide-stone-200">
              {selectedPaper.sections.map((section, sIdx) => (
                <div key={sIdx} className="pt-6 first:pt-0 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                      {section.sectionTitle}
                    </h3>
                    <span className="text-xs font-mono text-amber-800 font-bold">
                      [{section.sectionMarks} {selectedPaper.subjectId === 'mar' ? 'गुण' : selectedPaper.subjectId === 'hin' ? 'अंक' : selectedPaper.subjectId === 'sanskrit' ? 'अंकाः' : 'Marks'}]
                    </span>
                  </div>

                  <div className="space-y-4">
                    {section.questions.map((q, qIdx) => (
                      <div key={qIdx} className="bg-stone-50/60 border border-stone-200 rounded-2xl p-4 space-y-2.5">
                        <div className="flex items-start justify-between gap-3 text-xs sm:text-sm font-serif">
                          <strong className="text-stone-900 leading-snug">
                            {q.qNumber}: {q.questionText}
                          </strong>
                          <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-mono font-bold shrink-0 text-xs">
                            [{q.marks} {selectedPaper.subjectId === 'mar' ? 'गुण' : selectedPaper.subjectId === 'hin' ? 'अंक' : selectedPaper.subjectId === 'sanskrit' ? 'अंकाः' : (q.marks > 1 ? 'Marks' : 'Mark')}]
                          </span>
                        </div>

                        {showAnswerKeys && (
                          <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-3 text-xs font-sans text-stone-800 space-y-1 mt-2">
                            <span className="font-mono font-bold text-amber-900 uppercase tracking-wider block text-[10px]">
                              {selectedPaper.subjectId === 'mar'
                                ? 'अधिकृत बोर्ड उत्तर व गुणदान योजना:'
                                : selectedPaper.subjectId === 'hin'
                                ? 'अधिकृत बोर्ड उत्तर एवं अंक योजना:'
                                : selectedPaper.subjectId === 'sanskrit'
                                ? 'अधिकृत-बोर्ड-उत्तरं गुणदानयोजना च:'
                                : 'Official Board Answer & Marking Scheme:'}
                            </span>
                            <p className="leading-relaxed font-serif text-stone-900">
                              {q.modelAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: TIMED MOCK TESTS
          ========================================================================= */}
      {activeSessionTab === 'mock' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {MOCK_TESTS_LIST.map(test => (
                <button
                  key={test.id}
                  onClick={() => startMockTest(test)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeMockTest.id === test.id
                      ? 'bg-[#1C1917] text-amber-200 shadow-2xs'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <span>{test.subjectTitle} Mock</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl font-mono text-sm font-bold flex items-center gap-2 bg-stone-100 text-stone-900 border border-stone-300">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Timer: {formatTimer(mockTimeRemaining)}</span>
              </div>

              {!isMockSubmitted ? (
                <button
                  onClick={submitMockTest}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={() => startMockTest(activeMockTest)}
                  className="px-4 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-200 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              )}
            </div>
          </div>

          {/* Test Questions Container */}
          <div className="bg-white border-2 border-stone-850 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {activeMockTest.testTitle}
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  Syllabus coverage: {activeMockTest.chapterCoverage}
                </p>
              </div>

              {isMockSubmitted && (
                <div className="px-4 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-mono font-bold text-xs">
                  Final Score: {activeMockTest.questions.filter(q => mockUserAnswers[q.id] === q.correctIndex).length} / {activeMockTest.totalQuestions} Marks
                </div>
              )}
            </div>

            <div className="space-y-6">
              {activeMockTest.questions.map((q, idx) => {
                const selectedOpt = mockUserAnswers[q.id];
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div key={q.id} className="border-2 border-stone-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3 text-xs sm:text-sm font-serif">
                      <strong className="text-stone-900 leading-snug">
                        Question {idx + 1}: {q.question}
                      </strong>
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono font-bold text-xs shrink-0">
                        {q.marks} Mark
                      </span>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedOpt === oIdx;
                        let optionStyle = 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100';

                        if (isMockSubmitted) {
                          if (oIdx === q.correctIndex) {
                            optionStyle = 'bg-green-100 border-green-500 text-green-900 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-red-100 border-red-500 text-red-900';
                          } else {
                            optionStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-amber-100 border-amber-600 text-stone-950 font-bold shadow-2xs';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isMockSubmitted}
                            onClick={() => setMockUserAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                            className={`w-full p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">({String.fromCharCode(65 + oIdx)})</span>
                              <span>{opt}</span>
                            </div>
                            {isMockSubmitted && oIdx === q.correctIndex && (
                              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                            )}
                            {isMockSubmitted && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: VIEW 20-MARK QUESTION PAPER IN FULL
          ========================================================================= */}
      {activePaperViewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white text-stone-900 w-full max-w-4xl rounded-3xl overflow-hidden border-2 border-stone-850 shadow-2xl flex flex-col max-h-[92vh]">
            
            <div className="bg-[#1C1917] text-white px-5 py-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  {activePaperViewModal.subjectTitle} • {
                    activePaperViewModal.subjectId === 'mar'
                      ? `पाठ ${activePaperViewModal.chapterNumber}`
                      : activePaperViewModal.subjectId === 'hin'
                      ? `पाठ ${activePaperViewModal.chapterNumber}`
                      : activePaperViewModal.subjectId === 'sanskrit'
                      ? `पाठः ${activePaperViewModal.chapterNumber}`
                      : `Chapter ${activePaperViewModal.chapterNumber}`
                  }
                </span>
                <h3 className="font-serif font-bold text-base md:text-lg">
                  {activePaperViewModal.chapterTitle} — {getLocalizedSetName(activePaperViewModal.subjectId, activePaperViewModal.setName)} {
                    activePaperViewModal.subjectId === 'mar'
                      ? '(२० गुण सराव प्रश्नपत्रिका)'
                      : activePaperViewModal.subjectId === 'hin'
                      ? '(२० अंक अभ्यास प्रश्नपत्र)'
                      : activePaperViewModal.subjectId === 'sanskrit'
                      ? '(२० अंकाः सराव-प्रश्नपत्रम्)'
                      : '(20 Marks Mock Paper)'
                  }
                </h3>
              </div>

              <button
                onClick={() => setActivePaperViewModal(null)}
                className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="text-center border-b pb-4">
                <span className="text-xs font-mono font-bold uppercase text-amber-800 block">
                  {getLocalizedBoardHeader(activePaperViewModal.subjectId)}
                </span>
                <h2 className="text-xl font-serif font-bold text-stone-950 mt-1">
                  {activePaperViewModal.chapterTitle} ({getLocalizedSetName(activePaperViewModal.subjectId, activePaperViewModal.setName)})
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-stone-600 mt-1">
                  <span>
                    {activePaperViewModal.subjectId === 'mar' 
                      ? `वेळ: ${activePaperViewModal.durationMinutes} मिनिटे` 
                      : activePaperViewModal.subjectId === 'hin' 
                      ? `समय: ${activePaperViewModal.durationMinutes} मिनट` 
                      : activePaperViewModal.subjectId === 'sanskrit' 
                      ? `समयः: ${activePaperViewModal.durationMinutes} निमेषाः` 
                      : `Time Allowed: ${activePaperViewModal.durationMinutes} Mins`}
                  </span>
                  <span>•</span>
                  <span>
                    {activePaperViewModal.subjectId === 'mar' 
                      ? `एकूण गुण: ${activePaperViewModal.totalMarks} गुण` 
                      : activePaperViewModal.subjectId === 'hin' 
                      ? `कुल अंक: ${activePaperViewModal.totalMarks} अंक` 
                      : activePaperViewModal.subjectId === 'sanskrit' 
                      ? `आहत्य अंकाः: ${activePaperViewModal.totalMarks} अंकाः` 
                      : `Max Marks: ${activePaperViewModal.totalMarks} Marks`}
                  </span>
                  <span>•</span>
                  <span>
                    {getLocalizedEvaluatorLabel(activePaperViewModal.subjectId)} {activePaperViewModal.assignedTeacher.name}
                  </span>
                </div>
              </div>

              {/* Instructions banner */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs space-y-1">
                <span className="font-mono font-bold text-amber-900 block">
                  {activePaperViewModal.subjectId === 'mar' ? 'सर्वसाधारण सूचना:' : activePaperViewModal.subjectId === 'hin' ? 'सामान्य निर्देश:' : activePaperViewModal.subjectId === 'sanskrit' ? 'सामान्याः निर्देशाः:' : 'Instructions:'}
                </span>
                <ul className="space-y-0.5 list-disc list-inside text-stone-700">
                  {activePaperViewModal.instructions.map((inst, iIdx) => (
                    <li key={iIdx}>{inst}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 divide-y divide-stone-200">
                {activePaperViewModal.sections.map((sec, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
                        {sec.sectionTitle}
                      </h4>
                      <span className="text-xs font-mono font-bold text-amber-900">
                        [{sec.sectionMarks} {activePaperViewModal.subjectId === 'mar' ? 'गुण' : activePaperViewModal.subjectId === 'hin' ? 'अंक' : activePaperViewModal.subjectId === 'sanskrit' ? 'अंकाः' : 'Marks'}]
                      </span>
                    </div>

                    <div className="space-y-3">
                      {sec.questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5 text-xs">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-serif font-bold text-stone-900 text-sm">
                              {q.qNumber}: {q.questionText}
                            </span>
                            <span className="font-mono font-bold text-stone-600 shrink-0">
                              [{q.marks} {activePaperViewModal.subjectId === 'mar' ? 'गुण' : activePaperViewModal.subjectId === 'hin' ? 'अंक' : activePaperViewModal.subjectId === 'sanskrit' ? (q.marks > 1 ? 'अंकौ' : 'अंकः') : (q.marks > 1 ? 'Marks' : 'Mark')}]
                            </span>
                          </div>
                          {q.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2 pt-1">
                              {q.options.map((opt, oIdx) => (
                                <div key={oIdx} className="text-stone-700">
                                  <strong>{getLocalizedOptionPrefix(activePaperViewModal.subjectId, oIdx)}</strong> {opt}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-stone-600 font-sans">
                {activePaperViewModal.subjectId === 'mar'
                  ? 'उत्तरपत्रिकेत उत्तरे लिहा, छायाचित्र/पीडीएफ स्कॅन करा आणि शिक्षकांकडून तपासणीसाठी अपलोड करा.'
                  : activePaperViewModal.subjectId === 'hin'
                  ? 'उत्तरपुस्तिका में उत्तर लिखें, फोटो/पीडीएफ स्कैन करें और शिक्षक के मूल्यांकन हेतु अपलोड करें।'
                  : activePaperViewModal.subjectId === 'sanskrit'
                  ? 'उत्तरपुस्तिकायां उत्तराणि लिखत, छायाचित्रं वा पीडीएफ् सञ्चिकां संयोज्य आचार्येभ्यः प्रेषयतु।'
                  : 'Solve in your notebook, take photo/PDF scan, and upload for teacher grading.'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerToast(
                    activePaperViewModal.subjectId === 'mar'
                      ? `${activePaperViewModal.chapterTitle} ${getLocalizedSetName(activePaperViewModal.subjectId, activePaperViewModal.setName)} प्रश्नपत्रिका डाऊनलोड झाली!`
                      : activePaperViewModal.subjectId === 'hin'
                      ? `${activePaperViewModal.chapterTitle} ${getLocalizedSetName(activePaperViewModal.subjectId, activePaperViewModal.setName)} प्रश्नपत्र डाउनलोड हो गया!`
                      : activePaperViewModal.subjectId === 'sanskrit'
                      ? `${activePaperViewModal.chapterTitle} ${getLocalizedSetName(activePaperViewModal.subjectId, activePaperViewModal.setName)} प्रश्नपत्रिका डाउनलोड अभवत्!`
                      : `Downloaded ${activePaperViewModal.setName} Question Paper PDF!`
                  )}
                  className="px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-800 rounded-xl text-xs font-serif font-bold transition-all border border-stone-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {activePaperViewModal.subjectId === 'mar'
                      ? 'प्रश्नपत्रिका डाऊनलोड (PDF)'
                      : activePaperViewModal.subjectId === 'hin'
                      ? 'प्रश्नपत्र डाउनलोड (PDF)'
                      : activePaperViewModal.subjectId === 'sanskrit'
                      ? 'प्रश्नपत्रिकां डाउनलोड करोतु'
                      : 'Download PDF'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    const paper = activePaperViewModal;
                    setActivePaperViewModal(null);
                    setActiveUploadModal(paper);
                  }}
                  className="px-4 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-200 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>
                    {activePaperViewModal.subjectId === 'mar'
                      ? 'हस्तलिखित उत्तरपत्रिका अपलोड करा'
                      : activePaperViewModal.subjectId === 'hin'
                      ? 'हस्तलिखित उत्तरपुस्तिका अपलोड करें'
                      : activePaperViewModal.subjectId === 'sanskrit'
                      ? 'हस्तलिखित-उत्तरपत्रिकां प्रेषयतु'
                      : 'Upload Solved Answer PDF'}
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: UPLOAD SOLVED ANSWER PAPER (PDF / PHOTO SCAN)
          ========================================================================= */}
      {activeUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white text-stone-900 w-full max-w-xl rounded-3xl overflow-hidden border-2 border-stone-850 shadow-2xl flex flex-col">
            
            <div className="bg-[#1C1917] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  {activeUploadModal.subjectId === 'mar'
                    ? 'शिक्षक मूल्यांकन विभाग'
                    : activeUploadModal.subjectId === 'hin'
                    ? 'शिक्षक मूल्यांकन पटल'
                    : activeUploadModal.subjectId === 'sanskrit'
                    ? 'आचार्य-मूल्याङ्कन-पीठम्'
                    : 'Teacher Evaluation Desk'}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  {activeUploadModal.subjectId === 'mar'
                    ? `हस्तलिखित उत्तरपत्रिका अपलोड: ${getLocalizedSetName(activeUploadModal.subjectId, activeUploadModal.setName)}`
                    : activeUploadModal.subjectId === 'hin'
                    ? `हस्तलिखित उत्तरपुस्तिका अपलोड: ${getLocalizedSetName(activeUploadModal.subjectId, activeUploadModal.setName)}`
                    : activeUploadModal.subjectId === 'sanskrit'
                    ? `हस्तलिखित-उत्तरपत्रिका-प्रेषणम्: ${getLocalizedSetName(activeUploadModal.subjectId, activeUploadModal.setName)}`
                    : `Upload Solved Answer Paper: ${activeUploadModal.setName}`}
                </h3>
              </div>

              <button
                onClick={() => setActiveUploadModal(null)}
                className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs font-sans">
              
              {/* Paper Details Card */}
              <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 space-y-1 text-stone-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold block">
                  {activeUploadModal.subjectId === 'mar'
                    ? 'निवडलेली प्रश्नपत्रिका:'
                    : activeUploadModal.subjectId === 'hin'
                    ? 'चयनित प्रश्नपत्र:'
                    : activeUploadModal.subjectId === 'sanskrit'
                    ? 'चयनित-प्रश्नपत्रिका:'
                    : 'Question Paper Selected:'}
                </span>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  {activeUploadModal.chapterTitle} — {getLocalizedSetName(activeUploadModal.subjectId, activeUploadModal.setName)} ({getLocalizedMetaStr(activeUploadModal.subjectId)})
                </h4>
                <p className="text-[11px] text-stone-600">
                  {getLocalizedEvaluatorLabel(activeUploadModal.subjectId)} <strong>{activeUploadModal.assignedTeacher.name}</strong> ({activeUploadModal.assignedTeacher.role})
                </p>
              </div>

              {/* Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-amber-600 rounded-2xl p-6 text-center space-y-3 cursor-pointer transition-colors bg-stone-50 hover:bg-amber-50/40"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,image/*"
                  className="hidden"
                />

                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6 text-amber-800" />
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    {uploadFileName 
                      ? uploadFileName 
                      : (activeUploadModal.subjectId === 'mar'
                          ? 'आपली हस्तलिखित उत्तरपत्रिका पीडीएफ किंवा फोटो निवडा'
                          : activeUploadModal.subjectId === 'hin'
                          ? 'अपनी हल की गई उत्तरपुस्तिका पीडीएफ या फोटो चुनें'
                          : activeUploadModal.subjectId === 'sanskrit'
                          ? 'स्वकीय-उत्तरपत्रिकायाः पीडीएफ् सञ्चिकां चिनोतु'
                          : 'Click to select your Solved Answer Paper PDF or Scan')}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {uploadFileSize 
                      ? `आकार: ${uploadFileSize} • PDF Document` 
                      : (activeUploadModal.subjectId === 'mar'
                          ? 'मोबाईल किंवा स्कॅनरमधील पीडीएफ, जेपीजी किंवा पीएनजी फाइल समर्थित'
                          : activeUploadModal.subjectId === 'hin'
                          ? 'मोबाइल अथवा स्कैनर से पीडीएफ, जेपीजी या पीएनजी समर्थित'
                          : activeUploadModal.subjectId === 'sanskrit'
                          ? 'दूरवाणी-स्कैनर-माध्यमेन पीडीएफ् वा छायाचित्रं समर्थितम्'
                          : 'Supports PDF, JPG, PNG from your phone/scanner')}
                  </p>
                </div>

                <button
                  type="button"
                  className="px-4 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-serif font-bold text-stone-800 shadow-2xs hover:bg-stone-50 pointer-events-none"
                >
                  {activeUploadModal.subjectId === 'mar'
                    ? 'फाइल निवडा'
                    : activeUploadModal.subjectId === 'hin'
                    ? 'फाइल चुनें'
                    : activeUploadModal.subjectId === 'sanskrit'
                    ? 'सञ्चिकां चिनोतु'
                    : 'Browse Device Files'}
                </button>
              </div>

              {/* Optional Note to Teacher */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-stone-600 font-semibold block">
                  {activeUploadModal.subjectId === 'mar'
                    ? 'परीक्षकांसाठी सूचना / विशेष तपासणी विनंती (ऐच्छिक):'
                    : activeUploadModal.subjectId === 'hin'
                    ? 'परीक्षक हेतु निर्देश / विशेष प्रश्न जांच का निवेदन (वैकल्पिक):'
                    : activeUploadModal.subjectId === 'sanskrit'
                    ? 'आचार्येभ्यः निवेदनम् (ऐच्छिकम्):'
                    : 'Note to Examiner / Specific Questions to Check (Optional):'}
                </label>
                <textarea
                  rows={2}
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  placeholder={
                    activeUploadModal.subjectId === 'mar'
                      ? 'उदा. कृपया माझे स्वमत, व्याकरण व अक्षर सादरीकरण तपासावे...'
                      : activeUploadModal.subjectId === 'hin'
                      ? 'उदा. कृपया व्याकरण एवं काव्य सौंदर्य के उत्तरों की विशेष जांच करें...'
                      : activeUploadModal.subjectId === 'sanskrit'
                      ? 'उदा. कृपया मम अन्वयपूर्तिं व्याकरणं च विशेषावधानेन परिशोधयन्तु...'
                      : 'e.g. Please inspect my Kepler derivation in Q.3 and let me know if my diagrams follow the board format...'
                  }
                  className="w-full bg-stone-50 border border-stone-200 focus:border-amber-600 rounded-xl p-3 text-xs text-stone-800 focus:outline-none"
                />
              </div>

              {/* Submission Notice */}
              <div className="text-[11px] text-stone-500 font-sans flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  {activeUploadModal.subjectId === 'mar'
                    ? 'अपलोड केल्यानंतर मुख्य परीक्षक तुमची हस्तलिखित उत्तरपत्रिका तपासून २० पैकी गुण देतील व सविस्तर मार्गदर्शन नोंदी करतील.'
                    : activeUploadModal.subjectId === 'hin'
                    ? 'अपलोड करने के पश्चात मुख्य परीक्षक आपकी उत्तरपुस्तिका की जांच कर २० में से अंक प्रदान करेंगे एवं मार्गदर्शन टिप्पणी देंगे।'
                    : activeUploadModal.subjectId === 'sanskrit'
                    ? 'प्रेषणानन्तरं मुख्यपरीक्षकः उत्तरपत्रिकां संशोध्य २० अंकात्मकेषु अंकेषु मूल्याङ्कनं टिप्पणीं च दास्यति।'
                    : 'After uploading, our board moderator will read your handwritten answers, allocate step-marks out of 20, and annotate your answer sheet with feedback.'}
                </span>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-stone-50 px-6 py-3.5 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveUploadModal(null)}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-serif font-bold cursor-pointer"
              >
                {activeUploadModal.subjectId === 'mar'
                  ? 'रद्द करा'
                  : activeUploadModal.subjectId === 'hin'
                  ? 'रद्द करें'
                  : activeUploadModal.subjectId === 'sanskrit'
                  ? 'निरस्यतु'
                  : 'Cancel'}
              </button>

              <button
                onClick={handleSubmitAnswerPaper}
                disabled={isSubmittingUpload}
                className="px-6 py-2.5 bg-[#1C1917] hover:bg-stone-850 text-amber-200 hover:text-white rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <FileUp className="w-4 h-4" />
                <span>
                  {isSubmittingUpload 
                    ? (activeUploadModal.subjectId === 'mar' ? 'अपलोड होत आहे...' : activeUploadModal.subjectId === 'hin' ? 'अपलोड हो रहा है...' : activeUploadModal.subjectId === 'sanskrit' ? 'प्रेषणं भवति...' : 'Uploading & Assigning...') 
                    : (activeUploadModal.subjectId === 'mar' ? 'शिक्षकांकडे मूल्यांकनासाठी पाठवा' : activeUploadModal.subjectId === 'hin' ? 'शिक्षक को मूल्यांकन हेतु भेजें' : activeUploadModal.subjectId === 'sanskrit' ? 'मूल्याङ्कनाय प्रेषयतु' : 'Submit to Teacher for Grading')}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: TEACHER EVALUATED ANSWER SHEET & FEEDBACK REPORT
          ========================================================================= */}
      {activeEvaluationModal && activeEvaluationModal.evaluation && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white text-stone-900 w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-stone-850 shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="bg-[#1C1917] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-amber-400" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                    {activeEvaluationModal.subjectId === 'mar'
                      ? 'अधिकृत शिक्षक मूल्यांकन अहवाल व गुणपत्रिका'
                      : activeEvaluationModal.subjectId === 'hin'
                      ? 'अधिकृत शिक्षक मूल्यांकन प्रतिवेदन एवं अंकपत्र'
                      : activeEvaluationModal.subjectId === 'sanskrit'
                      ? 'अधिकृत-आचार्य-मूल्याङ्कन-प्रतिवेदनम् तथा गुणपत्रिका'
                      : 'Official Teacher Evaluation Report'}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg">
                    {activeEvaluationModal.chapterTitle} — {getLocalizedSetName(activeEvaluationModal.subjectId, activeEvaluationModal.setName)}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveEvaluationModal(null)}
                className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Evaluation Document */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs font-sans">
              
              {/* Score Showcase Banner */}
              <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/40 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-900 font-bold block">
                    {activeEvaluationModal.subjectId === 'mar'
                      ? 'नियामकांकडून प्राप्त गुण:'
                      : activeEvaluationModal.subjectId === 'hin'
                      ? 'परीक्षक द्वारा प्रदत्त अंक:'
                      : activeEvaluationModal.subjectId === 'sanskrit'
                      ? 'आचार्येण प्रदत्ताः अंकाः:'
                      : 'Marks Awarded by Moderator:'}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-serif font-black text-stone-950">
                      {activeEvaluationModal.evaluation.marksAwarded}
                    </span>
                    <span className="text-sm font-mono text-stone-500 font-bold">
                      {activeEvaluationModal.subjectId === 'mar'
                        ? `/ ${activeEvaluationModal.evaluation.totalMarks} गुण`
                        : activeEvaluationModal.subjectId === 'hin'
                        ? `/ ${activeEvaluationModal.evaluation.totalMarks} अंक`
                        : activeEvaluationModal.subjectId === 'sanskrit'
                        ? `/ ${activeEvaluationModal.evaluation.totalMarks} अंकाः`
                        : `/ ${activeEvaluationModal.evaluation.totalMarks} Marks`}
                    </span>
                    <span className="ml-2 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {activeEvaluationModal.evaluation.grade}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-600 block mt-1">
                    {activeEvaluationModal.subjectId === 'mar'
                      ? `टक्केवारी: ${activeEvaluationModal.evaluation.percentage}% • स्वाक्षरी वेळ: ${activeEvaluationModal.evaluation.signedAt}`
                      : activeEvaluationModal.subjectId === 'hin'
                      ? `प्रतिशत: ${activeEvaluationModal.evaluation.percentage}% • हस्ताक्षर समय: ${activeEvaluationModal.evaluation.signedAt}`
                      : activeEvaluationModal.subjectId === 'sanskrit'
                      ? `प्रतिशतम्: ${activeEvaluationModal.evaluation.percentage}% • समयः: ${activeEvaluationModal.evaluation.signedAt}`
                      : `Percentage: ${activeEvaluationModal.evaluation.percentage}% • Evaluated on: ${activeEvaluationModal.evaluation.signedAt}`}
                  </span>
                </div>

                {/* Examiner Signature Seal */}
                <div className="bg-white border-2 border-dashed border-amber-400 p-3.5 rounded-2xl text-center shadow-2xs self-start sm:self-center">
                  <span className="text-[9px] font-mono uppercase text-amber-800 font-bold block">
                    {activeEvaluationModal.subjectId === 'mar'
                      ? 'अधिकृत राज्य मंडळ मुख्य परीक्षक'
                      : activeEvaluationModal.subjectId === 'hin'
                      ? 'अधिकृत राज्य मण्डल परीक्षक'
                      : activeEvaluationModal.subjectId === 'sanskrit'
                      ? 'अधिकृत-राज्य-मण्डल-परीक्षकः'
                      : 'VERIFIED STATE BOARD MODERATOR'}
                  </span>
                  <div className="font-['Kalam',cursive] text-lg font-bold text-amber-950 my-0.5">
                    {activeEvaluationModal.evaluation.teacherName}
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 block">
                    {activeEvaluationModal.evaluation.teacherRole}
                  </span>
                </div>
              </div>

              {/* Teacher's Overall Observation */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  <span>
                    {activeEvaluationModal.subjectId === 'mar'
                      ? 'शिक्षकांचा सविस्तर अभिप्राय व निरीक्षण:'
                      : activeEvaluationModal.subjectId === 'hin'
                      ? 'शिक्षक की विस्तृत समीक्षा एवं टिप्पणी:'
                      : activeEvaluationModal.subjectId === 'sanskrit'
                      ? 'आचार्यस्य सविस्तर-परामर्शः च निरीक्षणम्:'
                      : "Teacher's Detailed Assessment Remarks:"}
                  </span>
                </h4>
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-stone-800 leading-relaxed font-serif text-sm">
                  "{activeEvaluationModal.evaluation.overallRemark}"
                </div>
              </div>

              {/* Question-by-Question Marks & Step Corrections */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider">
                  {activeEvaluationModal.subjectId === 'mar'
                    ? 'प्रश्नानुसार गुण विभागणी व दुरुस्ती:'
                    : activeEvaluationModal.subjectId === 'hin'
                    ? 'प्रश्नानुसार अंक विभाजन एवं सुधार टिप्पणी:'
                    : activeEvaluationModal.subjectId === 'sanskrit'
                    ? 'प्रश्नानुसार-अङ्कविभाजनम् तथा संशोधन-टिप्पणी:'
                    : 'Step-Marking & Question-wise Corrections:'}
                </h4>

                <div className="space-y-2">
                  {activeEvaluationModal.evaluation.questionWiseMarks.map((q, idx) => (
                    <div key={idx} className="border border-stone-200 rounded-2xl p-3.5 bg-white space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="font-serif text-stone-900">
                          {activeEvaluationModal.subjectId === 'mar'
                            ? `${q.qNumber} मूल्यमापन`
                            : activeEvaluationModal.subjectId === 'hin'
                            ? `${q.qNumber} मूल्यांकन`
                            : activeEvaluationModal.subjectId === 'sanskrit'
                            ? `${q.qNumber} मूल्याङ्कनम्`
                            : `${q.qNumber} Evaluation`}
                        </strong>
                        <span className="px-2.5 py-0.5 rounded-md font-mono font-bold bg-stone-100 text-stone-900">
                          {q.awarded} / {q.max} {
                            activeEvaluationModal.subjectId === 'mar'
                              ? 'गुण'
                              : activeEvaluationModal.subjectId === 'hin'
                              ? 'अंक'
                              : activeEvaluationModal.subjectId === 'sanskrit'
                              ? 'अंकाः'
                              : 'Marks'
                          }
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-sans">
                        <strong className="text-red-700">
                          {activeEvaluationModal.subjectId === 'mar'
                            ? 'परीक्षक लाल पेन नोंद: '
                            : activeEvaluationModal.subjectId === 'hin'
                            ? 'परीक्षक लाल कलम टिप्पणी: '
                            : activeEvaluationModal.subjectId === 'sanskrit'
                            ? 'परीक्षक-संशोधन-टिप्पणी: '
                            : 'Examiner Red Pen Note: '}
                        </strong> {q.remark}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Presentation Advice */}
              <div className="bg-amber-50/80 border-l-4 border-amber-600 p-4 rounded-r-2xl space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold block">
                  {activeEvaluationModal.subjectId === 'mar'
                    ? '💡 परीक्षक हस्ताक्षर व सादरीकरण बोर्ड सल्ला:'
                    : activeEvaluationModal.subjectId === 'hin'
                    ? '💡 परीक्षक हस्ताक्षर एवं प्रस्तुतीकरण बोर्ड परामर्श:'
                    : activeEvaluationModal.subjectId === 'sanskrit'
                    ? '💡 आचार्य-हस्ताक्षर-प्रस्तुतीकरण-परामर्शः:'
                    : '💡 Examiner Handwriting & Board Presentation Tip:'}
                </span>
                <p className="text-xs font-serif italic text-stone-800 leading-relaxed">
                  "{activeEvaluationModal.evaluation.handwritingPresentationAdvice}"
                </p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="bg-stone-50 px-6 py-3.5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-stone-600 font-mono">
                {activeEvaluationModal.subjectId === 'mar'
                  ? `सादर केलेली मूळ उत्तरपत्रिका: ${activeEvaluationModal.pdfFileName}`
                  : activeEvaluationModal.subjectId === 'hin'
                  ? `मूल प्रेषित उत्तरपुस्तिका: ${activeEvaluationModal.pdfFileName}`
                  : activeEvaluationModal.subjectId === 'sanskrit'
                  ? `मूल-प्रेषित-उत्तरपत्रिका: ${activeEvaluationModal.pdfFileName}`
                  : `Original Submitted PDF: ${activeEvaluationModal.pdfFileName}`}
              </span>

              <button
                onClick={() => triggerToast(
                  activeEvaluationModal.subjectId === 'mar'
                    ? `${activeEvaluationModal.chapterTitle} तपासलेली गुणपत्रिका डाऊनलोड झाली!`
                    : activeEvaluationModal.subjectId === 'hin'
                    ? `${activeEvaluationModal.chapterTitle} जांची गई उत्तरपुस्तिका डाउनलोड हो गई!`
                    : activeEvaluationModal.subjectId === 'sanskrit'
                    ? `${activeEvaluationModal.chapterTitle} मूल्याङ्कित-पत्रिका डाउनलोड अभवत्!`
                    : `Downloaded Teacher Marked Sheet PDF for ${activeEvaluationModal.chapterTitle}!`
                )}
                className="px-4 py-2 bg-[#1C1917] hover:bg-stone-850 text-amber-200 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {activeEvaluationModal.subjectId === 'mar'
                    ? 'तपासलेली गुणपत्रिका डाऊनलोड करा (PDF)'
                    : activeEvaluationModal.subjectId === 'hin'
                    ? 'जांची गई उत्तरपुस्तिका डाउनलोड करें (PDF)'
                    : activeEvaluationModal.subjectId === 'sanskrit'
                    ? 'मूल्याङ्कित-पत्रिकां डाउनलोड करोतु (PDF)'
                    : 'Download Teacher Evaluated PDF'}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
