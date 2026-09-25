import type { Metadata } from 'next';
import Link from 'next/link';
import D from '@/data/jev/browser-agent.json';
import { Details, P, PostShell, Scorecard, Section, SmallTable } from '@/components/blog/Post';
import { Figure } from '@/components/blog/ui';
import { pct } from '@/components/blog/theme';
import { ByDifficulty, ByEnding, HillClimb, JudgeGap, Leaderboard, RunComparison, TimeHistogram } from '@/components/blog/jev/BrowserAgentCharts';

export const metadata: Metadata = {
  title: 'A browser agent built on Jev',
  description:
    'A browser agent where Jev, a model that only makes choices, picks every click. Offline Mind2Web went from 7.3% to 50.7%. On 300 live Online-Mind2Web tasks it succeeded on 35 of the 101 tasks judged so far.',
  alternates: { canonical: '/blog/jev-browser-agent' },
  openGraph: { title: 'A browser agent built on Jev', type: 'article', publishedTime: '2026-09-25' },
};

const hd = D.headed, hl = D.headless;
const scored = hd.byStatus;
const judged = Object.values(scored).reduce((s, x) => ({ ok: s.ok + x.success, n: s.n + x.success + x.failure }), { ok: 0, n: 0 });
const unjudged = hd.tasks - judged.n;
const heldBest = Math.max(...D.offline.heldOut.map((h) => h.step));
const heldBase = D.offline.heldOut.find((h) => /baseline/.test(h.note))!.step;

