"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { NetworkPlexusCanvas } from "@/components/ui/network-plexus-canvas";
import { PLATFORM_STATS } from "@/lib/mock-data";

const HERO_TYPED_COMMAND = "nmap -sV --script=vuln target.bisasiber.id";
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroBanner() {
  const prefersReducedMotion = useReducedMotion();
  const [typedCmd, setTypedCmd] = useState("");
  const [flagRevealed, setFlagRevealed] = useState(false);
  const [ipCopied, setIpCopied] = useState(false);

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
    }, 34);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  function handleInstantReveal() {
    setTypedCmd(HERO_TYPED_COMMAND);
    setFlagRevealed(true);
  }

  function handleCopyHeroIp() {
    navigator.clipboard?.writeText("10.10.24.88");
    setIpCopied(true);
    setTimeout(() => setIpCopied(false), 1200);
  }

  return (
    <section className="relative overflow-hidden border-b border-line bg-bg">
      <NetworkPlexusCanvas />

      {/* Subtle 45-degree circuit traces uniting Red Team + Blue Team -> Purple Synthesis */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 96"
        fill="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 w-full opacity-85"
        preserveAspectRatio="none"
      >
        <path
          d="M0 72 H240 L276 36 H540 L576 72 H920 L956 36 H1200"
          stroke="var(--border-subtle)"
          strokeWidth="1.5"
        />
        <path
          d="M140 96 L172 64 H410 L434 40 H760"
          stroke="var(--border-subtle)"
          strokeWidth="1.25"
        />
        <path
          d="M0 72 H240 L276 36 H540 L576 72 H920 L956 36 H1200"
          stroke="var(--accent-primary)"
          strokeWidth="1.75"
          className="circuit-current"
        />
        <circle
          cx="276"
          cy="36"
          r="3.5"
          fill="var(--bg)"
          stroke="var(--accent-danger)"
          strokeWidth="1.75"
        />
        <circle
          cx="576"
          cy="72"
          r="3.5"
          fill="var(--bg)"
          stroke="var(--accent-primary)"
          strokeWidth="1.75"
        />
        <circle
          cx="760"
          cy="40"
          r="3.5"
          fill="var(--bg)"
          stroke="var(--accent-info)"
          strokeWidth="1.75"
        />
        <circle
          cx="956"
          cy="36"
          r="3.5"
          fill="var(--bg)"
          stroke="var(--accent-mint)"
          strokeWidth="1.75"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex min-w-0 flex-col lg:col-span-7"
        >
          {/* The Purple Synthesis Identity Badge (Red Team + Blue Team) */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs font-semibold"
              style={{
                borderColor: "rgba(244, 63, 94, 0.35)",
                backgroundColor: "rgba(244, 63, 94, 0.1)",
                color: "var(--accent-danger)",
              }}
            >
              ● Red Team
            </span>
            <span className="font-mono text-xs text-mute">+</span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs font-semibold"
              style={{
                borderColor: "rgba(56, 189, 248, 0.35)",
                backgroundColor: "rgba(56, 189, 248, 0.1)",
                color: "var(--accent-info)",
              }}
            >
              ● Blue Team
            </span>
            <span className="font-mono text-xs text-mute">=</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-redsoft px-3.5 py-1 font-heading text-xs font-bold text-btn">
              ⚡ Purple Synthesis
            </span>
          </div>

          <h1 className="font-heading text-4xl font-bold leading-[1.12] text-ink sm:text-5xl lg:text-[48px] lg:leading-[56px]">
            Kuasai Serangan &amp; Pertahanan Siber dalam Satu Ruang Praktik
          </h1>

          <p className="mt-5 max-w-[62ch] text-base leading-[1.62] text-mute sm:text-lg">
            Padukan ketajaman ofensif <strong className="font-semibold text-ink">Red Team</strong> dan ketangguhan analisis <strong className="font-semibold text-ink">Blue Team SOC</strong> langsung dari peramban. Pindai layanan target, analisis insiden, dan raih Flag tanpa instalasi rumit.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button variant="primary" size="lg" href="/daftar">
              Mulai Jelajahi Minatmu — Gratis
            </Button>
            <Button variant="outline" size="lg" href="/lab">
              Coba Lab Pertama (Tanpa Install)
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="min-w-0 lg:col-span-5"
        >
          <div className="violet-rim overflow-hidden rounded-2xl border border-line bg-term p-5 font-mono text-[13px] leading-[20px] text-termfg shadow-2xl">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 text-[11px] text-termfg/70">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--accent-danger)" }}
                />
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--accent-warning)" }}
                />
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--accent-mint)" }}
                />
                <span className="ml-1 truncate font-medium text-termfg/90">
                  bisa@purple-lab: ~
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {!flagRevealed && (
                  <button
                    type="button"
                    onClick={handleInstantReveal}
                    className="cursor-pointer rounded px-1.5 py-0.5 text-[10px] text-termfg/75 underline decoration-white/30 hover:text-termfg"
                  >
                    Tampilkan hasil
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCopyHeroIp}
                  title="Salin alamat IP target"
                  className="tabular-nums inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium hover:border-white/30"
                  style={{ color: "var(--accent-mint)" }}
                >
                  {ipCopied ? (
                    <>
                      <IconCheck size={12} stroke={2.2} />
                      <span>Tersalin ke clipboard!</span>
                    </>
                  ) : (
                    <>
                      <span>● 10.10.24.88</span>
                      <IconCopy size={11} stroke={1.8} />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div
                className="break-all font-semibold"
                style={{ color: "var(--accent-primary)" }}
              >
                $ {typedCmd}
                <span aria-hidden="true" className="terminal-caret ml-1" />
              </div>

              <div
                className={`space-y-1.5 transition-opacity duration-200 ${
                  flagRevealed ? "opacity-100" : "opacity-45"
                }`}
              >
                <p className="text-termfg/65">
                  PORT     STATE SERVICE VERSION
                </p>
                <p className="text-termfg/85">
                  22/tcp   open  ssh     OpenSSH 9.6p1 Ubuntu
                </p>
                <p className="text-termfg/85">
                  8080/tcp open  http    BisaSiber Purple Gateway
                </p>
                <p
                  className="pt-2 font-semibold"
                  style={{ color: "var(--accent-mint)" }}
                >
                  {flagRevealed
                    ? "✓ Flag ditemukan: BISA{pUrpL3_sYnth3s1s_2026} (+50 XP)"
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

    const duration = 750;
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
      <div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-8 lg:grid-cols-4">
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
                className={`tabular-nums font-heading text-2xl font-bold tracking-tight sm:text-3xl ${
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
