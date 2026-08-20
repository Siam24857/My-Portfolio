"use client";
import { useEffect, useRef } from "react";

export default function SolarSystemBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];
    let lastTime = Date.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      stars = [];
      const count = Math.floor((width * height) / 2500);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.3,
          baseOpacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.003 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const planets = [
      { name: "Mercury", color: "#b5b5b5", baseSize: 4, baseDistance: 80, speed: 0.04, angle: Math.random() * Math.PI * 2 },
      { name: "Venus", color: "#e8cda0", baseSize: 6, baseDistance: 110, speed: 0.03, angle: Math.random() * Math.PI * 2 },
      { name: "Earth", color: "#6b93d6", baseSize: 7, baseDistance: 150, speed: 0.02, angle: Math.random() * Math.PI * 2 },
      { name: "Mars", color: "#c1440e", baseSize: 5, baseDistance: 190, speed: 0.016, angle: Math.random() * Math.PI * 2 },
      { name: "Jupiter", color: "#d8ca9d", baseSize: 14, baseDistance: 260, speed: 0.008, angle: Math.random() * Math.PI * 2 },
      { name: "Saturn", color: "#e4d5b5", baseSize: 12, baseDistance: 340, speed: 0.006, angle: Math.random() * Math.PI * 2, hasRings: true },
      { name: "Uranus", color: "#d1e7e7", baseSize: 9, baseDistance: 410, speed: 0.004, angle: Math.random() * Math.PI * 2 },
      { name: "Neptune", color: "#5b5ddf", baseSize: 8, baseDistance: 470, speed: 0.003, angle: Math.random() * Math.PI * 2 },
    ];

    const lightenColor = (hex, percent) => {
      const num = parseInt(hex.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.min(255, (num >> 16) + amt);
      const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
      const B = Math.min(255, (num & 0x0000FF) + amt);
      return `rgb(${R}, ${G}, ${B})`;
    };

    const animate = () => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) / 1000;

      ctx.clearRect(0, 0, width, height);

      // Space background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Stars
      stars.forEach((star) => {
        const twinkle = Math.sin(now * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        ctx.globalAlpha = star.baseOpacity * twinkle;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Orbit paths
      planets.forEach((planet) => {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.baseDistance * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Sun
      const sunRadius = Math.max(1, 35 * scale);
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sunRadius);
      sunGradient.addColorStop(0, "#fff7a0");
      sunGradient.addColorStop(0.3, "#ffdd44");
      sunGradient.addColorStop(0.7, "#ffaa00");
      sunGradient.addColorStop(1, "rgba(255, 170, 0, 0)");
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Planets
      planets.forEach((planet) => {
        planet.angle += planet.speed * delta * 0.001;

        const distance = planet.baseDistance * scale;
        const size = planet.baseSize * scale;
        const x = centerX + Math.cos(planet.angle) * distance;
        const y = centerY + Math.sin(planet.angle) * distance;

        const planetGradient = ctx.createRadialGradient(
          x - size / 3, y - size / 3, 0,
          x, y, size
        );
        planetGradient.addColorStop(0, lightenColor(planet.color, 40));
        planetGradient.addColorStop(1, planet.color);
        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Saturn's rings
        if (planet.hasRings) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.PI / 6);

          ctx.strokeStyle = "rgba(210, 180, 140, 0.6)";
          ctx.lineWidth = Math.max(1, 3 * scale);
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 2.2, size * 0.6, 0, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = "rgba(210, 180, 140, 0.3)";
          ctx.lineWidth = Math.max(1, 2 * scale);
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 1.7, size * 0.4, 0, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
