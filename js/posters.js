/* =====================================================================
   АФИШИ РЕЗУЛЬТАТОВ 480×620. Ключ = archetypes[id].poster.
   Композиторы — стилизованные вырезки вместо архивных портретов;
   у Георгия Фёдорова лицо не рисуется: силуэт со спины и пустой слот под фото.
   ===================================================================== */
var POSTERS = {};

function Poster(p) {
  var cid = 'pc-' + p.id;
  return h('svg', { viewBox: '0 0 480 620', className: 'poster', role: 'img', 'aria-label': p.label, preserveAspectRatio: 'xMidYMid meet' },
    h('defs', null, h('clipPath', { id: cid }, h('rect', { x: 0, y: 0, width: 470, height: 560 }))),
    h('rect', { x: 10, y: 10, width: 470, height: 610, fill: G }),
    h('g', { clipPath: 'url(#' + cid + ')' }, h('rect', { width: 470, height: 560, fill: p.bg }), p.children),
    h('rect', { x: 2, y: 2, width: 468, height: 558, fill: 'none', stroke: G, strokeWidth: 6 }),
    h('rect', { x: 2, y: 560, width: 468, height: 56, fill: K, stroke: G, strokeWidth: 5 }),
    tx('ft1', 22, 596, 14, p.footer, { ls: 1.5 }), tx('ft2', 450, 596, 14, p.num + ' / 7', { a: 'end' })
  );
}
function crowd(y, n, seed) {
  var out = [];
  for (var i = 0; i < n; i++) { var x = 20 + i * (440 / (n - 1)), dy = ((i * 37 + seed) % 5) * 5;
    out.push(h('g', { key: 'cr' + i }, h('ellipse', { cx: x, cy: y + 40 + dy, rx: 34, ry: 44, fill: i % 4 === 0 ? C : G, stroke: K, strokeWidth: 3 }), h('circle', { cx: x, cy: y + dy, r: 17, fill: G, stroke: K, strokeWidth: 3 }))); }
  return out;
}

POSTERS.mozart = function () {
  var bits = [[60, 90, 1.4, K, -20], [390, 70, 1.1, M, 18], [420, 250, 1.6, K, 30], [40, 300, 1.2, M, -28], [120, 40, 0.9, K, 10], [350, 400, 1.2, K, -14]];
  var keys = [];
  for (var i = 0; i < 12; i++) keys.push(h('rect', { key: 'k' + i, x: -10 + i * 42, y: 488, width: 42, height: 80, fill: K, stroke: G, strokeWidth: 4 }));
  [0, 1, 3, 4, 5, 7, 8, 10].forEach(function (i) { keys.push(h('rect', { key: 'bk' + i, x: -10 + i * 42 + 30, y: 488, width: 24, height: 48, fill: G })); });
  return h(Poster, { id: 'mozart', bg: C, label: 'Афиша Моцарта: бумажная вырезка в парике среди разлетающихся нот', footer: 'ТЕМПЕРАМЕНТ', num: '1' },
    h('circle', { cx: 236, cy: 270, r: 190, fill: M, stroke: G, strokeWidth: 5 }), h('circle', { cx: 236, cy: 270, r: 190, fill: 'url(#htC)', opacity: 0.5 }),
    Torso('mt', 70, 380, 330, 190, M, { shirt: true, rough: true }), Head('mh', 236, 270, 2.3, 'wig', 'smile', { rot: -6 }),
    h('path', { d: 'M236 396 l-34 -16 v34Z M236 396 l34 -16 v34Z', fill: C, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }), h('circle', { cx: 236, cy: 396, r: 8, fill: C, stroke: G, strokeWidth: 4 }),
    bits.map(function (b, i) { return nt('n' + i, b[0], b[1] + 60, b[2] * 1.5, b[3], b[4]); }),
    h('path', { d: 'M30 150 q20 -30 40 0 t40 0 t40 0', stroke: G, strokeWidth: 6, fill: 'none', strokeLinecap: 'round' }),
    h('path', { d: 'M330 130 l24 -40 l24 40Z', fill: K, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }),
    h('circle', { cx: 420, cy: 160, r: 14, fill: G }), h('circle', { cx: 60, cy: 440, r: 18, fill: K, stroke: G, strokeWidth: 4 }),
    keys
  );
};

