import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';

interface BlogPostNavProps {
  currentSlug: string;
}

const BlogPostNav = ({ currentSlug }: BlogPostNavProps) => {
  const currentIndex = blogPosts.findIndex(p => p.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prev = blogPosts[(currentIndex - 1 + blogPosts.length) % blogPosts.length];
  const next = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <div className="mt-24">
      <div className="grid grid-cols-2 gap-8">
        <Link to={`/blog/${prev.slug}`} className="group flex items-center gap-5">
          <ChevronLeft className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="aspect-[16/9] border border-border overflow-hidden mb-3 max-w-[240px]">
              <img
                src={prev.heroImage}
                alt={prev.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                style={prev.objectPosition ? { objectPosition: prev.objectPosition } : undefined}
              />
            </div>
            <p className="font-serif text-base font-semibold text-foreground line-clamp-2">{prev.title}</p>
            <p className="mono-label text-xs mt-1">{prev.readTime}</p>
          </div>
        </Link>
        <Link to={`/blog/${next.slug}`} className="group flex items-center gap-5 justify-end text-right">
          <div className="flex-1 min-w-0 flex flex-col items-end">
            <div className="aspect-[16/9] border border-border overflow-hidden mb-3 max-w-[240px]">
              <img
                src={next.heroImage}
                alt={next.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                style={next.objectPosition ? { objectPosition: next.objectPosition } : undefined}
              />
            </div>
            <p className="font-serif text-base font-semibold text-foreground line-clamp-2">{next.title}</p>
            <p className="mono-label text-xs mt-1">{next.readTime}</p>
          </div>
          <ChevronRight className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>
      </div>
    </div>
  );
};

export default BlogPostNav;
