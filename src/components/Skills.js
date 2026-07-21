"use client";
import { motion } from "framer-motion";
import { SiHtml5, SiCss, SiJavascript, SiReact, SiTypescript, SiGithub, SiGit, SiFigma, SiVercel, SiNodedotjs, SiExpress, SiMongodb } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M12 2L2 19.5h3.2L12 9.2l6.8 10.3H22L12 2zm0 5.8l-3 4.6h6l-3-4.6z" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.39 10.81 14.55 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.19 14.45 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.81 9.55 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.19 9.45 12 7 12z" />
    </svg>
  );
}

function ResponsiveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function ComponentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM12 12l9-5M12 12v10M12 12L3 7" />
    </svg>
  );
}

function AnimationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function DesignSystemIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function DotenvIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

const TECH_CAROUSEL = [
  "HTML5", "CSS3", "JavaScript", "React", "Next.js",
  "TypeScript", "Tailwind", "Node.js", "Express.js", "MongoDB",
  "dotenv", "Git", "GitHub", "Figma", "Vercel", "VS Code",
];

const CATEGORIES = [
  {
    title: "Frontend",
    accent: "from-[#FF6B6B] to-[#F3E8FF]",
    skills: [
      { name: "HTML", Icon: SiHtml5 },
      { name: "CSS", Icon: SiCss },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "React.js", Icon: SiReact },
      { name: "Next.js", Icon: NextIcon },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: TailwindIcon },
    ],
  },
  {
    title: "UI / UX",
    accent: "from-[#F3E8FF] to-[#3B0764]",
    skills: [
      { name: "Responsive Design", Icon: ResponsiveIcon },
      { name: "Component Architecture", Icon: ComponentIcon },
      { name: "Animation", Icon: AnimationIcon },
      { name: "Design Systems", Icon: DesignSystemIcon },
    ],
  },
  {
    title: "Tools",
    accent: "from-[#3B0764] to-[#FF6B6B]",
    skills: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Figma", Icon: SiFigma },
      { name: "VS Code", Icon: VscVscode },
      { name: "Vercel", Icon: SiVercel },
    ],
  },
  {
    title: "Backend",
    accent: "from-[#FF6B6B] to-[#3B0764]",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express.js", Icon: SiExpress },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "dotenv", Icon: DotenvIcon },
    ],
  },
];

function SkillCard({ name, Icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex items-center gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-[#FF6B6B]/40 hover:bg-white/[0.06] transition-colors duration-300 cursor-default"
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-[#FF6B6B] group-hover:scale-110 group-hover:bg-[#FF6B6B]/10 transition-all duration-300">
        <Icon className="text-xl" />
      </span>
      <span className="text-sm font-medium text-white/85 group-hover:text-white transition-colors">
        {name}
      </span>
      <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="relative py-32 px-6 bg-ink-800" id="skills">
      {/* Infinite Tech Carousel */}
      <div className="py-6 bg-ink-900/50 border-y border-white/5 overflow-hidden mb-20">
        <div className="relative flex overflow-hidden">
          <div className="tech-track">
            {TECH_CAROUSEL.map((tech) => (
              <span key={tech} className="text-sm font-bold tracking-widest text-[#F3E8FF]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" />
                {tech}
              </span>
            ))}
            {TECH_CAROUSEL.map((tech) => (
              <span key={`dup-${tech}`} className="text-sm font-bold tracking-widest text-[#F3E8FF]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Tech Stack
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-14 max-w-2xl"
        >
          Tools I use to craft{" "}
          <span className="text-gradient-brand">full-stack applications</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="relative rounded-3xl border border-white/8 bg-white/[0.02] p-7 overflow-hidden"
            >
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${cat.accent} opacity-10 blur-2xl`}
              />
              <div className="flex items-center gap-3 mb-6">
                <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${cat.accent}`} />
                <h3 className="text-lg font-semibold tracking-tight">{cat.title}</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {cat.skills.map((s, i) => (
                  <SkillCard key={s.name} name={s.name} Icon={s.Icon} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
