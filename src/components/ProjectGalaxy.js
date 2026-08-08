"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Text, useTexture } from "@react-three/drei";
import { useState, useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { PROJECTS } from "@/lib/data";

const ICON_COLORS = ["#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700"];

function DeveloperPlanet() {
  const ref = useRef();
  const outerRef = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.z = Math.sin(state.clock.elapsed * 0.3) * 0.05;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = state.clock.elapsed * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 48, 48]} />
        <meshStandardMaterial
          color="#050505"
          emissive="#FFD700"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.7}
        />
        <Html position={[0, 1.2, 0]} center distanceFactor={14}>
          <div className="text-center">
            <div className="text-[0.55rem] font-mono text-[#FFD700] tracking-wider">
              DEV
            </div>
            <div className="text-[0.45rem] text-white/50 mt-0.5">Central Node</div>
          </div>
        </Html>
        <pointLight color="#FFD700" intensity={1.2} distance={4} />
      </mesh>

      <mesh ref={outerRef}>
        <ringGeometry args={[0.95, 1.05, 64]} />
        <meshBasicMaterial
          color="#FFD700"
          opacity={0.15}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={outerRef}>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          opacity={0.08}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function ProjectPlanet({ project, index, onSelect }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const angle = useMemo(
    () => (index * (Math.PI * 2)) / PROJECTS.length + (index % 2),
    [index]
  );
  const radius = useMemo(() => 3.2 + (index % 2) * 0.6, [index]);
  const targetRadius = radius + (hovered ? 0.35 : 0);
  const yOffset = useMemo(() => (index % 2 === 0 ? 0.5 : -0.5), [index]);

  const texture = useTexture(
    typeof project.image === "object" && project.image !== null
      ? project.image.src || ""
      : project.image || ""
  );

  const color = useMemo(() => ICON_COLORS[index % ICON_COLORS.length], [index]);

  const tags = useMemo(
    () =>
      project.tags && typeof project.tags === "string"
        ? project.tags.split(",")
        : Array.isArray(project.tags)
        ? project.tags
        : [],
    [project.tags]
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsed * (0.15 + index * 0.03) + angle;
    const r = THREE.MathUtils.lerp(
      ref.current.position.length(),
      targetRadius,
      0.04
    );
    ref.current.position.x = Math.cos(t) * r;
    ref.current.position.z = Math.sin(t) * r;
    ref.current.position.y = Math.sin(t * 0.7) * yOffset + yOffset * 0.4;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.x += 0.005;
  });

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={() => onSelect?.(project)}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          roughness={0.25}
          metalness={0.2}
          emissive={hovered ? color : "#111"}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          map={texture}
        />
        <pointLight color={color} intensity={hovered ? 1 : 0.3} distance={2.5} />

        {hovered && (
          <Html distanceFactor={10} position={[0, 0.8, 0]} center>
            <div className="bg-ink-800/90 backdrop-blur-xl border border-[#FFD700]/30 rounded-lg px-3 py-2 text-center animate-fade-in">
              <div className="text-white font-semibold text-xs mb-1">
                {project.title}
              </div>
              <div className="flex flex-wrap gap-0.5 justify-center">
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.5rem] text-[#FFD700] bg-[#FFD700]/10 px-1.5 py-0.25 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Html>
        )}
      </mesh>

      <OrbitPath radius={radius + 0.1} height={0} color={color} />
      <OrbitPath radius={radius + 0.15} height={0.2} color={color} />
    </group>
  );
}

function OrbitPath({ radius, height, color }) {
  const lineRef = useRef();

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(t) * radius,
          height,
          Math.sin(t) * radius
        )
      );
    }
    return pts;
  }, [radius, height]);

  return (
    <lineLoop ref={lineRef}>
      <bufferGeometry attach="geometry" ref={(g) => g && g.setFromPoints(points)} />
      <lineBasicMaterial
        attach="material"
        color={color || "#FFD700"}
        opacity={0.15}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </lineLoop>
  );
}

function Scene({ onSelect }) {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.4} color="#FFD700" />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <hemisphereLight skyColor="#FFD700" groundColor="#000" intensity={0.3} />

      <DeveloperPlanet />

      {Array.from({ length: 3 }).map((_, i) => (
        <OrbitPath
          key={`ring-${i}`}
          radius={3.2 + i * 0.6}
          height={0}
          color="#FFD700"
        />
      ))}

      {PROJECTS.map((project, i) => (
        <ProjectPlanet
          key={project.title}
          project={project}
          index={i}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        autoRotate
        autoRotateSpeed={0.1}
      />
    </>
  );
}

export default function ProjectGalaxy({ onSelect }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerMissed={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <Suspense fallback={null}>
        <Scene onSelect={onSelect} />
      </Suspense>
    </Canvas>
  );
}

