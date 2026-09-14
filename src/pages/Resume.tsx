import { PageLayout } from '@/components/PageLayout';
import { Download } from 'lucide-react';
import { SEO } from '@/components/SEO';

const education = [
  {
    school: "DesignLab's UX Academy",
    location: 'Remote, USA',
    degree: 'Certificate in User Experience Design',
    date: 'Summer 2016',
  },
  {
    school: 'Tufts University & SMFA',
    location: 'Boston, MA, USA',
    degree: 'Bachelor of Fine Arts',
    date: '2007 – 2011',
  },
  {
    school: 'Rhode Island School of Design',
    location: 'Providence, RI, USA',
    degree: 'Certificate in Art and Design',
    date: 'Summer 2006',
  },
];

const experiences = [
  {
    company: 'Australian Bureau of Statistics',
    role: 'Inclusive Strategies Census Engagement Manager',
    location: 'VIC, Australia',
    date: 'April 2026 – Current',
    bullets: [
      'Managing targeted engagement strategies to increase Census participation among culturally diverse, remote, and vulnerable communities.',
      'Building partnerships with community leaders and organisations, delivering culturally sensitive outreach programs, and developing events in regional areas to boost awareness and participation.',
      'Independently developing internal workflows and tooling to support operational efficiency and enable future transition into technical team contributions.',
    ],
  },
  {
    company: 'Hackeroos',
    role: 'Founder',
    location: 'VIC, Australia',
    date: 'May 2025 – Current',
    bullets: [
      'Built a 2,000+ member community for hackathons, Aussie tech news, and jobs.',
      'TechVisa grant winner in Catalysr Accelerator (2025) and 5x mentor in the Practera program.',
      'Held hackathon events on AI, gaming, big data, and hardware in Australia.',
      'Secured close collaborations with Lovable, ElevenLabs, OpenAI, MLAI AUS, and Antler.',
    ],
  },
  {
    company: 'Career Break',
    role: 'Travel & Relocation',
    location: 'US, NZ, Bali, Fiji, Aus',
    date: 'Jul 2024 – Apr 2025',
    bullets: [
      'Relocated internationally, completed requirements for permanent work rights in Australia.',
      'Continued independent study in UX, AI tools, and full-stack development.',
      'Authored and illustrated a 60,000+ word teen sci-fi novel for self-publication.',
    ],
  },
  {
    company: 'LightLink',
    role: 'Community Manager & Product Designer',
    location: 'Remote',
    date: 'Mar 2024 – Jun 2024',
    bullets: [
      'Improved blockchain dashboard UX; created virtual world events and digital asset designs.',
      'Wrote a 12-chapter narrative to strengthen brand identity and user connection.',
      'Launched and managed an Ambassador Program, training a team to streamline customer support.',
    ],
  },
  {
    company: 'Pellar Technologies',
    role: 'Community Manager & Designer',
    location: 'Remote',
    date: 'Sep 2023 – Feb 2024',
    bullets: [
      'Consulted across various blockchain, tech, and marketplace projects.',
      'Delivered UX, social media, and design support to improve community engagement.',
    ],
  },
  {
    company: 'Voxels (formerly CryptoVoxels)',
    role: 'Community Manager & Product Designer',
    location: 'Remote',
    date: 'Aug 2021 – May 2023',
    bullets: [
      'Directed product design, events, and avatar/land design, driving record virtual land sales.',
      "Designed 'Scarcity Island' gamified event, leading to all-time sales records.",
      'Created games, new features, and strategies that boosted user retention and engagement.',
      'Collaborated with engineers to improve 3D file interoperability and usability.',
    ],
  },
  {
    company: 'Designlab',
    role: 'UX Mentor',
    location: 'Remote',
    date: 'Apr 2019 – Apr 2020',
    bullets: [
      'Mentored 100+ students in User Experience Design bootcamps.',
      'Provided feedback on portfolios, prototypes, and career preparation.',
    ],
  },
  {
    company: 'Gfycat (acquired by Snap Inc.)',
    role: 'Senior Product Designer',
    location: 'Palo Alto, CA',
    date: 'Jul 2017 – May 2018',
    bullets: [
      'Increased MAU from 80M to 180M through modern Web, iOS, and Android UI.',
      'Invented AR tools; co-authored 3 AR-related patents.',
      'Integrated platform with Gmail, Meta (Facebook), and Hollywood partnerships.',
    ],
  },
  {
    company: 'Meitu',
    role: 'User Experience Designer',
    location: 'Palo Alto, CA & Xiamen, China',
    date: 'Mar 2017 – Jul 2017',
    bullets: [
      'Co-designed top-grossing AR filter and global website, contributing to 450M+ user reach.',
      'Localized UX/UI strategy, and optimized machine learning–driven flows.',
      'Enhanced inclusivity of product design, improving user experience and increasing revenue.',
    ],
  },
  {
    company: 'Minted',
    role: 'Design Associate & Quality Control',
    location: 'Oakland, CA',
    date: 'Oct 2015 – Sep 2016',
    bullets: [
      'Produced and reviewed over 10,000 design orders with consistent high quality.',
      'Trained and managed offshore production team for specialty orders.',
    ],
  },
];

