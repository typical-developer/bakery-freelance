import Image from "next/image";
import SocialButton from "./SocialButton";
import SectionEyebrow from "./SectionEyebrow";

export default function CtaSection() {
  return (
    <section className="section section--torn section--brand">
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
                <SectionEyebrow icon="order">Order today</SectionEyebrow>
                <h2 className="display-2">get the goodies</h2>
                <p className="lead">
                  Slide into our DMs or send a WhatsApp message and we&apos;ll
                  take your order from there. Same-day delivery in Port Harcourt.
                </p>
                <div className="actions">
                  <SocialButton network="whatsapp">order on whatsapp</SocialButton>
                  <SocialButton network="instagram">message on instagram</SocialButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
