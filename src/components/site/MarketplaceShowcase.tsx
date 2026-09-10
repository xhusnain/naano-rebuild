import { CREATORS } from "@/lib/creators";
import { CreatorCard } from "@/components/CreatorCard";

const FEATURES = [
  ["3,000+ vetted creators", "Specialist B2B voices, ready to collaborate."],
  ["Across 100 countries", "Local expertise with genuinely global reach."],
  ["Matched to your buyers", "Audience fit comes before follower count."],
] as const;

const RAIL = ["grid", "store", "hands", "layers", "chat", "card"] as const;

const RAIL_PATHS: Record<string, string> = {
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  store: "M3 9l1.5-5h15L21 9M3 9h18M3 9v11h18V9M9 20v-6h6v6",
  hands: "M4 12l4-4 4 4-4 4zM12 12l4-4 4 4-4 4",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  chat: "M21 12a8 8 0 01-8 8H7l-4 3V12a8 8 0 018-8h2a8 8 0 018 8z",
  card: "M2 7h20v11H2zM2 11h20",
};

/**
 * "Work with all the best creators." — naano's section after the testimonial.
 *
 * Authored values from their page at 1672: eyebrow pill 13px/650 on white at
 * 68%, h2 76px / 75.24px line-height / weight 600 / letter-spacing -3.952px,
 * subhead 21px / 31.92px capped at 650.
 *
 * naano renders the app preview as a flat screenshot,
 * marketplace-screenshot-clean-v2.png. That file carries photographs of real,
 * named creators, so it is not reproduced here. The preview below is live DOM
 * built from this project's own invented creators and generated avatars — same
 * composition, nobody's likeness republished, and it stays in sync with the
 * real card component rather than going stale as an image.
 */
export function MarketplaceShowcase() {
  // naano shows two rows of three inside the window
  const featured = CREATORS.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#fcfcfb] pb-[120px] pt-[132px]">
      <div className="relative z-10 px-[56px] text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.68] px-[14px] py-[7px] text-[13px] font-[650] leading-none text-[#555b63]">
          <span className="size-[7px] rounded-full bg-[#93c5fd]" />
          The Naano creator marketplace
        </span>

        <h2 className="mx-auto mt-[25px] max-w-[840px] text-[76px] font-semibold leading-[75.24px] tracking-[-0.052em] text-[#111318]">
          Work with all the
          <br />
          best creators.
        </h2>

        <p className="mx-auto mt-[19px] max-w-[650px] text-[21px] leading-[31.92px] text-[#525861]">
          Find the right B2B voices, compare their audience fit, and book every
          collaboration from one place.
        </p>
      </div>

      {/* app preview, sitting on their atmosphere backdrop */}
      <div className="relative z-10 mx-auto mt-[64px] w-[1430px] max-w-[calc(100%-112px)]">
        {/* naano's backdrop file, marketplace-atmosphere-v1.png, is not a clean
            gradient — it bakes in their own app screenshot, so their creators'
            faces bleed through above and below the window. Drawn as a gradient
            panel instead. */}
        <div className="rounded-[28px] bg-[linear-gradient(180deg,#cfe7fa_0%,#e3f1fd_45%,#f4f9ff_100%)] p-[18px] pt-[26px]">
          <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)]">
            {/* browser chrome */}
            <div className="flex h-[52px] items-center gap-4 border-b border-line/70 px-5">
              <div className="flex gap-[7px]">
                <span className="size-[11px] rounded-full bg-[#e2e2df]" />
                <span className="size-[11px] rounded-full bg-[#e2e2df]" />
                <span className="size-[11px] rounded-full bg-[#e2e2df]" />
              </div>
              <div className="mx-auto flex h-[30px] w-[330px] items-center justify-center gap-2 rounded-lg bg-[#f4f4f2] text-[13px] text-[#6b7280]">
                <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 018 0v3" />
                </svg>
                naano.co/marketplace
              </div>
            </div>

            {/* app body: icon rail + card grid */}
            <div className="flex">
              <div className="flex w-[64px] shrink-0 flex-col items-center gap-5 border-r border-line/70 py-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lp/naano-logo-nav.png" alt="" className="h-[16px] w-auto object-contain" />
                {RAIL.map((k, i) => (
                  <span
                    key={k}
                    className={`grid size-8 place-items-center rounded-lg ${
                      i === 1 ? "bg-brand-soft text-brand" : "text-[#b4b4b0]"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={RAIL_PATHS[k]} />
                    </svg>
                  </span>
                ))}
                <span className="mt-auto size-8 rounded-full bg-[#17181c]" />
              </div>

              <div className="relative flex-1 bg-[#fbfcff]">
                <div className="grid grid-cols-3 gap-5 p-6">
                  {featured.map((c, i) => (
                    <CreatorCard key={c.id} creator={c} rank={i + 1} preview />
                  ))}
                </div>

                {/* the small chevron naano floats between the rows */}
                <span className="pointer-events-none absolute bottom-[86px] left-1/2 grid size-8 -translate-x-1/2 place-items-center rounded-full border border-line bg-white text-[#9b9da3] shadow-sm">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* naano floats an assistant prompt over the bottom of the window */}
          <div className="pointer-events-none relative z-10 -mt-[26px] flex justify-center">
            <div className="flex h-[52px] w-[700px] max-w-[70%] items-center gap-3 rounded-full border border-line/70 bg-white px-6 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.28)]">
              <svg viewBox="0 0 24 24" className="size-[18px] text-[#9b9da3]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="12" r="9" strokeDasharray="4 3" />
              </svg>
              <span className="flex-1 text-left text-[15px] text-[#9b9da3]">
                What can I help you find?
              </span>
              <svg viewBox="0 0 24 24" className="size-[18px] text-[#9b9da3]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M8 10v4M12 7v10M16 10v4M4 11v2M20 11v2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* three claims under the preview */}
      <div className="relative z-10 mx-auto mt-[56px] grid w-[1430px] max-w-[calc(100%-112px)] grid-cols-1 gap-6 md:grid-cols-3">
        {FEATURES.map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-line/70 bg-white/70 p-8">
            <div className="text-[19px] font-bold text-[#17181c]">{title}</div>
            <div className="mt-2 text-[15px] leading-relaxed text-[#55575e]">{body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
