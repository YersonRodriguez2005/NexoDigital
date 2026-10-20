import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Check, Layers, ExternalLink } from 'lucide-react';
import { softwareProducts } from '../data/DataProducts';
import ProductDetails from './ProductDetails';

// Badge dinámico para las etiquetas tecnológicas del producto
const TechBadge = ({ label, color }) => (
  <span
    style={{
      backgroundColor: `${color}15`,
      borderColor: `${color}35`,
      color: color,
    }}
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border font-['Montserrat',sans-serif]"
  >
    {label}
  </span>
);

const ProductsSection = () => {
  const [inView, setInView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="relative bg-slate-100/90 py-24 sm:py-32 overflow-hidden border-t border-slate-200/80"
    >
      {/* Fondo con textura sutil de cuadrícula tecnológica */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb0a_1px,transparent_1px),linear-gradient(to_bottom,#2563eb0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la Sección */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 mb-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-widest text-blue-600">
              Catálogo de Software
            </span>
          </div>

          <h2
            className={`font-['Montserrat',sans-serif] font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Soluciones listas para{' '}
            <span className="relative inline-block text-blue-600">
              Transformar
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full opacity-60" />
            </span>
          </h2>

          <p
            className={`font-['Inter',sans-serif] text-base sm:text-lg text-slate-600 mt-4 leading-relaxed transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Sistemas pre-construidos de grado industrial con arquitectura escalable.
            Implementación inmediata, sin meses de desarrollo desde cero.
          </p>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {softwareProducts.map((product, index) => (
            <article
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`group flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-2xl hover:shadow-blue-650/30 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              {/* Contenido Superior: Imagen, Tags y Textos */}
              <div className="flex flex-col">
                {/* Portada / Preview con badge de oferta */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70 mb-5">
                  {product.regularPrice && (
                    <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-['Montserrat',sans-serif] text-[10px] font-black uppercase tracking-wider shadow-md shadow-rose-500/20">
                      🔥 Plan Fundador
                    </div>
                  )}

                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />

                  {/* Fallback si la imagen no se encuentra */}
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950 items-center justify-center flex-col text-slate-400 gap-2">
                    <Layers className="w-8 h-8 text-blue-400" />
                    <span className="text-xs font-semibold text-slate-300">
                      {product.title}
                    </span>
                  </div>
                </div>

                {/* Etiquetas de Tecnología */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.tags.map((tag) => (
                      <TechBadge key={tag.label} label={tag.label} color={tag.color} />
                    ))}
                  </div>
                )}

                {/* Título */}
                <h3 className="font-['Montserrat',sans-serif] font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
                  {product.title}
                </h3>

                {/* Descripción Corta */}
                <p className="font-['Inter',sans-serif] text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Contenido Inferior (Estructura de Precios alineada al fondo) */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3.5">
                
                {/* Anclaje de Precio Regular */}
                <div className="min-h-[18px] text-right font-['Inter',sans-serif] text-xs text-slate-400 font-medium">
                  {product.regularPrice ? (
                    <span>
                      Valor regular: <s className="text-rose-500 font-bold ml-1">${product.regularPrice}</s>
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </div>

                {/* Caja de Métricas de Pago */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 group-hover:bg-blue-50/50 group-hover:border-blue-200/80 transition-colors duration-200">
                  {/* Setup / Costo Inicial */}
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-['Montserrat',sans-serif] font-black text-2xl text-slate-900 leading-none tabular-nums">
                        ${product.price}
                      </span>
                      <span className="font-['Inter',sans-serif] text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                        Setup (Único)
                      </span>
                    </div>
                  </div>

                  {/* Mensualidad o Estado de Pago */}
                  <div className="text-right">
                    {product.monthlyFee !== '0' ? (
                      <>
                        <span className="font-['Montserrat',sans-serif] font-black text-lg text-blue-600 leading-none tabular-nums">
                          ${product.monthlyFee}
                        </span>
                        <span className="block font-['Inter',sans-serif] text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                          COP / mes
                        </span>
                      </>
                    ) : (
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wide">
                        Pago Único
                      </span>
                    )}
                  </div>
                </div>

                {/* Garantía de compatibilidad */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" strokeWidth={3} />
                  <span>Disponible para {product.platform}</span>
                </div>

                {/* Botón de Acción Directo */}
                <button
                  type="button"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-600/30"
                >
                  <span>Ver detalles del sistema</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal de Detalles Dinámico */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default ProductsSection;