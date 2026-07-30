import React, { useState } from 'react';
import { 
  FlaskConical, 
  FileCode2, 
  Download, 
  ExternalLink, 
  Code2, 
  Database, 
  Play, 
  CheckCircle2,
  Terminal,
  Search
} from 'lucide-react';
import { LAB_WEEKS, getRawUrl, getViewUrl } from '../data/repoData';

interface LabNotebooksSectionProps {
  searchQuery?: string;
  onOpenFileViewer?: (title: string, path: string) => void;
}

export const LabNotebooksSection: React.FC<LabNotebooksSectionProps> = ({
  searchQuery = '',
  onOpenFileViewer,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const effectiveSearch = searchQuery || filterQuery;

  const filteredWeeks = LAB_WEEKS.filter((week) => {
    const text = `${week.title} ${week.description} ${week.keyConcepts.join(' ')} ${week.notebookName}`.toLowerCase();
    return text.includes(effectiveSearch.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Deep Learning Practical Lab & Jupyter Notebooks</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Week 1 to Week 10 hands-on Python/NumPy/PyTorch implementation notebooks stored in <code className="text-slate-700 dark:text-slate-300">LAB/</code>.
          </p>
        </div>

        {/* Quick Official Lab Manual Link */}
        <a
          href={getRawUrl('LAB/Lab Manual/DL LAB Manual 26-27.pdf')}
          download
          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>Download DL Lab Manual (PDF)</span>
        </a>
      </div>

      {/* Instructions Bar */}
      <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-indigo-900 dark:text-indigo-200">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>
            <strong>How to run notebooks:</strong> Download <code className="bg-indigo-100 dark:bg-indigo-900 px-1 py-0.5 rounded font-mono">.ipynb</code> files and open in Google Colab, Jupyter Lab, or VS Code.
          </span>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <a
            href="https://colab.research.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Open Google Colab</span>
          </a>
        </div>
      </div>

      {/* Week-by-Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredWeeks.map((week) => (
          <div
            key={week.weekNumber}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-extrabold border border-indigo-200 dark:border-indigo-800">
                  WEEK {week.weekNumber}
                </span>

                <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                  {week.notebookName}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {week.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {week.description}
              </p>

              {/* Concepts Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {week.keyConcepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 font-medium"
                  >
                    #{concept}
                  </span>
                ))}
              </div>

              {/* Datasets Attachment if present */}
              {week.datasets && week.datasets.length > 0 && (
                <div className="mb-4 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    <Database className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Dataset: {week.datasets[0].name}</span>
                  </div>
                  <a
                    href={week.datasets[0].downloadUrl}
                    download
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center space-x-1"
                  >
                    <span>Download CSV</span>
                    <Download className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
              <a
                href={week.downloadUrl}
                download
                className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .ipynb</span>
              </a>

              {onOpenFileViewer && (
                <button
                  onClick={() => onOpenFileViewer(week.title, week.notebookPath)}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center space-x-1"
                  title="View Notebook Source"
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Code</span>
                </button>
              )}

              <a
                href={week.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium transition-all border border-slate-200 dark:border-slate-700"
                title="View on GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
