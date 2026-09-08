"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <header className="sticky top-0 z-40 bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <p className="font-display text-lg shrink-0">Kansa &amp; Co.</p>
        <nav className="flex items-center gap-6 text-sm text-ivory-dim overflow-x-auto">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap transition-colors ${
                  active ? "text-brass-light" : "hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="shrink-0 text-sm border border-ivory-dim/30 rounded-[3px] px-3 py-1.5 hover:bg-bark transition-colors"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
