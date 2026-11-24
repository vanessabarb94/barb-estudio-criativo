/* Thais Nalevaiko Arquitetura — v3
   Portfolio 3D depth gallery (three.js, classic global build loaded before
   this script — works from a plain double-clicked index.html too, not just
   over http(s), since ES module scripts are blocked on the file:// origin).
   Progressive enhancement over the real <figure> grid rendered by script.js
   — that grid stays as the accessible / no-WebGL fallback. */

function supportsWebGL() {
  try {
    var c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) { return false; }
}

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(function () {
  var wrap = document.getElementById('gallery3d-wrap');
  var canvas = document.getElementById('gallery3d-canvas');
  var fallback = document.getElementById('portfolio-fallback-js');
  var items = window.PORTFOLIO_ITEMS || [];

  if (!wrap || !canvas || !items.length || !supportsWebGL()) return;
  if (typeof THREE === 'undefined') return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var DEPTH = 42;
  var VISIBLE = Math.min(14, Math.max(8, items.length));
  var MAX_X = 2.0;
  var MAX_Y = 1.3;
  var CAM_Z = 6;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 0, CAM_Z);

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  } catch (e) { return; }
  renderer.setClearColor(0x2b2620, 1);

  // No crossOrigin here on purpose: these images are always same-directory
  // local files, and forcing CORS-mode fetches breaks image loading when the
  // page is opened straight from disk (file://), which is how this site gets
  // previewed most of the time.
  var loader = new THREE.TextureLoader();
  var textureCache = {};
  function getTexture(src) {
    if (!textureCache[src]) {
      var tex = loader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace;
      textureCache[src] = tex;
    }
    return textureCache[src];
  }

  var pool = []; // { mesh, material, imageIndex, z, x, y }
  var activeItems = items.slice();

  function goldenSpread(i, count) {
    var hAngle = (i * 2.618) % (Math.PI * 2);
    var vAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
    var hR = (i % 3) * 0.9;
    var vR = ((i + 1) % 4) * 0.6;
    return {
      x: (Math.sin(hAngle) * hR * MAX_X) / 2,
      y: (Math.cos(vAngle) * vR * MAX_Y) / 2.4,
    };
  }

  function disposePool() {
    pool.forEach(function (p) {
      scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.material.dispose();
    });
    pool = [];
  }

  function buildPool(list) {
    disposePool();
    var total = list.length;
    for (var i = 0; i < VISIBLE; i++) {
      var spread = goldenSpread(i, VISIBLE);
      var z = ((DEPTH / VISIBLE) * i) % DEPTH;
      var imageIndex = total > 0 ? i % total : 0;
      var geo = new THREE.PlaneGeometry(1, 1);
      var mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: true, depthTest: true });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(spread.x, spread.y, z - DEPTH);
      scene.add(mesh);
      pool.push({ mesh: mesh, material: mat, imageIndex: imageIndex, z: z, x: spread.x, y: spread.y, ratio: 1 });
      applyTexture(pool[i], list);
    }
  }

  function applyTexture(plane, list) {
    var item = list[plane.imageIndex];
    if (!item) return;
    var tex = getTexture(item.src);
    plane.material.map = tex;
    plane.material.needsUpdate = true;
    if (tex.image && tex.image.width) {
      setScale(plane, tex.image.width / tex.image.height);
    } else {
      tex.onUpdate = null;
      var img = new Image();
      img.onload = function () { setScale(plane, img.width / img.height); };
      img.src = item.src;
    }
  }

  function setScale(plane, aspect) {
    plane.ratio = aspect;
    var h = 2.1, w = h * aspect;
    if (w > 3.2) { w = 3.2; h = w / aspect; }
    plane.mesh.scale.set(w, h, 1);
  }

  buildPool(activeItems);

  /* interaction: wheel + drag/touch drive a velocity; gentle autoplay otherwise */
  var velocity = 0;
  var autoPlay = true;
  var lastInteraction = Date.now();
  var dragging = false;
  var lastX = 0, lastY = 0;

  function bump(delta) {
    velocity += delta;
    autoPlay = false;
    lastInteraction = Date.now();
  }

  /* Wheel is intentionally NOT captured here: the gallery must never trap page
     scroll — visitors need to reach the next section without fighting the canvas. */

  canvas.addEventListener('pointerdown', function (e) {
    dragging = true;
    lastX = e.clientX; lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    wrap.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    lastX = e.clientX; lastY = e.clientY;
    bump(-dx * 0.01);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (evt) {
    canvas.addEventListener(evt, function () { dragging = false; wrap.style.cursor = 'grab'; });
  });

  var idleTimer = setInterval(function () {
    if (Date.now() - lastInteraction > 2600) autoPlay = true;
  }, 500);

  /* subtle mouse-reactive camera drift for extra life */
  var pointerNX = 0, pointerNY = 0;
  if (!reduceMotion) {
    wrap.addEventListener('pointermove', function (e) {
      var r = wrap.getBoundingClientRect();
      pointerNX = ((e.clientX - r.left) / r.width) - 0.5;
      pointerNY = ((e.clientY - r.top) / r.height) - 0.5;
    }, { passive: true });
    wrap.addEventListener('pointerleave', function () { pointerNX = 0; pointerNY = 0; });
  }

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  var clock = new THREE.Clock();
  var raf = null;

  function resize() {
    var w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function tick() {
    raf = requestAnimationFrame(tick);
    var delta = Math.min(clock.getDelta(), 0.05);

    if (autoPlay && !reduceMotion) velocity += 0.22 * delta;
    velocity *= 0.94;

    if (!reduceMotion) {
      camera.position.x += (pointerNX * 0.9 - camera.position.x) * 0.04;
      camera.position.y += (-pointerNY * 0.6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -DEPTH / 2);
    }

    var total = activeItems.length;
    var advance = total > 0 ? (VISIBLE % total || total) : 0;

    pool.forEach(function (p) {
      var newZ = p.z + velocity * delta * 10;
      var wrapsF = 0, wrapsB = 0;
      if (newZ >= DEPTH) { wrapsF = Math.floor(newZ / DEPTH); newZ -= DEPTH * wrapsF; }
      else if (newZ < 0) { wrapsB = Math.ceil(-newZ / DEPTH); newZ += DEPTH * wrapsB; }

      if (wrapsF > 0 && advance > 0 && total > 0) {
        p.imageIndex = (p.imageIndex + wrapsF * advance) % total;
        applyTexture(p, activeItems);
      }
      if (wrapsB > 0 && advance > 0 && total > 0) {
        var step = p.imageIndex - wrapsB * advance;
        p.imageIndex = ((step % total) + total) % total;
        applyTexture(p, activeItems);
      }

      p.z = ((newZ % DEPTH) + DEPTH) % DEPTH;
      p.mesh.position.z = p.z - DEPTH + CAM_Z - 1.2;

      var norm = p.z / DEPTH;
      var op = 1;
      if (norm < 0.035) op = norm / 0.035;
      else if (norm > 0.95) op = clamp01((1 - norm) / 0.05);
      p.material.opacity = clamp01(op);
    });

    renderer.render(scene, camera);
  }

  var ro = new ResizeObserver(function () { resize(); });
  ro.observe(wrap);
  resize();
  tick();

  /* swap fallback grid for the interactive canvas, keeping the grid for AT */
  wrap.hidden = false;
  wrap.classList.add('is-active');
  wrap.removeAttribute('aria-hidden');
  canvas.setAttribute('aria-hidden', 'true');
  wrap.setAttribute('tabindex', '0');
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', 'Galeria 3D interativa do portfólio: role, arraste ou use os filtros para navegar');
  if (fallback) fallback.classList.add('sr-only');

  document.addEventListener('portfolio:filter', function (e) {
    var cat = e.detail && e.detail.category;
    activeItems = (!cat || cat === 'Tudo') ? items.slice() : items.filter(function (it) { return it.cat === cat; });
    velocity = 0;
    buildPool(activeItems);
  });
});
