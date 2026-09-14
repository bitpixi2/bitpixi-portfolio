import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { GlassStar } from '@/components/GlassStar';
import { useIsMobile } from '@/hooks/use-mobile';
import { SEO } from '@/components/SEO';

const SITE_URL = 'https://bitpixi.com';

const profilePageSchema = {
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: 'Kasey Robinson — Portfolio',
  mainEntity: { '@id': `${SITE_URL}/#person` },
};

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Senior UX Designer & Prompt Engineer"
        description="RISD/Tufts. 10+ years across UX, AI, and emerging platforms. Scaled Gfycat to 180M+ MAU. 3 AR patents acquired by Snap. Near Melbourne. Open to UX, DevRel, and AI roles."
        path="/"
        schemaNodes={[profilePageSchema]}
      />
      <Navigation />
      <Hero />
      <Footer />
      {!isMobile && <GlassStar />}
    </main>
  );
};

export default Index;
