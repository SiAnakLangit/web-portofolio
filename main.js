/* =========================================================
   main.js — Portofolio (tema pixel/Minecraft-inspired)
   ========================================================= */

/* ---------------------------------------------------------
   1. NAVBAR — active state via IntersectionObserver + toggle mobile
   --------------------------------------------------------- */
(function navbar() {
  const navItems = document.querySelectorAll('#navbar .nav-list li');
  const sections = document.querySelectorAll('.stage');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(li => li.classList.remove('active'));
        const match = document.querySelector(`#navbar li[data-target="${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));

  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      const open = navbar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navbar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navbar.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }
})();

/* ---------------------------------------------------------
   2. SCROLL REVEAL — fade+slide ringan pakai IntersectionObserver
   --------------------------------------------------------- */
(function scrollReveal() {
  const targets = document.querySelectorAll(
    '.section-inner > *, .timeline-item, .project-row, .skill-item'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => io.observe(el));
})();

/* ---------------------------------------------------------
   3. PARALLAX RINGAN — awan & matahari di Home ikut gerakan mouse
   (murni transform CSS, tidak ada rendering 3D)
   --------------------------------------------------------- */
   (function homeParallax() {
  const home = document.getElementById('home');
  if (!home) return;

  const sun = home.querySelector('.mc-sun');
  if (!sun) return;
  let raf = null;

  home.addEventListener('pointermove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const r = home.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      sun.style.transform = `translate(${px * 16}px, ${py * 12}px)`;
      raf = null;
    });
  });
})();

/* ---------------------------------------------------------
   4. TOGGLE WAKTU — klik matahari/bulan untuk ganti Pagi/Malam
   --------------------------------------------------------- */
(function timeToggle() {
  const btn = document.getElementById('timeToggle');
  const home = document.getElementById('home');
  if (!btn || !home) return;

  function applyTime(value) {
    home.dataset.time = value;
    document.body.dataset.time = value; // supaya section lain (About–Project) ikut berubah
  }

  const saved = localStorage.getItem('mc-time');
  if (saved === 'night') applyTime('night');

  btn.addEventListener('click', () => {
    const next = home.dataset.time === 'night' ? 'day' : 'night';
    applyTime(next);
    localStorage.setItem('mc-time', next);
  });
})();

/* ---------------------------------------------------------
   5. LIGHTBOX PROJECT — klik preview untuk zoom
   --------------------------------------------------------- */
(function mediaLightbox() {
  const lightbox = document.getElementById('projectLightbox');
  const visualEl = document.getElementById('lightboxVisual');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox || !visualEl || !closeBtn) return;

  function show() {
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  // ---- Preview project (semua project sudah pasti ada fotonya) ----
  document.querySelectorAll('.project-visual').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const photo = trigger.querySelector('.visual-photo');
      if (!photo) return;
      visualEl.style.background = '#05060a';
      visualEl.innerHTML = '';
      const big = document.createElement('img');
      big.src = photo.src;
      big.alt = photo.alt;
      big.style.width = '100%';
      big.style.height = '100%';
      big.style.objectFit = 'contain';
      visualEl.appendChild(big);
      show();
    });
  });

  // ---- Preview foto bukti skill ----
  document.querySelectorAll('.skill-photo-item img').forEach(img => {
    img.addEventListener('click', () => {
      visualEl.style.background = '#05060a';
      visualEl.innerHTML = '';
      const big = document.createElement('img');
      big.src = img.src;
      big.alt = img.alt;
      big.style.width = '100%';
      big.style.height = '100%';
      big.style.objectFit = 'contain';
      visualEl.appendChild(big);
      show();
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

/* ---------------------------------------------------------
   6. SKILL CAROUSEL — panah kiri/kanan, 1 skill per halaman
   --------------------------------------------------------- */
(function skillCarousel() {
  const slides = document.querySelectorAll('#skill .skill-slide');
  const dots = document.querySelectorAll('#skill .skill-dot');
  const prevBtn = document.getElementById('skillPrev');
  const nextBtn = document.getElementById('skillNext');
  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = 0;

  function render() {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function go(next) {
    index = (index + next + slides.length) % slides.length;
    render();
  }

  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));
  dots.forEach((d, i) => d.addEventListener('click', () => { index = i; render(); }));
})();

/* ---------------------------------------------------------
   7. BINTANG JATUH — muncul tiap 5 menit saat mode malam
   --------------------------------------------------------- */
(function shootingStar() {
  const home = document.getElementById('home');
  const scene = home?.querySelector('.mc-scene');
  if (!home || !scene) return;

  const FIVE_MINUTES = 5 * 60 * 1000;

  function spawn() {
    if (home.dataset.time !== 'night') return;
    const star = document.createElement('span');
    star.className = 'shooting-star';
    star.style.top = (Math.random() * 30 + 5) + '%';
    star.style.left = (Math.random() * 40 + 50) + '%';
    scene.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
  }

  setInterval(spawn, FIVE_MINUTES);
})();