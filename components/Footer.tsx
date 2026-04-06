"use client";

import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    "Tank Cleaning Services",
    "Calibration & Inspection",
    "Pipeline Installation",
    "O&M Services",
    "Mechanical & Electrical",
    "Warehousing & Logistics"
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Company Info — logo matches navbar */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              {/* Same logo image as navbar */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Perfect Logistics Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>

              {/* Same coloured text as navbar */}
              <div className="flex items-center whitespace-nowrap">
                <span className="text-xl font-bold text-green-400">P</span>
                <span className="text-xl font-bold text-white">erfect</span>
                <span className="mx-1 text-xl font-bold text-blue-400">L</span>
                <span className="text-xl font-bold text-white">ogistics</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Leading Petro logistic solution provider with over 20 years of experience in tank cleaning,
              calibration, and industrial services with higher HSSE standards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-sm text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="text-blue-400 text-xs">✓</span>
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300">
                  <p>1st Floor, Vishnukripa</p>
                  <p>NH 17, Kulai</p>
                  <p className="font-semibold text-white">Mangalore - 575 010</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300">
                  <p>+91 99000 48837</p>
                  <p>+91 94820 48837</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300">
                  <p>info@perfectlogistics.in</p>
                  <p>senthil@perfectlogistics.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Perfect Logistics. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Founded by <span className="text-blue-400 font-semibold">Ln. SENTHIL.K</span>
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Top Line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
    </footer>
  );
}