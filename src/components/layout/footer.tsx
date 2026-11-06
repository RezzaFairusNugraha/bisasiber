import Link from "next/link";
import {
  IconArrowUpRight,
  IconShieldCheck,
  IconSparkles,
  IconTerminal2,
} from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button, GoogleAuthButton } from "@/components/ui/button";

const footerColumns = [
  {
    title: "Pembelajaran",
    links: [
      { label: "Lab Interaktif", href: "/lab" },
      { label: "Jalur Karier Siber", href: "/#jalur-belajar" },
      { label: "Kompetisi CTF", href: "/#jalur-belajar" },
      { label: "Sertifikasi Siber", href: "/dashboard" },
    ],
  },
  {
    title: "Sumber Daya",
    links: [
      { label: "Tentang BisaSiber", href: "/" },
      { label: "Artikel & Riset Siber", href: "/" },
      { label: "Glosarium Keamanan", href: "/" },
      { label: "Komunitas Discord", href: "/" },
    ],
  },
  {
    title: "Privasi & Hukum",
    links: [
      { label: "Kebijakan Privasi", href: "/" },
      { label: "Syarat & Ketentuan", href: "/" },
      { label: "Ketentuan Penggunaan Lab", href: "/lab" },
      { label: "Kebijakan Etika Retas", href: "/" },
    ],
  },
  {
    title: "Hubungi Kami",
    links: [
      { label: "Kontak Tim", href: "/" },
      { label: "Mitra Komunitas", href: "/" },
      { label: "Akses Pelajar & Mahasiswa", href: "/daftar" },
    ],
  },
];

const decorativePixels = [
  [4, 24, 20, 4, 0.22],
  [16, 38, 6, 6, 0.35],
  [28, 18, 5, 12, 0.28],
  [39, 34, 18, 4, 0.24],
  [51, 22, 7, 7, 0.45],
  [63, 40, 22, 4, 0.22],
  [75, 16, 5, 14, 0.35],
  [86, 32, 16, 4, 0.42],
] as const;

export function FooterCta() {
  return (
    <section className="px-5 pb-16 pt-4 md:pb-24">
      <div className="card-interactive relative mx-auto max-w-[1320px] overflow-hidden rounded-3xl border border-line bg-bg2 p-8 sm:p-12 lg:p-14">
        {/* Radial Red Soft Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-80 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--redsoft) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-4 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-btn">
              <IconSparkles size={14} />
              Mulai Tanpa Instalasi Rumit
            </span>
            <h2 className="font-heading text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Siap Menguji Kemampuan Retas Etis &amp; Pertahanan Siber Anda?
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              Bergabunglah bersama 150.000+ pembelajar di Indonesia. Nyalakan mesin lab pertama Anda langsung di browser—gratis dan tanpa perlu pengalaman sebelumnya.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3.5">
              <Button variant="primary" href="/daftar" className="h-11 px-6">
                <span>Buat Akun Gratis</span>
                <IconArrowUpRight size={18} />
              </Button>
              <GoogleAuthButton />
            </div>
          </div>

          {/* Kanan: Ringkasan Fitur Cepat */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-card p-5 shadow-2xs">
              <IconTerminal2 size={24} className="text-btn" />
              <h3 className="mt-3 font-heading text-base font-bold text-ink">
                AttackBox Cloud Instan
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-mute">
                Terminal Linux siap pakai langsung di tab browser lengkap dengan Nmap, Curl, dan tools eksploitasi.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-card p-5 shadow-2xs">
              <IconShieldCheck size={24} className="text-ok" />
              <h3 className="mt-3 font-heading text-base font-bold text-ink">
                Validasi Flag Real-Time
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-mute">
                Kumpulkan poin XP dari setiap flag BISA&#123;...&#125; dan naikkan peringkat nasional Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Dekorasi Piksel Siber */}
        <div
          aria-hidden="true"
          className="relative mt-8 h-[42px] w-full overflow-hidden border-t border-line/60 pt-4"
        >
          {decorativePixels.map(([leftPct, top, width, height, opacity], idx) => (
            <span
              key={idx}
              className="absolute hidden md:block"
              style={{
                left: `${leftPct}%`,
                top,
                width,
                height,
                opacity,
                background: "var(--red)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-card px-5 pb-8 pt-14 text-ink">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="font-heading text-lg font-medium text-ink">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-mute transition-colors hover:text-btn hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
            <BrandLogo size="lg" />
            <p className="max-w-[340px] pt-2 text-sm leading-relaxed text-mute">
              Platform pembelajaran teknologi dan keamanan siber interaktif bergamifikasi yang dapat diakses langsung melalui browser Anda.
            </p>
            <p className="text-xs text-mute">
              Jakarta Digital Cyber Hub, DKI Jakarta, Indonesia
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-mute sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-5">
            <p>© {new Date().getFullYear()} BisaSiber Indonesia. Hak Cipta Dilindungi.</p>
            <p className="flex items-center gap-1.5 text-btn">
              <IconShieldCheck size={20} aria-hidden="true" />
              <span>Standar Keamanan ISO 27001</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            {["GitHub", "LinkedIn", "Discord", "YouTube", "Instagram", "X"].map(
              (social) => (
                <Link
                  key={social}
                  href="/"
                  aria-label={social}
                  className="transition-colors hover:text-ink"
                >
                  {social}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
