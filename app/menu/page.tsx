import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "../components/Arrow";
import CtaSection from "../components/CtaSection";
import PhotoCard from "../components/PhotoCard";
import SectionEyebrow from "../components/SectionEyebrow";
import SocialButton from "../components/SocialButton";
import { getMenu } from "../media";
import { WHATSAPP } from "../site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore La Crave Bakery's full menu of meat pies, pastry boxes, custom cakes, banana bread and brownies.",
};

export default function MenuPage() {
  const menu = getMenu();
  const groups = [...new Set(menu.map((item) => item.group))];

  return (
    <>
      <section className="section--hero menu-hero">
        <div className="container">
          <div className="section-head">
            <SectionEyebrow icon="menu" data-hero-item>The menu</SectionEyebrow>
            <h1 className="display-1" data-split>come hungry, leave inspired</h1>
            <p className="lead" data-hero-item>
              Savoury bites, celebration cakes and sweet little things for every kind of craving.
              Everything is baked fresh to order in Port Harcourt.
            </p>
            <div className="actions" style={{ justifyContent: "center" }} data-hero-item>
              <SocialButton network="whatsapp">order on whatsapp</SocialButton>
              <Link href="/about" className="link-arrow">meet the bakers <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section menu-listing">
        <div className="container">
          <nav className="menu-tabs" aria-label="Menu categories">
            {groups.map((group) => <a key={group} href={`#${group.toLowerCase().replaceAll(" ", "-")}`}>{group}</a>)}
          </nav>
          {groups.map((group) => (
            <section className="menu-category" id={group.toLowerCase().replaceAll(" ", "-")} key={group}>
              <div className="menu-category__head">
                <SectionEyebrow icon="menu">{group}</SectionEyebrow>
                <p className="small">Made in small batches, packed with care.</p>
              </div>
              <div className="grid-3 grid-3--center">
                {menu.filter((item) => item.group === group).map((item, index) => (
                  <PhotoCard key={item.id} href={WHATSAPP} external img={item.img} alt={item.alt} sizes="(min-width: 992px) 24rem, 90vw" cursorTag="order now" flip={index % 2 === 1}>
                    <div className="photo-card-body">
                      <div className="photo-card-row">
                        <h2 className="title-3">{item.name}</h2>
                        {item.price ? <span className="price"><small>₦</small><span>{item.price}</span></span> : <span className="price price--ask">Message for price</span>}
                      </div>
                      {item.blurb ? <p className="small">{item.blurb}</p> : null}
                    </div>
                  </PhotoCard>
                ))}
              </div>
            </section>
          ))}
          <div className="menu-note"><strong>Ordering for a crowd?</strong><span>Tell us what you&apos;re planning and we&apos;ll help you build the right box.</span><a href={WHATSAPP} target="_blank" rel="noreferrer" className="link-arrow">start a conversation <Arrow /></a></div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
