"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import profileimg from "../asset/Profilio.jpeg";

export default function About() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section reveal
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Parallax shift for portrait
    gsap.to(portraitRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const terminalLines = [
    { text: 'class Daniel {', delay: 0 },
    { text: '  constructor() {', delay: 0.2 },
    { text: '    this.focus = ["Efficiency", "Scalability"];', delay: 0.4 },
    { text: '    this.fuel = "Coffee & Documentation";', delay: 0.6 },
    { text: '    this.philosophy = "Code is poetry for machines.";', delay: 0.8 },
    { text: '  }', delay: 1.0 },
    { text: '  getMission() {', delay: 1.2 },
    { text: '    // Translating complex business logic into seamless UI experiences.', delay: 1.4 },
    { text: '  }', delay: 1.6 },
    { text: '}', delay: 1.8 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-margin-page py-section-gap max-w-container-max mx-auto overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-gutter">
        <div className="w-full md:w-1/2 flex flex-col gap-base">
          <div className="font-code-sm text-primary-fixed mb-4">0. ABOUT_ME</div>
          <h2 className="font-headline-lg text-headline-lg mb-8">
            Architecting Digital <span className="text-primary-container">Ecosystems</span>
          </h2>
          <div className="glass-card p-gutter rounded-xl font-code-sm text-on-surface-variant leading-relaxed glow-box relative">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>

            <div className="space-y-1">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: line.delay }}
                  className="whitespace-pre"
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative min-h-[400px] flex items-center justify-center">
          <motion.div
            ref={portraitRef}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-[400px]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[0.5px] border-primary-container/30 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-[0.5px] border-secondary-container/20 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-10 overflow-hidden rounded-full"
            >
              <Image
                alt="Daniel's Portrait"
                className="object-cover w-full h-full hover:grayscale-0 transition-all duration-700 object-center"
                src={profileimg}
                placeholder="blur"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
