import Image from "next/image";
import Link from "next/link";
import { IconBolt, IconClock } from "@tabler/icons-react";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import type { RoomCatalogItem } from "@/lib/mock-data";

function getTrackBadge(category: string): {
  label: string;
  color: string;
  bg: string;
  border: string;
} {
  if (category === "Penetration Tester") {
    return {
      label: "Red Team",
      color: "var(--accent-danger)",
      bg: "rgba(244, 63, 94, 0.14)",
      border: "rgba(244, 63, 94, 0.35)",
    };
  }
  if (category === "Security Analyst") {
    return {
      label: "Blue Team",
      color: "var(--accent-info)",
      bg: "rgba(56, 189, 248, 0.14)",
      border: "rgba(56, 189, 248, 0.35)",
    };
  }
  return {
    label: "Purple Team",
    color: "var(--accent-primary)",
    bg: "rgba(139, 92, 246, 0.16)",
    border: "rgba(139, 92, 246, 0.38)",
  };
}

export function RoomCard({ room }: { room: RoomCatalogItem }) {
  const track = getTrackBadge(room.category);
  const simulatedProgress = room.id === 1 ? 33 : room.id <= 3 ? 20 : 0;

  return (
    <article className="card-interactive group flex h-full w-full min-w-0 flex-col justify-between rounded-[16px] border border-line bg-card p-5">
      <div className="flex min-w-0 flex-col gap-3.5">
        {/* Cover Image with Twilight Violet Gradient Overlay & Track/Difficulty Badges (DESIGN.md Section 5.1) */}
        <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl border border-line bg-bg2">
          <Image
            src={room.coverImageUrl}
            alt={`Sampul modul ${room.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-103"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D17]/80 via-[#0B0D17]/20 to-transparent"
          />

          <div className="absolute left-2.5 right-2.5 top-2.5 flex items-center justify-between gap-2">
            <span
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-heading text-[11px] font-semibold backdrop-blur-md"
              style={{
                color: track.color,
                backgroundColor: track.bg,
                borderColor: track.border,
              }}
            >
              {track.label}
            </span>

            {room.isNew && (
              <span className="rounded-full bg-btn px-2.5 py-0.5 font-heading text-[11px] font-semibold text-onred">
                Baru
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <DifficultyBadge level={room.difficulty} />
          <span className="truncate rounded-full border border-line bg-bg2 px-2.5 py-0.5 font-medium text-mute">
            {room.category}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="font-heading text-[18px] font-semibold leading-[24px] text-ink transition-colors group-hover:text-btn">
            {room.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-[22px] text-mute">
            {room.subtitle}
          </p>
        </div>
      </div>

      {/* Footer with Duration, Violet XP Reward & Thin Progress Bar (DESIGN.md Section 5.1) */}
      <div className="mt-5 flex flex-col gap-3 border-t border-line pt-3.5">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg2">
          <div
            className="h-full rounded-full"
            style={{
              width: `${simulatedProgress}%`,
              background:
                "linear-gradient(90deg, var(--accent-primary), var(--accent-mint))",
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs text-mute">
          <div className="flex items-center gap-3 tabular-nums">
            <span className="inline-flex items-center gap-1">
              <IconClock size={14} stroke={1.8} />
              {room.estimatedMinutes} Menit
            </span>
            <strong className="inline-flex items-center gap-0.5 font-heading font-semibold text-btn">
              <IconBolt size={14} stroke={2} />+{room.pointsReward} XP
            </strong>
          </div>
          <Link
            href={`/lab?room=${room.slug}`}
            className="inline-flex min-h-11 items-center px-1 font-heading text-xs font-semibold text-ink transition-colors group-hover:text-btn"
          >
            Mulai →
          </Link>
        </div>
      </div>
    </article>
  );
}
