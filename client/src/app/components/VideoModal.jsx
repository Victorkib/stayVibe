'use client';

import { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  RotateCcw,
  Share2,
  Heart,
  Download,
  Settings,
  Maximize2,
  Minimize2,
  ChevronRight,
  Info,
} from 'lucide-react';

const videoContent = [
  {
    id: 1,
    title: 'Luxury Beach Villa Experience',
    location: 'Santorini, Greece',
    description:
      'Immerse yourself in the ultimate luxury with breathtaking sunset views over the Aegean Sea',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '2:30',
    category: 'Luxury',
    highlights: [
      'Private Pool',
      'Ocean View',
      'Sunset Terrace',
      'Spa Services',
    ],
  },
  {
    id: 2,
    title: 'Tokyo Urban Adventure',
    location: 'Shibuya, Tokyo',
    description:
      'Experience the vibrant energy of Tokyo from a modern loft in the heart of the city',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '3:15',
    category: 'Urban',
    highlights: [
      'City Center',
      'Modern Design',
      'High-Speed WiFi',
      'Rooftop Access',
    ],
  },
  {
    id: 3,
    title: 'Alpine Mountain Retreat',
    location: 'Zermatt, Switzerland',
    description:
      'Find peace and tranquility in a cozy cabin surrounded by majestic Alpine peaks',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '1:45',
    category: 'Nature',
    highlights: ['Mountain Views', 'Fireplace', 'Hiking Trails', 'Ski Access'],
  },
];

