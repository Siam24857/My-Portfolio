"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { TIMELINE, KNOWLEDGE_NODES } from "@/lib/data";

const CONCEPTS = [
  { id: "html", label: "HTML5", color: "#E34F26", x: 0, y: 0 },
  { id: "css", label: "CSS3", color: "#1572B6", x: 10, y: 10 },
  { id: "js", label: "JavaScript", color: "#F7DF1E", x: -12, y: 14 },
  { id: "react", label: "React.js", color: "#61DAFB", x: 11, y: -13 },
  { id: "next", label: "Next.js", color: "#FFF", x: -9, y: -15 },
  { id: "ts", label: "TypeScript", color: "#3178C6", x: 8, y: 16 },
  { id: "tailwind", label: "Tailwind CSS", color: "#06B6D4", x: -11, y: 8 },
  { id: "three", label: "Three.js", color: "#00F0FF", x: 13, y: -6 },
  { id: "gsap", label: "GSAP", color: "#88CE02", x: -8, y: -9 },
  { id: "framer", label: "Framer Motion", color: "#0055FF", x: 10, y: 6 },
  { id: "canvas", label: "Canvas API", color: "#FF6464", x: -11, y: -8 },
  { id: "git", label: "Git & GitHub", color: "#F05032", x: 9, y: -11 },
];

function FloatingNodes({ progress }) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="absolute -inset-10 pointer-events-none overflow-hidden"
    >
      {CONCEPTS.map((c, i) => {
        const depth = (i % 4) * 20;
        return (
          <motion.div
            key={c.id}
            className="absolute flex items-center gap-1.5"
            style={{
              left: `calc(50% + ${c.x * 4 - depth}px)`,
              top: `calc(40% + ${c.y * 3}px)`,
              zIndex: 10 - (i % 4),
            }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{
              opacity: 0.55,
              scale: 1 - (i % 4) * 0.06,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: i * 0.05 },
              y: {
                duration: 6 + (i % 4) * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: { duration: 0.6, delay: i * 0.05 },
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: c.color }}
              animate={{
                opacity: [0.3, 0.9, 0.3],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
            <span
              className="text-[0.6rem] font-mono whitespace-nowrap"
              style={{ color: c.color }}
            >
              {c.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative pl-12 pb-14 last:pb-0 group"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.1 }}
        className="absolute left-[14px] top-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#a78bfa] ring-4 ring-ink-900 group-hover:scale-125 transition-transform duration-300"
      />
      {index < TIMELINE.length - 1 && (
        <span className="absolute left-[20px] top-5 bottom-0 w-px bg-gradient-to-b from-[#06b6d4]/30 to-transparent" />
      )}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className="text-sm font-mono text-[#06b6d4]">{item.period}</span>
        <span className="text-[0.65rem] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#06b6d4]/20 text-[#a78bfa] bg-[#06b6d4]/5">
          {item.tag}
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-[#06b6d4] transition-colors">
        {item.title}
      </h3>
      <p className="text-muted-light leading-relaxed max-w-xl">
        {item.desc}
      </p>
    </motion.div>
  );
}

function KnowledgeNode({ node, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group cursor-default"
    >
      <motion.div
        className="relative w-20 h-20 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center transition-all duration-300"
        style={{
          boxShadow: `0 0 20px ${node.color}20`,
        }}
        whileHover={{
          scale: 1.1,
          borderColor: `${node.color}50`,
          boxShadow: `0 0 30px ${node.color}40`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${node.color}20, transparent 70%)`,
          }}
        />
        <span
          className="w-3 h-3 rounded-full mb-1"
          style={{ background: node.color }}
        />
        <span
          className="text-[0.6rem] font-medium text-white/80 text-center"
          style={{ color: node.color }}
        >
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Journey() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 bg-transparent overflow-hidden"
      id="journey"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#06b6d4]/6 blur-[160px]" />
        <div className="absolute bottom-10 right-0 w-[360px] h-[360px] rounded-full bg-[#7c3aed]/6 blur-[120px]" />
      </motion.div>

      <FloatingNodes />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="section-label mb-6"
        >
          Knowledge Universe
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] max-w-2xl mb-6"
        >
          From <span className="text-gradient-brand">first lines of code</span>{" "}
          to UI engineering
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-light max-w-xl mb-14"
        >
          A continuous path of learning, building, and refining — every step
          sharpening how I craft interfaces people love to use.
        </motion.p>

        <div className="relative">
          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.title} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">
            <span className="text-gradient-brand">Knowledge Nodes</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {KNOWLEDGE_NODES.slice(0, 12).map((node, i) => (
              <KnowledgeNode key={node.label} node={node} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
