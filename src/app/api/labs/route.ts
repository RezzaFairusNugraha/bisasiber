import { NextRequest, NextResponse } from "next/server";

interface ActiveLabState {
  id: number;
  roomId: number;
  containerId: string;
  ipAddress: string;
  sshPort: number;
  webPort: number;
  status: "starting" | "running" | "stopped";
  startedAt: string;
  expiresAt: string;
}

let activeLab: ActiveLabState | null = {
  id: 501,
  roomId: 1,
  containerId: "bisa-lab-9f82c1d4",
  ipAddress: "10.10.24.88",
  sshPort: 2222,
  webPort: 8080,
  status: "running",
  startedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  expiresAt: new Date(Date.now() + 48 * 60 * 1000).toISOString(),
};

export async function GET() {
  return NextResponse.json({ lab: activeLab });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      action: "start" | "stop" | "reset";
      roomId?: number;
    };

    const roomId = body.roomId || 1;

    if (body.action === "stop") {
      activeLab = null;
      return NextResponse.json({
        lab: null,
        message: "Mesin lab berhasil dihentikan.",
      });
    }

    const randomOctet = Math.floor(Math.random() * 200) + 20;
    activeLab = {
      id: Math.floor(Math.random() * 900) + 100,
      roomId,
      containerId: `bisa-lab-${Math.random().toString(16).slice(2, 10)}`,
      ipAddress: `10.10.24.${randomOctet}`,
      sshPort: 2222,
      webPort: 8080,
      status: "running",
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    };

    return NextResponse.json({
      lab: activeLab,
      message:
        body.action === "reset"
          ? "Mesin lab berhasil diatur ulang dengan IP baru."
          : "Mesin lab interaktif berhasil dijalankan!",
    });
  } catch {
    return NextResponse.json(
      { message: "Gagal memproses aksi container lab." },
      { status: 500 }
    );
  }
}
