"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";

export async function toggleEnquiryHandled(formData: FormData) {
  const id = String(formData.get("id") || "");
  const nextValue = formData.get("value") === "true";
  if (!id) return;

  const supabase = await createClient();
  await supabase
    .from("enquiries")
    .update({ is_handled: nextValue })
    .eq("id", id)
    .eq("website_id", WEBSITE_ID);

  revalidatePath("/admin/enquiries");
}
