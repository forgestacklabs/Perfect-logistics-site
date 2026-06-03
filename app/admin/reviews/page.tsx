"use client";
import { useEffect, useState } from 'react';

const ADMIN_SECRET = 'perfectlogistics123';

interface Review {
  id: string;
  name: string;
  company: string;
  designation: string;
  rating: number;
  message: string;
  approved: boolean;
  created_at: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/reviews', {
      headers: { 'x-admin-secret': ADMIN_SECRET }
    })
      .then(r => r.json())
      .then(data => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setReviews([]);
        setLoading(false);
      });
  }, []);

  const approve = async (id: string) => {
    setActionLoading(id + '_approve');
    await fetch(`/api/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'x-admin-secret': ADMIN_SECRET }
    });
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
    setActionLoading(null);
  };

  const remove = async (id: string) => {
    setActionLoading(id + '_remove');
    await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': ADMIN_SECRET }
    });
    setReviews(prev => prev.filter(r => r.id !== id));
    setActionLoading(null);
  };

  const [pending, approved] = reviews.reduce<[Review[], Review[]]>(
    (acc, r) => {
      acc[r.approved ? 1 : 0].push(r);
      return acc;
    },
    [[], []]
  );
  const displayed = activeTab === 'pending' ? pending : approved;

  const StarRating = ({ rating }: { rating: number }) => (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} style={{ width: 13, height: 13, color: s <= rating ? '#fbbf24' : '#374151' }} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1117', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#4b5563', fontSize: 13 }}>
        <div style={{ width: 18, height: 18, border: '2px solid #1f2937', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        Loading reviews...
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); } 50% { box-shadow: 0 0 0 6px rgba(59,130,246,0); } }

        .dk * { box-sizing: border-box; margin: 0; padding: 0; }
        .dk {
          font-family: 'DM Sans', sans-serif;
          background: #0d1117;
          min-height: 100vh;
          padding: 110px 24px 60px;
        }
        .dk-inner { max-width: 860px; margin: 0 auto; }

        .dk-title { font-size: 22px; font-weight: 700; color: #f0f6fc; margin-bottom: 4px; letter-spacing: -0.3px; }
        .dk-sub { font-family: 'DM Mono', monospace; font-size: 10px; color: #30363d; letter-spacing: 1px; text-transform: uppercase; }

        .dk-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; }
        .dk-stat {
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 12px;
          padding: 18px 22px;
          transition: border-color 0.2s;
        }
        .dk-stat:hover { border-color: #30363d; }
        .dk-stat-label { font-family: 'DM Mono', monospace; font-size: 10px; color: #484f58; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 8px; }
        .dk-stat-num { font-size: 30px; font-weight: 700; line-height: 1; }

        .dk-tabs { display: inline-flex; background: #161b22; border: 1px solid #21262d; border-radius: 10px; padding: 4px; gap: 3px; margin-bottom: 16px; }
        .dk-tab {
          padding: 8px 20px; border-radius: 7px; font-size: 13px; font-weight: 500;
          cursor: pointer; border: none; background: transparent; color: #484f58;
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .dk-tab:hover { color: #8b949e; }
        .dk-tab.active { background: #21262d; color: #f0f6fc; }

        .dk-badge { font-family: 'DM Mono', monospace; font-size: 10px; padding: 2px 7px; border-radius: 20px; font-weight: 600; }
        .dk-badge-amber { background: #2d1f00; color: #d29922; border: 1px solid #3d2b00; }
        .dk-badge-green { background: #0d2116; color: #3fb950; border: 1px solid #1a3826; }

        .dk-card {
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 12px;
          padding: 22px;
          margin-bottom: 10px;
          transition: border-color 0.2s, transform 0.2s;
          animation: fadeUp 0.3s ease;
        }
        .dk-card:hover { border-color: #30363d; transform: translateY(-2px); }

        .dk-avatar {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          color: #93c5fd; font-size: 12px; font-weight: 700;
          font-family: 'DM Mono', monospace; flex-shrink: 0;
          border: 1px solid #1e40af44;
        }

        .dk-pill { font-family: 'DM Mono', monospace; font-size: 10px; padding: 3px 9px; border-radius: 6px; font-weight: 600; letter-spacing: 0.3px; }
        .dk-pill-pending { background: #2d1f00; color: #d29922; border: 1px solid #3d2b00; }
        .dk-pill-approved { background: #0d2116; color: #3fb950; border: 1px solid #1a3826; }

        .dk-message {
          font-size: 13px; color: #8b949e; line-height: 1.7; font-style: italic;
          background: #0d1117;
          border-left: 3px solid #21262d;
          padding: 12px 16px; border-radius: 0 8px 8px 0;
          margin: 14px 0;
        }

        .dk-divider { height: 1px; background: #21262d; margin: 4px 0 14px; }

        .dk-btn { padding: 7px 16px; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; font-family: 'DM Sans', sans-serif; display: inline-flex; align-items: center; gap: 6px; }
        .dk-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .dk-btn-approve { background: #0d2116; color: #3fb950; border: 1px solid #1a3826; }
        .dk-btn-approve:hover:not(:disabled) { background: #122b1e; border-color: #2ea043; }
        .dk-btn-reject { background: #2d0f0f; color: #f85149; border: 1px solid #3d1515; }
        .dk-btn-reject:hover:not(:disabled) { background: #3d1515; border-color: #f85149; }

        .dk-empty {
          text-align: center; padding: 64px 20px;
          background: #161b22; border-radius: 12px;
          border: 1px dashed #21262d;
        }
        .dk-empty-icon { font-size: 34px; margin-bottom: 12px; }
        .dk-empty-text { font-family: 'DM Mono', monospace; font-size: 11px; color: #30363d; letter-spacing: 0.8px; }

        .dk-dot { width: 7px; height: 7px; background: #3b82f6; border-radius: 50%; display: inline-block; margin-right: 8px; animation: pulse 2s infinite; }
      `}</style>

      <div className="dk">
        <div className="dk-inner">

          {/* Header */}
          <div style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}>
            <span className="dk-dot" />
            <div>
              <div className="dk-title">Reviews Dashboard</div>
              <div className="dk-sub">Manage client testimonials · {reviews.length} total submissions</div>
            </div>
          </div>

          {/* Stats */}
          <div className="dk-stats">
            <div className="dk-stat">
              <div className="dk-stat-label">Total Reviews</div>
              <div className="dk-stat-num" style={{ color: '#3b82f6' }}>{reviews.length}</div>
            </div>
            <div className="dk-stat">
              <div className="dk-stat-label">Pending Approval</div>
              <div className="dk-stat-num" style={{ color: '#d29922' }}>{pending.length}</div>
            </div>
            <div className="dk-stat">
              <div className="dk-stat-label">Published</div>
              <div className="dk-stat-num" style={{ color: '#3fb950' }}>{approved.length}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="dk-tabs">
            <button className={`dk-tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
              Pending <span className="dk-badge dk-badge-amber">{pending.length}</span>
            </button>
            <button className={`dk-tab ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>
              Approved <span className="dk-badge dk-badge-green">{approved.length}</span>
            </button>
          </div>

          {/* Cards */}
          <div>
            {displayed.length === 0 ? (
              <div className="dk-empty">
                <div className="dk-empty-icon">{activeTab === 'pending' ? '✅' : '📋'}</div>
                <div className="dk-empty-text">
                  {activeTab === 'pending' ? 'NO PENDING REVIEWS · ALL CLEAR' : 'NO APPROVED REVIEWS YET'}
                </div>
              </div>
            ) : (
              displayed.map(r => (
                <div key={r.id} className="dk-card" style={{ borderLeft: `3px solid ${r.approved ? '#238636' : '#9e6a03'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div className="dk-avatar">
                        {r.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#f0f6fc', fontSize: 14 }}>{r.name}</div>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#484f58', marginTop: 3 }}>
                          {r.designation} · <span style={{ color: '#58a6ff' }}>{r.company}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <span className={`dk-pill ${r.approved ? 'dk-pill-approved' : 'dk-pill-pending'}`}>
                        {r.approved ? 'PUBLISHED' : 'PENDING'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <StarRating rating={r.rating} />
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#484f58' }}>
                          {new Date(r.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="dk-message">"{r.message}"</div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    {!r.approved && (
                      <button className="dk-btn dk-btn-approve" onClick={() => approve(r.id)} disabled={actionLoading === r.id + '_approve'}>
                        {actionLoading === r.id + '_approve' ? '...' : '✓'} Approve
                      </button>
                    )}
                    <button className="dk-btn dk-btn-reject" onClick={() => remove(r.id)} disabled={actionLoading === r.id + '_remove'}>
                      {actionLoading === r.id + '_remove' ? '...' : '✕'} {r.approved ? 'Remove' : 'Reject'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}