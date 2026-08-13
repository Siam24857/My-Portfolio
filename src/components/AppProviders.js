"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";

export default function AppProviders({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader key="loader" progress={100} />}
      </AnimatePresence>
      <CustomCursor />
      {/* Grain texture overlay */}
      <div className="grain" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
