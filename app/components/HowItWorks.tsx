const steps = [
  {
    title: "Send us a message",
    body: "Slide into our DMs or message us on WhatsApp with what you are craving and when you need it.",
  },
  {
    title: "We bake it fresh",
    body: "Everything is baked to order and packed with care, so it reaches you at its best.",
  },
  {
    title: "Same-day delivery",
    body: "We deliver across Port Harcourt the same day, every day.",
  },
];

import SectionEyebrow from "./SectionEyebrow";

export default function HowItWorks() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <SectionEyebrow icon="steps" data-fade>
            How it works
          </SectionEyebrow>
          <h2 className="display-2" data-split>
            from your message to your door
          </h2>
        </div>
        <div className="section-gap" />
        <ol className="steps">
          {steps.map((step) => (
            <li className="step" key={step.title} data-reveal>
              <h3 className="title-3">{step.title}</h3>
              <p className="small">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
