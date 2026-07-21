"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import porfolioimg from "../asset/Profilio.jpeg";

const TECH_FLOATERS = [
  { label: "React", top: "12%", left: "8%", delay: 0 },
  { label: "Next.js", top: "22%", left: "82%", delay: 0.6 },
  { label: "Node.js", top: "70%", left: "6%", delay: 1.1 },
  { label: "Express.js", top: "78%", left: "85%", delay: 0.3 },
  { label: "MongoDB", top: "45%", left: "90%", delay: 0.9 },
  { label: "JavaScript", top: "55%", left: "3%", delay: 1.4 },
];

const TYPING_WORDS = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "MERN Stack Developer",
];

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const typingRef = useRef(null);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let typingIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const current = TYPING_WORDS[typingIndex];
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === current.length) {
          timer = setTimeout(() => { isDeleting = true; type(); }, 2000);
          return;
        }
        timer = setTimeout(type, 100);
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          typingIndex = (typingIndex + 1) % TYPING_WORDS.length;
          timer = setTimeout(type, 500);
          return;
        }
        timer = setTimeout(type, 60);
      }
    };

    typingRef.current = type;
    timer = setTimeout(type, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  const handleTilt = useCallback((e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((centerX - x) / centerX) * 12;
    imageRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const resetTilt = useCallback(() => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
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
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" />
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B6B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B6B]" />
            </span>
            Available for full-stack opportunities
          </motion.div>

          <h1 className="hero-reveal text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            <span className="block text-muted font-light text-2xl sm:text-3xl mb-2">I&apos;m a</span>
            <span className="text-gradient-brand">{displayText}<span className="animate-pulse text-[#FF6B6B]">|</span></span>
          </h1>

          <p className="hero-reveal text-muted text-lg leading-relaxed max-w-xl mb-10">
            Building modern, responsive, and scalable web applications with React,
            Next.js, Node.js, Express.js, and MongoDB from frontend to backend.
          </p>

          <div className="hero-reveal flex flex-wrap gap-4">
            <MagneticButton href="#projects" variant="primary">
              View Projects
            </MagneticButton>
            <MagneticButton
              href="https://drive.google.com/file/d/1_jF1S2jq8ExXsPVmfr4UX_W6zDUCFnZx/view?usp=sharing"
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

        {/* Profile image with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF6B6B] via-[#F3E8FF] to-[#3B0764] blur-3xl opacity-30" />
            <motion.div
              animate={{ scale: [1.08, 1.13, 1.08] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-[#F3E8FF]/20"
            />
            <div
              ref={imageRef}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="relative z-10 w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl transition-transform duration-200 ease-out"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B6B]/10 to-[#3B0764]/10 z-10 mix-blend-overlay" />
              <Image
                src={porfolioimg}
                alt="Sheikh Siam"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full glass-strong text-sm font-semibold text-white whitespace-nowrap">
              ✦ Sheikh Siam ✦
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
        <span className="w-px h-10 bg-gradient-to-b from-[#F3E8FF] to-transparent" />
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
      "bg-white text-ink-900 hover:bg-[#F3E8FF] shadow-[0_8px_30px_-8px_rgba(243,232,255,0.5)]",
    outline:
      "border border-white/15 text-white hover:border-[#FF6B6B]/60 hover:bg-[#FF6B6B]/5",
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
