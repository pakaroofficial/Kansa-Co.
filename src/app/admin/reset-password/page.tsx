import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ResetPasswordForm from "@/components/admin/ResetPasswordForm";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-ivory px-6">
        <div className="bg-white border hairline rounded-[3px] p-8 w-full max-w-sm text-center">
          <p className="font-display text-xl text-ink">Link expired</p>
          <p className="mt-2 text-sm text-ink/70">
            This reset link is invalid or has expired. Request a new one.
          </p>
          <Link
            href="/admin/forgot-password"
            className="mt-6 inline-block text-sm text-brass hover:underline"
          >
            Request a new link
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-ivory px-6">
      <ResetPasswordForm />
    </main>
  );
}
