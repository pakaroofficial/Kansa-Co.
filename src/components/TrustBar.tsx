const badges = [
  "45+ Years Legacy",
  "100% Hand-Finished",
  "Made to Order",
  "Direct from the Workshop",
];

export default function TrustBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {badges.map((badge) => (
        <span
          key={badge}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-ink/80 shadow-sm hover:-translate-y-0.5 transition-transform duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brass" />
          {badge}
        </span>
      ))}
    </div>
  );
}
