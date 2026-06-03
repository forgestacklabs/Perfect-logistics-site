"use client";

import { useState, useEffect, useRef } from 'react';

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('company');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const elementToKey = new Map<Element, string>();
    const elementsToObserve: Element[] = [];

    Object.keys(sectionRefs.current).forEach((key) => {
      const element = sectionRefs.current[key];
      if (element) {
        elementToKey.set(element, key);
        elementsToObserve.push(element);
      }
    });

    if (elementsToObserve.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = elementToKey.get(entry.target);
            if (key) {
              setVisibleSections((prev) => new Set(prev).add(key));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    elementsToObserve.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  const subsidiaries = [
    {
      name: "Perfect Trading Co",
      focus: "Trade Coal, Iron Ore & Minerals",
      icon: "🏭",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Petro Tech Engineers",
      focus: "Civil Excavation/Pipeline Works",
      icon: "🔧",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Sriram Safety",
      focus: "Calibration and Industry Inspection Activity",
      icon: "✓",
      color: "from-green-500 to-green-600"
    },
    {
      name: "MyTech Instruments",
      focus: "Hydro/Electro Magnetic Flow Meters & Calibration",
      icon: "📊",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Perfect Envirotech",
      focus: "Calibration Certificates & Testing Equipment Certification",
      icon: "🌿",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const whyUsPoints = [
    {
      title: "Experienced Leadership",
      description: "Promoted and run by highly qualified & experienced team of personnel",
      icon: "👔"
    },
    {
      title: "Single Window Solutions",
      description: "End-to-end services from tender documentation to project completion",
      icon: "🪟"
    },
    {
      title: "Professional Organization",
      description: "Professionally organized company with devoted individualized services",
      icon: "🏢"
    },
    {
      title: "PAN India Coverage",
      description: "Capable to handle HSD UG tanks installation anywhere in India",
      icon: "🗺️"
    },
    {
      title: "Fully Equipped",
      description: "Professional team with all safety equipment's and valid certifications",
      icon: "⚙️"
    },
    {
      title: "OMC Services",
      description: "Undertake many O&M services for OMC's and IT companies",
      icon: "🛢️"
    }
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Trebuchet+MS&display=swap');

        * {
          font-family: -apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto, Ubuntu, sans-serif;
        }

        /* Scroll Animations */
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }

        .scroll-fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-fade-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-fade-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .scroll-fade-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-fade-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .scroll-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-scale.visible {
          opacity: 1;
          transform: scale(1);
        }

        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Smooth tab transitions */
        .tab-content-enter {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>

      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div 
            ref={(el) => { sectionRefs.current['header'] = el; }}
            className={`text-center mb-12 scroll-fade-up ${visibleSections.has('header') ? 'visible' : ''}`}
          >
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1.5 rounded-md text-sm font-medium mb-3">
              ABOUT US
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Who We Are
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leading Petro Logistics Solution Provider with over two decades of excellence
            </p>
          </div>

          {/* Tab Navigation */}
          <div 
            ref={(el) => { sectionRefs.current['tabs'] = el; }}
            className={`flex justify-center mb-10 scroll-scale ${visibleSections.has('tabs') ? 'visible' : ''}`}
          >
            <div className="inline-flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
              <button
              suppressHydrationWarning
                onClick={() => setActiveTab('company')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'company'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Company Profile
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setActiveTab('subsidiaries')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'subsidiaries'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Our Group
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setActiveTab('whyus')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'whyus'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Why Choose Us
              </button>
            </div>
          </div>

          {/* Company Profile Tab */}
          {activeTab === 'company' && (
            <div className="grid lg:grid-cols-2 gap-10 items-start tab-content-enter">
              <div 
                ref={(el) => { sectionRefs.current['company-left'] = el; }}
                className={`space-y-6 scroll-fade-left ${visibleSections.has('company-left') ? 'visible' : ''}`}
              >
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Perfect Logistics
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    <span className="font-semibold text-gray-900">PERFECT LOGISTICS</span> is a Business Office headed exclusively as 
                    <span className="font-medium"> Petro logistic solution provider</span>. We handle all HSD, MS, OIL Tanks 
                    both UG and AG Tank cleaning with adequate equipment with Higher HSSE standard which has received great 
                    appreciation from our clients.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Apart from tank cleaning, we handle Tank related <span className="font-medium">MECHANICAL AND ELECTRICAL works</span> on 
                    high volume and big ventures across the country. We provide specialized services like calibration of overhead 
                    Gantry Cranes, Oil & Gas industries evacuation of underground storage tanks, O&M for petrol stations, and 
                    maintaining petroleum gantry locations.
                  </p>
                </div>

                {/* Founder Info */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-semibold transform hover:scale-110 transition-transform duration-300">
                      SC
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        Ln. SENTHIL.K
                      </h4>
                      <p className="text-xs text-gray-600">Founder & Managing Director</p>
                      <p className="text-xs text-blue-600 mt-0.5">20+ Years of Industry Experience</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs italic">
                    "An intellect with over two decades of experience in petro logistics and industrial solutions"
                  </p>
                </div>
              </div>

              {/* Right Side - Key Highlights */}
              <div 
                ref={(el) => { sectionRefs.current['company-right'] = el; }}
                className={`space-y-6 scroll-fade-right ${visibleSections.has('company-right') ? 'visible' : ''}`}
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-lg font-semibold mb-4">Our Specializations</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-sm">Tank Cleaning (HSD, MS, OIL - UG & AG)</p>
                    </div>
                    <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-sm">Calibration of Overhead Gantry Cranes</p>
                    </div>
                    <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-sm">Oil & Gas Industries Underground Storage Tank Evacuation</p>
                    </div>
                    <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-sm">O&M for Petrol Stations</p>
                    </div>
                    <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-sm">Pipeline Installation (Hydrant, HSD, Gas - MS, GI, SS)</p>
                    </div>
                    <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-sm">Independent PESO Related Services with Certification</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-lg shadow-sm text-center border-t-2 border-green-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="text-2xl font-bold text-green-600 mb-1">PESO</div>
                    <div className="text-xs text-gray-600">Certified Services</div>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm text-center border-t-2 border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="text-2xl font-bold text-blue-600 mb-1">HSSE</div>
                    <div className="text-xs text-gray-600">Higher Standards</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subsidiaries Tab */}
          {activeTab === 'subsidiaries' && (
            <div className="tab-content-enter">
              <div 
                ref={(el) => { sectionRefs.current['sub-header'] = el; }}
                className={`text-center mb-10 scroll-fade-up ${visibleSections.has('sub-header') ? 'visible' : ''}`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Our Group Companies
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto text-sm">
                  Perfect Logistics is an agglomeration of varied Companies and service activities under one roof, 
                  providing comprehensive industrial solutions.
                </p>
              </div>

              <div 
                ref={(el) => { sectionRefs.current['sub-grid'] = el; }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {subsidiaries.map((subsidiary, index) => (
                  <div 
                    key={index}
                    className={`group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 scroll-fade-up stagger-${index + 1} ${visibleSections.has('sub-grid') ? 'visible' : ''}`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${subsidiary.color} rounded-lg flex items-center justify-center text-2xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      {subsidiary.icon}
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1.5">
                      {subsidiary.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {subsidiary.focus}
                    </p>
                  </div>
                ))}
              </div>

              {/* Integration Message */}
              <div 
                ref={(el) => { sectionRefs.current['sub-footer'] = el; }}
                className={`mt-10 bg-white p-6 rounded-lg border border-blue-200 scroll-scale ${visibleSections.has('sub-footer') ? 'visible' : ''}`}
              >
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Single Window Solution
                  </h4>
                  <p className="text-gray-700 max-w-3xl mx-auto text-sm">
                    All our group companies work in synergy to provide you with comprehensive, end-to-end solutions 
                    for all your industrial and logistics needs. From trading to installation, from calibration to 
                    certification - we have it all covered under one roof.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Why Us Tab */}
          {activeTab === 'whyus' && (
            <div className="tab-content-enter">
              <div 
                ref={(el) => { sectionRefs.current['why-header'] = el; }}
                className={`text-center mb-10 scroll-fade-up ${visibleSections.has('why-header') ? 'visible' : ''}`}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Why Choose Perfect Logistics?
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto text-sm">
                  You will get <span className="font-semibold text-gray-900">BEST OF SERVICES in a SINGLE WINDOW</span>. 
                  We take up assignments end to end with competitive and reasonable rates.
                </p>
              </div>

              <div 
                ref={(el) => { sectionRefs.current['why-grid'] = el; }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
              >
                {whyUsPoints.map((point, index) => (
                  <div 
                    key={index}
                    className={`bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-2 border-blue-500 hover:-translate-y-1 scroll-fade-up stagger-${index + 1} ${visibleSections.has('why-grid') ? 'visible' : ''}`}
                  >
                    <div className="text-3xl mb-3 transform hover:scale-125 transition-transform duration-300 inline-block">
                      {point.icon}
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1.5">
                      {point.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Additional Advantages */}
              <div 
                ref={(el) => { sectionRefs.current['why-footer'] = el; }}
                className={`bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 scroll-scale ${visibleSections.has('why-footer') ? 'visible' : ''}`}
              >
                <h4 className="text-xl font-semibold mb-5 text-center">
                  Our Competitive Advantages
                </h4>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex items-start space-x-2.5 hover:translate-x-2 transition-transform duration-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium mb-0.5 text-sm">Complete Documentation Support</p>
                      <p className="text-sm text-blue-100">From tender documentation to order creation and final completion</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 hover:translate-x-2 transition-transform duration-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium mb-0.5 text-sm">Fully Equipped Operations</p>
                      <p className="text-sm text-blue-100">Professional team with valid safety equipment and certifications</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 hover:translate-x-2 transition-transform duration-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium mb-0.5 text-sm">Nationwide Presence</p>
                      <p className="text-sm text-blue-100">Capable to handle projects anywhere in India with local support</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 hover:translate-x-2 transition-transform duration-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium mb-0.5 text-sm">Competitive Pricing</p>
                      <p className="text-sm text-blue-100">Very competitive and reasonable rates with no compromise on quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}