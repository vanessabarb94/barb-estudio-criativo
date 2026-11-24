/* Thais Nalevaiko Arquitetura — v3
   Classic script: portfolio data, header/hero/menu/video, reveal systems,
   split-text animation engine, mouse-parallax background, antes/depois carousel. */

window.PORTFOLIO_ITEMS = [
  { src: 'assets/img/portfolio/sala-1.jpg', cat: 'Sala de estar', tipo: 'Residencial', alt: 'Sala de estar integrada, projeto residencial' },
  { src: 'assets/img/portfolio/sala-2.jpg', cat: 'Sala de estar', tipo: 'Residencial', alt: 'Sala de estar com iluminação em fita, projeto residencial' },
  { src: 'assets/img/portfolio/quarto-1.jpg', cat: 'Quartos', tipo: 'Residencial', alt: 'Suíte com closet integrado' },
  { src: 'assets/img/portfolio/quarto-2.jpg', cat: 'Quartos', tipo: 'Residencial', alt: 'Quarto com penteadeira iluminada' },
  { src: 'assets/img/portfolio/cozinha-1.jpg', cat: 'Cozinha e gourmet', tipo: 'Residencial', alt: 'Cozinha planejada com ilha' },
  { src: 'assets/img/portfolio/cozinha-2.jpg', cat: 'Cozinha e gourmet', tipo: 'Residencial', alt: 'Cozinha com esquadria preta e vista para o jardim' },
  { src: 'assets/img/portfolio/cozinha-3.jpg', cat: 'Cozinha e gourmet', tipo: 'Residencial', alt: 'Cozinha gourmet com marcenaria escura' },
  { src: 'assets/img/portfolio/cozinha-4.jpg', cat: 'Cozinha e gourmet', tipo: 'Residencial', alt: 'Cozinha integrada com bancada em granito' },
  { src: 'assets/img/portfolio/banho-1.jpg', cat: 'Banhos', tipo: 'Residencial', alt: 'Banheiro em mármore com box de vidro' },
  { src: 'assets/img/portfolio/banho-2.jpg', cat: 'Banhos', tipo: 'Residencial', alt: 'Banheiro com marcenaria clara' },
  { src: 'assets/img/portfolio/banho-3.jpg', cat: 'Banhos', tipo: 'Residencial', alt: 'Banheiro social com bancada dupla' },
  { src: 'assets/img/portfolio/closet-1.jpg', cat: 'Closet e marcenaria', tipo: 'Residencial', alt: 'Closet com marcenaria sob medida' },
  { src: 'assets/img/portfolio/closet-2.jpg', cat: 'Closet e marcenaria', tipo: 'Residencial', alt: 'Closet planejado com prateleiras iluminadas' },
  { src: 'assets/img/portfolio/closet-3.jpg', cat: 'Closet e marcenaria', tipo: 'Residencial', alt: 'Closet com armários em ripado de madeira' },
  { src: 'assets/img/portfolio/externa-1.jpg', cat: 'Área externa', tipo: 'Residencial', alt: 'Área externa com deck de madeira' },
  { src: 'assets/img/portfolio/externa-2.jpg', cat: 'Área externa', tipo: 'Residencial', alt: 'Área externa integrada com portas de vidro' },
  { src: 'assets/img/portfolio/externa-3.jpg', cat: 'Área externa', tipo: 'Residencial', alt: 'Varanda gourmet com forro de madeira' },
  { src: 'assets/img/portfolio/lounge-1.jpg', cat: 'Café e lounge', tipo: 'Comercial', alt: 'Espaço de estar comercial com portas de vidro' },
  { src: 'assets/img/portfolio/lounge-2.jpg', cat: 'Café e lounge', tipo: 'Comercial', alt: 'Área de convivência comercial com bancada e banquetas' },
  { src: 'assets/img/portfolio/comercial-1.jpg', cat: 'Comercial', tipo: 'Comercial', alt: 'Fachada de restaurante, projeto comercial' },
  { src: 'assets/img/portfolio/comercial-2.jpg', cat: 'Comercial', tipo: 'Comercial', alt: 'Fachada de pizzaria ao entardecer' },
  { src: 'assets/img/portfolio/comercial-3.jpg', cat: 'Comercial', tipo: 'Comercial', alt: 'Lounge de pizzaria com poltronas' },
  { src: 'assets/img/portfolio/comercial-4.jpg', cat: 'Comercial', tipo: 'Comercial', alt: 'Praça de alimentação em espaço comercial' },
  { src: 'assets/img/portfolio/comercial-5.jpg', cat: 'Comercial', tipo: 'Comercial', alt: 'Banheiro de uso comercial' },
  { src: 'assets/img/portfolio/comercial-6.jpg', cat: 'Comercial', tipo: 'Comercial', alt: 'Interior de farmácia planejada' },
];

