// Main interactions for portfolio
document.addEventListener('DOMContentLoaded', () => {
  // Feather icons
  if (window.feather) feather.replace();

  // Set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Modal for project details
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalMedia = document.getElementById('modalMedia');
  const modalClose = document.querySelector('.modal-close');

  document.querySelectorAll('.project-card').forEach(card => {
    card.querySelector('[data-action="view"]').addEventListener('click', () => {
      const title = card.dataset.title || card.querySelector('h4')?.textContent;
      const desc = card.dataset.desc || card.querySelector('p')?.textContent;
      const bg = card.querySelector('.project-media')?.style.backgroundImage.replace(/url\(|\)|"|'/g, '') || '';

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      if (bg) modalMedia.style.backgroundImage = `url(${bg})`;
      else modalMedia.style.backgroundImage = 'linear-gradient(135deg,#f4f6f8,#eef2ff)';

      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  // Contact form: simple mailto fallback & validation
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.elements['name'].value.trim();
    const email = contactForm.elements['email'].value.trim();
    const message = contactForm.elements['message'].value.trim();
    if (!name || !email || !message) {
      alert('Lengkapi semua field terlebih dahulu.');
      return;
    }
    // Open default mail client with prefilled content
    const subject = encodeURIComponent(`Pesan dari ${name} — Portofolio`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:fahrih@example.com?subject=${subject}&body=${body}`;
  });

  // Animate progress circles using data-percent (accessible without JS, but nice effect)
  document.querySelectorAll('.circle').forEach(c => {
    const percent = Number(c.dataset.percent) || 0;
    const circleBar = c.querySelector('.circle-bar');
    // stroke-dasharray is already set in markup for default visuals; animate for effect
    circleBar.style.strokeDasharray = `${percent},100`;
    const txt = c.querySelector('.percentage');
    if (txt) txt.textContent = `${percent}%`;
  });

  // Reveal on scroll (fade-in)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.card, .section-title, .project-card, .timeline-item, .info-card')
    .forEach(el => { el.setAttribute('data-fade',''); observer.observe(el); });

  // Mobile nav toggle
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle && toggle.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') navLinks.style.display = '';
    else navLinks.style.display = 'flex';
  });
});