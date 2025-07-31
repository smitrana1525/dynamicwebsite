import React from 'react';
import { Mail, Phone, MapPin, User, MessageSquare, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="contact" />
      
      {/* Hero Section */}
              <div className="pt-40 pb-16 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8">
              Get in touch with our team for any queries or support
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm sm:text-base">
              <span>Home</span>
              <span className="text-blue-300">/</span>
              <span className="text-orange-400">Contact Us</span>
            </div>
          </div>
        </div>
      </div>

      <StockTicker />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Office Addresses Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-orange-500" />
                Registered Office
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  50-A, 3rd Floor, 308 Hanuman building<br />
                  Perin Nariman Street, Fort Market, Fort Mumbai<br />
                  Mumbai City MH 400001 IN
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-orange-500" />
                Corporate Office
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Shukun Arcade, 3rd Floor<br />
                  Near HCG Hospital, Mithakhali Six Road<br />
                  Ahmedabad - 380006
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form and Branch Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Form</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">How can we help</h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your message (optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </button>
              </form>
            </div>

            {/* Branch Details */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Branch Details</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">MUMBAI</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    401 SILVER HEIGHTS, 51ST ROAD<br />
                    TPS-III, OPP. KENT GARDEN<br />
                    TOWER, BORIVALI-WEST<br />
                    MUMBAI-400092
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">SURENDRANAGAR</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    MEENA BAZAR BUILDING<br />
                    MEHTA MARKET, SURENDRANAGAR-363001
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">RAJKOT</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    115, PANCHNATH COMMERCIAL<br />
                    CENTRE, 1ST FLOOR, HARIHAR CHOWK,<br />
                    DR.RAJENDRA PRASAD ROAD, RAJKOT-360001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Escalation Matrix */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Escalation Matrix Annexure 'A'</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Details Of</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Contact Person</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Address</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Contact No.</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Email ID</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Timing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Head of Customer Care</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Amul Mehta</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      Shukun Arcade, Mithakali Six Road, Ahmedabad-380006
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">+91 8000202060</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">manish@moneycareindia.com</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">10 AM to 6:30 PM</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer Care</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Vishal Patel</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      Shukun Arcade, Mithakali Six Road, Ahmedabad-380006
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">079-26561700/01</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">contact@moneycareindia.com</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">10 AM to 6 PM</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Compliance Officer</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Manish Thakor</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      Shukun Arcade, Mithakali Six Road, Ahmedabad-380006
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">+91 8780507872</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">complianceofficer@moneycareindia.com</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">10 AM to 6:30 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Grievance Procedure */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Grievance Procedure</h2>
            <p className="text-gray-700 mb-6">
              In absence of a response/complaint not address to your satisfaction you may lodge a complaint with:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">SEBI</h3>
                <a 
                  href="https://scores.gov.in/scores/welcome.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  https://scores.gov.in/scores/welcome.html
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Exchanges & Depository</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">NSE:</span>
                    <a 
                      href="http://investorhelpline.nseindia.com/NICEPLUS/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      http://investorhelpline.nseindia.com/NICEPLUS/
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">BSE:</span>
                    <a 
                      href="https://bsecrs.bseindia.com/ecomplaint/frminvestorHome.aspx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      https://bsecrs.bseindia.com/ecomplaint/frminvestorHome.aspx
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">CDSL:</span>
                    <a 
                      href="https://www.cdslindia.com/Footer/grievances.aspx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      https://www.cdslindia.com/Footer/grievances.aspx
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Contact Information */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Primary Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-orange-400" />
                <div>
                  <p className="text-sm text-blue-200">Email</p>
                  <p className="font-semibold">contact@moneycareindia.in</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-orange-400" />
                <div>
                  <p className="text-sm text-blue-200">Phone</p>
                  <p className="font-semibold">(079) 26561700/1701</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default ContactUs; 