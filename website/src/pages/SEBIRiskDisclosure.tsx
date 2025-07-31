import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SEBIRiskDisclosure: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="sebi-risk-disclosure" />
      
      
      
      {/* Hero Section */}
      <div className="pt-40 pb-16 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Annexure - I: <span className="text-orange-400">Risk Disclosures</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Important risk disclosures for derivatives trading and investor protection
            </p>
            {/* Breadcrumbs */}
            <div className="flex justify-center items-center space-x-2 text-sm">
              <span className="text-blue-200">Home</span>
              <span className="text-blue-300">/</span>
              <span className="text-orange-400 font-semibold">SEBI Risk Disclosure</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Risk Disclosures on Derivatives
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      9 out of 10 individual traders in equity Futures and Options Segment incurred net losses.
                    </li>
                    <li>
                      On an average, loss makers registered net trading loss close to ₹ 50,000
                    </li>
                    <li>
                      Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.
                    </li>
                    <li>
                      Those making net trading profits, incurred between 15% to 50% of such profits as transaction cost
                    </li>
                  </ul>
                </div>

                <div className="text-sm text-gray-600 mt-6">
                  <p className="font-semibold">Source:</p>
                  <p>
                    SEBI study dated January 25, 2023 on "Analysis of Profit and Loss of Individual Traders dealing in equity futures and Options (F&O) Segment", wherein Aggregate Level findings are based on annual Profit/Loss incurred by individual traders in equity F&O during FY 2021-2022.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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

export default SEBIRiskDisclosure;
