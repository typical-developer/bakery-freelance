import PhotoCard from "./PhotoCard";
import { INSTAGRAM } from "../site";

export default function AboutSection() {
  return (
    <section className="section section--torn section--peach" id="about">
      <div className="container split">
        <div className="about-media">
          <PhotoCard
            img="/images/about-cafe.jpg"
            alt="La Crave bakes cooling on the counter"
            sizes="(min-width: 992px) 28rem, 90vw"
            tag="#bakedfreshdaily"
          />
        </div>
        <div className="stack">
          <span className="eyebrow" data-fade>
            Our story
          </span>
          <h2 className="display-2" data-split>
            Every craving has a story, and ours started with a tray of meat pies
          </h2>
          <p className="lead" data-scrub>
            La Crave is a small-batch bakery in Port Harcourt. We started with
            one tray of meat pies and a WhatsApp link, and grew on word of
            mouth, because good pastry is impossible to keep quiet about.
            Everything is baked fresh to order, packed with care, and delivered
            the same day.
          </p>
          <div className="actions" data-fade>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn">
              about us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
