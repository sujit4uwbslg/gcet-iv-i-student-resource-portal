import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Calendar, 
  UserCheck, 
  ExternalLink, 
  Download, 
  Share2, 
  Check, 
  Copy, 
  BookOpen, 
  FlaskConical, 
  Youtube, 
  FileText, 
  Filter, 
  Search, 
  Pin,
  ArrowRight,
  Sparkles,
  Info,
  ChevronRight,
  Printer,
  X
} from 'lucide-react';
import { ANNOUNCEMENTS, COURSE_INFO, getRawUrl, getViewUrl } from '../data/repoData';
import { CourseAnnouncement } from '../types';

interface NoticeBoardSectionProps {
  searchQuery?: string;
  selectedNoticeId?: string | null;
  onOpenFileViewer: (title: string, path: string) => void;
  setActiveSection: (section: string) => void;
}

export const NoticeBoardSection: React.FC<NoticeBoardSectionProps> = ({
  searchQuery = '',
  selectedNoticeId = null,
  onOpenFileViewer,
  setActiveSection,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [activeModalNotice, setActiveModalNotice] = useState<CourseAnnouncement | null>(
    selectedNoticeId ? ANNOUNCEMENTS.find((a) => a.id === selectedNoticeId) || null : null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Combine parent global search with local notice search
  const effectiveSearch = (searchQuery || localSearch).trim().toLowerCase();

  const filteredNotices = ANNOUNCEMENTS.filter((notice) => {
    const matchesCategory =
      categoryFilter === 'all' ||
      (categoryFilter === 'urgent' && notice.priority === 'Urgent') ||
      notice.tag.toLowerCase() === categoryFilter.toLowerCase();

    if (!effectiveSearch) return matchesCategory;

    const matchesSearch =
      notice.title.toLowerCase().includes(effectiveSearch) ||
      notice.content.toLowerCase().includes(effectiveSearch) ||
      notice.summary.toLowerCase().includes(effectiveSearch) ||
      (notice.author && notice.author.toLowerCase().includes(effectiveSearch)) ||
      (notice.detailsList && notice.detailsList.some((d) => d.toLowerCase().includes(effectiveSearch)));

    return matchesCategory && matchesSearch;
  });

  const handleCopyNotice = (notice: CourseAnnouncement) => {
    const textToCopy = `[GCET Deep Learning Notice - ${notice.date}]\n${notice.title}\n\n${notice.content}\n\nDetails:\n${notice.detailsList?.map((d) => `• ${d}`).join('\n') || ''}\n\nIssued by: ${notice.author || 'Course Coordinator'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(notice.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleActionClick = (notice: CourseAnnouncement) => {
    if (notice.externalUrl) {
      window.open(notice.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (notice.linkPath) {
      onOpenFileViewer(notice.title, notice.linkPath);
    } else if (notice.targetSection) {
      setActiveSection(notice.targetSection);
    }
  };

  const getCategoryBadge = (tag: string, priority?: string) => {
    if (priority === 'Urgent') {
      return {
        bg: 'bg-red-500/10 dark:bg-red-950/60 text-red-600 dark:text-red-400 border-red-500/30',
        icon: AlertTriangle,
        label: 'Urgent Circular',
      };
    }
    switch (tag) {
      case 'Exam':
        return {
          bg: 'bg-amber-500/10 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-500/30',
          icon: FileText,
          label: 'Exam Schedule',
        };
      case 'Lab':
        return {
          bg: 'bg-indigo-500/10 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
          icon: FlaskConical,
          label: 'Lab & Evaluation',
        };
      case 'Video':
        return {
          bg: 'bg-rose-500/10 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-500/30',
          icon: Youtube,
          label: 'Video Lecture',
        };
      case 'Academic':
        return {
          bg: 'bg-blue-500/10 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-500/30',
          icon: BookOpen,
          label: 'Academic Note',
        };
      default:
        return {
          bg: 'bg-slate-500/10 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-500/30',
          icon: Info,
          label: 'General Notice',
        };
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner: Academic Notice Board Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30">
            <Bell className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>Official Academic Notice Board • {COURSE_INFO.courseCode}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Course Circulars, Exam Timetables & Important Notices
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            Stay updated with real-time academic announcements, continuous lab evaluation deadlines, 
            mid-semester examination schedules, homework releases, and reference material circulars 
            issued by the Department of CSE & Geethanjali College of Engineering and Technology.
          </p>

          {/* Metrics & Quick Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-bold text-white">{ANNOUNCEMENTS.length} Notices</div>
              <div className="text-[11px] text-slate-400">Total Active Circulars</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-bold text-red-400">
                {ANNOUNCEMENTS.filter((a) => a.priority === 'Urgent').length} Urgent
              </div>
              <div className="text-[11px] text-slate-400">Mid Exam & Deadlines</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-bold text-indigo-400">GCET CSE / AI&ML</div>
              <div className="text-[11px] text-slate-400">Issuing Department</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-bold text-emerald-400">2025-2026</div>
              <div className="text-[11px] text-slate-400">IV Year I Semester</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Notices ({ANNOUNCEMENTS.length})
          </button>
          
          <button
            onClick={() => setCategoryFilter('urgent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1 ${
              categoryFilter === 'urgent'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Urgent Circulars</span>
          </button>

          <button
            onClick={() => setCategoryFilter('exam')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              categoryFilter === 'exam'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Exam & Tests
          </button>

          <button
            onClick={() => setCategoryFilter('lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              categoryFilter === 'lab'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Lab & Code
          </button>

          <button
            onClick={() => setCategoryFilter('video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              categoryFilter === 'video'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Video Lectures
          </button>
        </div>

        {/* Local Search within Notices */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notice text, tags, units..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-medium text-sm">No notices found matching your current filter.</p>
          <button
            onClick={() => {
              setCategoryFilter('all');
              setLocalSearch('');
            }}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => {
            const badge = getCategoryBadge(notice.tag, notice.priority);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={notice.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md ${
                  notice.priority === 'Urgent'
                    ? 'border-red-300 dark:border-red-900/60 ring-1 ring-red-500/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="p-5 sm:p-6">
                  
                  {/* Top Meta Line: Badges, Date, Author */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center space-x-1 text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${badge.bg}`}>
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </span>

                      {notice.isPinned && (
                        <span className="inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800">
                          <Pin className="w-2.5 h-2.5 fill-current" />
                          <span>Pinned Notice</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center space-x-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{notice.date}</span>
                      </span>
                      {notice.author && (
                        <span className="hidden sm:flex items-center space-x-1">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{notice.author}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {notice.content}
                    </p>
                  </div>

                  {/* Highlighted Detail Bullet Points */}
                  {notice.detailsList && notice.detailsList.length > 0 && (
                    <div className="mb-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                      <div className="font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center space-x-1.5">
                        <Info className="w-3.5 h-3.5 text-blue-500" />
                        <span>Official Circular Directives & Guidelines:</span>
                      </div>
                      <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-300">
                        {notice.detailsList.map((detail, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    
                    <div className="flex items-center space-x-2">
                      {notice.actionLabel && (
                        <button
                          onClick={() => handleActionClick(notice)}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                        >
                          <span>{notice.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => setActiveModalNotice(notice)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span>Full Page Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleCopyNotice(notice)}
                        className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs transition-colors cursor-pointer"
                        title="Copy notice text"
                      >
                        {copiedId === notice.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {notice.linkPath && (
                        <a
                          href={getRawUrl(notice.linkPath)}
                          download
                          className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs transition-colors"
                          title="Download attached resource"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}

                      {notice.externalUrl && (
                        <a
                          href={notice.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs transition-colors"
                          title="Open external link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fresh Page Full-Screen Modal Viewer for Detailed Circulars */}
      {activeModalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Official Course Circular Details
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Ref ID: {activeModalNotice.id} • {activeModalNotice.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  title="Print Notice"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModalNotice(null)}
                  className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6">
              
              {/* Institution Seal & Meta */}
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/40 text-center">
                <h4 className="font-bold text-sm text-blue-950 dark:text-blue-200 uppercase tracking-wide">
                  {COURSE_INFO.institution}
                </h4>
                <p className="text-[11px] text-blue-800 dark:text-blue-300">
                  {COURSE_INFO.department} • {COURSE_INFO.courseCode}
                </p>
                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                  Date of Issue: {activeModalNotice.date} | Issued By: {activeModalNotice.author || 'Academic Coordinator'}
                </div>
              </div>

              {/* Title & Core Content */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {activeModalNotice.title}
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeModalNotice.content}
                </p>
              </div>

              {/* Bullet Directives */}
              {activeModalNotice.detailsList && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide text-[11px]">
                    Detailed Guidelines & Submission Directives:
                  </h5>
                  <ul className="space-y-2 list-disc pl-5 text-slate-600 dark:text-slate-300">
                    {activeModalNotice.detailsList.map((d, i) => (
                      <li key={i} className="leading-relaxed">{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Linked Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500">
                  For clarifications, contact course coordinator or lab mentor.
                </div>

                <div className="flex items-center space-x-2">
                  {activeModalNotice.actionLabel && (
                    <button
                      onClick={() => {
                        const notice = activeModalNotice;
                        setActiveModalNotice(null);
                        handleActionClick(notice);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
                    >
                      <span>{activeModalNotice.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
