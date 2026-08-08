// @src/utils/DataProducts.js

export const softwareProducts = [
  {
    id: 1, 
    title: "InvenSync",
    description: "Sistema inteligente de Punto de Venta (POS) y control de inventario en tiempo real.",
    fullDescription: "InvenSync es una plataforma integral diseñada para modernizar y agilizar comercios locales. Ofrece un sistema de caja rápida (POS), sincronización de inventario al instante, reportes de ventas y una aplicación móvil nativa que permite escanear productos directamente desde el celular. Olvídate del desorden y toma el control total de las finanzas de tu negocio.",
    price: "50.000",       
    monthlyFee: "10.000",
    regularPrice: "100.000",
    imageUrl: "/assets/InvenSync_images/image-main.png",
    gallery: [
      "/assets/InvenSync_images/dashboard.png",
      "/assets/InvenSync_images/inventario.png",
      "/assets/InvenSync_images/historial.png",
      "/assets/InvenSync_images/creditos.png",
      "/assets/InvenSync_images/arqueo.png"
    ],
    platform: "Web & Mobile App",
    categories: ["POS", "Inventario", "SaaS"],
    target: ["Comidas Rápidas", "Restaurantes", "Minimarkets", "Tiendas de Barrio"],
    tags: [
      { label: 'SaaS', color: '#3b82f6' },
      { label: 'Gestión', color: '#10b981' },
      { label: 'Multiplataforma', color: '#8b5cf6' }
    ]
  }
];