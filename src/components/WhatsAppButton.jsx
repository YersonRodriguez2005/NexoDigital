import React, { useState, useEffect } from 'react';
import NexoLogo from '../assets/Logo1.png';

// ─── Configuración de Enlace ──────────────────────────────────────────────────
const WHATSAPP_NUMBER = '573216393715';
const DEFAULT_MESSAGE =
  '¡Hola, Nexo Digital! 👋 Me interesa cotizar un desarrollo de software a la medida para mi empresa.';

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [autoTooltip, setAutoTooltip] = useState(false);

  // Aparición suave con retardo tras la carga inicial
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Desactivar el halo de pulso tras 6 segundos para evitar fatiga visual
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Saludo automático interactivo en móvil/desktop (aparece a los 2.5s y se retira a los 7.5s)
  useEffect(() => {
    const showTimer = setTimeout(() => setAutoTooltip(true), 2500);
    const hideTimer = setTimeout(() => setAutoTooltip(false), 7500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  const isTooltipVisible = hovered || autoTooltip;

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-3 transition-all duration-500 ease-out ${
        visible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-75 pointer-events-none'
      }`}
    >
      {/* ─── TOOLTIP / BURBUJA DE CONVERSIÓN ─── */}
      <div
        className={`relative max-w-[260px] bg-[#0A1224]/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex items-center gap-3 transition-all duration-300 origin-bottom-right ${
          isTooltipVisible
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        {/* Avatar Oficial Nexo Digital */}
        <div className="relative w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
          <img
            src={NexoLogo}
            alt="Nexo Digital"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'block';
            }}
          />
          <span className="hidden font-['Montserrat',sans-serif] text-xs font-bold text-emerald-400">
            ND
          </span>
        </div>

        {/* Mensaje Contextual */}
        <div className="flex flex-col">
          <span className="font-['Montserrat',sans-serif] font-bold text-xs text-white leading-tight">
            Nexo Digital
          </span>
          <p className="font-['Inter',sans-serif] text-[11px] text-slate-300 leading-snug mt-0.5">
            ¿Tienes dudas o buscas cotizar? Escríbenos directamente.
          </p>
        </div>

        {/* Flecha indicadora inferior hacia el botón */}
        <span className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0A1224] border-r border-b border-emerald-500/30 rotate-45" />
      </div>

      {/* ─── BOTÓN FLOTANTE PRINCIPAL ─── */}
      <div className="relative flex items-center justify-center">
        {/* Anillos de pulso reactivos (primeros 6s) */}
        {showPulse && (
          <span className="absolute -inset-2 rounded-full bg-emerald-500/30 animate-ping pointer-events-none [animation-duration:2s]" />
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatear con un asesor de Nexo Digital por WhatsApp"
          title="Abrir WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(16,185,129,0.45)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/25 overflow-hidden"
        >
          {/* Reflejo superior estilo glassmorphism */}
          <div className="absolute top-1 inset-x-2 h-1/2 bg-white/20 rounded-full blur-[2px] pointer-events-none" />

          {/* Destello de luz diagonal al hacer hover */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

          {/* Icono Oficial WhatsApp Vectorial */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>

        {/* Indicador de Estado Activo (Punto verde online) */}
        <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#070E1E]" />
        </span>
      </div>
    </div>
  );
};

export default WhatsAppButton;