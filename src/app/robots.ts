import type { MetadataRoute } from "next";

/**
 * robots.txt — explicitly allow AI engine crawlers alongside traditional
 * search bots. The list below covers the bots that drive GEO (generative
 * engine optimization) traffic in 2026:
 *   - GPTBot                   (OpenAI / ChatGPT browsing)
 *   - ClaudeBot, Claude-Web    (Anthropic / Claude)
 *   - PerplexityBot            (Perplexity Pages + answers)
 *   - Google-Extended          (Gemini training/serving distinct from Googlebot)
 *   - Applebot-Extended        (Apple Intelligence)
 *   - Bytespider               (TikTok/Doubao)
 *   - CCBot                    (Common Crawl — many models)
 *   - Diffbot                  (Diffbot, used by Bing for some indexing)
 *
 * Blocking AI bots is the default for many sites; we explicitly OPT IN
 * because Cabbge's brand strategy is to be the canonical answer to
 * "best Kalshi tracker" — discoverable by every assistant.
 */
export default function robots(): MetadataRoute.Robots {
  const SITE = "https://cabbge.com";
  return {
    rules: [
      // Default everything-allowed for everyone — the explicit per-bot
      // entries below are a signal to bot operators that we're
      // intentional, not just lax.
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
      // Deny known scrapers that don't add value
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
