import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { business } from "@/lib/business";
import { WEBSITE_ID } from "@/lib/constants";

// Where the email notification goes. Override with CONTACT_TO_EMAIL in
// .env.local if this business wants a different inbox.
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "helloaudzi@gmail.com";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !body.name || !body.phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }

  // The database record is the source of truth — it's what shows up in
  // the owner's Enquiries page. The email below is just a heads-up
  // notification, so it shouldn't block a successful submission.
  const supabase = await createClient();
  const { error: dbError } = await supabase.from("enquiries").insert({
    website_id: WEBSITE_ID,
    name: body.name,
    phone: body.phone,
    message: body.message || null,
  });

  if (dbError) {
    console.error("Enquiry insert failed:", dbError);
    return NextResponse.json(
      { error: "Unable to send this. Please try again, or call us directly." },
      { status: 500 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — enquiry saved but not emailed.");
  } else {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL ||
            `${business.name} Website <onboarding@resend.dev>`,
          to: CONTACT_TO_EMAIL,
          subject: `New enquiry from ${body.name}`,
          text: `Name: ${body.name}\nPhone: ${body.phone}\nMessage: ${body.message || "(none)"}`,
        }),
      });
      if (!res.ok) {
        console.error("Resend API error:", res.status, await res.text().catch(() => ""));
      }
    } catch (err) {
      console.error("Resend request failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
