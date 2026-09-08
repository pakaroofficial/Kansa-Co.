"use client";

import { useActionState } from "react";
import Image from "next/image";
import { useImageUpload } from "./useImageUpload";
import type { ActionState } from "@/lib/admin/products";

type Category = { id: string; name: string };

export default function ProductForm({
  categories,
  action,
  submitLabel,
  defaultValues,
}: {
  categories: Category[];
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  defaultValues?: {
    name?: string;
    price?: number;
    category_id?: string | null;
    description?: string | null;
    long_description?: string | null;
    finish?: string | null;
    image_url?: string | null;
    is_active?: boolean;
    is_featured?: boolean;
  };
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    null
  );
  const { imageUrl, uploading, uploadError, handleImageChange } = useImageUpload(
    "products",
    defaultValues?.image_url || ""
  );

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <input type="hidden" name="image_url" value={imageUrl} />

      <div>
        <label className="block text-sm text-ink/70 mb-1.5">Photo</label>
        <div className="flex items-center gap-4">
          <div className="relative w-28 h-28 rounded-[4px] overflow-hidden bg-bark shrink-0">
            {imageUrl && (
              <Image src={imageUrl} alt="" fill sizes="112px" className="object-cover" />
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="text-sm"
            />
            {uploading && <p className="text-xs text-ink/50 mt-1">Uploading…</p>}
            {uploadError && <p className="text-xs text-red-700 mt-1">{uploadError}</p>}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm text-ink/70 mb-1.5">
          Product name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={defaultValues?.name}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm text-ink/70 mb-1.5">
            Price (₹)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues?.price}
            className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
          />
        </div>
        <div>
          <label htmlFor="category_id" className="block text-sm text-ink/70 mb-1.5">
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={defaultValues?.category_id || ""}
            className="w-full border hairline rounded-[3px] px-4 py-2.5 bg-white focus:outline-none focus:border-brass"
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="finish" className="block text-sm text-ink/70 mb-1.5">
          Finish (optional)
        </label>
        <input
          id="finish"
          name="finish"
          type="text"
          placeholder="e.g. Antique matte, Polished gold"
          defaultValue={defaultValues?.finish || ""}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm text-ink/70 mb-1.5">
          Short description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Shown on the product grid — keep it to one line"
          defaultValue={defaultValues?.description || ""}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
        />
      </div>

      <div>
        <label htmlFor="long_description" className="block text-sm text-ink/70 mb-1.5">
          Full description
        </label>
        <textarea
          id="long_description"
          name="long_description"
          rows={4}
          placeholder="Shown on the product's own page"
          defaultValue={defaultValues?.long_description || ""}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass resize-none"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={defaultValues?.is_active ?? true}
          />
          Active (visible on the website)
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={defaultValues?.is_featured ?? false}
          />
          Featured on homepage
        </label>
      </div>

      {state?.error && <p className="text-sm text-red-700">{state.error}</p>}

      <button
        type="submit"
        disabled={pending || uploading}
        className="bg-ink text-ivory px-6 py-3 rounded-[3px] text-sm hover:bg-bark transition-colors disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
