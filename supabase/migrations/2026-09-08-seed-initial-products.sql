-- Seeds Kansa & Co.'s real categories + products, using the same 6 product
-- photos and 3 category photos already shown on the public site (now
-- copied to R2 so the admin panel can edit/delete them like any other
-- upload). Safe to run more than once — each insert is skipped if a row
-- with the same website_id + slug already exists.
--
-- Not run automatically. Run manually in Supabase Dashboard -> SQL Editor
-- when ready.
--
-- The categories table didn't have a description column yet (the public
-- site code assumed it did) -- add it first, preserving existing rows.
alter table categories add column if not exists description text;

insert into categories (website_id, name, slug, description, image_url, sort_order)
select '765407d6-b4f5-4a94-bbb4-f3e6718d0fe8', v.name, v.slug, v.description, v.image_url, v.sort_order
from (values
  ('Pooja & Temple', 'pooja-temple', 'Diyas, kalash and idols for the home mandir.', 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/categories/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/pooja-temple.png', 1),
  ('Dining & Kitchen', 'dining-kitchen', 'Thalis, tumblers and serveware for the everyday table.', 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/categories/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/dining-kitchen.png', 2),
  ('Home & Decor', 'home-decor', 'Urns, planters and lamps for the rest of the house.', 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/categories/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/home-decor.png', 3)
) as v(name, slug, description, image_url, sort_order)
where not exists (
  select 1 from categories c
  where c.website_id = '765407d6-b4f5-4a94-bbb4-f3e6718d0fe8' and c.slug = v.slug
);

insert into products (website_id, category_id, name, slug, description, long_description, finish, price, image_url, is_active, is_featured, sort_order)
select
  '765407d6-b4f5-4a94-bbb4-f3e6718d0fe8',
  (select id from categories where website_id = '765407d6-b4f5-4a94-bbb4-f3e6718d0fe8' and slug = v.category_slug),
  v.name, v.slug, v.description, v.long_description, v.finish, v.price, v.image_url, true, v.is_featured, v.sort_order
from (values
  ('pooja-temple', 'Ashtadhatu Diya, Pair', 'ashtadhatu-diya-pair',
   'Eight-metal alloy diyas with a raised lotus rim.',
   'Cast in ashtadhatu — an eight-metal alloy that includes brass, copper and tin — these diyas are weighted to sit flat and burn evenly. The lotus rim is hand-finished after casting, so no two pairs carry identical tool marks.',
   'Antique matte', 1450, 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/products/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/ashtadhatu-diya-pair.png', true, 1),
  ('pooja-temple', 'Kalash with Coconut Rest', 'kalash-with-coconut-rest',
   'Ceremonial water vessel, hand-hammered neck.',
   'A traditional kalash shape, spun on the wheel and finished with a hand-hammered neck band. Comes with a matching coconut rest. Used at griha pravesh, weddings and daily puja.',
   'Polished gold', 2100, 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/products/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/kalash-with-coconut-rest.png', false, 2),
  ('dining-kitchen', 'Hammered Dinner Thali, Set of 2', 'hammered-dinner-thali-set',
   'Full-course thali with three katoris and a tumbler.',
   'A six-piece thali set — one plate, three katoris and a tumbler per setting — hand-hammered for a texture that hides everyday wear. Line the plate with a banana leaf or use it as is.',
   'Brushed steel-brass', 3200, 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/products/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/hammered-dinner-thali-set.png', true, 3),
  ('dining-kitchen', 'Water Tumbler, Set of 6', 'tumbler-set-of-six',
   'Everyday drinking glasses with a narrow waist.',
   'Brass is known to have trace mineral benefits when used for drinking water. These tumblers hold 250ml each, with a narrow waist that''s easy to hold and easy to stack.',
   'High polish', 1800, 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/products/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/tumbler-set-of-six.png', false, 4),
  ('home-decor', 'Footed Flower Urn', 'footed-flower-urn',
   'Tall floor urn with a repoussé vine pattern.',
   'A floor-standing urn, hand-raised from a single brass sheet and finished with a repoussé vine pattern worked from the inside out. Sized for a large floral arrangement or a dried-branch display.',
   'Antique matte', 5400, 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/products/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/footed-flower-urn.png', true, 5),
  ('home-decor', 'Hanging Akhand Lamp', 'hanging-akhand-lamp',
   'Chain-hung oil lamp with a drip tray.',
   'A hanging akhand jyot lamp with a built-in drip tray, sold with a 60cm chain. Hangs cleanly from a hook or ceiling bracket and is sized for an all-night flame.',
   'Polished gold', 2600, 'https://pub-d4fbe92341604a3ba0228bb7e8c01bcd.r2.dev/products/765407d6-b4f5-4a94-bbb4-f3e6718d0fe8/hanging-akhand-lamp.png', false, 6)
) as v(category_slug, name, slug, description, long_description, finish, price, image_url, is_featured, sort_order)
where not exists (
  select 1 from products p
  where p.website_id = '765407d6-b4f5-4a94-bbb4-f3e6718d0fe8' and p.slug = v.slug
);
