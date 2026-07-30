import React, { useRef, useEffect, useState } from 'react';

// ─── Logo ─────────────────────────────────────────────────────────────────────
const NexoLogo = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="18,2 32,10 32,26 18,34 4,26 4,10"
      fill="#2563EB" opacity="0.12" stroke="#2563EB" strokeWidth="1.5"/>
    <polygon points="18,6 28,12 28,24 18,30 8,24 8,12"
      fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.4"/>
    <text x="18" y="23" textAnchor="middle"
      fontFamily="Montserrat, sans-serif" fontWeight="800"
      fontSize="14" fill="#2563EB">N</text>
  </svg>
);

// ─── Social Icons ─────────────────────────────────────────────────────────────
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.35 6.5-1.57 6.5-7.16 0-1.48-.5-2.7-1.3-3.6.1-.3.6-1.7-.1-3.6 0 0-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C7 1.7 6 2 6 2c-.7 1.9-.2 3.3-.1 3.6-.8.9-1.3 2.1-1.3 3.6 0 5.6 3.3 6.8 6.5 7.16-.6.3-1 .9-1.1 1.8-.9.4-3.1.5-4.5-1.3 0 0-.8-1.5-2.4-1.5 0 0-1.5-.2-.1 1.2 0 0 1.2 1.2 2.2 2.8 0 0 1.2 3.6 5.8 2.6v4"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 7L10 12L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '#servicios', label: 'Nuestros Servicios' },
  { href: '#portafolio', label: 'Casos de Éxito' },
  { href: '#productos', label: 'Comprar Software' },
];

const SOCIAL_LINKS = [
  {
    href: 'https://www.linkedin.com/in/yerson-rodriguez', // Agregué https:// por buena práctica
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
    color: '#0077b5',
    hoverBg: 'rgba(0,119,181,0.12)',
    hoverBorder: 'rgba(0,119,181,0.3)',
  },
  {
    href: 'https://github.com/YersonRodriguez2005',
    label: 'GitHub',
    icon: <GitHubIcon />,
    color: '#94a3b8',
    hoverBg: 'rgba(148,163,184,0.1)',
    hoverBorder: 'rgba(148,163,184,0.25)',
  },
  {
    href: 'https://wa.me/573216393715',
    label: 'WhatsApp',
    icon: <WhatsAppIcon />,
    color: '#25D366',
    hoverBg: 'rgba(37,211,102,0.1)',
    hoverBorder: 'rgba(37,211,102,0.3)',
  },
  {
    href: 'mailto:rodriguezyerson2005@gmail.com',
    label: 'Email',
    icon: <MailIcon />,
    color: '#60a5fa',
    hoverBg: 'rgba(96,165,250,0.1)',
    hoverBorder: 'rgba(96,165,250,0.25)',
  },
];

const TECH_TAGS = ['React', 'Node.js', 'PostgreSQL', 'Ionic', 'Vite', 'TailwindCSS'];

