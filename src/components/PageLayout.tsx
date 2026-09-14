import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  backTo?: string;
  backLabel?: string;
}

export function PageLayout({ children, backTo = '/', backLabel = 'Back to home' }: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="max-w-content mx-auto px-6">
          <Link 
            to={backTo} 
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-sans text-sm">{backLabel}</span>
          </Link>
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
