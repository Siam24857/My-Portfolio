"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Allrooms from "../asset/All-rooms.png";
import Digitaltech from "../asset/Digfitalt-tech.png";
import Keenkeper from "../asset/Keenkeper.png";
import Skillshaper from "../asset/Skillshaper.png";
import Studyrooms from "../asset/study-rooms.png";
import Fable from "../asset/fable.png";
import Clodfare from "../asset/clodfare.png";
import MarketPlace from "../asset/marketplace.png";

function LiveButton({ href, children, primary }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
        primary
          ? "bg-white text-ink-900 hover:bg-accent-cyan"
          : "border border-white/15 text-white hover:border-accent-cyan/60 hover:bg-accent-cyan/5"
      }`}
    >
      {children}
    </motion.a>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-14 items-center`}
    >
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40, scale: 0.96 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-1/2"
      >
        <div className="group relative rounded-2xl overflow-hidden border border-white/10 glass">
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
            <span className="ml-3 flex-1 bg-white/5 rounded-full h-4 max-w-[200px]" />
          </div>
          <div className="relative overflow-hidden aspect-[16/10] bg-ink-700">
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-1/2"
      >
        <span className="text-xs font-mono text-accent-cyan">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 mb-3">
          {project.title}
        </h3>
        <p className="text-muted leading-relaxed mb-5 max-w-md">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.7rem] uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 text-muted bg-white/[0.03]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <LiveButton href={project.github} primary>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </LiveButton>
          <LiveButton href={project.link}>
            Live Demo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </LiveButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-visual").forEach((el) => {
        gsap.to(el, {
          y: -16,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "SkillSphere",
      image: Skillshaper,
      tags: ["Next.js", "React", "MongoDB", "Tailwind CSS", "Better Auth"],
      description:
        "A modern e-learning platform connecting students with industry experts through high-quality courses, enrollment, instructor profiles, and personalized learning dashboards.",
      github: "https://github.com/Siam24857/B13-A8-platfoprm.git",
      link: "https://b13-a8-platfoprm-j9sv.vercel.app",
    },
    {
      title: "StudyNook",
      image: Studyrooms,
      tags: ["Next.js 14", "React", "Tailwind CSS", "MongoDB", "Better Auth"],
      description:
        "A study room booking platform with advanced search and filtering, real-time room availability, user dashboards, and room hosting capabilities for owners.",
      github: "https://github.com/Siam24857/B13-As-7.git",
      link: "https://ass-project-9.vercel.app",
    },
    {
      title: "Digitool",
      image: Digitaltech,
      tags: ["React.js", "Tailwind CSS", "JavaScript", "DaisyUI", "Vite"],
      description:
        "A premium digital tools marketplace where users browse resources, manage a shopping cart, and complete checkout through an intuitive, responsive interface.",
      github: "https://github.com/Siam24857/B13-6-A-2026.git",
      link: "https://fantastic-tanuki-e19a9a.netlify.app",
    },
    {
      title: "KeenKeeper",
      image: Keenkeper,
      tags: ["Next.js", "React", "Tailwind CSS", "DaisyUI", "React Icons"],
      description:
        "A task management application that helps users organize daily activities, set priorities, and track progress through a visually appealing interface.",
      github: "https://github.com/Siam24857/B13-As-7.git",
      link: "https://b13-7-as-2026.netlify.app",
    },
    {
      title: "AllRooms",
      image: Allrooms,
      tags: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
      description:
        "A room discovery and listing experience featuring rich filtering, detailed room views, and a clean, conversion-focused layout for browsing spaces.",
      github: "https://github.com/Siam24857",
      link: "https://ass-project-9.vercel.app",
    },
    {
      title: "Fable",
      image: Fable,
      tags: ["React", "Tailwind CSS", "JavaScript", "UI Design"],
      description:
        "An elegant storytelling and content platform centered on a refined reading experience, fluid navigation, and a minimal, typography-led interface.",
      github: "https://github.com/Siam24857",
      link: "https://github.com/Siam24857",
    },
    {
      title: "Clodfare",
      image: Clodfare,
      tags: ["Next.js", "React", "Tailwind CSS", "Crowdfunding"],
      description:
        "A crowdfunding platform with campaign pages, progress tracking, and a trustworthy, conversion-oriented design built for modern product launches.",
      github: "https://github.com/Siam24857",
      link: "https://github.com/Siam24857",
    },
    {
      title: "MarketPlace",
      image: MarketPlace,
      tags: ["React", "Tailwind CSS", "JavaScript", "E-commerce"],
      description:
        "A product discovery marketplace to explore and share exceptional products, featuring grid layouts, detail views, and smooth micro-interactions.",
      github: "https://github.com/Siam24857",
      link: "https://github.com/Siam24857",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden bg-ink-900"
      id="projects"
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-accent/8 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-purple/8 blur-[120px]" />
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
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-16"
        >
          Projects I've <span className="text-gradient-brand">designed & built</span>
        </motion.h2>

        <div className="space-y-20 lg:space-y-28">
          {projects.map((project, index) => (
            <div key={project.title} className="project-visual">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
