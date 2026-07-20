"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import porfolioimg from "../asset/Profilio.jpeg";

const TECH_FLOATERS = [
  { label: "React", top: "12%", left: "8%", delay: 0 },
  { label: "Next.js", top: "22%", left: "82%", delay: 0.6 },
  { label: "TypeScript", top: "70%", left: "6%", delay: 1.1 },
  { label: "Tailwind", top: "78%", left: "85%", delay: 0.3 },
  { label: "JavaScript", top: "45%", left: "90%", delay: 0.9 },
  { label: "Framer", top: "55%", left: "3%", delay: 1.4 },
];

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.to(".tech-floater", {
        y: "random(-18, 18)",
        x: "random(-12, 12)",
        rotation: "random(-8, 8)",
        duration: "random(3.5, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden"
      id="home"
    >
      <div className="hero-aura -z-10" />
      <div className="grid-texture absolute inset-0 -z-10 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/0 via-ink-900/30 to-ink-900 -z-10" />

      {/* Floating tech elements */}
      {TECH_FLOATERS.map((t) => (
        <span
          key={t.label}
          className="tech-floater hero-reveal hidden lg:flex items-center gap-2 absolute px-3 py-1.5 rounded-full glass text-xs font-medium text-muted"
          style={{ top: t.top, left: t.left }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
          {t.label}
        </span>
      ))}

      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Content */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-muted mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
            </span>
            Available for frontend opportunities
          </motion.div>

          <h1 className="hero-reveal text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            <span className="block text-muted font-light text-2xl sm:text-3xl mb-2">I'm a</span>
            <span className="text-gradient-brand">Frontend Developer</span>
          </h1>

          <p className="hero-reveal text-muted text-lg leading-relaxed max-w-xl mb-10">
            Building modern, responsive, and interactive web experiences with React,
            Next.js, JavaScript, and modern UI technologies.
          </p>

          <div className="hero-reveal flex flex-wrap gap-4">
            <MagneticButton href="#projects" variant="primary">
              View Projects
            </MagneticButton>
            <MagneticButton
              href="https://drive.google.com/file/d/1tVV3xokzdeEHHCWqVw-QBk7WMNqAgrqf/view?usp=sharing"
              variant="ghost"
              external
            >
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contacts" variant="outline">
              Contact Me
            </MagneticButton>
          </div>
        </div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-accent-cyan to-accent-purple blur-3xl opacity-30" />
            <motion.div
              animate={{ scale: [1.08, 1.13, 1.08] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-accent-cyan/20"
            />
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-accent-purple/10 z-10 mix-blend-overlay" />
              <img
                src={porfolioimg.src}
                alt="Sheikh Siam"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full glass-strong text-sm font-semibold text-white">
              Sheikh Siam
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-dim"
      >
        <span className="text-[0.65rem] tracking-[0.25em] uppercase">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-accent-cyan to-transparent" />
      </motion.div>
    </section>
  );
}

function MagneticButton({ href, children, variant = "primary", external }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  const base =
    "inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300 will-change-transform";
  const variants = {
    primary:
      "bg-white text-ink-900 hover:bg-accent-cyan shadow-[0_8px_30px_-8px_rgba(0,194,255,0.5)]",
    outline:
      "border border-white/15 text-white hover:border-accent-cyan/60 hover:bg-accent-cyan/5",
    ghost:
      "bg-white/5 text-white border border-white/10 hover:bg-white/10",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${variants[variant]}`}
    >
      {children}
      {variant === "primary" && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      )}
      {external && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      )}
    </motion.a>
  );
}
