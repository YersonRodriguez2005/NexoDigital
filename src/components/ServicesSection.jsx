import React, { useState, useRef, useEffect } from 'react';

// ─── Icon SVGs (inline, sin dependencia de lucide) ──────────────────────────
const IconPlatform = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2.5" stroke={active ? '#2563EB' : '#475569'} strokeWidth="1.75"/>
    <path d="M8 21H16M12 17V21" stroke={active ? '#2563EB' : '#475569'} strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M6 8H10M6 11H14" stroke={active ? '#60a5fa' : '#64748b'} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconDatabase = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="6" rx="8" ry="3" stroke={active ? '#2563EB' : '#475569'} strokeWidth="1.75"/>
    <path d="M4 6V12C4 13.657 7.582 15 12 15C16.418 15 20 13.657 20 12V6" stroke={active ? '#2563EB' : '#475569'} strokeWidth="1.75"/>
    <path d="M4 12V18C4 19.657 7.582 21 12 21C16.418 21 20 19.657 20 18V12" stroke={active ? '#60a5fa' : '#64748b'} strokeWidth="1.75"/>
  </svg>
);

const IconAPI = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="7" height="7" rx="1.75" stroke={active ? '#2563EB' : '#475569'} strokeWidth="1.75"/>
    <rect x="15" y="3" width="7" height="7" rx="1.75" stroke={active ? '#2563EB' : '#475569'} strokeWidth="1.75"/>
    <rect x="15" y="14" width="7" height="7" rx="1.75" stroke={active ? '#60a5fa' : '#64748b'} strokeWidth="1.75"/>
    <path d="M9 10.5H12M12 10.5V6.5M12 10.5V17.5" stroke={active ? '#93c5fd' : '#64748b'} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Mini tech badge ─────────────────────────────────────────────────────────
