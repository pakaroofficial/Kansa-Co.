# Kansa & Co. — Website #1

A complete Next.js frontend for a brass handicrafts business, built as
Website #1 of the VMAKIZY foundation. Design: elegant/luxury, grounded in
brass casting and hand-finishing as the actual subject matter.

**"Kansa & Co." is a placeholder brand.** Swap the business name, copy, and
product data for the real business before launch — search for `Kansa` and
edit `src/lib/data.ts`.

## What's built

- Homepage, product listing (with category filter), product detail pages,
  About, Contact — all responsive, all pulling from a typed data layer
- Admin login + dashboard, wired to real Supabase Auth
- Supabase client helpers (`src/lib/supabase/`) and an R2 upload helper
  (`src/lib/r2.ts`), ready to connect
- A working contact-form API route (`src/app/api/contact/route.ts`)
- Custom 404 page, loading/empty states, mobile layout throughout

## Design system

- Colors: ink `#1A1410`, bark `#241C15`, brass `#B98A2E`, patina `#52664F`,
  ivory `#EDE3D3` — defined once in `src/app/globals.css`
- Type: Fraunces (display) + Inter (body) via `next/font/google`
- Decorative brass line-art (`src/components/BrassMotif.tsx`) stands in for
  product photography — replace with real photos in R2 as they become
  available; the components already expect an `image_url` field

## Running it locally

```bash
npm install
cp .env.local.example .env.local   # then fill in real Supabase/R2 values
npm run dev
```

Visit `http://localhost:3000`.

## Connecting real data

Right now products and categories come from `src/lib/data.ts` (mock data
shaped exactly like the Supabase tables). To switch to live data:

1. Run the SQL from the build guide (Step 3.5) in your Supabase project.
2. Replace the imports in `products/page.tsx`, `products/[slug]/page.tsx`
   and `page.tsx` with calls to
   `(await createClient()).from('products').select('*')`.
3. Nothing else needs to change — every component already expects the same
   shape.

## Deploying

Follow Steps 7–8 of the **VMAKIZY Website #1 Build Guide** (GitHub →
Cloudflare Workers via OpenNext → custom domain). This project has no
Vercel-specific code, per that guide's rule.

## Environment variables

See `.env.local.example`. Never commit `.env.local` — it's already
git-ignored.
