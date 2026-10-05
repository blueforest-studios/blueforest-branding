/* BlueForest Studios — Design System v4 "Frame" runtime. Load with `defer` after frame.css.
   Everything is opt-in by markup:
   - <svg class="bfs-icon"><use href="#bfs-play|bfs-arrow|bfs-ext"/></svg>  icon sprite (injected here)
   - [data-play] + data-src (mp4/webm → <video>, anything else → <iframe>) + data-title [+ data-href]
   - [data-tc="01:04:22:00"]  live 24fps timecode
   - .bfs-tabs[data-filter="#reelId"] buttons[data-f]  ↔  items[data-type="video web"]
   - .bfs-toc a[href="#id"]  current-section highlight
   - [data-bfs-audit]  live surface audit table (also BFS.audit() in the console)            */
(function () {
  'use strict';
  var doc = document;

  // Icon sprite
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0" aria-hidden="true">' +
    '<symbol id="bfs-play" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></symbol>' +
    '<symbol id="bfs-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" d="M5 12h14M13 6l6 6-6 6"/></symbol>' +
    '<symbol id="bfs-ext" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" d="M7 17L17 7M8 7h9v9"/></symbol></svg>';
  doc.body.insertAdjacentHTML('afterbegin', sprite);

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function pad(n) { return String(n).padStart(2, '0'); }

  // Live timecode
  var tcs = doc.querySelectorAll('[data-tc]');
  if (tcs.length) {
    var p = (tcs[0].dataset.tc || '01:00:00:00').split(':').map(Number);
    var base = ((p[0] * 60 + p[1]) * 60 + p[2]) * 24 + (p[3] || 0), t0 = performance.now();
    var tick = function () {
      var f = base + Math.floor((performance.now() - t0) / 1000 * 24), s = Math.floor(f / 24);
      var txt = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60) + ':' + pad(f % 24);
      tcs.forEach(function (e) { e.textContent = txt; });
      if (!reduce) requestAnimationFrame(tick);
    };
    tick();
  }

  // Player — one <dialog>, created on first use. Native controls carry the scrub bar + playhead.
  var dlg;
  function player() {
    if (dlg) return dlg;
    doc.body.insertAdjacentHTML('beforeend',
      '<dialog class="bfs-player" aria-label="Video player"><div class="bfs-player-head"><div><span class="bfs-hud">Now playing</span><h3></h3></div>' +
      '<button class="bfs-player-x" aria-label="Close player">×</button></div><div class="bfs-player-screen"></div>' +
      '<div class="bfs-player-foot"><span class="bfs-hud"></span><a class="bfs-act" hidden>Case study <svg class="bfs-icon bfs-i-arrow"><use href="#bfs-arrow"/></svg></a></div></dialog>');
    dlg = doc.body.lastElementChild;
    dlg.querySelector('.bfs-player-x').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { dlg.querySelector('.bfs-player-screen').innerHTML = ''; });
    return dlg;
  }
  function play(el) {
    var d = player(), src = el.dataset.src || '', screen = d.querySelector('.bfs-player-screen'), link = d.querySelector('.bfs-act');
    d.querySelector('h3').textContent = el.dataset.title || '';
    d.querySelector('.bfs-player-foot .bfs-hud').textContent = el.dataset.meta || '';
    if (!src) {
      screen.innerHTML = '<div style="height:100%;display:grid;place-items:center;text-align:center;padding:2rem"><span class="bfs-hud">Draft: add data-src to play this film</span></div>';
      console.warn('[BFS] data-play without data-src:', el);
    } else if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(src)) {
      screen.innerHTML = '<video controls autoplay playsinline preload="metadata"></video>';
      var v = screen.firstChild; v.src = src; if (el.dataset.poster) v.poster = el.dataset.poster;
    } else {
      screen.innerHTML = '<iframe allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
      screen.firstChild.src = src; screen.firstChild.title = el.dataset.title || 'Video';
    }
    link.hidden = !el.dataset.href; if (el.dataset.href) link.href = el.dataset.href;
    d.showModal();
  }
  doc.addEventListener('click', function (e) {
    var el = e.target.closest('[data-play]');
    if (el) { e.preventDefault(); play(el); }
  });

  // Filters
  doc.querySelectorAll('.bfs-tabs[data-filter]').forEach(function (tabs) {
    var target = doc.querySelector(tabs.dataset.filter);
    if (!target) return;
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-f]'); if (!b) return;
      tabs.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      var f = b.dataset.f;
      target.querySelectorAll('[data-type]').forEach(function (it) { it.hidden = f !== 'all' && it.dataset.type.split(' ').indexOf(f) < 0; });
      target.classList.toggle('bfs-filtered', f !== 'all');
    });
  });

  // TOC highlight
  var tocLinks = [].slice.call(doc.querySelectorAll('.bfs-toc a[href^="#"]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) { a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    tocLinks.forEach(function (a) { var s = doc.getElementById(a.getAttribute('href').slice(1)); if (s) io.observe(s); });
  }

  // Surface audit: top-level .bfs-dark/.bfs-mid/.bfs-light blocks (not nested, not in the player, not [data-bfs-exclude])
  function audit() {
    var all = [].slice.call(doc.querySelectorAll('.bfs-dark,.bfs-mid,.bfs-light')).filter(function (el) {
      var anc = el.parentElement && el.parentElement.closest('.bfs-dark,.bfs-mid,.bfs-light');
      return el !== doc.body && (!anc || anc === doc.body) && !el.closest('[data-bfs-exclude],.bfs-player');
    });
    var tot = { light: 0, mid: 0, dark: 0 }, sum = 0;
    all.forEach(function (el) {
      var k = el.classList.contains('bfs-dark') ? 'dark' : el.classList.contains('bfs-mid') ? 'mid' : 'light';
      tot[k] += el.offsetHeight; sum += el.offsetHeight;
    });
    if (!sum) return null;
    var r = { light: Math.round(tot.light / sum * 100), mid: Math.round(tot.mid / sum * 100), dark: Math.round(tot.dark / sum * 100),
      startsDark: !!(all[0] && all[0].classList.contains('bfs-dark')) };
    r.ok = r.dark <= 25 && r.light >= Math.max(r.mid, r.dark) && r.startsDark;
    var out = doc.querySelector('[data-bfs-audit]');
    if (out) {
      var row = function (k, v, good) { return '<tr><td>' + k + '</td><td class="' + (good === undefined ? '' : good ? 'bfs-ok' : 'bfs-bad') + '">' + v + '</td></tr>'; };
      out.innerHTML = '<table class="bfs-audit">' + row('Light', r.light + '%') + row('Mid', r.mid + '%') +
        row('Dark (≤25%)', r.dark + '%', r.dark <= 25) + row('Light is largest', r.light >= Math.max(r.mid, r.dark) ? '✓' : '✗', r.light >= Math.max(r.mid, r.dark)) +
        row('Starts dark', r.startsDark ? '✓' : '✗', r.startsDark) + '</table>';
    }
    r.placeholders = doc.querySelectorAll('img[src*="picsum.photos"],img[src^="REPLACE"]').length + (doc.body.innerText.match(/REPLACE/g) || []).length;
    if (r.placeholders) console.warn('[BFS] ' + r.placeholders + ' placeholder(s) left (REPLACE / picsum) — not shippable');
    if (!r.ok) console.warn('[BFS] Surface rules not met:', r);
    return r;
  }
  addEventListener('load', audit);
  addEventListener('resize', function () { clearTimeout(audit.t); audit.t = setTimeout(audit, 200); });

  window.BFS = { audit: audit, play: play };
})();
