import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const EMAILJS_CONFIG = {
  serviceId:  'service_zpg94id',
  templateId: 'template_1optb2l',
  publicKey:  'Ftk4qAZNpwJm-U8YI',
};

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 1.5C6.96 1.5 4.5 3.96 4.5 7C4.5 11.5 10 18.5 10 18.5C10 18.5 15.5 11.5 15.5 7C15.5 3.96 13.04 1.5 10 1.5Z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 3.5C3 3.5 4.5 2 6 2C7.5 2 8.5 5 8.5 5L7 7C7 7 7.5 8.5 9 10C10.5 11.5 12 12 12 12L14 10.5C14 10.5 17 11.5 17 13C17 14.5 15.5 16 15.5 16C12 18 2 8 3 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 7L10 12L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconError = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5V8.5M8 11H8.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: <IconMapPin />,
    label: 'Ubicación Estratégica',
    value: 'Neiva, Huila, Colombia',
    color: '#818cf8',
  },
  {
    icon: <IconPhone />,
    label: 'Contacto Directo',
    value: '+57 321 639 3715',
    color: '#34d399',
  },
  {
    icon: <IconMail />,
    label: 'Correo Electrónico',
    value: 'rodriguezyerson2005@gmail.com',
    href: 'mailto:rodriguezyerson2005@gmail.com',
    color: '#60a5fa',
  },
];

const TRUST_ITEMS = [
  'Respuesta en menos de 2 horas',
  'Consulta sin costo',
  'Propuesta técnica en 48 h',
];

