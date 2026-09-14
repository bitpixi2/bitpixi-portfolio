import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Star shape ─── */
function createRoundedStarShape(outerR: number, innerR: number, points: number, roundness = 0.35): THREE.Shape {
  const step = Math.PI / points;
  const verts: { x: number; y: number }[] = [];
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    verts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
  }
  const shape = new THREE.Shape();
  const n = verts.length;
  for (let i = 0; i < n; i++) {
    const curr = verts[i];
    const next = verts[(i + 1) % n];
    const mid = { x: (curr.x + next.x) / 2, y: (curr.y + next.y) / 2 };
    const endPt = { x: next.x + (mid.x - next.x) * roundness, y: next.y + (mid.y - next.y) * roundness };
    if (i === 0) {
      const prev = verts[n - 1];
      const startMid = { x: (prev.x + curr.x) / 2, y: (prev.y + curr.y) / 2 };
      const startPt = { x: curr.x + (startMid.x - curr.x) * roundness, y: curr.y + (startMid.y - curr.y) * roundness };
      shape.moveTo(startPt.x, startPt.y);
    }
    shape.quadraticCurveTo(curr.x, curr.y, endPt.x, endPt.y);
  }
  shape.closePath();
  return shape;
}

const extrudeSettings = {
  depth: 0.3,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.1,
  bevelSegments: 6,
  curveSegments: 24,
};

const STAR_COLORS = [
  new THREE.Color('#ff2020'),
  new THREE.Color('#fff06a'),
  new THREE.Color('#f5a623'),
];

interface StarPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  active: boolean;
  delay: number;
  started: boolean;
  bounceCount: number;
}

/* ─── Single falling star mesh ─── */
function FallingStarMesh({
  color,
  scale,
  depthScale = 1,
  physics,
}: {
  color: THREE.Color;
  scale: number;
  depthScale?: number;
  physics: React.MutableRefObject<StarPhysics>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = createRoundedStarShape(1.6, 0.8, 5, 0.35);
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = physics.current;
    if (!p.active || !p.started) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;
    meshRef.current.position.set(p.x, p.y, 0);
    meshRef.current.rotation.z = p.rotation;
    meshRef.current.rotation.y = p.rotation * 0.5;
    meshRef.current.scale.set(scale, scale, scale * depthScale);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} visible={false}>
      <MeshTransmissionMaterial
        transmission={0.9}
        thickness={1.0}
        roughness={0.03}
        chromaticAberration={0.15}
        anisotropy={0.3}
        ior={1.5}
        color={color}
        envMapIntensity={2.0}
        backside
        backsideThickness={0.4}
      />
    </mesh>
  );
}

/* ─── Convert DOM rect to Three.js viewport coords ─── */
function domToThree(
  rect: DOMRect,
  viewport: { width: number; height: number },
  windowW: number,
  windowH: number
) {
  const left = (rect.left / windowW - 0.5) * viewport.width;
  const right = (rect.right / windowW - 0.5) * viewport.width;
  const top = -(rect.top / windowH - 0.5) * viewport.height;
  const bottom = -(rect.bottom / windowH - 0.5) * viewport.height;
  return { left, right, top, bottom, centerX: (left + right) / 2, width: right - left };
}

