document.addEventListener('DOMContentLoaded', function () {
  // Inicializar funcionalidad de búsqueda
  initializeSearch();

  // Inicializar menú móvil mejorado
  initializeMobileMenu();
});

function initializeSearch() {
  // Seleccionar todos los inputs de búsqueda (desktop y móvil)
  const searchInputs = document.querySelectorAll(
    'input[type="text"][placeholder*="Buscar"]'
  );

  searchInputs.forEach((input) => {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(this.value);
      }
    });

    input.addEventListener('input', function (e) {
      // Búsqueda en tiempo real opcional
      if (this.value.length > 2) {
        // Aquí se puede implementar búsqueda en tiempo real
        // por ahora solo mostramos sugerencias básicas
        showSearchSuggestions(this.value);
      }
    });
  });
}

function performSearch(query) {
  if (!query.trim()) return;

  // Redirigir a la página de búsqueda de DS3 Comunicaciones
  const searchUrl = `https://www.ds3comunicaciones.com/search.html?q=${encodeURIComponent(
    query
  )}`;
  window.open(searchUrl, '_blank');
}

function showSearchSuggestions(query) {
  // Productos y categorías populares de DS3 Comunicaciones
  const suggestions = [
    'Switch TP-Link',
    'Access Point Cisco',
    'Router MikroTik',
    'Cable UTP',
    'Transceiver SFP',
    'Antena WiFi',
    'Firewall',
    'Access Point Ubiquiti',
    'Switch Cisco Catalyst',
    'Router TP-Link',
  ];

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Aquí se puede mostrar las sugerencias en un dropdown
  console.log('Sugerencias:', filteredSuggestions);
}

function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener('click', function () {
    const isHidden = mobileMenu.classList.contains('hidden');

    if (isHidden) {
      // Mostrar menú
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('animate-fade-in');

      // Cambiar ícono
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    } else {
      // Ocultar menú
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('animate-fade-in');

      // Cambiar ícono
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function (e) {
    if (
      !mobileMenuButton.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('animate-fade-in');

      const icon = mobileMenuButton.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
}

// Añadir estilos para la animación
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
