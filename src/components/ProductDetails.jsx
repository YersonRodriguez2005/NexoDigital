// @src/components/ProductDetails.jsx
import React, { useEffect } from 'react';
import { X, LayoutTemplate, Store, Smartphone, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const ProductDetails = ({ product, onClose }) => {

  const handleBuyClick = () => {
    const WHATSAPP_NUMBER = '573216393715';

    // Mensaje mejorado para sonar más profesional y directo
    const message = `¡Hola, *Nexo Digital*! 👋\n\nEstoy interesado en adquirir el sistema *${product.title}* para mi negocio.\n\nHe visto el Plan Fundador:\n✅ *Setup (Único):* $${product.price} COP\n✅ *Mensualidad (SaaS):* $${product.monthlyFee} COP\n\nMe gustaría recibir más información y conocer los pasos para iniciar la instalación.`;

    const safeMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${safeMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  // Bloquear el scroll de fondo cuando el modal está abierto
  useEffect(() => {
    if (product) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [product]);

  if (!product) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        /* ── Overlay / Fondo oscuro ── */
        .pd-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem; animation: pdFadeIn 0.3s ease;
        }

        /* ── Modal Container ── */
        .pd-modal {
          background: #ffffff; width: 100%; max-width: 1050px; max-height: 90vh;
          border-radius: 24px; overflow-y: auto; overflow-x: hidden;
          position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: pdSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Header del Modal ── */
        .pd-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 2rem 2.5rem 1.5rem; border-bottom: 1px solid #f1f5f9;
          position: sticky; top: 0; background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px); z-index: 10;
        }
        .pd-title {
          font-family: 'Montserrat', sans-serif; font-weight: 900;
          font-size: 2.2rem; color: #0F172A; margin: 0 0 0.5rem 0; line-height: 1.1;
          letter-spacing: -0.03em;
        }
        .pd-close-btn {
          background: #f1f5f9; border: none; border-radius: 50%; width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          color: #64748b; cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .pd-close-btn:hover { background: #e2e8f0; color: #0F172A; transform: rotate(90deg); }

        /* ── Cuerpo del Modal ── */
        .pd-body { padding: 2rem 2.5rem; }

        /* ── Galería Horizontal ── */
        .pd-gallery-wrap { margin-bottom: 3rem; }
        .pd-gallery {
          display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 1rem;
          scroll-snap-type: x mandatory; scroll-behavior: smooth;
        }
        .pd-gallery::-webkit-scrollbar { height: 8px; }
        .pd-gallery::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
        .pd-gallery::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        
        .pd-gallery img {
          flex: 0 0 85%; max-width: 650px; height: 340px; object-fit: cover;
          border-radius: 16px; scroll-snap-align: center; border: 1px solid #e2e8f0;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }

        /* ── Grid de Información ── */
        .pd-info-grid {
          display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 3.5rem;
        }

        /* Columna Izquierda: Descripción y Beneficios */
        .pd-section-title {
          font-family: 'Montserrat', sans-serif; font-weight: 800;
          font-size: 1.3rem; color: #0F172A; margin: 0 0 1rem 0;
        }
        .pd-desc {
          font-family: 'Inter', sans-serif; font-size: 1.05rem; line-height: 1.7;
          color: #475569; margin-bottom: 2.5rem;
        }
        
        /* Lista de Beneficios (Checklist) */
        .pd-features-list {
          list-style: none; padding: 0; margin: 0 0 2.5rem 0;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .pd-features-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-family: 'Inter', sans-serif; font-size: 0.95rem; color: #334155; line-height: 1.5;
        }
        .pd-features-icon { color: #10B981; flex-shrink: 0; margin-top: 2px; }

        /* Badges para los targets */
        .pd-target-list { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .pd-target-item {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1rem; background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 12px; font-family: 'Inter', sans-serif;
          font-size: 0.85rem; font-weight: 600; color: #475569;
        }

        /* ── Columna Derecha: Checkout Sidebar ── */
        .pd-sidebar {
          background: #ffffff; padding: 2rem; border-radius: 20px;
          border: 2px solid #f1f5f9; height: fit-content;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
          position: sticky; top: 120px;
        }
        .pd-spec-row {
          display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem;
        }
        .pd-spec-icon { color: #2563EB; margin-top: 2px; }
        .pd-spec-label {
          font-family: 'Montserrat', sans-serif; font-size: 0.75rem;
          font-weight: 700; color: #94a3b8; text-transform: uppercase;
          letter-spacing: 0.05em; margin-bottom: 0.25rem;
        }
        .pd-spec-value {
          font-family: 'Inter', sans-serif; font-size: 0.95rem;
          font-weight: 700; color: #0F172A;
        }
        
        /* Caja de Precios */
        .pd-price-box { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; }
        
        .pd-price-anchor {
          font-family: 'Inter', sans-serif; font-size: 1rem; color: #64748b; font-weight: 500;
          margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
        }
        .pd-price-anchor s { color: #ef4444; font-weight: 600; }
        .pd-badge-oferta {
          background: #fef2f2; color: #ef4444; padding: 2px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700;
        }

        .pd-price-label { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #64748b; font-weight: 500; margin-bottom: 4px; }
        
        .pd-price { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 2.5rem; color: #0F172A; letter-spacing: -0.04em; margin-bottom: 8px; line-height: 1; }
        .pd-price span { font-size: 1.4rem; color: #94a3b8; vertical-align: top; margin-right: 2px;}
        .pd-price-currency { font-size: 1rem !important; margin-left: 4px; font-weight: 700;}
        
        .pd-monthly {
          font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 700; color: #10B981;
          margin-bottom: 1.5rem; background: #ecfdf5; padding: 10px 14px; border-radius: 12px;
          border: 1px solid #a7f3d0; display: block;
        }
        .pd-monthly-detail { display: block; font-size: 0.85rem; color: #059669; font-weight: 500; margin-top: 4px; line-height: 1.4;}

        /* Botón de compra grande */
        .pd-buy-btn {
          width: 100%; padding: 1.1rem; background: #2563EB; color: white;
          font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 1.05rem;
          border: none; border-radius: 12px; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-transform: uppercase; letter-spacing: 0.03em;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
          display: flex; justify-content: center; align-items: center; gap: 8px;
        }
        .pd-buy-btn:hover { background: #1d4ed8; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4); }

        /* Trust Badges */
        .pd-trust-badges {
          display: flex; justify-content: center; gap: 1.5rem; margin-top: 1.25rem;
        }
        .pd-trust-item {
          display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif;
          font-size: 0.75rem; color: #64748b; font-weight: 500;
        }
        .pd-trust-item svg { color: #94a3b8; }

        /* ── Animaciones ── */
        @keyframes pdFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pdSlideUp { from { opacity: 0; transform: translateY(40px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

        /* ── Responsive ── */
        @media (max-width: 992px) {
          .pd-info-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .pd-sidebar { position: static; }
        }
        @media (max-width: 768px) {
          .pd-header { padding: 1.5rem 1.5rem 1rem; }
          .pd-title { font-size: 1.75rem; }
          .pd-body { padding: 1.5rem; }
          .pd-gallery img { flex: 0 0 90%; height: 240px; }
        }
      `}</style>

      <div className="pd-overlay" onClick={onClose}>
        <div className="pd-modal" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="pd-header">
            <div>
              <h2 className="pd-title">{product.title}</h2>
              {product.tags && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {product.tags.map(t => (
                    <span key={t.label} style={{
                      fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px',
                      background: `${t.color}15`, color: t.color, borderRadius: '100px',
                      textTransform: 'uppercase'
                    }}>{t.label}</span>
                  ))}
                </div>
              )}
            </div>
            <button className="pd-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="pd-body">
            {/* Galería Horizontal */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="pd-gallery-wrap">
                {/* 👇 TÍTULO AGREGADO AQUÍ 👇 */}
                <h3 className="pd-section-title" style={{ marginBottom: '1.25rem' }}>
                  Interfaz del Sistema
                </h3>

                <div className="pd-gallery">
                  {product.gallery.map((imgUrl, idx) => (
                    <img key={idx} src={imgUrl} alt={`${product.title} vista ${idx + 1}`} />
                  ))}
                </div>
              </div>
            )}

            {/* Info y Sidebar */}
            <div className="pd-info-grid">

              {/* Columna principal (Izquierda) */}
              <div>
                <h3 className="pd-section-title">Acerca del Software</h3>
                <p className="pd-desc">{product.fullDescription || product.description}</p>

                {/* NUEVO: Lo que incluye (Genera confianza y justifica el precio) */}
                <h3 className="pd-section-title">¿Qué incluye tu licencia?</h3>
                <ul className="pd-features-list">
                  <li className="pd-features-item">
                    <CheckCircle2 size={20} className="pd-features-icon" />
                    <span><strong>Instalación y Configuración:</strong> Despliegue completo de la base de datos y servidor privado para tu negocio.</span>
                  </li>
                  <li className="pd-features-item">
                    <CheckCircle2 size={20} className="pd-features-icon" />
                    <span><strong>Aplicación Multiplataforma:</strong> Acceso desde el navegador web (PC) y App móvil nativa (Android/iOS).</span>
                  </li>
                  <li className="pd-features-item">
                    <CheckCircle2 size={20} className="pd-features-icon" />
                    <span><strong>Capacitación:</strong> Incluye video explicativo y manual en PDF para guiar a tu equipo en el uso rápido del sistema.</span>                  </li>
                  <li className="pd-features-item">
                    <CheckCircle2 size={20} className="pd-features-icon" />
                    <span><strong>Soporte Técnico:</strong> Asistencia prioritaria vía WhatsApp para resolver cualquier inconveniente.</span>
                  </li>
                </ul>

                {product.target && (
                  <>
                    <h3 className="pd-section-title">Ideal para:</h3>
                    <div className="pd-target-list">
                      {product.target.map(item => (
                        <span key={item} className="pd-target-item">
                          <Store size={16} className="text-slate-400" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar Derecha (Checkout Box) */}
              <div>
                <div className="pd-sidebar">
                  <div className="pd-spec-row">
                    <Smartphone size={24} className="pd-spec-icon" />
                    <div>
                      <div className="pd-spec-label">Plataforma</div>
                      <div className="pd-spec-value">{product.platform || 'Web App'}</div>
                    </div>
                  </div>

                  <div className="pd-spec-row">
                    <LayoutTemplate size={24} className="pd-spec-icon" />
                    <div>
                      <div className="pd-spec-label">Categorías</div>
                      <div className="pd-spec-value">
                        {product.categories ? product.categories.join(', ') : 'Empresarial'}
                      </div>
                    </div>
                  </div>

                  <div className="pd-price-box">

                    {/* Renderizado Condicional del Precio Regular */}
                    {product.regularPrice && (
                      <div className="pd-price-anchor">
                        Valor normal: <s>${product.regularPrice}</s>
                      </div>
                    )}

                    <div className="pd-price-label">Setup (Pago único de instalación):</div>
                    <div className="pd-price">
                      <span>$</span>{product.price}<span className="pd-price-currency">COP</span>
                    </div>

                    <div className="pd-monthly">
                      + ${product.monthlyFee} COP / mes
                      <span className="pd-monthly-detail">Servidor en la nube, actualizaciones y soporte técnico (Continúas pagando el 3.º mes).</span>
                    </div>

                    <button className="pd-buy-btn" onClick={handleBuyClick}>
                      Adquirir Software
                    </button>

                    {/* Trust Badges - Reducción de Riesgo Visual */}
                    <div className="pd-trust-badges">
                      <div className="pd-trust-item">
                        <ShieldCheck size={16} /> Software Seguro
                      </div>
                      <div className="pd-trust-item">
                        <Zap size={16} /> Entrega Rápida
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductDetails;