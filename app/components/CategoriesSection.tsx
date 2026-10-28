import Link from "next/link";
import Arrow from "./Arrow";
import PhotoCard from "./PhotoCard";
import SectionEyebrow from "./SectionEyebrow";
import { getCategories } from "../media";

export default function CategoriesSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <SectionEyebrow icon="menu" data-fade>
What we bake
            </SectionEyebrow>
          <h2 className="display-2" data-split>
            From fan-favourite meat pies to celebration cakes
          </h2>
          <p className="lead" data-fade>
            From quick bites to show-stopping centrepieces, explore our
            carefully crafted menu. Whether you&apos;re after a savoury snack, a
            comforting loaf, or a cake for the occasion, La Crave has something
            to make your day.
          </p>
        </div>
        <div className="section-gap" />
        <div className="grid-3">
          {getCategories().map((category, index) => (
            <PhotoCard
              key={category.title}
              href="/menu"
              img={category.img}
              alt={category.alt}
              sizes="(min-width: 992px) 24rem, 90vw"
              flip={index % 2 === 1}
            >
              <div className="photo-card-body">
                <h3 className="title-3">{category.title}</h3>
                <p className="small">{category.body}</p>
              </div>
            </PhotoCard>
          ))}
        </div>
        <div className="section-gap" />
        <div className="actions" style={{ justifyContent: "center" }} data-fade>
          <Link href="/menu" className="btn">
            see the full menu
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
