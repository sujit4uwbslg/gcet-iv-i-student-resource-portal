import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  Presentation, 
  Code, 
  Download, 
  ExternalLink, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  FileCode2
} from 'lucide-react';
import { UNITS, HOMEWORK_ASSIGNMENTS, getRawUrl, getViewUrl } from '../data/repoData';

interface TheoryUnitsSectionProps {
  searchQuery?: string;
  onOpenFileViewer?: (title: string, path: string) => void;
}

export const TheoryUnitsSection: React.FC<TheoryUnitsSectionProps> = ({
  searchQuery = '',
  onOpenFileViewer,
}) => {
  const [activeUnitNumber, setActiveUnitNumber] = useState<number>(1);

  const selectedUnit = UNITS.find((u) => u.unitNumber === activeUnitNumber) || UNITS[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Theory Syllabus & Unit-wise Resources</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Lecture decks, presentation slides, Jupyter theory notebooks, research papers, and homework assignments for Units 1 to 5.
        </p>
      </div>

      {/* Unit Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {UNITS.map((unit) => {
          const isActive = unit.unitNumber === activeUnitNumber;
          return (
            <button
              key={unit.unitNumber}
              onClick={() => setActiveUnitNumber(unit.unitNumber)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-500/50'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>Unit {unit.unitNumber}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {unit.files.length} Files
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Unit Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
        
        {/* Unit Info Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
            <span>Syllabus Unit {selectedUnit.unitNumber}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {selectedUnit.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {selectedUnit.description}
          </p>

          {/* Key Topics List */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2">
              Key Syllabus Topics Covered:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedUnit.topics.map((topic, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Files Grid for Active Unit */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">
            Unit Materials & Files ({selectedUnit.files.length}):
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedUnit.files.map((file, idx) => {
              const isNotebook = file.type === 'ipynb';
              const isPresentation = file.type === 'pptx';

              return (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isNotebook
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : isPresentation
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {isNotebook ? <FileCode2 className="w-4 h-4" /> : isPresentation ? <Presentation className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>

                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-mono font-bold border ${
                        isNotebook
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                          : isPresentation
                          ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300'
                          : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300'
                      }`}>
                        {file.type}
                      </span>
                    </div>

                    <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                      {file.title}
                    </h5>

                    {file.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        {file.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-2">
                    <a
                      href={file.downloadUrl}
                      download
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>

                    {isNotebook && onOpenFileViewer && (
                      <button
                        onClick={() => onOpenFileViewer(file.title, file.path)}
                        className="px-2.5 py-1.5 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 rounded-lg text-xs font-semibold border border-indigo-200 dark:border-indigo-800 transition-all cursor-pointer"
                        title="View Notebook Code"
                      >
                        Code
                      </button>
                    )}

                    <a
                      href={file.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-200/80 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-xs transition-all"
                      title="View on GitHub"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Homework Assignments Section */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Weekly Homework Assignments</h3>
          </div>
          <span className="text-xs text-slate-400">Theory Practice Questions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOMEWORK_ASSIGNMENTS.map((hw, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  Assignment {idx + 1}
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{hw.title}</h4>
                <p className="text-xs text-slate-300 mb-4">{hw.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={hw.downloadUrl}
                  download
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Assignment PDF</span>
                </a>
                <a
                  href={hw.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs"
                  title="View on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
