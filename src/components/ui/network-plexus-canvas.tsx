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
  pulsePhase: number;
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
    const pointer = { x: -9999, y: -9999 };

    const nodes: ParticleNode[] = [];

    function initNodes() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 620;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.min(
        72,
        Math.max(36, Math.floor((width * height) / 14500))
      );

      nodes.length = 0;
      for (let i = 0; i < targetCount; i++) {
        const isRed = i % 3 === 0;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          radius: 3.2 + Math.random() * 2.8,
          isRed,
          hasHalo: i % 4 === 0,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    initNodes();

    function handleResize() {
      initNodes();
    }

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const maxDist = 175;

    function render(time: number) {
      if (!ctx) return;

      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

      // Warna persis seperti referensi gambar plexus (Merah #E53935 & Biru #3B76F6)
      const redRgb = isDark ? "255, 58, 62" : "229, 53, 53";
      const blueRgb = isDark ? "78, 138, 255" : "59, 118, 246";

      ctx.clearRect(0, 0, width, height);

      // Update posisi node
      if (!prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Interaksi halus dengan kursor
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 1) {
            n.x -= (dx / dist) * 0.35;
            n.y -= (dy / dist) * 0.35;
          }
        }
      }

      // Gambar koneksi garis antar node (Plexus / Constellation)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            const useRed = a.isRed && b.isRed ? true : a.isRed || b.isRed ? (i + j) % 2 === 0 : false;
            const rgb = useRed ? redRgb : blueRgb;

            // Garis utama tipis
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb}, ${(proximity * 0.42).toFixed(3)})`;
            ctx.lineWidth = proximity > 0.68 ? 1.8 : 1.05;
            ctx.stroke();

            // Efek pita tebal semi-transparan untuk beberapa node yang sangat dekat (persis seperti di screenshot)
            if (dist < 92 && (i + j) % 7 === 0) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${rgb}, ${(proximity * 0.16).toFixed(3)})`;
              ctx.lineWidth = 7;
              ctx.lineCap = "round";
              ctx.stroke();
            }
          }
        }
      }

      // Gambar titik node beserta cincin halo luar
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const rgb = n.isRed ? redRgb : blueRgb;
        const pulse = prefersReducedMotion
          ? 1
          : 1 + 0.18 * Math.sin(time * 0.0025 + n.pulsePhase);

        if (n.hasHalo) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.15 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, 0.22)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, 0.92)`;
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
