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
