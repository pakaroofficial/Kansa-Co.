import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { WEBSITE_ID } from "@/lib/constants";
import { toggleEnquiryHandled } from "@/lib/admin/enquiries";

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const showAll = filter === "all";

  const supabase = await createClient();
  let query = supabase
    .from("enquiries")
    .select("id, name, phone, email, message, is_handled, created_at")
    .eq("website_id", WEBSITE_ID)
    .order("created_at", { ascending: false });

  if (!showAll) query = query.eq("is_handled", false);

  const { data: enquiries } = await query;

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-ink">Enquiries</h1>
        <div className="flex gap-3 text-sm">
          <Link
            href="/admin/enquiries"
            className={!showAll ? "text-brass" : "text-ink/50 hover:text-ink"}
          >
            New
          </Link>
          <Link
            href="/admin/enquiries?filter=all"
            className={showAll ? "text-brass" : "text-ink/50 hover:text-ink"}
          >
            All
          </Link>
        </div>
      </div>

      {!enquiries || enquiries.length === 0 ? (
        <p className="text-ink/50">
          {showAll ? "No enquiries yet." : "No new enquiries — you're all caught up."}
        </p>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className={`border hairline rounded-[3px] p-5 ${
                enquiry.is_handled ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-ink font-medium">{enquiry.name}</p>
                  <p className="text-sm text-ink/60">
                    <a href={`tel:${enquiry.phone}`} className="hover:text-brass">
                      {enquiry.phone}
                    </a>
                    {enquiry.email ? ` · ${enquiry.email}` : ""}
                  </p>
                </div>
                <p className="text-xs text-ink/40 whitespace-nowrap">
                  {formatDate(enquiry.created_at)}
                </p>
              </div>

              {enquiry.message && (
                <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                  {enquiry.message}
                </p>
              )}

              <form action={toggleEnquiryHandled} className="mt-3">
                <input type="hidden" name="id" value={enquiry.id} />
                <input
                  type="hidden"
                  name="value"
                  value={(!enquiry.is_handled).toString()}
                />
                <button
                  type="submit"
                  className="text-xs px-3 py-1.5 rounded-full border hairline text-ink/60 hover:border-brass"
                >
                  {enquiry.is_handled ? "Mark as new" : "Mark as handled"}
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
