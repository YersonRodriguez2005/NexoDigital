import React, { useState, useRef, useEffect } from 'react';
import {
  MonitorCheck,
  Database,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Code2,
} from 'lucide-react';

// ─── Mini Badge Tecnológico ──────────────────────────────────────────────────
const TechBadge = ({ label, color }) => (
  <span
    style={{
      backgroundColor: `${color}15`,
      borderColor: `${color}35`,
      color: color,
    }}
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border font-['Montserrat',sans-serif]"
  >
    {label}
  </span>
);

// ─── Servicios Especializados ────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    number: '01',
    icon: MonitorCheck,
    title: 'Plataformas Web a la Medida',
    description:
      'Desarrollamos interfaces web y aplicaciones cloud modernas, intuitivas y ultrarrápidas. Tu equipo dispondrá de un centro de mando adaptado al 100% a tus flujos de trabajo específicos.',
    features: [
      'Accesible desde cualquier navegador y dispositivo móvil',
      'Arquitectura reactiva sin tiempos muertos de recarga',
      'Paneles administrativos y reportes exportables en un clic',
    ],
    tech: [
      { label: 'React', color: '#2563EB' },
      { label: 'TypeScript', color: '#6366F1' },
      { label: 'Tailwind CSS', color: '#0EA5E9' },
    ],
    metric: { value: '< 1.8s', label: 'Tiempo de Carga' },
    accentGradient: 'from-blue-600 to-cyan-500',
    iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  },
  {
    id: 2,
    number: '02',
    icon: Database,
    title: 'Arquitectura de Datos Segura',
    description:
      'Centralizamos y protegemos el activo más valioso de tu negocio: tu información. Diseñamos modelos relacionales blindados con cero pérdida de registros y copias de seguridad continuas.',
    features: [
      'Bases de datos optimizadas para alta concurrencia',
      'Backups automáticos en la nube y recuperación ante fallos',
      'Control estricto de roles, auditoría y permisos de usuario',
    ],
    tech: [
      { label: 'PostgreSQL', color: '#2563EB' },
      { label: 'Prisma / SQL', color: '#8B5CF6' },
      { label: 'Cloudflare R2', color: '#F97316' },
    ],
    metric: { value: '99.9%', label: 'Uptime Cloud' },
    accentGradient: 'from-indigo-600 to-purple-500',
    iconBg: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
  },
  {
    id: 3,
    number: '03',
    icon: Cpu,
    title: 'APIs, Automatización & Backend',
    description:
      'Construimos el motor lógico de tu operación. Automatizamos facturación, sincronización de stock multi-sucursal y comunicación en tiempo real sin requerir tareas manuales repetitivas.',
    features: [
      'Servidores Node.js y Express con rendimiento optimizado',
      'Conexión fluida con pasarelas de pago y mensajería WhatsApp',
      'WebSockets para actualización de datos en vivo sin refrescar',
    ],
    tech: [
      { label: 'Node.js', color: '#10B981' },
      { label: 'Express', color: '#64748B' },
      { label: 'WebSockets', color: '#F59E0B' },
    ],
    metric: { value: '5× más', label: 'Eficiencia Operativa' },
    accentGradient: 'from-emerald-600 to-teal-500',
    iconBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
  },
];

// ─── Componente Principal ─────────────────────────────────────────────────────
const ServicesSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative bg-slate-100/90 py-24 sm:py-32 overflow-hidden border-t border-slate-200/80"
    >
      {/* Fondo técnico con cuadrícula y efecto de máscara radial */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb0a_1px,transparent_1px),linear-gradient(to_bottom,#2563eb0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Cabecera de la Sección ── */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 mb-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-widest text-blue-600">
              Servicios de Ingeniería
            </span>
          </div>

          <h2
            className={`font-['Montserrat',sans-serif] font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Tecnología hecha para{' '}
            <span className="relative inline-block text-blue-600">
              escalar
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full opacity-60" />
            </span>{' '}
            tu negocio
          </h2>

          <p
            className={`font-['Inter',sans-serif] text-base sm:text-lg text-slate-600 mt-4 leading-relaxed transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            No encajes tu operación en plantillas rígidas. Diseñamos y desarrollamos
            software a la medida que resuelve tus cuellos de botella reales con arquitectura industrial.
          </p>
        </div>

        {/* ── Grid de Servicios (Bento Cards) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICES.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <article
                key={service.id}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
                className={`group relative flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Línea de acento animada al hacer hover */}
                <div
                  className={`absolute top-0 inset-x-8 h-1 bg-gradient-to-r ${service.accentGradient} rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* ── Contenido Superior ── */}
                <div>
                  {/* Fila: Número e Icono */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${service.iconBg}`}
                    >
                      <IconComponent size={26} strokeWidth={2} />
                    </div>

                    <span className="font-['Montserrat',sans-serif] text-xs font-black tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors uppercase">
                      {service.number}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="font-['Montserrat',sans-serif] font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
                    {service.title}
                  </h3>

                  {/* Descripción */}
                  <p className="font-['Inter',sans-serif] text-sm text-slate-600 mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Lista de Capacidades Clave */}
                  <ul className="mt-5 space-y-2.5">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-['Inter',sans-serif]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack Tecnológico */}
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-slate-100">
                    {service.tech.map((t) => (
                      <TechBadge key={t.label} label={t.label} color={t.color} />
                    ))}
                  </div>
                </div>

                {/* ── Chip de Métrica / KPI al fondo ── */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 group-hover:bg-blue-50/60 rounded-2xl border border-slate-200/80 group-hover:border-blue-200 transition-colors duration-200">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="font-['Montserrat',sans-serif] font-black text-base text-slate-900 tabular-nums">
                        {service.metric.value}
                      </span>
                    </div>

                    <span className="font-['Inter',sans-serif] text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {service.metric.label}
                    </span>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* ── Banner de Asesoría & Diagnóstico ── */}
        <div
          className={`mt-16 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-400 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0">
              <Code2 size={24} />
            </div>
            <div>
              <h4 className="font-['Montserrat',sans-serif] font-extrabold text-lg sm:text-xl text-slate-900">
                ¿Necesitas una auditoría técnica o solución personalizada?
              </h4>
              <p className="font-['Inter',sans-serif] text-sm text-slate-600 mt-0.5">
                Evaluamos tu arquitectura actual y te proponemos un plan de desarrollo viable y escalable.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/573216393715?text=%C2%A1Hola,%20Nexo%20Digital!%20Me%20gustar%C3%ADa%20solicitar%20un%20diagn%C3%B3stico%20t%C3%A9cnico%20para%20un%20proyecto%20de%20software%20a%20la%20medida."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/30 shrink-0 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Consultar con un Ingeniero</span>
            <ArrowRight size={15} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;