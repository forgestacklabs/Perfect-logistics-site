"use client";

export default function ClientTicker() {
  const clients = [
    { name: "Airtel",      logo: "/logos/airtel.jpeg" },
    { name: "Shell",       logo: "/logos/shell.jpeg" },
    { name: "Bharath",     logo: "/logos/bharath1.jpeg" },
    { name: "TCS",         logo: "/logos/tcs.jpeg" },
    { name: "HCL",         logo: "/logos/hcltech.jpeg" },
    { name: "Total",       logo: "/logos/total.jpeg" },
    { name: "Cisco",       logo: "/logos/cisco.jpeg" },
    { name: "L&T",         logo: "/logos/l&t.jpeg" },
    { name: "DLF",         logo: "/logos/dlf.jpeg" },
    { name: "Lanco",       logo: "/logos/lanco.jpeg" },
    { name: "Schenker",    logo: "/logos/schenker1.jpeg" },
    // { name: "ONGC",        logo: "/logos/ongc.jpeg" },
    // { name: "GAIL",        logo: "/logos/gail.jpeg" },
    { name: "Indian Oil",  logo: "/logos/indianoil.jpeg" },
    // { name: "Tatsuno",     logo: "/logos/tatsuno.jpeg" },
    { name: "CCC",         logo: "/logos/ccc.jpeg" },
    { name: "Fly Jac",     logo: "/logos/flyjac.jpeg" },
    { name: "Cognizant",   logo: "/logos/cog.jpeg" },
  ];

  // Triplicate so the loop is never visible
  const tripled = [...clients, ...clients, ...clients];

  return (
    <>
      <style jsx>{`
        /* Each logo card is 164px wide (140 + 24 padding each side) */
        /* 18 logos × 164px = 2952px for one set */
        /* We animate exactly -2952px (one full set) then reset — seamless */
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-164px * 18)); }
        }

        .ticker-section {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          position: relative;
          overflow: hidden;
        }

        .ticker-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px 0 8px;
        }

        .header-line {
          flex: 1;
          max-width: 180px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #cbd5e1);
        }
        .header-line.right {
          background: linear-gradient(90deg, #cbd5e1, transparent);
        }

        .header-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #94a3b8;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .ticker-body {
          position: relative;
          padding: 10px 0 14px;
        }

        .fade-left, .fade-right {
          position: absolute;
          top: 0; height: 100%;
          width: 160px;
          z-index: 5;
          pointer-events: none;
        }
        .fade-left  { left:  0; background: linear-gradient(90deg,  #f8fafc 20%, transparent); }
        .fade-right { right: 0; background: linear-gradient(270deg, #f8fafc 20%, transparent); }

        .ticker-track {
          display: flex;
          align-items: center;
          /* 
            Duration = (164px × 18 logos) / speed
            Using 45s gives a smooth, readable pace for all 18 logos
          */
          animation: ticker-scroll 45s linear infinite;
          will-change: transform;
          width: max-content;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        .ticker-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          width: 164px;
          justify-content: center;
          gap: 0;
        }

        .logo-card {
          width: 120px;
          height: 52px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 10px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .logo-card img {
          max-width: 100px;
          max-height: 36px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          filter: grayscale(15%) opacity(0.85);
          transition: filter 0.25s, transform 0.25s;
        }

        .ticker-track:hover .logo-card img {
          filter: grayscale(0%) opacity(1);
        }

        .sep {
          width: 1px;
          height: 28px;
          background: #e2e8f0;
          flex-shrink: 0;
          margin-left: 22px;
        }

        .badge-wrap {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: none;
        }
        @media (min-width: 768px) { .badge-wrap { display: block; } }

        .badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #1d4ed8;
          border-radius: 6px;
          padding: 7px 13px;
          box-shadow: 0 2px 12px rgba(29,78,216,0.25);
        }
        .badge-text {
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>

      <section className="ticker-section w-full">

        <div className="ticker-header">
          <div className="header-line" />
          <span className="header-label">Our Prestigious Partners</span>
          <div className="header-line right" />
        </div>

        <div className="ticker-body">
          <div className="fade-left" />
          <div className="fade-right" />

          <div className="badge-wrap">
            <div className="badge">
              <span style={{ color: '#fde68a', fontSize: '12px' }}>★</span>
              <span className="badge-text">Trusted By</span>
            </div>
          </div>

          <div className="ticker-track">
            {tripled.map((client, i) => (
              <div key={i} className="ticker-item">
                <div className="logo-card">
                  <img src={client.logo} alt={client.name} loading="lazy" />
                </div>
                <div className="sep" />
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}