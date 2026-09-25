'use client';
import { useMemo, useState } from 'react';
import D from '@/data/jev/testing-jev.json';
import { BarList, FAINT, GRID, INK, JEV, MUTED, Toggle, pct, useWidth, type BarRow } from '../ui';

const byModel = <T extends { model: string }>(rows: T[], model: string) => {
  const r = rows.find((x) => x.model === model);
  if (!r) throw new Error('missing published row: ' + model);
  return r;
};

// ------------------------------------------------------------ published comparisons, one benchmark at a time

type BenchKey = 'gpqa' | 'mmmlu' | 'gmmlu' | 'mmlu' | 'pro' | 'lsat';

function benchRows(k: BenchKey): { rows: BarRow[]; note: string; min: number } {
  if (k === 'gpqa') {
    const g = D.gpqa.models;
    const s: [string, string][] = [
      ['GPT-6 Astra', 'thinking, any effort'], ['Gemini 3.1 Pro', 'thinking high'], ['Claude Fable 5.1', 'max effort'],
      ['Kimi K3', 'max'], ['Qwen3.8 Max', 'thinking'], ['DeepSeek V4.1 Flash', 'max effort'],
    ];
    return {
      rows: [
        ...s.map(([m, sub]) => ({ label: m, sub, value: byModel(g, m).score })),
        { label: 'Jev', sub: 'one pass, no thinking', value: D.gpqa.jev.acc, jev: true },
        { label: 'Human PhD experts', sub: 'GPQA paper, in their own field', value: 0.65, muted: true, display: 'about 65%' },
        { label: 'GPT-4 (2023)', sub: 'GPQA paper, few-shot chain of thought', value: 0.36, muted: true, display: 'about 36%' },
      ],
      note: '198 graduate-level science questions with 4 options. Jev is averaged over 4 option orders.',
      min: 0,
    };
  }
  if (k === 'mmmlu') {
    const p = D.mmmlu.published;
    const s: [string, string, string][] = [
      ['Gemini 3.1 Pro', 'Gemini 3.1 Pro', 'thinking high'], ['Claude Opus 4.5', 'Claude Opus 4.5', '64k thinking budget'], ['Qwen3.7 Max', 'Qwen3.7 Max', 'thinking'],
      ['GPT-5 thinking', 'GPT-5 thinking', '0-shot chain of thought'], ['GPT-5 main', 'GPT-5 main', 'no thinking'],
    ];
    return {
      rows: [
        ...s.map(([m, label, sub]) => ({ label, sub, value: byModel(p, m).score })),
        { label: 'Jev', sub: 'one pass, no thinking', value: D.mmmlu.jev.avg, jev: true },
        { label: 'GPT-4o', sub: '0-shot, step by step', value: byModel(p, 'GPT-4o').score },
      ],
      note: 'Average over 14 translated languages. Jev ran 500 questions per language on a filtered, paired sample.',
      min: 0.5,
    };
  }
  if (k === 'gmmlu') {
    const p = D.gmmluLite.published;
    return {
      rows: [
        { label: 'Claude Opus 5.5', sub: 'full Global-MMLU, 42 languages, max effort', value: byModel(p, 'Claude Opus 5.5').score },
        { label: 'Claude Fable 5.1', sub: 'full Global-MMLU, 42 languages, max effort', value: byModel(p, 'Claude Fable 5.1').score },
        { label: 'Gemini 3.1 Pro', sub: 'Lite, Artificial Analysis run', value: byModel(p, 'Gemini 3.1 Pro').score },
        { label: 'Claude Opus 5', sub: 'full Global-MMLU, 42 languages', value: byModel(p, 'Claude Opus 5').score },
        { label: 'Gemini 3 Pro', sub: 'Lite, Artificial Analysis run', value: byModel(p, 'Gemini 3 Pro').score },
        { label: 'Jev', sub: 'Lite, 23 languages, one pass', value: D.gmmluLite.jev.avg, jev: true },
      ],
      note: 'The Claude numbers are on the full 42-language set, which is a different test from the Lite set Jev ran.',
      min: 0.5,
    };
  }
  if (k === 'mmlu') {
    const p = D.mmlu.published;
    return {
      rows: [
        { label: 'GPT-5', sub: 'self-reported via llm-stats; setting not stated, may be MMMLU', value: byModel(p, 'GPT-5').score },
        { label: 'Jev', sub: '570 questions, one pass', value: D.mmlu.jev.acc, jev: true },
        { label: 'DeepSeek V4 Pro Base', sub: 'base model, shot count not shown', value: byModel(p, 'DeepSeek V4 Pro Base').score },
        { label: 'GPT-4 (2023)', sub: '5-shot', value: byModel(p, 'GPT-4').score },
        { label: 'Llama 4 Maverick', sub: '5-shot, base model', value: byModel(p, 'Llama 4 Maverick').score },
      ],
      note: 'No model released in 2026 publishes an MMLU score. Jev ran 10 questions from each of 57 subjects.',
      min: 0.5,
    };
  }
  if (k === 'pro') {
    const p = D.mmluPro.published;
    const s: [string, string, string][] = [
      ['Gemini 3 Pro Preview (high)', 'Gemini 3 Pro', 'thinking high, Artificial Analysis'], ['Qwen3.7 Max', 'Qwen3.7 Max', 'self-reported'],
      ['Claude Opus 4.5 (Reasoning)', 'Claude Opus 4.5', 'thinking'], ['Claude Opus 4.5 (Non-reasoning)', 'Claude Opus 4.5', 'no extended thinking'],
      ['DeepSeek-V4-Pro-Max', 'DeepSeek V4 Pro', 'max reasoning effort'], ['Kimi K2.5', 'Kimi K2.5', 'thinking'], ['GPT-5', 'GPT-5', 'reasoning'], ['Grok 4', 'Grok 4', 'reasoning'],
    ];
    return {
      rows: [
        ...s.map(([m, label, sub]) => ({ label, sub, value: byModel(p, m).score })),
        { label: 'Jev', sub: '140 questions, one pass', value: D.mmluPro.jev.acc, jev: true },
        { label: 'Llama 4 Maverick', sub: 'non-reasoning', value: p.find((r) => r.model === 'Llama 4 Maverick' && /^non-reasoning/.test(r.setting))!.score },
        { label: 'GPT-4 (2023)', sub: 'Artificial Analysis run', value: byModel(p, 'GPT-4').score },
      ],
      note: 'Up to 10 options per question. At 140 questions the standard error is about 3 points.',
      min: 0.5,
    };
  }
  const p = D.lsat.published;
  const gpt4 = (s: string) => p.find((r) => r.model === 'GPT-4' && r.setting === s)!.overall;
  return {
    rows: [
      { label: 'Jev', sub: 'one pass, 4 option orders', value: D.lsat.jev.acc, jev: true },
      { label: 'GPT-4 (2023)', sub: 'few-shot', value: gpt4('few-shot') },
      { label: 'GPT-4 (2023)', sub: 'zero-shot', value: gpt4('zero-shot') },
      { label: 'Human average', sub: 'AGIEval paper', value: 0.56, muted: true },
      { label: 'ChatGPT (gpt-3.5-turbo)', sub: 'zero-shot', value: byModel(p, 'ChatGPT (gpt-3.5-turbo)').overall },
    ],
    note: 'AGIEval LSAT, all 1,009 questions. The GPT-4 overall figures are our size-weighted average of the paper\'s three sections. No 2026 model reports this set.',
    min: 0,
  };
}

