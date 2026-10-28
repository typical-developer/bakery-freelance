import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "../components/Arrow";
import CtaSection from "../components/CtaSection";
import PhotoCard from "../components/PhotoCard";
import SeeMore from "../components/SeeMore";
import { GALLERY_PAGE_LIMIT, getGallery } from "../media";
import { WHATSAPP } from "../site";
import SectionEyebrow from "../components/SectionEyebrow";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside La Crave Bakery: meat pies, cakes, banana bread, brownies and more, fresh from the oven in Port Harcourt.",
};

export default function GalleryPage() {
  const photos = getGallery().slice(0, GALLERY_PAGE_LIMIT);
  return (
    <>
      <section className="section--hero">
        <div className="container">
          <div className="section-head">
<SectionEyebrow icon="gallery" data-hero-item>
            The gallery
          </SectionEyebrow>
            <h1 className="display-1" data-split>
              fresh from the oven
            </h1>
            <p className="lead" data-hero-item>
              A look at what comes out of our kitchen. There is always more on
              our Instagram.
            </p>
            <div className="actions" style={{ justifyContent: "center" }} data-hero-item>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">
                order on whatsapp
              </a>
              <Link href="/" className="link-arrow">
                <Arrow dir="left" />
                back home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3 grid-3--center">
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.src}
                img={photo.src}
                alt={photo.alt}
                sizes="(min-width: 992px) 24rem, 90vw"
                flip={index % 2 === 1}
              />
            ))}
          </div>
          <div className="section-gap" />
          <SeeMore />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
