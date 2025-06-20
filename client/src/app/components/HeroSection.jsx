'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

// Since we can't use Framer Motion directly, I'll create smooth CSS animations
// that mimic Framer Motion's behavior

const heroImages = [
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80'
];

const Button = ({ children, size, variant, className, onClick, ...props }) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105';
  const sizeClasses = size === 'lg' ? 'px-8 py-3 text-lg' : 'px-4 py-2';
  const variantClasses = variant === 'outline' 
    ? 'border-2 bg-transparent' 
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

  useEffect(() => {
    // Simulate loading and trigger entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  return (
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
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-enter {
          transform: scale(1.1);
          opacity: 0;
        }

        .image-enter-active {
          transform: scale(1);
          opacity: 1;
        }
      `}</style>

      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 image-transition ${
              index === currentSlide 
                ? 'opacity-100 image-enter-active' 
                : 'opacity-0 image-enter'
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110 ${
          isLoaded ? 'animate-slideInLeft animate-delay-800 opacity-0' : 'opacity-0'
        }`}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110 ${
          isLoaded ? 'animate-slideInRight animate-delay-800 opacity-0' : 'opacity-0'
        }`}
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
            isLoaded ? 'animate-slideInUp opacity-0' : 'opacity-0'
          }`}>
            Find Your Perfect
            <span className={`block text-rose-400 ${
              isLoaded ? 'animate-slideInUp animate-delay-200 opacity-0' : 'opacity-0'
            }`}>
              Stay Anywhere
            </span>
          </h1>
          <p className={`text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto ${
            isLoaded ? 'animate-fadeInScale animate-delay-400 opacity-0' : 'opacity-0'
          }`}>
            Discover unique homes, experiences, and places around the world with
            StayVibe
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${
            isLoaded ? 'animate-slideInUp animate-delay-600 opacity-0' : 'opacity-0'
          }`}>
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl"
            >
              Start Exploring
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm flex items-center gap-2 shadow-lg"
            >
              <Play className="h-5 w-5" />
              Watch Video
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 ${
        isLoaded ? 'animate-slideInDown animate-delay-800 opacity-0' : 'opacity-0'
      }`}>
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentSlide ? 'bg-white shadow-lg' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements for Extra Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full ${
              isLoaded ? 'animate-fadeInScale opacity-0' : 'opacity-0'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}