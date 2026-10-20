import React, { useState } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductCard';
import PortfolioSection from './components/PortfolioSection';
import ServicesSection from './components/ServicesSection';
import QuoteModal from './components/QuoteModal'; // 👈 Modal del Cotizador
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import TermsBanner from './components/TermsBanner';

function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070E1E] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-white">
      {/* Pasamos la función para abrir el modal */}
      <NavBar onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Contenido de la landing page limpio */}
      <main className="flex-1 w-full">
        <HeroSection />
        <ProductsSection />
        <PortfolioSection />
        <ServicesSection />
      </main>

      <Footer />
      <WhatsAppButton />
      <TermsBanner />

      {/* Modal interactivo renderizado directamente en el DOM raíz */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
}

export default App;