(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Portal loader: plays on every load/refresh ---------- */
  var portal = document.getElementById('portal-loader');
  if (portal) {
    if (reduceMotion) {
      portal.classList.add('is-done');
    } else {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { portal.classList.add('is-visible'); });
      });
      setTimeout(function () {
        portal.classList.add('is-opening');
        document.body.style.overflow = '';
      }, 900);
      setTimeout(function () { portal.classList.add('is-done'); }, 900 + 950 + 150);
    }
  }

  /* ---------- Mouse-parallax background motif ---------- */
  var MOTIF_SVG = '<svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1">' +
    '<line x1="0" y1="120" x2="800" y2="120"/><line x1="120" y1="0" x2="120" y2="800"/>' +
    '<line x1="60" y1="60" x2="740" y2="740"/><circle cx="620" cy="200" r="90"/>' +
    '<rect x="480" y="480" width="220" height="220"/><line x1="0" y1="640" x2="800" y2="640"/>' +
    '</svg>';
  document.querySelectorAll('.bg-motif').forEach(function (el) { el.innerHTML = MOTIF_SVG; });

  if (!reduceMotion) {
    var mqx = 0, mqy = 0;
    document.addEventListener('mousemove', function (e) {
      mqx = (e.clientX / window.innerWidth) - 0.5;
      mqy = (e.clientY / window.innerHeight) - 0.5;
      document.documentElement.style.setProperty('--mx', mqx.toFixed(3));
      document.documentElement.style.setProperty('--my', mqy.toFixed(3));
    }, { passive: true });
  }

  /* ---------- Mobile / fullscreen menu ---------- */
  var menu = document.getElementById('site-menu');
  var menuToggle = document.getElementById('menu-toggle');
  var menuClose = document.getElementById('menu-close');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (menuToggle) menuToggle.addEventListener('click', function () { setMenu(true); });
  if (menuClose) menuClose.addEventListener('click', function () { setMenu(false); });
  document.querySelectorAll('#site-menu nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Header rule draw-in on load ---------- */
  var headerRule = document.getElementById('header-rule');
  window.addEventListener('load', function () {
    requestAnimationFrame(function () { if (headerRule) headerRule.classList.add('is-drawn'); });
  });

  /* ---------- Hero slideshow (fast-paced, many photos) ---------- */
  var slides = document.querySelectorAll('[data-hero-slide]');
  var dotsWrap = document.getElementById('hero-dots');
  if (dotsWrap) {
    slides.forEach(function (_, n) {
      var d = document.createElement('span');
      if (n === 0) d.className = 'is-active';
      dotsWrap.appendChild(d);
    });
  }
  var dots = dotsWrap ? dotsWrap.children : [];
  var heroIndex = 0;
  function showSlide(i) {
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
    for (var n = 0; n < dots.length; n++) dots[n].classList.toggle('is-active', n === i);
  }
  showSlide(0);
  if (slides.length > 1 && !reduceMotion) {
    setInterval(function () { heroIndex = (heroIndex + 1) % slides.length; showSlide(heroIndex); }, 4200);
  }

  /* ---------- Video: autoplay muted + sound toggle ---------- */
  var video = document.getElementById('tn-video');
  var soundBtn = document.getElementById('tn-sound');
  if (video) {
    video.muted = true; video.loop = true; video.playsInline = true;
    var p = video.play(); if (p && p.catch) p.catch(function () {});
  }
  if (soundBtn && video) {
    soundBtn.addEventListener('click', function () {
      video.muted = !video.muted;
      if (!video.muted) { video.volume = 0.7; video.play(); }
      soundBtn.textContent = video.muted ? 'Ativar som' : 'Desativar som';
    });
  }

  /* ---------- Header solid state on scroll (rAF) ---------- */
  var header = document.getElementById('site-header');
  var queued = false;
  function frame() {
    queued = false;
    var y = window.scrollY || 0;
    var vh = window.innerHeight;
    if (header) header.classList.toggle('is-solid', y > vh * 0.7);
  }
  function onScroll() { if (queued) return; queued = true; requestAnimationFrame(frame); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  frame();

  /* ---------- Split-text reveal engine ---------- */
  function buildSplit(el) {
    var text = el.textContent.trim();
    el.textContent = '';
    el.setAttribute('aria-label', text);
    var words = text.split(' ');
    var spans = [];
    words.forEach(function (word, wi) {
      var wordWrap = document.createElement('span');
      wordWrap.style.display = 'inline-block';
      wordWrap.style.whiteSpace = 'nowrap';
      [...word].forEach(function (ch) {
        var outer = document.createElement('span');
        outer.className = 'char-outer';
        var inner = document.createElement('span');
        inner.className = 'char-inner';
        inner.textContent = ch;
        inner.setAttribute('aria-hidden', 'true');
        outer.appendChild(inner);
        wordWrap.appendChild(outer);
        spans.push(inner);
      });
      el.appendChild(wordWrap);
      if (wi < words.length - 1) {
        var space = document.createElement('span');
        space.className = 'word-space';
        el.appendChild(space);
      }
    });
    return spans;
  }

  function playSplit(spans, stagger, baseDelay) {
    if (reduceMotion) { spans.forEach(function (s) { s.classList.add('is-revealed'); }); return; }
    spans.forEach(function (s, i) {
      setTimeout(function () { s.classList.add('is-revealed'); }, baseDelay + i * stagger);
    });
  }

  var splitTargets = document.querySelectorAll('[data-split-reveal]');
  var splitData = new Map();
  splitTargets.forEach(function (el) { splitData.set(el, buildSplit(el)); });

  var autoplayEl = document.querySelector('[data-split-autoplay]');
  if (autoplayEl) {
    setTimeout(function () { playSplit(splitData.get(autoplayEl), 22, 0); }, 350);
  }

  if ('IntersectionObserver' in window) {
    var splitIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.target !== autoplayEl) {
          playSplit(splitData.get(entry.target), 16, 0);
          splitIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    splitTargets.forEach(function (el) { if (el !== autoplayEl) splitIo.observe(el); });
  } else {
    splitTargets.forEach(function (el) { playSplit(splitData.get(el), 0, 0); });
  }

  /* ---------- Generic reveal-on-scroll (slide-in, eyebrow lines, sweeps, tables, cards) ---------- */
  document.querySelectorAll('[data-sweep]').forEach(function (el) {
    var line = document.createElement('div');
    line.className = 'sweep-line';
    el.appendChild(line);
  });

  var revealSelectors = '.slide-in-rl, .eyebrow, [data-sweep], .onde-table, .channel-card';
  var revealTargets = document.querySelectorAll(revealSelectors);
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Portfolio: fallback grid + filters ---------- */
  var fallbackEl = document.getElementById('portfolio-fallback-js');
  var filterButtons = document.querySelectorAll('.filter-btn');
  var countEl = document.getElementById('portfolio-count');

  if (fallbackEl) {
    var frag = document.createDocumentFragment();
    window.PORTFOLIO_ITEMS.forEach(function (item) {
      var figure = document.createElement('figure');
      figure.dataset.cat = item.cat;
      var img = document.createElement('img');
      img.src = item.src; img.alt = item.alt; img.loading = 'lazy';
      var figcaption = document.createElement('figcaption');
      figcaption.innerHTML = '<strong>' + item.cat + '</strong><small>' + item.tipo + '</small>';
      figure.appendChild(img); figure.appendChild(figcaption);
      frag.appendChild(figure);
    });
    fallbackEl.appendChild(frag);
    fallbackEl.hidden = false;
  }

  function applyFilter(cat) {
    var visible = 0;
    document.querySelectorAll('#portfolio-fallback-js figure').forEach(function (fig) {
      var match = cat === 'Tudo' || fig.dataset.cat === cat;
      fig.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });
    if (countEl) countEl.textContent = visible + (visible === 1 ? ' imagem' : ' imagens');
    filterButtons.forEach(function (btn) { btn.classList.toggle('is-active', btn.dataset.filter === cat); });
    document.dispatchEvent(new CustomEvent('portfolio:filter', { detail: { category: cat } }));
  }
  filterButtons.forEach(function (btn) { btn.addEventListener('click', function () { applyFilter(btn.dataset.filter); }); });

  /* ---------- Antes/depois carousel nav ---------- */
  var adTrack = document.getElementById('ad-track');
  var adPrev = document.getElementById('ad-prev');
  var adNext = document.getElementById('ad-next');
  function adScrollBy(dir) {
    if (!adTrack) return;
    var card = adTrack.querySelector('[data-ad-card]');
    var step = card ? card.getBoundingClientRect().width + 22 : 400;
    adTrack.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
  if (adPrev) adPrev.addEventListener('click', function () { adScrollBy(-1); });
  if (adNext) adNext.addEventListener('click', function () { adScrollBy(1); });
  document.querySelectorAll('[data-ad-card]').forEach(function (card) {
    card.addEventListener('click', function () {
      if (window.matchMedia('(pointer: coarse)').matches) card.classList.toggle('is-touched');
    });
  });

  /* ---------- Custom cursor ---------- */
  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    var wrap = document.createElement('div');
    wrap.id = 'tn-cursor';
    var ring = document.createElement('div'); ring.className = 'ring';
    var dot = document.createElement('div'); dot.className = 'dot';
    wrap.appendChild(ring); wrap.appendChild(dot);
    document.body.appendChild(wrap);

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2, rx = tx, ry = ty, dx = tx, dy = ty;
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      var inter = e.target && e.target.closest && e.target.closest('a, button');
      wrap.classList.toggle('is-interactive', !!inter);
    }, { passive: true });

    (function loop() {
      rx += (tx - rx) * 0.14; ry += (ty - ry) * 0.14;
      dx += (tx - dx) * 0.42; dy += (ty - dy) * 0.42;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }
})();
