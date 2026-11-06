import Image from "next/image";
import Link from "next/link";
import { IconClock, IconUsers } from "@tabler/icons-react";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import type { RoomCatalogItem } from "@/lib/mock-data";

export function RoomCard({ room }: { room: RoomCatalogItem }) {
  return (
    <article className="card-interactive group flex min-h-[345px] w-[256px] shrink-0 snap-start flex-col justify-between gap-4 overflow-hidden rounded-[12px] border border-line bg-card p-4 shadow-2xs">
      <div className="flex flex-col gap-3.5">
        <div className="relative h-[136px] w-full shrink-0 overflow-hidden rounded-[10px] bg-bg2">
          <Image
            src={room.coverImageUrl}
            alt={`Sampul jalur belajar ${room.title}`}
            fill
            sizes="256px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {room.isNew && (
            <span className="absolute left-3 top-3 rounded-[8px] bg-btn px-2.5 py-1 font-heading text-[11px] font-bold uppercase leading-none text-onred shadow-xs">
              Baru 2026
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <DifficultyBadge level={room.difficulty} />
          <span className="rounded-md bg-bg2 px-2 py-0.5 text-[11px] font-medium text-mute">
            {room.category}
          </span>
        </div>

        <div>
          <h3 className="font-heading text-base font-semibold leading-[22px] text-ink group-hover:text-btn">
            {room.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mute">
            {room.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-3">
        <div className="flex items-center justify-between text-xs text-mute">
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
          className="btn-interactive inline-flex h-8 w-full items-center justify-center rounded-[5px] border border-btn bg-btn px-3 font-heading text-sm font-medium text-onred hover:border-red2 hover:bg-red2"
        >
          Mulai Jalur Belajar
        </Link>
      </div>
    </article>
  );
}
