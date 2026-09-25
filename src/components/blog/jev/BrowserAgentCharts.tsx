'use client';
import { useMemo } from 'react';
import D from '@/data/jev/browser-agent.json';
import { FAINT, GRID, INK, JEV, MUTED, pct, useWidth } from '../ui';

type Tally = { total: number; success: number; failure: number; unscored: number };

// ------------------------------------------------------------ headless vs headed

export function RunComparison() {
  const hl = D.headless, hd = D.headed;
  const n = (t: Record<string, Tally>, ...keys: string[]) => keys.reduce((s, k) => s + (t[k]?.total ?? 0), 0);
  const scored = (t: Record<string, Tally>) => Object.values(t).reduce((s, x) => ({ ok: s.ok + x.success, n: s.n + x.success + x.failure }), { ok: 0, n: 0 });
  const sHl = scored(hl.byStatus), sHd = scored(hd.byStatus);
  const rows = [
    { label: 'Blocked by a bot wall', a: n(hl.byStatus, 'blocked') / hl.tasks, b: n(hd.byStatus, 'blocked') / hd.tasks, ad: `${n(hl.byStatus, 'blocked')}/${hl.tasks}`, bd: `${n(hd.byStatus, 'blocked')}/${hd.tasks}` },
    {
      label: 'Ended with an answer (complete, or answered on exit)',
      a: n(hl.byStatus, 'complete', 'answered_on_exit') / hl.tasks, b: n(hd.byStatus, 'complete', 'answered_on_exit') / hd.tasks,
      ad: `${n(hl.byStatus, 'complete', 'answered_on_exit')}/${hl.tasks}`, bd: `${n(hd.byStatus, 'complete', 'answered_on_exit')}/${hd.tasks}`,
    },
    { label: 'Judged success, among tasks the judge scored', a: sHl.ok / sHl.n, b: sHd.ok / sHd.n, ad: `${sHl.ok}/${sHl.n}`, bd: `${sHd.ok}/${sHd.n}` },
  ];
  return (
    <div>
      <div className="flex gap-4 text-xs text-gray-400 mb-4">
        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-2 bg-gray-500 rounded-sm" /> headless browser</span>
        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-2 rounded-sm" style={{ background: JEV }} /> headed real Chrome</span>
      </div>
      <div className="space-y-5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="text-sm text-gray-300 mb-1.5">{r.label}</div>
            {[
              { v: r.a, d: r.ad, c: '#737373' },
              { v: r.b, d: r.bd, c: JEV },
            ].map((x, i) => (
              <div key={i} className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-2 bg-gray-950 relative rounded-sm">
                  <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: x.v * 100 + '%', background: x.c }} />
                </div>
                <span className="text-right text-xs font-mono tabular-nums whitespace-nowrap" style={{ color: i ? JEV : MUTED }}>
                  {pct(x.v)} <span className="text-gray-500">({x.d})</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------ stacked outcomes

const SEG = [
  { key: 'success', label: 'judged success', color: JEV },
  { key: 'failure', label: 'judged failure', color: '#8a8a8a' },
  { key: 'unscored', label: 'no verdict yet', color: '#262626' },
] as const;

export function OutcomeLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-4">
      {SEG.map((s) => (
        <span key={s.key} className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-2 rounded-sm border border-gray-700" style={{ background: s.color }} /> {s.label}
        </span>
      ))}
    </div>
  );
}

function StackRow({ label, t, scale }: { label: string; t: Tally; scale: number }) {
  const scoredN = t.success + t.failure;
  return (
    <div>
      <div className="flex justify-between gap-3 text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="font-mono text-xs text-gray-400 tabular-nums whitespace-nowrap">
          <span style={{ color: JEV }}>{t.success}</span>/{scoredN} scored{scoredN ? ` (${pct(t.success / scoredN, 0)})` : ''} · {t.total} tasks
        </span>
      </div>
      <div className="flex h-3 rounded-sm overflow-hidden bg-gray-950" style={{ width: (t.total / scale) * 100 + '%' }} role="img" aria-label={`${label}: ${t.success} success, ${t.failure} failure, ${t.unscored} not judged, ${t.total} tasks`}>
        {SEG.map((s) => (
          <div key={s.key} style={{ width: (t[s.key] / t.total) * 100 + '%', background: s.color }} />
        ))}
      </div>
    </div>
  );
}

export function ByDifficulty() {
  const L = D.headed.byLevel as Record<string, Tally>;
  const max = Math.max(...Object.values(L).map((x) => x.total));
  return (
    <div>
      <OutcomeLegend />
      <div className="space-y-4">
        {['easy', 'medium', 'hard'].map((k) => <StackRow key={k} label={k[0].toUpperCase() + k.slice(1)} t={L[k]} scale={max} />)}
      </div>
    </div>
  );
}

const STATUS_NAME: Record<string, string> = {
  complete: 'Agent said the task was complete',
  answered_on_exit: 'Answered when it stopped',
  max_steps: 'Hit the 25-step limit',
  impossible: 'Agent said the task was impossible',
  blocked: 'Blocked by a bot wall',
  error: 'Error',
  max_seconds: 'Hit the time limit',
};

export function ByEnding() {
  const S = D.headed.byStatus as Record<string, Tally>;
  const max = Math.max(...Object.values(S).map((x) => x.total));
  return (
    <div>
      <OutcomeLegend />
      <div className="space-y-4">
        {Object.keys(STATUS_NAME).filter((k) => S[k]).map((k) => <StackRow key={k} label={STATUS_NAME[k]} t={S[k]} scale={max} />)}
      </div>
    </div>
  );
}

// ------------------------------------------------------------ published leaderboard

const BOARD = [
  { agent: 'Browser Use Cloud (bu-max)', date: 'Mar 2026', score: 0.97, judge: 'custom Claude-based judge' },
  { agent: 'GPT-5.4 native computer use', date: 'Mar 2026', score: 0.93, judge: 'screenshot-based judge' },
  { agent: 'ABP + Claude Opus 4.6', date: 'Mar 2026', score: 0.905, judge: 'per-task results published' },
  { agent: 'UI-TARS-2', date: 'Sep 2025', score: 0.882, judge: 'standard Online-Mind2Web' },
  { agent: 'Yutori Navigator', date: 'Nov 2025', score: 0.787, alt: 0.647, judge: 'human 78.7%, WebJudge 64.7%' },
  { agent: 'Operator (paper)', date: 'Apr 2025', score: 0.613, alt: 0.718, judge: 'human 61.3%, WebJudge 71.8%' },
  { agent: 'Claude 4.5', date: 'Nov 2025', score: 0.55, alt: 0.593, judge: 'human 55%, WebJudge 59.3%' },
  { agent: 'Jev harness, headed (this run)', date: 'Sep 2026', score: 0.347, floor: 0.117, judge: 'WebJudge-style, gpt-5.4-mini; 101 of 299 tasks scored', jev: true },
];

export function Leaderboard() {
  return (
    <div role="list" aria-label="Online-Mind2Web published success rates and the judge each used" className="space-y-4">
      {BOARD.map((r) => (
        <div role="listitem" key={r.agent}>
          <div className="flex justify-between gap-3 text-sm">
            <span style={{ color: r.jev ? JEV : INK }} className={r.jev ? 'font-medium' : ''}>
              {r.agent} <span className="text-xs text-gray-500">{r.date}</span>
            </span>
            <span className="font-mono tabular-nums" style={{ color: r.jev ? JEV : INK }}>{pct(r.score)}</span>
          </div>
          <div className="relative h-2 mt-1.5 bg-gray-950 rounded-sm">
            <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: r.score * 100 + '%', background: r.jev ? JEV : '#8a8a8a' }} />
            {r.floor != null && <div className="absolute -top-1 -bottom-1 w-0.5 bg-white" style={{ left: r.floor * 100 + '%' }} title="floor if every unjudged task failed" />}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Judge: {r.judge}
            {r.floor != null && `. White tick: ${pct(r.floor)} if every unjudged task counts as a failure.`}
          </div>
        </div>
      ))}
    </div>
  );
}

