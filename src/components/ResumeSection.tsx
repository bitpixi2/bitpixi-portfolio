const experiences = [
  {
    company: 'LightLink',
    role: 'Community Manager & Designer',
    location: 'Remote',
    date: 'Mar 2024 – Jun 2024',
    description: 'Led Discord community and ambassador program. Virtual events, 2D/3D assets, UX improvements.',
    metric: '',
  },
  {
    company: 'Voxels (Cryptovoxels)',
    role: 'Community Manager & Product Designer',
    location: 'Remote',
    date: 'Aug 2021 – May 2023',
    description: 'Defined company direction. Designed Scarcity Island gamification.',
    metric: 'All-time-high land sales month',
  },
  {
    company: 'Gfycat (→ Snap Inc.)',
    role: 'Senior Product Designer',
    location: 'Palo Alto, CA',
    date: 'Jul 2017 – May 2018',
    description: 'Rebranded Web/iOS/Android. Led AR/VR apps. Marketing tools for Lionsgate, Warner Bros.',
    metric: '80M → 180M MAU · 3 AR Patents',
  },
  {
    company: 'Meitu',
    role: 'UX Designer',
    location: 'Mountain View, CA / Xiamen, China',
    date: 'Mar 2017 – Jul 2017',
    description: '"AR glam" try-n-buy filter → top earning of 23 apps.',
    metric: '450M+ users',
  },
  {
    company: 'Designlab',
    role: 'UX Design Mentor',
    location: '',
    date: 'Apr 2019 – Apr 2020',
    description: 'Mentored 100+ students through UX bootcamp with daily feedback and weekly 1-on-1 calls.',
    metric: '100+ students mentored',
  },
];

const skillGroups = [
  {
    category: 'LANGUAGES',
    items: ['HTML', 'CSS', 'Tailwind CSS', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'SQL', 'Python'],
  },
  {
    category: 'AI TOOLS',
    items: ['Claude', 'Windsurf', 'Cursor', 'v0', 'Bolt', 'Lovable', 'Replit', 'Vercel', 'ChatGPT', 'ElevenLabs', 'Midjourney', 'RunwayML'],
  },
  {
    category: 'UX METHODS',
    items: ['User Research', 'Information Architecture', 'Wireframing', 'Prototyping', 'A/B Testing', 'Usability Studies'],
  },
  {
    category: 'DESIGN',
    items: ['Brand Development', 'UI Design', 'Interaction Design', 'Responsive Design', 'Presentation Design'],
  },
  {
    category: 'SOFTWARE',
    items: ['Figma', 'Sketch', 'Adobe Creative Cloud', 'Canva', 'OBS Studio', 'Streamlabs'],
  },
  {
    category: '3D & IMMERSIVE',
    items: ['Virtual World Development', 'Mini Game Creation', 'Interactive Experiences', 'Avatars', '3D Printing'],
  },
  {
    category: 'CONTENT',
    items: ['Video Production', 'Writing (books/blogs)', 'Tutorial Development'],
  },
  {
    category: 'COLLABORATION',
    items: ['GitHub', 'InVision', 'Zeplin', 'Asana', 'Trello', 'Scribe', 'Slack', 'Zoom'],
  },
];

export function ResumeSection() {
  return (
    <section id="resume" className="py-section-mobile md:py-section border-t border-border">
      <div className="max-w-content mx-auto px-6">
        <span className="section-label block mb-4">Résumé</span>
        <h2 className="headline-section mb-12">Experience</h2>

        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.company} className="resume-entry">
              <h3 className="font-sans text-lg font-semibold text-foreground mb-1">
                {exp.company}
              </h3>
              <p className="body-secondary mb-1">
                {exp.role}{exp.location && ` — ${exp.location}`}
              </p>
              <p className="mono-date mb-3">{exp.date}</p>
              <p className="body-secondary mb-2">{exp.description}</p>
              {exp.metric && (
                <p className="font-sans text-sm font-semibold text-foreground">
                  {exp.metric}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <h3 className="headline-section text-[28px] mt-20 mb-12">Skills</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <div key={group.category} className="skill-group">
              <span className="mono-label block mb-2">{group.category}</span>
              <p className="font-sans text-sm text-foreground">
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
