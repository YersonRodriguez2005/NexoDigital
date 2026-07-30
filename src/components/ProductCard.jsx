import React, { useState, useRef, useEffect } from 'react';
import { softwareProducts } from '../data/DataProducts';
import ProductDetails from './ProductDetails';

// ─── Mini badge ──────────────────────────────────────────────────────────────
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
const IconCart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ContactSection = () => {
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
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

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

        .prd-section::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #2563EB, transparent);
          opacity: 0.2; pointer-events: none;
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
          cursor: pointer; /* MENTOR TIP: Cambiado a pointer para indicar que es clickeable */
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

        .prd-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0.03) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none; border-radius: inherit;
        }
        .prd-card:hover::before { opacity: 1; }

        .prd-card::after {
          content: ''; position: absolute; top: 0; left: 24px; right: 24px; height: 3px;
          background: linear-gradient(90deg, #2563EB, #818cf8); border-radius: 0 0 4px 4px;
          transform: scaleX(0); transform-origin: left; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .prd-card:hover::after { transform: scaleX(1); }

        /* ── Image Box ── */
        .img-box {
          width: 100%; height: 160px; border-radius: 14px; overflow: hidden;
          border: 1px solid #e2e8f0; transition: border-color 0.3s ease, transform 0.3s ease; flex-shrink: 0;
        }
        .prd-card:hover .img-box { border-color: rgba(37, 99, 235, 0.2); transform: scale(1.02); }
        .img-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .prd-card:hover .img-box img { transform: scale(1.05); }

        /* ── Typography ── */
        .card-title {
          font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 1.125rem;
          color: #0F172A; line-height: 1.25; letter-spacing: -0.025em; margin: 0; transition: color 0.2s;
        }
        .prd-card:hover .card-title { color: #1a3a7a; }
        .card-desc { font-family: 'Inter', sans-serif; font-size: 0.9rem; line-height: 1.7; color: #64748b; margin: 0; flex: 1; }

        /* ── Tech badges row ── */
        .tech-row { display: flex; flex-wrap: wrap; gap: 6px; }

        /* ── Metric / KPI chip ── */
        .metric-chip {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 10px; margin-top: auto; transition: background 0.3s, border-color 0.3s;
        }
        .prd-card:hover .metric-chip { background: rgba(37, 99, 235, 0.04); border-color: rgba(37, 99, 235, 0.15); }
        .metric-chip-left { display: flex; align-items: center; gap: 8px; }
        .metric-pulse {
          width: 7px; height: 7px; border-radius: 50%; background: #10B981;
          box-shadow: 0 0 0 0 rgba(16,185,129,0.4); animation: prdPulseDot 2.5s infinite;
        }
        .metric-value {
          font-family: 'Montserrat', sans-serif; font-size: 3rem; font-weight: 900;
          color: #0F172A; letter-spacing: -0.02em;
        }
        .metric-label {
          font-family: 'Inter', sans-serif; font-size: 0.7rem; color: #94a3b8;
          letter-spacing: 0.03em; text-transform: uppercase; font-weight: 600;
        }

        /* ── Add to Cart Link ── */
        .card-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Montserrat', sans-serif; font-size: 0.75rem; font-weight: 700;
          color: #2563EB; text-decoration: none; letter-spacing: 0.04em;
          text-transform: uppercase; opacity: 0; transform: translateX(-4px);
          transition: opacity 0.25s, transform 0.25s; cursor: pointer;
          background: none; border: none; padding: 0; outline: none;
        }
        .prd-card:hover .card-link { opacity: 1; transform: translateX(0); }
        .card-link svg { transition: transform 0.2s; }
        .card-link:hover svg { transform: translateX(3px); }

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
              Soluciones listas para <span className="accent">Comprar</span>
            </h2>

            <p className="prd-subtitle">
              Adquiere tu software empresarial o personal ya pre-construido.
              compra rápida, software seguro y soporte continuo.
            </p>
          </div>

          {/* Cards Grid: Eliminamos el onClick aquí */}
          <div className="prd-grid">
            {softwareProducts.map((product, index) => {
              // eslint-disable-next-line no-unused-vars
              const isHovered = hoveredId === product.id;

              return (
                <div
                  key={product.id}
                  className={`prd-card ${inView ? 'visible' : ''}`}
                  style={{ animationDelay: `${200 + index * 120}ms` }}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedProduct(product)} /* MENTOR TIP: onClick va en la tarjeta */
                >
                  {/* Imagen */}
                  <div className="img-box">
                    <img src={product.imageUrl} alt={product.title} />
                  </div>

                  {/* Título */}
                  <h3 className="card-title">{product.title}</h3>

                  {/* Descripción */}
                  <p className="card-desc">{product.description}</p>

                  {/* Tech stack */}
                  {product.tags && (
                    <div className="tech-row">
                      {product.tags.map((t) => (
                        <TechBadge key={t.label} label={t.label} color={t.color} />
                      ))}
                    </div>
                  )}

                  {/* Precio */}
                  <div className="metric-chip">
                    <div className="metric-chip-left">
                      <div className="metric-pulse" title="Disponible inmediatamente" />
                      <span className="metric-value">${product.price}</span>
                    </div>
                    <span className="metric-label">Pago Único</span>
                  </div>

                  {/* Link Animado de Compra */}
                  <button
                    className="card-link"
                    onClick={(e) => {
                      e.stopPropagation(); /* MENTOR TIP: Evita que el clic abra también el modal */
                      console.log(`Iniciando compra de: ${product.title}`);
                    }}
                  >
                    Añadir al carrito
                    <IconCart />
                  </button>
                </div>
              );
            })}
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