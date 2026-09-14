export function ContactSection() {
  return (
    <section id="contact" className="py-section-mobile md:py-section border-t border-border-strong">
      <div className="max-w-content mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8">
          Let's work together.
        </h2>
        
        <div className="flex flex-wrap gap-4 md:gap-8 text-sm">
          <a
            href="mailto:kasey.bitpixi@gmail.com"
            className="link-animated"
          >
            kasey.bitpixi@gmail.com
          </a>
          <span className="text-muted-foreground hidden md:inline">·</span>
          <a
            href="https://x.com/bitpixi"
            target="_blank"
            rel="noopener noreferrer"
            className="link-animated"
          >
            @bitpixi on X
          </a>
          <span className="text-muted-foreground hidden md:inline">·</span>
          <a
            href="https://linkedin.com/in/kaseyrobinson"
            target="_blank"
            rel="noopener noreferrer"
            className="link-animated"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
