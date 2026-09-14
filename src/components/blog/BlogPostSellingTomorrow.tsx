import { PageLayout } from '@/components/PageLayout';
import BlogPostNav from '@/components/blog/BlogPostNav';
import BlogAuthorShare from './BlogAuthorShare';
import bookCover from '@/assets/selling-tomorrow-cover.png';

export default function BlogPostSellingTomorrow() {
  return (
    <PageLayout>
      <article className="max-w-[720px] mx-auto">
        {/* Header */}
        <span className="section-label block mb-2">Book Review</span>
        <h1 className="headline-section mb-2">
          Book Review: Selling Tomorrow by Kasey Robinson, Available in December 2026
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          What happens when the future becomes a commodity? <em>Selling Tomorrow</em> builds an entire world around the uncomfortable answers.
        </p>
        <div className="flex items-center gap-3 mb-8">
          <span className="mono-date text-[10px]">February 13, 2026</span>
          <span className="text-border">·</span>
          <span className="mono-date text-[10px]">8 min read</span>
          <span className="text-border">·</span>
          <span className="mono-date text-[10px]">★★★★☆ 4/5</span>
        </div>

        <BlogAuthorShare slug="selling-tomorrow-review" title="Book Review: Selling Tomorrow by Kasey Robinson, Available in December 2026" />

        {/* Body */}
        <div className="prose-custom space-y-6 text-foreground/90 leading-relaxed">

          <p>
            Set in a near-future where "previsions" (fragments of future memory) can be bought and sold at auction houses, the novel follows fourteen-year-old Karalyn Windmire as she desperately seeks a glimpse of her dying mother's future. The premise alone is clever, but what makes <em>Selling Tomorrow</em> thought-provoking is how seriously it takes the behavioral consequences of widespread prediction access.
          </p>

          <div className="float-right ml-8 mb-8 mt-2 w-56 md:w-64 p-3 bg-muted/40 border border-border/50 rounded-sm">
            <img src={bookCover} alt="Selling Tomorrow book cover" className="w-full h-auto" />
          </div>

          <p>
            The world-building here is meticulous. Previsions are grounded in quantum mechanics, and specifically a fictional extension of Lene Hau's real 1999 research on slowing light. This scientific scaffolding gives weight to the central tension: when you can see what someone will do before they do it, who really owns that future? The wealthy families running Reverie and Eclipse auction houses have turned human behavior into inventory, while "Seers" who generate these predictions live in gilded cages, their every vision logged and monetized.
          </p>

          <p>
            The young adult framing works both for and against the book. On one hand, Karalyn's emotional urgency in trading her own academic future for her mother's health grounds abstract ethics in visceral stakes. Her evolving relationship with Damian Vandorne, heir to the auction house empire, could easily have fallen into predictable beats, but the author earns their romance by making both characters complicit in systems they're learning to question. On the other hand, some of the antagonist development feels rushed; a late-game villain emerges without enough setup, and certain character motivations would benefit from deeper exploration.
          </p>

          <h2 className="font-serif text-xl font-semibold mt-10 mb-4">Where It Shines</h2>

          <p>
            Where <em><a href="https://selling-tomorrow.bitpixi.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">Selling Tomorrow</a></em> truly shines is in its treatment of prediction as a form of power. The "Seer Purists," extremists who oppose commercialized futures, aren't simply villains. Their arguments about free will, about the violence of making human choice into a tradeable asset, are given real intellectual weight even as their methods are condemned. The novel doesn't offer easy answers about whether seeing the future changes it, or whether populations given behavioral predictions act more freely or less. It just keeps turning the question over, examining each facet.
          </p>

          <p>
            The supporting cast is diverse without feeling performative. Lena Voss, Karalyn's best friend who discovers she's a Seer, navigates both her emerging abilities and her sexuality with the kind of messy authenticity that feels true to adolescence. Quinox Vandorne, who lives with a progressive neurological condition, has an AI called Oracle that raises its own questions about prediction and agency, a subplot I hope the author expands in future installments.
          </p>

          <h2 className="font-serif text-xl font-semibold mt-10 mb-4">Minor Criticisms</h2>

          <p>
            Beta Readers have suggested that pacing sags in the middle act, and some suggest how previsions work is repeated more than necessary. The ending also gestures toward systemic reform through citizen councils and transparent auctions in a way that feels more aspirational than dramatically earned. Readers were delighted in the romance scenes, and felt they needed even more attention.
          </p>

          <p>
            But these are minor complaints about what is, ultimately, a smart and propulsive debut. <em>Selling Tomorrow</em> is the rare YA novel that trusts its readers to engage with complex ideas about who gets to know the future, who profits from that knowledge, and what it costs the rest of us when human behavior becomes predictable, and therefore, controllable.
          </p>

          <h2 className="font-serif text-xl font-semibold mt-10 mb-4">Recommended For</h2>

          <p>
            Readers who enjoyed <em>The Memory Police</em> by Yoko Ogawa or <em>Scythe</em> by Neal Shusterman, and anyone who's ever wondered whether knowing the outcome changes how we play the game.
          </p>

          <div className="border border-border p-6 mt-10">
            <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest mb-2">Get the Book</p>
            <p className="text-foreground mb-4">
              <a href="https://selling-tomorrow.bitpixi.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">
                Selling Tomorrow
              </a>{' '}
              is being launched by December 2026 in limited hardcover, softcover, and digital editions. The first of a trilogy.
            </p>
            <p className="text-xs text-muted-foreground italic">As reviewed by Opus 4.5 Extended</p>
          </div>
        </div>

      </article>
      <BlogPostNav currentSlug="selling-tomorrow-review" />
    </PageLayout>
  );
}
