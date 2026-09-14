import { PageLayout } from '@/components/PageLayout';
import { SEO } from '@/components/SEO';
import { useState, useRef, useCallback } from 'react';
import { FallingStars } from '@/components/FallingStars';
import { useIsMobile } from '@/hooks/use-mobile';
import benjyPhoto from '@/assets/benjy-larcher.jpeg';
import danPhoto from '@/assets/dan-enright.jpeg';

const testimonials = [
  {
    quote:
      "Kasey played a key role in shaping and delivering new features that are loved by the community. She has a knack for turning complex ideas into polished, functional tools that improved the user experience for everyone. During her time at Voxels, Kasey wore many hats and was a core contributor across design, feature development, and community engagement. She never disappointed, performed across timezones and always went out of her way for the team.",
    name: 'Benjy Larcher',
    title: 'Developer & Product Owner / Manager',
    company: 'Voxels (formerly CryptoVoxels)',
    photo: benjyPhoto,
    linkedin: 'https://www.linkedin.com/in/benjaminmclarcher/',
    brighten: false,
    zoomClass: 'group-hover/photo:scale-[3] group-hover/photo:translate-y-[45%]',
  },
  {
    quote:
      "Kasey's skill in distilling ideas and presenting them across diverse formats for designs and tutorials was invaluable. Each announcement was carefully crafted, with writing and visuals thoughtfully considered, yet also adapted to meet the evolving needs of each user base… Her background in product design enabled her to inform developers of any design changes that could help communicate information more clearly.",
    name: 'Dan Enright',
    title: 'Sr. Developer / Manager',
    company: 'LightLink',
    photo: danPhoto,
    linkedin: 'https://www.linkedin.com/in/danenright/',
    brighten: true,
    zoomClass: 'group-hover/photo:scale-[3]',
  },
];

const Testimonials = () => {
  const [hoverCounts, setHoverCounts] = useState<number[]>([0, 0]);
  const [targetRects, setTargetRects] = useState<(DOMRect | null)[]>([null, null]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimers = useRef<(ReturnType<typeof setTimeout> | null)[]>([null, null]);

  const isMobile = useIsMobile();

  const handleMouseEnter = useCallback((index: number) => {
    if (isMobile) return;
    if (hoverTimers.current[index]) clearTimeout(hoverTimers.current[index]!);
    hoverTimers.current[index] = setTimeout(() => {
      const el = cardRefs.current[index];
      if (el) {
        setTargetRects((prev) => {
          const next = [...prev];
          next[index] = el.getBoundingClientRect();
          return next;
        });
        setHoverCounts((prev) => {
          const next = [...prev];
          next[index] = prev[index] + 1;
          return next;
        });
      }
    }, 0);
  }, [isMobile]);

  const handleMouseLeave = useCallback((index: number) => {
    if (isMobile) return;
    if (hoverTimers.current[index]) {
      clearTimeout(hoverTimers.current[index]!);
      hoverTimers.current[index] = null;
    }
  }, [isMobile]);

  const handleTap = useCallback((index: number) => {
    if (!isMobile) return;
    const el = cardRefs.current[index];
    if (el) {
      setTargetRects((prev) => {
        const next = [...prev];
        next[index] = el.getBoundingClientRect();
        return next;
      });
      setHoverCounts((prev) => {
        const next = [...prev];
        next[index] = prev[index] + 1;
        return next;
      });
    }
  }, [isMobile]);

  return (
    <PageLayout>
      <SEO
        title="Testimonials"
        description="What colleagues say about working with Kasey Robinson — Senior UX Designer. Recommendations from leads at Voxels and LightLink."
        path="/testimonials"
      />
      {testimonials.map((_, i) => (
        <FallingStars key={i} triggerCount={hoverCounts[i]} targetRect={targetRects[i]} starScale={0.42} starDepth={1.75} />
      ))}
      <div className="flex items-start justify-between mb-12">
        <span className="section-label block">Testimonials</span>
        <p className="body-secondary italic text-muted-foreground max-w-[300px] text-right text-sm leading-snug -mt-1">
          Professional references available upon request from the individuals below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            onClick={() => handleTap(i)}
            className="border border-border p-8 md:p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-secondary/50"
          >
            {/* Attribution */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 group/photo"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-border">
                  <img
                    src={t.photo}
                    alt={t.name}
                    loading="lazy"
                    className={`w-full h-full object-cover grayscale transition-all duration-300 group-hover/photo:[image-rendering:pixelated] group-hover/photo:blur-[0.5px] group-hover/photo:contrast-150 ${t.zoomClass} ${
                      t.brighten ? 'brightness-110' : ''
                    }`}
                  />
                </div>
              </a>
              <div>
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl font-semibold text-foreground hover:text-muted-foreground transition-colors"
                >
                  {t.name}
                </a>
                <span className="body-secondary block mt-0.5">{t.title}</span>
                <span className="mono-label block mt-1">{t.company}</span>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="body-text italic leading-[1.9]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Testimonials;
