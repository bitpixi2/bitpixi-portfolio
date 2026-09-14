import { PageLayout } from '@/components/PageLayout';
import BlogPostNav from '@/components/blog/BlogPostNav';
import BlogAuthorShare from '@/components/blog/BlogAuthorShare';
import BankInfrastructureComparison from '@/components/BankInfrastructureComparison';
import backendHero from '@/assets/blog/backend-spreadsheets-hero.jpg';

const Divider = () => (
  <hr className="my-12 border-t border-border/40" />
);

export default function BlogPostBackend() {
  return (
    <PageLayout>
      <article className="max-w-[720px] mx-auto">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['cybersecurity', 'banking', 'backend', 'ux design', 'usa', 'australia'].map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono border border-border px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-4">
            Backend Engineering Terrified Me Until I Realised It's Just Spreadsheets With Bouncers
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            I spent a decade designing interfaces, scaling a product from 80 million to 180 million users in three months, and making B2B integration mockups for stakeholders to present at meetings with Netflix, Niantic, MGM, and Lionsgate. And for most of that time, I had absolutely no idea what was happening on the other side of the wall.
          </p>
          <BlogAuthorShare
            slug="backend-spreadsheets-bouncers"
            title="Backend Engineering Terrified Me Until I Realised It's Just Spreadsheets With Bouncers"
          />
          <div className="flex items-center gap-4 mb-8">
            <span className="mono-date">February 12, 2026</span>
            <span className="text-border">·</span>
            <span className="mono-date">22 min read</span>
          </div>
        </header>

        {/* Hero image */}
        <div className="aspect-[16/9] overflow-hidden mb-12 bg-muted">
          <img src={backendHero} alt="Spreadsheet with velvet rope — backend engineering metaphor" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6 text-foreground/85 leading-relaxed text-base">
          <p>
            Backend engineering was this shadowy thing. A mysterious domain where the "real" programmers lived. The ones who understood servers. The ones who could look at a system architecture diagram and nod knowingly.
          </p>
          <p>
            I knew the front-end. I'd been fiddling with HTML, CSS, JS, and even a bit of Python and JSON from when I was 10 years old, and begging my friends' older siblings to get me subdomains so I could go beyond custom MySpace layouts.
          </p>
          <p>
            Over time, I started researching and really looking. Really looking at what others are looking at and how they are clicking that was different than me and how they felt. I could tell you exactly where someone's eyes would land on a screen and why your onboarding flow was losing 40% of users at step three. But the backend? That was the engine room. I did not have a key, and nobody seemed inclined to give me one.
          </p>
          <p>
            Then, somewhere between entering more hackathons, wrestling with Supabase row-level security policies to set up e-mail collection lists, storing bank details with Stripe integration, and trying to get an AI to remember a 60,000-word science fiction novel without bankrupting me by reconfiguring what memory it draws from, it clicked…
          </p>
          <p><strong>Backend is spreadsheets with bouncers.</strong></p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The Spreadsheet Revelation</h3>
          <p>Every database is a spreadsheet.</p>
          <p>
            A SQL database like PostgreSQL, which is what Supabase runs on, stores data in tables. Tables have rows and columns. Each row is a record. Each column is a field. If you have ever opened Google Sheets and typed a header row that says <code className="bg-muted px-1.5 py-0.5 text-sm font-mono">name | email | role | created_at</code>, congratulations. You have designed a database schema.
          </p>
          <p>
            The "backend" is everything that sits between a user clicking a button and a row being read from, written to, or updated in that spreadsheet. The API is the waiter who takes your order to the kitchen. The server is the kitchen. The database is the walk-in fridge where all the ingredients live. Authentication is the bouncer checking your ID at the door. Permissions are the bouncer checking whether your ID lets you into the VIP section or just the general floor.
          </p>
          <p>
            When I set up Supabase for Hackeroos and started writing row-level security (RLS) policies, I was literally writing rules that said: "This user can only see rows in this spreadsheet where the <code className="bg-muted px-1.5 py-0.5 text-sm font-mono">team_id</code> column matches their team." That is it. That is backend security. It is a bouncer with a guest list, checking every request against the list before letting it through.
          </p>
          <p>The mystique evaporated.</p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">When It All Started Clicking: Lua, Voxels, and Who Touched What</h3>
          <p>
            The first time backend logic actually made intuitive sense to me was years earlier, and I did not even realise it at the time.
          </p>
          <p>
            I was working with engineers on virtual world events building interactive experiences where users could explore spaces, find hidden objects, and change the state of the room in a 3D voxel world. The scripting language was Lua-based, and the core problem was deceptively simple: which user touched which object, and in what order, and did they find them all?
          </p>
          <p>
            That is a backend problem. You need a data store (which objects exist, where they are, what they unlock). You need a user state (which object has this specific user already found). You need logic (if the user has found objects 1 through 9, reveal object 10). And you need it to work across multiple users simultaneously, without one person's progress overwriting another's. The platform didn't have access to storage for this, so it had to be done externally and then piped back in.
          </p>
          <p>
            I was working with a backend without knowing it. The "database" was a set of state objects. The "API" was the event listener on each object. The "permissions" were checking that the user interacting with the object was the user whose progress should update.
          </p>
          <p>
            Game scripting <em>needs</em> backend engineering. Every game developer who has tracked player state, managed inventories, or handled multiplayer synchronisation has been doing backend work. They just call it "game logic" because "distributed state management with concurrent user sessions" does not fit on a job listing.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">Web3 Taught Me Authentication the Hard Way</h3>
          <p>
            Then came wallet-based login, and suddenly authentication went from something I vaguely understood to something I had to actually build.
          </p>
          <p>
            In early Web3, logging in meant connecting a crypto wallet. MetaMask, Rainbow, etc. The wallet signs a message, the app verifies the signature, and that signature is your proof of identity. No email. No password. No "forgot your password" flow. Your private key <em>is</em> your identity.
          </p>
          <p>
            This is elegant until you need to onboard anyone who is not already deep in crypto. The "normies," as we affectionately called them, do not have wallets. They have email addresses. They expect a login form.
          </p>
          <p>
            So you end up building both. Wallet connection for the crypto-native users and email/password (or magic link, or OAuth via Google) for everyone else. And then you need to unify them. One user, two possible authentication paths, one profile, one set of permissions.
          </p>
          <p>
            This is where I learned what an auth layer actually does. It does not care <em>how</em> you prove who you are. It cares <em>that</em> you proved it. The wallet signature and the email/password are both just different ways of generating a token that says "this person is who they claim to be." The backend treats both tokens the same way once they are issued.
          </p>
          <p>
            When I later saw how Supabase handles auth, with its built-in support for email, OAuth, and custom providers, I recognised the exact same pattern. The door has multiple locks, but once you are inside, you are inside. The RLS policies do not care which lock you used. They care what role you have.
          </p>
          <p>
            Then I saw, wait, this is SQL and PostGres wrapped up in a package for beginners with a higher price tag for vibe coders who aren't even using an <code className="bg-muted px-1.5 py-0.5 text-sm font-mono">.env</code> file right. It could be done by coding it for free instead and more securely.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">What AI Taught Me About Memory, Storage, and Entropy</h3>
          <p>
            Here is where it gets interesting, because the most vivid backend education I have had came from trying to make AI work efficiently.
          </p>
          <p>
            When you are using an AI model with a context window, you are dealing with a memory system. The context window is working memory: everything the model can "see" at once. System prompts, conversation history, uploaded documents, tool results, all of it lives in one window, and when that window fills up, things start falling off the edge.
          </p>
          <p>
            I learned this the expensive way. I had a 60,000-word science fiction novel I wrote, that I wanted Claude to help me edit and perhaps generate a draft sequel. Every time I uploaded the whole thing and asked a question, it would chew through the entire document, time out, or burn through credits like I had lit my wallet on fire. Also my hardware felt like it was on fire. The model was reading the whole novel every single time just to answer one question about chapter twelve.
          </p>
          <p>The solution? The same patterns backend engineers have been using for decades.</p>
          <p>
            <strong>Caching.</strong> Instead of making the AI read the whole novel every time, I had it generate chapter summaries first. Then for most questions, I could feed it just the summary plus the relevant chapter. The summary is a cache: a pre-computed, compressed version of the data that answers most queries without touching the full dataset. Every web application does this. When you load your Twitter feed, you are not querying every tweet ever written. You are hitting a cache.
          </p>
          <p>
            <strong>Indexing.</strong> I started tagging chapters with metadata: character names, plot points, themes. Then I could say "find the chapters about [character]" without scanning everything. This is what a database index does. Instead of reading every row to find the ones that match, it maintains a lookup table that says "rows containing 'character X' are at positions 3, 7, and 15."
          </p>
          <p>
            <strong>Tiered storage.</strong> Some chapters were actively being edited (hot data). Some were finalised and only needed occasional reference (warm data). Some were backstory documents I almost never touched (cold data). I kept hot data in the context window, warm data as summaries I could pull in, and cold data in files I would only fetch if specifically needed. This is literally how cloud storage works: S3 has Standard, Infrequent Access, and Glacier tiers, each progressively cheaper and slower.
          </p>
          <p>
            <strong>Forgetting strategically.</strong> This is the one that really made sense. The context window has a limit. You cannot keep everything. So you have to decide what to forget, and when, and how to find it again if you need it. This is cache eviction. It is garbage collection. It is the <code className="bg-muted px-1.5 py-0.5 text-sm font-mono">DROP TABLE</code> you run when you finally accept that table is never going to be useful. It is TTL (time to live) on a Redis key, automatically expiring data you have not touched in a while.
          </p>
          <p>And it is hard. Not the technical implementation. The decision about what to keep.</p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The Entropy Problem</h3>
          <p>
            This is where the metaphor that makes it all real for me comes in.
          </p>
          <p>
            Collecting data is easy. Every interaction, every click, every transaction, every log entry: systems are constantly generating data. It accumulates naturally. It requires zero effort. Data, like plastic toys in a mum's house, it just appears until we are covered in it.
          </p>
          <p>
            Organising data, cleaning it, deciding what to keep, archiving what you might need later, and deleting what you will never touch again? That is the hard part. That requires active energy. That requires decisions.
          </p>
          <p>
            This is entropy. The natural tendency of any system toward disorder. And anyone who has survived January in a house with children knows exactly what I am talking about. Christmas was three weeks ago and there are still plastic toys in rooms that do not have children in them. Under the couch. Behind the toilet. In the car. In your handbag somehow. Every drawer has become a junk drawer. The playroom looks like a distribution centre after an earthquake.
          </p>
          <p>
            That is what an unmaintained database looks like. That is what happens when you log everything and archive nothing. That is what technical debt feels like from the inside.
          </p>
          <p>
            The mum having a nervous breakdown in January is performing database maintenance. She is doing a schema review ("why do we have three incomplete Lego sets and no instruction booklets?"), data deduplication ("we have four identical Hot Wheels cars"), archival decisions ("these baby toys can go to storage"), and hard deletes ("this broken thing is going in the bin and I do not care that it was your favourite for three minutes on Boxing Day").
          </p>
          <p>
            Backend engineering is not mysterious. It is domestic. It is the unglamorous, ongoing, never-finished work of keeping a system functional when entropy is constantly pulling it toward chaos.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">The Technical Reality Behind the Metaphors</h3>
          <p>
            Now let me get concrete. Because the metaphors are how I understood it, but the technical reality is what you actually need to know.
          </p>
          <p>
            <strong>System design</strong> is deciding how the pieces connect. When a user opens your app, what happens? Their device makes an HTTP request to your server (or serverless function). The server checks their auth token. If valid, it queries the database. The database returns data. The server formats it and sends it back. That is the happy path. System design is also deciding what happens when the database is slow, or the user's token has expired, or ten thousand people hit the same endpoint at the same time.
          </p>
          <p>
            <strong>Storage optimisation</strong> is choosing the right container for the right data. Relational databases (PostgreSQL, MySQL) are great when your data has clear relationships: users have orders, orders have items, items have prices. Document databases (MongoDB) are great when your data is messy or variable: user profiles where one person has three addresses and another has none. Key-value stores (Redis) are great for fast lookups: session data, cache, rate limiting. You do not put everything in one place. You put each thing in the place that makes it cheapest and fastest to retrieve.
          </p>
          <p><strong>Memory systems</strong> in computing mirror what I learned with AI context windows.</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>RAM</strong> is the context window: fast, expensive, limited, gone when you turn it off. This is where active computations happen.</li>
            <li><strong>Disk storage (SSD/HDD)</strong> is the filing cabinet: slower, cheaper, persistent. Your database lives here.</li>
            <li><strong>Object storage (S3, Google Cloud Storage)</strong> is the warehouse: vast, cheap, slow to access. Backups, media files, and archives live here.</li>
            <li><strong>CDN (Content Delivery Network)</strong> is photocopying your most popular documents and putting copies in every office around the world so people do not have to request the original every time. That is why your images load fast even though the server is in another country.</li>
          </ul>
          <p>
            The skill of backend engineering is not knowing what these things are. It is knowing when to use which one, and how they interact, and what breaks when one of them goes down.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">What Banks Actually Need (And How Two Banks Do It Differently)</h3>
          <p>
            Let me ground all of this in a real comparison, because banking backend infrastructure is where every concept above operates at maximum stakes.
          </p>
          <p>
            <strong>Bank of America</strong> is one of the largest financial institutions on the planet. 57 million verified digital users. 169 petabytes of data. Their AI assistant Erica has handled over 1.5 billion client interactions. And their mainframe environment is the third largest in the world.
          </p>
          <p>
            Much of Bank of America's critical backend still runs on COBOL, a programming language created in 1959. An estimated $3 trillion in daily commerce flows through COBOL systems globally, and BofA is a major contributor to that figure. Their core infrastructure was not designed for real-time APIs or mobile apps. It was designed for batch processing: collect the day's transactions, process them overnight, update the ledgers by morning.
          </p>
          <p>
            BofA has historically pursued a private cloud strategy, building their own data centres rather than using AWS or Google Cloud. They consolidated from 67 data centres down to 23, and from 200,000 servers down to 70,000, building a common architecture that lets most applications run across 8,000 servers. CEO Brian Moynihan has acknowledged that third-party cloud providers are 25–30% cheaper, and the bank is now evaluating hybrid approaches, including an 18-month collaboration with IBM on a bank-focused public cloud.
          </p>
          <p>
            <strong>Bendigo Bank</strong> is a very different animal. Australia's fifth largest retail bank, roughly 2.9 million customers, 8,600 employees. Community-focused, regional roots, and in the middle of an aggressive modernisation program.
          </p>
          <p>
            Bendigo chose Google Cloud as the foundation for its digital banking system, migrating its consumer-facing banking app onto Google Kubernetes Engine (GKE). Deployment times for customer experience upgrades dropped to 15 minutes. They achieved 99.9% availability. Their digital banking app now runs on the same infrastructure as Up, their next-generation digital bank.
          </p>
          <p>
            For their core banking backend, Bendigo partnered with MongoDB, migrating their Agent Delivery System (a legacy retail banking application) from a relational database to MongoDB Atlas. Using AI-assisted migration tools, they completed the transition with 90% less human effort and at one-tenth the cost of a traditional legacy migration. Test cases that took over 80 hours to run were automated down to five minutes.
          </p>

          {/* Bank Infrastructure SVG Infographic */}
          <BankInfrastructureComparison />

          <p>
            Dan Corboy, Bendigo's Lead Cloud Engineer, said it plainly: "We wanted to prove that we could move faster, develop things in smaller chunks using a schema-agnostic database, and make changes more quickly, with no outages."
          </p>
          <p>
            The comparison reveals the core tension in banking backend engineering. BofA has scale, decades of battle-tested COBOL, and the resources to build its own cloud. But that scale also means paralysing technical debt and slow iteration. Bendigo has agility, modern tooling, and the ability to adopt new technology in months rather than years. But they do not have the same depth of infrastructure or the same regulatory complexity as a globally systemically important bank.
          </p>
          <p>
            Both need the same things from their backend: transaction integrity (every dollar must be accounted for), regulatory compliance (audit trails, data sovereignty, encryption at rest and in transit), high availability (customers expect 24/7 access), and security (they are literally storing everyone's money). The difference is in how they get there.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">Junior vs Senior Backend Dev: What Actually Changes</h3>
          <p>
            I want to address this because it is the question everyone asks and the answer is simpler and also more humbling than people expect.
          </p>
          <p>
            A junior backend developer can write the code. They can build an API endpoint. They can write a database query. They can set up authentication. They can deploy to a server. They know the tools.
          </p>
          <p>A senior backend developer knows <em>what not to build</em>.</p>
          <p>
            That is the gap. It is not about writing more complex code. Seniors often write simpler code. The difference is in the decisions surrounding the code.
          </p>
          <p>
            A junior sees a requirement and starts building. A senior sees a requirement and asks: Do we actually need this? Is there an existing service that does it? What happens when this gets ten times the traffic? What happens when the data is ten times bigger? What are the failure modes? Who gets woken up at 3am when it breaks? What is the migration path when we inevitably need to change it?
          </p>
          <p>
            A junior builds the feature. A senior builds the feature in a way that does not create problems for the person who has to modify it in two years, who might be themselves.
          </p>
          <p>More concretely, here is what shifts:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>A junior writes a database query that works. A senior writes a query that works, uses indexes efficiently, does not lock the table for other requests, and includes a plan for what happens when the table has 100 million rows instead of 10,000.</li>
            <li>A junior sets up a single database. A senior sets up read replicas, connection pooling, automated backups, and monitoring that pages when query latency crosses a threshold.</li>
            <li>A junior deploys code manually. A senior builds CI/CD pipelines, automated testing, staged rollouts, and rollback procedures.</li>
            <li>A junior handles the happy path. A senior handles the sad path: what happens when the payment provider is down, the user's session expires mid-transaction, or two requests try to update the same row at the same time.</li>
          </ul>
          <p>
            Bendigo Bank's Dan Corboy, in his own words, described the senior mindset: "We challenged every rule we had internally to see which ones actually made sense." That is not a junior's job. That requires enough experience to know which rules exist for good reasons and which ones are just habits that nobody questioned.
          </p>
          <p>
            The junior builds the spreadsheet. The senior decides what should be in the spreadsheet, who gets access, what happens when it grows too large, and when entire sheets should be archived or deleted.
          </p>

          <Divider />

          <h3 className="font-serif text-2xl font-semibold text-foreground mt-8">Backend Is Not the Engine Room. It Is the Whole Building.</h3>
          <p>
            I was wrong about backend engineering being the engine room where the "real" programmers lived. It is not a separate room at all. It is the plumbing, the electrical, the foundation, the locks on the doors, the filing cabinets, and the fire exits. It is everything you do not see when you walk into a building, but everything you notice instantly when it is broken.
          </p>
          <p>
            The reason it felt mysterious is because it is invisible by design. Good backend work means the user never thinks about it. They tap a button, money moves, data updates, the screen changes. The entire backend could be COBOL on a mainframe or Kubernetes pods on Google Cloud and the user experience is the same.
          </p>
          <p>
            What changed for me was realising that every system I had ever designed on the frontend had a mirror image on the backend, and the mirror was doing the same job: organising information, controlling access, and fighting entropy.
          </p>
          <p>
            The Lua scripts tracking voxel scavenger hunts. The wallet-to-email auth bridging. The AI memory management to stop burning credits. The January toy purge. They all have the same problem wearing different outfits.
          </p>
          <p>
            Backend is maintenance. And maintenance, as any mum or game developer or AI wrangler knows, (as I am all the above), is the real work that never ends.
          </p>

          <Divider />

          <footer className="text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground/70">Sources:</strong> Bank of America Q3 earnings call (infrastructure consolidation), CIO Dive BofA cloud strategy reporting, SWOTAnalysis.com BofA engineering analysis (Q2 2025), Bank of America Global Technology careers (mainframe COBOL requirements), Bendigo Bank/Google Cloud partnership announcement (Nov 2025), MongoDB/Bendigo Bank case study (Jun 2024), Bendigo Bank/Google Cloud digital banking migration (TechnologyDecisions.com.au), IBM/Bendigo Bank DevOps case study, Reuters COBOL banking infrastructure reporting, BizTech Magazine legacy IT analysis, Appinventiv banking modernisation research (Sep 2025).
            </p>
          </footer>
        </div>
      </article>
      <BlogPostNav currentSlug="backend-spreadsheets" />
    </PageLayout>
  );
}
