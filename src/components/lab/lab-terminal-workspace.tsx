"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  IconBook,
  IconBulb,
  IconCheck,
  IconCopy,
  IconDeviceDesktop,
  IconLock,
  IconMaximize,
  IconRefresh,
  IconTerminal2,
  IconWorld,
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

const FIRST_TYPED_COMMAND = "nmap -sV 10.10.24.88";
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  whoami: ["bisa_operator@bisasiber-purple (uid=1000, grup=purple-team)"],
  "nmap -sV 10.10.24.88": [
    "Starting Nmap 7.95 ( https://nmap.org ) at 2026-11-09 WIB",
    "Nmap scan report for target.bisasiber.local (10.10.24.88)",
    "Host is up (0.014s latency).",
    "PORT     STATE SERVICE VERSION",
    "22/tcp   open  ssh     OpenSSH 9.6p1 Ubuntu (Banner: BISA{p0rt_ssh_22_aman})",
    "8080/tcp open  http    BisaSiber FakeBank Gateway 1.4",
    "Service detection performed. Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds",
  ],
  "ls -la": [
    "total 24",
    "drwxr-xr-x 4 bisa bisa 4096 Nov  9 13:10 .",
    "drwxr-xr-x 3 root root 4096 Nov  1 08:00 ..",
    "-rw-r--r-- 1 bisa bisa  220 Nov  1 08:00 .bash_logout",
    "drwxr-x--- 2 bisa bisa 4096 Nov  9 13:12 .rahasia",
    "-rw-r--r-- 1 bisa bisa  118 Nov  9 13:00 README.txt",
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
    "Date: Mon, 09 Nov 2026 07:00:00 GMT",
  ],
};

type WorkspaceLayoutMode = "split" | "reading" | "zen";
type VirtualAppTab = "terminal" | "browser";
type MobileWorkspaceTab = "soal" | "lab";

