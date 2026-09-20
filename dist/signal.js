'use strict';
(() => {
  const canvas = document.getElementById('signal-canvas');
  const field = document.querySelector('.signal-field');
  const toggle = document.getElementById('motion-toggle');
  const ctx = canvas && canvas.getContext('2d');
  if (!ctx || !field || !toggle) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(pointer: fine)');
  let paused = reduced.matches, visible = true, width = 0, height = 0;
  let frame = 0, tick = 0, last = 0, pointerX = 0, pointerY = 0;
  let easedX = 0, easedY = 0;
  const TAU = Math.PI * 2;
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2, cy = height / 2;
    const scale = Math.min(width, height) * 0.31;
    easedX += (pointerX - easedX) * 0.04;
    easedY += (pointerY - easedY) * 0.04;
    const spin = tick * 0.075 + easedX * 0.22;
    const tilt = 0.69 + Math.sin(tick * 0.09) * 0.13 + easedY * 0.18;
    const c = Math.cos(tilt), s = Math.sin(tilt);
    // An abstract wire field: no external graphics engine or model download.
    for (let ring = 0; ring < 34; ring++) {
      const u = ring / 34 * TAU;
      ctx.beginPath();
      for (let step = 0; step <= 100; step++) {
        const v = step / 100 * TAU;
        const ripple = 0.075 * Math.sin(u * 3 + v * 2 + tick * 0.22);
        const radius = 0.86 + (0.32 + ripple) * Math.cos(v);
        const x = radius * Math.cos(u + spin);
        const y = radius * Math.sin(u + spin);
        const z = 0.49 * Math.sin(v) + 0.1 * Math.sin(u * 3 + tick * 0.15);
        const ry = y * c - z * s;
        const rz = y * s + z * c;
        const perspective = 3.6 / (3.6 - rz);
        const px = cx + x * scale * perspective;
        const py = cy + ry * scale * perspective;
        if (step === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = `rgba(255,255,255,${0.16 + 0.40 * ((Math.sin(u + spin) + 1) / 2)})`;
      ctx.lineWidth = 0.65;
      ctx.stroke();
    }
    // Sparse orbit marks emphasize the field's extent.
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 0.75;
    ctx.beginPath();ctx.ellipse(cx, cy, scale * 1.45, scale * 1.45, 0, 0, TAU);ctx.stroke();
    for (let i = 0; i < 64; i++) {
      const a = i / 64 * TAU;
      const radius = scale * 1.45;
      const length = i % 8 === 0 ? 8 : 3;
      ctx.beginPath();ctx.moveTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
      ctx.lineTo(cx + Math.cos(a) * (radius + length), cy + Math.sin(a) * (radius + length));ctx.stroke();
    }
  }
  function loop(now) {
    frame = 0;
    if (paused || !visible || document.hidden) return;
    if (now - last >= 33) {tick += 0.033; draw(); last = now;}
    frame = requestAnimationFrame(loop);
  }
  function sync() {
    cancelAnimationFrame(frame);frame = 0;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
    toggle.textContent = paused ? 'Play motion ▷' : 'Pause motion Ⅱ';
    draw();
    if (!paused && visible && !document.hidden) frame = requestAnimationFrame(loop);
  }
  function resize() {
    const box = field.getBoundingClientRect();width = box.width;height = box.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);draw();
  }
  toggle.addEventListener('click', () => {paused = !paused;sync();});
  reduced.addEventListener('change', () => {paused = reduced.matches;sync();});
  field.addEventListener('pointermove', event => {
    if (!fine.matches || paused) return;
    const box = field.getBoundingClientRect();
    pointerX = (event.clientX - box.left) / box.width - 0.5;
    pointerY = (event.clientY - box.top) / box.height - 0.5;
  }, {passive:true});
  field.addEventListener('pointerleave', () => {pointerX = 0;pointerY = 0;});
  document.addEventListener('visibilitychange', sync);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(field);
  else window.addEventListener('resize', resize, {passive:true});
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;sync();
  }, {rootMargin:'60px'}).observe(field);
  resize();sync();
})();
(() => {
  const bar = document.getElementById('reading-progress');
  let scheduled = false;
  const update = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${total > 0 ? Math.min(1, scrollY / total) : 0})`;
    scheduled = false;
  };
  addEventListener('scroll', () => {if (!scheduled) {scheduled = true;requestAnimationFrame(update);}}, {passive:true});
  addEventListener('resize', update, {passive:true});
  update();
})();
