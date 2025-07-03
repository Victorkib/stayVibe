'use client';

import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import VideoModal from './VideoModal';
import mockData from '../../data/mockData';
const mockHeroContent = mockData.heroContent;

const Button = ({ children, size, variant, className, onClick, ...props }) => {
  const baseClasses =
    'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95';
  const sizeClasses = size === 'lg' ? 'px-8 py-3 text-lg' : 'px-4 py-2';
  const variantClasses =
    variant === 'outline'
      ? 'border-2 bg-transparent backdrop-blur-sm'
      : 'border-0';

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFloatingElements, setShowFloatingElements] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showVideoPreview) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mockHeroContent?.length);
      }, 6000); // Slower transition for better UX
      return () => clearInterval(timer);
    }
  }, [showVideoPreview]);

  // Auto-hide floating elements during video preview
  useEffect(() => {
    if (showVideoPreview) {
      setShowFloatingElements(false);
    } else {
      const timer = setTimeout(() => setShowFloatingElements(true), 500);
      return () => clearTimeout(timer);
    }
  }, [showVideoPreview]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockHeroContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mockHeroContent.length) % mockHeroContent.length
    );
  };

  const handleVideoPreview = () => {
    setShowVideoPreview(true);
    setIsVideoPlaying(true);
  };

  const handleVideoClose = () => {
    setShowVideoPreview(false);
    setIsVideoPlaying(false);
  };

  const handleFullVideoModal = () => {
    setShowVideoModal(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentContent = mockHeroContent[currentSlide];

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideInDown {
            from {
              opacity: 0;
              transform: translateY(-60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .animate-slideInUp {
            animation: slideInUp 0.8s ease-out forwards;
          }

          .animate-slideInLeft {
            animation: slideInLeft 0.8s ease-out forwards;
          }

          .animate-slideInRight {
            animation: slideInRight 0.8s ease-out forwards;
          }

          .animate-fadeInScale {
            animation: fadeInScale 0.8s ease-out forwards;
          }

          .animate-slideInDown {
            animation: slideInDown 0.8s ease-out forwards;
          }

          .animate-pulse-slow {
            animation: pulse 2s ease-in-out infinite;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-shimmer {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          .animate-delay-200 {
            animation-delay: 0.2s;
          }

          .animate-delay-400 {
            animation-delay: 0.4s;
          }

          .animate-delay-600 {
            animation-delay: 0.6s;
          }

          .animate-delay-800 {
            animation-delay: 0.8s;
          }

          .image-transition {
            transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .image-enter {
            transform: scale(1.1);
            opacity: 0;
          }

          .image-enter-active {
            transform: scale(1);
            opacity: 1;
          }

          .video-overlay {
            background: linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.1)
            );
            backdrop-filter: blur(1px);
          }

          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .text-shadow {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
        `}</style>

        {/* Background Images/Video */}
        <div className="absolute inset-0">
          {!showVideoPreview ? (
            // Image Slideshow
            <>
              {mockHeroContent.map((content, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 image-transition ${
                    index === currentSlide
                      ? 'opacity-100 image-enter-active'
                      : 'opacity-0 image-enter'
                  }`}
                >
                  <img
                    src={content.image || '/placeholder.svg'}
                    alt={content.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg?height=1080&width=1920';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
                </div>
              ))}
            </>
          ) : (
            // Video Preview
            <div className="absolute inset-0">
              <video
                className="w-full h-full object-cover"
                src={currentContent.videoPreview}
                autoPlay={isVideoPlaying}
                muted={isMuted}
                loop
                playsInline
              />
              <div className="absolute inset-0 video-overlay" />
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {!showVideoPreview && (
          <>
            <button
              onClick={prevSlide}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 glass-effect hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 ${
                isLoaded
                  ? 'animate-slideInLeft animate-delay-800 opacity-0'
                  : 'opacity-0'
              }`}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 glass-effect hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 ${
                isLoaded
                  ? 'animate-slideInRight animate-delay-800 opacity-0'
                  : 'opacity-0'
              }`}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </>
        )}

        {/* Video Preview Controls */}
        {showVideoPreview && (
          <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="glass-effect hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white" />
              ) : (
                <Volume2 className="h-5 w-5 text-white" />
              )}
            </button>
            <button
              onClick={handleVideoClose}
              className="glass-effect hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-5xl">
            {/* Location Badge */}
            <div
              className={`inline-flex items-center gap-2 glass-effect rounded-full px-4 py-2 mb-6 ${
                isLoaded ? 'animate-slideInDown opacity-0' : 'opacity-0'
              }`}
            >
              <MapPin className="h-4 w-4 text-rose-400" />
              <span className="text-sm font-medium">
                {currentContent.location}
              </span>
            </div>

            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight text-shadow ${
                isLoaded ? 'animate-slideInUp opacity-0' : 'opacity-0'
              }`}
            >
              Find Your Perfect
              <span
                className={`block text-rose-400 ${
                  isLoaded
                    ? 'animate-slideInUp animate-delay-200 opacity-0'
                    : 'opacity-0'
                }`}
              >
                Stay Anywhere
              </span>
            </h1>

            {/* Dynamic subtitle based on current slide */}
            <div
              className={`mb-6 ${
                isLoaded
                  ? 'animate-fadeInScale animate-delay-300 opacity-0'
                  : 'opacity-0'
              }`}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-shadow">
                {currentContent.title} {currentContent.subtitle}
              </h2>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-shadow">
                {currentContent.description}
              </p>
            </div>

            <p
              className={`text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto text-shadow ${
                isLoaded
                  ? 'animate-fadeInScale animate-delay-400 opacity-0'
                  : 'opacity-0'
              }`}
            >
              Discover unique homes, experiences, and places around the world
              with DewdropBnb
            </p>

            {!showVideoPreview && (
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${
                  isLoaded
                    ? 'animate-slideInUp animate-delay-600 opacity-0'
                    : 'opacity-0'
                }`}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl animate-shimmer"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Exploring
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900 flex items-center gap-2 shadow-lg animate-pulse-slow"
                  onClick={handleVideoPreview}
                >
                  <Play className="h-5 w-5" />
                  Preview Video
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white flex items-center gap-2 shadow-lg"
                  onClick={handleFullVideoModal}
                >
                  <Calendar className="h-5 w-5" />
                  Watch Full Tour
                </Button>
              </div>
            )}

            {showVideoPreview && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideInUp">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                  onClick={handleFullVideoModal}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Full Experience
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900 flex items-center gap-2 shadow-lg"
                  onClick={handleVideoClose}
                >
                  Back to Gallery
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Slide Indicators */}
        {!showVideoPreview && (
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10 ${
              isLoaded
                ? 'animate-slideInDown animate-delay-800 opacity-0'
                : 'opacity-0'
            }`}
          >
            {mockHeroContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative transition-all duration-300 hover:scale-125 ${
                  index === currentSlide ? 'w-8 h-3' : 'w-3 h-3'
                }`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Enhanced Floating Elements */}
        {showFloatingElements && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full ${
                  isLoaded ? 'animate-fadeInScale opacity-0' : 'opacity-0'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                }}
              >
                <div
                  className={`bg-gradient-to-r from-rose-400/20 to-pink-500/20 rounded-full animate-float ${
                    i % 3 === 0
                      ? 'w-4 h-4'
                      : i % 3 === 1
                      ? 'w-6 h-6'
                      : 'w-3 h-3'
                  }`}
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + (i % 3)}s`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Ambient Light Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDuration: '4s' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDuration: '6s', animationDelay: '2s' }}
          />
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        currentSlide={currentSlide}
        heroContent={mockHeroContent}
      />
    </>
  );
}
