"use client";

import ResourcesView from "@/components/resources/ResourcesView";

export default function ResourcesWindow() {
  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-6" style={{ background: "var(--ys-surface)", color: "var(--ys-text)" }}>
      <ResourcesView />
    </div>
  );
}
