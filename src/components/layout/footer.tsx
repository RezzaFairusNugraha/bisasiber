import Link from "next/link";
import { IconShieldCheck } from "@tabler/icons-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button, GoogleAuthButton } from "@/components/ui/button";

const footerColumns = [
  {
    title: "Pembelajaran",
    links: [
      { label: "Lab Interaktif", href: "/lab" },
      { label: "Untuk Bisnis", href: "/#solusi-industri" },
      { label: "Untuk Universitas & Sekolah", href: "/#solusi-industri" },
      { label: "Kompetisi CTF", href: "/#jalur-belajar" },
      { label: "Sertifikasi Siber", href: "/dashboard" },
    ],
  },
  {
    title: "Sumber Daya",
    links: [
      { label: "Tentang BisaSiber", href: "/" },
      { label: "Ruang Berita", href: "/" },
      { label: "Artikel & Blog", href: "/" },
      { label: "Glosarium Keamanan", href: "/" },
      { label: "Karier di Dunia Siber", href: "/#jalur-belajar" },
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
      { label: "Program Mitra Kampus", href: "/" },
      { label: "Diskon Pelajar & Mahasiswa", href: "/daftar" },
    ],
  },
];

const decorativePixels = [
  [4, 35, 20, 5, 0.25, "#A3EA2A"],
  [14, 43, 6, 6, 0.42, "#00B800"],
  [24, 27, 5, 12, 0.38, "#056405"],
  [34, 41, 18, 4, 0.34, "#A3EA2A"],
  [44, 31, 7, 7, 0.72, "#4FF74F"],
  [54, 47, 22, 4, 0.26, "#00B800"],
  [64, 23, 5, 14, 0.55, "#056405"],
  [74, 39, 8, 8, 0.32, "#A3EA2A"],
  [84, 29, 20, 4, 0.82, "#A3EA2A"],
  [92, 44, 12, 4, 0.36, "#4FF74F"],
] as const;

export function FooterCta() {
  return (
    <section className="overflow-hidden bg-[#182031] px-5 pt-16 md:pt-20">
      <div className="mx-auto flex max-w-[963px] flex-col items-center gap-6 text-center text-white">
        <h2 className="max-w-[782px] font-heading text-2xl font-medium leading-snug tracking-wide sm:text-4xl sm:leading-[46px]">
          Bergabunglah bersama 150.000+ pembelajar yang menguasai keamanan siber di BisaSiber
        </h2>
        <p className="max-w-[720px] text-base leading-relaxed text-[#EEEFF2]/85 sm:text-lg">
          Mulai perjalanan siber Anda hari ini. Gratis langsung dari browser Anda, tanpa perlu pengalaman sebelumnya.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" href="/daftar" className="h-[38px]">
            Daftar GRATIS
          </Button>
          <GoogleAuthButton />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative mx-auto mt-14 h-[60px] max-w-[1320px] overflow-hidden"
      >
        {decorativePixels.map(([leftPct, top, width, height, opacity, color], idx) => (
          <span
            key={idx}
            className="absolute hidden md:block"
            style={{
              left: `${leftPct}%`,
              top,
              width,
              height,
              opacity,
              background: color,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#212C42] px-5 pb-8 pt-14 text-[#F9F9FB]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="font-heading text-lg font-medium text-white">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#EEEFF2]/80 transition-colors hover:text-[#A3EA2A] hover:underline"
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
            <BrandLogo size="lg" variant="dark" />
            <p className="max-w-[340px] pt-2 text-sm leading-relaxed text-[#EEEFF2]/80">
              Platform pembelajaran teknologi dan keamanan siber interaktif bergamifikasi yang dapat diakses langsung melalui browser Anda.
            </p>
            <p className="text-xs text-[#727C92]">
              Jakarta Digital Cyber Hub, DKI Jakarta, Indonesia
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#3E475A] pt-6 text-sm text-[#727C92] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-5">
            <p>© {new Date().getFullYear()} BisaSiber Indonesia. Hak Cipta Dilindungi.</p>
            <p className="flex items-center gap-1.5 text-[#A3EA2A]/90">
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
                  className="transition-colors hover:text-white"
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