export default function VideoModal({
  isOpen,
  onClose,
  currentSlide = 0,
  heroContent = [],
}) {
  const [currentVideo, setCurrentVideo] = useState(currentSlide);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const progressRef = useRef(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentVideo(currentSlide);
      setIsPlaying(true);
      setProgress(0);
      setIsLoading(true);
      setShowPlaylist(false);
    } else {
      document.body.style.overflow = 'unset';
      setIsPlaying(false);
      setProgress(0);
      setShowSettings(false);
      setShowPlaylist(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentSlide]);

  useEffect(() => {
    if (isPlaying && showControls && !isMobile) {
      controlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        3000
      );
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showControls, isMobile]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const handleProgressTouch = (e) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const newTime = (touchX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoContent.length);
    setProgress(0);
    setIsPlaying(true);
    setIsLoading(true);
  };

  const prevVideo = () => {
    setCurrentVideo(
      (prev) => (prev - 1 + videoContent.length) % videoContent.length
    );
    setProgress(0);
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettings(false);
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: videoContent[currentVideo].title,
          text: videoContent[currentVideo].description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownload = () => {
    console.log('Download video:', videoContent[currentVideo].title);
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case ' ':
        e.preventDefault();
        handlePlayPause();
        break;
      case 'Escape':
        onClose();
        break;
      case 'ArrowRight':
        nextVideo();
        break;
      case 'ArrowLeft':
        prevVideo();
        break;
      case 'm':
        toggleMute();
        break;
      case 'f':
        toggleFullscreen();
        break;
      case 'r':
        handleRestart();
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, isPlaying]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const currentVideoData = videoContent[currentVideo];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full h-full flex flex-col"
        onMouseMove={() => setShowControls(true)}
        onTouchStart={() => setShowControls(true)}
      >
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm z-20">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
              >
                <Info className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Video Container */}
        <div className="relative flex-1 bg-black">
          {/* Video Player */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={currentVideoData.videoUrl}
            autoPlay={isPlaying}
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleLoadedData}
            onEnded={nextVideo}
            playsInline
            preload="metadata"
          />

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Desktop Video Info Overlay */}
          {!isMobile && showInfo && showControls && (
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div className="text-white max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {currentVideoData.category}
                    </span>
                    <span className="text-sm opacity-80">
                      {currentVideoData.location}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {currentVideoData.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-3 line-clamp-2">
                    {currentVideoData.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentVideoData.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                      isLiked
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  >
                    <Share2 className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  >
                    <Download className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  >
                    {showInfo ? (
                      <Minimize2 className="h-5 w-5 text-white" />
                    ) : (
                      <Maximize2 className="h-5 w-5 text-white" />
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Center Play Button */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="bg-rose-500/90 backdrop-blur-sm hover:bg-rose-500 rounded-full p-6 md:p-8 transition-all duration-300 hover:scale-110 shadow-2xl"
              >
                <Play className="h-12 w-12 md:h-16 md:w-16 text-white ml-1" />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 md:p-6 transition-opacity duration-300 ${
              showControls || isMobile ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div
              ref={progressRef}
              className="w-full h-2 md:h-3 bg-white/30 rounded-full mb-3 md:mb-4 cursor-pointer group touch-manipulation"
              onClick={handleProgressClick}
              onTouchStart={handleProgressTouch}
            >
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Navigation Controls */}
                <button
                  onClick={prevVideo}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110 touch-manipulation"
                >
                  <SkipBack className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 touch-manipulation"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  ) : (
                    <Play className="h-5 w-5 md:h-6 md:w-6 text-white ml-1" />
                  )}
                </button>
                <button
                  onClick={nextVideo}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110 touch-manipulation"
                >
                  <SkipForward className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </button>

                {/* Desktop Only Controls */}
                {!isMobile && (
                  <>
                    <button
                      onClick={handleRestart}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110"
                    >
                      <RotateCcw className="h-5 w-5 text-white" />
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-2 group">
                      <button
                        onClick={toggleMute}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="h-5 w-5 text-white" />
                        ) : (
                          <Volume2 className="h-5 w-5 text-white" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 lg:w-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </>
                )}

                {/* Time Display */}
                <div className="text-white text-xs md:text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Mobile Volume Control */}
                {isMobile && (
                  <button
                    onClick={toggleMute}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110 touch-manipulation"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-4 w-4 text-white" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-white" />
                    )}
                  </button>
                )}

                {/* Settings */}
                {!isMobile && (
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110"
                    >
                      <Settings className="h-5 w-5 text-white" />
                    </button>
                    {showSettings && (
                      <div className="absolute bottom-12 right-0 bg-black/90 backdrop-blur-sm rounded-lg p-4 min-w-[150px] z-10">
                        <div className="text-white text-sm mb-2">
                          Playback Speed
                        </div>
                        <div className="space-y-1">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => handleSpeedChange(speed)}
                              className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                playbackSpeed === speed
                                  ? 'bg-rose-500 text-white'
                                  : 'text-white/80 hover:bg-white/20'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={toggleFullscreen}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110 touch-manipulation"
                >
                  <Maximize className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Info Panel */}
        {isMobile && showInfo && (
          <div className="bg-black/90 backdrop-blur-sm p-4 max-h-48 overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {currentVideoData.category}
              </span>
              <span className="text-white/80 text-sm">
                {currentVideoData.location}
              </span>
            </div>
            <h3 className="text-white text-lg font-bold mb-2">
              {currentVideoData.title}
            </h3>
            <p className="text-white/90 text-sm mb-3">
              {currentVideoData.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {currentVideoData.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all ${
                  isLiked
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">Like</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        )}

        {/* Video Playlist - Responsive */}
        {((isMobile && showPlaylist) || (!isMobile && !isFullscreen)) && (
          <div className="bg-gradient-to-r from-gray-900 to-black p-4 md:p-6 max-h-64 md:max-h-none overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Play className="h-5 w-5 text-rose-400" />
                Explore More Destinations
              </h4>
              {isMobile && (
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {videoContent.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => {
                    setCurrentVideo(index);
                    setShowPlaylist(false);
                  }}
                  className={`relative group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 touch-manipulation ${
                    index === currentVideo
                      ? 'ring-2 ring-rose-500 shadow-lg shadow-rose-500/25'
                      : ''
                  }`}
                >
                  <img
                    src={video.thumbnail || '/placeholder.svg'}
                    alt={video.title}
                    className="w-full h-24 md:h-32 object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`rounded-full p-2 md:p-3 transition-all duration-300 ${
                        index === currentVideo
                          ? 'bg-rose-500 scale-110'
                          : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30 group-hover:scale-110'
                      }`}
                    >
                      <Play className="h-4 w-4 md:h-6 md:w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {video.category}
                      </span>
                      <span className="text-white/70 text-xs">
                        {video.duration}
                      </span>
                    </div>
                    <p className="text-white text-xs md:text-sm font-medium truncate">
                      {video.title}
                    </p>
                    <p className="text-white/70 text-xs truncate">
                      {video.location}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
