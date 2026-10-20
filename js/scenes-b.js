/* Сцены вопросов 5–7 */

/* Q5 — правила: табло с инструкциями и один подозрительный нарушитель */
SCENES.q5 = function () {
  var arrows = [];
  for (var i = 0; i < 6; i++) arrows.push(h('path', { key: 'a' + i, d: 'M' + (20 + i * 62) + ' 384 h34 v-10 l22 18 l-22 18 v-10 h-34Z', fill: i === 3 ? C : M, stroke: G, strokeWidth: 3, strokeLinejoin: 'round', transform: i === 3 ? 'rotate(180 ' + (20 + i * 62 + 28) + ' 392)' : undefined }));
  return h(Stage, { label: 'Правила: стена с табличками и инструкцией на двадцать страниц, а из таблички «Тихо» торчит подозрительная труба' },
    cut('wall', Rp(0, 0, 600, 330), P2, { dx: 0 }),
    h('rect', { x: 0, y: 330, width: 600, height: 90, fill: K }), h('path', { d: 'M0 330 H600', stroke: G, strokeWidth: 5 }),
    /* таблички */
    cut('s1', Rp(26, 40, 150, 70), C, { rough: true }), tx('s1t', 101, 82, 17, 'НЕ ШУМЕТЬ', { a: 'middle', fill: K }),
    cut('s2', Rp(26, 128, 150, 70), M), tx('s2t', 101, 160, 12, 'ТОЛЬКО ПО', { a: 'middle' }), tx('s2u', 101, 182, 12, 'СТРЕЛКЕ →', { a: 'middle' }),
    cut('s3', Rp(200, 40, 130, 160), K),
    [0, 1, 2, 3, 4, 5, 6].map(function (i) { return h('path', { key: 'ln' + i, d: 'M214 ' + (74 + i * 17) + ' H' + (i % 3 === 0 ? 312 : 296), stroke: G, strokeWidth: 3 }); }),
    tx('s3t', 265, 62, 13, 'ПРАВИЛА', { a: 'middle' }), tx('s3p', 265, 218, 12, '20 СТР.', { a: 'middle' }),
    /* табличка ТИХО с торчащей трубой */
    cut('s4', Rp(26, 218, 150, 70), K), tx('s4t', 80, 262, 20, 'ТИХО', { a: 'middle' }),
    h('path', { d: 'M126 252 L222 236 L222 276 L126 268Z', fill: M, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }), ell('bell', 226, 256, 14, 28, M),
    nt('tn', 290, 250, 0.7, C, 14), nt('tn2', 256, 296, 0.6, M, -10),
    cut('bub', 'M26 296 H168 V326 H70 L50 342 L54 326 H26Z', K, { dx: 4, sw: 3 }), tx('bbt', 97, 316, 11, '...ЭТО ВЕТЕР.', { a: 'middle' }),
    /* Вагнер правит инструкцию */
    cut('bd', Rp(360, 30, 210, 190), K, { rough: true }), tx('bt', 465, 62, 14, 'ПРАВИЛА (РЕД. 2)', { a: 'middle' }),
    h('path', { d: 'M380 92 H550 M380 114 H530', stroke: G, strokeWidth: 3 }), h('path', { d: 'M380 138 H550', stroke: C, strokeWidth: 6 }), h('path', { d: 'M380 160 H540 M380 182 H520', stroke: G, strokeWidth: 3 }),
    cut('lad', 'M380 396 L420 236 M470 396 L490 236 M392 350 H462 M400 310 H476 M410 270 H484', 'none', { dx: 0, sw: 8 }),
    Torso('wt', 420, 270, 130, 126, C, { shirt: true }),
    Head('wg', 486, 244, 0.85, 'cap', 'calm'),
    h('path', { d: 'M520 280 L540 200', stroke: C, strokeWidth: 22, strokeLinecap: 'round' }), ell('hd', 542, 196, 13, 13, K), h('path', { d: 'M548 186 l12 -18', stroke: G, strokeWidth: 6, strokeLinecap: 'round' }),
    arrows
  );
};

