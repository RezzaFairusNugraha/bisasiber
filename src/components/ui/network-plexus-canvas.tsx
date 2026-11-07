"use client";

import { useEffect, useRef } from "react";

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isRed: boolean;
  hasHalo: boolean;
}

export function NetworkPlexusCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let animationFrameId = 0;

    const nodes: ParticleNode[] = [];

    function initNodes() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 560;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.min(
        48,
        Math.max(24, Math.floor((width * height) / 22000))
      );

      nodes.length = 0;
      for (let i = 0; i < targetCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: 2.6 + Math.random() * 2.2,
          isRed: i % 3 === 0,
          hasHalo: i % 5 === 0,
        });
      }
    }

    initNodes();

    function handleResize() {
      initNodes();
    }

    window.addEventListener("resize", handleResize);

    const maxDist = 165;

    function render() {
      if (!ctx) return;

      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

      const redRgb = isDark ? "255, 58, 62" : "229, 53, 53";
      const blueRgb = isDark ? "78, 138, 255" : "59, 118, 246";

      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            const useRed =
              a.isRed && b.isRed
                ? true
                : a.isRed || b.isRed
                ? (i + j) % 2 === 0
                : false;
            const rgb = useRed ? redRgb : blueRgb;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb}, ${(proximity * 0.28).toFixed(3)})`;
            ctx.lineWidth = proximity > 0.7 ? 1.4 : 0.9;
            ctx.stroke();

            if (dist < 85 && (i + j) % 9 === 0) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${rgb}, ${(proximity * 0.11).toFixed(3)})`;
              ctx.lineWidth = 5;
              ctx.lineCap = "round";
              ctx.stroke();
            }
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const rgb = n.isRed ? redRgb : blueRgb;

        if (n.hasHalo) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, 0.16)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, 0.78)`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
