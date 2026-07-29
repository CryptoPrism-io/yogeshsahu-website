export const BRAND_SVG_MAP: Record<string, string> = {
  Python: "python",
  React: "react",
  TypeScript: "typescript",
  Firebase: "firebase",
  LangChain: "langchain",
  FastAPI: "fastapi",
  BigQuery: "google-bigquery",
  "Binance API": "binance",
  Binance: "binance",
  Unity: "unity",
  Flutter: "flutter",
  "Unreal Engine": "unreal-engine",
  PostgreSQL: "postgresql",
  Redis: "redis",
  Docker: "docker",
  GitHub: "github",
  "GitHub Actions": "github",
  TailwindCSS: "tailwindcss",
  "Tailwind CSS": "tailwindcss",
  Nextjs: "nextjs",
  "Next.js": "nextjs",
  Nodejs: "nodejs",
  "Node.js": "nodejs",
  OpenAI: "openai",
};

export function BrandSvg({
  slug,
  alt,
  className,
}: {
  slug: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/default.svg`}
      alt={alt}
      className={className ?? "h-2.5 w-2.5 object-contain"}
    />
  );
}
