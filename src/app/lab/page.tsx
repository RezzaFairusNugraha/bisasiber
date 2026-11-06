import type { Metadata } from "next";
import { LabTerminalWorkspace } from "@/components/lab/lab-terminal-workspace";
import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Lab Siber Interaktif & AttackBox",
  description:
    "Jalankan container lab keamanan siber terisolasi, pindai jaringan target, dan verifikasi flag CTF secara langsung di browser Anda.",
};

export default function LabPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9FB]">
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-5 sm:p-8">
          <LabTerminalWorkspace />
        </main>
      </div>
      <Footer />
    </div>
  );
}
