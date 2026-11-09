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
    title: "Jalur Siber",
    links: [
      { label: "Red Team (Ofensif)", href: "/#jalur-belajar" },
      { label: "Blue Team (Defensif SOC)", href: "/#jalur-belajar" },
      { label: "Purple Team Synthesis", href: "/lab" },
    ],
  },
  {
    title: "Kebijakan",
    links: [
      { label: "Privasi Data", href: "/" },
      { label: "Ketentuan Layanan", href: "/" },
      { label: "Etika Lab & Keamanan", href: "/lab" },
    ],
  },
];

export function FooterCta() {
  return (
    <section className="border-t border-line bg-bg2 px-5 py-16">
      <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 font-heading text-xs font-semibold text-btn">
            Red Team + Blue Team = Purple Synthesis
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-ink sm:text-3xl">
            Siap menguji serangan dan pertahanan jaringan pertama Anda?
          </h2>
          <p className="mt-2 text-base leading-relaxed text-mute">
            Mulai dari nol tanpa instalasi rumit. Jalankan lingkungan lab siber interaktif langsung dari peramban Anda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="lg" href="/daftar">
            Mulai Jelajahi Minatmu — Gratis
          </Button>
          <Button variant="outline" size="lg" href="/lab">
            Coba Lab Pertama (Tanpa Install)
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-5 py-12 text-ink">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-3">
            <BrandLogo size="md" />
            <p className="max-w-xs text-sm leading-relaxed text-mute">
              Platform belajar keamanan siber holistik berbahasa Indonesia — memadukan ketajaman Red Team dan ketangguhan Blue Team.
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
          <p>© {new Date().getFullYear()} BisaSiber Indonesia — The Purple Synthesis Edition.</p>
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
