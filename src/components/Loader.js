"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onLoaded, progress = 0 }) {
  const [visible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink-900 overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#06b6d4]/15 via-[#7c3aed]/10 to-[#f43f5e]/10 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#06b6d4] to-[#7c3aed] opacity-20 blur-[40px] animate-spin-slow" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-[#06b6d4]/30"
              >
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-[#06b6d4] shadow-glow-cyan"
                />
              </motion.div>
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] opacity-20 blur-xl animate-pulse-ring" />
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] rounded-full"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted"
            >
              Initializing developer universe{" "}
              <span className="text-[#06b6d4] font-mono">
                {Math.round(progress)}%
              </span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
