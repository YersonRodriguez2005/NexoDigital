import React, { useState, useRef, useEffect } from 'react';
import {
  Smartphone,
  Monitor,
  ExternalLink,
  Download,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import imgFitness from '../assets/FitnessAhora.png';
import imgStudyTrack from '../assets/StudyTrack.png';
import Restaurant from '../assets/Restaurant.png';
import imgViaSegura from '../assets/ViaSegura.png';

// ─── Proyectos y Casos de Éxito ──────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    tipo: 'App Móvil',
    category: 'mobile',
    title: 'FitnnesSync',
    subtitle: 'Tu Entrenador Personal',
    description:
      'Aplicación móvil diseñada para el seguimiento integral de ejercicio, planificación de rutinas de fuerza, monitoreo calórico y analíticas personalizadas para alcanzar objetivos fitness sin fricción.',
    imagenUrl: imgFitness,
    linkDescarga: 'https://pub-9ed7e687c3b94404acd5252833042478.r2.dev/FitnesSync.apk',
    metric: { value: '100%', label: 'Personalizado' },
    accentColor: '#38bdf8', // Sky blue
  },
  {
    id: 2,
    tipo: 'Plataforma Web',
    category: 'web',
    title: 'StudyTrack',
    subtitle: 'Gestión de Estudio Universitario',
    description:
      'Plataforma web de gestión académica de alto rendimiento. Permite el seguimiento meticuloso de materias, fechas de entrega, cálculo de metas y hábitos de estudio para estudiantes universitarios.',
    imagenUrl: imgStudyTrack,
    linkProyecto: 'https://studytrack-iota.vercel.app/',
    metric: { value: '4.9★', label: 'Experiencia UX' },
    accentColor: '#818cf8', // Indigo
  },
  {
    id: 3,
    tipo: 'Sistema POS',
    category: 'web',
    title: 'Restaurant - POS',
    subtitle: 'Punto de Venta Gastronómico',
    description:
      'Sistema de comandas y facturación rápida en tiempo real para negocios gastronómicos. Control de inventario por recetas, mesas activas y arqueos de caja transparentes.',
    imagenUrl: Restaurant,
    linkProyecto: 'https://pos-restaurant-col.vercel.app/',
    metric: { value: '3×', label: 'Más rápido' },
    accentColor: '#f59e0b', // Amber
  },
  {
    id: 4,
    tipo: 'Plataforma Web',
    category: 'web',
    title: 'Vía Segura',
    subtitle: 'Seguridad Vial Digital',
    description:
      'Entorno digital educativo interactivo enfocado en normas de tránsito, estadísticas de accidentabilidad en tiempo real y evaluaciones viales interactivas para conductores.',
    imagenUrl: imgViaSegura,
    linkProyecto: 'https://via-segura.vercel.app/',
    metric: { value: '∞', label: 'Recursos' },
    accentColor: '#34d399', // Emerald
  },
];

