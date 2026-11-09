import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button, GoogleAuthButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Daftar Akun Gratis",
  description:
    "Buat akun gratis di BisaSiber dan mulai pelajari keamanan siber Red Team, Blue Team, dan Purple Team secara interaktif.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-bg px-5 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between">
        <BrandLogo size="md" />
        <Link
          href="/"
          className="inline-flex min-h-11 items-center px-2 font-heading text-sm font-medium text-mute transition-colors hover:text-ink"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      <main className="violet-rim mx-auto my-12 w-full max-w-md rounded-2xl border border-line bg-bg2 p-7">
        <span className="inline-flex items-center rounded-full border border-line bg-redsoft px-3 py-0.5 font-heading text-xs font-semibold text-btn">
          Mulai dari Nol — Gratis
        </span>
        <h1 className="mt-3 font-heading text-2xl font-bold text-ink">
          Buat Akun Gratis
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-mute">
          Mulai latihan Penetration Testing (Red Team) dan analisis pertahanan SOC (Blue Team) langsung dari peramban Anda.
        </p>

        <div className="mt-6">
          <GoogleAuthButton
            href="/dashboard"
            label="Daftar dengan Google"
            className="w-full"
          />
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-mute">atau daftar dengan email</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <form action="/dashboard" className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1.5 block font-heading text-xs font-semibold text-ink"
            >
              Nama Lengkap
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Pratama Siber"
              className="h-11 w-full rounded-lg border border-line bg-card px-3.5 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-heading text-xs font-semibold text-ink"
            >
              Alamat Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="nama@domain.id"
              className="h-11 w-full rounded-lg border border-line bg-card px-3.5 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block font-heading text-xs font-semibold text-ink"
            >
              Kata Sandi
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Minimal 8 karakter"
              className="h-11 w-full rounded-lg border border-line bg-card px-3.5 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-2 w-full"
          >
            Buat Akun &amp; Mulai Lab
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-mute">
          Sudah punya akun?{" "}
          <Link
            href="/masuk"
            className="font-semibold text-btn hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </main>

      <div className="mx-auto text-xs text-mute">
        © {new Date().getFullYear()} BisaSiber Indonesia
      </div>
    </div>
  );
}
