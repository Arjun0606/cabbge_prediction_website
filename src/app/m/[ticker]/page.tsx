// Per-market SEO page. One URL per Kalshi market ticker.
//
// Goal: rank for the natural "will X happen by Y" Google searches a market
// answers. The page shows live odds + a sparkline + countdown, and CTAs
// into Cabbge for tracking. ISR'd at 5 min — sharp enough for crawlers,
// cheap enough to scale to every market.
//
// Strategy:
//   - title  = the market's natural-language question (Kalshi already writes
//              these in question form, e.g. "Will Fed cut rates by 25bp in
//              December?")
//   - desc   = "Live odds: 47¢ YES (47% implied). Resolves Dec 18, 2026."
//   - JSON-LD ClaimReview + Question schema for the SERP
//   - canonical: cabbge.com/m/{ticker}
//   - opengraph: title + desc + first-look at the live price

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarket, getCandles, displayPriceCents, type KalshiCandle } from "@/lib/kalshi";

const SITE = "https://cabbge.com";

export const revalidate = 300; // 5 minutes — see kalshi.ts

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  const market = await getMarket(ticker);
  if (!market) return { title: "Market not found · Cabbge" };

  const cents = displayPriceCents(market);
  const oddsText = cents != null ? `${cents}¢ YES (${cents}% implied)` : "No live price";
  const resolvesText = market.expected_expiration_time
    ? new Date(market.expected_expiration_time).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  const description = resolvesText
    ? `Live odds: ${oddsText}. Resolves ${resolvesText}. Track this Kalshi market on Cabbge.`
    : `Live odds: ${oddsText}. Track this Kalshi market on Cabbge.`;

  return {
    title: `${market.title} · Cabbge`,
    description,
    alternates: { canonical: `${SITE}/m/${ticker}` },
    openGraph: {
      type: "website",
      title: market.title,
      description,
      url: `${SITE}/m/${ticker}`,
    },
    twitter: { card: "summary", title: market.title, description },
  };
}

export default async function MarketPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const [market, candles] = await Promise.all([
    getMarket(ticker),
    getCandles(ticker, { period: "1h" }),
  ]);
  if (!market) notFound();

  const cents = displayPriceCents(market);
  const yesProb = cents != null ? cents / 100 : null;
  const noCents = cents != null ? 100 - cents : null;
  const resolution = market.expected_expiration_time ?? market.close_time;
  const resolvesAt = resolution ? new Date(resolution) : null;
  const resolvesLabel = resolvesAt?.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  const timeLeft = resolvesAt ? humanizeRemaining(resolvesAt) : null;
  const volume = market.volume_24h ?? 0;

  // JSON-LD: the SERP loves Question schema for "will X happen by Y" queries.
  const questionSchema = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: market.title,
    text: market.title,
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: cents != null
        ? `Market currently prices YES at ${cents}¢ (${cents}% implied probability). Resolves ${resolvesLabel ?? "TBD"}.`
        : `Market has no live price right now. Resolves ${resolvesLabel ?? "TBD"}.`,
      url: `${SITE}/m/${ticker}`,
    },
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(questionSchema) }}
      />

      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <Link href="/" className="text-xs font-mono uppercase tracking-widest text-text-tertiary hover:text-text-secondary">
          ← cabbge
        </Link>

        <header className="mt-10 space-y-3">
          {market.category && (
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-cabbge">
              {market.category}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            {market.title}
          </h1>
          {market.subtitle && (
            <p className="text-base text-text-secondary">{market.subtitle}</p>
          )}
        </header>

        <section className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
          <Tile
            label="YES"
            value={cents != null ? `${cents}¢` : "—"}
            sub={yesProb != null ? `${Math.round(yesProb * 100)}% implied` : "no live quote"}
            tone="up"
          />
          <Tile
            label="NO"
            value={noCents != null ? `${noCents}¢` : "—"}
            sub={noCents != null ? `${noCents}% implied` : "no live quote"}
            tone="down"
          />
        </section>

        {candles.length > 0 && (
          <section className="mt-8">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
              7-day price history
            </div>
            <Sparkline candles={candles} />
          </section>
        )}

        <section className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          {resolvesLabel && (
            <Tile label="Resolves" value={timeLeft ?? "soon"} sub={resolvesLabel} />
          )}
          <Tile
            label="24h volume"
            value={formatVolume(volume)}
            sub={market.liquidity ? `${formatVolume(market.liquidity)} liquidity` : "live on Kalshi"}
          />
        </section>

        <section className="mt-12 rounded-2xl border border-border-primary bg-bg-secondary p-6">
          <div className="text-sm text-text-secondary">
            Cabbge tracks this market in real time. Set price alerts, watch
            it on your lock screen, and see your P&L if you take a position
            on Kalshi.
          </div>
          <a
            href="https://apps.apple.com/app/cabbge"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-semibold text-bg-primary"
          >
            Track this in Cabbge
            <span aria-hidden>→</span>
          </a>
        </section>

        <footer className="mt-12 text-xs text-text-tertiary">
          Cabbge is an independent portfolio tracker. Market data from
          Kalshi&apos;s public API. Not affiliated with Kalshi.{" "}
          <Link href="/privacy" className="underline">Privacy</Link> ·{" "}
          <Link href="/terms" className="underline">Terms</Link>
        </footer>
      </div>
    </div>
  );
}

// ─── Components ──────────────────────────────────────────────────────────

function Tile({
  label, value, sub, tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "up" | "down";
}) {
  const toneClass = tone === "up" ? "text-semantic-up" : tone === "down" ? "text-semantic-down" : "text-text-primary";
  return (
    <div className="rounded-xl border border-border-primary bg-bg-secondary p-4">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-tertiary">{label}</div>
      <div className={`mt-1 font-mono text-3xl font-semibold ${toneClass}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-text-tertiary">{sub}</div>}
    </div>
  );
}

/// Server-side SVG line chart. No JS, paints with the first byte, great
/// for SEO. Future: progressively enhance with a client lib for tap-to-
/// inspect. For now, static is enough.
function Sparkline({ candles }: { candles: KalshiCandle[] }) {
  const points = candles
    .map((c) => c.price?.close)
    .filter((v): v is number => typeof v === "number");
  if (points.length < 2) return null;

  const w = 600;
  const h = 120;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(1, max - min);
  const pad = 4;

  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - pad * 2));
  const ys = points.map((p) => h - pad - ((p - min) / span) * (h - pad * 2));
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");

  const last = points[points.length - 1];
  const first = points[0];
  const rising = last >= first;
  const stroke = rising ? "#42d68a" : "#ff6b6b";

  return (
    <div className="rounded-xl border border-border-primary bg-bg-secondary p-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L${xs[xs.length - 1]},${h} L${xs[0]},${h} Z`} fill="url(#fill)" />
        <path d={d} fill="none" stroke={stroke} strokeWidth="2" />
      </svg>
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────

function humanizeRemaining(when: Date): string {
  const ms = when.getTime() - Date.now();
  if (ms <= 0) return "today";
  const hours = Math.round(ms / 3_600_000);
  if (hours < 1) return "<1h";
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo`;
  return `${Math.round(months / 12)}y`;
}

function formatVolume(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}
