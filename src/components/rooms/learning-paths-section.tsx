"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconSearch } from "@tabler/icons-react";
import { RoomCard } from "@/components/rooms/room-card";
import { useRooms } from "@/hooks/use-rooms";
import { EXPERIENCE_FILTERS, TOPIC_FILTERS } from "@/lib/mock-data";

const EASE_OUT_EXPO: [number, number, number, number] = [0.2, 0.9, 0.3, 1];

export function LearningPathsSection() {
  const [experience, setExperience] = useState<string>("Semua");
  const [category, setCategory] = useState<string>("Semua");
  const [search, setSearch] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  const { data, isLoading, isError, refetch } = useRooms({
    experience,
    category,
    search,
  });

  const rooms = data?.rooms ?? [];
  const displayedRooms = showAll ? rooms : rooms.slice(0, 8);
  const filterKey = `${experience}__${category}__${search}__${showAll}`;

  return (
    <section
      id="jalur-belajar"
      className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-16 md:py-24"
    >
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Kurikulum &amp; Modul Praktik
          </h2>
          <p className="mt-2 text-base leading-relaxed text-mute">
            Pilih jalur sesuai fokus peran (SOC, Penetration Tester, Security Engineer) atau tingkat pengalaman Anda saat ini.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <IconSearch
            size={17}
            stroke={1.75}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari topik, mis. Nmap atau SOC..."
            aria-label="Cari modul atau topik siber"
            className="h-11 w-full rounded-lg border border-line bg-card pl-10 pr-3.5 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
          />
        </div>
      </div>

      {/* Filter Bar with 44px touch targets */}
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-4 lg:flex-row lg:items-center">
        <div
          role="tablist"
          aria-label="Filter Spesialisasi Peran"
          className="flex flex-wrap items-center gap-1.5"
        >
          {TOPIC_FILTERS.map((topic) => (
            <button
              key={topic}
              type="button"
              role="tab"
              aria-selected={category === topic}
              onClick={() => setCategory(topic)}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-lg px-3.5 font-heading text-xs sm:text-sm transition-colors ${
                category === topic
                  ? "bg-btn font-medium text-onred"
                  : "text-mute hover:bg-bg2 hover:text-ink"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div
          role="group"
          aria-label="Filter Tingkat Pengalaman"
          className="flex flex-wrap items-center gap-1.5"
        >
          {EXPERIENCE_FILTERS.map((level) => (
            <button
              key={level}
              type="button"
              aria-pressed={experience === level}
              onClick={() => setExperience(level)}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-lg px-3 text-xs transition-colors ${
                experience === level
                  ? "border border-line bg-bg2 font-semibold text-ink"
                  : "text-mute hover:bg-bg2/60 hover:text-ink"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        {isLoading ? (
          <div
            aria-busy="true"
            aria-label="Memuat daftar modul"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
              <div
                key={skeleton}
                className="flex h-[320px] w-full flex-col justify-between rounded-xl border border-line bg-card p-5"
              >
                <div className="space-y-3.5">
                  <div className="h-36 w-full animate-pulse rounded-lg bg-bg2" />
                  <div className="h-3.5 w-24 animate-pulse rounded bg-bg2" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-bg2" />
                  <div className="h-3.5 w-full animate-pulse rounded bg-bg2" />
                </div>
                <div className="h-4 w-1/2 animate-pulse rounded bg-bg2" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border border-line bg-bg2 p-8 text-center">
            <p className="font-heading text-base font-bold text-ink">
              Daftar modul gagal dimuat
            </p>
            <p className="max-w-md text-sm text-mute">
              Koneksi ke server katalog terputus. Periksa jaringan Anda lalu muat ulang daftar modul.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="btn-interactive mt-2 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-btn px-4 font-heading text-xs font-medium text-onred hover:bg-red2"
            >
              Muat Ulang Modul
            </button>
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border border-line bg-bg2 p-8 text-center">
            <p className="font-heading text-base font-bold text-ink">
              Belum ada modul yang cocok
            </p>
            <p className="max-w-md text-sm text-mute">
              Kombinasi filter atau kata kunci pencarian tidak menemukan modul. Coba hapus kata kunci atau tampilkan semua jalur.
            </p>
            <button
              type="button"
              onClick={() => {
                setExperience("Semua");
                setCategory("Semua");
                setSearch("");
              }}
              className="btn-interactive mt-2 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-btn px-4 font-heading text-xs font-medium text-onred hover:bg-red2"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={filterKey}
                initial={prefersReducedMotion ? false : "hidden"}
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: prefersReducedMotion ? 0 : 0.065,
                    },
                  },
                }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
              >
                {displayedRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.26,
                          ease: EASE_OUT_EXPO,
                        },
                      },
                    }}
                    className="h-full"
                  >
                    <RoomCard room={room} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {rooms.length > 8 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="btn-interactive inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line bg-card px-5 font-heading text-sm font-medium text-ink hover:border-red"
                >
                  {showAll
                    ? "Ringkas Daftar Modul"
                    : `Lihat Semua Modul (${rooms.length})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