// ─── Social Button ────────────────────────────────────────────────────────────
const SocialBtn = ({ href, label, icon, color, hoverBg, hoverBorder }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '11px',
        background: hovered ? hoverBg : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? hoverBorder : 'rgba(255,255,255,0.07)'}`,
        color: hovered ? color : '#64748b',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {icon}
    </a>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [inView, setInView] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

        @keyframes ftFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes ftLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        @keyframes ftGlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }

        .ft-footer {
          position: relative;
          background: #070E1E;
          overflow: hidden;
        }

        /* Top gradient divider */
        .ft-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.5) 30%, rgba(129,140,248,0.4) 70%, transparent 100%);
        }

        /* Ambient glow */
        .ft-glow {
          position: absolute;
          width: 500px;
          height: 300px;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%);
          pointer-events: none;
          animation: ftGlow 5s ease-in-out infinite;
        }

        /* Dot grid */
        .ft-footer::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(37,99,235,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 70% 80% at 50% 0%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 0%, black 20%, transparent 100%);
          pointer-events: none;
        }

        .ft-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 2rem 0;
        }

        /* ── Grid ── */
        .ft-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr;
          gap: 4rem;
          padding-bottom: 56px;
        }

        /* ── Column 1: Brand ── */
        .ft-brand {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          animation: ${inView ? 'ftFadeUp 0.6s 100ms both' : 'none'};
        }

        .ft-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .ft-logo-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          color: #fff;
          letter-spacing: -0.03em;
        }

        .ft-logo-text span {
          color: #2563EB;
        }

        .ft-brand-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          line-height: 1.75;
          color: #475569;
          max-width: 300px;
        }

        /* Tech tags */
        .ft-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ft-tech-tag {
          display: inline-flex;
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.15);
          font-family: 'Montserrat', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          color: #475569;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Status */
        .ft-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 100px;
          width: fit-content;
        }

        .ft-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          animation: ftStatusPulse 2.5s infinite;
        }

        @keyframes ftStatusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }

        .ft-status-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #10B981;
          letter-spacing: 0.05em;
        }

        /* ── Column 2: Nav ── */
        .ft-nav-col {
          animation: ${inView ? 'ftFadeUp 0.6s 200ms both' : 'none'};
        }

        .ft-col-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ft-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
          transform-origin: left;
          animation: ${inView ? 'ftLineGrow 0.5s 0.3s both' : 'none'};
        }

        .ft-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ft-nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #475569;
          text-decoration: none;
          padding: 6px 0;
          border-left: 2px solid transparent;
          padding-left: 0;
          transition: color 0.2s, border-color 0.2s, padding-left 0.2s;
        }

        .ft-nav-link:hover {
          color: #fff;
          border-left-color: #2563EB;
          padding-left: 10px;
        }

        .ft-nav-link::before {
          content: '';
          display: none;
        }

        /* ── Column 3: Social ── */
        .ft-social-col {
          animation: ${inView ? 'ftFadeUp 0.6s 300ms both' : 'none'};
        }

        .ft-social-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .ft-location {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          color: #475569;
        }

        .ft-location svg {
          color: #475569;
          flex-shrink: 0;
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 1.5rem 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          animation: ${inView ? 'ftFadeUp 0.6s 400ms both' : 'none'};
        }

        .ft-copyright {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: #334155;
        }

        .ft-copyright strong {
          color: #475569;
        }

        .ft-credits {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: #334155;
        }

        .ft-credits-heart {
          color: #f87171;
          font-size: 0.875rem;
        }

        .ft-credits a {
          color: #2563EB;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .ft-credits a:hover {
          color: #60a5fa;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .ft-brand { grid-column: 1 / -1; }
        }

        @media (max-width: 580px) {
          .ft-grid { grid-template-columns: 1fr; }
          .ft-inner { padding: 56px 1.5rem 0; }
          .ft-bottom { flex-direction: column; align-items: center; text-align: center; }
        }
      `}</style>

      <footer className="ft-footer" ref={footerRef}>
        <div className="ft-glow" />

        <div className="ft-inner">

          {/* ── Grid ── */}
          <div className="ft-grid">

            {/* Col 1: Brand */}
            <div className="ft-brand">
              <a href="#" className="ft-logo">
                <NexoLogo />
                <span className="ft-logo-text">
                  Nexo<span>Digital</span>
                </span>
              </a>

              <p className="ft-brand-desc">
                Desarrollo de software a la medida, plataformas web apps moviles y sistemas
                de gestión para empresas y vida personal en Neiva y toda Colombia.
                Transformamos procesos en ventajas competitivas y de mejora personal.
              </p>

              <div className="ft-tech-tags">
                {TECH_TAGS.map((tag) => (
                  <span key={tag} className="ft-tech-tag">{tag}</span>
                ))}
              </div>

              <div className="ft-status">
                <div className="ft-status-dot" />
                <span className="ft-status-text">Disponible para nuevos proyectos</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="ft-nav-col">
              <h4 className="ft-col-title">Navegación</h4>
              <ul className="ft-nav-list">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="ft-nav-link">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Social + Contact */}
            <div className="ft-social-col">
              <h4 className="ft-col-title">Conecta</h4>

              <div className="ft-social-row">
                {SOCIAL_LINKS.map((s) => (
                  <SocialBtn key={s.label} {...s} />
                ))}
              </div>

              <div className="ft-location">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C4.79 1 3 2.79 3 5C3 8 7 13 7 13C7 13 11 8 11 5C11 2.79 9.21 1 7 1Z"
                    stroke="currentColor" strokeWidth="1.25"/>
                  <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.25"/>
                </svg>
                <span>Neiva, Huila, Colombia 🇨🇴</span>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="ft-bottom">
            <p className="ft-copyright">
              © {currentYear} <strong>Nexo Digital</strong>. Todos los derechos reservados.
            </p>
            <div className="ft-credits">
              <span>Diseñado y desarrollado con</span>
              <span className="ft-credits-heart">♥</span>
              <span>por <a href="https://github.com/YersonRodriguez2005" target="_blank" rel="noopener noreferrer">Yerson Rodriguez</a></span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;