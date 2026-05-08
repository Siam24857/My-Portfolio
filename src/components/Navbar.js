"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const navLinks = [
    { name: "0. ABOUT", href: "/#about" },
    { name: "1. SKILLS", href: "/#skills" },
    { name: "2. WORK", href: "/#work" },
    { name: "3. PROJECTS", href: "/#projects" },
    { name: "4. CONTACT", href: "/#contact" },
    { name: "5. RESUME", href: "/#resume" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-margin-page py-6 max-w-container-max mx-auto bg-background/80 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_0_20px_rgba(57,255,20,0.1)]"
      >
        <Link
          href="/"
          className="font-headline-md text-headline-md font-bold text-primary-fixed uppercase transition-all duration-300 ease-in-out hover:text-primary-fixed-dim hover:drop-shadow-[0_0_8px_#39FF14]"
        >
          DANIEL
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              className="font-code-sm text-code-sm tracking-widest transition-all duration-300 ease-in-out text-on-surface-variant hover:text-primary hover:drop-shadow-[0_0_8px_#39FF14]"
              href={link.href}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-6 py-2 bg-secondary-container text-on-secondary-container font-bold rounded-lg transition-all duration-300 glow-box-hover active:scale-95"
          >
            Connect
          </motion.button>
        </div>
      </motion.nav>

      {/* Right Side Navigation Dots */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center z-50 hidden lg:flex"
      >
        <div className="bg-primary-container shadow-[0_0_15px_#39FF14] scale-125 w-3 h-3 rounded-full transition-all duration-500"></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="border border-outline-variant w-2 h-2 rounded-full opacity-50 hover:scale-110 hover:opacity-100 transition-all duration-500 cursor-pointer"
          ></div>
        ))}
      </motion.aside>
    </>
  );
}
