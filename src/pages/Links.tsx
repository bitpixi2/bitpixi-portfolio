import { Star } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageLayout } from '@/components/PageLayout';
import francesSoongImg from '@/assets/frances-soong.jpg';
import hannaXuImg from '@/assets/hanna-xu.jpg';
import maximImg from '@/assets/maxim-leyzerovich.jpeg';

const linkGroups = [
  {
    category: 'FAVORITE BOOKS',
    links: [
      { name: 'Designing for the Digital Age', url: 'https://amzn.to/4r815Gg', heart: true },
      { name: 'Universal Methods of Design', url: 'https://amzn.to/3Mw9bcQ', heart: true },
      { name: 'Strategic Writing for UX', url: 'https://amzn.to/4tmL1Ch', heart: true },
    ],
  },
  {
    category: 'DESIGN & CODE STANDARDS',
    links: [
      { name: 'iOS - Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines' },
      { name: 'Android - Material Design Guidelines', url: 'https://m3.material.io' },
      { name: 'Web Content Accessibility Guidelines (WCAG)', url: 'https://www.w3.org/TR/WCAG22/' },
    ],
  },
  {
    category: 'LATEST VIBE CODE TOOLS',
    links: [
      { name: 'Lovable', url: 'https://lovable.dev/invite/U3AHBDF', heart: true },
      { name: 'Replit', url: 'https://replit.com/refer/kaseybitpixi', heart: true },
      { name: 'OpenClaw', url: 'https://openclaw.com' },
      { name: 'Codex', url: 'https://openai.com/index/codex/' },
    ],
  },
  {
    category: 'DESIGNER RESOURCES',
    links: [
      { name: 'Whimsical', url: 'https://whimsical.com' },
      { name: 'Figma Free UI Kits', url: 'https://www.figma.com/community/ui-kits?resource_type=files&editor_type=figma&price=all&sort_by=all_time' },
      { name: 'Sketch App Sources', url: 'https://www.sketchappsources.com' },
      { name: 'Website Style Guide Resources', url: 'https://styleguides.io' },
    ],
  },
  {
    category: 'FAVORITE UX BLOGS',
    links: [
      { name: 'UX Collective', url: 'https://uxdesign.cc' },
      { name: 'The Design Team', url: 'https://thedesignteam.io' },
    ],
  },
  {
    category: 'PRODUCTIVITY TOOLS',
    links: [
      { name: 'OnTogether Virtual CoWorking', url: 'https://store.steampowered.com/app/3707400/OnTogether_Virtual_CoWorking/' },
      { name: 'Focusmate', url: 'https://www.focusmate.com' },
    ],
  },
  {
    category: 'PRODUCTS INSPIRATION',
    links: [
      { name: 'Product Hunt', url: 'https://www.producthunt.com' },
      { name: 'Case Study Club', url: 'https://www.casestudy.club' },
    ],
  },
  {
    category: 'STAND UP FOR YOUR WORK',
    links: [
      { name: 'No!Spec', url: 'https://www.nospec.com' },
      { name: 'Dark Patterns', url: 'https://www.deceptive.design' },
    ],
  },
];

