"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 300;
const FRAME_PATH = (i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

let preloadPromise = null;
let sharedImages = null;

export function preloadFrames(onProgress) {
  if (preloadPromise) return preloadPromise;
  preloadPromise = (async () => {
    if (sharedImages) return sharedImages;
    sharedImages = new Array(TOTAL_FRAMES);

    const urgentChunkSize = 30;
    const initialChunk = await Promise.all(
      Array.from({ length: urgentChunkSize }, (_, j) => loadImage(j))
    );
    for (let k = 0; k < initialChunk.length; k++) sharedImages[k] = initialChunk[k];
    if (onProgress) onProgress(urgentChunkSize);

    const batchSize = 30;
    for (let i = urgentChunkSize; i < TOTAL_FRAMES; i += batchSize) {
      const end = Math.min(i + batchSize, TOTAL_FRAMES);
      const chunk = await Promise.all(
        Array.from({ length: end - i }, (_, j) => loadImage(i + j))
      );
      for (let k = 0; k < chunk.length; k++) sharedImages[i + k] = chunk[k];
      if (onProgress) onProgress(end);
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

function useGlobalBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);
  const imagesRef = useRef(null);
  const ctxRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const resizeScheduledRef = useRef(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    }
    sizeRef.current = { w, h, dpr };

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctxRef.current = ctx;
    }
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images || images.length === 0) return;
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { w, h, dpr } = sizeRef.current;
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

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    if (img && img.width > 0 && img.height > 0) {
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
      if (ratio > 0 && nextImg && img !== nextImg && nextImg.width > 0) {
        ctx.globalAlpha = 1;
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.globalAlpha = Math.min(1, ratio);
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
      readyRef.current = true;
      setReady(true);
    });

    const canvas = canvasRef.current;
    if (canvas) {
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
        0.12
      );

      if (readyRef.current) renderCanvas();
      rafRef.current = requestAnimationFrame(onRaf);
    };

    const handleScroll = () => {
      updateScrollProgress();
    };

    const handleResize = () => {
      if (!resizeScheduledRef.current) {
        resizeScheduledRef.current = true;
        requestAnimationFrame(() => {
          resizeCanvas();
          updateScrollProgress();
          resizeScheduledRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    updateScrollProgress();

    rafRef.current = requestAnimationFrame(onRaf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [renderCanvas, resizeCanvas]);

  return { canvasRef, ready };
}

export function GlobalBackgroundVideo() {
  const { canvasRef, ready } = useGlobalBackground();

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: ready ? 1 : 0,
        transition: "opacity 1.2s ease-in-out",
        objectFit: "cover",
      }}
      aria-hidden="true"
    />
  );
}

export default function FramePlayer({ children }) {
  return <div className="relative w-full">{children}</div>;
}
