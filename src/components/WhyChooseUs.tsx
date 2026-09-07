import Reveal from "./Reveal";

const items = [
  {
    title: "Three generations deep",
    text: "Founded in 1978 and still run by the same family, from the same lane in Moradabad — not a factory with heritage branding added later.",
  },
  {
    title: "Hand-finished, not mass-poured",
    text: "Every piece passes through a karigar's hands — filed, hammered or engraved — so you feel real tool marks, not machine uniformity.",
  },
  {
    title: "Made to order, not to stock",
    text: "We cast in small batches against real orders, which means fresher pieces and no warehouse mark-downs to pay for.",
  },
  {
    title: "Straight from the workshop",
    text: "No distributors or showroom mark-ups in between — you're buying directly from the people who make it.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-6 md:px-10 py-20 border-b hairline">
      <Reveal>
        <p className="text-brass text-sm mb-3">Why choose us</p>
        <h2 className="font-display text-3xl text-ink mb-12 max-w-lg">
          What you&apos;re actually paying for.
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80} className="h-full">
            <div className="glass brass-texture h-full overflow-hidden rounded-[8px] p-6 shadow-[0_10px_28px_-16px_rgba(185,138,46,0.35)] hover:-translate-y-1 transition-transform duration-300">
              <span className="block w-8 h-[3px] bg-brass mb-4" />
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
