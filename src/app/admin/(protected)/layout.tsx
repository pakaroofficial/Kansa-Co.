import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <AdminNav />
      <div className="flex-1">{children}</div>
      <footer className="border-t hairline py-4 text-center text-xs text-ink/40">
        Powered by{" "}
        <span className="text-ink/60 font-medium tracking-wide">VMAKIZY</span>
      </footer>
    </div>
  );
}
