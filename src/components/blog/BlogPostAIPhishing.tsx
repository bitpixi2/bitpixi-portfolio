import { PageLayout } from '@/components/PageLayout';
import BlogPostNav from '@/components/blog/BlogPostNav';
import AIFraudInfographic from '@/components/AIFraudInfographic';
import BlogAuthorShare from '@/components/blog/BlogAuthorShare';
import aiPhishingHero from '@/assets/blog/ai-phishing-hero.jpg';

const Divider = () => (
  <hr className="my-12 border-t border-border/40" />
);

export default function BlogPostAIPhishing() {
  return (
    <PageLayout>
      <article className="max-w-[720px] mx-auto">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['cybersecurity', 'banking', 'ai agents', 'usa', 'australia'].map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono border border-border px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-4">
            The Scam Email That Knows Your Branch, Your Name, and What You Bought Yesterday
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            82.6% of phishing emails now contain AI-generated content. The ones targeting bank customers do not look like scams anymore. They look like your bank.
          </p>
          <BlogAuthorShare
            slug="ai-phishing-banks"
            title="The Scam Email That Knows Your Branch, Your Name, and What You Bought Yesterday"
          />
          <div className="flex items-center gap-4 mb-8">
            <span className="mono-date">February 11, 2026</span>
            <span className="text-border">·</span>
            <span className="mono-date">12 min read</span>
          </div>
        </header>

        {/* Hero image */}
        <div className="aspect-[16/9] overflow-hidden mb-12 bg-muted">
          <img src={aiPhishingHero} alt="AI-powered phishing email emerging from digital darkness" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6 text-foreground/85 leading-relaxed text-base">
          <p>
            The advice we have all been giving people about phishing — look for typos, check for bad grammar, hover over the link — is becoming useless.
          </p>
          <p>
            AI has eliminated every surface-level signal that used to make phishing detectable. The grammar is flawless. The tone matches. The branding is pixel-perfect. And the personalisation goes so deep that the message references things only your actual bank should know.
          </p>
          <p>
            This is not a warning about the future. This is happening right now. AI-enabled fraud surged <strong>1,210%</strong> in 2025. The US FBI's IC3 recorded <strong>$16.6 billion</strong> in cybercrime losses last year, a 33% year-over-year increase, with AI-enhanced social engineering driving a growing share. And banks, from the Australian Big Four down to regional credit unions, are the primary target.
          </p>
          <p>
            Let me show you exactly how these attacks work, why they are harder to catch than anything we have seen before, and what you can actually do about it.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">How AI Made Phishing Personal</h3>
          <p>Traditional phishing was a numbers game. Blast a million generic emails, hope for a fraction click. The messages were templated. The targeting was random. The quality was low.</p>
          <p>AI flipped every one of those constraints.</p>
          <p>
            <strong>Reconnaissance at scale.</strong> Attackers now use AI to scrape your LinkedIn, social media, public records, and breached databases. Within seconds, a model can build a profile: your name, your employer, your recent job change, your suburb, the bank you likely use based on your location and demographic. It can even identify your communication style from public posts and match it.
          </p>
          <p>
            <strong>Polymorphic generation.</strong> Instead of sending the same email to a thousand targets, AI creates a thousand unique variations. Each one is personalised. Each one uses different phrasing. This defeats both signature-based email filters and human pattern recognition, because your colleague cannot warn you about "the same suspicious email" when no two are alike.
          </p>
          <p>
            <strong>Perfect impersonation.</strong> Large language models can replicate a company's communication style precisely. An AI-generated email from "Bendigo Bank" will use Bendigo Bank's actual tone, formatting conventions, and terminology. Not because the attacker studied the brand guide, but because the model was trained on enough of their public communications to reproduce it naturally.
          </p>
          <p>
            Brightside AI documented a campaign targeting 800 accounting firms with AI-generated emails referencing specific state registration details. The click rate was <strong>27%</strong>, far above industry average for phishing.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The New Anatomy of a Bank Scam</h3>
          <p>Here is what a sophisticated AI-powered bank scam looks like in 2026. It is not one email. It is an orchestrated sequence.</p>
          <p>
            <strong>Step 1: The text.</strong> You get an SMS that appears to come from your bank's fraud department. It references your actual name and says there has been suspicious activity on your account. The number looks legitimate (caller ID spoofing is trivial). The language is calm, professional, exactly how your bank actually communicates.
          </p>
          <p>
            <strong>Step 2: The call.</strong> Minutes later, a "representative" phones you. They sound authentic. They already know your name, your account type, maybe even a recent transaction amount scraped from a data breach. They are patient. They do not rush. AI-powered social engineers have learned that patience builds trust.
          </p>
          <p>
            <strong>Step 3: The email.</strong> While on the call, they send you an email with "confirmation details" and a link to "verify your identity." The email is formatted exactly like your bank's real emails. The link goes to a cloned site.
          </p>
          <p>
            <strong>Step 4: The site.</strong> The phishing site is a near-perfect replica of your bank's login page. AI tools can clone a website's design in minutes, not hours. Every element matches. The URL is close enough to pass a quick glance.
          </p>
          <p>
            This is what ANSecurity calls a "hybrid social engineering attack," and it is devastating because each step reinforces the legitimacy of the others. You received a text, then a call, then an email. It feels coordinated. It feels real.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">Why Patience Is the New Weapon</h3>
          <p>The old scam playbook was urgency. "Act now or your account will be frozen." "You have 24 hours." That pressure was itself a red flag.</p>
          <p>The new playbook is patience.</p>
          <p>
            AI agents can manage multiple scam conversations simultaneously, over days or weeks. They can check in. They can be warm. They can build rapport. A social engineer using AI does not need to close the deal in one call. They can afford to let the target come to them.
          </p>
          <p>
            Feedzai's 2025 research found that <strong>44%</strong> of global financial services professionals say criminals are already using deepfakes in their operations. But deepfakes are just one layer. The real shift is that AI has made the human side of social engineering — relationship building, trust cultivation, and the long game — scalable for the first time.
          </p>
          <p>
            An attacker who would previously have spent days researching a single high-value target can now run that same level of personalised attack against hundreds of targets simultaneously. The economics have fundamentally changed.
          </p>

          <Divider />

          {/* AI Fraud Infographic */}
          <div className="my-12 -mx-6 md:mx-0">
            <AIFraudInfographic />
          </div>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">What Banks Are Getting Wrong</h3>
          <p>Most banks are still fighting the last war.</p>
          <p>
            <strong>Outdated training.</strong> Annual phishing awareness sessions that teach people to "look for spelling errors" are not just insufficient. They are actively harmful because they create a false sense of security. Employees and customers think they know what a scam looks like. They don't anymore. They need new education.
          </p>
          <p>
            <strong>Static filters.</strong> Traditional email security scans for known malicious signatures, blacklisted domains, and suspicious patterns. AI-generated phishing links and domains appear and disappear so quickly that blacklists cannot keep up. The emails contain no malicious code to detect. They are just words, perfectly crafted words.
          </p>
          <p>
            <strong>Neglecting the phone channel.</strong> Banks have invested heavily in email security. But vishing (voice phishing) surged 442% in 2025. AI-cloned voices enabled $40 billion in global fraud. Over 10% of banks report deepfake vishing losses averaging over $1 million.
          </p>
          <p>
            The regulators are catching up. FFIEC, OCC, and CFPB guidance now frames phishing incidents as control failures, not user errors. FinCEN issued deepfake red flags in late 2024. NYDFS says deepfake detection should be part of baseline cyber programs.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">How to Actually Protect Yourself</h3>
          <p><strong>For individuals:</strong></p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Verify out-of-band.</strong> If you get a call from your bank, hang up and call them back using the number on the back of your card or from their official app. Not the number from the message. Not the number the caller gives you. This single habit defeats almost every hybrid attack.</li>
            <li><strong>Never trust a payment change based on the channel it arrived in.</strong> If someone says your bank details need updating, or asks you to move money to a "safe account," treat it as a high-risk event. Banks do not operate this way.</li>
            <li><strong>Pause when you feel urgency or secrecy.</strong> "Do not tell anyone about this call" is always a scam. "Act immediately or lose access" is always a scam. Real banks have processes. Real processes are not secret.</li>
            <li><strong>Check the URL, not the design.</strong> The site will look perfect. The URL will not be. Look for subtle misspellings or extra characters in the domain name, and use your bank's app instead of clicking links from emails.</li>
          </ul>

          <p className="mt-8"><strong>For banks and security teams:</strong></p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Move beyond signature-based detection.</strong> LLM-native email analysis that infers intent, not just pattern-matches keywords, is now necessary. The email will pass every traditional filter.</li>
            <li><strong>Implement behavioural anomaly detection.</strong> Profile normal communication patterns. Flag deviations. A money request from HR that does not match historical patterns is a signal, even if the email looks legitimate.</li>
            <li><strong>Dual approval for payment changes.</strong> Require two-person authorisation for any change to payment instructions. This is boring and it works. In decentralised finance, they call this multi-sig for multi-signature.</li>
            <li><strong>Run realistic simulations.</strong> Effective security training can drop phishing click rates from 33.1% to 4.1%. But the simulations need to be as sophisticated as the actual attacks — which means AI-generated, personalised, and multi-channel.</li>
            <li><strong>Educate about the long game.</strong> Teach people that patience and friendliness are now attack vectors. A scammer who calls back three times over a week, each time helpful and professional, may not be persistent customer service. That is social engineering.</li>
          </ul>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The Bottom Line</h3>
          <p>
            The scam email that arrives tomorrow will not have typos. It will reference your branch. It may mention a transaction you actually made. The follow-up call could sound exactly like your bank's fraud department.
          </p>
          <p>
            The only defences that still work are procedural, not perceptual. You cannot spot the fake anymore. But you can verify through a separate channel. You can require dual approvals. You can pause before acting.
          </p>
          <p>
            The attacker's greatest advantage is not the technology. It is the assumption that "I would recognise a scam." In 2026, that confidence is the vulnerability.
          </p>

          <Divider />

          <footer className="text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground/70">Sources:</strong> KnowBe4 2025 Phishing Threat Trends Report, FBI IC3 2024 Annual Report, Vectra AI scam analysis (Feb 2026), Brightside AI risk analysis, Feedzai 2025 AI Trends in Fraud, ANSecurity hybrid attack research, APWG Quarterly Reports, DeepStrike vishing statistics 2025.
            </p>
          </footer>
        </div>
      </article>
      <BlogPostNav currentSlug="ai-phishing-banks" />
    </PageLayout>
  );
}
