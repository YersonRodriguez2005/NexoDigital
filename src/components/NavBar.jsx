import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import NexoLogo from '../assets/Logo1.png';

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Casos de Éxito' },
];

const NavBar = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, link) => {
    if (link.isModal) {
      e.preventDefault();
      onOpenQuote();
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-['Montserrat',sans-serif] ${
        scrolled
          ? 'bg-[#070E1E]/85 backdrop-blur-xl border-b border-blue-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-600 rounded-xl blur-sm opacity-40 group-hover:opacity-80 transition duration-300" />
              <img
                src={NexoLogo}
                alt="Nexo Digital"
                className="relative w-10 h-10 object-contain rounded-lg border border-blue-400/20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 items-center justify-center text-blue-400 font-bold">
                ND
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Nexo<span className="text-blue-500">Digital</span>
            </span>
          </a>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white rounded-full transition-all duration-200 hover:bg-blue-600/10 hover:shadow-[0_0_15px_rgba(37,99,235,0.15)] group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-4 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Estado + CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-emerald-400 uppercase">
                Cupos Disponibles
              </span>
            </div>

            {/* Botón que abre el modal */}
            <button
              type="button"
              onClick={onOpenQuote}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Cotizar Software</span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Hamburguesa Móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/40 border border-slate-700/60 focus:outline-none transition-colors"
            aria-label="Abrir Menú"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 border-b border-blue-500/20' : 'max-h-0 opacity-0 pointer-events-none'
        } bg-[#070E1E]/95 backdrop-blur-2xl`}
      >
        <div className="px-5 pt-3 pb-6 space-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="block px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wider text-slate-300 hover:text-white hover:bg-blue-600/15 hover:border-l-4 hover:border-blue-500 transition-all cursor-pointer"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30"
            >
              <span>Cotizar Software</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;