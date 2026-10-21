export default function HeroSection() {
  return (
    <section className="section green-bg-hero">
      <div className="default-container">
        <div className="hero-grid-wrapper">
          <div className="hero-text-wrapper">
            <div className="vertical-flex">
              <h1 className="h1-header">flaky pastries, beautiful cakes</h1>
              <p>
                La Crave is all about giving you that irresistible sweet fix —
                whether you&apos;re biting into a fan-favourite meat pie,
                cutting a cake for the big moment, or treating yourself to
                banana bread and brownies. Baked fresh in Port Harcourt, same-day
                delivery, every single day.
              </p>
              <div className="space-md" />
              <a href="#menu" className="btn-primary">
                explore our menu
              </a>
            </div>
          </div>
          <div className="padding-sm">
            <div className="img-style-01" data-reveal>
              <div className="menu-item-bg-div _01" />
              <div className="menu-item-content">
                <div className="menu-img-wrapper">
                  <img
                    src="/images/hero-storefront.jpg"
                    alt="A tray of freshly baked La Crave meat pies"
                    className="menu-img"
                    loading="lazy"
                  />
                </div>
                <div className="highlight-text">#craveworthy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