POSTERS.beethoven = function () {
  var staff = [];
  for (var i = 0; i < 5; i++) staff.push(h('path', { key: 's' + i, d: 'M-60 ' + (470 - i * 22) + ' L540 ' + (150 - i * 22), stroke: G, strokeWidth: 5, opacity: 0.9 }));
  return h(Poster, { id: 'beethoven', bg: M, label: 'Афиша Бетховена: бумажная вырезка с гривой на сильной диагонали и коралловой молнией', footer: 'ТЕМПЕРАМЕНТ', num: '2' },
    h('path', { d: 'M-20 600 L-20 380 L500 60 L500 240 L120 600Z', fill: G }), h('path', { d: 'M-20 600 L-20 380 L500 60 L500 240 L120 600Z', fill: 'url(#htK)', opacity: 0.35 }),
    staff,
    h('path', { d: 'M330 40 L250 200 H310 L240 330 L400 150 H335 L400 40Z', fill: C, stroke: G, strokeWidth: 5, strokeLinejoin: 'round' }),
    Torso('bt', 60, 400, 300, 170, K, { shirt: false, rough: true }), h('path', { d: 'M150 400 L210 480 L270 400Z', fill: C, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }),
    Head('bh', 214, 290, 2.4, 'wild', 'frown', { rot: -12 }),
    h('path', { d: 'M360 480 L420 420', stroke: G, strokeWidth: 36, strokeLinecap: 'round' }), ell('fs', 430, 410, 30, 30, K, { dx: 6 }), h('path', { d: 'M412 402 H448 M414 416 H446', stroke: G, strokeWidth: 4 }),
    cut('sh', 'M340 470 H450 V530 H340Z', K, { rough: true }), tx('sh1', 395, 508, 14, 'ВПЕРЁД', { a: 'middle' }),
    nt('n1', 70, 130, 1.3, C, -18), nt('n2', 420, 520, 0.9, M, 12)
  );
};

