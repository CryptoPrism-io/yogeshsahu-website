"use client";

type EventName =
  | "diagnostic_click"
  | "project_open"
  | "dock_open"
  | "contact_click"
  | "nav_click"
  | "journal_read"
  | "cv_download";

/**
 * Fire a custom Plausible event. Safe no-op when the tracker isn't loaded
 * (e.g. SSR, ad-blocked, or analytics disabled).
 */
export function trackEvent(name: EventName, props?: Record<string, string | number | boolean>) {
  try {
    const plausible = (window as unknown as { plausible?: (n: string, o?: object) => void }).plausible;
    if (typeof plausible === "function") {
      plausible(name, props ? { props } : undefined);
    }
  } catch {
    /* noop — tracking must never break the UI */
  }
}
