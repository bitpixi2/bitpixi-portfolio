import { PageLayout } from '@/components/PageLayout';
import BlogPostNav from '@/components/blog/BlogPostNav';
import BlogAuthorShare from './BlogAuthorShare';
import heroImage from '@/assets/blog/neurodivergent-talent-hero.jpg';

const Divider = () => (
  <hr className="my-12 border-t border-border/40" />
);

const POST_TITLE = "The Most Productive Talent Pool You're Not Hiring";
const POST_SLUG = 'neurodivergent-talent-pool';

/* ─── Chart ─── */

const productivity = [
  { company: 'Neurotypical', gain: 100, label: '100% (baseline)', baseline: true },
  { company: 'JPMorgan', gain: 115, label: '115%', baseline: false },
  { company: 'HP', gain: 130, label: '130%', baseline: false },
  { company: 'EY', gain: 130, label: '130%', baseline: false },
  { company: 'UiPath', gain: 150, label: '150%', baseline: false },
];

const employment = [
  { label: 'General population', rate: 96.9 },
  { label: 'Adults with ADHD', rate: 85 },
  { label: 'Autistic Australians', rate: 75 },
];

const maxGain = 160;

function ProductivityChart() {
  return (
    <figure className="w-full max-w-[700px] mx-auto my-10">
      <h3 className="text-[10px] uppercase tracking-[2px] text-muted-foreground font-mono mb-4">
        Productivity Gains (Neurotypical vs Neurodivergent)
      </h3>
      <div className="space-y-2">
        {productivity.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-[82px] text-right text-xs text-muted-foreground shrink-0">
              {d.company}
            </span>
            <div className="flex-1 h-8 bg-muted/40 relative">
              <div
                className={`h-full ${d.baseline ? 'bg-muted-foreground/30' : 'bg-primary/70'}`}
                style={{ width: `${(d.gain / maxGain) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-foreground/80 w-[82px] shrink-0">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

function EmploymentChart() {
  return (
    <figure className="w-full max-w-[700px] mx-auto my-10">
      <h3 className="text-[10px] uppercase tracking-[2px] text-muted-foreground font-mono mb-4">
        Employment Rate (Australia, ABS 2022)
      </h3>
      <div className="space-y-2">
        {employment.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-[160px] text-right text-xs text-muted-foreground shrink-0">
              {d.label}
            </span>
            <div className="flex-1 h-8 bg-muted/40 relative">
              <div
                className={`h-full ${i === 0 ? 'bg-muted-foreground/30' : 'bg-primary/70'}`}
                style={{ width: `${d.rate}%` }}
              />
            </div>
            <span className="text-xs font-mono text-foreground/80 w-[52px] shrink-0">
              {d.rate}%
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

function GenderGapTable() {
  return (
    <figure className="w-full max-w-[700px] mx-auto my-10">
      <h3 className="text-[10px] uppercase tracking-[2px] text-muted-foreground font-mono mb-4">
        The Gender Filter
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-1 text-muted-foreground font-normal text-xs">Metric</th>
              <th className="text-right py-2 px-1 text-xs font-normal" style={{ color: 'hsl(217, 91%, 60%)' }}>Men</th>
              <th className="text-right py-2 px-1 text-xs font-normal" style={{ color: 'hsl(330, 81%, 60%)' }}>Women</th>
              <th className="text-right py-2 px-1 text-muted-foreground font-normal text-xs">Gap</th>
            </tr>
          </thead>
          <tbody className="text-foreground/80">
            <tr className="border-b border-border/40">
              <td className="py-2 px-1">Avg ADHD diagnosis age</td>
              <td className="text-right py-2 px-1" style={{ color: 'hsl(217, 91%, 60%)' }}>24.1</td>
              <td className="text-right py-2 px-1" style={{ color: 'hsl(330, 81%, 60%)' }}>29.0</td>
              <td className="text-right py-2 px-1 text-destructive">+4.9 yrs</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 px-1">ADHD pay (relative)</td>
              <td className="text-right py-2 px-1" style={{ color: 'hsl(217, 91%, 60%)' }}>100%</td>
              <td className="text-right py-2 px-1" style={{ color: 'hsl(330, 81%, 60%)' }}>71.8%</td>
              <td className="text-right py-2 px-1 text-destructive">−28.2%</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 px-1">Diagnostic ratio (autism)</td>
              <td className="text-right py-2 px-1" style={{ color: 'hsl(217, 91%, 60%)' }}>3</td>
              <td className="text-right py-2 px-1" style={{ color: 'hsl(330, 81%, 60%)' }}>1</td>
              <td className="text-right py-2 px-1 text-muted-foreground">bias, not prevalence</td>
            </tr>
            <tr>
              <td className="py-2 px-1">Non-disclosure at hiring</td>
              <td colSpan={2} className="text-center py-2 px-1 text-accent-foreground">73%</td>
              <td className="text-right py-2 px-1 text-muted-foreground">fear of discrimination</td>
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/* ─── Post ─── */

export default function BlogPostNeurodivergentTalent() {
  return (
    <PageLayout>
      <article className="max-w-[720px] mx-auto">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['ux design', 'australia'].map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono border border-border px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-4">
            {POST_TITLE}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The data on neurodivergent workers looks like a typo until you check the sources.
          </p>
          <BlogAuthorShare slug={POST_SLUG} title={POST_TITLE} />
          <div className="flex items-center gap-4 mb-8">
            <span className="mono-date">March 31, 2026</span>
            <span className="text-border">·</span>
            <span className="mono-date">20 min read</span>
          </div>
        </header>

        {/* Hero image */}
        <div className="aspect-[16/9] overflow-hidden mb-12 bg-muted">
          <img
            src={heroImage}
            alt="Diverse workforce with visible neural patterns representing neurodivergent thinking styles"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-foreground/85 leading-relaxed text-base">

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The Numbers Nobody Expects</h3>

          <p>
            JPMorgan Chase's Autism at Work program found participants were 90% to 140% more productive than neurotypical employees, with fewer errors. UiPath partnered with AutonomyWorks on AI data labelling and neurodivergent associates were 150% more productive. Hewlett-Packard saw a 30% productivity gain when they put neurodivergent professionals into software testing teams. EY reported neurodiverse teams were 120% to 140% more productive and more accurate. At SAP, one neurodivergent employee's solution saved the company $40 million. These aren't outliers. They're what happens when you design the work environment around how people actually think.
          </p>

          <ProductivityChart />

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">Australia's Gap</h3>

          <p>
            Around 290,900 Australians had autism in 2022 (ABS Survey of Disability, Ageing and Carers), with Autism Spectrum Australia estimating 1 in 70 people are autistic. ADHD affects 2 to 6% of Australian adults. 20% of the Australian workforce identifies as neurodivergent. The employment gap is severe: autistic Australians face an estimated 25% unemployment rate (averaging ABS and Amaze data), and adults with ADHD are 2.5 times more likely to be unemployed than neurotypical peers. 54% of unemployed autistic Australians have never held a paid job, not because they lack skills, but because the hiring process screens them out.
          </p>
          <p>
            The Australian Government launched a National Autism Strategy (2025-2031) acknowledging these gaps, and the 2024 Australian Public Service Employee Census started capturing neurodivergence data for the first time. The infrastructure exists: JobAccess provides employer guides, Specialisterne runs placement programs, Autism SA has neuro-inclusive recruitment projects. But adoption is slow, and most hiring processes remain designed for neurotypical candidates.
          </p>

          <EmploymentChart />

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The Neuroscience of Burst-Work</h3>

          <p>
            That person staring out the window in a meeting isn't checked out. Their brain is working differently. A 2025 peer-reviewed study measured it: adults with ADHD produce significantly more sleep-like slow waves in their brain activity during waking hours. Not metaphorically. The cortex is literally generating micro-sleep patterns while the person is awake and engaged.
          </p>
          <p>
            This is measurable, reproducible neuroscience. It's not a pharmaceutical marketing campaign. The slow wave density statistically mediated attention difficulties: more slow waves meant more errors, slower reaction times, more mind wandering. The "can't focus" experience is a neurological event with an identifiable signature, not a character flaw and not something invented to sell stimulants.
          </p>
          <p>
            What the research also shows is that these brains rest and work in unexpected bursts. The same person who can't track a 45-minute status meeting will lock into a complex problem for 14 hours straight. The attention isn't absent. It's allocated differently. The brain cycles between low-arousal states and intense hyperfocus in a pattern that looks like inconsistency from the outside but is actually just a different operating rhythm.
          </p>
          <p>
            This matters for employers because it reframes the entire conversation. You're not accommodating laziness or indifference. You're designing around a brain that regulates arousal on a different schedule. Proper sleep helps. Reducing the cognitive load of performing neurotypicality all day helps. Flexible work structures that let people work when their brain is firing, rather than when the calendar says they should, help most of all.
          </p>
          <p>
            The productivity isn't automatic. The potential is. The gap between them is accommodation infrastructure.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">Women: The Double Filter</h3>

          <p>
            The gender dimension makes the employment gap worse.
          </p>
          <p>
            Women with ADHD are diagnosed at an average age of 28.96, compared to 24.13 for men. That's a nearly 5-year delay despite symptoms emerging at the same age in childhood (2025 European College of Neuropsychopharmacology Congress).
          </p>
          <p>
            Boys are almost twice as likely to receive an ADHD diagnosis compared to girls (CDC, 2022). The current autism diagnostic ratio is estimated at 3:1 male to female, but researchers believe this reflects diagnostic bias, not actual prevalence.
          </p>
          <p>
            Women with ADHD earn 28.2% less per year than men with ADHD (University of Kent). That's a neurodivergent penalty compounding a gender pay gap.
          </p>
          <p>
            Women mask more. Masking means performing neurotypical behaviour at significant cognitive and emotional cost. It gets you through interviews. It gets you hired. It also burns you out, because you're running two operating systems simultaneously: the one doing the work and the one pretending to be normal.
          </p>
          <p>
            The result: neurodivergent women are more likely to be employed than neurodivergent men, but more likely to be in the wrong role, more likely to burn out, and more likely to leave the workforce entirely in their 30s and 40s, exactly when their experience becomes most valuable.
          </p>
          <p>
            73% of neurodivergent people don't disclose during hiring. For women, the calculation is worse: disclose and risk the intersection of gender bias and neurodivergent stigma.
          </p>

          <GenderGapTable />

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The Accommodation Problem</h3>

          <p>
            Here's what the productivity headlines skip: those gains came from structured programs with intentional design.
          </p>
          <p>
            Flexible environments. Clear communication protocols. Reduced sensory overload. Explicit task structure. Written instructions over verbal ones. Quiet spaces. Predictable schedules.
          </p>
          <p>
            Without accommodations, neurodivergent employees don't underperform because they're less capable. They underperform because the environment is actively hostile to how their brains process information.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">What Accommodation Actually Looks Like</h3>

          <p>
            It's not expensive. It's not complicated. It's usually just different.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>Written briefs instead of verbal instructions</li>
            <li>Noise-cancelling headphones or quiet work areas</li>
            <li>Flexible schedules that respect energy cycles</li>
            <li>Clear expectations with explicit success criteria</li>
            <li>Reduced open-plan exposure</li>
            <li>Interview formats that test actual job skills, not social performance</li>
            <li>Manager training on communication differences</li>
            <li>Permission to work differently without justifying it every time</li>
          </ul>
          <p>
            Most accommodations cost under $500 and many cost nothing. The ROI on that investment, based on the productivity data above, is extraordinary.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">AI Is Already Screening Them Out</h3>

          <p>
            Before a neurodivergent candidate ever reaches a human interviewer, AI may have already rejected them. Automated video interview platforms now analyse facial expressions, vocal tone, speech cadence, and eye contact to generate "employability" scores. The problem: these systems were trained on neurotypical communication patterns.
          </p>
          <p>
            An autistic candidate who avoids eye contact gets flagged. Someone with ADHD who speaks in rapid, enthusiastic tangents about a favourite interest gets marked as unfocused. A person who stutters or pauses to process a question gets scored as lacking confidence. None of these behaviours correlate with job performance. All of them correlate with rejection by the algorithm.
          </p>
          <p>
            A 2025 study published on arXiv ("Behind the Screens: Uncovering Bias in AI-Driven Video Interview Assessments") confirmed what neurodivergent applicants already knew: AI video assessments produce measurably different scores based on facial expression variation, gaze patterns, and vocal prosody, all traits that differ systematically in autistic, ADHD, and dyspraxic candidates.
          </p>
          <p>
            A 2024 University of Washington study found that AI hiring tools rank resumes mentioning autism-related awards or memberships lower than identical applications without those credentials. The bias isn't even subtle. It's baked into the training data, which reflects decades of neurotypical hiring preferences treated as objective standards.
          </p>
          <p>
            The EEOC reported 488 autism-related disability discrimination charges in fiscal year 2023. Autism-related merit resolutions more than tripled between 2016 and 2023. California introduced regulations in October 2025 specifically targeting automated decision systems in employment, the most comprehensive state-level oversight of AI in recruitment to date.
          </p>
          <p>
            Meanwhile, the things AI cannot screen for are exactly what neurodivergent minds produce: pattern recognition across unusual domains, sustained hyperfocus on complex problems, novel approaches to systems everyone else stopped questioning. AI commoditises average cognitive output. The tasks traditional hiring was designed to evaluate, routine analysis, standardised reporting, predictable problem-solving, are increasingly done by models. What remains valuable is divergent thinking.
          </p>
          <p>
            The credential pipeline, standardised tests, structured interviews, "culture fit" assessments, was built for a world where average cognitive performance was the bottleneck. That world is ending. But the screening tools haven't caught up, and right now they're actively filtering out the people companies will need most.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The Bet</h3>

          <p>
            Palantir runs a Neurodivergent Fellowship paying $110,000 to $200,000 per year. Their pitch: neurodivergent individuals will "disproportionately shape the future of America and the West."
          </p>
          <p>
            They're not wrong about the talent. But there's something uncomfortable about a surveillance company recruiting minds that think differently, and pointing them at defence contracts and predictive policing. "Weaponised autism" isn't a compliment. It's a business model that extracts the pattern recognition while ignoring the ethics.
          </p>
          <p>
            The real question is: what if companies building good things recruited like this? What if healthcare, education, climate tech, and accessibility organisations ran neurodivergent fellowships? Imagine that same intensity of focus and novel thinking directed at problems worth solving, not because it serves a government contract, but because the work actually matters.
          </p>
          <p>
            Gartner projects that 1 in 5 Fortune 500 sales organisations will actively recruit neurodivergent talent by 2027.
          </p>
          <p>
            40% of self-made millionaires in the UK are dyslexic. People with ADHD are estimated to be up to 500% more likely to become entrepreneurs, partly because traditional employment rejected them first.
          </p>
          <p>
            The companies that figure out accommodation infrastructure now will have access to the most productive, most creative, and most loyal talent pool in the market. The question isn't whether to recruit neurodivergent talent. It's whether you'll use that talent to build something worth building.
          </p>
          <p>
            Everyone else will still be writing job descriptions that screen them out.
          </p>

          <Divider />

          <footer className="text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground/70">Sources:</strong> JPMorgan Chase Autism at Work program (Harvard Business Review 2017), UiPath/AutonomyWorks partnership (2021), Hewlett-Packard/DXC Dandelion Program, EY "The Value of Neurodiversity in Innovation" (2019), SAP Autism at Work program, ABS Survey of Disability, Ageing and Carers (2022), Autism Spectrum Australia prevalence estimate, Amaze "Autism Employment Gap" (2018), Australian Government National Autism Strategy 2025-2031, Bernardi et al. "Sleep-like Slow Waves During Wakefulness Mediate Attention and Vigilance Difficulties in Adult ADHD" bioRxiv 2025 (doi: 10.1101/2025.07.27.666103), European College of Neuropsychopharmacology Congress (2025), CDC ADHD diagnosis data (2022), University of Kent ADHD gender pay gap research, Center for Neurodiversity and Employment Innovation disclosure data, University of Washington AI hiring bias study (2024), Mujtaba &amp; Mahapatra "Behind the Screens: Uncovering Bias in AI-Driven Video Interview Assessments Using Counterfactuals" arXiv 2505.12114 (2025), EEOC autism-related disability discrimination charges FY2023, California Civil Rights Department automated decision system regulations (2025), Palantir Technologies Neurodivergent Fellowship (2025), Gartner "Future of Sales" (2023), Made By Dyslexia/Cass Business School UK millionaire study, Journal of Business Venturing Insights ADHD entrepreneurship research (2019).
            </p>
          </footer>
        </div>
      </article>
      <BlogPostNav currentSlug={POST_SLUG} />
    </PageLayout>
  );
}
