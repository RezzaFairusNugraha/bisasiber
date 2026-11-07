"use client";

import Link from "next/link";
import { RoomCard } from "@/components/rooms/room-card";
import { Button } from "@/components/ui/button";
import { useRooms } from "@/hooks/use-rooms";
import { useUserProgress } from "@/hooks/use-user-progress";

const LEADERBOARD = [
  { rank: 1, name: "Rizky Exploit", role: "Red Team Lead", points: 2890 },
  { rank: 2, name: "Nadia Forensik", role: "SOC Analyst", points: 2540 },
  { rank: 3, name: "Bima CloudSec", role: "Cloud Architect", points: 2190 },
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
  const { data: roomsData } = useRooms();

  const user = progressData?.user;
  const completedTasksCount = progressData?.completedTaskIds.length ?? 1;
  const totalTasksCount = progressData?.tasks.length ?? 3;
  const recommendedRooms = (roomsData?.rooms ?? []).slice(0, 4);

  return (
    <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col gap-10 p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Halo, {user?.fullName ?? "Pratama Siber"}
          </h1>
          <p className="mt-1 text-sm text-mute">
            Anda telah menyelesaikan {completedTasksCount} dari {totalTasksCount} tugas pada modul aktif.
          </p>
        </div>
        <Button variant="primary" href="/lab">
          Lanjutkan Lab Aktif
        </Button>
      </div>

      {/* Ringkasan Statistik Tanpa Kotak Berlebihan */}
      <div className="grid grid-cols-2 gap-6 rounded-xl border border-line bg-bg2 p-6 lg:grid-cols-4">
        <div>
          <span className="text-xs text-mute">Total Poin Siber</span>
          <p className="tabular-nums mt-1 font-heading text-2xl font-bold text-ink">
            {user?.points ?? 450} XP
          </p>
        </div>
        <div>
          <span className="text-xs text-mute">Rentetan Belajar</span>
          <p className="tabular-nums mt-1 font-heading text-2xl font-bold text-ink">
            {user?.streakDays ?? 7} Hari
          </p>
        </div>
        <div>
          <span className="text-xs text-mute">Modul Selesai</span>
          <p className="tabular-nums mt-1 font-heading text-2xl font-bold text-ink">
            {user?.completedRooms ?? 3} Modul
          </p>
        </div>
        <div>
          <span className="text-xs text-mute">Peringkat</span>
          <p className="mt-1 font-heading text-lg font-bold text-ink">
            {user?.rankTitle ?? "Cyber Defender Lv. 4"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="flex flex-col gap-4 xl:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-ink">
              Modul Rekomendasi
            </h2>
            <Link
              href="/#jalur-belajar"
              className="font-heading text-xs font-medium text-btn hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recommendedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>

        <div
          id="peringkat"
          className="flex flex-col gap-4 rounded-xl border border-line bg-card p-5 xl:col-span-4"
        >
          <h2 className="font-heading text-base font-bold text-ink">
            Papan Peringkat
          </h2>
          <ul className="divide-y divide-line">
            {LEADERBOARD.map((entry) => (
              <li
                key={entry.rank}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span className="tabular-nums font-mono text-xs font-bold text-mute">
                    #{entry.rank}
                  </span>
                  <div>
                    <p
                      className={`font-heading text-sm font-medium ${
                        entry.isCurrentUser ? "text-btn font-bold" : "text-ink"
                      }`}
                    >
                      {entry.name}
                    </p>
                    <p className="text-xs text-mute">{entry.role}</p>
                  </div>
                </div>
                <span className="tabular-nums font-heading text-xs font-semibold text-ink">
                  {entry.points} XP
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
