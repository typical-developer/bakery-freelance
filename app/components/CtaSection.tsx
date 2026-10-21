import Image from "next/image";
import { INSTAGRAM, WHATSAPP } from "../site";

export default function CtaSection() {
  return (
    <section className="section section--torn section--peach">
      <div className="container">
        <div className="cta-card" data-reveal>
          <div className="cta-inner">
            <div className="cta-media">
              <Image
                src="/images/cta-baker.webp"
                alt="A La Crave baker holding a tray of fresh pastries"
                fill
                sizes="(min-width: 992px) 28rem, 90vw"
              />
            </div>
            <div className="cta-copy">
              <div className="stack">
                <span className="eyebrow">Order today</span>
                <h2 className="display-2">get the goodies</h2>
                <p className="lead">
                  Slide into our DMs or send a WhatsApp message and we&apos;ll
                  take your order from there. Same-day delivery in Port Harcourt.
                </p>
                <div className="actions">
                  <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">
                    order on whatsapp
                  </a>
                  <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn btn--ghost">
                    message on instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
