import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();

  const [{ data: businessInfo }, { data: websiteSettings }] = await Promise.all([
    supabase
      .from("shop_business_info")
      .select("phone, whatsapp_number, address, opening_hours")
      .eq("website_id", WEBSITE_ID)
      .maybeSingle(),
    supabase
      .from("website_settings")
      .select("logo_url, google_maps_embed, facebook_url, instagram_url")
      .eq("website_id", WEBSITE_ID)
      .maybeSingle(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <h1 className="font-display text-2xl text-ink mb-8">Settings</h1>
      <SettingsForm
        defaultValues={{
          phone: businessInfo?.phone,
          whatsapp_number: businessInfo?.whatsapp_number,
          address: businessInfo?.address,
          opening_hours: businessInfo?.opening_hours,
          logo_url: websiteSettings?.logo_url,
          google_maps_embed: websiteSettings?.google_maps_embed,
          facebook_url: websiteSettings?.facebook_url,
          instagram_url: websiteSettings?.instagram_url,
        }}
      />
    </main>
  );
}
