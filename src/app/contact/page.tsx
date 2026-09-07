import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { business } from "@/lib/business";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact — Kansa & Co.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-16">
      <Reveal className="max-w-xl mb-14">
        <p className="text-brass text-sm mb-3">Contact</p>
        <h1 className="font-display text-4xl text-ink">
          Ask us about a piece, or plan a visit.
        </h1>
        <p className="mt-5 text-ink/60 leading-relaxed">
          Sizing, engraving, or a custom order for a wedding or a temple —
          tell us what you need and we&apos;ll get back to you, usually
          within a day.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 items-stretch">
        <Reveal>
          <div className="glass h-full flex flex-col rounded-[8px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(26,20,16,0.25)]">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src="/images/workshop/workshop-storefront.png"
                alt="The Kansa & Co. workshop and showroom entrance"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-ink/50">Workshop &amp; showroom</p>
                  <p className="text-ink mt-1">
                    {business.address.line1}, {business.address.line2}
                  </p>
                </div>
                <div>
                  <p className="text-ink/50">Hours</p>
                  <p className="text-ink mt-1">{business.hours}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t hairline flex flex-wrap items-center gap-4">
                <a
                  href={business.phoneHref}
                  className="text-sm text-ink hover:text-brass transition-colors"
                >
                  {business.phoneDisplay}
                </a>
                <a
                  href={buildWhatsAppLink(
                    `Hi ${business.name}, I'd like to ask about a piece.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-[3px] text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="glass h-full rounded-[8px] p-8 shadow-[0_20px_50px_-20px_rgba(26,20,16,0.25)]">
            <p className="text-brass text-sm mb-2">Send a message</p>
            <h2 className="font-display text-2xl text-ink mb-6">
              Tell us what you&apos;re looking for.
            </h2>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </main>
  );
}
