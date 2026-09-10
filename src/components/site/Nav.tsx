import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { logout } from "@/app/login/actions";
import { MobileMenu } from "./MobileMenu";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 28 18" className="h-4 w-6" aria-hidden>
        <path d="M2 13c3.5-7 8.5-11 13-11 3.6 0 6 2.4 6 6 0 4.6-4.6 8-10.5 8-3.6 0-6.4-1.2-8.5-3z" fill="#111318" />
        <circle cx="22.5" cy="14" r="2.5" fill="#1652f0" />
      </svg>
      <span className="font-display text-[22px] font-extrabold tracking-tight text-ink">
        naano
      </span>
    </Link>
  );
}

const LINKS = [
  ["For companies", "/marketplace"],
  ["For creators", "/register?role=influencer"],
  ["How it works", "/#how"],
  ["Pricing", "/#pricing"],
] as const;

export async function Nav() {
  const user = await getCurrentUser();
  const home = user?.role === "creator" ? "/studio" : "/app";
  const homeLabel = user?.role === "creator" ? "Creator studio" : "Dashboard";

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5">
        <Wordmark />

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-[14px] font-medium text-ink/80 transition hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-muted lg:inline">{user.name}</span>
              <Link
                href={home}
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-900"
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
                className="hidden rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:border-grey sm:block"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-900 sm:block"
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
