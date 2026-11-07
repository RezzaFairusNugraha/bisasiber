"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  useLabInstance,
  useManageLabInstance,
} from "@/hooks/use-lab-instance";
import {
  useSubmitFlag,
  useUserProgress,
} from "@/hooks/use-user-progress";

const FIRST_TYPED_COMMAND = "nmap -sV 10.10.24.88";
const EASE_OUT_EXPO: [number, number, number, number] = [0.2, 0.9, 0.3, 1];

const PRESET_COMMANDS: Record<string, string[]> = {
  help: [
    "Perintah yang tersedia di AttackBox BisaSiber:",
    "  nmap       - Pindai port dan versi layanan pada IP target",
    "  ls -la     - Tampilkan seluruh berkas termasuk direktori tersembunyi",
    "  cat        - Baca isi berkas Flag (.rahasia/flag.txt)",
    "  curl       - Inspeksi HTTP header pada layanan web target",
    "  whoami     - Periksa identitas user dan grup saat ini",
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
    "Catatan kredensial internal ditemukan:",
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
  const { data: progressData, isLoading: isProgressLoading } =
    useUserProgress();
  const submitFlagMutation = useSubmitFlag();
  const prefersReducedMotion = useReducedMotion();

  const [commandInput, setCommandInput] = useState("");
  const [typedGreetingCmd, setTypedGreetingCmd] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "BisaSiber Cloud AttackBox v2.4 (Ubuntu 24.04 LTS x86_64)",
    "Ketik 'help' untuk daftar perintah atau klik pintasan perintah di atas terminal.",
  ]);
  const [flagInputs, setFlagInputs] = useState<Record<number, string>>({});
  const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});
  const [celebratedTaskId, setCelebratedTaskId] = useState<number | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<
    Record<number, { success: boolean; message: string }>
  >({});

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedGreetingCmd(FIRST_TYPED_COMMAND);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTypedGreetingCmd(FIRST_TYPED_COMMAND.slice(0, i));
      if (i >= FIRST_TYPED_COMMAND.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

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
      `bash: ${cmd}: perintah tidak dikenali di simulasi ini. Gunakan 'help', 'nmap -sV 10.10.24.88', 'ls -la', 'cat .rahasia/flag.txt', atau 'curl -I http://10.10.24.88:8080/api/status'.`,
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
    if (!flagValue.trim()) {
      setFeedbackMap((prev) => ({
        ...prev,
        [taskId]: {
          success: false,
          message:
            "Kolom Flag masih kosong. Salin Flag berformat BISA{...} dari hasil terminal lalu kirim kembali.",
        },
      }));
      return;
    }

    try {
      const result = await submitFlagMutation.mutateAsync({
        taskId,
        flag: flagValue,
      });

      setFeedbackMap((prev) => ({
        ...prev,
        [taskId]: { success: result.success, message: result.message },
      }));

      if (result.success) {
        setCelebratedTaskId(taskId);
      }
    } catch {
      setFeedbackMap((prev) => ({
        ...prev,
        [taskId]: {
          success: false,
          message:
            "Gagal memverifikasi Flag karena gangguan jaringan. Periksa koneksi Anda lalu klik Kirim Flag lagi.",
        },
      }));
    }
  }

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 xl:grid-cols-12">
      {/* Kolom Kiri: Daftar Tugas & Submit Flag */}
      <div className="flex min-w-0 flex-col gap-6 xl:col-span-6">
        <div className="border-b border-line pb-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-heading text-xl font-extrabold text-ink sm:text-2xl">
              Keamanan Siber 101: Eksplorasi Jaringan &amp; Linux
            </h1>
            <span className="tabular-nums shrink-0 rounded-md border border-line bg-bg2 px-2.5 py-1 font-heading text-xs font-semibold text-ok">
              {completedIds.length} / {tasks.length || 3} Selesai
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-mute">
            Jalankan perintah di AttackBox sebelah kanan untuk menginspeksi layanan target dan temukan Flag berformat <code className="font-mono text-xs text-ink">BISA&#123;...&#125;</code>.
          </p>
        </div>

        {isProgressLoading ? (
          <div className="flex flex-col gap-4" aria-busy="true">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 w-full animate-pulse rounded-xl border border-line bg-card p-5"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {tasks.map((task) => {
              const isCompleted = completedIds.includes(task.id);
              const feedback = feedbackMap[task.id];
              const isJustCelebrated = celebratedTaskId === task.id;

              return (
                <article
                  key={task.id}
                  className={`rounded-xl border bg-card p-5 ${
                    isCompleted ? "border-ok/60" : "border-line"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className={`tabular-nums inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold ${
                          isCompleted
                            ? "bg-ok text-onred"
                            : "border border-line bg-bg2 text-ink"
                        }`}
                      >
                        {isCompleted ? (
                          <IconCheck size={14} stroke={2} />
                        ) : (
                          task.orderIndex
                        )}
                      </span>
                      <h2 className="font-heading text-base font-bold text-ink">
                        {task.title}
                      </h2>
                    </div>
                    <span className="tabular-nums shrink-0 font-heading text-xs font-semibold text-btn">
                      +{task.points} XP
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-mute">
                    {task.contentMarkdown}
                  </p>

                  <p className="mt-4 font-heading text-xs font-semibold text-ink">
                    {task.question}
                  </p>

                  <form
                    onSubmit={(e) => handleFlagSubmit(task.id, e)}
                    className="mt-2.5 flex flex-col gap-2 sm:flex-row"
                  >
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
                      aria-label={`Jawaban Flag untuk ${task.title}`}
                      className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-bg px-3.5 font-mono text-xs text-ink placeholder:text-mute focus:border-btn focus:outline-none disabled:bg-bg2 disabled:text-ok"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={isCompleted || submitFlagMutation.isPending}
                      className="shrink-0"
                    >
                      {isCompleted ? "Terselesaikan" : "Kirim Flag"}
                    </Button>
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleHints((prev) => ({
                          ...prev,
                          [task.id]: !prev[task.id],
                        }))
                      }
                      className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-line bg-bg px-3.5 font-heading text-xs font-medium text-mute hover:border-red hover:text-ink"
                    >
                      {visibleHints[task.id] ? "Tutup Petunjuk" : "Petunjuk"}
                    </button>
                  </form>

                  {visibleHints[task.id] && (
                    <p className="mt-2.5 rounded-lg border border-line bg-bg2 px-3.5 py-2.5 text-xs leading-relaxed text-mute">
                      <strong className="font-semibold text-ink">
                        Saran Mentor:
                      </strong>{" "}
                      {task.hint}
                    </p>
                  )}

                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: 6 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                        role={feedback.success ? "status" : "alert"}
                        className={`mt-2.5 flex items-center justify-between gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium ${
                          feedback.success
                            ? "border-ok/40 bg-bg2 text-ok"
                            : "border-hard/40 bg-redsoft text-hard"
                        }`}
                      >
                        <span>{feedback.message}</span>
                        {isJustCelebrated && feedback.success && (
                          <button
                            type="button"
                            onClick={() => setCelebratedTaskId(null)}
                            className="tabular-nums shrink-0 cursor-pointer font-heading text-[11px] font-bold text-ink underline"
                          >
                            +{task.points} XP tercatat
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Kolom Kanan: Terminal AttackBox */}
      <div className="flex min-w-0 flex-col gap-4 xl:col-span-6">
        <div className="rounded-xl border border-line bg-card p-5 text-ink">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-sm font-bold text-ink">
                  Mesin Target Lab
                </h2>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    lab?.status === "running" ? "text-ok" : "text-mute"
                  }`}
                >
                  ●{" "}
                  {isLabLoading
                    ? "Menyiapkan..."
                    : lab?.status === "running"
                    ? "Aktif"
                    : "Nonaktif"}
                </span>
              </div>
              <p className="tabular-nums mt-0.5 truncate font-mono text-xs text-mute">
                {lab
                  ? `${lab.ipAddress}:${lab.webPort} (${lab.containerId})`
                  : "Mesin belum aktif — klik Nyalakan Mesin untuk memulai sesi"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {!lab ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    manageLab.mutate({ action: "start", roomId: 1 })
                  }
                  disabled={manageLab.isPending}
                >
                  {manageLab.isPending ? "Menyalakan..." : "Nyalakan Mesin"}
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
                    Reset IP
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      manageLab.mutate({ action: "stop", roomId: 1 })
                    }
                    disabled={manageLab.isPending}
                  >
                    Matikan Mesin
                  </Button>
                </>
              )}
            </div>
          </div>

          <div
            role="group"
            aria-label="Pintasan perintah terminal"
            className="mt-3.5 flex flex-wrap items-center gap-2"
          >
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
                className="cmd-chip inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line bg-bg2 px-3 font-mono text-xs text-ink"
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="mt-3.5 flex h-[390px] flex-col justify-between rounded-xl bg-term p-4 font-mono text-xs text-termfg">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-[11px] text-termfg/60">
              <span>bisa@attackbox: ~</span>
              <span className="tabular-nums">SSH :{lab?.sshPort ?? 2222}</span>
            </div>

            <div className="my-3 flex-1 space-y-1.5 overflow-y-auto pr-1 text-termfg">
              <div className="break-all font-semibold text-red">
                bisa@attackbox:~$ {typedGreetingCmd}
                <span aria-hidden="true" className="terminal-caret ml-1" />
              </div>

              {terminalLines.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith("bisa@attackbox")
                      ? "break-all font-semibold text-red"
                      : line.includes("BISA{")
                      ? "break-all font-bold text-ok"
                      : "break-words text-termfg/85"
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
              <span className="font-semibold text-red">$</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Ketik perintah Linux (mis. ls -la)..."
                aria-label="Input perintah terminal"
                className="h-11 min-w-0 flex-1 bg-transparent text-termfg placeholder:text-termfg/45 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-interactive inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-lg bg-btn px-3.5 font-heading text-xs font-medium text-onred hover:bg-red2"
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
