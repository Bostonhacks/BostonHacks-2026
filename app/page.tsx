import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ThemeGraphics from "@/components/ThemeGraphics";
import TracksSection from "@/components/TracksSection";
import Countdown from "@/components/Countdown";
import ScheduleGrid from "@/components/ScheduleGrid";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div id="theme">
        <ThemeGraphics text="This year's theme is..." />
      </div>
      <TracksSection />
      <div id="schedule">
        <ScheduleGrid />
      </div>
      <FaqSection />
      <Countdown />
      <Footer />
    </main>
  );
}
