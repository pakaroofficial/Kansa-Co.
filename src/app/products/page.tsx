import { categories, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Shop — Kansa & Co.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = categories.find((c) => c.slug === category);
  const visibleProducts = activeCategory
    ? products.filter((p) => p.category_id === activeCategory.id)
    : products;

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-16">
      <Reveal>
        <div className="max-w-xl">
          <p className="text-brass text-sm mb-3">Shop</p>
          <h1 className="font-display text-4xl text-ink">
            {activeCategory ? activeCategory.name : "The full collection"}
          </h1>
          <p className="mt-4 text-ink/60">
            {activeCategory
              ? activeCategory.description
              : "Every piece currently in the workshop, cast in small runs and finished by hand."}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/products"
            className={`text-sm rounded-[3px] px-4 py-2 border hairline transition-colors ${
              !activeCategory
                ? "bg-ink text-ivory border-ink"
                : "text-ink/70 hover:border-brass"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={`text-sm rounded-[3px] px-4 py-2 border hairline transition-colors ${
                activeCategory?.id === cat.id
                  ? "bg-ink text-ivory border-ink"
                  : "text-ink/70 hover:border-brass"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </Reveal>

      {visibleProducts.length === 0 ? (
        <p className="mt-16 text-ink/50">
          No products have been added to this category yet.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visibleProducts.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 100}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
