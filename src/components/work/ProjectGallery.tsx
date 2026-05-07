import Image from "next/image";
import type { Gallery } from "@/lib/projects";

export default function ProjectGallery({
  gallery,
  projectName,
}: {
  gallery: Gallery;
  projectName: string;
}) {
  if (!gallery.images.length) return null;
  const isMobile = gallery.layout === "mobile";

  return (
    <section className="mx-auto max-w-4xl px-5 pb-12 pt-2">
      <p
        className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
      >
        Showcase
      </p>
      <h2
        className="mb-3 text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold uppercase leading-[1.1]"
        style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
      >
        Product Walkthrough
      </h2>
      {gallery.intro && (
        <p
          className="mb-7 max-w-[68ch] text-[14px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          {gallery.intro}
        </p>
      )}
      <div
        className={
          isMobile
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2"
            : "grid grid-cols-1 gap-8"
        }
      >
        {gallery.images.map((img) => (
          <figure
            key={img.src}
            className="m-0 overflow-hidden rounded-xl border"
            style={{
              borderColor: "var(--ys-border)",
              background: "var(--ys-surface-strong)",
            }}
          >
            <Image
              src={img.src}
              alt={`${projectName} — ${img.caption.slice(0, 110)}`}
              width={1600}
              height={isMobile ? 1067 : 900}
              loading="lazy"
              className="block w-full h-auto"
              style={{ borderBottom: "1px solid var(--ys-border)" }}
            />
            <figcaption
              className="px-5 py-4 text-[12px] italic leading-[1.65]"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--ys-text-soft)",
              }}
            >
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
