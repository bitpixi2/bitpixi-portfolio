import voxelsImg from '@/assets/work/voxels.jpeg';
import gfycatImg from '@/assets/work/gfycat.png';
import meituImg from '@/assets/work/meitu.png';

const caseStudies = [
  {
    title: 'Virtual Worlds',
    subtitle: 'Voxels · Substrata · LightLink',
    tagline: 'Community-driven metaverse design, gamification mechanics, and blockchain infrastructure that drove all-time-high sales.',
    image: voxelsImg,
    align: 'left' as const,
  },
  {
    title: 'Gfycat / RedGIFs',
    subtitle: 'Full Platform Overhaul → Successful Exit',
    tagline: 'Complete iOS, Android, and Web redesign. Scaled 80M to 180M+ MAU. 3 AR patents. Acquired by Snapchat.',
    image: gfycatImg,
    align: 'right' as const,
  },
  {
    title: 'Meitu',
    subtitle: 'Global Purchasing Power',
    tagline: 'AR try-on-buy filter became the #1 earning feature across 23 apps. 450M+ monthly active users worldwide.',
    image: meituImg,
    align: 'left' as const,
  },
];

export function WorkSection() {
  return (
    <section id="work" className="py-section-mobile md:py-section">
      <div className="max-w-content mx-auto px-6">
        <span className="section-label block mb-4">Selected Work</span>
        <h2 className="headline-section mb-16">Case Studies</h2>

        <div className="space-y-20 md:space-y-28">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className={`group flex flex-col ${
                study.align === 'right' ? 'md:items-end' : 'md:items-start'
              }`}
            >
              <div className="w-full md:w-[85%]">
                <div className="aspect-[16/10] bg-muted/30 border border-border mb-6 overflow-hidden group-hover:border-foreground transition-colors">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <span className="mono-label block mb-2">{study.subtitle}</span>
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
                  {study.title}
                </h3>
                <p className="body-secondary max-w-[520px]">{study.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
