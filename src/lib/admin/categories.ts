"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import type { ActionState } from "./products";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readCategoryFields(formData: FormData) {
  return {
    name: String(formData.get("name") || "").trim(),
    image_url: String(formData.get("image_url") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0) || 0,
  };
}

export async function createCategory(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const fields = readCategoryFields(formData);
  if (!fields.name) return { error: "Please enter a category name." };

  const supabase = await createClient();
  const { error } = await supabase.from("categories").insert({
    website_id: WEBSITE_ID,
    name: fields.name,
    slug: slugify(fields.name),
    image_url: fields.image_url,
    sort_order: fields.sort_order,
  });

  if (error) {
    console.error("createCategory error:", error);
    return { error: "Unable to save this category. Please try again." };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(
  categoryId: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const fields = readCategoryFields(formData);
  if (!fields.name) return { error: "Please enter a category name." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({
      name: fields.name,
      slug: slugify(fields.name),
      image_url: fields.image_url,
      sort_order: fields.sort_order,
    })
    .eq("id", categoryId)
    .eq("website_id", WEBSITE_ID);

  if (error) {
    console.error("updateCategory error:", error);
    return { error: "Unable to save this category. Please try again." };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id).eq("website_id", WEBSITE_ID);

  revalidatePath("/admin/categories");
}
