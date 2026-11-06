import type { Metadata } from "next";
import Link from "next/link";
import {
  IconCheck,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button, GoogleAuthButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Daftar Akun Gratis",
  description:
    "Buat akun gratis di BisaSiber dan mulai pelajari keamanan siber, penetration testing, serta pertahanan jaringan secara interaktif.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#151C2B] px-5 py-10 text-[#F9F9FB]">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <BrandLogo size="md" variant="dark" />
        <Link
          href="/"
          className="font-heading text-sm text-white/75 transition-colors hover:text-[#A3EA2A]"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      <main className="mx-auto my-8 grid w-full max-w-[980px] grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#1C2539] shadow-xl lg:grid-cols-12">
        {/* Panel Kiri: Keunggulan */}
        <div className="flex flex-col justify-between bg-[#182031] p-8 lg:col-span-5">
          <div>
            <BrandLogo size="lg" variant="dark" />
            <h1 className="mt-6 font-heading text-2xl font-bold leading-snug text-white">
              Bangun Karier Keamanan Siber Anda dari Nol
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Bergabunglah bersama ribuan talenta siber Indonesia dan akses ratusan laboratorium interaktif langsung di browser.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-white/85">
              {[
                "Akses instan ke AttackBox & Lab Linux",
                "Jalur karier terstruktur (Red Team, SOC, Cloud, AI)",
                "Tantangan Capture The Flag (CTF) mingguan",
                "Sertifikat kompetensi yang diakui industri",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <IconCheck
                    size={18}
                    stroke={2.5}
                    className="mt-0.5 shrink-0 text-[#A3EA2A]"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-xs text-white/50">
            Gratis selamanya untuk modul dasar. Tanpa perlu kartu kredit.
          </p>
        </div>

        {/* Panel Kanan: Formulir Pendaftaran */}
        <div className="p-6 sm:p-8 lg:col-span-7">
          <h2 className="font-heading text-xl font-bold text-white">
            Buat Akun BisaSiber Gratis
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Isi data di bawah ini untuk langsung memulai modul pertama Anda.
          </p>

          <div className="mt-5">
            <GoogleAuthButton
              href="/dashboard"
              label="Daftar Cepat dengan Google"
              className="w-full"
            />
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-wider text-white/50">
              atau daftar dengan email
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form action="/dashboard" className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block font-heading text-xs font-medium text-white/85"
              >
                Nama Lengkap / Username Siber
              </label>
              <div className="relative">
                <IconUser
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45"
                />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Pratama Siber"
                  className="h-11 w-full rounded-lg border border-white/15 bg-[#151C2B] pl-10 pr-4 text-sm text-white placeholder:text-white/35 focus:border-[#A3EA2A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-heading text-xs font-medium text-white/85"
              >
                Alamat Email Aktif
              </label>
              <div className="relative">
                <IconMail
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nama@kampus.ac.id"
                  className="h-11 w-full rounded-lg border border-white/15 bg-[#151C2B] pl-10 pr-4 text-sm text-white placeholder:text-white/35 focus:border-[#A3EA2A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block font-heading text-xs font-medium text-white/85"
              >
                Kata Sandi Minimal 8 Karakter
              </label>
              <div className="relative">
                <IconLock
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-white/15 bg-[#151C2B] pl-10 pr-4 text-sm text-white placeholder:text-white/35 focus:border-[#A3EA2A] focus:outline-none"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
              Mulai Belajar Sekarang
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-white/70">
            Sudah punya akun?{" "}
            <Link
              href="/masuk"
              className="font-semibold text-[#A3EA2A] hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </main>

      <div className="mx-auto text-center text-xs text-white/50">
        © {new Date().getFullYear()} BisaSiber Indonesia — Platform Belajar Teknologi & Siber Interaktif
      </div>
    </div>
  );
}
