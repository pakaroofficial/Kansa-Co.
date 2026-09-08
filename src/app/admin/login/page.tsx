"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Unable to log in. Check your email and password.");
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-ivory px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white border hairline rounded-[3px] p-8 w-full max-w-sm"
      >
        <p className="font-display text-2xl text-ink">Kansa &amp; Co.</p>
        <p className="text-sm text-ink/50 mt-1 mb-7">Admin sign in</p>

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
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 mb-2 focus:outline-none focus:border-brass"
        />

        <div className="flex justify-end mb-2">
          <Link href="/admin/forgot-password" className="text-xs text-ink/50 hover:text-brass">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-sm text-red-700 mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-ink text-ivory rounded-[3px] py-3 text-sm hover:bg-bark transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-6 text-center text-sm text-ink/50">
          New here?{" "}
          <Link href="/admin/signup" className="text-brass hover:underline">
            Activate your account
          </Link>
        </p>
      </form>
    </main>
  );
}
