import React, { useState } from 'react';
import { 
  FileCheck2, 
  Download, 
  ExternalLink, 
  Sparkles, 
  AlertCircle, 
  Calculator, 
  BookOpen, 
  FileText,
  Star
} from 'lucide-react';
import { IMPORTANT_NOTES, getRawUrl, getViewUrl } from '../data/repoData';

interface ImportantNotesSectionProps {
  searchQuery?: string;
}

export const ImportantNotesSection: React.FC<ImportantNotesSectionProps> = ({ searchQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredNotes = IMPORTANT_NOTES.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.fileName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>Exam Notes, Important Questions & Math Solutions</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Handwritten and typed revision guides, step-by-step math problem solutions, and exam key questions stored in <code className="text-slate-700 dark:text-slate-300">important_notes/</code>.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Notes ({IMPORTANT_NOTES.length})
          </button>
          <button
            onClick={() => setSelectedCategory('exam')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'exam'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Exam Essential Qs
          </button>
          <button
            onClick={() => setSelectedCategory('math')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'math'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Math Numericals
          </button>
          <button
            onClick={() => setSelectedCategory('unit')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'unit'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Unit Notes
          </button>
        </div>
      </div>

      {/* Notes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotes.map((note) => {
          const isExam = note.isExamEssential;

          return (
            <div
              key={note.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
                isExam
                  ? 'border-amber-300 dark:border-amber-800/80 hover:border-amber-500'
                  : 'border-slate-200 dark:border-slate-800 hover:border-amber-400'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    note.category === 'math'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                      : note.category === 'exam'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {note.category === 'math' ? <Calculator className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {isExam && (
                      <span className="inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold border border-amber-500/30">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>High Priority</span>
                      </span>
                    )}

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                      {note.size}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {note.description}
                </p>
              </div>

              {/* Download Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
                <a
                  href={note.downloadUrl}
                  download
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <a
                  href={note.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium transition-all border border-slate-200 dark:border-slate-700"
                  title="View on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
