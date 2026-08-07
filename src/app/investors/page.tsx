import RedirectClient from "@/components/layout/RedirectClient";

export default function InvestorsRedirectPage() {
  return (
    <RedirectClient
      to="/resources/investors"
      title="Investors moved"
      body="The investor directory now lives at /resources/investors."
    />
  );
}
