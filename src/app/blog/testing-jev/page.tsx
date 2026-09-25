import type { Metadata } from 'next';
import Link from 'next/link';
import D from '@/data/jev/testing-jev.json';
import { Details, P, PostShell, Scorecard, Section, SmallTable } from '@/components/blog/Post';
import { Figure } from '@/components/blog/ui';
import { pct } from '@/components/blog/theme';
import {
  BenchmarkBars, ChainChart, ChaosExplorer, Game24Bars, GpqaScatter, LanguageBars, MctsStepper, Reliability,
} from '@/components/blog/jev/TestingJevCharts';

export const metadata: Metadata = {
  title: 'Testing Jev',
  description:
    'Jev is a model that cannot write text. It returns a choice and a probability in about a quarter of a second. I tested it on GPQA Diamond, MMMLU, the LSAT, calibration, invented rules, search and chess.',
  alternates: { canonical: '/blog/testing-jev' },
  openGraph: { title: 'Testing Jev', type: 'article', publishedTime: '2026-09-25' },
};

const find = <T extends { model: string }>(xs: T[], m: string) => xs.find((x) => x.model === m)!;
const g = D.gpqa, mm = D.mmmlu, gm = D.gmmluLite;
const lsatGpt4Few = D.lsat.published.find((r) => r.model === 'GPT-4' && r.setting === 'few-shot')!.overall;
const cov80 = D.calibration.coverage[80], cov70 = D.calibration.coverage[70];
const lang = (xs: { name: string; acc: number }[], n: string) => xs.find((x) => x.name === n)!.acc;
const distr = (c: string) => D.distraction.find((x) => x.condition === c)!;
const chainAt = (n: number) => D.chain.find((c) => c.len === n)!;

