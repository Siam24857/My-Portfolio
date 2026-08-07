"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiFigma, SiThreedotjs, SiGsap, SiWebgl, SiFramer,
  SiGit, SiGithub, SiNpm, SiVite
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  MdDevices, MdAutoAwesome, MdAnimation, MdBrush, MdSwapVert,
  MdApi, MdSpeed, MdLayers
} from "react-icons/md";
import { SOLAR_ORBITS } from "@/lib/data";

const ICON_MAP = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  JavaScript: SiJavascript,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Responsive Design": MdDevices,
  "Glassmorphism UI": MdLayers,
  "Animation Design": MdAutoAwesome,
  "Motion Design": MdAnimation,
  Figma: SiFigma,
  "Three.js": SiThreedotjs,
  "GSAP Animation": SiGsap,
  "Canvas API": MdBrush,
  WebGL: SiWebgl,
  "Framer Motion": SiFramer,
  "Scroll Animation": MdSwapVert,
  "Git & GitHub": SiGit,
  "VS Code": VscVscode,
  npm: SiNpm,
  Vite: SiVite,
  "API Integration": MdApi,
  "Website Optimization": MdSpeed,
};

export default function Skills() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeOrbitId, setActiveOrbitId] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 18, y: 0 });
  const animFrameRef = useRef(null);
  const anglesRef = useRef({});

  // Initialize angles for each planet
  useEffect(() => {
    const initialAngles = {};
    SOLAR_ORBITS.forEach((orbit) => {
      const step = (Math.PI * 2) / orbit.planets.length;
      orbit.planets.forEach((planet, idx) => {
        initialAngles[planet.name] = idx * step;
      });
    });
    anglesRef.current = initialAngles;
  }, []);

  // Canvas background starfield & energy waves behind Solar System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
    }));

    let pulse = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulse += 0.02;

      // Subtle cosmic background stars
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) star.speed = -star.speed;
        ctx.fillStyle = `rgba(6, 182, 212, ${Math.max(0, star.alpha * 0.4)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Energy wave rings from center Sun
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const waveRadius = (Math.sin(pulse) * 0.5 + 0.5) * 80 + 70;

      ctx.save();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, waveRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(167, 139, 250, 0.1)";
      ctx.beginPath();
      ctx.arc(cx, cy, waveRadius * 1.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax tilt on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: e.clientX, y: e.clientY });
    setTilt({
      x: 18 - y * 14,
      y: x * 18,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 18, y: 0 });
  };

  const activePlanet = selectedPlanet || hoveredPlanet;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-28 px-4 sm:px-6 overflow-hidden bg-transparent"
      id="skills"
    >
      {/* Background Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      />

      <div className="container-page relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label justify-center mb-4"
          >
            AI Skill Universe
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
          >
            AI Solar System <span className="text-gradient-brand">Visualization</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed"
          >
            Explore my creative frontend ecosystem. The central AI Sun powers four
            interactive orbits of modern web technologies. Hover or tap any planet
            to inspect skill metrics.
          </motion.p>

          {/* Orbit Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8"
          >
            <button
              onClick={() => setActiveOrbitId(null)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-300 ${
                activeOrbitId === null
                  ? "bg-gradient-to-r from-[#0284c7] to-[#7c3aed] text-white shadow-[0_4px_20px_rgba(2,132,199,0.4)]"
                  : "glass text-slate-700 hover:text-slate-900 border border-slate-300"
              }`}
            >
              All Orbits
            </button>
            {SOLAR_ORBITS.map((orbit) => (
              <button
                key={orbit.id}
                onClick={() =>
                  setActiveOrbitId(activeOrbitId === orbit.id ? null : orbit.id)
                }
                className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-300 ${
                  activeOrbitId === orbit.id
                    ? "bg-[#0284c7] text-white font-bold shadow-[0_4px_20px_rgba(2,132,199,0.5)]"
                    : "glass text-slate-700 hover:text-slate-900 border border-slate-300"
                }`}
              >
                Orbit {orbit.id}: {orbit.title.split(" ")[0]}
              </button>
            ))}
          </motion.div>
        </div>

        {/* SOLAR SYSTEM 3D STAGE */}
        <div className="relative w-full max-w-6xl mx-auto h-[620px] sm:h-[720px] flex items-center justify-center perspective-[1200px]">
          {/* Main 3D Container with Parallax Tilt */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* CENTER AI SUN */}
            <div
              className="absolute z-20 flex items-center justify-center cursor-pointer group"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => setSelectedPlanet(null)}
            >
              {/* Outer Solar Flames Corona */}
              <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-r from-[#0284c7]/40 via-[#7c3aed]/40 to-[#f43f5e]/40 blur-2xl animate-pulse" />
              <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#0284c7]/60 to-[#a78bfa]/60 blur-xl animate-spin-slow" />

              {/* Concentric Holographic Rings */}
              <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-[#0284c7]/40 animate-ping opacity-30" />
              <div className="absolute w-56 h-56 sm:w-68 sm:h-68 rounded-full border border-[#a78bfa]/30 animate-spin-slow" />

              {/* Glowing Core Sun Sphere */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#ffffff] via-[#38bdf8] to-[#7c3aed] shadow-[0_0_60px_rgba(2,132,199,0.8)] border-2 border-white flex flex-col items-center justify-center p-3 text-center transition-transform duration-500 group-hover:scale-110">
                <span className="text-xl sm:text-2xl mb-0.5 animate-bounce">☀</span>
                <span className="text-[0.65rem] sm:text-xs font-black tracking-wider text-slate-950 uppercase leading-tight">
                  AI Creative
                </span>
                <span className="text-[0.6rem] sm:text-[0.7rem] font-extrabold text-white tracking-widest uppercase">
                  Core
                </span>
              </div>

              {/* Sun Core Floating Labels */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-md border border-[#0284c7]/50 px-3.5 py-1 rounded-full text-[0.65rem] font-extrabold text-[#0284c7] tracking-widest uppercase shadow-lg">
                Creativity • Innovation • Problem Solving
              </div>
            </div>

            {/* ORBIT RINGS & PLANETS */}
            {SOLAR_ORBITS.map((orbit) => {
              const isDimmed =
                activeOrbitId !== null && activeOrbitId !== orbit.id;
              const isHighlighted = activeOrbitId === orbit.id;

              return (
                <div
                  key={orbit.id}
                  className={`absolute rounded-full border transition-all duration-500 pointer-events-none ${
                    isHighlighted
                      ? "border-[#0284c7] shadow-[0_0_30px_rgba(2,132,199,0.5)] border-2"
                      : isDimmed
                      ? "border-slate-300/20 opacity-30"
                      : "border-slate-400/40 hover:border-[#0284c7]/60"
                  }`}
                  style={{
                    width: orbit.radius * 2,
                    height: orbit.radius * 2,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Orbit Label */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.6rem] font-bold tracking-widest text-[#0284c7] uppercase bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-300 shadow-sm"
                    style={{ transform: "rotateX(-18deg)" }}
                  >
                    Orbit {orbit.id} • {orbit.title}
                  </div>

                  {/* Orbiting Planets */}
                  {orbit.planets.map((planet, pIdx) => (
                    <OrbitingPlanet
                      key={planet.name}
                      planet={planet}
                      orbit={orbit}
                      planetIndex={pIdx}
                      totalPlanets={orbit.planets.length}
                      isDimmed={isDimmed}
                      isHovered={hoveredPlanet?.name === planet.name}
                      isSelected={selectedPlanet?.name === planet.name}
                      onHover={setHoveredPlanet}
                      onSelect={setSelectedPlanet}
                    />
                  ))}
                </div>
              );
            })}
          </motion.div>

          {/* FLOATING SKILL DETAIL MODAL / CARD */}
          <AnimatePresence>
            {activePlanet && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md p-5 rounded-2xl glass-strong border border-slate-300 shadow-[0_16px_50px_rgba(0,0,0,0.15)] text-slate-900"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md"
                      style={{
                        background: `${activePlanet.color}25`,
                        color: activePlanet.color,
                        border: `1px solid ${activePlanet.color}88`,
                      }}
                    >
                      {(() => {
                        const Icon = ICON_MAP[activePlanet.name] || SiReact;
                        return <Icon />;
                      })()}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                        {activePlanet.name}
                      </h4>
                      <span className="text-[0.65rem] uppercase tracking-widest text-[#0284c7] font-extrabold">
                        Skill Proficiency
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPlanet(null);
                      setHoveredPlanet(null);
                    }}
                    className="text-slate-500 hover:text-slate-900 text-xs px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200"
                  >
                    ✕
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-600 mb-1 font-mono font-semibold">
                    <span>Proficiency</span>
                    <span className="text-[#0284c7] font-bold">
                      {activePlanet.level}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: activePlanet.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${activePlanet.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                  {activePlanet.desc}
                </p>

                <div className="flex justify-between items-center text-[0.65rem] text-slate-500 font-semibold pt-2 border-t border-slate-200">
                  <span>Frontend Ecosystem Node</span>
                  <span className="text-[#0284c7]">Interactive Orbit Active</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4 ORBIT CATEGORY SHOWCASE CARDS BELOW */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {SOLAR_ORBITS.map((orbit) => (
            <motion.div
              key={orbit.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() =>
                setActiveOrbitId(activeOrbitId === orbit.id ? null : orbit.id)
              }
              className={`cursor-pointer rounded-2xl border p-6 glass transition-all duration-300 ${
                activeOrbitId === orbit.id
                  ? "border-[#0284c7] shadow-[0_10px_30px_rgba(2,132,199,0.2)] bg-white/90"
                  : "border-slate-200/80 hover:border-[#0284c7]"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0284c7]/10 text-[#0284c7] font-bold text-xs border border-[#0284c7]/30">
                  0{orbit.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {orbit.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {orbit.planets.map((p) => (
                  <span
                    key={p.name}
                    className="text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 text-slate-700 bg-white/80 shadow-xs"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// INDIVIDUAL ORBITING PLANET COMPONENT
function OrbitingPlanet({
  planet,
  orbit,
  planetIndex,
  totalPlanets,
  isDimmed,
  isHovered,
  isSelected,
  onHover,
  onSelect,
}) {
  const [angle, setAngle] = useState(
    (Math.PI * 2 * planetIndex) / totalPlanets
  );
  const rafRef = useRef(null);

  useEffect(() => {
    let currentAngle = (Math.PI * 2 * planetIndex) / totalPlanets;

    const animate = () => {
      if (!isHovered && !isSelected) {
        currentAngle += orbit.speed;
        setAngle(currentAngle);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [planetIndex, totalPlanets, orbit.speed, isHovered, isSelected]);

  // Trigonometric coordinates along orbital ring
  const x = Math.cos(angle) * orbit.radius;
  const y = Math.sin(angle) * orbit.radius;

  // 3D Depth Factor: planets behind center Sun (y < 0) scale down & fade slightly
  const zDepth = Math.sin(angle);
  const scale = 0.85 + (zDepth + 1) * 0.22;
  const opacity = isDimmed ? 0.25 : 0.65 + (zDepth + 1) * 0.18;

  const Icon = ICON_MAP[planet.name] || SiReact;

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-auto cursor-pointer group"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) scale(${
          isHovered || isSelected ? 1.4 : scale
        })`,
        opacity: isHovered || isSelected ? 1 : opacity,
        zIndex: Math.floor((zDepth + 1) * 50) + (isHovered ? 100 : 0),
        transition: isHovered ? "transform 0.3s ease-out" : "none",
      }}
      onMouseEnter={() => onHover(planet)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(planet);
      }}
    >
      {/* Glowing Neon Aura */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: planet.color }}
      />

      {/* Planet Sphere Body */}
      <div
        className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle at 30% 30%, #ffffff, ${planet.color} 70%, #000000 100%)`,
          boxShadow: `0 0 16px ${planet.color}aa`,
        }}
      >
        <span className="text-white text-sm sm:text-base drop-shadow-md">
          <Icon />
        </span>
      </div>

      {/* Floating Name Tooltip */}
      <div
        className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[0.6rem] font-bold tracking-wider uppercase transition-all duration-300 pointer-events-none ${
          isHovered || isSelected
            ? "bg-black/90 text-white border border-[#06b6d4] opacity-100 scale-100 shadow-md"
            : "bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 scale-90"
        }`}
      >
        {planet.name}
      </div>
    </div>
  );
}
