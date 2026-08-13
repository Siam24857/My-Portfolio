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

export const SKILLS_DATA = {
  categories: [
    {
      id: "frontend",
      title: "Frontend",
      accent: "#ff6b6b",
      skills: [
        { name: "React.js", icon: "SiReact", color: "#61DAFB", level: 96, xp: 8500, levelNum: 5 },
        { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF", level: 94, xp: 8200, levelNum: 5 },
        { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", level: 92, xp: 7800, levelNum: 4 },
        { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", level: 95, xp: 8100, levelNum: 5 },
        { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", level: 96, xp: 8400, levelNum: 5 },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      accent: "#f5a623",
      skills: [
        { name: "Node.js", icon: "SiNodedotjs", color: "#68A063", level: 90, xp: 7200, levelNum: 4 },
        { name: "Express.js", icon: "SiExpress", color: "#FFFFFF", level: 88, xp: 6900, levelNum: 4 },
        { name: "APIs", icon: "MdApi", color: "#10B981", level: 92, xp: 7500, levelNum: 4 },
        { name: "Database", icon: "SiMongodb", color: "#68A063", level: 85, xp: 6500, levelNum: 3 },
      ],
    },
    {
      id: "tools",
      title: "Tools & Cloud",
      accent: "#7c3aed",
      skills: [
        { name: "Git", icon: "SiGit", color: "#F05032", level: 94, xp: 8000, levelNum: 5 },
        { name: "Docker", icon: "SiDocker", color: "#2496ED", level: 82, xp: 5800, levelNum: 3 },
        { name: "Firebase", icon: "SiFirebase", color: "#FFCA28", level: 88, xp: 6700, levelNum: 4 },
        { name: "Deployment", icon: "SiVercel", color: "#FFFFFF", level: 90, xp: 7100, levelNum: 4 },
      ],
    },
    {
      id: "design",
      title: "Design",
      accent: "#06b6d4",
      skills: [
        { name: "Figma", icon: "SiFigma", color: "#F24E1E", level: 78, xp: 4500, levelNum: 3 },
        { name: "UI Design", icon: "MdBrush", color: "#ff6b6b", level: 85, xp: 6200, levelNum: 4 },
        { name: "Animation", icon: "MdAnimation", color: "#f5a623", level: 88, xp: 6800, levelNum: 4 },
        { name: "Responsive", icon: "MdDevices", color: "#10B981", level: 92, xp: 7600, levelNum: 4 },
      ],
    },
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "AI Applications",
    image: "/aiagent.png",
    category: "AI",
    tags: ["Next.js", "React", "TypeScript", "Gemini API"],
    description:
      "An AI-powered assistant frontend providing intelligent real-time chat, context-aware visual responses, Gemini API integration, dynamic streaming animations, and a futuristic cyberpunk UI.",
    github: "https://github.com/Siam24857/AI-agent-cleint.git",
    link: "https://ai-agent-cleint.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management System",
    image: "/Keenkeper.png",
    category: "Full Stack",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    description:
      "A comprehensive task management platform with drag-and-drop boards, real-time collaboration, team workspaces, and analytics dashboards.",
    github: "https://github.com/Siam24857",
    link: "https://github.com/Siam24857",
    featured: false,
  },
  {
    id: 3,
    title: "ERP System",
    image: "/clodfare.png",
    category: "Full Stack",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
    description:
      "Enterprise Resource Planning system with inventory management, order processing, financial reporting, and multi-role dashboards.",
    github: "https://github.com/Siam24857/Cloudflare-client.git",
    link: "https://cloudflare-client-omega.vercel.app",
    featured: false,
  },
  {
    id: 4,
    title: "Developer Tools",
    image: "/fable.png",
    category: "Frontend",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    description:
      "A suite of developer utilities including code formatters, API testers, color palette generators, and snippet managers.",
    github: "https://github.com/Siam24857/Fab-E-book-platform.git",
    link: "https://fab-e-book-platform.vercel.app",
    featured: false,
  },
  {
    id: 5,
    title: "Full Stack Applications",
    image: "/marketplace.png",
    category: "Full Stack",
    tags: ["React", "TypeScript", "Node.js", "Express"],
    description:
      "Production-ready full-stack applications with authentication, payment integration, admin panels, and real-time notifications.",
    github: "https://github.com/Siam24857/Marketplace-client.git",
    link: "https://marketplace-client-one.vercel.app",
    featured: false,
  },
];

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
    desc: "Mastered responsive design and began shipping real interactive projects with React.js and Next.js.",
    tag: "React · Next.js",
  },
  {
    period: "2025 · Building",
    title: "Full-Stack Expansion",
    desc: "Expanded into backend with Node.js and Express.js. Built RESTful APIs, integrated databases, and deployed full-stack applications.",
    tag: "Node.js · Express",
  },
  {
    period: "2026 · Today",
    title: "Crafting Scalable Systems",
    desc: "Building production-grade full-stack applications with modern tooling, cloud deployment, and continuous integration.",
    tag: "Full-Stack Engineering",
  },
];

export const SOCIALS = [
  { label: "Email", value: "siamtechofficial1597@gmail.com", href: "mailto:siamtechofficial1597@gmail.com", icon: "Mail" },
  { label: "GitHub", value: "@Siam24857", href: "https://github.com/Siam24857", icon: "Github" },
  { label: "LinkedIn", value: "in/sheikh-siam", href: "https://www.linkedin.com/in/sheikh-siam/", icon: "Linkedin" },
  { label: "Twitter", value: "@sheikhsiam", href: "https://twitter.com/sheikhsiam", icon: "Twitter" },
  { label: "Dribbble", value: "@sheikhsiam", href: "https://dribbble.com/sheikhsiam", icon: "Dribbble" },
];
