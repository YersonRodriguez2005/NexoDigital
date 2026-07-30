import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductCard'; // Import renombrado para mayor claridad
import PortfolioSection from './components/PortfolioSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import TermsBanner from './components/TermsBanner';

function App() {
  return (
    <>
      {/* NavBar siempre visible (fixed) */}
      <NavBar />

      {/* Contenido principal */}
      <main>
        <HeroSection />
        <ProductsSection />
        <PortfolioSection />
        <ServicesSection />
      </main>

      {/* Footer semánticamente fuera del <main> */}
      <Footer />

      {/* Botón flotante WhatsApp */}
      <WhatsAppButton />

      {/* Terminos */}
      <TermsBanner />
    </>
  );
}

export default App;