import Image from "next/image";
import { getProductBySlug, getCategoryById, products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { buildProductQuoteLink } from "@/lib/whatsapp";
import { UrnMotif } from "@/components/BrassMotif";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryById(product.category_id);
  const related = products
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-16">
      <nav className="text-sm text-ink/50 mb-10">
        <Link href="/products" className="hover:text-ink">
          Shop
        </Link>
        {category && (
          <>
            {" "}
            /{" "}
            <Link
              href={`/products?category=${category.slug}`}
              className="hover:text-ink"
            >
              {category.name}
            </Link>
          </>
        )}
        {" "}/ <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-14">
        <Reveal className="relative aspect-square bg-bark rounded-[6px] overflow-hidden ring-1 ring-brass/15 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.5)]">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UrnMotif className="w-1/2 h-1/2 text-brass/80" />
            </div>
          )}
        </Reveal>

        <Reveal delay={100}>
          <p className="text-sm text-brass">{product.finish}</p>
          <h1 className="font-display text-3xl md:text-4xl text-ink mt-2">
            {product.name}
          </h1>
          <p className="mt-4 text-xl text-ink/80">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-ink/70 leading-relaxed max-w-md">
            {product.long_description}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href={buildProductQuoteLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-center px-6 py-3 rounded-[3px] text-sm hover:brightness-110 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Get a WhatsApp quote
            </a>
            <Link
              href="/contact"
              className="border hairline text-center px-6 py-3 rounded-[3px] text-sm text-ink hover:border-brass transition-colors"
            >
              Enquire by form
            </Link>
          </div>

          <dl className="mt-10 pt-8 border-t hairline grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-ink/50">Finish</dt>
            <dd className="text-ink/80">{product.finish}</dd>
            <dt className="text-ink/50">Made to order</dt>
            <dd className="text-ink/80">7–10 working days</dd>
            <dt className="text-ink/50">Care</dt>
            <dd className="text-ink/80">Hand wash, dry immediately</dd>
          </dl>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-8">
              More from {category?.name}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <ProductCard product={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
