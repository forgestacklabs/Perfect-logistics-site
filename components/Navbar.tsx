"use client";

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    // { id: 'clients', label: 'Clients' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  setActiveLink(id);
  setIsMobileMenuOpen(false);

  // Wait for any re-renders to settle before scrolling
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};
  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Trebuchet+MS&display=swap');

        * {
          font-family: -apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <motion.nav 
        className="fixed w-full top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Top Info Bar */}
        <motion.div 
          className="text-white overflow-hidden"
          initial={{ height: "auto", opacity: 1 }}
          animate={{ 
            height: isScrolled ? 0 : "auto",
            opacity: isScrolled ? 0 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="bg-black/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-2 text-sm">
                <div className="flex items-center space-x-6">
                  <motion.span 
                    className="flex items-center space-x-2 cursor-pointer"
                    whileHover={{ scale: 1.05, color: "#d1d5db" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>+91 99000 48837</span>
                  </motion.span>
                  <motion.span 
                    className="hidden md:flex items-center space-x-2 cursor-pointer"
                    whileHover={{ scale: 1.05, color: "#d1d5db" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>info@perfectlogistics.in</span>
                  </motion.span>
                </div>
                <div className="hidden lg:flex items-center text-xs">
                  <span>Branches: Bangalore | Chennai | Hyderabad | Delhi</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Navigation */}
        <motion.div 
          className={`transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-200' 
              : 'bg-white/10 backdrop-blur-md border-b border-white/20'
          }`}
          animate={{
            backgroundColor: isScrolled 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgba(255, 255, 255, 0.1)'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo Section */}
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              >
                {/* Logo Image - Smaller */}
                <motion.div
                  className={`relative transition-all duration-300 ${
                    isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                  }`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Perfect Logistics Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain drop-shadow-lg"
                    priority
                  />
                </motion.div>

                {/* Company Name - Shows on scroll */}
                <motion.div 
                  className="flex items-center overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ 
                    width: isScrolled ? "auto" : 0,
                    opacity: isScrolled ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center whitespace-nowrap pl-1">
                    <span className="text-xl font-bold text-green-500">P</span>
                    <span className="text-xl font-bold text-black">erfect</span>
                    <span className="mx-1 text-xl font-bold text-blue-500">L</span>
                    <span className="text-xl font-bold text-black">ogistics</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Desktop Navigation */}
              <motion.div 
                className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 ml-8 xl:ml-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="relative px-3 xl:px-4 py-2 group block"
                    >
                      <motion.span
                        className={`text-sm font-medium transition-colors duration-200 ${
                          activeLink === link.id
                            ? isScrolled ? 'text-blue-500' : 'text-blue-300'
                            : isScrolled ? 'text-gray-700' : 'text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {link.label}
                      </motion.span>
                      
                      {/* Animated underline */}
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          isScrolled ? 'bg-blue-500' : 'bg-blue-300'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ 
                          scaleX: activeLink === link.id ? 1 : 0,
                          originX: 0.5
                        }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </a>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div 
                className="hidden lg:flex items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button 
                  suppressHydrationWarning
  onClick={() => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }}
  className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
    isScrolled 
      ? 'bg-blue-500 text-white' 
      : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
  }`}
  whileHover={{ 
    scale: 1.05,
    boxShadow: isScrolled 
      ? "0 10px 30px rgba(59, 130, 246, 0.3)"
      : "0 10px 30px rgba(255, 255, 255, 0.2)"
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  GET QUOTE
</motion.button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                suppressHydrationWarning
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100 active:bg-gray-200' 
                    : 'text-white hover:bg-white/10 active:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <svg 
                  className="w-6 h-6"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <motion.path
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    variants={{
                      closed: { d: "M4 6h16M4 12h16M4 18h16" },
                      open: { d: "M6 18L18 6M6 6l12 12" }
                    }}
                    animate={isMobileMenuOpen ? "open" : "closed"}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Sidebar Menu Overlay */}
      <motion.div
        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Menu */}
      <motion.div 
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 ${
          isScrolled ? 'bg-white' : 'bg-gray-900'
        } shadow-2xl`}
        initial={{ x: '100%' }}
        animate={{ 
          x: isMobileMenuOpen ? 0 : '100%'
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isScrolled ? 'border-gray-200' : 'border-white/10'
          }`}>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Perfect Logistics"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="flex items-center">
                <span className={`text-lg font-bold ${isScrolled ? 'text-green-500' : 'text-green-400'}`}>P</span>
                <span className={`text-lg font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>erfect</span>
                <span className={`mx-0.5 text-lg font-bold ${isScrolled ? 'text-blue-500' : 'text-blue-400'}`}>L</span>
                <span className={`text-lg font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>ogistics</span>
              </div>
            </div>
            <motion.button
              suppressHydrationWarning
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-2 rounded-lg ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Sidebar Navigation Links */}
          <motion.div 
            className="flex-1 overflow-y-auto p-6 space-y-2"
            initial="hidden"
            animate={isMobileMenuOpen ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2
                }
              },
              hidden: {
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1
                }
              }
            }}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeLink === link.id
                    ? isScrolled 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-white/20 text-white shadow-lg'
                    : isScrolled 
                      ? 'text-gray-700 hover:bg-gray-100 active:bg-gray-200' 
                      : 'text-white/90 hover:bg-white/10 active:bg-white/20'
                }`}
                variants={{
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24
                    }
                  },
                  hidden: { 
                    opacity: 0, 
                    x: 20,
                    transition: {
                      duration: 0.2
                    }
                  }
                }}
                whileTap={{ scale: 0.96 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Sidebar Footer with CTA */}
          <div className={`p-6 border-t ${
            isScrolled ? 'border-gray-200' : 'border-white/10'
          }`}>
            <motion.button 
              suppressHydrationWarning
              className={`w-full px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isScrolled 
                  ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-md' 
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 active:bg-white/40'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              GET QUOTE
            </motion.button>

            {/* Contact Info */}
            <div className={`mt-4 pt-4 border-t ${
              isScrolled ? 'border-gray-200' : 'border-white/10'
            }`}>
              <div className={`text-xs space-y-2 ${
                isScrolled ? 'text-gray-600' : 'text-white/70'
              }`}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91 99000 48837</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>info@perfectlogistics.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}