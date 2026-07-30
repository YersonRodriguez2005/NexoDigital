import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react'; // Importamos el icono para cerrar el modal

const TermsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verificamos si ya aceptó los términos
    const hasAccepted = localStorage.getItem('nexo_terms_accepted');
    
    if (!hasAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nexo_terms_accepted', 'true');
    setIsVisible(false);
  };

  const openTerms = (e) => {
    e.preventDefault(); // Evitamos que el navegador salte hacia arriba (href="#")
    setShowModal(true);
  };

  // Bloquear el scroll de la página cuando el modal esté abierto
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  return (
    <>
      <style>{`
        /* ── ANIMACIONES BÁSICAS ── */
        @keyframes slideUpBanner {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* ── BANNER FLOTANTE (Corregido) ── */
        .tb-overlay {
          position: fixed;
          bottom: 20px;
          /* MENTOR TIP: Centrado infalible que no choca con transformaciones */
          left: 0;
          right: 0;
          margin: 0 auto;
          z-index: 10000;
          width: 90%;
          max-width: 800px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(37, 99, 235, 0.3);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset;
          animation: slideUpBanner 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .tb-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0;
        }

        .tb-text button.link-btn {
          background: none;
          border: none;
          padding: 0;
          color: #60a5fa;
          text-decoration: underline;
          text-decoration-color: rgba(96,165,250,0.4);
          text-underline-offset: 3px;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          transition: color 0.2s;
        }

        .tb-text button.link-btn:hover {
          color: #93c5fd;
        }

        .tb-btn {
          background: #2563EB;
          color: white;
          border: none;
          padding: 0.625rem 1.5rem;
          border-radius: 10px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
        }

        .tb-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .tb-overlay {
            flex-direction: column;
            text-align: center;
            bottom: 10px;
            padding: 1.25rem;
          }
          .tb-btn { width: 100%; }
        }

        /* ── MODAL DE TÉRMINOS ── */
        @keyframes tmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes tmSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .tm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100000; /* Muy alto para tapar el Navbar */
          background: rgba(7, 14, 30, 0.8);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: tmFadeIn 0.3s ease;
        }

        .tm-modal {
          background: #0f172a;
          border: 1px solid rgba(37, 99, 235, 0.3);
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: tmSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .tm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(15, 23, 42, 0.95);
        }

        .tm-header h3 {
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
        }

        .tm-close {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        
        .tm-close:hover { 
          color: #f8fafc;
          transform: rotate(90deg);
        }

        .tm-body {
          padding: 2rem;
          overflow-y: auto;
          color: #94a3b8;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.7;
        }

        .tm-body h4 {
          color: #e2e8f0;
          font-family: 'Montserrat', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          margin: 1.5rem 0 0.5rem;
        }
        
        .tm-body h4:first-child { margin-top: 0; }
        .tm-body p { margin-bottom: 1rem; }
        .tm-body ul { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .tm-body li { margin-bottom: 0.5rem; }

        /* Custom Scrollbar for modal */
        .tm-body::-webkit-scrollbar { width: 6px; }
        .tm-body::-webkit-scrollbar-track { background: transparent; }
        .tm-body::-webkit-scrollbar-thumb { background: rgba(37, 99, 235, 0.3); border-radius: 4px; }
        .tm-body::-webkit-scrollbar-thumb:hover { background: rgba(37, 99, 235, 0.6); }
      `}</style>

      {/* ── BANNER DE COOKIES ── */}
      {isVisible && !showModal && (
        <div className="tb-overlay">
          <p className="tb-text">
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia en Nexo Digital. 
            Al continuar navegando o adquirir nuestros servicios, aceptas nuestros{' '}
            <button className="link-btn" onClick={openTerms}>
              Términos, Condiciones y Políticas de Privacidad
            </button>.
          </p>
          <button className="tb-btn" onClick={handleAccept}>
            Entendido y Acepto
          </button>
        </div>
      )}

      {/* ── MODAL DE TÉRMINOS Y CONDICIONES ── */}
      {showModal && (
        <div className="tm-backdrop" onClick={() => setShowModal(false)}>
          <div className="tm-modal" onClick={(e) => e.stopPropagation()}>
            
            <div className="tm-header">
              <h3>Políticas y Términos Legales</h3>
              <button className="tm-close" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="tm-body">
              <p>Última actualización: <strong>{new Date().toLocaleDateString('es-CO')}</strong></p>
              
              <h4>1. Aceptación de los Términos</h4>
              <p>Al acceder y utilizar el sitio web de Nexo Digital, usted acepta estar sujeto a estos Términos y Condiciones, así como a todas las leyes y regulaciones aplicables en el territorio colombiano. Si no está de acuerdo con alguno de estos términos, tiene prohibido utilizar o acceder a este sitio.</p>

              <h4>2. Uso de Licencias de Software (Modelo SaaS)</h4>
              <p>Al adquirir una solución de software de nuestro catálogo, el usuario acepta que:</p>
              <ul>
                <li>El pago inicial corresponde a la configuración, parametrización y puesta en marcha del software (Setup).</li>
                <li>El pago de la cuota mensual (ej. $35.000 COP) cubre los costos de servidor en la nube (Hosting), mantenimiento de bases de datos y soporte técnico estándar.</li>
                <li>El incumplimiento en el pago de la cuota mensual después de 5 días hábiles de la fecha de corte puede resultar en la suspensión temporal del servicio.</li>
                <li>El código fuente de las plataformas en modelo SaaS es propiedad intelectual de Nexo Digital, otorgando al cliente una licencia de uso intransferible mientras el servicio esté activo.</li>
              </ul>

              <h4>3. Política de Privacidad y Manejo de Datos</h4>
              <p>En cumplimiento con la Ley 1581 de 2012 (Ley de Protección de Datos Personales en Colombia), garantizamos que:</p>
              <ul>
                <li>Los datos ingresados en nuestros formularios (nombre, empresa, teléfono) serán utilizados exclusivamente para contacto comercial y envío de cotizaciones.</li>
                <li>No compartimos, vendemos ni alquilamos bases de datos a terceros bajo ninguna circunstancia.</li>
                <li>Las bases de datos gestionadas a través del software adquirido por el cliente son propiedad exclusiva del cliente. Nexo Digital actúa únicamente como encargado del tratamiento para fines de alojamiento y respaldo (Backups).</li>
              </ul>

              <h4>4. Cookies</h4>
              <p>Este sitio web utiliza "cookies" para mejorar la experiencia del usuario (por ejemplo, recordar si ya cerró este aviso o guardar preferencias de sesión). Usted puede configurar su navegador para rechazar todas las cookies, sin embargo, algunas funciones del sitio pueden no funcionar correctamente.</p>

              <h4>5. Modificaciones</h4>
              <p>Nexo Digital puede revisar y actualizar estos términos de servicio en cualquier momento sin previo aviso. Al utilizar este sitio web, usted acepta estar sujeto a la versión actual de estos Términos y Condiciones.</p>
              
              <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
                Para dudas o consultas legales, contáctenos a <strong>rodriguezyerson2005@gmail.com</strong>
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default TermsBanner;