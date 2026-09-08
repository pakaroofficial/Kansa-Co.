"use client";

import { useActionState } from "react";
import Image from "next/image";
import { useImageUpload } from "./useImageUpload";
import { updateSettings, type SettingsActionState } from "@/lib/admin/settings";

export default function SettingsForm({
  defaultValues,
}: {
  defaultValues: {
    phone?: string | null;
    whatsapp_number?: string | null;
    address?: string | null;
    opening_hours?: string | null;
    logo_url?: string | null;
    google_maps_embed?: string | null;
    facebook_url?: string | null;
    instagram_url?: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState<SettingsActionState, FormData>(
    updateSettings,
    null
  );
  const { imageUrl, uploading, uploadError, handleImageChange } = useImageUpload(
    "settings",
    defaultValues.logo_url || ""
  );

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <input type="hidden" name="logo_url" value={imageUrl} />

      <section>
        <h2 className="font-display text-lg text-ink mb-4">Logo</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-[4px] overflow-hidden bg-bark shrink-0">
            {imageUrl && (
              <Image src={imageUrl} alt="" fill sizes="80px" className="object-contain" />
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
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-ink">Contact</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm text-ink/70 mb-1.5">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={defaultValues.phone || ""}
              className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
            />
          </div>
          <div>
            <label htmlFor="whatsapp_number" className="block text-sm text-ink/70 mb-1.5">
              WhatsApp number
            </label>
            <input
              id="whatsapp_number"
              name="whatsapp_number"
              type="tel"
              defaultValue={defaultValues.whatsapp_number || ""}
              className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm text-ink/70 mb-1.5">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            defaultValue={defaultValues.address || ""}
            className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
          />
        </div>

        <div>
          <label htmlFor="opening_hours" className="block text-sm text-ink/70 mb-1.5">
            Opening hours
          </label>
          <input
            id="opening_hours"
            name="opening_hours"
            type="text"
            placeholder="e.g. 10am – 7pm, Mon–Sat"
            defaultValue={defaultValues.opening_hours || ""}
            className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg text-ink">Map &amp; social</h2>

        <div>
          <label htmlFor="google_maps_embed" className="block text-sm text-ink/70 mb-1.5">
            Google Maps embed link
          </label>
          <input
            id="google_maps_embed"
            name="google_maps_embed"
            type="url"
            placeholder="https://www.google.com/maps/embed?..."
            defaultValue={defaultValues.google_maps_embed || ""}
            className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
          />
          <p className="text-xs text-ink/40 mt-1">
            In Google Maps: Share → Embed a map → copy the link inside{" "}
            <code>src=&quot;...&quot;</code> from the code shown.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="facebook_url" className="block text-sm text-ink/70 mb-1.5">
              Facebook link
            </label>
            <input
              id="facebook_url"
              name="facebook_url"
              type="url"
              placeholder="https://facebook.com/..."
              defaultValue={defaultValues.facebook_url || ""}
              className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
            />
          </div>
          <div>
            <label htmlFor="instagram_url" className="block text-sm text-ink/70 mb-1.5">
              Instagram link
            </label>
            <input
              id="instagram_url"
              name="instagram_url"
              type="url"
              placeholder="https://instagram.com/..."
              defaultValue={defaultValues.instagram_url || ""}
              className="w-full border hairline rounded-[3px] px-4 py-2.5 focus:outline-none focus:border-brass"
            />
          </div>
        </div>
      </section>

      {state && "error" in state && (
        <p className="text-sm text-red-700">{state.error}</p>
      )}
      {state && "success" in state && (
        <p className="text-sm text-patina">Saved.</p>
      )}

      <button
        type="submit"
        disabled={pending || uploading}
        className="bg-ink text-ivory px-6 py-3 rounded-[3px] text-sm hover:bg-bark transition-colors disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
