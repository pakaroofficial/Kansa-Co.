import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { createProduct } from "@/lib/admin/products";
import { getPlanLabel, getProductLimit } from "@/lib/plans";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: website }, { count: productCount }] =
    await Promise.all([
      supabase
        .from("categories")
        .select("id, name")
        .eq("website_id", WEBSITE_ID)
        .order("sort_order"),
      supabase.from("websites").select("plan").eq("id", WEBSITE_ID).maybeSingle(),
      supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("website_id", WEBSITE_ID),
    ]);

  const limit = getProductLimit(website?.plan ?? null);
  const atLimit = (productCount ?? 0) >= limit;

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <h1 className="font-display text-2xl text-ink mb-8">Add a product</h1>
      {atLimit ? (
        <div className="border hairline rounded-[3px] p-8 max-w-lg bg-brass/5">
          <p className="font-display text-xl text-ink">
            You&apos;ve reached your plan&apos;s product limit
          </p>
          <p className="mt-2 text-sm text-ink/60 leading-relaxed">
            Your {getPlanLabel(website?.plan ?? null)} plan allows up to{" "}
            {limit} products, and you&apos;re already there. Contact Vmakizy
            to upgrade your plan and add more.
          </p>
        </div>
      ) : (
        <ProductForm
          categories={categories || []}
          action={createProduct}
          submitLabel="Add product"
        />
      )}
    </main>
  );
}
