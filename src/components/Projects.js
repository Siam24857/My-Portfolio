"use client";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Allrooms from "../asset/All-rooms.png";
import Digitaltech from "../asset/Digfitalt-tech.png";
import Keenkeper from "../asset/Keenkeper.png";
import Skillshaper from "../asset/Skillshaper.png";
import Studyrooms from "../asset/study-rooms.png";
import Image from "next/image";

const MotionImage = motion(Image);

/* ─── Floating particle background ─── */
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[var(--accent)]"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15 + Math.random() * 0.2,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated tag pill ─── */
function Tag({ text, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--accent-rgb), 0.25)" }}
      className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/10 cursor-default select-none"
    >
      {text}
    </motion.span>
  );
}

/* ─── Glowing CTA button ─── */
function GlowButton({ href, children, primary }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-bold overflow-hidden group transition-all duration-300 ${
        primary
          ? "bg-[var(--accent)] text-white shadow-[0_0_24px_var(--accent-glow)]"
          : "border border-white/20 text-white/80 hover:text-white hover:border-white/50"
      }`}
    >
      {primary && (
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.4 }}
        />
      )}
      {children}
    </motion.a>
  );
}

/* ─── Single project card ─── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isEven ? -60 : 60, y: 30 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
  };

  const visualVariants = {
    hidden: { opacity: 0, x: isEven ? 60 : -60, scale: 0.92 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
    >
      {/* Horizontal connector line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 hidden md:block w-12 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent -translate-y-1/2 -translate-x-1/2 origin-left"
        style={{ transformOrigin: "left center" }}
      />

      {/* ── TEXT SIDE ── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full md:w-1/2 relative"
      >
        {/* Number badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="absolute -top-8 -left-2 text-7xl font-black text-white/[0.04] select-none pointer-events-none"
        >
          0{index + 1}
        </motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "2.5rem" } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-0.5 bg-[var(--accent)] mb-4"
          />

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-extrabold mb-4 tracking-tight text-white"
          >
            {project.title}
          </motion.h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <Tag key={i} text={tag} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-white/55 mb-8 max-w-md leading-relaxed text-sm"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex gap-4 items-center flex-wrap"
          >
            <GlowButton href={project.github} primary>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </GlowButton>

            <GlowButton href={project.link}>
              Live Demo
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </GlowButton>
          </motion.div>
        </div>
      </motion.div>

      {/* ── VISUAL SIDE ── */}
      <motion.div
        variants={visualVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full md:w-1/2 project-visual"
      >
        <div className="relative group">
          {/* Corner accent dots */}
          {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-[var(--accent)] z-20`}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0e0e14]"
          >
            {/* Top browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
              {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
              <div className="ml-3 flex-1 bg-white/5 rounded-full h-4 max-w-[180px]" />
            </div>

            {/* Project visual content */}
            <div className="relative overflow-hidden">
              {project.visual}
              {/* Subtle scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 3px)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section heading ─── */
function SectionHeading() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-28 relative">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[var(--accent)] text-xs uppercase tracking-[0.3em] font-bold mb-3"
      >
        Selected Work
      </motion.p>

      <div className="relative inline-block">
        <motion.h2
          initial={{ opacity: 0, y: 30, skewY: 3 }}
          animate={isInView ? { opacity: 1, y: 0, skewY: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-7xl font-black tracking-tight text-white"
        >
          Projects
        </motion.h2>

        {/* Underline bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-3 mx-auto h-1 bg-gradient-to-r from-[var(--accent)]  to-transparent rounded-full"
          style={{ originX: 0, width: "100%" }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 text-white/40 text-sm max-w-xs mx-auto"
      >
        A collection of things I've built and shipped.
      </motion.p>
    </div>
  );
}

/* ─── Main export ─── */
export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-visual").forEach((visual) => {
        gsap.to(visual, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    {
  title: "SkillSphere",
  tags: [
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Better Auth"
  ],
  description:
    "SkillSphere is a modern e-learning platform that connects students with industry experts through high-quality courses. Users can browse courses, explore instructor profiles, enroll in trending courses, and manage their learning journey through a personalized account system. The platform includes secure authentication, course details pages, instructor ratings, and learning resources to enhance the educational experience.",
  github: "https://github.com/Siam24857/B13-A8-platfoprm.git",
  link: "https://b13-a8-platfoprm-j9sv.vercel.app",
  visual: (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Image
        src={Skillshaper}
        alt="SkillSphere Project"
        className="rounded-lg shadow-xl w-full"
      />
    </motion.div> 
  ),
},
  {
  title: "StudyNook",
  tags: [
    "Next.js 14",
    "React",
    "Tailwind CSS",
    "MongoDB",
    "Better Auth"
  ],
  description:
    "StudyNook is a modern study room booking platform where users can discover, book, and manage study spaces with ease. The platform features advanced search and filtering, real-time room availability, user dashboards, and room hosting capabilities for owners.",
  github: "https://github.com/Siam24857/B13-As-7.git",
  link: "https://ass-project-9.vercel.app",
  visual: (
    <div className="grid grid-cols-2 gap-4 p-4">
      <MotionImage
        whileHover={{ scale: 1.08, rotate: -2 }}
        transition={{ type: "spring", stiffness: 200 }}
        src={Studyrooms}
        alt="StudyNook Home Page"
        className="rounded-lg shadow-xl cursor-pointer"
      />
      <MotionImage
        whileHover={{ scale: 1.08, rotate: 2 }}
        transition={{ type: "spring", stiffness: 200 }}
        src={Allrooms}
        alt="StudyNook Room Listings"
        className="rounded-lg shadow-xl mt-8 cursor-pointer"
      />
    </div>
  ),
},
    {
  title: "Digitool",
  tags: [
    "React.js",
    "Tailwind CSS",
    "DaisyUI",
    "JavaScript",
    "React Toastify",
    "Vite"
  ],
  description:
    "Digitool is a premium digital tools marketplace where users can browse productivity resources, add products to a shopping cart, manage selections, and complete checkout through an intuitive and responsive interface.",
  github: "https://github.com/Siam24857/B13-6-A-2026.git",
  link: "https://fantastic-tanuki-e19a9a.netlify.app",
  visual: (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Image
        src={Digitaltech}
        alt="Digitool Project"
        className="rounded-lg shadow-xl w-full"
      />
    </motion.div>
  ),
},
   {
  title: "KeenKeeper",
  tags: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "DaisyUI",
    "React Icons",
    "JSON"
  ],
  description:
    "KeenKeeper is a task management application that helps users organize their daily activities, set priorities, and track progress through a visually appealing interface.",
  github: "https://github.com/Siam24857/B13-As-7.git",
  link: "https://b13-7-as-2026.netlify.app",
  visual: (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Image
        src={Keenkeper}
        alt="FriendSphere Project"
        className="rounded-lg shadow-xl w-full"
      />
    </motion.div>
  ),
},
  ];

  return (
    <>
      <style>{`
        :root {
          --accent: #f97316;
          --accent-rgb: 249, 115, 22;
          --accent-glow: rgba(249, 115, 22, 0.45);
          --accent2: #ec4899;
        }
      `}</style>

      <section
        ref={containerRef}
        className="relative py-32 px-6 overflow-hidden"
        id="projects"
      >
        {/* Background Banner */}
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

        {/* Ambient blobs */}
        <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-coral-accent/[0.03] blur-[140px]" />
          <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
        </motion.div>

        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015] -z-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto z-10">
          <SectionHeading />

          <div className="space-y-36">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mt-28"
          >
            <p className="text-white/30 text-sm mb-4">Want to see more?</p>
            <GlowButton href="https://github.com/" primary>
              View all on GitHub
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </GlowButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}