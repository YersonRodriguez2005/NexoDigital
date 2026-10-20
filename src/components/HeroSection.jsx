import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, RefreshCw, CheckCircle2, Terminal } from 'lucide-react';

// Hook contador suave y aislado
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
};

const StatItem = ({ value, suffix, label, animate }) => {
  const num = useCounter(parseInt(value, 10), 1600, animate);

  return (
    <div className="flex flex-col">
      <div className="font-['Montserrat'] font-black text-2xl lg:text-3xl text-white tracking-tight tabular-nums flex items-baseline">
        <span>{animate ? num : value}</span>
        <span className="text-blue-500 ml-0.5">{suffix}</span>
      </div>
      <p className="font-['Montserrat'] text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
        {label}
      </p>
    </div>
  );
};

const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: '5', suffix: '+', label: 'Sistemas en producción' },
    { value: '98', suffix: '%', label: 'Satisfacción clientes' },
    { value: '3', suffix: 'x', label: 'Aceleración operativa' },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-[#070E1E] overflow-hidden flex items-center pt-32 pb-16 sm:pt-36 lg:pt-36 lg:pb-20"
    >
      {/* ─── FONDO AMBIENTAL: GRID + GLOW ORBS ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial grid pattern */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:36px_36px] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)]"
        />

        {/* Glow Blue Superior Izquierdo */}
        <div className="absolute -top-32 -left-32 w-96 lg:w-[600px] h-96 lg:h-[600px] bg-blue-600/15 rounded-full blur-[120px]" />

        {/* Glow Indigo Inferior Derecho */}
        <div className="absolute -bottom-20 -right-20 w-80 lg:w-[500px] h-80 lg:h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ─── COLUMNA IZQUIERDA: PITCH & ACCIÓN (7 Cols) ─── */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">

            {/* Badge de autoridad */}
            <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 w-fit backdrop-blur-md shadow-sm shadow-blue-500/10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="font-['Montserrat'] text-xs font-bold uppercase tracking-wider text-blue-300">
                Software · Neiva, Huila
              </span>
            </div>

            {/* Título Principal */}
            <h1 className={`font-['Montserrat'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              Automatizamos tu gestión con{' '}
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-600 to-blue-400 bg-[length:200%_auto] animate-gradient-text">
                software a tu medida
              </span>

            </h1>

            {/* Párrafo Descriptivo */}
            <p className={`font-['Inter',sans-serif] text-base sm:text-lg text-slate-300/85 leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              Elimina los cuellos de botella y los errores de hojas de cálculo. En{' '}
              <strong className="text-white font-semibold">Nexo Digital</strong> diseñamos arquitecturas web,
              móviles y plataformas cloud escalables que centralizan tus ventas, inventarios y clientes en un solo lugar.
            </p>

            {/* Grupo de Acciones (CTAs) */}
            <div className={`flex flex-wrap items-center gap-4 pt-2 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <a
                href="#productos"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-['Montserrat'] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Explorar Soluciones</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-['Montserrat'] text-xs sm:text-sm font-semibold uppercase tracking-wider border border-slate-700/80 hover:border-slate-500 transition-all duration-200 backdrop-blur-sm"
              >
                <span>Ver Demo en Vivo</span>
              </a>
            </div>

            {/* Métricas / Stats de Confianza */}
            <div className={`grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              {stats.map((s, idx) => (
                <StatItem key={idx} {...s} animate={visible} />
              ))}
            </div>

          </div>

          {/* ─── COLUMNA DERECHA: MOCKUP INTERACTIVO (5 Cols) ─── */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 [perspective:1000px]">

            {/* Tarjeta Flotante 1: Métrica Superior */}
            <div className="absolute -top-6 -left-6 z-20 flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl shadow-black/80 animate-[bounce_4s_infinite_ease-in-out]">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <TrendingUp size={18} />
              </div>
              <div>
                <div className="font-['Montserrat'] font-black text-sm text-white">+340%</div>
                <div className="font-['Inter',sans-serif] text-[10px] uppercase tracking-wider text-slate-400">
                  Eficiencia Operativa
                </div>
              </div>
            </div>

            {/* Tarjeta Flotante 2: Métrica Inferior */}
            <div className="absolute -bottom-6 -right-6 z-20 flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-blue-500/30 backdrop-blur-xl shadow-2xl shadow-black/80 animate-[bounce_5s_infinite_ease-in-out_delay-1000]">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                <RefreshCw size={18} className="animate-spin [animation-duration:8s]" />
              </div>
              <div>
                <div className="font-['Montserrat'] font-black text-sm text-white">Sincronizado</div>
                <div className="font-['Inter',sans-serif] text-[10px] uppercase tracking-wider text-slate-400">
                  Cloud en Tiempo Real
                </div>
              </div>
            </div>

            {/* Frame de la Ventana / Dashboard */}
            <div className="relative rounded-2xl border border-blue-500/25 bg-[#0A1224]/90 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(37,99,235,0.15)] group transition-transform duration-500 hover:rotate-1 hover:scale-[1.01]">

              {/* Browser Chrome Header */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#060B18] rounded-t-xl border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                {/* URL Bar */}
                <div className="flex-1 ml-4 flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-md px-2.5 py-1 text-[11px] text-slate-400 font-mono">
                  <span className="text-blue-400">https://</span>
                  <span>app.nexodigital.co</span>
                </div>
              </div>

              {/* Área de Visualización del Dashboard */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#0c162d] to-[#070d1b] rounded-b-xl overflow-hidden flex items-center justify-center">

                {/* Imagen del Dashboard */}
                <img
                  src="assets/Dashboard.png"
                  alt="Vista previa del Dashboard"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Si no encuentra la imagen local, muestra un placeholder de alta fidelidad
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />

                {/* Fallback Mockup UI si no carga la imagen */}
                <div className="hidden absolute inset-0 z-0 p-5 flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="text-blue-400" size={16} />
                      <span className="text-xs font-semibold text-slate-300">Consola NexoSync</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      v2.4 Online
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-auto">
                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] uppercase text-slate-400 font-bold">Ventas Mes</div>
                      <div className="text-lg font-black text-white mt-1">$ 14,850,000</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] uppercase text-slate-400 font-bold">Órdenes Activas</div>
                      <div className="text-lg font-black text-blue-400 mt-1">128 pedidos</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>PostgreSQL & Cloudflare R2 Conectados</span>
                  </div>
                </div>

                {/* Scanline interactivo */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-blue-500/[0.04] to-transparent bg-[length:100%_8px]" />

                {/* Brillo inferior reflectante */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;