# CLAUDE.md — VMAKIZY Project Instructions

Claude Code reads this file automatically from the project root. Keep it at
the root of every VMAKIZY website repo (website-001, website-002, ...) so
every site gets the same rules without you having to repeat yourself.

---

## Stack (do not deviate without asking)

- Next.js + TypeScript + Tailwind
- Supabase (database + authentication)
- Cloudflare R2 (images/files)
- Cloudflare Workers (hosting, via the OpenNext adapter)
- GitHub (source control)
- **No Vercel-specific functionality.** Nothing that only works on Vercel
  and breaks on Cloudflare Workers.

---

## Supabase rules — read before touching the database

1. **Never assume the database is empty.** Before creating a table, check
   whether it already exists:
   ```sql
   select table_name, column_name, data_type
   from information_schema.columns
   where table_schema = 'public'
   order by table_name, ordinal_position;
   ```
2. **Never `drop table`, `truncate`, or `create table` over something that
   already has data**, without explicit confirmation from me first. If a
   table already exists, use `alter table ... add column if not exists ...`
   instead of recreating it.
3. **Every website gets a `website_id`.** All website-specific data
   (products, categories, pages, settings, enquiries) must be tied to the
   correct `website_id`. Never mix data belonging to different websites,
   and never create a separate set of database tables per website — one
   shared schema, filtered by `website_id`.
4. **Keep the core schema stable across all websites** (`websites`,
   `products`, `categories`, `pages`, `settings`, `enquiries`, `users`).
   Add columns or new tables when a genuine new need appears — don't
   redesign the schema per website.
5. **Migrate, don't destroy.** If an existing table needs to change,
   write a migration that preserves existing rows. Back up before any
   structural change (Supabase Dashboard → Database → Backups) and show me
   the migration SQL before running it against real data.
6. **Row Level Security stays on** for any table with public-facing reads
   or writes. Public users get narrow, explicit policies (e.g. read
   products, insert enquiries) — never a blanket "allow all."

---

## Coding standard (applies to every VMAKIZY website)

**1. Code must be easy to understand.** Clean, simple, readable
TypeScript/React. Assume a future maintainer has basic computer knowledge
but little coding experience. Avoid clever one-liners, unnecessary
abstractions, unnecessary libraries, duplicated logic.

**2. Use clear names.** `ProductCard`, `ContactForm`, `ImageUploader` —
not `Comp1`, `DataHandler`, `Utils2`.

**3. Keep code organized.** Consistent folder structure: pages/routes
together, reusable components together, database functions together, auth
logic together, R2/image logic together, validation together, types
together. Every VMAKIZY website follows the same basic structure.

**4. Separate DATA from CODE.** Never hardcode business content.
Bad: `<h1>ABC Sarees</h1>`. Good: `<h1>{business.name}</h1>`. Business
info, products, categories, images, and other editable content come from
Supabase, not from source code.

**5. Use `website_id` everywhere**, as above.

**6. Make reusable components** for anything that repeats: Header, Footer,
Hero, ProductCard, ProductGrid, ContactForm, Gallery, Button, Modal,
ImageUploader. Don't copy-paste the same JSX across pages.

**7. Keep components simple.** One clear purpose per component. Split
anything that gets too large or does too much.

**8. Organize database code separately from UI** wherever practical —
clear functions for get/create/update/delete, not large Supabase calls
buried inside visual components.

**9. Comment only what isn't obvious** — what something does, why it
exists, anything a future developer needs to know. No comments on obvious
code.

**10. User-facing errors must be understandable.** Never show
`Error: undefined`. Show something like "Unable to save the product.
Please try again." Log technical detail for developers separately.

**11. Handle loading, success, empty, and error states** on every
important page. Example empty state: "No products have been added yet,"
not a blank or broken page.

**12. Validate all user input** before saving: required fields, valid
email, valid numbers/URLs, allowed image types, reasonable text lengths.
Show plain-language messages about what needs fixing.

**13. Never put secrets in code.** No passwords, API keys, Supabase
service-role keys, Cloudflare/R2 credentials in source. Environment
variables only. Never commit `.env*` files.

**14. Avoid unnecessary dependencies.** Before adding a package, check
whether the existing stack can already do it.

**15. No Vercel-specific functionality**, as above.

**16. Keep business content editable.** Business name, phone, address,
logo, products, prices, descriptions, categories, images, hours, social
links — store as data, not buried in source code.

**17. Follow the existing architecture** for every new website. Don't
introduce a new technical architecture per site without discussing it
first. Design can change dramatically between sites — the underlying
technology should not.

**18. Document simply.** Every website needs a README covering: what the
project is, folder structure, how to run it locally, how Supabase and R2
are connected, required environment variables, how to build and deploy,
and where key functionality lives. Write for a non-expert.

**19. Check before declaring anything finished:** TypeScript errors,
build errors, broken links, missing images, database errors,
authentication, forms, mobile responsiveness, loading/error/empty states,
security, environment variables, production build.

**20. Optimize for Simple + Clear + Reusable + Reliable, not clever.** A
future VMAKIZY employee or developer should be able to open any project
and orient themselves without reading the whole codebase first.

---

## Design freedom (this does NOT restrict visual design)

This standard defines technical architecture and coding practices only.
It must not restrict the visual design. Every website should have a
distinctive frontend design appropriate to its business — different
colors, fonts, layout, hero treatment, and content structure — while
maintaining the same underlying coding principles, data structure,
security practices, and development procedure.

Same engine. Different design, every time.

---

## Where this project is in the roadmap

Phase 1 (Websites #1–#50): build real, individually-designed websites on
one consistent technical foundation, learn what repeats, document
patterns. **Do not build the employee dashboard, automated website
generator, multi-tenant platform, or deployment automation yet** — that's
Phase 2, after ~50 websites prove the pattern.

If asked to build platform-level features (employee dashboard, website
generator, 500-site management) before Phase 1 is complete, flag that this
is a Phase 2 item and confirm before proceeding.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
