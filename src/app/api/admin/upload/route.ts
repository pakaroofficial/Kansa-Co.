import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadToR2 } from "@/lib/r2";
import { WEBSITE_ID } from "@/lib/constants";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB — the browser already compresses first

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // This route uses R2's own credentials, not Supabase RLS — so we have
  // to check ownership ourselves, or anyone could upload here for free.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { data: website } = await supabase
    .from("websites")
    .select("id")
    .eq("id", WEBSITE_ID)
    .maybeSingle();
  if (!website) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Please upload a JPEG, PNG or WebP image." },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Image is too large. Please use a smaller photo." },
      { status: 400 }
    );
  }

  const allowedFolders = ["products", "categories", "settings"];
  const folderRaw = String(formData.get("folder") || "products");
  const folder = allowedFolders.includes(folderRaw) ? folderRaw : "products";

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `${folder}/${WEBSITE_ID}/${Date.now()}-${crypto.randomUUID()}.jpg`;

  try {
    const url = await uploadToR2(buffer, key, file.type);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("R2 upload failed:", err);
    return NextResponse.json(
      { error: "Unable to upload the image. Please try again." },
      { status: 500 }
    );
  }
}
