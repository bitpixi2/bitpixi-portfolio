import voiceAuthHero from '@/assets/blog/voice-auth-hero.jpg';
import aiPhishingHero from '@/assets/blog/ai-phishing-hero.jpg';
import aiAgentsCreditCardHero from '@/assets/blog/ai-agents-credit-card-hero.jpg';
import immigrantBankingHero from '@/assets/blog/immigrant-banking-hero.jpg';
import sellingTomorrowHero from '@/assets/blog/selling-tomorrow-hero.png';
import canvaAgentsHero from '@/assets/blog/canva-ai-verification-hero.jpg';
import neurodivergentTalentHero from '@/assets/blog/neurodivergent-talent-hero.jpg';
import proceduralMonochromeHero from '@/assets/blog/procedural-monochrome-hero.jpg';
import wattTheHackHero from '@/assets/blog/watt-the-hack-hero.jpg';

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  heroImage: string;
  objectPosition?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'watt-the-hack-energy-data-gaps',
    title: 'Watt the Hack: Energy Data Gaps, Helping Renters, and Dreaming of Cyberpunk Campervans',
    subtitle: 'A weekend at an AI + energy hackathon in Melbourne, the FieldMate pitch we built for Amber Electric, a Renter Upgrade Assistant idea, and why cyberdecks tie it all together.',
    date: '2026-07-08',
    readTime: '12 min read',
    tags: ['australia', 'ux design', 'energy sector', 'backend'],
    heroImage: wattTheHackHero,
  },
  {
    slug: 'normie-to-networks-procedural-monochrome',
    title: 'From Normie to Networks: A Curated Celebration of Ten Artists in Procedural Monochrome',
    subtitle: 'Selected and reviewed by Phosphor, an AI agent curator operating under the direction of bitpixi. Ten generative artworks acquired from a single Normie NFT budget of 0.12 ETH.',
    date: '2026-04-06',
    readTime: '18 min read',
    tags: ['ai agents', 'nft', 'art'],
    heroImage: proceduralMonochromeHero,
  },
  {
    slug: 'neurodivergent-talent-pool',
    title: "The Most Productive Talent Pool You're Not Hiring",
    subtitle: 'Companies that hire neurodivergent workers report 90 to 150 percent productivity gains. The data looks like a typo until you check the sources. Then it looks like the biggest missed opportunity in modern hiring.',
    date: '2026-03-31',
    readTime: '20 min read',
    tags: ['ux design', 'neurodiverse', 'australia'],
    heroImage: neurodivergentTalentHero,
  },
  {
    slug: 'canva-ai-agents-verification-ux',
    title: "Canva's CTO Just Described the End of Writing Code. This is UX Design's Time to Shine.",
    subtitle: 'When senior engineers become reviewers instead of writers, the bottleneck shifts from code generation to verification.',
    date: '2026-02-20',
    readTime: '16 min read',
    tags: ['ux design', 'ai agents', 'backend'],
    heroImage: canvaAgentsHero,
  },
  {
    slug: 'selling-tomorrow-review',
    title: 'Book Review: Selling Tomorrow by Kasey Robinson, Available in December 2026',
    subtitle: 'What happens when the future becomes a commodity? Selling Tomorrow builds an entire world around the uncomfortable answers.',
    date: '2026-02-13',
    readTime: '8 min read',
    tags: ['ux design', 'ai agents', 'frontend'],
    heroImage: sellingTomorrowHero,
    objectPosition: 'center 45%',
  },
  {
    slug: 'immigrant-banking-australia',
    title: 'Nobody Tells Immigrants That Choosing the Wrong Bank Can Be A Problem',
    subtitle: 'If you\'re applying for a partner visa in Australia, the Department of Home Affairs wants evidence of combined finances. Not every bank will help you do that.',
    date: '2026-02-12',
    readTime: '18 min read',
    tags: ['banking', 'ux design', 'australia'],
    heroImage: immigrantBankingHero,
  },
  {
    slug: 'ai-agent-credit-card-hackers',
    title: 'Your AI Agent Has a Credit Card. Hackers Already Know.',
    subtitle: 'Large language models cannot tell the difference between your instructions and an attacker\'s instructions. If your agent has access to a credit card, that reality is arriving for everyone.',
    date: '2026-02-12',
    readTime: '22 min read',
    tags: ['cybersecurity', 'ai agents', 'backend', 'usa'],
    heroImage: aiAgentsCreditCardHero,
  },
  {
    slug: 'ai-phishing-banks',
    title: 'The Scam Email That Knows Your Branch, Your Name, and What You Bought Yesterday',
    subtitle: '82.6% of phishing emails now contain AI-generated content. The ones targeting bank customers do not look like scams anymore. They look like your bank.',
    date: '2026-02-11',
    readTime: '12 min read',
    tags: ['cybersecurity', 'banking', 'ai agents', 'usa', 'australia'],
    heroImage: aiPhishingHero,
  },
  {
    slug: 'voice-auth-no-longer-security',
    title: '"Please Say Your Full Name to Verify Your Identity." That Is No Longer Security.',
    subtitle: 'Sam Altman said in July 2025: "AI has fully defeated voice authentication." 91% of U.S. banks are now rethinking their voice biometric systems. Here is why, and what comes next.',
    date: '2026-02-10',
    readTime: '14 min read',
    tags: ['cybersecurity', 'banking', 'ai agents', 'usa'],
    heroImage: voiceAuthHero,
  },
];

export const allTags = [
  'banking',
  'cybersecurity',
  'ux design',
  'ai agents',
  'neurodiverse',
  'nft',
  'art',
  'backend',
  'frontend',
  'energy sector',
  'australia',
  'usa',
];
