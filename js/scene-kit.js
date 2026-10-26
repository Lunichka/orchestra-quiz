
var P2 = '#E2D6C8'; /* тёмная бумага */

function SceneDefs() {
  function dots(id, color, r, step, rot, op) {
    return h('pattern', { id: id, width: step, height: step, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(' + rot + ')' },
      h('circle', { cx: step / 2, cy: step / 2, r: r, fill: color, opacity: op }));
  }
  return h('svg', { width: 0, height: 0, style: { position: 'absolute' }, 'aria-hidden': true, focusable: 'false' },
    h('defs', null,
      dots('htG', G, 1.7, 6, 25, 0.85),
      dots('htGl', G, 1.2, 5, 25, 0.4),
      dots('htK', K, 2, 7, 25, 0.6),
      dots('htC', C, 2.2, 7, 25, 0.9),
      dots('htM', M, 2.2, 7, 25, 0.9),
      h('pattern', { id: 'stripeC', width: 14, height: 14, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' },
        h('rect', { width: 14, height: 14, fill: C }), h('rect', { width: 7, height: 14, fill: '#D9534D' })),
      h('pattern', { id: 'plaid', width: 28, height: 28, patternUnits: 'userSpaceOnUse' },
        h('rect', { width: 28, height: 28, fill: C }), h('rect', { width: 28, height: 8, y: 4, fill: '#D9534D' }),
        h('rect', { width: 8, height: 28, x: 4, fill: '#D9534D', opacity: 0.8 }), h('rect', { width: 28, height: 2, y: 20, fill: K, opacity: 0.7 })),
      h('filter', { id: 'rough', x: '-5%', y: '-5%', width: '110%', height: '110%' },
        h('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.035, numOctaves: 2, seed: 4, result: 'n' }),
        h('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: 5 }))
    )
  );
}

/* путь прямоугольника */
function Rp(x, y, w, hh) { return 'M' + x + ' ' + y + 'h' + w + 'v' + hh + 'h' + (-w) + 'Z'; }


function cut(k, d, fill, o) {
  o = o || {};
  var dx = o.dx === undefined ? 6 : o.dx, sw = o.sw || 4;
  var common = { d: d, strokeWidth: sw, strokeLinejoin: 'round', strokeLinecap: 'round' };
  var out = [];
  if (dx) out.push(h('path', Object.assign({ key: k + 's', fill: G, stroke: G, transform: 'translate(' + dx + ' ' + dx + ')' }, common)));
  out.push(h('path', Object.assign({ key: k, fill: fill, stroke: G, filter: o.rough ? 'url(#rough)' : undefined, opacity: o.op }, common)));
  return out;
}
/* овал-вырезка */
function ell(k, cx, cy, rx, ry, fill, o) {
  o = o || {};
  var dx = o.dx === undefined ? 5 : o.dx, sw = o.sw || 4, out = [];
  if (dx) out.push(h('ellipse', { key: k + 's', cx: cx + dx, cy: cy + dx, rx: rx, ry: ry, fill: G, stroke: G, strokeWidth: sw }));
  out.push(h('ellipse', { key: k, cx: cx, cy: cy, rx: rx, ry: ry, fill: fill, stroke: G, strokeWidth: sw }));
  return out;
}
/* текст-плашка шрифтом бренда-заменителя */
function tx(k, x, y, s, t, o) {
  o = o || {};
  return h('text', {
    key: k, x: x, y: y, fontFamily: o.f || 'Unbounded, Arial Black, sans-serif', fontWeight: 800, fontSize: s, fill: o.fill || G,
    textAnchor: o.a || 'start', letterSpacing: o.ls || 0, transform: o.rot ? 'rotate(' + o.rot + ' ' + x + ' ' + y + ')' : undefined
  }, t);
}
/* нота-штрих (просто знак, без тени) */
function nt(k, x, y, s, fill, rot) {
  return h('g', { key: k, transform: 'translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')' },
    h('path', { d: 'M20 -52 V0', stroke: G, strokeWidth: 6, fill: 'none', strokeLinecap: 'round' }),
    h('path', { d: 'M20 -52 C30 -42 40 -36 34 -20', stroke: G, strokeWidth: 6, fill: 'none', strokeLinecap: 'round' }),
    h('ellipse', { cx: 6, cy: 2, rx: 17, ry: 11, transform: 'rotate(-22 6 2)', fill: fill, stroke: G, strokeWidth: 4 }));
}

/* голова-вырезка: kind = wig | wild | beard | cap | glasses | hat | none; mood = smile | frown | calm | o */
function Head(k, x, y, s, kind, mood, o) {
  o = o || {};
  var back = [], front = [];
  if (kind === 'wig') {
    [[-42, -4, 15], [42, -4, 15], [-40, 22, 12], [40, 22, 12]].forEach(function (c, i) {
      back.push(h('g', { key: 'w' + i }, h('circle', { cx: c[0], cy: c[1], r: c[2], fill: K, stroke: G, strokeWidth: 4 }), h('circle', { cx: c[0], cy: c[1], r: c[2], fill: 'url(#htGl)' })));
    });
    back.push(h('path', { key: 'wp', d: 'M-40 -22 Q-30 -66 0 -62 Q30 -66 40 -22 Q0 -42 -40 -22Z', fill: K, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }));
  } else if (kind === 'wild') {
    var pts = [];
    for (var i = 0; i < 18; i++) {
      var a = Math.PI + (Math.PI * i) / 17 - 0.35 + (i * 0.04), r = i % 2 ? 66 : 50;
      pts.push((Math.cos(a) * r * 1.05).toFixed(1) + ',' + (Math.sin(a) * r * 1.05 + 4).toFixed(1));
    }
    back.push(h('polygon', { key: 'wh', points: '-52,34 ' + pts.join(' ') + ' 52,34', fill: G, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }));
  } else if (kind === 'beard') {
    front.push(h('path', { key: 'bd', d: 'M-34 6 Q-40 56 0 66 Q40 56 34 6 Q18 30 0 26 Q-18 30 -34 6Z', fill: o.beard || G, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }));
    back.push(h('path', { key: 'hr', d: 'M-38 -8 Q-40 -50 0 -52 Q40 -50 38 -8 Q20 -30 0 -30 Q-20 -30 -38 -8Z', fill: o.hair || P2, stroke: G, strokeWidth: 4 }));
  } else if (kind === 'cap') {
    front.push(h('path', { key: 'cp', d: 'M-46 -20 Q-10 -68 46 -34 Q28 -16 0 -20 Q-26 -14 -46 -20Z', fill: o.hair || M, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }));
    front.push(h('rect', { key: 'cs', x: -3, y: -64, width: 6, height: 10, fill: G }));
  } else if (kind === 'hat') {
    front.push(h('ellipse', { key: 'hb', cx: 0, cy: -24, rx: 58, ry: 10, fill: o.hair || G, stroke: G, strokeWidth: 4 }));
    if (o.beard) front.unshift(h('path', { key: 'hbd', d: 'M-34 6 Q-40 56 0 66 Q40 56 34 6 Q18 30 0 26 Q-18 30 -34 6Z', fill: o.beard, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }));
    front.push(h('path', { key: 'hc', d: 'M-34 -26 Q-36 -66 0 -66 Q36 -66 34 -26Z', fill: o.hair || G, stroke: G, strokeWidth: 4, strokeLinejoin: 'round' }));
    front.push(h('rect', { key: 'hr', x: -34, y: -38, width: 68, height: 8, fill: C }));
  }
  var face = [
    h('ellipse', { key: 'f', cx: 0, cy: 0, rx: 36, ry: 44, fill: K, stroke: G, strokeWidth: 4 }),
    h('path', { key: 'fs', d: 'M0 -44 A36 44 0 0 1 0 44 Z', fill: 'url(#htG)', opacity: 0.55 })
  ];
  var ey = kind === 'glasses' ? [
    h('circle', { key: 'g1', cx: -14, cy: -4, r: 11, fill: K, stroke: G, strokeWidth: 4 }), h('circle', { key: 'g2', cx: 14, cy: -4, r: 11, fill: K, stroke: G, strokeWidth: 4 }),
    h('path', { key: 'gb', d: 'M-3 -4 h6', stroke: G, strokeWidth: 4 })] : [];
  var brows = mood === 'frown' ? 'M-24 -20 L-6 -12 M24 -20 L6 -12' : mood === 'o' ? 'M-22 -22 Q-14 -28 -6 -22 M22 -22 Q14 -28 6 -22' : 'M-22 -18 Q-14 -22 -6 -18 M22 -18 Q14 -22 6 -18';
  var mouth = mood === 'smile' ? 'M-12 20 Q0 32 12 20' : mood === 'o' ? '' : mood === 'frown' ? 'M-12 26 Q0 18 12 26' : 'M-9 24 H9';
  var feat = [
    h('circle', { key: 'e1', cx: -14, cy: -4, r: 3.4, fill: G }), h('circle', { key: 'e2', cx: 14, cy: -4, r: 3.4, fill: G }),
    h('path', { key: 'br', d: brows, stroke: G, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' }),
    h('path', { key: 'ns', d: 'M0 2 L-5 16 H3', stroke: G, strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' })
  ];
  if (mouth) feat.push(h('path', { key: 'mo', d: mouth, stroke: G, strokeWidth: 4, fill: 'none', strokeLinecap: 'round' }));
  else feat.push(h('ellipse', { key: 'mo', cx: 0, cy: 26, rx: 7, ry: 9, fill: G }));
  return h('g', { key: k, transform: 'translate(' + x + ' ' + y + ') rotate(' + (o.rot || 0) + ') scale(' + s + ')' },
    h('g', { transform: 'translate(5 5)', opacity: 1 }, h('ellipse', { cx: 0, cy: 0, rx: 36, ry: 44, fill: G })),
    back, face, feat, ey, front);
}

/* плечи / корпус */
function Torso(k, x, y, w, hh, fill, o) {
  o = o || {};
  var d = 'M' + x + ' ' + (y + hh) + ' L' + (x + w * 0.08) + ' ' + (y + hh * 0.25) + ' Q' + (x + w * 0.2) + ' ' + y + ' ' + (x + w * 0.5) + ' ' + y + ' Q' + (x + w * 0.8) + ' ' + y + ' ' + (x + w * 0.92) + ' ' + (y + hh * 0.25) + ' L' + (x + w) + ' ' + (y + hh) + 'Z';
  var out = cut(k, d, fill, o);
  if (o.shirt) out.push(h('path', { key: k + 'v', d: 'M' + (x + w * 0.38) + ' ' + y + ' L' + (x + w * 0.5) + ' ' + (y + hh * 0.5) + ' L' + (x + w * 0.62) + ' ' + y + 'Z', fill: K, stroke: G, strokeWidth: 3, strokeLinejoin: 'round' }));
  if (o.halftone) out.push(h('path', { key: k + 'h', d: d, fill: 'url(#' + o.halftone + ')', opacity: 0.5 }));
  return out;
}


function Stage(p) {
  var ys = [60, 90, 120, 150, 180], hid = 0, i;
  for (i = 0; i < p.label.length; i++) hid = (hid * 31 + p.label.charCodeAt(i)) % 100000;
  var cid = 'sk' + hid;
  return h('svg', { viewBox: '0 0 600 420', className: 'scene', role: 'img', 'aria-label': p.label, preserveAspectRatio: 'xMidYMid meet' },
    h('rect', { x: 8, y: 8, width: 584, height: 404, fill: G }),
    h('rect', { x: 2, y: 2, width: 584, height: 404, fill: p.bg || K, stroke: G, strokeWidth: 5 }),
    ys.map(function (y, i) { return h('path', { key: 'l' + i, d: 'M2 ' + (y + 190) + ' H586', stroke: G, strokeWidth: 2, opacity: 0.18 }); }),
    h('defs', null, h('clipPath', { id: cid }, h('rect', { x: 2, y: 2, width: 584, height: 404 }))),
    h('g', { clipPath: 'url(#' + cid + ')' }, p.children)
  );
}
