// Membrane surface from motionin.design/gallery/membrane, running behind the Morph hero.
// The simulation and drawing below are the original code (see _source/membrane/membrane-chunk.js);
// only the React wrapper is replaced, so it attaches to the hero's <canvas class="ah-membrane">.
(function () {
  // the original's dark palette (the hero is dark); highlighted dots tinted slightly yellow (was 255,252,245)
  var P = { bg: "#08080a", lineAlpha: .018, edgeR: 130, edgeG: 130, edgeB: 140, centerR: 245, centerG: 235, centerB: 210, activeR: 255, activeG: 226, activeB: 130 };
  // the cursor's effect on dot opacity, as a share of the original's (0.1 = 10%)
  var REACT = 0.1;
  // square grid: same spacing across and down (the original spread 50 x 30 points over the hero, so spacing differed)
  var SPACING = 29.4, ROWS = 30, COLS = 50;

  function start(e, t) {
    var s = t.getContext("2d"); if (!s) return;
    var i = window.devicePixelRatio || 1, v = 0, x = 0, h = 0, g = 0, y = [];
    var u = { x: -9999, y: -9999, pressing: !1 }, m = 0;
    function w() {
      var r = e.getBoundingClientRect(); v = r.width, x = r.height, h = v / 2, g = x / 2, t.width = v * i, t.height = x * i, t.style.width = v + "px", t.style.height = x + "px", s.setTransform(i, 0, 0, i, 0, 0), y = [];
      COLS = Math.max(14, Math.round(v / SPACING) + 1);
      var n = v / (COLS - 1), a = n;
      ROWS = Math.ceil(x / a) + 1;
      var oy = (x - (ROWS - 1) * a) / 2; // centre the rows vertically
      for (var E = 0; E < ROWS; E++) { y[E] = []; for (var T = 0; T < COLS; T++) y[E][T] = { x: T * n, y: oy + E * a, restX: T * n, restY: oy + E * a, vx: 0, vy: 0, offsetZ: 0, velZ: 0 } }
    }
    function R(ev) { var r = t.getBoundingClientRect(); u.x = ev.clientX - r.left, u.y = ev.clientY - r.top }
    function j() { u.x = -9999, u.y = -9999, u.pressing = !1 }
    w(); new ResizeObserver(w).observe(e);
    e.addEventListener("mousemove", R), e.addEventListener("mouseleave", j);
    e.addEventListener("mousedown", function () { u.pressing = !0 }), e.addEventListener("mouseup", function () { u.pressing = !1 });
    if (window.gsap) window.gsap.fromTo(t, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.inOut" });

    requestAnimationFrame(function loop() {
      m += .016; var tt = m, r = P;
      s.clearRect(0, 0, v, x);
      for (var e1 = 0; e1 < ROWS; e1++) for (var r1 = 0; r1 < COLS; r1++) { var n0 = y[e1][r1]; n0.velZ += (2 * Math.sin(.6 * tt + .15 * r1 + .12 * e1) - n0.offsetZ) * .002 }
      (function () {
        var ex = u.x, ey = u.y, pr = u.pressing, n = pr ? 200 : 130, a = pr ? 30 : 15;
        for (var r2 = 0; r2 < ROWS; r2++) for (var s2 = 0; s2 < COLS; s2++) {
          var p = y[r2][s2], o = p.restX - ex, l = p.restY - ey, c = Math.sqrt(o * o + l * l);
          if (c < n && c > 0) { var f = (1 - c / n) * a; p.velZ += .4 * f, p.vx += o / c * f * .12, p.vy += l / c * f * .12 }
          p.vx += (p.restX - p.x) * .025, p.vy += (p.restY - p.y) * .025, p.velZ -= .025 * p.offsetZ * 1.5, p.vx *= .93, p.vy *= .93, p.velZ *= .93, p.x += p.vx, p.y += p.vy, p.offsetZ += p.velZ
        }
        for (var e3 = 0; e3 < ROWS; e3++) for (var t3 = 0; t3 < COLS; t3++) {
          var q = y[e3][t3];
          e3 > 0 && (q.velZ += (y[e3 - 1][t3].offsetZ - q.offsetZ) * .18), e3 < ROWS - 1 && (q.velZ += (y[e3 + 1][t3].offsetZ - q.offsetZ) * .18), t3 > 0 && (q.velZ += (y[e3][t3 - 1].offsetZ - q.offsetZ) * .18), t3 < COLS - 1 && (q.velZ += (y[e3][t3 + 1].offsetZ - q.offsetZ) * .18)
        }
      })();
      var n = Math.sqrt(h * h + g * g), ax = u.x, iy = u.y, o = ax > 0 && iy > 0 && ax < v && iy < x, l = .35 * v, c = .35 * x, d = "rgba(" + r.centerR + "," + r.centerG + "," + r.centerB + "," + r.lineAlpha + ")";
      for (var e4 = 0; e4 < ROWS; e4++) { s.beginPath(); for (var t4 = 0; t4 < COLS; t4++) { var r4 = y[e4][t4]; 0 === t4 ? s.moveTo(r4.x, r4.y - .3 * r4.offsetZ) : s.lineTo(r4.x, r4.y - .3 * r4.offsetZ) } s.strokeStyle = d, s.lineWidth = .5, s.stroke() }
      for (var e5 = 0; e5 < COLS; e5++) { s.beginPath(); for (var t5 = 0; t5 < ROWS; t5++) { var r5 = y[t5][e5]; 0 === t5 ? s.moveTo(r5.x, r5.y - .3 * r5.offsetZ) : s.lineTo(r5.x, r5.y - .3 * r5.offsetZ) } s.strokeStyle = d, s.lineWidth = .5, s.stroke() }
      for (var e6 = 0; e6 < ROWS; e6++) for (var t6 = 0; t6 < COLS; t6++) {
        var A, I, D, F = y[e6][t6], U = Math.abs(F.offsetZ), M = F.y - .3 * F.offsetZ, pp = F.restX - h, vv = F.restY - g,
          X = Math.pow(1 - Math.min(1, Math.sqrt(pp * pp + vv * vv) / n * 1.4), 1.5),
          b0 = .06 + .18 * X, bR = U > .5 ? Math.min(.9, .05 * U) : 0,
          b = b0 + Math.max(0, bR - b0) * REACT, W = 1 + +X + (U > .5 ? .05 * U : 0);
        if (o) { var e7 = (F.restX - h) / l, t7 = (F.restY - g) / c, r7 = e7 * e7 + t7 * t7; r7 < 1 && (b *= 1 - (1 - r7) * .7) }
        if (U > 3) { var k = Math.min(1, .08 * U); A = r.centerR + (r.activeR - r.centerR) * k, I = r.centerG + (r.activeG - r.centerG) * k, D = r.centerB + (r.activeB - r.centerB) * k }
        else A = r.edgeR + (r.centerR - r.edgeR) * X, I = r.edgeG + (r.centerG - r.edgeG) * X, D = r.edgeB + (r.centerB - r.edgeB) * X;
        (U > 1.5 || X > .4) && (s.beginPath(), s.arc(F.x, M, W + 6, 0, 2 * Math.PI), s.fillStyle = "rgba(" + A + "," + I + "," + D + "," + Math.max(.03 * X, (U > .5 ? Math.min(.9, .05 * U) : 0) * .06 * REACT) * (o ? .3 : 1) + ")", s.fill());
        s.beginPath(), s.arc(F.x, M, W, 0, 2 * Math.PI), s.fillStyle = "rgba(" + A + "," + I + "," + D + "," + b + ")", s.fill()
      }
      requestAnimationFrame(loop)
    });
  }

  // wait for React to render the hero, then attach
  (function find() {
    var c = document.querySelector(".arthaus .ah-membrane");
    if (c) start(c.closest(".arthaus"), c); else requestAnimationFrame(find);
  })();
})();
