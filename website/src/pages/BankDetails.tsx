import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';

const BankDetails: React.FC = () => {
  const exchangeDetails = [
    {
      srNo: '1',
      name: 'National Stock Exchange of India Ltd - NSE-Member ID-06471'
    },
    {
      srNo: '2',
      name: 'BSE Ltd - BSE Member ID-3238'
    },
    {
      srNo: '3',
      name: 'Central Depository Services (India) Ltd - CDSL Member ID-12024400'
    }
  ];

  const bankAccountDetails = [
    {
      srNo: '1',
      particular: 'NSE & BSE Cash',
      bankName: 'ICICI Bank Ltd',
      ifscCode: 'ICIC0000024',
      accountNo: '002405015691'
    },
    {
      srNo: '2',
      particular: 'NSE Future & Option',
      bankName: 'ICICI Bank Ltd',
      ifscCode: 'ICIC0000024',
      accountNo: '002405015696'
    },
    {
      srNo: '3',
      particular: 'DP Charges',
      bankName: 'ICICI Bank Ltd',
      ifscCode: 'ICIC0000024',
      accountNo: '002405022621'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="bank-details" />
      
      {/* Hero Section with Background */}
      <section className="relative pt-40 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
              Bank <span className="text-orange-400">Details</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-2">
              MONEYCARE SECURITIES & FINANCIAL SERVICES LTD
            </p>
          </div>
        </div>
      </section>

      {/* Stock Ticker */}
      <StockTicker />

      

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              
              {/* Company Information */}
              <div className="bg-blue-600 text-white p-4 sm:p-6 lg:p-8 text-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Moneycare Securities & Financial Services Ltd</h2>
                <div className="text-blue-100 space-y-1 text-sm sm:text-base">
                  <p>301, Shukun Arcade, Near HCG Hospital</p>
                  <p>Mithakali Six Road, Ahmedabad-380006.</p>
                </div>
              </div>

              {/* Exchange & Depository Details */}
              <div className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 text-center mb-4 sm:mb-6">
                  Details of Exchange & Depository
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg text-sm sm:text-base">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-lg border-r border-blue-500">Sr. No.</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-lg">Exchanges & Depository Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exchangeDetails.map((exchange, index) => (
                        <tr 
                          key={index} 
                          className={`${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          } hover:bg-blue-50 transition-colors duration-200`}
                        >
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-800 font-medium border-r border-gray-200">
                            {exchange.srNo}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-700">
                            {exchange.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Client Bank Account Details */}
              <div className="p-8 bg-gray-50 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  Details of Client Bank Account
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="px-4 py-4 text-left font-semibold text-sm border-r border-blue-500">Sr. No.</th>
                        <th className="px-4 py-4 text-left font-semibold text-sm border-r border-blue-500">Particular</th>
                        <th className="px-4 py-4 text-left font-semibold text-sm border-r border-blue-500">Bank Name</th>
                        <th className="px-4 py-4 text-left font-semibold text-sm border-r border-blue-500">IFSC Code</th>
                        <th className="px-4 py-4 text-left font-semibold text-sm">Bank Account No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bankAccountDetails.map((account, index) => (
                        <tr 
                          key={index} 
                          className={`${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          } hover:bg-blue-50 transition-colors duration-200`}
                        >
                          <td className="px-4 py-4 text-gray-800 font-medium border-r border-gray-200">
                            {account.srNo}
                          </td>
                          <td className="px-4 py-4 text-gray-700 border-r border-gray-200">
                            {account.particular}
                          </td>
                          <td className="px-4 py-4 text-gray-700 border-r border-gray-200">
                            {account.bankName}
                          </td>
                          <td className="px-4 py-4 text-gray-700 border-r border-gray-200 font-mono">
                            {account.ifscCode}
                          </td>
                          <td className="px-4 py-4 text-gray-700 font-mono">
                            {account.accountNo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Important Notice */}
              <div className="p-8 bg-yellow-50 border-t border-yellow-200">
                <h4 className="text-lg font-semibold text-yellow-800 mb-3">
                  Important Notice
                </h4>
                <div className="text-yellow-700 space-y-2 text-sm">
                  <p>• Please ensure you transfer funds only to the designated bank accounts mentioned above.</p>
                  <p>• Always verify the IFSC code and account number before making any transactions.</p>
                  <p>• For any queries regarding bank transfers, please contact our support team.</p>
                  <p>• Never share your banking credentials with anyone, including our staff.</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-8 bg-white border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  For Banking Related Queries
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <p><strong>Email:</strong> info@moneycareindia.co.in</p>
                    <p><strong>Phone:</strong> +91-22-6234-5678</p>
                    <p><strong>Address:</strong> 301, Shukun Arcade, Near HCG Hospital, Mithakali Six Road, Ahmedabad-380006</p>
                  </div>
                  <div>
                    <p><strong>Compliance Officer:</strong> Mr. Manish Thakor</p>
                    <p><strong>Grievance ID:</strong> complaint@moneycareindia.in</p>
                    <p><strong>SEBI SCORES:</strong> scores.sebi.gov.in</p>
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

export default BankDetails; 