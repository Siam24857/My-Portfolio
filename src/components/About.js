"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import porfolioimg from "../asset/portfolio.png";

const STATS = [
  { value: 40, suffix: "+", label: "Projects Shipped" },
  { value: 2, suffix: "+", label: "Years Building" },
  { value: 16, suffix: "+", label: "Technologies" },
];

const EXPERTISE = [
  "Modern React & Next.js architecture",
  "Responsive, accessible component systems",
  "Smooth animation & micro-interactions",
  "Performance-first, SEO-ready delivery",
];

const SKILL_BARS = [
  { name: "React & Next.js", level: 92, color: "#FFD700" },
  { name: "JavaScript / TypeScript", level: 88, color: "#FFD700" },
  { name: "Node.js / Express", level: 85, color: "#a78bfa" },
  { name: "HTML / CSS / Tailwind", level: 95, color: "#f43f5e" },
  { name: "UI / UX Design", level: 82, color: "#FFD700" },
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
      <div className="flex justify-between text-xs text-muted mb-1.5">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}66, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-transparent"
      id="about"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#FFD700]/5 blur-[140px]" />
        <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/5 blur-[120px]" />
      </motion.div>

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
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 border border-white/10">
              <Image
                src={porfolioimg}
                alt="Sheikh Siam"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 hidden sm:block p-6 rounded-2xl glass-strong border border-[#FFD700]/20"
            >
              <p className="text-2xl font-bold text-gradient-brand">Full-Stack</p>
              <p className="text-xs text-muted">Developer</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >
            <motion.h2 variants={item} className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
              A developer who builds with{" "}
              <span className="text-gradient-brand">intent</span>
            </motion.h2>

            <motion.p variants={item} className="text-white/70 font-medium leading-relaxed text-lg">
              My development journey started with a curiosity for how interfaces
              come alive in the browser. Today I specialize in crafting polished,
              production-grade full-stack applications — turning designs into fast, accessible,
              and delightful experiences.
            </motion.p>

            <motion.p variants={item} className="text-white/70 font-medium leading-relaxed">
              I bring a problem-solving mindset to every build: component
              architecture, clean state management, and purposeful motion. My
              passion is building beautiful user experiences that feel effortless.
            </motion.p>

            <motion.ul variants={item} className="space-y-3 pt-2">
              {EXPERTISE.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-white/80 font-medium group"
                >
                  <motion.span
                    className="mt-2 w-2 h-2 rounded-full bg-[#FFD700] shrink-0"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2 }}
                  />
                  <span className="group-hover:text-[#FFD700] transition-colors">
                    {point}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="grid grid-cols-3 gap-4 pt-4">
              {STATS.map((st) => (
                <div
                  key={st.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] glass px-3 py-5 text-center shadow-sm"
                >
                  <div className="text-3xl font-black tracking-tight text-gradient-brand">
                    <Counter to={st.value} suffix={st.suffix} />
                  </div>
                  <p className="text-[0.65rem] text-muted font-extrabold uppercase tracking-wider mt-1">
                    {st.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="pt-6">
              <h4 className="text-sm font-extrabold text-[#FFD700] mb-4 tracking-wider uppercase">
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
