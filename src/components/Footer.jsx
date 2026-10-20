import React, { useRef, useEffect, useState } from 'react';
import {
  Briefcase,
  GitFork,
  Mail,
  Phone,
  Clock,
  MapPin,
  Heart,
  ArrowUp,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import NexoLogo from '../assets/Logo1.png';

// ─── Enlaces de Navegación ────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios de Ingeniería' },
  { href: '#portafolio', label: 'Casos de Éxito' },
  { href: '#productos', label: 'Catálogo de Software' },
];

// ─── Enlaces Sociales y Canales de Comunicación ──────────────────────────────
const SOCIAL_LINKS = [
  {
    href: 'https://wa.me/573216393715',
    label: 'WhatsApp',
    colorHover: 'hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/yerson-rodriguez',
    label: 'LinkedIn',
    colorHover: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10',
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    href: 'https://github.com/YersonRodriguez2005',
    label: 'GitHub',
    colorHover: 'hover:text-white hover:border-slate-500 hover:bg-slate-800/60',
    icon: <GitFork className="w-4 h-4" />,
  },
  {
    href: 'mailto:rodriguezyerson2005@gmail.com',
    label: 'Email',
    colorHover: 'hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-500/10',
    icon: <Mail className="w-4 h-4" />,
  },
];

const TECH_TAGS = ['React', 'Node.js', 'PostgreSQL', 'Capacitor', 'Vite', 'Tailwind CSS'];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [inView, setInView] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#070E1E] text-slate-400 pt-20 pb-12 overflow-hidden border-t border-slate-800/80"
    >
      {/* ─── EFECTOS DE FONDO & GLOW AMBIENTAL ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow Superior Central */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-gradient-to-b from-blue-600/15 via-indigo-600/5 to-transparent blur-3xl" />
        
        {/* Malla de puntos tecnológica */}
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:36px_36px] opacity-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_30%,transparent_100%)]" />

        {/* Línea de gradiente superior */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── GRID PRINCIPAL DEL FOOTER ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-800/70">
          
          {/* Columna 1: Branding y Propuesta de Valor (5 Cols) */}
          <div
            className={`lg:col-span-5 flex flex-col gap-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Logo Unificado con NavBar */}
            <a href="/" className="flex items-center gap-3 group focus:outline-none w-fit">
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-600 rounded-xl blur-sm opacity-40 group-hover:opacity-75 transition duration-300" />
                <img
                  src={NexoLogo}
                  alt="Nexo Digital Logo"
                  className="relative w-10 h-10 object-contain rounded-lg border border-blue-400/20"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 items-center justify-center text-blue-400 font-bold">
                  ND
                </div>
              </div>
              <span className="font-['Montserrat',sans-serif] text-2xl font-black tracking-tight text-white">
                Nexo<span className="text-blue-500">Digital</span>
              </span>
            </a>

            {/* Descripción Semántica SEO */}
            <p className="font-['Inter',sans-serif] text-sm text-slate-300 leading-relaxed max-w-md">
              Agencia de ingeniería y desarrollo de software con base en <strong className="text-slate-200 font-semibold">Neiva, Huila</strong>.
              Construimos sistemas de inventario POS, plataformas web escalables y soluciones cloud a la medida para negocios en toda Colombia.
            </p>

            {/* Badge de Disponibilidad Operativa */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 w-fit backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider text-emerald-400">
                Disponibles para Nuevos Proyectos
              </span>
            </div>

            {/* Stack Tecnológico */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-semibold text-slate-400 font-['Montserrat',sans-serif]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación Rápida (3 Cols) */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h4 className="font-['Montserrat',sans-serif] text-xs font-black uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Navegación
            </h4>

            <ul className="space-y-3 font-['Inter',sans-serif] text-sm">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1.5 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-500 transition-colors" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información de Contacto & SEO Local (4 Cols) */}
          <div
            className={`lg:col-span-4 transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h4 className="font-['Montserrat',sans-serif] text-xs font-black uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Canales Directos
            </h4>

            {/* Redes Sociales / Accesos Rápidos */}
            <div className="flex items-center gap-2.5 mb-6">
              {SOCIAL_LINKS.map(({ href, label, icon, colorHover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 flex items-center justify-center transition-all duration-200 hover:-translate-y-1 shadow-sm ${colorHover}`}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Etiqueta address semántica para motores de búsqueda */}
            <address className="not-italic space-y-3 font-['Inter',sans-serif] text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Neiva, Huila, Colombia 🇨🇴</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="tel:+573216393715"
                  className="hover:text-white transition-colors"
                  title="Llamar a Nexo Digital"
                >
                  +57 321 639 3715
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lun - Vie: 8:00 AM - 6:00 PM (COT)</span>
              </div>
            </address>
          </div>

        </div>

        {/* ─── BARRA INFERIOR / COPYRIGHT & CRÉDITOS ─── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['Inter',sans-serif] text-slate-500">
          
          <p className="text-center sm:text-left">
            © {currentYear} <strong className="text-slate-300 font-semibold">Nexo Digital</strong>. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span>Construido con</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>por</span>
              <a
                href="https://github.com/YersonRodriguez2005"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-300 hover:text-blue-400 transition-colors inline-flex items-center gap-1"
              >
                <span>Yerson Rodriguez</span>
                <ExternalLink size={11} />
              </a>
            </div>

            {/* Botón flotante para volver arriba */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all hover:-translate-y-0.5"
              aria-label="Volver arriba"
              title="Volver arriba"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;