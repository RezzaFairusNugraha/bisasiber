import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button, GoogleAuthButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Masuk ke Akun",
  description:
    "Masuk ke akun BisaSiber Anda untuk melanjutkan modul keamanan siber dan mengakses mesin virtual lab interaktif.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-bg px-5 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <BrandLogo size="md" />
        <Link
          href="/"
          className="inline-flex min-h-11 items-center px-2 font-heading text-sm font-medium text-mute transition-colors hover:text-ink"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      <main className="mx-auto my-12 w-full max-w-sm">
        <h1 className="font-heading text-2xl font-extrabold text-ink">
          Masuk ke BisaSiber
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-mute">
          Lanjutkan progres modul dan nyalakan kembali sesi AttackBox Anda.
        </p>

        <div className="mt-6">
          <GoogleAuthButton
            href="/dashboard"
            label="Masuk dengan Google"
            className="w-full"
          />
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-mute">atau gunakan email</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <form action="/dashboard" className="flex flex-col gap-4">
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
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-heading text-xs font-semibold text-ink"
              >
                Kata Sandi
              </label>
              <Link
                href="/daftar"
                className="text-xs text-mute hover:text-ink"
              >
                Lupa kata sandi?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Masukkan kata sandi Anda"
              className="h-11 w-full rounded-lg border border-line bg-card px-3.5 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-2 w-full"
          >
            Masuk ke Dashboard
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-mute">
          Belum punya akun?{" "}
          <Link
            href="/daftar"
            className="font-semibold text-btn hover:underline"
          >
            Buat akun gratis
          </Link>
        </p>
      </main>

      <div className="mx-auto text-xs text-mute">
        © {new Date().getFullYear()} BisaSiber Indonesia
      </div>
    </div>
  );
}
