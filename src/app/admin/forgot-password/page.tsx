"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/admin/reset-password`,
    });

    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-ivory px-6">
        <div className="bg-white border hairline rounded-[3px] p-8 w-full max-w-sm text-center">
          <p className="font-display text-xl text-ink">Check your email</p>
          <p className="mt-2 text-sm text-ink/70">
            If an account exists for <strong>{email}</strong>, we&apos;ve sent
            a link to reset your password.
          </p>
          <Link
            href="/admin/login"
            className="mt-6 inline-block text-sm text-brass hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-ivory px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border hairline rounded-[3px] p-8 w-full max-w-sm"
      >
        <p className="font-display text-2xl text-ink">Reset password</p>
        <p className="text-sm text-ink/50 mt-1 mb-7">
          We&apos;ll email you a link to set a new one.
        </p>

        <label htmlFor="email" className="block text-sm text-ink/70 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 mb-2 focus:outline-none focus:border-brass"
        />

        {status === "error" && (
          <p className="text-sm text-red-700 mt-2">
            Something went wrong. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 w-full bg-ink text-ivory rounded-[3px] py-3 text-sm hover:bg-bark transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send reset link"}
        </button>

        <p className="mt-6 text-center text-sm text-ink/50">
          <Link href="/admin/login" className="text-brass hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
