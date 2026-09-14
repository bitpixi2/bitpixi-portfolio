import { useRef, useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

const CHARS = ' .:-=+*#%@';
const SKY_CHARS = ['.', '*', '+', 'o', '·', '°'];

interface TwinklePoint {
  x: number;
  y: number;
  char: string;
  freq: number;
  phase: number;
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  points: number,
  rotation: number,
  charSize: number,
  density: number
) {
  const verts: { x: number; y: number }[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / points - Math.PI / 2 + rotation;
    verts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }

  const isInside = (px: number, py: number) => {
    let inside = false;
    for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
      const xi = verts[i].x, yi = verts[i].y;
      const xj = verts[j].x, yj = verts[j].y;
      if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  };

  const step = Math.max(1, Math.round(charSize / density));
  for (let y = cy - outerR; y < cy + outerR; y += step) {
    for (let x = cx - outerR; x < cx + outerR; x += step) {
      if (isInside(x, y)) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) / outerR;
        const intensity = Math.max(0, 1 - dist);
        const charIdx = Math.floor(intensity * (CHARS.length - 1));
        ctx.fillText(CHARS[charIdx], x, y);
      }
    }
  }
}

function generateTwinklePoints(w: number, h: number, count: number): TwinklePoint[] {
  const points: TwinklePoint[] = [];
  let seed = w * 7 + h * 13;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < count; i++) {
    points.push({
      x: rand() * w,
      y: rand() * h,
      char: SKY_CHARS[Math.floor(rand() * SKY_CHARS.length)],
      freq: 0.3 + rand() * 2.5,
      phase: rand() * Math.PI * 2,
    });
  }
  return points;
}

