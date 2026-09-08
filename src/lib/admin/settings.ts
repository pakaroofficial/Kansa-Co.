"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";

export type SettingsActionState = { error: string } | { success: true } | null;

export async function updateSettings(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const supabase = await createClient();

  const phone = String(formData.get("phone") || "").trim() || null;
  const whatsapp_number = String(formData.get("whatsapp_number") || "").trim() || null;
  const address = String(formData.get("address") || "").trim() || null;
  const opening_hours = String(formData.get("opening_hours") || "").trim() || null;
  const logo_url = String(formData.get("logo_url") || "").trim() || null;
  const google_maps_embed = String(formData.get("google_maps_embed") || "").trim() || null;
  const facebook_url = String(formData.get("facebook_url") || "").trim() || null;
  const instagram_url = String(formData.get("instagram_url") || "").trim() || null;

  const { error: bizError } = await supabase
    .from("shop_business_info")
    .update({
      phone,
      whatsapp_number,
      address,
      opening_hours,
      updated_at: new Date().toISOString(),
    })
    .eq("website_id", WEBSITE_ID);

  if (bizError) {
    console.error("updateSettings shop_business_info error:", bizError);
    return { error: "Unable to save your contact details. Please try again." };
  }

  // website_settings has no pre-created row (unlike shop_business_info),
  // so update it if it exists, otherwise create it.
  const { data: existingSettings } = await supabase
    .from("website_settings")
    .select("id")
    .eq("website_id", WEBSITE_ID)
    .maybeSingle();

  const settingsPayload = { logo_url, google_maps_embed, facebook_url, instagram_url };

  const { error: settingsError } = existingSettings
    ? await supabase
        .from("website_settings")
        .update(settingsPayload)
        .eq("website_id", WEBSITE_ID)
    : await supabase
        .from("website_settings")
        .insert({ website_id: WEBSITE_ID, ...settingsPayload });

  if (settingsError) {
    console.error("updateSettings website_settings error:", settingsError);
    return { error: "Unable to save your website settings. Please try again." };
  }

  revalidatePath("/admin/settings");
  return { success: true };
}
