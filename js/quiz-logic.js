
var QuizLogic = (function () {
  function validate(data) {
    var errors = [], counts = {};
    data.archetypeOrder.forEach(function (id) {
      counts[id] = 0;
      if (!data.archetypes[id]) errors.push('нет архетипа ' + id);
    });
    data.questions.forEach(function (q) {
      if (q.answers.length !== 4) errors.push(q.id + ': вариантов не 4');
      q.answers.forEach(function (a, i) {
        if (!(a.archetype in counts)) errors.push(q.id + '/' + i + ': неизвестный архетип ' + a.archetype);
        else counts[a.archetype]++;
      });
    });
    data.archetypeOrder.forEach(function (id) {
      if (counts[id] !== 4) errors.push(id + ' встречается ' + counts[id] + ' раз, нужно 4');
    });
    if (data.questions.length !== 7) errors.push('вопросов не 7');
    return { ok: errors.length === 0, errors: errors, counts: counts };
  }

  function score(data, picks) {
    var scores = {}, last = {};
    data.archetypeOrder.forEach(function (id) { scores[id] = 0; last[id] = -1; });
    data.questions.forEach(function (q, qi) {
      var p = picks[qi];
      if (p === null || p === undefined || !q.answers[p]) return;
      var id = q.answers[p].archetype;
      scores[id] += 1;
      last[id] = qi; /* самый поздний ответ, давший балл этому архетипу */
    });
    var max = Math.max.apply(null, data.archetypeOrder.map(function (id) { return scores[id]; }));
    var leaders = data.archetypeOrder.filter(function (id) { return scores[id] === max; });
    var winner = leaders.reduce(function (best, id) { return last[id] > last[best] ? id : best; }, leaders[0]);
    return { winner: winner, scores: scores, leaders: leaders, answered: picks.filter(function (p) { return p !== null && p !== undefined; }).length };
  }

  function isComplete(data, picks) {
    return data.questions.every(function (_, i) { return picks[i] !== null && picks[i] !== undefined; });
  }

  return { validate: validate, score: score, isComplete: isComplete };
})();

if (typeof module !== 'undefined') module.exports = { QuizLogic: QuizLogic };
