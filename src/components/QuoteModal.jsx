import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Store,
  Sprout,
  Briefcase,
  GraduationCap,
  Globe,
  LayoutDashboard,
  Smartphone,
  Layers,
  Check,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Zap,
  Clock,
  Calendar,
  Calculator,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

// ─── Datos de Configuración (Precios intactos) ────────────────────────────────

const BUSINESS_TYPES = [
  {
    id: 'comercio',
    title: 'Comercio / Restaurante / Tienda',
    desc: 'Minimarkets, comidas rápidas, moda, ferreterías o puntos físicos.',
    icon: Store,
    recommendedSaas: { name: 'InvenSync', price: '$15.000 / mes', setup: '$0' },
  },
  {
    id: 'agro',
    title: 'Sector Agro / Finca Cafetera',
    desc: 'Pesadas diarias, control de cosechas, cuadrillas y nómina rural.',
    icon: Sprout,
    recommendedSaas: { name: 'CosechaSync', price: '$20.000 pago único', setup: 'Licencia vitalicia' },
  },
  {
    id: 'servicios',
    title: 'Servicios / Empresa / Consultoría',
    desc: 'Clínicas, agencias, firmas, logística o gestión integral de clientes.',
    icon: Briefcase,
  },
  {
    id: 'educacion',
    title: 'Educación / Proyecto / Startup',
    desc: 'Plataformas formativas, herramientas personales o nuevas ideas SaaS.',
    icon: GraduationCap,
    recommendedSaas: { name: 'StudySync', price: '$29.900 semestre', setup: 'Acceso inmediato' },
  },
];

const PLATFORM_TYPES = [
  {
    id: 'landing',
    title: 'Página Web / Catálogo Digital',
    desc: 'Presencia profesional en Google con catálogo interactivo y pedidos directos a WhatsApp.',
    basePrice: 80000,
    delivery: '3 a 5 días',
    icon: Globe,
  },
  {
    id: 'webapp',
    title: 'Sistema Web de Gestión / POS',
    desc: 'Panel administrativo con base de datos privada, caja rápida, usuarios e inventarios.',
    basePrice: 120000,
    delivery: '1 a 2 semanas',
    icon: LayoutDashboard,
  },
  {
    id: 'mobile',
    title: 'Aplicación Móvil (Android / PWA)',
    desc: 'App instalable en smartphones optimizada para trabajo en terreno o uso sin fricción.',
    basePrice: 150000,
    delivery: '2 semanas',
    icon: Smartphone,
  },
  {
    id: 'fullstack',
    title: 'Ecosistema Completo (Web + App)',
    desc: 'Plataforma en la nube sincronizada en tiempo real con aplicación móvil dedicada.',
    basePrice: 250000,
    delivery: '2 a 3 semanas',
    icon: Layers,
  },
];

const EXTRA_MODULES = [
  {
    id: 'pos_inventario',
    title: 'Inventario y Caja Rápida (POS)',
    desc: 'Alertas de stock bajo, lectura de códigos de barras y arqueo de caja diario.',
    price: 25000,
  },
  {
    id: 'clientes_nomina',
    title: 'Cuentas por Cobrar / Nómina',
    desc: 'Registro de créditos a clientes, abonos parciales o pagos a trabajadores.',
    price: 20000,
  },
  {
    id: 'reportes_pdf',
    title: 'Recibos PDF y Gráficas de Ventas',
    desc: 'Comprobantes profesionales listos para enviar por WhatsApp y reportes financieros.',
    price: 15000,
  },
  {
    id: 'modo_offline',
    title: 'Modo Sin Internet (Offline-First)',
    desc: 'Permite registrar operaciones en zonas rurales y sincronizar al recuperar señal.',
    price: 20000,
  },
];

const URGENCY_LEVELS = [
  {
    id: 'urgente',
    title: 'Prioridad Inmediata',
    desc: 'Despliegue acelerado para poner en marcha el software esta misma semana.',
    multiplier: 0.80,
    badge: 'Prioridad Alta',
    icon: Zap,
  },
  {
    id: 'normal',
    title: 'Plazo Estándar (2 a 3 semanas)',
    desc: 'Tiempo ideal para planificación, desarrollo a medida y pruebas de usuario.',
    multiplier: 0.70,
    badge: 'Recomendado',
    icon: Calendar,
  },
  {
    id: 'flexible',
    title: 'Planificación Flexible',
    desc: 'Sin urgencia inmediata. Diseñado para conseguir la mejor tarifa de lanzamiento.',
    multiplier: 0.60,
    badge: 'Máximo Ahorro',
    icon: Clock,
  },
];

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

