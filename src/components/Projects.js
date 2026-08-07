"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ProjectGalaxy from "@/components/ProjectGalaxy";
import ProjectModal from "@/components/ProjectModal";
import BackgroundParticles from "@/components/BackgroundParticles";
import { PROJECTS } from "@/lib/data";

const FILTERS = ["All", "Frontend", "UI/UX", "AI"];

export default function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showGalaxy, setShowGalaxy] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowGalaxy(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const filtered = PROJECTS.filter(
    (p) =>
      activeFilter === "All" ||
      p.category === activeFilter ||
      (activeFilter === "AI" && p.tags.includes("Gemini API")) ||
      (activeFilter === "UI/UX" && (p.tags.includes("Framer Motion") || p.tags.includes("GSAP")))
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-transparent"
      id="projects"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[480px] rounded-full bg-[#06b6d4]/5 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/5 blur-[140px]" />
      </motion.div>

      <BackgroundParticles density="medium" />

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
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          Projects I&apos;ve <span className="text-gradient-brand">designed & built</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-light max-w-xl mb-10"
        >
          Each card below orbits a central developer sphere. Click a project to
          dive into its story, tech stack, and live deployment.
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
              className={`text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeFilter === f
                  ? "bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] border-transparent text-white shadow-[0_8px_24px_-8px_rgba(6,182,212,0.45)]"
                  : "border-white/10 text-muted hover:border-[#06b6d4]/50 hover:text-white bg-white/[0.03]"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.01] glass"
        >
          <div className="h-[560px] sm:h-[640px]">
            {showGalaxy && <ProjectGalaxy onSelect={(project) => setSelected(project)} />}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] hover:border-[#06b6d4]/30 transition-all cursor-pointer"
              onClick={() => setSelected(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-[#06b6d4] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/5 text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
