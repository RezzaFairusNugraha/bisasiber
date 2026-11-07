"use client";

import { useEffect, useRef } from "react";

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isRed: boolean;
  hasRing: boolean;
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
      height = rect.height || 520;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.min(
        34,
        Math.max(18, Math.floor((width * height) / 30000))
      );

      nodes.length = 0;
      for (let i = 0; i < targetCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: 2.2 + Math.random() * 1.4,
          isRed: i % 4 === 0,
          hasRing: i % 6 === 0,
        });
      }
    }

    initNodes();

    function handleResize() {
      initNodes();
    }

    window.addEventListener("resize", handleResize);

    const maxDist = 155;

    function render() {
      if (!ctx) return;

      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

      // Warm-tinted neutrals and disciplined brand red (no blue/purple)
      const redRgb = isDark ? "255, 42, 46" : "253, 0, 2";
      const warmNeutralRgb = isDark ? "176, 156, 162" : "107, 90, 96";

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
            const useRed = a.isRed && b.isRed;
            const rgb = useRed ? redRgb : warmNeutralRgb;
            const alpha = useRed ? proximity * 0.24 : proximity * 0.14;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = useRed ? 1.15 : 0.85;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const rgb = n.isRed ? redRgb : warmNeutralRgb;

        if (n.hasRing) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb}, ${n.isRed ? 0.35 : 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${n.isRed ? 0.72 : 0.42})`;
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
