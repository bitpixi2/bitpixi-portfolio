import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Star shape generator ─── */
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

/* ─── Shared geometry settings ─── */
const extrudeSettings = {
  depth: 0.5,
  bevelEnabled: true,
  bevelThickness: 0.15,
  bevelSize: 0.15,
  bevelSegments: 8,
  curveSegments: 32,
};

/* ─── Colour constants ─── */
const COLOR_CLEAR = new THREE.Color('#ffffff');
const COLOR_RED = new THREE.Color('#ff2020');
const COLOR_YELLOW = new THREE.Color('#fff06a');
const COLOR_ORANGE = new THREE.Color('#f5a623');

/* ─── Individual star mesh ─── */
function StarMesh({ isDragging, dragColor, idleColor }: { isDragging: boolean; dragColor: THREE.Color; idleColor: THREE.Color }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const colorRef = useRef(idleColor.clone());

  const geometry = useMemo(() => {
    const shape = createRoundedStarShape(1.6, 0.8, 5, 0.35);
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      if (isDragging) {
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      } else {
        meshRef.current.rotation.z += delta * 0.3;
        meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        meshRef.current.rotation.y = Math.cos(Date.now() * 0.0008) * 0.15;
      }
    }
    const target = isDragging ? dragColor : idleColor;
    colorRef.current.lerp(target, delta * 4);
    if (materialRef.current) materialRef.current.color.copy(colorRef.current);
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial
        ref={materialRef}
        transmission={0.92}
        thickness={1.2}
        roughness={0.03}
        chromaticAberration={0.06}
        anisotropy={0.3}
        ior={1.45}
        color={idleColor}
        envMapIntensity={2.0}
        backside
        backsideThickness={0.6}
      />
    </mesh>
  );
}

/* ─── Merged latte star mesh with rainbow refraction + scale-in animation ─── */
function MergedStarMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(0.01);

  const geometry = useMemo(() => {
    const shape = createRoundedStarShape(1.6, 0.8, 5, 0.35);
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Gooey scale-in: overshoot then settle
      const target = 1.0;
      const spring = 6;
      const damping = 0.85;
      scaleRef.current += (target - scaleRef.current) * spring * delta;
      scaleRef.current = scaleRef.current + (target - scaleRef.current) * (1 - Math.pow(damping, delta * 60));
      // Add a slight overshoot wobble
      const wobble = 1 + Math.sin(Date.now() * 0.008) * Math.max(0, 0.05 * (1 - scaleRef.current));
      const s = scaleRef.current * wobble;
      meshRef.current.scale.set(s, s, s);
      
      meshRef.current.rotation.z += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0008) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial
        transmission={0.9}
        thickness={1.4}
        roughness={0.01}
        chromaticAberration={0.4}
        anisotropy={0.5}
        ior={1.8}
        color={COLOR_ORANGE}
        envMapIntensity={3}
        backside
        backsideThickness={0.8}
      />
    </mesh>
  );
}

/* ─── Shared lighting setup (brighter highlights) ─── */
function StarLighting() {
  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 5, 5]} intensity={2.0} />
      <directionalLight position={[-3, -2, 4]} intensity={0.8} />
      <pointLight position={[0, 3, 3]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-2, -1, 4]} intensity={0.6} color="#ffe8cc" />
      <Environment preset="city" />
    </>
  );
}

/* ─── Draggable star wrapper ─── */
interface DraggableStarProps {
  size: number;
  isDragging: boolean;
  dragColor: THREE.Color;
  idleColor: THREE.Color;
  onDragStart: (id: string, offsetX: number, offsetY: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: () => void;
  position: { x: number; y: number };
  id: string;
  visible: boolean;
}

function DraggableStar({ size, isDragging, dragColor, idleColor, onDragStart, onDragMove, onDragEnd, position, id, visible }: DraggableStarProps) {
  const half = size / 2;
  const dragStartRef = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    onDragStart(id, e.clientX - position.x, e.clientY - position.y);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [id, onDragStart, position]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    onDragMove(e.clientX - dragStartRef.current.x, e.clientY - dragStartRef.current.y);
  }, [isDragging, onDragMove]);

  const [wasHidden, setWasHidden] = useState(false);
  const [popIn, setPopIn] = useState(false);
  
  useEffect(() => {
    if (!visible) {
      setWasHidden(true);
      setPopIn(false);
    } else if (wasHidden) {
      setPopIn(true);
      const timer = setTimeout(() => setPopIn(false), 600);
      return () => clearTimeout(timer);
    }
  }, [visible, wasHidden]);

  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        width: size,
        height: size,
        left: position.x - half,
        top: position.y - half,
        cursor: isDragging ? 'grabbing' : 'grab',
        animation: popIn ? 'starPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onDragEnd}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        gl={{ alpha: true, antialias: true }}
      >
        <StarLighting />
        <StarMesh isDragging={isDragging} dragColor={dragColor} idleColor={idleColor} />
      </Canvas>
    </div>
  );
}

