import { CONFIG, formatearPrecio } from './config.js';

const currency = CONFIG.simboloMoneda || '$';
const allServices = Array.isArray(CONFIG.servicios) ? CONFIG.servicios : [];

const getQueryParam = (name) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
};

const openWhatsApp = (message) => {
  const numero = CONFIG.whatsappNumero || '';
  const texto = encodeURIComponent(message || CONFIG.whatsappMensaje || 'Hola');
  const url = `https://wa.me/${numero}?text=${texto}`;
  window.open(url, '_blank', 'noopener');
};

const renderBrand = () => {
  const brandNodes = document.querySelectorAll('[data-brand]');
  brandNodes.forEach((node) => {
    node.textContent = CONFIG.nombreEmprendimiento;
  });

  const sloganNodes = document.querySelectorAll('[data-slogan]');
  sloganNodes.forEach((node) => {
    node.textContent = CONFIG.slogan;
  });
};

const createServiceCard = (servicio) => {
  const card = document.createElement('article');
  card.className = 'product-card';

  const precioTexto = formatearPrecio(servicio.precio);
  const servicioId = encodeURIComponent(servicio.id || servicio.nombre);

  card.innerHTML = `
    <div class="product-card__body">
      <p class="product-card__category">${servicio.categoria || 'Servicio'}</p>
      <h3>${servicio.nombre}</h3>
      <p>${servicio.descripcion || 'Servicio digital a medida.'}</p>
      <div class="product-card__footer">
        <strong>${precioTexto}</strong>
        <span>${servicio.duracion || 'Consultar'}</span>
      </div>
      <div class="product-card__actions">
        <a class="button button-primary" href="producto.html?id=${servicioId}">Ver detalle</a>
        <button class="button button-secondary" type="button" data-whatsapp-service="${servicio.nombre}">Consultar</button>
      </div>
    </div>
  `;

  const consultButton = card.querySelector('[data-whatsapp-service]');
  consultButton.addEventListener('click', () => {
    const mensaje = `Hola, quiero consultar por el servicio ${servicio.nombre}.`;
    openWhatsApp(mensaje);
  });

  return card;
};

const renderFeaturedServices = () => {
  const grid = document.querySelector('[data-featured-products]');
  if (!grid) return;

  const destacados = allServices.filter((servicio) => servicio.destacado).slice(0, 3);
  if (!destacados.length) {
    grid.innerHTML = '<div class="state">Próximamente agregaremos servicios destacados.</div>';
    return;
  }

  grid.innerHTML = '';
  destacados.forEach((servicio) => {
    grid.appendChild(createServiceCard(servicio));
  });
};

const renderCatalog = () => {
  const grid = document.querySelector('[data-products-grid]');
  const categorySelect = document.querySelector('[data-category]');
  const searchInput = document.querySelector('[data-search]');
  const sortSelect = document.querySelector('[data-sort]');
  const pagination = document.querySelector('[data-pagination]');

  if (!grid) return;

  const categories = ['Todos', ...new Set(allServices.map((servicio) => servicio.categoria).filter(Boolean))];

  if (categorySelect) {
    categorySelect.innerHTML = categories
      .map((categoria) => `<option value="${categoria}">${categoria}</option>`)
      .join('');
    categorySelect.value = 'Todos';
  }

  const getVisibleServices = () => {
    const searchTerm = (searchInput?.value || '').trim().toLowerCase();
    const selectedCategory = categorySelect?.value || 'Todos';

    return [...allServices].filter((servicio) => {
      const matchesCategory = selectedCategory === 'Todos' || servicio.categoria === selectedCategory;
      const hayTexto = !searchTerm || [
        servicio.nombre,
        servicio.descripcion,
        servicio.categoria
      ].some((value) => (value || '').toLowerCase().includes(searchTerm));

      return matchesCategory && hayTexto;
    });
  };

  const sortServices = (servicios) => {
    const sortValue = sortSelect?.value || 'nombre';
    const copia = [...servicios];

    switch (sortValue) {
      case 'precioAsc':
        return copia.sort((a, b) => (Number(a.precio) || Number.MAX_SAFE_INTEGER) - (Number(b.precio) || Number.MAX_SAFE_INTEGER));
      case 'precioDesc':
        return copia.sort((a, b) => (Number(b.precio) || 0) - (Number(a.precio) || 0));
      default:
        return copia.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
    }
  };

  const itemsPerPage = 6;

  const drawGrid = () => {
    const serviciosVisibles = sortServices(getVisibleServices());
    const totalPages = Math.max(1, Math.ceil(serviciosVisibles.length / itemsPerPage));
    const currentPage = Number(pagination?.dataset.page || 1);
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);

    if (pagination) {
      pagination.dataset.page = String(safePage);
    }

    const start = (safePage - 1) * itemsPerPage;
    const pageItems = serviciosVisibles.slice(start, start + itemsPerPage);

    if (!pageItems.length) {
      grid.innerHTML = '<div class="state">No encontramos servicios con esos filtros.</div>';
      if (pagination) pagination.innerHTML = '';
      return;
    }

    grid.innerHTML = '';
    pageItems.forEach((servicio) => {
      grid.appendChild(createServiceCard(servicio));
    });

    if (pagination) {
      pagination.innerHTML = Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === safePage ? 'is-active' : '';
        return `<button class="page-button ${isActive}" type="button" data-page-number="${pageNumber}">${pageNumber}</button>`;
      }).join('');

      pagination.querySelectorAll('[data-page-number]').forEach((button) => {
        button.addEventListener('click', () => {
          pagination.dataset.page = button.dataset.pageNumber;
          drawGrid();
        });
      });
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', drawGrid);
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', drawGrid);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', drawGrid);
  }

  if (pagination) {
    pagination.dataset.page = '1';
  }

  drawGrid();
};

