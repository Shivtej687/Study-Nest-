import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Send, Sparkles, Bot, User, Mic, MicOff, Volume2, VolumeX, 
  Trash2, Download, Copy, Check, RefreshCw, Zap, Coffee, 
  GraduationCap, BookOpen, HelpCircle, ChevronDown, Flame,
  Lightbulb, ArrowRight, Clock, MessageSquare, CheckCircle2,
  History, Search, X, Eye, FileText, ArrowLeft, RotateCcw, AlertTriangle, PlusCircle, CheckCheck
} from 'lucide-react';

export interface UserProfile {
  name: string;
  age: number;
  std: string;
  board: string;
  studying: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: 'casual' | 'exam' | 'quick';
  subject?: string;
  suggestedFollowUps?: string[];
}

export interface ChatSessionArchive {
  id: string;
  title: string;
  timestamp: string;
  dateStr: string;
  mode: 'casual' | 'exam' | 'quick';
  subject: string;
  messageCount: number;
  preview: string;
  messages: Message[];
}

interface DoubtCircleChatViewProps {
  userProfile?: any;
  triggerToast?: (msg: string) => void;
}

const CHAT_STORAGE_KEY = 'studynest_doubt_circle_active_chat_v3';
const HISTORY_ARCHIVE_STORAGE_KEY = 'studynest_doubt_circle_history_archive_v3';
const CURRENT_SESSION_ID_KEY = 'studynest_doubt_circle_current_session_id';

const SUGGESTED_PROMPTS = [
  {
    category: '☕ Casual & Fun',
    text: "Hey NestAI! I'm feeling a bit lazy today. Give me some fun motivation to study!",
    label: "Lazy / Need Motivation"
  },
  {
    category: '📐 Maths 1 & 2',
    text: "Solve by quadratic formula step-by-step: 2x² + 7x + 3 = 0 and show all steps clearly.",
    label: "Quadratic Formula 2x² + 7x + 3 = 0"
  },
  {
    category: '🔬 Science 1',
    text: "Explain Newton's Universal Law of Gravitation and why G is called universal constant.",
    label: "Gravitation & Universal Constant G"
  },
  {
    category: '🔬 Science 2',
    text: "What is the difference between Mitosis and Meiosis? Explain in simple points.",
    label: "Mitosis vs Meiosis"
  },
  {
    category: '📝 Marathi',
    text: "मराठी व्याकरण: 'कर्मधारय समास' आणि 'द्विगु समास' यांमधील फरक सोप्या उदाहरणांसह सांगा.",
    label: "कर्मधारय व द्विगु समास"
  },
  {
    category: '🏛️ History & Geo',
    text: "What are the major causes and outcomes of the Revolt of 1857 in Indian History?",
    label: "Revolt of 1857 Summary"
  },
  {
    category: '⚡ Quick Exam Tips',
    text: "Give me top 5 board exam presentation tips to avoid losing silly marks!",
    label: "Top 5 Board Exam Presentation Tips"
  }
];

