/**
 * "Run creator campaigns from one place." — naano's 01-05 row.
 *
 * Authored from their stylesheet rather than approximated:
 *   .lp-journey        padding 110px 84px 126px, linear-gradient(#f2faff, #fff 27%)
 *   .lp-journey__inner width min(100%, 1320px)
 *   .lp-journey__header grid minmax(0,720px) / minmax(280px,420px), align end, gap 60
 *   .lp-journey__path  grid repeat(5, 1fr), gap 16, min-height 350, mt 62, py 34/38
 *   step card          251x351, white 74%, radius 24, 1px white-92% border, pad 18/18/22
 *   inner mock         213x247, white 56%, radius 20, 1px white-90% border
 *   title              17px / 650 / 22.1px
 *   accent             #315b7c — their bars and status text are navy, not brand blue
 */

const NAVY = "#315b7c";

const STEPS = [
  { n: "01", title: "Find creators your buyers trust", mock: <MockMatch /> },
  { n: "02", title: "Build a campaign brief in minutes", mock: <MockBrief /> },
  { n: "03", title: "Manage every collaboration", mock: <MockManage /> },
  { n: "04", title: "Track reach, clicks, and leads", mock: <MockTrack /> },
  { n: "05", title: "Pay creators without the admin", mock: <MockPay /> },
];

export function CampaignJourney() {
  return (
    <section
      id="how"
      className="scroll-mt-20 px-[84px] pb-[126px] pt-[110px]"
      style={{ background: "linear-gradient(#f2faff 0%, #ffffff 27%, #ffffff 100%)" }}
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="grid items-end gap-[60px] [grid-template-columns:minmax(0,720px)_minmax(280px,420px)] max-lg:grid-cols-1">
          <div>
            <div className="flex items-center gap-2.5 text-[12px] font-[750] uppercase tracking-[0.15em] text-[#60727c]">
              <span className="size-[7px] rounded-full bg-[#93c5fd]" />
              One platform, from brief to results
            </div>
            <h2 className="mt-[24px] text-[56px] font-semibold leading-[57.68px] tracking-[-0.045em] text-[#111318]">
              Run creator campaigns
              <br />
              from one place.
            </h2>
          </div>
          <p className="text-[19px] leading-[28.5px] text-[#55575e]">
            Find the right voices, launch faster, and connect every post to
            measurable business results.
          </p>
        </div>

        <div className="relative mt-[62px] grid min-h-[350px] grid-cols-1 items-stretch gap-4 py-[34px] pb-[38px] sm:grid-cols-2 lg:grid-cols-5">
          {/* the route naano draws behind the cards */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[-8px] right-[-8px] top-1/2 hidden border-t border-dashed border-[#c7d8e4] lg:block"
          />

          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative z-10 flex flex-col rounded-[24px] border border-white/[0.92] bg-white/[0.74] px-[18px] pb-[22px] pt-[18px]"
            >
              <span
                className="inline-flex h-[26px] w-fit items-center rounded-full border border-white/90 bg-white/70 px-2.5 text-[10px] font-extrabold tracking-[0.06em]"
                style={{ color: "#54778a" }}
              >
                {s.n}
              </span>

              <div className="mt-3 flex-1 rounded-[20px] border border-white/90 bg-white/[0.56] p-3.5">
                {s.mock}
              </div>

              <h3 className="mt-4 text-[17px] font-[650] leading-[22.1px] text-[#111318]">
                {s.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ mocks */

/** 01 — three creators as portrait tiles with a fit score. */
function MockMatch() {
  const people = [
    { file: "b", name: "Eric", fit: 92 },
    { file: "h", name: "Robin", fit: 88 },
    { file: "f", name: "Aya", fit: 84 },
  ];
  return (
    <div className="flex gap-1.5">
      {people.map((p) => (
        <div key={p.name} className="min-w-0 flex-1 rounded-[10px] border border-line/60 bg-white p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/lp/avatar-${p.file}.png`}
            alt=""
            className="h-[52px] w-full rounded-[7px] object-cover"
          />
          <div className="mt-1.5 truncate text-[10px] font-bold text-ink">{p.name}</div>
          <div className="flex items-baseline gap-1 text-[9px] text-grey">
            Fit
            <span className="font-bold" style={{ color: NAVY }}>
              {p.fit}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** 02 — the drafted brief with its AI chip. */
function MockBrief() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-ink">Campaign brief</span>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-bold"
          style={{ background: "#e7f1f8", color: NAVY }}
        >
          AI
        </span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {["Objectives and key messages", "Creator guidelines", "Tracking links ready"].map((t) => (
          <li key={t} className="flex items-start gap-2 text-[10px] leading-tight text-[#55575e]">
            <span
              className="mt-px grid size-[13px] shrink-0 place-items-center rounded-full text-[8px] font-bold text-white"
              style={{ background: NAVY }}
            >
              ✓
            </span>
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-4 h-[6px] overflow-hidden rounded-full bg-[#e7eef4]">
        <div className="h-full w-[72%] rounded-full" style={{ background: NAVY }} />
      </div>
    </div>
  );
}

/** 03 — the same three creators moving through the lifecycle. */
function MockManage() {
  const rows = [
    { file: "d", name: "Raphael", state: "Draft ready" },
    { file: "b", name: "Thomas", state: "Scheduled" },
    { file: "e", name: "Nada", state: "Live" },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/lp/avatar-${r.file}.png`} alt="" className="size-[30px] shrink-0 rounded-full object-cover" />
          <span className="min-w-0 flex-1 truncate text-[10.5px] font-bold text-ink">{r.name}</span>
          <span
            className="shrink-0 rounded-full px-2 py-1 text-[9.5px] font-bold leading-none"
            style={{ background: "#e7f1f8", color: NAVY }}
          >
            {r.state}
          </span>
        </div>
      ))}
    </div>
  );
}

/** 04 — attributed pipeline. */
function MockTrack() {
  const bars = [26, 34, 30, 46, 40, 74, 92];
  return (
    <div>
      <div className="text-[9.5px] font-medium text-[#8a949c]">Attributed pipeline</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[21px] font-extrabold tracking-tight text-ink">€48.2K</span>
        <span
          className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
          style={{ background: "#e7f1f8", color: NAVY }}
        >
          +24%
        </span>
      </div>
      <div className="mt-3 flex h-[54px] items-end gap-[5px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-[3px]"
            style={{ height: `${h}%`, background: i >= bars.length - 2 ? NAVY : "#d5e3ee" }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9.5px] text-[#8a949c]">
        <span>124K views</span>
        <span>418 leads</span>
      </div>
    </div>
  );
}

/** 05 — payout, handled by Naano. */
function MockPay() {
  return (
    <div>
      <div className="flex items-start gap-2">
        <span
          className="mt-px grid size-[15px] shrink-0 place-items-center rounded-full text-[9px] font-bold text-white"
          style={{ background: NAVY }}
        >
          ✓
        </span>
        <div>
          <div className="text-[11px] font-bold leading-tight text-ink">Payment scheduled</div>
          <div className="mt-0.5 text-[9.5px] text-[#8a949c]">Handled by Naano</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-[10px] border border-line/60 bg-white px-2.5 py-2">
        <span className="text-[9.5px] leading-tight text-[#8a949c]">
          Creator
          <br />
          payout
        </span>
        <span className="text-[13px] font-extrabold text-ink">€1,240</span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {["Contract", "Invoice", "Payout"].map((t) => (
          <span key={t} className="rounded-[6px] bg-[#eef2f5] px-1.5 py-1 text-[8.5px] font-semibold text-[#8a949c]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
