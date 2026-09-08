"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "check-email" | "error";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setStatus("error");
      setError("Passwords don't match.");
      return;
    }

    setStatus("submitting");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin/dashboard`,
      },
    });

    if (error) {
      setStatus("error");
      setError(
        error.message.includes("already registered")
          ? "An account with this email already exists. Try signing in instead."
          : "Unable to create your account. Please try again."
      );
      return;
    }

    if (data.session) {
      router.push("/admin/dashboard");
      return;
    }

    setStatus("check-email");
  }

  if (status === "check-email") {
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-ivory px-6">
        <div className="bg-white border hairline rounded-[3px] p-8 w-full max-w-sm text-center">
          <p className="font-display text-xl text-ink">Check your email</p>
          <p className="mt-2 text-sm text-ink/70">
            We&apos;ve sent a confirmation link to <strong>{email}</strong>.
            Click it, then come back and sign in.
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
        onSubmit={handleSignup}
        className="bg-white border hairline rounded-[3px] p-8 w-full max-w-sm"
      >
        <p className="font-display text-2xl text-ink">Kansa &amp; Co.</p>
        <p className="text-sm text-ink/50 mt-1 mb-7">
          Activate your account with the email Vmakizy set up for you.
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
          className="w-full border hairline rounded-[3px] px-4 py-2.5 mb-4 focus:outline-none focus:border-brass"
        />

        <label htmlFor="password" className="block text-sm text-ink/70 mb-1.5">
          Choose a password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 mb-4 focus:outline-none focus:border-brass"
        />

        <label htmlFor="confirmPassword" className="block text-sm text-ink/70 mb-1.5">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 mb-2 focus:outline-none focus:border-brass"
        />

        {status === "error" && <p className="text-sm text-red-700 mt-2">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 w-full bg-ink text-ivory rounded-[3px] py-3 text-sm hover:bg-bark transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Creating account…" : "Activate account"}
        </button>

        <p className="mt-6 text-center text-sm text-ink/50">
          Already active?{" "}
          <Link href="/admin/login" className="text-brass hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
