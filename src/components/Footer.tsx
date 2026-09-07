import Link from "next/link";
import Logo from "./Logo";
import { business } from "@/lib/business";
import { VineDivider } from "./BrassMotif";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory-dim brass-texture">
      <div className="mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-10">
        <VineDivider className="w-32 text-brass mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo className="w-7 h-7 text-brass-light shrink-0" />
              <p className="font-display text-2xl text-ivory">{business.name}</p>
            </div>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed">
              Brass vessels, lamps and decor, hand-finished by karigars in
              Moradabad. Every piece is cast, hammered or spun to order — not
              pulled from a warehouse shelf.
            </p>
          </div>
          <div>
            <p className="text-sm text-ivory mb-4">Shop</p>
            <ul className="space-y-2 text-[15px]">
              <li>
                <Link href="/products" className="hover:text-ivory">
                  All pieces
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ivory">
                  The workshop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory">
                  Enquire
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-ivory mb-4">Visit</p>
            <address className="not-italic text-[15px] leading-relaxed">
              {business.address.line1}
              <br />
              {business.address.line2}
              <br />
              Open {business.hours}
              <br />
              <a href={business.phoneHref} className="hover:text-ivory">
                {business.phoneDisplay}
              </a>
            </address>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t hairline flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs text-ivory-dim/70">
          <p>
            © {new Date().getFullYear()} {business.name} · Powered by Vmakizy
          </p>
          <p>Handcrafted in Moradabad, India.</p>
        </div>
      </div>
    </footer>
  );
}
