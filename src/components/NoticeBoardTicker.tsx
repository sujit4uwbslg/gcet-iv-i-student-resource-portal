import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  ChevronRight, 
  ChevronLeft, 
  Pause, 
  Play, 
  AlertCircle, 
  Sparkles, 
  ExternalLink,
  ArrowRight,
  Bell
} from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/repoData';
import { CourseAnnouncement } from '../types';

interface NoticeBoardTickerProps {
  onSelectNotice: (notice: CourseAnnouncement) => void;
  onOpenNoticeBoard: () => void;
}

export const NoticeBoardTicker: React.FC<NoticeBoardTickerProps> = ({
  onSelectNotice,
  onOpenNoticeBoard,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const notices = ANNOUNCEMENTS;

  useEffect(() => {
    if (isPaused || notices.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, notices.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + notices.length) % notices.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % notices.length);
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused((prev) => !prev);
  };

  if (notices.length === 0) return null;

  const currentNotice = notices[currentIndex];

  const getBadgeStyle = (tag: string, priority?: string) => {
    if (priority === 'Urgent') return 'bg-red-500 text-white font-bold animate-pulse';
    if (tag === 'Exam') return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    if (tag === 'Lab') return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    if (tag === 'Video') return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  };

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-800 shadow-md relative z-20 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Left Badge: Notice Board Label */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenNoticeBoard}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold tracking-wide uppercase text-[10px] shadow-xs cursor-pointer transition-all"
            title="Open Complete Notice Board"
          >
            <Bell className="w-3 h-3 animate-bounce" />
            <span>Notice Board</span>
            <span className="bg-white/20 text-[9px] px-1 py-0.2 rounded-full font-mono ml-0.5">
              {notices.length}
            </span>
          </button>
          
          <span className="hidden md:inline-block text-[11px] text-slate-400 font-medium">
            Live Circulars & Updates:
          </span>
        </div>

        {/* Center: Scrolling / Animated Partial Info Snippet */}
        <div 
          className="flex-1 min-w-0 w-full sm:w-auto flex items-center justify-between sm:justify-start space-x-3 cursor-pointer group px-2 py-1 rounded-lg hover:bg-slate-900 transition-colors"
          onClick={() => onSelectNotice(currentNotice)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          title="Click to view full notice on the fresh Notice Board page"
        >
          {/* Tag & Priority */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getBadgeStyle(currentNotice.tag, currentNotice.priority)}`}>
              {currentNotice.priority === 'Urgent' ? '⚠️ URGENT' : currentNotice.tag}
            </span>
            <span className="text-[11px] font-mono text-slate-400 hidden lg:inline">
              [{currentNotice.date}]
            </span>
          </div>

          {/* Title & Partial Summary Snippet */}
          <div className="min-w-0 flex-1 flex items-center space-x-2 overflow-hidden">
            <p className="text-xs font-semibold text-slate-100 group-hover:text-blue-400 transition-colors truncate">
              {currentNotice.title}
              <span className="text-slate-400 font-normal ml-2 hidden sm:inline text-[11px]">
                — {currentNotice.summary}
              </span>
            </p>
          </div>

          {/* Click to Open Hint */}
          <span className="hidden xl:inline-flex items-center text-[10px] font-bold text-blue-400 group-hover:underline shrink-0">
            Read Full Notice →
          </span>
        </div>

        {/* Right Controls: Navigation & Full Notice Board Action */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <div className="flex items-center space-x-1 bg-slate-900 rounded-md p-0.5 border border-slate-800">
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
              title="Previous notice"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={togglePause}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3" />}
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
              title="Next notice"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct Button to Fresh Notice Board Page */}
          <button
            onClick={onOpenNoticeBoard}
            className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-blue-200 border border-slate-700 rounded-md text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap"
          >
            <span>All Notices</span>
            <ArrowRight className="w-3 h-3 text-blue-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
