"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Number tweening for stats
      const stats = gsap.utils.toArray(".stat-number");
      stats.forEach((stat) => {
        const endValue = parseInt(stat.getAttribute("data-value"));
        gsap.fromTo(stat, 
          { textContent: 0 },
          {
            textContent: endValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
            },
            snap: { textContent: 1 },
          }
        );
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Website Development",
      icon: (
        <svg className="w-8 h-8 text-coral-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      title: "App Development",
      icon: (
        <svg className="w-8 h-8 text-coral-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      title: "Website Hosting",
      icon: (
        <svg className="w-8 h-8 text-coral-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
    },
  ];

  const stats = [
    { value: "120", suffix: "+", label: "Completed Projects" },
    { value: "95", suffix: "%", label: "Client satisfaction" },
    { value: "10", suffix: "+", label: "Years of experience" },
  ];

  return (
    <section className="py-24 px-6 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:items-center">
        {/* Left: Services List */}
        <div className="w-full md:w-1/2 space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 10, scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6 group cursor-default"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-dark-card border border-white/10 rounded-lg group-hover:border-coral-accent transition-colors shadow-lg">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <div className="h-1 bg-coral-accent mt-1 w-8"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: About Description */}
        <div className="w-full md:w-1/2">
          <h2 className="text-5xl font-extrabold mb-8">About me</h2>
          <p className="text-text-muted leading-relaxed mb-12 max-w-lg">
            I started my software journey from photography. Through that, I learned to love the process of creating from scratch. Since then, this has led me to software development as it fulfills my love for learning and building things.
          </p>
          <div ref={statsRef} className="flex gap-12 md:gap-20">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold flex items-center">
                  <span className="stat-number" data-value={stat.value}>0</span>
                  <span className="text-coral-accent ml-1">{stat.suffix}</span>
                </div>
                <p className="text-xs text-text-muted uppercase tracking-widest mt-2">
                  {stat.label.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
