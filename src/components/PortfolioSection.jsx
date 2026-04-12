import React, { useState, useRef, useEffect } from 'react';
import imgFitness from '../assets/FitnessAhora.png';
import imgStudyTrack from '../assets/StudyTrack.png';
import imgStopFood from '../assets/StopFood.png';
import imgViaSegura from '../assets/ViaSegura.png';

// ─── Data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    tipo: 'App Móvil',
    category: 'mobile',
    title: 'FitnessAhora',
    subtitle: 'Tu Entrenador Personal',
    description:
      'Aplicación móvil con objetivos de entrenamiento, rutinas personalizadas y seguimiento nutricional. Información personal integrada y métricas de progreso en tiempo real.',
    techStack: [
      { label: 'Ionic', color: '#60a5fa' },
      { label: 'React', color: '#34d399' },
      { label: 'Express', color: '#94a3b8' },
      { label: 'Node.js', color: '#34d399' },
      { label: 'PostgreSQL', color: '#818cf8' },
    ],
    imagenUrl: imgFitness,
    linkProyecto: 'https://fitness-ahora.vercel.app/',
    linkDescarga: '../app/FitnessAhora.apk',
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
    techStack: [
      { label: 'React', color: '#60a5fa' },
      { label: 'TailwindCSS', color: '#34d399' },
      { label: 'Framer Motion', color: '#f472b6' },
      { label: 'CSS Animations', color: '#f59e0b' },
    ],
    imagenUrl: imgStudyTrack,
    linkProyecto: 'https://studytrack-iota.vercel.app/',
    metric: { value: '4.9★', label: 'Experiencia UX' },
    accentColor: '#818cf8',
  },
  {
    id: 3,
    tipo: 'Sistema POS',
    category: 'web',
    title: 'Stop Food POS',
    subtitle: 'Punto de Venta para Restaurante',
    description:
      'Sistema de punto de venta completo con gestión de productos, ventas y usuarios. Diseño fluido optimizado para operaciones de restaurante en tiempo real.',
    techStack: [
      { label: 'React', color: '#60a5fa' },
      { label: 'Vite', color: '#f59e0b' },
      { label: 'TailwindCSS', color: '#34d399' },
    ],
    imagenUrl: imgStopFood,
    linkProyecto: 'https://pos-stop-food.vercel.app/',
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
    techStack: [
      { label: 'React', color: '#60a5fa' },
      { label: 'Vite', color: '#f59e0b' },
      { label: 'TailwindCSS', color: '#34d399' },
      { label: 'Framer Motion', color: '#f472b6' },
    ],
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
      style={{ animationDelay: `${150 + index * 120}ms` }}
      data-inview={inView}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="pf-img-wrap">
        {/* Browser chrome */}
        <div className="pf-chrome">
          <div className="pf-chrome-dots">
            <div style={{ background: '#ff5f57' }} />
            <div style={{ background: '#febc2e' }} />
            <div style={{ background: '#28c840' }} />
          </div>
          <div className="pf-chrome-url">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ opacity: 0.4 }}>
              <path d="M4 1a3 3 0 100 6A3 3 0 004 1zm0 0v3l1.5 1.5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <span style={{ color: '#4a5568', fontFamily: "'Inter', sans-serif", fontSize: '0.6rem' }}>
              nexodigital.co/{project.title.toLowerCase().replace(/\s/g, '-')}
            </span>
          </div>
        </div>

        {/* Image */}
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

          {/* Hover overlay */}
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
        </div>

        {/* Type badge */}
        <div className="pf-type-badge">
          <span style={{ color: project.accentColor }}>
            {project.category === 'mobile' ? <IconMobile /> : <IconMonitor />}
          </span>
          <span>{project.tipo}</span>
        </div>

        {/* Metric badge */}
        <div className="pf-metric-badge">
          <span className="pf-metric-value" style={{ color: project.accentColor }}>
            {project.metric.value}
          </span>
          <span className="pf-metric-label">{project.metric.label}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="pf-body">
        {/* Title */}
        <div style={{ marginBottom: '10px' }}>
          <h3 className="pf-title">{project.title}</h3>
          <p className="pf-subtitle">{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="pf-desc">{project.description}</p>

        {/* Tech stack */}
        <div className="pf-tech-row">
          {project.techStack.map((t) => (
            <span
              key={t.label}
              className="pf-tech-badge"
              style={{
                color: t.color,
                background: `${t.color}12`,
                borderColor: `${t.color}28`,
              }}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="pf-divider" />

        {/* Actions */}
        <div className="pf-actions">
          <a
            href={project.linkProyecto}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-link-primary"
            style={{ '--accent': project.accentColor }}
          >
            <span>Ver en vivo</span>
            <IconArrow />
          </a>

          {project.linkDescarga && (
            <a
              href={project.linkDescarga}
              download
              className="pf-link-download"
            >
              <IconDownload />
              <span>Descargar APK</span>
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="pf-card-accent"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
      />
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
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }

        /* ── Inner ── */
        .pf-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .pf-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 72px;
        }

        .pf-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          animation: ${inView ? 'pfFadeUp 0.6s 0ms both' : 'none'};
        }

        .pf-eyebrow-line {
          width: 32px;
          height: 2px;
          background: #2563EB;
          border-radius: 2px;
          transform-origin: left;
          animation: ${inView ? 'pfLineGrow 0.5s 0.1s both' : 'none'};
        }

        .pf-eyebrow-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #2563EB;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .pf-h2 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: clamp(1.875rem, 3.5vw, 2.75rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0 0 16px;
          animation: ${inView ? 'pfFadeUp 0.6s 100ms both' : 'none'};
        }

        .pf-h2 .accent {
          background: linear-gradient(135deg, #60a5fa 0%, #2563EB 60%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pf-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.7;
          margin: 0;
          animation: ${inView ? 'pfFadeUp 0.6s 200ms both' : 'none'};
        }

        /* ── Grid ── */
        .pf-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        /* ── Card ── */
        .pf-card {
          position: relative;
          background: #0d1829;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          transition:
            transform 0.35s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.35s cubic-bezier(0.16,1,0.3,1),
            border-color 0.35s ease;
          cursor: default;
        }

        .pf-card[data-inview="true"] {
          animation: pfFadeUp 0.6s both;
        }

        .pf-card:hover {
          transform: translateY(-6px);
          box-shadow:
            0 0 0 1px rgba(37,99,235,0.18),
            0 24px 64px rgba(0,0,0,0.5),
            0 8px 24px rgba(37,99,235,0.08);
          border-color: rgba(37,99,235,0.2);
        }

        /* ── Browser chrome ── */
        .pf-chrome {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #08111f;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .pf-chrome-dots {
          display: flex;
          gap: 5px;
        }

        .pf-chrome-dots div {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .pf-chrome-url {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px;
          padding: 3px 8px;
        }

        /* ── Image wrap ── */
        .pf-img-wrap {
          position: relative;
        }

        .pf-img-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          background: #0a1120;
          overflow: hidden;
        }

        .pf-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
        }

        .pf-card:hover .pf-img {
          transform: scale(1.03);
        }

        /* Skeleton loader */
        .pf-img-skeleton {
          position: absolute;
          inset: 0;
          background: #0d1829;
          overflow: hidden;
        }

        .pf-skeleton-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.07) 50%, transparent 100%);
          animation: pfSkeleton 1.5s infinite;
        }

        /* Hover overlay */
        .pf-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(7,14,30,0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }

        .pf-overlay-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #2563EB;
          color: #fff;
          border-radius: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(37,99,235,0.45);
        }

        .pf-overlay-btn:hover {
          transform: scale(1.05);
        }

        /* Type badge */
        .pf-type-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          background: rgba(7,14,30,0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Metric badge */
        .pf-metric-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 6px 10px;
          background: rgba(7,14,30,0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          text-align: center;
        }

        .pf-metric-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.875rem;
          font-weight: 800;
          line-height: 1;
        }

        .pf-metric-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.55rem;
          color: #64748b;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── Body ── */
        .pf-body {
          padding: 1.5rem 1.75rem 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0.875rem;
        }

        .pf-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.25rem;
          color: #fff;
          letter-spacing: -0.03em;
          margin: 0;
          line-height: 1.15;
        }

        .pf-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          color: #475569;
          margin: 0;
          font-weight: 500;
        }

        .pf-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #4a5568;
          line-height: 1.7;
          margin: 0;
        }

        /* Tech badges */
        .pf-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .pf-tech-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 9px;
          border-radius: 100px;
          border: 1px solid;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Divider */
        .pf-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 0.25rem 0;
        }

        /* Actions */
        .pf-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .pf-link-primary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #2563EB;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: gap 0.2s, color 0.2s;
        }

        .pf-link-primary:hover {
          color: #60a5fa;
          gap: 10px;
        }

        .pf-link-download {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #10B981;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 5px 12px;
          border: 1px solid rgba(16,185,129,0.25);
          border-radius: 100px;
          background: rgba(16,185,129,0.06);
          transition: background 0.2s, border-color 0.2s;
        }

        .pf-link-download:hover {
          background: rgba(16,185,129,0.12);
          border-color: rgba(16,185,129,0.4);
        }

        /* Bottom accent line */
        .pf-card-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .pf-card:hover .pf-card-accent {
          opacity: 1;
        }

        /* ── Bottom CTA ── */
        .pf-bottom {
          margin-top: 64px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          animation: ${inView ? 'pfFadeUp 0.6s 700ms both' : 'none'};
        }

        .pf-bottom-text {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #4a5568;
        }

        .pf-bottom-text strong {
          color: #94a3b8;
          font-weight: 600;
        }

        .pf-bottom-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.875rem 2rem;
          background: transparent;
          border: 1px solid rgba(37,99,235,0.4);
          border-radius: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #60a5fa;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          text-decoration: none;
        }

        .pf-bottom-cta:hover {
          background: rgba(37,99,235,0.1);
          border-color: rgba(37,99,235,0.6);
          transform: translateY(-2px);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
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

            <p className="pf-subtitle">
              Sistemas y plataformas que hemos desarrollado para transformar
              la gestión empresarial. Cada proyecto, una solución a medida.
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
            <a href="#soluciones" className="pf-bottom-cta">
              <span>Iniciar mi proyecto</span>
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