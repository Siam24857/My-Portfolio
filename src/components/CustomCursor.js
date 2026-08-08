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
    const onMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const handleHover = (e) => {
      const target = e.target;
      const interactive = target.closest('a, button, [role="button"], input, textarea, .cursor-pointer');
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", handleHover);

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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    particlesRef.current = particles;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.fill();
      });

      if (isVisible && mousePos.x > 0 && mousePos.y > 0) {
        particles.forEach((p) => {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.vx -= (dx / dist) * force * 0.02;
            p.vy -= (dy / dist) * force * 0.02;
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, mousePos.x, mousePos.y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {isVisible && (
        <>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
            style={{
              width: 8,
              height: 8,
              x: cursorX,
              y: cursorY,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
          </motion.div>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#FFD700]/40"
            style={{
              width: 44,
              height: 44,
              x: ringX,
              y: ringY,
              scale: isHovering ? 1.5 : 1,
              opacity: isHovering ? 0.6 : 0.3,
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          {isClicking && (
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full bg-[#FFD700]/20"
              style={{
                width: 60,
                height: 60,
                x: cursorX,
                y: cursorY,
                scale: 1.8,
                opacity: 0,
                transition: "all 0.5s ease-out",
              }}
              animate={{ scale: 2.5, opacity: 0 }}
            />
          )}
        </>
      )}
    </>
  );
}
