"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Journey", href: "/#journey" },
    { name: "Contact", href: "/#contacts" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-ink-900/80 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent origin-left"
        style={{ scaleX }}
      />

      <div className="container-page h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-lg bg-ink-800 border border-[#FFD700]/30 group-hover:border-[#FFD700] shadow-sm transition-all duration-300">
              <Image
                src="/favicon.ico"
                alt="Sheikh Siam Logo"
                fill
                className="object-cover p-1.5 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Sheikh<span className="text-[#FFD700]"> Siam</span>
            </span>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-9 text-sm font-semibold text-muted-light">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
            >
              <Link
                className="relative hover:text-[#FFD700] transition-colors after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#FFD700] after:transition-all after:duration-300 hover:after:w-full"
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
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-900 px-5 py-2.5 rounded-full border border-[#FFD700]/40 bg-[#FFD700] hover:bg-[#FFD700]/90 shadow-[0_8px_30px_-8px_rgba(255,215,0,0.4)] transition-all duration-300"
          >
            Resume
            <svg className="w-4 h-4 text-ink-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </motion.a>
        </div>

        <div className="md:hidden">
          <button className="p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              )}
            </svg>
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
            className="md:hidden bg-ink-900/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link className="text-base font-medium text-muted-light hover:text-[#FFD700] transition-colors block" href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
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
