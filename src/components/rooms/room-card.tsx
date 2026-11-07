import Image from "next/image";
import Link from "next/link";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import type { RoomCatalogItem } from "@/lib/mock-data";

export function RoomCard({ room }: { room: RoomCatalogItem }) {
  return (
    <article className="card-interactive group flex h-full w-full flex-col justify-between rounded-xl border border-line bg-card p-4">
      <div className="flex flex-col gap-3.5">
        <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-lg bg-bg2">
          <Image
            src={room.coverImageUrl}
            alt={`Sampul jalur belajar ${room.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-102"
          />
          {room.isNew && (
            <span className="absolute left-2.5 top-2.5 rounded bg-btn px-2 py-0.5 font-heading text-[11px] font-medium text-onred">
              Baru
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 text-xs text-mute">
          <DifficultyBadge level={room.difficulty} />
          <span>{room.category}</span>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold leading-snug text-ink group-hover:text-btn">
            {room.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mute">
            {room.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs text-mute">
        <span className="tabular-nums">{room.estimatedMinutes} menit</span>
        <Link
          href={`/lab?room=${room.slug}`}
          className="font-heading font-semibold text-ink transition-colors group-hover:text-btn"
        >
          Mulai Modul →
        </Link>
      </div>
    </article>
  );
}
