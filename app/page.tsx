import AboutSection from "./components/AboutSection";
import CategoriesSection from "./components/CategoriesSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LineupSection from "./components/LineupSection";
import Navbar from "./components/Navbar";
import ParallaxBand from "./components/ParallaxBand";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <AboutSection />
      <LineupSection />
      <TestimonialsSection />
      <CtaSection />
      <ParallaxBand />
      <Footer />
    </>
  );
}
