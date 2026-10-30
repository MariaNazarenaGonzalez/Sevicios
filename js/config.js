export const CONFIG = {
  nombreEmprendimiento: "TecnoDiseño",
  slogan: "Servicios de software y diseño",
  moneda: "ARS",
  simboloMoneda: "$",
  whatsappNumero: "5491123456789",
  whatsappMensaje: "Hola, quiero consultar por un servicio de software o diseño.",
  servicios: [
    {
      id: "landing-page",
      nombre: "Landing Page",
      categoria: "Web",
      descripcion: "Página de presentación para captar leads, promocionar un producto o servicio y generar contacto.",
      precio: 150000,
      duracion: "1 a 2 semanas",
      destacado: true
    },
    {
      id: "sitio-web-institucional",
      nombre: "Sitio web institucional",
      categoria: "Web",
      descripcion: "Sitio profesional para presentar tu negocio, servicios, trayectoria y contacto.",
      precio: 250000,
      duracion: "2 a 4 semanas",
      destacado: true
    },
    {
      id: "tienda-online",
      nombre: "Tienda online",
      categoria: "E-commerce",
      descripcion: "Catálogo, carrito, pagos y estructura para vender productos en internet.",
      precio: 450000,
      duracion: "4 a 6 semanas",
      destacado: true
    },
    {
      id: "branding",
      nombre: "Branding básico",
      categoria: "Diseño",
      descripcion: "Identidad visual, paleta, tipografía y aplicación para una marca nueva o en crecimiento.",
      precio: null,
      duracion: "Consultar",
      destacado: false
    },
    {
      id: "ux-ui",
      nombre: "Diseño UX/UI",
      categoria: "Diseño",
      descripcion: "Diseño de interfaces y experiencia para apps o sitios con foco en usabilidad y claridad.",
      precio: null,
      duracion: "Consultar",
      destacado: false
    },
    {
      id: "mantenimiento",
      nombre: "Mantenimiento y soporte",
      categoria: "Soporte",
      descripcion: "Actualizaciones, correcciones, mejoras y soporte continuo para sitios o aplicaciones.",
      precio: null,
      duracion: "Consultar",
      destacado: false
    }
  ]
};

export const formatearPrecio = (precio) => {
  if (precio === null || precio === undefined || precio === "") {
    return "Consultar";
  }

  return `${CONFIG.simboloMoneda} ${Number(precio).toLocaleString("es-AR")}`;
};
