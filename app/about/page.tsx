import type { Metadata } from "next";
import Link from "next/link";
import AboutSection from "../components/AboutSection";
import Arrow from "../components/Arrow";
import CtaSection from "../components/CtaSection";
import HowItWorks from "../components/HowItWorks";
import SectionEyebrow from "../components/SectionEyebrow";
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
            <SectionEyebrow icon="about" data-hero-item>
              About us
            </SectionEyebrow>
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

      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <SectionEyebrow icon="story">What we believe</SectionEyebrow>
            <h2 className="display-2" data-split>
              made to crave, made to share
            </h2>
            <p className="lead">
              Every order starts with the same idea: familiar flavours, flaky
              pastry and beautiful details that make people come back for more.
            </p>
          </div>
          <div className="grid-3 about-values">
            <article className="value-card">
              <span className="value-card__number">01</span>
              <h3>small-batch always</h3>
              <p>
                We bake in considered batches so every meat pie, cake and
                brownie feels fresh, generous and worth the craving.
              </p>
            </article>
            <article className="value-card">
              <span className="value-card__number">02</span>
              <h3>the details matter</h3>
              <p>
                From savoury fillings to celebration cakes, we care about the
                finish as much as the first bite.
              </p>
            </article>
            <article className="value-card">
              <span className="value-card__number">03</span>
              <h3>for your people</h3>
              <p>
                Quick bites, thoughtful gifts and centrepieces for the moments
                you want your guests talking about long after dessert.
              </p>
            </article>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
