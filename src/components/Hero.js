"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP reveal for subtitle
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
    );

    // Subtle background drift
    gsap.to(".bg-orb", {
      x: "random(-50, 50)",
      y: "random(-50, 50)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const name = "Daniel";
  const nameChars = name.split("");

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-margin-page pt-32 pb-section-gap max-w-container-max mx-auto relative overflow-hidden"
    >
      {/* Background Glow Orbs */}
      <div className="bg-orb absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary-container/20 blur-[150px] rounded-full -z-10"></div>
      <div className="bg-orb absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/10 blur-[120px] rounded-full -z-10"></div>

      <div className="flex flex-col gap-6 max-w-2xl relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-code-sm text-primary tracking-[0.3em] uppercase"
        >
          Software Engineer
        </motion.span>

        <h1 className="font-display-xl text-display-xl text-secondary-container drop-shadow-[0_0_15px_rgba(210,240,0,0.4)] flex overflow-hidden">
          {nameChars.map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-body-lg text-body-lg text-on-surface-variant"
        >
          Self-taught programmer motivated by passion and personal projects.
          Expert of searching bugs on Google and quickly scanning the best
          StackOverflow answers.
        </p>

        <div className="flex gap-gutter mt-8">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(57, 255, 20, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-container text-on-primary font-bold px-10 py-4 rounded-lg glow-box transition-all"
          >
            Contact Me
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(57, 255, 20, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="border border-primary-container text-primary-container font-bold px-10 py-4 rounded-lg flex items-center gap-2 transition-all"
          >
            Learn More{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
