"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const TECH_ICONS = [
  { name: "HTML", color: "#F43F5E" },
  { name: "CSS", color: "#06B6D4" },
  { name: "TypeScript", color: "#3B82F6" },
  { name: "React", color: "#06B6D4" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Node.js", color: "#10B981" },
  { name: "MongoDB", color: "#10B981" },
  { name: "Git", color: "#EF4444" },
  { name: "Docker", color: "#06B6D4" },
  { name: "Firebase", color: "#FBBF24" },
  { name: "AI Tools", color: "#A78BFA" },
  { name: "Express", color: "#F59E0B" },
  { name: "PostgreSQL", color: "#3B82F6" },
  { name: "JavaScript", color: "#FBBF24" },
];

const CITY_LIGHTS = [
  { lat: 23.7, lng: 90.4, size: 0.9 },
  { lat: 40.7, lng: -74.0, size: 0.7 },
  { lat: 51.5, lng: -0.1, size: 0.8 },
  { lat: 35.7, lng: 139.8, size: 0.7 },
  { lat: 52.5, lng: 13.4, size: 0.6 },
  { lat: 12.9, lng: 77.6, size: 0.7 },
  { lat: 1.3, lng: 103.8, size: 0.6 },
  { lat: 19.1, lng: 72.9, size: 0.6 },
  { lat: 55.8, lng: -156.2, size: 0.5 },
  { lat: -33.9, lng: 18.4, size: 0.5 },
  { lat: 25.2, lng: 55.3, size: 0.6 },
  { lat: 35.7, lng: 139.6, size: 0.6 },
  { lat: 48.9, lng: 2.4, size: 0.6 },
  { lat: 59.9, lng: 30.3, size: 0.5 },
  { lat: 34.0, lng: -118.2, size: 0.6 },
  { lat: -37.8, lng: 145.0, size: 0.5 },
];

function seededRandom(seed) {
  let s = seed * 9301 + 49297;
  s -= Math.floor(s) * 1;
  return s * 0.00001;
}

