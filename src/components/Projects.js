"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Parallax effect on project thumbnails
      const visuals = gsap.utils.toArray(".project-visual");
      visuals.forEach((visual) => {
        gsap.to(visual, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "Battleship",
      tags: ["HTML", "CSS", "Javascript", "Node.js"],
      description: "Used components of Javascript to implement basic data structures through the game of Battleship. Used a terminal to display ships and tracked where ships are hit or missed.",
      github: "#",
      link: "#",
      visual: (
        <div className="bg-dark-card p-4 rounded-lg border border-white/5 shadow-2xl overflow-hidden group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="bg-black/60 font-mono text-[10px] p-6 text-green-400 leading-relaxed"
          >
            <div className="opacity-70 mb-2">// Terminal View</div>
            Hit!<br />
            Enter a location to strike i.e., 'A2' from A-J and 0-9 F2<br />
            Miss!<br />
            Enter a location to strike i.e., 'A2' from A-J and 0-9 F1<br />
            Miss!<br />
            Enter a location to strike i.e., 'A2' from A-J and 0-9 E3<br />
            Hit!<br />
            Enter a location to strike i.e., 'A2' from A-J and 0-9 D3<br />
            Hit!<br />
            You sunk a Cruiser. There are 4 ships left!
          </motion.div>
        </div>
      ),
    },
    {
      title: "Movie Titles API",
      tags: ["HTML", "CSS", "Javascript", "API", "Version Control"],
      description: "Uses a public movie API to build a collection movie list that sorts from A to Z or vice versa. It also counts how many movies in each container and adds user's favorite movies into another container.",
      github: "#",
      link: "#",
      visual: (
        <div className="grid grid-cols-2 gap-4">
          <motion.img
            whileHover={{ scale: 1.1, rotate: -2 }}
            alt="Movie Project Thumbnail 1"
            className="rounded shadow-lg cursor-pointer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmz5zVKmNzciJIutTbOafXhjJInAfjGzcBZFXtdkWMhJMoxEz0izcRVEejJOVoCZhfyrOdMWTopDe2m3SKb9ZXLROKJJHfkXtmiEJoiUaIUaUiZs9ugwhAVRXd3j_0JrhhV7sPxUyU7YeA6ORhUXMs0q-mJSNd9-0U5cF0CpppxOfP2ji3cvUztZmmajT45OIabaMTarb13jCa3bqOO_d2h7DMSzTuePprtxd8X0YtE-awa0CTYZldSJfillwJbzyT7UkL2CdQ5eAW"
          />
          <motion.img
            whileHover={{ scale: 1.1, rotate: 2 }}
            alt="Movie Project Thumbnail 2"
            className="rounded shadow-lg mt-8 cursor-pointer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk_vMKWyjwSm07xpkGvXdg_L4o2y9d-yjNT33f8V0cYYcWOlB9B5su5EPGy80V9VkuQ5n597992yXubTSKSmibRDrcH6Ri_9YQRjVwyW7efxHZih_jgWvYTiWW2fnJYioDsLmBpWbY7nE3KZYCciaiAvh91mGhLetA0VmD4O0gNAWEr-rYVuINxxcDAJk6nbp4AcopG1kiRiaJ4mjrYM3yrLw3pVMlSQmg8_WivVxI807lkohqhNTHYbEaBlRmQf6Y7cOGesWOEair"
          />
        </div>
      ),
    },
    {
      title: "Javascript Calculator",
      tags: ["HTML", "CSS", "Javascript", "Node.js"],
      description: "Uses simple algorithm concepts in Javascript to produce an arithmetic result in a terminal.",
      github: "#",
      link: "#",
      visual: (
        <div className="bg-dark-card p-4 rounded-lg border border-white/5 shadow-2xl overflow-hidden group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="bg-black/60 font-mono text-[10px] p-6 text-blue-300 leading-relaxed"
          >
            <div className="text-yellow-400">console</div>.log(<span className="text-coral-accent">'The result is '</span> + (a * b));<br />
            {"}"} <span className="text-pink-400">else if</span> (prompt === <span className="text-coral-accent">'/'</span>) {"{"}<br />
            &nbsp;&nbsp;<div className="text-yellow-400">console</div>.log(<span className="text-coral-accent">'The result is '</span> + (a / b));<br />
            {"}"}<br /><br />
            <span className="text-gray-500">// trying to get the operation from user</span><br />
            <span className="text-pink-400">if</span> (prompt === <span className="text-coral-accent">'+'</span> || prompt === <span className="text-coral-accent">'-'</span> || prompt === <span className="text-coral-accent">'*'</span> || prompt === <span className="text-coral-accent">'/'</span>) {"{"}<br />
            &nbsp;&nbsp;twoInput();<br />
            &nbsp;&nbsp;calculateNum(num1, num2);<br />
            {"}"}
          </motion.div>
        </div>
      ),
    },
    {
      title: "SaaS Landing Page",
      tags: ["HTML", "CSS"],
      description: "Used HTML concepts such as creating a form and a basic skeleton. It also used components of both the grid and flexbox elements to produce a landing page.",
      github: "#",
      link: "#",
      visual: (
        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-white rounded-md overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="bg-gray-100 flex items-center px-4 py-2 border-b">
            <div className="flex space-x-1 mr-4">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-[8px] bg-white text-gray-400 px-4 py-0.5 rounded-full w-48">https://saas-demo.jensen.io</div>
          </div>
          <div className="p-8 text-black">
            <div className="flex justify-between items-center mb-10">
              <div className="font-bold text-blue-600 text-xs">Front</div>
              <div className="flex space-x-4 text-[8px] font-semibold">
                <span>HOME</span><span>FEATURES</span><span>LEARN</span><span>PRICING</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded-sm">Buy Now</span>
              </div>
            </div>
            <div className="max-w-[150px]">
              <h4 className="text-xl font-extrabold leading-tight mb-2">Empowering teams with the freedom</h4>
              <p className="text-[8px] text-gray-500">Own the unlimited power of the web development.</p>
            </div>
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <section ref={containerRef} className="py-24 px-6 bg-dark-card/10" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-extrabold mb-4">Projects</h2>
          <div className="section-line mx-auto"></div>
        </div>

        {/* Project Grid */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10 text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-text-muted mb-8 max-w-md leading-relaxed">{project.description}</p>
                <div className="flex gap-6 items-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-coral-accent text-white px-6 py-2 rounded-sm text-sm font-bold shadow-lg"
                  >
                    View Github
                  </motion.button>
                  <motion.a 
                    whileHover={{ x: 5 }}
                    className="text-sm font-bold flex items-center group" 
                    href={project.link}
                  >
                    View project
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </motion.a>
                </div>
              </div>
              <div className="w-full md:w-1/2 project-visual">
                {project.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
