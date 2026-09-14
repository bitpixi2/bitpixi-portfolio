import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import CaseStudyNav from '@/components/CaseStudyNav';
import voxelsImg from '@/assets/work/voxels.jpeg';
import voxelHotelImg from '@/assets/work/voxel-hotel.png';

const CaseStudyVirtualWorlds = () => {
  return (
    <PageLayout backTo="/work" backLabel="Back to Work">
      <span className="section-label block mb-4">Case Study</span>
      <h1 className="headline-section mb-4">Voxels</h1>
      <p className="mono-label mb-12">Product Designer & Community Manager</p>

      <div className="aspect-[16/9] border border-border mb-12 overflow-hidden">
        <img src={voxelHotelImg} alt="Voxels virtual world event" className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="max-w-[720px] mx-auto space-y-6 body-text mb-16">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Overview</h2>
        <p className="mono-label">Product Designer & Community Manager</p>
        <p>
          Embedded full-time with a small team (5–20) at{' '}
          <a href="https://www.voxels.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Voxels</a>{' '}
          (formerly Cryptovoxels), the first metaverse on the Ethereum blockchain. Reported to Head of Product{' '}
          <Link to="/testimonials" className="underline hover:text-foreground transition-colors">Benjy Larcher</Link>{' '}
          under founder Ben Nolan.
        </p>
        <p>
          Owned community strategy end-to-end: built governance structures, ran virtual events, created onboarding 
          tutorials, and designed in-world games. Led B2B feature integrations, improved new user onboarding flows, 
          and hired and managed cross-functional teams.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-foreground pt-4">Key Outcomes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Designed Scarcity Island, a gamification system that drove the platform's all-time-high sales month 
            (parcels at 1–4+ ETH, ~$4,800–$19,000+ USD each during peak ETH)
          </li>
          <li>
            Launched two firsts for the platform: Architect Island (pre-fab building kits) and VoxCon, a paid 
            creator program that compensated 24 top community builders
          </li>
          <li>
            Designed the original Voxels rebrand logo (purple/grey)
          </li>
        </ul>

        <h2 className="font-serif text-2xl font-semibold text-foreground pt-4">Impact</h2>
        <p>
          Applied deep knowledge of{' '}
          <Link to="/hobby#games" className="underline hover:text-foreground transition-colors">game economies and player motivation (see Favorite Games)</Link>{' '}
          to design governance experiments that directly drove platform revenue. The work positioned Voxels 
          within the $501M+ metaverse real estate market in 2021, and the community frameworks established 
          during this period carried forward, with multiple competing platforms ({' '}
          <a href="https://substrata.info/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Substrata</a>,{' '}
          <a href="https://www.niftyisland.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Nifty Island</a>,{' '}
          <a href="https://hyperfy.io/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Hyperfy</a>, and{' '}
          <a href="https://tmwstw.io/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">The Man Who Sold The World</a>
          ) later rewarding or hiring me to evolve the same playbook.
        </p>
      </div>

      <CaseStudyNav currentPath="/work/virtual-worlds" />
    </PageLayout>
  );
};

export default CaseStudyVirtualWorlds;
