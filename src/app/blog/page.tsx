import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScaleFrame } from "@/components/site/ScaleFrame";
import { ALL_POSTS, FEATURED, POSTS } from "@/lib/blog";

/**
 * /blog — the Naano Journal index.
 *
 * Authored from their page: a 1200 container, a kicker row ("Naano Journal ·
 * N articles"), a light 68px headline, one featured 7/5 split card, then the
 * rest in a three-up grid of 432-tall cells.
 */

export const metadata: Metadata = {
  title: "Blog | Naano",
  description:
    "Field notes from the team building Naano: on LinkedIn distribution, CPL economics, and how B2B brands grow through creators.",
};

const META = "text-[13px] leading-[17px] text-[#8b8d94]";

export default function BlogPage() {
  return (
    <ScaleFrame>
      <Nav tone="paper" />

      <section className="bg-[#fcfcfb] px-5 pb-14 pt-[144px] lg:px-[84px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-center gap-3 text-[12px] font-bold uppercase leading-[15px] tracking-[1.92px] text-[#315b7c]">
            Naano Journal
            <span className="rounded-full bg-[#eef8fd] px-2.5 py-1 text-[11px] tracking-[1px]">
              {ALL_POSTS.length} articles
            </span>
          </div>
          <h1 className="mt-8 max-w-[900px] text-[36px] font-light leading-[1.06] tracking-[-0.03em] text-[#111318] lg:text-[68px]">
            Notes on creator-led growth.
          </h1>
          <p className="mt-6 max-w-[720px] text-[17px] leading-[27px] text-[#55575e] lg:text-[19px] lg:leading-[28.5px]">
            Field notes from the team building Naano: on LinkedIn distribution,
            CPL economics, and how B2B brands grow through creators.
          </p>
        </div>
      </section>

      <section className="bg-[#fcfcfb] px-5 pb-16 lg:px-[84px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-[12px] font-bold uppercase leading-[15px] tracking-[1.92px] text-[#8b8d94]">
            Latest
          </div>
          <Link
            href={`/blog/${FEATURED.slug}`}
            className="group mt-6 grid grid-cols-1 gap-8 rounded-[26px] border border-[#e4ecf1] bg-white p-6 transition hover:border-[#cbdfeb] lg:grid-cols-12 lg:p-8"
          >
            <div
              className="flex min-h-[240px] items-end rounded-[20px] p-6 lg:col-span-7"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 22% 20%, rgba(208,237,251,0.8), rgba(0,0,0,0) 55%), linear-gradient(#eef8fd 0%, #f7fbfd 100%)",
              }}
            >
              <span className="rounded-full bg-white/90 px-3 py-1 text-[12px] font-bold uppercase tracking-[1.2px] text-[#315b7c]">
                {FEATURED.category}
              </span>
            </div>
            <div className="flex flex-col justify-center lg:col-span-5">
              <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-[#17181c] lg:text-[30px]">
                {FEATURED.title}
              </h2>
              <p className="mt-4 text-[16px] leading-[26px] text-[#69717a]">{FEATURED.excerpt}</p>
              <div className={`mt-6 flex flex-wrap items-center gap-3 ${META}`}>
                <span className="grid size-7 place-items-center rounded-full bg-[#eef8fd] text-[11px] font-bold text-[#315b7c]">
                  AJ
                </span>
                Alexis Jarre
                <span>·</span>
                {FEATURED.readMins} min read
                <span>·</span>
                {FEATURED.date}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2563eb]">
                Read article
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-[#fcfcfb] px-5 pb-24 lg:px-[84px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-3 text-[12px] font-bold uppercase leading-[15px] tracking-[1.92px] text-[#8b8d94]">
            More articles
            <span className="text-[#b0b2b8]">{POSTS.length}</span>
          </div>

          <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                  <div
                    className="flex h-[170px] items-end rounded-[18px] p-5 transition group-hover:brightness-[0.98]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 24%, rgba(208,237,251,0.75), rgba(0,0,0,0) 60%), linear-gradient(#f3fafd 0%, #f8fbfd 100%)",
                    }}
                  >
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[1.1px] text-[#315b7c]">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[19px] font-bold leading-[1.25] tracking-[-0.015em] text-[#17181c]">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-[24px] text-[#69717a]">
                    {post.excerpt}
                  </p>
                  <div className={`mt-4 flex items-center gap-2 ${META}`}>
                    {post.readMins} min read
                    <span>·</span>
                    {post.date}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </ScaleFrame>
  );
}
