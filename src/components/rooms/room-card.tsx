import Image from "next/image";
import Link from "next/link";
import { IconClock, IconUsers } from "@tabler/icons-react";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import type { RoomCatalogItem } from "@/lib/mock-data";

export function RoomCard({ room }: { room: RoomCatalogItem }) {
  return (
    <article className="group flex min-h-[345px] w-[256px] shrink-0 snap-start flex-col justify-between gap-4 overflow-hidden rounded-[12px] border border-[#EEEFF2] bg-white p-4 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#A3EA2A] hover:shadow-md">
      <div className="flex flex-col gap-3.5">
        <div className="relative h-[136px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#151C2B]">
          <Image
            src={room.coverImageUrl}
            alt={`Sampul jalur belajar ${room.title}`}
            fill
            sizes="256px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {room.isNew && (
            <span className="absolute left-3 top-3 rounded-[8px] bg-gradient-to-r from-[#A3EA2A] to-[#3BC81E] px-2.5 py-1 font-heading text-[11px] font-bold uppercase leading-none text-[#151C2B] shadow-xs">
              Baru 2026
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <DifficultyBadge level={room.difficulty} />
          <span className="rounded-md bg-[#F9F9FB] px-2 py-0.5 text-[11px] font-medium text-[#525A6A]">
            {room.category}
          </span>
        </div>

        <div>
          <h3 className="font-heading text-base font-semibold leading-[22px] text-[#151C2B] group-hover:text-[#1153E4]">
            {room.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#525A6A]">
            {room.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#EEEFF2] pt-3">
        <div className="flex items-center justify-between text-xs text-[#525A6A]">
          <span className="inline-flex items-center gap-1">
            <IconClock size={14} />
            {room.estimatedMinutes} mnt
          </span>
          <span className="inline-flex items-center gap-1">
            <IconUsers size={14} />
            {room.enrolledCount.toLocaleString("id-ID")}
          </span>
        </div>

        <Link
          href={`/lab?room=${room.slug}`}
          className="inline-flex h-8 w-full items-center justify-center rounded-[5px] border border-[#A3EA2A] bg-[#A3EA2A] px-3 font-heading text-sm font-medium text-[#151C2B] transition-colors hover:bg-[#b5f04f]"
        >
          Mulai Jalur Belajar
        </Link>
      </div>
    </article>
  );
}