// ─── Componente Modal ─────────────────────────────────────────────────────────

const QuoteModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    business: null,
    platform: null,
    modules: [],
    urgency: null,
  });

  // Bloquear el scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cierre con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Transiciones de selección con avance automático fluido
  const handleSelectBusiness = (item) => {
    setSelections((prev) => ({ ...prev, business: item }));
    setTimeout(() => setStep(2), 240);
  };

  const handleSelectPlatform = (item) => {
    setSelections((prev) => ({ ...prev, platform: item }));
    setTimeout(() => setStep(3), 240);
  };

  const handleToggleModule = (modId) => {
    setSelections((prev) => {
      const exists = prev.modules.includes(modId);
      return {
        ...prev,
        modules: exists
          ? prev.modules.filter((id) => id !== modId)
          : [...prev.modules, modId],
      };
    });
  };

  const handleSelectUrgency = (item) => {
    setSelections((prev) => ({ ...prev, urgency: item }));
    setTimeout(() => setStep(5), 260);
  };

  const handleReset = () => {
    setSelections({ business: null, platform: null, modules: [], urgency: null });
    setStep(1);
  };

  // Cálculo de la cotización
  const calculateQuote = () => {
    if (!selections.platform) return { min: 0, max: 0, exact: 0 };

    const base = selections.platform.basePrice;
    const modulesTotal = selections.modules.reduce((acc, modId) => {
      const found = EXTRA_MODULES.find((m) => m.id === modId);
      return acc + (found ? found.price : 0);
    }, 0);

    const multiplier = selections.urgency ? selections.urgency.multiplier : 1;
    const rawTotal = (base + modulesTotal) * multiplier;

    const exact = Math.round(rawTotal / 5000) * 5000;
    const min = Math.round((exact * 0.9) / 5000) * 5000;
    const max = Math.round((exact * 1.1) / 5000) * 5000;

    return { min, max, exact };
  };

  const quote = calculateQuote();

  const handleSendWhatsApp = () => {
    const WHATSAPP_NUMBER = '573216393715';
    const selectedModulesNames = selections.modules
      .map((id) => EXTRA_MODULES.find((m) => m.id === id)?.title)
      .filter(Boolean);

    const modulesText =
      selectedModulesNames.length > 0
        ? selectedModulesNames.map((m) => `  • ${m}`).join('\n')
        : '  • Funciones esenciales de base';

    const message =
      `¡Hola, *Nexo Digital*! 👋\n\n` +
      `Acabo de realizar una cotización en su web:\n\n` +
      `🏢 *Sector:* ${selections.business?.title}\n` +
      `💻 *Tipo de Solución:* ${selections.platform?.title}\n` +
      `🧩 *Módulos incluidos:*\n${modulesText}\n` +
      `⏱️ *Plazo deseado:* ${selections.urgency?.title}\n\n` +
      `💰 *Presupuesto Estimado:* ${formatCOP(quote.exact)} COP\n\n` +
      `Me gustaría recibir asesoría para iniciar.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const progressPercentage = Math.min((step / 4) * 100, 100);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#070E1E] w-full max-w-4xl max-h-[92vh] rounded-[28px] border border-blue-500/25 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-slate-300 font-['Inter',sans-serif]"
      >
        {/* Glow de fondo ambiental interno */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* ─── Encabezado Principal ─── */}
        <header className="sticky top-0 z-20 bg-[#070E1E]/90 backdrop-blur-xl px-6 py-5 sm:px-10 border-b border-slate-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-sm shadow-blue-500/10 shrink-0">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-black text-lg sm:text-xl text-white tracking-tight leading-tight">
                Cotizador Interactivo
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-normal">
                Calcula tu presupuesto estimado en 30 segundos
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all duration-200 focus:outline-none"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </header>

        {/* ─── Barra de Progreso Despejada ─── */}
        {step <= 4 && (
          <div className="px-6 sm:px-10 pt-6 pb-2">
            <div className="flex items-center justify-between text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-wider mb-2.5">
              <span className="text-blue-400">Paso {step} de 4</span>
              <span className="text-slate-500">{Math.round(progressPercentage)}% Completado</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900/80 rounded-full overflow-hidden border border-slate-800/60">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* ─── Contenedor del Asistente con Scroll ─── */}
        <div className="overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 space-y-8 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-slate-950">
          
          {/* ─── PASO 1: SECTOR DEL NEGOCIO ─── */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <h4 className="font-['Montserrat',sans-serif] font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  ¿A qué sector pertenece tu negocio o proyecto?
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Selecciona tu industria para sugerirte las funciones más rentables y eficientes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {BUSINESS_TYPES.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selections.business?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectBusiness(item)}
                      className={`group relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 hover:-translate-y-1 ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500 shadow-xl shadow-blue-500/10'
                          : 'bg-slate-900/40 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-black/40'
                      }`}
                    >
                      {/* Icono con contenedor amplio */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                            : 'bg-slate-950 border border-slate-800/90 text-blue-400 group-hover:border-blue-500/40 group-hover:scale-105'
                        }`}
                      >
                        <Icon size={22} />
                      </div>

                      {/* Textos de la tarjeta */}
                      <div className="flex-1 pr-6">
                        <h5 className="font-['Montserrat',sans-serif] font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-xs sm:text-[13px] text-slate-400 mt-1.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Radio Selector Visual */}
                      <div
                        className={`absolute top-5 right-5 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-600 text-white'
                            : 'border-slate-700 bg-slate-950/60 group-hover:border-slate-500'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── PASO 2: TIPO DE SOLUCIÓN ─── */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <h4 className="font-['Montserrat',sans-serif] font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  ¿Qué plataforma o herramienta necesitas?
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Elige la base tecnológica donde operará tu sistema.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {PLATFORM_TYPES.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selections.platform?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectPlatform(item)}
                      className={`group relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-5 hover:-translate-y-1 ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500 shadow-xl shadow-blue-500/10'
                          : 'bg-slate-900/40 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-black/40'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                              : 'bg-slate-950 border border-slate-800/90 text-blue-400 group-hover:border-blue-500/40 group-hover:scale-105'
                          }`}
                        >
                          <Icon size={22} />
                        </div>

                        <div className="flex-1 pr-6">
                          <h5 className="font-['Montserrat',sans-serif] font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                            {item.title}
                          </h5>
                          <p className="text-xs sm:text-[13px] text-slate-400 mt-1.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        <div
                          className={`absolute top-5 right-5 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-600 text-white'
                              : 'border-slate-700 bg-slate-950/60 group-hover:border-slate-500'
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>

                      <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between w-full text-xs">
                        <span className="text-slate-500 font-medium">
                          Entrega aprox: <strong className="text-slate-300 font-semibold">{item.delivery}</strong>
                        </span>
                        <span className="font-['Montserrat',sans-serif] font-extrabold text-emerald-400 text-sm">
                          Desde {formatCOP(item.basePrice)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} /> Volver al paso anterior
                </button>
              </div>
            </div>
          )}

          {/* ─── PASO 3: MÓDULOS ESPECIALES (Multi-selección) ─── */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <h4 className="font-['Montserrat',sans-serif] font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  ¿Qué funciones adicionales te gustaría incluir?
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Puedes seleccionar las que necesites o continuar para dejar únicamente la base esencial.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
                {EXTRA_MODULES.map((mod) => {
                  const isChecked = selections.modules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => handleToggleModule(mod.id)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/10'
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                            isChecked
                              ? 'bg-blue-600 border-blue-500 text-white shadow-sm shadow-blue-600/40'
                              : 'bg-slate-950 border-slate-700 text-transparent'
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <div>
                          <h5 className="font-['Montserrat',sans-serif] font-bold text-sm sm:text-base text-white">
                            {mod.title}
                          </h5>
                          <p className="text-xs sm:text-[13px] text-slate-400 mt-0.5 leading-relaxed">
                            {mod.desc}
                          </p>
                        </div>
                      </div>

                      <span className="font-['Montserrat',sans-serif] text-xs sm:text-sm font-extrabold text-blue-400 shrink-0 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        + {formatCOP(mod.price)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} /> Atrás
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5"
                >
                  <span>Siguiente Paso</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ─── PASO 4: PLAZO Y URGENCIA ─── */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <h4 className="font-['Montserrat',sans-serif] font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  ¿Para cuándo te gustaría tener listo el proyecto?
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Último paso para generar tu presupuesto estimado.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {URGENCY_LEVELS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selections.urgency?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectUrgency(item)}
                      className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-5 hover:-translate-y-1 ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500 shadow-xl shadow-blue-500/10'
                          : 'bg-slate-900/40 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/80'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400">
                            <Icon size={20} />
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-['Montserrat',sans-serif] font-bold text-blue-400 uppercase tracking-wider">
                            {item.badge}
                          </span>
                        </div>
                        <h5 className="font-['Montserrat',sans-serif] font-bold text-sm sm:text-base text-white">
                          {item.title}
                        </h5>
                        <p className="text-xs sm:text-[13px] text-slate-400 mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} /> Volver a módulos
                </button>
              </div>
            </div>
          )}

          {/* ─── PASO 5: RESULTADO DE LA COTIZACIÓN ─── */}
          {step === 5 && (
            <div className="space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-300">
              <div className="text-center border-b border-slate-800/80 pb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-wider mb-2.5">
                  <Sparkles size={13} /> Presupuesto Estimado
                </span>
                <h4 className="font-['Montserrat',sans-serif] font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Inversión Aproximada de tu Solución
                </h4>
              </div>

              {/* Caja de Inversión Principal */}
              <div className="bg-gradient-to-br from-blue-950/60 via-slate-900/90 to-indigo-950/60 border border-blue-500/35 rounded-3xl p-6 sm:p-8 text-center shadow-xl shadow-blue-950/50">
                <div className="text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-widest text-blue-400 mb-2">
                  Valor Estimado de Desarrollo
                </div>
                <div className="font-['Montserrat',sans-serif] font-black text-4xl sm:text-5xl text-white tracking-tight tabular-nums">
                  {formatCOP(quote.exact)}{' '}
                  <span className="text-base sm:text-lg font-bold text-slate-400">COP</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Rango según especificaciones finales: {formatCOP(quote.min)} – {formatCOP(quote.max)} COP
                </p>

                <div className="mt-5 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                    <span>50% inicio / 50% contra entrega</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                    <span>Instalación, despliegue y soporte incluidos</span>
                  </span>
                </div>
              </div>

              {/* Alternativa Inmediata (Cross-sell) */}
              {selections.business?.recommendedSaas && (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                  <div className="space-y-1">
                    <span className="text-xs font-['Montserrat',sans-serif] font-extrabold uppercase tracking-wider text-emerald-400 block">
                      💡 Alternativa Pre-construida de Entrega Inmediata
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      Ya contamos con <strong>{selections.business.recommendedSaas.name}</strong> listo para tu sector por solo{' '}
                      <strong>{selections.business.recommendedSaas.price}</strong>.
                    </p>
                  </div>
                  <a
                    href="#productos"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-['Montserrat',sans-serif] text-xs font-extrabold uppercase tracking-wider shrink-0 transition-colors"
                  >
                    Ver en Catálogo
                  </a>
                </div>
              )}

              {/* Resumen de Selecciones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] font-['Montserrat',sans-serif] font-bold uppercase text-slate-500 block">
                    Sector
                  </span>
                  <span className="font-bold text-white text-sm mt-1 block truncate">
                    {selections.business?.title}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] font-['Montserrat',sans-serif] font-bold uppercase text-slate-500 block">
                    Plataforma
                  </span>
                  <span className="font-bold text-white text-sm mt-1 block truncate">
                    {selections.platform?.title}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] font-['Montserrat',sans-serif] font-bold uppercase text-slate-500 block">
                    Módulos Extras
                  </span>
                  <span className="font-bold text-blue-400 text-sm mt-1 block">
                    {selections.modules.length > 0 ? `${selections.modules.length} seleccionados` : 'Base esencial'}
                  </span>
                </div>
              </div>

              {/* Botones Finales */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <RotateCcw size={15} />
                  <span>Volver a Cotizar</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-['Montserrat',sans-serif] text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all"
                >
                  <MessageSquare size={17} />
                  <span>Solicitar esta Cotización por WhatsApp</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
};

export default QuoteModal;