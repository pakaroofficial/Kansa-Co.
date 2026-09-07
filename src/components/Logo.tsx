// A small hallmark-style seal — the same hand-drawn line-art language as
// BrassMotif, standing in for a diya (lamp) mark next to the wordmark.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M14.5 29.5c0 5.5 4.3 9.5 9.5 9.5s9.5-4 9.5-9.5c0-1.4-1-2.5-2.3-2.5H16.8c-1.3 0-2.3 1.1-2.3 2.5z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M24 10.5c-3 3.7-2.4 7.4.5 10.2-1 2.7.4 4.6 1.8 4.6 1.9 0 3.3-1.9 2.8-4.1 1.9 1.4 2.4 4.1.9 6.4-1.4 1.9-3.7 2.8-6 2.8-2.8 0-5-2.3-5-5 0-3.2 2.7-6 5-14.9z"
        fill="currentColor"
      />
    </svg>
  );
}
