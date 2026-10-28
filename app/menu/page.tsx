import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "../components/Arrow";
import CtaSection from "../components/CtaSection";
import HowItWorks from "../components/HowItWorks";
import PhotoCard from "../components/PhotoCard";
import SeeMore from "../components/SeeMore";
import SocialButton from "../components/SocialButton";
import { getMenu } from "../media";
import { WHATSAPP } from "../site";
import SectionEyebrow from "../components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Meat pies, pastry boxes, custom cakes, banana bread and brownies from La Crave Bakery, baked fresh to order in Port Harcourt.",
};

export default function MenuPage() {
  return (
    <>
      <section className="section--hero">
        <div className="container">
          <div className="section-head">
<SectionEyebrow icon="menu" data-hero-item>
            The menu
          </SectionEyebrow>
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
            {getMenu().map((item, index) => (
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
                  {item.blurb ? <p className="small">{item.blurb}</p> : null}
                </div>
              </PhotoCard>
            ))}
          </div>
          <div className="section-gap" />
          <SeeMore />
        </div>
      </section>

      <HowItWorks />

      <CtaSection />
    </>
  );
}
