import { useState, useEffect, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import kaseyPhoto from '@/assets/kasey-robinson.jpg';

function HintBadge() {
  const offsets = useMemo(() => ({
    s1x: -10 + Math.random() * 6 - 3,
    s1y: -12 + Math.random() * 4 - 2,
    s2x: 10 + Math.random() * 6 - 3,
    s2y: -12 + Math.random() * 4 - 2,
    s3y: 10 + Math.random() * 4 - 2,
  }), []);

  const star = (cx: number, cy: number, r: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.45;
      pts.push(`${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`);
    }
    return pts.join(' ');
  };

  return (
    <div className="w-60 h-60 rounded-full border border-border flex items-center justify-center cursor-default">
      <svg width="64" height="64" viewBox="-32 -32 64 64">
        <line x1={offsets.s1x} y1={offsets.s1y} x2={0} y2={offsets.s3y} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
        <line x1={offsets.s2x} y1={offsets.s2y} x2={0} y2={offsets.s3y} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
        <polygon points={star(offsets.s1x, offsets.s1y, 6)} fill="hsl(var(--muted-foreground))" opacity="0.3" />
        <polygon points={star(offsets.s2x, offsets.s2y, 6)} fill="hsl(var(--muted-foreground))" opacity="0.3" />
        <polygon points={star(0, offsets.s3y, 9)} fill="hsl(var(--muted-foreground))" opacity="0.4" />
      </svg>
    </div>
  );
}

export function Hero() {
  const [photoColor, setPhotoColor] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler = (e: Event) => {
      const { overlapping } = (e as CustomEvent).detail;
      setPhotoColor(overlapping);
    };
    window.addEventListener('star-overlap', handler);
    return () => window.removeEventListener('star-overlap', handler);
  }, []);

  return (
    <section className="pt-32 pb-12 md:pb-16">
      <div className="max-w-content mx-auto px-6">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16 items-start">
          {/* Left Column - Text */}
          <div className="fade-in-up">
            <span className="section-label block mb-6">
              Senior UX Designer & Prompt Engineer
            </span>

            {/* Mobile only: photo + caption right after heading */}
            {isMobile && (
              <div className="mb-8">
                <div className="overflow-hidden">
                  <img
                    src={kaseyPhoto}
                    alt="Kasey Robinson"
                    className="w-full h-auto photo-grayscale"
                  />
                </div>
                <p className="text-xs italic text-muted-foreground mt-2">
                  Here's what I would look like, working at your company.
                </p>
              </div>
            )}
            
            <h1 className="headline-display text-3xl md:text-4xl lg:text-[44px] mb-8 italic">
              Design. Code. Games.<br className="mb-2" />
              <span className="block mt-2">Making tech feel like home.</span>
            </h1>
            
            <p className="body-text text-muted-foreground max-w-[480px] mb-4">
              RISD/Tufts alum with 10+ years across UX, machine learning, and emerging platforms. 
              Scaled Gfycat from 80M to 180M+ MAU, earned 3 AR patents acquired by Snap, and 
              shipped the top-revenue feature for Meitu (450M+ MAU). US citizen based near 
              Melbourne, Australia.
            </p>

            <p className="body-text text-muted-foreground max-w-[480px] mb-8">
              Open to permanent roles in Melbourne, hybrid APAC, or remote with a US team on UX 
              design, DevRel, community strategy, or AI. Somewhere with real problems, clear 
              direction, and room to build something good.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a href="/work" className="text-sm font-medium group/cta inline-flex items-center gap-1">
                <span className="link-animated">View selected work</span> <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
              </a>
              <a href="/hire-me" className="text-sm font-medium group/cta inline-flex items-center gap-1">
                <span className="link-animated">Hire me</span> <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right Column - Photo + HintBadge (desktop only) */}
          {!isMobile && (
            <div className="fade-in-up delay-200 order-first md:order-last">
              <div>
                <div className="overflow-hidden">
                  <img
                    data-photo
                    src={kaseyPhoto}
                    alt="Kasey Robinson"
                    className={`w-full h-auto transition-all duration-600 ease-out ${
                      photoColor ? 'grayscale-0 scale-[1.02]' : 'photo-grayscale'
                    }`}
                  />
                </div>
                <p className="text-xs italic text-muted-foreground mt-2">
                  Here's what I would look like, working at your company.
                </p>
                <div className="flex justify-center mt-6">
                  <HintBadge />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
