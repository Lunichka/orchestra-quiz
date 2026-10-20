/* Сцены вопросов 1–4. Каждая — одна цельная иллюстрация 600×420, ключ совпадает с questions[].scene */
var SCENES = {};

/* Q1 — сорвавшийся день: дождь и плед, хаос в центре, решительный разбор справа, вечер «с программой» на гирлянде */
SCENES.q1 = function () {
  var papers = [[250, 60, -20], [330, 40, 14], [392, 96, 32], [210, 118, -38], [350, 230, 20]];
  var keys = [];
  for (var i = 0; i < 15; i++) keys.push(h('rect', { key: 'k' + i, x: 4 + i * 39, y: 386, width: 39, height: 30, fill: K, stroke: G, strokeWidth: 3 }));
  [1, 2, 4, 5, 6, 8, 9, 11, 12, 13].forEach(function (i) { keys.push(h('rect', { key: 'b' + i, x: 4 + i * 39 - 9, y: 386, width: 18, height: 18, fill: G })); });
  var flags = [];
  for (var f = 0; f < 9; f++) flags.push(h('path', { key: 'f' + f, d: 'M' + (20 + f * 62) + ' ' + (22 + Math.sin(f) * 4) + ' l22 0 l-11 26Z', fill: [M, C, K][f % 3], stroke: G, strokeWidth: 3, strokeLinejoin: 'round' }));
  return h(Stage, { label: 'Сорвавшийся день: человек под пледом смотрит на дождь, другой решительно наводит порядок, в центре летят бумаги и клавиши' },
    h('path', { d: 'M0 28 Q300 62 600 22', stroke: G, strokeWidth: 3, fill: 'none' }), flags,
    cut('win', Rp(26, 86, 150, 190), G), [0, 1, 2, 3, 4, 5].map(function (i) { return h('path', { key: 'r' + i, d: 'M' + (46 + i * 24) + ' ' + (106 + (i % 2) * 20) + ' l-8 24', stroke: K, strokeWidth: 3, strokeLinecap: 'round' }); }),
    h('path', { d: 'M101 86 V276 M26 181 H176', stroke: G, strokeWidth: 5 }),
    nt('wn', 130, 260, 0.9, K, 0),
    Torso('bl', 22, 296, 200, 130, 'url(#plaid)', { rough: true }),
    Head('tc', 122, 282, 0.9, 'beard', 'calm', { hair: P2 }),
    cut('hood', 'M52 330 Q122 290 192 330 Q150 316 122 330 Q94 316 52 330Z', 'url(#plaid)'),
    h('g', { key: 'clock', transform: 'rotate(-12 300 170)' }, ell('ck', 300, 170, 58, 58, K), h('path', { d: 'M300 170 V128 M300 170 L330 188', stroke: G, strokeWidth: 6, strokeLinecap: 'round' }), h('circle', { cx: 300, cy: 170, r: 6, fill: C })),
    papers.map(function (p, i) { return h('g', { key: 'pp' + i, transform: 'translate(' + p[0] + ' ' + p[1] + ') rotate(' + p[2] + ')' }, cut('pg' + i, Rp(0, 0, 44, 56), i % 2 ? K : M, { dx: 4 }), h('path', { d: 'M8 14 H36 M8 26 H30 M8 38 H34', stroke: G, strokeWidth: 3 })); }),
    cut('spill', 'M270 330 Q250 300 290 304 Q310 280 336 306 Q372 308 350 336 Q320 352 270 330Z', C),
    nt('n1', 420, 120, 0.8, M, -14), nt('n2', 190, 80, 0.7, C, 18),
    Torso('bt', 396, 278, 150, 150, G, { shirt: true }),
    h('path', { key: 'arm', d: 'M538 316 L578 252', stroke: G, strokeWidth: 34, strokeLinecap: 'round' }), ell('fist', 580, 246, 20, 20, K),
    Head('bh', 470, 232, 1.05, 'wild', 'frown'),
    cut('bub', 'M400 70 H540 V122 H470 L450 144 L452 122 H400Z', K), tx('bt1', 470, 104, 15, 'РАЗБЕРЁМСЯ.', { a: 'middle' }),
    cut('ban', Rp(226, 262, 170, 30), M, { rough: true }), tx('bt2', 311, 283, 11, 'ВЕЧЕР С ПРОГРАММОЙ', { a: 'middle' }),
    keys
  );
};

