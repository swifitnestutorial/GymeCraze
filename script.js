document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('#nav ul');
  const scrollTopBtn = document.getElementById('scrollTop');
  const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1 && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav.classList.remove('mobile-open');
      }
    });
  });

  // Active link on scroll
  const sections = Array.from(document.querySelectorAll('main > section, section'));
  function onScroll() {
    const y = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.id;
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (link) link.classList.toggle('active', y >= top && y < top + h);
    });
    scrollTopBtn.classList.toggle('show', window.scrollY > 300);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Scroll to top button
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Testimonial slider
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  const nextBtn = document.getElementById('nextSlide');
  const prevBtn = document.getElementById('prevSlide');
  function showSlide(i) { slides.forEach((s, idx) => s.classList.toggle('active', idx === i)); current = i; }
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide((current + 1) % slides.length));
  if (prevBtn) prevBtn.addEventListener('click', () => showSlide((current - 1 + slides.length) % slides.length));
  if (slides.length) setInterval(() => showSlide((current + 1) % slides.length), 5000);

  // Intersection reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.card, .plan, .trainer, .hero-copy, .about-media').forEach(el => observer.observe(el));

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) { alert('Please fill in all fields.'); return; }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) { alert('Please enter a valid email.'); return; }
    // Simulate submission
    alert(`Thanks ${name}! We'll get back to you soon.`);
    form.reset();
  });
});
