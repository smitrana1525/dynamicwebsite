import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';
import { 
  TrendingUp, 
  Shield, 
  Home, 
  Car, 
  Heart, 
  Building, 
  Calculator, 
  FileText, 
  Users, 
  Target, 
  Award, 
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Globe,
  BarChart3,
  Calendar,
  Smartphone
} from 'lucide-react';

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Financial Consulting",
      description: "Expert financial advisory services to help you make informed investment decisions. Get personalized financial planning and wealth management solutions.",
      features: ["Personal Financial Planning", "Investment Advisory", "Wealth Management", "Tax Planning"],
      color: "purple"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Derivatives Products",
      description: "Advanced derivatives trading solutions including futures, options, and other derivative instruments for sophisticated investors.",
      features: ["Futures Trading", "Options Trading", "Risk Management", "Expert Analysis"],
      color: "blue"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Trades & Stocks",
      description: "Comprehensive equity trading platform for stocks, ETFs, and securities. Real-time market data and advanced trading tools.",
      features: ["Equity Trading", "Real-time Charts", "Research Reports", "Mobile Trading"],
      color: "green"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Insurance",
      description: "Complete insurance solutions covering life, health, motor, and property insurance. Protect your assets and secure your future.",
      features: ["Life Insurance", "Health Insurance", "Motor Insurance", "Property Insurance"],
      color: "orange"
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Mutual Fund",
      description: "Diversified mutual fund investments across various categories. Professional fund management and regular portfolio rebalancing.",
      features: ["Diversified Portfolios", "Professional Management", "Regular Rebalancing", "Tax Benefits"],
      color: "red"
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "IPO",
      description: "Participate in Initial Public Offerings with our seamless IPO application process. Get access to new investment opportunities.",
      features: ["IPO Applications", "New Listings", "Investment Opportunities", "Easy Process"],
      color: "indigo"
    }
  ];

  const investmentServices = [
    {
      title: "Mutual Funds",
      description: "Diversify your portfolio with our curated selection of mutual funds across various categories and risk profiles.",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      title: "Fixed Deposits",
      description: "Secure your savings with our high-yield fixed deposit schemes offering competitive interest rates.",
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: "Government Securities",
      description: "Invest in government bonds and securities for guaranteed returns and tax benefits.",
      icon: <Building className="w-8 h-8" />
    },
    {
      title: "PMS Services",
      description: "Professional portfolio management services for high-net-worth individuals and institutions.",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const additionalServices = [
    {
      title: "Financial Planning",
      description: "Comprehensive financial planning to help you achieve your life goals and secure your future.",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Tax Planning",
      description: "Expert tax planning and advisory services to optimize your tax liability and maximize savings.",
      icon: <Calculator className="w-6 h-6" />
    },
    {
      title: "Wealth Management",
      description: "Personalized wealth management solutions for high-net-worth individuals and families.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Retirement Planning",
      description: "Secure your golden years with our comprehensive retirement planning and pension solutions.",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Estate Planning",
      description: "Professional estate planning services to ensure smooth wealth transfer to your loved ones.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Corporate Advisory",
      description: "Strategic financial advisory services for businesses, including M&A, restructuring, and fundraising.",
      icon: <Building className="w-6 h-6" />
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      indigo: 'text-indigo-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="services" />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Our <span className="text-orange-400">Services</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8">
              Comprehensive Financial Solutions for Every Need
            </p>
            <p className="text-base sm:text-lg text-blue-200 max-w-3xl mx-auto">
              From trading and investments to loans and insurance, we provide end-to-end financial services 
              to help you achieve your goals and secure your future.
            </p>
          </div>
        </div>
      </section>

      {/* Stock Ticker */}
      <StockTicker />

      {/* Main Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Core Services
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of financial services designed to meet all your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mainServices.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6 sm:p-8">
                    <div className={`${getIconColorClasses(service.color)} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 group">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Investment Solutions
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Build wealth with our diverse investment options and expert guidance
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {investmentServices.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Additional Services
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Comprehensive financial advisory and planning services to secure your future
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                  <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Moneycare India?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Experience the difference with our customer-centric approach and proven track record
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">10+ Years Experience</h3>
                <p className="text-gray-600 text-sm">Decade of excellence in financial services</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">50,000+ Clients</h3>
                <p className="text-gray-600 text-sm">Trusted by thousands of satisfied customers</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Processing</h3>
                <p className="text-gray-600 text-sm">Fast and efficient service delivery</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pan India Presence</h3>
                <p className="text-gray-600 text-sm">Services available across the country</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-900 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact our experts today to discuss your financial needs and get personalized solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
                Get Free Consultation
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services; 