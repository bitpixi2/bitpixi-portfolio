import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://bitpixi.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kasey Robinson',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  jobTitle: 'Senior UX Designer & Prompt Engineer',
  description:
    'RISD/Tufts. 10+ years across UX, AI, and emerging platforms. Scaled Gfycat to 180M+ MAU. 3 AR patents acquired by Snap. Based near Melbourne, Australia.',
  sameAs: [
    'https://www.linkedin.com/in/bitpixi',
    'https://x.com/bitpixi',
  ],
  knowsAbout: [
    'UX Design',
    'Prompt Engineering',
    'AI Tools',
    'Developer Relations',
    'Product Design',
    'AR/VR',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Tufts University' },
    { '@type': 'CollegeOrUniversity', name: 'Rhode Island School of Design' },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Hackeroos',
    url: 'https://hackeroos.com.au',
  },
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kasey Robinson',
  url: SITE_URL,
  description:
    'Portfolio of Kasey Robinson — Senior UX Designer & Prompt Engineer. Case studies, writing, and work history.',
  author: { '@id': `${SITE_URL}/#person` },
};

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** Additional JSON-LD graph nodes to inject alongside Person + WebSite */
  schemaNodes?: object[];
}

export interface ArticleSEOProps {
  title: string;
  description: string;
  slug: string;
  heroImage: string;
  datePublished: string;
  tags?: string[];
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function buildWebPageSchema(title: string, description: string, url: string, image: string) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: `${title} — Kasey Robinson`,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    primaryImageOfPage: { url: image },
  };
}

function buildGraph(...nodes: object[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { ...PERSON_SCHEMA, '@id': `${SITE_URL}/#person` },
      { ...WEBSITE_SCHEMA, '@id': `${SITE_URL}/#website` },
      ...nodes,
    ],
  });
}

// ──────────────────────────────────────────────
// Main SEO component — used on all standard pages
// ──────────────────────────────────────────────

export function SEO({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  schemaNodes = [],
}: SEOProps) {
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = `${title} — Kasey Robinson`;
  const webPage = buildWebPageSchema(title, description, canonical, image);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kasey Robinson" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bitpixi" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {buildGraph(webPage, ...schemaNodes)}
      </script>
    </Helmet>
  );
}

// ──────────────────────────────────────────────
// ArticleSEO — used on individual blog posts
// ──────────────────────────────────────────────

export function ArticleSEO({
  title,
  description,
  slug,
  heroImage,
  datePublished,
  tags = [],
}: ArticleSEOProps) {
  const canonical = `${SITE_URL}/blog/${slug}`;
  const fullTitle = `${title} — Kasey Robinson`;

  const articleSchema = {
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: title,
    description,
    url: canonical,
    datePublished,
    image: heroImage,
    keywords: tags.join(', '),
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/blog#webpage` },
  };

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: fullTitle,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    primaryImageOfPage: { url: heroImage },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={heroImage} />
      <meta property="og:site_name" content="Kasey Robinson" />
      <meta property="article:published_time" content={datePublished} />
      {tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bitpixi" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={heroImage} />

      <script type="application/ld+json">
        {buildGraph(webPageSchema, articleSchema)}
      </script>
    </Helmet>
  );
}
