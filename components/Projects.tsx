"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import type { Variants } from 'framer-motion';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'vision' | 'completed' | 'ongoing'>('vision');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgYSpring = useSpring(bgY, { stiffness: 100, damping: 30 });

  const completedProjects = [
    { id: 'CP001', name: 'BPCL Depot Tank Cleaning – Chennai', scope: 'UG Tank Cleaning & Mechanical Works', year: '2023', client: 'BPCL' },
    { id: 'CP002', name: 'Indian Oil Gantry Calibration – Coimbatore', scope: 'Overhead Gantry Crane Calibration & PESO Certification', year: '2023', client: 'Indian Oil' },
    { id: 'CP003', name: 'Shell Petrol Station O&M – Bangalore', scope: 'Full O&M including Dispenser & Electrical Works', year: '2022', client: 'Shell' },
    { id: 'CP004', name: 'HPCL Pipeline Installation – Hyderabad', scope: 'HSD & Hydrant Pipeline, MS GI SS Material', year: '2022', client: 'HPCL' },
    { id: 'CP005', name: 'ALDS RO Plant – Pune', scope: 'New RO Plant Installation with Liaison & Documentation', year: '2022', client: 'ALDS' },
    { id: 'CP006', name: 'IOC UG Tank Evacuation – Mumbai', scope: 'Underground Storage Tank Evacuation & Cleaning', year: '2021', client: 'IOC' },
    { id: 'CP007', name: 'IT Park Fuel Tank O&M – Chennai', scope: 'DG Set Fuel Tank Maintenance for IT Campus', year: '2021', client: 'IT Co.' },
    { id: 'CP008', name: 'BPCL Civil Excavation & Tank Farm – Trichy', scope: 'Civil Excavation, Tank Farm Setup, Foundation Works', year: '2021', client: 'BPCL' },
    { id: 'CP009', name: 'Flow Meter Calibration – Coimbatore', scope: 'Hydro/Electro Magnetic Flow Meters Calibration', year: '2020', client: 'Multiple' },
    { id: 'CP010', name: 'STP Tank Cleaning & Installation – Bangalore', scope: 'STP Tank Cleaning & RO Plant Integration', year: '2020', client: 'Real Estate' },
  ];

  const ongoingProjects = [
    { id: 'OP001', name: 'BPCL Tank Modernization – Pan India', scope: 'UG Tank Cleaning, Mechanical & Electrical Works across 12 Depots', progress: 65, client: 'BPCL', expected: 'Q3 2025' },
    { id: 'OP002', name: 'HPCL Gantry Calibration Annual Contract', scope: 'Recurring Calibration & PESO Certification for Gantry Locations', progress: 45, client: 'HPCL', expected: 'Q2 2025' },
    { id: 'OP003', name: 'Shell O&M Maintenance – South India', scope: 'O&M for 8 Petrol Stations including Electrical, Mechanical & Civil', progress: 80, client: 'Shell', expected: 'Q1 2025' },
    { id: 'OP004', name: 'IOC Pipeline Replacement – Karnataka', scope: 'HSD Pipeline Replacement, MS GI SS Material Works', progress: 30, client: 'IOC', expected: 'Q4 2025' },
    { id: 'OP005', name: 'IT Campus Fuel Management – Hyderabad', scope: 'DG Fuel Tank O&M and Annual Maintenance Contract', progress: 55, client: 'IT Co.', expected: 'Ongoing' },
  ];

  const tabs = [
    { key: 'vision',    label: 'Vision & Mission', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { key: 'completed', label: 'Completed',         icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { key: 'ongoing',   label: 'Ongoing',            icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ];

  // ── fixed: typed Variants so `variants={itemVariants}` no longer shows red ──
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 25 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 22, delay: i * 0.06 },
    }),
  };

  return (
    <>
      <style jsx global>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif;
        }
        .progress-shimmer {
          background: linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.22) 50%,rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .grid-bg {
          background-image:
            linear-gradient(rgba(59,130,246,.05) 1px,transparent 1px),
            linear-gradient(90deg,rgba(59,130,246,.05) 1px,transparent 1px);
          background-size: 48px 48px;
        }
        .tab-glow { box-shadow: 0 0 18px rgba(59,130,246,.45), inset 0 1px 0 rgba(255,255,255,.12); }
        .row-hover:hover { background: rgba(59,130,246,.07) !important; }
        .row-hover { transition: background .2s ease; }
      `}</style>

      <motion.section
        ref={sectionRef}
        id="projects"
        className="relative py-12 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgYSpring }}>
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 15% 40%,rgba(59,130,246,.14) 0%,transparent 55%), radial-gradient(circle at 85% 70%,rgba(16,185,129,.1) 0%,transparent 55%)'
          }}/>
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── HEADER ── */}
          <motion.div
            className="text-center mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center space-x-1.5 bg-blue-500/15 backdrop-blur-md text-blue-300 px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-500/30 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Our Track Record</span>
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold leading-tight">
              <span className="block text-white">Vision, Mission</span>
              <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                &amp; Projects
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="mt-2 text-gray-400 max-w-xl mx-auto text-xs leading-relaxed">
              Two decades of delivering excellence across petro logistics, calibration, and industrial services pan India.
            </motion.p>

            {/* Stats Row — smaller */}
            <motion.div className="flex justify-center gap-4 mt-5" variants={containerVariants}>
              {[
                { value: '20+', label: 'Years Experience' },
                { value: '10+', label: 'Projects Delivered' },
                { value: 'PAN', label: 'India Coverage' },
                { value: '100%', label: 'HSSE Compliant' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.06, y: -3, transition: { type: 'spring', stiffness: 300 } }}
                  className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 cursor-default"
                >
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── TABS ── */}
          <motion.div
            className="flex justify-center mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 100 }}
          >
            <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-xl border border-white/10 gap-1">
              {tabs.map((tab) => (
                <motion.button
                  suppressHydrationWarning
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`relative flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    activeTab === tab.key ? 'text-white tab-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <svg className="w-3.5 h-3.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── TAB CONTENT ── */}
          <AnimatePresence mode="wait">

            {/* VISION & MISSION */}
            {activeTab === 'vision' && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="grid lg:grid-cols-2 gap-5">
                  {/* Vision */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
                    whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
                    className="relative bg-gradient-to-br from-blue-600/80 to-blue-800/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 overflow-hidden"
                    style={{ boxShadow: '0 16px 48px rgba(59,130,246,.18)' }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl"
                      style={{ background: 'radial-gradient(circle,#60a5fa,transparent)', transform: 'translate(30%,-30%)' }}/>
                    <motion.div
                      className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 border border-white/20"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </motion.div>
                    <span className="text-[10px] font-bold tracking-widest text-blue-200 uppercase mb-1 block">Our Vision</span>
                    <h3 className="text-lg font-bold text-white mb-3">The Future We Build</h3>
                    <p className="text-blue-100 leading-relaxed text-xs mb-2">
                      To be the most trusted and preferred petro logistics solutions partner in India, recognized for our uncompromising commitment to safety, quality, and innovation.
                    </p>
                    <p className="text-blue-200/80 leading-relaxed text-xs">
                      We envision every petroleum infrastructure across India maintained, calibrated, and operated to the highest global standards — contributing to a safer, more efficient energy ecosystem.
                    </p>
                  </motion.div>

                  {/* Mission */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 100 }}
                    whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
                    className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden"
                    style={{ boxShadow: '0 16px 48px rgba(0,0,0,.18)' }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl"
                      style={{ background: 'radial-gradient(circle,#10b981,transparent)', transform: 'translate(30%,-30%)' }}/>
                    <motion.div
                      className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </motion.div>
                    <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase mb-1 block">Our Mission</span>
                    <h3 className="text-lg font-bold text-white mb-4">How We Operate</h3>
                    <ul className="space-y-2.5">
                      {[
                        'Deliver end-to-end petro logistics with zero compromise on HSSE standards',
                        'Provide single-window service from tender documentation to project handover',
                        'Build long-term partnerships with PSUs, OMCs, and IT companies through reliability',
                        'Continuously train and equip our workforce with the latest safety certifications',
                        'Expand our PAN India footprint while maintaining highest quality benchmarks',
                      ].map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + i * 0.06, type: 'spring' }}
                          className="flex items-start space-x-2.5 group"
                        >
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-emerald-500/40 transition-colors">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"/>
                          </div>
                          <span className="text-xs text-gray-300 leading-relaxed">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* COMPLETED PROJECTS */}
            {activeTab === 'completed' && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-white">Completed Projects</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{completedProjects.length} projects successfully delivered</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: 'spring' }}
                    className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-xs font-semibold"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>100% Completion Rate</span>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, type: 'spring' }}
                  className="overflow-hidden rounded-xl border border-white/10"
                  style={{ boxShadow: '0 16px 48px rgba(0,0,0,.28)' }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ background: 'linear-gradient(135deg,rgba(30,58,138,.9),rgba(15,23,42,.9))' }}>
                          <th className="text-left px-4 py-3 font-bold text-[10px] uppercase tracking-wider text-blue-300">ID</th>
                          <th className="text-left px-4 py-3 font-bold text-[10px] uppercase tracking-wider text-blue-300">Project Name</th>
                          <th className="text-left px-4 py-3 font-bold text-[10px] uppercase tracking-wider text-blue-300 hidden md:table-cell">Scope</th>
                          <th className="text-left px-4 py-3 font-bold text-[10px] uppercase tracking-wider text-blue-300">Client</th>
                          <th className="text-left px-4 py-3 font-bold text-[10px] uppercase tracking-wider text-blue-300">Year</th>
                          <th className="text-left px-4 py-3 font-bold text-[10px] uppercase tracking-wider text-blue-300">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedProjects.map((project, i) => (
                          <motion.tr
                            key={project.id}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 * i, type: 'spring' }}
                            className="row-hover border-b border-white/5 cursor-default"
                            style={{ background: i % 2 === 0 ? 'rgba(255,255,255,.02)' : 'rgba(255,255,255,.04)' }}
                          >
                            <td className="px-4 py-3">
                              <span className="font-mono text-[10px] text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                                {project.id}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-white text-xs">{project.name}</td>
                            <td className="px-4 py-3 text-gray-400 text-[10px] hidden md:table-cell max-w-[200px]">{project.scope}</td>
                            <td className="px-4 py-3">
                              <span className="bg-blue-500/15 text-blue-300 border border-blue-500/25 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                {project.client}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300 font-semibold">{project.year}</td>
                            <td className="px-4 py-3">
                              <span className="flex items-center space-x-1 text-emerald-400">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                                <span className="text-[10px] font-bold">Done</span>
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ONGOING PROJECTS */}
            {activeTab === 'ongoing' && (
              <motion.div
                key="ongoing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-white">Ongoing Projects</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{ongoingProjects.length} active projects in progress</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: 'spring' }}
                    className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-lg text-xs font-semibold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
                    <span>Active Operations</span>
                  </motion.div>
                </div>

                <div className="space-y-3">
                  {ongoingProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{
                        y: -4,
                        boxShadow: '0 20px 40px rgba(59,130,246,.18)',
                        borderColor: 'rgba(59,130,246,.4)',
                        transition: { type: 'spring', stiffness: 300 }
                      }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 cursor-default"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1.5">
                            <span className="font-mono text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                              {project.id}
                            </span>
                            <span className="bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full text-[10px] font-bold">
                              ⚡ In Progress
                            </span>
                          </div>
                          <h4 className="font-bold text-white text-sm">{project.name}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">{project.scope}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[10px] text-gray-500 mb-1">Client</div>
                          <span className="bg-blue-500/15 text-blue-300 border border-blue-500/25 px-2.5 py-1 rounded-full text-xs font-bold">
                            {project.client}
                          </span>
                          <div className="text-[10px] text-gray-500 mt-1.5">
                            Expected: <span className="text-gray-300 font-semibold">{project.expected}</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                          <span className="font-medium">Progress</span>
                          <motion.span
                            className="font-bold text-blue-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                          >
                            {project.progress}%
                          </motion.span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                          <motion.div
                            className="h-full rounded-full relative overflow-hidden"
                            style={{ background: 'linear-gradient(90deg,#3b82f6,#60a5fa)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.25 + i * 0.08 }}
                          >
                            <div className="absolute inset-0 progress-shimmer"/>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-5 bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 flex items-start space-x-2.5"
                >
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p className="text-xs text-amber-300/80">
                    <span className="font-bold text-amber-300">Note:</span> Project details shown are indicative. Contact us for detailed project status reports and confidential scope information.
                  </p>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.section>
    </>
  );
}