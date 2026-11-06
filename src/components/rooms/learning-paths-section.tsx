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
  const prefersReducedMotion = useReducedMotion();

  const { data, isLoading } = useRooms({
    experience,
    category,
    search,
  });

  const rooms = data?.rooms ?? [];
  const filterKey = `${experience}__${category}__${search}`;

  return (
    <section
      id="jalur-belajar"
      className="mx-auto flex max-w-[1296px] flex-col gap-5 px-5 py-12 md:py-20"
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="font-heading text-[28px] font-medium leading-10 text-ink sm:text-4xl">
          Mulai dari level Anda saat ini
          <br className="hidden sm:block" /> menuju peran siber impian Anda
        </h2>
        <p className="mt-2 max-w-[640px] text-base text-mute">
          Pilih jalur pembelajaran terstruktur yang dirancang bersama praktisi Red Team, Blue Team, dan Cloud Security.
        </p>
      </div>

      {/* Filter Tingkat Pengalaman & Pencarian */}
      <div className="flex flex-col items-center justify-between gap-4 pt-3 lg:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {EXPERIENCE_FILTERS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setExperience(level)}
              className={`btn-interactive cursor-pointer rounded-full px-5 py-1.5 text-sm sm:text-base transition-colors ${
                experience === level
                  ? "bg-btn font-semibold text-onred shadow-xs"
                  : "bg-bg2 text-ink hover:bg-redsoft"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <IconSearch
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari modul atau topik siber..."
            aria-label="Cari modul atau topik siber"
            className="h-10 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm text-ink placeholder:text-mute focus:border-btn focus:outline-none"
          />
        </div>
      </div>

      {/* Kontainer Kategori & Daftar Kartu Room */}
      <div className="flex flex-col gap-6 overflow-hidden rounded-[20px] bg-bg2 p-4 md:flex-row md:gap-8 md:p-6">
        <div
          role="tablist"
          aria-label="Filter Spesialisasi Peran"
          className="flex shrink-0 flex-row flex-wrap gap-2 md:w-[220px] md:flex-col md:py-2"
        >
          {TOPIC_FILTERS.map((topic) => (
            <button
              key={topic}
              type="button"
              role="tab"
              aria-selected={category === topic}
              onClick={() => setCategory(topic)}
              className={`cursor-pointer rounded-lg px-3.5 py-2 text-left text-base transition-colors ${
                category === topic
                  ? "bg-btn font-semibold text-onred shadow-2xs"
                  : "text-ink hover:bg-redsoft"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="min-w-0 flex-1 rounded-2xl bg-bg p-4 sm:p-5">
          {isLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((skeleton) => (
                <div
                  key={skeleton}
                  className="h-[345px] w-[256px] shrink-0 animate-pulse rounded-[12px] bg-bg2"
                />
              ))}
            </div>
          ) : rooms.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 text-center">
              <p className="font-heading text-lg font-medium text-ink">
                Tidak ada modul yang cocok dengan filter Anda
              </p>
              <button
                type="button"
                onClick={() => {
                  setExperience("Semua");
                  setCategory("Semua");
                  setSearch("");
                }}
                className="btn-interactive cursor-pointer rounded-md bg-btn px-4 py-1.5 font-heading text-sm font-medium text-onred hover:bg-red2"
              >
                Atur Ulang Filter
              </button>
            </div>
          ) : (
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
                className="flex snap-x gap-4 overflow-x-auto pb-3"
              >
                {rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.28, ease: "easeOut" },
                      },
                    }}
                    className="shrink-0 snap-start"
                  >
                    <RoomCard room={room} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
