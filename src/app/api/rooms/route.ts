import { NextRequest, NextResponse } from "next/server";
import { INITIAL_ROOMS, type Difficulty } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const experience = searchParams.get("experience") || "Semua";
  const category = searchParams.get("category") || "Semua";
  const difficulty = searchParams.get("difficulty") as Difficulty | null;
  const search = (searchParams.get("search") || "").trim().toLowerCase();

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
      search &&
      !room.title.toLowerCase().includes(search) &&
      !room.subtitle.toLowerCase().includes(search) &&
      !room.category.toLowerCase().includes(search)
    ) {
      return false;
    }
    return true;
  });

  return NextResponse.json({
    rooms: filtered,
    total: filtered.length,
  });
}
