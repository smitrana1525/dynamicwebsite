import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';
import { ChevronDown, ChevronRight, Download, FileText, AlertCircle } from 'lucide-react';
import { apiService, FileCategory, FileDocument, CategoryWithDocuments } from '../services/api';

const Downloads: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categories, setCategories] = useState<FileCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithDocuments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCategories = await apiService.getCategories();
      // Filter only active categories and sort by sortOrder
      const activeCategories = fetchedCategories
        .filter(cat => cat.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);
      setCategories(activeCategories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to load download categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryWithDocuments = async (categoryId: number) => {
    try {
      setError(null);
      const categoryData = await apiService.getCategoryWithDocuments(categoryId);
      setSelectedCategory(categoryData);
    } catch (err) {
      console.error('Failed to fetch category documents:', err);
      setError('Failed to load documents for this category. Please try again.');
    }
  };

  const toggleDropdown = async (category: FileCategory) => {
    if (openDropdown === category.name) {
      setOpenDropdown(null);
      setSelectedCategory(null);
    } else {
      setOpenDropdown(category.name);
      await fetchCategoryWithDocuments(category.id);
    }
  };

  const handleDownload = async (fileDocument: FileDocument) => {
    try {
      setDownloading(fileDocument.id);
      const blob = await apiService.downloadDocument(fileDocument.id);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileDocument.displayName || fileDocument.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="downloads" />
      
      {/* Hero Section with Background */}
      <section className="relative pt-40 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-orange-400">Download</span> Center
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-2">
              Access all important documents and forms
            </p>
          </div>
        </div>
      </section>

      {/* Stock Ticker */}
      <StockTicker />

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8">
              
              {/* Documents in Vernacular Languages */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Documents in Vernacular Languages
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://www.bseindia.com/static/investors/client_regislanguages.aspx?expandable=3" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-center"
                  >
                    BSE Documents
                  </a>
                  <a 
                    href="https://www.nseindia.com/trade/members-client-registration-documents" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-center"
                  >
                    NSE Documents
                  </a>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {/* Download Categories - Left Side Layout */}
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                {/* Left Side - Main Buttons */}
                <div className="lg:w-1/3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Download Categories</h3>
                  
                  {loading ? (
                    <div className="space-y-3 sm:space-y-4">
                      {[...Array(5)].map((_, index) => (
                        <div key={index} className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => toggleDropdown(category)}
                          className={`w-full text-left p-3 sm:p-4 rounded-lg transition-colors duration-300 flex items-center justify-between text-sm sm:text-base ${
                            openDropdown === category.name 
                              ? 'bg-orange-600 text-white' 
                              : 'bg-orange-500 hover:bg-orange-600 text-white'
                          }`}
                        >
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="font-medium truncate">{category.name}</span>
                            {category.documentCount > 0 && (
                              <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                                {category.documentCount}
                              </span>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side - Content Area */}
                <div className="lg:w-2/3">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      {selectedCategory ? selectedCategory.name : 'Select a category to view documents'}
                    </h3>
                    
                    {selectedCategory && (
                      <div>

                        
                        {selectedCategory.documents.length === 0 ? (
                          <div className="text-center text-gray-500 py-8">
                            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No documents available in this category.</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {selectedCategory.documents
                              .filter(doc => doc.isActive)
                              .map((fileDocument) => (
                                <div key={fileDocument.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg shadow-sm space-y-3 sm:space-y-0">
                                  <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                      <FileText className="w-4 h-4 text-blue-500 mr-2" />
                                      <span className="font-medium text-gray-900">{fileDocument.displayName}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 space-y-1">
                                      <div className="flex items-center space-x-4">
                                        <span>Size: {apiService.formatFileSize(fileDocument.fileSize)}</span>
                                        <span>Type: {fileDocument.fileType.toUpperCase()}</span>
                                        {fileDocument.downloadCount > 0 && (
                                          <span>Downloads: {fileDocument.downloadCount}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => handleDownload(fileDocument)}
                                    disabled={downloading === fileDocument.id}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 self-start sm:self-auto"
                                  >
                                    {downloading === fileDocument.id ? (
                                      <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Downloading...</span>
                                      </>
                                    ) : (
                                      <>
                                        <Download className="w-4 h-4" />
                                        <span>Download</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {!selectedCategory && !loading && (
                      <div className="text-center text-gray-500 py-6 sm:py-8">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-sm sm:text-base">Click on any category from the left to view and download available documents.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Important Information
                </h3>
                <div className="text-gray-700 space-y-2 text-sm">
                  <p>• All forms are available in PDF format for easy download and printing.</p>
                  <p>• Please ensure you fill out the correct forms for your requirements.</p>
                  <p>• For assistance with form filling, please contact our support team.</p>
                  <p>• Documents in vernacular languages are available through the links above.</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  Need Help?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                  <div>
                    <p><strong>Email:</strong> info@moneycareindia.co.in</p>
                    <p><strong>Phone:</strong> +91-22-6234-5678</p>
                  </div>
                  <div>
                    <p><strong>Compliance Officer:</strong> Mr. Manish Thakor</p>
                    <p><strong>Grievance ID:</strong> complaint@moneycareindia.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notices Marquee */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-gray-900">Important Notices</h3>
            </div>
            <div className="overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-sm text-gray-700 leading-relaxed">
                <div className="inline-block mr-8">
                  <div className="mb-4">
                    <strong className="text-red-600">ATTENTION INVESTORS:</strong> Prevent Unauthorized Transactions in your demat account. Update your Mobile Number with Us. Receive alerts on your Registered Mobile for all debit and other important transactions in your demat account directly from CDSL on the same day.... Issued in the interest of investors.
                  </div>
                  <div className="mb-4">
                    <strong className="text-blue-800">KYC:</strong> KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (Broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.
                  </div>
                  <div className="mb-4">
                    <strong className="text-blue-800">IPO:</strong> No need to issue cheques by investors while subscribing to IPO. Just write the bank account number and sign in the application form to authorise your bank to make payment in case of allotment. No worries for refund as the money remains in investors account.
                  </div>
                  <div className="mb-4">
                    <strong className="text-blue-800">IBT Trading:</strong> The Stock Exchange, Mumbai is not in any manner answerable, responsible or liable to any person or persons for any acts of omission or commission, errors, mistakes and/or violation, actual or perceived, by us or our partners, agents, associates etc., of any of the Rules, Regulations, Bye-laws of the Stock Exchange, Mumbai, SEBI Act or any other laws in force from time to time.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <p className="text-gray-800">
                <strong>Note:</strong> This is to inform you that we do Client based trading as well as Pro-account trading.
              </p>
              <div>
                <p className="text-gray-800 mb-2">
                  <strong>Procedure to file a complaint on SEBI SCORES:</strong> Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Downloads;