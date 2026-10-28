import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "../components/Arrow";
import CtaSection from "../components/CtaSection";
import SectionEyebrow from "../components/SectionEyebrow";
import SocialButton from "../components/SocialButton";
import { WHATSAPP } from "../site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet La Crave Bakery, a small-batch bakery in Port Harcourt creating fresh pastries, cakes and thoughtful treats.",
};

const values = [
  ["01", "small-batch always", "We bake in considered batches so every bite feels fresh, generous and worth the craving."],
  ["02", "the details matter", "From savoury fillings to celebration cakes, we care about the finish as much as the first bite."],
  ["03", "for your people", "Quick bites, thoughtful gifts and centrepieces for the moments you want your guests talking about."],
];

const steps = [
  ["01", "you tell us the occasion", "Send a WhatsApp or Instagram message with what you need, when you need it and how many people you are feeding."],
  ["02", "we make a plan", "We help you choose the right treats, confirm the details and make sure everything feels just right."],
  ["03", "we bake it fresh", "Your order is made with care, packed beautifully and delivered across Port Harcourt."],
];

export default function AboutPage() {
  return (
    <>
      <section className="section--hero about-hero">
        <div className="container">
          <div className="section-head">
            <SectionEyebrow icon="about" data-hero-item>About La Crave</SectionEyebrow>
            <h1 className="display-1" data-split>the bakery behind the craving</h1>
            <p className="lead" data-hero-item>
              La Crave is a small-batch bakery in Port Harcourt, making familiar flavours feel a little more special.
            </p>
            <div className="actions" style={{ justifyContent: "center" }} data-hero-item>
              <SocialButton network="whatsapp">say hello on whatsapp</SocialButton>
              <Link href="/menu" className="link-arrow">explore the menu <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-story">
        <div className="container">
          <div className="about-story__grid">
            <div className="about-story__intro">
              <SectionEyebrow icon="story">Our story</SectionEyebrow>
              <h2 className="display-2">made to crave, made to share</h2>
            </div>
            <div className="about-story__copy">
              <p className="lead">It started with the kind of food people ask you to make again before they&apos;ve finished the first one.</p>
              <p>La Crave brings that feeling to every order: flaky pastry, rich fillings, soft cakes and the little details that turn a treat into a memory.</p>
              <p>Whether it&apos;s a box for the office, a birthday centrepiece or a quiet afternoon craving, we make it fresh, thoughtful and unapologetically delicious.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper about-values-section">
        <div className="container">
          <div className="section-head">
            <SectionEyebrow icon="story">What we believe</SectionEyebrow>
            <h2 className="display-2">good food has a point of view</h2>
          </div>
          <div className="grid-3 about-values">
            {values.map(([number, title, copy]) => <article className="value-card" key={number}><span className="value-card__number">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section about-process">
        <div className="container">
          <div className="about-process__head"><SectionEyebrow icon="order">How it works</SectionEyebrow><h2 className="display-2">from craving to doorstep</h2></div>
          <div className="about-process__steps">
            {steps.map(([number, title, copy]) => <article className="about-process__step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