/* Q2 — свободный вечер: лампа и уют слева, чертёж не помещается в комнату, странные предметы на столе */
SCENES.q2 = function () {
  var grid = [];
  for (var i = 0; i < 9; i++) grid.push(h('path', { key: 'g' + i, d: 'M' + (232 + i * 40) + ' 60 V280 M232 ' + (60 + i * 28) + ' H600', stroke: G, strokeWidth: 1.5, opacity: 0.35 }));
  return h(Stage, { label: 'Свободный вечер: уютная лампа, странные предметы на столе и огромный чертёж, который не помещается в комнату' },
    cut('rug', 'M10 360 H590 V412 H10Z', P2, { dx: 0 }),
    cut('pole', Rp(80, 150, 10, 240), G, { dx: 0 }),
    h('circle', { cx: 85, cy: 130, r: 78, fill: 'url(#htM)', opacity: 0.55 }),
    cut('shade', 'M45 150 L60 90 H110 L125 150Z', M),
    cut('sheet', 'M215 40 H620 V300 H215Z', K, { rough: true, dx: 8 }), grid,
    h('path', { d: 'M300 280 V170 L340 130 L380 170 V280 M340 130 V60 M390 280 V120 H460 V280 M470 280 V90 L500 60 L530 90 V280', stroke: G, strokeWidth: 5, fill: 'none', strokeLinejoin: 'round' }),
    h('path', { d: 'M300 280 H560', stroke: G, strokeWidth: 5 }),
    h('circle', { cx: 340, cy: 130, r: 14, fill: C, stroke: G, strokeWidth: 4 }),
    cut('lbl', Rp(236, 70, 118, 26), M), tx('t1', 295, 89, 11, 'ПРОЕКТ НА 3 ГОДА', { a: 'middle' }),
    h('g', { key: 'cur', transform: 'translate(215 300) rotate(4)' }, cut('cu', 'M0 0 H400 V30 Q380 44 360 30 H0Z', K)),
    Head('wg', 528, 200, 0.85, 'cap', 'o'),
    Torso('wt', 470, 238, 120, 70, C, { shirt: true }),
    Head('db', 150, 296, 0.95, 'hat', 'calm'),
    Torso('dt', 92, 336, 120, 90, G, { shirt: true }),
    cut('tbl', Rp(200, 330, 390, 22), M, { rough: true }),
    cut('leg1', Rp(220, 352, 14, 60), G, { dx: 0 }), cut('leg2', Rp(560, 352, 14, 60), G, { dx: 0 }),
    /* метроном */
    cut('met', 'M262 330 L276 262 H298 L312 330Z', G), h('path', { d: 'M287 330 L296 270', stroke: C, strokeWidth: 5, strokeLinecap: 'round' }), h('circle', { cx: 296, cy: 270, r: 6, fill: M, stroke: G, strokeWidth: 3 }),
    /* утка с трубой */
    ell('duck', 380, 312, 30, 20, M), ell('dh', 404, 288, 14, 14, M), h('path', { d: 'M416 288 l16 4 l-16 6Z', fill: C, stroke: G, strokeWidth: 3 }),
    h('path', { d: 'M340 298 l30 -12 v12 l-30 12Z', fill: M, stroke: G, strokeWidth: 3, strokeLinejoin: 'round' }),
    /* кактус в чайнике */
    cut('pot', 'M460 330 Q452 296 486 296 Q520 296 512 330Z', K), h('path', { d: 'M486 296 V262 M486 280 h-14 v-14 M486 276 h14 v-12', stroke: G, strokeWidth: 8, fill: 'none', strokeLinecap: 'round' }),
    nt('n1', 570, 330, 0.7, C, 12), nt('n2', 175, 215, 0.6, M, -10)
  );
};

