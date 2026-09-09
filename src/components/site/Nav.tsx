import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-display text-xl font-extrabold tracking-tight text-ink ${className}`}>
      naano<span className="text-brand">.</span>
    </Link>
  );
}

export function Nav() {
  const links = [
    ["Creators", "/creators"],
    ["Marketplace", "/marketplace"],
    ["Pricing", "/#pricing"],
    ["How it works", "/#how"],
  ] as const;

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
      </div>
    </header>
  );
}
