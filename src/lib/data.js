import Studyrooms from "../asset/study-rooms.png";
import Fable from "../asset/fable.png";
import Clodfare from "../asset/clodfare.png";
import MarketPlace from "../asset/marketplace.png";
import Aiagent from "../asset/aiagent.png";
import Keenkeeper from "../asset/Keenkeper.png";

export const PROFILE = {
  name: "Sheikh Siam",
  role: "Full-Stack Developer",
  tagline: "Building scalable web applications with modern technologies.",
  email: "siamtechofficial1597@gmail.com",
  location: "Bangladesh",
  github: "https://github.com/Siam24857",
  linkedin: "https://www.linkedin.com/in/sheikh-siam/",
  resume: "https://drive.google.com/file/d/1_jF1S2jq8ExXsPVmfr4UX_W6zDUCFnZx/view?usp=sharing",
};

export const SOLAR_ORBITS = [
  {
    id: 1,
    title: "Frontend Development",
    radius: 170,
    speed: 0.008,
    color: "#FFD700",
    planets: [
      { name: "React.js", icon: "SiReact", color: "#61DAFB", level: 96, desc: "Modern component architecture, hooks, performance & state design." },
      { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF", level: 94, desc: "App Router, SSR, SSG, optimization, routing & server components." },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", level: 92, desc: "Type-safe interfaces, generics & scalable codebases." },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", level: 95, desc: "ES6+, async programming, custom web APIs & interactive logic." },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", level: 96, desc: "Utility-first CSS styling, custom design systems & dynamic themes." },
    ],
  },
  {
    id: 2,
    title: "Backend Development",
    radius: 270,
    speed: 0.006,
    color: "#06b6d4",
    planets: [
      { name: "Node.js", icon: "SiNodedotjs", color: "#68A063", level: 90, desc: "Server-side JavaScript, event-driven architecture & scalable APIs." },
      { name: "Express.js", icon: "SiExpress", color: "#FFFFFF", level: 88, desc: "RESTful routing, middleware, error handling & API design patterns." },
      { name: "APIs", icon: "MdApi", color: "#10B981", level: 92, desc: "RESTful endpoints, GraphQL, WebSocket real-time streams & async data." },
      { name: "Database", icon: "SiMongodb", color: "#68A063", level: 85, desc: "Schema design, indexing, aggregation pipelines & data modeling." },
    ],
  },
  {
    id: 3,
    title: "Tools & Cloud",
    radius: 370,
    speed: 0.0045,
    color: "#a78bfa",
    planets: [
      { name: "Git", icon: "SiGit", color: "#F05032", level: 94, desc: "Version control, feature branching, code reviews & collaborative workflows." },
      { name: "Docker", icon: "SiDocker", color: "#2496ED", level: 82, desc: "Containerization, multi-stage builds, orchestration & CI/CD pipelines." },
      { name: "Firebase", icon: "SiFirebase", color: "#FFCA28", level: 88, desc: "Authentication, Firestore, hosting, functions & real-time databases." },
      { name: "Deployment", icon: "SiVercel", color: "#FFFFFF", level: 90, desc: "CI/CD, environment configs, edge functions & production monitoring." },
    ],
  },
];

export const SKILLS = SOLAR_ORBITS.flatMap((orbit) => orbit.planets);

export const SKILL_CATEGORIES = SOLAR_ORBITS.map((orbit) => ({
  title: orbit.title,
  accent:
    orbit.id === 1
      ? "from-[#FFD700] to-[#ffffff]"
      : orbit.id === 2
      ? "from-[#06b6d4] to-[#10b981]"
      : "from-[#a78bfa] to-[#7c3aed]",
  skills: orbit.planets.map((p) => p.name),
}));