// ─── Tarjeta de Proyecto ──────────────────────────────────────────────────────
const ProjectCard = ({ project, index, inView }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: `${150 + index * 120}ms`,
      }}
      className={`group relative flex flex-col justify-between rounded-3xl bg-slate-900/40 border border-slate-800/80 p-6 sm:p-7 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:shadow-blue-650/30 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      {/* Línea de Acento Superior Dinámica */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${project.accentColor} 50%, transparent 100%)`,
          opacity: isHovered ? 1 : 0.4,
        }}
      />

      {/* ─── Mockup / Contenedor Visual de la Imagen ─── */}
      <div className="relative w-full aspect-[16/10] bg-[#0A1224] overflow-hidden border-b border-slate-800/80">

        {/* Barra estilo navegador Chrome / App */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2.5 bg-slate-950/60 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
            {project.category === 'mobile' ? 'Android Native' : 'Cloud Deployment'}
          </span>
        </div>

        {/* Skeleton de Carga */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
          </div>
        )}

        {/* Imagen del Proyecto */}
        <img
          src={project.imagenUrl}
          alt={project.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Overlay hover para proyectos Web */}
        {project.category !== 'mobile' && project.linkProyecto && (
          <div className="hidden sm:flex absolute inset-0 z-10 bg-slate-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
            <a
              href={project.linkProyecto}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-transform"
            >
              <span>Ver en Vivo</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* Badge de Categoría (Inferior Izquierda) */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-300 text-[11px] font-['Montserrat',sans-serif] font-bold uppercase tracking-wide">
          <span style={{ color: project.accentColor }}>
            {project.category === 'mobile' ? (
              <Smartphone size={14} />
            ) : (
              <Monitor size={14} />
            )}
          </span>
          <span>{project.tipo}</span>
        </div>

        {/* Badge de Métrica de Éxito (Inferior Derecha) */}
        <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10">
          <span
            className="font-['Montserrat',sans-serif] font-black text-sm leading-none tabular-nums"
            style={{ color: project.accentColor }}
          >
            {project.metric.value}
          </span>
          <span className="font-['Inter',sans-serif] text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            {project.metric.label}
          </span>
        </div>
      </div>

      {/* ─── Cuerpo de la Tarjeta ─── */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">

        {/* Título y Subtítulo */}
        <div className="mb-3">
          <span
            className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider block mb-1"
            style={{ color: project.accentColor }}
          >
            {project.subtitle}
          </span>
          <h3 className="font-['Montserrat',sans-serif] font-extrabold text-2xl text-white tracking-tight group-hover:text-blue-400 transition-colors duration-200">
            {project.title}
          </h3>
        </div>

        {/* Descripción */}
        <p className="font-['Inter',sans-serif] text-sm text-slate-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Separador inferior flexible */}
        <div className="mt-auto pt-6 border-t border-slate-800/80 flex items-center justify-between gap-3 flex-wrap">

          {/* Enlace Web en Vivo */}
          {project.category !== 'mobile' && project.linkProyecto && (
            <a
              href={project.linkProyecto}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-wider text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-slate-700/70 hover:border-slate-500 hover:bg-slate-800/40 transition-all duration-200 group/link"
            >
              <span>Explorar Demo</span>
              <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
            </a>
          )}

          {/* Enlace de Descarga APK */}
          {project.linkDescarga && (
            <a
              href={project.linkDescarga}
              download
              className="inline-flex items-center gap-2 text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 px-3.5 py-2 rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/15 transition-all duration-200 shadow-sm shadow-emerald-500/10"
            >
              <Download size={14} />
              <span>Descargar APK</span>
            </a>
          )}

          <div className="flex items-center gap-1.5 text-[11px] font-['Inter',sans-serif] text-slate-500 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Producción</span>
          </div>
        </div>

      </div>
    </article>
  );
};

// ─── Componente Principal ─────────────────────────────────────────────────────
const PortfolioSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portafolio"
      ref={sectionRef}
      className="relative bg-[#070E1E] py-24 sm:py-32 overflow-hidden border-t border-slate-800/60"
    >
      {/* ── Fondo Tecnológico con Radial Dots ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:38px_38px] opacity-15 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_50%,#000_50%,transparent_100%)]" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Cabecera de Sección ── */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-widest text-blue-400">
              Casos Reales de Éxito
            </span>
          </div>

          <h2
            className={`font-['Montserrat',sans-serif] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Sistemas que impulsan{' '}
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
              negocios reales
            </span>
          </h2>

          <p
            className={`font-['Inter',sans-serif] text-base sm:text-lg text-slate-400 mt-4 leading-relaxed transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Software y plataformas cloud que hemos diseñado, optimizado y desplegado.
            Desde aplicaciones móviles nativas hasta sistemas de control operativo.
          </p>
        </div>

        {/* ── Grid de Proyectos ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* ── CTA Inferior de Conversión ── */}
        <div
          className={`mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800 text-center flex flex-col items-center gap-6 max-w-3xl mx-auto backdrop-blur-xl shadow-2xl transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold font-['Montserrat',sans-serif] uppercase tracking-wider">
            <TrendingUp size={14} />
            <span>¿Tienes una idea específica?</span>
          </div>

          <h3 className="font-['Montserrat',sans-serif] font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Diseñamos la infraestructura ideal para tu negocio
          </h3>

          <p className="font-['Inter',sans-serif] text-sm sm:text-base text-slate-400 max-w-xl">
            Cuéntanos los requerimientos de tu negocio y construiremos un sistema
            rápido, seguro y adaptado a tu presupuesto.
          </p>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-['Montserrat',sans-serif] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Iniciar mi Proyecto</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;