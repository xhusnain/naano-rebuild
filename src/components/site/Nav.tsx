import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { logout } from "@/app/login/actions";
import { MobileMenu } from "./MobileMenu";

export function Wordmark({ className = "" }: { className?: string }) {
  // naano's wordmark measures 123.3 x 25.8 at 1440.
  return (
    <Link href="/" className={`flex items-center gap-[7px] ${className}`}>
      <svg viewBox="0 0 30 20" className="h-[24px] w-[34px] shrink-0" aria-hidden>
        <path
          d="M2.2 14.2C5.6 6.4 11.2 2 16.4 2c4.1 0 6.9 2.7 6.9 6.7 0 5.2-5.2 9-11.8 9-4.1 0-7.2-1.3-9.3-3.5z"
          fill="#17181c"
        />
        <circle cx="24.6" cy="15.4" r="2.9" fill="#1652f0" />
      </svg>
      <span className="font-display text-[29px] font-bold leading-none tracking-[-0.035em] text-[#17181c]">
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

/**
 * Site header, measured against naano's at 1440:
 *   48px page gutters, 63px tall, fully transparent over the hero photo
 *   wordmark 123x26 on the left
 *   the link row and the actions form ONE right-hand group — the links are not
 *   centred on the page, they sit 53px left of the language switcher
 *   link gaps 27.5px · EN->Sign in 17px · Sign in->Sign up 9px
 */
export async function Nav() {
  const user = await getCurrentUser();
  const home = user?.role === "creator" ? "/studio" : "/app";
  const homeLabel = user?.role === "creator" ? "Creator studio" : "Dashboard";

  return (
    <header className="relative z-50">
      <div className="mx-auto flex h-[63px] w-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <Wordmark />

        <div className="flex items-center gap-[53px]">
          <nav className="hidden items-center gap-[27.5px] lg:flex">
            {LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-1 whitespace-nowrap text-[15px] font-medium leading-none text-[#17181c] transition hover:opacity-70"
              >
                {label}
                {label === "Resources" && (
                  <svg viewBox="0 0 24 24" className="mt-px size-[13px]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-[17px]">
            <span
              title="English — this rebuild is English only"
              className="hidden items-center gap-1 text-[15px] font-medium leading-none text-[#17181c] md:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 2.5 15 0 18M12 3c-2.5 2.6-2.5 15 0 18" />
              </svg>
              EN
            </span>

            {user ? (
              <div className="flex items-center gap-[9px]">
                <Link
                  href={home}
                  className="rounded-full bg-[#17181c] px-[15px] py-[10px] text-[15px] font-semibold leading-none tracking-[-0.01em] text-white transition hover:opacity-90"
                >
                  {homeLabel}
                </Link>
                <form action={logout} className="hidden sm:block">
                  <button className="px-1 text-[15px] font-medium text-[#787774] transition hover:text-[#17181c]">
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              <div className="hidden items-center gap-[9px] sm:flex">
                <Link
                  href="/login"
                  className="rounded-full border border-[#e8e6e2] bg-white px-[14px] py-[9px] text-[15px] font-semibold leading-none tracking-[-0.01em] text-[#17181c] transition hover:border-[#d5d3ce]"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[#17181c] px-[15px] py-[10px] text-[15px] font-semibold leading-none tracking-[-0.01em] text-white transition hover:opacity-90"
                >
                  Sign up
                </Link>
              </div>
            )}

            <MobileMenu links={LINKS} signedIn={!!user} home={home} homeLabel={homeLabel} />
          </div>
        </div>
      </div>
    </header>
  );
}
