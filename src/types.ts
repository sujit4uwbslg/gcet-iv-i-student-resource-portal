export type ResourceCategory = 'all' | 'books' | 'theory' | 'lab' | 'notes' | 'homework';

export interface RepoFile {
  path: string;
  name: string;
  type: 'file' | 'dir';
  size?: number;
  downloadUrl: string;
  viewUrl: string;
  rawUrl: string;
  category: ResourceCategory;
  unit?: string;
  extension: string;
  description?: string;
}

export interface Textbook {
  id: string;
  title: string;
  author: string;
  fileName: string;
  path: string;
  size: string;
  downloadUrl: string;
  viewUrl: string;
  rawUrl: string;
  description: string;
  tags: string[];
}

export interface CourseUnit {
  unitNumber: number;
  title: string;
  description: string;
  topics: string[];
  files: {
    title: string;
    type: 'pdf' | 'pptx' | 'ipynb' | 'txt';
    path: string;
    downloadUrl: string;
    viewUrl: string;
    description?: string;
  }[];
}

export interface LabWeek {
  weekNumber: number;
  title: string;
  description: string;
  notebookPath: string;
  notebookName: string;
  downloadUrl: string;
  viewUrl: string;
  datasets?: { name: string; path: string; downloadUrl: string }[];
  keyConcepts: string[];
}

export interface ImportantNote {
  id: string;
  title: string;
  category: 'unit' | 'math' | 'exam' | 'concept';
  fileName: string;
  path: string;
  size: string;
  downloadUrl: string;
  viewUrl: string;
  description: string;
  isExamEssential?: boolean;
}

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  references?: string[];
}

export interface CourseAnnouncement {
  id: string;
  date: string;
  title: string;
  content: string;
  tag: 'Important' | 'Lab' | 'Exam' | 'General';
  linkPath?: string;
}