export default function BrowserAgentPage() {
  return (
    <PostShell title="A browser agent built on Jev" date="2026-09-25" tags={['AI', 'Agents', 'Evals']}>
      <P>
        Jev is a model that cannot write text. It picks one option from a list and says how sure it is, in about a quarter of a second. I{' '}
        <Link href="/blog/testing-jev" className="text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white">
          tested the model
        </Link>{' '}
        first. This post is about building a browser agent around it.
      </P>
      <P>
        The harness reads the page and lists what can be clicked, typed into or scrolled. Jev picks the element and the action at every step, and also
        decides when to stop. A small language model (gpt-5.4-mini) writes the text that gets typed and the one-line final answer, because Jev cannot. I
        ran it on Online-Mind2Web, which is 300 tasks on 136 live websites.
      </P>

      <Figure title="Scorecard">
        <Scorecard
          headers={['Measure', 'Jev agent', 'Published', 'Note']}
          rows={[
            {
              name: 'Online-Mind2Web success', jev: pct(judged.ok / judged.n),
              top: <>Browser Use Cloud 97%, own Claude-based judge. Claude 4.5: 55% by human judges.</>,
              other: <>{judged.ok} of the {judged.n} tasks judged so far. {unjudged} of {hd.tasks} have no verdict yet. Counting those as failures gives 11.7%.</>,
            },
            {
              name: 'Time per task', jev: hd.wallMedian.toFixed(1) + ' s',
              top: <>No leaderboard entry publishes time per task.</>,
              other: <>Median, headed Chrome. About 1.2 s per step including page loads.</>,
            },
            {
              name: 'Cost per task', jev: '$' + hd.costPerTask.toFixed(4),
              top: <>Not published.</>,
              other: <>Jev plus the small model that types. Judging is extra.</>,
            },
            {
              name: 'Offline Mind2Web step success', jev: pct(heldBest),
              top: <>MindAct, fine-tuned: 52.0%. GPT-4 with 3 examples and a ranker: 36.2%.</>,
              other: <>Held-out steps, up from {pct(heldBase)} before tuning. Our metric does not check typed text; theirs does.</>,
            },
          ]}
        />
      </Figure>

      <P>
        The agent is far behind the frontier agents on success, roughly where the weaker agents in the 2025 paper sat. It finishes a task in about half a
        minute for about half a cent. Most of its failures come from choosing the wrong element and not knowing when to stop.
      </P>

      <Section id="offline" title="Where it started: recorded web pages">
        <P>
          Before going live I tuned the harness on Mind2Web, a set of recorded web tasks split into single steps. For each step the harness lists page
          elements and Jev chooses one. A coding agent (Codex running GPT-6 Astra) was allowed to edit one harness file, and a fixed evaluator scored each
          edit on 200 tuning steps. A separate set of 300 steps from other tasks was held out and run by hand after each round.
        </P>
        <P>
          The held-out score went from 7.3% to 34.0%, 37.3%, then 50.7%. Showing Jev every element in batches, and choosing click, type or select by a
          rule, was worth about 27 points. The next biggest gain came from a bug in my data: the loader had dropped the visible text of page elements.
          Fixing it was worth about 13 points. Everything else added about 3.
        </P>
        <Figure title="Offline Mind2Web step success across three rounds of tuning" caption="The flat stretches are rounds where most ideas did not help. After the text fix, the round-two harness moved from 35% to 48% on the tuning steps without any code change.">
          <HillClimb />
        </Figure>
      </Section>

      <Section id="headed" title="Headless browser or real Chrome">
        <P>
          I ran all 300 live tasks twice. A headless browser is fingerprinted and refused by Akamai and Cloudflare bot walls on 26 sites, so it never gets
          a turn there. Real Chrome on macOS passes most of them. Headed Chrome is also what the published agents use, usually through remote browser
          services.
        </P>
        <Figure title="The same 300 tasks, two browsers">
          <RunComparison />
        </Figure>
        <SmallTable
          head={['', 'Headless', 'Headed Chrome']}
          rows={[
            ['Median time per task', hl.wallMedian.toFixed(1) + ' s', hd.wallMedian.toFixed(1) + ' s'],
            ['Median time per step', '1.19 s', '1.17 s'],
            ['Agent cost per task', '$' + hl.costPerTask.toFixed(4), '$' + hd.costPerTask.toFixed(4)],
          ]}
        />
        <P>
          The headed run takes about twice as long per task. Pages actually load there, so the agent takes more steps. The time per step is the same.
        </P>
      </Section>

      <Section id="difficulty" title="Success by difficulty">
        <P>
          Online-Mind2Web labels each task easy, medium or hard. Among judged tasks, Jev&apos;s agent succeeded on 19 of 36 easy tasks, 13 of 41 medium
          and 3 of 24 hard. The dark part of each bar is tasks with no verdict yet.
        </P>
        <Figure title="Headed run, by task difficulty">
          <ByDifficulty />
        </Figure>
      </Section>

      <Section id="endings" title="How tasks ended">
        <P>
          A run stops when the agent says the task is done, says it is impossible, or hits the 25-step limit. When it stops without having said done, the
          small model still writes an answer from what it saw. That exit answer accounts for 8 of the 35 successes.
        </P>
        <P>
          The two big groups are failures to finish. {scored.impossible.total} tasks ended with the agent calling the task impossible and{' '}
          {scored.max_steps.total} hit the step limit. Most steps in those runs were scrolling or repeated clicks that did not move the task forward.
        </P>
        <Figure title="Headed run, by how the task ended">
          <ByEnding />
        </Figure>
      </Section>

      <Section id="judge" title="Why a live benchmark needs a judge">
        <P>
          On recorded pages there is an answer key: the element a person clicked. On the live web there is none, because pages change and a task can
          often be finished in more than one way. Someone has to look at what the agent did and decide.
        </P>
        <P>
          Online-Mind2Web uses WebJudge. A language model reads the task, pulls out the key points, rates the agent&apos;s screenshots, and reads its
          action list, then says success or failure. I used gpt-5.4-mini as the judge, which is cheaper and weaker than the Claude-class judges most
          leaderboard entries use. Judges disagree with each other and with people by 10 to 15 points on the same agent, in both directions.
        </P>
        <Figure title="Same agent, two judges" caption="Published results that report both human and WebJudge scores.">
          <JudgeGap />
        </Figure>
        <P>
          My judging is also unfinished. Gateway credits ran out partway, so {judged.n} of the {hd.tasks} headed tasks have a verdict and {unjudged} do
          not. On the judged tasks the agent succeeded {judged.ok} times, which is {pct(judged.ok / judged.n)}. If every unjudged task were a failure,
          the rate would be 11.7%. The judged tasks are the first 101 the judge reached, not a chosen sample, and 101 tasks gives about ±9 points.
        </P>
      </Section>

      <Section id="leaderboard" title="Against the published leaderboard">
        <P>
          Scores from different judges are not directly comparable, so the judge is listed with each entry. Even allowing for that, the gap to the top is
          large.
        </P>
        <Figure title="Online-Mind2Web success rates" caption="Published entries from the Online-Mind2Web leaderboard and paper. Jev's bar uses the 101 judged tasks.">
          <Leaderboard />
        </Figure>
      </Section>

      <Section id="time" title="Time per task">
        <P>
          The median task took {hd.wallMedian.toFixed(1)} seconds and the mean {hd.wallMean.toFixed(0)} seconds. A few tasks ran much longer, including
          one that hung on remax.com in both runs. An average step spent about 1.1 seconds on Jev calls through the gateway and about 0.8 seconds in
          the browser.
        </P>
        <Figure title="Seconds per task, headed run" caption={`${hd.tasks} tasks. Nobody on the leaderboard publishes time per task. The only published speed figure is Navigator's own claim of 3.3 times faster per step than Claude 4.5.`}>
          <TimeHistogram />
        </Figure>
      </Section>

      <Section id="next" title="What limits it now">
        <P>
          Element choice and stopping are the main problems. The typed text still comes from a small language model, with Jev picking the field. Bot
          walls block 4% of tasks even in real Chrome, on 6 sites. And the judge often returned &quot;unsure&quot; when it could not verify a claim from
          screenshots.
        </P>
        <P>
          The 198 unjudged tasks still need a verdict before the success rate is final.
        </P>
      </Section>

      <section className="mt-16">
        <h2 className="text-lg font-medium mb-2">Methods and caveats</h2>
        <Details summary="The live run">
          <p>
            Run 2026-09-25 on 300 Online-Mind2Web tasks (80 easy, 141 medium, 79 hard), seed 1, 4 tasks at a time, at most 25 steps and 240 seconds per
            task. Jev (<code className="font-mono text-gray-300">typesafe-ai/jev</code> through Vercel AI Gateway) chose every element and every control
            action: act, scroll, back, complete, impossible. gpt-5.4-mini wrote typed values and final answers. One task (remax.com) hung in both runs, so
            each run finished 299 tasks.
          </p>
          <p>
            Agent cost was about $1.60 for 299 headed tasks and judging about $2.20 for 101 tasks. The headless run and its partial judging cost about
            $5.30.
          </p>
        </Details>
        <Details summary="Judging">
          <p>
            WebJudge-style evaluation with gpt-5.4-mini: extract key points from the task, rate each screenshot for relevance, then judge the final state
            and action history. These automated verdicts are not directly comparable to human judgments. Headed: {judged.ok}/{judged.n} judged success,{' '}
            {unjudged} not judged. Headless: 18/77 judged success, 222 not judged. The headless judging stopped even earlier, so its rate rests on fewer tasks.
          </p>
        </Details>
        <Details summary="The offline Mind2Web tuning">
          <p>
            The evaluator scored each harness version on Mind2Web steps using every candidate element on the page (median 419 per step), capped Jev at 12
            calls per step and the whole loop at $8. The 177 tasks were split in half by task. Tuning used 200 steps from one half; the other half was
            held out, blocked from the coding agent, and run three times in total. The winning file was checked for step ids, site names and file reads.
          </p>
          <p>
            Step success here counts the right element and operation. The Mind2Web paper also requires the typed text to be right, so its numbers are
            stricter. 300 steps gives an interval of roughly ±6 points. The loader fix changed what Jev could see, so scores before and after it are not
            measured on the same input. A cheaper variant scores 49.0% on held-out steps with 40% of the tokens and a sixth of the time.
          </p>
        </Details>
        <Details summary="Leaderboard sources">
          <p>
            Published entries come from the Online-Mind2Web leaderboard as aggregated by steel.dev (updated 2026-06-29) and the Online-Mind2Web paper.
            Each entry is listed with the judge its authors used. No other agent was rerun for this post.
          </p>
        </Details>
      </section>
    </PostShell>
  );
}
