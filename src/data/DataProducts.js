// @src/utils/DataProducts.js

export const softwareProducts = [
  {
    id: 1,
    title: "InvenSync",
    description:
      "Sistema inteligente de Punto de Venta (POS) y control de inventario en tiempo real.",
    fullDescription:
      "InvenSync es una plataforma integral diseñada para modernizar y agilizar comercios locales. Ofrece un sistema de caja rápida (POS), sincronización de inventario al instante, reportes de ventas y una aplicación móvil nativa que permite escanear productos directamente desde el celular. Olvídate del desorden y toma el control total de las finanzas de tu negocio.",
    price: "0",
    monthlyFee: "15.000",
    regularPrice: "50.000",
    
    // 👇 NUEVO: Etiquetas dinámicas para la caja de precios
    priceLabel: "Setup (Pago único de instalación):",
    monthlyFeeLabel: "+ $15.000 COP / mes",
    monthlyFeeDescription: "Servidor en la nube, actualizaciones y soporte técnico (Empiezas a pagar al 2.º mes).",

    imageUrl: "/assets/InvenSync_images/image-main.jpg",
    gallery: [
      "/assets/InvenSync_images/dashboard.png",
      "/assets/InvenSync_images/inventario.png",
      "/assets/InvenSync_images/historial.png",
      "/assets/InvenSync_images/creditos.png",
      "/assets/InvenSync_images/arqueo.png",
    ],
    platform: "Web & Mobile App",
    categories: ["POS", "Inventario", "SaaS"],
    target: [
      "Comidas Rápidas",
      "Restaurantes",
      "Minimarkets",
      "Tiendas de Barrio",
    ],
    tags: [
      { label: "SaaS", color: "#3b82f6" },
      { label: "Gestión", color: "#10b981" },
      { label: "Multiplataforma", color: "#8b5cf6" },
    ],
    features: [
      {
        title: "Instalación y Configuración:",
        description:
          "Despliegue completo de la base de datos y servidor privado para tu negocio.",
      },
      {
        title: "Aplicación Multiplataforma:",
        description:
          "Acceso desde el navegador web (PC) y App móvil nativa (Android/iOS).",
      },
      {
        title: "Capacitación:",
        description:
          "Incluye video explicativo y manual en PDF para guiar a tu equipo en el uso rápido del sistema.",
      },
      {
        title: "Soporte Técnico:",
        description:
          "Asistencia prioritaria vía WhatsApp para resolver cualquier inconveniente.",
      },
    ],
  },
  {
    id: 2,
    title: "CosechaSync",
    description:
      "App móvil para la gestión de nómina, pesadas diarias y ventas en fincas cafeteras.",
    fullDescription:
      "CosechaSync es la herramienta definitiva para digitalizar el campo. Diseñada para funcionar en zonas rurales (modo offline), permite a los administradores registrar pesadas de café, controlar vales o adelantos de trabajadores, y liquidar la nómina semanal en segundos. Di adiós a los errores de cálculo en papel y comparte comprobantes de pago profesionales en PDF directamente por WhatsApp.",
    price: "20.000",
    monthlyFee: "0",
    regularPrice: "80.000",

    // 👇 NUEVO: Etiquetas dinámicas para la caja de precios
    priceLabel: "Licencia de por vida (Pago único):",
    monthlyFeeLabel: "Libre de mensualidades",
    monthlyFeeDescription: "Un solo pago. El software funciona sin internet y los datos se guardan directamente en tu celular.",

    imageUrl: "/assets/CosechaSync_images/image-main.jpg",
    gallery: [
      "/assets/CosechaSync_images/dashboard.png",
      "/assets/CosechaSync_images/cuadrilla.png",
      "/assets/CosechaSync_images/pesadas.png",
      "/assets/CosechaSync_images/tienda.png",
      "/assets/CosechaSync_images/nomina.png",
      "/assets/CosechaSync_images/ventas.png",
      "/assets/CosechaSync_images/cierres.png",
    ],
    platform: "Mobile App (Android)",
    categories: ["AgroTech", "Nómina", "Gestión"],
    target: ["Fincas Cafeteras", "Mayordomos", "Administradores Agrícolas"],
    tags: [
      { label: "AgroTech", color: "#10b981" },
      { label: "Offline-First", color: "#f59e0b" },
      { label: "Finanzas", color: "#3b82f6" },
    ],
    features: [
      {
        title: "Tecnología Offline-First:",
        description:
          "Funciona perfectamente en zonas rurales sin internet. Todo se guarda en tu celular.",
      },
      {
        title: "Recibos de Pago PDF:",
        description:
          "Genera desprendibles de pago profesionales y envíalos directo por WhatsApp de tus trabajadores.",
      },
      {
        title: "Licencia de Instalación Única:",
        description:
          "Pago único por la instalación del archivo APK y credenciales en tu dispositivo Android.",
      },
      {
        title: "Privacidad Total:",
        description:
          "Los datos financieros de tu finca se quedan exclusivamente en tu dispositivo.",
      },
    ],
  },
  {
    id: 3,
    title: "StudySync",
    description: "Plataforma académica integral para la gestión de estudios, tareas y progreso universitario.",
    fullDescription: "StudySync es tu centro de comando académico definitivo. Organiza tu semestre, lleva un registro meticuloso de tus tareas por materia, visualiza tus fechas límite en un calendario interactivo y monitoriza tu progreso real a través de analíticas y un sistema de logros gamificado. Diseñado por y para estudiantes, funciona fluido y rápido en cualquier dispositivo.",
    price: "29.900",
    monthlyFee: "0",
    regularPrice: "60.000",
    priceLabel: "Plan Fundador (Semestre completo):",
    monthlyFeeLabel: "Pago único por semestre",
    monthlyFeeDescription: "Acceso total durante 6 meses. Sin cargos ocultos. Te invitamos a ser pionero de la plataforma.",
    imageUrl: "/assets/StudySync_images/image-main.jpg",
    gallery: [
      "/assets/StudySync_images/dashboard.png",
      "/assets/StudySync_images/cursos.png",
      "/assets/StudySync_images/tareas.png",
      "/assets/StudySync_images/calendario.png",
      "/assets/StudySync_images/progreso.png",
      "/assets/StudySync_images/trofeos.png",
    ],
    platform: "Web Application (PWA)",
    categories: ["Productividad", "EdTech", "Educación"],
    target: [
      "Estudiantes Universitarios",
      "Autodidactas",
      "Opositores",
      "Estudiantes de Posgrado"
    ],
    tags: [
      { label: "EdTech", color: "#4361EE" },
      { label: "Productividad", color: "#06C896" },
      { label: "Estudio", color: "#F59E0B" }
    ],
    features: [
      {
        title: "Gestor de Tareas Inteligente:",
        description: "Organiza pendientes, asigna prioridades, vincula a materias específicas y usa el buscador de ultra-rápido rendimiento."
      },
      {
        title: "Seguimiento de Progreso y Analíticas:",
        description: "Visualiza tu avance general y el rendimiento detallado por materia a través de gráficos e indicadores clave."
      },
      {
        title: "Sistema de Logros (Gamificación):",
        description: "Mantén la motivación alta desbloqueando medallas y trofeos a medida que completas actividades."
      },
      {
        title: "Soporte Multiplataforma (PWA):",
        description: "Instálalo como una aplicación nativa en tu celular o utilízalo desde el navegador de tu computadora."
      }
    ]
  },
];