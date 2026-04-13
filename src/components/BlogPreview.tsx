"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/posts";

export default function BlogPreview() {
  return (
    <section id="blog" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
          <span
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d97706]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            WRITING / THINKING OUT LOUD
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2
            className="text-4xl md:text-5xl font-black text-[#111] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Practitioner{" "}
            <span
              className="text-[#d97706]"
              style={{
                fontFamily: "var(--font-serif-display)",
                fontStyle: "italic",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              perspectives.
            </span>
          </h2>
          <a
            href="/blog"
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500 hover:text-[#d97706] transition-colors"
          >
            All posts <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group border border-neutral-200 p-7 flex flex-col gap-5 hover:border-[#d97706] transition-colors duration-300 cursor-pointer"
            >
              {/* Tag + meta */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-black uppercase tracking-[0.16em] text-[#d97706] bg-amber-50 px-2.5 py-1"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {post.tag}
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3
                  className="text-base font-black text-[#111] leading-snug mb-2 group-hover:text-[#d97706] transition-colors"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {post.excerpt.substring(0, 120)}…
                </p>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 font-medium">
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#d97706] transition-colors">
                  Read <ArrowUpRight size={11} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
