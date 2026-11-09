"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconFlame, IconMenu2, IconShieldBolt, IconX } from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Modul Belajar", href: "/#jalur-belajar" },
  { label: "Lab AttackBox", href: "/lab" },
  { label: "Dashboard", href: "/dashboard" },
];

const WEEKLY_STREAK = [
  { day: "Sen", done: true },
  { day: "Sel", done: true },
  { day: "Rab", done: true },
  { day: "Kam", done: true },
  { day: "Jum", done: true },
  { day: "Sab", done: true },
  { day: "Min", done: true },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [streakPopoverOpen, setStreakPopoverOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg2/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-8">
          <BrandLogo size="md" />
          <nav aria-label="Navigasi Utama" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map(({ label, href }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-lg px-3.5 font-heading text-sm transition-colors",
                        isActive
                          ? "bg-redsoft font-semibold text-btn"
                          : "text-mute hover:bg-card hover:text-ink"
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Living Streak Flame & Mini Weekly History Calendar (DESIGN.md Section 2.2 & 5.3) */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setStreakPopoverOpen((prev) => !prev)}
              aria-expanded={streakPopoverOpen}
              aria-label="Riwayat rentetan belajar 12 hari berturut-turut"
              className="btn-interactive inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-line bg-card px-3.5 font-heading text-xs font-bold text-ink hover:border-mid"
            >
              <IconFlame
                size={16}
                stroke={2}
                className="streak-flame text-mid"
              />
              <span className="tabular-nums text-mid">12</span>
              <span className="hidden text-mute lg:inline">Hari</span>
            </button>

            {streakPopoverOpen && (
              <div
                role="dialog"
                aria-label="Kalender rentetan belajar mingguan"
                className="violet-rim absolute right-0 top-13 z-50 w-68 rounded-2xl border border-line bg-bg2 p-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold text-ink">
                    Rentetan Belajar Aktif
                  </span>
                  <span className="tabular-nums font-mono text-xs font-semibold text-mid">
                    12 Hari
                  </span>
                </div>
                <p className="mt-1 text-xs text-mute">
                  Selesaikan minimal 1 Flag setiap hari untuk menjaga api streak menyala.
                </p>
                <div className="mt-3 grid grid-cols-7 gap-1.5 text-center">
                  {WEEKLY_STREAK.map((item) => (
                    <div
                      key={item.day}
                      className="flex flex-col items-center gap-1 rounded-lg border border-line bg-card py-1.5"
                    >
                      <span className="text-[10px] font-medium text-mute">
                        {item.day}
                      </span>
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: item.done
                            ? "var(--accent-warning)"
                            : "var(--border-subtle)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5 text-[11px]">
                  <span className="inline-flex items-center gap-1 font-heading font-semibold text-btn">
                    <IconShieldBolt size={14} stroke={2} />
                    SOC Specialist
                  </span>
                  <span className="tabular-nums font-mono text-ok">
                    +450 XP
                  </span>
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            href="/masuk"
            className="hidden sm:inline-flex"
          >
            Masuk
          </Button>
          <Button
            variant="primary"
            size="sm"
            href="/daftar"
            className="hidden sm:inline-flex"
          >
            Mulai Gratis
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
            }
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-card text-ink hover:border-red md:hidden"
          >
            {mobileMenuOpen ? (
              <IconX size={20} stroke={1.75} />
            ) : (
              <IconMenu2 size={20} stroke={1.75} />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-line bg-bg2 px-5 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3.5 font-heading text-sm font-medium text-ink hover:bg-card"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3 sm:hidden">
            <Button
              variant="outline"
              size="sm"
              href="/masuk"
              className="w-full"
            >
              Masuk
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="/daftar"
              className="w-full"
            >
              Mulai Gratis
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
