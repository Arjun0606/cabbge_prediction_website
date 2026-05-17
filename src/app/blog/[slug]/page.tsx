import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS, findPost } from "@/lib/posts";

const SITE = "https://cabbge.com";

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE}/blog/${post.slug}` },
    authors: [{ name: post.author.name, url: post.author.url }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.keywords,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${SITE}/og-image.png`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.keywords.join(", "),
    author: { "@type": "Person", name: post.author.name, url: post.author.url },
    publisher: { "@id": `${SITE}/#org` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
  };

  const faqSchema = post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <article className="max-w-3xl mx-auto">
        <div className="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] mb-4">
          {post.category} · {post.readingMinutes} min · {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
          {post.title}
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-12 border-l-2 border-white/10 pl-5">
          {post.excerpt}
        </p>

        {post.body.map((section, i) => (
          <section key={i} className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-5">{section.heading}</h2>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-[var(--color-text-secondary)] leading-[1.75] text-[17px] mb-4">
                {p}
              </p>
            ))}
          </section>
        ))}

        {post.faqs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-white/[0.06]">
            <h2 className="text-3xl font-semibold tracking-tight mb-8">Frequently asked</h2>
            <div className="space-y-7">
              {post.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg font-semibold mb-2">{f.q}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-[1.7]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between text-sm">
          <a href="/blog" className="text-[var(--color-text-secondary)] hover:text-white transition">← All posts</a>
          <a href="/" className="text-[var(--color-text-secondary)] hover:text-white transition">Cabbge home →</a>
        </footer>
      </article>
    </main>
  );
}
