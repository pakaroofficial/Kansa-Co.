import Image from "next/image";
import Link from "next/link";
import { getCategories, getFeaturedProducts } from "@/lib/public/products";
import { business } from "@/lib/business";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhoWeServe from "@/components/WhoWeServe";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default async function Home() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(3),
  ]);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-ink text-ivory overflow-hidden py-20 md:py-0 md:h-[calc(100vh-5rem)] md:max-h-[820px] md:min-h-[560px] md:flex md:items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 sm:via-ink/70 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 w-full">
          <div className="max-w-xl">
            <p className="animate-fade-in-up inline-flex items-center gap-2 text-brass-light text-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-light" />
              Est. 1978 · Moradabad, India
            </p>
            <h1 className="animate-fade-in-up font-display text-[2.85rem] md:text-[4.2rem] leading-[1.05] tracking-tight text-ivory">
              Brass that gets{" "}
              <span className="text-brass-light italic">better</span> with
              every year you use it.
            </h1>
            <p className="animate-fade-in-up-delay mt-7 text-ivory-dim text-lg leading-relaxed max-w-md">
              We cast, hammer and spin every piece by hand in a small
              workshop that&apos;s made brass for three generations. Nothing
              here is mass-poured — you can see the tool marks if you look
              closely.
            </p>
            <div className="animate-fade-in-up-delay mt-10 flex items-center gap-7">
              <Link
                href="/products"
                className="bg-brass text-ink px-7 py-3.5 rounded-[3px] text-sm font-medium shadow-[0_10px_30px_-10px_rgba(185,138,46,0.6)] hover:bg-brass-light hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(185,138,46,0.75)] transition-all duration-200"
              >
                Explore the collection →
              </Link>
              <Link
                href="/about"
                className="text-sm text-ivory-dim hover:text-ivory transition-colors border-b border-transparent hover:border-ivory-dim pb-1"
              >
                Read our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b hairline bg-ivory">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-5">
          <Reveal>
            <TrustBar />
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 md:px-10 py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl text-ink">
                Shop by room
              </h2>
              <Link href="/products" className="text-sm text-ink/60 hover:text-ink">
                View all
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 100} className="h-full">
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group h-full flex flex-col glass overflow-hidden rounded-[6px] hover:bg-white hover:border-brass hover:shadow-[0_16px_36px_-16px_rgba(185,138,46,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-bark">
                    {cat.image_url && (
                      <Image
                        src={cat.image_url}
                        alt={cat.name}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display text-xl text-ink">{cat.name}</h3>
                    <p className="mt-2 text-sm text-ink/60 leading-relaxed flex-1">
                      {cat.description}
                    </p>
                    <span className="mt-5 inline-block text-sm text-brass group-hover:translate-x-1 transition-transform">
                      Browse →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Story */}
      <section className="bg-bark text-ivory brass-texture">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="text-patina-light text-sm mb-4">The workshop</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight text-ivory">
              Started by my grandfather with one furnace and a hand lathe.
            </h2>
            <p className="mt-6 text-ivory-dim leading-relaxed max-w-md">
              We still work from the same lane in Moradabad, though the
              furnace has changed a few times. What hasn&apos;t changed is
              that every diya, thali and urn is checked by a person before it
              ships — not a machine.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-block text-sm text-brass-light hover:text-brass transition-colors"
            >
              Meet the karigars →
            </Link>
          </Reveal>
          <Reveal delay={150} className="w-full">
            <div className="relative aspect-[4/5] w-full max-w-[300px] mx-auto md:ml-auto rounded-[6px] overflow-hidden ring-1 ring-brass/20 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/workshop/workshop-lane.png"
                alt="A narrow lane of brass workshops in Moradabad, glowing at dusk"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 md:px-10 py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl text-ink">
                Featured pieces
              </h2>
              <Link href="/products" className="text-sm text-ink/60 hover:text-ink">
                Shop the full collection →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 100}>
                <ProductCard product={product} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Who we serve */}
      <WhoWeServe />

      {/* CTA */}
      <section className="bg-gradient-to-br from-brass via-brass to-brass-light">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <h2 className="font-display text-2xl md:text-3xl text-ink max-w-md">
            Want something sized or engraved for a specific occasion?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={buildWhatsAppLink(
                `Hi ${business.name}, I'd like something custom sized or engraved.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-[3px] text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp us
            </a>
            <Link
              href="/contact"
              className="bg-ink text-ivory px-6 py-3 rounded-[3px] text-sm hover:bg-bark hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              Talk to the workshop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
