import RedirectClient from "@/components/layout/RedirectClient";

export default function InvestorsRedirectPage() {
  return (
    <RedirectClient
      to="/resources"
      title="Investors moved"
      body="The investor directory now lives inside Resources — the first tab of the founder hub."
    />
  );
}
