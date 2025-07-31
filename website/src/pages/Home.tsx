import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users, Award, Phone, Mail, MapPin, UserPlus, Settings, Plus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';

const Home: React.FC = () => {
  const services = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Mutual Fund',
      description: 'Diversified investment options with professional portfolio management for long-term wealth creation.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Insurance',
      description: 'Comprehensive life and general insurance solutions to protect you and your family\'s future.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Financial Consulting',
      description: 'Expert financial advice and personalized strategies to help you achieve your financial goals.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Trades & Stock',
      description: 'Advanced trading platforms and research-backed stock recommendations for smart investing.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Derivatives Products',
      description: 'Sophisticated derivative instruments for hedging and speculative trading strategies.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'IPO',
      description: 'Access to Initial Public Offerings and guidance on new investment opportunities.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="home" />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                Welcome to <span className="text-orange-400">Moneycare India</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100">
                Simplifying Investments, Insurance, Loans & More
              </p>
              <p className="text-base sm:text-lg text-blue-200 max-w-2xl mx-auto lg:mx-0">
                Your trusted financial partner providing comprehensive solutions for wealth creation, 
                risk management, and financial planning with over a decade of expertise.
              </p>
              {/* Modern Action Buttons - 2x2 Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto lg:mx-0 mt-8">
                <button className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-sm sm:text-base transform hover:scale-105 hover:shadow-xl">
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span>Open an account</span>
                </button>
                <button className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-sm sm:text-base transform hover:scale-105 hover:shadow-xl">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>Start Investing</span>
                </button>
                <button className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-sm sm:text-base transform hover:scale-105 hover:shadow-xl">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Client Modification</span>
                </button>
                <button className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-sm sm:text-base transform hover:scale-105 hover:shadow-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  <span>Adding SLB Segment</span>
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 sm:mt-12 lg:mt-0">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Financial consulting" 
                  className="rounded-lg shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Ticker */}
      <StockTicker />

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center space-y-12 lg:space-y-0 lg:space-x-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="About Moneycare India" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">About <span className="text-blue-600">Moneycare India</span></h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Moneycare India, we believe in building lasting relationships with our clients by providing 
                transparent, ethical, and professional financial services. Our team of experienced advisors 
                is committed to helping you navigate the complex world of investments and financial planning.
              </p>
              <p className="text-gray-600">
                With SEBI registration and compliance with all regulatory requirements, we ensure that your 
                investments are safe and your financial goals are achieved through systematic and strategic planning.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">5000+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our <span className="text-blue-600">Services</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions tailored to your needs, backed by expert advice and proven strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                <div className="text-blue-600 group-hover:text-orange-500 transition-colors duration-300 mb-3 sm:mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-4 sm:mt-6">
                  <button className="text-blue-600 hover:text-orange-500 font-medium flex items-center space-x-2 transition-colors duration-300 text-sm sm:text-base">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Notice Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-8 shadow-lg">
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
            
            <div className="border-t pt-6 mt-6">
              <p className="text-gray-800 mb-4">
                <strong>Note:</strong> This is to inform you that we do Client based trading as well as Pro-account trading.
              </p>
              <p className="text-gray-800">
                <strong>Procedure to file a complaint on SEBI SCORES:</strong> Register on SCORES portal. Mandatory details for filing complaints on SCORES: 
                Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Contact <span className="text-orange-400">Us</span></h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to start your financial journey? Contact our expert team for personalized guidance and support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                  <Phone className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Phone</h3>
                  <p className="text-blue-100">+91-22-6234-5678</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                  <Mail className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Email</h3>
                  <p className="text-blue-100">info@moneycareindia.co.in</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                  <MapPin className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Address</h3>
                  <p className="text-blue-100">50-A, 3rd Floor, 308 Hanuman building<br />Perin Nariman Street, Fort Market, Mumbai</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-white placeholder-white/70"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-white placeholder-white/70"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-white placeholder-white/70"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-white placeholder-white/70"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;