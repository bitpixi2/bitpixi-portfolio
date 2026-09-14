import { PageLayout } from '@/components/PageLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { SEO } from '@/components/SEO';
import voxelsImg from '@/assets/work/voxels.jpeg';
import gfycatImg from '@/assets/work/gfycat.png';
import meituImg from '@/assets/work/meitu-sailor.jpeg';

const caseStudies = [
  {
    title: 'Meitu',
    subtitle: 'UX Design · AR · China',
    tagline: 'Designed AR try-on that became the #1 revenue feature across 23 apps and 450M+ users.',
    image: meituImg,
    slug: 'meitu',
    align: 'left' as const,
  },
  {
    title: 'Gfycat / Snap',
    subtitle: 'Multi-product · Full Platform Overhaul',
    tagline: 'Full platform redesign across iOS, Android, and web. 80M → 180M+ MAU. 3 AR patents. Acquired by Snap.',
    image: gfycatImg,
    slug: 'gfycat',
    align: 'right' as const,
  },
  {
    title: 'Voxels',
    subtitle: 'Product Design · Community',
    tagline: 'Gamification and community design that drove Voxels\' all-time-high sales month with parcels at up to 4+ ETH.',
    image: voxelsImg,
    slug: 'virtual-worlds',
    align: 'left' as const,
  },
];

const brands = [
  { name: 'Lovable', description: 'AI in the Outback hackathon sponsor and event partner, via Hackeroos.' },
  { name: 'ElevenLabs', description: 'Spooky Reddit Game Jam partnership, via Hackeroos.' },
  { name: 'MGM', description: 'Entertainment studio digital experience design.' },
  { name: 'Netflix', description: 'Entertainment platform design collaboration.' },
  { name: 'Niantic', description: 'AR gaming experience design.' },
  { name: 'Twitch', description: 'Livestreaming platform design collaboration.' },
];

const BrandMarquee = () => {
  const [activeBrand, setActiveBrand] = useState<typeof brands[0] | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleBrandClick = (brand: typeof brands[0]) => {
    if (activeBrand?.name === brand.name) {
      setActiveBrand(null);
      setIsPaused(false);
    } else {
      setActiveBrand(brand);
      setIsPaused(true);
    }
  };

  return (
    <div className="relative">
      {activeBrand && (
        <div className="mb-6 border border-border p-6 relative fade-in-up">
          <button
            onClick={() => { setActiveBrand(null); setIsPaused(false); }}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{activeBrand.name}</h3>
          <p className="body-secondary">{activeBrand.description}</p>
        </div>
      )}

      <div className="overflow-hidden border-t border-b border-border py-6">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: isPaused ? 'none' : 'marquee 20s linear infinite' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { if (!activeBrand) setIsPaused(false); }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <button
              key={`${brand.name}-${i}`}
              onClick={() => handleBrandClick(brand)}
              className={`font-serif text-2xl md:text-3xl font-light transition-colors duration-200 shrink-0 ${
                activeBrand?.name === brand.name
                  ? 'text-foreground'
                  : 'text-muted-foreground/40 hover:text-foreground'
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  return (
    <PageLayout>
      <SEO
        title="Work"
        description="Case studies from Kasey Robinson: Gfycat (80M → 180M MAU, acquired by Snap), Meitu AR try-on for 450M+ users, and Voxels virtual world gamification. Senior UX Designer with 10+ years."
        path="/work"
      />
      <span className="section-label block mb-4">Selected Work</span>
      <h1 className="headline-section mb-16">Case Studies</h1>

      <div className="space-y-16 md:space-y-24">
        {caseStudies.map((study) => (
          <div
            key={study.title}
            className={`flex flex-col ${
              study.align === 'right' ? 'md:items-end' : 'md:items-start'
            }`}
          >
            <Link
              to={`/work/${study.slug}`}
              className="group block w-full md:w-[56%]"
            >
              <div className="aspect-square bg-muted/30 border border-border mb-4 overflow-hidden group-hover:border-foreground transition-colors">
                <img
                  src={study.image}
                  alt={study.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="mono-label block mb-1">{study.subtitle}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                {study.title}
              </h3>
              <p className="body-secondary text-sm">{study.tagline}</p>
            </Link>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Work;
