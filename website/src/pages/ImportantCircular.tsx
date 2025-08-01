import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';
import { Download, FileText, Calendar, AlertCircle, Search, Filter, Eye } from 'lucide-react';
import { circularService, Circular } from '../services/circularService';

const ImportantCircular: React.FC = () => {
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [downloading, setDownloading] = useState<number | null>(null);

  useEffect(() => {
    loadCirculars();
    
    // Subscribe to changes in the shared service
    const unsubscribe = circularService.subscribe(() => {
      loadCirculars();
    });
    
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const loadCirculars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load circulars from the shared service
      const circularsData = await circularService.getCirculars();
      setCirculars(circularsData);
    } catch (error) {
      console.error('Error loading circulars:', error);
      setError('Failed to load circulars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleShow = async (circular: Circular) => {
    try {
      const showUrl = await circularService.showFile(circular.id);
      window.open(showUrl, '_blank');
    } catch (err) {
      console.error('Show failed:', err);
      alert('Failed to open circular. Please try again.');
    }
  };

  const handleDownload = async (circular: Circular) => {
    try {
      setDownloading(circular.id);
      await circularService.downloadFile(circular.id);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    return circularService.formatFileSize(bytes);
  };

  const formatDate = (dateString: string): string => {
    return circularService.formatDate(dateString);
  };

  const filteredCirculars = circulars.filter(circular =>
    circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    circular.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="important-circular" />
      
      {/* Hero Section with Background */}
      <section className="relative pt-40 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
              Important <span className="text-orange-400">Circulars</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-2">
              For Clients - Latest Updates and Regulatory Announcements
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
              
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search circulars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading circulars...</p>
                </div>
              )}

              {/* Circulars Table */}
              {!loading && (
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCirculars.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">
                              {searchTerm ? 'No circulars found matching your search' : 'No circulars available'}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredCirculars.map((circular) => (
                          <tr key={circular.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-sm text-gray-900">
                                  {formatDate(circular.uploadDate)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {circular.title}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {circular.title}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {circular.description}
                                </div>
                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                                  <span>{circular.fileType.toUpperCase()}</span>
                                  <span>{formatFileSize(circular.fileSize)}</span>
                                  <span>{circular.downloadCount} downloads</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex space-x-2 justify-end">
                                <button
                                  onClick={() => handleShow(circular)}
                                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Show
                                </button>
                                <button
                                  onClick={() => handleDownload(circular)}
                                  disabled={downloading === circular.id}
                                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                  {downloading === circular.id ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                      Downloading...
                                    </>
                                  ) : (
                                    <>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Additional Information */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Important Information
                </h3>
                <div className="text-gray-700 space-y-2 text-sm">
                  <p>• All circulars are official regulatory announcements and should be read carefully.</p>
                  <p>• Circulars are updated regularly to ensure compliance with latest regulations.</p>
                  <p>• For any clarification regarding circulars, please contact our compliance team.</p>
                  <p>• Keep yourself updated with the latest circulars to avoid any compliance issues.</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  Need Help?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                  <div>
                    <p><strong>Email:</strong> compliance@moneycareindia.co.in</p>
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

export default ImportantCircular; 