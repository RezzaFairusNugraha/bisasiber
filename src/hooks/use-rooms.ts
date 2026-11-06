"use client";

import { useQuery } from "@tanstack/react-query";
import {
  INITIAL_ROOMS,
  type Difficulty,
  type RoomCatalogItem,
} from "@/lib/mock-data";

export interface UseRoomsParams {
  experience?: string;
  category?: string;
  difficulty?: Difficulty | null;
  search?: string;
}

interface RoomsApiResponse {
  rooms: RoomCatalogItem[];
  total: number;
}

export function useRooms(params: UseRoomsParams = {}) {
  const {
    experience = "Semua",
    category = "Semua",
    difficulty = null,
    search = "",
  } = params;

  return useQuery<RoomsApiResponse>({
    queryKey: ["rooms", { experience, category, difficulty, search }],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (experience) searchParams.set("experience", experience);
      if (category) searchParams.set("category", category);
      if (difficulty) searchParams.set("difficulty", difficulty);
      if (search) searchParams.set("search", search);

      const res = await fetch(`/api/rooms?${searchParams.toString()}`);
      if (!res.ok) {
        throw new Error("Gagal memuat daftar modul pembelajaran");
      }
      return res.json() as Promise<RoomsApiResponse>;
    },
    initialData: () => {
      const normalizedSearch = search.trim().toLowerCase();
      const filtered = INITIAL_ROOMS.filter((room) => {
        if (experience !== "Semua" && room.experienceLevel !== experience) {
          return false;
        }
        if (category !== "Semua" && room.category !== category) {
          return false;
        }
        if (difficulty && room.difficulty !== difficulty) {
          return false;
        }
        if (
          normalizedSearch &&
          !room.title.toLowerCase().includes(normalizedSearch) &&
          !room.subtitle.toLowerCase().includes(normalizedSearch) &&
          !room.category.toLowerCase().includes(normalizedSearch)
        ) {
          return false;
        }
        return true;
      });
      return { rooms: filtered, total: filtered.length };
    },
  });
}
