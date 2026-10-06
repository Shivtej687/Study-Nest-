import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  PartyPopper, 
  Video, 
  CheckCircle2, 
  Filter, 
  Search, 
  Share2, 
  ExternalLink, 
  ChevronRight, 
  Info, 
  X, 
  Bookmark, 
  Check, 
  Flame, 
  MapPin, 
  User, 
  RefreshCw,
  BookOpen,
  Building,
  GraduationCap,
  Megaphone,
  Radio,
  Eye,
  CheckCheck
} from 'lucide-react';
import { STUDY_NOTIFICATIONS, StudyNotification } from '../data/notificationsData';

interface NotificationsViewProps {
  userProfile?: any;
  triggerToast?: (msg: string) => void;
  onNavigateToClasses?: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  userProfile,
  triggerToast,
  onNavigateToClasses
}) => {
  // State for notifications list
  const [notifications, setNotifications] = useState<StudyNotification[]>(() => {
    const saved = localStorage.getItem('study_nest_notifications_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return STUDY_NOTIFICATIONS;
  });

  // Active category filter
  const [activeCategory, setActiveCategory] = useState<
    'ALL' | 'ACTIVE_CLASS' | 'POSTPONED' | 'FEST' | 'EVENT' | 'LECTURE' | 'ADMIN_UPDATE'
  >('ALL');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Unread only toggle
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Selected notification for modal viewing
  const [selectedNotif, setSelectedNotif] = useState<StudyNotification | null>(null);

  // Live class simulation modal
  const [liveClassModal, setLiveClassModal] = useState<StudyNotification | null>(null);

  // Save to local storage on update
  const saveNotifications = (newList: StudyNotification[]) => {
    setNotifications(newList);
    localStorage.setItem('study_nest_notifications_data', JSON.stringify(newList));
  };

  // Toggle read status for single item
  const handleToggleRead = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = notifications.map(n => 
      n.id === id ? { ...n, isRead: !n.isRead } : n
    );
    saveNotifications(updated);
  };

  // Mark all as read
  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    saveNotifications(updated);
    if (triggerToast) {
      triggerToast('All notifications marked as read! ✨');
    }
  };

  // Reset to original data
  const handleResetData = () => {
    saveNotifications(STUDY_NOTIFICATIONS);
    if (triggerToast) {
      triggerToast('Reset notification feed to default data.');
    }
  };

  // Notification action handler
  const handleActionClick = (notif: StudyNotification, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Automatically mark as read
    if (!notif.isRead) {
      const updated = notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n);
      saveNotifications(updated);
    }

    if (notif.actionType === 'JOIN_CLASS') {
      setLiveClassModal(notif);
    } else if (notif.actionType === 'REGISTER') {
      if (triggerToast) {
        triggerToast(`🎉 Successfully registered for "${notif.title}"! Entry pass sent to profile.`);
      }
    } else if (notif.actionType === 'REMINDER') {
      if (triggerToast) {
        triggerToast(`⏰ Reminder alarm synchronized for ${notif.title}!`);
      }
    } else if (notif.actionType === 'VIEW_SCHEDULE') {
      setSelectedNotif(notif);
    } else if (notif.actionType === 'DOWNLOAD_FLYER') {
      if (triggerToast) {
        triggerToast(`📥 Downloading official flyer for ${notif.title}...`);
      }
    } else {
      setSelectedNotif(notif);
    }
  };

  // Filtered list
  const filteredNotifications = useMemo(() => {
    return notifications.filter(item => {
      // Category filter
      if (activeCategory !== 'ALL' && item.category !== activeCategory) {
        return false;
      }
      // Unread only
      if (showUnreadOnly && item.isRead) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSummary = item.summary.toLowerCase().includes(query);
        const matchesInstructor = (item.instructorOrHost || '').toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSummary && !matchesInstructor && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [notifications, activeCategory, showUnreadOnly, searchQuery]);

  // Counts for tabs
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const activeClassCount = notifications.filter(n => n.category === 'ACTIVE_CLASS').length;
  const postponedCount = notifications.filter(n => n.category === 'POSTPONED').length;
  const festCount = notifications.filter(n => n.category === 'FEST').length;
  const eventCount = notifications.filter(n => n.category === 'EVENT').length;
  const lectureCount = notifications.filter(n => n.category === 'LECTURE').length;
  const adminCount = notifications.filter(n => n.category === 'ADMIN_UPDATE').length;

  return (
    <div className="text-left space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-amber-700 animate-pulse" />
              <span>Real-Time Broadcast Feed</span>
            </span>
            <span className="text-[11px] text-stone-500 font-serif">Academic Term 2026</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-1.5 flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-amber-800" />
            <span>Sanctuary Notifications & Updates</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Instant updates on active classes, rescheduled lectures, upcoming grand fests, workshops & institutional news.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              unreadCount > 0
                ? 'bg-[#1C1917] hover:bg-stone-800 text-amber-300 hover:text-white shadow-sm'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Read ({unreadCount})</span>
          </button>

          <button
            onClick={handleResetData}
            title="Reset feed"
            className="p-2.5 border border-stone-200 hover:bg-stone-100 text-stone-600 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Summary Highlight Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Active Classes Card */}
        <button
          onClick={() => setActiveCategory('ACTIVE_CLASS')}
          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative overflow-hidden ${
            activeCategory === 'ACTIVE_CLASS'
              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/30'
              : 'bg-white border-stone-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Radio className="w-4 h-4 animate-pulse text-emerald-600" />
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              {activeClassCount} Active
            </span>
          </div>
          <div className="text-xl font-bold font-serif text-stone-900 mt-2">Active Classes</div>
          <p className="text-[11px] text-emerald-700 mt-0.5 font-sans">Live & ongoing today</p>
        </button>

        {/* Postponed / Rescheduled Card */}
        <button
          onClick={() => setActiveCategory('POSTPONED')}
          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative overflow-hidden ${
            activeCategory === 'POSTPONED'
              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/30'
              : 'bg-white border-stone-200 hover:border-amber-300'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              {postponedCount} Changed
            </span>
          </div>
          <div className="text-xl font-bold font-serif text-stone-900 mt-2">Postponed</div>
          <p className="text-[11px] text-amber-700 mt-0.5 font-sans">Revised timetables</p>
        </button>

        {/* Fests & Celebrations Card */}
        <button
          onClick={() => setActiveCategory('FEST')}
          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative overflow-hidden ${
            activeCategory === 'FEST'
              ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-400/30'
              : 'bg-white border-stone-200 hover:border-purple-300'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <PartyPopper className="w-4 h-4 text-purple-700" />
            </span>
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
              {festCount} Fests
            </span>
          </div>
          <div className="text-xl font-bold font-serif text-stone-900 mt-2">Annual Fests</div>
          <p className="text-[11px] text-purple-700 mt-0.5 font-sans">Nestoria 2026 & Poetry</p>
        </button>

        {/* Lectures & Events Card */}
        <button
          onClick={() => setActiveCategory('LECTURE')}
          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative overflow-hidden ${
            activeCategory === 'LECTURE'
              ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-400/30'
              : 'bg-white border-stone-200 hover:border-blue-300'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4 text-blue-700" />
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
              {lectureCount} Upcoming
            </span>
          </div>
          <div className="text-xl font-bold font-serif text-stone-900 mt-2">Lectures & Talks</div>
          <p className="text-[11px] text-blue-700 mt-0.5 font-sans">Marathons & Topper tips</p>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border-2 border-stone-850 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by topic, instructor, fest, postponed class, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-xs font-serif text-stone-900 focus:outline-none focus:border-stone-850 transition-colors placeholder-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Unread Only Toggle & Results Count */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer font-serif select-none">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="w-4 h-4 rounded text-amber-800 focus:ring-amber-800 border-stone-300"
            />
            <span>Unread Only ({unreadCount})</span>
          </label>

          <span className="text-stone-300">|</span>

          <span className="text-xs text-stone-500 font-mono">
            {filteredNotifications.length} of {notifications.length} Alerts
          </span>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        {[
          { key: 'ALL', label: 'All Alerts', count: notifications.length, icon: Bell },
          { key: 'ACTIVE_CLASS', label: 'Active Classes (Live)', count: activeClassCount, icon: Radio },
          { key: 'POSTPONED', label: 'Postponed / Rescheduled', count: postponedCount, icon: AlertTriangle },
          { key: 'FEST', label: 'Fests & Celebrations', count: festCount, icon: PartyPopper },
          { key: 'EVENT', label: 'Events & Workshops', count: eventCount, icon: Sparkles },
          { key: 'LECTURE', label: 'Special Lectures', count: lectureCount, icon: BookOpen },
          { key: 'ADMIN_UPDATE', label: 'General / Admin', count: adminCount, icon: Megaphone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1C1917] text-amber-300 shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-stone-800 text-amber-200' : 'bg-stone-200 text-stone-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notification Cards List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-stone-300 rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-serif text-stone-800">No matching notifications found</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Try adjusting your search query or reset your category filter to see all broadcast updates.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('ALL');
              setShowUnreadOnly(false);
            }}
            className="px-4 py-2 bg-stone-900 text-amber-300 text-xs font-semibold rounded-xl uppercase tracking-wider cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredNotifications.map((notif) => {
            const isUnread = !notif.isRead;

            return (
              <div
                key={notif.id}
                onClick={() => setSelectedNotif(notif)}
                className={`bg-white border-2 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md cursor-pointer relative overflow-hidden ${
                  isUnread ? 'border-amber-400/80 bg-amber-50/20' : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                {/* Unread Left Border Highlight */}
                {isUnread && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-600" />
                )}

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Icon & Content */}
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Category Icon Badge */}
                    <div className="shrink-0 mt-0.5">
                      {notif.category === 'ACTIVE_CLASS' && (
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                          <Radio className="w-5 h-5 animate-pulse text-emerald-600" />
                        </div>
                      )}
                      {notif.category === 'POSTPONED' && (
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
                          <AlertTriangle className="w-5 h-5 text-amber-700" />
                        </div>
                      )}
                      {notif.category === 'FEST' && (
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shadow-xs">
                          <PartyPopper className="w-5 h-5 text-purple-700" />
                        </div>
                      )}
                      {notif.category === 'EVENT' && (
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shadow-xs">
                          <Sparkles className="w-5 h-5 text-blue-700" />
                        </div>
                      )}
                      {notif.category === 'LECTURE' && (
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shadow-xs">
                          <BookOpen className="w-5 h-5 text-indigo-700" />
                        </div>
                      )}
                      {notif.category === 'ADMIN_UPDATE' && (
                        <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center shadow-xs">
                          <Megaphone className="w-5 h-5 text-stone-700" />
                        </div>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="space-y-1.5 flex-1">
                      {/* Badge and Timestamps */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${notif.badgeColor}`}>
                          {notif.categoryLabel}
                        </span>

                        {notif.isUrgent && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Flame className="w-3 h-3 text-rose-600" /> Urgent
                          </span>
                        )}

                        <span className="text-[10px] text-stone-400 font-mono">
                          {notif.timestamp}
                        </span>

                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
                        )}
                      </div>

                      {/* Notification Title */}
                      <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                        {notif.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-stone-600 leading-relaxed font-sans">
                        {notif.summary}
                      </p>

                      {/* Metadata Chips: Date, Time, Venue, Instructor */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-stone-500 font-sans">
                        {notif.date && (
                          <span className="flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md text-stone-700 font-medium">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            <span>{notif.date}</span>
                          </span>
                        )}
                        {notif.time && (
                          <span className="flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md text-stone-700 font-medium">
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>{notif.time}</span>
                          </span>
                        )}
                        {notif.instructorOrHost && (
                          <span className="flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md text-stone-700 font-medium">
                            <User className="w-3 h-3 text-stone-400" />
                            <span>{notif.instructorOrHost}</span>
                          </span>
                        )}
                        {notif.venueOrLink && (
                          <span className="flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md text-stone-700 font-medium">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            <span>{notif.venueOrLink}</span>
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {notif.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] text-stone-400 bg-stone-50 border border-stone-200 px-1.5 py-0.2 rounded font-mono">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                    {notif.actionLabel && (
                      <button
                        onClick={(e) => handleActionClick(notif, e)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                          notif.category === 'ACTIVE_CLASS'
                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                            : notif.category === 'FEST'
                            ? 'bg-purple-800 hover:bg-purple-900 text-white'
                            : notif.category === 'POSTPONED'
                            ? 'bg-amber-800 hover:bg-amber-900 text-white'
                            : 'bg-[#1C1917] hover:bg-stone-800 text-amber-300 hover:text-white'
                        }`}
                      >
                        {notif.category === 'ACTIVE_CLASS' && <Video className="w-3.5 h-3.5" />}
                        {notif.category === 'FEST' && <PartyPopper className="w-3.5 h-3.5" />}
                        <span>{notif.actionLabel}</span>
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleToggleRead(notif.id, e)}
                        title={isUnread ? 'Mark as Read' : 'Mark as Unread'}
                        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          isUnread ? 'text-amber-800 hover:bg-amber-100' : 'text-stone-400 hover:bg-stone-100'
                        }`}
                      >
                        {isUnread ? <Check className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNotif(notif);
                        }}
                        className="text-stone-400 hover:text-stone-800 p-1"
                        title="View Full Details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= MODAL 1: FULL NOTIFICATION DETAILS MODAL ================= */}
      {selectedNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-2 border-[#1C1917] rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[0_30px_70px_rgba(28,25,23,0.25)] relative overflow-hidden animate-scale-up text-left font-serif">
            
            <div className="flex justify-between items-start border-b border-stone-200 pb-4 mb-4">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${selectedNotif.badgeColor}`}>
                  {selectedNotif.categoryLabel}
                </span>
                <span className="text-[10px] text-stone-400 ml-2 font-mono">{selectedNotif.timestamp}</span>
              </div>
              <button
                onClick={() => setSelectedNotif(null)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-stone-900 leading-snug mb-3">
              {selectedNotif.title}
            </h3>

            {/* Event Schedule Info Box */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2 mb-4 text-xs font-sans">
              {selectedNotif.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="text-stone-500">Date:</span>
                  <strong className="text-stone-900">{selectedNotif.date}</strong>
                </div>
              )}
              {selectedNotif.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="text-stone-500">Time / Schedule:</span>
                  <strong className="text-stone-900">{selectedNotif.time}</strong>
                </div>
              )}
              {selectedNotif.instructorOrHost && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="text-stone-500">Instructor / Host:</span>
                  <strong className="text-stone-900">{selectedNotif.instructorOrHost}</strong>
                </div>
              )}
              {selectedNotif.venueOrLink && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="text-stone-500">Venue / Location:</span>
                  <strong className="text-stone-900">{selectedNotif.venueOrLink}</strong>
                </div>
              )}
            </div>

            {/* Comprehensive details */}
            <div className="space-y-2 text-xs text-stone-700 font-sans leading-relaxed mb-6">
              <p className="font-medium text-stone-900">{selectedNotif.summary}</p>
              <p className="text-stone-600">{selectedNotif.fullDetails}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t border-stone-200 pt-4">
              <button
                onClick={() => {
                  handleToggleRead(selectedNotif.id);
                  setSelectedNotif(null);
                }}
                className="text-xs text-stone-500 hover:text-stone-800 font-sans underline cursor-pointer"
              >
                {!selectedNotif.isRead ? 'Mark as Read & Close' : 'Close'}
              </button>

              {selectedNotif.actionLabel && (
                <button
                  onClick={() => {
                    const notif = selectedNotif;
                    setSelectedNotif(null);
                    handleActionClick(notif);
                  }}
                  className="px-4 py-2 bg-[#1C1917] hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{selectedNotif.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: LIVE CLASS STREAM SIMULATOR ================= */}
      {liveClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-md animate-fade-in">
          <div className="bg-stone-900 border-2 border-amber-600/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-[0_30px_70px_rgba(0,0,0,0.5)] text-stone-100 relative overflow-hidden animate-scale-up font-serif">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-stone-800 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-[10px] font-bold uppercase tracking-widest font-mono">
                  LIVE STREAM ACTIVE
                </span>
                <span className="text-xs text-stone-400 font-mono">Room A-1 • 142 Seekers Attending</span>
              </div>

              <button
                onClick={() => setLiveClassModal(null)}
                className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video / Whiteboard Mock Container */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-stone-800 flex flex-col justify-between p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-amber-300 font-serif font-bold bg-stone-900/80 px-3 py-1 rounded-lg border border-amber-400/20">
                  {liveClassModal.title.replace('🟢 LIVE NOW: ', '')}
                </span>
                <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded uppercase font-mono">
                  HD 1080p
                </span>
              </div>

              {/* Whiteboard Math Equation Mock */}
              <div className="text-center my-auto space-y-2">
                <div className="text-amber-200 text-lg md:text-xl font-mono tracking-widest font-bold">
                  ax² + bx + c = 0 &nbsp;⟹&nbsp; x = [-b ± √(b² - 4ac)] / 2a
                </div>
                <p className="text-stone-400 text-xs font-sans">
                  "Now notice how Discriminant Δ = b² - 4ac determines real and distinct roots..."
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-400 font-sans border-t border-stone-800/80 pt-2">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{liveClassModal.instructorOrHost || 'Prof. Anant Kulkarni'}</span>
                </span>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Audio & Video Synchronized
                </span>
              </div>
            </div>

            {/* Class info */}
            <p className="text-xs text-stone-300 font-sans leading-relaxed mb-5">
              {liveClassModal.fullDetails}
            </p>

            <div className="flex justify-between items-center border-t border-stone-800 pt-4">
              <button
                onClick={() => setLiveClassModal(null)}
                className="px-4 py-2 border border-stone-700 hover:bg-stone-800 text-stone-300 rounded-xl text-xs uppercase tracking-wider font-sans cursor-pointer"
              >
                Minimize Screen
              </button>

              <button
                onClick={() => {
                  if (triggerToast) {
                    triggerToast('🎤 Hand raised! Instructor will take your question in 60 seconds.');
                  }
                }}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md transition-all font-sans"
              >
                ✋ Raise Hand to Ask Doubt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