export function DitheredStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [starSize, setStarSize] = useState(50);
  const [density, setDensity] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [skyEnabled, setSkyEnabled] = useState(false);
  const [skyBrightness, setSkyBrightness] = useState(15); // 0 = black, 100 = white
  const [colorEnabled, setColorEnabled] = useState(false);
  const [hueShift, setHueShift] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const animRef = useRef<number>(0);
  const autoRotate = useRef(true);
  const timeRef = useRef(0);
  const twinklePointsRef = useRef<TwinklePoint[]>([]);
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const TWINKLE_COUNT = 80;

  const starHues = useRef([210, 340, 50]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Always fill a solid background so recordings aren't transparent
    if (!skyEnabled) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
    }

    const fontSize = Math.max(6, Math.round(8 * (density / 1.5)));
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Sky: grayscale background (white to black) with twinkle chars
    if (skyEnabled) {
      const bgLightness = skyBrightness;
      ctx.fillStyle = `hsl(0, 0%, ${bgLightness}%)`;
      ctx.fillRect(0, 0, w, h);

      if (twinklePointsRef.current.length > 0) {
        const t = timeRef.current;
        const skyFontSize = Math.max(5, fontSize - 2);
        ctx.font = `${skyFontSize}px "JetBrains Mono", monospace`;
        // Twinkle chars: if dark bg use light chars, if light bg use dark chars
        const charLightness = bgLightness < 50 ? 85 : 15;
        twinklePointsRef.current.forEach((p) => {
          const opacity = 0.15 + 0.6 * (0.5 + 0.5 * Math.sin(t * p.freq + p.phase));
          ctx.globalAlpha = opacity;
          ctx.fillStyle = `hsl(0, 0%, ${charLightness}%)`;
          ctx.fillText(p.char, p.x, p.y);
        });
        ctx.globalAlpha = 1.0;
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      }
    }

    const style = getComputedStyle(canvas);
    const fg = skyEnabled
      ? (skyBrightness < 50 ? '#fff' : '#000')
      : (style.color || '#000');
    ctx.fillStyle = fg;

    const innerRatio = 0.45;
    const spacing = starSize * 2.2;
    const startX = w / 2 - spacing;

    const stars = [
      { cx: startX, cy: h * 0.45, size: starSize * 0.9, rot: rotation },
      { cx: w / 2, cy: h * 0.5, size: starSize, rot: rotation + 0.3 },
      { cx: startX + spacing * 2, cy: h * 0.42, size: starSize * 0.75, rot: rotation - 0.2 },
    ];

    stars.forEach((s, idx) => {
      if (colorEnabled) {
        const hue = (starHues.current[idx] + hueShift) % 360;
        ctx.fillStyle = `hsl(${hue}, 70%, ${skyEnabled && skyBrightness < 50 ? 65 : 55}%)`;
      } else {
        ctx.fillStyle = fg;
      }
      drawStar(ctx, s.cx, s.cy, s.size, s.size * innerRatio, 5, s.rot, fontSize, density);
    });
  }, [starSize, density, rotation, skyEnabled, skyBrightness, colorEnabled, hueShift]);

  // Regenerate twinkle points on mount and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width || 300;
    const h = canvas.height || 200;
    canvasSizeRef.current = { w, h };
    twinklePointsRef.current = generateTwinklePoints(w, h, TWINKLE_COUNT);
  }, []);

  // Auto-rotation + time for twinkle
  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;
      if (autoRotate.current) {
        setRotation((r) => r + 0.003);
      }
      timeRef.current += 0.016;
      if (skyEnabled) {
        render();
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [skyEnabled, render]);

  useEffect(() => {
    render();
  }, [render]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const obs = new ResizeObserver(() => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      canvasSizeRef.current = { w: canvas.width, h: canvas.height };
      twinklePointsRef.current = generateTwinklePoints(canvas.width, canvas.height, TWINKLE_COUNT);
      render();
    });
    obs.observe(parent);
    return () => obs.disconnect();
  }, [render]);

  const [recordProgress, setRecordProgress] = useState(0);

  const handleDownloadVideo = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsRecording(true);
    setRecordProgress(0);
    toast('Recording 8s video...');

    const duration = 8000;
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setRecordProgress(Math.min(elapsed / duration, 1));
    }, 50);

    try {
      const stream = canvas.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 5000000,
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        clearInterval(progressInterval);
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'star-art.webm';
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
        setRecordProgress(0);
        toast('Video saved!');
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, duration);
    } catch (err) {
      console.error('Recording failed:', err);
      clearInterval(progressInterval);
      setIsRecording(false);
      setRecordProgress(0);
      toast('Recording failed. Try a different browser.');
    }
  }, []);

  const handleDownloadImage = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportW = 1600;
    const exportH = 1200;
    const offscreen = document.createElement('canvas');
    offscreen.width = exportW;
    offscreen.height = exportH;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    if (skyEnabled) {
      ctx.fillStyle = `hsl(0, 0%, ${skyBrightness}%)`;
    } else {
      ctx.fillStyle = '#fff';
    }
    ctx.fillRect(0, 0, exportW, exportH);

    const srcW = canvas.width;
    const srcH = canvas.height;
    const s = Math.min((exportW - 80) / srcW, (exportH - 120) / srcH);
    const dw = srcW * s;
    const dh = srcH * s;
    const dx = (exportW - dw) / 2;
    const dy = (exportH - dh - 60) / 2;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, dx, dy, dw, dh);

    ctx.fillStyle = skyEnabled && skyBrightness < 50 ? 'rgba(255,255,255,0.4)' : '#555';
    ctx.font = '28px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('bitpixi.com', exportW / 2, exportH - 24);

    offscreen.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'star-art.png';
      a.click();
      URL.revokeObjectURL(url);
      toast('Image saved!');
    });
  }, [skyEnabled, skyBrightness]);

  const sliderClass = "w-full h-px appearance-none bg-border cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground";

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-3 justify-end">
        <button
          onClick={handleDownloadImage}
          className="mono-label text-xs py-2 px-4 border border-border hover:bg-foreground hover:text-background transition-colors tracking-widest"
        >
          DOWNLOAD PNG
        </button>
        <button
          onClick={handleDownloadVideo}
          disabled={isRecording}
          className={`mono-label text-xs py-2 px-4 border border-border hover:bg-foreground hover:text-background transition-colors tracking-widest relative overflow-hidden ${isRecording ? 'cursor-not-allowed' : ''}`}
        >
          {isRecording && (
            <span
              className="absolute inset-0 bg-foreground/15 origin-left transition-none"
              style={{ transform: `scaleX(${recordProgress})` }}
            />
          )}
          <span className="relative">
            {isRecording ? 'RECORDING...' : 'DOWNLOAD 8s VIDEO'}
          </span>
        </button>
      </div>
      <div className="flex-1 relative min-h-[180px] border border-border">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full text-foreground"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <div className="space-y-3 mt-4">
        <div className="flex items-center gap-3">
          <span className="mono-label w-16 shrink-0">SIZE</span>
          <input type="range" min={20} max={80} value={starSize}
            onChange={(e) => setStarSize(Number(e.target.value))} className={sliderClass} />
        </div>
        <div className="flex items-center gap-3">
          <span className="mono-label w-16 shrink-0">DETAIL</span>
          <input type="range" min={5} max={40} value={density * 10}
            onChange={(e) => setDensity(Number(e.target.value) / 10)} className={sliderClass} />
        </div>
        <div className="flex items-center gap-3">
          <span className="mono-label w-16 shrink-0">ANGLE</span>
          <input type="range" min={0} max={628} value={Math.round(rotation * 100) % 628}
            onChange={(e) => { autoRotate.current = false; setRotation(Number(e.target.value) / 100); }}
            className={sliderClass} />
        </div>
        <div className="flex items-center gap-3">
          <span className="mono-label w-16 shrink-0">SKY</span>
          <button
            onClick={() => {
              setSkyEnabled((v) => {
                if (!v) setSkyBrightness(15);
                return !v;
              });
            }}
            className={`mono-label text-xs px-2 py-0.5 border border-border transition-colors ${skyEnabled ? 'bg-foreground text-background' : 'bg-transparent text-foreground'}`}
          >
            {skyEnabled ? 'ON' : 'OFF'}
          </button>
          {skyEnabled && (
            <input type="range" min={0} max={100} value={skyBrightness}
              onChange={(e) => setSkyBrightness(Number(e.target.value))} className={sliderClass} />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="mono-label w-16 shrink-0">COLOR</span>
          <button
            onClick={() => {
              setColorEnabled((v) => {
                if (!v) {
                  starHues.current = [
                    Math.floor(Math.random() * 360),
                    Math.floor(Math.random() * 360),
                    Math.floor(Math.random() * 360),
                  ];
                }
                return !v;
              });
            }}
            className={`mono-label text-xs px-2 py-0.5 border border-border transition-colors ${colorEnabled ? 'bg-foreground text-background' : 'bg-transparent text-foreground'}`}
          >
            {colorEnabled ? 'ON' : 'OFF'}
          </button>
          {colorEnabled && (
            <input type="range" min={0} max={360} value={hueShift}
              onChange={(e) => setHueShift(Number(e.target.value))} className={sliderClass} />
          )}
        </div>
      </div>
    </div>
  );
}
