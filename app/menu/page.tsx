import type { Metadata } from "next";
import CtaSection from "../components/CtaSection";
import MenuBrowser from "../components/MenuBrowser";
import { getMenu } from "../media";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore La Crave Bakery's full menu of meat pies, pastry boxes, custom cakes, banana bread and brownies.",
};

export default function MenuPage() {
  const menu = getMenu();
  return (
    <>
      <section className="section menu-listing">
        <div className="container">
          <MenuBrowser menu={menu} />
          <div className="menu-note"><strong>Ordering for a crowd?</strong><span>Tell us what you&apos;re planning and we&apos;ll help you build the right box.</span></div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