const skillGroups = [
  { category: 'TECHNICAL', items: 'HTML, CSS, Tailwind, JavaScript, React, Next.js, TypeScript, Python, SQL, AI Tools' },
  { category: 'DESIGN & RESEARCH', items: 'UX, UI, User Research, Product Design, Wireframing, Prototyping, Usability Testing, Design Systems, Figma, Adobe CC' },
  { category: 'CERTIFICATIONS', items: 'Catalysr Accelerator (2025), UX Design Certificate (DesignLab)' },
  { category: 'ACTIVITIES', items: 'Hackathon Winner (AngelHack SF), Hackathon Finalist (YC Hacks)' },
];

const Resume = () => {
  return (
    <PageLayout>
      <SEO
        title="Résumé"
        description="Kasey Robinson's résumé: Senior UX Designer & Prompt Engineer. Gfycat, Snap, Meitu, Voxels. RISD/Tufts. 10+ years in UX, AI, and emerging platforms. Based near Melbourne, Australia."
        path="/resume"
      />
      {/* Header with download button */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <span className="section-label block mb-4">Résumé</span>
          <h1 className="headline-section">Kasey Robinson</h1>
        </div>
        <a
          href="/KaseyJRobinson_CV.pdf"
          download
          className="flex items-center gap-2 font-sans text-sm uppercase tracking-label font-medium text-foreground hover:text-muted-foreground transition-colors border border-border px-4 py-2 mt-2"
        >
          <Download size={16} />
          Resume PDF
        </a>
      </div>

      {/* Education */}
      <section className="mb-20">
        <h2 className="headline-section text-[28px] mb-10">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((ed) => (
            <div key={ed.school} className="resume-entry">
              <h3 className="font-sans text-lg font-semibold text-foreground mb-1">
                {ed.school}
              </h3>
              <p className="body-secondary">{ed.degree}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="mono-date">{ed.date}</span>
                {ed.location && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span className="mono-date">{ed.location}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mb-20">
        <h2 className="headline-section text-[28px] mb-10">Work & Leadership</h2>
        <div className="relative">
          {experiences.map((exp, i) => (
            <div key={exp.company} className="relative pl-8 pb-10 last:pb-0">
              {/* Timeline line */}
              {i < experiences.length - 1 && (
                <div className="absolute left-[7px] top-[18px] bottom-0 w-px bg-border" />
              )}
              {/* Timeline circle */}
              <div className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 border-foreground bg-background" />
              {/* Content */}
              <div className="p-5 -ml-1">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <h3 className="font-sans text-lg font-semibold text-foreground">
                    {exp.company}
                  </h3>
                  <span className="mono-date">{exp.date}</span>
                </div>
                <p className="body-secondary mb-1">
                  {exp.role}{exp.location && ` — ${exp.location}`}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="body-secondary text-foreground/80 pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-muted-foreground">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="headline-section text-[28px] mb-10">Skills & Activities</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <div key={group.category} className="skill-group">
              <span className="mono-label block mb-2">{group.category}</span>
              <p className="font-sans text-sm text-foreground">{group.items}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Resume;
