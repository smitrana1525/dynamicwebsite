import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';

const MITC: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="mitc" />
      
      {/* Hero Section with Background */}
      <section className="relative pt-40 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
              Most Important Terms and Conditions <span className="text-orange-400">(MITC)</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-2">
              (For non-custodial settled trading accounts)
            </p>
          </div>
        </div>
      </section>

      {/* Stock Ticker */}
      <StockTicker />

      

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    Your trading account has a "Unique Client Code" (UCC), different from your demat account number. Do not allow anyone (including your own stock broker, their representatives and dealers) to trade in your trading account on their own without taking specific instruction from you for your trades. Do not share your internet/ mobile trading login credentials with anyone else.
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    You are required to place collaterals as margins with the stock broker before you trade. The collateral can either be in the form of funds transfer into specified stock broker bank accounts or margin pledge of securities from your demat account. The bank accounts are listed on the stock broker website. Please do not transfer funds into any other account. The stock broker is not permitted to accept any cash from you.
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    The stock broker's Risk Management Policy provides details about how the trading limits will be given to you, and the tariff sheet provides the charges that the stock broker will levy on you.
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    All securities purchased by you will be transferred to your demat account within one working day of the payout. In case of securities purchased but not fully paid by you, the transfer of the same may be subject to limited period pledge i.e. seven trading days after the pay-out (CUSPA pledge) created in favor of the stock broker. You can view your demat account balances directly at the website of the Depositories after creating a login.
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    The stock broker is obligated to deposit all funds received from you with any of the Clearing Corporations duly allocated in your name. The stock broker is further mandated to return excess funds as per applicable norms to you at the time of quarterly/ monthly settlement. You can view the amounts allocated to you directly at the website of the Clearing Corporation(s).
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    You will get a contract note from the stock broker within 24 hours of the trade.
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    You may give a one-time Demat Debit and Pledge Instruction (DDPI) authority to your stock broker for limited access to your demat account, including transferring securities, which are sold in your account for pay-in.
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    The stock broker is expected to know your financial status and monitor your accounts accordingly. Do share all financial information (e.g. income, networth, etc.) with the stock broker as and when requested for. Kindly also keep your email Id and mobile phone details with the stock broker always updated.
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    In case of disputes with the stock broker, you can raise a grievance on the dedicated investor grievance ID of the stock broker. You can also approach the stock exchanges and/or SEBI directly.
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800 leading-relaxed">
                    Any assured/guaranteed/fixed returns schemes or any other schemes of similar nature are prohibited by law. You will not have any protection/recourse from SEBI/stock exchanges for participation in such schemes.
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

export default MITC;