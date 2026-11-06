"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import { Button, GoogleAuthButton } from "@/components/ui/button";
import {
  HERO_BG_IMG,
  HERO_ILLUSTRATION_IMG,
  PLATFORM_STATS,
} from "@/lib/mock-data";

const CIRCUIT_PATHS = [
  {
    d: "M 48 92 L 210 92 L 252 50 L 520 50",
    ring: { cx: 40, cy: 92 },
    speedClass: "circuit-glow-fast",
  },
  {
    d: "M 120 128 L 360 128 L 402 86 L 780 86 L 822 44 L 1120 44",
    ring: { cx: 112, cy: 128 },
    speedClass: "circuit-glow-slow",
  },
  {
    d: "M 640 134 L 910 134 L 952 92 L 1265 92",
    ring: { cx: 1273, cy: 92 },
    speedClass: "circuit-glow-fast",
  },
] as const;

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Radial glow of var(--redsoft) fading to transparent (Step 2) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-280px] h-[480px] rounded-[100px] opacity-90 blur-[100px]"
        style={{
          background:
            "radial-gradient(198% 52% at 50% 50%, var(--redsoft) 0%, transparent 70%)",
        }}
      />

      <Image
        src={HERO_BG_IMG}
        alt=""
        fill
        priority
        aria-hidden="true"
        className="pointer-events-none object-cover opacity-15"
      />

      {/* Soft red scan line drifting down over the hero background grid (Step 4.7) */}
      <div
        aria-hidden="true"
        className="hero-scanline pointer-events-none absolute inset-x-0 top-0 h-[140px]"
      />

      {/* Decorative circuit traces at the bottom of the hero (Step 4.6) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1320 160"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[140px] w-full"
      >
        {CIRCUIT_PATHS.map((item, idx) => (
          <g key={idx}>
            <path
              d={item.d}
              stroke="var(--red)"
              strokeOpacity="0.28"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={item.d}
              pathLength={1000}
              stroke="var(--red)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={item.speedClass}
            />
            <circle
              cx={item.ring.cx}
              cy={item.ring.cy}
              r="6"
              stroke="var(--red)"
              strokeWidth="2.5"
              fill="var(--bg)"
              className="circuit-ring-pulse"
            />
          </g>
        ))}
      </svg>

      <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-12 px-5 pb-20 pt-14 md:pb-36 md:pt-28 lg:flex-row lg:items-start">
        <div className="flex w-full max-w-[680px] flex-col">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-redsoft px-3.5 py-1 font-heading text-xs font-medium text-btn">
            Platform Belajar Teknologi & Keamanan Siber #1 Indonesia
          </span>
          <h1 className="font-heading text-4xl font-medium leading-[1.08] text-ink sm:text-[54px] sm:leading-[54px]">
            Siapa pun bisa belajar keamanan siber bersama{" "}
            <span className="text-btn">BisaSiber</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-mute sm:text-2xl sm:leading-[35px]">
            Pelatihan keamanan siber & teknologi interaktif melalui skenario dunia nyata langsung dari browser Anda.
          </p>
          <div className="flex flex-wrap items-center gap-4 pb-7 pt-10">
            <Button variant="primary" href="/daftar" className="h-[38px] px-5">
              Daftar GRATIS
            </Button>
            <GoogleAuthButton />
            <Button
              variant="outline"
              href="/lab"
              className="h-[38px]"
            >
              Coba Lab Sekarang
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-base text-mute">
            {[
              "Ramah untuk pemula",
              "Panduan langkah demi langkah & tantangan CTF",
              "Mesin virtual instan di browser",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <IconCheck
                  size={16}
                  stroke={3}
                  color="var(--btn)"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative shrink-0">
          <Image
            src={HERO_ILLUSTRATION_IMG}
            alt="Ilustrasi peretas etis dan laboratorium keamanan siber BisaSiber"
            width={305}
            height={340}
            priority
            className="h-auto w-[230px] sm:w-[305px]"
          />
        </div>
      </div>
    </section>
  );
}

function CountUpStatValue({
  rawValue,
  inView,
}: {
  rawValue: string;
  inView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(rawValue);

  useEffect(() => {
    const match = rawValue.match(/^([\d.]+)(.*)$/);
    if (!match || !inView || prefersReducedMotion) {
      setDisplayValue(rawValue);
      return;
    }

    const numericPart = match[1];
    const suffix = match[2] ?? "";
    const hasDotSeparator = numericPart.includes(".");
    const targetNumber = parseInt(numericPart.replace(/\./g, ""), 10);

    if (Number.isNaN(targetNumber)) {
      setDisplayValue(rawValue);
      return;
    }

    const duration = 1200;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(targetNumber * eased);
      const formatted = hasDotSeparator
        ? current.toLocaleString("id-ID")
        : String(current);
      setDisplayValue(`${formatted}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, prefersReducedMotion, rawValue]);

  return <>{displayValue}</>;
}

export function PlatformStatsGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section
      ref={sectionRef}
      aria-label="Statistik Platform BisaSiber"
      className="border-y border-line bg-redsoft px-5 py-8"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
        {PLATFORM_STATS.map((stat) => (
          <div
            key={stat.value}
            className="flex flex-col items-center gap-1 text-center text-ink"
          >
            <div className="font-heading text-2xl font-bold leading-tight tracking-tight sm:text-[32px]">
              <CountUpStatValue rawValue={stat.value} inView={inView} />
            </div>
            <div className="text-sm leading-relaxed text-mute sm:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
