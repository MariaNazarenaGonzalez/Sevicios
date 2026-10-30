# Tu emprendimiento - Servicios de software y diseño

Este proyecto es una landing page y catálogo de servicios para un emprendimiento de software y diseño. La idea principal es presentar servicios digitales, permitir filtrar por categoría y facilitar la consulta por WhatsApp para cotizar proyectos.

## Objetivo

Mostrar de forma clara y profesional:

- servicios de desarrollo web
- diseño visual y branding
- UX/UI
- mantenimiento y soporte digital
- proyectos a medida para emprendedores y negocios

## Estructura

```text
/
├── index.html
├── catalogo.html
├── contacto.html
├── producto.html
├── css/
│   ├── style.css
│   ├── cards.css
│   ├── responsive.css
├── js/
│   └── config.js
├── assets/
├── README.md
├── Doc.md
└── .git/
```

## Configuración

Editar `js/config.js`:

```javascript
export const CONFIG = {
  nombreEmprendimiento: "Tu emprendimiento",
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
    }
  ]
};
```

### Campos importantes

- `nombreEmprendimiento`: nombre visible del emprendimiento.
- `slogan`: texto principal de marca.
- `whatsappNumero`: número de WhatsApp Business sin `+`, espacios ni guiones.
- `servicios`: lista de servicios ofrecidos.
- `precio`: si aún no se define un valor, usar `null` o `"Consultar"` y la web lo mostrará como consulta.

## Servicios recomendados

Ejemplos de servicios que se pueden cargar:

- Landing Page
- Sitio web institucional
- Tienda online
- Branding básico
- Diseño UX/UI
- Mantenimiento y soporte

## Cómo funciona la consulta

La consulta por proyecto se puede enviar con WhatsApp usando el número configurado en `CONFIG.whatsappNumero`.

El flujo recomendado es:

1. El usuario elige un servicio.
2. Revisa la descripción y el precio.
3. Hace clic en consultar.
4. Se abre una conversación de WhatsApp con un mensaje prearmado.

## Publicación

Para usar el sitio en GitHub Pages:

1. Subir el proyecto al repositorio.
2. Ir a `Settings > Pages`.
3. Seleccionar GitHub Actions o rama principal.
4. Publicar el sitio.

## Personalización

- Textos y estructura: `index.html`, `catalogo.html`, `contacto.html`
- Estilo general: `css/style.css`
- Tarjetas: `css/cards.css`
- Ajustes responsive: `css/responsive.css`
- Datos del negocio: `js/config.js`

## Nota

Este proyecto se adapta muy bien a un emprendimiento recién iniciado, con equipo pequeño y servicios que se pueden ampliar a medida que crece el negocio.

