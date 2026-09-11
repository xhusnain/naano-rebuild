"use client";

import { useEffect, useRef } from "react";

export const DESIGN_WIDTH = 1672;

/**
 * naano's landing page is authored at a fixed 1672px and scaled to the
 * viewport with CSS zoom — at 1440 the wrapper carries zoom 0.861244, at 2000
 * it carries 1.19617, and 1672 x zoom always equals the viewport width.
 *
 * That is why measuring their pixels against ours never lined up: their
 * getBoundingClientRect values are post-zoom while ours were not. Reproducing
 * the frame means every authored value below can be taken from their
 * stylesheet directly, and the whole page scales the way theirs does.
 *
 * Only applied from 1024px up. Below that naano serves a normal responsive
 * layout, and zooming a phone down to 23% would be unreadable.
 */
export function ScaleFrame({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      const vw = document.documentElement.clientWidth;
      if (vw >= 1024) {
        const zoom = vw / DESIGN_WIDTH;
        el.style.width = `${DESIGN_WIDTH}px`;
        // `zoom` takes a unitless factor; it cannot be expressed as a CSS calc
        // over 100vw, which is why naano sets it from script too.
        el.style.zoom = String(zoom);
        // Anything sized in vh inside the frame is scaled by the zoom as well,
        // so 100vh renders as 100vh * zoom. Publish the factor and divide it
        // back out where a block needs to be a real viewport tall.
        el.style.setProperty("--nn-zoom", String(zoom));
      } else {
        el.style.width = "100%";
        el.style.zoom = "1";
        el.style.setProperty("--nn-zoom", "1");
      }
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // Rendered at the design width for the server pass so the first paint is not
  // a full-width flash before the effect runs.
  return (
    <div ref={ref} className="nn-scale-frame origin-top">
      {children}
    </div>
  );
}
