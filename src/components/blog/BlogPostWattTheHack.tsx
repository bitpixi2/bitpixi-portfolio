import { PageLayout } from '@/components/PageLayout';
import BlogPostNav from '@/components/blog/BlogPostNav';
import BlogAuthorShare from './BlogAuthorShare';
import { useEffect } from 'react';
import wattHero from '@/assets/blog/watt-the-hack-hero.jpg';
import campervanInternet from '@/assets/blog/campervan-internet-australia.png.asset.json';
import fieldmateDataExamples from '@/assets/blog/fieldmate-data-examples.png.asset.json';
import fieldmateReportExample from '@/assets/blog/fieldmate-report-example.png.asset.json';
import fieldmateHero from '@/assets/blog/fieldmate-hero.png.asset.json';
import ruaReport from '@/assets/blog/rua-report.png.asset.json';
import wattTeam from '@/assets/blog/watt-the-hack-team.png.asset.json';
import wattMeeting from '@/assets/blog/watt-the-hack-meeting.png.asset.json';
import wattSponsors from '@/assets/blog/watt-the-hack-sponsors.png.asset.json';
import wattCrowdWide from '@/assets/blog/watt-the-hack-crowd-wide.jpeg.asset.json';

const POST_TITLE = 'Watt the Hack: Energy Data Gaps, Helping Renters, and Dreaming of Cyberpunk Campervans';
const POST_SLUG = 'watt-the-hack-energy-data-gaps';

const Divider = () => <hr className="my-12 border-t border-border/40" />;

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-4 hover:text-primary transition-colors"
  >
    {children}
  </a>
);

const InstagramEmbed = ({ url }: { url: string }) => (
  <blockquote
    className="instagram-media"
    data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
    data-instgrm-version="14"
    style={{ background: '#FFF', border: 0, margin: 0, minWidth: 0, width: '100%' }}
  />
);