export function LabTerminalWorkspace() {
  const { data: labData, isLoading: isLabLoading } = useLabInstance();
  const manageLab = useManageLabInstance();
  const { data: progressData, isLoading: isProgressLoading } =
    useUserProgress();
  const submitFlagMutation = useSubmitFlag();
  const prefersReducedMotion = useReducedMotion();

  const [layoutMode, setLayoutMode] = useState<WorkspaceLayoutMode>("split");
  const [mobileTab, setMobileTab] = useState<MobileWorkspaceTab>("soal");
  const [activeApp, setActiveApp] = useState<VirtualAppTab>("terminal");
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const [commandInput, setCommandInput] = useState("");
  const [typedGreetingCmd, setTypedGreetingCmd] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "BisaSiber Purple Cloud OS v2.4 (Ubuntu 24.04 LTS x86_64)",
    "Ketik 'help' untuk daftar perintah atau klik pintasan perintah di atas terminal.",
  ]);
  const [flagInputs, setFlagInputs] = useState<Record<number, string>>({});
  const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});
  const [unblurredHints, setUnblurredHints] = useState<Record<number, boolean>>(
    {}
  );
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
    }, 45);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const lab = labData?.lab ?? null;
  const tasks = progressData?.tasks ?? [];
  const completedIds = progressData?.completedTaskIds ?? [];
  const totalTasks = Math.max(tasks.length, 3);
  const progressPercent = Math.round((completedIds.length / totalTasks) * 100);

  function triggerCopyToast(text: string, label = "Tersalin ke clipboard!") {
    navigator.clipboard?.writeText(text);
    setCopyToast(label);
    setTimeout(() => setCopyToast(null), 1200);
  }

  function runTerminalCommand(rawCmd: string) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === "clear") {
      setTerminalLines([]);
      setCommandInput("");
      return;
    }

    const matchedOutput = PRESET_COMMANDS[cmd] ?? [
      `bash: ${cmd}: perintah belum dikenali di simulasi ini. Coba ketik 'help', 'nmap -sV 10.10.24.88', 'ls -la', 'cat .rahasia/flag.txt', atau 'curl -I http://10.10.24.88:8080/api/status'.`,
    ];

    setTerminalLines((prev) => [
      ...prev,
      `bisa@purple-os:~$ ${cmd}`,
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
            "Hmm, kolom jawaban masih kosong. Salin nilai BISA{...} dari terminal atau peramban di sebelah kanan lalu klik Periksa.",
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
            "Koneksi sempat terputus saat memeriksa Flag. Coba klik Periksa sekali lagi.",
        },
      }));
    }
  }

  const leftColSpan =
    layoutMode === "reading"
      ? "xl:col-span-7"
      : layoutMode === "zen"
      ? "hidden xl:hidden"
      : "xl:col-span-5";

  const rightColSpan =
    layoutMode === "reading"
      ? "xl:col-span-5"
      : layoutMode === "zen"
      ? "xl:col-span-12"
      : "xl:col-span-7";

  return (
    <div className="mx-auto flex max-w-[1360px] flex-col gap-5">
      {/* Top Workspace Control Bar + Mobile Switcher (DESIGN.md Section 2.3 & 8) */}
      <div className="violet-rim flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-bg2 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-heading font-bold text-ink">
                Room progress: {progressPercent}%
              </span>
              <span className="tabular-nums font-mono text-xs text-ok">
                {completedIds.length} / {totalTasks} Task Selesai
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-card">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                  background:
                    "linear-gradient(90deg, var(--accent-primary), var(--accent-mint))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Tab Switcher ([ 📖 Soal ] and [ 💻 Lab OS ] with 44x44px tap targets) */}
        <div
          role="tablist"
          aria-label="Mode tampilan mobile"
          className="flex items-center gap-1.5 xl:hidden"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === "soal"}
            onClick={() => setMobileTab("soal")}
            className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center gap-1.5 rounded-lg px-3.5 font-heading text-xs font-semibold ${
              mobileTab === "soal"
                ? "bg-btn text-onred"
                : "border border-line bg-card text-mute hover:text-ink"
            }`}
          >
            <IconBook size={16} stroke={1.9} />
            <span>Soal</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === "lab"}
            onClick={() => setMobileTab("lab")}
            className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center gap-1.5 rounded-lg px-3.5 font-heading text-xs font-semibold ${
              mobileTab === "lab"
                ? "bg-btn text-onred"
                : "border border-line bg-card text-mute hover:text-ink"
            }`}
          >
            <IconDeviceDesktop size={16} stroke={1.9} />
            <span>Lab OS</span>
          </button>
        </div>

        {/* Desktop Modular Split / Reading / Zen Mode Switcher (DESIGN.md Section 2.3) */}
        <div
          role="group"
          aria-label="Pengaturan tata letak ruang kerja"
          className="hidden items-center gap-1.5 xl:flex"
        >
          <button
            type="button"
            onClick={() => setLayoutMode("reading")}
            className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3 font-heading text-xs font-medium ${
              layoutMode === "reading"
                ? "bg-btn text-onred"
                : "border border-line bg-card text-mute hover:text-ink"
            }`}
          >
            Mode Baca
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode("split")}
            title="Klik ganda pada pembatas tengah untuk mereset rasio Split"
            className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3 font-heading text-xs font-medium ${
              layoutMode === "split"
                ? "bg-btn text-onred"
                : "border border-line bg-card text-mute hover:text-ink"
            }`}
          >
            Split 40:60
          </button>
          <button
            type="button"
            onClick={() =>
              setLayoutMode((prev) => (prev === "zen" ? "split" : "zen"))
            }
            className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3 font-heading text-xs font-medium ${
              layoutMode === "zen"
                ? "bg-btn text-onred"
                : "border border-line bg-card text-mute hover:text-ink"
            }`}
          >
            <IconMaximize size={14} stroke={1.9} />
            <span>{layoutMode === "zen" ? "Keluar Zen Mode" : "Zen Focus OS"}</span>
          </button>
        </div>
      </div>

      {/* Toast Feedback 1.2s for 1-Click Copy Assist */}
      <AnimatePresence>
        {copyToast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            role="status"
            className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-heading text-xs font-bold shadow-lg"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--accent-mint)",
              color: "var(--accent-mint-text)",
            }}
          >
            <IconCheck size={15} stroke={2.2} />
            <span>{copyToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Panel Panduan Task (Kiri — DESIGN.md Section 5.2) */}
        <div
          className={`flex min-w-0 flex-col gap-5 ${leftColSpan} ${
            mobileTab === "lab" ? "hidden xl:flex" : "flex"
          }`}
        >
          <div className="border-b border-line pb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-redsoft px-3 py-0.5 font-heading text-xs font-semibold text-btn">
              Purple Team Fundamental
            </span>
            <h1 className="mt-2 font-heading text-xl font-bold text-ink sm:text-2xl">
              Keamanan Siber 101: Investigasi Jaringan &amp; Linux
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-mute">
              Jalankan perintah di AttackBox atau periksa aplikasi web di sebelah kanan untuk menemukan Flag berformat{" "}
              <code className="rounded bg-card px-1.5 py-0.5 font-mono text-xs text-btn">
                BISA&#123;...&#125;
              </code>
              .
            </p>
          </div>

          {isProgressLoading ? (
            <div className="flex flex-col gap-4" aria-busy="true">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-48 w-full animate-pulse rounded-2xl border border-line bg-card p-5"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {tasks.map((task, index) => {
                const isCompleted = completedIds.includes(task.id);
                const prevTask = index > 0 ? tasks[index - 1] : null;
                const isLocked =
                  prevTask !== null && !completedIds.includes(prevTask.id) && !isCompleted;
                const feedback = feedbackMap[task.id];
                const isJustCelebrated = celebratedTaskId === task.id;

                return (
                  <article
                    key={task.id}
                    className={`violet-rim relative overflow-hidden rounded-[16px] border bg-card p-5 transition-all ${
                      isCompleted
                        ? "border-ok/50"
                        : isLocked
                        ? "border-line opacity-75"
                        : "border-l-[3px] border-line border-l-btn"
                    }`}
                  >
                    {/* Floating Victory Badge on Flag Solve (DESIGN.md Section 2.2) */}
                    <AnimatePresence>
                      {isJustCelebrated && (
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 0, y: 14, scale: 0.92 }
                          }
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                          className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs font-bold"
                          style={{
                            borderColor: "var(--accent-mint)",
                            backgroundColor: "var(--accent-mint-glow)",
                            color: "var(--accent-mint-text)",
                          }}
                        >
                          <span>✨ +{task.points} XP Poin Siber!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className="tabular-nums inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold"
                          style={
                            isCompleted
                              ? {
                                  backgroundColor: "var(--accent-mint)",
                                  color: "var(--accent-mint-ink)",
                                  boxShadow: "0 0 12px var(--accent-mint-glow)",
                                }
                              : {
                                  backgroundColor: "var(--bg-surface)",
                                  color: "var(--text-main)",
                                  border: "1px solid var(--border-subtle)",
                                }
                          }
                        >
                          {isCompleted ? (
                            <IconCheck size={14} stroke={2.4} />
                          ) : isLocked ? (
                            <IconLock size={13} stroke={2} />
                          ) : (
                            task.orderIndex
                          )}
                        </span>
                        <h2 className="font-heading text-base font-semibold text-ink">
                          {task.title}
                        </h2>
                      </div>
                      <span className="tabular-nums shrink-0 rounded-full bg-redsoft px-2.5 py-0.5 font-heading text-xs font-semibold text-btn">
                        +{task.points} XP
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-[22px] text-mute">
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
                        className="h-11 min-w-0 flex-1 rounded-lg border border-line px-3.5 font-mono text-[13px] text-ink placeholder:text-mute focus:border-btn focus:outline-none"
                        style={{
                          backgroundColor: isCompleted
                            ? "var(--accent-mint-glow)"
                            : "var(--bg-input)",
                          borderColor: isCompleted
                            ? "var(--accent-mint)"
                            : undefined,
                          color: isCompleted
                            ? "var(--accent-mint-text)"
                            : undefined,
                        }}
                      />
                      <button
                        type="submit"
                        disabled={isCompleted || submitFlagMutation.isPending}
                        className="btn-mint inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-lg px-4 font-heading text-xs font-bold disabled:pointer-events-none disabled:opacity-55"
                      >
                        {isCompleted ? "✓ Selesai" : "Periksa / Check"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleHints((prev) => ({
                            ...prev,
                            [task.id]: !prev[task.id],
                          }))
                        }
                        className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-line bg-bg2 px-3.5 font-heading text-xs font-semibold text-mid hover:border-mid"
                      >
                        <IconBulb size={15} stroke={2} />
                        <span>
                          {visibleHints[task.id] ? "Tutup" : "Petunjuk"}
                        </span>
                      </button>
                    </form>

                    {/* Progressive Disclosure Hint with Interactive Spoiler Blur (DESIGN.md Section 2.2) */}
                    {visibleHints[task.id] && (
                      <div className="mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-line bg-bg2 px-3.5 py-2.5 text-xs leading-relaxed">
                        <p
                          className={`text-mute transition-all ${
                            unblurredHints[task.id]
                              ? "blur-none"
                              : "select-none blur-[3.5px]"
                          }`}
                        >
                          <strong className="font-semibold text-mid">
                            Petunjuk Mentor:
                          </strong>{" "}
                          {task.hint}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setUnblurredHints((prev) => ({
                              ...prev,
                              [task.id]: !prev[task.id],
                            }))
                          }
                          className="shrink-0 cursor-pointer rounded-md border border-line bg-card px-2.5 py-1 font-heading text-[11px] font-semibold text-ink hover:border-mid"
                        >
                          {unblurredHints[task.id]
                            ? "Samarkan"
                            : "Buka Spoiler"}
                        </button>
                      </div>
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
                          className={`mt-2.5 flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium ${
                            feedback.success
                              ? "border-ok/40 bg-bg2 text-ok"
                              : "border-hard/40 bg-redsoft text-hard"
                          }`}
                        >
                          <span>{feedback.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Panel Desktop Virtual & AttackBox (Kanan — DESIGN.md Section 5.2) */}
        <div
          className={`flex min-w-0 flex-col gap-4 ${rightColSpan} ${
            mobileTab === "soal" ? "hidden xl:flex" : "flex"
          }`}
        >
          <div className="violet-rim overflow-hidden rounded-[18px] border border-line bg-bg2 text-ink shadow-xl">
            {/* Top Bar System (#111528, App Launchers, Target IP Copy Pill, Controls) */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg2 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveApp("terminal")}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3 font-heading text-xs font-semibold ${
                    activeApp === "terminal"
                      ? "bg-btn text-onred"
                      : "border border-line bg-card text-mute hover:text-ink"
                  }`}
                >
                  <IconTerminal2 size={15} stroke={2} />
                  <span>Terminal AttackBox</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveApp("browser")}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3 font-heading text-xs font-semibold ${
                    activeApp === "browser"
                      ? "bg-btn text-onred"
                      : "border border-line bg-card text-mute hover:text-ink"
                  }`}
                >
                  <IconWorld size={15} stroke={2} />
                  <span>Peramban FakeBank</span>
                </button>
              </div>

              {/* Target IP Pill with 1-Click Copy Assist (DESIGN.md Section 2.3 & 5.2) */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    triggerCopyToast(
                      lab?.ipAddress ?? "10.10.24.88",
                      "IP target tersalin ke clipboard!"
                    )
                  }
                  className="tabular-nums inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-line bg-card px-3.5 font-mono text-xs font-semibold text-ok hover:border-ok"
                >
                  <span>
                    ●{" "}
                    {isLabLoading
                      ? "Menyiapkan..."
                      : lab?.ipAddress ?? "10.10.24.88"}
                  </span>
                  <IconCopy size={13} stroke={1.9} />
                </button>

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
                      Mulai Ulang
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        manageLab.mutate({ action: "stop", roomId: 1 })
                      }
                      disabled={manageLab.isPending}
                    >
                      Matikan
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Desktop Surface with Cosmic Twilight Gradient (#0D1024 to #1B1438) */}
            <div
              className="p-4"
              style={{
                background:
                  "linear-gradient(145deg, #0D1024 0%, #1B1438 100%)",
              }}
            >
              {/* Window Chrome Header (Minimize _, Maximize □, Close ✕) */}
              <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-white/10 bg-[#111528] px-4 py-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--accent-primary)" }}
                  />
                  <span>
                    {activeApp === "terminal"
                      ? "bisa@purple-os: ~/investigasi"
                      : "Mozilla Firefox — FakeBank Siber Portal"}
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  className="flex items-center gap-2.5 font-mono text-[11px] text-slate-400"
                >
                  <span>_</span>
                  <span>□</span>
                  <span>✕</span>
                </div>
              </div>

              {activeApp === "terminal" ? (
                <div className="rounded-b-xl border border-white/10 bg-[#0B0D17] p-4 font-mono text-[13px] leading-[20px] text-slate-100">
                  {/* 1-Click Command Assist Chips */}
                  <div
                    role="group"
                    aria-label="Pintasan perintah terminal"
                    className="mb-3 flex flex-wrap items-center gap-1.5 border-b border-white/10 pb-3"
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
                        className="cmd-chip inline-flex min-h-9 cursor-pointer items-center rounded-lg border border-white/15 bg-white/5 px-2.5 font-mono text-xs text-slate-200"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  <div className="h-[340px] space-y-1.5 overflow-y-auto pr-1">
                    <div
                      className="break-all font-semibold"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      bisa@purple-os:~$ {typedGreetingCmd}
                      <span aria-hidden="true" className="terminal-caret ml-1" />
                    </div>

                    {terminalLines.map((line, idx) => (
                      <div
                        key={idx}
                        className={
                          line.startsWith("bisa@")
                            ? "break-all font-semibold"
                            : line.includes("BISA{")
                            ? "break-all font-bold"
                            : "break-words text-slate-300"
                        }
                        style={
                          line.startsWith("bisa@")
                            ? { color: "var(--accent-primary)" }
                            : line.includes("BISA{")
                            ? { color: "var(--accent-mint)" }
                            : undefined
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
                    className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3"
                  >
                    <span
                      className="font-bold"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      $
                    </span>
                    <input
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      placeholder="Ketik perintah Linux (mis. ls -la)..."
                      aria-label="Input perintah terminal"
                      className="h-11 min-w-0 flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="btn-mint inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-lg px-3.5 font-heading text-xs font-bold"
                    >
                      Jalankan
                    </button>
                  </form>
                </div>
              ) : (
                /* Virtual Browser Window (DESIGN.md Section 5.2: http://banksiber.id/) */
                <div className="rounded-b-xl border border-white/10 bg-[#0E1222] p-4 text-slate-100">
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0B0D17] px-3 py-2 font-mono text-xs">
                    <IconRefresh
                      size={14}
                      stroke={1.9}
                      className="shrink-0 text-slate-400"
                    />
                    <IconLock
                      size={14}
                      stroke={2}
                      className="shrink-0"
                      style={{ color: "var(--accent-mint)" }}
                    />
                    <span className="truncate text-slate-200">
                      http://banksiber.id/api/status
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        triggerCopyToast(
                          "BISA{http_h3ad3r_inspeksi}",
                          "Flag header HTTP tersalin ke clipboard!"
                        )
                      }
                      className="ml-auto inline-flex shrink-0 cursor-pointer items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-200 hover:bg-white/20"
                    >
                      <IconCopy size={12} stroke={1.9} />
                      <span>Salin Flag Header</span>
                    </button>
                  </div>

                  <div className="mt-4 space-y-4 rounded-xl border border-white/10 bg-[#111528] p-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h3 className="font-heading text-base font-bold text-white">
                          FakeBank Siber — Inspeksi Header &amp; Rekening
                        </h3>
                        <p className="text-xs text-slate-400">
                          Simulasi Aplikasi Web Target (Port 8080)
                        </p>
                      </div>
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-xs font-bold"
                        style={{
                          backgroundColor: "var(--accent-mint-glow)",
                          color: "var(--accent-mint)",
                        }}
                      >
                        HTTP 200 OK
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-white/10 bg-[#0B0D17] p-3.5">
                        <span className="text-xs text-slate-400">
                          Nomor Rekening Investigasi
                        </span>
                        <p className="tabular-nums mt-1 font-mono text-sm font-bold text-white">
                          ID-8840-9921-SIBER
                        </p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-[#0B0D17] p-3.5">
                        <span className="text-xs text-slate-400">
                          Response Header X-BisaSiber-Flag
                        </span>
                        <p
                          className="mt-1 font-mono text-sm font-bold"
                          style={{ color: "var(--accent-mint)" }}
                        >
                          BISA&#123;http_h3ad3r_inspeksi&#125;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
