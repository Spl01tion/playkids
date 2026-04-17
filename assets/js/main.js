/**
 * PlayKids – Main JS
 */

(function () {
  'use strict';

  /* ── AOS (Animate On Scroll) ─────────────────────── */
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
  });

  /* ── Navbar: transparente no hero, glassmorphism ao sair ── */
  const nav = document.getElementById('mainNav');
  const hero = document.getElementById('inicio');

  function toggleNavScrolled() {
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight - 80 : 80;
    if (window.scrollY > heroBottom || window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', toggleNavScrolled);
  toggleNavScrolled();

  /* ── Smooth-scroll for anchor links ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 8 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });

      // Close mobile menu if open
      const bsCollapse = document.getElementById('navMenu');
      if (bsCollapse && bsCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(bsCollapse).hide();
      }
    });
  });

  /* ── Active nav-link highlight on scroll ─────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.pk-navbar .nav-link[href^="#"]');

  function highlightNav() {
    const scrollPos = window.scrollY + (nav ? nav.offsetHeight + 20 : 100);
    sections.forEach(function (sec) {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const link = document.querySelector('.pk-navbar .nav-link[href="#' + sec.id + '"]');
      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNav);

  /* ── GLightbox (for future gallery use) ──────────── */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  /* ── Scroll To Top ───────────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Contact Form (client-side feedback) ─────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nome     = document.getElementById('cf-nome').value.trim();
      const email    = document.getElementById('cf-email').value.trim();
      const mensagem = document.getElementById('cf-mensagem').value.trim();
      const feedback = document.getElementById('cf-feedback');

      if (!nome || !email || !mensagem) {
        feedback.style.display = 'block';
        feedback.className = 'pk-cf-error';
        feedback.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i> Por favor preencha os campos obrigatórios (Nome, E-mail e Mensagem).';
        return;
      }

      // Redireciona para WhatsApp com os dados preenchidos
      const assunto  = document.getElementById('cf-assunto').value || 'Contacto geral';
      const telefone = document.getElementById('cf-telefone').value.trim();
      const texto = encodeURIComponent(
        'Olá PlayKids! 👋\n' +
        'Nome: ' + nome + '\n' +
        'E-mail: ' + email + (telefone ? '\nTelefone: ' + telefone : '') + '\n' +
        'Assunto: ' + assunto + '\n\n' +
        mensagem
      );
      window.open('https://wa.me/351XXXXXXXXX?text=' + texto, '_blank');

      feedback.style.display = 'block';
      feedback.className = 'pk-cf-success';
      feedback.innerHTML = '<i class="bi bi-check-circle me-1"></i> Mensagem enviada! Será redirecionado para o WhatsApp.';
      contactForm.reset();
    });
  }

})();
