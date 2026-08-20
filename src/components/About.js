"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import porfolioimg from "../asset/portfolio.png";

const STATS = [
  { value: 3, suffix: "+", label: "Years Building" },
  { value: 30, suffix: "+", label: "Projects Shipped" },
  { value: 70, suffix: "+", label: "Technologies" },
];

const EXPERTISE = [
  "Full-stack architecture across MERN and Next.js ecosystems",
  "Responsive, accessible component systems with modern UI/UX",
  "Smooth animation, micro-interactions, and 3D web experiences",
  "Performance-first, SEO-ready delivery with cloud deployment",
  "AI-assisted development with LLMs and modern tooling",
];

const SKILL_BARS = [
  { name: "Full-Stack Development", level: 94, color: "#ff6b6b" },
  { name: "JavaScript / TypeScript", level: 95, color: "#ff6b6b" },
  { name: "React & Next.js Ecosystem", level: 96, color: "#f5a623" },
  { name: "Node.js / Express / APIs", level: 92, color: "#f5a623" },
  { name: "Databases & ORM", level: 90, color: "#7c3aed" },
];

function Counter({ to, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * to));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(to);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

function SkillBarItem({ name, level, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-xs text-muted mb-1.5 font-mono font-semibold">
        <span>{name}</span>
        <span className="text-coral">{level}%</span>
      </div>
      <div className="h-1 bg-border-subtle overflow-hidden" style={{ borderRadius: 0 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
          className="h-full"
          style={{
            background: `linear-gradient(90deg, #ff6b6b, #f5a623)`,
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      id="about"
    >
      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          About Me
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative border border-border-subtle overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0" style={{ borderRadius: 0 }}>
              <Image
                src={porfolioimg}
                alt="Sheikh Siam"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-text font-heading"
            >
              A developer who builds with{" "}
              <span className="text-coral">intent</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-muted font-medium leading-relaxed text-lg"
            >
              My development journey started with a curiosity for how interfaces
              come alive in the browser. Today I specialize in crafting polished,
              production-grade full-stack applications — turning designs into fast, accessible,
              and delightful experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-muted font-medium leading-relaxed"
            >
              I bring a problem-solving mindset to every build: component
              architecture, clean state management, and purposeful motion.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-3 pt-2"
            >
              {EXPERTISE.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-text/80 font-medium"
                >
                  <span className="mt-2 w-1.5 h-1.5 bg-coral shrink-0" style={{ borderRadius: 0 }} />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {STATS.map((st) => (
                <div
                  key={st.label}
                  className="border border-border-subtle bg-surface px-4 py-5"
                  style={{ borderRadius: 0 }}
                >
                  <div className="text-3xl font-black tracking-tight text-coral font-display">
                    <Counter to={st.value} suffix={st.suffix} />
                  </div>
                  <p className="text-[0.65rem] text-muted font-extrabold uppercase tracking-wider mt-1 font-mono">
                    {st.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="pt-6"
            >
              <h4 className="text-sm font-extrabold text-coral mb-4 tracking-wider uppercase font-mono">
                Core Skills
              </h4>
              {SKILL_BARS.map((skill, i) => (
                <SkillBarItem
                  key={skill.name}
                  {...skill}
                  index={i}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
