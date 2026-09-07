import { business } from "./business";
import { formatPrice } from "./format";
import type { Product } from "./data";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Every product's "Get a WhatsApp quote" button sends this exact message,
// pre-filled, straight to the business number — no typing required.
export function buildProductQuoteLink(product: Product) {
  const message = `Hi ${business.name}, I'd like a quote for "${product.name}" (${formatPrice(product.price)}, ${product.finish}). Could you share more details?`;
  return buildWhatsAppLink(message);
}
