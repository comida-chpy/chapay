// Inicializar íconos de Lucide
lucide.createIcons();

// 1. Efectos de entrada al hacer scroll
const revealEls = document.querySelectorAll('[data-animate]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => revealObserver.observe(el));

// 2. Efecto de brillo siguiendo el cursor en tarjetas
const glowCards = document.querySelectorAll('.glow-card');

glowCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  });
});

// 3. Lógica de navegación activa con barra móvil
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('section[id]')];

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
  });
};

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleEntry = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visibleEntry) {
    setActiveNav(visibleEntry.target.id);
  }
}, {
  threshold: [0.2, 0.4, 0.6, 0.8],
  rootMargin: '-10% 0px -20% 0px'
});

sections.forEach((section) => sectionObserver.observe(section));

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

// 4. Lógica para el menú móvil
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// 5. Redirección de Formulario a WhatsApp
const quoteForm = document.getElementById('quote-form');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phoneNumber = '51973183848';
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const eventType = document.getElementById('eventType').value;
    const guests = document.getElementById('guests').value;
    const notes = document.getElementById('notes').value;

    const message = `*SOLICITUD DE COTIZACIÓN*%0A%0A` +
      `*Nombre:* ${encodeURIComponent(name)}%0A` +
      `*Teléfono:* ${encodeURIComponent(phone)}%0A` +
      `*Tipo de Evento:* ${encodeURIComponent(eventType)}%0A` +
      `*Nº de Invitados:* ${encodeURIComponent(guests)}%0A` +
      `*Notas adicionales:* ${encodeURIComponent(notes || 'Sin especificaciones')}`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  });
}
