import React, { useState, useEffect } from 'react';

interface RiskDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RiskDisclosureModal: React.FC<RiskDisclosureModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore body scroll
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold text-center">Annexure - I: Risk disclosures</h2>
          <p className="text-lg text-center mt-2 text-blue-100">Risk disclosures on Derivatives</p>
        </div>
        
        {/* Modal Body */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Risk Disclosure Content */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="space-y-4 text-gray-800">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-base leading-relaxed">
                    9 out of 10 individual traders in equity Futures and Options Segment incurred net losses.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-base leading-relaxed">
                    On an average, loss makers registered net trading loss close to ₹ 50,000
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-base leading-relaxed">
                    Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-base leading-relaxed">
                    Those making net trading profits, incurred between 15% to 50% of such profits as transaction cost
                  </p>
                </div>
              </div>
            </div>
            
            {/* Source Information */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Source:</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                SEBI study dated January 25, 2023 on "Analysis of Profit and Loss of Individual Traders dealing in equity futures and Options (F&O) Segment", wherein Aggregate Level findings are based on annual Profit/Loss incurred by individual traders in equity F&O during FY 2021-2022.
              </p>
            </div>
            
            {/* Important Notice */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-orange-900">Important Notice</h3>
              </div>
              <p className="text-sm text-orange-800 leading-relaxed">
                This risk disclosure is mandatory as per SEBI regulations. Please read carefully before proceeding with any derivative trading activities.
              </p>
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="bg-gray-50 p-6 rounded-b-lg border-t border-gray-200">
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-105 hover:shadow-xl"
            >
              OK, I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDisclosureModal; 