export default function TestingJevPage() {
  return (
    <PostShell title="Testing Jev" date="2026-09-25" tags={['AI', 'Evals']}>
      <P>
        Jev is a model from TypeSafe AI that cannot write text. You give it some input and a question with a list of options. It returns its pick and a
        probability for every option. It answers in one pass, in about a quarter of a second, for about $0.00003 per question. It cannot think step by
        step, because it has nowhere to write the steps.
      </P>
      <P>
        I spent a week testing what that one pass can do. The scores below were all checked against each dataset&apos;s real answer key. I did not rerun any
        frontier model. Their numbers are the published ones, with the setting each lab or evaluator used.
      </P>

      <Figure title="Scorecard">
        <Scorecard
          headers={['Benchmark', 'Jev', 'Best published', 'For reference']}
          rows={[
            {
              name: 'GPQA Diamond', jev: pct(g.jev.acc),
              top: <>GPT-6 Astra {pct(find(g.models, 'GPT-6 Astra').score)}, thinking</>,
              other: <>Human PhD experts about 65%. GPT-4 (2023) about 36%.</>,
            },
            {
              name: 'MMMLU, 14 languages', jev: pct(mm.jev.avg),
              top: <>Gemini 3.1 Pro {pct(find(mm.published, 'Gemini 3.1 Pro').score)}, thinking high</>,
              other: <>GPT-5 with thinking off {pct(find(mm.published, 'GPT-5 main').score)}. GPT-4o {pct(find(mm.published, 'GPT-4o').score)}.</>,
            },
            {
              name: 'Global-MMLU-Lite', jev: pct(gm.jev.avg),
              top: <>Gemini 3.1 Pro {pct(find(gm.published, 'Gemini 3.1 Pro').score)}. Claude Opus 5.5 {pct(find(gm.published, 'Claude Opus 5.5').score)} on the full 42-language set, max effort.</>,
              other: <>Gemini 3 Pro {pct(find(gm.published, 'Gemini 3 Pro').score)}.</>,
            },
            {
              name: 'MMLU', jev: pct(D.mmlu.jev.acc),
              top: <>GPT-5 {pct(find(D.mmlu.published, 'GPT-5').score)}, self-reported, setting not stated</>,
              other: <>GPT-4 {pct(find(D.mmlu.published, 'GPT-4').score)}, 5-shot.</>,
            },
            {
              name: 'MMLU-Pro', jev: pct(D.mmluPro.jev.acc),
              top: <>Gemini 3 Pro {pct(find(D.mmluPro.published, 'Gemini 3 Pro Preview (high)').score)}, thinking high</>,
              other: <>Llama 4 Maverick 80.9%, no reasoning.</>,
            },
            {
              name: 'LSAT (AGIEval)', jev: pct(D.lsat.jev.acc),
              top: <>GPT-4 {pct(lsatGpt4Few)}, few-shot, 2023</>,
              other: <>Human average 56%.</>,
            },
          ]}
        />
        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
          Jev&apos;s setting is the same everywhere: one pass, zero-shot, no chain of thought. Almost every other number comes from a model that wrote out
          its reasoning first. GPQA cost 1.8 cents for all 792 answers.
        </p>
      </Figure>

      <P>
        In short: Jev is about 20 points behind the 2026 frontier on graduate science questions and 6 to 9 points behind on multilingual knowledge. It is
        roughly level with GPT-5 when GPT-5&apos;s thinking is switched off. Its stated confidence matches how often it is right, which most language models
        cannot claim. It fails at anything that needs several dependent steps, and a search harness can take over some of that work.
      </P>

      <Section id="compare" title="How it compares with published scores">
        <P>
          Labs stopped reporting MMLU in 2025. The benchmarks that 2026 models publish are GPQA Diamond, MMMLU and Global-MMLU, so I ran Jev on those. The
          older benchmarks are here too, but their comparison models are older.
        </P>
        <P>
          The frontier reaches its GPQA numbers with extended thinking. Jev, with no reasoning at all, sits roughly where reasoning models of late 2024
          sat. Chemistry was its weakest area at {pct(g.jev.byDomain.Chemistry.accuracy)}, against {pct(g.jev.byDomain.Physics.accuracy)} for physics
          and {pct(g.jev.byDomain.Biology.accuracy)} for biology.
        </P>
        <Figure title="Published scores and Jev, by benchmark">
          <BenchmarkBars />
        </Figure>
      </Section>

      <Section id="price" title="Accuracy and price on GPQA Diamond">
        <P>
          Jev charges $0.042 per million input tokens and nothing for output. A GPQA question is about {g.jev.tokensPerQuestion} tokens. The chart
          prices that same prompt at each model&apos;s list input price. Output and thinking tokens are left out, so the real gap is larger than
          shown.
        </P>
        <Figure
          title="GPQA Diamond accuracy against cost per question"
          caption="One point per model released or updated from July to September 2026, using the lab's own number where there is one. Other models' costs are estimates. Tap a point or a name for details."
        >
          <GpqaScatter />
        </Figure>
      </Section>

      <Section id="confidence" title="How often its confidence is right">
        <P>
          Every answer comes with a probability. I took all {D.calibration.answers.toLocaleString('en-US')} LSAT answers and grouped them by how
          confident Jev said it was, then checked how often each group was right. Of the answers where it said about 70%, about 74% were right. Of the
          ones where it said about 90%, about 92% were right.
        </P>
        <P>
          That makes the number usable. If you only accept answers where it is at least 80% sure, it answers {pct(cov80.coverage, 0)} of the questions
          and gets {pct(cov80.accuracy!)} of those right. At a 70% bar it answers {pct(cov70.coverage, 0)} and gets {pct(cov70.accuracy!)} right. Most
          language models are overconfident, so their stated confidence cannot be used this way.
        </P>
        <Figure
          title="Stated confidence against actual accuracy, LSAT"
          caption={`Each dot is a group of answers with similar confidence. The big dot holds ${D.calibration.bins[D.calibration.bins.length - 1].n.toLocaleString('en-US')} answers above 90%. Expected calibration error is ${D.calibration.ece.toFixed(3)}.`}
        >
          <Reliability />
        </Figure>
      </Section>

      <Section id="ambiguity" title="What it does when people disagree">
        <P>
          ChaosNLI is a set of sentence pairs. The task is to say whether the second sentence follows from the first, contradicts it, or neither. Each pair
          was labeled by 100 people. On some pairs nearly everyone agrees. On others they split, because the pair really is ambiguous.
        </P>
        <P>
          When people disagreed, Jev became less sure too. Its average top probability was {D.chaos.hedge[0].meanTop.toFixed(2)} on pairs where people
          agreed, {D.chaos.hedge[1].meanTop.toFixed(2)} on partly split pairs and {D.chaos.hedge[2].meanTop.toFixed(2)} on badly split ones. A model
          trained to sound right tends to pick a side even when there is no right side. This is the best evidence I have that TypeSafe&apos;s training
          method, which they call RLCD, does what they say.
        </P>
        <Figure title="Human votes and Jev's probabilities for 20 of the 200 pairs" caption="Within each agreement level the pairs span the range of Jev's confidence. Pair 8, shown first, is a pair where 78 people said neither, 18 contradiction and 4 follows. Jev put all its probability on neither, so it does not always hedge.">
          <ChaosExplorer />
        </Figure>
      </Section>

      <Section id="rules" title="Following rules it has never seen">
        <P>
          The LSAT and MMLU are public, so a high score may be memory. To test reasoning on something Jev cannot have seen, code generated problems with
          made-up rules and nonsense words, such as &quot;a drishev is any red round object&quot;. Stated rules were essentially solved. That held for rules
          that contradict common sense, exceptions, rules revised later in the text, and one relevant rule hidden among 400.
        </P>
        <P>
          Long chains are where it fails. Each category requires the one before it plus a named mark, and Jev has to find the deepest category that
          applies. Accuracy falls from {pct(chainAt(2).acc, 0)} at 2 links to {pct(chainAt(16).acc, 0)} at 16, close to the {pct(chainAt(16).chance, 0)}{' '}
          chance rate. Its confidence stops tracking accuracy here: at 16 links it still reports {pct(chainAt(16).conf, 0)}. It judges from the overall
          look of the input and does not walk the chain link by link.
        </P>
        <Figure title="Accuracy by chain length" caption="60 generated problems per length. Dotted gray: Jev's average stated confidence. Dashed: chance.">
          <ChainChart />
        </Figure>
        <P>
          Working out an unstated rule from labeled examples levels off in the 70s. Arithmetic before a comparison is close to guessing. Code can do both
          jobs: it can walk a chain one link per call, and it can add.
        </P>
      </Section>

      <Section id="languages" title="Accuracy by language">
        <P>
          On MMMLU, Jev averaged {pct(mm.jev.avg)} over 14 languages and {pct(mm.jev.english)} in English on the same questions. The loss from
          translation is small for European and East Asian languages. Most of it is in Swahili ({pct(lang(mm.languages, 'Swahili'))}) and Yoruba (
          {pct(lang(mm.languages, 'Yoruba'))}). Global-MMLU-Lite shows the same pattern over 23 languages.
        </P>
        <Figure title="Jev's accuracy by language">
          <LanguageBars />
        </Figure>
      </Section>

      <Section id="search" title="Adding search: the Game of 24">
        <P>
          Jev cannot propose options, so code has to list them and Jev ranks them. In the Game of 24 you combine four numbers with + − × ÷ to make 24.
          Code lists every legal next step. Jev gives each step a probability, which is the policy, and rates how promising a position is, which is the
          value. Tree search (MCTS) uses both to decide where to look.
        </P>
        <P>
          Following Jev&apos;s first pick solves 8 of 30 puzzles. The same judgments inside MCTS solve 22 of 30 with about 30 Jev calls per puzzle. With a
          random judge, the same search solves 4. The gain comes from Jev&apos;s judgment. For comparison, Tree of Thoughts reported GPT-4 at 4% with chain
          of thought and 74% with tree search, on a different puzzle set.
        </P>
        <Figure title="Puzzles solved out of the same 30">
          <Game24Bars />
        </Figure>
        <Figure title="Step through one search" caption="Traces from four separate MCTS runs with 60 simulations each. Only moves the search expanded are shown.">
          <MctsStepper />
        </Figure>
      </Section>

      <Section id="chess" title="Chess">
        <P>
          Search did not help in chess, because Jev&apos;s judgment of chess positions is poor to begin with. In one pass it picks Stockfish&apos;s best
          move about 23% of the time and blunders on about 45% of moves. Against a 1350-rated engine it won none of 10 games. How the board was written
          down made no measurable difference.
        </P>
        <SmallTable
          caption="One move per position, 200 positions, judged by Stockfish at depth 12"
          head={['Board written as', 'Best move', 'Best in top 3', 'Within 30 cp', 'Blunders']}
          rows={D.chess.policy.map((c) => [
            { ascii: '8×8 ASCII grid', fen: 'FEN string', prose: 'Piece list in prose' }[c.encoding as 'ascii' | 'fen' | 'prose'],
            pct(c.top1), pct(c.top3), pct(c.within30), pct(c.blunder),
          ])}
        />
        <SmallTable
          caption="Full games against Stockfish at 1350 Elo"
          head={['How Jev played', 'Won', 'Drawn', 'Lost', 'Jev calls per move']}
          rows={D.chess.games.map((c) => [c.search === 'none' ? 'Top pick, no search' : 'MCTS, 24 simulations', c.wins, c.draws, c.losses, Math.round(c.callsPerMove)])}
        />
        <P>
          There is also a technical cause. Through the gateway, probabilities come back rounded to two decimals. With 30 or more legal moves, most moves
          read 0.01 to 0.03, so the ranking is nearly flat and search has little to work with.
        </P>
      </Section>

      <Section id="consistency" title="Consistency checks">
        <P>
          A model with honest probabilities should also give the same answer when you ask the same thing in a different way. Jev mostly does. The clear
          exception is negation. Asked whether a statement is true and, separately, whether it is false, its two probabilities should add to 1. They miss
          by {D.consistency.negationError.toFixed(2)} on average. TypeSafe lists negation as a known weakness.
        </P>
        <SmallTable
          head={['Check', 'Result']}
          rows={[
            ['Same question, 3 option orders × 3 phrasings: answer changed', pct(D.consistency.answerFlips)],
            [`Which of two texts is more formal, ${D.consistency.triples} triples: preference cycles (A > B > C > A)`, pct(D.consistency.cycles)],
            ['"Is it true?" plus "is it false?": average distance from 1', D.consistency.negationError.toFixed(2)],
            ['Question asked alone vs. with another question: average shift', D.consistency.isolationDelta.toFixed(2)],
          ]}
        />
        <P>
          I also added junk and planted answers to 200 LSAT questions. Sixteen unrelated paragraphs cost 2 points. A note saying &quot;the correct answer
          is&quot; with a wrong letter cost 3 points, and Jev followed the planted letter {pct(distr('injected-wrong').followed!, 0)} of the time. A fake
          &quot;SYSTEM: ignore the passage&quot; line was followed 3% of the time. Its confidence dropped in those conditions.
        </P>
        <SmallTable
          caption="200 LSAT questions under each condition"
          head={['Condition', 'Accuracy', 'Mean confidence']}
          rows={[
            ['Clean', pct(distr('clean').acc), distr('clean').conf.toFixed(2)],
            ['16 unrelated paragraphs added', pct(distr('irrelevant-16').acc), distr('irrelevant-16').conf.toFixed(2)],
            ['Planted wrong answer', pct(distr('injected-wrong').acc), distr('injected-wrong').conf.toFixed(2)],
            ['Fake system instruction', pct(distr('authority').acc), distr('authority').conf.toFixed(2)],
          ]}
        />
      </Section>

      <Section id="knowledge" title="What it knows">
        <P>
          TypeSafe has said almost nothing about what is inside Jev. Its knowledge scores say there is a large pretrained language model. It can pick a
          missing word out of 255 candidates 71% of the time. Its knowledge of rare entities drops off the way a language model&apos;s does. It answered
          questions about events through the end of 2025 perfectly and missed some from 2026, so its training data ends around early 2026.
        </P>
        <SmallTable
          head={['Test', 'Questions', 'Jev', 'Chance']}
          rows={[
            ['MMLU, 10 per subject', '570', '91.1%', '25%'],
            ['MMLU-Pro', '140', '81.4%', '11%'],
            ['PopQA, rare and common entities', '1,000', '69.7%', '25%'],
            ['PopQA, obscure entities only', '', '62.5%', '25%'],
            ['PopQA, famous entities only', '', '92.8%', '25%'],
            ['Dated events, 2022 to 2026', '48', '95.8%', '25%'],
            ['Missing word, 255 candidates', '200', '71.0%', '0.4%'],
          ]}
        />
      </Section>

      <Section id="next" title="What it is good for">
        <P>
          Jev is a fast judge with honest confidence. It is weak at anything that needs several dependent steps. The practical design puts the steps in
          code or search, and uses Jev&apos;s confidence to decide when to hand a case to a slower model. I tried that with a browser agent in{' '}
          <Link href="/blog/jev-browser-agent" className="text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white">
            a second post
          </Link>
          .
        </P>
      </Section>

      <section className="mt-16">
        <h2 className="text-lg font-medium mb-2">Methods and caveats</h2>
        <Details summary="How Jev was run">
          <p>
            All calls went to <code className="font-mono text-gray-300">typesafe-ai/jev</code> through Vercel AI Gateway between 19 and 25 September 2026.
            Each question was one Choice call: the passage and question as the input, the answer options as the choices. No examples, no retries for
            correctness. The earlier study cost about $1 in Jev calls. GPQA cost 1.8 cents, MMMLU 15 cents and Global-MMLU-Lite 10 cents.
          </p>
          <p>
            TypeSafe&apos;s own published accuracy numbers are scored against what GPT-6 Astra and Claude Fable 5.1 agree on. That measures agreement with
            those models. Every number here is scored against the dataset&apos;s real labels instead.
          </p>
        </Details>
        <Details summary="Published numbers and their settings">
          <p>
            No frontier model was run for this post. Every comparison is a published number from a lab page, model card, system card or an evaluator
            (Artificial Analysis, Vals, Epoch AI, llm-stats). Anthropic no longer publishes GPQA, so the Claude GPQA number is an Artificial Analysis run
            at max effort. Most comparison numbers come from models that generated reasoning tokens before answering. Jev did not.
          </p>
          <p>
            Costs for other models in the price chart are estimates: {g.jev.tokensPerQuestion} prompt tokens times each model&apos;s list input price.
            Output and thinking tokens are not counted.
          </p>
        </Details>
        <Details summary="Sample sizes and intervals">
          <p>
            GPQA Diamond: all 198 questions, each in 4 option orders; 95% interval {pct(g.jev.ci[0])} to {pct(g.jev.ci[1])}. Jev chose the same option
            across orderings on {pct(g.jev.consistency, 0)} of questions. MMLU is a 570-question subset and MMLU-Pro a 140-question subset, so a
            difference of a few points against a leaderboard row is within noise. The LSAT run is all 1,009 AGIEval questions in 4 option orders.
          </p>
          <p>
            MMMLU: some translations reorder questions while reusing ids, so six affected subjects were dropped in every language and 500 paired
            questions were sampled per language. It is a filtered sample, not the official full set. Global-MMLU-Lite used 200 questions in each of 23
            languages.
          </p>
        </Details>
        <Details summary="Contamination">
          <p>
            AGIEval LSAT and MMLU are old and public. Jev has probably seen them in training, so those scores show what it knows, not how it would do on a
            new exam. The invented-rule problems are generated from a seed and cannot have been seen.
          </p>
        </Details>
        <Details summary="ChaosNLI metric">
          <p>
            Jev&apos;s Jensen-Shannon distance to the human vote distribution is {D.chaos.jsDistance.toFixed(2)} on 200 pairs. Fine-tuned 2020 models
            scored 0.22 to 0.24, 2026 reasoning models about 0.12 after chain of thought, and a second set of human annotators 0.06. An earlier draft of
            my notes reported 0.06 for Jev, which was the divergence, not the distance.
          </p>
        </Details>
        <Details summary="Search and chess details">
          <p>
            Game of 24: the same 30 seeded puzzles in every row. Beam search used width 5 and 157 calls per puzzle. The random-judge row comes from the
            run notes, not a separate result file. Chess games were 6 with no search and 4 with MCTS, too few to measure a difference.
          </p>
        </Details>
      </section>
    </PostShell>
  );
}
