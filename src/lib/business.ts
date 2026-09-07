// Business contact info shown across the site (Navbar, Footer, Contact,
// WhatsApp links). Update this file — or the Supabase `settings` table,
// once this site is wired to real data — to change it everywhere at once.

export const business = {
  name: "Kansa & Co.",
  phoneDisplay: "+91 91333 31945",
  phoneHref: "tel:+919133331945",
  // wa.me needs the number with country code, digits only, no + or spaces.
  whatsappNumber: "919133331945",
  address: {
    line1: "14 Kanth Road",
    line2: "Moradabad, Uttar Pradesh",
  },
  hours: "10am – 7pm, Mon–Sat",
};
