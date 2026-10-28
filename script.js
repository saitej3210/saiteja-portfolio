/* Kodi Saiteja portfolio — scroll-controlled character engine.
   Edit TOTAL / FRAME_PATH only if you change the frames folder. */
(() => {
  "use strict";
  document.documentElement.classList.remove("no-js");

  const TOTAL = 240;
  const FRAME_W = 1600, FRAME_H = 900;                    // size of each WebP frame
  const FRAME_PATH = i => `assets/frames/f${String(i).padStart(3, "0")}.webp`;

  const canvas = document.getElementById("character");
  const ctx = canvas.getContext("2d");
  const images = new Array(TOTAL);
  const ready = new Array(TOTAL).fill(false);
  let loadedCount = 0, vw = 0, vh = 0, dpr = 1;

  /* ---------- sections -> animation stops (read from data-* in index.html) ---------- */
  const secs = [...document.querySelectorAll(".sec")].map(el => {
    const f = el.dataset.frames.split(",").map(Number);
    const x = el.dataset.cx.split(",").map(Number);
    const k = el.dataset.k.split(",").map(Number);
    return { el, id: el.id, f0: f[0], f1: f[1], x0: x[0], x1: x[1], k0: k[0], k1: k[1] };
  });

  const mobile = () => window.innerWidth <= 1040;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  function target() {
    const y = window.scrollY + vh * 0.5;
    let s = secs[secs.length - 1];
    for (const c of secs) { if (y < c.el.offsetTop + c.el.offsetHeight) { s = c; break; } }
    const t = clamp((y - s.el.offsetTop) / s.el.offsetHeight, 0, 1);
    // Last frame is reached at the very bottom of the page.
    const atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 2;
    let frame = lerp(s.f0, s.f1, t);
    if (atEnd) frame = TOTAL - 1;
    let cx = lerp(s.x0, s.x1, t), k = lerp(s.k0, s.k1, t);
    if (mobile()) { cx = 0.5; k *= s.id === "top" ? 0.78 : 0.82; }
    return { frame, cx, k, id: s.id };
  }

  /* ---------- canvas ---------- */
  function resize() {
    vw = window.innerWidth; vh = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    render(true);
  }

  // nearest already-loaded frame, so there are never blank flashes
  function nearest(i) {
    if (ready[i]) return i;
    for (let d = 1; d < TOTAL; d++) {
      if (i - d >= 0 && ready[i - d]) return i - d;
      if (i + d < TOTAL && ready[i + d]) return i + d;
    }
    return -1;
  }

  const cur = { frame: 0, cx: 0.72, k: 0.98 };
  let first = true;

  function render(force) {
    const tg = target();
    if (first) { Object.assign(cur, tg); first = false; }
    const ease = 0.14;
    cur.frame = lerp(cur.frame, tg.frame, ease);
    cur.cx = lerp(cur.cx, tg.cx, 0.08);
    cur.k = lerp(cur.k, tg.k, 0.08);
    const idx = nearest(clamp(Math.round(cur.frame), 0, TOTAL - 1));
    ctx.clearRect(0, 0, vw, vh);
    if (idx >= 0) {
      const sc = (vh / FRAME_H) * cur.k;
      const w = FRAME_W * sc, h = FRAME_H * sc;
      // frames are authored with the character near the middle (x≈0.36–0.72 of frame)
      const charCx = 0.54;
      const x = cur.cx * vw - charCx * w;
      const y = vh - h + h * 0.012;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(images[idx], x, y, w, h);
    }
    document.body.classList.toggle("on-red", tg.id === "contact");
    const moving = Math.abs(cur.frame - tg.frame) > 0.05 || Math.abs(cur.cx - tg.cx) > 0.001 || Math.abs(cur.k - tg.k) > 0.001;
    if (moving) requestAnimationFrame(() => render());
  }

  let ticking = false;
  function updateScrollUI() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    const bar = document.getElementById("scroll-progress-fill");
    if (bar) bar.style.width = pct + "%";
    const top = document.getElementById("back-top");
    if (top) top.classList.toggle("visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", () => {
    updateScrollUI();
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { ticking = false; render(); });
  }, { passive: true });
  window.addEventListener("resize", resize);

  /* ---------- preload: key frames first, then the rest in order ---------- */
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loader-fill");
  const txt = document.getElementById("loader-text");
  let loaderDone = false;
  function finishLoader() { if (loaderDone) return; loaderDone = true; loader.classList.add("done"); render(true); }

  function loadOne(i) {
    return new Promise(res => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { images[i] = img; ready[i] = true; loadedCount++; progress(); res(); };
      img.onerror = () => { loadedCount++; progress(); res(); };
      img.src = FRAME_PATH(i);
    });
  }
  function progress() {
    const p = Math.round((loadedCount / TOTAL) * 100);
    fill.style.width = p + "%"; txt.textContent = "LOADING " + p + "%";
    if (p === 100 || loadedCount >= 48) finishLoader();
    if (!first) render();
  }
  async function preload() {
    const order = [0, 239, 120, 60, 180, 30, 90, 150, 210];
    for (let i = 0; i < TOTAL; i++) if (!order.includes(i)) order.push(i);
    let pos = 0;
    const worker = async () => { while (pos < order.length) await loadOne(order[pos++]); };
    await Promise.all(Array.from({ length: 6 }, worker));
  }
  setTimeout(finishLoader, 6000);   // never trap the visitor behind the loader

  /* ---------- UI: reveal, nav, menu ---------- */
  const navLinks = [...document.querySelectorAll(".links a[data-sec]")];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
    document.querySelectorAll(".rv").forEach(el => io.observe(el));
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.dataset.sec === e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(s => spy.observe(s.el));
  } else {
    document.querySelectorAll(".rv").forEach(el => el.classList.add("in"));
  }

  const burger = document.getElementById("burger"), links = document.getElementById("links");
  function setMenu(open) {
    links.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && links.classList.contains("open")) {
      setMenu(false);
      burger.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1040 && links.classList.contains("open")) setMenu(false);
  });

  /* ---------- extra interactions ---------- */
  const themeButton = document.getElementById("theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  function setTheme(dark) {
    document.body.classList.toggle("dark-theme", dark);
    if (themeButton) {
      themeButton.textContent = dark ? "☼" : "◐";
      themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      themeButton.title = dark ? "Switch to light theme" : "Switch to dark theme";
    }
    if (themeMeta) themeMeta.content = dark ? "#171516" : "#f3efe9";
    try { localStorage.setItem("saiteja-theme", dark ? "dark" : "light"); } catch (_) {}
  }
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem("saiteja-theme") || "light"; } catch (_) {}
  setTheme(savedTheme === "dark");
  themeButton?.addEventListener("click", () => setTheme(!document.body.classList.contains("dark-theme")));

  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const projects = [...document.querySelectorAll(".proj[data-category]")];
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";
    filterButtons.forEach(b => { const active = b === button; b.classList.toggle("active", active); b.setAttribute("aria-pressed", String(active)); });
    projects.forEach(project => { project.hidden = filter !== "all" && project.dataset.category !== filter; });
  }));

  const toast = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message; toast.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }
  document.getElementById("copy-email")?.addEventListener("click", async event => {
    const email = event.currentTarget.dataset.email || "saitejakodi3@gmail.com";
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
      else { const area = document.createElement("textarea"); area.value = email; area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); }
      showToast("Email copied — let's build something great.");
    } catch (_) { showToast("Email: " + email); }
  });
  document.getElementById("back-top")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));

  resize();
  updateScrollUI();
  preload();
})();
