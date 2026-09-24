/* ============================================================
   Roamora — JavaScript
   ============================================================ */

'use strict';

/* ── Page Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

/* ── Custom Cursor ── */
(function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function loop() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(loop);
  }
  loop();

  const hoverEls = document.querySelectorAll('a, button, .dest-card, .tour-card, .gallery-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();

/* ── Navbar Scroll ── */
(function initNavbar() {
  const nav = document.getElementById('mainNavbar');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile Offcanvas ── */
(function initOffcanvas() {
  const btn     = document.getElementById('mobileMenuBtn');
  const offcanvas = document.getElementById('offcanvasNav');
  const overlay  = document.getElementById('offcanvasOverlay');
  const closeBtn = document.getElementById('offcanvasClose');
  if (!btn || !offcanvas) return;

  function open() {
    offcanvas.classList.add('open');
    overlay && overlay.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    offcanvas.classList.remove('open');
    overlay && overlay.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  overlay && overlay.addEventListener('click', close);
})();

/* ── Theme Toggle ── */
(function initTheme() {
  const toggleBtns = document.querySelectorAll('.theme-toggle');
  const stored = localStorage.getItem('wl-theme') || 'light';
  applyTheme(stored);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('wl-theme', next);
    });
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      }
    });
  }
})();

/* ── Scroll Reveal ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ── Count-Up Animation ── */
(function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();
        obs.unobserve(el);

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => obs.observe(el));
})();

/* ── Hero Particles ── */
(function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 3;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 40}%;
      --dur: ${Math.random() * 5 + 4}s;
      --delay: ${Math.random() * 6}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

/* ── FAQ Accordion ── */
(function initFaq() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const isOpen = q.classList.contains('open');
      // Close all
      questions.forEach(other => {
        other.classList.remove('open');
        const ans = other.nextElementSibling;
        if (ans) ans.classList.remove('open');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        q.classList.add('open');
        const answer = q.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });
})();

/* ── Gallery Filter ── */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      items.forEach(item => {
        const match = cat === 'all' || item.getAttribute('data-category') === cat;
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          item.style.display = match ? '' : 'none';
          if (match) {
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          }
        }, 200);
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      });
    });
  });
})();

/* ── Lightbox ── */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox');
      lightboxImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn && closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

/* ── Back to Top ── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Smooth Active Nav Link ── */
(function initActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-item, .offcanvas-links a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Testimonials Auto-Scroll (Simple) ── */
// Removed as per user request to keep cards static and bright.


/* ── Form Validation ── */
(function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#e85a4a';
          valid = false;
          setTimeout(() => { input.style.borderColor = ''; }, 2000);
        }
      });
      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Sent!';
          btn.disabled = true;
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.disabled = false;
            form.reset();
          }, 3000);
        }
      }
    });
  });
})();

/* ── Password Toggle ── */
(function initPasswordToggle() {
  document.querySelectorAll('.input-icon[data-toggle-pass]').forEach(icon => {
    icon.addEventListener('click', () => {
      const input = icon.previousElementSibling;
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'input-icon bi bi-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'input-icon bi bi-eye';
      }
    });
  });
})();

/* ── Hero Parallax ── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1.08) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
})();
