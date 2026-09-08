import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { updateCategory } from "@/lib/admin/categories";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("id, name, description, image_url, sort_order")
    .eq("id", id)
    .eq("website_id", WEBSITE_ID)
    .maybeSingle();

  if (!category) notFound();

  const boundUpdate = updateCategory.bind(null, category.id);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <h1 className="font-display text-2xl text-ink mb-8">Edit category</h1>
      <CategoryForm
        action={boundUpdate}
        submitLabel="Save changes"
        defaultValues={{
          name: category.name,
          description: category.description,
          image_url: category.image_url,
          sort_order: category.sort_order,
        }}
      />
    </main>
  );
}
