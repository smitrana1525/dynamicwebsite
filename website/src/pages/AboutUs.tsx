import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StockTicker from '../components/StockTicker';
import { Users, Target, Award, TrendingUp, Shield, Heart, CheckCircle, Star } from 'lucide-react';

const AboutUs: React.FC = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Integrity",
      description: "Building lasting relationships through transparency and ethical practices"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description: "Putting our clients' financial well-being at the heart of everything we do"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description: "Embracing technology to provide cutting-edge financial solutions"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Excellence",
      description: "Striving for the highest standards in service delivery and performance"
    }
  ];

  const achievements = [
    { number: "10+", label: "Years of Experience", icon: <Award className="w-6 h-6" /> },
    { number: "50,000+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> },
    { number: "₹500Cr+", label: "Assets Under Management", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "15+", label: "Awards & Recognition", icon: <Star className="w-6 h-6" /> }
  ];



  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="about" />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6">
              About <span className="text-orange-400">Moneycare India</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8">
              Your Trusted Financial Partner for Over a Decade
            </p>
            <p className="text-base sm:text-lg text-blue-200 max-w-3xl mx-auto">
              We are committed to empowering individuals and businesses with comprehensive financial solutions, 
              innovative technology, and personalized service to help you achieve your financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Stock Ticker */}
      <StockTicker />

      {/* Company Overview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Our Story
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Founded in 1993, Moneycare India has grown from a small financial advisory firm to one of 
                  the most trusted names in comprehensive financial services. Our journey has been marked by 
                  unwavering commitment to client success and continuous innovation.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We started with a simple mission: to make financial planning accessible, transparent, and 
                  effective for every Indian. Today, we serve over 50,000 clients across the country, helping 
                  them build wealth, manage risks, and secure their financial future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    Download Company Profile
                  </button>
                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    View Certificates
                  </button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Moneycare team" 
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Mission & Vision
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Driving financial empowerment through innovative solutions and trusted partnerships
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 sm:p-8 rounded-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <Target className="w-8 h-8" />
                  <h3 className="text-xl sm:text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  To provide comprehensive financial solutions that empower individuals and businesses to achieve 
                  their financial goals through innovative technology, expert guidance, and personalized service.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 sm:p-8 rounded-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <TrendingUp className="w-8 h-8" />
                  <h3 className="text-xl sm:text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-orange-100 leading-relaxed">
                  To become the most trusted and preferred financial partner for every Indian, known for 
                  excellence, innovation, and unwavering commitment to client success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                  <div className="text-blue-600 group-hover:text-orange-500 transition-colors duration-300 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Achievements
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Milestones that reflect our commitment to excellence
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl border border-blue-100">
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {achievement.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-900 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Financial Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied clients who trust Moneycare India with their financial future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
                Open Account Now
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs; 