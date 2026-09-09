-- Adds a plan field to websites, capping how many products an owner can
-- add: mini = 25, full = 100, growth = 200 (limits live in code, at
-- src/lib/plans.ts, not here -- this column only stores which plan a
-- website is on). Defaults new websites to 'mini'.
alter table websites add column if not exists plan text not null default 'mini';

-- Kansa & Co. is on the growth plan.
update websites set plan = 'growth' where id = '765407d6-b4f5-4a94-bbb4-f3e6718d0fe8';
