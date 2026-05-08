"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Skills() {
  const tickerRef = useRef(null);
  const skills = ["HTML5", "CSS", "JAVASCRIPT", "NODE.JS", "REACT", "GIT", "GITHUB"];
  // Duplicate for seamless loop
  const displaySkills = [...skills, ...skills, ...skills];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ticker = tickerRef.current;
      const scrollWidth = ticker.scrollWidth / 3;

      gsap.to(ticker, {
        x: -scrollWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }, tickerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-dark-card/30 py-10 border-y border-white/5 overflow-hidden" id="skills">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <div ref={tickerRef} className="flex whitespace-nowrap gap-12 md:gap-24">
          {displaySkills.map((skill, index) => (
            <span
              key={index}
              className="text-text-muted font-medium tracking-widest text-sm md:text-base hover:text-white transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
