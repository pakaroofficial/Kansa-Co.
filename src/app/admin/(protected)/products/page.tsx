import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { deleteProduct, toggleProductField } from "@/lib/admin/products";
import { formatPrice } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function ProductsPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, price, image_url, is_active, is_featured, category_id")
      .eq("website_id", WEBSITE_ID)
      .order("created_at", { ascending: false }),
    supabase.from("categories").select("id, name").eq("website_id", WEBSITE_ID),
  ]);

  const categoryName = new Map((categories || []).map((c) => [c.id, c.name]));

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-ink">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-ink text-ivory px-5 py-2.5 rounded-[3px] text-sm hover:bg-bark transition-colors"
        >
          + Add product
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <p className="text-ink/50">No products have been added yet.</p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-wrap items-center gap-4 border hairline rounded-[3px] p-4"
            >
              <div className="relative w-16 h-16 rounded-[3px] overflow-hidden bg-bark shrink-0">
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-[160px]">
                <p className="text-ink font-medium truncate">{product.name}</p>
                <p className="text-sm text-ink/50">
                  {product.category_id
                    ? categoryName.get(product.category_id) || "Uncategorised"
                    : "No category"}{" "}
                  · {formatPrice(Number(product.price))}
                </p>
              </div>

              <form action={toggleProductField}>
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="field" value="is_active" />
                <input
                  type="hidden"
                  name="value"
                  value={(!product.is_active).toString()}
                />
                <button
                  type="submit"
                  className={`text-xs px-3 py-1.5 rounded-full border hairline whitespace-nowrap ${
                    product.is_active
                      ? "bg-patina/10 text-patina border-patina/30"
                      : "text-ink/40"
                  }`}
                >
                  {product.is_active ? "Active" : "Inactive"}
                </button>
              </form>

              <form action={toggleProductField}>
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="field" value="is_featured" />
                <input
                  type="hidden"
                  name="value"
                  value={(!product.is_featured).toString()}
                />
                <button
                  type="submit"
                  className={`text-xs px-3 py-1.5 rounded-full border hairline whitespace-nowrap ${
                    product.is_featured
                      ? "bg-brass/10 text-brass border-brass/30"
                      : "text-ink/40"
                  }`}
                >
                  {product.is_featured ? "Featured" : "Not featured"}
                </button>
              </form>

              <Link
                href={`/admin/products/${product.id}/edit`}
                className="text-sm text-ink/60 hover:text-brass"
              >
                Edit
              </Link>

              <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <DeleteButton confirmText={`Delete "${product.name}"? This can't be undone.`} />
              </form>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
