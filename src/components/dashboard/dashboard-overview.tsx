"use client";

import Link from "next/link";
import {
  IconAward,
  IconBolt,
  IconCheck,
  IconFlame,
  IconShieldCheck,
  IconTerminal2,
  IconTrophy,
} from "@tabler/icons-react";
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
    <div className="flex flex-1 flex-col gap-8 p-5 sm:p-8 lg:p-10">
      {/* Banner Sambutan */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-line bg-bg2 p-6 text-ink sm:flex-row sm:items-center sm:p-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-redsoft px-3 py-1 font-heading text-xs font-semibold text-btn">
            <IconBolt size={14} />
            Status Pembelajaran Aktif
          </span>
          <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
            Selamat datang kembali, {user?.fullName ?? "Pratama Siber"}!
          </h1>
          <p className="mt-1 text-sm text-mute sm:text-base">
            Anda telah menyelesaikan {completedTasksCount} dari {totalTasksCount} tantangan pada modul aktif minggu ini.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" href="/lab">
            <IconTerminal2 size={18} />
            <span>Lanjutkan Lab Siber</span>
          </Button>
        </div>
      </div>

      {/* Kartu Metrik Utama */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card-interactive rounded-xl border border-line bg-card p-5">
          <div className="flex items-center justify-between text-mute">
            <span className="text-sm font-medium">Total Poin Siber</span>
            <IconTrophy size={20} className="text-mid" />
          </div>
          <p className="mt-2 font-heading text-3xl font-bold text-ink">
            {user?.points ?? 450} XP
          </p>
          <p className="mt-1 text-xs text-ok">
            +75 XP dari tantangan terakhir
          </p>
        </div>

        <div className="card-interactive rounded-xl border border-line bg-card p-5">
          <div className="flex items-center justify-between text-mute">
            <span className="text-sm font-medium">Rentetan Belajar</span>
            <IconFlame size={20} className="text-hard" />
          </div>
          <p className="mt-2 font-heading text-3xl font-bold text-ink">
            {user?.streakDays ?? 7} Hari
          </p>
          <p className="mt-1 text-xs text-mute">
            Pertahankan konsistensi harian Anda
          </p>
        </div>

        <div className="card-interactive rounded-xl border border-line bg-card p-5">
          <div className="flex items-center justify-between text-mute">
            <span className="text-sm font-medium">Room Diselesaikan</span>
            <IconCheck size={20} className="text-ok" />
          </div>
          <p className="mt-2 font-heading text-3xl font-bold text-ink">
            {user?.completedRooms ?? 3} Modul
          </p>
          <p className="mt-1 text-xs text-mute">
            {user?.activeRooms ?? 4} jalur sedang berjalan
          </p>
        </div>

        <div className="card-interactive rounded-xl border border-line bg-card p-5">
          <div className="flex items-center justify-between text-mute">
            <span className="text-sm font-medium">Peringkat Saat Ini</span>
            <IconAward size={20} className="text-btn" />
          </div>
          <p className="mt-2 font-heading text-xl font-bold text-ink">
            {user?.rankTitle ?? "Cyber Defender Lv. 4"}
          </p>
          <p className="mt-1 text-xs text-btn">
            Top 5% Pembelajar Minggu Ini
          </p>
        </div>
      </div>

      {/* Rekomendasi Room & Papan Peringkat */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="flex flex-col gap-4 xl:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-ink">
              Rekomendasi Jalur & Modul Siber
            </h2>
            <Link
              href="/#jalur-belajar"
              className="font-heading text-sm font-medium text-btn hover:underline"
            >
              Lihat Semua (14)
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {recommendedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>

        <div
          id="peringkat"
          className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6 xl:col-span-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-ink">
              Papan Peringkat Nasional
            </h2>
            <span className="rounded-full bg-redsoft px-2.5 py-1 text-xs font-semibold text-ok">
              Minggu Ini
            </span>
          </div>
          <ul className="flex flex-col gap-3">
            {LEADERBOARD.map((entry) => (
              <li
                key={entry.rank}
                className={`flex items-center justify-between rounded-xl p-3 ${
                  entry.isCurrentUser
                    ? "border border-btn bg-redsoft"
                    : "bg-bg2"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-btn font-heading text-xs font-bold text-onred">
                    #{entry.rank}
                  </span>
                  <div>
                    <p className="font-heading text-sm font-semibold text-ink">
                      {entry.name}
                    </p>
                    <p className="text-xs text-mute">{entry.role}</p>
                  </div>
                </div>
                <span className="font-heading text-sm font-bold text-ink">
                  {entry.points} XP
                </span>
              </li>
            ))}
          </ul>

          <div
            id="sertifikasi"
            className="mt-2 rounded-xl border border-line bg-bg2 p-4 text-ink"
          >
            <div className="flex items-center gap-2 text-btn">
              <IconShieldCheck size={20} />
              <span className="font-heading text-sm font-semibold">
                Sertifikasi Junior Pentester
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-mute">
              Selesaikan 2 modul lagi untuk membuka ujian praktik sertifikasi resmi BisaSiber.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
