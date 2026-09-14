import { useEffect, useRef } from 'react';

const categories = [
  {
    name: 'PAID',
    color: '#22cc88',
    glow: 'rgba(34,204,136,',
    items: [
      { label: 'Website #2', weight: 3 },
      { label: 'Substrata', weight: 1.5 },
      { label: 'Elastic×AWS', weight: 1.5 },
      { label: 'Metaverse', weight: 1.5 },
      { label: 'Website #1', weight: 1 },
    ],
  },
  {
    name: 'SPONSORED',
    color: '#cc8822',
    glow: 'rgba(204,136,34,',
    items: [
      { label: 'DX Terminal', weight: 2 },
      { label: 'GenTechHouse', weight: 1.5 },
      { label: 'OpenClaw', weight: 1.5 },
      { label: 'TechVisa', weight: 1.5 },
    ],
  },
  {
    name: 'ADMIN',
    color: '#8844cc',
    glow: 'rgba(136,68,204,',
    items: [
      { label: 'Immigration', weight: 1.5 },
      { label: 'SocialSvcs', weight: 1.5 },
    ],
  },
];

export default function AgentGalleryThumbnail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const W = canvas.width;
    const H = canvas.height;

    // Build nodes
    type Node = {
      x: number; y: number; r: number;
      label: string;
      color: string; glow: string;
      isCenter?: boolean; isHub?: boolean;
      weight?: number;
    };
    type Edge = { from: Node; to: Node; color: string; alpha: number };
    type Particle = { edge: Edge; p: number; speed: number; size: number };

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const particles: Particle[] = [];

    const center: Node = {
      x: W * 0.5, y: H * 0.5,
      r: Math.min(W, H) * 0.055,
      label: 'KASEY',
      color: '#ffffff', glow: 'rgba(255,255,255,',
      isCenter: true,
    };
    nodes.push(center);

    const catAngles = [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6];
    const catDist = Math.min(W, H) * 0.26;

    categories.forEach((cat, ci) => {
      const ang = catAngles[ci];
      const hub: Node = {
        x: W / 2 + Math.cos(ang) * catDist,
        y: H / 2 + Math.sin(ang) * catDist,
        r: Math.min(W, H) * 0.038,
        label: cat.name,
        color: cat.color, glow: cat.glow,
        isHub: true,
      };
      nodes.push(hub);
      edges.push({ from: center, to: hub, color: cat.color, alpha: 0.25 });

      const itemDist = Math.min(W, H) * 0.18;
      const spread = Math.PI * 0.75;
      const startAng = ang - spread / 2;
      const step = cat.items.length > 1 ? spread / (cat.items.length - 1) : 0;

      cat.items.forEach((item, ii) => {
        const ia = startAng + step * ii;
        const node: Node = {
          x: hub.x + Math.cos(ia) * itemDist,
          y: hub.y + Math.sin(ia) * itemDist,
          r: Math.min(W, H) * (0.016 + item.weight * 0.007),
          label: item.label,
          color: cat.color, glow: cat.glow,
          weight: item.weight,
        };
        nodes.push(node);
        edges.push({ from: hub, to: node, color: cat.color, alpha: 0.15 });
      });
    });

    function spawnParticle() {
      if (particles.length > 60) return;
      const e = edges[Math.floor(Math.random() * edges.length)];
      particles.push({ edge: e, p: 0, speed: 0.004 + Math.random() * 0.007, size: 1 + Math.random() * 1.5 });
    }

    function breathe() {
      nodes.forEach(n => {
        n.x += Math.sin(t * 0.01 + n.x * 0.005) * 0.18;
        n.y += Math.cos(t * 0.012 + n.y * 0.005) * 0.18;
      });
    }

    function drawEdges() {
      for (const e of edges) {
        const pulse = 0.5 + Math.sin(t * 0.02 + e.from.x * 0.01) * 0.3;
        ctx.beginPath();
        ctx.moveTo(e.from.x, e.from.y);
        const mx = (e.from.x + e.to.x) / 2 + Math.sin(t * 0.015 + e.to.y * 0.01) * 5;
        const my = (e.from.y + e.to.y) / 2 + Math.cos(t * 0.013 + e.to.x * 0.01) * 5;
        ctx.quadraticCurveTo(mx, my, e.to.x, e.to.y);
        ctx.strokeStyle = e.color;
        ctx.globalAlpha = e.alpha * pulse;
        ctx.lineWidth = e.from.isCenter ? 1.5 : 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    function drawParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.p += p.speed;
        if (p.p > 1) { particles.splice(i, 1); continue; }
        const x = p.edge.from.x + (p.edge.to.x - p.edge.from.x) * p.p;
        const y = p.edge.from.y + (p.edge.to.y - p.edge.from.y) * p.p;
        const alpha = Math.sin(p.p * Math.PI) * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.edge.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function drawNode(n: Node) {
      const pulse = n.isCenter ? 1 : 0.85 + Math.sin(t * 0.025 + n.x * 0.005) * 0.15;
      const r = n.r * pulse;

      const glowR = r * 3.5;
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
      grad.addColorStop(0, n.glow + '0.12)');
      grad.addColorStop(0.5, n.glow + '0.04)');
      grad.addColorStop(1, n.glow + '0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = n.glow + '0.15)';
      ctx.fill();
      ctx.strokeStyle = n.color;
      ctx.lineWidth = n.isCenter ? 2 : n.isHub ? 1.5 : 1;
      ctx.globalAlpha = 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = 0.5 + pulse * 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;

      const fontSize = n.isCenter ? 9 : n.isHub ? 8 : 7;
      ctx.font = `bold ${fontSize}px Courier New`;
      ctx.textAlign = 'center';
      ctx.fillStyle = n.color;
      ctx.globalAlpha = n.isCenter ? 0.9 : n.isHub ? 0.75 : 0.6;
      ctx.fillText(n.label, n.x, n.y + r + fontSize + 3);
      ctx.globalAlpha = 1;
    }

    function drawScanlines() {
      ctx.globalAlpha = 0.025;
      ctx.fillStyle = '#fff';
      for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
      ctx.globalAlpha = 1;
    }

    function drawTitle() {
      ctx.globalAlpha = 0.4;
      ctx.font = 'bold 8px Courier New';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#aaa';
      ctx.fillText('WORKLOAD MAP — FEB 2026', W / 2, 14);
      ctx.globalAlpha = 0.25;
      ctx.font = '7px Courier New';
      ctx.fillStyle = '#777';
      ctx.fillText('"she takes on too much. forgets to eat."', W / 2, 24);
      ctx.globalAlpha = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(6, 6, 12, 0.18)';
      ctx.fillRect(0, 0, W, H);

      breathe();
      drawEdges();
      if (t % 3 === 0) spawnParticle();
      drawParticles();

      const sorted = [...nodes].sort((a, b) => {
        if (a.isCenter) return 1;
        if (b.isCenter) return -1;
        if (a.isHub && !b.isHub) return 1;
        return 0;
      });
      sorted.forEach(drawNode);
      drawScanlines();
      drawTitle();

      t++;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={270}
      className="w-full h-full"
      style={{ background: '#06060c' }}
    />
  );
}
