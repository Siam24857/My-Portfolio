"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Skills() {
  const containerRef = useRef(null);

  const skills = [
    { title: "Backend Ops", icon: "terminal", color: "primary", tags: ["NODE.JS", "PYTHON"] },
    { title: "UI/UX Design", icon: "brush", color: "secondary", tags: ["FIGMA", "TAILWIND"] },
    { title: "Data Systems", icon: "database", color: "primary", tags: ["POSTGRES", "REDIS"] },
    { title: "Cloud Infra", icon: "cloud_done", color: "secondary", tags: ["AWS", "DOCKER"] },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="skills" ref={containerRef} className="px-margin-page py-section-gap bg-surface-container-lowest/50">
      <div className="max-w-container-max mx-auto">
        <div className="font-code-sm text-primary-fixed mb-4 text-center">1. STACK_COMPONENTS</div>
        <h2 className="font-headline-lg text-headline-lg text-center mb-16">
          Technical <span className="text-primary-container">Arsenal</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                rotateX: -5,
                transition: { duration: 0.3 }
              }}
              className="skill-card glass-card p-8 rounded-xl flex flex-col items-center gap-4 transition-all glow-box-hover group cursor-default perspective-1000"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className={`w-16 h-16 rounded-full bg-${skill.color}-container/10 flex items-center justify-center group-hover:bg-${skill.color}-container/20 transition-all`}
              >
                <span className={`material-symbols-outlined text-${skill.color}-container text-4xl`}>
                  {skill.icon}
                </span>
              </motion.div>
              <span className="font-headline-md text-body-lg font-bold">{skill.title}</span>
              <div className="flex gap-2 flex-wrap justify-center">
                {skill.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-code-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