export const TIMELINE = [
  {
    period: "2024 · Start",
    title: "The Beginning",
    desc: "Started with HTML, CSS, and JavaScript. Built my first static websites and fell in love with bringing designs to life in the browser.",
    tag: "Foundations",
  },
  {
    period: "2024 · Growth",
    title: "Frontend Specialization",
    desc: "Mastered responsive design and began shipping real interactive projects with React.js and Next.js, focusing on component architecture and clean UI.",
    tag: "React · Next.js",
  },
  {
    period: "2025 · Building",
    title: "Full-Stack Expansion",
    desc: "Expanded into backend with Node.js and Express.js. Built RESTful APIs, integrated databases, and deployed full-stack applications to production.",
    tag: "Node.js · Express",
  },
  {
    period: "2026 · Today",
    title: "Crafting Scalable Systems",
    desc: "Building production-grade full-stack applications with modern tooling, cloud deployment, and continuous integration. Focused on performance and scalability.",
    tag: "Full-Stack Engineering",
  },
];

export const PROJECTS = [
  {
    title: "AI Applications",
    image: Aiagent,
    category: "AI",
    tags: ["Next.js", "React", "TypeScript", "Gemini API", "Tailwind CSS"],
    description:
      "An AI-powered assistant frontend providing intelligent real-time chat, context-aware visual responses, Gemini API integration, dynamic streaming animations, and a futuristic cyberpunk UI.",
    github: "https://github.com/Siam24857/AI-agent-cleint.git",
    link: "https://ai-agent-cleint.vercel.app",
  },
  {
    title: "Task Management System",
    image: Keenkeeper,
    category: "Full Stack",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    description:
      "A comprehensive task management platform with drag-and-drop boards, real-time collaboration, team workspaces, and analytics dashboards. Built for productivity and scale.",
    github: "https://github.com/Siam24857",
    link: "https://github.com/Siam24857",
  },
  {
    title: "ERP System",
    image: Clodfare,
    category: "Full Stack",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "Database"],
    description:
      "Enterprise Resource Planning system with inventory management, order processing, financial reporting, and multi-role dashboards. Designed for efficiency and data-driven decisions.",
    github: "https://github.com/Siam24857/Cloudflare-client.git",
    link: "https://cloudflare-client-omega.vercel.app",
  },
  {
    title: "Developer Tools",
    image: Fable,
    category: "Frontend",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    description:
      "A suite of developer utilities including code formatters, API testers, color palette generators, and snippet managers. Built with performance and developer experience in mind.",
    github: "https://github.com/Siam24857/Fab-E-book-platform.git",
    link: "https://fab-e-book-platform.vercel.app",
  },
  {
    title: "Full Stack Applications",
    image: MarketPlace,
    category: "Full Stack",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express"],
    description:
      "Production-ready full-stack applications with authentication, payment integration, admin panels, and real-time notifications. Scalable architecture for modern web products.",
    github: "https://github.com/Siam24857/Marketplace-client.git",
    link: "https://marketplace-client-one.vercel.app",
  },
];

export const SOCIALS = [
  { label: "Email", value: "siamtechofficial1597@gmail.com", href: "mailto:siamtechofficial1597@gmail.com" },
  { label: "GitHub", value: "@Siam24857", href: "https://github.com/Siam24857" },
  { label: "LinkedIn", value: "in/sheikh-siam", href: "https://www.linkedin.com/in/sheikh-siam/" },
];

export const KNOWLEDGE_NODES = [
  { label: "React.js", color: "#61DAFB", pos: [0, 0, 0] },
  { label: "Next.js", color: "#FFFFFF", pos: [2, 1, 0] },
  { label: "TypeScript", color: "#3178C6", pos: [4, -1, 1] },
  { label: "JavaScript", color: "#F7DF1E", pos: [6, 0.5, -1] },
  { label: "Tailwind", color: "#06B6D4", pos: [8, -0.5, 0.5] },
  { label: "Node.js", color: "#68A063", pos: [10, 1, 0] },
  { label: "Express", color: "#FFFFFF", pos: [12, 0, -1] },
  { label: "MongoDB", color: "#68A063", pos: [14, -1, 0.5] },
  { label: "Git", color: "#F05032", pos: [16, 0.5, 1] },
  { label: "Docker", color: "#2496ED", pos: [18, -0.5, 0] },
  { label: "Firebase", color: "#FFCA28", pos: [20, 1, -0.5] },
  { label: "Vercel", color: "#FFFFFF", pos: [22, 0, 1] },
];
