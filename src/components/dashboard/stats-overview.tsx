import Image from "next/image";
import { IconBuildingBank, IconCheck } from "@tabler/icons-react";
import { Button, GoogleAuthButton } from "@/components/ui/button";
import {
  HERO_BG_IMG,
  HERO_ILLUSTRATION_IMG,
  PLATFORM_STATS,
  PROMO_BUSINESS_IMG,
  PROMO_EDUCATION_IMG,
} from "@/lib/mock-data";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#151C2B]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-280px] h-[480px] rounded-[100px] opacity-90 blur-[100px]"
        style={{
          background:
            "radial-gradient(198% 52% at 50% 50%, #1C4DA9 0%, rgba(28,77,169,0) 70%)",
        }}
      />
      <Image
        src={HERO_BG_IMG}
        alt=""
        fill
        priority
        aria-hidden="true"
        className="pointer-events-none object-cover opacity-55"
      />
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-12 px-5 pb-20 pt-14 md:pb-36 md:pt-28 lg:flex-row lg:items-start">
        <div className="flex w-full max-w-[680px] flex-col">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#A3EA2A]/40 bg-[#A3EA2A]/10 px-3.5 py-1 font-heading text-xs font-medium text-[#A3EA2A]">
            Platform Belajar Teknologi & Keamanan Siber #1 Indonesia
          </span>
          <h1 className="font-heading text-4xl font-medium leading-[1.08] text-[#F9F9FB] sm:text-[54px] sm:leading-[54px]">
            Siapa pun bisa belajar keamanan siber bersama{" "}
            <span className="text-[#A3EA2A]">BisaSiber</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#EEEFF2] sm:text-2xl sm:leading-[35px]">
            Pelatihan keamanan siber & teknologi interaktif melalui skenario dunia nyata langsung dari browser Anda.
          </p>
          <div className="flex flex-wrap items-center gap-4 pb-7 pt-10">
            <Button variant="primary" href="/daftar" className="h-[38px] px-5">
              Daftar GRATIS
            </Button>
            <GoogleAuthButton />
            <Button
              variant="outline"
              href="/lab"
              className="h-[38px] border-white/25 text-white hover:bg-white/10"
            >
              Coba Lab Sekarang
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-base text-[#EEEFF2]">
            {[
              "Ramah untuk pemula",
              "Panduan langkah demi langkah & tantangan CTF",
              "Mesin virtual instan di browser",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <IconCheck
                  size={16}
                  stroke={3}
                  color="#A3EA2A"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative shrink-0">
          <Image
            src={HERO_ILLUSTRATION_IMG}
            alt="Ilustrasi peretas etis dan laboratorium keamanan siber BisaSiber"
            width={305}
            height={340}
            priority
            className="h-auto w-[230px] sm:w-[305px]"
          />
        </div>
      </div>
    </section>
  );
}

export function PlatformStatsGrid() {
  return (
    <section
      aria-label="Statistik Platform BisaSiber"
      className="border-b border-[#E4ECDA] bg-[#F8FDEE] px-5 py-8"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
        {PLATFORM_STATS.map((stat) => (
          <div
            key={stat.value}
            className="flex flex-col items-center gap-1 text-center text-[#151C2B]"
          >
            <div className="font-heading text-2xl font-bold leading-tight tracking-tight sm:text-[32px]">
              {stat.value}
            </div>
            <div className="text-sm leading-relaxed text-[#151C2B]/75 sm:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface PromoSectionCardProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  proofText: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
}

function PromoSectionCard({
  badge,
  badgeIcon,
  title,
  subtitle,
  bullets,
  ctaLabel,
  ctaHref,
  proofText,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse,
}: PromoSectionCardProps) {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#E3EDD6] bg-[#F6FAF0] md:pl-12">
      {badge && (
        <span className="inline-flex w-fit items-center gap-2.5 rounded-b-md bg-[#E9F3E7] px-4 py-2.5 font-heading text-sm font-medium text-[#26890C]">
          {badgeIcon}
          <span>{badge}</span>
        </span>
      )}
      <div
        className={`flex flex-col items-center gap-8 px-5 md:flex-row md:px-0 ${
          reverse ? "md:flex-row-reverse md:pr-10" : ""
        }`}
      >
        <div className="flex flex-1 flex-col gap-5 py-8 md:py-14">
          <h3 className="font-heading text-2xl font-medium text-[#151C2B] sm:text-3xl">
            {title}
          </h3>
          {subtitle && (
            <p className="max-w-[510px] text-base leading-relaxed text-[#525A6A]">
              {subtitle}
            </p>
          )}
          <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-[#525A6A]">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="flex flex-col items-start gap-3 pt-2">
            <Button variant="primary" href={ctaHref}>
              {ctaLabel}
            </Button>
            <span className="flex items-center gap-2 text-sm font-medium text-[#525A6A]">
              <IconCheck size={15} stroke={3} color="#26890C" aria-hidden="true" />
              <span>{proofText}</span>
            </span>
          </div>
        </div>
        <figure className="flex flex-1 items-end justify-center pb-6 md:justify-end md:pb-10 md:pt-6">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="h-auto max-w-full rounded-lg object-contain"
          />
        </figure>
      </div>
    </article>
  );
}

export function EnterpriseEducationPromos() {
  return (
    <section
      id="solusi-industri"
      className="mx-auto flex max-w-[1296px] flex-col gap-8 px-5 pb-20"
    >
      <PromoSectionCard
        badge="BisaSiber untuk Korporasi & Tim TI"
        title="Bangun ketahanan siber tim rekayasa & SOC perusahaan Anda"
        subtitle="Latih tim keamanan siber dan developer Anda menghadapi serangan dunia nyata dengan metrik kesiapan yang terukur."
        bullets={[
          "Bangun budaya keamanan proaktif yang meningkatkan dan mempertahankan talenta siber terbaik.",
          "Perkecil dampak insiden, percepat waktu mitigasi (MTTR), dan sajikan bukti kepatuhan yang diakui industri.",
        ]}
        ctaLabel="Jelajahi BisaSiber untuk Bisnis"
        ctaHref="/dashboard"
        proofText="Coba GRATIS bersama tim perusahaan Anda"
        imageUrl={PROMO_BUSINESS_IMG}
        imageAlt="Dashboard BisaSiber untuk Bisnis yang menampilkan matriks keahlian tim dan papan peringkat"
        imageWidth={631}
        imageHeight={420}
      />

      <PromoSectionCard
        badge="BisaSiber untuk Pendidikan & Kampus"
        badgeIcon={<IconBuildingBank size={18} aria-hidden="true" />}
        title="Mengajar keamanan siber di kampus atau SMK?"
        subtitle="Gunakan laboratorium virtual siap pakai pada platform yang disukai mahasiswa dan siswa Anda."
        bullets={[
          "Hemat waktu persiapan berminggu-minggu dan petakan silabus kuliah ke modul BisaSiber dalam hitungan menit.",
          "Tugaskan lab praktik yang dapat disesuaikan, buat materi kustom, dan pantau progres setiap mahasiswa secara real-time.",
          "Lingkungan praktik retas yang aman dan terisolasi, dapat diakses langsung dari browser tanpa instalasi rumit.",
        ]}
        ctaLabel="Jelajahi BisaSiber untuk Pendidikan"
        ctaHref="/dashboard"
        proofText="Dipercaya oleh universitas & komunitas siber di Indonesia"
        imageUrl={PROMO_EDUCATION_IMG}
        imageAlt="BisaSiber untuk Pendidikan menampilkan kurikulum kustom dan pemantauan kelas"
        imageWidth={490}
        imageHeight={360}
      />
    </section>
  );
}
