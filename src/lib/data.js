import Studyrooms from "../asset/study-rooms.png";
import Fable from "../asset/fable.png";
import Clodfare from "../asset/clodfare.png";
import MarketPlace from "../asset/marketplace.png";
import Aiagent from "../asset/aiagent.png";

export const PROFILE = {
  name: "Sheikh Siam",
  role: "Frontend Developer & UI Engineer",
  tagline: "I build futuristic, high-performance interactive web experiences & creative frontend applications.",
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
    color: "#06b6d4",
    planets: [
      { name: "HTML5", icon: "SiHtml5", color: "#E34F26", level: 98, desc: "Semantic, accessible HTML5 structure & DOM standard." },
      { name: "CSS3", icon: "SiCss3", color: "#1572B6", level: 96, desc: "Modern CSS3 layout, custom properties, animations & responsive grids." },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", level: 95, desc: "ES6+, async programming, custom web APIs & interactive logic." },
      { name: "React.js", icon: "SiReact", color: "#61DAFB", level: 96, desc: "Modern component architecture, hooks, performance & state design." },
      { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF", level: 94, desc: "App Router, SSR, SSG, optimization, routing & server components." },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", level: 92, desc: "Type-safe interfaces, generics & scalable codebases." },
    ],
  },
  {
    id: 2,
    title: "UI/UX & Design System",
    radius: 270,
    speed: 0.006,
    color: "#a78bfa",
    planets: [
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", level: 96, desc: "Utility-first CSS styling, custom design systems & dynamic themes." },
      { name: "Responsive Design", icon: "MdDevices", color: "#38BDF8", level: 98, desc: "Flawless viewports across mobile, tablet, desktop & ultra-wide displays." },
      { name: "Glassmorphism UI", icon: "MdOutlineGlass", color: "#E0E7FF", level: 95, desc: "Sleek translucent glass visual aesthetics with dynamic backdrop blurs." },
      { name: "Animation Design", icon: "MdOutlineAutoAwesome", color: "#F43F5E", level: 94, desc: "Micro-interactions, polished UI transitions & visual delight." },
      { name: "Motion Design", icon: "MdAnimation", color: "#A855F7", level: 92, desc: "Cinematic scroll animations, spatial transitions & user flow motion." },
      { name: "Figma", icon: "SiFigma", color: "#F24E1E", level: 90, desc: "UI prototyping, component design libraries & design-to-code translation." },
    ],
  },
  {
    id: 3,
    title: "Creative Frontend Technology",
    radius: 370,
    speed: 0.0045,
    color: "#f43f5e",
    planets: [
      { name: "Three.js", icon: "SiThreejs", color: "#00F0FF", level: 90, desc: "3D scenes, custom shaders, lighting, camera controls & geometries." },
      { name: "GSAP Animation", icon: "SiGsap", color: "#88CE02", level: 94, desc: "Timeline controls, ScrollTrigger, morphing & high-performance motion." },
      { name: "Canvas API", icon: "MdBrush", color: "#FF6464", level: 92, desc: "Interactive 2D/3D canvas rendering, particles & custom frame engines." },
      { name: "WebGL", icon: "SiWebgl", color: "#F43F5E", level: 88, desc: "Hardware-accelerated graphics, custom pixel shaders & GPU rendering." },
      { name: "Framer Motion", icon: "SiFramer", color: "#0055FF", level: 95, desc: "React layout animations, gestures, springs & page transitions." },
      { name: "Scroll Animation", icon: "MdSwapVert", color: "#A78BFA", level: 96, desc: "Cinematic scroll scrubbing, frame sequences & parallax timeline effects." },
    ],
  },
  {
    id: 4,
    title: "Frontend Tools & Workflow",
    radius: 470,
    speed: 0.003,
    color: "#10b981",
    planets: [
      { name: "Git & GitHub", icon: "SiGit", color: "#F05032", level: 94, desc: "Version control, feature branching, code reviews & collaborative workflows." },
      { name: "VS Code", icon: "VscVscode", color: "#007ACC", level: 96, desc: "Optimized IDE setup, custom snippets, extension suites & debugging." },
      { name: "npm", icon: "SiNpm", color: "#CB3837", level: 92, desc: "Package management, script automation & library dependencies." },
      { name: "Vite", icon: "SiVite", color: "#646CFF", level: 94, desc: "Ultra-fast HMR, modern frontend tooling & production bundling." },
      { name: "API Integration", icon: "MdApi", color: "#10B981", level: 95, desc: "RESTful endpoints, GraphQL, WebSocket real-time streams & async data." },
      { name: "Website Optimization", icon: "MdSpeed", color: "#F59E0B", level: 94, desc: "Core Web Vitals, 60FPS rendering, lazy loading & bundle minification." },
    ],
  },
];

