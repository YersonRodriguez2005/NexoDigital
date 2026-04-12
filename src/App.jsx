import { useEffect } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';

function App() {
  // Smooth scroll global para todos los anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const id = target.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      {/* Font preload hint (refuerza las Google Fonts usadas en los componentes) */}
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          background: #070E1E;
          color: #fff;
          overflow-x: hidden;
        }

        /* Scrollbar personalizada (Chromium) */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #070E1E;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e3a6e;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2563EB;
        }

        /* Selection color */
        ::selection {
          background: rgba(37, 99, 235, 0.35);
          color: #fff;
        }
      `}</style>

      {/* NavBar siempre visible (fixed) */}
      <NavBar />

      {/* Contenido principal */}
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Botón flotante WhatsApp — fuera del main para no interferir con el layout */}
      <WhatsAppButton />
    </>
  );
}

export default App;