const categories = [
  {
    title: "meat pies",
    body: "Golden, flaky and generously filled — the one everybody orders by the tray.",
    img: "/images/cat-meat-pies.jpg",
    alt: "A tray of golden La Crave meat pies",
  },
  {
    title: "custom cakes",
    body: "Birthdays, weddings and everything in between, built around your moment.",
    img: "/images/cat-cakes.jpg",
    alt: "A custom celebration cake by La Crave",
  },
  {
    title: "banana bread & brownies",
    body: "Comforting loaves and rich, fudgy squares that melt in your mouth.",
    img: "/images/cat-breads.jpg",
    alt: "Banana bread and brownies fresh out of the oven",
  },
];

export default function CategoriesSection() {
  return (
    <section className="section" id="menu">
      <div className="default-container">
        <div className="headline-container-centred" data-fade>
          <h2 className="h2-header">
            From fan-favourite meat pies to celebration cakes
          </h2>
          <p className="body-base">
            From quick bites to show-stopping centrepieces, explore our
            carefully crafted menu. Whether you&apos;re after a savoury snack, a
            comforting loaf, or a cake for the occasion, La Crave has something
            to make your day.
          </p>
        </div>
        <div className="space-4xl" />
        <div className="padding-sm">
          <div className="grid-3-column">
            {categories.map((category) => (
              <div key={category.title} className="menu-item-card" data-reveal>
                <div className="menu-item-bg-div" />
                <div className="menu-item-content">
                  <div className="menu-img-wrapper">
                    <img
                      src={category.img}
                      alt={category.alt}
                      className="menu-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="vertical-flex">
                    <div className="header-lg">{category.title}</div>
                    <div className="space-sm" />
                    <div className="body-sm">{category.body}</div>
                  </div>
                </div>
                <div className="washi-tape-wrapper-02">
                  <img
                    src="/icons/washi-mint.svg"
                    alt=""
                    className="washi-tape"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
