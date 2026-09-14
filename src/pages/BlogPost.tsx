import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { blogPosts } from '@/data/blogPosts';
import { ArticleSEO } from '@/components/SEO';
import BlogPostVoiceAuth from '@/components/blog/BlogPostVoiceAuth';
import BlogPostAIPhishing from '@/components/blog/BlogPostAIPhishing';
import BlogPostAIAgents from '@/components/blog/BlogPostAIAgents';
import BlogPostImmigrantBanking from '@/components/blog/BlogPostImmigrantBanking';
import BlogPostSellingTomorrow from '@/components/blog/BlogPostSellingTomorrow';
import BlogPostCanvaAgents from '@/components/blog/BlogPostCanvaAgents';
import BlogPostNeurodivergentTalent from '@/components/blog/BlogPostNeurodivergentTalent';
import BlogPostProceduralArt from '@/components/blog/BlogPostProceduralArt';
import BlogPostWattTheHack from '@/components/blog/BlogPostWattTheHack';

const postComponents: Record<string, React.ComponentType> = {
  'watt-the-hack-energy-data-gaps': BlogPostWattTheHack,
  'normie-to-networks-procedural-monochrome': BlogPostProceduralArt,
  'neurodivergent-talent-pool': BlogPostNeurodivergentTalent,
  'voice-auth-no-longer-security': BlogPostVoiceAuth,
  'ai-phishing-banks': BlogPostAIPhishing,
  'ai-agent-credit-card-hackers': BlogPostAIAgents,
  'immigrant-banking-australia': BlogPostImmigrantBanking,
  'selling-tomorrow-review': BlogPostSellingTomorrow,
  'canva-ai-agents-verification-ux': BlogPostCanvaAgents,
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post || !slug || !postComponents[slug]) {
    return <Navigate to="/blog" replace />;
  }

  const PostContent = postComponents[slug];

  return (
    <>
      <ArticleSEO
        title={post.title}
        description={post.subtitle}
        slug={post.slug}
        heroImage={post.heroImage}
        datePublished={post.date}
        tags={post.tags}
      />
      <PostContent />
    </>
  );
};

export default BlogPost;
