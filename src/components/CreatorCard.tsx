import Link from "next/link";
import type { Creator } from "@/lib/creators";
import { compact, euro, cx } from "@/lib/format";

/**
 * Marketplace creator card.
 *
 * Layout follows naano's own product screenshot, top to bottom:
 * gradient header strip with a ghosted rank number, bulk-select checkbox,
 * LinkedIn badge, Book + favourite; avatar overlapping the strip; name,
 * vertical tags and country pill; two-line bio; MATCHING xx/100 with a bar;
 * and a three-cell footer of FOLLOWERS | MEDIAN VIEWS | POST COST.
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
    <div className="nn-card group flex flex-col overflow-hidden transition hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_40px_-16px_rgba(22,82,240,0.28)]">
      {/* header strip */}
      <div className="relative h-24 bg-[linear-gradient(140deg,#dceaff_0%,#eef4ff_55%,#ffffff_100%)]">
        {rank !== undefined && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-1 select-none font-display text-6xl font-extrabold leading-none text-white/70"
          >
            {rank}
          </span>
        )}

        {onSelect && (
          <label className="absolute left-3 top-3 z-10 flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={!!selected}
              onChange={() => onSelect(c.id)}
              aria-label={`Select ${c.name}`}
              className="size-4 cursor-pointer rounded border-line accent-[#1652f0]"
            />
          </label>
        )}

        <span className="absolute left-1/2 top-3 -translate-x-1/2 font-display text-xs font-bold tracking-tight text-brand/70">
          naano
        </span>

        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
          {onBook && (
            <button
              onClick={() => onBook(c.id)}
              className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-strong"
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
                "grid size-7 place-items-center rounded-full bg-white/85 text-base leading-none shadow-sm transition hover:bg-white",
                favourite ? "text-amber-500" : "text-grey"
              )}
            >
              {favourite ? "★" : "☆"}
            </button>
          )}
        </div>

        <span className="absolute bottom-2 right-3 grid size-5 place-items-center rounded-[3px] bg-[#0a66c2] text-[10px] font-bold text-white">
          in
        </span>
      </div>

      {/* identity */}
      <div className="-mt-9 px-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.avatar}
          alt=""
          className="size-18 rounded-full border-4 border-white bg-brand-soft shadow-sm"
          width={72}
          height={72}
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <Link
          href={`/creators/${c.slug}`}
          className="font-display text-[17px] font-bold text-ink hover:text-brand"
        >
          {c.name}
        </Link>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-muted">
            {c.verticals.join(" · ")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] font-medium text-muted">
            <span aria-hidden>{c.flag}</span>
            {c.countryCode}
          </span>
        </div>

        <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {c.bio}
        </p>

        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className="nn-eyebrow">Matching</span>
            <span className="font-display text-xs font-bold text-brand">
              {c.matchScore}
              <span className="text-grey">/100</span>
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-brand-soft">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${c.matchScore}%` }}
            />
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 divide-x divide-line border-t border-line pt-3.5 text-center">
          <Stat label="Followers" value={compact(c.followers)} />
          <Stat label="Median views" value={compact(c.medianViews)} />
          <Stat label="Post cost" value={euro(c.postCost)} highlight />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="px-1">
      <div
        className={cx(
          "font-display text-sm font-bold",
          highlight ? "text-brand" : "text-ink"
        )}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-grey">
        {label}
      </div>
    </div>
  );
}
