import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';

const FreezingBlocking: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="freezing-blocking" />
      
      {/* Hero Section with Background */}
      <section className="relative pt-40 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
              Why to Freeze Your <span className="text-orange-400">Trading Account</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-2">
              If Your Trading Account with MONEYCARE to Detect Suspicious Activity
            </p>
          </div>
        </div>
      </section>

      {/* Stock Ticker */}
      <StockTicker />

      

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 space-y-8">
              
              {/* Introductory Paragraph */}
              <div className="text-gray-800 leading-relaxed text-lg">
                To safeguard investors' interests, SEBI has introduced a framework on January 12, 2024, to ease investment processes. This includes the facility for voluntary freezing or blocking of trading accounts, similar to blocking ATM, debit, or credit cards.
              </div>

              {/* Steps to Freeze Section */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 underline">
                  Steps to Freeze
                </h2>
                <h3 className="text-2xl font-semibold text-blue-600">
                  Your MONEYCARE Trading Account
                </h3>
                
                <div className="space-y-6">
                  {/* Email Request */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Email Request:
                    </h4>
                    <p className="text-gray-800 leading-relaxed mb-3">
                      Send an email from your registered email ID with the relevant details to
                    </p>
                    <a 
                      href="mailto:stoptrade@moneycareindia.in" 
                      className="text-blue-600 hover:text-blue-800 font-semibold text-lg underline"
                    >
                      stoptrade@moneycareindia.in
                    </a>
                  </div>

                  {/* Call Request */}
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Call Request:
                    </h4>
                    <p className="text-gray-800 leading-relaxed mb-3">
                      Call <span className="font-semibold text-orange-600">+91 97240 40444</span> from your registered mobile number.
                    </p>
                    <p className="text-gray-700 text-sm">
                      Refer to the Voluntary Freezing/Blocking of the Trading Account Policy to learn about the relevant details to be submitted. Once the necessary information is provided and the account is blocked, you will not be able to log in to the mobile application or web portal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps to Unblock Section */}
              <div className="space-y-6 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 underline">
                  Steps to Unblock
                </h2>
                <h3 className="text-2xl font-semibold text-green-600">
                  Your MONEYCARE Trading Account
                </h3>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-gray-800 leading-relaxed mb-3">
                    Call <span className="font-semibold text-green-600">+91 97240 40444</span> from your registered mobile number.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Once your account is unblocked, update your KYC details.
                  </p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                  Important Notice
                </h4>
                <p className="text-yellow-700">
                  This facility is designed to protect your trading account from unauthorized access. 
                  Please ensure you have all necessary documents and information ready before initiating 
                  the freezing or unblocking process.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  For Additional Support
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
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

export default FreezingBlocking; 