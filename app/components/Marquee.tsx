const items = [
  "Baked fresh daily",
  "Meat pies",
  "Custom cakes",
  "Banana bread",
  "Brownies",
  "Same-day delivery",
];

function Set({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee-set" aria-hidden={hidden || undefined}>
      {[...items, ...items].map((item, index) => (
        <span className="marquee-item" key={`${item}-${index}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" data-marquee>
        <Set />
        <Set hidden />
      </div>
    </div>
  );
}
