// Extracts the data behind the two Jev blog posts into static JSON under src/data/jev/.
// Reads saved results from two local repos. Makes no network or model calls.
//
//   node scripts/extract-jev-data.mjs
//
// Override the repo locations with JEV_BENCH_DIR and JEV_HARNESS_DIR.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../src/data/jev');
const BENCH = process.env.JEV_BENCH_DIR || resolve(process.env.HOME, "Developer/jevin's paradox tests");
const HARNESS = process.env.JEV_HARNESS_DIR || resolve(process.env.HOME, 'Developer/jev-agent-harness');

const read = (root, p) => readFileSync(resolve(root, p), 'utf8');
const json = (root, p) => JSON.parse(read(root, p));
const jev = (group, name = '') => json(BENCH, 'results/' + group + '/typesafe-ai-jev' + (name ? '-' + name : '') + '.json');
const r3 = (x) => Math.round(x * 1000) / 1000;
const r4 = (x) => Math.round(x * 10000) / 10000;
const V = json(BENCH, 'site/comparisons.v2.json');

// ---------------------------------------------------------------- post 1: Testing Jev

// Measured cost per question, used to estimate what the same prompt costs on other models.
const JEV_PRICE = V.price_and_speed.rows.find((r) => r.model === 'Jev').input_usd_per_mtok;
function measured(rep) {
  const costs = rep.items.map((i) => i.cost_usd).filter((x) => x != null);
  const cost = costs.reduce((a, b) => a + b, 0) / costs.length;
  return { cost, tokens: Math.round(cost / (JEV_PRICE / 1e6)), p50: rep.latency_ms.p50 / 1000 };
}

// GPQA Diamond: one published number per model (lab's own first, then Artificial Analysis, then Vals/Epoch).
const gpqaRep = jev('gpqa-diamond');
const gpqaM = measured(gpqaRep);
const urlOf = (s) => (String(s || '').match(/https?:\/\/[^\s)]+/) || [''])[0];
const gKind = (setting, u) => (/^official/i.test(setting) ? 0 : /llm-stats/.test(u) ? 1 : /artificialanalysis/.test(u) ? 2 : /vals\.ai|epoch\.ai/.test(u) ? 3 : 4);
const nf = [...V.newest_frontier.models, ...V.newest_frontier.other_aug_sep_2026_releases];
const gpqaModels = [];
for (const m of nf) {
  let best = null;
  for (const g of m.gpqa || []) {
    const u = urlOf(g.source), k = gKind(g.setting, u);
    if (!best || k < best.k || (k === best.k && g.value > best.score)) best = { k, score: g.value, setting: g.setting, source: u };
  }
  if (!best) continue;
  const price = m.price?.value?.input;
  gpqaModels.push({
    model: m.model, score: best.score, setting: best.setting, source: best.source,
    inputPrice: price ?? null, cost: price != null ? gpqaM.tokens * price / 1e6 : null,
  });
}
gpqaModels.sort((a, b) => b.score - a.score);

const mmmluRep = jev('mmmlu');
const gmRep = jev('global-mmlu-lite');
const LANG = {
  ar: 'Arabic', bn: 'Bengali', cs: 'Czech', cy: 'Welsh', de: 'German', en: 'English', es: 'Spanish', fr: 'French', hi: 'Hindi', hu: 'Hungarian', id: 'Indonesian',
  it: 'Italian', ja: 'Japanese', ko: 'Korean', my: 'Burmese', or: 'Odia', pt: 'Portuguese', sk: 'Slovak', sq: 'Albanian', sw: 'Swahili', tg: 'Tajik', yo: 'Yoruba', zh: 'Chinese',
};
const mmLangs = Object.entries(mmmluRep.extra.by_language)
  .map(([k, v]) => ({ code: k, name: k === 'EN-US' ? 'English' : LANG[k.slice(0, 2).toLowerCase()], acc: r4(v.accuracy), n: v.n, control: k === 'EN-US' }))
  .sort((a, b) => b.acc - a.acc);
const gmLangs = Object.entries(gmRep.extra.by_language)
  .map(([k, v]) => ({ code: k, name: LANG[k], acc: r4(v.accuracy), n: v.n, control: k === 'en' }))
  .sort((a, b) => b.acc - a.acc);

