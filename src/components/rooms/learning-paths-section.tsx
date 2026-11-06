"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  IconAdjustmentsHorizontal,
  IconCompass,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";
import { RoomCard } from "@/components/rooms/room-card";
import { useRooms } from "@/hooks/use-rooms";
import { EXPERIENCE_FILTERS, TOPIC_FILTERS } from "@/lib/mock-data";

export function LearningPathsSection() {
  const [experience, setExperience] = useState<string>("Semua");
  const [category, setCategory] = useState<string>("Semua");
  const [search, setSearch] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  const { data, isLoading } = useRooms({
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
      className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-16 md:py-24"
    >
      {/* Header Eksplorasi Kurikulum (Bento Asymmetric Header) */}
      <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-redsoft px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-btn">
            <IconCompass size={15} />
            Kurikulum Terstruktur &amp; Praktis
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Eksplorasi Jalur Karier &amp; Modul Lab Siber
          </h2>
          <p className="mt-2.5 text-base leading-relaxed text-mute">
            Dirancang khusus untuk kebutuhan industri keamanan siber Indonesia—mulai dari dasar jaringan hingga operasi Red Team dan pengamanan AI.
          </p>
        </div>

        {/* Search Input & Counter */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <IconSearch
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari modul, CVE, atau topik..."
              aria-label="Cari modul atau topik siber"
              className="h-11 w-full rounded-xl border border-line bg-card pl-11 pr-4 text-sm text-ink shadow-2xs placeholder:text-mute focus:border-btn focus:outline-none"
            />
          </div>
          <div className="hidden items-center gap-1.5 rounded-xl border border-line bg-bg2 px-3.5 py-2.5 font-mono text-xs font-semibold text-ink sm:inline-flex">
            <IconSparkles size={15} className="text-btn" />
            <span>{rooms.length} Modul</span>
          </div>
        </div>
      </div>

      {/* Unified Dual-Control Filter Bar (Berbeda dari layout sidebar TryHackMe) */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-line bg-bg2 p-4 lg:flex-row lg:items-center">
        {/* Spesialisasi Peran */}
        <div
          role="tablist"
          aria-label="Filter Spesialisasi Peran"
          className="flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mute">
            <IconAdjustmentsHorizontal size={15} className="text-btn" />
            Peran:
          </span>
          {TOPIC_FILTERS.map((topic) => (
            <button
              key={topic}
              type="button"
              role="tab"
              aria-selected={category === topic}
              onClick={() => setCategory(topic)}
              className={`btn-interactive cursor-pointer rounded-xl px-3.5 py-2 font-heading text-xs sm:text-sm transition-colors ${
                category === topic
                  ? "bg-btn font-semibold text-onred shadow-xs"
                  : "border border-line bg-card text-ink hover:bg-redsoft"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Tingkat Pengalaman */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-line pt-3 lg:border-t-0 lg:pt-0">
          {EXPERIENCE_FILTERS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setExperience(level)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                experience === level
                  ? "bg-ink text-bg font-semibold"
                  : "text-mute hover:bg-redsoft hover:text-ink"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Bento Card Grid (Bukan horizontal carousel sempit) */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
              <div
                key={skeleton}
                className="h-[360px] w-full animate-pulse rounded-2xl bg-bg2"
              />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-bg2 p-8 text-center">
            <p className="font-heading text-lg font-semibold text-ink">
              Tidak ada modul yang cocok dengan filter pencarian Anda
            </p>
            <p className="max-w-md text-sm text-mute">
              Coba gunakan kata kunci lain atau kembalikan filter peran dan tingkat pengalaman ke posisi awal.
            </p>
            <button
              type="button"
              onClick={() => {
                setExperience("Semua");
                setCategory("Semua");
                setSearch("");
              }}
              className="btn-interactive mt-2 cursor-pointer rounded-lg bg-btn px-4 py-2 font-heading text-sm font-medium text-onred hover:bg-red2"
            >
              Atur Ulang Semua Filter
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
                      staggerChildren: prefersReducedMotion ? 0 : 0.08,
                    },
                  },
                }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {displayedRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.28, ease: "easeOut" },
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
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="btn-interactive cursor-pointer rounded-xl border border-line bg-card px-6 py-2.5 font-heading text-sm font-semibold text-ink hover:border-red hover:bg-redsoft"
                >
                  {showAll
                    ? "Tampilkan Lebih Sedikit"
                    : `Lihat Seluruh ${rooms.length} Modul Lab`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
