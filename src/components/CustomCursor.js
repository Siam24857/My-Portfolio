"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");
  const ghostsRef = useRef([]);
  const rafRef = useRef(null);

  const cursorX = useSpring(mousePos.x - 3, { damping: 0, stiffness: 999 });
  const cursorY = useSpring(mousePos.y - 3, { damping: 0, stiffness: 999 });
  const ringX = useSpring(mousePos.x - 18, { damping: 24, stiffness: 140 });
  const ringY = useSpring(mousePos.y - 18, { damping: 24, stiffness: 140 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      if (ghostsRef.current.length > 0) {
        ghostsRef.current.forEach((ghost) => {
          ghost.targetX = e.clientX;
          ghost.targetY = e.clientY;
        });
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const handleHover = (e) => {
      const target = e.target;
      const interactive = target.closest('a, button, [role="button"], input, textarea, .cursor-pointer, [data-cursor="view"]');
      setIsHovering(!!interactive);
      if (interactive) {
        const label = interactive.getAttribute("data-cursor-label") || (interactive.tagName === "A" ? "VIEW" : "CLICK");
        setHoverLabel(label);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", handleHover);

    const ghosts = Array.from({ length: 8 }, (_, i) => ({
      x: -100,
      y: -100,
      targetX: -100,
      targetY: -100,
      delay: (i + 1) * 16,
      size: 4,
      opacity: 0.4 - i * 0.05,
    }));
    ghostsRef.current = ghosts;

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const animate = () => {
      ghostsRef.current.forEach((ghost) => {
        ghost.x += (ghost.targetX - ghost.x) * 0.3;
        ghost.y += (ghost.targetY - ghost.y) * 0.3;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Ghost trail */}
      {isVisible && ghostsRef.current.map((ghost, i) => (
        <motion.div
          key={`ghost-${i}`}
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
          style={{
            width: ghost.size,
            height: ghost.size,
            x: ghost.x - ghost.size / 2,
            y: ghost.y - ghost.size / 2,
            opacity: ghost.opacity,
            backgroundColor: "#ff6b6b",
          }}
        />
      ))}

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 6,
          height: 6,
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
          backgroundColor: "#ff6b6b",
          transition: "scale 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center"
        style={{
          width: isHovering ? 80 : 36,
          height: isHovering ? 80 : 36,
          x: ringX,
          y: ringY,
          border: `1.5px solid ${isHovering ? "rgba(255,107,107,0.3)" : "rgba(255,107,107,0.6)"}`,
          backgroundColor: isHovering ? "rgba(255,107,107,0.06)" : "transparent",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {isHovering && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] font-bold tracking-widest text-coral uppercase"
          >
            {hoverLabel}
          </motion.span>
        )}
      </motion.div>

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
          style={{
            width: 60,
            height: 60,
            x: cursorX,
            y: cursorY,
            backgroundColor: "rgba(255,107,107,0.15)",
            scale: 2,
            opacity: 0,
          }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </>
  );
}
