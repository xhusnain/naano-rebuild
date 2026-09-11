import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScaleFrame } from "@/components/site/ScaleFrame";
import { FaqSection } from "@/components/site/FaqSection";

/**
 * /free-tools — naano's Resources › Free Tools page.
 *
 * Authored from their page: hero padding 144px 0 64px, h1 60/63/600/-2.4,
 * a 3-up grid of 368-wide tool cards over a 1200 container, a "more tools
 * coming" cell that carries the blog links, then the FAQ block.
 *
 * The tools themselves are naano's product, not part of this clone, so each
 * card links to the closest thing this build actually has rather than to a
 * page that would 404.
 */

export const metadata: Metadata = {
  title: "Free Tools for B2B Creator Marketing — Naano",
  description:
    "Practical tools for teams running LinkedIn creator campaigns. No account, no payment method, no commitment.",
};

const TOOLS = [
  {
    title: "Free LinkedIn creator search",
    lead: "Get a hand-picked creator shortlist in 48 hours",
    body: "Describe the campaign you want to launch and a real person at Naano finds every LinkedIn creator genuinely worth contacting — inside the Naano marketplace and across the wider LinkedIn ecosystem. You get names, pricing, and audience fit within 48 hours. Free, no account required, no commitment.",
    href: "/marketplace",
  },
  {
    title: "LinkedIn Creator Worth Calculator",
    lead: "Find out what a sponsored post from any creator should cost",
    body: "Enter a LinkedIn creator's follower count, average reactions and comments, and their niche, and get an instant flat-fee estimate of what one sponsored post is worth — plus their engagement rating against B2B benchmarks. Built for creators setting their rate and for companies budgeting a campaign. Free, no account required.",
    href: "/marketplace",
  },
  {
    title: "LinkedIn Engagement Rate Calculator",
    lead: "Calculate your engagement rate and compare it to 2026 benchmarks",
    body: "Enter your follower count and your average reactions, comments and reposts per post, and get your LinkedIn engagement rate two ways — by followers and by impressions — rated against 2026 B2B benchmarks for your audience size, with concrete tips to improve it. Free, no account required.",
    href: "/marketplace",
  },
  {
    title: "Sponsored Post Delivery Odds Estimator",
    lead: "See how often offers at your price actually get published",
    body: "Enter what you plan to offer a LinkedIn creator per post and see how often real bookings at that price ended in a published post, how often creators simply never answered, and what brands actually paid at that audience size. Built on 239 real sponsored-post bookings from the Naano marketplace, not rules of thumb. Free, no account required.",
    href: "/marketplace",
  },
  {
    title: "Creator Campaign Budget Planner",
    lead: "Turn a budget into published posts, not just booked ones",
    body: "Enter your campaign budget and see how many sponsored LinkedIn posts it books at real transacted medians — then how many of those historically ended in a published post, and what that makes the true cost per published post. Built on 239 real sponsored-post bookings from the Naano marketplace. Free, no account required.",
    href: "/marketplace",
  },
];

const READS: [string, string][] = [
  ["How to find B2B creators on LinkedIn", "/blog/how-to-find-b2b-creators-on-linkedin"],
  ["Best B2B creator marketplaces in 2026 (ranked)", "/blog/best-b2b-creator-marketplaces"],
  ["What is a B2B creator marketplace?", "/blog/what-is-a-b2b-creator-marketplace"],
  ["How to launch your first LinkedIn creator campaign in 30 days", "/blog/launch-a-linkedin-creator-campaign"],
  ["How much does B2B influencer marketing cost in 2026?", "/blog/b2b-influencer-marketing-cost"],
];

