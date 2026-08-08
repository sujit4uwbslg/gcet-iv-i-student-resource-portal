import React from 'react';
import { BookOpen, Github, ExternalLink, GraduationCap, Heart } from 'lucide-react';
import { COURSE_INFO, REPO_URL } from '../data/repoData';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Course Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>GCET IV-I Deep Learning (2025)</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Official menu-based student resource portal for IV Year I Semester students of Geethanjali College of Engineering and Technology. Synced directly with the course GitHub repository.
            </p>
            <div className="pt-2">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                <Github className="w-4 h-4" />
                <span>github.com/sujit4uwbslg/gcet_IV-I_2025</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Portal Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveSection('overview')} className="hover:text-white transition-colors cursor-pointer">
                  📌 Overview & Highlights
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('videos')} className="hover:text-white transition-colors cursor-pointer">
                  🎥 Video Lectures (Sujit Das Academy)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('books')} className="hover:text-white transition-colors cursor-pointer">
                  📚 Standard Textbooks
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('theory')} className="hover:text-white transition-colors cursor-pointer">
                  📖 Theory Syllabus (Units 1-5)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('lab')} className="hover:text-white transition-colors cursor-pointer">
                  🧪 Lab Manual & Notebooks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & AI */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Exam & AI Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveSection('notes')} className="hover:text-white transition-colors cursor-pointer">
                  ✍️ Mid/Sem Exam Questions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('explorer')} className="hover:text-white transition-colors cursor-pointer">
                  📂 Live GitHub File Browser
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('ai-tutor')} className="hover:text-white transition-colors cursor-pointer">
                  🤖 Gemini AI Study Assistant
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© 2025 Geethanjali College of Engineering and Technology (GCET) • Department of CSE / AI & ML</p>
          <p className="flex items-center gap-1">
            <span>Built for students with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>& GitHub Integration</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