export const SKILLS = SOLAR_ORBITS.flatMap((orbit) => orbit.planets);

export const SKILL_CATEGORIES = SOLAR_ORBITS.map((orbit) => ({
  title: orbit.title,
  accent:
    orbit.id === 1
      ? "from-[#06b6d4] to-[#38bdf8]"
      : orbit.id === 2
      ? "from-[#a78bfa] to-[#f43f5e]"
      : orbit.id === 3
      ? "from-[#f43f5e] to-[#00f0ff]"
      : "from-[#10b981] to-[#06b6d4]",
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
    title: "Shipping Products",
    desc: "Built and deployed multiple creative frontend products & interactive platforms with modern tooling, 3D elements, and smooth motion design.",
    tag: "Creative Web Apps",
  },
  {
    period: "2026 · Today",
    title: "Crafting AI Systems & WebGL",
    desc: "Crafting premium, accessible frontend experiences with TypeScript, WebGL, 3D graphics, design systems, and motion — continuously leveling up as a creative UI engineer.",
    tag: "Creative Engineering",
  },
];

export const PROJECTS = [
  {
    title: "Clodfare",
    image: Clodfare,
    category: "Frontend",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    description:
      "A high-performance crowdfunding platform frontend that enables creators to launch campaigns, track fundraising activities, and explore interactive dashboards with real-time statistics, smooth animations, and clean responsive UI.",
    github: "https://github.com/Siam24857/Cloudflare-client.git",
    link: "https://cloudflare-client-omega.vercel.app",
  },
  {
    title: "Fab Ebook",
    image: Fable,
    category: "Frontend",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description:
      "An interactive ebook marketplace frontend designed for digital book discovery. Features dark glassmorphism UI, real-time search, animated book shelf previews, smooth modal popups, and responsive layout.",
    github: "https://github.com/Siam24857/Fab-E-book-platform.git",
    link: "https://fab-e-book-platform.vercel.app",
  },
  {
    title: "AI Agent",
    image: Aiagent,
    category: "AI",
    tags: ["Next.js", "React", "TypeScript", "Gemini API", "Tailwind CSS", "Three.js"],
    description:
      "An AI-powered assistant frontend providing intelligent real-time chat, context-aware visual responses, Gemini API integration, dynamic streaming animations, and a futuristic cyberpunk UI.",
    github: "https://github.com/Siam24857/AI-agent-cleint.git",
    link: "https://ai-agent-cleint.vercel.app",
  },
  {
    title: "Marketplace",
    image: MarketPlace,
    category: "Frontend",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    description:
      "A modern e-commerce marketplace interface allowing users to explore product catalogs, interact with dynamic filters, view product galleries, and experience fluid state transitions.",
    github: "https://github.com/Siam24857/Marketplace-client.git",
    link: "https://marketplace-client-one.vercel.app",
  },
  {
    title: "Study Rooms",
    image: Studyrooms,
    category: "Frontend",
    tags: ["Next.js", "React", "Tailwind CSS", "Canvas API"],
    description:
      "A modern study room booking platform with interactive room discovery, real-time availability, and a clean booking flow. Features responsive design, animated UI, and integrated calendar scheduling.",
    github: "https://github.com/Siam24857/study-rooms-client.git",
    link: "https://study-rooms-client.vercel.app",
  },
];

export const SOCIALS = [
  { label: "Email", value: "siamtechofficial1597@gmail.com", href: "mailto:siamtechofficial1597@gmail.com" },
  { label: "GitHub", value: "@Siam24857", href: "https://github.com/Siam24857" },
  { label: "LinkedIn", value: "in/sheikh-siam", href: "https://www.linkedin.com/in/sheikh-siam/" },
];

export const KNOWLEDGE_NODES = [
  { label: "HTML5", color: "#E34F26", pos: [0, 0, 0] },
  { label: "CSS3", color: "#1572B6", pos: [2, 1, 0] },
  { label: "JavaScript", color: "#F7DF1E", pos: [4, -1, 1] },
  { label: "React.js", color: "#61DAFB", pos: [6, 0.5, -1] },
  { label: "Next.js", color: "#ffffff", pos: [8, -0.5, 0.5] },
  { label: "TypeScript", color: "#3178C6", pos: [10, 1, 0] },
  { label: "Tailwind CSS", color: "#06B6D4", pos: [12, 0, -1] },
  { label: "Three.js", color: "#00F0FF", pos: [14, -1, 0.5] },
  { label: "GSAP", color: "#88CE02", pos: [16, 0.5, 1] },
  { label: "Canvas API", color: "#FF6464", pos: [18, -0.5, 0] },
  { label: "Framer Motion", color: "#0055FF", pos: [20, 1, -0.5] },
  { label: "Git & GitHub", color: "#F05032", pos: [22, 0, 1] },
];