const designers = [
  {
    name: 'Frances Soong',
    image: francesSoongImg,
    url: 'https://web.archive.org/web/20150525010653/http://francessoong.com/',
    bio: 'Frances Soong was a Bay Area visual UX designer, product consultant, and live sketchnotes artist. A Carnegie Mellon Communication Design graduate and Presidential Scholar, she worked across interaction, brand, and front-end prototyping. She led mobile web and style guide work at Credit Sesame, designed key Android releases at Cisco WebEx, and delivered digital concepts for Fortune 500 clients at Roundarch Isobar. Alongside her roles, she quietly advised stealth and seed-stage founders, offering thoughtful, supportive UX guidance. She described herself simply: "designer. artist. thinker. dreamer. person. I like to make connections."\n\nRIP Frances Soong.',
  },
  {
    name: 'Maxim Leyzerovich',
    image: maximImg,
    url: 'https://www.linkedin.com/in/round/',
    bio: 'Maxim Leyzerovich (@round) is a Brooklyn-based designer, educator, and writer with 20+ years across startups, agencies, and major companies. Currently at FLORA building a new paradigm for creative practice, he previously worked at Amtrak Innovation and Capital One, and was principal designer at nclud and the first designer at Rosetta Stone. He teaches at GWU, MICA, and SVA, speaks widely on design and AI, and is known for sharp cultural commentary online. We never actually met, but he invited me to speak at a UX conference in 2019 and I always love his writing style.',
  },
  {
    name: 'Hanna Xu',
    image: hannaXuImg,
    url: 'https://hannaxu.com/',
    bio: 'Hanna Xu is a Senior Product Designer at Apple, where she\'s been since December 2019, serving as Design DRI for tentpole projects within Business Connect and Ad Platforms. Before Apple, she was Product Design Lead at Gfycat (2016–2019). She co-founded FortyWings and designed Buzz, a messaging app that landed a TechCrunch feature, hit #12 on Apple\'s Top Free Social Networking Apps, and was named an Apple Best New App. Earlier in her career she was lead designer at Locket (acquired by Wish) and a product designer at Tango. A Washington University in St. Louis grad with 12+ years of experience, Hanna specializes in messaging, video, brand management, and advertising. She\'s also an illustrator who loves corgis. I liked working with her at Gfycat.',
  },
];

const SectionDivider = () => (
  <div className="flex items-center gap-3 my-16 md:my-20">
    <div className="flex-1 h-px bg-border" />
    <Star size={8} className="text-muted-foreground/30 fill-muted-foreground/30" />
    <Star size={12} className="text-muted-foreground/30 fill-muted-foreground/30" />
    <Star size={8} className="text-muted-foreground/30 fill-muted-foreground/30" />
    <div className="flex-1 h-px bg-border" />
  </div>
);

const Links = () => {
  return (
    <PageLayout>
      <SEO
        title="Links"
        description="Kasey Robinson's curated links: UX books, design standards, vibe coding tools, designer resources, productivity apps, and design inspiration for product designers."
        path="/links"
      />
      <span className="section-label block mb-4">Links</span>
      <h1 className="headline-section mb-2">Design & Code Inspiration Links</h1>
      <p className="text-xs text-muted-foreground mb-10 flex items-center gap-1.5">
        <Star size={10} className="text-muted-foreground/40 fill-muted-foreground/40 inline-block" />
        = I earn a small referral at no extra cost to you
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {linkGroups.map((group) => (
          <div key={group.category}>
            <span className="mono-label block mb-3">{group.category}</span>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.name} className="flex items-center gap-1.5">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-foreground hover:text-secondary transition-colors underline underline-offset-4 decoration-border hover:decoration-secondary"
                  >
                    {link.name}
                  </a>
                  {'heart' in link && link.heart && (
                    <Star size={10} className="text-muted-foreground/40 fill-muted-foreground/40 flex-shrink-0" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionDivider />

      {/* Favorite Design Peers Section */}
      <div>
        <h2 className="headline-section mb-10">A Few Design Peers</h2>
        <div className="space-y-12">
          {designers.map((designer) => (
            <div key={designer.name} className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="w-full md:w-48 flex-shrink-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={designer.image}
                    alt={designer.name}
                    className="w-full h-full object-cover photo-grayscale"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="headline-sub mb-3">
                  {designer.url ? (
                    <a
                      href={designer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                    >
                      {designer.name}
                    </a>
                  ) : (
                    designer.name
                  )}
                </h3>
                <p className="body-secondary leading-relaxed">{designer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Favorite Work Focus Music */}
      <div>
        <h2 className="headline-section mb-10">My Work Focus Soundtracks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/JRnDYB28bL8?start=10"
                title="Work Focus Music 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs italic text-muted-foreground mt-2">Severance — Music To Refine To feat. ODESZA | Apple TV</p>
          </div>
          <div>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/voPbUcgcrqg?start=2932"
                title="Work Focus Music 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs italic text-muted-foreground mt-2">🍓 strawberry kiwi — frutiger aero x y2k nostalgic futurism - jungle tech DnB mix 🥝</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Links;