/* Q3 — командный проект: один стол, четыре характера вокруг презентации */
SCENES.q3 = function () {
  return h(Stage, { label: 'Командный проект: четыре характера вокруг стола с презентацией: один сверяет чек-лист, другой вдохновляет, третий драматизирует, четвёртый замечает детали' },
    cut('scr', Rp(120, 28, 360, 172), K, { rough: true }),
    cut('bar', Rp(120, 28, 360, 30), G, { dx: 0 }), tx('st', 132, 49, 13, 'ПРЕЗЕНТАЦИЯ В ЧЕТВЕРГ', { fill: K }),
    h('path', { d: 'M150 90 H300 M150 112 H270 M150 134 H290', stroke: G, strokeWidth: 5, strokeLinecap: 'round' }),
    cut('lift', Rp(380, 80, 70, 100), M), h('path', { d: 'M415 80 V180 M395 120 l10 -10 l10 10 M395 142 l10 10 l10 -10', stroke: G, strokeWidth: 4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }),
    h('circle', { cx: 440, cy: 92, r: 30, fill: 'none', stroke: C, strokeWidth: 6 }), h('path', { d: 'M462 114 L492 148', stroke: C, strokeWidth: 8, strokeLinecap: 'round' }),
    /* Дебюсси: замечает деталь */
    Torso('dt', 410, 262, 150, 160, G, { shirt: true }), Head('db', 484, 234, 0.95, 'beard', 'calm', { hair: P2 }),
    /* Чайковский: драма */
    Torso('tt', 270, 270, 140, 150, C, { shirt: true }), Head('tc', 340, 244, 0.95, 'beard', 'o', { hair: P2 }),
    h('path', { d: 'M296 292 L262 262 M386 292 L420 262', stroke: C, strokeWidth: 26, strokeLinecap: 'round' }), ell('hl', 262, 258, 15, 15, K), ell('hr', 420, 258, 15, 15, K),
    /* Рассказчик: силуэт без лица */
    Torso('ft', 130, 268, 130, 150, M, { shirt: true }), h('ellipse', { cx: 195, cy: 238, rx: 34, ry: 42, fill: G }), h('circle', { cx: 195, cy: 238, r: 40, fill: 'url(#htK)', opacity: 0.5 }),
    h('path', { d: 'M156 290 L120 240 L130 200', stroke: M, strokeWidth: 26, strokeLinecap: 'round', fill: 'none' }), h('path', { d: 'M130 200 L100 150', stroke: C, strokeWidth: 6, strokeLinecap: 'round' }), nt('hn', 104, 150, 0.7, C, -10),
    /* Бетховен: чек-лист */
    Torso('bt', 4, 292, 120, 130, G, { shirt: true }), Head('bh', 64, 274, 0.8, 'wild', 'frown'),
    cut('clip', Rp(28, 316, 70, 90), K), [0, 1, 2].map(function (i) { return h('g', { key: 'c' + i }, h('path', { d: 'M38 ' + (340 + i * 22) + ' l6 6 l10 -12', stroke: C, strokeWidth: 5, fill: 'none', strokeLinecap: 'round' }), h('path', { d: 'M64 ' + (340 + i * 22) + ' h24', stroke: G, strokeWidth: 3 })); }),
    cut('tab', Rp(0, 388, 600, 32), M, { rough: true, dx: 0 })
  );
};

