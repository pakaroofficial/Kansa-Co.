// Hand-drawn-style line art standing in for product photography.
// Kept to a single consistent stroke language (brass gold lines on ink,
// or ink lines on ivory) so it reads as one visual system, not clip art.

export function UrnMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M160 20c-14 0-26 10-26 24 0 8 4 14 10 18-22 10-36 32-36 58 0 20 8 34 20 44-26 14-42 42-42 76 0 60 34 108 74 108s74-48 74-108c0-34-16-62-42-76 12-10 20-24 20-44 0-26-14-48-36-58 6-4 10-10 10-18 0-14-12-24-26-24z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M108 160h104M96 240h128M84 340h152"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.55"
      />
      <ellipse
        cx="160"
        cy="392"
        rx="58"
        ry="10"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function DiyaMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 70c0 22 36 40 80 40s80-18 80-40c0-6-4-11-10-11H30c-6 0-10 5-10 11z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M60 59c8-8 20-13 40-13s32 5 40 13"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.55"
      />
      <path
        d="M100 46c-6-10-4-20 4-28-2 10 2 16 8 20 6 4 8 10 4 16-4 6-12 4-16-8z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function VineDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 12h84M156 12h84"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="120" cy="12" r="5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M105 12c4-6 10-6 15 0 5-6 11-6 15 0"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
