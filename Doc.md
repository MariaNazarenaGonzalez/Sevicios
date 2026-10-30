# Tu emprendimiento - Documentación del sitio

Este proyecto es una web estática para un emprendimiento de software y diseño. Está pensada para mostrar servicios, explicar la propuesta de valor y permitir la consulta por WhatsApp para cotizar proyectos.

## Objetivo

La web funciona como una vitrina digital para:

- presentar servicios de desarrollo web
- mostrar propuestas de diseño gráfico y UX/UI
- ofrecer branding y presencia digital
- captar clientes por medio de consultas directas

## Estructura del proyecto

```text
/
├── index.html
├── catalogo.html
├── contacto.html
├── producto.html
├── css/
│   ├── style.css
│   ├── cards.css
│   └── responsive.css
├── js/
│   └── config.js
├── assets/
├── README.md
├── Doc.md
└── .git/
```

## Archivo de configuración

El archivo principal para personalizar el emprendimiento es `js/config.js`.

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

### Qué se configura aquí

- `nombreEmprendimiento`: nombre del emprendimiento.
- `slogan`: frase principal de la marca.
- `whatsappNumero`: número para consultas por WhatsApp Business.
- `servicios`: servicios disponibles con nombre, categoría, precio y descripción.
- `precio`: si todavía no se define, dejarlo en `null` para que muestre "Consultar".

## Servicios sugeridos

El catálogo puede incluir servicios como:

- Landing Page
- Sitio web institucional
- Tienda online
- Branding básico
- Diseño UX/UI
- Mantenimiento y soporte

## Flujo del sitio

1. El usuario entra a la home.
2. Ve la propuesta de valor del emprendimiento.
3. Explora el catálogo de servicios.
4. Consulta el detalle del servicio.
5. Contacta por WhatsApp para cotizar o encargar.

## Personalización rápida

### Cambiar nombre del emprendimiento

Modificar `nombreEmprendimiento` en `js/config.js` y también los textos visibles en:

- `index.html`
- `catalogo.html`
- `contacto.html`

### Cambiar WhatsApp

Actualizar el valor de:

```javascript
whatsappNumero: "5491123456789"
```

Debe ir sin `+`, espacios ni guiones.

### Agregar más servicios

Se agregan objetos dentro del array `servicios`:

```javascript
{
  id: "servicio-nuevo",
  nombre: "Nombre del servicio",
  categoria: "Web",
  descripcion: "Descripción breve del servicio.",
  precio: 250000,
  duracion: "2 semanas",
  destacado: true
}
```

## Publicación

El sitio puede publicarse en GitHub Pages o cualquier hosting estático.

## Recomendación para el emprendimiento

Como es un proyecto recién iniciado, es útil mantener una estructura sencilla, con precios claros cuando se conozcan y una política de "Consultar" para servicios que aún se están definiendo.