/* ─── Physics simulation scene ─── */
function FallingStarsScene({
  triggerCount,
  targetRect,
  starScale = 1,
  starDepth = 1,
}: {
  triggerCount: number;
  targetRect: DOMRect | null;
  starScale?: number;
  starDepth?: number;
}) {
  const { viewport } = useThree();
  const halfH = viewport.height / 2;
  const halfW = viewport.width / 2;

  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Compute target bounds in Three.js coords
  const target = targetRect
    ? domToThree(targetRect, viewport, windowSize.w, windowSize.h)
    : null;

  // Floor = top of the module (stars land on top then slide down)
  const floorY = target ? target.top : 0;
  // Bottom of card for deactivation
  const bottomY = target ? target.bottom - 1 : -halfH - 2;

  // Listen for double-click boost events
  useEffect(() => {
    const handleBoost = () => {
      physicsRefs.current.forEach((ref) => {
        const p = ref.current;
        if (p.active && p.started) {
          p.vx += (p.vx >= 0 ? 2.5 : -2.5);
          p.vy += 1.5;
          p.rotSpeed *= 2;
        }
      });
    };
    window.addEventListener('star-boost', handleBoost);
    return () => window.removeEventListener('star-boost', handleBoost);
  }, []);

  const star0 = useRef<StarPhysics>({ x: 0, y: 0, vx: 0, vy: 0, rotation: 0, rotSpeed: 0, active: false, delay: 0, started: false, bounceCount: 0 });
  const star1 = useRef<StarPhysics>({ x: 0, y: 0, vx: 0, vy: 0, rotation: 0, rotSpeed: 0, active: false, delay: 0, started: false, bounceCount: 0 });
  const star2 = useRef<StarPhysics>({ x: 0, y: 0, vx: 0, vy: 0, rotation: 0, rotSpeed: 0, active: false, delay: 0, started: false, bounceCount: 0 });

  const physicsRefs = useRef([star0, star1, star2]);
  const elapsedRef = useRef(0);
  const targetRectRef = useRef(targetRect);
  targetRectRef.current = targetRect;

  // Start X positions relative to target
  const startXPositions = target
    ? [target.left + target.width * 0.2, target.centerX, target.left + target.width * 0.8]
    : [-halfW * 0.6, 0, halfW * 0.6];

  // Bounce directions: left side, down middle, right side
  const bounceDirX = target
    ? [-1.2, 0.3, 1.2]
    : [1.8, -1.5, 2.2];

  useEffect(() => {
    if (triggerCount <= 0) return;
    elapsedRef.current = 0;

    const t = targetRectRef.current
      ? domToThree(targetRectRef.current, viewport, windowSize.w, windowSize.h)
      : null;

    const xPositions = t
      ? [t.left + t.width * 0.2, t.centerX, t.left + t.width * 0.8]
      : [-halfW * 0.6, 0, halfW * 0.6];

    const delays = [0, 0.15, 0.3];

    physicsRefs.current.forEach((ref, i) => {
      ref.current = {
        x: xPositions[i],
        y: halfH + 1.5,
        vx: 0,
        vy: 0,
        rotation: i * 1.2,
        rotSpeed: (1.5 + i * 0.5) * (i % 2 === 0 ? 1 : -1),
        active: true,
        delay: delays[i],
        started: false,
        bounceCount: 0,
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerCount]);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    const GRAVITY = -3.5;
    const BOUNCE = 0.35;

    physicsRefs.current.forEach((ref, i) => {
      const p = ref.current;
      if (!p.active) return;

      if (!p.started) {
        if (elapsedRef.current >= p.delay) p.started = true;
        return;
      }

      p.vy += GRAVITY * delta;
      p.y += p.vy * delta;
      p.x += p.vx * delta;
      p.rotation += p.rotSpeed * delta;

      // Bounce off the top of the module
      if (p.y <= floorY && p.bounceCount < 2) {
        p.y = floorY;
        p.bounceCount++;
        p.vy = -p.vy * BOUNCE;
        if (p.bounceCount === 1) {
          p.vx = bounceDirX[i];
        }
        p.rotSpeed *= 0.6;
      }

      // After bouncing, just fall through
      if (p.bounceCount >= 2 && p.y < bottomY) {
        p.active = false;
      }

      // Off screen sideways
      if (Math.abs(p.x) > halfW + 2) {
        p.active = false;
      }
    });
  });

  const scales = [0.65 * starScale, 0.55 * starScale, 0.6 * starScale];

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[0, 3, 3]} intensity={1.0} color="#ffffff" />
      <Environment preset="city" />
      {physicsRefs.current.map((ref, i) => (
        <FallingStarMesh
          key={i}
          color={STAR_COLORS[i]}
          scale={scales[i]}
          depthScale={starDepth}
          physics={ref}
        />
      ))}
    </>
  );
}

/* ─── Main export ─── */
export function FallingStars({
  triggerCount,
  targetRect = null,
  starScale = 1,
  starDepth = 1,
}: {
  triggerCount: number;
  targetRect?: DOMRect | null;
  starScale?: number;
  starDepth?: number;
}) {
  if (triggerCount <= 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        gl={{ alpha: true, antialias: true }}
      >
        <FallingStarsScene triggerCount={triggerCount} targetRect={targetRect} starScale={starScale} starDepth={starDepth} />
      </Canvas>
    </div>
  );
}
