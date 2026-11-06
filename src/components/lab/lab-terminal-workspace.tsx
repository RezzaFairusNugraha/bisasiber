"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCpu,
  IconFlag,
  IconHelpCircle,
  IconPlayerPlay,
  IconPlayerStop,
  IconRefresh,
  IconTerminal2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  useLabInstance,
  useManageLabInstance,
} from "@/hooks/use-lab-instance";
import {
  useSubmitFlag,
  useUserProgress,
} from "@/hooks/use-user-progress";

const PRESET_COMMANDS: Record<string, string[]> = {
  help: [
    "Perintah yang tersedia di Terminal Lab BisaSiber:",
    "  nmap       - Pindai port dan layanan pada IP target",
    "  ls -la     - Tampilkan seluruh file termasuk direktori tersembunyi",
    "  cat        - Baca isi file flag (.rahasia/flag.txt)",
    "  curl       - Inspeksi HTTP header pada layanan web target",
    "  whoami     - Tampilkan identitas pengguna saat ini",
    "  clear      - Bersihkan layar terminal",
  ],
  whoami: ["bisa_pentester@bisasiber-kali (uid=1000, grup=siber-redteam)"],
  "nmap -sV 10.10.24.88": [
    "Starting Nmap 7.95 ( https://nmap.org ) at 2026-11-06 WIB",
    "Nmap scan report for target.bisasiber.local (10.10.24.88)",
    "Host is up (0.014s latency).",
    "PORT     STATE SERVICE VERSION",
    "22/tcp   open  ssh     OpenSSH 9.6p1 Ubuntu (Banner: BISA{p0rt_ssh_22_aman})",
    "8080/tcp open  http    BisaSiber Vulnerable WebApp 1.4",
    "Service detection performed. Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds",
  ],
  "ls -la": [
    "total 24",
    "drwxr-xr-x 4 bisa bisa 4096 Nov  6 13:10 .",
    "drwxr-xr-x 3 root root 4096 Nov  1 08:00 ..",
    "-rw-r--r-- 1 bisa bisa  220 Nov  1 08:00 .bash_logout",
    "drwxr-x--- 2 bisa bisa 4096 Nov  6 13:12 .rahasia",
    "-rw-r--r-- 1 bisa bisa  118 Nov  6 13:00 README.txt",
  ],
  "cat .rahasia/flag.txt": [
    "Selamat! Anda menemukan catatan kredensial tersembunyi:",
    "FLAG: BISA{l1nux_f1l3_h1dd3n}",
  ],
  "curl -I http://10.10.24.88:8080/api/status": [
    "HTTP/1.1 200 OK",
    "Server: BisaSiber-Lab-Gateway/2.1",
    "Content-Type: application/json",
    "X-BisaSiber-Flag: BISA{http_h3ad3r_inspeksi}",
    "Date: Fri, 06 Nov 2026 07:00:00 GMT",
  ],
};

