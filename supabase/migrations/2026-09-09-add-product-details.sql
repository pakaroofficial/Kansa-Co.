-- Adds one free-text "details" field per product, so the owner can type
-- any bullet points they want (lead time, care, dimensions, whatever
-- applies to that product) instead of two fixed fields.
alter table products add column if not exists details text;

-- Backfills the 6 products seeded earlier with the same two lines they
-- were already showing (previously hardcoded, identical for every
-- product), so nothing changes on the live site until you edit a
-- product yourself.
update products
set details = coalesce(details, '7–10 working days to make
Hand wash, dry immediately')
where website_id = '765407d6-b4f5-4a94-bbb4-f3e6718d0fe8';