/* Q6 — внимание публики: сцена, четыре способа привлечь взгляд, зал снизу */
SCENES.q6 = function () {
  var crowd = [];
  for (var i = 0; i < 12; i++) crowd.push(h('g', { key: 'c' + i }, h('ellipse', { cx: 24 + i * 50 + (i % 2) * 14, cy: 410, rx: 30, ry: 38, fill: i % 3 === 0 ? C : G, stroke: K, strokeWidth: 3 }), h('circle', { cx: 24 + i * 50 + (i % 2) * 14, cy: 372, r: 16, fill: G, stroke: K, strokeWidth: 3 })));
  return h(Stage, { label: 'Внимание публики: на сцене один эффектно выскакивает из люка, другой рассказывает историю, третий импровизирует за роялем, четвёртый создаёт настроение светом' },
    h('path', { d: 'M150 0 L40 330 H260Z', fill: M, opacity: 0.35 }), h('path', { d: 'M450 0 L350 330 H560Z', fill: M, opacity: 0.35 }),
    cut('cl', 'M0 0 H92 Q70 130 96 330 H0Z', C, { rough: true }), cut('cr', 'M600 0 H508 Q530 130 504 330 H600Z', C, { rough: true }),
    h('path', { d: 'M24 0 Q36 160 24 330 M56 0 Q66 160 62 330', stroke: G, strokeWidth: 3, fill: 'none', opacity: 0.5 }),
    cut('flr', Rp(0, 300, 600, 52), M, { dx: 0, rough: true }),
    /* люк и эффектное появление */
    cut('hole', 'M110 322 H210 V338 H110Z', G, { dx: 0 }),
    Head('st', 160, 300, 0.8, 'glasses', 'o'), cut('sp', 'M120 322 Q160 286 200 322Z', C),
    h('path', { d: 'M104 262 l-12 -14 M214 262 l12 -14 M160 232 V210 M126 240 l-14 -10 M194 240 l14 -10', stroke: C, strokeWidth: 6, strokeLinecap: 'round' }),
    /* рассказчик без лица */
    h('ellipse', { cx: 276, cy: 196, rx: 26, ry: 32, fill: G }), Torso('ft', 238, 232, 78, 100, G, { shirt: true }),
    h('path', { d: 'M248 252 L214 212 M306 252 L342 214', stroke: G, strokeWidth: 18, strokeLinecap: 'round' }),
    cut('cloud', 'M300 80 Q300 50 334 52 Q348 28 384 44 Q420 36 426 70 Q452 88 424 112 Q418 134 380 126 Q350 142 330 122 Q298 118 300 80Z', K),
    h('path', { d: 'M334 100 h50 l-6 28 h-38Z', fill: M, stroke: G, strokeWidth: 3 }), h('path', { d: 'M346 100 q10 -22 20 0', stroke: G, strokeWidth: 3, fill: 'none' }),
    /* импровизатор */
    cut('pia', Rp(366, 262, 140, 40), K), [0, 1, 2, 3, 4].map(function (i) { return h('path', { key: 'pk' + i, d: 'M' + (394 + i * 28) + ' 262 V302', stroke: G, strokeWidth: 3 }); }),
    Torso('mt', 380, 232, 110, 40, C, {}), Head('mz', 436, 214, 0.7, 'wig', 'smile'),
    nt('m1', 380, 190, 0.7, M, -18), nt('m2', 484, 176, 0.8, C, 14), nt('m3', 520, 232, 0.6, G, 22),
    /* атмосфера */
    h('circle', { cx: 540, cy: 90, r: 52, fill: 'url(#htM)', opacity: 0.8 }), h('circle', { cx: 540, cy: 90, r: 32, fill: M, opacity: 0.7 }),
    Head('db', 540, 282, 0.62, 'hat', 'calm'),
    crowd
  );
};

