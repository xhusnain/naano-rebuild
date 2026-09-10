import Link from "next/link";

/**
 * "Real teams. Measurable pipeline." — naano's case-study section.
 *
 * Authored from their page at 1672:
 *   section   #fbfdfe, padding 118px 84px 150px
 *   h2        56px / 57.68px / 600 / -2.52px
 *   sub       19px / #55575e
 *   h3        27px / 32.4px / 700
 *   stats     38px / 600
 *   quote     24px / 33.6px / 600
 *   labels    VIDEO TESTIMONIAL 12px/700/2.64px, TRUSTED BY 11px/700/2.2px
 *
 * Their video is a 37MB mp4. The poster frame is what shows at rest, so that is
 * what ships here — the play control links out rather than bundling the file.
 */

const TRUSTED = [
  "lemlist", "folk", "leadbay", "ringover",
  "attio", "lagrowthmachine", "gojiberry", "chatseo",
  "abyssale",
];

const STATS = [
  ["9", "creators activated"],
  ["2,940", "qualified clicks"],
  ["512", "trials started"],
] as const;

export function ProofSection() {
  return (
    <section id="proof-teams" className="bg-[#fbfdfe] px-[84px] pb-[150px] pt-[118px]">
      <div className="mx-auto w-full max-w-[1320px]">
        <h2 className="text-[56px] font-semibold leading-[57.68px] tracking-[-0.045em] text-[#111318]">
          Real teams. Measurable pipeline.
        </h2>
        <p className="mt-3 text-[19px] text-[#55575e]">
          See how B2B teams turn creator trust into attributable demand with Naano.
        </p>

        <div className="mt-12 rounded-[28px] border border-line/50 p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,470px)_minmax(0,1fr)]">
            {/* -------------------------------------------------- testimonial */}
            <div className="rounded-[22px] border border-line/60 bg-white p-6">
              <div className="text-[12px] font-bold uppercase tracking-[2.64px] text-[#9b9da3]">
                Video testimonial
              </div>

              <div className="relative mt-4 overflow-hidden rounded-[16px] bg-[#e7e9ec]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lp/vincent-poster.jpg"
                  alt="Vincent Josse, founder of BlogSEO"
                  className="h-[343px] w-full object-cover"
                />
                <Link
                  href="https://naano.com/case-studies/blogseo"
                  aria-label="Play the BlogSEO video testimonial"
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="grid size-[74px] place-items-center rounded-full bg-white/95 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.5)] transition hover:scale-105">
                    <svg viewBox="0 0 24 24" className="ml-1 size-6 text-ink" fill="currentColor" aria-hidden>
                      <path d="M8 5l12 7-12 7z" />
                    </svg>
                  </span>
                </Link>
                <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-[12px] font-medium text-white">
                  2:40
                </span>
                <span className="absolute bottom-3 left-3 text-[12px] leading-tight text-white drop-shadow">
                  Vincent Josse
                  <br />
                  Founder of BlogSEO
                </span>
              </div>

              <blockquote className="mt-6 text-[24px] font-semibold leading-[33.6px] tracking-[-0.01em] text-[#17181c]">
                “Naano became one of our fastest acquisition channels. We know
                exactly what every creator brings.”
              </blockquote>

              <div className="mt-6 flex items-center gap-3 rounded-[20px] bg-[#eef8fd] p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lp/avatar-c.png" alt="" className="size-10 shrink-0 rounded-full object-cover" />
                <div>
                  <div className="text-[15px] font-bold leading-tight text-ink">Vincent Josse</div>
                  <div className="text-[13px] text-[#55575e]">CEO &amp; Founder, BlogSEO</div>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------- case study */}
            <div className="rounded-[22px] border border-line/60 bg-white p-8">
              <div className="flex items-start justify-between gap-6">
                <div className="text-[12px] font-bold uppercase tracking-[2.64px] text-[#9b9da3]">
                  Case study
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lp/logo-blogseo.png" alt="BlogSEO" className="h-[26px] w-auto object-contain" />
              </div>

              <h3 className="mt-5 max-w-[610px] text-[27px] font-bold leading-[32.4px] tracking-[-0.02em] text-[#111318]">
                How BlogSEO turned creator content into product signups
              </h3>
              <p className="mt-4 max-w-[610px] text-[16px] leading-relaxed text-[#55575e]">
                BlogSEO briefed SEO &amp; SaaS creators on LinkedIn and X, then traced
                every trial back to the post that drove it, all in Naano.
              </p>

              <div className="mt-8 grid grid-cols-3 divide-x divide-line/70 border-t border-line/70 pt-8">
                {STATS.map(([n, l], i) => (
                  <div key={l} className={i === 0 ? "pr-6" : "px-6"}>
                    <div className="text-[38px] font-semibold leading-none tracking-tight text-[#17181c]">
                      {n}
                    </div>
                    <div className="mt-2 text-[14px] text-[#8a949c]">{l}</div>
                  </div>
                ))}
              </div>

              <Link
                href="https://naano.com/case-studies/blogseo"
                className="mt-7 inline-flex items-center gap-2 text-[16px] font-semibold text-ink transition hover:opacity-70"
              >
                Read case study
                <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </Link>

              <div className="mt-9 border-t border-line/70 pt-7">
                <div className="text-[11px] font-bold uppercase tracking-[2.2px] text-[#b0b2b8]">
                  Trusted by teams at
                </div>
                <div className="mt-5 grid grid-cols-2 items-center gap-x-6 gap-y-6 sm:grid-cols-4">
                  {TRUSTED.map((t) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={t}
                      src={`/lp/logo-${t}.png`}
                      alt={t}
                      className="h-[26px] w-auto object-contain mix-blend-multiply"
                    />
                  ))}
                  <span className="justify-self-start rounded-full border border-line px-3 py-1.5 text-[14px] text-[#8a949c]">
                    +30
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
