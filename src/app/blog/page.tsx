import type { Metadata } from "next";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes from Cabbge — Kalshi workflow, tax season, and the iOS engineering that makes lock-screen visibility feel native.",
  alternates: { canonical: "https://cabbge.com/blog" },
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-tertiary)] mb-5">
          Field notes
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
          From the desk.
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-16 leading-relaxed">
          Notes on Kalshi workflow, prediction-market internals, tax-season
          tooling, and the engineering choices behind Cabbge.
        </p>
        <ul className="divide-y divide-white/[0.06]">
          {POSTS.map((p) => (
            <li key={p.slug} className="py-7 first:pt-0">
              <a href={`/blog/${p.slug}`} className="group block">
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] mb-2">
                  {p.category} · {p.readingMinutes} min · {new Date(p.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold leading-tight mb-3 group-hover:text-[var(--color-cabbge-accent)] transition">
                  {p.title}
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{p.excerpt}</p>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <a href="/" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition">← Back to home</a>
        </div>
      </div>
    </main>
  );
}
