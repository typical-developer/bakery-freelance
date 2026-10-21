import AboutSection from "./components/AboutSection";
import CategoriesSection from "./components/CategoriesSection";
import CtaSection from "./components/CtaSection";
import HeroSection from "./components/HeroSection";
import LineupSection from "./components/LineupSection";
import Marquee from "./components/Marquee";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <CategoriesSection />
      <AboutSection />
      <LineupSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
