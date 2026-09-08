"use client";

import { useActionState } from "react";
import { updatePassword } from "@/lib/admin/auth";
import type { ActionState } from "@/lib/admin/products";

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updatePassword,
    null
  );

  return (
    <form
      action={formAction}
      className="bg-white border hairline rounded-[3px] p-8 w-full max-w-sm"
    >
      <p className="font-display text-2xl text-ink">Set a new password</p>

      <label htmlFor="password" className="block text-sm text-ink/70 mb-1.5 mt-6">
        New password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        minLength={8}
        className="w-full border hairline rounded-[3px] px-4 py-2.5 mb-4 focus:outline-none focus:border-brass"
      />

      <label htmlFor="confirmPassword" className="block text-sm text-ink/70 mb-1.5">
        Confirm new password
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        required
        minLength={8}
        className="w-full border hairline rounded-[3px] px-4 py-2.5 mb-2 focus:outline-none focus:border-brass"
      />

      {state?.error && <p className="text-sm text-red-700 mt-2">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full bg-ink text-ivory rounded-[3px] py-3 text-sm hover:bg-bark transition-colors disabled:opacity-60"
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
