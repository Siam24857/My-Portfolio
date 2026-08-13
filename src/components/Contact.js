"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { SOCIALS } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [activeAvailability, setActiveAvailability] = useState("freelance");
  const toastRef = useRef(null);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("siamtechofficial1597@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-32 px-6 bg-void" id="contact">
      <div className="container-page">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] font-display"
          >
            <span className="block text-text">LET&apos;S BUILD</span>
            <span className="block text-outline mt-2">SOMETHING GREAT</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyEmail}
            className="text-xl sm:text-2xl font-heading font-bold text-coral hover:text-amber transition-colors relative group"
          >
            siamtechofficial1597@gmail.com
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coral group-hover:w-full transition-all duration-300" />
          </motion.button>
          <p className="text-xs text-muted mt-2">Click to copy</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {["freelance", "full-time", "collaboration"].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveAvailability(status)}
              className={`px-6 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 font-heading ${
                activeAvailability === status
                  ? "border-l-2 border-coral text-coral bg-coral/5"
                  : "border border-border-subtle text-muted hover:text-coral hover:border-coral/50"
              }`}
              style={{ borderRadius: 0 }}
            >
              {status}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-8"
        >
          {SOCIALS.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -3 }}
              className="text-muted hover:text-coral transition-colors text-sm font-medium"
            >
              {social.label}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            ref={toastRef}
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 bg-surface border border-coral px-4 py-3 z-50"
            style={{ borderRadius: 0 }}
          >
            <span className="text-sm font-medium text-text">Email copied!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
