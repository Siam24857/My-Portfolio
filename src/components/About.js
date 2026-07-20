"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import porfolioimg from "../asset/portfolio.png";
import Image from "next/image";

const STATS = [
  { value: 30, suffix: "+", label: "Projects Shipped" },
  { value: 2, suffix: "+", label: "Years Building" },
  { value: 15, suffix: "+", label: "Technologies" },
];

const EXPERTISE = [
  "Modern React & Next.js architecture",
  "Responsive, accessible component systems",
  "Smooth animation & micro-interactions",
  "Performance-first, SEO-ready delivery",
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

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-ink-900"
      id="about"
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-accent-purple/10 blur-[120px]" />
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

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Visual */}
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
                className="w-full h-full object-cover grayscale-[0.25] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-5 rounded-2xl glass-strong">
              <p className="text-2xl font-bold text-gradient-brand">Frontend</p>
              <p className="text-xs text-muted">Focused & Specialized</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            <motion.h2
              variants={item}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]"
            >
              A frontend engineer who builds with{" "}
              <span className="text-gradient-brand">intent</span>
            </motion.h2>

            <motion.p variants={item} className="text-muted leading-relaxed">
              My development journey started with a curiosity for how interfaces
              come alive in the browser. Today I specialize in crafting polished,
              production-grade frontends — turning designs into fast, accessible,
              and delightful experiences.
            </motion.p>

            <motion.p variants={item} className="text-muted leading-relaxed">
              I bring a problem-solving mindset to every build: component
              architecture, clean state management, and purposeful motion. My
              passion is building beautiful user experiences that feel effortless.
            </motion.p>

            <motion.ul variants={item} className="space-y-3 pt-2">
              {EXPERTISE.map((point) => (
                <li key={point} className="flex items-start gap-3 text-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                  {point}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="grid grid-cols-3 gap-4 pt-4">
              {STATS.map((st) => (
                <div
                  key={st.label}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-5 text-center"
                >
                  <div className="text-3xl font-extrabold tracking-tight text-white">
                    <Counter to={st.value} suffix={st.suffix} />
                  </div>
                  <p className="text-[0.65rem] text-muted uppercase tracking-wider mt-1">
                    {st.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