// ─── Main Component ───────────────────────────────────────────────────────────
const ContactSection = () => {
  const EMPTY_FORM = { nombre: '', empresa: '', telefono: '', mensaje: '' };
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus]     = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [inView, setInView]     = useState(false);
  const sectionRef              = useRef(null);

  // ── IntersectionObserver para animaciones ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Submit: envío real con EmailJS ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // Variables que coinciden con tu plantilla de EmailJS
    const templateParams = {
      nombre:   formData.nombre,
      empresa:  formData.empresa,
      telefono: formData.telefono || 'No proporcionado',
      mensaje:  formData.mensaje,
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      // ── Éxito ────────────────────────────────────────────────────────────
      setStatus('success');
      setFormData(EMPTY_FORM);

      await Swal.fire({
        title: '¡Mensaje enviado!',
        html: `
          <p style="color:#94a3b8;font-family:'Inter',sans-serif;font-size:0.9375rem;line-height:1.6">
            Gracias, <strong style="color:#fff">${formData.nombre}</strong>.<br>
            Recibimos tu solicitud y te contactaremos en
            <strong style="color:#10B981">menos de 2 horas</strong> 🚀
          </p>`,
        icon: 'success',
        confirmButtonColor: '#2563EB',
        confirmButtonText: 'Perfecto',
        background: '#0d1829',
        color: '#F8FAFC',
        iconColor: '#10B981',
        customClass: {
          popup:         'swal-nexo-popup',
          title:         'swal-nexo-title',
          confirmButton: 'swal-nexo-btn',
        },
      });

      setTimeout(() => setStatus('idle'), 5000);

    } catch (err) {
      // ── Error ────────────────────────────────────────────────────────────
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMsg('No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directamente.');

      await Swal.fire({
        title: 'Error al enviar',
        html: `
          <p style="color:#94a3b8;font-family:'Inter',sans-serif;font-size:0.9375rem;line-height:1.6">
            No pudimos entregar tu mensaje en este momento.<br><br>
            <span style="color:#f87171">Intenta de nuevo o contáctanos directamente por WhatsApp.</span>
          </p>`,
        icon: 'error',
        confirmButtonColor: '#2563EB',
        confirmButtonText: 'Entendido',
        background: '#0d1829',
        color: '#F8FAFC',
        iconColor: '#f87171',
        customClass: {
          popup:         'swal-nexo-popup',
          title:         'swal-nexo-title',
          confirmButton: 'swal-nexo-btn',
        },
      });

      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const isSending = status === 'sending';
  const isSuccess = status === 'success';
  const isError   = status === 'error';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

        @keyframes ctFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes ctSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes ctBounce {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes ctShake {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-4px); }
          40%      { transform: translateX(4px); }
          60%      { transform: translateX(-3px); }
          80%      { transform: translateX(3px); }
        }
        @keyframes ctProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* SweetAlert overrides */
        .swal-nexo-popup {
          border: 1px solid rgba(37,99,235,0.2) !important;
          border-radius: 20px !important;
        }
        .swal-nexo-title {
          font-family: 'Montserrat', sans-serif !important;
          font-weight: 800 !important;
          letter-spacing: -0.03em !important;
        }
        .swal-nexo-btn {
          font-family: 'Montserrat', sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.04em !important;
          border-radius: 10px !important;
          padding: 0.75rem 2rem !important;
        }

        /* ── Section ── */
        .ct-section {
          position: relative;
          background: #F1F5F9;
          padding: 120px 2rem;
          overflow: hidden;
        }
        .ct-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .ct-section::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #2563EB, transparent);
          opacity: 0.15;
          pointer-events: none;
        }

        .ct-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        /* ── Left ── */
        .ct-left { display: flex; flex-direction: column; gap: 2rem; }
        .ct-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          animation: ${inView ? 'ctFadeUp 0.6s 0ms both' : 'none'};
        }
        .ct-eyebrow-line {
          width: 28px; height: 2px; background: #2563EB;
          border-radius: 2px; transform-origin: left;
          animation: ${inView ? 'ctLineGrow 0.5s 0.1s both' : 'none'};
        }
        .ct-eyebrow-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          color: #2563EB; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .ct-h2 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900; font-size: clamp(1.75rem, 3vw, 2.5rem);
          line-height: 1.08; letter-spacing: -0.04em;
          color: #0F172A; margin: 0;
          animation: ${inView ? 'ctFadeUp 0.6s 100ms both' : 'none'};
        }
        .ct-h2 .accent { color: #2563EB; }
        .ct-desc {
          font-family: 'Inter', sans-serif;
          font-size: 1rem; line-height: 1.75; color: #64748b; margin: 0;
          animation: ${inView ? 'ctFadeUp 0.6s 200ms both' : 'none'};
        }

        .ct-info-list {
          display: flex; flex-direction: column; gap: 12px;
          animation: ${inView ? 'ctFadeUp 0.6s 300ms both' : 'none'};
        }
        .ct-info-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; background: #fff;
          border: 1px solid #e2e8f0; border-radius: 14px;
          text-decoration: none; cursor: default;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .ct-info-item:hover {
          border-color: rgba(37,99,235,0.2);
          box-shadow: 0 4px 16px rgba(37,99,235,0.06);
          transform: translateX(4px);
        }
        .ct-info-icon {
          width: 42px; height: 42px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ct-info-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6875rem; font-weight: 700;
          color: #94a3b8; letter-spacing: 0.07em;
          text-transform: uppercase; margin-bottom: 2px;
        }
        .ct-info-value {
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem; font-weight: 600; color: #0F172A;
        }

        .ct-trust {
          display: flex; flex-direction: column; gap: 8px;
          animation: ${inView ? 'ctFadeUp 0.6s 400ms both' : 'none'};
        }
        .ct-trust-item {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #64748b;
        }
        .ct-trust-icon {
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #10B981; flex-shrink: 0;
        }

        /* ── Form card ── */
        .ct-form-card {
          background: #fff; border-radius: 24px;
          border: 1px solid #e2e8f0; padding: 2.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.8) inset;
          animation: ${inView ? 'ctFadeUp 0.6s 150ms both' : 'none'};
          position: relative; overflow: hidden;
        }
        .ct-form-card::before {
          content: '';
          position: absolute; top: 0; left: 24px; right: 24px; height: 3px;
          background: linear-gradient(90deg, #2563EB, #818cf8);
          border-radius: 0 0 4px 4px;
        }

        .ct-form-header { margin-bottom: 1.75rem; }
        .ct-form-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800; font-size: 1.125rem;
          color: #0F172A; letter-spacing: -0.03em; margin: 0 0 6px;
        }
        .ct-form-subtitle {
          font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #94a3b8;
        }

        .ct-form { display: flex; flex-direction: column; gap: 1.125rem; }
        .ct-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .ct-field { display: flex; flex-direction: column; gap: 6px; }
        .ct-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6875rem; font-weight: 700;
          color: #475569; letter-spacing: 0.07em; text-transform: uppercase;
        }
        .ct-label .required { color: #f87171; margin-left: 2px; }
        .ct-input {
          width: 100%; padding: 0.75rem 1rem;
          font-family: 'Inter', sans-serif; font-size: 0.9375rem; color: #0F172A;
          background: #f8fafc; border: 1.5px solid #e2e8f0;
          border-radius: 12px; outline: none; resize: none; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .ct-input::placeholder { color: #94a3b8; font-size: 0.875rem; }
        .ct-input:focus {
          border-color: #2563EB; background: #fff;
          box-shadow: 0 0 0 4px rgba(37,99,235,0.08);
        }
        .ct-input:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── Submit button ── */
        .ct-submit {
          position: relative; width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 1rem 2rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.875rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #fff; border: none; border-radius: 14px;
          cursor: pointer; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, background 0.3s;
          margin-top: 0.25rem;
        }
        .ct-submit::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        }
        .ct-submit.idle {
          background: #2563EB;
          box-shadow: 0 4px 20px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .ct-submit.idle:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37,99,235,0.45), inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .ct-submit.sending {
          background: #1d4ed8; cursor: not-allowed;
        }
        .ct-submit.success {
          background: #059669;
          box-shadow: 0 4px 20px rgba(5,150,105,0.35);
          animation: ctBounce 0.4s both;
        }
        .ct-submit.error {
          background: #dc2626;
          box-shadow: 0 4px 20px rgba(220,38,38,0.35);
          animation: ctShake 0.4s both;
        }
        .ct-submit:active { transform: translateY(0); }

        /* Barra de progreso dentro del botón */
        .ct-submit-progress {
          position: absolute; bottom: 0; left: 0; height: 3px;
          background: rgba(255,255,255,0.35); border-radius: 0 0 14px 14px;
          animation: ctProgress 1.8s ease-out forwards;
        }

        /* Spinner */
        .ct-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: ctSpin 0.7s linear infinite;
        }

        /* Error banner */
        .ct-error-banner {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px;
          background: rgba(220,38,38,0.06);
          border: 1px solid rgba(220,38,38,0.2);
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem; color: #dc2626; line-height: 1.5;
          animation: ctBounce 0.3s both;
        }
        .ct-error-icon { flex-shrink: 0; margin-top: 1px; }

        /* Footer note */
        .ct-note {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          margin-top: 0.875rem;
          font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #94a3b8;
        }
        .ct-note-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #10B981; flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ct-inner { grid-template-columns: 1fr; gap: 3rem; }
          .ct-section { padding: 80px 1.5rem; }
        }
        @media (max-width: 520px) {
          .ct-field-row { grid-template-columns: 1fr; }
          .ct-form-card { padding: 1.75rem; }
        }
      `}</style>

      <section id="soluciones" className="ct-section" ref={sectionRef}>
        <div className="ct-inner">

          {/* ── LEFT ── */}
          <div className="ct-left">
            <div className="ct-eyebrow">
              <div className="ct-eyebrow-line" />
              <span className="ct-eyebrow-text">Contacto</span>
            </div>

            <h2 className="ct-h2">
              Construyamos el sistema que tu empresa{' '}
              <span className="accent">necesita</span>
            </h2>

            <p className="ct-desc">
              ¿Necesitas una plataforma web, un sistema embebido o automatizar
              tus procesos? Cuéntanos tu reto y diseñaremos una arquitectura a tu medida.
            </p>

            <div className="ct-info-list">
              {CONTACT_INFO.map((item, i) => (
                <a key={i} href={item.href || undefined}
                  className="ct-info-item" style={{ textDecoration: 'none' }}>
                  <div className="ct-info-icon" style={{
                    background: `${item.color}14`,
                    color: item.color,
                    border: `1px solid ${item.color}28`,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="ct-info-label">{item.label}</p>
                    <p className="ct-info-value">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="ct-trust">
              {TRUST_ITEMS.map((text, i) => (
                <div key={i} className="ct-trust-item">
                  <div className="ct-trust-icon"><IconCheck /></div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div className="ct-form-card">
            <div className="ct-form-header">
              <h3 className="ct-form-title">Envía tu requerimiento</h3>
              <p className="ct-form-subtitle">
                Recibiremos tu mensaje directamente en nuestro correo
              </p>
            </div>

            <form className="ct-form" onSubmit={handleSubmit}>

              {/* Nombre + Empresa */}
              <div className="ct-field-row">
                <div className="ct-field">
                  <label className="ct-label">
                    Nombre <span className="required">*</span>
                  </label>
                  <input
                    className="ct-input" type="text" name="nombre"
                    value={formData.nombre} onChange={handleChange}
                    placeholder="Ej. Juan Pérez" required disabled={isSending}
                  />
                </div>
                <div className="ct-field">
                  <label className="ct-label">
                    Empresa <span className="required">*</span>
                  </label>
                  <input
                    className="ct-input" type="text" name="empresa"
                    value={formData.empresa} onChange={handleChange}
                    placeholder="Ej. Distribuidora Huila" required disabled={isSending}
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="ct-field">
                <label className="ct-label">Teléfono de contacto</label>
                <input
                  className="ct-input" type="tel" name="telefono"
                  value={formData.telefono} onChange={handleChange}
                  placeholder="Ej. +57 300 000 0000" disabled={isSending}
                />
              </div>

              {/* Mensaje */}
              <div className="ct-field">
                <label className="ct-label">
                  ¿Qué solución necesitas? <span className="required">*</span>
                </label>
                <textarea
                  className="ct-input" name="mensaje"
                  value={formData.mensaje} onChange={handleChange}
                  rows={4} required disabled={isSending}
                  placeholder="Describe brevemente el problema que quieres resolver..."
                />
              </div>

              {/* Error inline */}
              {isError && errorMsg && (
                <div className="ct-error-banner">
                  <span className="ct-error-icon"><IconError /></span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className={`ct-submit ${status}`}
                disabled={isSending}
              >
                {isSending && <div className="ct-submit-progress" />}

                {isSending && (
                  <><div className="ct-spinner" /><span>Enviando mensaje...</span></>
                )}
                {isSuccess && (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>¡Mensaje enviado!</span>
                  </>
                )}
                {isError && (
                  <><IconError /><span>Error — intenta de nuevo</span></>
                )}
                {status === 'idle' && (
                  <><IconSend /><span>Enviar mensaje</span></>
                )}
              </button>
            </form>

            {/* Footer note */}
            <div className="ct-note">
              <div className="ct-note-dot" />
              <span>Tu mensaje llegará directamente a nuestro correo</span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default ContactSection;