export default function BlogPostWattTheHack() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>('script[src*="instagram.com/embed.js"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    } else {
      // @ts-expect-error instgrm is injected by Instagram's script
      window.instgrm?.Embeds?.process?.();
    }
  }, []);

  return (
    <PageLayout>
      <article className="max-w-[720px] mx-auto">
        <span className="section-label block mb-2">Hackathon</span>
        <h1 className="headline-section mb-2">{POST_TITLE}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          A weekend at an AI + energy hackathon in Melbourne, the FieldMate pitch we built for Amber Electric, a Renter Upgrade Assistant idea, and why cyberdecks tie it all together.
        </p>
        <div className="flex items-center gap-3 mb-8">
          <span className="mono-date text-[10px]">July 8, 2026</span>
          <span className="text-border">·</span>
          <span className="mono-date text-[10px]">12 min read</span>
        </div>

        <BlogAuthorShare slug={POST_SLUG} title={POST_TITLE} />

        <div className="aspect-[16/9] overflow-hidden mb-12 bg-muted">
          <img
            src={wattHero}
            alt="Illustrated Australian home with rooftop solar, a smart meter, a power pole, and a campervan at night"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose-custom space-y-6 text-foreground/90 leading-relaxed">
          <p>
            Last month I took a break from hosting my own hackathons with <ExtLink href="https://hackeroos.com.au/">Hackeroos</ExtLink>, and spent a weekend at <ExtLink href="https://watt-the-hack.com/">Watt the Hack</ExtLink>, an AI and energy hackathon run by <ExtLink href="https://mlai.au/">MLAI Aus</ExtLink> at <ExtLink href="https://www.stoneandchalk.com.au/">Stone &amp; Chalk</ExtLink> Melbourne. They put AI builders and energy people in the same room for two days to see what happens when we try to solve one of Australia's biggest, messiest systems: the grid.
          </p>

          <p>
            Sponsors included <ExtLink href="https://openai.com/">OpenAI</ExtLink>, <ExtLink href="https://www.amber.com.au/">Amber</ExtLink>, <ExtLink href="https://base44.com/">Base44</ExtLink>, <ExtLink href="https://www.racefor2030.com.au/">RACE for 2030</ExtLink>, <ExtLink href="https://halsystems.com.au/">HAL Systems</ExtLink>, the <ExtLink href="https://www.melbourne.vic.gov.au/">City of Melbourne</ExtLink>, and with speakers from <ExtLink href="https://www.monash.edu/">Monash</ExtLink>. The prize pool was $10,000 USD in <ExtLink href="https://openai.com/api/">OpenAI API</ExtLink> credits for first place, and <ExtLink href="https://openai.com/chatgpt/pricing/">ChatGPT Pro</ExtLink> for the top five teams. But the real prize for me, was getting to pressure-test ideas directly with experts.
          </p>

          <div className="my-8 grid grid-cols-2 gap-4">
            <figure>
              <img
                src={wattSponsors.url}
                alt="Watt the Hack sponsors page featuring Codex, City of Melbourne, Base44, Amber, RACE for 2030, AI Engineer, Stone & Chalk, Web Directions, HAL, and ACASE"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
            <figure>
              <img
                src={wattCrowdWide.url}
                alt="Wide view of the packed Watt the Hack audience seated at Stone & Chalk Melbourne under exposed brick and industrial lighting"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          </div>

          <Divider />

          <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-10 mb-4">FieldMate: Paying Households for Data the Grid Can't See</h2>

          <p>
            My team (Jasper Fyfe, Ishaan Kataria, and me) built FieldMate, a ChatGPT-guided capture workflow that pays households energy credits for site data that APIs, smart meters, and satellite imagery simply don't capture, and we pitched it with Amber Electric in mind as the integration partner.
          </p>

          <figure className="my-8">
            <img
              src={fieldmateHero.url}
              alt="FieldMate promo: Turn your smartphone into energy savings, with two phone mockups showing the app"
              className="w-full h-auto"
              loading="lazy"
            />
          </figure>

          <p>
            We found the data gap. Smart meters know your usage, but they don't know whether your meter box is blocked by a new dog or recently relocated behind a locked fence. Google Maps and aerial imagery miss what changes on the ground: roof changes, damaged poles, or even bushfire-affected access routes. Today, installers and network crews often discover these problems only after they've booked a truck roll. That makes field work expensive, slow to scale, and full of avoidable delays. Every failed visit is wasted money, a slower quote, and sometimes a lost customer.
          </p>

          <p>
            FieldMate flips the model for up-to-date information in exchange for energy rebates. FieldMate guides local smartphone owners through a safe, AI-assisted capture flow. They can submit a walking video of meter box access, ground-level roof photos with finger-drawn outlines, or safe-distance views of poles, trees, fences, and obstructions. No climbing, and no technical training. FieldMate checks photo quality and missing details in real time, then rewards useful submissions with energy credits. In our demo, a participant earns $82 AUD from Amber.
          </p>

          <figure className="my-8">
            <img
              src={fieldmateDataExamples.url}
              alt="FieldMate data examples: meter box, power pole, and roof setup capture guidance with sample photos"
              className="w-full h-auto"
              loading="lazy"
            />
          </figure>

          <p>
            The important part: people sell their data directly and get rewarded for it. Households stop being unpaid participants in the energy transition and start being compensated data partners. On the buyer side, those captures become scored lead lists and readiness reports. Our sample Mildura dataset showed 210 homes ready for immediate solar-plus-battery follow-up out of 1,000 submissions. That's the difference between a sales team cold-calling a suburb and a sales team knocking on doors they already know could be ready for a battery. We built it as an MCP app with a React capture UI, and the whole thing is on <ExtLink href="https://github.com/bitpixi2/FieldMate">GitHub</ExtLink> with a <ExtLink href="https://fieldmate-mcp-app.b-cdn.net/mcp-app.html">live demo MCP server</ExtLink>.
          </p>

          <figure className="my-8">
            <img
              src={fieldmateReportExample.url}
              alt="FieldMate report example: sample Mildura solar lead dataset with 1,000 properties and 210 high-readiness homes"
              className="w-[80%] h-auto mx-auto"
              loading="lazy"
            />
          </figure>

          <p>
            The result: faster quotes, fewer failed truck rolls, safer field work, and better site intelligence for solar companies, EV installers, electricity retailers, field technicians, network operators, and government teams.
          </p>

          <Divider />

          <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-10 mb-4">The Second Idea: Renter Upgrade Assistant (RUA)</h2>

          <p>
            I had a second idea that I wish we had done. This one aimed at the third of Australians who can't just decide to install energy upgrades, because they don't own the roof over their heads. Many renters know their home is expensive to heat, cool, or power. What they don't know is how to ask their landlord for upgrades. "My utility bills are too high" is a complaint, but it goes nowhere, since it doesn't affect the landlord.
          </p>

          <p>
            Renter Upgrade Assistant (RUA) turns resident-submitted home data into a clear, polite, evidence-backed upgrade request. A renter captures their situation, and RUA generates suggested next steps and landlord-friendly wording based on their area. Instead of complaining, the renter can say: "Your property is eligible for this energy-efficiency upgrade that could increase our comfort so we stay longer, and also make the home more attractive long term when you're ready to sell. I've attached a RUA report with suggested next steps!"
          </p>

          <p>
            RUA also flags new state-level rental minimum-standards laws that both sides often miss, from Victoria's rolling efficiency requirements to similar rules emerging in NSW, QLD, and the ACT. Renters learn what their home is legally entitled to, and landlords get an early heads-up on compliance obligations before they become a fine, a tribunal complaint, or a failed rental inspection.
          </p>

          <figure className="my-8">
            <img
              src={ruaReport.url}
              alt="Renter Upgrade Assistant (RUA) mockup: Generated Upgrade Request Report with property assessment, eligible upgrades, and a professional email template"
              className="w-full h-auto border border-border"
              loading="lazy"
            />
          </figure>

          <p>
            I got to talk about this idea with <ExtLink href="https://www.racefor2030.com.au/">Bill Lilley</ExtLink>, Chief Executive Officer at RACE for 2030, who preferred the RUA concept because rather than adversarial bargaining, it uses interest-based negotiation to bridge the gap between renter and landlord. Bill wasn't as sure about FieldMate's ability to scale adoption and if the data gaps were of a big enough concern, but he did feel the Renter-Landlord rift here is substantial to address to push forward renewable energy progress.
          </p>

          <div className="my-8 grid grid-cols-2 gap-4">
            <figure>
              <img
                src={wattMeeting.url}
                alt="Bill Lilley, CEO of RACE for 2030, in conversation at Watt the Hack"
                className="w-full h-auto"
                loading="lazy"
              />
              <figcaption className="mono-date text-[10px] text-muted-foreground mt-2">
                Bill Lilley, CEO, RACE for 2030
              </figcaption>
            </figure>
            <figure>
              <img
                src={wattTeam.url}
                alt="The FieldMate team at Watt the Hack: Jasper Fyfe, Ishaan Kataria, and Kasey Robinson"
                className="w-full h-auto"
                loading="lazy"
              />
              <figcaption className="mono-date text-[10px] text-muted-foreground mt-2">
                Jasper Fyfe, Ishaan Kataria, Kasey Robinson
              </figcaption>
            </figure>
          </div>

          <p>
            With RUA, tenants get to ask with confidence. Landlords get clear evidence and a framing that speaks their language like retention, asset value, and eligibility for rebates they didn't know existed. And for anyone selling batteries, solar, insulation, or heat pumps into the rental market, RUA is a pipeline into a customer segment that's currently almost impossible to reach: the tenant wants it, the landlord pays for it, and nobody was connecting the two. Until now!
          </p>

          <Divider />

          <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-10 mb-4">Cyberdecks, Campervans, and WiFi on Wheels</h2>

          <p>
            The other thread running through all of this is my company Hackeroos, where I've been exploring cyberdecks, which are these custom, portable, hacker-built computers, and how they might operate on a cyberpunk campervan.
          </p>

          <p>
            This isn't hypothetical for me. Last year I ran <ExtLink href="https://ai-in-the-outback.devpost.com">AI in the Outback</ExtLink>, proving that serious AI development can happen far from a city, a fibre connection, or a wall socket. And this year, as a Codex Ambassador, <ExtLink href="https://forms.gle/mQR3HeudAtPSYj1W9">I distributed $2,500 AUD of AI credits to developers building cyberdeck hardware</ExtLink>, putting real resources behind the idea that computing doesn't have to live in an office.
          </p>

          <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InstagramEmbed url="https://www.instagram.com/reel/DN2Akxd5OMd/" />
            <InstagramEmbed url="https://www.instagram.com/reel/DNuCbbaZCOT/" />
          </div>

          <figure className="my-8">
            <img
              src={campervanInternet.url}
              alt="Infographic of practical campervan internet setups in Australia, including Starlink, 4G/5G routers, antennas, and lithium power systems"
              className="w-full h-auto"
              loading="lazy"
            />
            <figcaption className="mono-date text-[10px] text-muted-foreground mt-2">
              Practical campervan internet setups in Australia - image made with Codex image-gen-2
            </figcaption>
          </figure>

          <Divider />

          <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-10 mb-4">Why I Keep Thinking about Energy</h2>

          <p>
            Homeowners, renters, and households on wheels all want the same three things: lower costs, more resilience, and control over their own energy. Installers don't know which homes are ready. Renters don't know how to ask. Mobile and off-grid users don't know what's possible. The demand is already there. The missing piece is the bridge. If you need help building that bridge, either as an energy retailer, a government organisation, or an installer network, I'd love to talk!
          </p>
        </div>

        <BlogPostNav currentSlug={POST_SLUG} />
      </article>
    </PageLayout>
  );
}