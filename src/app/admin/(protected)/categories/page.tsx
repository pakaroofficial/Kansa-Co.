import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { deleteCategory } from "@/lib/admin/categories";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, image_url, sort_order")
    .eq("website_id", WEBSITE_ID)
    .order("sort_order");

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-ink">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="bg-ink text-ivory px-5 py-2.5 rounded-[3px] text-sm hover:bg-bark transition-colors"
        >
          + Add category
        </Link>
      </div>

      {!categories || categories.length === 0 ? (
        <p className="text-ink/50">No categories have been added yet.</p>
      ) : (
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-4 border hairline rounded-[3px] p-4"
            >
              <div className="relative w-16 h-16 rounded-[3px] overflow-hidden bg-bark shrink-0">
                {category.image_url && (
                  <Image
                    src={category.image_url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>
              <p className="flex-1 text-ink font-medium">{category.name}</p>
              <Link
                href={`/admin/categories/${category.id}/edit`}
                className="text-sm text-ink/60 hover:text-brass"
              >
                Edit
              </Link>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={category.id} />
                <DeleteButton
                  confirmText={`Delete "${category.name}"? This can't be undone.`}
                />
              </form>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