const renderProductDetail = () => {
  const detailContainer = document.querySelector('[data-product-detail]');
  if (!detailContainer) return;

  const productId = getQueryParam('id');
  const selectedService = allServices.find((servicio) => String(servicio.id) === String(productId)) || allServices[0];

  if (!selectedService) {
    detailContainer.innerHTML = '<div class="state state-error">No encontramos ese servicio.</div>';
    return;
  }

  detailContainer.innerHTML = `
    <div class="product-detail">
      <img class="product-detail__image" src="assets/products/Captura1.jpg" alt="${selectedService.nombre}">
      <div class="product-detail__content">
        <p class="eyebrow">${selectedService.categoria || 'Servicio'}</p>
        <h1>${selectedService.nombre}</h1>
        <p class="price">${formatearPrecio(selectedService.precio)}</p>
        <p class="stock">Duración estimada: ${selectedService.duracion || 'Consultar'}</p>
        <p class="product-detail__description">${selectedService.descripcion || 'Servicio digital a medida.'}</p>
        <div class="product-card__actions">
          <button class="button button-primary" type="button" data-whatsapp-detail>Consultar por este servicio</button>
          <a class="button button-secondary" href="catalogo.html">Volver al catalogo</a>
        </div>
      </div>
    </div>
  `;

  const consultaButton = detailContainer.querySelector('[data-whatsapp-detail]');
  consultaButton.addEventListener('click', () => {
    const mensaje = `Hola, quiero consultar por el servicio ${selectedService.nombre}.`;
    openWhatsApp(mensaje);
  });
};

const handleContactForms = () => {
  const forms = {
    general: document.querySelector('[data-contact-form-general]'),
    encargo: document.querySelector('[data-contact-form-encargo]')
  };

  const radioInputs = document.querySelectorAll('[data-contact-mode]');

  radioInputs.forEach((radio) => {
    radio.addEventListener('change', () => {
      const value = radio.value;
      if (value === 'general') {
        forms.general.hidden = false;
        forms.encargo.hidden = true;
      } else {
        forms.general.hidden = true;
        forms.encargo.hidden = false;
      }
    });
  });

  if (forms.general) {
    forms.general.addEventListener('submit', (event) => {
      event.preventDefault();
      const nombre = forms.general.elements.nombre.value.trim();
      const mensaje = forms.general.elements.mensaje.value.trim();
      const texto = `Hola, mi nombre es ${nombre}. ${mensaje}`;
      openWhatsApp(texto);
    });
  }

  if (forms.encargo) {
    forms.encargo.addEventListener('submit', (event) => {
      event.preventDefault();
      const nombre = forms.encargo.elements.nombre.value.trim();
      const tipoProyecto = forms.encargo.elements.tipoProyecto.value;
      const objetivo = forms.encargo.elements.objetivo.value.trim();
      const plazo = forms.encargo.elements.plazo.value.trim();
      const presupuesto = forms.encargo.elements.presupuesto.value.trim();
      const descripcion = forms.encargo.elements.descripcion.value.trim();

      const texto = `Hola, mi nombre es ${nombre}. Quiero consultar por un proyecto de ${tipoProyecto}. Objetivo: ${objetivo}. Plazo estimado: ${plazo}. Presupuesto estimado: ${presupuesto}. ${descripcion ? `Comentarios adicionales: ${descripcion}` : ''}`;
      openWhatsApp(texto);
    });
  }
};

const init = () => {
  renderBrand();
  renderFeaturedServices();
  renderCatalog();
  renderProductDetail();
  handleContactForms();
};

init();
