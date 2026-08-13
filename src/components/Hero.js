"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { PROFILE, SOCIALS } from "@/lib/data";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleField() {
  const pointsRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const isCoral = Math.random() < 0.3;
      colors[i3] = isCoral ? 1 : 1;
      colors[i3 + 1] = isCoral ? 0.42 : 1;
      colors[i3 + 2] = isCoral ? 0.42 : 1;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time * 0.5 + positions[i]) * 0.001;
      positions[i] += Math.cos(time * 0.3 + positions[i + 2]) * 0.001;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const targetX = mouseRef.current.x * 0.15;
    const targetY = mouseRef.current.y * 0.15;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (-targetY - pointsRef.current.rotation.x) * 0.05;
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Points ref={pointsRef} positions={particles.positions} colors={particles.colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Scene() {
  return <ParticleField />;
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  const [glitchText, setGlitchText] = useState("DIGITAL");
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let iterations = 0;
    const interval = setInterval(() => {
      setGlitchText(
        "DIGITAL"
          .split("")
          .map((char, index) => {
            if (index < iterations) return "DIGITAL"[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations += 1 / 3;
      if (iterations >= "DIGITAL".length) {
        clearInterval(interval);
        setGlitchText("DIGITAL");
        setIsGlitching(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
      id="home"
    >
      {/* Three.js Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Aesthetic Banner */}
      <motion.div style={{ opacity, y }} className="relative z-10 w-full">
        <div className="container-page py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Content */}
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="section-label mb-6"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                AVAILABLE FOR WORK
              </motion.div>

              {/* Main headline */}
              <div className="space-y-2 mb-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] font-display"
                >
                  <span className="block text-text">I BUILD</span>
                </motion.h1>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] font-display"
                >
                  <span className="text-outline">{isGlitching ? glitchText : "DIGITAL"}</span>
                </motion.h1>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] font-display"
                >
                  <span className="block text-text">EXPERIENCES</span>
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted font-heading font-medium text-base sm:text-lg leading-relaxed mb-10"
              >
                Full-Stack Developer · UI Engineer · Creative Coder
                <span className="inline-block w-[2px] h-5 bg-coral ml-1 animate-blink" />
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-coral text-void font-display font-bold text-sm px-8 py-4 border border-coral hover:bg-transparent hover:text-coral transition-all duration-300"
                  style={{ borderRadius: 0 }}
                >
                  VIEW WORK
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </motion.a>
                <motion.a
                  href={PROFILE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 border border-text text-text font-display font-bold text-sm px-8 py-4 hover:border-coral hover:text-coral transition-all duration-300"
                  style={{ borderRadius: 0 }}
                >
                  DOWNLOAD CV
                </motion.a>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex gap-6"
              >
                {SOCIALS.slice(0, 4).map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-text/30 hover:text-coral transition-colors duration-200"
                  >
                    {social.label === "GitHub" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    )}
                    {social.label === "LinkedIn" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                    {social.label === "Twitter" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    {social.label === "Dribbble" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zM12 2.25c2.256 0 4.33.82 5.94 2.18-1.155 1.51-2.868 2.726-5.123 3.633-1.373-1.98-2.89-3.61-4.527-4.868C9.606 2.553 10.79 2.25 12 2.25zm-5.69 4.17c1.61 1.21 3.06 2.85 4.32 4.92-2.26.92-5.11 1.48-8.55 1.66.29-2.63 1.42-4.93 3.23-6.58zM2.25 12c0-.06.002-.12.003-.18.186.01.39.015.59.015 3.93 0 7.39-.53 10.37-1.59.22.47.43.95.63 1.44-3.51 1.12-6.39 3.33-8.61 6.62-1.58-1.61-2.55-3.77-2.55-6.19zm4.36 7.53c1.99-3.15 4.68-5.12 8.08-5.91.72 1.88 1.31 3.85 1.76 5.89-1.14.47-2.39.73-3.69.73-2.18 0-4.18-.75-5.79-2zm8.06 1.03c-.45-1.84-.97-3.62-1.55-5.33 1.92-.26 4.03-.16 6.33.29-.48 2.13-1.72 4.01-3.4 5.36-.63-.63-1.25-1.32-1.38-2z" />
                      </svg>
                    )}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right side - Aesthetic banner/visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative hidden lg:flex justify-center items-center"
            >
              <div className="relative w-80 h-80 xl:w-[420px] xl:h-[420px]">
                {/* Aesthetic background elements */}
                <div className="absolute -inset-8 border border-border-subtle opacity-20" style={{ borderRadius: 0 }} />
                <div className="absolute -inset-4 border border-coral/20 opacity-40" style={{ borderRadius: 0 }} />
                <div className="absolute -inset-2 bg-coral/5 blur-2xl" />

                {/* Main banner frame */}
                <div
                  className="relative w-full h-full border border-border-subtle overflow-hidden"
                  style={{ borderRadius: 0 }}
                >
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 70%)`,
                    }}
                  />

                  {/* Animated accent lines */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-coral/50 to-transparent animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-coral/30 to-transparent" />

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl font-bold font-display text-coral mb-2">
                      SS
                    </div>
                    <div className="w-16 h-px bg-coral/50 mb-3" />
                    <div className="text-xs font-mono text-muted tracking-widest uppercase">
                      Full-Stack Developer
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-coral/50" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-coral/50" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-coral/50" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-coral/50" />
                </div>

                {/* Floating stat cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-8 bg-surface border border-border-subtle px-4 py-3"
                  style={{ transform: "rotate(-8deg)" }}
                >
                  <div className="text-2xl font-bold font-display text-coral">3+</div>
                  <div className="text-xs text-muted font-heading">Years Building</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -right-8 bg-surface border border-border-subtle px-4 py-3"
                  style={{ transform: "rotate(5deg)" }}
                >
                  <div className="text-2xl font-bold font-display text-coral">30+</div>
                  <div className="text-xs text-muted font-heading">Projects Shipped</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -top-4 -right-8 bg-surface border border-border-subtle px-4 py-3"
                  style={{ transform: "rotate(12deg)" }}
                >
                  <div className="text-2xl font-bold font-display text-coral">100%</div>
                  <div className="text-xs text-muted font-heading">Coffee Powered</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
