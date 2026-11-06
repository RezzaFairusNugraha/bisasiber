import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Dashboard Pembelajaran",
  description:
    "Pantau progres modul siber, poin XP, rentetan belajar harian, dan papan peringkat nasional di BisaSiber.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main className="flex flex-1 flex-col">
          <DashboardOverview />
        </main>
      </div>
      <Footer />
    </div>
  );
}
