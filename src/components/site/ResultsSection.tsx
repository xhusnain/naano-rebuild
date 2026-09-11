/**
 * "Proven across thousands of campaigns." — naano's results section, the last
 * block of the landing page before the footer.
 *
 * Authored from their page at 1672:
 *   section    padding 118px 84px 72px, relative, overflow hidden, isolate
 *              linear-gradient(#fff 0%, #f3faff 38%, #fff 100%)
 *              ::before  cloud-layer-bottom-v1 at 112% / 50% 100%, opacity .2,
 *                        1939.5 x 360, sat -90px below the bottom edge
 *   eyebrow    flex gap 10, 9px #315b7c dot + 14px/700/3.08px #315b7c
 *   h2         margin-top 24, 56px / 57.68px / 600 / -2.52px, max-width 940
 *   band       .lp-results-proof 1180 x 310, margin-top 42, radius 34,
 *              padding 40px 22px, linear-gradient(#eff9fe/.5, #fff/.18),
 *              overflow hidden, with results-metrics-clouds covering it at .92
 *   stat       272 x 135.2, 4 up, gap 16, radius 22, white 64%, 1px white/90,
 *              blur(12px) saturate(1.08), 0 22px 48px -38px #2e566c/42
 *              value 54px/54px/660/-2.7px, label 13.5px/18.225px #697b86 mt 11
 *   posts      .lp-result-grid 1320 wide, margin-top 50, padding 10px 6px 28px,
 *              4 x 313.5, gap 18; card 568 tall, radius 26, 1px #aaccdd/80
 *   cta        margin-top 44, dark pill 16px 28px radius 12, sub 15px #9b9da3
 */

const STATS = [
  ["5M+", "Impressions generated"],
  ["30K+", "Leads generated"],
  ["2,000+", "Creators on Naano"],
  ["5K+", "Posts published"],
] as const;

type Post = {
  name: string;
  meta: string;
  avatar: string;
  body: string;
  photo: string;
  stats: [string, string, string];
  brand: string;
  brandHeight: number;
  href: string;
};

const POSTS: Post[] = [
  {
    name: "Thomas Higadère",
    meta: "Creator · B2B & AI · 34K followers",
    avatar: "avatar-c",
    body: "How AI changed our prospecting workflow for wealth managers and private bankers.",
    photo: "photo-calendar",
    stats: ["42.8K", "312", "18"],
    brand: "lemlist",
    brandHeight: 20,
    href: "https://www.linkedin.com/company/lemlist/",
  },
  {
    name: "Robin Tempe",
    meta: "Creator · Sales & AI · 12K followers",
    avatar: "avatar-e",
    body: "I run my entire prospecting workflow through an AI. Here is how.",
    photo: "photo-claude-mcp-leadbay",
    stats: ["9K", "100", "50"],
    brand: "leadbay",
    brandHeight: 20,
    href: "https://www.linkedin.com/company/leadbay/",
  },
  {
    name: "Eric Djavid",
    meta: "Sales Leader · B2B · 40K followers",
    avatar: "avatar-b",
    body: "Most sales teams spend 80% of their time on the wrong leads. Here is how I changed that.",
    photo: "photo-leadbay-app",
    stats: ["20K", "350", "80"],
    brand: "leadbay",
    brandHeight: 20,
    href: "https://www.linkedin.com/company/leadbay/",
  },
  {
    name: "Marina Panova",
    meta: "Content Creator · B2B · 34K followers",
    avatar: "avatar-h",
    body: "How I build my 30-day LinkedIn content system, the exact playbook.",
    photo: "photo-marina-laptop",
    stats: ["100K", "1,600", "320"],
    brand: "abyssale",
    brandHeight: 20,
    href: "https://www.linkedin.com/company/abyssale/",
  },
];

const METRIC_LABELS = ["Impressions", "Clicks", "Leads"] as const;

function LinkedInBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0" aria-hidden>
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M7.2 9.6H4.8V19h2.4V9.6ZM6 5.2a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8ZM19.2 19h-2.4v-4.9c0-1.2-.5-1.9-1.5-1.9-.8 0-1.3.5-1.5 1.1-.1.2-.1.5-.1.8V19H11.3s.03-8.6 0-9.4h2.4v1.3c.3-.5.9-1.2 2.2-1.2 1.6 0 2.9 1 2.9 3.3V19Z"
      />
    </svg>
  );
}

