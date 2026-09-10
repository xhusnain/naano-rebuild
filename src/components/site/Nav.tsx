import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { logout } from "@/app/login/actions";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-display text-xl font-extrabold tracking-tight text-ink ${className}`}
    >
      naano<span className="text-brand">.</span>
    </Link>
  );
}

/**
 * Public site header.
 *
 * Reads the session, so a signed-in visitor is not told to "Sign in" on the
 * page they landed on after signing in. Reading cookies makes the pages that
 * use this header render per-request rather than prerender — the right trade:
 * showing a logged-in user the wrong controls is a worse defect than losing
 * static generation on three routes.
 */
export async function Nav() {
  const user = await getCurrentUser();

  const links = [
    ["Creators", "/creators"],
    ["Marketplace", "/marketplace"],
    ["Pricing", "/#pricing"],
    ["How it works", "/#how"],
  ] as const;

  const home = user?.role === "creator" ? "/studio" : "/app";

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Wordmark />
          <nav className="hidden items-center gap-6 md:flex">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-muted transition hover:text-ink"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">
              {user.name}
            </span>
            <Link
              href={home}
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
            >
              {user.role === "creator" ? "Creator studio" : "Dashboard"}
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
