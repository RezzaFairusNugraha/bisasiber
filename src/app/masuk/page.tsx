import type { Metadata } from "next";
import Link from "next/link";
import { IconLock, IconMail, IconShieldCheck } from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button, GoogleAuthButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Masuk ke Akun",
  description:
    "Masuk ke akun BisaSiber Anda untuk melanjutkan modul keamanan siber dan mengakses mesin virtual lab interaktif.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-bg px-5 py-10 text-ink">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <BrandLogo size="md" />
        <Link
          href="/"
          className="font-heading text-sm text-mute transition-colors hover:text-btn"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      <main className="mx-auto my-10 w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <BrandLogo size="lg" showText={false} href="/" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
            Selamat Datang Kembali
          </h1>
          <p className="mt-1 text-sm text-mute">
            Masuk untuk melanjutkan lab dan tantangan keamanan siber Anda di BisaSiber.
          </p>
        </div>

        <div className="mt-6">
          <GoogleAuthButton
            href="/dashboard"
            label="Masuk dengan Akun Google"
            className="w-full"
          />
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs uppercase tracking-wider text-mute">
            atau gunakan email
          </span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <form action="/dashboard" className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-heading text-xs font-medium text-ink"
            >
              Alamat Email
            </label>
            <div className="relative">
              <IconMail
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"
              />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nama@domain.id"
                className="h-11 w-full rounded-lg border border-line bg-bg pl-10 pr-4 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-heading text-xs font-medium text-ink"
              >
                Kata Sandi
              </label>
              <Link
                href="/daftar"
                className="text-xs text-btn hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>
            <div className="relative">
              <IconLock
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="h-11 w-full rounded-lg border border-line bg-bg pl-10 pr-4 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
            Masuk ke Dashboard
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-mute">
          Belum memiliki akun BisaSiber?{" "}
          <Link
            href="/daftar"
            className="font-semibold text-btn hover:underline"
          >
            Daftar GRATIS
          </Link>
        </p>
      </main>

      <div className="mx-auto flex items-center gap-2 text-xs text-mute">
        <IconShieldCheck size={16} className="text-btn" />
        <span>Koneksi terenkripsi TLS 1.3 • Dilindungi oleh BisaSiber SOC</span>
      </div>
    </div>
  );
}
