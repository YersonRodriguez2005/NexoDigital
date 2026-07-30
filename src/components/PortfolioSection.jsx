import React, { useState, useRef, useEffect } from 'react';
import imgFitness from '../assets/FitnessAhora.png';
import imgStudyTrack from '../assets/StudyTrack.png';
import Restaurant from '../assets/Restaurant.png';
import imgViaSegura from '../assets/ViaSegura.png';

// ─── Data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    tipo: 'App Móvil',
    category: 'mobile',
    title: 'FitnnesSync',
    subtitle: 'Tu Entrenador Personal',
    description:
      'FitnnesSync es una aplicación móvil diseñada para ayudarte a mantener un estilo de vida saludable. Ofrece funciones de seguimiento de ejercicio, planificación de rutinas, monitoreo de nutrición y estadísticas personalizables para alcanzar tus objetivos fitness.',
    imagenUrl: imgFitness,
    linkDescarga: 'https://pub-9ed7e687c3b94404acd5252833042478.r2.dev/FitnesSync.apk',
    metric: { value: '100%', label: 'Personalizado' },
    accentColor: '#60a5fa',
  },
  {
    id: 2,
    tipo: 'Plataforma Web',
    category: 'web',
    title: 'StudyTrack',
    subtitle: 'Gestión de Estudio Universitario',
    description:
      'Prototipo de plataforma visual de gestión académica con diseño moderno. Seguimiento detallado del progreso estudiantil, metas y hábitos de estudio para universitarios.',
    imagenUrl: imgStudyTrack,
    linkProyecto: 'https://studytrack-iota.vercel.app/',
    metric: { value: '4.9★', label: 'Experiencia UX' },
    accentColor: '#818cf8',
  },
  {
    id: 3,
    tipo: 'Sistema POS',
    category: 'web',
    title: 'Restaurant - POS',
    subtitle: 'Punto de Venta para Restaurante',
    description:
      'Sistema de punto de venta completo con gestión de productos, ventas y usuarios. Diseño fluido optimizado para operaciones de restaurante en tiempo real.',
    imagenUrl: Restaurant,
    linkProyecto: 'https://pos-restaurant-col.vercel.app/',
    metric: { value: '3×', label: 'Más rápido' },
    accentColor: '#f59e0b',
  },
  {
    id: 4,
    tipo: 'Plataforma Web',
    category: 'web',
    title: 'Vía Segura',
    subtitle: 'Seguridad Vial Digital',
    description:
      'Plataforma informativa sobre seguridad vial con recursos educativos, consejos de conducción, estadísticas de accidentes y evaluaciones de aprendizaje interactivas.',
    imagenUrl: imgViaSegura,
    linkProyecto: 'https://via-segura.vercel.app/',
    metric: { value: '∞', label: 'Recursos' },
    accentColor: '#34d399',
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconMobile = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="2.5" y="0.5" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
    <circle cx="6.5" cy="10" r="0.75" fill="currentColor"/>
  </svg>
);