const TechBadge = ({ label, color }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '3px 9px',
    borderRadius: '100px',
    background: `${color}14`,
    border: `1px solid ${color}30`,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    color: color,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  }}>
    {label}
  </span>
);

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    icon: (active) => <IconPlatform active={active} />,
    number: '01',
    title: 'Plataformas Web a la Medida',
    description:
      'Desarrollamos interfaces modernas y ultrarrápidas. Tu equipo tendrá un sistema de gestión intuitivo, accesible desde cualquier dispositivo y construido exactamente para tus flujos de trabajo.',
    tech: [
      { label: 'React', color: '#60a5fa' },
      { label: 'TypeScript', color: '#818cf8' },
      { label: 'Vite', color: '#f59e0b' },
    ],
    metric: { value: '< 2s', label: 'Tiempo de carga' },
    accentColor: '#2563EB',
  },
  {
    id: 2,
    icon: (active) => <IconDatabase active={active} />,
    number: '02',
    title: 'Arquitectura de Datos Segura',
    description:
      'Estructuramos y centralizamos la información de tu empresa con bases de datos relacionales robustas. Cero pérdida de datos, backups automatizados y máxima integridad desde el primer día.',
    tech: [
      { label: 'PostgreSQL', color: '#60a5fa' },
      { label: 'Prisma', color: '#a78bfa' },
      { label: 'Redis', color: '#f87171' },
    ],
    metric: { value: '99.9%', label: 'Uptime garantizado' },
    accentColor: '#2563EB',
  },
  {
    id: 3,
    icon: (active) => <IconAPI active={active} />,
    number: '03',
    title: 'Sistemas Embebidos y APIs',
    description:
      'Conectamos todas las áreas de tu negocio. Construimos el cerebro de tu operación para automatizar facturación, control de roles, inventarios y reportes en tiempo real sin intervención manual.',
    tech: [
      { label: 'Node.js', color: '#34d399' },
      { label: 'Express', color: '#94a3b8' },
      { label: 'REST/WS', color: '#f59e0b' },
    ],
    metric: { value: '5× más', label: 'Velocidad operativa' },
    accentColor: '#2563EB',
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

        @keyframes svsFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes svsFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes svsLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        @keyframes svsCounterDash {
          from { stroke-dashoffset: 88; }
          to   { stroke-dashoffset: 0; }
        }

        .svs-section {
          position: relative;
          background: #F1F5F9;
          padding: 120px 2rem;
          overflow: hidden;
        }

        /* Subtle background pattern */
        .svs-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }

        /* Top gradient transition from dark section */
        .svs-section::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #2563EB, transparent);
          opacity: 0.2;
          pointer-events: none;
        }

        .svs-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .svs-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 80px;
        }

        .svs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          animation: ${inView ? 'svsFadeUp 0.6s 0ms both' : 'none'};
        }

        .svs-eyebrow-line {
          width: 32px;
          height: 2px;
          background: #2563EB;
          border-radius: 2px;
          transform-origin: left;
          animation: ${inView ? 'svsLineGrow 0.5s 0.1s both' : 'none'};
        }

        .svs-eyebrow-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #2563EB;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .svs-h2 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(1.875rem, 3.5vw, 2.75rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #0F172A;
          margin: 0 0 16px;
          animation: ${inView ? 'svsFadeUp 0.6s 100ms both' : 'none'};
        }

        .svs-h2 .accent {
          color: #2563EB;
          position: relative;
        }

        .svs-h2 .accent::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          bottom: 2px;
          height: 3px;
          background: linear-gradient(90deg, #2563EB, #818cf8);
          border-radius: 2px;
          opacity: 0.3;
        }

        .svs-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: #64748b;
          margin: 0;
          animation: ${inView ? 'svsFadeUp 0.6s 200ms both' : 'none'};
        }

        /* ── Grid ── */
        .svs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* ── Card ── */
        .svs-card {
          position: relative;
          background: #ffffff;
          border-radius: 20px;
          padding: 2.25rem 2rem;
          border: 1px solid #e2e8f0;
          cursor: default;
          overflow: hidden;
          transition:
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.35s ease;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .svs-card.visible {
          animation: svsFadeUp 0.6s both;
        }

        .svs-card:hover {
          transform: translateY(-6px);
          box-shadow:
            0 0 0 1px rgba(37, 99, 235, 0.12),
            0 20px 56px rgba(37, 99, 235, 0.1),
            0 8px 24px rgba(0, 0, 0, 0.06);
          border-color: rgba(37, 99, 235, 0.2);
        }

        /* Hover gradient overlay */
        .svs-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0.03) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          border-radius: inherit;
        }

        .svs-card:hover::before {
          opacity: 1;
        }

        /* Top colored accent */
        .svs-card::after {
          content: '';
          position: absolute;
          top: 0; left: 24px; right: 24px;
          height: 3px;
          background: linear-gradient(90deg, #2563EB, #818cf8);
          border-radius: 0 0 4px 4px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .svs-card:hover::after {
          transform: scaleX(1);
        }

        /* ── Card number ── */
        .card-number {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6875rem;
          font-weight: 800;
          color: #cbd5e1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── Icon box ── */
        .icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
        }

        .svs-card:hover .icon-box {
          background: rgba(37, 99, 235, 0.06);
          border-color: rgba(37, 99, 235, 0.2);
          transform: rotate(-3deg) scale(1.05);
        }

        /* ── Title ── */
        .card-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.125rem;
          color: #0F172A;
          line-height: 1.25;
          letter-spacing: -0.025em;
          margin: 0;
          transition: color 0.2s;
        }

        .svs-card:hover .card-title {
          color: #1a3a7a;
        }

        /* ── Description ── */
        .card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.7;
          color: #64748b;
          margin: 0;
          flex: 1;
        }

        /* ── Tech badges row ── */
        .tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* ── Metric / KPI chip ── */
        .metric-chip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          margin-top: auto;
          transition: background 0.3s, border-color 0.3s;
        }

        .svs-card:hover .metric-chip {
          background: rgba(37, 99, 235, 0.04);
          border-color: rgba(37, 99, 235, 0.15);
        }

        .metric-chip-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .metric-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 0 rgba(16,185,129,0.4);
          animation: pulseDot 2.5s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }

        .metric-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.875rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.02em;
        }

        .metric-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: #94a3b8;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* ── Arrow link ── */
        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #2563EB;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.25s, transform 0.25s;
        }

        .svs-card:hover .card-link {
          opacity: 1;
          transform: translateX(0);
        }

        .card-link svg {
          transition: transform 0.2s;
        }

        .card-link:hover svg {
          transform: translateX(3px);
        }

        /* ── Bottom CTA strip ── */
        .svs-bottom {
          margin-top: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          animation: ${inView ? 'svsFadeUp 0.6s 600ms both' : 'none'};
        }

        .svs-divider {
          width: 48px;
          height: 1px;
          background: #cbd5e1;
        }

        .svs-cta-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          color: #64748b;
        }

        .svs-cta-text strong {
          color: #0F172A;
          font-weight: 700;
        }

        .svs-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.75rem 1.5rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: #2563EB;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(37,99,235,0.35);
          white-space: nowrap;
        }

        .svs-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.45);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .svs-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .svs-section { padding: 80px 1.5rem; }
          .svs-grid { grid-template-columns: 1fr; }
          .svs-bottom {
            flex-direction: column;
            text-align: center;
          }
          .svs-divider { display: none; }
        }
      `}</style>

      <section id="servicios" className="svs-section" ref={sectionRef}>
        <div className="svs-inner">

          {/* Header */}
          <div className="svs-header">
            <div className="svs-eyebrow">
              <div className="svs-eyebrow-line" />
              <span className="svs-eyebrow-text">Nuestros Servicios</span>
              <div className="svs-eyebrow-line" style={{ transformOrigin: 'right' }} />
            </div>

            <h2 className="svs-h2">
              Tecnología que{' '}
              <span className="accent">impulsa</span>
              {' '}tu empresa
            </h2>

            <p className="svs-subtitle">
              No adaptes tu negocio a un software genérico. Construimos herramientas
              exactas para los flujos de trabajo de tu empresa en el Huila.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="svs-grid">
            {SERVICES.map((service, index) => {
              const isHovered = hoveredId === service.id;
              return (
                <div
                  key={service.id}
                  className={`svs-card ${inView ? 'visible' : ''}`}
                  style={{ animationDelay: `${200 + index * 120}ms` }}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Number */}
                  <span className="card-number">{service.number}</span>

                  {/* Icon */}
                  <div className="icon-box">
                    {service.icon(isHovered)}
                  </div>

                  {/* Title */}
                  <h3 className="card-title">{service.title}</h3>

                  {/* Description */}
                  <p className="card-desc">{service.description}</p>

                  {/* Tech stack */}
                  <div className="tech-row">
                    {service.tech.map((t) => (
                      <TechBadge key={t.label} label={t.label} color={t.color} />
                    ))}
                  </div>

                  {/* KPI chip */}
                  <div className="metric-chip">
                    <div className="metric-chip-left">
                      <div className="metric-pulse" />
                      <span className="metric-value">{service.metric.value}</span>
                    </div>
                    <span className="metric-label">{service.metric.label}</span>
                  </div>

                  {/* Hover link */}
                  <a href="#soluciones" className="card-link">
                    Ver más detalles
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor"
                        strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA strip */}
          <div className="svs-bottom">
            <div className="svs-divider" />
            <p className="svs-cta-text">
              ¿No sabes qué solución necesitas?{' '}
              <strong>Te asesoramos gratis.</strong>
            </p>
            <a href="#soluciones" className="svs-cta-btn" style={{ textDecoration: 'none' }}>
              <span>Hablar con un experto</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <div className="svs-divider" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;