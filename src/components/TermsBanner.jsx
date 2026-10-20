import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ShieldCheck,
  FileText,
  Cookie,
  CheckCircle2,
  ExternalLink,
  Lock,
  Smartphone,
  Server,
} from 'lucide-react';

const TermsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Comprobar consentimiento previo en el navegador
  useEffect(() => {
    const hasAccepted = localStorage.getItem('nexo_terms_accepted');
    if (!hasAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Bloquear el scroll del fondo cuando el modal esté abierto
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Cerrar modal al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nexo_terms_accepted', 'true');
    setIsVisible(false);
  };

  const openTerms = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  // Renderizado mediante Portal directo en document.body
  return createPortal(
    <>
      {/* ─── 1. BANNER FLOTANTE INFERIOR ─── */}
      {isVisible && !showModal && (
        <aside
          role="region"
          aria-label="Aviso de privacidad y cookies"
          className="fixed bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[9990] w-auto max-w-2xl bg-[#091124]/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)_inset] animate-in fade-in slide-in-from-bottom-6 duration-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <ShieldCheck size={20} />
            </div>
            
            <p className="font-['Inter',sans-serif] text-xs sm:text-[13px] text-slate-300 leading-relaxed">
              En <strong className="text-white font-semibold">Nexo Digital</strong> utilizamos cookies y almacenamiento local para optimizar tu experiencia y gestionar las sesiones del sistema. Al navegar o contratar servicios, aceptas nuestros{' '}
              <button
                type="button"
                onClick={openTerms}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-400 font-semibold transition-colors focus:outline-none"
              >
                Términos, Condiciones y Tratamiento de Datos
              </button>.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAccept}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 shrink-0 focus:outline-none active:translate-y-0"
          >
            Aceptar y Continuar
          </button>
        </aside>
      )}

      {/* ─── 2. MODAL DE TÉRMINOS Y CONDICIONES LEGALES ─── */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-modal-title"
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-[10000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#0A1224] w-full max-w-3xl max-h-[88vh] rounded-3xl border border-blue-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-slate-300 font-['Inter',sans-serif]"
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-20 bg-[#070D1B]/95 backdrop-blur-md px-6 py-4.5 sm:px-8 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <FileText size={18} />
                </div>
                <div>
                  <h3
                    id="terms-modal-title"
                    className="font-['Montserrat',sans-serif] font-black text-lg sm:text-xl text-white tracking-tight"
                  >
                    Políticas y Términos Legales
                  </h3>
                  <span className="text-[11px] font-medium text-slate-500 block">
                    Nexo Digital · Neiva, Huila
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200 hover:rotate-90 focus:outline-none"
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cuerpo del Modal con Scroll */}
            <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-7 space-y-6 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-slate-900">
              
              {/* Fecha de actualización */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Última revisión: Octubre 2026 (Legislación Colombia)</span>
              </div>

              {/* Cláusula 1 */}
              <section className="space-y-2">
                <h4 className="font-['Montserrat',sans-serif] font-bold text-base text-white flex items-center gap-2">
                  <span className="text-blue-500">1.</span> Aceptación de los Términos
                </h4>
                <p className="text-slate-400">
                  Al acceder al portal de <strong className="text-slate-200">Nexo Digital</strong> o contratar el desarrollo de software a medida y licencias pre-construidas, usted acepta estar legalmente sujeto a estas condiciones conforme a las normas de comercio electrónico y derecho civil de la República de Colombia.
                </p>
              </section>

              {/* Cláusula 2 */}
              <section className="space-y-2.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <h4 className="font-['Montserrat',sans-serif] font-bold text-base text-white flex items-center gap-2">
                  <Server size={18} className="text-blue-400" />
                  <span>2. Licencias de Software Web (Modelo SaaS)</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <span><strong>Inversión Setup:</strong> Corresponde exclusivamente al aprovisionamiento, despliegue en servidor privado y configuración inicial de su empresa.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <span><strong>Membresía Mensual:</strong> Mantiene activos los recursos de base de datos cloud, respaldos periódicos, actualización de parches de seguridad y asistencia técnica.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <span><strong>Corte y Continuidad:</strong> Se otorga un periodo de gracia de 5 días hábiles tras la fecha de cobro antes de la suspensión temporal de los servicios alojados.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <span><strong>Propiedad Intelectual:</strong> La estructura y código fuente son propiedad exclusiva de Nexo Digital, otorgando una licencia de uso corporativa no transferible.</span>
                  </li>
                </ul>
              </section>

              {/* Cláusula 3 */}
              <section className="space-y-2.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <h4 className="font-['Montserrat',sans-serif] font-bold text-base text-white flex items-center gap-2">
                  <Smartphone size={18} className="text-emerald-400" />
                  <span>3. Aplicaciones Móviles y Descarga de Archivos (.APK)</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Para aplicaciones offline distribuidas mediante paquete instalable (.APK), el usuario autoriza la habilitación de orígenes seguros en su dispositivo Android.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Nexo Digital certifica que los binarios generados en sus repositorios oficiales están 100% libres de código malicioso o rastreadores no autorizados.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>En aplicaciones con arquitectura Offline-First (como CosechaSync), la integridad y respaldo físico de los datos en el terminal recae en el usuario administrador.</span>
                  </li>
                </ul>
              </section>

              {/* Cláusula 4 */}
              <section className="space-y-2">
                <h4 className="font-['Montserrat',sans-serif] font-bold text-base text-white flex items-center gap-2">
                  <Lock size={18} className="text-amber-400" />
                  <span>4. Privacidad y Protección de Datos (Ley 1581 de 2012)</span>
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm">
                  De acuerdo con el Régimen General de Protección de Datos Personales en Colombia, garantizamos que los datos recolectados mediante formularios o WhatsApp no serán compartidos, comercializados ni cedidos a terceros. La información operativa ingresada en los sistemas POS o paneles administrativos pertenece privativamente al cliente.
                </p>
              </section>

              {/* Cláusula 5 & Soporte Legal */}
              <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500 space-y-1">
                <p>Nexo Digital se reserva el derecho de actualización periódica para adaptaciones normativas.</p>
                <p>
                  Contacto legal directo:{' '}
                  <a
                    href="mailto:rodriguezyerson2005@gmail.com"
                    className="text-blue-400 hover:text-blue-300 font-medium underline"
                  >
                    rodriguezyerson2005@gmail.com
                  </a>
                </p>
              </div>

            </div>

            {/* Footer del Modal */}
            <div className="bg-[#070D1B] px-6 py-4 sm:px-8 border-t border-slate-800 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 hidden sm:inline-block">
                Documento contractual vinculante
              </span>
              <button
                type="button"
                onClick={() => {
                  handleAccept();
                  setShowModal(false);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-600/30 ml-auto"
              >
                Aceptar Términos y Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default TermsBanner;