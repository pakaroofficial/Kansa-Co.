import { NextRequest, NextResponse } from "next/server";
import { business } from "@/lib/business";

// Where enquiries land. Override with CONTACT_TO_EMAIL in .env.local if
// this business wants a different inbox.
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "helloaudzi@gmail.com";

// Sent via Resend's HTTP API (not SMTP/nodemailer) because Cloudflare
// Workers can't open raw SMTP sockets — this works the same in dev and
// once deployed. Needs RESEND_API_KEY in .env.local to actually send;
// see .env.local.example.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || !body.name || !body.phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — enquiry was not emailed:", body);
    return NextResponse.json(
      { error: "Email sending is not configured yet." },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || `${business.name} Website <onboarding@resend.dev>`,
      to: CONTACT_TO_EMAIL,
      subject: `New enquiry from ${body.name}`,
      text: `Name: ${body.name}\nPhone: ${body.phone}\nMessage: ${body.message || "(none)"}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend API error:", res.status, await res.text().catch(() => ""));
    return NextResponse.json(
      { error: "Unable to send the enquiry email." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
