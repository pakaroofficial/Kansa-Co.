import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { products, categories } from "@/lib/data";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-sm text-ink/50">Signed in as</p>
          <h1 className="font-display text-2xl text-ink">{user.email}</h1>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        <div className="border hairline rounded-[3px] p-6">
          <p className="text-sm text-ink/50">Products</p>
          <p className="font-display text-3xl text-ink mt-1">
            {products.length}
          </p>
        </div>
        <div className="border hairline rounded-[3px] p-6">
          <p className="text-sm text-ink/50">Categories</p>
          <p className="font-display text-3xl text-ink mt-1">
            {categories.length}
          </p>
        </div>
        <div className="border hairline rounded-[3px] p-6">
          <p className="text-sm text-ink/50">New enquiries</p>
          <p className="font-display text-3xl text-ink mt-1">—</p>
        </div>
      </div>

      <div className="border hairline rounded-[3px] p-8 text-sm text-ink/60 leading-relaxed max-w-lg">
        <p className="text-ink mb-2 font-medium">
          Product management wires in here.
        </p>
        <p>
          This dashboard is authenticated and connected to Supabase. The next
          step is building the add/edit/delete product forms and the R2
          image-upload UI described in Steps 5–6 of the build guide, backed
          by the <code className="text-brass">uploadToR2()</code> helper in{" "}
          <code className="text-brass">src/lib/r2.ts</code>.
        </p>
      </div>
    </main>
  );
}
