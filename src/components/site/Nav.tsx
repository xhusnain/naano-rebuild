import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { logout } from "@/app/login/actions";
import { MobileMenu } from "./MobileMenu";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 28 18" className="h-[22px] w-[34px]" aria-hidden>
        <path d="M2 13c3.5-7 8.5-11 13-11 3.6 0 6 2.4 6 6 0 4.6-4.6 8-10.5 8-3.6 0-6.4-1.2-8.5-3z" fill="#111318" />
        <circle cx="22.5" cy="14" r="2.5" fill="#1652f0" />
      </svg>
      <span className="font-display text-[26px] font-bold leading-none tracking-[-0.03em] text-ink">
        naano
      </span>
    </Link>
  );
}

const LINKS = [
  ["For companies", "/marketplace"],
  ["For creators", "/register?role=influencer"],
  ["For agencies", "/#pricing"],
  ["How it works", "/#how"],
  ["Resources", "/#faq"],
] as const;

export async function Nav() {
  const user = await getCurrentUser();
  const home = user?.role === "creator" ? "/studio" : "/app";
  const homeLabel = user?.role === "creator" ? "Creator studio" : "Dashboard";

  return (
    <header className="relative z-50">
      <div className="mx-auto flex h-[63px] max-w-[1180px] items-center justify-between px-5">
        <Wordmark />

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-1 text-[15px] font-medium text-[#17181c] transition hover:opacity-70"
            >
              {label}
              {label === "Resources" && (
                <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* naano ships a language switcher; ours is a visible stub — the site
              is English only and i18n was deliberately cut. */}
          <span
            title="English (only language available in this rebuild)"
            className="mr-1 hidden items-center gap-1 text-[13px] font-medium text-ink/70 lg:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 2.5 15 0 18M12 3c-2.5 2.6-2.5 15 0 18" />
            </svg>
            EN
          </span>
          {user ? (
            <>
              <span className="hidden text-sm text-muted lg:inline">{user.name}</span>
              <Link
                href={home}
                className="rounded-full bg-[#17181c] px-5 py-[11px] text-[15px] font-semibold leading-none text-white transition hover:opacity-90"
              >
                {homeLabel}
              </Link>
              <form action={logout} className="hidden sm:block">
                <button className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:text-ink">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-[#e8e6e2] bg-white px-[18px] py-[10px] text-[15px] font-semibold leading-none text-[#17181c] transition hover:border-grey sm:block"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="hidden rounded-full bg-[#17181c] px-5 py-[11px] text-[15px] font-semibold leading-none text-white transition hover:opacity-90 sm:block"
              >
                Sign up
              </Link>
            </>
          )}
          <MobileMenu links={LINKS} signedIn={!!user} home={home} homeLabel={homeLabel} />
        </div>
      </div>
    </header>
  );
}
