import { business } from "./business";
import { formatPrice } from "./format";

type QuotableProduct = {
  name: string;
  price: number;
  finish: string | null;
};

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Every product's "Get a WhatsApp quote" button sends this exact message,
// pre-filled, straight to the business number — no typing required.
export function buildProductQuoteLink(product: QuotableProduct) {
  const details = product.finish
    ? `${formatPrice(product.price)}, ${product.finish}`
    : formatPrice(product.price);
  const message = `Hi ${business.name}, I'd like a quote for "${product.name}" (${details}). Could you share more details?`;
  return buildWhatsAppLink(message);
}
