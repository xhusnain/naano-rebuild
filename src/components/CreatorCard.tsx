import Link from "next/link";
import type { Creator } from "@/lib/creators";
import { compact, euro, cx } from "@/lib/format";

/**
 * Marketplace creator card, matched to naano's own.
 *
 * Everything below the strip is centre-aligned, the rank number sits on the
 * left of the strip in readable grey (it was white-on-white and invisible),
 * the checkbox and LinkedIn badge pair up top-left, and Book is a white pill
 * rather than a solid blue one.
 */
export function CreatorCard({
  creator,
  rank,
  selected,
  onSelect,
  onBook,
  favourite,
  onFavourite,
}: {
  creator: Creator;
  rank?: number;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onBook?: (id: string) => void;
  favourite?: boolean;
  onFavourite?: (id: string) => void;
}) {
  const c = creator;

  return (
    <div className="nn-card group flex flex-col overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_18px_44px_-20px_rgba(22,82,240,0.35)]">
      {/* ---------------------------------------------------------- strip */}
      <div className="nn-sky-strip relative h-[76px]">
        {rank !== undefined && (
          // Ghosted rank, as on naano's card. Previously pure white on a
          // near-white strip, which made it invisible; now a translucent slate
          // so it reads as a watermark without competing with the controls.
          <span
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-6 select-none font-display text-[46px] font-extrabold leading-none text-[#5b7ca6]/25"
          >
            {rank}
          </span>
        )}

        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5">
          {onSelect && (
            <input
              type="checkbox"
              checked={!!selected}
              onChange={() => onSelect(c.id)}
              aria-label={`Select ${c.name}`}
              className="size-3.5 cursor-pointer rounded border-line bg-white accent-[#1652f0]"
            />
          )}
          <span className="grid size-4 place-items-center rounded-[3px] bg-[#0a66c2] text-[9px] font-bold leading-none text-white">
            in
          </span>
        </div>

        <span className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1 font-display text-[13px] font-bold tracking-tight text-ink">
          <svg viewBox="0 0 24 16" className="h-3 w-4" aria-hidden>
            <path d="M2 11c3-6 7-9 11-9 3 0 5 2 5 5 0 4-4 7-9 7-3 0-5-1-7-3z" fill="#111318" />
            <circle cx="19" cy="12" r="2" fill="#1652f0" />
          </svg>
          naano
        </span>

        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
          {onBook && (
            <button
              onClick={() => onBook(c.id)}
              className="rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink shadow-sm transition hover:border-brand hover:text-brand"
            >
              Book
            </button>
          )}
          {onFavourite && (
            <button
              onClick={() => onFavourite(c.id)}
              aria-label={favourite ? "Remove from shortlist" : "Add to shortlist"}
              aria-pressed={!!favourite}
              className={cx(
                "grid size-6 place-items-center rounded-full border border-line bg-white text-xs leading-none shadow-sm transition",
                favourite ? "text-brand" : "text-grey hover:text-ink"
              )}
            >
              {favourite ? "★" : "☆"}
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------- identity */}
      <div className="-mt-9 flex flex-col items-center px-5 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.avatar}
          alt=""
          width={64}
          height={64}
          className="size-[68px] rounded-full border-[3px] border-white bg-white object-cover shadow-sm"
        />

        <Link
          href={`/creators/${c.slug}`}
          className="mt-2.5 font-display text-[15px] font-bold text-ink hover:text-brand"
        >
          {c.name}
        </Link>

        <div className="mt-1 text-[12px] font-medium text-muted">
          {c.verticals.join(" · ")}
        </div>

        <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-muted">
          <span aria-hidden>{c.flag}</span>
          {c.country || c.countryCode}
        </span>

        <p className="mt-2.5 line-clamp-2 text-[12px] leading-relaxed text-muted">
          {c.bio}
        </p>
      </div>

      {/* ------------------------------------------------------- matching */}
      <div className="mt-4 px-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
            ● Matching
          </span>
          <span className="font-display text-[12px] font-bold text-ink">
            {c.matchScore}
            <span className="text-grey">/100</span>
          </span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-brand-soft">
          <div className="h-full rounded-full bg-brand" style={{ width: `${c.matchScore}%` }} />
        </div>
      </div>

      {/* ---------------------------------------------------------- stats */}
      <div className="mt-4 grid grid-cols-3 divide-x divide-line border-t border-line">
        <Stat label="Followers" value={compact(c.followers)} />
        <Stat label="Median views" value={compact(c.medianViews)} />
        <Stat label="Post cost" value={euro(c.postCost)} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-1 py-3 text-center">
      <div className="font-display text-[13px] font-bold text-ink">{value}</div>
      {/* nowrap: "Median views" was wrapping to two lines and knocking the
          three cells out of alignment */}
      <div className="mt-0.5 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.06em] text-grey">
        {label}
      </div>
    </div>
  );
}
