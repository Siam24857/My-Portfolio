"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 300;
const FRAME_PATH = (i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

let preloadPromise = null;
let sharedImages = null;

export function preloadFrames() {
  if (preloadPromise) return preloadPromise;
  preloadPromise = (async () => {
    if (sharedImages) return sharedImages;
    sharedImages = new Array(TOTAL_FRAMES);

    // Initial urgent chunk for instant playability
    const urgentChunkSize = 25;
    const initialChunk = await Promise.all(
      Array.from({ length: urgentChunkSize }, (_, j) => loadImage(j))
    );
    for (let k = 0; k < initialChunk.length; k++) sharedImages[k] = initialChunk[k];

    // Background load the rest in non-blocking batches
    const batchSize = 25;
    for (let i = urgentChunkSize; i < TOTAL_FRAMES; i += batchSize) {
      const end = Math.min(i + batchSize, TOTAL_FRAMES);
      const chunk = await Promise.all(
        Array.from({ length: end - i }, (_, j) => loadImage(i + j))
      );
      for (let k = 0; k < chunk.length; k++) sharedImages[i + k] = chunk[k];
    }
    return sharedImages;
  })();
  return preloadPromise;
}

function loadImage(index) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = FRAME_PATH(index);
  });
}

const EASE = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function useGlobalBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);
  const imagesRef = useRef(null);
  const ctxRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    }
    sizeRef.current = { w, h, dpr };
    ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current.imageSmoothingEnabled = true;
    ctxRef.current.imageSmoothingQuality = "high";
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images || images.length === 0) return;
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    if (w === 0 || h === 0) {
      resizeCanvas();
      if (sizeRef.current.w === 0) return;
    }

    const eased = Math.min(1, Math.max(0, progressRef.current));
    const frameIndex = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(eased * (images.length - 1)))
    );
    const nextFrameIndex = Math.min(images.length - 1, frameIndex + 1);
    const ratio = eased * (images.length - 1) - frameIndex;

    const img = images[frameIndex] || images[0];
    const nextImg = images[nextFrameIndex] || img;

    ctx.clearRect(0, 0, w, h);

    if (img && img.width > 0 && img.height > 0) {
      // Calculate object-fit cover dimensions
      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawW = w;
        drawH = w / imgAspect;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawW = h * imgAspect;
        drawH = h;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      ctx.save();
      if (ratio > 0 && nextImg && img !== nextImg) {
        ctx.globalAlpha = 1;
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.globalAlpha = ratio;
        ctx.drawImage(nextImg, drawX, drawY, drawW, drawH);
        ctx.globalAlpha = 1;
      } else {
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
      ctx.restore();
    }
  }, [resizeCanvas]);

  useEffect(() => {
    preloadFrames().then((imgs) => {
      imagesRef.current = imgs;
      const validFrames = imgs.filter((img) => img !== null).length;
      setLoadedCount(validFrames);
      readyRef.current = true;
      setReady(true);
    });

    const canvas = canvasRef.current;
    if (canvas) {
      ctxRef.current = canvas.getContext("2d", { alpha: true });
      resizeCanvas();
    }

    const lerp = (a, b, t) => a + (b - a) * t;

    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY || window.pageYOffset || 0;
      targetProgressRef.current = scrollHeight > 0 ? scrolled / scrollHeight : 0;
    };

    const onRaf = () => {
      progressRef.current = lerp(
        progressRef.current,
        targetProgressRef.current,
        0.14
      );

      if (readyRef.current) renderCanvas();
      rafRef.current = requestAnimationFrame(onRaf);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();

    rafRef.current = requestAnimationFrame(onRaf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [renderCanvas, resizeCanvas]);

  return { canvasRef, loadedCount, ready };
}

export function GlobalBackgroundVideo() {
  const { canvasRef, ready } = useGlobalBackground();

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-screen w-full -z-50 pointer-events-none transition-opacity duration-700"
      style={{
        opacity: ready ? 1 : 0.4,
        filter: "brightness(1.15) contrast(1.05)",
      }}
      aria-hidden="true"
    />
  );
}

export default function FramePlayer({ children }) {
  return <div className="relative w-full">{children}</div>;
}
