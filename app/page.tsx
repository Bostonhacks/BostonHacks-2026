import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ThemeGraphics from "@/components/ThemeGraphics";
import ThemeIntro from "@/components/ThemeIntro";
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
      <ThemeGraphics />
      <ThemeIntro text="This year's theme is..." />
      <TracksSection />
      <Countdown />
      <div id="schedule">
        <ScheduleGrid />
      </div>
      <FaqSection />
      <Footer />
    </main>
  );
}
