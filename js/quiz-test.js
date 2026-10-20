/* Проверка данных и подсчёта отдельно от UI: node quiz-test.js */
var D = require('./quiz-data.js').QUIZ_DATA;
var L = require('./quiz-logic.js').QuizLogic;
var assert = require('assert');

var v = L.validate(D);
assert.ok(v.ok, 'матрица: ' + v.errors.join('; '));
console.log('матрица ок, вхождений на архетип:', JSON.stringify(v.counts));


var reach = {}, n = 0, ties = 0, bad = 0;
D.archetypeOrder.forEach(function (id) { reach[id] = 0; });
function walk(i, picks) {
  if (i === 7) {
    n++;
    var r = L.score(D, picks);
    if (r.leaders.length > 1) ties++;
    if (r.leaders.indexOf(r.winner) < 0) bad++;
    var sum = 0; for (var k in r.scores) sum += r.scores[k];
    if (sum !== 7) bad++;
    reach[r.winner]++;
    return;
  }
  for (var a = 0; a < 4; a++) { picks[i] = a; walk(i + 1, picks); }
}
walk(0, []);
assert.strictEqual(bad, 0, 'победитель не из лидеров или сумма баллов не 7');
D.archetypeOrder.forEach(function (id) { assert.ok(reach[id] > 0, id + ' недостижим'); });
console.log('путей:', n, 'ничьих:', ties);
console.log('достижимость (путей на архетип):', JSON.stringify(reach));


D.archetypeOrder.forEach(function (id) {
  var picks = D.questions.map(function (q) {
    var i = q.answers.findIndex(function (a) { return a.archetype === id; });
    return i;
  });
  var other = 0;
  picks = picks.map(function (p, qi) { return p >= 0 ? p : (other++, 0); });
  var r = L.score(D, picks);
  assert.strictEqual(r.winner, id, id + ' должен победить при 4 своих ответах');
});
console.log('4 своих ответа => победа: ок');


var t = L.score(D, [0, 0, 0, 0, 0, 0, 0]);
console.log('пример ничьей-проверки:', JSON.stringify(t));
var p = [0, 3, 3, 1, 2, 0, 1];
var r2 = L.score(D, p);
assert.ok(r2.leaders.indexOf(r2.winner) >= 0);
assert.ok(!L.isComplete(D, [0, 1, null, 0, 0, 0, 0]));
assert.ok(L.isComplete(D, [0, 1, 2, 3, 0, 1, 2]));
console.log('ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ');
