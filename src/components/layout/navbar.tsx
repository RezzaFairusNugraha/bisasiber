"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Modul Belajar", href: "/#jalur-belajar" },
  { label: "Lab Siber", href: "/lab" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5">
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
                        "rounded-md px-3 py-1.5 font-heading text-sm transition-colors",
                        isActive
                          ? "font-medium text-btn"
                          : "text-mute hover:text-ink"
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
            aria-label="Buka menu navigasi"
            className="inline-flex items-center justify-center rounded-md p-2 text-ink hover:bg-bg2 md:hidden"
          >
            {mobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-line bg-bg px-5 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 font-heading text-sm text-ink hover:bg-bg2"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3 sm:hidden">
            <Button variant="outline" size="sm" href="/masuk" className="w-full">
              Masuk
            </Button>
            <Button variant="primary" size="sm" href="/daftar" className="w-full">
              Mulai Gratis
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
