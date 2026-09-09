// Every VMAKIZY website is on one of these plans, which caps how many
// products its owner can add. Applies to every website, not just this one.
export const PLAN_LIMITS = {
  mini: 25,
  full: 100,
  growth: 200,
} as const;

export type Plan = keyof typeof PLAN_LIMITS;

export function getProductLimit(plan: string | null): number {
  if (plan && plan in PLAN_LIMITS) return PLAN_LIMITS[plan as Plan];
  return PLAN_LIMITS.mini;
}

export function getPlanLabel(plan: string | null): string {
  if (plan && plan in PLAN_LIMITS) {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  }
  return "Mini";
}