const TOOL_FAQS: [string, string][] = [
  ["Are Naano's free tools really free?", "Yes. The free LinkedIn creator search costs nothing, requires no account and no payment method, and carries no obligation to book anything afterwards. You keep the shortlist whether or not you run a campaign with Naano."],
  ["What is the free LinkedIn creator search?", "You describe your campaign — your product, your audience, and your budget — and a member of the Naano team manually builds a shortlist of LinkedIn creators whose audience genuinely overlaps your buyer. Each profile comes with pricing, audience fit, and the reason it belongs in your campaign. It is delivered within 48 hours."],
  ["Do I have to run my campaign on Naano to use the tools?", "No. The shortlist is yours to use however you want, including contacting the creators directly yourself. Naano's bet is that booking, briefing, paying, and tracking those creators in one place is easier than doing it by hand — but that is your decision to make after you see the list."],
];

export default function FreeToolsPage() {
  return (
    <ScaleFrame>
      <Nav tone="paper" />

      <section className="relative -mt-[73px] overflow-hidden bg-[#fcfcfb] px-5 pb-16 pt-[144px] lg:px-[84px]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[523px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 12%, rgba(205,220,255,0.32), rgba(0,0,0,0) 28%), radial-gradient(circle at 88% 8%, rgba(208,237,251,0.45), rgba(0,0,0,0) 30%)",
          }}
        />
        <div className="relative z-[1] mx-auto max-w-[1200px]">
          <div className="text-[12px] font-bold uppercase leading-[15px] tracking-[1.92px] text-[#315b7c]">
            Free tools by Naano
          </div>
          <h1 className="mt-8 max-w-[900px] text-[36px] font-semibold leading-[1.06] tracking-[-0.04em] text-[#111318] lg:text-[60px] lg:leading-[63px] lg:tracking-[-2.4px]">
            Free tools for B2B creator marketing.
          </h1>
          <p className="mt-6 max-w-[720px] text-[17px] leading-[27px] text-[#55575e] lg:text-[19px] lg:leading-[28.5px]">
            Practical tools for teams running LinkedIn creator campaigns. No
            account, no payment method, no commitment — start with the one below.
          </p>
        </div>
      </section>

      <section className="bg-[#fcfcfb] px-5 pb-16 lg:px-[84px] lg:pb-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group flex flex-col rounded-[22px] border border-[#e4ecf1] bg-white px-7 pb-7 pt-6 transition hover:border-[#cbdfeb] hover:shadow-[0_28px_66px_-46px_rgba(44,83,106,0.42)]"
            >
              <span className="w-fit rounded-full bg-[#eef8fd] px-3 py-1 text-[12px] font-bold uppercase tracking-[1.2px] text-[#315b7c]">
                Free
              </span>
              <h2 className="mt-5 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[#17181c]">
                {tool.title}
              </h2>
              <p className="mt-2.5 text-[16px] font-semibold leading-[24px] text-[#43454c]">
                {tool.lead}
              </p>
              <p className="mt-4 flex-1 text-[15px] leading-[24px] text-[#69717a]">{tool.body}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2563eb]">
                Open the tool
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}

          <div className="flex flex-col rounded-[22px] border border-dashed border-[#cfdde6] bg-[#f6fafc] px-7 pb-7 pt-6">
            <h2 className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[#17181c]">
              More tools coming
            </h2>
            <p className="mt-3 text-[15px] leading-[24px] text-[#69717a]">
              We ship a new free tool whenever we build something internally that
              B2B teams keep asking us for. In the meantime, the blog:
            </p>
            <ul className="mt-5 flex-1 space-y-3">
              {READS.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-start gap-2 text-[15px] leading-[22px] text-[#43454c] transition hover:text-ink"
                  >
                    <span className="mt-[9px] size-[5px] shrink-0 rounded-full bg-[#315b7c]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection
        id="tools-faq"
        items={TOOL_FAQS}
        lead="What the tools do, and what they cost."
        padding="border-t border-[#ECEAE6] px-5 pb-[80px] pt-[72px] lg:px-[84px] lg:pb-24 lg:pt-20"
      />

      <Footer />
    </ScaleFrame>
  );
}
