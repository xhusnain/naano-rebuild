import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScaleFrame } from "@/components/site/ScaleFrame";
import { FaqSection } from "@/components/site/FaqSection";
import { PostCard, POSTS } from "@/components/site/PostCard";

/**
 * /creators — "Get paid to post on LinkedIn".
 *
 * Authored at 1672 from naano's computed styles. Their section heights:
 *   hero 926 · monetize 1031 · platform 1098 · quote 620 · results 1616
 *   community 1112 · faq 1124 · cta 660 · footer 802
 *
 *   hero      padding 40px 84px 60px on #c5ebfd under the cotton-blue photo
 *             badge 340.5 x 42 with three 22px stacked avatars
 *             h1 mt 34, 80/84/600/-3.2, max-w 980
 *             lead mt 30, 21/31.5 #43454c, max-w 680
 *   monetize  grid 1240, 405.3/397.3/397.3 x 430/389, gap 20
 *             cards white 74%, radius 22, blur(20) saturate(1.2)
 *   results   stat figures 54px/660, then the same four post cards as the
 *             landing page — hence the shared PostCard
 */

export const metadata: Metadata = {
  title: "Get paid for your LinkedIn content: Naano for creators",
  description:
    "Choose deals from B2B brands you know, post in your own voice, and get paid within 24h. Creators earn €500 on average per deal.",
};

const ARROW = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h13" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const BRANDS: [string, number][] = [
  ["lemlist", 30],
  ["attio", 26],
  ["folk", 22],
  ["ringover", 30],
  ["gojiberry", 24],
  ["lagrowthmachine", 24],
  ["chatseo", 28],
  ["abyssale", 22],
];

