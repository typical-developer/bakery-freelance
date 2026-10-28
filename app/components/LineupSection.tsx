import Link from "next/link";
import Arrow from "./Arrow";
import PhotoCard from "./PhotoCard";
import SocialButton from "./SocialButton";
import SectionEyebrow from "./SectionEyebrow";
import { FEATURED_IDS, MENU } from "../menu-data";
import { WHATSAPP } from "../site";

export default function LineupSection() {
  const featured = FEATURED_IDS.map((id) => MENU.find((item) => item.id === id)!);
  return (
    <section className="section" id="lineup">
      <div className="container">
        <div className="lineup-head">
          <div className="stack">
            <SectionEyebrow icon="lineup" data-fade>
              Fresh today
            </SectionEyebrow>
            <h2 className="display-2" data-split>
              today&apos;s sweet lineup
            </h2>
          </div>
          <div className="stack">
            <p className="lead" data-fade>
              Fresh out of the oven today. Every box is baked to order. Send us a
              message and we&apos;ll get it to you the same day.
            </p>
            <div className="actions" data-fade>
              <SocialButton network="whatsapp">order on whatsapp</SocialButton>
              <Link href="/menu" className="link-arrow">
                see more
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <div className="section-gap" />
        <div className="grid-3">
          {featured.map((item, index) => (
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
                <div className="photo-card-row">
                  <h3 className="title-3">{item.name}</h3>
                  {item.price ? (
                    <span className="price">
                      <small>₦</small>
                      <span>{item.price}</span>
                    </span>
                  ) : null}
                </div>
                <p className="small">{item.blurb}</p>
              </div>
            </PhotoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
