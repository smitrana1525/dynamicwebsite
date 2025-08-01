import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FilePopupModal from './FilePopupModal';
import { otherFileService, OtherFile } from '../services/otherFileService';

interface SubItem {
  name: string;
  href: string;
  download?: string;
  showPopup?: boolean;
  fileType?: string;
  fileSize?: string;
}

interface HeaderProps {
  currentPage?: string;
}

interface NavItem {
  name: string;
  href: string;
  external?: boolean;
  cta?: boolean;
  dropdown?: SubItem[];
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [popupModal, setPopupModal] = useState<{
    isOpen: boolean;
    fileName: string;
    fileType: string;
    fileSize?: string;
    downloadUrl?: string;
    fileId?: number;
  }>({
    isOpen: false,
    fileName: '',
    fileType: '',
    fileSize: '',
    downloadUrl: '',
    fileId: undefined
  });
  const [otherFiles, setOtherFiles] = useState<OtherFile[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  // Fetch Other Files from backend
  useEffect(() => {
    const fetchOtherFiles = async () => {
      try {
        setLoading(true);
        const files = await otherFileService.getAllOtherFiles();
        setOtherFiles(files);
      } catch (error) {
        console.error('Failed to fetch other files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherFiles();
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleFileClick = (subItem: SubItem) => {
    if (subItem.showPopup) {
      // Find the corresponding file from the fetched other files
      const fileType = subItem.name === 'Investor Charter Booking' ? 'Investor Charter Booking' :
                      subItem.name === 'Investor Complaint' ? 'Investor Complaint' :
                      subItem.name === 'AP Branch Details' ? 'AP Branch Details' :
                      subItem.name === 'KMP Details' ? 'KMP Details' : '';
      
      const matchingFile = otherFiles.find(file => file.fileType === fileType);
      
      if (matchingFile && matchingFile.fileDocument) {
        setPopupModal({
          isOpen: true,
          fileName: matchingFile.fileType,
          fileType: matchingFile.fileDocument.fileType.replace('.', ''),
          fileSize: otherFileService.formatFileSize(matchingFile.fileDocument.fileSize),
          downloadUrl: '',
          fileId: matchingFile.id
        });
      } else {
        // Fallback to static file if no dynamic file found
        setPopupModal({
          isOpen: true,
          fileName: subItem.name,
          fileType: subItem.fileType || 'pdf',
          fileSize: subItem.fileSize,
          downloadUrl: subItem.download
        });
      }
    } else if (subItem.download) {
      // Direct download for non-popup files
      const link = document.createElement('a');
      link.href = subItem.download;
      link.download = subItem.download;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewFile = async () => {
    try {
      if (popupModal.fileId) {
        // Dynamic file from backend
        const viewUrl = await otherFileService.showOtherFile(popupModal.fileId);
        window.open(viewUrl, '_blank');
      } else if (popupModal.downloadUrl) {
        // Static file
        window.open(popupModal.downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Failed to view file:', error);
    }
    setPopupModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleDownloadFile = async () => {
    try {
      if (popupModal.fileId) {
        // Dynamic file from backend
        const blob = await otherFileService.downloadOtherFile(popupModal.fileId);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = popupModal.fileName + '.' + popupModal.fileType;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else if (popupModal.downloadUrl) {
        // Static file
        const link = document.createElement('a');
        link.href = popupModal.downloadUrl;
        link.download = popupModal.downloadUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Failed to download file:', error);
    }
    setPopupModal(prev => ({ ...prev, isOpen: false }));
  };

  const closePopupModal = () => {
    setPopupModal(prev => ({ ...prev, isOpen: false }));
  };

  // Get dynamic menu items based on fetched other files
  const getDynamicMenuItems = () => {
    const items = [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Downloads', href: '/downloads' },
      {
        name: 'Investor Charter',
        href: '#',
        dropdown: [
          { name: 'Investor Charter - Depository', href: '/investor-charter' },
          { 
            name: 'Investor Charter Booking', 
            href: '#', 
            download: 'investor-charter-booking.pdf',
            showPopup: true,
            fileType: 'pdf',
            fileSize: '2.5 MB'
          },
          { 
            name: 'Investor Complaint', 
            href: '#', 
            download: 'investor-complaint.pdf',
            showPopup: true,
            fileType: 'pdf',
            fileSize: '1.8 MB'
          }
        ]
      },
      { name: 'Bank Office', href: '/bank-office' },
      {
        name: 'Investor Section',
        href: '#',
        dropdown: [
          { name: 'SEBI Risk Disclosure', href: '/sebi-risk-disclosure' },
          { name: 'Most Important Terms & Conditions', href: '/mitc' },
          { name: 'Important Circular of Clients', href: '/important-circular' },
          { name: 'Freezing or Blocking of Trading Account', href: '/freezing-blocking' },
          { name: 'Bank Details', href: '/bank-details' }
        ]
      },
      { name: 'E-voting', href: 'https://www.evoting.nsdl.com/', external: true },
      {
        name: 'Contact',
        href: '#',
        dropdown: [
          { name: 'Contact Us', href: '/contact' },
          { 
            name: 'AP Branch Details', 
            href: '#', 
            download: 'ap-branch-details.pdf',
            showPopup: true,
            fileType: 'pdf',
            fileSize: '3.2 MB'
          },
          { 
            name: 'KMP Details', 
            href: '#', 
            download: 'kmp-details.pdf',
            showPopup: true,
            fileType: 'pdf',
            fileSize: '1.5 MB'
          }
        ]
      },
      { name: 'Open Account', href: '/open-account', cta: true }
    ];

    // Update menu items with dynamic content if available
    if (!loading && otherFiles.length > 0) {
      // Update Investor Charter Booking
      const investorCharterBooking = otherFiles.find(f => f.fileType === 'Investor Charter Booking');
      if (investorCharterBooking) {
        const investorCharterItem = items.find(item => item.name === 'Investor Charter');
        if (investorCharterItem && investorCharterItem.dropdown) {
          const bookingItem = investorCharterItem.dropdown.find(sub => sub.name === 'Investor Charter Booking');
          if (bookingItem) {
            bookingItem.name = investorCharterBooking.fileType;
            bookingItem.fileSize = otherFileService.formatFileSize(investorCharterBooking.fileDocument?.fileSize || 0);
          }
        }
      }

      // Update Investor Complaint
      const investorComplaint = otherFiles.find(f => f.fileType === 'Investor Complaint');
      if (investorComplaint) {
        const investorCharterItem = items.find(item => item.name === 'Investor Charter');
        if (investorCharterItem && investorCharterItem.dropdown) {
          const complaintItem = investorCharterItem.dropdown.find(sub => sub.name === 'Investor Complaint');
          if (complaintItem) {
            complaintItem.name = investorComplaint.fileType;
            complaintItem.fileSize = otherFileService.formatFileSize(investorComplaint.fileDocument?.fileSize || 0);
          }
        }
      }

      // Update AP Branch Details
      const apBranchDetails = otherFiles.find(f => f.fileType === 'AP Branch Details');
      if (apBranchDetails) {
        const contactItem = items.find(item => item.name === 'Contact');
        if (contactItem && contactItem.dropdown) {
          const apItem = contactItem.dropdown.find(sub => sub.name === 'AP Branch Details');
          if (apItem) {
            apItem.name = apBranchDetails.fileType;
            apItem.fileSize = otherFileService.formatFileSize(apBranchDetails.fileDocument?.fileSize || 0);
          }
        }
      }

      // Update KMP Details
      const kmpDetails = otherFiles.find(f => f.fileType === 'KMP Details');
      if (kmpDetails) {
        const contactItem = items.find(item => item.name === 'Contact');
        if (contactItem && contactItem.dropdown) {
          const kmpItem = contactItem.dropdown.find(sub => sub.name === 'KMP Details');
          if (kmpItem) {
            kmpItem.name = kmpDetails.fileType;
            kmpItem.fileSize = otherFileService.formatFileSize(kmpDetails.fileDocument?.fileSize || 0);
          }
        }
      }
    }

    return items;
  };

      const navItems = getDynamicMenuItems();

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      {/* Top Contact Bar */}
      <div className="bg-blue-900/95 backdrop-blur-sm text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-xs sm:text-sm">
          {/* Contact Info - Left Side (Desktop) */}
          <div className="hidden sm:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">info@moneycareindia.co.in</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>+91-22-6234-5678</span>
            </div>
          </div>
          
          {/* Contact Info - Mobile Layout */}
          <div className="flex sm:hidden items-center space-x-2">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">info@moneycareindia.co.in</span>
          </div>
          
          {/* Contact Info - Right Side (Mobile) */}
          <div className="flex sm:hidden items-center space-x-2">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>+91-22-6234-5678</span>
          </div>
          
          {/* Social Media Links - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-orange-400 transition-colors text-sm">Facebook</a>
            <a href="#" className="hover:text-orange-400 transition-colors text-sm">Twitter</a>
            <a href="#" className="hover:text-orange-400 transition-colors text-sm">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={handleLogoClick}
            >
              <div className="relative w-10 h-10 sm:w-16 sm:h-16">
                <img 
                  src="/Logo.png" 
                  alt="Moneycare Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold">
                  <span className={`${isScrolled ? 'text-blue-900' : 'text-white'}`}>Money</span>
                  <span className="text-orange-500 relative">
                    care
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
                  </span>
                </h1>
                <p className={`text-xs sm:text-sm ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}>Caring for better tomorrow</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center space-x-1 transition-colors py-2 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-orange-400'}`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {openDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50">
                          {item.dropdown.map((subItem) => (
                            <React.Fragment key={subItem.name}>
                              {subItem.download ? (
                                <button
                                  onClick={() => handleFileClick(subItem)}
                                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                  {subItem.name}
                                </button>
                              ) : (
                                <Link
                                  to={subItem.href}
                                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className={`${
                        item.cta
                          ? 'bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors'
                          : `${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-orange-400'} transition-colors`
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden transition-colors p-2 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-orange-400'}`}
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Overlay */}
          <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
            <div className={`absolute right-0 top-0 h-screen w-80 bg-blue-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-10 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b border-white/20 bg-blue-900">
                  <h3 className="text-white font-bold text-lg">Menu</h3>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-orange-400 transition-colors p-2 rounded-full hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col space-y-2 p-6 h-[calc(100vh-120px)] overflow-y-auto bg-blue-900">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full text-left px-4 py-3 text-white hover:bg-blue-800 hover:text-orange-400 transition-all duration-200 rounded-lg text-base font-medium bg-blue-900"
                        >
                          <span className="truncate">{item.name}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown === item.name && (
                          <div className="ml-4 mt-2 space-y-1 bg-blue-800 rounded-lg p-2">
                            {item.dropdown.map((subItem) => (
                              <React.Fragment key={subItem.name}>
                                {subItem.download ? (
                                  <button
                                    onClick={() => {
                                      handleFileClick(subItem);
                                      setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-blue-100 hover:bg-blue-700 hover:text-orange-400 transition-all duration-200 rounded-md"
                                  >
                                    <span className="truncate">{subItem.name}</span>
                                  </button>
                                ) : (
                                  <Link
                                    to={subItem.href}
                                    className="block px-4 py-2 text-sm text-blue-100 hover:bg-blue-700 hover:text-orange-400 transition-all duration-200 rounded-md"
                                  >
                                    <span className="truncate">{subItem.name}</span>
                                  </Link>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={`block px-4 py-3 transition-all duration-200 rounded-lg text-base font-medium ${
                          item.cta
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 text-center mx-2 shadow-lg'
                            : 'text-white hover:bg-blue-800 hover:text-orange-400 bg-blue-900'
                        }`}
                                              >
                          <span className="truncate">{item.name}</span>
                          {item.external && <ExternalLink className="w-4 h-4 ml-2 inline" />}
                      </Link>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>
        </div>
      </nav>
      
      {/* File Popup Modal */}
      <FilePopupModal
        isOpen={popupModal.isOpen}
        onClose={closePopupModal}
        fileName={popupModal.fileName}
        fileType={popupModal.fileType}
        fileSize={popupModal.fileSize}
        onView={handleViewFile}
        onDownload={handleDownloadFile}
      />
    </header>
  );
};

export default Header; 