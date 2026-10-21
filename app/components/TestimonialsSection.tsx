"use client";

import { useState } from "react";

const slides = [
  [
    {
      title: "Meat pie perfection",
      body: "I ordered a tray for the office and they disappeared in ten minutes. The crust is unreal.",
      who: "Ngozi A., Office Regular",
      img: "/images/testimonial-1.jpg",
      alt: "A customer holding a La Crave meat pie",
    },
    {
      title: "My birthday cake!",
      body: "I sent a blurry screenshot from Pinterest and got back exactly what I imagined — but better.",
      who: "Temi O., Birthday Girl",
      img: "/images/testimonial-2.jpg",
      alt: "A customer with her La Crave birthday cake",
    },
  ],
  [
    {
      title: "Brownies that slap",
      body: "Ordered one box to share. Ate most of it in the car. Zero regrets.",
      who: "Ike W., Brownie Addict",
      img: "/images/testimonial-3.jpg",
      alt: "A customer holding a box of La Crave brownies",
    },
    {
      title: "Better than my mum's",
      body: "The banana bread is dangerously soft. My family finished it before dinner.",
      who: "Ada K., Banana Bread Fan",
      img: "/images/testimonial-4.jpg",
      alt: "A customer with a loaf of La Crave banana bread",
    },
  ],
  [
    {
      title: "Delivered same day",
      body: "Messaged in the morning, had warm meat pies by afternoon. That's service.",
      who: "Tunde B., Same-Day Regular",
      img: "/images/testimonial-5.jpg",
      alt: "A customer receiving a same-day La Crave delivery",
    },
    {
      title: "Cake of the year",
      body: "Our wedding cake got more compliments than the dress code.",
      who: "Chiara & Sam, Newlyweds",
      img: "/images/testimonial-6.jpg",
      alt: "A wedding cake made by La Crave",
    },
  ],
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const step = (delta: number) =>
    setIndex((value) => (value + delta + slides.length) % slides.length);

  return (
    <section className="section">
      <div className="default-container">
        <div className="headline-container-centred">
          <h2 className="h2-header">Love letters AND Crumb trails</h2>
          <p>
            Every box comes with a story. Here are a few of the messages that
            landed in our DMs after the wrappers came off.
          </p>
        </div>
        <div className="space-2xl" />
        <div
          className="testimonial-slider"
          role="region"
          aria-label="carousel"
          data-fade
        >
          <div className="mask" style={{ "--slide": index } as React.CSSProperties}>
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="slide"
                role="group"
                aria-label={`${slideIndex + 1} of ${slides.length}`}
                aria-hidden={slideIndex !== index}
              >
                <div className="padding-sm">
                  <div className="grid-2-column">
                    {slide.map((card) => (
                      <div key={card.who} className="testimonial-card">
                        <div className="testimonial-bg-div" />
                        <div className="testimonial-content">
                          <div className="testimonial-img-wrapper">
                            <img
                              src={card.img}
                              alt={card.alt}
                              className="testimonial-img"
                              loading="lazy"
                            />
                          </div>
                          <div className="vertical-flex">
                            <div className="highlight-text">{card.title}</div>
                            <div className="space-md" />
                            <p className="body-base">{card.body}</p>
                            <div className="space-md" />
                            <div className="header-xs">{card.who}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="left-arrow"
            aria-label="previous slide"
            onClick={() => step(-1)}
          >
            <img src="/icons/arrow-left.svg" alt="" className="arrow-icon" loading="lazy" />
          </button>
          <button
            type="button"
            className="right-arrow"
            aria-label="next slide"
            onClick={() => step(1)}
          >
            <img
              src="/icons/arrow-right.svg"
              alt=""
              className="arrow-icon"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