export function JudgeGap() {
  const rows = BOARD.filter((r) => r.alt != null);
  const lo = 0.4, hi = 0.9, X = (v: number) => ((v - lo) / (hi - lo)) * 100 + '%';
  return (
    <div>
      <div className="flex gap-4 text-xs text-gray-400 mb-4">
        <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full bg-white" /> human judges</span>
        <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-gray-400" /> WebJudge</span>
      </div>
      <div className="space-y-5">
        {rows.map((r) => (
          <div key={r.agent}>
            <div className="text-sm text-gray-300 mb-2">{r.agent}</div>
            <div className="relative h-4" role="img" aria-label={`${r.agent}: human ${pct(r.score)}, WebJudge ${pct(r.alt!)}`}>
              <div className="absolute top-1/2 h-px bg-gray-800 left-0 right-0" />
              <div className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-gray-500" style={{ left: X(Math.min(r.score, r.alt!)), width: `calc(${X(Math.max(r.score, r.alt!))} - ${X(Math.min(r.score, r.alt!))})` }} />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" style={{ left: X(r.score) }} />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-400 bg-black" style={{ left: X(r.alt!) }} />
            </div>
            <div className="text-xs font-mono text-gray-500 mt-1">human {pct(r.score)} · WebJudge {pct(r.alt!)} · gap {(Math.abs(r.score - r.alt!) * 100).toFixed(1)} points</div>
          </div>
        ))}
        <div className="relative h-4 text-xs text-gray-500">
          {[0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((v) => (
            <span key={v} className={`absolute ${v === 0.4 ? '' : v === 0.9 ? '-translate-x-full' : '-translate-x-1/2'}`} style={{ left: X(v) }}>{Math.round(v * 100)}%</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------ time per task

const EDGES = [0, 10, 20, 30, 45, 60, 90, 120, 240, Infinity];

export function TimeHistogram() {
  const [ref, W] = useWidth<HTMLDivElement>();
  const counts = useMemo(() => EDGES.slice(0, -1).map((lo, i) => D.headed.walls.filter((w) => w >= lo && w < EDGES[i + 1]).length), []);
  const labels = EDGES.slice(0, -1).map((lo, i) => (EDGES[i + 1] === Infinity ? `${lo} or more` : `${lo} to ${EDGES[i + 1]}`));
  const H = 230, l = 32, r = 10, t = 18, b = 40;
  const max = Math.max(...counts), top = Math.ceil(max / 20) * 20;
  const bw = (W - l - r) / counts.length;
  const Y = (v: number) => t + (1 - v / top) * (H - t - b);
  return (
    <div ref={ref}>
      <svg width={W} height={H} role="img" aria-label="Histogram of wall-clock seconds per task, headed run, 299 tasks" className="block">
        {[0, top / 2, top].map((v) => (
          <g key={v}>
            <line x1={l} x2={W - r} y1={Y(v)} y2={Y(v)} stroke={GRID} />
            <text x={l - 6} y={Y(v) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{v}</text>
          </g>
        ))}
        {counts.map((c, i) => (
          <g key={i}>
            <rect x={l + i * bw + 2} y={Y(c)} width={bw - 4} height={Y(0) - Y(c)} fill={JEV} opacity={0.9}>
              <title>{`${labels[i]} s: ${c} tasks`}</title>
            </rect>
            <text x={l + i * bw + bw / 2} y={Y(c) - 5} textAnchor="middle" fontSize={10} fill={INK}>{c}</text>
            <text x={l + i * bw} y={H - b + 15} textAnchor="middle" fontSize={W < 420 ? 10 : 11} fill={MUTED}>{EDGES[i]}</text>
          </g>
        ))}
        <text x={(W + l) / 2} y={H - 6} textAnchor="middle" fontSize={11} fill={MUTED}>seconds per task (uneven bins)</text>
      </svg>
    </div>
  );
}

// ------------------------------------------------------------ offline hill-climb

export function HillClimb() {
  const [ref, W] = useWidth<HTMLDivElement>();
  const dev = D.offline.devRuns;
  const H = 280, l = 38, r = 12, t = 14, b = 40;
  const n = dev.length;
  const X = (i: number) => l + (i / (n - 1)) * (W - l - r), Y = (v: number) => t + (1 - v / 0.6) * (H - t - b);
  const textFix = dev.findIndex((d) => /^WITH ELEMENT TEXT/.test(d.note));
  // Best held-out score per round: baseline, then the best after each round.
  const held = D.offline.heldOut;
  const base = held.find((h) => /baseline/.test(h.note))!;
  const rounds = [...new Set(held.map((h) => h.afterDev))].map((a) => held.filter((h) => h.afterDev === a).reduce((m, h) => (h.step > m.step ? h : m)));
  const steps = [{ x: 0, v: base.step, label: 'baseline' }, ...rounds.map((h, i) => ({ x: h.afterDev, v: h.step, label: 'round ' + (i + 1) }))];
  const path = steps.map((s, i) => (i ? `H${X(s.x)}V${Y(s.v)}` : `M${X(s.x)},${Y(s.v)}`)).join('');
  return (
    <div ref={ref}>
      <svg width={W} height={H} role="img" aria-label="Offline Mind2Web step success: every tuning run on dev steps, and the held-out result after each round" className="block">
        {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((v) => (
          <g key={v}>
            <line x1={l} x2={W - r} y1={Y(v)} y2={Y(v)} stroke={GRID} />
            <text x={l - 6} y={Y(v) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{Math.round(v * 100)}%</text>
          </g>
        ))}
        {textFix > 0 && (
          <g>
            <line x1={X(textFix - 0.5)} x2={X(textFix - 0.5)} y1={t} y2={H - b} stroke={FAINT} strokeDasharray="3 3" />
            <text x={X(textFix - 0.5) - 4} y={t + 10} textAnchor="end" fontSize={11} fill={MUTED}>element text fixed</text>
          </g>
        )}
        {dev.map((d) => (
          <circle key={d.i} cx={X(d.i)} cy={Y(d.step)} r={2.5} fill="#8a8a8a">
            <title>{`dev run ${d.i}: ${pct(d.step)}. ${d.note}`}</title>
          </circle>
        ))}
        <path d={path} fill="none" stroke={JEV} strokeWidth={2} />
        {steps.map((s) => (
          <g key={s.label}>
            <circle cx={X(s.x)} cy={Y(s.v)} r={4.5} fill={JEV} />
            <text x={X(s.x) - 6} y={Y(s.v) - 8} textAnchor={s.x === 0 ? 'start' : 'end'} fontSize={11} fill={JEV}>{pct(s.v)}</text>
          </g>
        ))}
        <text x={(W + l) / 2} y={H - 8} textAnchor="middle" fontSize={11} fill={MUTED}>tuning runs, in order</text>
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mt-2">
        <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full bg-gray-400" /> one tuning run on 200 dev steps</span>
        <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5" style={{ background: JEV }} /> best held-out score so far, 300 steps</span>
      </div>
    </div>
  );
}
