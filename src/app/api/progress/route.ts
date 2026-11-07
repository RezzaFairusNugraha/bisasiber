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
        {
          success: false,
          message:
            "Format Flag belum lengkap. Masukkan nilai BISA{...} dari terminal lalu klik Kirim Flag.",
        },
        { status: 400 }
      );
    }

    const task = INITIAL_TASKS.find((t) => t.id === taskId);
    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Tugas tidak ditemukan. Muat ulang halaman lab lalu kirim ulang Flag Anda.",
        },
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
            "Flag belum cocok. Periksa kembali penulisan BISA{...} pada output terminal atau buka Petunjuk.",
        },
        { status: 200 }
      );
    }

    completedTaskIds.add(taskId);

    return NextResponse.json({
      success: true,
      message: `Flag valid! Tugas selesai dan akun Anda menerima +${task.points} XP.`,
      completedTaskIds: Array.from(completedTaskIds),
      pointsEarned: task.points,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Server gagal memvalidasi Flag. Periksa koneksi jaringan Anda lalu coba kirim sekali lagi.",
      },
      { status: 500 }
    );
  }
}
