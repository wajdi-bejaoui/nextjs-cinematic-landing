import Navbar from "@/app/components/Navbar";
import HeroSection from "./components/HeroSection";

import CinematicScrollReveal from "./components/CinematicScrollReveal";
import HowItWorksSection from "./components/HowItWorksSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CinematicScrollReveal />
      <HowItWorksSection />

    </>
  );
}


