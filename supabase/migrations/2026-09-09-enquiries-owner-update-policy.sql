-- "Mark as handled" in the admin Enquiries page does nothing right now
-- because owners only have SELECT and public only has INSERT on
-- enquiries -- there's no UPDATE policy at all, so the update is
-- silently blocked by RLS (no error, just zero rows changed).
-- This lets an owner update (only) their own website's enquiries,
-- same ownership-chain pattern already used on every other table.
create policy "Owners can update own enquiries"
on enquiries
for update
using (
  website_id in (
    select websites.id from websites
    where websites.customer_id in (
      select customers.id from customers where customers.auth_user_id = auth.uid()
    )
  )
)
with check (
  website_id in (
    select websites.id from websites
    where websites.customer_id in (
      select customers.id from customers where customers.auth_user_id = auth.uid()
    )
  )
);
