"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";

const FILTERS = ["All", "Full Stack", "Frontend", "AI"];

function ProjectCard({ project, index, featured }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative w-full h-[400px] overflow-hidden border border-border-subtle"
      style={{ borderRadius: 0 }}
    >
      {/* Project Image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-coral/5 z-10 transition-opacity duration-500" style={{ opacity: isHovered ? 0.2 : 0 }} />
      </div>

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-coral text-void text-[9px] font-bold tracking-widest px-2 py-1 font-mono">
            FEATURED
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
        <motion.h3
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl font-heading font-bold text-text mb-2"
        >
          {project.title}
        </motion.h3>
        <motion.p
          animate={{ y: isHovered ? -8 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-sm text-muted mb-4 line-clamp-2"
        >
          {project.description}
        </motion.p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] font-mono text-muted px-2.5 py-1 border border-border-subtle"
              style={{ borderRadius: 0 }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-sm font-bold font-heading bg-coral text-void px-5 py-2.5 border border-coral hover:bg-transparent hover:text-coral transition-all duration-300"
            style={{ borderRadius: 0 }}
          >
            LIVE DEMO
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-sm font-bold font-heading border border-text text-text px-5 py-2.5 hover:border-coral hover:text-coral transition-all duration-300"
            style={{ borderRadius: 0 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GITHUB
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-void"
      id="projects"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[480px] rounded-full bg-coral/5 blur-[160px]" />
      </motion.div>

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Selected Work
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading"
        >
          Projects I&apos;ve <span className="text-coral">designed & built</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted max-w-xl mb-10"
        >
          Each project is a unique challenge solved with clean code and modern design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveFilter(f)}
              className={`text-xs uppercase tracking-widest font-bold px-5 py-2.5 transition-all duration-300 font-heading ${
                activeFilter === f
                  ? "bg-coral text-void border border-coral"
                  : "border border-border-subtle text-muted hover:text-coral hover:border-coral/50 bg-transparent"
              }`}
              style={{ borderRadius: 0 }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-6">
          {featured && (
            <ProjectCard project={featured} index={0} featured />
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} featured={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
