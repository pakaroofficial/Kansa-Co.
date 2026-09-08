import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { createProduct } from "@/lib/admin/products";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .eq("website_id", WEBSITE_ID)
    .order("sort_order");

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <h1 className="font-display text-2xl text-ink mb-8">Add a product</h1>
      <ProductForm
        categories={categories || []}
        action={createProduct}
        submitLabel="Add product"
      />
    </main>
  );
}
