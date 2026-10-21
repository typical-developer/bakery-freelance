export default function ParallaxBand() {
  return (
    <div className="parallax-image-wrapper" data-parallax>
      <div className="parallax-image-div">
        <img
          src="/images/parallax-baker.jpg"
          alt="Freshly baked La Crave pastries on the counter"
          className="parallax-image"
          loading="lazy"
        />
      </div>
    </div>
  );
}