export function LabTerminalWorkspace() {
  const { data: labData, isLoading: isLabLoading } = useLabInstance();
  const manageLab = useManageLabInstance();
  const { data: progressData } = useUserProgress();
  const submitFlagMutation = useSubmitFlag();

  const [commandInput, setCommandInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "BisaSiber Cloud AttackBox v2.4 (Ubuntu 24.04 LTS x86_64)",
    "Ketik 'help' untuk daftar perintah atau gunakan tombol perintah cepat di bawah.",
  ]);
  const [flagInputs, setFlagInputs] = useState<Record<number, string>>({});
  const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});
  const [feedbackMap, setFeedbackMap] = useState<
    Record<number, { success: boolean; message: string }>
  >({});

  const lab = labData?.lab ?? null;
  const tasks = progressData?.tasks ?? [];
  const completedIds = progressData?.completedTaskIds ?? [];

  function runTerminalCommand(rawCmd: string) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === "clear") {
      setTerminalLines([]);
      setCommandInput("");
      return;
    }

    const matchedOutput = PRESET_COMMANDS[cmd] ?? [
      `bash: ${cmd}: perintah dieksekusi. Coba 'help', 'nmap -sV 10.10.24.88', 'ls -la', 'cat .rahasia/flag.txt', atau 'curl -I http://10.10.24.88:8080/api/status'.`,
    ];

    setTerminalLines((prev) => [
      ...prev,
      `bisa@attackbox:~$ ${cmd}`,
      ...matchedOutput,
    ]);
    setCommandInput("");
  }

  async function handleFlagSubmit(taskId: number, e: React.FormEvent) {
    e.preventDefault();
    const flagValue = flagInputs[taskId] ?? "";
    if (!flagValue.trim()) return;

    const result = await submitFlagMutation.mutateAsync({
      taskId,
      flag: flagValue,
    });

    setFeedbackMap((prev) => ({
      ...prev,
      [taskId]: { success: result.success, message: result.message },
    }));
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      {/* Kolom Kiri: Daftar Tugas & Submit Flag */}
      <div className="flex flex-col gap-5 xl:col-span-6">
        <div className="rounded-2xl border border-[#E2E6EE] bg-white p-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="rounded-md bg-[#A3EA2A]/25 px-2.5 py-1 font-heading text-xs font-semibold text-[#151C2B]">
                Room Aktif • Mudah
              </span>
              <h1 className="mt-2 font-heading text-2xl font-bold text-[#151C2B]">
                Keamanan Siber 101: Eksplorasi Jaringan & Linux
              </h1>
            </div>
            <div className="text-right">
              <span className="font-heading text-sm font-semibold text-[#26890C]">
                {completedIds.length} / {tasks.length} Tugas Selesai
              </span>
              <div className="mt-1.5 h-2 w-36 overflow-hidden rounded-full bg-[#EEEFF2]">
                <div
                  className="h-full bg-[#A3EA2A] transition-all"
                  style={{
                    width: `${
                      tasks.length
                        ? Math.round((completedIds.length / tasks.length) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#525A6A]">
            Gunakan AttackBox di sebelah kanan untuk memindai layanan target, mencari file tersembunyi, dan mengumpulkan seluruh flag BISA&#123;...&#125;.
          </p>
        </div>

        {tasks.map((task) => {
          const isCompleted = completedIds.includes(task.id);
          const feedback = feedbackMap[task.id];

          return (
            <article
              key={task.id}
              className={`rounded-2xl border bg-white p-6 transition-all ${
                isCompleted
                  ? "border-[#26890C]/40 bg-[#F8FDEE]/60"
                  : "border-[#E2E6EE]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-heading text-xs font-bold ${
                      isCompleted
                        ? "bg-[#26890C] text-white"
                        : "bg-[#151C2B] text-[#A3EA2A]"
                    }`}
                  >
                    {isCompleted ? <IconCheck size={15} /> : task.orderIndex}
                  </span>
                  <h2 className="font-heading text-lg font-semibold text-[#151C2B]">
                    {task.title}
                  </h2>
                </div>
                <span className="shrink-0 rounded-full bg-[#EEEFF2] px-3 py-1 font-heading text-xs font-medium text-[#151C2B]">
                  +{task.points} XP
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[#525A6A]">
                {task.contentMarkdown}
              </p>

              <div className="mt-4 rounded-xl bg-[#F9F9FB] p-4">
                <p className="font-heading text-sm font-medium text-[#151C2B]">
                  {task.question}
                </p>

                <form
                  onSubmit={(e) => handleFlagSubmit(task.id, e)}
                  className="mt-3 flex flex-col gap-2.5 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <IconFlag
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#727C92]"
                    />
                    <input
                      type="text"
                      value={
                        flagInputs[task.id] ??
                        (isCompleted ? task.expectedFlag : "")
                      }
                      onChange={(e) =>
                        setFlagInputs((prev) => ({
                          ...prev,
                          [task.id]: e.target.value,
                        }))
                      }
                      disabled={isCompleted}
                      placeholder="BISA{...}"
                      aria-label={`Jawaban flag untuk ${task.title}`}
                      className="h-10 w-full rounded-lg border border-[#D7DBE3] bg-white pl-9 pr-3 font-mono text-sm text-[#151C2B] focus:border-[#1153E4] focus:outline-none disabled:bg-[#EEEFF2] disabled:text-[#26890C]"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isCompleted || submitFlagMutation.isPending}
                    className="h-10 shrink-0"
                  >
                    {isCompleted ? "Terverifikasi" : "Kirim Flag"}
                  </Button>
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleHints((prev) => ({
                        ...prev,
                        [task.id]: !prev[task.id],
                      }))
                    }
                    className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#D7DBE3] bg-white px-3 text-xs font-medium text-[#525A6A] hover:bg-[#EEEFF2]"
                  >
                    <IconHelpCircle size={16} />
                    <span>Petunjuk</span>
                  </button>
                </form>

                {visibleHints[task.id] && (
                  <p className="mt-2.5 rounded-lg border border-[#A3EA2A]/50 bg-[#F8FDEE] px-3 py-2 text-xs text-[#151C2B]">
                    <strong>Petunjuk:</strong> {task.hint}
                  </p>
                )}

                {feedback && (
                  <p
                    className={`mt-2.5 text-xs font-semibold ${
                      feedback.success ? "text-[#26890C]" : "text-[#EB0037]"
                    }`}
                  >
                    {feedback.message}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Kolom Kanan: Orkestrasi Mesin Lab Docker & Terminal Interaktif */}
      <div className="flex flex-col gap-5 xl:col-span-6">
        <div className="rounded-2xl border border-white/10 bg-[#151C2B] p-5 text-[#F9F9FB] shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A3EA2A]/15 text-[#A3EA2A]">
                <IconCpu size={22} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-base font-semibold text-white">
                    Orkestrasi Container Lab Docker
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      lab?.status === "running"
                        ? "bg-[#26890C]/30 text-[#A3EA2A]"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        lab?.status === "running"
                          ? "bg-[#A3EA2A]"
                          : "bg-white/40"
                      }`}
                    />
                    {isLabLoading
                      ? "Memuat..."
                      : lab?.status === "running"
                      ? "Aktif (Running)"
                      : "Nonaktif"}
                  </span>
                </div>
                <p className="text-xs text-white/65">
                  {lab
                    ? `Container ID: ${lab.containerId} • Target IP: ${lab.ipAddress}:${lab.webPort}`
                    : "Belum ada mesin target aktif. Nyalakan container untuk memulai."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!lab ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    manageLab.mutate({ action: "start", roomId: 1 })
                  }
                  disabled={manageLab.isPending}
                >
                  <IconPlayerPlay size={16} />
                  <span>Nyalakan Mesin</span>
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      manageLab.mutate({ action: "reset", roomId: 1 })
                    }
                    disabled={manageLab.isPending}
                  >
                    <IconRefresh size={15} />
                    <span>Reset IP</span>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      manageLab.mutate({ action: "stop", roomId: 1 })
                    }
                    disabled={manageLab.isPending}
                  >
                    <IconPlayerStop size={15} />
                    <span>Matikan</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Shortcut Perintah Cepat */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-white/60">Perintah Cepat:</span>
            {[
              "nmap -sV 10.10.24.88",
              "ls -la",
              "cat .rahasia/flag.txt",
              "curl -I http://10.10.24.88:8080/api/status",
              "clear",
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => runTerminalCommand(preset)}
                className="cursor-pointer rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-xs text-[#A3EA2A] transition-colors hover:border-[#A3EA2A] hover:bg-white/10"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Layar Terminal */}
          <div className="mt-4 flex h-[380px] flex-col justify-between rounded-xl border border-white/10 bg-[#0D121C] p-4 font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <IconTerminal2 size={15} className="text-[#A3EA2A]" />
                <span>bisa@attackbox: ~ (SSH Terenkripsi)</span>
              </span>
              <span>Port {lab?.sshPort ?? 2222}</span>
            </div>

            <div className="my-3 flex-1 space-y-1.5 overflow-y-auto pr-1 text-[#EEEFF2]">
              {terminalLines.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith("bisa@attackbox")
                      ? "font-semibold text-[#A3EA2A]"
                      : line.includes("BISA{")
                      ? "font-bold text-[#4FF74F]"
                      : "text-[#EEEFF2]/90"
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                runTerminalCommand(commandInput);
              }}
              className="flex items-center gap-2 border-t border-white/10 pt-2.5"
            >
              <span className="font-semibold text-[#A3EA2A]">
                bisa@attackbox:~$
              </span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Ketik perintah Linux di sini..."
                aria-label="Input perintah terminal"
                className="flex-1 bg-transparent text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                className="cursor-pointer rounded bg-[#A3EA2A] px-2.5 py-1 font-heading text-xs font-semibold text-[#151C2B] hover:bg-[#b5f04f]"
              >
                Jalankan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
