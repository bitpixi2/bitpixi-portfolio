import { PageLayout } from '@/components/PageLayout';
import { useState } from 'react';
import hackathonPhoto from '@/assets/hackeroos-hackathon.jpg';
import { SEO } from '@/components/SEO';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message must be less than 2000 characters'),
});

const keyFacts = [
  { label: 'EXPERIENCE', value: '10+ years' },
  { label: 'LOCATION', value: 'by Melbourne, Australia' },
  { label: 'WORKING RIGHTS', value: 'US Citizen, with full Australian work rights.' },
];

const HireMe = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const parsed = contactSchema.safeParse({
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Invalid input');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/xpqjqrrz', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      form.reset();
    } catch (error) {
      toast.error('Message failed to send. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <SEO
        title="Hire Me"
        description="Kasey Robinson is open to Senior UX Design, DevRel, Community Management, and Prompt Engineering roles. US citizen with Australian work rights. Based near Melbourne."
        path="/hire-me"
      />
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16">
        {/* Left Column - Intro + Form */}
        <div>
          <span className="section-label block mb-6">Hire Me</span>
          
          <p className="body-text text-muted-foreground max-w-[480px] mb-8">
            I'd love to hear about your company. Whether it's <strong>Sr. UX Design</strong>, <strong>Community Management</strong>, <strong>DevRel</strong>, <strong>Prompt Engineering</strong>, or something I haven't thought of yet, if there's clear direction and a little room for creativity, I'm in.
          </p>

          {/* Contact Form */}
          <div>

            {submitted ? (
              <p className="body-text text-muted-foreground">
                Thanks for reaching out! I'll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                <div>
                  <label htmlFor="name" className="mono-label block mb-2">NAME</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    className="w-full bg-transparent border-b border-border py-2 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mono-label block mb-2">EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    className="w-full bg-transparent border-b border-border py-2 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mono-label block mb-2">MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={2000}
                    rows={4}
                    className="w-full bg-transparent border-b border-border py-2 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Tell me about the role or project…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="font-sans text-sm uppercase tracking-label font-medium text-foreground hover:text-muted-foreground transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column - Photo, Facts, Socials */}
        <div className="space-y-8">
          {/* Hackathon Photo */}
          <div>
            <div className="overflow-hidden">
              <img
                src={hackathonPhoto}
                alt="Presenting Hackeroos hackathon results at Stone & Chalk"
                className="w-full h-auto transition-all duration-700 ease-out hover:scale-[1.05] hover:grayscale-0 photo-grayscale cursor-pointer"
                loading="lazy"
              />
            </div>
            <p className="text-xs italic text-muted-foreground mt-2">
              Presenting{' '}
              <a
                href="https://hackeroos.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Hackeroos
              </a>
              {' '}'AI in the Outback' at Stone &amp; Chalk in Melbourne · Received 1 of 4 Catalysr x TechVisa grants
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 mt-2">
            <a href="mailto:kasey.bitpixi@gmail.com" aria-label="Email" className="inline-block text-foreground hover:text-muted-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/bitpixi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-block text-foreground hover:text-muted-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/bitpixi" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="inline-block text-foreground hover:text-muted-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://github.com/bitpixi2" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-block text-foreground hover:text-muted-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>

          {/* Key Facts */}
          <div className="space-y-6">
            {keyFacts.map((fact) => (
              <div key={fact.label}>
                <span className="mono-label block mb-1">{fact.label}</span>
                <span className="font-sans text-base font-medium text-foreground whitespace-pre-line">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HireMe;
