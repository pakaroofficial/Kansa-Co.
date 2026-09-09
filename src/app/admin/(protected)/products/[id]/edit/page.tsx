import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { updateProduct } from "@/lib/admin/products";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select(
        "id, name, price, category_id, description, long_description, finish, details, image_url, is_active, is_featured"
      )
      .eq("id", id)
      .eq("website_id", WEBSITE_ID)
      .maybeSingle(),
    supabase
      .from("categories")
      .select("id, name")
      .eq("website_id", WEBSITE_ID)
      .order("sort_order"),
  ]);

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, product.id);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <h1 className="font-display text-2xl text-ink mb-8">Edit product</h1>
      <ProductForm
        categories={categories || []}
        action={boundUpdate}
        submitLabel="Save changes"
        defaultValues={{
          name: product.name,
          price: Number(product.price),
          category_id: product.category_id,
          description: product.description,
          long_description: product.long_description,
          finish: product.finish,
          details: product.details,
          image_url: product.image_url,
          is_active: product.is_active,
          is_featured: product.is_featured,
        }}
      />
    </main>
  );
}
