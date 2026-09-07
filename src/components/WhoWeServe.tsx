import Reveal from "./Reveal";

const audiences = [
  "Home & Family Pooja",
  "Temples & Priests",
  "Weddings & Gifting",
  "Hotels & Restaurants",
  "Interior Designers",
  "Corporate & Bulk Orders",
];

export default function WhoWeServe() {
  return (
    <section className="border-t hairline bg-ivory">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <Reveal>
          <p className="text-brass text-sm mb-3">Who we serve</p>
          <h2 className="font-display text-3xl text-ink mb-12 max-w-lg">
            Pieces for every reason to give or gather.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {audiences.map((audience, i) => (
            <Reveal key={audience} delay={i * 60} className="h-full">
              <div className="glass brass-texture h-full flex items-center justify-center text-center overflow-hidden rounded-[6px] py-6 px-4 text-sm text-ink/80 hover:text-ink hover:border-brass/40 hover:-translate-y-0.5 transition-all duration-300">
                {audience}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
