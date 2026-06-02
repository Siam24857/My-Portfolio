"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import porfolioimg from "../asset/Profilio.jpeg"

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const shapesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text reveal
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // Floating background shapes
      gsap.to(".float-shape", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-10, 10)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden" id="home">
      {/* Background Banner */}
      <div className="absolute top-0 left-0 w-full h-[60vh] md:h-[80vh] overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-dark-bg/60 to-dark-bg z-10"></div>
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://lh3.googleusercontent.com/aida/ADBb0ujjFnkq_C6ttfc5Wo-Gg1OitqDZA7CIMPBva3eKE3anwOIBut5R7tRfZyRq40-dFvSxt4glbxfOLiyKjQ8L6JSr9NbXulKLstRYvvuhFZGLU1XXC06emTesQBKZnLuwm7RcqEOl1QPX53DFp-DlvN_Gii8QvjYRCgmmObbvPKGINL2cxVOYFYTVmjqRdggPwmdVCH0SFTDG0munSKFhO4yUYORlphpmWL7_crebrzB2rFl8I11KXyQ1neZzlJAjmaeZmAYnC7_WOQ"
          alt="Banner Background"
          className="w-full h-full object-cover grayscale blur-sm"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Hero Content */}
        <div ref={textRef} className="relative z-20">
          <div className="reveal-text">
            <h2 className="text-3xl font-light mb-4">Hello <span className="text-coral-accent">.</span></h2>
          </div>
          <div className="reveal-text flex items-center mb-6">
            <div className="section-line mr-4"></div>
            <p className="text-2xl font-light">I'm Sheikh Siam</p>
          </div>
          <div className="reveal-text">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-10 leading-tight"> Frontend <br />Developer</h1>
          </div>
          <div className="reveal-text flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 122, 92, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="bg-coral-accent text-white px-8 py-3 rounded-sm font-semibold transition-all inline-block"
            >
              Got a project?
            </motion.a> 
            <motion.a
              whileHover={{ scale: 1.05, borderColor: "#ff7a5c" }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1tVV3xokzdeEHHCWqVw-QBk7WMNqAgrqf/view?usp=sharing"
              className="border border-white/30 px-8 py-3 rounded-sm font-semibold transition-all inline-block"
            >
              My resume
            </motion.a>
          </div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, clipPath: "circle(0% at 50% 50%)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "circle(100% at 50% 50%)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            <div className="hero-glow"></div>
            {/* Decorative border circle */}
            <motion.div
              animate={{ scale: [1.1, 1.15, 1.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-coral-accent/30 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1.25, 1.2, 1.25] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-coral-accent/20 rounded-full"
            ></motion.div>
            {/* Main User Photo */}
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-dark-card shadow-2xl">
              <img
                alt="Sheikh Siam"
                className="w-full h-full object-cover object-top"
                src="https://www.image2url.com/r2/default/images/1778264415757-4d33eeed-bf69-4b3d-b55c-a6ce978878ec.jpeg"
              />
            </div>
            {/* Geometric Shapes */}
            <div className="float-shape absolute -top-10 -left-10 opacity-40">
              <svg className="text-coral-accent fill-current" height="60" viewBox="0 0 60 60" width="60">
                <path d="M10,0 L0,10 L20,30 L0,50 L10,60 L40,30 Z" opacity="0.3"></path>
                <path d="M30,0 L20,10 L40,30 L20,50 L30,60 L60,30 Z"></path>
              </svg>
            </div>
            <div className="float-shape absolute -bottom-10 -right-10 opacity-40 rotate-180">
              <svg className="text-coral-accent fill-current" height="60" viewBox="0 0 60 60" width="60">
                <path d="M10,0 L0,10 L20,30 L0,50 L10,60 L40,30 Z" opacity="0.3"></path>
                <path d="M30,0 L20,10 L40,30 L20,50 L30,60 L60,30 Z"></path>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}