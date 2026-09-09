import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * The tracked link: /r/<code>
 *
 * This is the whole product in one route. Each deal owns a unique code, so a
 * click resolves to the individual creator who drove it — not merely to the
 * campaign. Record, then redirect; the visitor should not notice the hop.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const deal = await prisma.deal.findUnique({
    where: { trackingCode: code },
    include: { campaign: { select: { landingUrl: true } } },
  });

  // Unknown code: send them somewhere real rather than showing an error.
  if (!deal) {
    return NextResponse.redirect(new URL("/?bad_link=1", req.url), 302);
  }

  // Link previews and prefetchers are not humans. Counting them would inflate
  // exactly the number the brand is paying against, so they redirect without
  // being recorded.
  const purpose =
    req.headers.get("purpose") ?? req.headers.get("x-purpose") ?? "";
  const ua = req.headers.get("user-agent") ?? "";
  const isPrefetch =
    purpose.toLowerCase() === "prefetch" ||
    req.headers.get("sec-purpose")?.includes("prefetch") ||
    /bot|crawler|spider|preview|slurp|facebookexternalhit|linkedinbot/i.test(ua);

  if (!isPrefetch) {
    await prisma.click.create({
      data: {
        dealId: deal.id,
        trackingCode: code,
        referer: req.headers.get("referer"),
        userAgent: ua.slice(0, 400),
      },
    });
  }

  const target = deal.campaign.landingUrl?.trim();
  const dest =
    target && /^https?:\/\//i.test(target)
      ? target
      : new URL("/?tracked=1", req.url).toString();

  const res = NextResponse.redirect(dest, 302);
  // The destination is the advertiser's page; never let this hop be cached, or
  // the second click never reaches us.
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
