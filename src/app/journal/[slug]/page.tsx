import RedirectClient from "@/components/layout/RedirectClient";

export function generateStaticParams() {
  return [
    { slug: "why-im-writing-this-weekly" },
    { slug: "what-i-got-wrong-about-my-second-startup" },
    { slug: "three-days-shipping-the-portfolio-redesign" },
  ];
}

export default async function JournalPostRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <RedirectClient
      to={`/log/${slug}`}
      title="Journal post moved"
      body="Journal posts now live under the Log, in one tagged thread."
    />
  );
}
