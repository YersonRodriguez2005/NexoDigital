// @src/utils/DataProducts.js

export const softwareProducts = [
  {
    id: 1,
    title: "FitnnesSync",
    description: "App movil con funcionalidades para cuidar tu salud.",
    fullDescription: "FitnnesSync es una aplicación móvil diseñada para ayudarte a mantener un estilo de vida saludable. Ofrece funciones de seguimiento de ejercicio, planificación de rutinas, monitoreo de nutrición y estadísticas personalizables para alcanzar tus objetivos fitness.",
    price: "80.000",        // Pago inicial
    monthlyFee: "35.000",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=800&q=80"
    ],
    platform: "Web & Mobile App",
    categories: ["Finanzas", "Retail", "SaaS"],
    target: ["Supermercados", "Ferreterías", "Restaurantes", "Boutiques"],
    tags: [
      { label: 'SaaS', color: '#60a5fa' },
      { label: 'Finanzas', color: '#10B981' }
    ]
  },
];