/* Q4 — фильм о жизни: четыре афиши разных жанров на плёнке */
SCENES.q4 = function () {
  function poster(k, x, y, w, hh, fill, rot, cap, kids) {
    return h('g', { key: k, transform: 'translate(' + x + ' ' + y + ') rotate(' + rot + ' ' + w / 2 + ' ' + hh / 2 + ')' },
      cut(k + 'p', Rp(0, 0, w, hh), fill, { dx: 6 }), kids,
      cut(k + 'c', Rp(10, hh - 32, w - 20, 22), K, { dx: 3, sw: 3 }), tx(k + 't', w / 2, hh - 16, 11, cap, { a: 'middle' }));
  }
  var holes = [];
  for (var i = 0; i < 14; i++) { holes.push(h('rect', { key: 'a' + i, x: 10 + i * 42, y: 8, width: 20, height: 14, fill: K, stroke: G, strokeWidth: 2 })); holes.push(h('rect', { key: 'b' + i, x: 10 + i * 42, y: 398, width: 20, height: 14, fill: K, stroke: G, strokeWidth: 2 })); }
  return h(Stage, { label: 'Фильм о жизни: четыре постера разных жанров: эпическая сага, комедия, экспериментальное кино и вечернее шоу' },
    cut('film', Rp(0, 0, 600, 30), G, { dx: 0 }), cut('film2', Rp(0, 390, 600, 30), G, { dx: 0 }), holes,
    poster('p1', 30, 48, 250, 160, M, -2, 'САГА. ЧАСТЬ I',
      [h('path', { key: 'cs', d: 'M70 110 V60 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v50Z', fill: G }), h('path', { key: 'sn', d: 'M36 110 H214', stroke: G, strokeWidth: 5 }), h('circle', { key: 'sun', cx: 190, cy: 50, r: 22, fill: C, stroke: G, strokeWidth: 4 })]),
    poster('p2', 316, 52, 250, 160, C, 2, 'КОМЕДИЯ ОШИБОК',
      [h('circle', { key: 'fc', cx: 125, cy: 70, r: 44, fill: K, stroke: G, strokeWidth: 4 }), h('path', { key: 'sm', d: 'M100 80 Q125 106 150 80', stroke: G, strokeWidth: 5, fill: 'none', strokeLinecap: 'round' }), h('circle', { key: 'e1', cx: 108, cy: 62, r: 5, fill: G }), h('circle', { key: 'e2', cx: 142, cy: 62, r: 5, fill: G }), h('path', { key: 'cf', d: 'M30 40 l12 8 M210 36 l-12 10 M40 112 l14 -6 M200 110 l-14 -4', stroke: M, strokeWidth: 6, strokeLinecap: 'round' })]),
    poster('p3', 40, 222, 250, 160, K, 1.5, 'КУЛЬТ. ПОЗЖЕ.',
      [h('rect', { key: 's1', x: 0, y: 0, width: 250, height: 128, fill: 'url(#stripeC)', opacity: 0.55 }), h('path', { key: 'ey', d: 'M60 70 Q125 20 190 70 Q125 120 60 70Z', fill: K, stroke: G, strokeWidth: 4 }), h('circle', { key: 'ir', cx: 135, cy: 66, r: 20, fill: G }), h('rect', { key: 'gl', x: 70, y: 40, width: 110, height: 12, fill: M, stroke: G, strokeWidth: 3, transform: 'translate(14 8)' })]),
    poster('p4', 312, 226, 250, 156, G, -2, 'ПОСЛЕ ТИТРОВ — В БАР',
      [h('path', { key: 'sl', d: 'M125 0 L70 128 H180Z', fill: M, opacity: 0.5 }), cut('g1', 'M92 96 L100 54 H122 L120 96 Q106 104 92 96Z', K, { dx: 0, sw: 3 }), cut('g2', 'M138 96 L136 54 H158 L166 96 Q152 104 138 96Z', K, { dx: 0, sw: 3 }), h('path', { key: 'sp', d: 'M124 40 l-6 -14 M130 38 l0 -16 M136 40 l6 -14', stroke: C, strokeWidth: 4, strokeLinecap: 'round' })])
  );
};
