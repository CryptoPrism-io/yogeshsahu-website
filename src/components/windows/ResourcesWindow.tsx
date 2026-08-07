"use client";

import ResourcesHubCards from "@/components/resources/ResourcesHubCards";

/**
 * Dock window — condensed discovery surface for the resource hub.
 * Clicking a resource navigates to its real URL.
 */
export default function ResourcesWindow() {
  return (
    <div
      className="h-full w-full overflow-y-auto p-4 md:p-6"
      style={{ background: "var(--ys-surface)", color: "var(--ys-text)" }}
    >
      <ResourcesHubCards />
    </div>
  );
}
