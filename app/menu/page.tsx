import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "../components/Arrow";
import CtaSection from "../components/CtaSection";
import PhotoCard from "../components/PhotoCard";
import SocialButton from "../components/SocialButton";
import { MENU } from "../menu-data";
import { WHATSAPP } from "../site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Meat pies, pastry boxes, custom cakes, banana bread and brownies from La Crave Bakery, baked fresh to order in Port Harcourt.",
};

const steps = [
  {
    title: "Send us a message",
    body: "Slide into our DMs or message us on WhatsApp with what you are craving and when you need it.",
  },
  {
    title: "We bake it fresh",
    body: "Everything is baked to order and packed with care, so it reaches you at its best.",
  },
  {
    title: "Same-day delivery",
    body: "We deliver across Port Harcourt the same day, every day.",
  },
];

export default function MenuPage() {
  return (
    <>
      <section className="section--hero">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-hero-item>
              The menu
            </span>
            <h1 className="display-1" data-split>
              baked fresh, made to order
            </h1>
            <p className="lead" data-hero-item>
              Everything we make, in one place. Pick your favourites and send us
              a message. We will take it from there.
            </p>
            <div className="actions" style={{ justifyContent: "center" }} data-hero-item>
              <SocialButton network="whatsapp">order on whatsapp</SocialButton>
              <Link href="/" className="link-arrow">
                <Arrow dir="left" />
                back home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3 grid-3--center">
            {MENU.map((item, index) => (
              <PhotoCard
                key={item.id}
                href={WHATSAPP}
                external
                img={item.img}
                alt={item.alt}
                sizes="(min-width: 992px) 24rem, 90vw"
                cursorTag="order now"
                flip={index % 2 === 1}
              >
                <div className="photo-card-body">
                  <span className="group-label">{item.group}</span>
                  <div className="photo-card-row">
                    <h2 className="title-3">{item.name}</h2>
                    {item.price ? (
                      <span className="price">
                        <small>₦</small>
                        <span>{item.price}</span>
                      </span>
                    ) : (
                      <span className="price price--ask">Message for price</span>
                    )}
                  </div>
                  <p className="small">{item.blurb}</p>
                </div>
              </PhotoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-fade>
              How it works
            </span>
            <h2 className="display-2" data-split>
              from your message to your door
            </h2>
          </div>
          <div className="section-gap" />
          <ol className="steps">
            {steps.map((step) => (
              <li className="step" key={step.title} data-reveal>
                <h3 className="title-3">{step.title}</h3>
                <p className="small">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
