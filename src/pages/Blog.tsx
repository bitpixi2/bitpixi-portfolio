import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { blogPosts, allTags } from '@/data/blogPosts';
import { SEO } from '@/components/SEO';

const Blog = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? blogPosts.filter(p => p.tags.includes(activeTag))
    : blogPosts;

  return (
    <PageLayout>
      <SEO
        title="Blog"
        description="Writing on UX, AI security, fintech, and emerging platforms by Kasey Robinson — Senior UX Designer and Prompt Engineer near Melbourne, Australia."
        path="/blog"
      />
      <span className="section-label block mb-4">Blog</span>
      <h1 className="headline-section mb-8">Writing</h1>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 text-xs uppercase tracking-widest border transition-colors font-mono ${
            activeTag === null
              ? 'border-foreground bg-foreground text-background'
              : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1 text-xs uppercase tracking-widest border transition-colors font-mono ${
              activeTag === tag
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post cards — 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="border border-border h-full flex flex-col">
              {/* Hero image */}
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  loading={filtered.indexOf(post) < 2 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  style={post.objectPosition ? { objectPosition: post.objectPosition } : undefined}
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono border border-border px-1.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="font-serif text-lg md:text-xl font-semibold text-foreground leading-snug mb-2 group-hover:underline underline-offset-4 decoration-1">
                  {post.title}
                </h2>

                {/* Subtitle */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {post.subtitle}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 mt-auto">
                  <span className="mono-date text-[10px]">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="text-border">·</span>
                  <span className="mono-date text-[10px]">{post.readTime}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-center py-20">No posts with that tag yet.</p>
      )}
    </PageLayout>
  );
};

export default Blog;
