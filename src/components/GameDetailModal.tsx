import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';

interface GameDetail {
  name: string;
  year: string;
  image: string | null;
  description?: string;
  popupImage?: string | null;
}

interface GameDetailModalProps {
  game: GameDetail | null;
  onClose: () => void;
}

interface TwinklingStar {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const generateStars = (count: number): TwinklingStar[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));

const GameDetailModal = ({ game, onClose }: GameDetailModalProps) => {
  const [stars] = useState(() => generateStars(40));

  useEffect(() => {
    if (!game) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [game, onClose]);

  if (!game || !game.description) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Dark overlay with twinkling stars */}
      <div className="absolute inset-0 bg-black/90">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="relative max-w-lg w-full border border-border bg-background p-8 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>

        {game.popupImage && (
          <div className="mb-6 overflow-hidden border border-border">
            <img
              src={game.popupImage}
              alt={game.name}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
          {game.name}
        </h3>
        <p className="text-[11px] text-muted-foreground/50 font-mono mb-4">{game.year}</p>
        <p className="body-secondary leading-relaxed whitespace-pre-line">
          {game.description.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      </div>
    </div>
  );
};

export default GameDetailModal;
