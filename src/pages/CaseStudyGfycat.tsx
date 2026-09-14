import { PageLayout } from '@/components/PageLayout';
import CaseStudyNav from '@/components/CaseStudyNav';
import gfycatHeroImg from '@/assets/work/gfycat-hero.png';

const CaseStudyGfycat = () => {
  return (
    <PageLayout backTo="/work" backLabel="Back to Work">
      <span className="section-label block mb-4">Case Study</span>
      <h1 className="headline-section mb-4">Gfycat / Snap</h1>
      <p className="mono-label mb-12">Senior Product Designer · Jul 2017–May 2018 · Multi-product Portfolio</p>

      <div className="border border-border mb-12 overflow-hidden">
        <img src={gfycatHeroImg} alt="Gfycat platform" className="w-full h-auto object-contain" />
      </div>

      <div className="max-w-[720px] mx-auto space-y-6 body-text mb-16">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Overview</h2>
        <p className="mono-label">Senior Product Designer</p>
        <p>
          Performed a complete rebrand and redesign across iOS, Android, and Web for Gfycat,
          one of the largest GIF platforms in the world. Worked under design manager Hanna Xu,
          reporting to CEO Richard Rabbat, on a tight team of 10–15. My design work was re-used
          for RedGIFs, an adult content platform spun off to meet platform compliance requirements.
          Created stakeholder pitch decks and B2B integration mockups for partnership meetings
          with Niantic, Twitch, MGM Studios, Lionsgate, Netflix, and Gmail.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-foreground pt-4">Key Outcomes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Shipped full iOS/Android/Web redesign that scaled MAU from 80M to 180M+</li>
          <li>Awarded 3 US augmented reality patents</li>
          <li>Platform successfully acquired by Snap Inc.</li>
          <li>Despite Snap sunsetting Gfycat post-acquisition, RedGIFs remains independently active and revenue-generating</li>
          <li>Designed pitch materials and integration concepts for partnerships with major entertainment and tech brands</li>
        </ul>

        <h2 className="font-serif text-2xl font-semibold text-foreground pt-4">Approach</h2>
        <p>
          Unified a fragmented brand experience across three platforms while the underlying
          technology quietly served WebM instead of actual GIFs, delivering superior quality
          and compression without users ever noticing the difference. Researched and re-built
          the branding to be around video focus and immersion.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-foreground pt-4">Impact</h2>
        <p>
          The redesign directly contributed to a 125% increase in monthly active users and
          positioned Gfycat for acquisition by Snap. The work demonstrated that a small,
          focused design team could ship a cohesive cross-platform overhaul at scale while
          navigating sensitive product segmentation challenges.
        </p>
      </div>


      <CaseStudyNav currentPath="/work/gfycat" />
    </PageLayout>
  );
};

export default CaseStudyGfycat;
