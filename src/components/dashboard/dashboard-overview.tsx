"use client";

import Link from "next/link";
import { RoomCard } from "@/components/rooms/room-card";
import { Button } from "@/components/ui/button";
import { useRooms } from "@/hooks/use-rooms";
import { useUserProgress } from "@/hooks/use-user-progress";

const LEADERBOARD = [
  { rank: 1, name: "Rizky Exploit", role: "Red Team Lead", points: 2890 },
  { rank: 2, name: "Nadia Forensik", role: "SOC Analyst", points: 2540 },
  { rank: 3, name: "Bima CloudSec", role: "Security Engineer", points: 2190 },
  {
    rank: 4,
    name: "Pratama Siber (Anda)",
    role: "Cyber Defender Lv. 4",
    points: 450,
    isCurrentUser: true,
  },
];

export function DashboardOverview() {
  const { data: progressData } = useUserProgress();
  const { data: roomsData, isLoading: isRoomsLoading } = useRooms();

  const user = progressData?.user;
  const completedTasksCount = progressData?.completedTaskIds.length ?? 1;
  const totalTasksCount = progressData?.tasks.length ?? 3;
  const recommendedRooms = (roomsData?.rooms ?? []).slice(0, 4);
  const progressPercent = Math.round(
    (completedTasksCount / Math.max(totalTasksCount, 1)) * 100
  );

  return (
    <div className="mx-auto flex w-full max-w-[1120px] min-w-0 flex-1 flex-col gap-10 p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <h1 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Halo, {user?.fullName ?? "Pratama Siber"}
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-mute">
            Progres modul aktif: <strong className="tabular-nums font-semibold text-ink">{completedTasksCount} dari {totalTasksCount} Flag</strong> berhasil diverifikasi ({progressPercent}%).
          </p>
        </div>
        <Button variant="primary" href="/lab">
          Lanjutkan Lab Aktif
        </Button>
      </div>

      {/* Ringkasan Statistik dengan Aksen Merah Terukur */}
      <div className="grid grid-cols-2 gap-6 rounded-xl border border-line bg-bg2 p-6 lg:grid-cols-4">
        <div className="min-w-0">
          <span className="text-xs font-medium text-mute">Total Poin Siber</span>
          <p className="tabular-nums mt-1 font-heading text-2xl font-extrabold text-btn sm:text-3xl">
            {user?.points ?? 450} XP
          </p>
        </div>
        <div className="min-w-0 lg:border-l lg:border-line lg:pl-6">
          <span className="text-xs font-medium text-mute">Rentetan Latihan</span>
          <p className="tabular-nums mt-1 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            {user?.streakDays ?? 7} Hari
          </p>
        </div>
        <div className="min-w-0 lg:border-l lg:border-line lg:pl-6">
          <span className="text-xs font-medium text-mute">Modul Tuntas</span>
          <p className="tabular-nums mt-1 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            {user?.completedRooms ?? 3} Modul
          </p>
        </div>
        <div className="min-w-0 lg:border-l lg:border-line lg:pl-6">
          <span className="text-xs font-medium text-mute">Pangkat Saat Ini</span>
          <p className="mt-1.5 truncate font-heading text-base font-bold text-ink sm:text-lg">
            {user?.rankTitle ?? "Cyber Defender Lv. 4"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-4 xl:col-span-8">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-heading text-lg font-extrabold text-ink">
              Modul Lanjutan untuk Anda
            </h2>
            <Link
              href="/#jalur-belajar"
              className="inline-flex min-h-11 items-center px-2 font-heading text-xs font-semibold text-btn hover:underline"
            >
              Lihat Katalog →
            </Link>
          </div>
          {isRoomsLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((skeleton) => (
                <div
                  key={skeleton}
                  className="h-[300px] w-full animate-pulse rounded-xl border border-line bg-card p-5"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {recommendedRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </div>

        <div
          id="peringkat"
          className="flex min-w-0 flex-col gap-4 rounded-xl border border-line bg-card p-5 xl:col-span-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-extrabold text-ink">
              Papan Peringkat Mingguan
            </h2>
            <span className="font-mono text-[11px] text-mute">WIB</span>
          </div>
          <ul className="divide-y divide-line">
            {LEADERBOARD.map((entry) => (
              <li
                key={entry.rank}
                className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`tabular-nums font-mono text-xs font-bold ${
                      entry.isCurrentUser ? "text-btn" : "text-mute"
                    }`}
                  >
                    #{entry.rank}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`truncate font-heading text-sm ${
                        entry.isCurrentUser
                          ? "font-bold text-btn"
                          : "font-medium text-ink"
                      }`}
                    >
                      {entry.name}
                    </p>
                    <p className="truncate text-xs text-mute">{entry.role}</p>
                  </div>
                </div>
                <span className="tabular-nums shrink-0 font-heading text-xs font-bold text-ink">
                  {entry.points.toLocaleString("id-ID")} XP
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
