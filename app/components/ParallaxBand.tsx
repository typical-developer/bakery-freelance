import BgCarousel from "./BgCarousel";
import { getGallery } from "../media";

/** The cut-out photo band above the footer: the gallery again, starting
    part-way through so it never matches the hero. */
export default function ParallaxBand() {
  const gallery = getGallery();
  return (
    <div className="band" data-band>
      <span className="band-tear" data-band-tear aria-hidden="true" />
      <div className="band-img" data-band-img>
        <BgCarousel images={gallery} start={Math.floor(gallery.length / 2)} interval={6500} />
      </div>
    </div>
  );
}