/** The six monetize cells. The first is the heading block, not a card. */
const CELLS: { caption: string; mock: React.ReactNode; tall: boolean }[] = [
  {
    caption: "Launch a professional media kit in minutes",
    tall: true,
    mock: (
      <div className="w-full space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="size-9 rounded-full bg-[#dfeef8]" />
          <div>
            <div className="text-[13.5px] font-bold text-[#17181c]">in LinkedIn</div>
            <div className="text-[12px] text-[#8b8d94]">B2B &amp; AI · 34K followers</div>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-white/80 px-2.5 py-1 text-[12px] text-[#55575e]">▶ 97K views</span>
          <span className="rounded-full bg-white/80 px-2.5 py-1 text-[12px] text-[#55575e]">◎ 34K reach</span>
        </div>
        <div className="rounded-[12px] bg-white/85 px-3 py-2.5">
          <div className="text-[12px] text-[#8b8d94]">Starting rate</div>
          <div className="text-[19px] font-bold text-[#17181c]">€800 / post</div>
        </div>
      </div>
    ),
  },
  {
    caption: "Instant payment",
    tall: true,
    mock: (
      <div className="w-full space-y-3 text-center">
        <div className="text-[12px] text-[#8b8d94]">Today</div>
        <div className="text-[40px] font-extrabold leading-none tracking-[-0.03em] text-[#17181c]">
          €5,000
        </div>
        <div className="flex justify-center gap-2">
          <span className="rounded-full bg-[#e7f7ee] px-2.5 py-1 text-[12px] font-semibold text-[#1c7c4a]">⚡ Instant · SEPA</span>
        </div>
        <div className="rounded-[12px] bg-white/85 px-3 py-2 text-[13px] text-[#55575e]">
          Attio campaign
        </div>
      </div>
    ),
  },
  {
    caption: "Get sponsored by our network",
    tall: false,
    mock: (
      <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {BRANDS.slice(0, 6).map(([b, h]) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={b} src={`/lp/logo-${b}.png`} alt={b} style={{ maxHeight: h }} className="w-auto object-contain" />
        ))}
      </div>
    ),
  },
  {
    caption: "Bring your own deals & earn extra",
    tall: false,
    mock: (
      <div className="w-full space-y-3">
        <div className="text-[12px] font-semibold uppercase tracking-[1.2px] text-[#8b8d94]">
          A deal you sourced
        </div>
        <div className="flex items-center justify-between rounded-[12px] bg-white/85 px-3 py-2.5">
          <span className="text-[13.5px] text-[#55575e]">yourbrand.com</span>
          <span className="text-[16px] font-bold text-[#17181c]">€2,000</span>
        </div>
        <div className="flex items-center justify-between rounded-[12px] bg-[#e7f7ee] px-3 py-2.5">
          <span className="text-[13.5px] text-[#1c7c4a]">Naano bonus</span>
          <span className="text-[16px] font-bold text-[#1c7c4a]">+ €300</span>
        </div>
        <div className="text-[13px] leading-[19px] text-[#8b8d94]">
          Contract &amp; payout handled. You just close it.
        </div>
      </div>
    ),
  },
  {
    caption: "Workflows to accelerate collaborations",
    tall: false,
    mock: (
      <div className="w-full space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[15px]">🔔</span>
          <span className="rounded-full bg-white/85 px-2.5 py-1 text-[12px] font-semibold text-[#55575e]">
            ◆ Sponsored post
          </span>
          <span className="ml-auto text-[16px] font-bold text-[#17181c]">€1,000</span>
        </div>
        <div className="rounded-[12px] bg-white/85 px-3 py-2.5 text-[13px] text-[#55575e]">
          Deliver by · Aug 12 · 1 post + 1 repost
        </div>
        <div className="flex gap-2">
          <span className="flex-1 rounded-[10px] bg-[#17181c] py-2 text-center text-[13px] font-semibold text-white">
            Accept
          </span>
          <span className="flex-1 rounded-[10px] bg-white/85 py-2 text-center text-[13px] font-semibold text-[#55575e]">
            Decline
          </span>
        </div>
      </div>
    ),
  },
];

const PLATFORM = [
  ["Centralized opportunities", "Discover brand deals that match your audience."],
  ["Payments built-in", "Get paid on time with secure, transparent payouts."],
  ["Track performance", "See views, clicks and engagement in real time."],
  ["Easy delivery", "Manage deals and deliver content with ease."],
] as const;

const STATS = [
  ["2,000+", "Creators earning"],
  ["€500", "Avg. per deal"],
  ["5K+", "Posts published"],
  ["24h", "Avg. payout time"],
] as const;

const VOICES = [
  ["Naano is the marketplace LinkedIn was missing. The founders truly listen and do everything they can to build something that brings real value to its users.", "Raphael Alfero", "B2B creator · 18K followers", "avatar-a"],
  ["At first I wasn't sure what to expect. But the whole experience was simple and smooth: clear opportunities, an easy platform, everything well guided. A real bridge between creators and brands.", "Aya Dara", "Content creator · 9K followers", "avatar-d"],
  ["Excellent experience. The platform is simple and efficient, the team ultra-responsive, and results come fast. I recommend it whether you want to grow your name or create content.", "Robin Tempe", "Sales creator · 14K followers", "avatar-e"],
  ["Great experience, I love the platform, it helps me every day. I already made money with it from day one.", "Thomas Higadère", "B2B & AI creator · 34K followers", "avatar-c"],
  ["Naano lets me keep making useful content while monetizing my LinkedIn community. We never give up!", "Eric Djavid", "LinkedIn creator · 40K followers", "avatar-b"],
  ["A young team that's ambitious, efficient and driven. Super proactive and always listening. I'd tell every creator to join Naano!", "Nada Ait Ouchene", "Marketing creator · 11K followers", "avatar-g"],
] as const;

const CREATOR_FAQS: [string, string][] = [
  ["What is Naano?", "Naano is the B2B LinkedIn creator marketplace: B2B brands book creators for sponsored LinkedIn posts at a fixed price per post that you set. Creators from about 1,000 to 500,000 followers use Naano to monetize their LinkedIn audience with deals from B2B brands they already know."],
  ["Is Naano free for creators?", "Yes, always. Joining and using Naano is completely free, and you keep 100% of what you earn on every deal."],
  ["How much can I earn?", "Creators earn on average €500 per deal, with top deals reaching €1,500. You choose which deals to take, so your earnings scale with how much you post."],
  ["How and when do I get paid?", "You get paid within 24h of your post going live, securely via Stripe or bank transfer. No invoicing, no chasing, it happens automatically."],
  ["Do I have to sign an exclusivity contract?", "No. There is no exclusivity, no minimum and no lock-in. You pick the deals you want and quit anytime while keeping everything you have earned."],
  ["What kind of brands are on Naano?", "B2B brands you already know: SaaS, sales, marketing and prospecting tools like Lemlist, Folk, Ringover and Gojiberry, plus 20+ more, with new deals every week."],
  ["Do I keep control of my content?", "Completely. You post in your own voice. Each brief gives you an angle, a hook and a CTA plus full product access, but the words are always yours."],
  ["How do I join?", "Apply in about 2 minutes, no commitment. Once approved you can browse open deals and start earning right away."],
];

const CARD =
  "rounded-[22px] border border-white/[0.92] bg-white/[0.74] shadow-[0_22px_55px_rgba(35,75,114,0.09),inset_0_1px_0_0_rgba(255,255,255,0.98)] backdrop-blur-[20px] backdrop-saturate-[1.2]";

export default function CreatorsPage() {
  return (
    <ScaleFrame>
      <Nav />

      {/* ------------------------------------------------------------- hero */}
      <section data-nav-hero className="relative overflow-hidden bg-[#c5ebfd] pt-[73px] text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lp/hero-clouds-cotton.jpg"
          alt=""
          aria-hidden
          className="absolute left-0 top-0 z-0 h-full w-full max-w-none select-none object-cover lg:left-[-59px] lg:h-[990.8px] lg:w-[1789px]"
        />
        <div className="relative z-[2] flex min-h-[560px] flex-col items-center justify-center px-5 pb-[60px] pt-10 lg:min-h-[926px] lg:px-[84px]">
          <div className="flex items-center gap-2.5 rounded-full border border-white/95 bg-white/95 py-[9px] pl-[14px] pr-[18px] shadow-[0_4px_14px_rgba(42,73,117,0.055)] backdrop-blur-[8px]">
            <span className="flex items-center">
              {["avatar-b", "avatar-f", "avatar-a"].map((a, i) => (
                <span
                  key={a}
                  className={`size-[22px] rounded-full border-2 border-white bg-[#edebe7] bg-cover bg-center ${i ? "-ml-2" : ""}`}
                  style={{ backgroundImage: `url('/lp/${a}.png')` }}
                />
              ))}
            </span>
            <span className="text-[15px] font-medium leading-[19px] text-[#33353b]">
              2,000+ creators paid · 4.8/5 rating
            </span>
          </div>

          <h1 className="mt-[34px] max-w-[980px] text-[42px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#17181c] lg:text-[80px] lg:leading-[84px] lg:tracking-[-3.2px]">
            Get paid to post on LinkedIn
          </h1>
          <p className="mt-[30px] max-w-[680px] text-[17px] leading-[27px] text-[#43454c] lg:text-[21px] lg:leading-[31.5px]">
            Choose deals from B2B brands you know, post in your own voice, and get
            paid within 24h. No negotiating, no admin. Creators earn{" "}
            <span className="font-semibold text-[#17181c]">€500 on average per deal</span>.
          </p>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/register?role=influencer"
              className="flex items-center gap-[11px] rounded-[12px] bg-[#17181c] px-7 py-4 text-[16px] font-semibold leading-5 text-white transition hover:opacity-90"
            >
              Apply as creator
              {ARROW}
            </Link>
            <Link
              href="#monetize"
              className="flex items-center gap-[9px] text-[16.5px] font-semibold leading-5 text-[#17181c] transition hover:opacity-70"
            >
              See how it works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </Link>
          </div>

          <div className="mt-[34px] flex items-center gap-[11px] text-[#55575e]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3 l7 3 v5 c0 4.4 -3 7.5 -7 9 c-4 -1.5 -7 -4.6 -7 -9 V6 Z" />
              <polyline points="9 12 11.2 14.2 15.5 9.6" />
            </svg>
            <span className="text-[15.5px] font-medium leading-[19px]">
              Free to join · No exclusivity · Paid within 24h
            </span>
          </div>

          <div className="mt-[62px] w-full">
            <div className="text-[12px] font-bold leading-[15px] tracking-[2.16px] text-[#b0b2b8]">
              THE BRANDS ALREADY ON NAANO
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-[54px] gap-y-7">
              {BRANDS.map(([b, h]) => (
                <div key={b} className="flex h-[34px] items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/lp/logo-${b}.png`} alt={b} style={{ maxHeight: h }} className="w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- monetize */}
      <section
        id="monetize"
        className="relative scroll-mt-20 px-5 pb-[72px] pt-[64px] lg:px-[84px] lg:pb-[100px] lg:pt-[92px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 8% 18%, rgba(205,220,255,0.3), rgba(0,0,0,0) 25%), radial-gradient(circle at 91% 22%, rgba(218,211,255,0.38), rgba(0,0,0,0) 27%), linear-gradient(#fcfcfb 0%, #eff9fe 52%, #fcfcfb 100%)",
        }}
      >
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-[405.3px_397.3px_397.3px] lg:grid-rows-[430px_389px]">
          <div className="flex flex-col justify-end pb-[26px] pl-1 pr-2 pt-1">
            <h2 className="text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-[#17181c] lg:text-[50px] lg:leading-[52px] lg:tracking-[-1.75px]">
              Monetize your content on Naano.
            </h2>
            <p className="mt-5 max-w-[400px] text-[17px] leading-[26px] text-[#55575e] lg:text-[19px] lg:leading-[28.5px]">
              Accept deals from brands you know, or bring your own onto the
              platform and get paid faster.
            </p>
          </div>

          {CELLS.map((cell) => (
            <div key={cell.caption} className={`flex flex-col px-[30px] pb-[34px] pt-[30px] ${CARD}`}>
              <div className="flex min-h-[200px] flex-1 items-center justify-center rounded-[16px] border border-white/90 bg-white/[0.56] px-6 py-7">
                {cell.mock}
              </div>
              <div className="mt-6 text-center text-[20px] font-semibold tracking-[-0.4px] text-[#17181c]">
                {cell.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- platform */}
      <section className="bg-white px-5 pb-[72px] pt-[64px] lg:px-[84px] lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="text-[12px] font-bold leading-[15px] tracking-[1.92px] text-[#2563eb]">
            THE PLATFORM
          </div>
          <h2 className="mt-[18px] text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] text-[#17181c] lg:text-[52px] lg:leading-[55.12px] lg:tracking-[-1.56px]">
            For creators who don&rsquo;t want
            <br className="max-lg:hidden" /> the administrative burden.
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-[17px] leading-[25px] text-[#55575e] lg:text-[19px] lg:leading-[23px]">
            Find deals, get paid, and track your performance from one dashboard.
            No invoicing, no chasing, no spreadsheets.
          </p>
        </div>

        {/* Their product shot in a browser chrome: 1180 wide, 42px bar, and
            the screenshot itself at 1178 x 456.5. */}
        <div className="mx-auto mt-14 w-full max-w-[1180px] overflow-hidden rounded-[18px] border border-[#e4e1dc] bg-white shadow-[0_40px_90px_-40px_rgba(23,24,28,0.42)]">
          <div className="flex items-center gap-2 bg-[#fbfaf8] px-[18px] py-[13px]">
            <span className="size-[11px] rounded-full bg-[#e5726a]" />
            <span className="size-[11px] rounded-full bg-[#e8b54a]" />
            <span className="size-[11px] rounded-full bg-[#5fb666]" />
            <span className="ml-3.5 text-[12.5px] leading-[15px] text-[#9b9da3]">
              naano.com/overview
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lp/dashboard-creator.webp"
            alt="The Naano creator dashboard"
            className="block w-full"
          />
        </div>

        <div className="mx-auto mt-11 grid w-full max-w-[1180px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM.map(([title, blurb]) => (
            <div
              key={title}
              className="rounded-[16px] border border-[#edebe7] bg-white p-[22px]"
            >
              <div className="text-[16px] font-bold leading-5 tracking-[-0.16px] text-[#17181c]">
                {title}
              </div>
              <p className="mt-2 text-[14px] leading-[21px] text-[#8b8d94]">{blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ quote */}
      <section className="flex min-h-[520px] flex-col items-center justify-center px-5 pb-[72px] pt-[64px] text-center lg:min-h-[620px] lg:px-[84px] lg:pb-24 lg:pt-[90px]">
        <div className="flex items-center gap-1 text-[#f5a623]">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.5l7.1-.6z" />
            </svg>
          ))}
        </div>
        <blockquote className="mt-10 max-w-[1040px] text-[24px] font-medium leading-[1.3] tracking-[-0.02em] text-[#17181c] lg:text-[44px] lg:leading-[54.56px] lg:tracking-[-0.88px]">
          &ldquo;I was able to select my rate and get paid the moment the post
          went live.&rdquo;
        </blockquote>
        <span
          className="mt-12 size-[88px] rounded-full bg-[#edebe7] bg-cover bg-center"
          style={{ backgroundImage: "url('/lp/avatar-c.png')" }}
        />
        <div className="mt-5 text-[19px] font-bold leading-[23px] text-[#17181c]">
          Thomas Higadère
        </div>
        <div className="mt-1.5 text-[16px] leading-5 text-[#55575e]">
          B2B &amp; AI creator · 34K followers
        </div>
      </section>

      {/* ---------------------------------------------------------- results */}
      <section className="px-5 pb-[84px] pt-[64px] lg:px-[83.6px] lg:pb-[120px] lg:pt-20">
        <div className="flex items-center justify-center gap-2.5">
          <span className="size-[9px] rounded-full bg-[#315b7c]" />
          <span className="text-[12px] font-bold uppercase leading-[17px] tracking-[2.64px] text-[#315b7c] lg:text-[14px] lg:tracking-[3.08px]">
            The results
          </span>
        </div>

        {/* the same translucent stat band as the landing page */}
        <div
          className="relative mx-auto mt-[42px] grid w-full max-w-[1180px] items-center overflow-hidden rounded-[34px] px-[22px] py-[40px] lg:min-h-[310px]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(239, 249, 254, 0.5), rgba(255, 255, 255, 0.18))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lp/results-metrics-clouds.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-[0.92]"
          />
          <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map(([value, label]) => (
              <div
                key={label}
                className="rounded-[22px] border border-white/90 bg-white/[0.64] px-[14px] pb-[24px] pt-[26px] text-center shadow-[0_22px_48px_-38px_rgba(46,86,108,0.42),inset_0_1px_0_0_#fff] backdrop-blur-[12px] backdrop-saturate-[1.08]"
              >
                <div className="text-[30px] font-[660] leading-none tracking-[-0.04em] text-[#111318] sm:text-[38px] lg:text-[54px] lg:leading-[54px] lg:tracking-[-2.7px]">
                  {value}
                </div>
                <span className="mt-[11px] block text-[13.5px] leading-[18.225px] text-[#697b86]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mx-auto mt-16 max-w-[820px] text-center text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#111318] lg:mt-[112px] lg:text-[52px] lg:leading-[56.16px] lg:tracking-[-1.56px]">
          Real posts from real creators.
        </h2>

        <div className="mx-auto mt-[50px] grid w-full max-w-[1320px] grid-cols-1 gap-[18px] pb-[28px] pt-[10px] sm:grid-cols-2 lg:grid-cols-4 lg:px-[6px]">
          {POSTS.map((post) => (
            <PostCard key={post.name} post={post} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-[14px]">
          {[
            ["Free to join", "M20 6 9 17l-5-5"],
            ["Paid within 24h", "M12 7v5l3 2"],
            ["Quit anytime", "M20 6 9 17l-5-5"],
          ].map(([label, d]) => (
            <span
              key={label}
              className="flex items-center gap-[9px] rounded-full border border-white/[0.92] bg-white/90 px-5 py-[11px] text-[16px] font-semibold leading-[22px] text-[#26272c] shadow-[0_10px_30px_-22px_rgba(56,96,128,0.34)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#315b7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {label === "Paid within 24h" ? <circle cx="12" cy="12" r="9" /> : null}
                <path d={d} />
              </svg>
              {label}
            </span>
          ))}
        </div>

        <div className="mt-11 flex flex-col items-center">
          <Link
            href="/register?role=influencer"
            className="flex items-center gap-[11px] rounded-[12px] bg-[#17181c] px-7 py-4 text-[16px] font-semibold leading-5 text-white shadow-[0_12px_30px_rgba(23,24,28,0.18)] transition hover:opacity-90"
          >
            Apply as creator
            {ARROW}
          </Link>
          <span className="mt-4 text-[15px] leading-[19px] text-[#9b9da3]">
            Free to join. Paid within 24h. Quit anytime.
          </span>
        </div>
      </section>

      {/* -------------------------------------------------------- community */}
      <section className="px-5 pb-[72px] pt-[64px] lg:px-[84px] lg:pb-[100px] lg:pt-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center text-[12px] font-bold leading-[15px] tracking-[1.92px] text-[#315b7c]">
            FROM THE COMMUNITY
          </div>
          <h2 className="mt-5 text-center text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#111318] lg:text-[52px] lg:leading-[63px] lg:tracking-[-1.56px]">
            What creators say.
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-center text-[17px] leading-[27px] text-[#55575e] lg:text-[19px] lg:leading-[28.5px]">
            2,000+ creators already getting paid on Naano.
          </p>

          <div className="mx-auto mt-11 flex h-[67px] max-w-[760px] flex-wrap items-center justify-center gap-x-14 gap-y-6 text-center">
            {[["2,000+", "Creators"], ["€500", "Avg. per deal"], ["€1,500", "Top deal"]].map(
              ([v, l]) => (
                <div key={l}>
                  <div className="text-[28px] font-extrabold leading-none tracking-[-0.03em] text-[#17181c]">
                    {v}
                  </div>
                  <div className="mt-1.5 text-[14px] leading-[18px] text-[#8b8d94]">{l}</div>
                </div>
              ),
            )}
          </div>

          <div className="mx-auto mt-[60px] grid max-w-[1160px] grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {VOICES.map(([quote, name, meta, avatar]) => (
              <figure
                key={name}
                className="flex flex-col rounded-[22px] border border-[#e4ecf1] bg-white px-7 pb-7 pt-6 shadow-[0_22px_55px_-40px_rgba(35,75,114,0.35)]"
              >
                <span aria-hidden className="text-[30px] font-bold leading-none text-[#cbdfeb]">
                  &rdquo;
                </span>
                <blockquote className="mt-3 flex-1 text-[15.5px] leading-[25px] text-[#42454c]">
                  {quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/lp/${avatar}.png`} alt="" className="size-10 rounded-full object-cover" />
                  <div>
                    <div className="text-[15px] font-bold leading-[19px] text-[#17181c]">{name}</div>
                    <div className="text-[13px] leading-[17px] text-[#8b8d94]">{meta}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        id="creator-faq"
        items={CREATOR_FAQS}
        lead="Everything you need to know before you start earning."
        padding="px-5 pb-[80px] pt-10 lg:px-[83.6px] lg:pb-[100px]"
      />

      {/* -------------------------------------------------------------- cta */}
      <section
        className="relative flex min-h-[520px] items-center overflow-hidden bg-[#c5ebfd] px-5 pb-[96px] pt-[60px] text-center lg:min-h-[660px] lg:px-[84px] lg:pb-[140px]"
        style={{
          backgroundImage:
            "radial-gradient(18% 34% at 0px 100%, #fff 0px, #fff 72%, rgba(0,0,0,0) 74%), radial-gradient(16% 28% at 14% 105%, #fff 0px, #fff 72%, rgba(0,0,0,0) 74%), radial-gradient(18% 32% at 88% 106%, #fff 0px, #fff 72%, rgba(0,0,0,0) 74%), radial-gradient(20% 38% at 103% 100%, #fff 0px, #fff 72%, rgba(0,0,0,0) 74%), linear-gradient(rgba(255,255,255,0.08), rgba(214,237,255,0.22))",
        }}
      >
        <div className="relative z-[1] mx-auto max-w-[900px]">
          <div className="text-[12px] font-bold leading-[15px] tracking-[1.92px] text-[#315b7c]">
            READY TO EARN?
          </div>
          <h2 className="mt-5 text-[34px] font-semibold leading-[1.06] tracking-[-0.04em] text-[#17181c] lg:text-[56px] lg:leading-[57.68px] lg:tracking-[-2.52px]">
            You&rsquo;ve seen how it works.
            <br className="max-lg:hidden" /> Now get paid for it.
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-[27px] text-[#43454c] lg:text-[19px] lg:leading-[28.5px]">
            Join 2,000+ creators already getting paid to post on LinkedIn.
            It&rsquo;s free, and you keep 100% of what you earn.
          </p>
          <Link
            href="/register?role=influencer"
            className="mx-auto mt-9 inline-flex items-center gap-[11px] rounded-[12px] bg-[#17181c] px-7 py-4 text-[16px] font-semibold leading-5 text-white transition hover:opacity-90"
          >
            Apply now
            {ARROW}
          </Link>
          <div className="mt-4 text-[13px] leading-4 text-[#55707e]">
            Takes 2 minutes. No commitment.
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[14px] leading-[18px] text-[#55707e]">
            <span>2,000+ creators paid</span>
            <span>Paid within 24h</span>
            <span>Quit anytime, keep your earnings</span>
          </div>
        </div>
      </section>

      <Footer tagline="Turn your LinkedIn audience into a paid channel." />
    </ScaleFrame>
  );
}