const MM_NAME = { 'gpt-5-thinking': 'GPT-5 thinking', 'gpt-5-main': 'GPT-5 main', 'gpt-4o-2024-11-20': 'GPT-4o' };
const mmmluPublished = V.mmmlu.rows.map((r) => ({ model: MM_NAME[r.variant] || (r.variant && !/Base|Max/.test(r.variant) ? r.variant : r.variant || r.model), score: r.score, setting: r.setting, source: urlOf(r.source) }));
const gmPublished = V.mmmlu.rows_global_mmlu.map((r) => ({ model: r.model, benchmark: r.benchmark, score: r.score, setting: r.setting, source: urlOf(r.source) }));

const lsat = jev('lsat', 'choice');
const mmlu = jev('knowledge', 'mmlu');
const mmluPro = jev('knowledge', 'mmlu-pro');

// Calibration on 4,036 LSAT answers, and the coverage you get by accepting answers above a threshold.
const calBins = lsat.calibration.bins.filter((b) => b.n).map((b) => ({ lo: b.lo, hi: b.hi, n: b.n, conf: r4(b.conf), acc: r4(b.acc) }));
const coverage = Array.from({ length: 101 }, (_, t) => {
  const a = lsat.items.filter((x) => x.confidence >= t / 100 - 1e-9);
  return { t, coverage: r4(a.length / lsat.items.length), accuracy: a.length ? r4(a.filter((x) => x.pred === x.gold).length / a.length) : null, n: a.length };
});

// ChaosNLI: about 20 items spread across agreement levels, including the brief's example.
const chaos = jev('coherence', 'chaosnli');
const [tLow, tHigh] = chaos.extra.entropy_thresholds_nats;
const chaosAll = read(BENCH, 'data/chaosnli-snli-200.jsonl').trim().split('\n').map((s) => {
  const r = JSON.parse(s), id = 'chaos-' + r.uid, a = chaos.items.find((x) => x.id === id);
  // Bin by human entropy in nats, the same thresholds the report uses (the JSONL's own entropy field is in bits).
  const h = chaos.extra.distributions.find((d) => d.id === id).human_entropy;
  const bin = h < tLow ? 'agree' : h >= tHigh ? 'split' : 'mid';
  return {
    id: r.uid, premise: r.example.premise, hypothesis: r.example.hypothesis, bin, entropy: r3(h),
    // order: follows (entailment), neither (neutral), contradicts (contradiction)
    humans: r.label_count, jev: [a.probs.entailment, a.probs.neutral, a.probs.contradiction],
  };
});
// Within each agreement bin, take items at evenly spaced quantiles of Jev's top probability,
// so the sample shows the spread of Jev's hedging in that bin rather than only the extremes.
const FEATURED = '4664359066.jpg#0r1n';
const pick = (bin, k) => {
  const xs = chaosAll.filter((c) => c.bin === bin && c.id !== FEATURED).sort((a, b) => Math.max(...a.jev) - Math.max(...b.jev) || a.id.localeCompare(b.id));
  return Array.from({ length: k }, (_, i) => xs[Math.round((i * (xs.length - 1)) / (k - 1))]);
};
const featured = chaosAll.find((c) => c.id === FEATURED);
const chaosItems = [...pick('split', 7), ...(featured.bin === 'split' ? [featured] : []), ...(featured.bin === 'mid' ? [featured] : []), ...pick('mid', 6), ...(featured.bin === 'agree' ? [featured] : []), ...pick('agree', 6)]
  .filter((c, i, a) => a.findIndex((d) => d.id === c.id) === i);
const hedge = chaos.extra.entropy_bins.map((b) => ({ bin: b.name === 'low' ? 'agree' : b.name === 'high' ? 'split' : 'mid', n: b.n, meanTop: r3(b.mean_max_probability), acc: r3(b.accuracy) }));

const chain = jev('rules-deep', 'depth-long').extra.levels.map((l) => ({ len: +l.level, n: l.n, acc: r4(l.accuracy), chance: r4(l.chance), conf: r4(l.mean_confidence) }));

