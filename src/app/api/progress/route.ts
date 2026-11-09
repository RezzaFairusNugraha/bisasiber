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
      rankTitle: "SOC Specialist",
      points: 450 + (completedTaskIds.size - 1) * 40,
      streakDays: 12,
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
            "Hmm, kolom jawaban belum lengkap. Masukkan nilai BISA{...} lalu klik Periksa.",
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
            "Tugas tidak ditemukan. Muat ulang halaman lab lalu periksa kembali Flag kamu.",
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
            "Hmm, flag belum pas nih. Periksa kembali halaman web atau terminal di sebelah kanan, atau intip Petunjuk jika kamu merasa buntu.",
        },
        { status: 200 }
      );
    }

    completedTaskIds.add(taskId);

    return NextResponse.json({
      success: true,
      message: `Keren! Analisis kamu tepat. +${task.points} XP ditambahkan ke profilmu.`,
      completedTaskIds: Array.from(completedTaskIds),
      pointsEarned: task.points,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Koneksi ke server sempat terputus saat memeriksa Flag. Silakan klik Periksa sekali lagi.",
      },
      { status: 500 }
    );
  }
}
