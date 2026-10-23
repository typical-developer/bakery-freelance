import type { Metadata } from "next";
import Link from "next/link";
import AboutSection from "../components/AboutSection";
import Arrow from "../components/Arrow";
import CtaSection from "../components/CtaSection";
import HowItWorks from "../components/HowItWorks";
import { WHATSAPP } from "../site";

export const metadata: Metadata = {
  title: "About",
  description:
    "La Crave is a small-batch bakery in Port Harcourt. Meat pies, custom cakes, banana bread and brownies, baked fresh to order and delivered the same day.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section--hero">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-hero-item>
              About us
            </span>
            <h1 className="display-1" data-split>
              the bakery behind the meat pies
            </h1>
            <p className="lead" data-hero-item>
              A small-batch bakery in Port Harcourt, baking fresh to order and
              delivering the same day.
            </p>
            <div className="actions" style={{ justifyContent: "center" }} data-hero-item>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">
                order on whatsapp
              </a>
              <Link href="/menu" className="link-arrow">
                see the menu
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboutSection showLink={false} />
      <HowItWorks />
      <CtaSection />
    </>
  );
}
