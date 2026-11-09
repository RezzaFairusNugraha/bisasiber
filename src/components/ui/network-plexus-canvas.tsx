"use client";

import { useEffect, useRef } from "react";

type TeamRole = "purple" | "red" | "blue";

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  role: TeamRole;
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
        36,
        Math.max(20, Math.floor((width * height) / 28000))
      );

      nodes.length = 0;
      for (let i = 0; i < targetCount; i++) {
        // The Purple Synthesis: Red Team + Blue Team uniting into Electric Cyber Violet
        const role: TeamRole =
          i % 4 === 0 ? "red" : i % 4 === 1 ? "blue" : "purple";

        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: 2.2 + Math.random() * 1.5,
          role,
          hasRing: i % 5 === 0,
        });
      }
    }

    initNodes();

    function handleResize() {
      initNodes();
    }

    window.addEventListener("resize", handleResize);

    const maxDist = 160;

    function render() {
      if (!ctx) return;

      const isDark =
        document.documentElement.getAttribute("data-theme") !== "light";

      // DESIGN.md Section 1 & 3.1: Red Team + Blue Team -> Electric Cyber Violet
      const purpleRgb = isDark ? "139, 92, 246" : "124, 58, 237";
      const redTeamRgb = isDark ? "244, 63, 94" : "225, 29, 72";
      const blueTeamRgb = isDark ? "56, 189, 248" : "2, 132, 199";

      const getNodeRgb = (role: TeamRole) => {
        if (role === "red") return redTeamRgb;
        if (role === "blue") return blueTeamRgb;
        return purpleRgb;
      };

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
            // When Red Team and Blue Team connect, they synthesize into Electric Cyber Violet!
            const isFusionEdge =
              (a.role === "red" && b.role === "blue") ||
              (a.role === "blue" && b.role === "red") ||
              a.role === "purple" ||
              b.role === "purple";

            const edgeRgb = isFusionEdge
              ? purpleRgb
              : a.role === "red"
              ? redTeamRgb
              : blueTeamRgb;

            const alpha = isFusionEdge ? proximity * 0.28 : proximity * 0.18;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${edgeRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = isFusionEdge ? 1.2 : 0.9;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const rgb = getNodeRgb(n.role);

        if (n.hasRing) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.25, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb}, ${n.role === "purple" ? 0.38 : 0.28})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${n.role === "purple" ? 0.8 : 0.65})`;
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