// Game of 24: solve counts from the saved search logs; random judge from report 02 (no separate file).
const searchLog = (s) => {
  const m = read(BENCH, 'results/search/game24-jev-' + s + '-seed24.log').match(/solved (\d+)\/(\d+) \((\d+)%\), (\d+) judge calls/);
  return { solved: +m[1], n: +m[2], calls: +m[4] };
};
const g24 = [
  { label: 'Jev first pick', ...searchLog('greedy') },
  { label: 'Jev + beam search', ...searchLog('beam') },
  { label: 'Jev + MCTS', ...searchLog('mcts') },
  { label: 'Random judge + MCTS', solved: 4, n: 30, calls: 48 },
  { label: 'Perfect judge', solved: 30, n: 30, calls: 22 },
];
const traces = json(BENCH, 'results/search/traces.json');
const slim = (n) => ({ action: n.action || null, label: n.label, prior: n.prior, visits: n.visits, value: n.value, reward: n.reward ?? null, children: (n.children || []).map(slim) });
const g24Traces = traces.map((t) => ({ nums: t.nums, solved: t.solved, judgeCalls: t.judgeCalls, path: t.path, tree: slim(t.tree) }));

const chessPolicy = ['ascii', 'fen', 'prose'].map((e) => {
  const x = jev('chess-policy', e).extra;
  return { encoding: e, top1: x.top1_agreement, top3: x.top3_agreement, within30: x.within30_rate, blunder: x.blunder_rate };
});
const chessGames = ['none', 'mcts'].map((k) => {
  const x = json(BENCH, 'results/chess-play/typesafe-ai-jev-' + k + '-elo1350.json').extra;
  return { search: k, wins: x.wins, draws: x.draws, losses: x.losses, callsPerMove: x.judge_calls_per_move };
});

const comp = jev('coherence', 'complementarity').extra;
const inv = jev('coherence', 'invariance');
const trans = jev('coherence', 'transitivity').extra;
const consistency = {
  answerFlips: r4(inv.extra.answer_flip_rate),
  meanTV: r4(inv.extra.mean_tv),
  cycles: trans.cyclic_fraction,
  triples: trans.triple_count,
  negationError: r4(comp.mean_complement_error),
  isolationDelta: r4(comp.isolation_mean_max_delta),
};
const distraction = jev('distraction').extra.conditions.map((c) => ({ condition: c.condition, acc: c.accuracy, conf: r3(c.mean_confidence), followed: c.followed_injected_letter }));

const testingJev = {
  generated: 'from ' + "jevin's paradox tests" + ' results and site/comparisons.v2.json',
  gpqa: {
    jev: { acc: r4(gpqaRep.accuracy), ci: gpqaRep.extra.wilson95, ece: r4(gpqaRep.calibration.ece), consistency: r4(gpqaRep.consistency), n: gpqaRep.n, costPerQuestion: gpqaM.cost, tokensPerQuestion: gpqaM.tokens, p50: r3(gpqaM.p50), byDomain: gpqaRep.extra.by_domain },
    models: gpqaModels,
  },
  mmmlu: { jev: { avg: r4(mmmluRep.extra.average_14_languages), english: mmmluRep.extra.english_accuracy, ece: r4(mmmluRep.calibration.ece), perLanguage: mmmluRep.settings.per_language }, languages: mmLangs, published: mmmluPublished },
  gmmluLite: { jev: { avg: r4(gmRep.extra.language_average), ece: r4(gmRep.calibration.ece), perLanguage: gmRep.extra.effective_per_language }, languages: gmLangs, published: gmPublished },
  mmlu: { jev: { acc: r4(mmlu.accuracy), n: mmlu.n, ece: r4(mmlu.calibration.ece) }, published: V.benchmarks.mmlu.rows.filter((r) => r.model !== 'Jev').map((r) => ({ model: r.model, score: r.score, setting: r.setting, source: urlOf(r.source) })) },
  mmluPro: { jev: { acc: r4(mmluPro.accuracy), n: mmluPro.n, ece: r4(mmluPro.calibration.ece) }, published: V.benchmarks.mmlu_pro.rows.filter((r) => r.model !== 'Jev').map((r) => ({ model: r.variant || r.model, score: r.score, setting: r.setting, source: urlOf(r.source) })) },
  lsat: {
    jev: { acc: r4(lsat.accuracy), n: lsat.n, answers: lsat.evaluations, ece: r4(lsat.calibration.ece), sections: { ar: r4(lsat.sections.ar.accuracy), lr: r4(lsat.sections.lr.accuracy), rc: r4(lsat.sections.rc.accuracy) } },
    published: V.benchmarks.agieval_lsat.rows.filter((r) => r.model !== 'Jev').map((r) => ({ model: r.model, overall: r.overall ?? r.overall_derived, derived: r.overall == null, lr: r.lr, rc: r.rc, ar: r.ar, setting: r.setting, source: urlOf(r.source) })),
    official: V.benchmarks.agieval_lsat.related_not_agieval.rows.filter((r) => /1,037/.test(r.set)).map((r) => ({ model: r.model, total: r.total, lr: r.lr, rc: r.rc, setting: r.setting })),
    officialSource: urlOf(V.benchmarks.agieval_lsat.related_not_agieval.source),
  },
  calibration: { ece: r4(lsat.calibration.ece), answers: lsat.items.length, bins: calBins, coverage },
  chaos: { items: chaosItems, featured: FEATURED, hedge, jsDistance: 0.21 },
  chain,
  g24: { rows: g24, traces: g24Traces },
  chess: { policy: chessPolicy, games: chessGames },
  consistency,
  distraction,
};

