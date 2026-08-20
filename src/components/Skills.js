"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiBootstrap, SiFigma, SiThreedotjs, SiGit, SiGithub, SiNpm, SiVite,
  SiNodedotjs, SiExpress, SiMongodb, SiDocker, SiFirebase, SiVercel, SiPostgresql,
  SiPrisma, SiGoogle, SiGreensock, SiNetlify, SiPostman
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  MdDevices, MdAutoAwesome, MdAnimation, MdBrush, MdSwapVert,
  MdApi, MdSpeed, MdLayers, MdStorage, MdLock, MdBugReport, MdShowChart
} from "react-icons/md";
import { SKILLS_DATA } from "@/lib/data";

const ICON_MAP = {
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Next.js 14": SiNextdotjs,
  "Next.js Full-Stack": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "JSX": SiReact,
  "Bootstrap": SiBootstrap,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "APIs": MdApi,
  "REST APIs": MdApi,
  "API Development": MdApi,
  "API Integration": MdApi,
  "Third-Party API Integration": MdApi,
  "Authentication APIs": MdLock,
  "Google APIs": SiGoogle,
  Database: SiMongodb,
  "MongoDB": SiMongodb,
  "MongoDB Atlas": SiMongodb,
  "MongoDB Query Operators": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "Prisma ORM": SiPrisma,
  Git: SiGit,
  "GitHub": SiGithub,
  "VS Code": VscVscode,
  Postman: SiPostman,
  Figma: SiFigma,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Deployment: SiVercel,
  "UI Design": MdBrush,
  Animation: MdAnimation,
  "CSS Animations": MdAnimation,
  "Framer Motion": MdAnimation,
  "Lenis": MdAnimation,
  Responsive: MdDevices,
  "Responsive Web Design": MdDevices,
  "Responsive UI/UX": MdDevices,
  "CRUD Operations": MdSwapVert,
  "Database Design": MdStorage,
  "Database Integration": MdStorage,
  "Server-Side Development": MdStorage,
  "JWT": MdLock,
  "JWT Authentication": MdLock,
  "Better Auth": MdLock,
  "Authentication & Authorization": MdLock,
  "Protected Routes": MdLock,
  "Role-Based Access Control": MdLock,
  "Role-Based Authentication": MdLock,
  "Aggregation Pipeline": SiMongodb,
  "AI-Assisted Development": MdAutoAwesome,
  "Front-End AI Engineering": MdAutoAwesome,
  "AI Tools & LLMs": MdAutoAwesome,
  "GSAP": SiGreensock,
  "Recharts": MdShowChart,
  "HeroUI": SiReact,
  "DaisyUI": SiReact,
  "Debugging & Troubleshooting": MdBugReport,
  "Modern UI Development": MdBrush,
  "MERN Stack": SiMongodb,
  "Full-Stack Web Development": SiReact,
  "Full-Stack Development": SiReact,
  "Frontend Development": SiReact,
  "Backend Development": SiNodedotjs,
  "Ollama": SiReact,
  "OpenAI API": SiReact,
  "Gemini API": SiGoogle,
  "Claude API": SiReact,
  "Google API Integration": SiGoogle,
};

function AnimatedCounter({ target, duration = 1000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

function SkillCard({ skill, index, accent }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 50);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const Icon = ICON_MAP[skill.name] || SiReact;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-surface border border-border-subtle p-5 hover:border-coral/30 transition-colors"
      style={{ borderRadius: "4px" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="flex items-center justify-center w-10 h-10"
          style={{ color: skill.color }}
        >
          <Icon size={28} />
        </span>
        <div>
          <h4 className="font-heading font-bold text-text text-sm">{skill.name}</h4>
          <span className="text-[0.65rem] text-coral font-mono font-bold tracking-wider">
            LVL {skill.levelNum}
          </span>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-xs text-muted mb-1 font-mono font-semibold">
          <span>Proficiency</span>
          <span className="text-coral">{skill.level}%</span>
        </div>
        <div className="h-1.5 bg-border-subtle overflow-hidden" style={{ borderRadius: 0 }}>
          <motion.div
            className="h-full"
            style={{
              background: `linear-gradient(90deg, #ff6b6b, #f5a623)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.level}%` : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-muted font-mono">
        <span>XP</span>
        <span className="text-amber font-bold">
          {isVisible ? <AnimatedCounter target={skill.xp} /> : "0"}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const containerRef = useRef(null);

  const activeCategory = SKILLS_DATA.categories.find((c) => c.id === activeTab) || SKILLS_DATA.categories[0];

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden"
      id="skills"
    >
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {SKILLS_DATA.categories.map((cat, i) => (
          <div
            key={cat.id}
            className="absolute rounded-full blur-3xl opacity-[0.06]"
            style={{
              width: "300px",
              height: "300px",
              background: cat.accent,
              top: `${20 + i * 20}%`,
              left: `${10 + i * 25}%`,
              animation: `orbit-drift ${20 + i * 5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label justify-center mb-4"
          >
            SKILLS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading"
          >
            Tech <span className="text-coral">Arsenal</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted font-medium text-base sm:text-lg"
          >
            Interactive skill progression system. Select a category to explore.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {SKILLS_DATA.categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 text-xs font-extrabold tracking-wider uppercase transition-all duration-300 font-heading ${
                activeTab === cat.id
                  ? "bg-coral text-void border border-coral"
                  : "bg-transparent border border-border-subtle text-muted hover:text-coral hover:border-coral/50"
              }`}
              style={{ borderRadius: 0 }}
            >
              {cat.title}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {activeCategory.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={i}
                  accent={activeCategory.accent}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
