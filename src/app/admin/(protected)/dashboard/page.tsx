import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { business } from "@/lib/business";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // RLS only returns this row if the signed-in user actually owns it —
  // if it comes back empty, their account exists but isn't linked yet.
  const { data: website } = await supabase
    .from("websites")
    .select("id, business_name")
    .eq("id", WEBSITE_ID)
    .maybeSingle();

  if (!website) {
    return (
      <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
        <div className="border hairline rounded-[3px] p-8 max-w-lg">
          <p className="font-display text-xl text-ink">
            Your account isn&apos;t linked to Kansa &amp; Co. yet.
          </p>
          <p className="mt-2 text-sm text-ink/60 leading-relaxed">
            You&apos;re signed in as {user?.email}, but this account isn&apos;t
            connected to this website. Contact Vmakizy support to get this
            sorted out.
          </p>
        </div>
      </main>
    );
  }

  const [{ count: productsCount }, { count: categoriesCount }, { count: enquiriesCount }] =
    await Promise.all([
      supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("website_id", WEBSITE_ID),
      supabase
        .from("categories")
        .select("*", { count: "exact", head: true })
        .eq("website_id", WEBSITE_ID),
      supabase
        .from("enquiries")
        .select("*", { count: "exact", head: true })
        .eq("website_id", WEBSITE_ID),
    ]);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <div className="mb-10">
        <p className="text-3xl md:text-4xl font-semibold tracking-[0.08em] text-brass">
          VMAKIZY
        </p>
        <h1 className="font-display text-2xl text-ink mt-2">
          Welcome, {business.name}
        </h1>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="border hairline rounded-[3px] p-6">
          <p className="text-sm text-ink/50">Products</p>
          <p className="font-display text-3xl text-ink mt-1">
            {productsCount ?? 0}
          </p>
        </div>
        <div className="border hairline rounded-[3px] p-6">
          <p className="text-sm text-ink/50">Categories</p>
          <p className="font-display text-3xl text-ink mt-1">
            {categoriesCount ?? 0}
          </p>
        </div>
        <div className="border hairline rounded-[3px] p-6">
          <p className="text-sm text-ink/50">Enquiries</p>
          <p className="font-display text-3xl text-ink mt-1">
            {enquiriesCount ?? 0}
          </p>
        </div>
      </div>
    </main>
  );
}
