import React, { useState, useEffect } from 'react';

// ─── Config ───────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '573216393715'; // ⚠️ Cambia por tu número real
const DEFAULT_MESSAGE = 'Hola Nexo Digital 👋, me interesa cotizar un desarrollo de software a medida para mi empresa.';

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // Aparece después de 1.5s de carga
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Detiene el pulso tras 6s (no molesta indefinidamente)
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Inter:wght@400;500&display=swap');

        @keyframes waBounceIn {
          0%   { opacity: 0; transform: scale(0.4) translateY(20px); }
          60%  { transform: scale(1.1) translateY(-4px); }
          80%  { transform: scale(0.95) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes waPulseRing {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }

        @keyframes waFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }

        @keyframes waTooltipIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes waBadgePop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes waShine {
          0%   { left: -60%; }
          100% { left: 130%; }
        }

        /* ── Wrapper ── */
        .wa-wrapper {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          gap: 10px;
          animation: ${visible ? 'waBounceIn 0.6s cubic-bezier(0.16,1,0.3,1) both' : 'none'};
          opacity: ${visible ? 1 : 0};
        }

        /* ── Tooltip bubble ── */
        .wa-tooltip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: #0d1829;
          border: 1px solid rgba(37,211,102,0.2);
          border-radius: 14px;
          box-shadow:
            0 8px 32px rgba(0,0,0,0.4),
            0 0 0 1px rgba(255,255,255,0.03);
          animation: waTooltipIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
          position: relative;
          max-width: 240px;
        }

        /* Tail of the tooltip bubble */
        .wa-tooltip::after {
          content: '';
          position: absolute;
          right: 18px;
          bottom: -6px;
          width: 10px;
          height: 10px;
          background: #0d1829;
          border-right: 1px solid rgba(37,211,102,0.2);
          border-bottom: 1px solid rgba(37,211,102,0.2);
          transform: rotate(45deg);
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }

        .wa-tooltip-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25D366, #1a9e4b);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.15);
        }

        .wa-tooltip-content {}

        .wa-tooltip-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }

        .wa-tooltip-msg {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          color: #64748b;
          line-height: 1.4;
          margin-top: 1px;
        }

        /* ── Button ── */
        .wa-btn {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2ddf6e 0%, #25D366 50%, #1aaf55 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #fff;
          box-shadow:
            0 4px 24px rgba(37, 211, 102, 0.45),
            0 2px 8px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.25);
          transition:
            transform 0.25s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.25s ease;
          animation: waFloat 4s ease-in-out infinite;
          animation-delay: 2s;
          overflow: hidden;
          align-self: flex-end;
        }

        .wa-btn:hover {
          transform: scale(1.1) translateY(-3px);
          box-shadow:
            0 8px 36px rgba(37, 211, 102, 0.6),
            0 4px 12px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.3);
          animation-play-state: paused;
        }

        .wa-btn:active {
          transform: scale(0.96);
        }

        /* Shine sweep */
        .wa-btn-shine {
          position: absolute;
          top: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          animation: waShine 3s ease-in-out infinite;
          animation-delay: 3s;
          pointer-events: none;
        }

        /* Top highlight */
        .wa-btn::before {
          content: '';
          position: absolute;
          top: 4px;
          left: 8px;
          right: 8px;
          height: 40%;
          background: rgba(255,255,255,0.18);
          border-radius: 50%;
          filter: blur(4px);
          pointer-events: none;
        }

        /* ── Pulse rings ── */
        .wa-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(37, 211, 102, 0.5);
          animation: waPulseRing 2s ease-out infinite;
          pointer-events: none;
        }

        .wa-pulse-ring:nth-child(2) {
          animation-delay: 0.5s;
        }

        /* ── Online badge ── */
        .wa-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #10B981;
          border: 2.5px solid #070E1E;
          animation: waBadgePop 0.4s 2s cubic-bezier(0.16,1,0.3,1) both;
          z-index: 2;
        }

        .wa-badge::after {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
        }

        /* ── Icon ── */
        .wa-icon {
          position: relative;
          z-index: 1;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
        }

        .wa-btn:hover .wa-icon {
          transform: scale(1.12) rotate(-8deg);
        }
      `}</style>

      <div className="wa-wrapper">
        {/* Tooltip bubble — visible on hover */}
        {hovered && (
          <div className="wa-tooltip">
            <div className="wa-tooltip-avatar">ND</div>
            <div className="wa-tooltip-content">
              <p className="wa-tooltip-name">Nexo Digital</p>
              <p className="wa-tooltip-msg">¡Hola! ¿En qué te podemos ayudar?</p>
            </div>
          </div>
        )}

        {/* Main Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          aria-label="Chatear con Nexo Digital por WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Pulse rings (only show for first 6s) */}
          {showPulse && (
            <>
              <div className="wa-pulse-ring" />
              <div className="wa-pulse-ring" />
            </>
          )}

          {/* Online badge */}
          <div className="wa-badge" />

          {/* Shine sweep */}
          <div className="wa-btn-shine" />

          {/* WhatsApp SVG */}
          <svg
            className="wa-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;