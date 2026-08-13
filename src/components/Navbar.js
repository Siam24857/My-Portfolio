"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-void/92 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="container-page h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="text-lg font-bold tracking-tight text-text font-display">
              SS
            </span>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-9 text-sm font-semibold text-muted font-heading">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
            >
              <Link
                className="relative hover:text-coral transition-colors after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-coral after:transition-all after:duration-300 hover:after:w-full"
                href={link.href}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:block">
          <motion.a
            href="https://drive.google.com/file/d/1_jF1S2jq8ExXsPVmfr4UX_W6zDUCFnZx/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 text-sm font-bold font-display text-void px-6 py-2.5 border border-coral bg-coral hover:bg-transparent hover:text-coral transition-all duration-300"
          >
            Resume
            <svg className="w-4 h-4 text-void" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </motion.a>
        </div>

        <div className="md:hidden">
          <button
            className="p-2 text-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.path
                d="M4 6h16M4 12h16m-7 6h7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                variants={{
                  closed: { d: "M4 6h16M4 12h16m-7 6h7" },
                  open: { d: "M6 18L18 6M6 6l12 12" },
                }}
              />
            </motion.svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-void/95 backdrop-blur-xl border-b border-border-subtle overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    className="text-base font-medium text-muted hover:text-coral transition-colors block font-heading"
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
