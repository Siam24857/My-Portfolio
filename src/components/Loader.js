"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onLoaded, progress = 0 }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "-100vh" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-void overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-8"
        >
          {/* SVG Stroke Animation */}
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-white">
            <text
              x="60"
              y="75"
              textAnchor="middle"
              fontSize="48"
              fontWeight="800"
              fontFamily="Syne, sans-serif"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="200"
              strokeDashoffset="200"
              className="animate-stroke"
            >
              SS
            </text>
          </svg>

          {/* Red line sweep */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-48 h-px bg-coral origin-left"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
