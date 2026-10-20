
/* ---------- Экран вопроса: сюжетная иллюстрация слева, ответы справа ---------- */
function Scene(p) {
  var f = SCENES[p.k];
  return h('div', { className: 'scene-wrap' }, f ? f() : null);
}

function Quiz(p) {
  var q = QUIZ_DATA.questions[p.qi], last = p.qi === TOTAL - 1;
  var titleRef = useRef(null);
  useEffect(function () { if (titleRef.current) titleRef.current.focus({ preventScroll: true }); }, []);
  var tags = ['А', 'Б', 'В', 'Г'];
  return h('section', { className: 'quiz enter', 'aria-labelledby': 'qt' },
    h(QuizDeco),
    h('div', { className: 'q-left' },
      h(Progress, { n: p.qi + 1 }),
      h('h2', { className: 'q-title', id: 'qt', tabIndex: -1, ref: titleRef }, q.text),
      h(Scene, { k: q.scene })
    ),
    h('fieldset', { className: 'answers' },
      h('legend', null, q.text),
      q.answers.map(function (a, i) {
        return h('label', { className: 'ans', key: i, style: { '--i': i } },
          h('input', { type: 'radio', name: 'q' + p.qi, value: i, checked: p.sel === i, onChange: function () { p.onSel(i); } }),
          h('span', { className: 'card' },
            h('span', { className: 'tag' }, tags[i]),
            h('span', { className: 'txt' }, a.hook, h('small', null, a.rest))));
      })
    ),
    h('div', { className: 'q-foot' },
      h('button', { className: 'btn ghost small', onClick: p.onBack }, h('span', { className: 'face' }, p.qi === 0 ? '← В начало' : '← Назад')),
      h('span', { className: 'msg', 'aria-live': 'polite' }, p.sel === null ? 'Выбери вариант, чтобы идти дальше.' : (last ? 'Последний вопрос. Дальше афиша.' : 'Принято.')),
      h('button', { className: 'btn', disabled: p.sel === null, onClick: p.onNext }, h('span', { className: 'face', style: { fontSize: 'clamp(16px,1.6vw,24px)' } }, last ? 'Узнать результат' : 'Дальше →'))
    )
  );
}

/* ---------- Экран результата: афиша + текст ---------- */
function Result(p) {
  var a = QUIZ_DATA.archetypes[p.id], M0 = QUIZ_DATA.meta;
  var words = a.name.split(' '), longest = Math.max.apply(null, words.map(function (w) { return w.length; }));
  var titleRef = useRef(null);
  useEffect(function () { if (titleRef.current) titleRef.current.focus({ preventScroll: true }); }, []);
  var poster = POSTERS[a.poster];
  return h('section', { className: 'result', 'aria-labelledby': 'rt' },
    h(QuizDeco),
    h('div', { className: 'poster-wrap' }, poster ? poster() : null),
    h('div', { className: 'r-copy' },
      h('span', { className: 'r-label rise', style: { '--d': '0.35s' } }, M0.resultLabel),
      h('h2', { className: 'r-name', id: 'rt', tabIndex: -1, ref: titleRef, style: { '--n': longest } },
        words.map(function (w, i) { return h('span', { key: i, className: 'w w' + i + ' rise', style: { '--d': (0.45 + i * 0.12) + 's' } }, w); })),
      h('p', { className: 'r-epithet rise', style: { '--d': '0.7s' } }, a.epithet),
      h('p', { className: 'r-text rise', style: { '--d': '0.8s' } }, a.text),
      h('p', { className: 'r-detail rise', style: { '--d': '0.9s' } }, h('b', null, 'Бытовая деталь'), a.detail),
      a.caption && h('p', { className: 'r-note rise', style: { '--d': '0.95s' } }, a.caption),
      h('div', { className: 'r-actions rise', style: { '--d': '1s' } },
        h('button', { className: 'btn', onClick: p.onRetry }, h('span', { className: 'face', style: { fontSize: 'clamp(16px,1.7vw,26px)' } }, M0.retryLabel)),
        M0.orchestra.url && h('a', { className: 'r-link', href: M0.orchestra.url, target: '_blank', rel: 'noopener' }, M0.orchestra.label, ' ↗')
      ),
      h('p', { className: 'r-note small rise', style: { '--d': '1.05s' } }, M0.disclaimer)
    )
  );
}

function App() {
  var s = useState('hero'), screen = s[0], setScreen = s[1];
  var qs = useState(0), qi = qs[0], setQi = qs[1];
  var ps = useState(function () { return QUIZ_DATA.questions.map(function () { return null; }); }), picks = ps[0], setPicks = ps[1];
  var rs = useState(null), resId = rs[0], setResId = rs[1];
  var c = useState(false), closed = c[0], setClosed = c[1];
  var pr = useState(false), pressed = pr[0], setPressed = pr[1];
  var sw = useState(false), sweep = sw[0], setSweep = sw[1];
  var busy = useRef(false);

  /* смена экрана через занавес: apply вызывается, когда занавес закрыт */
  function curtain(apply, press) {
    if (busy.current) return; busy.current = true;
    if (press) setPressed(true);
    setTimeout(function () { setClosed(true); }, T(press ? 150 : 0));
    setTimeout(function () {
      apply(); setPressed(false);
      requestAnimationFrame(function () { requestAnimationFrame(function () { setClosed(false); }); });
      setTimeout(function () { busy.current = false; }, T(650));
    }, T(press ? 850 : 700));
  }
  /* смена вопроса через нотный стан */
  function staff(apply) {
    if (busy.current) return; busy.current = true;
    setSweep(true);
    setTimeout(apply, T(480));
    setTimeout(function () { setSweep(false); busy.current = false; }, T(1050));
  }

  function start() { curtain(function () { setScreen('quiz'); setQi(0); }, true); }
  function pick(i) { setPicks(function (prev) { var n = prev.slice(); n[qi] = i; return n; }); }
  function next() {
    if (picks[qi] === null) return;
    if (qi < TOTAL - 1) { staff(function () { setQi(qi + 1); }); return; }
    if (!QuizLogic.isComplete(QUIZ_DATA, picks)) return;
    var r = QuizLogic.score(QUIZ_DATA, picks);
    curtain(function () { setResId(r.winner); setScreen('result'); });
  }
  function back() {
    if (qi > 0) staff(function () { setQi(qi - 1); });
    else curtain(function () { setScreen('hero'); });
  }
  function retry() {
    curtain(function () {
      setPicks(QUIZ_DATA.questions.map(function () { return null; }));
      setQi(0); setResId(null); setScreen('hero');
    });
  }

  return h('div', { className: 'app' },
    h(SceneDefs),
    screen === 'hero' && h(Hero, { onStart: start, pressed: pressed }),
    screen === 'quiz' && h(Quiz, { key: qi, qi: qi, sel: picks[qi], onSel: pick, onNext: next, onBack: back }),
    screen === 'result' && resId && h(Result, { id: resId, onRetry: retry }),
    h(Curtain, { closed: closed }),
    h(Sweep, { on: sweep })
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
