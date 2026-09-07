import Link from "next/link";
import { DiyaMotif } from "@/components/BrassMotif";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-28 text-center">
      <DiyaMotif className="w-28 h-auto text-brass/60 mx-auto" />
      <h1 className="font-display text-3xl text-ink mt-8">
        This piece isn&apos;t in the workshop.
      </h1>
      <p className="mt-3 text-ink/60">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-ink text-ivory px-6 py-3 rounded-[3px] text-sm hover:bg-bark transition-colors"
      >
        Back to the collection
      </Link>
    </main>
  );
}
