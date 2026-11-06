import {
  HeroBanner,
  PlatformStatsGrid,
} from "@/components/dashboard/stats-overview";
import { Footer, FooterCta } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LearningPathsSection } from "@/components/rooms/learning-paths-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroBanner />
        <PlatformStatsGrid />
        <LearningPathsSection />
        <FooterCta />
      </main>
      <Footer />
    </div>
  );
}
