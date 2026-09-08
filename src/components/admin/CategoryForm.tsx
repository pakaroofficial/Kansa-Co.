"use client";

import { useActionState } from "react";
import Image from "next/image";
import { useImageUpload } from "./useImageUpload";
import type { ActionState } from "@/lib/admin/products";

export default function CategoryForm({
  action,
  submitLabel,
  defaultValues,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  defaultValues?: {
    name?: string;
    image_url?: string | null;
    sort_order?: number | null;
  };
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    null
  );
  const { imageUrl, uploading, uploadError, handleImageChange } = useImageUpload(
    "categories",
    defaultValues?.image_url || ""
  );

  return (
    <form action={formAction} className="max-w-xl space-y-6">
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
          Category name
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

      <div>
        <label htmlFor="sort_order" className="block text-sm text-ink/70 mb-1.5">
          Display order
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={defaultValues?.sort_order ?? 0}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
        />
        <p className="text-xs text-ink/40 mt-1">
          Lower numbers show first on the website.
        </p>
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
