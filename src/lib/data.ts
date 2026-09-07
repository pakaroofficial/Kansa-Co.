// This file stands in for Supabase during design/build.
// Every shape here matches the `products` / `categories` tables from the
// build guide, so swapping this for real `supabase.from('products').select()`
// calls later is a drop-in change — nothing that reads this data needs to
// change, only where it comes from.

export type Category = {
  id: string;
  website_id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
};

export type Product = {
  id: string;
  website_id: string;
  category_id: string;
  slug: string;
  name: string;
  description: string;
  long_description: string;
  price: number;
  image_url: string;
  finish: string;
};

const WEBSITE_ID = "website-001";

export const categories: Category[] = [
  {
    id: "cat-1",
    website_id: WEBSITE_ID,
    name: "Pooja & Temple",
    slug: "pooja-temple",
    description: "Diyas, kalash and idols for the home mandir.",
    image_url: "/images/categories/category-pooja-temple.png",
  },
  {
    id: "cat-2",
    website_id: WEBSITE_ID,
    name: "Dining & Kitchen",
    slug: "dining-kitchen",
    description: "Thalis, tumblers and serveware for the everyday table.",
    image_url: "/images/categories/category-dining-kitchen.png",
  },
  {
    id: "cat-3",
    website_id: WEBSITE_ID,
    name: "Home & Decor",
    slug: "home-decor",
    description: "Urns, planters and lamps for the rest of the house.",
    image_url: "/images/categories/category-home-decor.png",
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    website_id: WEBSITE_ID,
    category_id: "cat-1",
    slug: "ashtadhatu-diya-pair",
    name: "Ashtadhatu Diya, Pair",
    description: "Eight-metal alloy diyas with a raised lotus rim.",
    long_description:
      "Cast in ashtadhatu — an eight-metal alloy that includes brass, copper and tin — these diyas are weighted to sit flat and burn evenly. The lotus rim is hand-finished after casting, so no two pairs carry identical tool marks.",
    price: 1450,
    image_url: "/images/products/ashtadhatu-diya-pair.png",
    finish: "Antique matte",
  },
  {
    id: "prod-2",
    website_id: WEBSITE_ID,
    category_id: "cat-1",
    slug: "kalash-with-coconut-rest",
    name: "Kalash with Coconut Rest",
    description: "Ceremonial water vessel, hand-hammered neck.",
    long_description:
      "A traditional kalash shape, spun on the wheel and finished with a hand-hammered neck band. Comes with a matching coconut rest. Used at griha pravesh, weddings and daily puja.",
    price: 2100,
    image_url: "/images/products/kalash-with-coconut-rest.png",
    finish: "Polished gold",
  },
  {
    id: "prod-3",
    website_id: WEBSITE_ID,
    category_id: "cat-2",
    slug: "hammered-dinner-thali-set",
    name: "Hammered Dinner Thali, Set of 2",
    description: "Full-course thali with three katoris and a tumbler.",
    long_description:
      "A six-piece thali set — one plate, three katoris and a tumbler per setting — hand-hammered for a texture that hides everyday wear. Line the plate with a banana leaf or use it as is.",
    price: 3200,
    image_url: "/images/products/hammered-dinner-thali-set.png",
    finish: "Brushed steel-brass",
  },
  {
    id: "prod-4",
    website_id: WEBSITE_ID,
    category_id: "cat-2",
    slug: "tumbler-set-of-six",
    name: "Water Tumbler, Set of 6",
    description: "Everyday drinking glasses with a narrow waist.",
    long_description:
      "Brass is known to have trace mineral benefits when used for drinking water. These tumblers hold 250ml each, with a narrow waist that's easy to hold and easy to stack.",
    price: 1800,
    image_url: "/images/products/tumbler-set-of-six.png",
    finish: "High polish",
  },
  {
    id: "prod-5",
    website_id: WEBSITE_ID,
    category_id: "cat-3",
    slug: "footed-flower-urn",
    name: "Footed Flower Urn",
    description: "Tall floor urn with a repoussé vine pattern.",
    long_description:
      "A floor-standing urn, hand-raised from a single brass sheet and finished with a repoussé vine pattern worked from the inside out. Sized for a large floral arrangement or a dried-branch display.",
    price: 5400,
    image_url: "/images/products/footed-flower-urn.png",
    finish: "Antique matte",
  },
  {
    id: "prod-6",
    website_id: WEBSITE_ID,
    category_id: "cat-3",
    slug: "hanging-akhand-lamp",
    name: "Hanging Akhand Lamp",
    description: "Chain-hung oil lamp with a drip tray.",
    long_description:
      "A hanging akhand jyot lamp with a built-in drip tray, sold with a 60cm chain. Hangs cleanly from a hook or ceiling bracket and is sized for an all-night flame.",
    price: 2600,
    image_url: "/images/products/hanging-akhand-lamp.png",
    finish: "Polished gold",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.category_id === categoryId);
}
