
"use client";

import { useState, useEffect, useRef } from 'react';

interface Review {
  id: number;
  name: string;
  company: string;
  designation: string;
  rating: number;
  message: string;
  date: string;
  created_at: string;
  approved: boolean;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [form, setForm] = useState({ name: '', company: '', designation: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

useEffect(() => {
  fetch('/api/reviews')
    .then(res => res.json())
    .then(data => {
      setReviews(Array.isArray(data) ? data : []);
      setLoading(false);
    })
    .catch(() => {
      setReviews([]);
      setLoading(false);
    });
}, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    Object.keys(sectionRefs.current).forEach((key) => {
      const element = sectionRefs.current[key];
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) setVisibleSections((p) => new Set(p).add(key)); }),
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      );
      observer.observe(element);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [showForm]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.company.trim()) errs.company = 'Company is required';
    if (!form.designation.trim()) errs.designation = 'Designation is required';
    if (!form.message.trim() || form.message.length < 20) errs.message = 'Please write at least 20 characters';
    if (rating === 0) errs.rating = 'Please select a rating';
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, rating }),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: '', company: '', designation: '', message: '' });
      setRating(0);
      setErrors({});
    }
  };

  const averageRating = reviews.filter(r => r.approved).reduce((acc, r) => acc + r.rating, 0) / (reviews.filter(r => r.approved).length || 1);
  const approvedReviews = reviews.filter(r => r.approved);

  return (
    <>
      <style jsx>{`
        .scroll-fade-up {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .scroll-fade-up.visible { opacity: 1; transform: translateY(0); }
        .scroll-scale {
          opacity: 0; transform: scale(0.96);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .scroll-scale.visible { opacity: 1; transform: scale(1); }
        .stagger-1 { transition-delay: 0.05s; }
        .stagger-2 { transition-delay: 0.1s; }
        .stagger-3 { transition-delay: 0.15s; }
        .stagger-4 { transition-delay: 0.2s; }
        .form-enter { animation: formSlide 0.4s cubic-bezier(0.16,1,0.3,1); }
        @keyframes formSlide { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        .star-btn { transition: transform 0.15s ease; }
        .star-btn:hover { transform: scale(1.2); }
        .review-card { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .review-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }

        /* ✅ FIX: Ensure input text is always visible on mobile (iOS/Android) */
        .form-input,
        .form-textarea {
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
          opacity: 1 !important;
        }
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #9ca3af !important;
          -webkit-text-fill-color: #9ca3af !important;
          opacity: 1 !important;
        }
        .form-input.error,
        .form-textarea.error {
          border-color: #f87171;
          background-color: #fff1f2;
        }
      `}</style>

      <section id="reviews" className="py-20 bg-gray-50">
        {loading && (
          <div className="text-center py-10 text-gray-400 text-sm">Loading reviews...</div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div
            ref={(el) => { sectionRefs.current['header'] = el; }}
            className={`text-center mb-12 scroll-fade-up ${visibleSections.has('header') ? 'visible' : ''}`}
          >
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-md text-xs font-semibold tracking-widest uppercase mb-3">
              Client Testimonials
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">What Our Clients Say</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Real feedback from industry leaders who have experienced our commitment to quality and safety first-hand.
            </p>

            {/* Rating Summary */}
            <div className="inline-flex items-center space-x-4 mt-6 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
              <div className="flex items-center space-x-1">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className={`w-5 h-5 ${s <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">{approvedReviews.length} verified reviews</span>
            </div>
          </div>

          {/* Reviews Grid */}
          {!loading && approvedReviews.length === 0 && (
            <p className="text-center text-gray-400 text-sm mb-10">No reviews yet. Be the first to share your experience!</p>
          )}

          <div
            ref={(el) => { sectionRefs.current['grid'] = el; }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10"
          >
            {approvedReviews.map((review, i) => (
              <div
                key={review.id}
                className={`review-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm scroll-fade-up stagger-${Math.min(i + 1, 4)} ${visibleSections.has('grid') ? 'visible' : ''}`}
              >
                {/* Quote Icon */}
                <div className="flex items-start justify-between mb-4">
                  <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <div className="flex space-x-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{review.message}"</p>

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.designation} · <span className="text-blue-600 font-medium">{review.company}</span></p>
                  </div>
                  <div className="ml-auto text-xs text-gray-400">
                    {new Date(review.date || review.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review CTA */}
          <div
            ref={(el) => { sectionRefs.current['cta'] = el; }}
            className={`scroll-scale ${visibleSections.has('cta') ? 'visible' : ''}`}
          >
            {!showForm && !submitted && (
              <div className="text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-10 text-white">
                <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
                <p className="text-blue-200 text-sm mb-6 max-w-xl mx-auto">
                  Worked with Perfect Logistics? Your feedback helps us improve and helps others make informed decisions.
                </p>
                <button
                  suppressHydrationWarning
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Write a Review
                </button>
              </div>
            )}

            {/* Review Form */}
            {showForm && !submitted && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm form-enter">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>
                  <button suppressHydrationWarning onClick={() => { setShowForm(false); setErrors({}); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  {[
                    { key: 'name', label: 'Your Name', placeholder: 'e.g. Rajesh Kumar' },
                    { key: 'company', label: 'Company', placeholder: 'e.g. BPCL' },
                    { key: 'designation', label: 'Designation', placeholder: 'e.g. Depot Manager' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">{field.label}</label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => { setForm(p => ({ ...p, [field.key]: e.target.value })); setErrors(p => ({ ...p, [field.key]: '' })); }}
                        className={`form-input w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field.key] ? 'error' : 'border-gray-200 bg-gray-50'}`}
                      />
                      {errors[field.key] && <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>}
                    </div>
                  ))}
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Your Rating</label>
                  <div className="flex space-x-1">
                    {[1,2,3,4,5].map((s) => (
                      <button suppressHydrationWarning
                        key={s}
                        className="star-btn"
                        onMouseEnter={() => setHoveredRating(s)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => { setRating(s); setErrors(p => ({ ...p, rating: '' })); }}
                      >
                        <svg className={`w-8 h-8 transition-colors ${s <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-500 self-center">
                      {rating > 0 ? ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating] : 'Select rating'}
                    </span>
                  </div>
                  {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Your Review</label>
                  <textarea
                    rows={4}
                    placeholder="Share your experience working with Perfect Logistics..."
                    value={form.message}
                    onChange={(e) => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }}
                    className={`form-textarea w-full px-4 py-3 rounded-lg border text-sm resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? 'error' : 'border-gray-200 bg-gray-50'}`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.message ? <p className="text-red-500 text-xs">{errors.message}</p> : <span />}
                    <span className="text-xs text-gray-400">{form.message.length} chars</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400 max-w-xs">Reviews are verified by our team before being published. Usually within 24 hours.</p>
                  <div className="flex space-x-3">
                    <button suppressHydrationWarning onClick={() => { setShowForm(false); setErrors({}); }} className="px-5 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button suppressHydrationWarning onClick={handleSubmit} className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {submitted && (
              <div className="text-center bg-green-50 border border-green-200 rounded-2xl p-10 form-enter">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You for Your Review!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Your feedback has been submitted successfully. Our team will verify and publish it within 24 hours.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}