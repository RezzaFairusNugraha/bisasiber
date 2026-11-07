"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { NetworkPlexusCanvas } from "@/components/ui/network-plexus-canvas";
import { PLATFORM_STATS } from "@/lib/mock-data";

const HERO_TYPED_COMMAND = "nmap -sV --script=vuln target.bisasiber.id";
const EASE_OUT_EXPO: [number, number, number, number] = [0.2, 0.9, 0.3, 1];

export function HeroBanner() {
  const prefersReducedMotion = useReducedMotion();
  const [typedCmd, setTypedCmd] = useState("");
  const [flagRevealed, setFlagRevealed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedCmd(HERO_TYPED_COMMAND);
      setFlagRevealed(true);
      return;
    }

    let idx = 0;
    setFlagRevealed(false);
    const timer = setInterval(() => {
      idx += 1;
      setTypedCmd(HERO_TYPED_COMMAND.slice(0, idx));
      if (idx >= HERO_TYPED_COMMAND.length) {
        clearInterval(timer);
        setFlagRevealed(true);
      }
    }, 36);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  function handleInstantReveal() {
    setTypedCmd(HERO_TYPED_COMMAND);
    setFlagRevealed(true);
  }

  return (
    <section className="relative overflow-hidden border-b border-line bg-bg">
      <NetworkPlexusCanvas />

      {/* Subtle 45-degree circuit traces with ring terminals & gentle red current */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 96"
        fill="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 w-full opacity-80"
        preserveAspectRatio="none"
      >
        <path
          d="M0 72 H240 L276 36 H540 L576 72 H920 L956 36 H1200"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
        <path
          d="M140 96 L172 64 H410 L434 40 H760"
          stroke="var(--line)"
          strokeWidth="1.25"
        />
        <path
          d="M0 72 H240 L276 36 H540 L576 72 H920 L956 36 H1200"
          stroke="var(--red)"
          strokeWidth="1.75"
          className="circuit-current"
        />
        <circle
          cx="276"
          cy="36"
          r="3.5"
          fill="var(--bg)"
          stroke="var(--red)"
          strokeWidth="1.75"
        />
        <circle
          cx="576"
          cy="72"
          r="3.5"
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth="1.75"
        />
        <circle
          cx="760"
          cy="40"
          r="3.5"
          fill="var(--bg)"
          stroke="var(--red)"
          strokeWidth="1.75"
        />
        <circle
          cx="956"
          cy="36"
          r="3.5"
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth="1.75"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          className="flex min-w-0 flex-col lg:col-span-7"
        >
          <h1 className="font-heading text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl lg:text-[3.35rem]">
            Kuasai Keamanan Siber Lewat Lab Linux Nyata
          </h1>

          <p className="mt-5 max-w-[60ch] text-base leading-[1.62] text-mute sm:text-lg">
            Jalankan AttackBox terisolasi langsung di browser. Pindai port layanan, bedah celah aplikasi web, dan tangkap Flag tanpa perlu merakit mesin virtual sendiri.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button variant="primary" size="lg" href="/daftar">
              Mulai Latihan Gratis
            </Button>
            <Button variant="outline" size="lg" href="/lab">
              Buka Lab AttackBox
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="min-w-0 lg:col-span-5"
        >
          <div className="overflow-hidden rounded-xl border border-line bg-term p-5 font-mono text-xs leading-relaxed text-termfg">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 text-[11px] text-termfg/65">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-red"
                />
                <span className="truncate">bisa@attackbox: ~</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {!flagRevealed && (
                  <button
                    type="button"
                    onClick={handleInstantReveal}
                    className="cursor-pointer rounded px-1.5 py-0.5 text-[10px] text-termfg/70 underline decoration-white/30 hover:text-termfg"
                  >
                    Tampilkan hasil
                  </button>
                )}
                <span className="tabular-nums text-ok">● 10.10.24.88</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="break-all font-semibold text-red">
                $ {typedCmd}
                <span aria-hidden="true" className="terminal-caret ml-1" />
              </div>

              <div
                className={`space-y-1.5 transition-opacity duration-200 ${
                  flagRevealed ? "opacity-100" : "opacity-45"
                }`}
              >
                <p className="text-termfg/70">
                  PORT     STATE SERVICE VERSION
                </p>
                <p className="text-termfg/80">
                  22/tcp   open  ssh     OpenSSH 9.6p1 Ubuntu
                </p>
                <p className="text-termfg/80">
                  8080/tcp open  http    BisaSiber Lab Gateway
                </p>
                <p className="pt-2 font-semibold text-ok">
                  {flagRevealed
                    ? "Flag ditemukan: BISA{s1b3r_t4angguh_2026}"
                    : "Memindai banner layanan..."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
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

    const duration = 850;
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
      aria-label="Ringkasan Platform BisaSiber"
      className="border-b border-line bg-bg2 px-5 py-10"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 lg:grid-cols-4">
        {PLATFORM_STATS.map((stat, idx) => {
          const isNumericAccent = /^\d/.test(stat.value);
          return (
            <div
              key={stat.value}
              className={`flex min-w-0 flex-col gap-1 ${
                idx > 0 ? " lg:border-l lg:border-line lg:pl-6" : ""
              }`}
            >
              <div
                className={`tabular-nums font-heading text-2xl font-extrabold tracking-tight sm:text-3xl ${
                  isNumericAccent ? "text-btn" : "text-ink"
                }`}
              >
                <CountUpStatValue rawValue={stat.value} inView={inView} />
              </div>
              <div className="text-sm leading-snug text-mute">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
