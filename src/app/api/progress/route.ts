import { NextRequest, NextResponse } from "next/server";
import { INITIAL_TASKS } from "@/lib/mock-data";

// In-memory store for demo persistence alongside Neon DB schema
const completedTaskIds = new Set<number>([101]);

export async function GET() {
  return NextResponse.json({
    user: {
      id: 1,
      username: "siber_pejuang",
      fullName: "Pratama Siber",
      rankTitle: "Cyber Defender Lv. 4",
      points: 450 + (completedTaskIds.size - 1) * 40,
      streakDays: 7,
      completedRooms: 3,
      activeRooms: 4,
    },
    completedTaskIds: Array.from(completedTaskIds),
    tasks: INITIAL_TASKS,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      taskId?: number;
      flag?: string;
    };

    const { taskId, flag } = body;
    if (!taskId || !flag) {
      return NextResponse.json(
        { success: false, message: "ID tugas dan flag wajib diisi." },
        { status: 400 }
      );
    }

    const task = INITIAL_TASKS.find((t) => t.id === taskId);
    if (!task) {
      return NextResponse.json(
        { success: false, message: "Tugas tidak ditemukan." },
        { status: 404 }
      );
    }

    const isCorrect =
      flag.trim().toLowerCase() === task.expectedFlag.toLowerCase();

    if (!isCorrect) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Flag belum tepat. Periksa kembali petunjuk atau output terminal Anda.",
        },
        { status: 200 }
      );
    }

    completedTaskIds.add(taskId);

    return NextResponse.json({
      success: true,
      message: `Selamat! Flag benar (+${task.points} Poin Siber).`,
      completedTaskIds: Array.from(completedTaskIds),
      pointsEarned: task.points,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memvalidasi flag." },
      { status: 500 }
    );
  }
}
