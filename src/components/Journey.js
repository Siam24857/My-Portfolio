"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TIMELINE = [
  {
    period: "2024",
    title: "The Beginning",
    desc: "Started with HTML, CSS, and JavaScript. Built my first static websites and fell in love with bringing designs to life in the browser.",
    tag: "Foundations",
  },
  {
    period: "2024",
    title: "Frontend Specialization",
    desc: "Mastered responsive design and began shipping real projects with React.js and Next.js, focusing on component architecture and clean UI.",
    tag: "React · Next.js",
  },
  {
    period: "2025",
    title: "Shipping Products",
    desc: "Built and deployed multiple full products — e-learning, booking, and marketplace platforms — with modern tooling and smooth animations.",
    tag: "Production Apps",
  },
  {
    period: "2026",
    title: "Today & Beyond",
    desc: "Crafting premium, accessible frontend experiences with TypeScript, design systems, and motion — continuously leveling up as a UI engineer.",
    tag: "UI Engineering",
  },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12 pb-12 last:pb-0 group"
    >
      <span className="absolute left-[14px] top-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#F3E8FF] ring-4 ring-ink-900 group-hover:scale-125 transition-transform duration-300" />
      {index < TIMELINE.length - 1 && (
        <span className="absolute left-[20px] top-5 bottom-0 w-px bg-gradient-to-b from-white/15 to-transparent" />
      )}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className="text-sm font-mono text-[#FF6B6B]">{item.period}</span>
        <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-muted bg-white/[0.03]">
          {item.tag}
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight mb-2">{item.title}</h3>
      <p className="text-muted leading-relaxed max-w-xl">{item.desc}</p>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section className="relative py-32 px-6 bg-ink-800" id="journey">
      <div className="container-page">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-6"
            >
              My Journey
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]"
            >
              From first line of code to{" "}
              <span className="text-gradient-brand">frontend engineer</span>
            </motion.h2>
            <p className="text-muted mt-6 max-w-md leading-relaxed">
              A continuous path of learning, building, and refining — every step
              sharpening how I craft interfaces people love to use.
            </p>
          </div>

          <div className="relative">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
