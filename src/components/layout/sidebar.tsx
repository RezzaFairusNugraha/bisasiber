"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBook2,
  IconFlame,
  IconLayoutDashboard,
  IconLogout,
  IconShieldBolt,
  IconTerminal2,
} from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useUserProgress } from "@/hooks/use-user-progress";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    label: "Ringkasan",
    href: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    label: "Katalog Modul",
    href: "/#jalur-belajar",
    icon: IconBook2,
  },
  {
    label: "Lab AttackBox",
    href: "/lab",
    icon: IconTerminal2,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data } = useUserProgress();
  const user = data?.user;

  return (
    <aside className="flex w-full shrink-0 flex-col justify-between border-b border-line bg-bg2 p-5 text-ink lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <BrandLogo size="sm" />
          <ThemeToggle />
        </div>

        <div className="violet-rim rounded-2xl border border-line bg-card p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-heading text-sm font-bold text-ink">
              {user?.fullName ?? "Pratama Siber"}
            </p>
            <span className="inline-flex items-center gap-1 rounded-full border border-line bg-bg2 px-2 py-0.5 font-mono text-[11px] font-bold text-mid">
              <IconFlame size={12} stroke={2} className="streak-flame text-mid" />
              {user?.streakDays ?? 12}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 text-xs">
            <span className="inline-flex items-center gap-1 truncate rounded-full bg-redsoft px-2.5 py-0.5 font-heading text-[11px] font-semibold text-btn">
              <IconShieldBolt size={12} stroke={2} />
              {user?.rankTitle ?? "SOC Specialist"}
            </span>
            <span className="tabular-nums shrink-0 font-mono text-xs font-bold text-ok">
              {user?.points ?? 450} XP
            </span>
          </div>
        </div>

        <nav aria-label="Navigasi Sidebar">
          <ul className="flex flex-row gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible">
            {sidebarLinks.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={label} className="shrink-0">
                  <Link
                    href={href}
                    className={cn(
                      "flex min-h-11 items-center gap-2.5 rounded-lg px-3.5 font-heading text-sm transition-colors",
                      isActive
                        ? "bg-btn font-semibold text-onred"
                        : "text-mute hover:bg-card hover:text-ink"
                    )}
                  >
                    <Icon size={18} stroke={1.75} />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-6 hidden border-t border-line pt-4 lg:block">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 rounded-lg px-3.5 font-heading text-xs font-medium text-mute transition-colors hover:bg-card hover:text-ink"
        >
          <IconLogout size={16} stroke={1.75} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </aside>
  );
}
