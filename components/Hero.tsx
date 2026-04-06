"use client";

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const services = [
    "Tank Cleaning & Maintenance",
    "Calibration Services", 
    "Pipeline Installation",
    "O&M for Petrol Stations"
  ];

  // Smooth scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Spring physics for smooth motion
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(serviceInterval);
  }, []);

  // Animation variants with premium spring physics
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  };

 const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 25,
    }
  }
};

  const fadeInUpVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 28,
      }
    }
  };

  const statsVariants: import('framer-motion').Variants= {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay: custom * 0.1,
      }
    })
  };

  const serviceCardVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25,
        delay: custom * 0.15,
      }
    })
  };
// Add this helper function inside the Hero component (before return)
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = 64;
    const offsetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Trebuchet+MS&display=swap');

        * {
          font-family: -apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif;
        }
      `}</style>

      <motion.section 
        ref={heroRef}
        className="relative pt-24 pb-12 overflow-hidden min-h-[90vh] flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Static Gradient Background with Animated Overlay */}
        <motion.div 
          className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
          style={{ y: ySpring }}
        >
          {/* Animated mesh gradient overlay */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{ 
              background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
              opacity: opacitySpring 
            }}
          />
          {/* Dot pattern overlay for texture */}
          <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
             

              {/* Main Heading */}
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  >
                    Integrated
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  >
                    Petro & Industrial
                  </motion.span>
                  <motion.span 
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                  >
                    Logistics Solutions
                  </motion.span>
                </h1>
                
                {/* Rotating Services with smooth animation */}
                <div className="h-6 overflow-hidden relative">
                  <motion.div 
                    animate={{ y: -currentSlide * 24 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col"
                  >
                    {services.map((service, index) => (
                      <div 
                        key={index} 
                        className="text-base font-medium text-blue-300 h-6 flex items-center"
                      >
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                        <span className="ml-2">{service}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p 
                variants={fadeInUpVariants}
                className="text-sm text-gray-200 leading-relaxed max-w-xl"
              >
                <span className="font-semibold text-white">PERFECT LOGISTICS</span> - Your exclusive Petro logistic solution provider. 
                We handle all <span className="font-medium text-white">HSD, MS, Oil Tanks</span> (UG & AG) cleaning with higher HSSE standards. 
                Specialized in calibration, O&M services, pipeline installation, and complete mechanical & electrical works.
              </motion.p>

              {/* Stats with animated counters */}
              <motion.div 
                className="grid grid-cols-3 gap-3 py-2"
                variants={containerVariants}
              >
                {[
                  { value: "20+", label: "Years Experience", delay: 0 },
                  { value: "PAN", label: "India Coverage", delay: 1 },
                  { value: "100%", label: "HSSE Compliant", delay: 2 }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={statsVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="text-center bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-xl cursor-pointer group"
                  >
                    <motion.div 
                      className="text-2xl font-bold text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-gray-300 font-medium mt-1 group-hover:text-white transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={fadeInUpVariants}
              >
                <motion.button 
                suppressHydrationWarning
               onClick={() => scrollToSection('contact')}
                className="group relative px-7 py-3.5 bg-blue-500 text-white font-semibold rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>GET QUOTE NOW</span>
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                </motion.button>
                
                <motion.button 
                suppressHydrationWarning
                 onClick={() => scrollToSection('services')}
                  className="px-7 py-3.5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border border-white/30 shadow-lg"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  VIEW SERVICES
                </motion.button>
              </motion.div>

              {/* Client Logos Badge */}
              <motion.div 
                className="flex items-center space-x-3 pt-3"
                variants={fadeInUpVariants}
              >
                <div className="flex -space-x-2">
                  {[
                    { bg: "bg-blue-500", text: "BP" },
                    { bg: "bg-red-500", text: "SH" },
                    { bg: "bg-green-500", text: "IO" },
                    { bg: "bg-purple-500", text: "TC" }
                  ].map((logo, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1.5 + index * 0.1, 
                        type: "spring", 
                        stiffness: 200,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        zIndex: 10,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      className={`w-10 h-10 rounded-full ${logo.bg} flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg cursor-pointer`}
                    >
                      {logo.text}
                    </motion.div>
                  ))}
                </div>
                <motion.span 
                  className="text-sm text-gray-200 font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  Trusted by leading PSUs & corporates
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Right Content - Service Cards */}
            <motion.div 
              className="relative lg:block hidden"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 25 }}
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div 
                  className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-200"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="space-y-4">
                    {/* Service Cards */}
                    <motion.div 
                      className="space-y-3"
                      initial="hidden"
                      animate="visible"
                    >
                      {[
                        { 
                          bgGradient: "bg-gradient-to-r from-blue-50 to-blue-100",
                          borderColor: "border-blue-500",
                          iconBg: "bg-blue-500",
                          title: "Tank Cleaning Services", 
                          subtitle: "HSD, MS, Oil Tanks (UG & AG)",
                          icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        },
                        { 
                          bgGradient: "bg-gradient-to-r from-green-50 to-green-100",
                          borderColor: "border-green-500",
                          iconBg: "bg-green-500",
                          title: "Calibration & Inspection", 
                          subtitle: "PESO certified services",
                          icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        },
                        { 
                          bgGradient: "bg-gradient-to-r from-gray-50 to-gray-100",
                          borderColor: "border-gray-700",
                          iconBg: "bg-gray-700",
                          title: "Mechanical & Electrical", 
                          subtitle: "Complete installation & O&M",
                          icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        }
                      ].map((service, index) => (
                        <motion.div
                          key={index}
                          custom={index}
                          variants={serviceCardVariants}
                          whileHover={{ 
                            scale: 1.02, 
                            x: 5,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                          }}
                          className={`group ${service.bgGradient} p-4 rounded-xl border-l-4 ${service.borderColor} hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
                        >
                          <div className="flex items-start space-x-3">
                            <motion.div 
                              className={`w-11 h-11 ${service.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                              </svg>
                            </motion.div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{service.title}</h3>
                              <p className="text-sm text-gray-600 mt-0.5">{service.subtitle}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Certifications Badge */}
                    <motion.div 
                      className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 shadow-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, type: "spring" }}
                      whileHover={{ scale: 1.02, borderColor: "#10b981" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div 
                            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </motion.div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">PESO Certified</p>
                            <p className="text-xs text-gray-600">Higher HSSE Standards</p>
                          </div>
                        </div>
                        <motion.div 
                          className="text-right"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <p className="text-3xl font-bold text-green-600">✓</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-blue-500 text-white px-6 py-2.5 rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                >
                  <p className="font-bold text-sm">24/7 Support</p>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-white px-6 py-2.5 rounded-lg shadow-2xl border-2 border-blue-200"
                  initial={{ opacity: 0, scale: 0, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: -3 }}
                >
                  <p className="font-bold text-blue-600 text-sm">ISO Certified</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}