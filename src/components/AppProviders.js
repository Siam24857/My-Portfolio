"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { preloadFrames, GlobalBackgroundVideo } from "@/components/FramePlayer";

export default function AppProviders({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    preloadFrames().then((imgs) => {
      const valid = imgs.filter((img) => img !== null).length;
      setProgress(100);
      setLoaded(true);
    });

    const simulate = () => {
      setProgress((p) => Math.min(p + Math.random() * 8 + 3, 99));
    };
    const t = setInterval(simulate, 100);
    simulate();
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader key="loader" progress={progress} />}
      </AnimatePresence>
      <CustomCursor />
      <GlobalBackgroundVideo />
      <SmoothScroll>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative z-[1]"
        >
          {children}
        </motion.div>
      </SmoothScroll>
    </>
  );
}