/** eye / cursor / people — the three metric glyphs, at 16px stroke #9B9DA3. */
function MetricIcon({ i }: { i: number }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#9B9DA3",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (i === 0) {
    return (
      <svg {...common}>
        <path d="M2 12 S5 5 12 5 s10 7 10 7 -3 7 -10 7 -10 -7 -10 -7Z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    );
  }
  if (i === 1) {
    return (
      <svg {...common}>
        <path d="M5 3 L19 11 L12.5 12.5 L16 20 L13 21 L9.5 13.5 L5 17 Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20 c0 -3.4 2.7 -5.8 6 -5.8 s6 2.4 6 5.8" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14 c2.6 0.2 5 2.2 5 5.2" />
    </svg>
  );
}

export function ResultsSection() {
  return (
    <section
      id="results"
      className="relative isolate overflow-hidden px-5 pb-[56px] pt-[64px] lg:px-[84px] lg:pb-[72px] lg:pt-[118px]"
      style={{ background: "linear-gradient(#ffffff 0%, #f3faff 38%, #ffffff 100%)" }}
    >
      {/* .lp-system-results::before — a wide cloud bank hung mostly below the
          section's bottom edge, softening the seam into the footer. Sized off
          the section, not the viewport.

          Their rule says opacity .2, but on the live site that layer paints
          nothing: sampling their section bottom gives a flat rgb(251,253,254)
          with about 2 levels of variation, where this image at .2 swings ~10.
          Matching the render rather than the stylesheet, so the seam reads as
          the same near-white fade instead of a visible bank of cloud. */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-90px] left-[-134px] right-[-134px] z-0 h-[360px] opacity-[0.04]"
        style={{
          backgroundImage: "url('/lp/cloud-layer-bottom-v1.png')",
          backgroundSize: "112%",
          backgroundPosition: "50% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-[2] flex items-center justify-center gap-[10px]">
        <span className="size-[9px] rounded-full bg-[#315b7c]" />
        <span className="text-[12px] font-bold uppercase leading-[17px] tracking-[2.64px] text-[#315b7c] lg:text-[14px] lg:tracking-[3.08px]">
          The results
        </span>
      </div>

      <h2 className="relative z-[2] mx-auto mt-[24px] max-w-[940px] text-center text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#111318] lg:text-[56px] lg:leading-[57.68px] lg:tracking-[-0.045em]">
        Proven across thousands
        <br className="max-lg:hidden" /> of campaigns.
      </h2>

      {/* ------------------------------------------------------- stat band */}
      <div
        className="relative z-[1] mx-auto mt-[42px] grid w-full max-w-[1180px] items-center overflow-hidden rounded-[34px] px-[22px] py-[40px] lg:min-h-[310px]"
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

      {/* ------------------------------------------------------- post cards */}
      <div className="relative z-[1] mx-auto mt-[50px] grid w-full max-w-[1320px] grid-cols-1 gap-[18px] px-0 pb-[28px] pt-[10px] sm:grid-cols-2 lg:grid-cols-4 lg:px-[6px]">
        {POSTS.map((post) => (
          <article
            key={post.name}
            className="flex flex-col overflow-hidden rounded-[26px] border border-[rgba(170,204,221,0.5)] shadow-[0_28px_66px_-46px_rgba(44,83,106,0.42),inset_0_1px_0_0_#fff]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(237, 248, 253, 0.92) 0px, rgba(255, 255, 255, 0.98) 160px, rgb(255, 255, 255) 100%)",
            }}
          >
            <header
              className="flex items-center gap-3 border-b border-[rgba(174,207,222,0.28)] px-5 pb-4 pt-5 backdrop-blur-[5px]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.54), rgba(255, 255, 255, 0.28))",
              }}
            >
              <span
                className="size-[44px] shrink-0 rounded-full border-[3px] border-white/95 bg-[#edebe7] bg-cover bg-center shadow-[0_10px_24px_rgba(47,83,102,0.14),0_0_0_1px_rgba(138,186,207,0.18)]"
                style={{ backgroundImage: `url('/lp/${post.avatar}.png')` }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[15.5px] font-bold leading-[19px] text-[#17181c]">
                    {post.name}
                  </span>
                  <LinkedInBadge />
                </div>
                <div className="mt-px text-[13px] leading-4 text-[#8b8d94]">{post.meta}</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#B4B6BC" className="shrink-0" aria-hidden>
                <circle cx="5" cy="12" r="1.6" />
                <circle cx="12" cy="12" r="1.6" />
                <circle cx="19" cy="12" r="1.6" />
              </svg>
            </header>

            <p className="mx-5 mt-[18px] min-h-[92px] text-[16.5px] font-[580] leading-[24.09px] tracking-[-0.165px] text-[#20252a]">
              {post.body}
            </p>

            <div className="mx-[14px] mb-[14px] mt-4 h-[188px] overflow-hidden rounded-[18px] border border-white/95 bg-[#eef7fb] shadow-[0_18px_38px_-30px_rgba(39,78,99,0.5),inset_0_1px_0_0_#fff]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/lp/${post.photo}.jpg`} alt="" className="size-full object-cover" />
            </div>

            <div className="mt-auto pt-4">
              <div className="mx-[14px] grid grid-cols-[1.28fr_1fr_1fr] gap-[10px] rounded-[17px] border border-[rgba(180,209,223,0.38)] bg-[rgba(239,248,252,0.74)] px-[10px] pb-3 pt-[15px]">
                {post.stats.map((n, i) => (
                  <div key={METRIC_LABELS[i]} className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-[7px]">
                      <MetricIcon i={i} />
                      <span className="text-[16.5px] font-bold leading-5 text-[#17181c]">{n}</span>
                    </div>
                    <span className="pl-[23px] text-[12.5px] leading-[15px] text-[#9b9da3]">
                      {METRIC_LABELS[i]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-[14px] flex items-center justify-between border-t border-[rgba(183,209,221,0.34)] bg-[rgba(248,252,254,0.86)] px-5 pb-[17px] pt-[15px]">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] leading-5 text-[#9b9da3]">For</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/lp/logo-${post.brand}.png`}
                    alt={post.brand}
                    style={{ height: post.brandHeight }}
                    className="ml-0.5 w-auto object-contain"
                  />
                </div>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13.5px] font-semibold text-[#2563eb] transition hover:opacity-70"
                >
                  View post
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17 17 7" />
                    <path d="M9 7h8v8" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ------------------------------------------------------------- cta */}
      <div className="relative z-[1] mt-[44px] flex flex-col items-center">
        <a
          href="/register"
          className="flex items-center gap-[11px] rounded-[12px] bg-[#17181c] px-7 py-4 text-[16px] font-semibold leading-5 text-white shadow-[0_12px_30px_rgba(23,24,28,0.18)] transition hover:opacity-90"
        >
          Get started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </a>
        <span className="mt-4 text-[15px] leading-[19px] text-[#9b9da3]">
          Start free. Pay per post when you&rsquo;re ready.
        </span>
      </div>
    </section>
  );
}
