import React, { useState } from 'react';
import { Camera, FileText, BookOpen, History, Star, ChevronLeft, ChevronRight } from 'lucide-react';

type TutorialScreenProps = {
  onComplete: () => void;
};

export default function TutorialScreen({ onComplete }: TutorialScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to Dr. Klar!',
      description: 'Take a photo of a product label and the app explains ingredients and long-term health risks in simple language.',
      icon: null,
      isWelcome: true
    },
    {
      title: 'Scan',
      description: 'Scan product labels to get instant risk reports.',
      icon: Camera,
      isWelcome: false
    },
    {
      title: 'Label Report',
      description: 'See an easy summary of long-term health risks for the product and each additive.',
      icon: FileText,
      isWelcome: false
    },
    {
      title: 'Ingredients-Wiki',
      description: 'Look up single ingredients from our offline wiki of common additives.',
      icon: BookOpen,
      isWelcome: false
    },
    {
      title: 'History',
      description: 'Find all products you\'ve scanned before.',
      icon: History,
      isWelcome: false
    },
    {
      title: 'Favorites',
      description: 'Bookmark ingredients you want to track or avoid.',
      icon: Star,
      isWelcome: false
    }
  ];

  const currentSlideData = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        {/* Logo / Icon */}
        <div className="mb-8">
          {currentSlideData.isWelcome ? (
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl">Dr.</span>
            </div>
          ) : currentSlideData.icon ? (
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <currentSlideData.icon className="w-12 h-12 text-blue-600" />
            </div>
          ) : null}
        </div>

        {/* Title */}
        <h1 className="text-center mb-4 text-gray-900">
          {currentSlideData.title}
        </h1>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-sm">
          {currentSlideData.description}
        </p>

        {/* Slide Indicators */}
        <div className="flex gap-2 mt-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-blue-600' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 safe-area-bottom">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          {/* Primary Button */}
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            {currentSlide === slides.length - 1 ? 'Start' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Skip Button */}
          <button
            onClick={onComplete}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip tutorial
          </button>
        </div>
      </div>
    </div>
  );
}
