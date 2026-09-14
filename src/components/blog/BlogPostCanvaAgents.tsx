import { PageLayout } from '@/components/PageLayout';
import BlogPostNav from '@/components/blog/BlogPostNav';
import BlogAuthorShare from './BlogAuthorShare';
import canvaHero from '@/assets/blog/canva-ai-verification-hero.jpg';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, LabelList, Cell
} from 'recharts';

const chartData = [
  { metric: "Don't fully trust AI code", percent: 96, fill: '#9B6ABB' },
  { metric: 'Always verify before commit', percent: 48, fill: '#5A8ABB' },
  { metric: 'Say AI review takes MORE effort', percent: 38, fill: '#BB7A5A' },
  { metric: 'AI share of committed code', percent: 42, fill: '#6AAB7A' },
  { metric: 'Using autonomous AI agents', percent: 64, fill: '#8A8ABB' },
];

const Divider = () => (
  <hr className="my-12 border-t border-border/40" />
);

function VerificationGapChart() {
  return (
    <figure className="w-full max-w-[700px] mx-auto my-10">
      <h3 className="text-center font-serif text-lg font-semibold mb-1">The Verification Gap</h3>
      <p className="text-center text-sm text-muted-foreground mb-4">
        Sonar 2026 State of Code · 1,100+ developers surveyed
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 40 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="metric" width={220} tick={{ fontSize: 13 }} />
          <Tooltip formatter={(v: number) => [`${v}%`, 'Developers']} />
          <Bar dataKey="percent" radius={0}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
            <LabelList dataKey="percent" position="right" formatter={(v: number) => `${v}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <figcaption className="text-center text-xs text-muted-foreground mt-2">
        When AI output scales, review becomes the bottleneck. UX can either make verification cheap or make risk invisible.
      </figcaption>
    </figure>
  );
}

const POST_TITLE = "Canva's CTO Just Described the End of Writing Code. This is UX Design's Time to Shine.";
const POST_SLUG = 'canva-ai-agents-verification-ux';

export default function BlogPostCanvaAgents() {
  return (
    <PageLayout>
      <article className="max-w-[720px] mx-auto">
        {/* Header */}
        <span className="section-label block mb-2">UX & AI</span>
        <h1 className="headline-section mb-2">{POST_TITLE}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          When senior engineers become reviewers instead of writers, the bottleneck shifts from code generation to verification.
        </p>
        <div className="flex items-center gap-3 mb-8">
          <span className="mono-date text-[10px]">February 20, 2026</span>
          <span className="text-border">·</span>
          <span className="mono-date text-[10px]">16 min read</span>
        </div>

        <BlogAuthorShare slug={POST_SLUG} title={POST_TITLE} />

        {/* Hero image */}
        <div className="aspect-[16/9] overflow-hidden mb-12 bg-muted">
          <img
            src={canvaHero}
            alt="Woman controlling two robot marionettes — AI agent verification"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body */}
        <div className="prose-custom space-y-6 text-foreground/90 leading-relaxed">

          <p>
            Canva's CTO just described a workflow where senior engineers aren't writing code. They're reviewing and steering AI agents overnight. That changes what "good UX" means inside product teams. It's no longer just interfaces for humans. It's interfaces for intent, verification, and trust.
          </p>

          <Divider />

          <h2 className="font-serif text-xl font-semibold mt-10 mb-4">The Shift</h2>

          <p>
            Canva's CTO, Brendan Humphreys, says engineering teams now draft instructions for AI agents to execute overnight, and that senior engineers' jobs have become "largely review." If that's true (and it matches what I'm seeing across the industry), the bottleneck isn't code generation anymore. It's verification.
          </p>

          <p>
            That's not an engineering problem. It's a UX problem, specifically the UX of work: how people specify, supervise, audit, and ship work they didn't directly produce.
          </p>

          <Divider />

          <h2 className="font-serif text-xl font-semibold mt-10 mb-4">From Maker to Reviewer</h2>

          <p>
            Humphreys' framing is blunt: engineers still do the hard part (turning ambiguous requirements into specs), but then agents do the drafting and humans do the steering and review across Canva's approximately 70 million lines of code. That means:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>The "unit of work" becomes an instruction + constraints, not a commit.</li>
            <li>The artifact you need to understand becomes a diff + rationale + provenance, not just code.</li>
            <li>The failure mode shifts from "I wrote a bug" to "I approved a bug I didn't fully understand."</li>
          </ul>

          <p>That last one is where teams get hurt.</p>

          <Divider />

          <h2 className="font-serif text-xl font-semibold mt-10 mb-4">Verification Debt Is Real (And Quantifiable)</h2>

          <p>
            Sonar's 2026 State of Code developer survey (1,100+ developers globally) puts numbers on the trust gap:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>96%</strong> of developers don't fully trust AI-generated code is functionally correct</li>
            <li>Only <strong>48%</strong> say they always verify AI-assisted code before committing</li>
            <li><strong>38%</strong> say reviewing AI-generated code requires more effort than reviewing human-written code</li>
            <li>AI now accounts for <strong>42%</strong> of all committed code, expected to reach 65% by 2027</li>
            <li><strong>64%</strong> of developers have started using autonomous AI agents</li>
            <li>Developer "toil work" remains steady at <strong>24%</strong> of the work week regardless of AI usage</li>
          </ul>

          <VerificationGapChart />

          <p>
            That gap between distrust and verification is what AWS CTO Werner Vogels calls "verification debt." You can ship faster for a while, until you can't.
          </p>

          <p>
            If Canva is pushing agent-driven execution at scale, the competitive advantage won't just be "we have agents." Everyone will. The advantage will be: <em>we can verify at scale without burning out our seniors.</em>
          </p>

          <Divider />

          <h2 className="font-serif text-xl font-semibold mt-10 mb-4">What "AI Agent UX" Actually Looks Like (5 Concrete Product Ideas)</h2>

          <p>If I were designing internal tooling and workflows for this world, I'd prioritize:</p>

          <h3 className="font-serif text-lg font-semibold mt-8 mb-3">1. Intent Capture That's Structured, Not Vibes</h3>
          <p>
            Prompt-as-spec is brittle. People need scaffolds: constraints, acceptance criteria, "must-not-change" zones, risk flags. The input UX for an overnight agent run should look more like a structured brief than a chat prompt. Think: checklists, boundary conditions, blast-radius warnings.
          </p>

          <h3 className="font-serif text-lg font-semibold mt-8 mb-3">2. Provenance-First Diffs</h3>
          <p>
            Not just "what changed," but: which instruction caused it, what context was used, what files were touched historically, what tests were run, what uncertainty remains. When an engineer reviews a 47-file diff at 8am, they need to understand <em>why</em> each change exists, not just what changed.
          </p>

          <h3 className="font-serif text-lg font-semibold mt-8 mb-3">3. Review Tuned to Risk</h3>
          <p>
            Every change doesn't deserve equal scrutiny. The UX should triage: surface high-blast-radius changes, security-sensitive modules, duplicated logic, unexplained complexity. Sonar's survey found AI-generated code that "looks correct but isn't reliable" is flagged by 53% of developers as a negative impact. The review interface needs to make risk visible.
          </p>

          <h3 className="font-serif text-lg font-semibold mt-8 mb-3">4. Feedback Loops That Teach the Agent (and the Team)</h3>
          <p>
            Review comments shouldn't vanish into the void. They should become reusable patterns: "When touching module X, always check Y." Over time, this creates institutional knowledge that makes the agents better and makes review faster. It's the compound interest of good UX.
          </p>

          <h3 className="font-serif text-lg font-semibold mt-8 mb-3">5. A Human-Centered Throttle</h3>
          <p>
            When the agent can produce infinite output, humans become the scarce resource. The UX should defend focus: limit concurrent diffs, batch related changes, kill noisy agents. Sonar found that toil work stays at 24% of the week regardless of AI usage. The time saved in writing is being reinvested in reviewing. Good UX ensures that investment pays off instead of creating fatigue.
          </p>

          <Divider />

          <h2 className="font-serif text-xl font-semibold mt-10 mb-4">Why This Matters to Canva Specifically</h2>

          <p>
            Canva has over 220 million monthly active users and approximately 70 million lines of code. At that scale, tiny failure rates become real incidents. An agent that introduces a subtle regression in the template rendering pipeline doesn't just affect one team. It affects millions of designs.
          </p>

          <p>
            If agents increase throughput, then verification UX becomes a reliability feature. The company that builds the best review experience, not just the best agents, wins.
          </p>

          <p>
            This isn't theoretical. Spotify's CEO reported their most senior developers haven't written a single line of code since December, instead supervising an internal AI system. The pattern is industry-wide. The question is who designs the best human layer on top of it.
          </p>

          <Divider />

          <footer className="text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground/70">Sources:</strong> Dataconomy, "Canva CTO Reveals AI Agents Write Code Overnight While Engineers Sleep" (Feb 17, 2026). Sonar, "Sonar Data Reveals Critical 'Verification Gap' in AI Coding: 96% Don't Fully Trust Output, Yet Only 48% Verify It" (Jan 8, 2026). Canva Trust & Security Portal, "over 220 million monthly active users worldwide."
            </p>
          </footer>

        </div>

        <BlogPostNav currentSlug={POST_SLUG} />
      </article>
    </PageLayout>
  );
}
