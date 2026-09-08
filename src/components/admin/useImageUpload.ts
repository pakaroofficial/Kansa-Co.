"use client";

import { useState } from "react";
import { compressImage } from "@/lib/compressImage";

// Shared by every admin form with a photo field (products, categories,
// settings logo) — compresses in the browser, then uploads to R2.
export function useImageUpload(folder: "products" | "categories" | "settings", initialUrl = "") {
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const compressed = await compressImage(file);
      const body = new FormData();
      body.append("file", compressed);
      body.append("folder", folder);

      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await res.json();

      if (!res.ok) {
        setUploadError(result.error || "Unable to upload this photo.");
        return;
      }

      setImageUrl(result.url);
    } catch {
      setUploadError("Unable to upload this photo. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return { imageUrl, setImageUrl, uploading, uploadError, handleImageChange };
}
