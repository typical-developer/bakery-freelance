import { WHATSAPP } from "../site";

export default function CtaSection() {
  return (
    <section className="section brown-bg">
      <div className="default-container">
        <div className="padding-sm">
          <div className="cta-card-wrapper" data-reveal>
            <div className="cta-padding-container">
              <div className="cta-content-container">
                <div className="cta-img-wrapper">
                  <img
                    src="/images/cta-baker.webp"
                    alt="A La Crave baker holding a tray of fresh pastries"
                    className="cta-img"
                    loading="lazy"
                  />
                </div>
                <div className="cta-content-wrapper">
                  <h3 className="cta-header">get the goodies</h3>
                  <div className="body-base">
                    Slide into our DMs or send a WhatsApp message — we&apos;ll
                    take your order from there. Same-day delivery in Port
                    Harcourt.
                  </div>
                  <div className="space-md" />
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    order on whatsapp
                  </a>
                </div>
              </div>
            </div>
            <div className="cta-bg-div" />
          </div>
        </div>
      </div>
    </section>
  );
}
