// Server Component. Fetches public Kalshi market data + exchange status
// at request time (cached via Next.js ISR — see lib/kalshi.ts revalidate
// values) and renders the client-side <LandingClient/> with everything
// it needs. The fetch happens server-side so the marketing site stays
// fully static-renderable + SEO-friendly while the in-bezel mockup,
// ticker, and "Today on Kalshi" grid all show real Kalshi data.

import LandingClient from "./LandingClient";
import { getTopMarkets, getExchangeStatus } from "@/lib/kalshi";

export default async function Page() {
  const [markets, exchangeStatus] = await Promise.all([
    getTopMarkets(16),
    getExchangeStatus(),
  ]);

  return <LandingClient markets={markets} exchangeStatus={exchangeStatus} />;
}
