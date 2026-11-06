"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBook2,
  IconBriefcase,
  IconBuildingBank,
  IconCurrencyDollar,
  IconDiamond,
  IconLayoutDashboard,
  IconMenu2,
  IconSearch,
  IconShieldCheck,
  IconTarget,
  IconTerminal2,
  IconTrophy,
  IconX,
} from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Belajar", href: "/#jalur-belajar", icon: IconBook2 },
  { label: "Praktik Lab", href: "/lab", icon: IconTerminal2 },
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { label: "Kompetisi", href: "/#jalur-belajar", icon: IconTrophy },
  { label: "Keamanan AI", href: "/#jalur-belajar", icon: IconDiamond },
  { label: "Pendidikan", href: "/#solusi-industri", icon: IconBuildingBank },
  { label: "Bisnis", href: "/#solusi-industri", icon: IconBriefcase },
  { label: "Sertifikasi", href: "/dashboard", icon: IconShieldCheck },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#151C2B]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[84px] max-w-[1320px] items-center justify-between gap-4 px-5 py-2">
        <div className="flex items-center gap-6">
          <BrandLogo size="md" variant="dark" />
          <nav aria-label="Navigasi Utama" className="hidden xl:block">
            <ul className="flex items-center gap-1.5">
              {navItems.map(({ label, href, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-lg px-3 py-2 font-heading text-sm leading-tight transition-colors",
                        isActive
                          ? "bg-white/10 text-[#A3EA2A]"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon size={20} stroke={1.6} aria-hidden="true" />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/#jalur-belajar"
            aria-label="Cari Modul Siber"
            className="rounded-lg p-2 text-white/65 transition-colors hover:bg-white/5 hover:text-white"
          >
            <IconSearch size={20} />
          </Link>
          <Button variant="outline" href="/masuk" className="hidden sm:inline-flex">
            Masuk
          </Button>
          <Button variant="primary" href="/daftar" className="hidden sm:inline-flex">
            Daftar GRATIS
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Buka menu navigasi"
            className="inline-flex items-center justify-center rounded-lg p-2 text-white/80 hover:bg-white/10 xl:hidden"
          >
            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Responsif Mobile & Tablet */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#151C2B] px-5 pb-6 pt-4 xl:hidden">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {navItems.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3.5 py-2.5 font-heading text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-[#A3EA2A]"
                >
                  <Icon size={18} className="text-[#A3EA2A]" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2.5 sm:hidden">
            <Button variant="outline" href="/masuk" className="w-full">
              Masuk ke Akun
            </Button>
            <Button variant="primary" href="/daftar" className="w-full">
              Daftar GRATIS Sekarang
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
