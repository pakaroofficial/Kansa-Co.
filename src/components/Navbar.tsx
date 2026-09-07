import Link from "next/link";
import Logo from "./Logo";
import { business } from "@/lib/business";

const links = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "The workshop" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur border-b hairline shadow-[0_1px_0_rgba(185,138,46,0.15)]">
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-2xl tracking-tight text-ink"
        >
          <Logo className="w-8 h-8 text-brass shrink-0" />
          {business.name}
        </Link>
        <div className="flex items-center gap-9">
          <nav className="hidden md:flex items-center gap-9 text-[15px] text-ink/80">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative hover:text-ink transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-brass after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="text-sm border hairline rounded-[3px] px-4 py-2 text-ink hover:bg-ink hover:text-ivory hover:border-ink transition-colors"
          >
            Visit the shop
          </Link>
        </div>
      </div>
    </header>
  );
}
