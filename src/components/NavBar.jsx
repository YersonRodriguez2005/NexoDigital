import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import NexoLogo from '../assets/Logo1.png';


const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Casos de Éxito' },
  { href: '#soluciones', label: 'Soluciones' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');

        .nexo-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nexo-nav.scrolled {
          background: rgba(7, 14, 30, 0.92);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(37, 99, 235, 0.15);
          box-shadow:
            0 1px 0 rgba(37, 99, 235, 0.08),
            0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .nexo-nav.top {
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
        }

        /* LOGO */
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
        }

        .logo-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .logo-text span {
          color: #2563EB;
        }

        .logo-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #2563EB;
          border-radius: 50%;
          margin-left: 1px;
          vertical-align: super;
        }

        /* NAV LINKS */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-link {
          position: relative;
          padding: 0.5rem 1rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #94a3b8;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border-radius: 8px;
          transition: color 0.25s ease, background 0.25s ease;
          overflow: hidden;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px;
          height: 2px;
          background: #2563EB;
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(37, 99, 235, 0.08);
        }

        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* CTA BUTTON */
        .cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.625rem 1.5rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #ffffff;
          background: #2563EB;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow:
            0 0 0 0 rgba(37, 99, 235, 0),
            0 4px 16px rgba(37, 99, 235, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #1d4ed8;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-btn:hover {
          transform: translateY(-1px);
          box-shadow:
            0 0 0 3px rgba(37, 99, 235, 0.2),
            0 8px 24px rgba(37, 99, 235, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .cta-btn:hover::after {
          transform: translateY(0);
        }

        .cta-btn:active {
          transform: translateY(0px);
        }

        .cta-btn span {
          position: relative;
          z-index: 1;
        }

        .cta-arrow {
          position: relative;
          z-index: 1;
          width: 14px;
          height: 14px;
          transition: transform 0.2s ease;
        }

        .cta-btn:hover .cta-arrow {
          transform: translateX(3px);
        }

        /* STATUS INDICATOR */
        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          margin-right: 16px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          animation: pulse-green 2s infinite;
          flex-shrink: 0;
        }

        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
          50% { box-shadow: 0 0 0 4px rgba(16, 185, 129, 0); }
        }

        .status-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6875rem;
          font-weight: 600;
          color: #10B981;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        /* MOBILE TOGGLE */
        .hamburger-btn {
          display: none;
          background: none;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 8px;
          padding: 8px;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }

        .hamburger-btn:hover {
          color: #fff;
          border-color: rgba(37, 99, 235, 0.4);
          background: rgba(37, 99, 235, 0.1);
        }

        /* MOBILE MENU */
        .mobile-menu {
          display: none;
          flex-direction: column;
          background: rgba(7, 14, 30, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid rgba(37, 99, 235, 0.12);
          padding: 1rem 2rem 1.5rem;
          gap: 0.25rem;
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-link {
          display: block;
          padding: 0.875rem 1rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #94a3b8;
          text-decoration: none;
          letter-spacing: 0.04em;
          border-radius: 8px;
          border-left: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s, background 0.2s, padding-left 0.2s;
        }

        .mobile-link:hover {
          color: #fff;
          border-left-color: #2563EB;
          background: rgba(37, 99, 235, 0.06);
          padding-left: 1.25rem;
        }

        .mobile-divider {
          height: 1px;
          background: rgba(148, 163, 184, 0.1);
          margin: 0.75rem 0;
        }

        .mobile-cta {
          width: 100%;
          margin-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .desktop-cta { display: none; }
          .status-badge { display: none; }
          .hamburger-btn { display: flex; align-items: center; justify-content: center; }
          .mobile-menu.open { display: flex; }
        }

        /* Top accent line */
        .nav-accent-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #2563EB 30%, #60a5fa 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .nexo-nav.scrolled .nav-accent-line {
          opacity: 1;
        }
      `}</style>

      <nav className={`nexo-nav ${scrolled ? 'scrolled' : 'top'}`}>
        <div className="nav-accent-line" />
        <div className="nav-inner">

          {/* Logo */}
          <a href="/" className="logo-wrap">
            <img src={NexoLogo} className='w-12 h-12 rounded-lg' alt="Nexo Digital" />
            <span className="logo-text">
              Nexo<span>Digital</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </nav>

          {/* Right side: Status + CTA */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="status-badge">
              <div className="status-dot" />
              <span className="status-text">Proyectos disponibles</span>
            </div>

            <button className="cta-btn desktop-cta">
              <span>Agendar Asesoría</span>
              <svg className="cta-arrow" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen
                ? <X size={20} />
                : <Menu size={20} />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="mobile-divider" />
          <button
            className="cta-btn mobile-cta"
            onClick={() => {
              setIsOpen(false);
              window.location.href = "#soluciones";
            }}
          >
            <span>Agendar Asesoría</span>
            <svg className="cta-arrow" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;