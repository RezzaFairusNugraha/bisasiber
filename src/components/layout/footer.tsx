import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Modul Belajar", href: "/#jalur-belajar" },
      { label: "Lab AttackBox", href: "/lab" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Panduan",
    links: [
      { label: "Dokumentasi Lab", href: "/lab" },
      { label: "Jalur Pemula", href: "/#jalur-belajar" },
      { label: "Komunitas Siber", href: "/" },
    ],
  },
  {
    title: "Kebijakan",
    links: [
      { label: "Privasi Data", href: "/" },
      { label: "Ketentuan Layanan", href: "/" },
      { label: "Etika Lab & Red Team", href: "/lab" },
    ],
  },
];

export function FooterCta() {
  return (
    <section className="border-t border-line bg-bg2 px-5 py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Siap menguji pertahanan jaringan pertama Anda?
          </h2>
          <p className="mt-2 text-base leading-relaxed text-mute">
            Buka modul dasar gratis dan jalankan AttackBox langsung di browser tanpa konfigurasi tambahan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="lg" href="/daftar">
            Buat Akun Gratis
          </Button>
          <Button variant="outline" size="lg" href="/masuk">
            Masuk ke Akun
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-5 py-12 text-ink">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-3">
            <BrandLogo size="md" />
            <p className="max-w-xs text-sm leading-relaxed text-mute">
              Platform belajar keamanan siber dan laboratorium Linux interaktif berbahasa Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-14">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-2">
                <h3 className="font-heading text-sm font-bold text-ink">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-1">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-9 items-center text-sm text-mute transition-colors hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} BisaSiber Indonesia.</p>
          <div className="flex items-center gap-5">
            {["GitHub", "LinkedIn", "Discord"].map((social) => (
              <Link
                key={social}
                href="/"
                className="inline-flex min-h-9 items-center transition-colors hover:text-ink"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
