import Image from "next/image";

export default function ParallaxBand() {
  return (
    <div className="band" data-band>
      <div className="band-img" data-band-img>
        <Image
          src="/images/parallax-baker.jpg"
          alt="Freshly baked La Crave pastries on the counter"
          fill
          sizes="100vw"
        />
      </div>
    </div>
  );
}