const IconMonitor = () => (
  <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
    <rect x="0.75" y="0.75" width="12.5" height="8.5" rx="1.25" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M4.5 12H9.5M7 9.25V12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1V9M7 9L4 6M7 9L10 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 11H13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const IconExternalLink = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M7 1H11V5M11 1L5 7M3 3H1V11H9V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, inView }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="pf-card"
      style={{ 
        animationDelay: `${150 + index * 120}ms`,
        '--accent': project.accentColor // MENTOR TIP: Magia de CSS Variables
      }}
      data-inview={inView}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image area ── */}
      <div className="pf-img-wrap">
        
        {/* Browser chrome macOS Style */}
        <div className="pf-chrome">
          <div className="pf-chrome-dots">
            <div style={{ background: '#ff5f57' }} />
            <div style={{ background: '#febc2e' }} />
            <div style={{ background: '#28c840' }} />
          </div>
        </div>

        {/* Image Container */}
        <div className="pf-img-container">
          {!imgLoaded && (
            <div className="pf-img-skeleton">
              <div className="pf-skeleton-shine" />
            </div>
          )}
          <img
            src={project.imagenUrl}
            alt={project.title}
            className="pf-img"
            style={{ opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Renderizado Condicional: No mostrar overlay en Mobile */}
          {project.category !== 'mobile' && (
            <div className="pf-img-overlay" style={{ opacity: hovered ? 1 : 0 }}>
              <a
                href={project.linkProyecto}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-overlay-btn"
              >
                <span>Ver proyecto</span>
                <IconExternalLink />
              </a>
            </div>
          )}
        </div>

        {/* Type badge */}
        <div className="pf-type-badge">
          <span style={{ color: 'var(--accent)' }}>
            {project.category === 'mobile' ? <IconMobile /> : <IconMonitor />}
          </span>
          <span>{project.tipo}</span>
        </div>

        {/* Metric badge */}
        <div className="pf-metric-badge">
          <span className="pf-metric-value" style={{ color: 'var(--accent)' }}>
            {project.metric.value}
          </span>
          <span className="pf-metric-label">{project.metric.label}</span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="pf-body">
        
        {/* Header (Título y Tecnologías juntas) */}
        <div className="pf-card-header">
          <div>
            <h3 className="pf-title">{project.title}</h3>
            <p className="pf-card-subtitle">{project.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="pf-desc">{project.description}</p>

        {/* Espaciador flexible para empujar los botones abajo */}
        <div style={{ flexGrow: 1 }} />
        <div className="pf-divider" />

        {/* Actions */}
        <div className="pf-actions">
          {/* Solo se dibuja si no es mobile */}
          {project.category !== 'mobile' && (
            <a
              href={project.linkProyecto}
              target="_blank"
              rel="noopener noreferrer"
              className="pf-btn-ghost"
            >
              <span>Ver en vivo</span>
              <IconArrow />
            </a>
          )}

          {/* Solo se dibuja si existe un link */}
          {project.linkDescarga && (
            <a
              href={project.linkDescarga}
              download
              className="pf-btn-ghost download"
            >
              <IconDownload />
              <span>Descargar APK</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const PortfolioSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

        @keyframes pfFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pfLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pfSkeleton {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* ── Section ── */
        .pf-section {
          position: relative;
          background: #070E1E;
          padding: 120px 2rem;
          overflow: hidden;
        }

        .pf-section::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .pf-inner {
          position: relative; z-index: 2; max-width: 1280px; margin: 0 auto;
        }

        /* ── Header ── */
        .pf-header {
          text-align: center; max-width: 700px; margin: 0 auto 72px;
        }
        .pf-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 20px;
          animation: ${inView ? 'pfFadeUp 0.6s 0ms both' : 'none'};
        }
        .pf-eyebrow-line {
          width: 32px; height: 2px; background: #2563EB; border-radius: 2px;
          transform-origin: left; animation: ${inView ? 'pfLineGrow 0.5s 0.1s both' : 'none'};
        }
        .pf-eyebrow-text {
          font-family: 'Montserrat', sans-serif; font-size: 0.75rem; font-weight: 700;
          color: #2563EB; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .pf-h2 {
          font-family: 'Montserrat', sans-serif; font-weight: 900;
          font-size: clamp(1.875rem, 3.5vw, 2.75rem); line-height: 1.08;
          letter-spacing: -0.04em; color: #fff; margin: 0 0 16px;
          animation: ${inView ? 'pfFadeUp 0.6s 100ms both' : 'none'};
        }
        .pf-h2 .accent {
          background: linear-gradient(135deg, #60a5fa 0%, #2563EB 60%, #818cf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* Corregido el bug de la doble clase */
        .pf-section-subtitle {
          font-family: 'Inter', sans-serif; font-size: 1rem; color: #64748b;
          line-height: 1.7; margin: 0; animation: ${inView ? 'pfFadeUp 0.6s 200ms both' : 'none'};
        }

        /* ── Grid ── */
        .pf-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }

        /* ── Card (Premium Glassmorphism Design) ── */
        .pf-card {
          position: relative;
          background: linear-gradient(145deg, rgba(15,23,42,0.8), rgba(7,14,30,0.9));
          backdrop-filter: blur(10px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), 
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), 
                      border-color 0.4s ease;
        }
        .pf-card[data-inview="true"] { animation: pfFadeUp 0.6s both; }
        
        .pf-card:hover {
          transform: translateY(-8px);
          /* MENTOR TIP: Sombra mágica basada en la variable CSS --accent del proyecto */
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), 
                      0 0 25px -10px var(--accent);
          border-color: rgba(255,255,255,0.15);
        }

        /* Línea de color superior */
        .pf-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--accent); opacity: 0.8; z-index: 10;
        }

        /* ── Browser chrome ── */
        .pf-chrome {
          display: flex; align-items: center; gap: 8px; padding: 12px 16px;
          background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.03);
          position: absolute; top: 0; left: 0; right: 0; z-index: 5;
        }
        .pf-chrome-dots { display: flex; gap: 6px; }
        .pf-chrome-dots div { width: 10px; height: 10px; border-radius: 50%; }

        /* ── Image wrap ── */
        .pf-img-wrap { position: relative; }
        .pf-img-container {
          position: relative; width: 100%; aspect-ratio: 16/10;
          background: #0a1120; overflow: hidden;
        }
        .pf-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s;
        }
        .pf-card:hover .pf-img { transform: scale(1.04); }

        /* Skeleton loader */
        .pf-img-skeleton { position: absolute; inset: 0; background: #0d1829; overflow: hidden; }
        .pf-skeleton-shine {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.07) 50%, transparent 100%);
          animation: pfSkeleton 1.5s infinite;
        }

        /* Hover overlay */
        .pf-img-overlay {
          position: absolute; inset: 0; background: rgba(7,14,30,0.6);
          backdrop-filter: blur(3px); display: flex; align-items: center; justify-content: center;
          transition: opacity 0.3s ease;
        }
        .pf-overlay-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px;
          background: #fff; color: #0F172A; border-radius: 12px;
          font-family: 'Montserrat', sans-serif; font-size: 0.8125rem; font-weight: 800;
          letter-spacing: 0.02em; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .pf-overlay-btn:hover { transform: scale(1.05); }

        /* Badges flotantes sobre la imagen */
        .pf-type-badge, .pf-metric-badge {
          position: absolute; z-index: 10;
          background: rgba(15,23,42,0.85); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .pf-type-badge {
          bottom: 16px; left: 16px; display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; font-family: 'Montserrat', sans-serif; font-size: 0.7rem;
          font-weight: 700; color: #cbd5e1; letter-spacing: 0.05em; text-transform: uppercase;
        }
        .pf-metric-badge {
          top: 50px; right: 16px; display: flex; flex-direction: column; align-items: center;
          padding: 8px 12px;
        }
        .pf-metric-value { font-family: 'Montserrat', sans-serif; font-size: 1rem; font-weight: 900; line-height: 1; }
        .pf-metric-label { font-family: 'Inter', sans-serif; font-size: 0.55rem; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 4px; }

        /* ── Body ── */
        .pf-body { padding: 1.75rem 2rem 2rem; display: flex; flex-direction: column; flex: 1; gap: 1rem; }
        .pf-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .pf-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 1.35rem; color: #fff; letter-spacing: -0.03em; margin: 0 0 4px; }
        
        /* Subtítulo de tarjeta corregido */
        .pf-card-subtitle { font-family: 'Inter', sans-serif; font-size: 0.8125rem; color: var(--accent); margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;}
        
        .pf-desc { font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #94a3b8; line-height: 1.6; margin: 0; }

        /* Divider */
        .pf-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 0.5rem 0; }

        /* Actions (Botones Ghost) */
        .pf-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        
        .pf-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
          font-family: 'Montserrat', sans-serif; font-size: 0.75rem; font-weight: 700;
          color: #e2e8f0; text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase;
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px; transition: all 0.2s;
        }
        
        .pf-btn-ghost:hover {
          background: rgba(255,255,255,0.05);
          border-color: var(--accent);
          color: #fff;
        }

        .pf-btn-ghost.download { color: #10B981; border-color: rgba(16,185,129,0.3); }
        .pf-btn-ghost.download:hover { background: rgba(16,185,129,0.1); border-color: #10B981; color: #fff;}

        /* ── Bottom CTA ── */
        .pf-bottom {
          margin-top: 80px; text-align: center; display: flex; flex-direction: column;
          align-items: center; gap: 20px; animation: ${inView ? 'pfFadeUp 0.6s 700ms both' : 'none'};
        }
        .pf-bottom-text { font-family: 'Inter', sans-serif; font-size: 1.125rem; color: #94a3b8; }
        .pf-bottom-text strong { color: #fff; font-weight: 600; }
        
        .pf-bottom-cta {
          display: inline-flex; align-items: center; gap: 8px; padding: 1rem 2.5rem;
          background: #2563EB; color: #fff; border-radius: 12px;
          font-family: 'Montserrat', sans-serif; font-size: 0.875rem; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(37,99,235,0.4);
        }
        .pf-bottom-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(37,99,235,0.5); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .pf-grid { grid-template-columns: 1fr; }
          .pf-section { padding: 80px 1.5rem; }
        }
      `}</style>

      <section id="portafolio" className="pf-section" ref={sectionRef}>
        <div className="pf-inner">

          {/* Header */}
          <div className="pf-header">
            <div className="pf-eyebrow">
              <div className="pf-eyebrow-line" />
              <span className="pf-eyebrow-text">Portafolio</span>
              <div className="pf-eyebrow-line" style={{ transformOrigin: 'right' }} />
            </div>

            <h2 className="pf-h2">
              Casos de <span className="accent">éxito</span> y soluciones
            </h2>

            <p className="pf-section-subtitle">
              Sistemas y plataformas que hemos desarrollado para transformar
              la gestión empresarial y vida personal. Cada proyecto, una solución a medida.
            </p>
          </div>

          {/* Grid */}
          <div className="pf-grid">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                inView={inView}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="pf-bottom">
            <p className="pf-bottom-text">
              ¿Tienes un proyecto en mente? <strong>Construyamos juntos tu solución.</strong>
            </p>
            <a href="#productos" className="pf-bottom-cta">
              <span>Comprar mi Software</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;