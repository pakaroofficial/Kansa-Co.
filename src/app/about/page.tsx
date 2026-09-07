import Image from "next/image";
import { VineDivider } from "@/components/BrassMotif";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "The workshop — Kansa & Co.",
};

const processSteps = [
  {
    number: "01",
    title: "Casting or spinning",
    image: "/images/process/process-casting.png",
    text: "Most pieces start as molten brass poured into a sand mould, or a flat sheet spun on a lathe against a wooden form, depending on the shape.",
  },
  {
    number: "02",
    title: "Hand finishing",
    image: "/images/process/process-finishing.png",
    text: "A karigar files, hammers or engraves the piece by hand. This is the step that takes the longest, and the one you can feel in the final weight and texture.",
  },
  {
    number: "03",
    title: "Polishing",
    image: "/images/process/process-polishing.png",
    text: "Depending on the piece, we finish in a high polish, an antique matte, or leave a brushed texture — noted on every product page.",
  },
  {
    number: "04",
    title: "Inspection",
    image: "/images/process/process-inspection.png",
    text: "Every piece is checked by hand before it's packed. If it doesn't meet the standard, it goes back to be re-worked or re-melted — nothing seconds-quality leaves the workshop.",
  },
];

const timeline = [
  {
    year: "1978",
    text: "My grandfather Ram Prasad opens a one-furnace workshop on Kanth Road, casting diyas and kalash for nearby temples.",
  },
  {
    year: "1996",
    text: "My father adds a second furnace and a hand lathe, and the workshop starts taking dining-ware orders for the first time.",
  },
  {
    year: "2019",
    text: "I join full-time and start photographing and cataloguing every piece we make — the beginning of this website.",
  },
  {
    year: "Today",
    text: "Six karigars, two furnaces, and the same lane in Moradabad. Everything is still finished by hand.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-ink text-ivory">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="text-brass-light text-sm mb-4">The workshop</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-ivory">
              Three generations, one lane in Moradabad.
            </h1>
            <p className="mt-6 text-ivory-dim leading-relaxed max-w-md">
              Moradabad has been India&apos;s brass city for over two
              hundred years. We&apos;re one of the smaller workshops here —
              six karigars, two furnaces — which means every piece still
              passes through hands we know by name.
            </p>
          </Reveal>
          <Reveal delay={150} className="hidden md:block">
            <div className="relative aspect-[4/5] w-full max-w-[300px] ml-auto rounded-[6px] overflow-hidden ring-1 ring-brass/20 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/workshop/karigar-at-work.png"
                alt="A karigar hand-finishing an engraved brass urn in the workshop"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 md:px-10 py-20">
        <Reveal>
          <p className="text-brass text-sm mb-3">The process</p>
          <h2 className="font-display text-3xl text-ink mb-12">
            How a piece gets made
          </h2>
        </Reveal>
        <div className="space-y-8">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="flex gap-5 border-l hairline pl-6">
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-[4px] overflow-hidden ring-1 ring-brass/20">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-brass mb-1">
                    {step.number} — {step.title}
                  </p>
                  <p className="text-ink/70 leading-relaxed">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-bark text-ivory">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
          <Reveal>
            <div className="relative aspect-[16/9] w-full max-w-2xl mx-auto rounded-[6px] overflow-hidden ring-1 ring-brass/20 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] mb-12">
              <Image
                src="/images/workshop/three-generations.png"
                alt="Two karigars working brass side by side at the same workbench"
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <VineDivider className="w-32 text-brass mb-10" />
            <h2 className="font-display text-3xl text-ivory mb-12">
              The workshop, in short
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-14 gap-y-8">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 80}>
                <div className="flex gap-6">
                  <p className="font-display text-xl text-brass-light w-20 shrink-0">
                    {item.year}
                  </p>
                  <p className="text-ivory-dim leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-3xl text-ink max-w-lg mx-auto">
            Come see the workshop, or start with a piece from the collection.
          </h2>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/products"
              className="bg-brass text-ink px-6 py-3 rounded-[3px] text-sm hover:bg-brass-light transition-colors"
            >
              Shop the collection
            </Link>
            <Link
              href="/contact"
              className="border hairline px-6 py-3 rounded-[3px] text-sm text-ink hover:border-brass transition-colors"
            >
              Plan a visit
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
