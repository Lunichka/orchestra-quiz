
/* ---------- Экран вопроса: сюжетная иллюстрация слева, ответы справа ---------- */
function Scene(p) {
  var f = SCENES[p.k];
  return h('div', { className: 'scene-wrap' }, f ? f() : null);
}

/* Ссылка «Послушать»: всегда новая вкладка с noopener; если url не подтверждён, вместо кнопки видна пометка */
function ListenLink(p) {
  var l = p.work.listen;
  if (!l || !l.url) {
    return h('p', { className: 'mc-note' }, 'Ссылка на запись будет добавлена. Подтверждённой записи пока нет.');
  }
  return h('div', { className: 'mc-actions' },
    h('a', { className: 'btn small', href: l.url, target: '_blank', rel: 'noopener noreferrer',
      'aria-label': p.label + ': ' + p.work.title + ', ' + p.work.composer + ' (откроется в новой вкладке)' },
      h('span', { className: 'face' }, p.label, ' ↗')),
    h('span', { className: 'mc-src' }, l.platform + (l.recording ? ' · ' + l.recording : '')));
}

/* Карточка музыкальной подсказки. Используется и после ответа («Музыкальная пауза»), и на результате */
function MusicCard(p) {
  var w = QUIZ_DATA.works[p.music.work];
  if (!w) return null;
  return h('article', { className: 'music-card' + (p.result ? ' is-result' : ''), 'aria-label': p.heading },
    h('div', { className: 'mc-ico', 'aria-hidden': true }, p.result ? h(Note, { fill: C }) : h(Vinyl)),
    h('div', { className: 'mc-body' },
      h('span', { className: 'mc-label' }, p.heading),
      h('p', { className: 'mc-lead' }, p.music.lead),
      h('p', { className: 'mc-work' }, w.title, h('span', { className: 'mc-comp' }, w.composer)),
      h('p', { className: 'mc-why' }, w.why),
      h(ListenLink, { work: w, label: p.listen })));
}

function Quiz(p) {
  var q = QUIZ_DATA.questions[p.qi], last = p.qi === TOTAL - 1, M0 = QUIZ_DATA.meta;
  var titleRef = useRef(null), slotRef = useRef(null), first = useRef(true);
  var swept = useRef(p.swept).current; /* вопрос открыт через нотный стан: иллюстрация появляется после него */
  useEffect(function () { if (titleRef.current) titleRef.current.focus({ preventScroll: true }); }, []);
  /* на телефоне карточка появляется под ответами: подводим её в поле зрения над закреплённой панелью */
  useEffect(function () {
    if (first.current) { first.current = false; return; }
    if (p.sel === null || !slotRef.current) return;
    if (window.matchMedia && matchMedia('(max-width: 860px)').matches) {
      var t = setTimeout(function () {
        var c = slotRef.current && slotRef.current.firstChild;
        if (c && c.scrollIntoView) c.scrollIntoView({ block: 'nearest', behavior: RM ? 'auto' : 'smooth' });
      }, 120);
      return function () { clearTimeout(t); };
    }
  }, [p.sel]);
  var tags = ['А', 'Б', 'В', 'Г'];
  var chosen = p.sel === null ? null : q.answers[p.sel];
  return h('section', { className: 'quiz enter' + (swept ? ' after-sweep' : ''), 'aria-labelledby': 'qt' },
    h(QuizDeco),
    h('div', { className: 'q-left' },
      h(Progress, { n: p.qi + 1 }),
      h('h2', { className: 'q-title', id: 'qt', tabIndex: -1, ref: titleRef }, q.text),
      h(Scene, { k: q.scene })
    ),
    h('div', { className: 'q-right' },
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
      h('div', { className: 'music-slot', ref: slotRef, 'aria-live': 'polite' },
        chosen
          ? h(MusicCard, { key: p.sel, music: chosen.music, heading: M0.musicPause.label, listen: M0.musicPause.listen })
          : h('p', { className: 'mc-empty' }, 'После ответа здесь появится музыкальная пауза: короткая подсказка, что послушать.'))
    ),
    h('div', { className: 'q-foot' },
      h('button', { className: 'btn ghost small', onClick: p.onBack }, h('span', { className: 'face' }, p.qi === 0 ? '← В начало' : '← Назад')),
      h('span', { className: 'msg', 'aria-live': 'polite' }, p.sel === null ? 'Выбери вариант, чтобы идти дальше.' : (last ? 'Последний вопрос. Дальше результат.' : 'Принято.')),
      h('button', { className: 'btn', disabled: p.sel === null, onClick: p.onNext }, h('span', { className: 'face', style: { fontSize: 'clamp(16px,1.6vw,24px)' } }, last ? 'Узнать результат' : 'Дальше →'))
    )
  );
}

/* ---------- Блок Orchestra 1703: вторичный, не перебивает музыкальную рекомендацию ---------- */
function OrchBlock() {
  var o = QUIZ_DATA.meta.orchestra;
  return h('aside', { className: 'orch-block', 'aria-labelledby': 'orch-t' },
    h('h3', { id: 'orch-t' }, o.title),
    h('p', null, o.text),
    h('div', { className: 'orch-links' },
      o.concerts.url && h('a', { className: 'btn small', href: o.concerts.url, target: '_blank', rel: 'noopener noreferrer' },
        h('span', { className: 'face' }, o.concerts.label, ' ↗')),
      o.links.map(function (l, i) {
        return h('a', { key: i, className: 'orch-link', href: l.url, target: '_blank', rel: 'noopener noreferrer' }, l.label, ' ↗');
      })),
    !o.concerts.url && o.concerts.note && h('p', { className: 'orch-note' }, o.concerts.note));
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
      a.fullName && a.fullName !== a.name && h('p', { className: 'r-full rise', style: { '--d': '0.6s' } }, a.fullName),
      h('p', { className: 'r-epithet rise', style: { '--d': '0.7s' } }, a.epithet),
      h('p', { className: 'r-text rise', style: { '--d': '0.8s' } }, a.text),
      h('p', { className: 'r-detail rise', style: { '--d': '0.9s' } }, h('b', null, 'Бытовая деталь'), a.detail),
      h('div', { className: 'r-music rise', style: { '--d': '1s' } },
        h(MusicCard, { music: a.music, result: true, heading: M0.resultMusic.label, listen: M0.resultMusic.listen })),
      a.caption && h('p', { className: 'r-note rise', style: { '--d': '1.05s' } }, a.caption),
      h('div', { className: 'rise', style: { '--d': '1.1s', width: '100%' } }, h(OrchBlock)),
      h('div', { className: 'r-actions rise', style: { '--d': '1.15s' } },
        h('button', { className: 'btn', onClick: p.onRetry }, h('span', { className: 'face', style: { fontSize: 'clamp(16px,1.7vw,26px)' } }, M0.retryLabel))
      ),
      h('p', { className: 'r-note small rise', style: { '--d': '1.2s' } }, M0.disclaimer)
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
  function pick(i) {
    if (busy.current) return; /* пока идёт переход, ответ не меняем */
    setPicks(function (prev) { var n = prev.slice(); n[qi] = i; return n; });
  }
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
    screen === 'quiz' && h(Quiz, { key: qi, qi: qi, sel: picks[qi], swept: sweep, onSel: pick, onNext: next, onBack: back }),
    screen === 'result' && resId && h(Result, { id: resId, onRetry: retry }),
    h(Curtain, { closed: closed }),
    h(Sweep, { on: sweep })
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
