"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Globe3D from "@/components/Globe3D";

const LOCATIONS = [
  { name: "Dhaka", label: "Home Base", lat: 23.7, lng: 90.4, color: "#06b6d4" },
  { name: "San Francisco", label: "Silicon Valley", lat: 37.8, lng: -122.4, color: "#a78bfa" },
  { name: "London", label: "Europe Hub", lat: 51.5, lng: -0.1, color: "#f43f5e" },
  { name: "Tokyo", label: "Asia Tech", lat: 35.7, lng: 139.8, color: "#10b981" },
  { name: "Berlin", label: "Design", lat: 52.5, lng: 13.4, color: "#f59e0b" },
  { name: "Bangalore", label: "Scale", lat: 12.9, lng: 77.6, color: "#06b6d4" },
];

export default function WorldExperience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.9, 1, 1.05]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 bg-transparent overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[480px] rounded-full bg-[#06b6d4]/6 blur-[160px]" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/6 blur-[140px]" />
      </motion.div>

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="section-label mb-6"
        >
          Global Presence
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mb-4"
        >
          Code that <span className="text-gradient-brand">reaches the world</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-light max-w-xl mb-14"
        >
          Every line I ship is built to scale across borders. My applications
          serve users on six continents, connected through a resilient web of
          data, APIs, and real-time experiences.
        </motion.p>

        <motion.div
          style={{ opacity, scale }}
          className="grid lg:grid-cols-5 gap-12 lg:gap-10 items-start"
        >
          <div className="lg:col-span-3">
            <Globe3D />
          </div>

          <div className="lg:col-span-2 space-y-5">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl font-semibold text-white"
            >
              Connected Nodes
            </motion.h3>
            {LOCATIONS.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 * i }}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#06b6d4]/30 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <motion.span
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: loc.color }}
                />
                <div>
                  <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    {loc.name}
                  </span>
                  <span className="text-[0.7rem] text-muted block">
                    {loc.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-xs text-muted opacity-60">
        <p>Rotating globe with technology orbit · Scroll to explore</p>
      </div>
    </section>
  );
}
