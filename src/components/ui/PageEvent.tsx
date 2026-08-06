"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires a Plausible event once on mount. Use inside server components to
 * track "page-level" engagement without making the page a client component.
 */
export default function PageEvent({
  event,
  props,
}: {
  event: Parameters<typeof trackEvent>[0];
  props?: Record<string, string | number | boolean>;
}) {
  useEffect(() => {
    // small delay so the pageview lands first
    const t = setTimeout(() => trackEvent(event, props), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
