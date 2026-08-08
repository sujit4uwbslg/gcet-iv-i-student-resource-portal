import React, { useState } from 'react';
import { 
  Youtube, 
  Play, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Calendar, 
  ExternalLink, 
  X, 
  Filter, 
  Sparkles,
  BookOpen,
  CheckCircle,
  Share2,
  Check
} from 'lucide-react';
import { YOUTUBE_VIDEOS } from '../data/repoData';
import { VideoResource } from '../types';

interface VideoLecturesSectionProps {
  searchQuery: string;
}

export const VideoLecturesSection: React.FC<VideoLecturesSectionProps> = ({ searchQuery }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [activePlayingVideo, setActivePlayingVideo] = useState<VideoResource | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter logic
  const filteredVideos = YOUTUBE_VIDEOS.filter((video) => {
    const matchesUnit = selectedUnit === 'all' || video.unit === selectedUnit;
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) return matchesUnit;

    const matchesSearch =
      video.title.toLowerCase().includes(query) ||
      video.channel_name.toLowerCase().includes(query) ||
      (video.unit && video.unit.toLowerCase().includes(query)) ||
      (video.topics && video.topics.some((t) => t.toLowerCase().includes(query)));

    return matchesUnit && matchesSearch;
  });

  const handleShareVideo = (video: VideoResource, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(video.url);
    setCopiedId(video.video_id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 rounded-2xl p-6 sm:p-8 border border-slate-800 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold mb-3 border border-red-500/30">
            <Youtube className="w-4 h-4 text-red-400" />
            <span>Online Resource Portal • Sujit Das Academy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Deep Learning Video Lectures & Tutorials
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            Watch concept walkthroughs, Single Layer Perceptron examples, XOR linear separability analysis, 
            activation functions (Sigmoid, Tanh, ReLU, Softmax), and Backpropagation chain rule math directly from <strong>Sujit Das Academy</strong>.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-bold text-red-400">11 Videos</div>
              <div className="text-[11px] text-slate-400">Topic Walkthroughs</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-bold text-white">Sujit Das Academy</div>
              <div className="text-[11px] text-slate-400">Official Channel</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-bold text-emerald-400">GATE / UGC NET</div>
              <div className="text-[11px] text-slate-400">Exam Aligned 2025-26</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="text-xl font-bold text-indigo-400">JNTUH / GCET</div>
              <div className="text-[11px] text-slate-400">Syllabus Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Filter by Unit:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedUnit('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedUnit === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Video Lectures ({YOUTUBE_VIDEOS.length})
          </button>
          
          <button
            onClick={() => setSelectedUnit('Unit I')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedUnit === 'Unit I'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Unit I: Foundations & Activations (9)
          </button>

          <button
            onClick={() => setSelectedUnit('Unit II')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedUnit === 'Unit II'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Unit II: Backpropagation Math (2)
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-medium text-sm">No video lectures found matching your filter criteria.</p>
          <button
            onClick={() => setSelectedUnit('all')}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.video_id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md hover:border-red-500/50 transition-all flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group"
                onClick={() => setActivePlayingVideo(video)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />

                {/* Play Overlay Icon */}
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-950/90 text-white text-[11px] font-mono font-bold rounded flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-red-400" />
                  <span>{video.duration}</span>
                </div>

                {/* Unit Tag */}
                {video.unit && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/90 text-blue-300 border border-blue-500/30 text-[10px] font-bold rounded-md">
                    {video.unit}
                  </div>
                )}
              </div>

              {/* Video Content Metadata */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                    <span className="font-bold text-red-600 dark:text-red-400">{video.channel_name}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {video.publish_date}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActivePlayingVideo(video)}
                    className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-2 hover:text-red-600 transition-colors cursor-pointer leading-snug"
                    title={video.title}
                  >
                    {video.title}
                  </h3>
                </div>

                {/* Topic Tags */}
                {video.topics && video.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {video.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* View/Like Stats & Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1" title="Views">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{video.view_count}</span>
                    </span>
                    <span className="flex items-center space-x-1" title="Likes">
                      <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                      <span>{video.like_count}</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={(e) => handleShareVideo(video, e)}
                      className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors cursor-pointer"
                      title="Copy link"
                    >
                      {copiedId === video.video_id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => setActivePlayingVideo(video)}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold text-[11px] transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play</span>
                    </button>

                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                      title="Watch on YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Video Player Modal */}
      {activePlayingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2.5 min-w-0 pr-4">
                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0">
                  <Youtube className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold truncate text-white">
                    {activePlayingVideo.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {activePlayingVideo.channel_name} • Duration: {activePlayingVideo.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <a
                  href={activePlayingVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActivePlayingVideo(null)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player Iframe */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activePlayingVideo.video_id}?autoplay=1`}
                title={activePlayingVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer info */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-4 text-slate-400">
                <span>Published: {activePlayingVideo.publish_date}</span>
                <span>Views: {activePlayingVideo.view_count}</span>
                <span>Likes: {activePlayingVideo.like_count}</span>
              </div>
              {activePlayingVideo.unit && (
                <span className="px-2.5 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 font-bold rounded-md">
                  Aligned with {activePlayingVideo.unit}
                </span>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
