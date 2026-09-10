"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Mobile navigation. The desktop links are hidden below md, and without this
 * there was no way to navigate the site on a phone at all.
 */
export function MobileMenu({
  links,
  signedIn,
  home,
  homeLabel,
}: {
  links: readonly (readonly [string, string])[];
  signedIn: boolean;
  home: string;
  homeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  // A menu that survives navigation or an orientation change is a stuck menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-9 place-items-center rounded-full border border-line bg-white text-ink"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></>}
        </svg>
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 z-50 border-b border-line bg-white px-5 pb-6 pt-3 shadow-lg">
          <nav className="flex flex-col">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-line/70 py-3 text-[15px] font-medium text-ink"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-2">
            {signedIn ? (
              <Link
                href={home}
                onClick={() => setOpen(false)}
                className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white"
              >
                {homeLabel}
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-line px-5 py-3 text-center text-sm font-semibold text-ink"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
