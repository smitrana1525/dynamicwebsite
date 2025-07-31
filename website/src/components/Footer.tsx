import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const services = [
    { name: 'Financial Consulting', href: '/services' },
    { name: 'Trades & Stocks', href: '/services' },
    { name: 'Financial Projections', href: '/services' },
    { name: 'IGR-Online (Smart ODR)', href: 'https://smartodr.in/login', external: true }
  ];

  const usefulLinks = [
    { name: 'NSE', href: 'https://www.nseindia.com/', external: true },
    { name: 'BSE', href: 'https://www.bseindia.com/', external: true },
    { name: 'SEBI', href: 'https://www.sebi.gov.in/', external: true },
    { name: 'CDSL', href: 'https://www.cdslindia.com/', external: true },
    { name: 'SCORES', href: 'https://scores.sebi.gov.in/', external: true },
    { name: 'Contact', href: '/contact' },
    { name: 'NSE KYC Status', href: 'https://www.nsekra.com/', external: true },
    { name: 'PAN-Aadhaar Status', href: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status', external: true },
    { name: 'CVL-KRA Validation', href: 'https://www.cvlindia.com/', external: true },
    { name: 'NSDL KRA Validation', href: 'https://www.nsdl.co.in/', external: true }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12">
                <img 
                  src="/Logo.png" 
                  alt="Moneycare Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Moneycare</h3>
                <p className="text-xs sm:text-sm text-gray-600">Caring for better tomorrow</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  Registered Office
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-blue-600" />
                    <div>
                      <p className="font-medium">50-A, 3rd Floor,</p>
                      <p>308 Hanuman building Perin Nariman Street,</p>
                      <p>Fort Market, Fort Mumbai</p>
                      <p>Mumbai City MH 400001 IN</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Corporate Office
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-orange-500" />
                    <div>
                      <p className="font-medium">Shukun Arcade, 3rd Floor,</p>
                      <p>Near HCG Hospital, Mithakhali Six Road,</p>
                      <p>Ahmedabad – 380006</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    target={service.external ? '_blank' : undefined}
                    rel={service.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm">{service.name}</span>
                    {service.external && <ExternalLink className="w-3 h-3 ml-1 text-gray-400" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              Useful Links
            </h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm">{link.name}</span>
                    {link.external && <ExternalLink className="w-3 h-3 ml-1 text-gray-400" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance Officer */}
          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
              Compliance Officer
            </h4>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Mr. Manish Thakor</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <a href="mailto:complianceofficer@moneycareindia.in" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      complianceofficer@moneycareindia.in
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs text-gray-600 space-y-1">
                  <p><span className="font-medium">NSE/BSE SEBI Reg No:</span> INZ000266935</p>
                  <p><span className="font-medium">CDSL Reg No:</span> IN-DP-CDSL-671-2022</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h5 className="font-semibold text-orange-800 mb-2 text-sm">Investor Grievance ID</h5>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-orange-600" />
                  <a href="mailto:complaint@moneycareindia.in" className="text-sm text-orange-600 hover:text-orange-800 transition-colors">
                    complaint@moneycareindia.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms and Conditions</a>
              <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="/faqs" className="text-gray-600 hover:text-blue-600 transition-colors">FAQs</a>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              <p>&copy; 2024 Moneycare India. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;