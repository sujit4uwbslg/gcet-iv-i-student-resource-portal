import React, { useState } from 'react';
import { Header } from './components/Header';
import { MenuNav } from './components/MenuNav';
import { DashboardOverview } from './components/DashboardOverview';
import { BooksSection } from './components/BooksSection';
import { TheoryUnitsSection } from './components/TheoryUnitsSection';
import { LabNotebooksSection } from './components/LabNotebooksSection';
import { ImportantNotesSection } from './components/ImportantNotesSection';
import { GithubExplorer } from './components/GithubExplorer';
import { AiStudyAssistant } from './components/AiStudyAssistant';
import { FileViewerModal } from './components/FileViewerModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active File Viewer Modal state
  const [viewingFile, setViewingFile] = useState<{ title: string; path: string } | null>(null);

  const handleOpenFileViewer = (title: string, path: string) => {
    setViewingFile({ title, path });
  };

  const handleCloseFileViewer = () => {
    setViewingFile(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Menu-based One Page Navigation */}
      <MenuNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Global Search Banner Notice if query active */}
        {searchQuery.trim() && (
          <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between">
            <span>
              Filtering results across portal for keyword: <strong>"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Section Rendering */}
        {activeSection === 'overview' && (
          <DashboardOverview
            setActiveSection={setActiveSection}
            onOpenFileViewer={handleOpenFileViewer}
          />
        )}

        {activeSection === 'books' && (
          <BooksSection searchQuery={searchQuery} />
        )}

        {activeSection === 'theory' && (
          <TheoryUnitsSection
            searchQuery={searchQuery}
            onOpenFileViewer={handleOpenFileViewer}
          />
        )}

        {activeSection === 'lab' && (
          <LabNotebooksSection
            searchQuery={searchQuery}
            onOpenFileViewer={handleOpenFileViewer}
          />
        )}

        {activeSection === 'notes' && (
          <ImportantNotesSection searchQuery={searchQuery} />
        )}

        {activeSection === 'explorer' && (
          <GithubExplorer
            searchQuery={searchQuery}
            onOpenFileViewer={handleOpenFileViewer}
          />
        )}

        {activeSection === 'ai-tutor' && (
          <AiStudyAssistant />
        )}

      </main>

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} />

      {/* Modal File Source Viewer */}
      {viewingFile && (
        <FileViewerModal
          title={viewingFile.title}
          filePath={viewingFile.path}
          onClose={handleCloseFileViewer}
        />
      )}

    </div>
  );
}