export const DoubtCircleChatView: React.FC<DoubtCircleChatViewProps> = ({ userProfile, triggerToast }) => {
  const studentMeta = userProfile?.studentMeta || userProfile;
  const studentName = studentMeta?.name || userProfile?.fullName || 'Student';
  const studentStd = studentMeta?.std || 'Standard 10';
  const studentBoard = studentMeta?.board || 'Maharashtra State Board (SSC)';
  const studentStudying = studentMeta?.studying || 'State Board Curriculum';

  // Mode and Subject states
  const [mode, setMode] = useState<'casual' | 'exam' | 'quick'>('casual');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  
  // Active session tracker
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return localStorage.getItem(CURRENT_SESSION_ID_KEY) || `session-${Date.now()}`;
  });

  // History Archive state
  const [historySessions, setHistorySessions] = useState<ChatSessionArchive[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_ARCHIVE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    // Initial rich historical sessions so student sees history feature in action
    return [
      {
        id: 'hist-math-quad-1',
        title: 'Quadratic Equations & Discriminant Rules',
        timestamp: 'Yesterday at 04:30 PM',
        dateStr: 'Yesterday',
        mode: 'exam',
        subject: 'Maths 1 & 2',
        messageCount: 4,
        preview: 'Solve 2x² + 7x + 3 = 0 step-by-step using formula method...',
        messages: [
          {
            id: 'm1',
            role: 'user',
            content: 'How do I solve 2x² + 7x + 3 = 0 using the quadratic formula?',
            timestamp: '04:30 PM',
            mode: 'exam',
            subject: 'Maths 1 & 2'
          },
          {
            id: 'm2',
            role: 'assistant',
            content: 'Here is the step-by-step board solution:\n\n1. Comparing with $ax^2 + bx + c = 0$:\n   - $a = 2, b = 7, c = 3$\n\n2. Compute Discriminant $\\Delta = b^2 - 4ac$:\n   - $\\Delta = (7)^2 - 4(2)(3) = 49 - 24 = 25$\n\n3. Formula: $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$\n   - $x = \\frac{-7 \\pm 5}{4}$\n   - $x = \\frac{-2}{4} = -0.5$ OR $x = \\frac{-12}{4} = -3$\n\nRoots are **-1/2 and -3**.',
            timestamp: '04:31 PM',
            mode: 'exam',
            subject: 'Maths 1 & 2'
          }
        ]
      },
      {
        id: 'hist-sci-grav-1',
        title: 'Universal Law of Gravitation & Kepler Laws',
        timestamp: '2 days ago, 11:15 AM',
        dateStr: '2 days ago',
        mode: 'casual',
        subject: 'Science 1 & 2',
        messageCount: 3,
        preview: 'Why is G called Universal Gravitational Constant and not g?...',
        messages: [
          {
            id: 'm3',
            role: 'user',
            content: 'Why is G called universal constant while small g changes everywhere?',
            timestamp: '11:15 AM',
            mode: 'casual',
            subject: 'Science 1 & 2'
          },
          {
            id: 'm4',
            role: 'assistant',
            content: 'Awesome question! 🌍✨\n\n- **Capital G ($6.67 \\times 10^{-11} \\text{ N m}^2/\\text{kg}^2$)** is a fundamental property of our entire universe. Whether on Earth, Mars, or deep in space, $G$ never ever changes!\n\n- **Small $g$ ($9.8 \\text{ m/s}^2$)** is the acceleration due to gravity of a *specific planet*. Earth\'s poles have $g = 9.83$, equator has $g = 9.78$, and on the Moon it drops to $1.63 \\text{ m/s}^2$!',
            timestamp: '11:16 AM',
            mode: 'casual',
            subject: 'Science 1 & 2'
          }
        ]
      }
    ];
  });

  // Chat state
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'initial-welcome',
        role: 'assistant',
        content: `Hey **${studentName}**! 👋 I'm **NestAI**, your 24/7 Gemini-powered study buddy & academic mentor.\n\nWhether you need to break down a tough Maths problem step-by-step, understand Science concepts, master Marathi grammar, or just chat casually when you need a study break or motivation — **I'm online 24/7 for you!**\n\nWhat are we tackling together today? Feel free to type, speak into the mic, or tap any of the quick suggestions below!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'casual',
        suggestedFollowUps: [
          "Hey! What's the best way to study for board exams?",
          "Can you solve a quadratic equation for me?",
          "मराठी व्याकरणातील महत्त्वाचे नियम सांगा"
        ]
      }
    ];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // History Drawer & Modal states
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [selectedHistorySession, setSelectedHistorySession] = useState<ChatSessionArchive | null>(null);

  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Helper to notify
  const showToast = (msg: string) => {
    if (triggerToast) triggerToast(msg);
  };

  // Persist current session ID
  useEffect(() => {
    localStorage.setItem(CURRENT_SESSION_ID_KEY, currentSessionId);
  }, [currentSessionId]);

  // Persist history archive whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_ARCHIVE_STORAGE_KEY, JSON.stringify(historySessions));
    } catch (e) {
      console.warn("Failed to persist history sessions:", e);
    }
  }, [historySessions]);

  // Save active chat to localStorage and auto-sync to history archive
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn("Failed to persist doubt chat history:", e);
    }

    // Auto-archive active session into history if user has sent messages
    const userMsgs = messages.filter(m => m.role === 'user');
    if (userMsgs.length > 0) {
      const firstUserMsg = userMsgs[0].content;
      const title = firstUserMsg.length > 45 ? firstUserMsg.slice(0, 45) + '...' : firstUserMsg;
      const preview = userMsgs[userMsgs.length - 1].content.slice(0, 80) + '...';

      setHistorySessions(prev => {
        const existingIdx = prev.findIndex(s => s.id === currentSessionId);
        const updatedSession: ChatSessionArchive = {
          id: currentSessionId,
          title: title,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          mode,
          subject: selectedSubject,
          messageCount: messages.length,
          preview,
          messages: [...messages]
        };

        if (existingIdx >= 0) {
          const next = [...prev];
          next[existingIdx] = updatedSession;
          return next;
        } else {
          return [updatedSession, ...prev];
        }
      });
    }
  }, [messages, currentSessionId, mode, selectedSubject]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = selectedSubject.toLowerCase().includes('marathi') ? 'mr-IN' : 'en-IN';
      
      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recog.onerror = () => {
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recog;
    }
  }, [selectedSubject]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      showToast("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Mic start error:", err);
        setIsListening(false);
      }
    }
  };

  // Text to Speech
  const toggleSpeech = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      showToast("Text-to-speech is not supported in your browser.");
      return;
    }

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Clean markdown symbols for cleaner reading
    const cleanText = text
      .replace(/[*#_`>]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/https?:\/\/\S+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Auto-detect Devanagari for Indian accent voice if available
    const hasDevanagari = /[\u0900-\u097F]/.test(cleanText);
    if (hasDevanagari) {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || input).trim();
    if (!content || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode,
      subject: selectedSubject
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Build conversation payload for Gemini
      const conversationPayload = newMessages.slice(-10).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content
      }));

      const res = await fetch('/api/gemini/doubt-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationPayload,
          mode,
          subject: selectedSubject,
          studentProfile: {
            name: studentName,
            std: studentStd,
            board: studentBoard,
            studying: studentStudying
          }
        })
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || "I'm right here with you! Could you please repeat that question?";

      // Generate context-aware follow-up chips
      let followUps: string[] = [];
      if (mode === 'casual') {
        followUps = [
          "Explain that with a fun real-world example!",
          "Can you test me on this with a quick riddle?",
          "How does this connect to my board exam?"
        ];
      } else if (mode === 'exam') {
        followUps = [
          "What are the common mistakes students make in this question?",
          "Give me an ideal 3-mark model answer format.",
          "Give me another similar practice question to solve."
        ];
      } else {
        followUps = [
          "Explain this in more detail please!",
          "Give me a formula sheet / cheat sheet bullet points.",
          "Quiz me on this concept!"
        ];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode,
        subject: selectedSubject,
        suggestedFollowUps: followUps
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Doubt Chat API error:", err);
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: `Hey ${studentName}! I had a temporary network hitch, but don't worry—I'm right here 24/7! Click retry or ask me again, and we'll solve it together! 🚀`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // =========================================================================
  // CLEAR CHAT & AUTO-ARCHIVE TO HISTORY
  // =========================================================================
  const handleClearChat = () => {
    window.speechSynthesis?.cancel();

    // Check if there are user messages to archive
    const userMsgs = messages.filter(m => m.role === 'user');
    if (userMsgs.length > 0) {
      const firstUserMsg = userMsgs[0].content;
      const title = firstUserMsg.length > 45 ? firstUserMsg.slice(0, 45) + '...' : firstUserMsg;
      const preview = userMsgs[userMsgs.length - 1].content.slice(0, 80) + '...';

      const archivedSession: ChatSessionArchive = {
        id: currentSessionId,
        title,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mode,
        subject: selectedSubject,
        messageCount: messages.length,
        preview,
        messages: [...messages]
      };

      setHistorySessions(prev => {
        const filtered = prev.filter(s => s.id !== currentSessionId);
        return [archivedSession, ...filtered];
      });
    }

    // Reset current active chat screen
    const newSessionId = `session-${Date.now()}`;
    setCurrentSessionId(newSessionId);

    const freshWelcome: Message = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: `Fresh chat started, **${studentName}**! 🌟 Your previous conversation has been safely archived in **History**. What academic topic or doubt can we conquer now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'casual',
      suggestedFollowUps: [
        "Explain Kepler's laws of planetary motion",
        "How do I prepare for Marathi grammar?",
        "Give me a motivation booster!"
      ]
    };

    setMessages([freshWelcome]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    showToast("✅ Active chat cleared & safely saved to History!");
  };

  // Start new clean chat session
  const handleStartNewChat = () => {
    handleClearChat();
    setIsHistoryOpen(false);
  };

  // Restore archived chat session to active screen
  const handleRestoreSession = (session: ChatSessionArchive) => {
    window.speechSynthesis?.cancel();
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setMode(session.mode || 'casual');
    setSelectedSubject(session.subject || 'All');
    setIsHistoryOpen(false);
    setSelectedHistorySession(null);
    showToast(`📜 Restored chat: "${session.title}"`);
  };

  // Delete single history item
  const handleDeleteHistorySession = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setHistorySessions(prev => prev.filter(s => s.id !== id));
    if (selectedHistorySession?.id === id) {
      setSelectedHistorySession(null);
    }
    showToast("🗑️ Removed chat from history archive.");
  };

  // Clear all history
  const handleClearAllHistory = () => {
    if (window.confirm("Are you sure you want to delete ALL archived chat history? This cannot be undone.")) {
      setHistorySessions([]);
      setSelectedHistorySession(null);
      localStorage.removeItem(HISTORY_ARCHIVE_STORAGE_KEY);
      showToast("🗑️ All chat history cleared.");
    }
  };

  // Export specific session or current chat
  const exportSessionMarkdown = (msgs: Message[], sessionTitle?: string) => {
    const textContent = msgs.map(m => {
      const speaker = m.role === 'user' ? `${studentName} (${m.timestamp})` : `NestAI (24/7 Gemini Study Buddy - ${m.timestamp})`;
      return `### ${speaker}\n\n${m.content}\n\n---\n`;
    }).join('\n');

    const header = `# Study Nest — 24/7 AI Doubt Circle Transcript\nTitle: ${sessionTitle || 'Active Chat Session'}\nStudent: ${studentName} | ${studentStd} | ${studentBoard}\nExported Date: ${new Date().toLocaleDateString()}\n\n---\n\n`;
    const blob = new Blob([header + textContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `StudyNest_DoubtChat_${(sessionTitle || 'Session').replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("📥 Exported chat transcript as Markdown.");
  };

  // Filtered history list
  const filteredHistory = useMemo(() => {
    if (!historySearchQuery.trim()) return historySessions;
    const q = historySearchQuery.toLowerCase();
    return historySessions.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.subject.toLowerCase().includes(q) ||
      s.preview.toLowerCase().includes(q) ||
      s.messages.some(m => m.content.toLowerCase().includes(q))
    );
  }, [historySessions, historySearchQuery]);

  // Helper to format markdown text simply without heavy dependencies
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-sm font-bold text-amber-900 mt-3 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-base font-bold text-amber-950 mt-4 mb-1.5">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={idx} className="text-lg font-bold text-stone-900 mt-4 mb-2">{line.replace('# ', '')}</h2>;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <div key={idx} className="border-l-3 border-amber-600 bg-amber-50/60 pl-3 py-1.5 my-2 text-xs italic text-amber-950 rounded-r-lg">
            {line.replace('> ', '')}
          </div>
        );
      }

      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-stone-800 leading-relaxed my-0.5">
            {renderInlineMarkdown(bulletText)}
          </li>
        );
      }

      // Numbered items
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-xs text-stone-800 leading-relaxed">
            <span className="font-bold text-amber-700 shrink-0 w-5 text-right">{numMatch[1]}.</span>
            <span>{renderInlineMarkdown(numMatch[2])}</span>
          </div>
        );
      }

      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Regular paragraph
      return (
        <p key={idx} className="text-xs text-stone-800 leading-relaxed my-1">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Helper for bold and code
  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-stone-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-stone-200/70 text-amber-900 px-1.5 py-0.5 rounded text-[11px] font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="text-left space-y-6 animate-fade-in max-w-6xl mx-auto relative">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-800 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live 24/7 AI Doubt Solver
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-amber-200 border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Powered by Gemini 3.8 Flash
              </span>
              <span className="text-[11px] text-stone-400">
                {studentName} • {studentStd} ({studentBoard})
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-tight text-white flex items-center gap-3">
              <span>Doubt Circle AI Companion</span>
              <span className="text-2xl">⚡</span>
            </h1>

            <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
              Got a tricky equation, confusion in Science, or need Marathi/Hindi grammar cleared? Ask anything 24/7! NestAI solves academic doubts step-by-step and chats casually like a cool study buddy.
            </p>
          </div>

          {/* Action buttons (History, New Chat, Clear Chat, Export) */}
          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0 flex-wrap">
            {/* History Button with Count Badge */}
            <button
              onClick={() => setIsHistoryOpen(true)}
              title="View Archived Chat History"
              className="px-3.5 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-100 rounded-xl text-xs font-semibold flex items-center gap-2 border border-amber-500/40 transition-all cursor-pointer shadow-sm"
            >
              <History className="w-4 h-4 text-amber-400" />
              <span>History</span>
              {historySessions.length > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-400 text-stone-950 rounded-full text-[10px] font-mono font-bold">
                  {historySessions.length}
                </span>
              )}
            </button>

            {/* New Chat Button */}
            <button
              onClick={handleStartNewChat}
              title="Start a new chat conversation"
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white rounded-xl text-xs font-medium flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>New Chat</span>
            </button>

            {/* Export Notes Button */}
            <button
              onClick={() => exportSessionMarkdown(messages, 'Active Doubt Session')}
              title="Export Conversation to Markdown"
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white rounded-xl text-xs font-medium flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Clear Chat Button */}
            <button
              onClick={handleClearChat}
              title="Clear active screen (auto-saves to History)"
              className="px-3.5 py-2.5 bg-white/10 hover:bg-rose-500/20 text-stone-200 hover:text-rose-200 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Mode Selector & Subject Pills */}
        <div className="mt-6 pt-5 border-t border-stone-700/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tone / Mode */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mr-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Persona Mode:
            </span>
            <button
              onClick={() => setMode('casual')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'casual'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/30'
                  : 'bg-white/10 text-stone-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>☕ Casual Buddy (Fun & Relaxed)</span>
            </button>
            <button
              onClick={() => setMode('exam')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'exam'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/30'
                  : 'bg-white/10 text-stone-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>🎓 Board Exam Pro (Step-by-Step)</span>
            </button>
            <button
              onClick={() => setMode('quick')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'quick'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/30'
                  : 'bg-white/10 text-stone-300 hover:bg-white/15 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ 60-Sec Recap (Quick Bullets)</span>
            </button>
          </div>

          {/* Subject Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mr-1 shrink-0">
              Focus:
            </span>
            {['All', 'Maths 1 & 2', 'Science 1 & 2', 'Marathi & Languages', 'History & Geo'].map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                  selectedSubject === subj
                    ? 'bg-white text-stone-900 font-semibold shadow-sm'
                    : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Chat Box Container */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl shadow-sm overflow-hidden flex flex-col h-[650px] relative">
        
        {/* Chat Control Mini-Header Bar */}
        <div className="px-4 py-2.5 bg-stone-100/90 border-b border-stone-200/80 flex items-center justify-between gap-3 text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-stone-800 font-serif">
              Active Discussion: <span className="text-amber-800">{selectedSubject}</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
              • {messages.length} messages
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Chat History button */}
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="px-2.5 py-1 bg-white hover:bg-amber-50 text-amber-900 border border-stone-200 hover:border-amber-300 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              title="Open Chat History archive"
            >
              <History className="w-3.5 h-3.5 text-amber-600" />
              <span>History</span>
              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-full text-[9px] font-mono font-bold">
                {historySessions.length}
              </span>
            </button>

            {/* Quick Clear Chat button */}
            <button
              onClick={handleClearChat}
              className="px-2.5 py-1 bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200 hover:border-rose-300 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              title="Clear active chat screen (automatically archived to History)"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Chat Messages Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 bg-stone-50/50">
          
          {/* Suggested Prompts Shelf when chat is young */}
          {messages.length <= 2 && (
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 space-y-2.5 mb-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Quick Inspiration / Try Asking:
                </span>
                <span className="text-[11px] text-amber-700">Tap to ask instantly</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt.text)}
                    className="text-left p-2.5 bg-white hover:bg-amber-100/70 border border-amber-200/70 rounded-xl text-xs text-stone-700 hover:text-stone-950 transition-all shadow-xs flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-amber-700 block">{prompt.category}</span>
                      <span className="line-clamp-1 font-medium">{prompt.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages List */}
          {messages.map((message) => {
            const isUser = message.role === 'user';
            const isSpeaking = speakingMessageId === message.id;

            return (
              <div
                key={message.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {/* AI Avatar */}
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-stone-900 to-amber-900 text-amber-300 flex items-center justify-center shrink-0 shadow-sm mt-1 border border-amber-500/20">
                    <Bot className="w-5 h-5 text-amber-400" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] md:max-w-[78%] rounded-3xl p-4 md:p-5 shadow-xs transition-all relative group ${
                    isUser
                      ? 'bg-[#1C1917] text-white rounded-tr-sm'
                      : 'bg-white text-stone-900 border border-stone-200/80 rounded-tl-sm shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
                  }`}
                >
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-stone-200/40 text-[10px] font-mono">
                    <span className={`font-semibold ${isUser ? 'text-amber-300' : 'text-amber-800'}`}>
                      {isUser ? studentName : 'NestAI Academic Mentor'}
                    </span>
                    <span className={isUser ? 'text-stone-400' : 'text-stone-400'}>
                      {message.timestamp}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className={`prose-xs ${isUser ? 'text-stone-100 font-sans' : 'text-stone-900 font-sans'}`}>
                    {renderFormattedContent(message.content)}
                  </div>

                  {/* Follow-up suggestion pills for AI messages */}
                  {!isUser && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                        💡 Next Smart Questions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {message.suggestedFollowUps.map((chip, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => handleSendMessage(chip)}
                            className="text-left px-2.5 py-1 bg-amber-50/80 hover:bg-amber-100/90 text-amber-950 border border-amber-200/70 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>{chip}</span>
                            <ArrowRight className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions (Copy & Read Aloud) */}
                  <div className="mt-3 pt-2 flex items-center justify-end gap-2 text-stone-400">
                    <button
                      onClick={() => copyToClipboard(message.id, message.content)}
                      title="Copy message to clipboard"
                      className="p-1 hover:text-amber-600 rounded transition-colors cursor-pointer"
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {!isUser && (
                      <button
                        onClick={() => toggleSpeech(message.id, message.content)}
                        title={isSpeaking ? "Stop speaking" : "Listen to answer audio"}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          isSpeaking ? 'text-amber-600 animate-pulse' : 'hover:text-amber-600'
                        }`}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0 shadow-sm mt-1 font-bold text-xs font-serif">
                    {studentName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-3.5 justify-start animate-fade-in">
              <div className="w-9 h-9 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot className="w-5 h-5 text-amber-400 animate-bounce" />
              </div>
              <div className="bg-white border border-stone-200 rounded-3xl rounded-tl-sm p-4 shadow-sm flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping [animation-delay:0.4s]" />
                </div>
                <span className="text-xs font-mono text-stone-500">
                  NestAI is formulating step-by-step guidance...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Area */}
        <div className="p-4 bg-white border-t border-stone-200 shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2.5"
          >
            {/* Mic button */}
            <button
              type="button"
              onClick={toggleMic}
              title={isListening ? "Listening... click to stop" : "Speak your doubt"}
              className={`p-3 rounded-2xl border transition-all shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Input textarea */}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                rows={1}
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isListening
                    ? "Listening to your voice... speak now..."
                    : `Ask any doubt or chat casually with NestAI 24/7... (Shift+Enter for new line)`
                }
                className="w-full bg-stone-50 border border-stone-200 focus:border-amber-600 focus:bg-white rounded-2xl px-4 py-3 text-xs md:text-sm text-stone-800 placeholder-stone-400 focus:outline-none resize-none transition-all font-sans leading-relaxed max-h-32 shadow-inner"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 md:px-5 md:py-3 bg-stone-900 hover:bg-amber-600 text-amber-200 hover:text-white rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:hover:bg-stone-900 shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden md:inline font-bold">Ask AI</span>
            </button>
          </form>

          {/* Bottom helper text */}
          <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] text-stone-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Chats auto-save to History • Safe to clear anytime
            </span>
            <span className="hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded text-[10px] font-mono text-stone-600">Enter</kbd> to send
            </span>
          </div>
        </div>

      </div>

      {/* 3. Feature Highlights & Subject Capabilities Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <History className="w-4 h-4 text-amber-600" />
            <span>Persistent Chat History</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Never lose your study discussions! Every conversation is indexed and preserved in History even when you clear the active chat screen.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <span>All Subjects Mastered</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Maths 1 & 2 algebra and geometry proofs, Science 1 & 2, Marathi, Hindi, English grammar, Sanskrit shlokas, and History/Geography facts.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>24/7 Non-Stop Availability</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Midnight exam cramming or early morning revision — NestAI never sleeps. Instant step-by-step clarity when no tutors or teachers are around.
          </p>
        </div>
      </div>

      {/* =========================================================================
         4. SLIDE-OVER CHAT HISTORY DRAWER
         ========================================================================= */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-stone-200 animate-slide-left">
            
            {/* History Header */}
            <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-serif font-bold text-sm text-amber-100">
                    Chat History & Archives
                  </h3>
                  <p className="text-[10px] text-stone-400 font-mono">
                    {historySessions.length} Stored Discussion Sessions
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsHistoryOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar in History */}
            <div className="p-3.5 border-b border-stone-150 bg-stone-50/70">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search past questions or formulas..."
                  value={historySearchQuery}
                  onChange={(e) => setHistorySearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-600 font-sans"
                />
                {historySearchQuery && (
                  <button
                    onClick={() => setHistorySearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="px-4 py-2 bg-amber-50/50 border-b border-amber-100/80 flex items-center justify-between text-xs">
              <button
                onClick={handleStartNewChat}
                className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 cursor-pointer text-[11px]"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Start New Session</span>
              </button>

              {historySessions.length > 0 && (
                <button
                  onClick={handleClearAllHistory}
                  className="text-stone-400 hover:text-rose-600 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Clear All History
                </button>
              )}
            </div>

            {/* History Sessions List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/40">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-3">
                  <History className="w-12 h-12 text-stone-300 mx-auto stroke-1" />
                  <h4 className="text-sm font-serif font-bold text-stone-700">No Chat History Found</h4>
                  <p className="text-xs text-stone-500 font-sans max-w-xs mx-auto">
                    {historySearchQuery
                      ? `No conversations match "${historySearchQuery}". Try another search term.`
                      : 'Whatever you talk with NestAI is automatically preserved here, even after clearing the chat screen!'}
                  </p>
                </div>
              ) : (
                filteredHistory.map((session) => {
                  const isCurrent = session.id === currentSessionId;

                  return (
                    <div
                      key={session.id}
                      onClick={() => handleRestoreSession(session)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none group bg-white relative ${
                        isCurrent
                          ? 'border-amber-600/80 ring-2 ring-amber-500/20 shadow-sm'
                          : 'border-stone-200/80 hover:border-amber-500 hover:shadow-md'
                      }`}
                    >
                      {/* Top badge row */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border border-amber-200/60 text-amber-800 font-bold">
                            {session.subject}
                          </span>
                          {isCurrent && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {session.timestamp}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                        {session.title}
                      </h4>

                      {/* Snippet preview */}
                      <p className="text-[11px] text-stone-500 font-sans mt-1 line-clamp-2 leading-relaxed">
                        {session.preview}
                      </p>

                      {/* Footer Actions */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <span className="text-stone-400 font-mono text-[10px]">
                          {session.messageCount} messages
                        </span>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedHistorySession(session)}
                            title="Preview Full Transcript"
                            className="p-1 hover:text-amber-700 text-stone-400 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => exportSessionMarkdown(session.messages, session.title)}
                            title="Download Markdown"
                            className="p-1 hover:text-amber-700 text-stone-400 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteHistorySession(session.id, e)}
                            title="Delete this history entry"
                            className="p-1 hover:text-rose-600 text-stone-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRestoreSession(session)}
                            className="px-2 py-0.5 bg-stone-900 hover:bg-amber-600 text-white rounded-md text-[10px] font-mono transition-colors ml-1 cursor-pointer"
                          >
                            Open →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Bottom Footer */}
            <div className="p-3.5 bg-white border-t border-stone-200 text-center text-stone-400 text-[11px]">
              <span>🔒 Encrypted local history repository</span>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
         5. FULL HISTORY TRANSCRIPT PREVIEW MODAL
         ========================================================================= */}
      {selectedHistorySession && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-2 border-stone-900 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up text-left">
            
            {/* Modal Header */}
            <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono text-amber-400 tracking-wider">
                  Archived Discussion • {selectedHistorySession.subject}
                </span>
                <h3 className="font-serif font-bold text-base text-white line-clamp-1">
                  {selectedHistorySession.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedHistorySession(null)}
                className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Transcript Messages Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/50">
              {selectedHistorySession.messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                      isUser
                        ? 'bg-[#1C1917] text-white ml-8'
                        : 'bg-white text-stone-900 border border-stone-200 mr-8 shadow-2xs'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono opacity-70">
                      <span className="font-bold">{isUser ? studentName : 'NestAI'}</span>
                      <span>{m.timestamp}</span>
                    </div>
                    <div className="prose-xs leading-relaxed">
                      {renderFormattedContent(m.content)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => handleDeleteHistorySession(selectedHistorySession.id)}
                className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-serif font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportSessionMarkdown(selectedHistorySession.messages, selectedHistorySession.title)}
                  className="px-4 py-2 border border-stone-200 hover:border-stone-850 text-stone-700 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MD</span>
                </button>
                <button
                  onClick={() => handleRestoreSession(selectedHistorySession)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore to Active Chat</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
