import CreatorCarousel from "./CreatorCarousel";
import { getCreators } from "../media";

function BakeryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 14.5h18v9H7zM5 14.5h22M9 14.5V11a3 3 0 0 1 6 0v3.5M17 14.5V11a3 3 0 0 1 6 0v3.5M10 18.5v5M16 18.5v5M22 18.5v5" />
      <path d="M10 8.5c.5-2 2-3 3.5-3s3 1 3.5 3" />
    </svg>
  );
}

export default function CreatorSpotlight() {
  const creators = getCreators();

  return (
    <section className="section section--torn section--mint" id="creators">
      <div className="container">
        <div className="section-head creator-section-head">
          <span className="eyebrow eyebrow--bakery" data-fade>
            <BakeryIcon />
            Creator spotlight
          </span>
          <h2 className="display-2" data-split>
            the creators craving la crave
          </h2>
          <p className="lead" data-fade>
            Content creators share their favourite La Crave moments. Press play,
            then place an order of your own.
          </p>
          <CreatorCarousel creators={creators} />
        </div>
        <div className="section-gap" />
      </div>
    </section>
  );
}
