import { PageLayout } from '@/components/PageLayout';

const Contact = () => {
  return (
    <PageLayout>
      <div className="py-12">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-12">
          Let's work together.
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a 
            href="mailto:kasey.bitpixi@gmail.com" 
            className="nav-link"
          >
            kasey.bitpixi@gmail.com
          </a>
          <span className="text-secondary">·</span>
          <a 
            href="https://x.com/bitpixi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            @bitpixi on X
          </a>
          <span className="text-secondary">·</span>
          <a 
            href="https://linkedin.com/in/kaseyr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