function latLngToVec3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function createLightsTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size * 0.5;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, size, canvas.height);
  ctx.globalCompositeOperation = "lighter";
  CITY_LIGHTS.forEach((city) => {
    const u = ((city.lng + 180) / 360) * size;
    const v = ((90 - city.lat) / 180) * canvas.height;
    const rad = size * 0.018 * city.size;
    const grad = ctx.createRadialGradient(u, v, 0, u, v, rad * 3);
    grad.addColorStop(0, "#06b6d4");
    grad.addColorStop(0.5, "#06b6d4");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(u, v, rad, 0, Math.PI * 2);
    ctx.fill();
  });
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function createEarthTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#1a2a6c");
  gradient.addColorStop(0.4, "#0d4d8a");
  gradient.addColorStop(0.6, "#0a2e50");
  gradient.addColorStop(1, "#020a17");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    if (r > 30 && g > 20 && r < 80 && g < 90) {
      const noise = (Math.random() - 0.5) * 30;
      data[i] = Math.min(255, Math.max(0, r + noise));
      data[i + 1] = Math.min(255, Math.max(0, g + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
  }
  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function Earth() {
  const earthRef = useRef();
  const lightsTex = useMemo(() => createLightsTexture(), []);
  const earthTex = useMemo(() => createEarthTexture(), []);
  const materialRef = useRef();

  useEffect(() => {
    const m = materialRef.current;
    if (m && lightsTex) {
      m.emissive = new THREE.Color("#01243d");
      m.emissiveIntensity = 0.4;
      m.emissiveMap = lightsTex;
    }
  }, [lightsTex]);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={earthRef}>
      <ambientLight intensity={0.35} color="#06b6d4" />
      <directionalLight position={[5, 3, 5]} intensity={1} color="#ffffff" />
      <hemisphereLight skyColor="#06b6d4" groundColor="#020a17" intensity={0.3} />
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#020a17"
          roughness={0.6}
          metalness={0.1}
          map={earthTex}
        />
      </mesh>
      <EarthGlow />
    </group>
  );
}

function EarthGlow() {
  const glowRef = useRef();
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "#06b6d4");
    gradient.addColorStop(0.5, "#7c3aed");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsed * 0.02;
      glowRef.current.rotation.z = Math.sin(state.clock.elapsed * 0.2) * 0.03;
    }
  });

  return (
    <mesh ref={glowRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.55, 64, 64]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.35}
        side={THREE.BackSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function NetworkArcs({ radius = 2.55 }) {
  const { geometry, pointPositions } = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 12; i++) {
      const lat = (seededRandom(i * 13.4) - 0.5) * 120;
      const lng = (seededRandom(i * 7.7) - 0.5) * 360;
      pts.push(latLngToVec3(lat, lng, radius + 0.02));
    }
    const pos = [];
    let seed = 0;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        seed += 1;
        if (seededRandom(seed) > 0.4) {
          pos.push(pts[i].x, pts[i].y, pts[i].z);
          pos.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return { geometry: geom, pointPositions: pts };
  }, [radius]);

  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.25 + Math.sin(clock.elapsed * 1.3) * 0.12;
    }
  });

  const pointsArray = useMemo(
    () => new Float32Array(pointPositions.flatMap((p) => [p.x, p.y, p.z])),
    [pointPositions]
  );

  return (
    <group>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute attach="attributes-position" args={[pointsArray, 3]} />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.05}
          sizeAttenuation
          color="#06b6d4"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          ref={materialRef}
          attach="material"
          color="#06b6d4"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function TechOrb({ name, color }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const c = useMemo(() => new THREE.Color(color || "#06b6d4"), [color]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.color.lerp(c, 0.1);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color={c}
          emissive={c}
          emissiveIntensity={hovered ? 0.6 : 0.25}
          roughness={0.2}
          metalness={0.8}
        />
        <pointLight color={c} intensity={hovered ? 1.4 : 0.6} distance={2.2} />
      </mesh>
      <Html
        distanceFactor={11}
        position={[0, 0.35, 0]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div
          className="px-1.5 py-0.5 rounded text-[0.55rem] font-mono whitespace-nowrap"
          style={{
            color: color || "#06b6d4",
            opacity: hovered ? 1 : 0,
            textShadow: "0 0 8px rgba(0,0,0,0.8)",
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

function OrbitingTech() {
  const groupRef = useRef();

  const orbits = useMemo(() => {
    return TECH_ICONS.map((tech, i) => {
      const orbitRadius = 3.3 + (i % 3) * 0.6;
      const speed = 0.06 + (i % 5) * 0.035;
      const offset = (i * Math.PI) / 4.5;
      const elevation = ((i % 3) - 1) * 0.45;
      const initialAngle = (i * (Math.PI * 2)) / TECH_ICONS.length;
      return { tech, orbitRadius, speed, offset, elevation, initialAngle };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0015;
    const children = groupRef.current.children;
    children.forEach((child, i) => {
      const o = orbits[i];
      if (!o) return;
      const t = clock.elapsed * o.speed + o.offset + o.initialAngle;
      child.position.x = Math.cos(t) * o.orbitRadius;
      child.position.z = Math.sin(t) * o.orbitRadius;
      child.position.y = o.elevation + Math.sin(t * 0.6) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {orbits.map((o) => (
         <TechOrb
           key={o.tech.name}
           name={o.tech.name}
           color={o.tech.color}
         />
      ))}
    </group>
  );
}

function AnimatedOrbitRings({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const radius = 3.3 + i * 0.6;
        const pts = [];
        for (let j = 0; j <= 64; j++) {
          const t = (j / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
        }
        const geom = new THREE.BufferGeometry();
        geom.setFromPoints(pts);
        return (
          <mesh key={`ring-${i}`} rotation={new THREE.Euler(0, (i * Math.PI) / 6, 0)}>
            <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
            <meshBasicMaterial
              color="#06b6d4"
              opacity={0.08 + i * 0.03}
              transparent
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
            <lineLoop geometry={geom}>
              <lineBasicMaterial color="#06b6d4" opacity={0.15} transparent />
            </lineLoop>
          </mesh>
        );
      })}
    </>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 8, 30]} />
      <hemisphereLight skyColor="#06b6d4" groundColor="#020a17" intensity={0.4} />
      <Earth />
      <NetworkArcs />
      <OrbitingTech />
      <AnimatedOrbitRings />
    </>
  );
}

export default function Globe3D() {
  const controlsRef = useRef();

  return (
    <div className="relative w-full h-[460px] sm:h-[560px] rounded-2xl overflow-hidden glass-strong">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.15}
        />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
    </div>
  );
}

