import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, ExternalLink, RefreshCw, Code2, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getRawUrl, getViewUrl } from '../data/repoData';

interface FileViewerModalProps {
  title: string;
  filePath: string;
  onClose: () => void;
}

export const FileViewerModal: React.FC<FileViewerModalProps> = ({
  title,
  filePath,
  onClose,
}) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetch(`/api/file-content?path=${encodeURIComponent(filePath)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setContent(data.content);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch file content');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filePath]);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isNotebook = filePath.endsWith('.ipynb');

  // Helper to parse ipynb cells if notebook
  const renderParsedNotebook = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const cells = parsed.cells || [];

      return (
        <div className="space-y-4">
          {cells.map((cell: any, idx: number) => {
            const cellType = cell.cell_type;
            const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source || '';

            if (cellType === 'markdown') {
              return (
                <div key={idx} className="prose prose-xs dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
                </div>
              );
            }

            return (
              <div key={idx} className="rounded-xl overflow-hidden border border-slate-800 font-mono text-xs bg-slate-950">
                <div className="bg-slate-900 px-3 py-1 text-[10px] text-slate-400 font-bold border-b border-slate-800 flex items-center justify-between">
                  <span>In [{idx + 1}]:</span>
                  <span>Python / Jupyter Code</span>
                </div>
                <pre className="p-3 text-slate-200 overflow-x-auto">{source}</pre>
              </div>
            );
          })}
        </div>
      );
    } catch (e) {
      return <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto">{jsonString}</pre>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              {isNotebook ? <Code2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {title}
              </h3>
              <p className="text-[11px] font-mono text-slate-400 truncate max-w-md">
                {filePath}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {content && (
              <button
                onClick={handleCopy}
                className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
                title="Copy file contents"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}

            <a
              href={getRawUrl(filePath)}
              download
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
              title="Download file"
            >
              <Download className="w-4 h-4" />
            </a>

            <a
              href={getViewUrl(filePath)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-xs transition-colors"
              title="View on GitHub"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {isLoading ? (
            <div className="py-16 text-center text-slate-500 flex flex-col items-center">
              <RefreshCw className="w-6 h-6 animate-spin text-indigo-500 mb-2" />
              <span>Fetching file source from repository...</span>
            </div>
          ) : error ? (
            <div className="py-12 text-center text-red-500">
              <p className="font-bold mb-1">Failed to view file preview</p>
              <p className="text-slate-400 text-xs mb-3">{error}</p>
              <a
                href={getRawUrl(filePath)}
                download
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-xs inline-flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File Directly</span>
              </a>
            </div>
          ) : content ? (
            isNotebook ? (
              renderParsedNotebook(content)
            ) : (
              <div className="prose prose-xs dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            )
          ) : null}
        </div>

      </div>
    </div>
  );
};
