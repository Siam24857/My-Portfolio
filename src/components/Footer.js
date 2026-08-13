"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-14 px-6 border-t border-border-subtle bg-void">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="text-lg font-bold tracking-tight text-text font-display">
              SS
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-text">Sheikh Siam</h3>
              <p className="text-xs text-muted">Full-Stack Developer</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center sm:text-right"
          >
            <p className="text-xs text-muted">
              &copy; {year} Sheikh Siam. All rights reserved.
            </p>
            <p className="text-xs text-muted mt-1">
              Crafted with Next.js, Tailwind CSS & Framer Motion.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
