import React from 'react';
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  FlaskConical, 
  ArrowRight, 
  CheckCircle2, 
  BellRing,
  Bookmark,
  Code2,
  FolderDown,
  Youtube,
  Play,
  Clock
} from 'lucide-react';
import { COURSE_INFO, ANNOUNCEMENTS, REPO_URL, YOUTUBE_VIDEOS, getRawUrl, getViewUrl } from '../data/repoData';

interface DashboardOverviewProps {
  setActiveSection: (section: string) => void;
  onOpenFileViewer?: (title: string, path: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveSection, onOpenFileViewer }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl">
        {/* Subtle background graphic */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>GCET IV Year - I Semester • Academic Year 2025</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Deep Learning (DL) Course Resource Portal
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Welcome students! Access all lecture slides, standard reference textbooks, 
            Jupyter lab notebooks, solved math problems, and exam study guides synced directly from our course GitHub repository.
          </p>

          {/* Key Resource Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-left">
              <div className="text-xl font-bold text-red-400">11 Videos</div>
              <div className="text-xs text-slate-400">Sujit Das Academy</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-left">
              <div className="text-xl font-bold text-blue-400">5 Units</div>
              <div className="text-xs text-slate-400">Theory Syllabus & Slides</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-left">
              <div className="text-xl font-bold text-indigo-400">10 Weeks</div>
              <div className="text-xs text-slate-400">Jupyter Lab Notebooks</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-left">
              <div className="text-xl font-bold text-emerald-400">6 Books</div>
              <div className="text-xs text-slate-400">Full Reference PDFs</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-left">
              <div className="text-xl font-bold text-amber-400">Exam Guides</div>
              <div className="text-xs text-slate-400">Math & Solved Qs</div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveSection('videos')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              <span>Watch Video Lectures (11)</span>
            </button>

            <button
              onClick={() => setActiveSection('lab')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Explore Lab Notebooks</span>
            </button>

            <button
              onClick={() => setActiveSection('notes')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Exam Prep & Math Qs</span>
            </button>

            <button
              onClick={() => setActiveSection('ai-tutor')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-bold border border-slate-700 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Video Lectures Showcase */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
              <Youtube className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Featured Video Lectures — Sujit Das Academy</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 font-bold border border-red-200 dark:border-red-800">
                  11 Lectures
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Online video tutorials for GATE, UGC NET, JNTUH & GCET Deep Learning curriculum
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveSection('videos')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
          >
            <span>View All 11 Video Tutorials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {YOUTUBE_VIDEOS.slice(0, 4).map((video) => (
            <div
              key={video.video_id}
              onClick={() => setActiveSection('videos')}
              className="group bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 overflow-hidden hover:border-red-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-slate-950/90 text-white text-[10px] font-mono font-bold rounded">
                  {video.duration}
                </div>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
                    {video.unit} • {video.channel_name}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h4>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Published {video.publish_date}</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Watch Now →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Essential Resources Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span>Essential Downloads & Quick Links</span>
          </h3>
          <span className="text-xs text-slate-500">Direct raw download links</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Lab Manual Card */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <FlaskConical className="w-5 h-5" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
                Lab Manual
              </span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-blue-600 transition-colors">
              DL Lab Manual 2026-27
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
              Official practical experiment manual covering Weeks 1 to 10 algorithms, datasets, and instructions.
            </p>
            <div className="flex items-center space-x-2">
              <a
                href={getRawUrl('LAB/Lab Manual/DL LAB Manual 26-27.pdf')}
                download
                className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <a
                href={getViewUrl('LAB/Lab Manual/DL LAB Manual 26-27.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 text-xs"
                title="View on GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Exam Questions Card */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-400 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800">
                Exam Essential
              </span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-amber-600 transition-colors">
              DL Important Questions
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
              Unit-wise essential theoretical & analytical questions compiled for mid-term and semester exams.
            </p>
            <div className="flex items-center space-x-2">
              <a
                href={getRawUrl('important_notes/DL_important_questions.pdf')}
                download
                className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <a
                href={getViewUrl('important_notes/DL_important_questions.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 text-xs"
                title="View on GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Main Goodfellow Book Card */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-400 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                Core Textbook
              </span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-emerald-600 transition-colors">
              Goodfellow Deep Learning Book
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
              MIT Press benchmark reference text by Ian Goodfellow, Yoshua Bengio & Aaron Courville (16.1 MB).
            </p>
            <div className="flex items-center space-x-2">
              <a
                href={getRawUrl('books/deeplearningbook.pdf')}
                download
                className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <a
                href={getViewUrl('books/deeplearningbook.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 text-xs"
                title="View on GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Announcements Board & Course Info Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Announcements List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <BellRing className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Course Updates</h3>
            </div>
            <span className="text-[11px] text-slate-500">Live from GitHub</span>
          </div>

          <div className="space-y-3">
            {ANNOUNCEMENTS.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 flex items-start space-x-3 hover:border-slate-300 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                    {item.content}
                  </p>
                  {item.linkPath && (
                    <a
                      href={getRawUrl(item.linkPath)}
                      download
                      className="inline-flex items-center space-x-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Open File Attachment</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Repository Specs & Course Details */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold mb-3">
              <Code2 className="w-4 h-4" />
              <span>Repository Architecture</span>
            </div>

            <h3 className="text-base font-bold text-white mb-2">
              sujit4uwbslg / gcet_IV-I_2025
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All files are synced directly to raw GitHub releases. You can clone the repository, download specific PDF modules, or launch Jupyter notebooks locally.
            </p>

            <ul className="space-y-2 text-xs text-slate-300 mb-6">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Theory: Units I through V lecture slides</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Lab: Weeks 1-10 Jupyter Notebooks (.ipynb)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Books: 6 Full-length PDF textbooks</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Exam: Solved math numericals & questions</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all"
            >
              <FolderDown className="w-4 h-4" />
              <span>View Source on GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
