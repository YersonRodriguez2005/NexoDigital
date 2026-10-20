import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  LayoutTemplate,
  Store,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const ProductDetails = ({ product, onClose }) => {
  // Cerrar con la tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Congelar el scroll de la página de fondo
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const handleBuyClick = () => {
    const WHATSAPP_NUMBER = '573216393715';

    const paymentScheme =
      product.monthlyFee !== '0'
        ? `✅ *Setup de Instalación:* $${product.price} COP\n✅ *Mensualidad Cloud:* $${product.monthlyFee} COP`
        : `✅ *Licencia:* $${product.price} COP (Pago Único / Sin mensualidades)`;

    const message = `¡Hola, *Nexo Digital*! 👋\n\nEstoy interesado en adquirir el sistema *${product.title}* para mi negocio.\n\n${paymentScheme}\n\nMe gustaría resolver un par de dudas y conocer los pasos para iniciar la instalación.`;

    const safeMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${safeMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  // createPortal monta el modal directo en el <body> eliminando cualquier conflicto de z-index
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-8 animate-in fade-in duration-200"
    >
      {/* Contenedor Principal del Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-5xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* ─── HEADER DEL MODAL (Sticky) ─── */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-5 sm:px-8 border-b border-slate-100 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {product.tags?.map((t) => (
                <span
                  key={t.label}
                  style={{
                    backgroundColor: `${t.color}15`,
                    borderColor: `${t.color}35`,
                    color: t.color,
                  }}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border font-['Montserrat',sans-serif]"
                >
                  {t.label}
                </span>
              ))}
            </div>
            <h2 className="font-['Montserrat',sans-serif] font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight">
              {product.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all duration-200 hover:rotate-90 focus:outline-none"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* ─── CUERPO CON SCROLL ─── */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-10">
          
          {/* Galería de Capturas */}
          {product.gallery && product.gallery.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="font-['Montserrat',sans-serif] font-extrabold text-lg text-slate-900 tracking-tight">
                  Interfaz y Capturas del Sistema
                </h3>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory">
                {product.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="snap-center shrink-0 h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-sm transition-transform duration-300 hover:scale-[1.01]"
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} captura ${idx + 1}`}
                      className="h-full w-auto object-contain block"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Información y Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Columna Izquierda: Descripción y Beneficios */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-extrabold text-lg text-slate-900 mb-3">
                  Acerca de la plataforma
                </h3>
                <p className="font-['Inter',sans-serif] text-slate-600 leading-relaxed text-sm sm:text-base">
                  {product.fullDescription || product.description}
                </p>
              </div>

              {/* Qué incluye (Dinámico) */}
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-extrabold text-lg text-slate-900 mb-4">
                  ¿Qué incluye tu licencia?
                </h3>
                <ul className="space-y-3.5">
                  {product.features && product.features.length > 0 ? (
                    product.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div className="text-sm font-['Inter',sans-serif] text-slate-700 leading-normal">
                          <strong className="text-slate-900 font-semibold">{item.title} </strong>
                          <span>{item.description}</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">
                        Instalación, soporte técnico y actualizaciones de seguridad.
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Ideal para */}
              {product.target && product.target.length > 0 && (
                <div>
                  <h3 className="font-['Montserrat',sans-serif] font-extrabold text-lg text-slate-900 mb-3">
                    Diseñado específicamente para:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.target.map((targetItem) => (
                      <div
                        key={targetItem}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-700 font-['Inter',sans-serif] text-xs font-semibold"
                      >
                        <Store size={14} className="text-blue-600" />
                        <span>{targetItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Columna Derecha: Tarjeta de Checkout */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg shadow-slate-200/40 space-y-6">
                
                <div className="space-y-4 pb-6 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <div className="font-['Montserrat',sans-serif] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Plataforma
                      </div>
                      <div className="font-['Inter',sans-serif] text-sm font-bold text-slate-900">
                        {product.platform}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                      <LayoutTemplate size={20} />
                    </div>
                    <div>
                      <div className="font-['Montserrat',sans-serif] text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Categoría
                      </div>
                      <div className="font-['Inter',sans-serif] text-sm font-bold text-slate-900">
                        {product.categories ? product.categories.join(' · ') : 'Software'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {product.regularPrice && (
                    <div className="flex items-center gap-2 text-xs font-['Inter',sans-serif] text-slate-500 font-medium">
                      <span>Precio regular:</span>
                      <s className="text-rose-500 font-bold">${product.regularPrice} COP</s>
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold">
                        Ahorro Especial
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="block font-['Inter',sans-serif] text-xs font-semibold text-slate-500 mb-1">
                      {product.priceLabel || 'Inversión inicial:'}
                    </span>
                    <div className="font-['Montserrat',sans-serif] font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none flex items-baseline gap-1">
                      <span>${product.price}</span>
                      <span className="text-sm font-bold text-slate-500">COP</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900">
                    <div className="font-['Inter',sans-serif] text-sm font-bold text-emerald-800">
                      {product.monthlyFeeLabel || (product.monthlyFee !== '0' ? `+ $${product.monthlyFee} COP / mes` : 'Libre de mensualidades')}
                    </div>
                    <p className="font-['Inter',sans-serif] text-xs text-emerald-700/90 mt-1 leading-normal">
                      {product.monthlyFeeDescription || 'Incluye servidor cloud, actualizaciones y soporte técnico.'}
                    </p>
                  </div>

                  <button
                    onClick={handleBuyClick}
                    type="button"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-['Montserrat',sans-serif] text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Adquirir este Software</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="pt-2 flex items-center justify-around text-slate-500 text-[11px] font-['Inter',sans-serif]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span>Licencia Segura</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <div className="flex items-center gap-1.5 font-medium">
                      <Zap size={16} className="text-blue-500" />
                      <span>Despliegue Rápido</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductDetails;