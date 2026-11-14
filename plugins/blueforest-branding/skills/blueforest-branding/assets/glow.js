/* BlueForest Studios Design System v5 "Glow" — glow.js (load with defer, after Lenis if the page uses it)
   - Smooth scroll: starts Lenis when window.Lenis exists (body[data-no-lenis] opts out; consoles never load it)
   - [data-rv]        rises into view, 90ms stagger          - [data-words]   headline words rise one by one
   - [data-nav]       gets .shrink once the page moves        - [data-play]    opens data-src in the on-page player
   - [data-count]     counts up to its number once            - .bfs-seg       segmented control pressed state
   - canvas[data-field]  the lit field (night sections)       - [data-mag]     primary button leans toward the pointer
   - BFS.audit()      checks the page against the SKILL.md rules (also runs on load; warnings go to the console) */
(() => {
  const d = document, root = d.documentElement;
  const R = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  // Smooth scrolling, same settings as blueforeststudios.com
  let lenis = null;
  if (window.Lenis && !R && !d.body.hasAttribute('data-no-lenis') && !d.querySelector('.bfs-con')) {
    lenis = new Lenis({ lerp: +d.body.dataset.lerp || 0.1 });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    d.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const t = a.getAttribute('href').length > 1 && d.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80 }); }
    }));
  }

  // Reveal on scroll, staggered 90ms within each batch that enters together
  const io = new IntersectionObserver(es => {
    let i = 0;
    es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.setProperty('--d', (i++ * 90) + 'ms');
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  d.querySelectorAll('[data-rv]').forEach(el => io.observe(el));

  // Headline words rise one after another
  d.querySelectorAll('[data-words]').forEach(h => {
    h.setAttribute('aria-label', h.textContent.trim());
    h.innerHTML = h.textContent.trim().split(/\s+/)
      .map((w, i) => `<span class="bfs-w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
  });
  requestAnimationFrame(() => requestAnimationFrame(() => d.body.classList.add('ready')));

  // Header shrink + page scroll progress (--sp, 0 to 1)
  const nav = d.querySelector('[data-nav]');
  const onScroll = () => {
    const y = scrollY, max = root.scrollHeight - innerHeight;
    if (nav) nav.classList.toggle('shrink', y > 24);
    root.style.setProperty('--sp', max > 0 ? (y / max).toFixed(4) : 0);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Player: ▶ always plays on this page
  let dlg = null;
  const play = src => {
    if (!dlg) {
      dlg = d.createElement('dialog');
      dlg.className = 'bfs-player';
      dlg.innerHTML = '<button class="x" aria-label="Close player">×</button><video controls playsinline></video>';
      d.body.append(dlg);
      const v = dlg.querySelector('video');
      dlg.querySelector('.x').onclick = () => dlg.close();
      dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', () => v.pause());
    }
    const v = dlg.querySelector('video');
    if (v.getAttribute('src') !== src) v.src = src;
    dlg.showModal(); v.play().catch(() => {});
  };
  d.querySelectorAll('[data-play]').forEach(b => b.addEventListener('click', () => play(b.dataset.src)));

  // Numbers count up once when they scroll into view
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, dec = (el.dataset.count.split('.')[1] || '').length;
    const fmt = n => (el.dataset.pre || '') + n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + (el.dataset.suf || '');
    if (R) { el.textContent = fmt(to); return; }
    const t0 = performance.now(), dur = 1100;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = fmt(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }));
  d.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // Segmented control: one pressed button per group
  d.querySelectorAll('.bfs-seg button').forEach(b => b.addEventListener('click', () =>
    b.parentElement.querySelectorAll('button').forEach(o => o.setAttribute('aria-pressed', o === b))));

  // The lit field: a grid of dots. A light (the pointer, or a slow drift when nobody is pointing)
  // brightens the dots near it and pushes them apart, like light coming through a canopy.
  d.querySelectorAll('canvas[data-field]').forEach(c => {
    const x = c.getContext('2d'), host = c.parentElement, G = 28;
    let w = 0, h = 0, vis = false, idle = true, px = 0, py = 0, lx = 0, ly = 0, running = false;
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!lx) { lx = w * .7; ly = h * .4; }
    };
    const draw = t => {
      const tx = idle ? w * (.5 + .36 * Math.sin(t / 5200)) : px;
      const ty = idle ? h * (.5 + .3 * Math.sin(t / 3700 + 1)) : py;
      lx += (tx - lx) * (R ? 1 : .07); ly += (ty - ly) * (R ? 1 : .07);
      const rad = Math.max(240, Math.min(w, h) * .55);
      x.clearRect(0, 0, w, h);
      const g = x.createRadialGradient(lx, ly, 0, lx, ly, rad * 1.5);
      g.addColorStop(0, 'rgba(0,157,220,.26)'); g.addColorStop(1, 'rgba(0,157,220,0)');
      x.fillStyle = g; x.fillRect(0, 0, w, h);
      for (let gy = G / 2; gy < h; gy += G) for (let gx = G / 2; gx < w; gx += G) {
        const dx = gx - lx, dy = gy - ly, dist = Math.hypot(dx, dy) || 1;
        const k = Math.max(0, 1 - dist / rad), e = k * k, push = e * 9;
        x.fillStyle = `rgba(127,208,240,${(.15 + e * .6).toFixed(3)})`;
        x.beginPath(); x.arc(gx + dx / dist * push, gy + dy / dist * push, 1 + e * 2.1, 0, 6.2832); x.fill();
      }
      running = vis && !R;
      if (running) requestAnimationFrame(draw);
    };
    const kick = () => { if (!running) { running = true; requestAnimationFrame(draw); } };
    new ResizeObserver(() => { size(); kick(); }).observe(host);
    new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) kick(); }).observe(host);
    host.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      px = e.clientX - r.left; py = e.clientY - r.top; idle = false;
      if (R) kick();
    });
    host.addEventListener('pointerleave', () => { idle = true; });
  });

  // Magnetic buttons: the primary pill leans a few pixels toward the pointer
  if (!R && matchMedia('(hover:hover)').matches) d.querySelectorAll('[data-mag]').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${((e.clientX - r.left) / r.width - .5) * 10}px,${((e.clientY - r.top) / r.height - .5) * 8}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });

  // Audit: measures the page against SKILL.md (surfaces, header, text budget, picture share). Warnings only.
  function audit() {
    if (d.querySelector('.bfs-con')) return null; // consoles have no page surfaces or word budget
    const S = '.bfs-s-pale,.bfs-s-white,.bfs-s-night,.bfs-s-blue,.bfs-s-slate,.bfs-phead';
    const all = [...d.querySelectorAll(S)].filter(el => !el.parentElement.closest(S) && !el.closest('[data-bfs-exclude],.bfs-nav,.bfs-player'));
    const kind = el => ['pale', 'white', 'night', 'blue', 'slate'].find(k => el.classList.contains('bfs-s-' + k)) || 'night';
    const tot = {}; let sum = 0;
    all.forEach(el => { tot[kind(el)] = (tot[kind(el)] || 0) + el.offsetHeight; sum += el.offsetHeight; });
    if (!sum) return null;
    const pct = k => Math.round((tot[k] || 0) / sum * 100);
    const r = { pale: pct('pale'), white: pct('white'), night: pct('night'), blue: pct('blue'), slate: pct('slate'), warnings: [] };
    r.reading = r.pale + r.white;
    const count = s => ((s || '').match(/\S+/g) || []).length;
    const words = el => {
      let n = count(el.innerText);
      el.querySelectorAll('figure,.bfs-media,svg').forEach(f => {
        if (!f.parentElement.closest('figure,.bfs-media,svg')) n -= count(f.innerText !== undefined ? f.innerText : f.textContent);
      });
      return Math.max(n, 0);
    };
    const VIS = 'img,video,picture,iframe,figure,[data-bfs-art],.bfs-media,.bfs-flow,.bfs-diagram,.bfs-chart';
    const isVis = el => { const b = el.getBoundingClientRect(); return b.width >= 120 && b.height >= 80; };
    const hero = all[0], next = all[1];
    const body = all.slice(1).filter(el => !el.matches('.bfs-footer,footer'));
    r.headerImage = !!(hero && hero.querySelector('img,video,picture,[data-bfs-art]'));
    r.textBandUnderHeader = !!(next && !next.matches('.bfs-footer') && next.offsetHeight < innerHeight * .5 && ![...next.querySelectorAll(VIS + ',canvas')].some(isVis));
    r.words = body.reduce((n, el) => n + words(el), 0);
    r.wordySections = body.filter(el => words(el) > 150).map(el => (el.querySelector('h2,h3') || el).innerText.slice(0, 40));
    const spans = []; let h = 0, cov = 0, end = -Infinity;
    body.forEach(el => {
      h += el.getBoundingClientRect().height;
      el.querySelectorAll(VIS).forEach(v => { if (isVis(v)) { const b = v.getBoundingClientRect(); spans.push([b.top + scrollY, b.bottom + scrollY]); } });
    });
    spans.sort((a, b) => a[0] - b[0]).forEach(sp => { if (sp[1] > end) { cov += sp[1] - Math.max(sp[0], end); end = sp[1]; } });
    r.pictureShare = h ? Math.round(cov / h * 100) : 0;
    r.kickers = d.querySelectorAll('.bfs-kicker').length;
    r.placeholders = d.querySelectorAll('img[src*="picsum.photos"],img[src^="REPLACE"]').length + (d.body.innerText.match(/REPLACE/g) || []).length;
    const W = r.warnings;
    if (r.reading < 50) W.push(`Pale and white sections cover ${r.reading}% of the page (floor 50%): night, blue and slate are feature bands (rule 1)`);
    all.forEach((el, i) => { if (i && kind(el) === kind(all[i - 1]) && !['pale', 'white'].includes(kind(el))) W.push(`Two ${kind(el)} sections in a row (rule 1)`); });
    all.filter(el => kind(el) === 'blue' && el.querySelector('p')).forEach(() => W.push('Blue band holds a headline and one button only: white body text on blue fails contrast (rule 1)'));
    if (!r.headerImage) W.push('Header has no image: the hero or plan header carries one picture (rule 2)');
    if (r.textBandUnderHeader) W.push('Text-only band under the header: start the content (rule 2)');
    if (r.kickers > 1) W.push(`${r.kickers} kickers on the page: only the hero gets one (rule 8)`);
    if (r.pictureShare < 30) W.push(`Pictures cover ${r.pictureShare}% of the page below the header (aim 40%, floor 30%) (rule 9)`);
    if (r.words > 700) W.push(`${r.words} words below the header (budget 700): fold detail into .bfs-more (rule 9)`);
    if (r.wordySections.length) W.push('Sections over 150 words: ' + r.wordySections.join(' · '));
    if (r.placeholders) W.push(`${r.placeholders} placeholder(s) left (REPLACE / picsum): not shippable`);
    r.ok = !W.length;
    W.forEach(w => console.warn('[BFS] ' + w));
    return r;
  }
  addEventListener('load', () => setTimeout(audit, 600));

  window.BFS = { audit, play, lenis, reduced: R };
})();
