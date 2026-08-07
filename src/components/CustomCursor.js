"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);

  const springConfig = { damping: 24, stiffness: 260 };
  const cursorX = useSpring(mousePos.x - 8, springConfig);
  const cursorY = useSpring(mousePos.y - 8, springConfig);
  const ringX = useSpring(mousePos.x - 22, { damping: 20, stiffness: 140 });
  const ringY = useSpring(mousePos.y - 22, { damping: 20, stiffness: 140 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Emit energy particles behind cursor on movement
      if (Math.random() > 0.45) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          size: Math.random() * 3 + 1.5,
          alpha: 0.8,
          color: Math.random() > 0.5 ? "#06b6d4" : "#a78bfa",
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("interactive");

      setIsHovering(Boolean(isInteractive));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Particle Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          particlesRef.current.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Particle Canvas Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997] hidden md:block"
      />

      {/* Core Glowing Dot */}
      <motion.div
        style={{ translateX: cursorX, translateY: cursorY }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block transition-all duration-150 ${
          isClicking ? "scale-75 bg-[#f43f5e]" : "bg-[#06b6d4]"
        } ${isHovering ? "w-5 h-5 bg-[#a78bfa] shadow-[0_0_20px_#a78bfa]" : "w-4 h-4 shadow-[0_0_12px_#06b6d4]"}`}
      />

      {/* Magnetic Outer Ring */}
      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.6 : 1,
          borderColor: isHovering ? "rgba(167, 139, 250, 0.8)" : "rgba(6, 182, 212, 0.4)",
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-11 h-11 rounded-full border border-[#06b6d4]/40 pointer-events-none z-[9998] hidden md:block backdrop-blur-[1px]"
      >
        <div className="absolute inset-0 rounded-full bg-[#06b6d4]/10 blur-sm" />
      </motion.div>
    </>
  );
}

