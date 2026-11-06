"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBook2,
  IconFlame,
  IconLayoutDashboard,
  IconLogout,
  IconShieldCheck,
  IconTerminal2,
  IconTrophy,
} from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useUserProgress } from "@/hooks/use-user-progress";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    label: "Ringkasan Belajar",
    href: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    label: "Katalog Room & Jalur",
    href: "/#jalur-belajar",
    icon: IconBook2,
  },
  {
    label: "Lab Siber Interaktif",
    href: "/lab",
    icon: IconTerminal2,
  },
  {
    label: "Papan Peringkat",
    href: "/dashboard#peringkat",
    icon: IconTrophy,
  },
  {
    label: "Sertifikasi Siber",
    href: "/dashboard#sertifikasi",
    icon: IconShieldCheck,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data } = useUserProgress();
  const user = data?.user;

  return (
    <aside className="flex w-full shrink-0 flex-col justify-between border-b border-line bg-bg2 p-5 text-ink lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <BrandLogo size="md" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="inline-flex items-center gap-1 rounded-full bg-redsoft px-2.5 py-1 text-xs font-semibold text-btn">
              <IconFlame size={14} />
              {user?.streakDays ?? 7} Hari
            </span>
          </div>
        </div>

        {/* Kartu Profil Singkat */}
        <div className="rounded-xl border border-line bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-sm font-semibold text-ink">
                {user?.fullName ?? "Pratama Siber"}
              </p>
              <p className="text-xs text-btn">
                {user?.rankTitle ?? "Cyber Defender Lv. 4"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading text-lg font-bold text-ink">
                {user?.points ?? 450}
              </p>
              <p className="text-[11px] text-mute">Poin XP</p>
            </div>
          </div>
        </div>

        {/* Menu Navigasi Sidebar */}
        <nav aria-label="Navigasi Sidebar">
          <ul className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {sidebarLinks.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={label} className="shrink-0">
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3.5 py-2.5 font-heading text-sm transition-colors",
                      isActive
                        ? "bg-btn font-medium text-onred"
                        : "text-mute hover:bg-redsoft hover:text-ink"
                    )}
                  >
                    <Icon size={18} />
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
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-mute transition-colors hover:bg-redsoft hover:text-ink"
        >
          <IconLogout size={18} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </aside>
  );
}
