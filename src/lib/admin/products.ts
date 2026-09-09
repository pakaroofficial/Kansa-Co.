"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { getPlanLabel, getProductLimit } from "@/lib/plans";

export type ActionState = { error: string } | null;

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readProductFields(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const priceRaw = String(formData.get("price") || "").trim();
  const price = Number(priceRaw);

  return {
    name,
    price,
    isValidPrice: priceRaw !== "" && !Number.isNaN(price) && price >= 0,
    category_id: String(formData.get("category_id") || "") || null,
    description: String(formData.get("description") || "").trim() || null,
    long_description:
      String(formData.get("long_description") || "").trim() || null,
    finish: String(formData.get("finish") || "").trim() || null,
    details: String(formData.get("details") || "").trim() || null,
    image_url: String(formData.get("image_url") || "").trim() || null,
    is_active: formData.get("is_active") === "on",
    is_featured: formData.get("is_featured") === "on",
  };
}

export async function createProduct(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const fields = readProductFields(formData);

  if (!fields.name) return { error: "Please enter a product name." };
  if (!fields.isValidPrice)
    return { error: "Please enter a valid price (0 or more)." };

  const supabase = await createClient();

  const [{ data: website }, { count: productCount }] = await Promise.all([
    supabase.from("websites").select("plan").eq("id", WEBSITE_ID).maybeSingle(),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("website_id", WEBSITE_ID),
  ]);
  const limit = getProductLimit(website?.plan ?? null);
  if ((productCount ?? 0) >= limit) {
    return {
      error: `You've reached the ${limit}-product limit on your ${getPlanLabel(
        website?.plan ?? null
      )} plan. Contact Vmakizy to upgrade your plan and add more products.`,
    };
  }

  const { error } = await supabase.from("products").insert({
    website_id: WEBSITE_ID,
    category_id: fields.category_id,
    name: fields.name,
    slug: slugify(fields.name),
    description: fields.description,
    long_description: fields.long_description,
    finish: fields.finish,
    details: fields.details,
    price: fields.price,
    image_url: fields.image_url,
    is_active: fields.is_active,
    is_featured: fields.is_featured,
  });

  if (error) {
    console.error("createProduct error:", error);
    return { error: "Unable to save this product. Please try again." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(
  productId: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const fields = readProductFields(formData);

  if (!fields.name) return { error: "Please enter a product name." };
  if (!fields.isValidPrice)
    return { error: "Please enter a valid price (0 or more)." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({
      category_id: fields.category_id,
      name: fields.name,
      slug: slugify(fields.name),
      description: fields.description,
      long_description: fields.long_description,
      finish: fields.finish,
      details: fields.details,
      price: fields.price,
      image_url: fields.image_url,
      is_active: fields.is_active,
      is_featured: fields.is_featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId)
    .eq("website_id", WEBSITE_ID);

  if (error) {
    console.error("updateProduct error:", error);
    return { error: "Unable to save this product. Please try again." };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id).eq("website_id", WEBSITE_ID);

  revalidatePath("/admin/products");
}

export async function toggleProductField(formData: FormData) {
  const id = String(formData.get("id") || "");
  const field = String(formData.get("field") || "");
  const nextValue = formData.get("value") === "true";

  if (!id || (field !== "is_active" && field !== "is_featured")) return;

  const supabase = await createClient();
  await supabase
    .from("products")
    .update({ [field]: nextValue })
    .eq("id", id)
    .eq("website_id", WEBSITE_ID);

  revalidatePath("/admin/products");
}
