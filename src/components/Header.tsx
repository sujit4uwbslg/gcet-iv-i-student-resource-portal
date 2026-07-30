import React from 'react';
import { BookOpen, Github, ExternalLink, Sparkles, Search, Download, Bookmark, Share2, Check } from 'lucide-react';
import { COURSE_INFO, REPO_URL } from '../data/repoData';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  setActiveSection,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Branding & Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-xl ring-2 ring-blue-400/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  GCET IV-I Deep Learning
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30">
                    2025 Course Portal
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Department of CSE & AI/ML • Geethanjali College of Eng. & Tech
              </p>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            
            {/* Global Search Bar */}
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes, books, lab code, units..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-800/90 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick AI Assistant Button */}
            <button
              onClick={() => setActiveSection('ai-tutor')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all whitespace-nowrap cursor-pointer ring-1 ring-indigo-400/30"
              title="Ask AI Tutor"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>

            {/* Share Portal Button */}
            <button
              onClick={handleCopyLink}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
              title="Share portal link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* GitHub Repo Link Button */}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium border border-slate-700 transition-all whitespace-nowrap"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">GitHub Repo</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
