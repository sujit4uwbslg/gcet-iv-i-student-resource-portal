import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  FileText, 
  FileCode2, 
  Presentation, 
  Download, 
  ExternalLink, 
  Search, 
  Filter, 
  RefreshCw, 
  Code2, 
  CheckCircle2,
  FileSpreadsheet,
  File
} from 'lucide-react';
import { REPO_OWNER, REPO_NAME, REPO_BRANCH, REPO_URL, getRawUrl, getViewUrl } from '../data/repoData';

interface GithubExplorerProps {
  searchQuery?: string;
  onOpenFileViewer?: (title: string, path: string) => void;
}

interface TreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}

export const GithubExplorer: React.FC<GithubExplorerProps> = ({
  searchQuery = '',
  onOpenFileViewer,
}) => {
  const [treeItems, setTreeItems] = useState<TreeItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const effectiveSearch = searchQuery || localSearch;

  const fetchTree = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/github-tree');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data.tree)) {
        // Filter out directory entries, keep only blobs (files)
        setTreeItems(data.tree.filter((item: TreeItem) => item.type === 'blob'));
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      console.error('Error fetching tree:', err);
      setError(err.message || 'Failed to fetch repository tree from server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTree();
  }, []);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileExtension = (path: string) => {
    const parts = path.split('.');
    return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
  };

  const filteredFiles = treeItems.filter((item) => {
    const ext = getFileExtension(item.path);
    const matchesSearch = item.path.toLowerCase().includes(effectiveSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (fileTypeFilter === 'pdf') return ext === 'pdf';
    if (fileTypeFilter === 'ipynb') return ext === 'ipynb';
    if (fileTypeFilter === 'pptx') return ext === 'pptx' || ext === 'ppt';
    if (fileTypeFilter === 'data') return ext === 'csv' || ext === 'txt';

    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Interactive Repository Explorer</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Live browser for all files in <code className="text-slate-700 dark:text-slate-300">{REPO_OWNER}/{REPO_NAME}</code> ({treeItems.length} total files).
          </p>
        </div>

        {/* Refresh & Branch info */}
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchTree}
            disabled={isLoading}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Tree</span>
          </button>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Repository</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        
        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search path, filename, extension..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* File Type Filter Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Files' },
            { id: 'pdf', label: 'PDF Documents' },
            { id: 'ipynb', label: 'Notebooks (.ipynb)' },
            { id: 'pptx', label: 'Slides (.pptx)' },
            { id: 'data', label: 'Data & Text' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFileTypeFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                fileTypeFilter === tab.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Files Table / List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {isLoading && treeItems.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs flex flex-col items-center">
            <RefreshCw className="w-6 h-6 animate-spin text-purple-600 mb-2" />
            <span>Fetching repository file tree from GitHub API...</span>
          </div>
        ) : error && treeItems.length === 0 ? (
          <div className="p-8 text-center text-red-500 text-xs">
            <p className="font-bold mb-1">Failed to connect to live GitHub API</p>
            <p className="text-slate-400 mb-3">{error}</p>
            <button
              onClick={fetchTree}
              className="px-4 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">File Name & Path</th>
                  <th className="py-3 px-4 w-28">Type</th>
                  <th className="py-3 px-4 w-28">Size</th>
                  <th className="py-3 px-4 text-right w-44">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredFiles.map((file) => {
                  const ext = getFileExtension(file.path);
                  const rawUrl = getRawUrl(file.path);
                  const viewUrl = getViewUrl(file.path);

                  const isPdf = ext === 'pdf';
                  const isIpynb = ext === 'ipynb';
                  const isPptx = ext === 'pptx' || ext === 'ppt';
                  const isCodeOrTxt = ext === 'py' || ext === 'txt' || ext === 'md' || ext === 'json' || ext === 'csv';

                  return (
                    <tr
                      key={file.path}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      {/* Path & Name */}
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isPdf
                              ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400'
                              : isIpynb
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : isPptx
                              ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          }`}>
                            {isPdf ? <FileText className="w-3.5 h-3.5" /> : isIpynb ? <FileCode2 className="w-3.5 h-3.5" /> : isPptx ? <Presentation className="w-3.5 h-3.5" /> : <File className="w-3.5 h-3.5" />}
                          </div>

                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 dark:text-white truncate">
                              {file.path.split('/').pop()}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono truncate">
                              {file.path}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type Extension */}
                      <td className="py-3 px-4 font-mono text-[11px] uppercase text-slate-500">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold">
                          {ext || 'file'}
                        </span>
                      </td>

                      {/* Size */}
                      <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                        {formatFileSize(file.size)}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Preview Source Button if code/ipynb */}
                          {(isIpynb || isCodeOrTxt) && onOpenFileViewer && (
                            <button
                              onClick={() => onOpenFileViewer(file.path.split('/').pop() || file.path, file.path)}
                              className="px-2 py-1 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Preview source code"
                            >
                              Code
                            </button>
                          )}

                          {/* Raw Download Button */}
                          <a
                            href={rawUrl}
                            download
                            className="p-1.5 bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 hover:bg-blue-100 rounded text-xs transition-colors"
                            title="Download raw file"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>

                          {/* GitHub Link */}
                          <a
                            href={viewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 rounded text-xs transition-colors"
                            title="View on GitHub"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredFiles.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-xs">
                No files matched your search or filter selection.
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