/* Q7 — путешествие: четыре чемодана с характерами */
SCENES.q7 = function () {
  function strap(k, x, y, w) { return h('rect', { key: k, x: x, y: y, width: w, height: 8, fill: G }); }
  return h(Stage, { label: 'Путешествие: четыре чемодана: строгий планировщик, гигантский багаж с люстрой, романтик с пледом и розой и странный треугольный чемодан экспериментатора' },
    cut('plat', Rp(0, 352, 600, 68), P2, { dx: 0 }), h('path', { d: 'M0 352 H600', stroke: G, strokeWidth: 5 }), h('path', { d: 'M0 372 H600', stroke: M, strokeWidth: 8 }),
    cut('sign', Rp(372, 22, 200, 46), G), tx('sg', 472, 54, 20, 'ПЛАТФОРМА 7', { a: 'middle', fill: K }),
    /* планировщик */
    cut('c1', Rp(24, 190, 120, 160), G), strap('s1', 24, 236, 120), strap('s1b', 24, 290, 120), h('path', { d: 'M54 190 V160 H114 V190', stroke: G, strokeWidth: 8, fill: 'none' }),
    cut('t1', Rp(48, 242, 72, 40), K, { dx: 3, sw: 3 }), tx('t1a', 84, 258, 9, 'ПЛАН А', { a: 'middle' }), tx('t1b', 84, 274, 9, 'ПЛАН Б', { a: 'middle' }),
    cut('cl', Rp(44, 108, 80, 62), K, { rough: true }), h('path', { d: 'M54 128 l6 6 l10 -12 M54 150 l6 6 l10 -12', stroke: C, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' }), h('path', { d: 'M80 128 h30 M80 150 h30', stroke: G, strokeWidth: 3 }),
    /* масштабный багаж */
    cut('c2', Rp(160, 150, 190, 200), C), cut('c2b', Rp(176, 100, 160, 56), M), cut('c2c', Rp(196, 58, 120, 50), K),
    strap('s2', 160, 220, 190), strap('s2b', 160, 288, 190),
    h('path', { d: 'M256 58 V34 M236 34 H276 M230 44 l-10 20 M282 44 l10 20', stroke: G, strokeWidth: 5, strokeLinecap: 'round', fill: 'none' }), h('circle', { cx: 256, cy: 30, r: 9, fill: M, stroke: G, strokeWidth: 3 }),
    cut('bust', 'M300 150 Q300 120 318 120 Q336 120 336 150Z', K, { dx: 3 }),
    [0, 1, 2].map(function (i) { return cut('stk' + i, 'M' + (180 + i * 52) + ' 304 h36 v26 h-36Z', [K, M, K][i], { dx: 3, sw: 3 }); }),
    /* романтик */
    cut('c3', Rp(364, 210, 100, 140), C, { rough: true }), strap('s3', 364, 262, 100),
    cut('cape', 'M376 210 Q370 150 420 140 Q470 150 458 210 Q430 190 376 210Z', 'url(#plaid)'),
    cut('nb', 'M386 270 h34 v42 h-34Z', K, { dx: 3, sw: 3 }), h('path', { d: 'M392 284 h20 M392 296 h14', stroke: G, strokeWidth: 3 }),
    h('path', { d: 'M440 218 Q452 170 450 128', stroke: G, strokeWidth: 5, fill: 'none', strokeLinecap: 'round' }), h('circle', { cx: 450, cy: 120, r: 16, fill: C, stroke: G, strokeWidth: 4 }), h('path', { d: 'M442 118 q8 -8 16 2', stroke: G, strokeWidth: 3, fill: 'none' }),
    nt('r1', 392, 126, 0.6, M, -10),
    /* экспериментатор */
    cut('c4', 'M480 350 L530 190 L584 350Z', M, { rough: true }), h('path', { d: 'M500 290 H564', stroke: G, strokeWidth: 8 }),
    h('path', { d: 'M514 220 L490 180 L520 160', stroke: C, strokeWidth: 8, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }), ell('hn', 490, 172, 14, 10, C),
    h('path', { d: 'M538 192 l-20 -50 l38 -2Z', fill: G }), h('path', { d: 'M556 238 h40 l-8 26 h-32Z', fill: K, stroke: G, strokeWidth: 3 }),
    cut('sock', 'M548 300 v26 q0 12 14 12 q16 0 16 -14 v-6 h-8 v6 q0 6 -8 6 q-6 0 -6 -6 v-24Z', C, { dx: 3, sw: 3 }),
    cut('tape', Rp(486, 258, 90, 12), K, { dx: 0, sw: 3 }),
    nt('x1', 560, 160, 0.7, M, 20)
  );
};
