"use client";

import { type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Client wrapper that fires a Plausible event when clicked.
 * Use inside server components (e.g. project detail) to track interactions
 * without making the whole page a client component.
 */
export default function TrackClick({
  event,
  props,
  children,
  className,
}: {
  event: Parameters<typeof trackEvent>[0];
  props?: Record<string, string | number | boolean>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className}
      onClick={() => trackEvent(event, props)}
      style={{ display: "contents", cursor: "pointer" }}
    >
      {children}
    </span>
  );
}
