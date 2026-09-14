import kaseyPhoto from '@/assets/kasey-robinson.jpg';

const SITE_URL = 'https://bitpixi.com';

interface BlogAuthorShareProps {
  slug: string;
  title: string;
}

export default function BlogAuthorShare({ slug, title }: BlogAuthorShareProps) {
  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: 'X',
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(articleUrl);
  };

  return (
    <div className="flex flex-col gap-6 my-8">
      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={kaseyPhoto}
          alt="Kasey Robinson"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-medium text-foreground font-sans">Kasey Robinson</div>
          <div className="mono-date">Senior UX Designer & Prompt Engineer</div>
        </div>
      </div>

      {/* Share */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Share</span>
        {shareLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground border border-border px-3 py-1.5 hover:text-foreground hover:border-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={copyLink}
          className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground border border-border px-3 py-1.5 hover:text-foreground hover:border-foreground transition-colors"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}
