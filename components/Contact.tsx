"use client";

import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Web3Forms API endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'cee34db0-8355-42e7-a1e3-510c0979b508',
          
          // Form data
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || 'Not provided',
          service: formData.service,
          message: formData.message,
          
          // Professional Email Customization
          subject: `🔔 New Inquiry from ${formData.name} - ${formData.service}`,
          from_name: 'Perfect Logistics Website',
          replyto: formData.email,
          
          // Additional metadata for professional email
          'Submission Time': new Date().toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'short'
          }),
          'Submission Source': 'Website Contact Form',
          'Customer Email': formData.email,
          'Customer Phone': formData.phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Success - Show success message
        setSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    "Tank Cleaning Services",
    "Calibration & Inspection",
    "Pipeline Installation",
    "O&M Services",
    "Mechanical & Electrical Works",
    "Warehousing & Logistics",
    "RO Plant Installation",
    "Civil Excavation",
    "Other"
  ];

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      items: ["+91 99000 48837", "+91 94820 48837", "+91 824 240 9905"],
      color: "blue",
      bgColor: "bg-blue-500"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      items: ["info@perfectlogistics.org", "senthil@perfectlogistics.in"],
      color: "green",
      bgColor: "bg-green-500"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Visit Us",
      items: ["1st Floor, Vishnukripa", "NH 17, Opp. Syndicate Bank", "Kulai, Mangalore - 575 010"],
      color: "purple",
      bgColor: "bg-purple-500"
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

        .scroll-scale {
          opacity: 0;
          transform: scale(0.95);
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

        /* Compact Success Toast Animation */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .success-toast {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .success-toast.hiding {
          animation: slideOutRight 0.3s ease-in forwards;
        }

        /* Simple checkmark animation */
        @keyframes checkmark {
          0% {
            stroke-dashoffset: 50;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .checkmark-path {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: checkmark 0.3s ease-out 0.1s forwards;
        }

        /* Progress bar */
        @keyframes progressBar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .progress-bar {
          animation: progressBar 5s linear forwards;
        }
      `}</style>

      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Compact Success Toast - Top Right */}
          {submitted && (
            <div className="fixed top-6 right-6 z-50 success-toast max-w-sm">
              <div className="bg-white rounded-lg shadow-2xl border-l-4 border-green-500 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    {/* Success Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" />
                          <path
                            className="checkmark-path"
                            d="M8 12l3 3 5-5"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex-1 pt-0.5">
                      <h4 className="text-sm font-semibold text-gray-900">
                        Message Sent!
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        We'll respond within 24 hours
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setSubmitted(false)}
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-100">
                  <div className="h-full bg-green-500 progress-bar"></div>
                </div>
              </div>
            </div>
          )}

          {/* Section Header */}
          <div 
            ref={(el) => { sectionRefs.current['header'] = el; }}
            className={`text-center mb-12 scroll-fade-up ${visibleSections.has('header') ? 'visible' : ''}`}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-md shadow-sm mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-blue-800">
                GET IN TOUCH
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Ready to discuss your petro logistics needs? We're here to help with professional solutions.
            </p>
          </div>

          {/* Compact Contact Info Cards */}
          <div 
            ref={(el) => { sectionRefs.current['info-cards'] = el; }}
            className="grid md:grid-cols-3 gap-4 mb-10"
          >
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className={`group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 scroll-scale stagger-${index + 1} ${visibleSections.has('info-cards') ? 'visible' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <div className="space-y-1">
                      {item.items.map((detail, idx) => (
                        <p key={idx} className="text-xs text-gray-600 truncate">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Contact Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Contact Form - Takes 3 columns */}
            <div 
              ref={(el) => { sectionRefs.current['form'] = el; }}
              className={`lg:col-span-3 scroll-fade-up ${visibleSections.has('form') ? 'visible' : ''}`}
            >
              <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h3>

                {submitError && (
                  <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg shadow-sm">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-semibold">Error Submitting Form</p>
                        <p className="text-sm mt-1">{submitError}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        placeholder="+91 XXXXX XXXXX"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        suppressHydrationWarning
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        placeholder="Company name"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Required *
                    </label>
                    <select
                      suppressHydrationWarning
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      disabled={isSubmitting}
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none outline-none"
                      placeholder="Tell us about your requirements..."
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  <button
                    suppressHydrationWarning
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>SENDING MESSAGE...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    🔒 Your information is secure. We respond within 24 hours during business days.
                  </p>
                </form>
              </div>
            </div>

            {/* Info Sidebar - Takes 2 columns */}
            <div 
              ref={(el) => { sectionRefs.current['sidebar'] = el; }}
              className={`lg:col-span-2 space-y-5 scroll-fade-up ${visibleSections.has('sidebar') ? 'visible' : ''}`}
            >
              
              {/* Business Hours */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Business Hours</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm pb-2 border-b border-white/20">
                    <span>Mon - Fri</span>
                    <span className="font-bold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pb-2 border-b border-white/20">
                    <span>Saturday</span>
                    <span className="font-bold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Sunday</span>
                    <span className="font-bold">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs">
                      <span className="font-bold">24/7 Emergency Services</span> available for urgent requirements
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Head Office</span>
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>1st Floor, 'Vishnukripa'</p>
                  <p>NH 17, Opp. Syndicate Bank</p>
                  <p>Kulai, Mangalore - 575 010</p>
                  <p className="font-bold text-gray-900">Karnataka, India</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">Fax:</span> +91 824 245 0902
                  </p>
                </div>
              </div>

              {/* Quick Response Badge */}
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors duration-300">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">Quick Response</h4>
                    <p className="text-xs text-gray-700">
                      All inquiries answered within 24 hours. Call us directly for urgent assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Coverage Badge */}
              <div className="bg-white p-4 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Service Coverage</p>
                    <p className="text-xl font-bold text-blue-600">PAN India</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}