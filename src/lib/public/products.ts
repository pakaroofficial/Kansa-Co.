import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";

export type PublicCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
};

export type PublicProduct = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  finish: string | null;
  details: string | null;
  price: number;
  image_url: string | null;
  is_featured: boolean;
};

const PRODUCT_COLUMNS =
  "id, category_id, name, slug, description, long_description, finish, details, price, image_url, is_featured";

function withNumericPrice(row: Omit<PublicProduct, "price"> & { price: string | number }) {
  return { ...row, price: Number(row.price) };
}

export async function getCategories(): Promise<PublicCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("id, name, slug, description, image_url")
    .eq("website_id", WEBSITE_ID)
    .order("sort_order");
  return data || [];
}

export async function getProducts(): Promise<PublicProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("website_id", WEBSITE_ID)
    .eq("is_active", true)
    .order("sort_order");
  return (data || []).map(withNumericPrice);
}

export async function getProductsByCategory(categoryId: string): Promise<PublicProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("website_id", WEBSITE_ID)
    .eq("is_active", true)
    .eq("category_id", categoryId)
    .order("sort_order");
  return (data || []).map(withNumericPrice);
}

// Falls back to any active products if none are marked featured yet, so
// the homepage never shows an empty section just because a new site
// hasn't set that flag on anything.
export async function getFeaturedProducts(limit = 3): Promise<PublicProduct[]> {
  const supabase = await createClient();
  const { data: featured } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("website_id", WEBSITE_ID)
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order")
    .limit(limit);

  if (featured && featured.length > 0) return featured.map(withNumericPrice);

  const { data: fallback } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("website_id", WEBSITE_ID)
    .eq("is_active", true)
    .order("sort_order")
    .limit(limit);
  return (fallback || []).map(withNumericPrice);
}

export async function getProductBySlug(slug: string): Promise<PublicProduct | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("website_id", WEBSITE_ID)
    .eq("is_active", true)
    .eq("slug", slug)
    .maybeSingle();
  return data ? withNumericPrice(data) : null;
}

export async function getRelatedProducts(
  categoryId: string,
  excludeProductId: string,
  limit = 3
): Promise<PublicProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("website_id", WEBSITE_ID)
    .eq("is_active", true)
    .eq("category_id", categoryId)
    .neq("id", excludeProductId)
    .limit(limit);
  return (data || []).map(withNumericPrice);
}
