import { PageLayout } from '@/components/PageLayout';

const keyFacts = [
  { label: 'LOCATION', value: 'Victoria, Australia' },
  { label: 'PREVIOUSLY', value: 'San Francisco, CA' },
  { label: 'EXPERIENCE', value: '10+ years' },
  { label: 'FOCUS', value: 'UX, AI, Community' },
  { label: 'AVAILABILITY', value: 'Open to opportunities' },
];

const About = () => {
  return (
    <PageLayout>
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16">
        {/* Left Column - Bio */}
        <div>
          <span className="section-label block mb-6">About</span>
          
          <div className="space-y-6 body-text">
            <p>
              I'm Kasey — a Senior UX Designer and AI Full-Stack Developer who builds 
              interfaces, communities, and immersive digital experiences. After spending 
              over a decade honing my craft in the USA, I now call Australia home.
            </p>
            
            <p>
              I blend technical skills with creative vision to build digital products 
              that engage users and deliver business results. I thrive in environments 
              that balance clear direction with creative freedom — particularly in 
              entertainment, gaming, and innovative tech.
            </p>
            
            <p>
              My work spans product design, metaverse development, AR/VR, community 
              architecture, and AI-powered workflows. I'm passionate about advocating 
              for engineers and designers, translating user needs into product decisions, 
              and creating inclusive digital spaces where people genuinely connect.
            </p>
          </div>
        </div>

        {/* Right Column - Key Facts */}
        <div className="space-y-6">
          {keyFacts.map((fact) => (
            <div key={fact.label}>
              <span className="mono-label block mb-1">{fact.label}</span>
              <span className="font-sans text-base font-medium text-foreground">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
