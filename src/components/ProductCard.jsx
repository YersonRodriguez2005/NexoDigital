import React, { useState, useRef, useEffect } from 'react';
import { softwareProducts } from '../data/DataProducts';
import ProductDetails from './ProductDetails';

// ─── Mini badge de Tecnologías ───────────────────────────────────────────────
const TechBadge = ({ label, color }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '3px 9px',
    borderRadius: '100px',
    background: `${color}14`,
    border: `1px solid ${color}30`,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    color: color,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  }}>
    {label}
  </span>
);

// ─── Icono del botón de compra ────────────────────────────────────────────────
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ContactSection = () => {
  // eslint-disable-next-line no-unused-vars
  const [hoveredId, setHoveredId] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes prdFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes prdLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes prdPulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }

        .prd-section {
          position: relative; background: #F1F5F9; padding: 120px 2rem; overflow: hidden;
        }

        .prd-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }

        .prd-inner {
          position: relative; z-index: 2; max-width: 1280px; margin: 0 auto;
        }

        /* ── Header ── */
        .prd-header { text-align: center; max-width: 700px; margin: 0 auto 80px; }
        .prd-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 20px;
          animation: ${inView ? 'prdFadeUp 0.6s 0ms both' : 'none'};
        }
        .prd-eyebrow-line {
          width: 32px; height: 2px; background: #2563EB; border-radius: 2px;
          transform-origin: left; animation: ${inView ? 'prdLineGrow 0.5s 0.1s both' : 'none'};
        }
        .prd-eyebrow-text {
          font-family: 'Montserrat', sans-serif; font-size: 0.75rem; font-weight: 700;
          color: #2563EB; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .prd-h2 {
          font-family: 'Montserrat', sans-serif; font-weight: 900;
          font-size: clamp(1.875rem, 3.5vw, 2.75rem); line-height: 1.08;
          letter-spacing: -0.04em; color: #0F172A; margin: 0 0 16px;
          animation: ${inView ? 'prdFadeUp 0.6s 100ms both' : 'none'};
        }
        .prd-h2 .accent { color: #2563EB; position: relative; }
        .prd-h2 .accent::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 2px;
          height: 3px; background: linear-gradient(90deg, #2563EB, #818cf8);
          border-radius: 2px; opacity: 0.3;
        }
        .prd-subtitle {
          font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.7;
          color: #64748b; margin: 0; animation: ${inView ? 'prdFadeUp 0.6s 200ms both' : 'none'};
        }

        /* ── Grid ── */
        .prd-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }

        /* ── Card ── */
        .prd-card {
          position: relative; background: #ffffff; border-radius: 20px;
          padding: 2.25rem 2rem; border: 1px solid #e2e8f0; 
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease;
          display: flex; flex-direction: column; gap: 1.25rem;
        }
        .prd-card.visible { animation: prdFadeUp 0.6s both; }
        .prd-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.12),
                      0 20px 56px rgba(37, 99, 235, 0.1),
                      0 8px 24px rgba(0, 0, 0, 0.06);
          border-color: rgba(37, 99, 235, 0.2);
        }

        /* ── Image Box & Badge ── */
        .img-box {
          position: relative; width: 100%; height: 160px; border-radius: 14px; overflow: hidden;
          border: 1px solid #e2e8f0; transition: border-color 0.3s ease, transform 0.3s ease; flex-shrink: 0;
        }
        .badge-oferta {
          position: absolute; top: 10px; right: 10px; z-index: 10;
          background: linear-gradient(90deg, #ef4444, #f97316);
          color: white; font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 800;
          padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
        }
        .prd-card:hover .img-box { border-color: rgba(37, 99, 235, 0.2); transform: scale(1.02); }
        .img-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .prd-card:hover .img-box img { transform: scale(1.05); }

        /* ── Typography ── */
        .card-target {
          font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #8b5cf6; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: -10px;
        }
        .card-title {
          font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 1.25rem;
          color: #0F172A; line-height: 1.25; letter-spacing: -0.025em; margin: 0; transition: color 0.2s;
        }
        .prd-card:hover .card-title { color: #2563EB; }
        .card-desc { font-family: 'Inter', sans-serif; font-size: 0.9rem; line-height: 1.6; color: #64748b; margin: 0; flex: 1; }

        .tech-row { display: flex; flex-wrap: wrap; gap: 6px; }

        /* ── Pricing Structure (Neuromarketing) ── */
        .pricing-wrapper { display: flex; flex-direction: column; gap: 8px; margin-top: auto; }
        
        .price-anchor {
          font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #94a3b8; font-weight: 500; text-align: right;
          min-height: 19px; /* Mantiene el espacio visual incluso si no hay precio regular */
        }
        .price-anchor s { color: #ef4444; font-weight: 600; margin-left: 4px; }

        .metric-chip {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 12px; transition: background 0.3s, border-color 0.3s;
        }
        .prd-card:hover .metric-chip { background: rgba(37, 99, 235, 0.04); border-color: rgba(37, 99, 235, 0.2); }
        
        .metric-chip-left, .metric-chip-right { display: flex; align-items: center; gap: 10px; }
        .metric-chip-right { flex-direction: column; align-items: flex-end; gap: 0; }
        
        .metric-pulse {
          width: 8px; height: 8px; border-radius: 50%; background: #10B981; flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(16,185,129,0.4); animation: prdPulseDot 2.5s infinite;
        }
        .metric-col { display: flex; flex-direction: column; }
        
        .metric-value { font-family: 'Montserrat', sans-serif; font-size: 1.7rem; font-weight: 900; color: #0F172A; line-height: 1; }
        .metric-value-blue { color: #2563EB; font-size: 1.4rem; }
        
        .metric-label { font-family: 'Inter', sans-serif; font-size: 0.65rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-top: 4px; }
        
        .value-prop {
          font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #10B981; font-weight: 700;
          display: flex; align-items: center; gap: 6px; margin-top: 4px;
        }

        /* ── Call to Action Button ── */
        .card-link {
          display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
          font-family: 'Montserrat', sans-serif; font-size: 0.85rem; font-weight: 700;
          color: #ffffff; background: #0F172A; text-decoration: none; letter-spacing: 0.02em;
          padding: 14px; border-radius: 10px; transition: all 0.3s ease; cursor: pointer; border: none; outline: none;
        }
        .prd-card:hover .card-link { background: #2563EB; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3); transform: translateY(-2px); }
        .card-link svg { transition: transform 0.3s ease; }
        .prd-card:hover .card-link svg { transform: translateX(4px); }

        /* ── Responsive ── */
        @media (max-width: 1024px) { .prd-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) {
          .prd-section { padding: 80px 1.5rem; }
          .prd-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="productos" className="prd-section" ref={sectionRef}>
        <div className="prd-inner">

          {/* Header */}
          <div className="prd-header">
            <div className="prd-eyebrow">
              <div className="prd-eyebrow-line" />
              <span className="prd-eyebrow-text">Nuestro Catálogo</span>
              <div className="prd-eyebrow-line" style={{ transformOrigin: 'right' }} />
            </div>
            <h2 className="prd-h2">
              Soluciones listas para <span className="accent">Transformar</span>
            </h2>
            <p className="prd-subtitle">
              Adquiere tu software empresarial ya pre-construido. Implementación rápida, tecnología segura y soporte continuo.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="prd-grid">
            {softwareProducts.map((product, index) => (
              <div
                key={product.id}
                className={`prd-card ${inView ? 'visible' : ''}`}
                style={{ animationDelay: `${200 + index * 120}ms` }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProduct(product)}
              >
                {/* Imagen y Badge de Urgencia (Renderizado Condicional) */}
                <div className="img-box">
                  {product.regularPrice && (
                    <div className="badge-oferta">🔥 Plan Fundador</div>
                  )}
                  <img src={product.imageUrl} alt={product.title} />
                </div>
                
                <h3 className="card-title">{product.title}</h3>

                {/* Descripción */}
                <p className="card-desc">
                  {product.description}
                </p>

                {/* Tech stack */}
                {product.tags && (
                  <div className="tech-row">
                    {product.tags.map((t) => (
                      <TechBadge key={t.label} label={t.label} color={t.color} />
                    ))}
                  </div>
                )}

                {/* Estructura de Precios */}
                <div className="pricing-wrapper">
                  {/* Anclaje de Precio (Renderizado Condicional) */}
                  <div className="price-anchor">
                    {product.regularPrice ? (
                      <>Precio regular: <s>${product.regularPrice}</s></>
                    ) : (
                      /* Si no hay precio regular, mantenemos el espacio vacío para que todas las tarjetas midan lo mismo */
                      <>&nbsp;</>
                    )}
                  </div>
                  
                  <div className="metric-chip">
                    {/* Setup Inicial */}
                    <div className="metric-chip-left">
                      <div className="metric-pulse" title="Licencias Disponibles" />
                      <div className="metric-col">
                        <span className="metric-value">${product.price}</span>
                        <span className="metric-label">Setup (Único)</span>
                      </div>
                    </div>
                    
                    {/* Mensualidad SaaS */}
                    <div className="metric-chip-right">
                      <span className="metric-value metric-value-blue">${product.monthlyFee}</span>
                      <span className="metric-label">/ mes</span>
                    </div>
                  </div>
                  
                  {/* Reducción de Riesgo */}
                  <div className="value-prop">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Incluye {product.platform}
                  </div>
                </div>

                {/* Botón */}
                <button className="card-link">
                  Ver detalles del sistema <IconArrow />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Detalles */}
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </section>
    </>
  );
};

export default ContactSection;