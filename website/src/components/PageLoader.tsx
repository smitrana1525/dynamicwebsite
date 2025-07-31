import React, { useState, useEffect } from 'react';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Add a small delay before hiding to ensure smooth transition
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      {/* Main Loader Container */}
      <div className="flex flex-col items-center space-y-8">
        {/* Logo with Simple Animation */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          {/* Simple Rotating Ring */}
          <div className="absolute inset-0 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          
          {/* Logo - Centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16">
              <img 
                src="/Logo.png" 
                alt="Moneycare Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            <span className="text-blue-600">Money</span>
            <span className="text-orange-500">care</span>
          </h2>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>

        {/* Simple Loading Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader; 