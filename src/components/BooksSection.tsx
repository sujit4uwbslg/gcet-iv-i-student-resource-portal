import React, { useState } from 'react';
import { BookMarked, Download, ExternalLink, Search, Tag, FileText, Check } from 'lucide-react';
import { TEXTBOOKS } from '../data/repoData';

interface BooksSectionProps {
  searchQuery?: string;
}

export const BooksSection: React.FC<BooksSectionProps> = ({ searchQuery = '' }) => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const allTags = Array.from(
    new Set(TEXTBOOKS.flatMap((b) => b.tags))
  );

  const filteredBooks = TEXTBOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = filterTag === 'all' || book.tags.includes(filterTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Standard Reference Textbooks</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Full PDF versions of core Deep Learning and Linear Algebra reference books stored in <code className="text-slate-700 dark:text-slate-300">books/</code>.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterTag('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterTag === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Books ({TEXTBOOKS.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filterTag === tag
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between p-5 group"
          >
            <div>
              {/* Top Bar */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-medium border border-slate-200 dark:border-slate-700">
                  {book.size}
                </span>
              </div>

              {/* Title & Author */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {book.title}
              </h3>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Author: {book.author}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {book.description}
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                  >
                    <Tag className="w-2.5 h-2.5 text-slate-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Download & GitHub Links */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
              <a
                href={book.downloadUrl}
                download
                className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <a
                href={book.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium transition-all border border-slate-200 dark:border-slate-700"
                title="View PDF on GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <BookMarked className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No textbooks matched your search query</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting search keywords or selecting "All Books"</p>
        </div>
      )}

    </div>
  );
};
