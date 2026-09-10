import { CREATORS } from "@/lib/creators";

/**
 * "Run creator campaigns from one place." — naano's 01-05 row.
 *
 * Authored at their 1672 design width: 176px gutters, eyebrow 12px/750 with
 * 1.8px tracking, h2 56px / 57.68px / weight 600 / -2.52px, left aligned, with
 * the description parked right at x=1076 and capped at 400. The five steps sit
 * on one 1320-wide panel, each with a numbered chip, a small piece of product
 * UI, and its caption underneath.
 */
export function CampaignJourney() {
  const [a, b, c] = CREATORS.slice(0, 3);

  const steps = [
    { n: "01", title: "Find creators your buyers trust", mock: <MockMatch a={a} b={b} c={c} /> },
    { n: "02", title: "Build a campaign brief in minutes", mock: <MockBrief /> },
    { n: "03", title: "Manage every collaboration", mock: <MockManage a={a} b={b} c={c} /> },
    { n: "04", title: "Track reach, clicks, and leads", mock: <MockTrack /> },
    { n: "05", title: "Pay creators without the admin", mock: <MockPay /> },
  ];

  return (
    <section id="how" className="scroll-mt-20 bg-[#fcfcfb] pb-[120px] pt-[110px]">
      <div className="mx-auto w-[1320px] max-w-[calc(100%-112px)]">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-[720px]">
            <div className="flex items-center gap-2 text-[12px] font-[750] uppercase tracking-[1.8px] text-[#60727c]">
              <span className="size-[7px] rounded-full bg-[#93c5fd]" />
              One platform, from brief to results
            </div>
            <h2 className="mt-[24px] text-[56px] font-semibold leading-[57.68px] tracking-[-0.045em] text-[#111318]">
              Run creator campaigns
              <br />
              from one place.
            </h2>
          </div>
          <p className="max-w-[400px] pt-[27px] text-[19px] leading-[28.5px] text-[#55575e]">
            Find the right voices, launch faster, and connect every post to
            measurable business results.
          </p>
        </div>

        {/* the five steps, on one panel with a cloud base */}
        <div className="relative mt-[56px] overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfe_62%,#e9f4fd_100%)] p-8 pb-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                {/* dashed connector to the next step */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute right-[-14px] top-[96px] hidden h-px w-[14px] border-t border-dashed border-[#c7d2e4] lg:block"
                  />
                )}

                <span className="inline-flex h-[28px] items-center rounded-[24px] bg-white/[0.74] px-3 text-[10px] font-extrabold tracking-[0.06em] text-[#54778a]">
                  {s.n}
                </span>

                <div className="mt-3 min-h-[170px] rounded-2xl border border-line/60 bg-white p-3.5 shadow-[0_2px_10px_-6px_rgba(15,23,42,0.25)]">
                  {s.mock}
                </div>

                <h3 className="mt-4 text-[17px] font-[650] leading-snug text-[#17181c]">
                  {s.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ mocks */

type C = (typeof CREATORS)[number];

function Row({ c, right }: { c: C; right: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.avatar} alt="" className="size-6 shrink-0 rounded-full bg-brand-soft object-cover" />
      <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-ink">
        {c.name.split(" ")[0]}
      </span>
      {right}
    </div>
  );
}

function MockMatch({ a, b, c }: { a: C; b: C; c: C }) {
  const fits = [92, 88, 84];
  return (
    <div className="space-y-2.5">
      {[a, b, c].map((cr, i) => (
        <Row
          key={cr.id}
          c={cr}
          right={
            <span className="shrink-0 text-[10px] font-bold text-brand">
              Fit {fits[i]}%
            </span>
          }
        />
      ))}
    </div>
  );
}

function MockBrief() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-ink">Campaign brief</span>
        <span className="rounded-full bg-brand-soft px-1.5 py-0.5 text-[9px] font-bold text-brand">AI</span>
      </div>
      <ul className="mt-2.5 space-y-2">
        {["Objectives and key messages", "Creator guidelines", "Tracking links ready"].map((t) => (
          <li key={t} className="flex items-start gap-1.5 text-[10px] leading-tight text-muted">
            <span className="mt-px grid size-3 shrink-0 place-items-center rounded-[3px] bg-brand text-[7px] font-bold text-white">
              ✓
            </span>
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-brand-soft">
        <div className="h-full w-3/4 rounded-full bg-brand" />
      </div>
    </div>
  );
}

function MockManage({ a, b, c }: { a: C; b: C; c: C }) {
  const states = [
    ["Draft ready", "bg-amber-50 text-amber-700"],
    ["Scheduled", "bg-violet-50 text-violet-700"],
    ["Live", "bg-green-50 text-success"],
  ] as const;
  return (
    <div className="space-y-2.5">
      {[a, b, c].map((cr, i) => (
        <Row
          key={cr.id}
          c={cr}
          right={
            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${states[i][1]}`}>
              {states[i][0]}
            </span>
          }
        />
      ))}
    </div>
  );
}

function MockTrack() {
  const bars = [30, 42, 38, 55, 48, 72, 90];
  return (
    <div>
      <div className="text-[9px] font-semibold uppercase tracking-wide text-grey">
        Attributed pipeline
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[19px] font-extrabold tracking-tight text-ink">€48.2K</span>
        <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-bold text-success">
          +24%
        </span>
      </div>
      <div className="mt-2.5 flex h-[42px] items-end gap-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-sm ${i >= bars.length - 2 ? "bg-brand" : "bg-brand-soft"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9px] font-medium text-muted">
        <span>124K views</span>
        <span>418 leads</span>
      </div>
    </div>
  );
}

function MockPay() {
  return (
    <div>
      <div className="flex items-start gap-1.5">
        <span className="mt-px grid size-3.5 shrink-0 place-items-center rounded-full bg-brand text-[8px] font-bold text-white">
          ✓
        </span>
        <div>
          <div className="text-[11px] font-bold leading-tight text-ink">Payment scheduled</div>
          <div className="text-[9px] text-grey">Handled by Naano</div>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between rounded-lg border border-line/70 bg-surface/50 px-2 py-1.5">
        <span className="text-[9px] font-medium text-muted">Creator payout</span>
        <span className="text-[12px] font-extrabold text-ink">€1,240</span>
      </div>
      <div className="mt-2.5 flex gap-1">
        {["Contract", "Invoice", "Payout"].map((t) => (
          <span key={t} className="rounded-md bg-surface px-1.5 py-1 text-[8px] font-semibold text-muted">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
