import { business } from "@/lib/business";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

// Site-wide floating concierge button — always one tap away from a real
// person on WhatsApp, on every page.
export default function WhatsAppButton() {
  const href = buildWhatsAppLink(
    `Hi ${business.name}, I'd like to know more about your brass collection.`
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] text-white pl-4 pr-5 py-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
    >
      <WhatsAppIcon className="w-6 h-6" />
      <span className="text-sm font-medium hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
