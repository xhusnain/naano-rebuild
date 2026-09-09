"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireBrand } from "@/lib/session";
import { makeTrackingCode } from "@/lib/tracking";
import { CREATORS } from "@/lib/creators";

export async function createCampaign(formData: FormData) {
  const brand = await requireBrand();
  if (!brand) redirect("/login");

  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const creatorIds = get("creatorIds").split(",").filter(Boolean);
  const picked = CREATORS.filter((c) => creatorIds.includes(c.id));
  if (picked.length === 0) redirect("/marketplace");

  const campaign = await prisma.campaign.create({
    data: {
      brandId: brand.id,
      name: get("name") || "Untitled campaign",
      objective: get("objectives"),
      keyMessages: get("keyMessages"),
      guidelines: get("guidelines"),
      landingUrl: get("landingUrl"),
      status: "live",
      deals: {
        create: picked.map((c) => ({
          creatorId: c.id,
          creatorSlug: c.slug,
          creatorName: c.name,
          price: c.postCost,
          status: "invited",
          // one code per deal — this is what makes attribution per-creator
          trackingCode: makeTrackingCode(),
        })),
      },
    },
  });

  revalidatePath("/app/campaigns");
  redirect(`/app/campaigns/${campaign.id}`);
}

const FLOW = ["invited", "accepted", "draft", "scheduled", "live", "paid"] as const;

export async function advanceDeal(dealId: string) {
  const brand = await requireBrand();
  if (!brand) redirect("/login");

  const deal = await prisma.deal.findUnique({ where: { id: dealId } });
  if (!deal) return;

  const i = FLOW.indexOf(deal.status as (typeof FLOW)[number]);
  const next = FLOW[Math.min(i + 1, FLOW.length - 1)];

  await prisma.deal.update({
    where: { id: dealId },
    data: {
      status: next,
      publishedAt: next === "live" && !deal.publishedAt ? new Date() : deal.publishedAt,
    },
  });

  revalidatePath(`/app/campaigns/${deal.campaignId}`);
  revalidatePath("/app/deals");
}