export function BenchmarkBars() {
  const [k, setK] = useState<BenchKey>('gpqa');
  const { rows, note, min } = benchRows(k);
  return (
    <div>
      <Toggle
        label="Benchmark"
        value={k}
        onChange={setK}
        options={[
          { key: 'gpqa', label: 'GPQA Diamond' }, { key: 'mmmlu', label: 'MMMLU' }, { key: 'gmmlu', label: 'Global-MMLU' },
          { key: 'mmlu', label: 'MMLU' }, { key: 'pro', label: 'MMLU-Pro' }, { key: 'lsat', label: 'LSAT' },
        ]}
      />
      <BarList rows={rows} min={min} max={1} ariaLabel="Published scores and Jev's score" />
      <p className="text-xs text-gray-500 mt-4">{note} Bars start at {min === 0 ? '0%' : '50%'}.</p>
    </div>
  );
}

// ------------------------------------------------------------ GPQA accuracy against price

type Pt = { name: string; x: number; y: number; jev?: boolean; setting: string; price?: number | null };

export function GpqaScatter() {
  const [ref, W] = useWidth<HTMLDivElement>();
  const [sel, setSel] = useState<string>('Jev');
  const pts: Pt[] = useMemo(
    () => [
      { name: 'Jev', x: D.gpqa.jev.costPerQuestion, y: D.gpqa.jev.acc, jev: true, setting: 'measured cost, one pass' },
      ...D.gpqa.models.filter((m) => m.cost != null).map((m) => ({ name: m.model, x: m.cost as number, y: m.score, setting: m.setting, price: m.inputPrice })),
    ],
    [],
  );
  const narrow = W < 480;
  const H = narrow ? 300 : 360, l = 40, r = 12, t = 12, b = 44;
  const x0 = -5, x1 = -2, y0 = 0.7, y1 = 1;
  const X = (v: number) => l + ((Math.log10(v) - x0) / (x1 - x0)) * (W - l - r);
  const Y = (v: number) => t + ((y1 - v) / (y1 - y0)) * (H - t - b);

  // Greedy label placement; a label that does not fit is left off and shown on tap.
  const labels = useMemo(() => {
    const fs = narrow ? 10 : 11;
    const boxes = pts.map((p) => ({ x: X(p.x) - 6, y: Y(p.y) - 6, w: 12, h: 12 }));
    const hit = (a: { x: number; y: number; w: number; h: number }) =>
      a.x < l || a.x + a.w > W - 2 || a.y < t || a.y + a.h > H - b || boxes.some((q) => a.x < q.x + q.w && a.x + a.w > q.x && a.y < q.y + q.h && a.y + a.h > q.y);
    const out: { name: string; x: number; y: number; jev?: boolean }[] = [];
    for (const p of [...pts].sort((a, c) => (c.jev ? 1 : 0) - (a.jev ? 1 : 0) || c.y - a.y)) {
      const text = p.jev ? 'Jev ' + pct(p.y) : p.name;
      const w = text.length * fs * 0.58, h = fs + 2, px = X(p.x), py = Y(p.y);
      const cands = [[px + 8, py - h / 2], [px - 8 - w, py - h / 2], [px - w / 2, py - h - 6], [px - w / 2, py + 7]];
      const c = cands.find(([x, y]) => !hit({ x, y, w, h }));
      if (!c) continue;
      boxes.push({ x: c[0], y: c[1], w, h });
      out.push({ name: text, x: c[0], y: c[1] + h - 2, jev: p.jev });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [W, H, pts, narrow]);

  const s = pts.find((p) => p.name === sel) ?? pts[0];
  const jevCost = D.gpqa.jev.costPerQuestion;
  return (
    <div ref={ref}>
      <svg width={W} height={H} role="img" aria-label="GPQA Diamond accuracy against cost per question, log scale" className="block">
        {[0.7, 0.8, 0.9, 1].map((v) => (
          <g key={v}>
            <line x1={l} x2={W - r} y1={Y(v)} y2={Y(v)} stroke={GRID} />
            <text x={l - 6} y={Y(v) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{Math.round(v * 100)}%</text>
          </g>
        ))}
        {[-5, -4, -3, -2].map((e) => (
          <text key={e} x={X(10 ** e)} y={H - b + 16} textAnchor={e === x1 ? 'end' : e === x0 ? 'start' : 'middle'} fontSize={11} fill={MUTED}>
            ${(10 ** e).toFixed(-e)}
          </text>
        ))}
        <text x={(W + l) / 2} y={H - 8} textAnchor="middle" fontSize={11} fill={MUTED}>cost per question (log scale)</text>
        {pts.map((p) => (
          <g key={p.name} onClick={() => setSel(p.name)} style={{ cursor: 'pointer' }}>
            <circle cx={X(p.x)} cy={Y(p.y)} r={14} fill="transparent" />
            <circle cx={X(p.x)} cy={Y(p.y)} r={p.jev ? 6.5 : 4.5} fill={p.jev ? JEV : p.name === sel ? INK : '#8a8a8a'} stroke={p.name === sel ? '#fff' : 'none'} strokeWidth={1.5} />
          </g>
        ))}
        {labels.map((lb) => (
          <text key={lb.name} x={lb.x} y={lb.y} fontSize={narrow ? 10 : 11} fill={lb.jev ? JEV : MUTED} fontWeight={lb.jev ? 600 : 400}>{lb.name}</text>
        ))}
      </svg>
      <div className="flex flex-wrap gap-1.5 mt-3" role="radiogroup" aria-label="Pick a model">
        {pts.map((p) => (
          <button
            key={p.name}
            type="button"
            role="radio"
            aria-checked={p.name === sel}
            onClick={() => setSel(p.name)}
            className={`text-xs px-2 py-1 rounded border ${p.name === sel ? 'border-gray-400 text-white' : 'border-gray-800 text-gray-500 hover:text-gray-300'}`}
            style={p.jev && p.name !== sel ? { color: JEV } : undefined}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-300 mt-3 min-h-[3rem]">
        <span style={{ color: s.jev ? JEV : INK }}>{s.name}</span>: {pct(s.y)} on GPQA Diamond.{' '}
        {s.jev
          ? `Measured cost $${jevCost.toFixed(6)} per question, median answer time ${D.gpqa.jev.p50.toFixed(2)} s.`
          : `Estimated $${s.x.toFixed(5)} per question at $${s.price} per million input tokens, about ${Math.round(s.x / jevCost).toLocaleString('en-US')} times Jev's cost for the prompt alone. Score setting: ${s.setting}.`}
      </p>
    </div>
  );
}

// ------------------------------------------------------------ reliability diagram with a coverage slider

export function Reliability() {
  const [ref, W0] = useWidth<HTMLDivElement>();
  const [t, setT] = useState(80);
  const W = Math.min(W0, 520), H = Math.min(W, 380), l = 42, r = 12, tp = 12, b = 42;
  const X = (v: number) => l + v * (W - l - r), Y = (v: number) => tp + (1 - v) * (H - tp - b);
  const c = D.calibration.coverage[t];
  return (
    <div ref={ref}>
      <svg width={W} height={H} role="img" aria-label="Stated confidence against how often Jev was right, 4,036 LSAT answers" className="block">
        <rect x={X(t / 100)} y={tp} width={X(1) - X(t / 100)} height={H - tp - b} fill="#ffffff" opacity={0.05} />
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={l} x2={W - r} y1={Y(v)} y2={Y(v)} stroke={GRID} />
            <text x={l - 6} y={Y(v) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{v * 100}%</text>
            <text x={X(v)} y={H - b + 16} textAnchor={v === 0 ? 'start' : v === 1 ? 'end' : 'middle'} fontSize={11} fill={MUTED}>{v * 100}%</text>
          </g>
        ))}
        <line x1={X(0)} y1={Y(0)} x2={X(1)} y2={Y(1)} stroke={FAINT} strokeDasharray="4 4" />
        <text x={X(0.55)} y={Y(0.3)} fontSize={11} fill={MUTED}>perfectly honest</text>
        <line x1={X(t / 100)} x2={X(t / 100)} y1={tp} y2={H - b} stroke={MUTED} />
        <polyline fill="none" stroke={JEV} strokeWidth={1.5} points={D.calibration.bins.map((bn) => X(bn.conf) + ',' + Y(bn.acc)).join(' ')} />
        {D.calibration.bins.map((bn) => (
          <circle key={bn.lo} cx={X(bn.conf)} cy={Y(bn.acc)} r={bn.n > 1000 ? 7 : 4.5} fill={JEV}>
            <title>{`Said ${pct(bn.conf)}, right ${pct(bn.acc)} of ${bn.n.toLocaleString('en-US')} answers`}</title>
          </circle>
        ))}
        <text x={(W + l) / 2} y={H - 6} textAnchor="middle" fontSize={11} fill={MUTED}>how sure Jev said it was</text>
        <text transform={`translate(11 ${(H - b + tp) / 2}) rotate(-90)`} textAnchor="middle" fontSize={11} fill={MUTED}>how often it was right</text>
      </svg>
      <label className="block mt-5 text-sm text-gray-400" htmlFor="cov">
        Accept answers at or above <span className="font-mono text-white">{t}%</span> confidence
      </label>
      <input id="cov" type="range" min={20} max={99} value={t} onChange={(e) => setT(+e.target.value)} className="w-full mt-2 accent-[#f0a33c]" />
      <p className="text-sm text-gray-300 mt-2" aria-live="polite">
        Jev answers <span className="font-mono text-white">{pct(c.coverage)}</span> of the {D.calibration.answers.toLocaleString('en-US')} LSAT answers and gets{' '}
        <span className="font-mono" style={{ color: JEV }}>{c.accuracy != null ? pct(c.accuracy) : 'none'}</span> of those right. The rest go to a slower model or a person.
      </p>
    </div>
  );
}

// ------------------------------------------------------------ ChaosNLI item explorer

const LABELS = ['follows', 'neither', 'contradicts'];
const BIN_NAME: Record<string, string> = { agree: 'people agreed', mid: 'partly split', split: 'people split' };

export function ChaosExplorer() {
  const items = D.chaos.items;
  const [i, setI] = useState(() => Math.max(0, items.findIndex((x) => x.id === D.chaos.featured)));
  const it = items[i];
  const total = it.humans.reduce((a, b) => a + b, 0);
  return (
    <div>
      {(['split', 'mid', 'agree'] as const).map((bin) => (
        <div key={bin} className="mb-2">
          <div className="text-xs text-gray-500 mb-1.5">{BIN_NAME[bin]}</div>
          <div className="flex flex-wrap gap-1.5">
            {items.map((x, k) =>
              x.bin === bin ? (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setI(k)}
                  aria-pressed={k === i}
                  aria-label={`Pair ${k + 1}, ${BIN_NAME[bin]}`}
                  className={`w-8 h-8 text-xs font-mono rounded border ${k === i ? 'border-gray-300 text-white bg-gray-900' : 'border-gray-800 text-gray-500 hover:text-gray-300'}`}
                >
                  {k + 1}
                </button>
              ) : null,
            )}
          </div>
        </div>
      ))}
      <div className="mt-5 border-t border-gray-900 pt-5">
        <p className="text-sm text-gray-400">First sentence</p>
        <p className="text-base text-white mb-3">{it.premise}</p>
        <p className="text-sm text-gray-400">Second sentence</p>
        <p className="text-base text-white mb-5">{it.hypothesis}</p>
        <div className="space-y-3">
          {LABELS.map((lab, k) => (
            <div key={lab} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3 items-center">
              <span className="text-sm text-gray-300">{lab}</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-950 rounded-sm relative">
                    <div className="absolute inset-y-0 left-0 bg-gray-400 rounded-sm" style={{ width: (it.humans[k] / total) * 100 + '%' }} />
                  </div>
                  <span className="w-20 text-right text-xs font-mono text-gray-400 tabular-nums">{it.humans[k]} of {total}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-950 rounded-sm relative">
                    <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: it.jev[k] * 100 + '%', background: JEV }} />
                  </div>
                  <span className="w-20 text-right text-xs font-mono tabular-nums" style={{ color: JEV }}>{pct(it.jev[k], 0)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">Gray: votes from 100 annotators. Orange: Jev&apos;s probability for each label.</p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------ rule chain length

export function ChainChart() {
  const [ref, W] = useWidth<HTMLDivElement>();
  const H = 260, l = 40, r = 16, t = 14, b = 42;
  const xs = D.chain.map((c) => c.len);
  const X = (v: number) => l + ((Math.log2(v) - 1) / 3) * (W - l - r), Y = (v: number) => t + (1 - v) * (H - t - b);
  const line = (key: 'acc' | 'conf' | 'chance') => D.chain.map((c) => X(c.len) + ',' + Y(c[key])).join(' ');
  const last = D.chain[D.chain.length - 1];
  return (
    <div ref={ref}>
      <svg width={W} height={H} role="img" aria-label="Accuracy, stated confidence and chance by number of links in the rule chain" className="block">
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={l} x2={W - r} y1={Y(v)} y2={Y(v)} stroke={GRID} />
            <text x={l - 6} y={Y(v) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{v * 100}%</text>
          </g>
        ))}
        {xs.map((x) => (
          <text key={x} x={X(x)} y={H - b + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{x}</text>
        ))}
        <text x={(W + l) / 2} y={H - 6} textAnchor="middle" fontSize={11} fill={MUTED}>links in the chain</text>
        <polyline fill="none" stroke={FAINT} strokeDasharray="4 4" points={line('chance')} />
        <polyline fill="none" stroke={MUTED} strokeDasharray="2 3" points={line('conf')} />
        <polyline fill="none" stroke={JEV} strokeWidth={2} points={line('acc')} />
        {D.chain.map((c) => (
          <circle key={c.len} cx={X(c.len)} cy={Y(c.acc)} r={3.5} fill={JEV}>
            <title>{`${c.len} links: ${pct(c.acc, 0)} right, said ${pct(c.conf, 0)} sure, chance ${pct(c.chance, 0)}`}</title>
          </circle>
        ))}
        <text x={X(2) + 6} y={Y(D.chain[0].acc) - 8} fontSize={11} fill={JEV}>accuracy {pct(D.chain[0].acc, 0)}</text>
        <text x={X(16)} y={Y(last.conf) - 8} textAnchor="end" fontSize={11} fill={MUTED}>stated confidence {pct(last.conf, 0)}</text>
        <text x={X(16)} y={Y(last.acc) + 16} textAnchor="end" fontSize={11} fill={JEV}>accuracy {pct(last.acc, 0)}</text>
        <text x={X(5)} y={Y(D.chain[3].chance) + 16} fontSize={11} fill="#737373">chance</text>
      </svg>
    </div>
  );
}

// ------------------------------------------------------------ per-language accuracy

export function LanguageBars() {
  const [k, setK] = useState<'mmmlu' | 'gmmlu'>('mmmlu');
  const langs = k === 'mmmlu' ? D.mmmlu.languages : D.gmmluLite.languages;
  const en = langs.find((x) => x.control)!;
  const rows: BarRow[] = langs.map((x) => ({ label: x.name + (x.control ? ' (control)' : ''), value: x.acc, jev: !x.control, muted: x.control }));
  return (
    <div>
      <Toggle label="Dataset" value={k} onChange={setK} options={[{ key: 'mmmlu', label: 'MMMLU, 500 per language' }, { key: 'gmmlu', label: 'Global-MMLU-Lite, 200 per language' }]} />
      <BarList rows={rows} min={0.5} max={1} ariaLabel="Jev accuracy by language" reference={{ value: en.acc, label: `English on the same questions, ${pct(en.acc)}` }} />
      <p className="text-xs text-gray-500 mt-3">Bars start at 50%. Chance is 25%.</p>
    </div>
  );
}

// ------------------------------------------------------------ Game of 24

export function Game24Bars() {
  const rows: BarRow[] = D.g24.rows.map((r) => ({
    label: r.label,
    sub: `${r.calls} judge calls per puzzle`,
    value: r.solved / r.n,
    jev: r.label.startsWith('Jev'),
    muted: !r.label.startsWith('Jev'),
    display: `${r.solved}/${r.n}`,
  }));
  return <BarList rows={rows} ariaLabel="Game of 24 puzzles solved out of 30" />;
}

type TNode = { action: string | null; label: string; prior: number; visits: number; value: number; reward: number | null; children: TNode[] };

export function MctsStepper() {
  const [p, setP] = useState(0);
  const [step, setStep] = useState(0);
  const tr = D.g24.traces[p];
  const nodes: TNode[] = [tr.tree as unknown as TNode];
  for (const a of tr.path) {
    const next = nodes[nodes.length - 1].children.find((c) => c.action === a);
    if (!next) break;
    nodes.push(next);
  }
  const node = nodes[Math.min(step, nodes.length - 1)];
  const chosen = tr.path[step];
  const done = step >= tr.path.length;
  const kids = [...node.children].sort((a, b) => b.visits - a.visits);
  const totalVisits = nodes[0].visits;
  return (
    <div>
      <Toggle
        label="Puzzle"
        value={String(p)}
        onChange={(v) => { setP(+v); setStep(0); }}
        options={D.g24.traces.map((t, i) => ({ key: String(i), label: t.nums.join(' ') }))}
      />
      <div className="flex items-center gap-3 mb-4">
        <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-xs px-3 py-1.5 rounded border border-gray-800 text-gray-300 disabled:opacity-30">Back</button>
        <button type="button" onClick={() => setStep(Math.min(tr.path.length, step + 1))} disabled={done} className="text-xs px-3 py-1.5 rounded border border-gray-800 text-gray-300 disabled:opacity-30">Next move</button>
        <span className="text-xs text-gray-500 font-mono">move {Math.min(step, tr.path.length)} of {tr.path.length}</span>
      </div>
      <p className="text-sm text-gray-400">Position</p>
      <p className="text-lg font-mono text-white mb-4">{node.label.replace('Remaining numbers: ', '')}</p>
      {done ? (
        <p className="text-sm" style={{ color: tr.solved ? JEV : MUTED }}>
          {tr.solved ? 'Solved: the last number is 24.' : 'Not solved. The search ran out of simulations on a wrong line.'} {tr.judgeCalls} Jev calls in total for this puzzle.
        </p>
      ) : kids.length === 0 ? (
        <p className="text-sm text-gray-500">The search did not expand this position.</p>
      ) : (
        <div className="space-y-3" role="list" aria-label="Moves the search expanded from this position">
          {kids.map((c) => (
            <div role="listitem" key={c.action} className={`rounded border p-3 ${c.action === chosen ? 'border-gray-500' : 'border-gray-900'}`}>
              <div className="flex justify-between gap-2 text-sm">
                <span className="font-mono" style={{ color: c.action === chosen ? JEV : INK }}>{c.action}</span>
                {c.action === chosen && <span className="text-xs text-gray-400">taken</span>}
              </div>
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)_3rem] gap-x-2 gap-y-1 items-center mt-2 text-xs text-gray-500">
                <span>Jev&apos;s pick</span>
                <div className="h-1.5 bg-gray-950 relative rounded-sm"><div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: c.prior * 100 + '%', background: JEV }} /></div>
                <span className="font-mono text-right">{pct(c.prior, 0)}</span>
                <span>Visits</span>
                <div className="h-1.5 bg-gray-950 relative rounded-sm"><div className="absolute inset-y-0 left-0 bg-gray-400 rounded-sm" style={{ width: (c.visits / totalVisits) * 100 + '%' }} /></div>
                <span className="font-mono text-right">{c.visits}</span>
                <span>Value</span>
                <div className="h-1.5 bg-gray-950 relative rounded-sm"><div className="absolute inset-y-0 left-0 bg-gray-600 rounded-sm" style={{ width: c.value * 100 + '%' }} /></div>
                <span className="font-mono text-right">{c.value.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-500 mt-4">
        Jev&apos;s pick is the probability Jev gave the move. Visits counts how many of the {totalVisits} simulations went through it. Value is the search&apos;s running average of Jev&apos;s estimate that 24 can still be reached.
      </p>
    </div>
  );
}
