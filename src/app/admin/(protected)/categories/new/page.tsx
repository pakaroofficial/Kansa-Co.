import { createCategory } from "@/lib/admin/categories";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <h1 className="font-display text-2xl text-ink mb-8">Add a category</h1>
      <CategoryForm action={createCategory} submitLabel="Add category" />
    </main>
  );
}
