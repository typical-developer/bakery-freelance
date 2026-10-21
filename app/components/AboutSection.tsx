import { INSTAGRAM } from "../site";

export default function AboutSection() {
  return (
    <section className="section brown-bg" id="about">
      <div className="default-container sections-with-bg">
        <div className="grid-2-column">
          <div className="padding-sm">
            <div className="img-style-01" data-reveal>
              <div className="menu-item-bg-div _01" />
              <div className="menu-item-content">
                <div className="menu-img-wrapper">
                  <img
                    src="/images/about-cafe.jpg"
                    alt="La Crave bakes cooling on the counter"
                    className="menu-img"
                    loading="lazy"
                  />
                </div>
                <div className="highlight-text">#bakedfreshdaily</div>
              </div>
            </div>
          </div>
          <div className="vertical-flex centre-align" data-reveal>
            <h2 className="h2-header">
              Every craving has a story — ours started with a tray of meat pies
            </h2>
            <p className="body-base">
              La Crave is a small-batch bakery in Port Harcourt. We started with
              one tray of meat pies and a WhatsApp link, and grew on word of
              mouth — because good pastry is impossible to keep quiet about.
              Everything is baked fresh to order, packed with care, and
              delivered the same day.
            </p>
            <div className="space-lg" />
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              about us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
