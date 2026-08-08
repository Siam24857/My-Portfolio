"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { preloadFrames } from "@/components/FramePlayer";
import { PROFILE, SKILLS } from "@/lib/data";

const TYPING_WORDS = [
  "Full-Stack Developer",
  "React & Next.js Specialist",
  "Node.js Backend Engineer",
  "Scalable Web Architect",
];

const TOP_SKILLS = SKILLS.slice(0, 8);

export default function Hero() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const typingRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
          timer = setTimeout(() => { isDeleting = true; type(); }, 2200);
          return;
        }
        timer = setTimeout(type, 70);
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          typingIndex = (typingIndex + 1) % TYPING_WORDS.length;
          timer = setTimeout(type, 500);
          return;
        }
        timer = setTimeout(type, 40);
      }
    };

    timer = setTimeout(type, 800);
    typingRef.current = timer;

    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({ target: scrollRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", { y: 40, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.3 });
      gsap.to(".tech-floater", {
        y: "random(-18, 18)", x: "random(-10, 10)", rotation: "random(-8, 8)",
        duration: "random(4, 7)", repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.register(gsap);
        gsap.to(".hero-fade", {
          opacity: 0, y: 60, ease: "none",
          scrollTrigger: { trigger: scrollRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-transparent" id="home" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-[1]" />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFD700]/10 via-[#FFD700]/5 to-transparent blur-[120px] animate-pulse-slow" />
      </div>
      <div className="hero-aura -z-0 opacity-60" />

      <motion.div ref={scrollRef} style={{ y: parallaxY, x: mousePos.x * 0.3, rotateY: mousePos.x * 0.1 }} className="relative pt-32 sm:pt-40 pb-20 flex items-center z-[2]">
        <div className="container-page mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="hero-reveal hero-fade">
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-xs font-bold text-[#FFD700] mb-6 hero-reveal shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]" />
                </span>
                Available for Full-Stack Opportunities
              </motion.span>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-white">
                <span className="block text-white/60 font-normal text-2xl sm:text-3xl mb-3">Hi, I&apos;m</span>
                <motion.span className="text-gradient-brand block" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  {PROFILE.name}
                </motion.span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gradient-brand mb-2">
                <span className="inline-block min-w-[280px]">
                  {displayText || TYPING_WORDS[0]}
                  <span className="border-l-2 border-[#FFD700] ml-1 animate-caret-blink" />
                </span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-white/70 text-lg font-medium leading-relaxed max-w-xl mb-10 hero-reveal">
                {PROFILE.tagline}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap gap-3 items-center mb-10 hero-reveal">
                {TOP_SKILLS.map((skill, i) => (
                  <motion.span key={skill.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 + i * 0.06 }} className="tech-floater text-xs font-bold px-3 py-1.5 rounded-full glass text-white border border-white/10 shadow-sm" style={{ boxShadow: `0 4px 14px ${skill.color}25` }}>
                    <span className="w-2 h-2 rounded-full inline-block mr-2" style={{ background: skill.color }} />
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} className="hero-reveal mt-10 flex flex-wrap gap-4">
                <MagneticButton href="#projects">View Projects</MagneticButton>
                <MagneticButton href="#contacts" variant="outline">Contact Me</MagneticButton>
                <MagneticButton href={PROFILE.github} variant="ghost" external>GitHub</MagneticButton>
                <MagneticButton href={PROFILE.linkedin} variant="ghost" external>LinkedIn</MagneticButton>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} className="hero-reveal hero-fade hidden lg:flex justify-center">
              <motion.div className="relative w-80 h-80 lg:w-[420px] lg:h-[420px]" animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFD700]/20 via-[#FFD700]/10 to-transparent blur-3xl animate-pulse-slow" />
                <motion.div animate={{ scale: [1.05, 1.1, 1.05], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 rounded-full border border-[#FFD700]/30" />
                <motion.div className="relative z-10 w-full h-full rounded-full overflow-hidden border border-white/20 shadow-2xl bg-ink-800 backdrop-blur-xl">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-gradient-brand">SS</div>
                </motion.div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 px-6 py-2.5 rounded-full glass-strong text-sm font-bold text-white border border-[#FFD700]/20 shadow-lg">✦ Sheikh Siam ✦</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40 z-[2]">
        <motion.span className="text-[0.65rem] tracking-[0.25em] uppercase" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.6 }}>
          Scroll to Explore
        </motion.span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-px h-12 bg-gradient-to-b from-[#FFD700] to-transparent" />
      </motion.div>
    </section>
  );
}

function MagneticButton({ href, children, variant = "primary", external }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x, y });
  };

  const handleEnter = () => setHovered(true);
  const handleLeave = () => { setHovered(false); setPosition({ x: 0, y: 0 }); };

  const base = "relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 will-change-transform overflow-hidden";
  const variants = {
    primary: "bg-gradient-to-r from-[#FFD700] to-[#FFD700] text-ink-900 shadow-[0_8px_30px_-8px_rgba(255,215,0,0.5)] hover:shadow-[0_8px_30px_-8px_rgba(255,215,0,0.7)]",
    outline: "border border-[#FFD700]/40 text-white hover:border-[#FFD700] hover:bg-[#FFD700]/10",
    ghost: "border border-white/10 text-white/80 hover:border-[#FFD700]/40 hover:text-[#FFD700] hover:bg-white/5",
  };

  return (
    <motion.a ref={ref} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onMouseMove={handleMove} onMouseLeave={handleLeave} onMouseEnter={handleEnter} whileTap={{ scale: 0.96 }} className={`${base} ${variants[variant]}`}>
      <span className={`absolute rounded-full bg-[#FFD700] transition-opacity duration-500 ${hovered ? "opacity-30" : "opacity-0"}`} style={{ width: 48, height: 48, left: position.x - 24, top: position.y - 24, transform: `scale(${hovered ? 1.2 : 0.8})` }} />
      <motion.span className="relative z-10 flex items-center gap-2" style={{ transform: variant === "primary" ? `translate(${position.x * 0.2}px, ${position.y * 0.3}px)` : "none" }}>
        {children}
      </motion.span>
      {variant === "primary" && (
        <motion.svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ x: position.x * 0.05 }}>
          <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </motion.svg>
      )}
    </motion.a>
  );
}
