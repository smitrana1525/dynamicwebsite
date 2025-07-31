import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';

const ImportantCircular: React.FC = () => {
  const circulars = [
    {
      date: 'July 24, 2024',
      subject: 'NEW STATUS AND SUB-STATUS FOR DEMAT ACCOUNTS',
      downloadLink: '/circulars/demat-accounts-status-july-2024.pdf'
    },
    {
      date: 'July 18, 2024',
      subject: 'ADDITIONAL CRITERIA FOR DORMANT DEMAT ACCOUNTS',
      downloadLink: '/circulars/dormant-demat-criteria-july-2024.pdf'
    },
    {
      date: 'July 18, 2024',
      subject: 'VALIDATION OF KYC RECORDS WITH KRA',
      downloadLink: '/circulars/kyc-validation-kra-july-2024.pdf'
    },
    {
      date: 'July 10, 2024',
      subject: 'SEBI MASTER CIR ON SURVEILLANCE OF SECURITIES MARKET',
      downloadLink: '/circulars/sebi-surveillance-july-2024.pdf'
    },
    {
      date: 'June 07, 2024',
      subject: 'SEBI CIR UPLOADING OF KYC INFORMATION BY KYC REGISTRATION AGENCIES TO CENTRAL KYC RECORDS REGISTRY',
      downloadLink: '/circulars/kyc-uploading-june-2024.pdf'
    },
    {
      date: 'June 07, 2024',
      subject: 'IMPLEMENTATION OF TWO FACTOR AUTHENTICATION IN EASI & EASIEST LOGIN',
      downloadLink: '/circulars/two-factor-auth-june-2024.pdf'
    },
    {
      date: 'May 31, 2024',
      subject: 'REVIEW OF VALIDATION OF KYC RECORDS WITH KRA',
      downloadLink: '/circulars/kyc-review-may-2024.pdf'
    },
    {
      date: 'April 15, 2024',
      subject: 'AADHAAR SEEDING (LINKAGE OF PAN WITH AADHAAR)',
      downloadLink: '/circulars/aadhaar-pan-linkage-april-2024.pdf'
    },
    {
      date: 'April 05, 2024',
      subject: 'SCORES 2.0 New Technology to strengthen SEBI Complaint Redressal System for Investors',
      downloadLink: '/circulars/scores-2-0-april-2024.pdf'
    }
  ];

  const handleDownload = (downloadLink: string, subject: string) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = `${subject.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              
              {/* Table Header */}
              <div className="bg-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold">Important Circulars and Updates</h2>
                <p className="text-blue-100 mt-2">Stay updated with the latest regulatory announcements and important information</p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="px-6 py-4 text-left font-semibold text-lg">Date</th>
                      <th className="px-6 py-4 text-left font-semibold text-lg">Subject</th>
                      <th className="px-6 py-4 text-center font-semibold text-lg">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {circulars.map((circular, index) => (
                      <tr 
                        key={index} 
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } hover:bg-blue-50 transition-colors duration-200`}
                      >
                        <td className="px-6 py-4 text-gray-800 font-medium">
                          {circular.date}
                        </td>
                        <td className="px-6 py-4 text-gray-700 leading-relaxed">
                          {circular.subject}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDownload(circular.downloadLink, circular.subject)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Additional Information */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                      Stay Informed
                    </h3>
                    <p className="text-blue-700 text-sm">
                      These circulars contain important regulatory updates that may affect your trading account and investments. 
                      Please review them carefully and contact us if you have any questions.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">
                      Need Help?
                    </h3>
                    <p className="text-orange-700 text-sm">
                      For clarification on any circular or regulatory update, please contact our support team 
                      or reach out to our compliance officer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-6 bg-white border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                  <div>
                    <p><strong>Email:</strong> info@moneycareindia.co.in</p>
                    <p><strong>Phone:</strong> +91-22-6234-5678</p>
                  </div>
                  <div>
                    <p><strong>Compliance Officer:</strong> Mr. Manish Thakor</p>
                    <p><strong>Grievance ID:</strong> complaint@moneycareindia.in</p>
                  </div>
                  <div>
                    <p><strong>SEBI SCORES:</strong> scores.sebi.gov.in</p>
                    <p><strong>Address:</strong> 50-A, 3rd Floor, Perin Nariman Street, Mumbai</p>
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