POSTERS.tchaikovsky = function () {
  var rain = [];
  for (var i = 0; i < 26; i++) rain.push(h('path', { key: 'r' + i, d: 'M' + (40 + (i * 53) % 400) + ' ' + (60 + (i * 91) % 240) + ' l-10 34', stroke: K, strokeWidth: 3, strokeLinecap: 'round', opacity: 0.7 }));
  return h(Poster, { id: 'tchaikovsky', bg: G, label: 'Афиша Чайковского: бумажная вырезка с бородой под пледом у дождливого окна и лампы', footer: 'ТЕМПЕРАМЕНТ', num: '3' },
    cut('win', Rp(50, 44, 370, 340), '#2B4A3E', { dx: 8, rough: true }), rain,
    h('path', { d: 'M235 44 V384 M50 214 H420', stroke: K, strokeWidth: 12 }), h('rect', { x: 50, y: 44, width: 370, height: 340, fill: 'none', stroke: K, strokeWidth: 12 }),
    h('circle', { cx: 100, cy: 440, r: 120, fill: 'url(#htM)', opacity: 0.7 }), h('circle', { cx: 100, cy: 440, r: 62, fill: M, opacity: 0.6 }),
    cut('cur', 'M10 20 H70 Q50 200 80 400 H10Z', C, { rough: true }), cut('cur2', 'M460 20 H400 Q420 200 390 400 H460Z', C, { rough: true }),
    Torso('bl', 40, 390, 390, 180, 'url(#plaid)', { rough: true }),
    Head('th', 250, 300, 2.1, 'beard', 'calm', { hair: P2 }),
    cut('hood', 'M120 410 Q250 330 380 410 Q310 380 250 400 Q190 380 120 410Z', 'url(#plaid)'),
    cut('cup', 'M330 470 h70 l-8 50 h-54Z', K), h('path', { d: 'M400 480 q26 6 0 28', stroke: G, strokeWidth: 5, fill: 'none' }), h('path', { d: 'M350 462 q-8 -16 4 -28 M372 462 q-8 -16 4 -28', stroke: K, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' }),
    nt('n1', 400, 110, 1.1, M, 14), nt('n2', 90, 150, 0.9, K, -12)
  );
};

POSTERS.wagner = function () {
  var grid = [];
  for (var i = 0; i < 12; i++) { grid.push(h('path', { key: 'v' + i, d: 'M' + (i * 40) + ' 0 V560', stroke: G, strokeWidth: 1.5, opacity: 0.22 })); grid.push(h('path', { key: 'g' + i, d: 'M0 ' + (i * 48) + ' H470', stroke: G, strokeWidth: 1.5, opacity: 0.22 })); }
  var blocks = [[150, 440, 170, 70, M], [170, 370, 130, 70, C], [185, 300, 100, 70, K], [200, 230, 70, 70, M], [212, 160, 46, 70, C], [222, 90, 26, 70, K]];
  return h(Poster, { id: 'wagner', bg: K, label: 'Афиша Вагнера: гигантский чертёж башни, который не помещается на афишу, и крошечный человек в берете', footer: 'ТЕМПЕРАМЕНТ', num: '4' },
    grid,
    blocks.map(function (b, i) { return cut('b' + i, Rp(b[0], b[1], b[2], b[3]), b[4], { rough: i % 2 === 0 }); }),
    h('path', { d: 'M222 90 L235 20 L248 90', fill: G, stroke: G, strokeWidth: 4 }), h('path', { d: 'M215 12 q-18 -14 -14 -34 M255 12 q18 -14 14 -34', stroke: G, strokeWidth: 7, fill: 'none', strokeLinecap: 'round' }),
    h('path', { d: 'M110 40 V560 M110 100 h-12 M110 200 h-12 M110 300 h-12 M110 400 h-12 M110 500 h-12', stroke: C, strokeWidth: 4 }),
    tx('d1', 96, 306, 12, 'ВЫСОТА: ЕЩЁ', { a: 'middle', rot: -90, fill: C }),
    h('path', { d: 'M340 100 H450 M340 130 H430 M340 160 H440', stroke: G, strokeWidth: 3 }), tx('d2', 340, 90, 11, 'ПРОЛОГ + 3 ДНЯ'),
    h('path', { d: 'M310 220 Q380 190 440 230', stroke: G, strokeWidth: 3, strokeDasharray: '8 6', fill: 'none' }),
    cut('st', Rp(330, 300, 120, 54), C, { rough: true }), tx('st1', 390, 334, 16, 'БЮДЖЕТ: ДА', { a: 'middle', fill: K, rot: -6 }),
    Torso('wt', 340, 480, 80, 80, G, { shirt: true }), Head('wh', 380, 456, 0.62, 'cap', 'o'),
    cut('sc', 'M40 470 H100 Q120 470 120 490 V540 Q120 556 100 556 H40Z', K), h('path', { d: 'M58 490 h44 M58 510 h36 M58 530 h44', stroke: G, strokeWidth: 3 }),
    nt('n1', 400, 430, 0.8, M, 10)
  );
};

POSTERS.debussy = function () {
  var waves = [];
  for (var i = 0; i < 6; i++) waves.push(h('path', { key: 'w' + i, d: 'M-10 ' + (440 + i * 22) + ' Q60 ' + (424 + i * 22) + ' 120 ' + (440 + i * 22) + ' T240 ' + (440 + i * 22) + ' T360 ' + (440 + i * 22) + ' T480 ' + (440 + i * 22), stroke: G, strokeWidth: 3, fill: 'none', opacity: 0.35 + i * 0.1 }));
  return h(Poster, { id: 'debussy', bg: '#F3EDE6', label: 'Афиша Дебюсси: бумажная вырезка в шляпе среди полупрозрачных кругов света и воды', footer: 'ТЕМПЕРАМЕНТ', num: '5' },
    h('circle', { cx: 150, cy: 180, r: 150, fill: M, opacity: 0.6 }), h('circle', { cx: 320, cy: 250, r: 170, fill: C, opacity: 0.45 }), h('circle', { cx: 240, cy: 380, r: 140, fill: G, opacity: 0.28 }),
    h('circle', { cx: 320, cy: 250, r: 170, fill: 'url(#htGl)' }), h('circle', { cx: 150, cy: 180, r: 150, fill: 'url(#htM)', opacity: 0.6 }),
    h('path', { d: 'M360 60 a50 50 0 1 0 50 80 a40 40 0 1 1 -50 -80Z', fill: K, stroke: G, strokeWidth: 4 }),
    waves,
    Torso('dt', 110, 400, 260, 170, G, { shirt: true, rough: true }), Head('dh', 240, 300, 2.0, 'hat', 'calm', { hair: G, beard: P2 }),
    h('circle', { cx: 100, cy: 330, r: 22, fill: M, stroke: G, strokeWidth: 4 }), h('path', { d: 'M100 352 V420', stroke: G, strokeWidth: 5 }),
    nt('n1', 390, 380, 0.9, K, 14), nt('n2', 70, 120, 0.9, K, -10),
    h('path', { d: 'M40 520 Q240 490 440 520', stroke: G, strokeWidth: 2, fill: 'none', opacity: 0.6 })
  );
};

POSTERS.stravinsky = function () {
  var strips = [[0, 160, C, 0], [160, 160, M, -34], [320, 150, K, 30]];
  function figure() {
    return [Torso('st', 60, 400, 350, 170, G, { shirt: true }), h('path', { key: 'bt', d: 'M200 410 l40 20 l-40 20Z M280 410 l-40 20 l40 20Z', fill: C, stroke: G, strokeWidth: 3 }), Head('sh', 236, 290, 2.3, 'glasses', 'o')];
  }
  return h(Poster, { id: 'stravinsky', bg: K, label: 'Афиша Стравинского: бумажный портрет, разрезанный на три смещённые полосы разных цветов', footer: 'ТЕМПЕРАМЕНТ', num: '6' },
    h('defs', null, strips.map(function (s, i) { return h('clipPath', { key: i, id: 'sv' + i }, h('rect', { x: s[0], y: 0, width: s[1], height: 560 })); })),
    strips.map(function (s, i) {
      return h('g', { key: 'g' + i, clipPath: 'url(#sv' + i + ')' }, h('rect', { x: s[0], width: s[1], height: 560, fill: s[2] }), h('rect', { x: s[0], width: s[1], height: 560, fill: 'url(#htGl)', opacity: 0.6 }),
        h('g', { transform: 'translate(0 ' + s[3] + ')' }, figure()));
    }),
    h('path', { d: 'M160 0 V560 M320 0 V560', stroke: G, strokeWidth: 6 }),
    h('path', { d: 'M20 40 L120 40 L70 130Z', fill: M, stroke: G, strokeWidth: 5, strokeLinejoin: 'round' }),
    h('circle', { cx: 410, cy: 90, r: 44, fill: C, stroke: G, strokeWidth: 5 }), h('rect', { x: 340, y: 150, width: 100, height: 22, fill: G, transform: 'rotate(-14 390 160)' }),
    cut('met', 'M376 500 L392 420 H420 L436 500Z', M), h('path', { d: 'M406 500 L420 430', stroke: G, strokeWidth: 5 }),
    nt('n1', 60, 470, 1.1, K, 160), nt('n2', 240, 70, 0.9, G, -30)
  );
};

POSTERS.fedorov = function () {
  return h(Poster, { id: 'fedorov', bg: G, label: 'Афиша Георгия Фёдорова: сцена, зал и силуэт дирижёра со спины; место под настоящую фотографию', footer: 'ТЕМПЕРАМЕНТ', num: '7' },
    h('path', { d: 'M235 -10 L110 450 H360Z', fill: M, opacity: 0.38 }),
    cut('cl', 'M-10 -10 H110 Q80 200 120 470 H-10Z', C, { rough: true }), cut('cr', 'M480 -10 H360 Q390 200 350 470 H480Z', C, { rough: true }),
    cut('flr', Rp(-10, 440, 500, 60), M, { dx: 0, rough: true }),
    h('g', { key: 'cd' }, h(Conductor, { x: 100, y: 120, width: 270, height: 360, preserveAspectRatio: 'xMidYMax meet' })),
    nt('n1', 70, 270, 1.2, K, -14), nt('n2', 400, 230, 1.0, M, 16), nt('n3', 380, 120, 0.8, K, 8),
    h('path', { d: 'M40 40 l10 -24 l10 24 l24 10 l-24 10 l-10 24 l-10 -24 l-24 -10Z', fill: M, stroke: G, strokeWidth: 3, strokeLinejoin: 'round' }),
    cut('ph', Rp(330, 28, 112, 138), K, { dx: 5, sw: 3 }), h('rect', { x: 340, y: 38, width: 92, height: 92, fill: 'none', stroke: G, strokeWidth: 3, strokeDasharray: '7 5' }),
    tx('ph1', 386, 82, 9, 'МЕСТО ПОД', { a: 'middle' }), tx('ph2', 386, 96, 9, 'ПОДЛИННОЕ', { a: 'middle' }), tx('ph3', 386, 110, 9, 'ФОТО', { a: 'middle' }),
    h('rect', { x: 366, y: 18, width: 44, height: 16, fill: C, opacity: 0.9, transform: 'rotate(-6 388 26)' }),
    crowd(470, 11, 3)
  );
};
