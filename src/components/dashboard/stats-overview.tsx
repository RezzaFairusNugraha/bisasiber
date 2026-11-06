"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "motion/react";
import {
  IconCheck,
  IconCpu,
  IconFlag,
  IconShieldCheck,
  IconTerminal2,
} from "@tabler/icons-react";
import { Button, GoogleAuthButton } from "@/components/ui/button";
import { NetworkPlexusCanvas } from "@/components/ui/network-plexus-canvas";
import { PLATFORM_STATS } from "@/lib/mock-data";

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

const HERO_TYPED_COMMAND = "nmap -sV --script=vuln target.bisasiber.id";

export function HeroBanner() {
  const prefersReducedMotion = useReducedMotion();
  const [typedCmd, setTypedCmd] = useState("");

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedCmd(HERO_TYPED_COMMAND);
      return;
    }

    let idx = 0;
    const timer = setInterval(() => {
      idx += 1;
      setTypedCmd(HERO_TYPED_COMMAND.slice(0, idx));
      if (idx >= HERO_TYPED_COMMAND.length) {
        clearInterval(timer);
      }
    }, 55);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden border-b border-line bg-bg">
      {/* Interactive Constellation / Plexus Network Canvas (Red & Blue Nodes & Edges) */}
      <NetworkPlexusCanvas />

      {/* Radial glow of var(--redsoft) fading to transparent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-280px] h-[480px] rounded-[100px] opacity-85 blur-[100px]"
        style={{
          background:
            "radial-gradient(198% 52% at 50% 50%, var(--redsoft) 0%, transparent 70%)",
        }}
      />

      {/* Soft red scan line drifting down over the hero background */}
      <div
        aria-hidden="true"
        className="hero-scanline pointer-events-none absolute inset-x-0 top-0 h-[140px]"
      />

      {/* Decorative circuit traces at the bottom of the hero */}
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

      <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-5 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-12">
        {/* Kolom Kiri: Headline & Pill Monospace khas screenshot */}
        <div className="flex flex-col lg:col-span-7">
          <div className="mb-5 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-bg/85 px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-mute shadow-2xs backdrop-blur-md sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-red" />
            <span>LABORATORIUM SIBER INTERAKTIF · AKSES 24/7 (WIB)</span>
          </div>

          <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-[54px] sm:leading-[58px]">
            Kuasai Keamanan Siber &amp; Pertahanan Digital Bersama{" "}
            <span className="text-btn">BisaSiber</span>
          </h1>

          <p className="mt-5 max-w-[620px] text-lg leading-relaxed text-mute sm:text-xl">
            Bukan sekadar teori. Jalankan mesin laboratorium Linux terisolasi, pindai celah keamanan nyata, dan taklukkan ratusan tantangan CTF langsung dari browser Anda.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pb-7 pt-8">
            <Button variant="primary" href="/daftar" className="h-11 px-6">
              Mulai Belajar Gratis
            </Button>
            <GoogleAuthButton />
            <Button variant="outline" href="/lab" className="h-11 px-5">
              Buka AttackBox
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-mute sm:text-base">
            {[
              "Kurikulum Bahasa Indonesia",
              "Lab Docker Instan di Browser",
              "Sertifikasi Kompetensi Industri",
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

        {/* Kolom Kanan: Kartu Simulasi AttackBox & Live Telemetry */}
        <div className="lg:col-span-5">
          <div className="card-interactive relative overflow-hidden rounded-2xl border border-line bg-card/90 p-5 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-line pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-redsoft text-btn">
                  <IconTerminal2 size={20} />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-ink">
                    BisaSiber Cloud AttackBox
                  </p>
                  <p className="font-mono text-[11px] text-mute">
                    node-jkt-01 • 10.10.24.88:2222
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-redsoft px-3 py-1 font-mono text-[11px] font-semibold text-ok">
                <span className="h-2 w-2 rounded-full bg-ok" />
                LIVE LAB
              </span>
            </div>

            {/* Layar Terminal Preview */}
            <div className="mt-4 rounded-xl border border-line bg-term p-4 font-mono text-xs leading-relaxed text-termfg">
              <div className="flex items-center justify-between border-b border-line/20 pb-2 text-[11px] text-termfg/60">
                <span>bash — bisa@attackbox:~</span>
                <span>SSH TLS 1.3</span>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="font-semibold text-red">
                  bisa@attackbox:~$ {typedCmd}
                  <span aria-hidden="true" className="terminal-caret ml-1" />
                </div>
                <p className="text-termfg/80">
                  [+] Memindai port terbuka pada target.bisasiber.id...
                </p>
                <p className="text-termfg/80">
                  [+] 22/tcp OPEN ssh (OpenSSH 9.6p1 Ubuntu)
                </p>
                <p className="text-termfg/80">
                  [+] 8080/tcp OPEN http (BisaSiber Lab Gateway)
                </p>
                <p className="pt-1 font-bold text-ok">
                  [✓] Flag ditemukan: BISA&#123;s1b3r_t4angguh_2026&#125;
                </p>
              </div>
            </div>

            {/* Baris Info Cepat & Shortcut */}
            <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-xl border border-line bg-bg2 p-2.5">
                <p className="font-heading text-sm font-bold text-ink">14 ms</p>
                <p className="text-[11px] text-mute">Latensi Server</p>
              </div>
              <div className="rounded-xl border border-line bg-bg2 p-2.5">
                <p className="font-heading text-sm font-bold text-btn">
                  Ubuntu 24.04
                </p>
                <p className="text-[11px] text-mute">Mesin Kali/Lab</p>
              </div>
              <Link
                href="/lab"
                className="cmd-chip flex flex-col items-center justify-center rounded-xl border border-line bg-redsoft p-2.5 font-heading text-xs font-bold text-btn"
              >
                <IconFlag size={16} />
                <span className="mt-0.5">Kirim Flag →</span>
              </Link>
            </div>
          </div>
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
      className="border-b border-line bg-bg2 px-5 py-8"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {PLATFORM_STATS.map((stat, idx) => {
          const Icons = [IconShieldCheck, IconCpu, IconTerminal2, IconFlag];
          const StatIcon = Icons[idx % Icons.length];
          return (
            <div
              key={stat.value}
              className="card-interactive flex items-center gap-4 rounded-2xl border border-line bg-card p-5 text-ink shadow-2xs"
            >
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-redsoft text-btn sm:flex">
                <StatIcon size={24} />
              </span>
              <div>
                <div className="font-heading text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  <CountUpStatValue rawValue={stat.value} inView={inView} />
                </div>
                <div className="mt-0.5 text-xs leading-relaxed text-mute sm:text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