// ---------------------------------------------------------------- post 2: browser agent

const lb = read(HARNESS, 'harness/leaderboard.tsv').trim().split('\n').slice(1).map((l) => {
  const [time, split, n, step, el, op, calls, tokens, latency, cost, errors, note] = l.split('\t');
  return { time, split, n: +n, step: +step, el: +el, op: +op, calls: +calls, tokens: +tokens, latency: +latency, note };
});
let iter = 0;
const devRuns = [], heldOut = [];
for (const r of lb) {
  if (r.split === 'dev') devRuns.push({ i: iter++, step: r.step, note: r.note });
  else heldOut.push({ afterDev: iter - 1, step: r.step, el: r.el, calls: r.calls, tokens: r.tokens, latencyMs: r.latency, note: r.note });
}

function om2w(dir) {
  const t = json(HARNESS, 'live/results/' + dir + '/trajectories-summary.json');
  const j = new Map(json(HARNESS, 'live/results/' + dir + '/judgments.json').judgments.map((x) => [x.task_id, x.status]));
  const outcome = (r) => { const s = j.get(r.task_id); return s === 'success' ? 'success' : s === 'failure' ? 'failure' : 'unscored'; };
  const tally = (key) => {
    const o = {};
    for (const r of t) { const k = key(r); o[k] ||= { total: 0, success: 0, failure: 0, unscored: 0 }; o[k].total++; o[k][outcome(r)]++; }
    return o;
  };
  const med = (a) => { a = [...a].sort((x, y) => x - y); const n = a.length; return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2; };
  const walls = t.map((r) => r.wall_s);
  return {
    tasks: t.length,
    byStatus: tally((r) => r.status),
    byLevel: tally((r) => r.level),
    wallMedian: med(walls),
    wallMean: Math.round((walls.reduce((a, b) => a + b, 0) / walls.length) * 100) / 100,
    walls: walls.map((w) => Math.round(w * 10) / 10),
    costPerTask: t.reduce((s, r) => s + r.cost_usd, 0) / t.length,
  };
}

const browserAgent = {
  generated: 'from jev-agent-harness harness/leaderboard.tsv and live/results',
  offline: { devRuns, heldOut },
  headed: om2w('om2w-headed'),
  headless: om2w('om2w-headless'),
};

mkdirSync(OUT, { recursive: true });
writeFileSync(resolve(OUT, 'testing-jev.json'), JSON.stringify(testingJev, null, 1) + '\n');
writeFileSync(resolve(OUT, 'browser-agent.json'), JSON.stringify(browserAgent, null, 1) + '\n');
console.log('wrote', resolve(OUT, 'testing-jev.json'), 'and browser-agent.json');
