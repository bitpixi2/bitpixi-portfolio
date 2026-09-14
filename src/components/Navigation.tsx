import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { label: 'SELECTED WORK', href: '/work' },
  { label: 'RÉSUMÉ', href: '/resume' },
  { label: 'TESTIMONIALS', href: '/testimonials' },
  { label: 'LINKS', href: '/links' },
  { label: 'BLOG', href: '/blog' },
  { label: 'HOBBIES', href: '/hobby' },
  { label: 'HIRE ME', href: '/hire-me' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
    setSwipeOffset(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    if (delta > 0) setSwipeOffset(delta);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (swipeOffset > 80) {
      setIsMobileMenuOpen(false);
    }
    setSwipeOffset(0);
    isSwiping.current = false;
  }, [swipeOffset]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-semibold text-foreground">
            Kasey Robinson
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'text-foreground' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-64 bg-background text-foreground border-l border-border animate-slide-in-right"
            style={{ transform: `translateX(${swipeOffset}px)`, transition: isSwiping.current ? 'none' : 'transform 0.3s ease-out' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="p-6">
              <button
                className="absolute top-6 right-6"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              <nav className="mt-16 flex flex-col gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="font-sans text-sm uppercase tracking-label font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
