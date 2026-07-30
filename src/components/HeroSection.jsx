import React, { useEffect, useRef } from 'react';

// ─── Sub-components ────────────────────────────────────────────────────────────

const GlowOrb = ({ style }) => (
  <div style={{
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    ...style,
  }} />
);

// Animated counter hook
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const StatCard = ({ value, suffix, label, delay, animate }) => {
  const num = useCounter(parseInt(value), 1600, animate);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      animation: animate ? `fadeUp 0.6s ${delay}ms both` : 'none',
    }}>
      <div style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 800,
        fontSize: '1.75rem',
        color: '#fff',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {animate ? num : value}
        <span style={{ color: '#2563EB' }}>{suffix}</span>
      </div>
      <div style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '0.7rem',
        fontWeight: 600,
        color: '#64748b',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────

const HeroSection = () => {
  const [visible, setVisible] = React.useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: '5', suffix: '+', label: 'Proyectos entregados' },
    { value: '95', suffix: '%', label: 'Clientes satisfechos' },
    { value: '3', suffix: 'x', label: 'Más rápido que lo manual' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }

        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(37, 99, 235, 0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(400%); opacity: 0; }
        }

        .hero-section {
          position: relative;
          background: #070E1E;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 100px 2rem 80px;
        }

        /* Dot grid background */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(37, 99, 235, 0.18) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 8s linear infinite alternate;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }

        /* Subtle noise overlay */
        .hero-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
          pointer-events: none;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        /* BADGE */
        .authority-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px 6px 8px;
          border-radius: 100px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.25);
          animation: ${visible ? 'fadeUp 0.6s 0ms both, badgePulse 3s 1s infinite' : 'none'};
          cursor: default;
          width: fit-content;
        }

        .badge-dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.15);
          border: 1px solid rgba(37, 99, 235, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .badge-dot svg {
          width: 12px;
          height: 12px;
        }

        .badge-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #93b4fb;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* HEADING */
        .hero-h1 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(2.25rem, 4.5vw, 3.75rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin: 0;
          animation: ${visible ? 'fadeUp 0.7s 100ms both' : 'none'};
        }

        .hero-h1 .accent {
          background: linear-gradient(135deg, #60a5fa 0%, #2563EB 50%, #818cf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        /* BODY */
        .hero-body {
          font-family: 'Inter', sans-serif;
          font-size: 1.0625rem;
          line-height: 1.75;
          color: #6d82a0;
          margin: 0;
          animation: ${visible ? 'fadeUp 0.7s 200ms both' : 'none'};
        }

        .hero-body strong {
          color: #cbd5e1;
          font-weight: 600;
        }

        /* CTA BUTTONS */
        .cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          animation: ${visible ? 'fadeUp 0.7s 300ms both' : 'none'};
        }

        .btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.875rem 2rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: #2563EB;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow:
            0 4px 24px rgba(37, 99, 235, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 32px rgba(37, 99, 235, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .btn-primary:active { transform: translateY(0); }

        .btn-primary .arrow {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-primary:hover .arrow {
          transform: translateX(4px);
        }

        /* STATS ROW */
        .stats-row {
          display: flex;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          animation: ${visible ? 'fadeUp 0.7s 500ms both' : 'none'};
        }

        .stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.07);
          align-self: stretch;
        }

        /* RIGHT COLUMN – MOCKUP */
        .mockup-wrap {
          position: relative;
          animation: ${visible ? 'scaleIn 0.8s 200ms both' : 'none'};
        }

        .mockup-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(37, 99, 235, 0.2);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 24px 80px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(37, 99, 235, 0.12);
          animation: floatY 6s ease-in-out infinite;
          background: #0d1829;
        }

        /* Browser chrome top bar */
        .mockup-chrome {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: #0a1120;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .chrome-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .chrome-urlbar {
          flex: 1;
          margin: 0 12px;
          height: 20px;
          background: rgba(255,255,255,0.04);
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          padding: 0 8px;
          gap: 5px;
        }

        .chrome-url-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          color: #4a5568;
        }

        /* Scanline effect */
        .scanline {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
        }

        .scanline::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(180deg, transparent, rgba(37, 99, 235, 0.4), transparent);
          animation: scanline 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        /* Decorative corner brackets */
        .corner-bracket {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: #2563EB;
          border-style: solid;
          opacity: 0.5;
        }

        .corner-bracket.tl { top: -6px; left: -6px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .corner-bracket.tr { top: -6px; right: -6px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .corner-bracket.bl { bottom: -6px; left: -6px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .corner-bracket.br { bottom: -6px; right: -6px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        /* Floating metric cards */
        .metric-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(7, 14, 30, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(37, 99, 235, 0.2);
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          z-index: 10;
        }

        .metric-card.top-left {
          top: 18%;
          left: -16%;
          animation: floatY 5s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .metric-card.bottom-right {
          bottom: 12%;
          right: -14%;
          animation: floatY 7s ease-in-out infinite;
          animation-delay: 1.2s;
        }

        .metric-icon {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8125rem;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }

        .metric-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 2px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .mockup-wrap {
            max-width: 560px;
            margin: 0 auto;
            width: 100%;
          }

          .metric-card.top-left { left: -8px; top: -12px; }
          .metric-card.bottom-right { right: -8px; bottom: -12px; }

          .stats-row {
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .cta-group { flex-direction: column; }
          .btn-primary { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="hero-section" ref={sectionRef}>
        {/* Ambient glow orbs */}
        <GlowOrb style={{
          width: '600px', height: '600px',
          top: '-10%', left: '-15%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
        }} />
        <GlowOrb style={{
          width: '400px', height: '400px',
          bottom: '5%', right: '5%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }} />

        <div className="hero-inner">
          {/* ── LEFT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Authority Badge */}
            <div className="authority-badge">
              <div className="badge-dot">
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"
                    fill="#2563EB" />
                </svg>
              </div>
              <span className="badge-text">Agencia de Software · Neiva, Huila</span>
            </div>

            {/* H1 */}
            <h1 className="hero-h1">
              Automatizamos la <span className="accent">gestión</span> con software a tu medida
            </h1>

            {/* Body */}
            <p className="hero-body">
              Deja de perder tiempo en procesos manuales y hojas de cálculo. En{' '}
              <strong>Nexo Digital</strong> construimos plataformas, sistemas embebidos
              y herramientas de automatización que centralizan tu operación y aceleran
              tu crecimiento <strong>comercial y personal</strong>
            </p>

            {/* CTA Buttons */}
            <div className="cta-group">
              <a href="#productos" className="btn-primary" style={{ textDecoration: 'none' }}>
                <span>¡Compra tu software!</span>
                <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8H15M8 1L15 8L8 15" stroke="currentColor" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="stats-row">
              {stats.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="stat-divider" />}
                  <StatCard {...s} delay={600 + i * 100} animate={visible} />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: MOCKUP ── */}
          <div className="mockup-wrap">
            {/* Corner brackets */}
            <div className="corner-bracket tl" />
            <div className="corner-bracket tr" />
            <div className="corner-bracket bl" />
            <div className="corner-bracket br" />

            {/* Floating metric cards */}
            <div className="metric-card top-left">
              <div className="metric-icon" style={{ background: 'rgba(16,185,129,0.12)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 10L5 6L8 9L13 3" stroke="#10B981" strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="metric-value">↑ 340%</div>
                <div className="metric-label">Eficiencia operativa</div>
              </div>
            </div>

            <div className="metric-card bottom-right">
              <div className="metric-icon" style={{ background: 'rgba(37,99,235,0.12)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M7 4V7L9 9" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="metric-value">Tiempo real</div>
                <div className="metric-label">Datos sincronizados</div>
              </div>
            </div>

            {/* Mockup frame with browser chrome */}
            <div className="mockup-frame">
              {/* Browser chrome */}
              <div className="mockup-chrome">
                <div className="chrome-dot" style={{ background: '#ff5f57' }} />
                <div className="chrome-dot" style={{ background: '#febc2e' }} />
                <div className="chrome-dot" style={{ background: '#28c840' }} />
                <div className="chrome-urlbar">
                  <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                    <path d="M1 4H7M4 1L7 4L4 7" stroke="#4a5568" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <span className="chrome-url-text">app.nexodigital.co/dashboard</span>
                </div>
              </div>

              {/* Dashboard image placeholder (replace src with your actual image) */}
              <div style={{
                width: '100%',
                aspectRatio: '16/10',
                background: 'linear-gradient(135deg, #0d1829 0%, #0f2044 50%, #0d1829 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Placeholder grid lines */}
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Replace this div with your actual <img> tag */}
                <img
                  src="assets/Dashboard.png"
                  alt="Dashboard Nexo Digital"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />

                {/* Fallback placeholder text */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    border: '1px solid rgba(37,99,235,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(37,99,235,0.1)',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#2563EB" opacity="0.6" />
                      <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#2563EB" opacity="0.4" />
                      <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#2563EB" opacity="0.4" />
                      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#2563EB" opacity="0.3" />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.6875rem', color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    Dashboard Preview
                  </span>
                </div>
              </div>

              {/* Scanline effect */}
              <div className="scanline" />

              {/* Bottom glow reflection */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(37,99,235,0.06), transparent)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;