"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { TIMELINE } from "@/lib/data";

export default function Experience() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-void"
      id="journey"
    >
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Journey
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-16 font-heading"
        >
          Experience <span className="text-coral">&</span> Growth
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-border-subtle transform sm:-translate-x-1/2" />

          <div className="space-y-16">
            {TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row gap-8 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:pl-12"}`}>
                  <span className="text-xs font-mono text-muted mb-2 block">
                    {item.period}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-text mb-1">
                    {item.title}
                  </h3>
                  <span className="text-sm font-heading font-medium text-coral mb-3 block">
                    {item.tag}
                  </span>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden sm:flex absolute left-1/2 top-0 -translate-x-1/2 w-3 h-3 bg-coral border-2 border-void" style={{ borderRadius: 0 }} />

                {/* Empty space for alternating layout */}
                <div className="hidden sm:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
