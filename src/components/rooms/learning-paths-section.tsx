"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconSearch } from "@tabler/icons-react";
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
      className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-16 md:py-24"
    >
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-bold leading-tight text-ink sm:text-3xl">
            Kurikulum &amp; Modul Praktik
          </h2>
          <p className="mt-2 text-base leading-relaxed text-mute">
            Pilih jalur sesuai spesialisasi peran atau tingkat pengalaman Anda saat ini.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <IconSearch
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari modul..."
            aria-label="Cari modul atau topik siber"
            className="h-10 w-full rounded-lg border border-line bg-card pl-9 pr-3.5 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
          />
        </div>
      </div>

      {/* Minimal Filter Bar */}
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
              className={`cursor-pointer rounded-md px-3 py-1.5 font-heading text-xs sm:text-sm transition-colors ${
                category === topic
                  ? "bg-btn font-medium text-onred"
                  : "text-mute hover:bg-bg2 hover:text-ink"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {EXPERIENCE_FILTERS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setExperience(level)}
              className={`cursor-pointer rounded-md px-2.5 py-1 text-xs transition-colors ${
                experience === level
                  ? "bg-bg2 font-semibold text-ink"
                  : "text-mute hover:text-ink"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
              <div
                key={skeleton}
                className="h-[320px] w-full animate-pulse rounded-xl bg-bg2"
              />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border border-line bg-bg2 p-8 text-center">
            <p className="font-heading text-base font-semibold text-ink">
              Modul tidak ditemukan
            </p>
            <p className="max-w-sm text-sm text-mute">
              Tidak ada modul yang sesuai dengan filter yang dipilih.
            </p>
            <button
              type="button"
              onClick={() => {
                setExperience("Semua");
                setCategory("Semua");
                setSearch("");
              }}
              className="mt-2 cursor-pointer rounded-md bg-btn px-3.5 py-1.5 font-heading text-xs font-medium text-onred hover:bg-red2"
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
                      staggerChildren: prefersReducedMotion ? 0 : 0.05,
                    },
                  },
                }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
              >
                {displayedRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.2, ease: "easeOut" },
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
                  className="cursor-pointer rounded-lg border border-line bg-card px-5 py-2 font-heading text-sm font-medium text-ink hover:border-red"
                >
                  {showAll
                    ? "Tampilkan Lebih Sedikit"
                    : `Tampilkan Semua (${rooms.length} Modul)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
