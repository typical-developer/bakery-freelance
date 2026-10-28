import Image from "next/image";
import { getGallery } from "../media";

/** A single still photo keeps the band lightweight while preserving its parallax feel. */
export default function ParallaxBand() {
  const image = getGallery()[0];

  return (
    <div className="band" data-band>
      <span className="band-tear" data-band-tear aria-hidden="true" />
      <div className="band-img" data-band-img>
        <Image src={image.src} alt={image.alt} fill sizes="100vw" loading="lazy" />
      </div>
    </div>
  );
}
