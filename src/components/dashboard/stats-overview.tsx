"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { NetworkPlexusCanvas } from "@/components/ui/network-plexus-canvas";
import { PLATFORM_STATS } from "@/lib/mock-data";

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
      <NetworkPlexusCanvas />

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-7">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Belajar Keamanan Siber Melalui Praktik Langsung
          </h1>

          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-mute">
            Jalankan laboratorium Linux terisolasi, pindai celah keamanan nyata, dan selesaikan tantangan Capture The Flag langsung dari browser Anda tanpa instalasi rumit.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" href="/daftar">
              Mulai Belajar Gratis
            </Button>
            <Button variant="outline" size="lg" href="/lab">
              Buka Lab Interaktif
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl border border-line bg-term p-5 font-mono text-xs leading-relaxed text-termfg shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[11px] text-termfg/60">
              <span>bisa@attackbox: ~</span>
              <span className="tabular-nums text-ok">● 10.10.24.88</span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="font-semibold text-red">
                $ {typedCmd}
                <span aria-hidden="true" className="terminal-caret ml-1" />
              </div>
              <p className="text-termfg/75">
                PORT     STATE SERVICE VERSION
              </p>
              <p className="text-termfg/75">
                22/tcp   open  ssh     OpenSSH 9.6p1 Ubuntu
              </p>
              <p className="text-termfg/75">
                8080/tcp open  http    BisaSiber Lab Gateway
              </p>
              <p className="pt-2 font-semibold text-ok">
                Flag ditemukan: BISA&#123;s1b3r_t4angguh_2026&#125;
              </p>
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

    const duration = 1000;
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
        {PLATFORM_STATS.map((stat) => (
          <div key={stat.value} className="flex flex-col gap-1">
            <div className="tabular-nums font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              <CountUpStatValue rawValue={stat.value} inView={inView} />
            </div>
            <div className="text-sm text-mute">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
