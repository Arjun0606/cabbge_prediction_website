// Server-side helpers for fetching public Kalshi data. The /markets and
// /exchange/status endpoints are NOT authenticated — anyone can hit them.
// We use Next.js `fetch` with ISR (revalidate: 300 = 5 min) so the
// marketing site shows real, recent market data without hammering
// Kalshi: even under viral traffic only one request per 5min reaches
// the upstream.

const KALSHI = "https://api.elections.kalshi.com/trade-api/v2";
const REVALIDATE_SECONDS = 300;

export interface KalshiMarket {
  ticker: string;
  event_ticker?: string;
  title: string;
  subtitle?: string;
  category?: string;
  status: string;
  yes_bid: number | null;
  yes_ask: number | null;
  last_price: number | null;
  volume: number | null;
  volume_24h: number | null;
  liquidity: number | null;
  close_time: string;
  expected_expiration_time?: string;
  open_time?: string;
}

interface ListMarketsResponse {
  markets: KalshiMarket[];
  cursor?: string;
}

export interface KalshiExchangeStatus {
  ok: boolean;
  tradingActive: boolean;
}

/** Top markets sorted by 24h volume. Used by the ticker, the in-bezel
 *  Markets mockup, and the "Today on Kalshi" section. */
export async function getTopMarkets(limit = 16): Promise<KalshiMarket[]> {
  try {
    const res = await fetch(`${KALSHI}/markets?status=open&limit=200`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ListMarketsResponse;
    return (data.markets ?? [])
      .filter((m) => m.title && m.ticker)
      .sort((a, b) => (b.volume_24h ?? 0) - (a.volume_24h ?? 0))
      .slice(0, limit);
  } catch {
    return [];
  }
}

/** Exchange-up health check. Powers the live badge in the nav. */
export async function getExchangeStatus(): Promise<KalshiExchangeStatus> {
  try {
    const res = await fetch(`${KALSHI}/exchange/status`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { ok: false, tradingActive: false };
    const b = (await res.json()) as { exchange_active?: boolean; trading_active?: boolean; exchange_estopped?: boolean };
    return {
      ok: b.exchange_active !== false && b.exchange_estopped !== true,
      tradingActive: b.trading_active !== false,
    };
  } catch {
    return { ok: false, tradingActive: false };
  }
}

/** Friendly compact ticker label. Kalshi tickers are long; trim for display. */
export function displayTicker(ticker: string): string {
  // KXFOMC-25-JUN → KXFOMC-JUN, KXSCOTUS-25-JAN-08 → KXSCOTUS-JAN
  const parts = ticker.split("-");
  if (parts.length <= 2) return ticker;
  // Drop any 2-digit year part.
  const compact = parts.filter((p, i) => i === 0 || !/^\d{2}$/.test(p));
  return compact.slice(0, 2).join("-");
}

/** Best-display price in cents (1-99). Falls back through last → bid. */
export function displayPriceCents(m: KalshiMarket): number | null {
  return m.last_price ?? m.yes_bid ?? null;
}
