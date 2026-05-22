"use client";

import { useState, useEffect, useRef } from 'react';

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    Object.keys(sectionRefs.current).forEach((key) => {
      const element = sectionRefs.current[key];
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(key));
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(element);
      observers.push(observer);
    });
    return () => { observers.forEach((o) => o.disconnect()); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeService !== null ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeService]);

  const services = [
    {
      id: 1,
      title: "Tank Cleaning Services",
      subtitle: "HSD, MS & Oil Tanks (UG & AG)",
      image: "/services/tankcleaning.png",
      accentColor: "#3b82f6",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-700",
      description: "Comprehensive tank cleaning for underground and above ground tanks with higher HSSE standards.",
      features: ["HSD Tank Cleaning (Underground & Above Ground)", "MS Tank Cleaning & Maintenance", "Oil Tank Cleaning Services", "Adequate Safety Equipment", "PESO Compliance & Certification", "Emergency Response Team Available"]
    },
    {
      id: 2,
      title: "Calibration Services",
      subtitle: "PESO Certified Inspections",
      image: "/services/calibration.png",
      accentColor: "#6366f1",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: "from-indigo-500 to-indigo-700",
      description: "Independent competency services for all PESO related calibration with site inspection and certification.",
      features: ["Overhead Gantry Crane Calibration", "Flow Meter Calibration", "Hydro/Electro Magnetic Flow Meters", "Industry Inspection Activity", "Testing Equipment Certification", "Calibration Certificates Issuance"]
    },
    {
      id: 3,
      title: "Pipeline Installation",
      subtitle: "Complete Pipeline Solutions",
      image: "/services/pipeline.png",
      accentColor: "#06b6d4",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: "from-cyan-500 to-cyan-700",
      description: "All types of pipeline installation works with equipped welding team and supervision setup.",
      features: ["Hydrant Pipeline Installation", "HSD Pipeline Works", "Gas Pipeline on MS, GI & SS Material", "Equipped Welding Team", "Professional Supervision Setup", "Complete Documentation Support"]
    },
    {
      id: 4,
      title: "O&M Services",
      subtitle: "Operations & Maintenance",
      image: "/services/om.png",
      accentColor: "#a855f7",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: "from-purple-500 to-purple-700",
      description: "Comprehensive O&M services for petrol stations, gantry locations and distributing units.",
      features: ["Petrol Station O&M", "Gantry Location Maintenance", "Distributing Units Management", "Outlet Maintenance (Electrical, Mechanical, Civil)", "Dispenser Units Repair & Maintenance", "DUO Sumps Installation & Repair"]
    },
    {
      id: 5,
      title: "Mechanical & Electrical",
      subtitle: "High Volume Projects",
      image: "/services/mech.png",
      accentColor: "#f59e0b",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "from-amber-500 to-amber-700",
      description: "Tank related mechanical and electrical works on high volume ventures across the country.",
      features: ["UGT Sump Fittings", "Dispenser Unit Installation", "Canopy Works & Painting", "Electrical Systems Setup", "Mechanical Installations", "Complete Site Commissioning"]
    },
    {
      id: 6,
      title: "Warehousing & Logistics",
      subtitle: "Material Management",
      image: "/services/warehouse.png",
      accentColor: "#22c55e",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: "from-green-500 to-green-700",
      description: "Professional warehousing and material management services for large-scale industrial projects.",
      features: ["Warehouse Management", "Material Handling", "Inventory Management", "Supply Chain Coordination", "Project Site Support", "Documentation & Compliance"]
    },
    {
      id: 7,
      title: "RO Plant & STP",
      subtitle: "Water Treatment Solutions",
      image: "/services/water.png",
      accentColor: "#14b8a6",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      gradient: "from-teal-500 to-teal-700",
      description: "New plant installation from initial stage with all liaising, documentation and approval support.",
      features: ["RO Plant Installation", "STP Tank Cleaning", "Initial Stage Planning", "Liaison with Departments", "Complete Documentation", "Hand-over Support"]
    },
    {
      id: 8,
      title: "Civil Excavation",
      subtitle: "Site Preparation",
      image: "/services/civil.png",
      accentColor: "#94a3b8",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: "from-slate-500 to-slate-700",
      description: "Professional civil excavation and site preparation services through Petro Tech Engineers.",
      features: ["Site Excavation", "Ground Preparation", "Tank Farm Setup", "Foundation Works", "Underground Installation Support", "Site Restoration"]
    }
  ];

  const activeServiceData = services.find(s => s.id === activeService);

  return (
    <>
      <style jsx>{`
        .scroll-fade-up {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .scroll-fade-up.visible { opacity: 1; transform: translateY(0); }

        .scroll-scale {
          opacity: 0; transform: scale(0.93);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .scroll-scale.visible { opacity: 1; transform: scale(1); }

        .stagger-1 { transition-delay: 0.05s; }
        .stagger-2 { transition-delay: 0.10s; }
        .stagger-3 { transition-delay: 0.15s; }
        .stagger-4 { transition-delay: 0.20s; }
        .stagger-5 { transition-delay: 0.25s; }
        .stagger-6 { transition-delay: 0.30s; }
        .stagger-7 { transition-delay: 0.35s; }
        .stagger-8 { transition-delay: 0.40s; }

        @keyframes modalFadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes modalSlideUp {
          from { opacity:0; transform: translateY(30px) scale(0.95); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        .modal-overlay { animation: modalFadeIn 0.3s ease; }
        .modal-content { animation: modalSlideUp 0.4s cubic-bezier(0.16,1,0.3,1); }

        /* ── Card styles ── */
        .service-card {
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          border-radius: 14px;
        }
        .service-card:hover { transform: translateY(-10px); }

        .card-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
          border-radius: 14px 14px 0 0;
        }

        .card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .service-card:hover .card-img { transform: scale(1.07); }

        .card-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.15) 40%,
            rgba(0,0,0,0.72) 80%,
            rgba(0,0,0,0.88) 100%
          );
        }

        .card-img-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 16px;
          z-index: 2;
        }

        .card-icon-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          margin-bottom: 10px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
        }

        .card-title {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
          margin-bottom: 3px;
        }

        .card-subtitle {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.78);
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          letter-spacing: 0.02em;
        }

        .card-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          z-index: 3;
        }

        /* ── Modal styles ── */
        .modal-img-wrap {
          position: relative;
          height: 160px;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
          flex-shrink: 0;
        }
        .modal-img { width:100%; height:100%; object-fit:cover; }
        .modal-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.75) 100%);
        }
        .modal-img-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 16px 20px;
          z-index: 2;
        }

        .modal-body {
          overflow-y: auto;
          padding: 20px 24px 24px;
          flex: 1;
        }

        .modal-body::-webkit-scrollbar { width: 5px; }
        .modal-body::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .modal-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .modal-body::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div
            ref={(el) => { sectionRefs.current['header'] = el; }}
            className={`text-center mb-16 scroll-fade-up ${visibleSections.has('header') ? 'visible' : ''}`}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-md shadow-sm mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-800">OUR SERVICES</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Petro Logistics Solutions
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              From tank cleaning to pipeline installation, we provide end-to-end solutions for all your
              petro logistics and industrial needs with higher HSSE standards
            </p>
          </div>

          {/* Grid */}
          <div
            ref={(el) => { sectionRefs.current['grid'] = el; }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`service-card group bg-white shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 cursor-pointer scroll-scale stagger-${index + 1} ${visibleSections.has('grid') ? 'visible' : ''}`}
                onClick={() => setActiveService(service.id)}
              >
                <div className="card-img-wrap">
                  <div className="card-accent-bar" style={{ background: service.accentColor }} />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="card-img"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = 'none';
                      el.parentElement!.style.background = service.accentColor;
                    }}
                  />
                  <div className="card-img-gradient" />
                  <div className="card-img-content">
                    <div className="card-icon-badge">{service.icon}</div>
                    <div className="card-title">{service.title}</div>
                    <div className="card-subtitle">{service.subtitle}</div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                  <button suppressHydrationWarning className="text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: service.accentColor }}>
                    <span>View Details</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div
            ref={(el) => { sectionRefs.current['highlights'] = el; }}
            className={`grid md:grid-cols-3 gap-6 mb-12 scroll-fade-up ${visibleSections.has('highlights') ? 'visible' : ''}`}
          >
            {[
              { border: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-600', title: 'Higher HSSE Standards', desc: 'All services executed with highest Health, Safety, Security & Environment standards, earning appreciation from leading PSUs.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, fill: false },
              { border: 'border-green-500', bg: 'bg-green-100', text: 'text-green-600', title: 'PESO Certified', desc: 'Independent competency services for all PESO requirements with complete site inspection and certification support.', icon: <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />, fill: true },
              { border: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-600', title: 'PAN India Services', desc: 'Services across PAN INDIA with branches in major cities and overseas operations in Singapore.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />, fill: false },
            ].map((h) => (
              <div key={h.title} className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${h.border} hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${h.bg} rounded-lg flex items-center justify-center ${h.text} flex-shrink-0`}>
                    <svg className="w-6 h-6" fill={h.fill ? 'currentColor' : 'none'} stroke={h.fill ? 'none' : 'currentColor'} viewBox="0 0 24 24">{h.icon}</svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{h.title}</h4>
                    <p className="text-sm text-gray-600">{h.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expertise */}
          <div
            ref={(el) => { sectionRefs.current['expertise'] = el; }}
            className={`bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 lg:p-10 rounded-lg shadow-xl mb-12 scroll-scale ${visibleSections.has('expertise') ? 'visible' : ''}`}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Our Expertise & Capabilities</h3>
                <p className="text-blue-100 mb-6 leading-relaxed text-sm">
                  We have trained manpower for handling various types of industrial maintenance works. Our team is equipped with specified standard HSSE policy training and all required safety equipment for working with leading clients like BPCL, ALDS, and Shell.
                </p>
                <div className="space-y-3">
                  {["New Plant Installation from Initial Stage","Complete Liaising & Documentation Support","Department Approval Coordination","Hand-over & Commissioning Services"].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h4 className="text-xl font-bold mb-4">End-to-End Service Delivery</h4>
                <p className="text-sm text-blue-100 mb-5">We comprehend requirements of our customers with respect to:</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[{ emoji:"⏱️", label:"TIME", sub:"On Schedule" },{ emoji:"💰", label:"COST", sub:"Competitive" },{ emoji:"📋", label:"SCOPE", sub:"Comprehensive" }].map((item) => (
                    <div key={item.label} className="text-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
                      <div className="text-2xl font-bold mb-1">{item.emoji}</div>
                      <div className="text-xs text-blue-200 mb-1">{item.label}</div>
                      <div className="text-xs font-medium">{item.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="pt-5 border-t border-white/20">
                  <p className="text-xs text-blue-100 italic text-center">&quot;Ready to take up any kind of job, either on contract basis or on independent basis or in association with your company&quot;</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            ref={(el) => { sectionRefs.current['cta'] = el; }}
            className={`text-center bg-white p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-fade-up ${visibleSections.has('cta') ? 'visible' : ''}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm">We look forward to working with you on a long-term basis. Contact us for detailed discussions about your specific requirements.</p>
            <button
              suppressHydrationWarning
  onClick={() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }}
  className="px-8 py-4 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
>
  <span>REQUEST A QUOTE</span>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
</button>
          </div>

        </div>
      </section>

      {/* Modal */}
      {activeService !== null && activeServiceData && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay"
          onClick={() => setActiveService(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full flex flex-col modal-content"
            style={{ maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image header */}
            <div className="modal-img-wrap">
              <img
                src={activeServiceData.image}
                alt={activeServiceData.title}
                className="modal-img"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = 'none';
                  el.parentElement!.style.background = activeServiceData.accentColor;
                }}
              />
              <div className="modal-img-gradient" />

              {/* Close button */}
              <button
                suppressHydrationWarning
                onClick={() => setActiveService(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/30 hover:bg-black/55 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Title area */}
              <div className="modal-img-content">
                <div className="flex items-end space-x-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                    style={{ background: activeServiceData.accentColor }}
                  >
                    {activeServiceData.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg leading-tight">{activeServiceData.title}</h3>
                    <p className="text-xs text-white/80 mt-0.5">{activeServiceData.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="modal-body">
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{activeServiceData.description}</p>

              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Key Features & Services</h4>
              <div className="space-y-2">
                {activeServiceData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: activeServiceData.accentColor }}>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3.5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-blue-700">Note: </span>
                  All services are executed with Higher HSSE standards and complete PESO compliance where applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}