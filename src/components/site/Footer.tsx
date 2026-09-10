import Link from "next/link";
import { Wordmark } from "./Nav";
import { getCurrentUser } from "@/lib/session";

export async function Footer() {
  const user = await getCurrentUser();
  const home = user?.role === "creator" ? "/studio" : "/app";
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The B2B LinkedIn creator marketplace. Book vetted creators at a fixed
              price per post and trace the pipeline back to each one.
            </p>
          </div>
          <div className="flex gap-14">
            <div>
              <div className="nn-eyebrow">Product</div>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li><Link href="/marketplace" className="hover:text-ink">Marketplace</Link></li>
                <li><Link href="/#how" className="hover:text-ink">How it works</Link></li>
                <li><Link href="/#pricing" className="hover:text-ink">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <div className="nn-eyebrow">Account</div>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {user ? (
                  <li>
                    <Link href={home} className="hover:text-ink">
                      {user.role === "creator" ? "Creator studio" : "Dashboard"}
                    </Link>
                  </li>
                ) : (
                  <>
                    <li><Link href="/login" className="hover:text-ink">Sign in</Link></li>
                    <li><Link href="/register?role=influencer" className="hover:text-ink">Join as creator</Link></li>
                    <li><Link href="/register?role=saas" className="hover:text-ink">Join as brand</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-6 text-xs text-grey">
          A 24-hour rebuild of naano.com, built as a take-home exercise. Not
          affiliated with Naano. Creators shown are invented and their avatars are
          generated.
        </div>
      </div>
    </footer>
  );
}
