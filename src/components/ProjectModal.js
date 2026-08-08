"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 glass-strong"
        >
          <div className="relative">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={630}
                className="w-full h-56 sm:h-64 object-cover object-top"
              />
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-black/30 backdrop-blur"
            >
              <span className="text-[0.6rem] uppercase tracking-wider text-muted">
                {project.category}
              </span>
            </motion.div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
              {project.title}
            </h2>

            <p className="text-muted-light leading-relaxed mb-6">
              {project.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h4 className="text-xs uppercase tracking-wider text-[#FFD700] font-semibold mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.03 }}
                    className="text-[0.7rem] uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 text-[#FFD700]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[#FFD700] to-[#FFD700] text-ink-900 shadow-[0_8px_30px_-8px_rgba(255,215,0,0.5)]"
              >
                Live Demo
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7v10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </motion.a>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-[#FFD700]/30 text-white hover:bg-[#FFD700]/5 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </motion.a>
            </motion.div>
          </div>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 bg-white/5 text-muted hover:text-white hover:border-white/30 transition-all flex items-center justify-center"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
