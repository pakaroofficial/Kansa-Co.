"use client";

export default function DeleteButton({
  label = "Delete",
  confirmText = "Delete this? This can't be undone.",
  className = "text-sm text-red-700/70 hover:text-red-700",
}: {
  label?: string;
  confirmText?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
      className={className}
    >
      {label}
    </button>
  );
}
