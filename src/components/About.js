"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: "Website Development",
    description: "Pixel-perfect, performant web experiences built with modern frameworks.",
    tag: "Next.js · React · Tailwind",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "App Development",
    description: "Cross-platform mobile apps with smooth UX and robust architecture.",
    tag: "React Native · Expo",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "UI / UX Design",
    description: "Interfaces that delight — from wireframe to polished interactive prototype.",
    tag: "Figma · Framer · Motion",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Website Hosting",
    description: "Reliable deployments with CI/CD pipelines and 99.9% uptime.",
    tag: "Vercel · AWS · Docker",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    ),
  },
];

const STATS = [
  { value: 30, suffix: "+", label: "Completed Projects" },
];

const SKILLS = [
  { label: "React / Next.js", pct: 95, color: "from-[#ff6b6b] to-orange-400" },
  { label: "UI / UX Design",  pct: 82, color: "from-[#ff6b6b] to-orange-400" },
  { label: "Node.js",         pct: 78, color: "from-[#ff6b6b] to-orange-400" },
];

const TIMELINE = [
  { year: "2014", title: "Started Coding", desc: "Fell in love with HTML & CSS. Built my first static website." },
  { year: "2017", title: "Went Full-Stack", desc: "Picked up Node.js, databases, and started freelancing." },
  { year: "2020", title: "React Specialist", desc: "Mastered React ecosystem — Next.js, animations, state management." },
  { year: "2024", title: "Today", desc: "Shipping polished products for global clients with a focus on craft." },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function Counter({ to, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = (timestamp, startTime) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * to));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
      else setCount(to);
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, to]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────

function SkillBar({ label, pct, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/60 tracking-wider uppercase font-medium">{label}</span>
        <motion.span
          className="text-xs font-bold text-white/80"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {pct}%
        </motion.span>
      </div>
      <div className="h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}

// ─── Timeline Item ────────────────────────────────────────────────────────────

function TimelineItem({ year, title, desc, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="flex gap-4 group"
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-coral-accent mt-1 shrink-0 group-hover:scale-150 transition-transform duration-300"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
        />
        {index < TIMELINE.length - 1 && (
          <motion.div
            className="w-px flex-1 bg-white/10 mt-1"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          />
        )}
      </div>
      <div className="pb-6">
        <span className="text-[0.6rem] text-coral-accent tracking-[0.18em] uppercase font-bold">{year}</span>
        <h4 className="text-sm font-semibold text-white/90 mt-0.5 mb-1">{title}</h4>
        <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={sectionRef} className="relative py-36 px-6 overflow-hidden bg-dark-bg" id="about">

      {/* ── Same Background Banner Style as Hero ── */}
      <div className="absolute top-0 left-0 w-full h-[60vh] md:h-[80vh] overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-dark-bg/60 to-dark-bg z-10"></div>
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://lh3.googleusercontent.com/aida/ADBb0ujjFnkq_C6ttfc5Wo-Gg1OitqDZA7CIMPBva3eKE3anwOIBut5R7tRfZyRq40-dFvSxt4glbxfOLiyKjQ8L6JSr9NbXulKLstRYvvuhFZGLU1XXC06emTesQBKZnLuwm7RcqEOl1QPX53DFp-DlvN_Gii8QvjYRCgmmObbvPKGINL2cxVOYFYTVmjqRdggPwmdVCH0SFTDG0munSKFhO4yUYORlphpmWL7_crebrzB2rFl8I11KXyQ1neZzlJAjmaeZmAYnC7_WOQ"
          alt="Background Banner"
          className="w-full h-full object-cover grayscale blur-sm"
        />
      </div>

      {/* ── Ambient blobs (kept for depth) ── */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-coral-accent/[0.03] blur-[140px]" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
      </motion.div>

      {/* ── Subtle grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] -z-10"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            className="h-px bg-coral-accent"
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <span className="text-[0.62rem] tracking-[0.25em] text-coral-accent uppercase font-bold">
            Who I Am
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <div className="mb-24 overflow-hidden">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.02]"
          >
            About{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-coral-accent via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Sheikh Siam
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-coral-accent to-orange-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </motion.h2>
        </div>

        {/* ── Main grid ── */}
        <div className="grid md:grid-cols-2 gap-20 md:gap-24 items-start">

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-12"
          >

            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-5 relative">
              <div className="absolute -top-4 -left-3 text-6xl text-coral-accent/10 font-serif leading-none select-none">"</div>
              <p className="text-white/55 leading-[1.9] text-[0.95rem] relative z-10">
                I'm a <span className="text-white font-semibold">full-stack developer</span> and{" "}
                <span className="text-white font-semibold">UI/UX designer</span> who turns creative
                visions into fast, beautiful, real-world products. I care deeply about the details —
                every transition, every pixel, every interaction.
              </p>
              <p className="text-white/45 leading-[1.9] text-[0.95rem]">
                Continuously pushing into advanced territory: real-time apps, WebGL experiences, and
                bespoke animation systems. My goal is to ship work that genuinely{" "}
                <span className="text-coral-accent font-medium">surprises people</span>.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[0.62rem] tracking-[0.2em] text-white/25 uppercase font-semibold">Core Skills</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              {SKILLS.map((s) => (
                <SkillBar key={s.label} label={s.label} pct={s.pct} color={s.color} />
              ))}
            </motion.div>

            {/* Timeline */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[0.62rem] tracking-[0.2em] text-white/25 uppercase font-semibold">My Journey</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div>
                {TIMELINE.map((t, i) => (
                  <TimelineItem key={t.year} {...t} index={i} />
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <motion.a
                href="#contacts"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 bg-coral-accent text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-[0_0_0_0_rgba(255,107,107,0.4)] hover:shadow-[0_0_28px_rgba(255,107,107,0.45)] transition-shadow duration-300"
              >
                Let's Work Together 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </motion.a> 
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                View Work
              </motion.a>
            </motion.div>

          </motion.div>

          {/* ════ RIGHT COLUMN ════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >

            {/* Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[0.62rem] tracking-[0.2em] text-white/25 uppercase font-semibold">What I Do</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="space-y-3">
                {SERVICES.map((svc, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ x: 5, scale: 1.01 }}
                    transition={{ duration: 0.22 }}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-white/[0.055] bg-white/[0.025] hover:border-coral-accent/35 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-coral-accent/10 text-coral-accent group-hover:bg-coral-accent/20 group-hover:scale-110 transition-all duration-300">
                      {svc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold text-white/90">{svc.title}</h3>
                        <span className="text-[0.58rem] text-coral-accent/60 bg-coral-accent/10 px-2 py-0.5 rounded-full shrink-0 hidden sm:block">
                          {svc.tag}
                        </span>
                      </div>
                      <p className="text-xs text-white/38 leading-relaxed">{svc.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[0.62rem] tracking-[0.2em] text-white/25 uppercase font-semibold">By The Numbers</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((st, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, borderColor: "rgba(255,107,107,0.35)" }}
                    transition={{ duration: 0.22 }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-5 py-5 cursor-default"
                  >
                    <div className="text-[2rem] font-extrabold tracking-tight text-white leading-none mb-1.5">
                      <Counter to={st.value} suffix={st.suffix} />
                    </div>
                    <p className="text-[0.62rem] text-white/32 uppercase tracking-widest leading-snug">
                      {st.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}