/* ─── Main export: two stars that merge & unmerge ─── */
export function GlassStar() {
  const SIZE_ORANGE = 180;
  const SIZE_GREEN = 140;
  const SIZE_MERGED = 280;

  const [orangePos, setOrangePos] = useState({ x: 0, y: 0 });
  const [greenPos, setGreenPos] = useState({ x: 0, y: 0 });
  const [mergedPos, setMergedPos] = useState({ x: 0, y: 0 });

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [merged, setMerged] = useState(false);

  const orangePosRef = useRef({ x: 0, y: 0 });
  const greenPosRef = useRef({ x: 0, y: 0 });
  const mergedPosRef = useRef({ x: 0, y: 0 });
  const initialPositions = useRef({ orange: { x: 0, y: 0 }, green: { x: 0, y: 0 } });


  // Deterministic initial positions

  // Deterministic initial positions
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const oPos = { x: vw * 0.62, y: vh * 0.28 };
    const gPos = { x: vw * 0.42, y: vh * 0.55 };
    setOrangePos(oPos);
    setGreenPos(gPos);
    orangePosRef.current = oPos;
    greenPosRef.current = gPos;
    initialPositions.current = { orange: oPos, green: gPos };
  }, []);

  const checkStarOverlap = useCallback(() => {
    const o = orangePosRef.current;
    const g = greenPosRef.current;
    const dx = o.x - g.x;
    const dy = o.y - g.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = (SIZE_ORANGE / 2 + SIZE_GREEN / 2) * 0.45;
    return dist < threshold;
  }, []);

  const checkPhotoOverlap = useCallback((starX: number, starY: number, starHalf: number) => {
    const photoEl = document.querySelector('[data-photo]') as HTMLElement;
    if (!photoEl) return;
    const rect = photoEl.getBoundingClientRect();
    const overlapping =
      starX - starHalf < rect.right &&
      starX + starHalf > rect.left &&
      starY - starHalf < rect.bottom &&
      starY + starHalf > rect.top;
    window.dispatchEvent(new CustomEvent('star-overlap', { detail: { overlapping } }));
  }, []);

  const onDragStart = useCallback((id: string) => {
    setDraggingId(id);
  }, []);

  const onOrangeDragMove = useCallback((x: number, y: number) => {
    orangePosRef.current = { x, y };
    setOrangePos({ x, y });
    checkPhotoOverlap(x, y, SIZE_ORANGE / 2);
    if (checkStarOverlap()) {
      const mid = {
        x: (orangePosRef.current.x + greenPosRef.current.x) / 2,
        y: (orangePosRef.current.y + greenPosRef.current.y) / 2,
      };
      setMergedPos(mid);
      mergedPosRef.current = mid;
      setMerged(true);
      setDraggingId(null);
    }
  }, [checkStarOverlap, checkPhotoOverlap]);

  const onGreenDragMove = useCallback((x: number, y: number) => {
    greenPosRef.current = { x, y };
    setGreenPos({ x, y });
    checkPhotoOverlap(x, y, SIZE_GREEN / 2);
    if (checkStarOverlap()) {
      const mid = {
        x: (orangePosRef.current.x + greenPosRef.current.x) / 2,
        y: (orangePosRef.current.y + greenPosRef.current.y) / 2,
      };
      setMergedPos(mid);
      mergedPosRef.current = mid;
      setMerged(true);
      setDraggingId(null);
    }
  }, [checkStarOverlap, checkPhotoOverlap]);

  const onDragEnd = useCallback(() => {
    setDraggingId(null);
    window.dispatchEvent(new CustomEvent('star-overlap', { detail: { overlapping: false } }));
  }, []);

  // Merged star drag + triple-click unmerge
  const [mergedDragging, setMergedDragging] = useState(false);
  const mergedDragOffset = useRef({ x: 0, y: 0 });

  const getRandomPositions = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 120;
    const oPos = {
      x: margin + Math.random() * (vw - margin * 2),
      y: margin + Math.random() * (vh - margin * 2),
    };
    // Ensure green star isn't too close to orange
    let gPos;
    do {
      gPos = {
        x: margin + Math.random() * (vw - margin * 2),
        y: margin + Math.random() * (vh - margin * 2),
      };
    } while (Math.hypot(gPos.x - oPos.x, gPos.y - oPos.y) < 200);
    return { orange: oPos, green: gPos };
  }, []);

  const handleUnmerge = useCallback(() => {
    const pos = getRandomPositions();
    setMerged(false);
    setOrangePos(pos.orange);
    setGreenPos(pos.green);
    orangePosRef.current = pos.orange;
    greenPosRef.current = pos.green;
    setMergedDragging(false);
    window.dispatchEvent(new CustomEvent('star-overlap', { detail: { overlapping: false } }));
  }, [getRandomPositions]);

  const onMergedDoubleClick = useCallback(() => {
    handleUnmerge();
  }, [handleUnmerge]);

  const onMergedPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMergedDragging(true);
    mergedDragOffset.current = { x: e.clientX - mergedPosRef.current.x, y: e.clientY - mergedPosRef.current.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onMergedPointerMove = useCallback((e: React.PointerEvent) => {
    if (!mergedDragging) return;
    const newPos = { x: e.clientX - mergedDragOffset.current.x, y: e.clientY - mergedDragOffset.current.y };
    mergedPosRef.current = newPos;
    setMergedPos(newPos);
    checkPhotoOverlap(newPos.x, newPos.y, SIZE_MERGED / 2);
  }, [mergedDragging, checkPhotoOverlap]);

  const onMergedPointerUp = useCallback(() => {
    setMergedDragging(false);
    // Check if merged star was thrown off-screen
    const p = mergedPosRef.current;
    const margin = -50;
    if (p.x < margin || p.x > window.innerWidth - margin || p.y < margin || p.y > window.innerHeight - margin) {
      handleUnmerge();
      return;
    }
    window.dispatchEvent(new CustomEvent('star-overlap', { detail: { overlapping: false } }));
  }, [handleUnmerge]);

  const mergedHalf = SIZE_MERGED / 2;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <DraggableStar
        id="orange"
        size={SIZE_ORANGE}
        position={orangePos}
        isDragging={draggingId === 'orange'}
        dragColor={COLOR_RED}
        idleColor={COLOR_CLEAR}
        onDragStart={onDragStart}
        onDragMove={onOrangeDragMove}
        onDragEnd={onDragEnd}
        visible={!merged}
      />

      <DraggableStar
        id="green"
        size={SIZE_GREEN}
        position={greenPos}
        isDragging={draggingId === 'green'}
        dragColor={COLOR_YELLOW}
        idleColor={COLOR_CLEAR}
        onDragStart={onDragStart}
        onDragMove={onGreenDragMove}
        onDragEnd={onDragEnd}
        visible={!merged}
      />

      {merged && (
        <div
          className="absolute pointer-events-auto"
          style={{
            width: SIZE_MERGED,
            height: SIZE_MERGED,
            left: mergedPos.x - mergedHalf,
            top: mergedPos.y - mergedHalf,
            cursor: mergedDragging ? 'grabbing' : 'grab',
            animation: 'starMergeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
          onDoubleClick={onMergedDoubleClick}
          onPointerDown={onMergedPointerDown}
          onPointerMove={onMergedPointerMove}
          onPointerUp={onMergedPointerUp}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: 'transparent', pointerEvents: 'none' }}
            gl={{ alpha: true, antialias: true }}
          >
            <StarLighting />
            <MergedStarMesh />
          </Canvas>
        </div>
      )}
    </div>
  );
}
