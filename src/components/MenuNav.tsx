import React from 'react';
import { 
  LayoutDashboard, 
  BookMarked, 
  GraduationCap, 
  FlaskConical, 
  FileCheck2, 
  FolderGit2, 
  Sparkles,
  Youtube,
  Bell
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface MenuNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'notices', label: 'Notice Board', icon: Bell, badge: 'Live Updates', badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
  { id: 'videos', label: 'Video Lectures', icon: Youtube, badge: 'Sujit Das Academy', badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
  { id: 'books', label: 'Textbooks', icon: BookMarked, badge: '6 Books', badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  { id: 'theory', label: 'Theory & Units', icon: GraduationCap, badge: 'Units I-V', badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  { id: 'lab', label: 'Lab & Code', icon: FlaskConical, badge: 'Weeks 1-10', badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
  { id: 'notes', label: 'Exam Notes', icon: FileCheck2, badge: 'Mid/Sem Prep', badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  { id: 'explorer', label: 'GitHub Explorer', icon: FolderGit2, badge: 'Live Tree', badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
  { id: 'ai-tutor', label: 'AI Study Tutor', icon: Sparkles, badge: 'Gemini AI', badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20' },
];

export const MenuNav: React.FC<MenuNavProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[61px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-500'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium border ${
                      isActive
                        ? 'bg-white/20 text-white border-white/30'
                        : item.badgeColor || 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
