import { randomBytes } from "node:crypto";

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789"; // no look-alikes: l, o, 0, 1

/**
 * Short code behind /r/<code>. One per deal — this is what makes clicks
 * attributable to an individual creator rather than to the campaign as a whole.
 */
export function makeTrackingCode(len = 7): string {
  const bytes = randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

/**
 * Should this request be recorded as a click?
 *
 * Prefetchers and link unfurlers are not humans. Counting them inflates exactly
 * the number the brand pays against, so they are redirected but not recorded.
 * Kept as a pure function of the headers so it can be tested without a request.
 */
export function isNonHumanRequest(h: {
  purpose?: string | null;
  xPurpose?: string | null;
  secPurpose?: string | null;
  userAgent?: string | null;
}): boolean {
  const purpose = (h.purpose ?? h.xPurpose ?? "").toLowerCase();
  if (purpose === "prefetch" || purpose === "preview") return true;
  if ((h.secPurpose ?? "").toLowerCase().includes("prefetch")) return true;
  return /bot|crawler|spider|preview|slurp|facebookexternalhit|linkedinbot|headless/i.test(
    h.userAgent ?? ""
  );
}
