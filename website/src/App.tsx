import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import InvestorCharter from './pages/InvestorCharter';
import MITC from './pages/MITC';
import Downloads from './pages/Downloads';
import SEBIRiskDisclosure from './pages/SEBIRiskDisclosure';
import FreezingBlocking from './pages/FreezingBlocking';
import ImportantCircular from './pages/ImportantCircular';
import BankDetails from './pages/BankDetails';
import ContactUs from './pages/ContactUs';
import RiskDisclosureModal from './components/RiskDisclosureModal';
import PageLoader from './components/PageLoader';

// Component to handle navigation loading
function AppContent() {
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show the risk disclosure modal when the website loads
    setShowRiskModal(true);
    
    // Initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle navigation loading
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 800); // Show loader for 800ms during navigation

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCloseModal = () => {
    setShowRiskModal(false);
  };

  return (
      <div className="App">
      {/* Page Loader */}
      <PageLoader isLoading={isLoading || isNavigating} />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/investor-charter" element={<InvestorCharter />} />
          <Route path="/mitc" element={<MITC />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/sebi-risk-disclosure" element={<SEBIRiskDisclosure />} />
          <Route path="/freezing-blocking" element={<FreezingBlocking />} />
          <Route path="/important-circular" element={<ImportantCircular />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        
        {/* Risk Disclosure Modal */}
        <RiskDisclosureModal 
          isOpen={showRiskModal} 
          onClose={handleCloseModal} 
        />
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;