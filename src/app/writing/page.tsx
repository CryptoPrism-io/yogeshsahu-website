import RedirectClient from "@/components/layout/RedirectClient";

export default function WritingRedirectPage() {
  return (
    <RedirectClient
      to="/log"
      title="Writing is now Log"
      body="The log holds architecture notes, cost lessons, and weekly reflections — filterable by type and tag."
    />
  );
}
