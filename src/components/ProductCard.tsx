import Image from "next/image";
import Link from "next/link";
import type { PublicProduct } from "@/lib/public/products";
import { formatPrice } from "@/lib/format";
import { buildProductQuoteLink } from "@/lib/whatsapp";
import { UrnMotif, DiyaMotif } from "./BrassMotif";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: PublicProduct;
  index?: number;
}) {
  const Motif = index % 3 === 1 ? DiyaMotif : UrnMotif;
  const productHref = `/products/${product.slug}`;

  return (
    <div className="group">
      <div className="relative aspect-[4/5] bg-bark rounded-[6px] overflow-hidden ring-1 ring-brass/15 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)]">
        <Link href={productHref} className="absolute inset-0 block">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Motif className="w-2/3 h-2/3 text-brass/70 group-hover:text-brass transition-colors duration-300" />
            </div>
          )}
          {product.finish && (
            <span className="glass-dark absolute top-3 left-3 text-[11px] tracking-wide text-ivory-dim rounded-[2px] px-2 py-1">
              {product.finish}
            </span>
          )}
        </Link>

        <a
          href={buildProductQuoteLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] text-white text-xs font-medium pl-2.5 pr-3 py-2 shadow-lg hover:brightness-110 hover:scale-105 transition-all"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          Quote
        </a>
      </div>

      <Link href={productHref} className="mt-3 flex items-start justify-between gap-3 block">
        <div>
          <h3 className="font-display text-lg text-ink leading-snug group-hover:text-brass transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-ink/60 mt-0.5">{product.description}</p>
        </div>
        <p className="text-sm text-ink whitespace-nowrap pt-1">
          {formatPrice(product.price)}
        </p>
      </Link>
    </div>
  );
}
