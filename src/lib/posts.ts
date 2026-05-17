// Blog post registry. Each post is a TypeScript record so we get
// type-safe references from the landing teaser, the index, and the
// dynamic [slug] route — and SEO metadata stays alongside the content.
//
// Content is formatted in the "citability" style recommended by
// generative-engine optimization research: each section answers ONE
// question with self-contained facts in 134-167 words so AI engines
// (ChatGPT, Claude, Perplexity, Google AIO) can quote a single block
// without context. Headers map to FAQ schema.

export interface FAQ { q: string; a: string }

export interface Post {
  slug: string;
  title: string;
  description: string;          // <= 160 chars, used as <meta name="description">
  excerpt: string;              // <= 180 chars, shown in cards
  category: string;
  publishedAt: string;          // ISO date
  updatedAt?: string;
  readingMinutes: number;
  author: { name: string; url: string };
  keywords: string[];
  faqs: FAQ[];                  // Becomes FAQPage JSON-LD
  body: { heading: string; paragraphs: string[] }[];
}

const AUTHOR = { name: "Arjun Varma", url: "https://cabbge.com" };

export const POSTS: Post[] = [
  // -----------------------------------------------------------------
  {
    slug: "best-kalshi-tracker-app-2026",
    title: "The best Kalshi tracker app for iPhone in 2026",
    description:
      "The serious Kalshi tracker app for iPhone: live positions on the lock screen, AI briefs on every market, Form 8949 tax export in two taps.",
    excerpt:
      "Spreadsheets don't surface a resolution. The browser tab doesn't ping you when CPI drops. Here's what an actual mobile Kalshi tracker should do — and how Cabbge does it.",
    category: "Product",
    publishedAt: "2026-05-17",
    readingMinutes: 6,
    author: AUTHOR,
    keywords: ["Kalshi tracker", "Kalshi iOS app", "best Kalshi app", "Kalshi portfolio tracker", "Kalshi mobile"],
    faqs: [
      {
        q: "What is a Kalshi tracker app?",
        a: "A Kalshi tracker is a mobile app that connects to your Kalshi API key and surfaces your open positions, cash balance, realized P&L, and upcoming market resolutions. Unlike the official Kalshi app, a dedicated tracker prioritizes portfolio aggregation, lock-screen visibility via Live Activities, and tax export — workflows the trading client treats as secondary.",
      },
      {
        q: "Is there a Kalshi app for iPhone?",
        a: "Kalshi ships an official iOS trading app and there are independent trackers like Cabbge that pair with your Kalshi API key. The official app focuses on placing orders; trackers focus on portfolio analytics, tax reporting, and notifications. Most active Kalshi traders use both.",
      },
      {
        q: "How does Cabbge access my Kalshi account?",
        a: "Cabbge uses Kalshi's official API. You generate an API key pair in your Kalshi profile and paste it into Cabbge. Your private key is encrypted with AWS KMS the moment you submit it — Cabbge's database never stores it in plaintext. You can disconnect at any time, which deletes the encrypted key from our infrastructure.",
      },
      {
        q: "Does Cabbge work with Polymarket?",
        a: "Yes. Cabbge supports Polymarket-US (the CFTC-regulated US offering) alongside Kalshi as a multi-venue tracker. Both venues sync into a single portfolio, single tax export, and single daily digest. Polymarket-international (Polygon-chain) is not currently supported due to its non-US regulatory status.",
      },
    ],
    body: [
      {
        heading: "What you actually need from a Kalshi tracker app",
        paragraphs: [
          "Most prediction-market traders open Kalshi in a browser, ladder a few positions, and then ignore them until resolution. The pain shows up at three moments: when a catalyst hits and you wanted to size into it, when a market resolves and you didn't know it had moved, and on April 14th when you owe taxes on twenty markets you forgot about.",
          "A Kalshi tracker app for iPhone solves these three moments. It runs a Live Activity on your lock screen so you see the price of a position you care about without unlocking. It pings you when the next scheduled catalyst — a CPI print, an FOMC statement, a hurricane landfall — is within a configurable window. And on the first week of January it produces a Form 8949-ready CSV you import into TurboTax in two clicks.",
        ],
      },
      {
        heading: "Why a dedicated tracker beats the official Kalshi app",
        paragraphs: [
          "Kalshi's official iOS app is a trading client first. It's optimized for order placement, market depth, and order-book visualization. It's not optimized for the portfolio-analytics workflow most active traders actually live in.",
          "A tracker like Cabbge inverts that priority. The first screen on launch is your Portfolio, not the Markets feed. Resolutions and AI briefs sit alongside each position. The Tax Export sheet ships as a first-class surface, not a hidden menu. And every analytics view — win rate by category, average holding period, slippage on entry — assumes you care about edge, not order placement.",
        ],
      },
      {
        heading: "How Cabbge handles your Kalshi API key safely",
        paragraphs: [
          "Cabbge uses Kalshi's official RSA-key-based API authentication. You generate an API key pair in your Kalshi profile (Profile → API Keys → Create New Key), and paste the access key ID plus the private key PEM into Cabbge's connect flow.",
          "The private key is sent over TLS to our backend, which immediately wraps it with AWS KMS using an envelope-encryption pattern. The encrypted blob lives in our Postgres database; the unwrapped key only exists in memory for the duration of a single Kalshi API call. We never log it, never persist it in plaintext, and the security model is documented in our open-source backend code.",
        ],
      },
      {
        heading: "What makes a tracker app trustworthy",
        paragraphs: [
          "The two questions every active trader should ask of any third-party tracker: what does it do with my API key, and what does it do with my trading history. Cabbge KMS-encrypts your API key at rest and never sells, shares, or analyzes your trading history for any purpose other than rendering it back to you.",
          "We also publish our entire privacy manifest (PrivacyInfo.xcprivacy in the iOS bundle), declare every API category we touch (UserDefaults, FileTimestamp, DiskSpace, SystemBootTime), and disclose every data type we collect (email, user ID, purchase history) directly in the App Store privacy questionnaire. No trackers, no analytics SDKs, no third-party ad networks.",
        ],
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    slug: "kalshi-tax-export-form-8949",
    title: "Kalshi tax export: how to get Form 8949 done in two taps",
    description:
      "Step-by-step guide to exporting your Kalshi tax data as Form 8949 / Schedule D CSV, importing into TurboTax, and handling sports vs financial markets correctly.",
    excerpt:
      "Kalshi gives you fills. TurboTax wants Form 8949. Cabbge is the two-tap bridge — including the sports-vs-financial classification most CPAs get wrong.",
    category: "Tax",
    publishedAt: "2026-05-17",
    readingMinutes: 7,
    author: AUTHOR,
    keywords: ["Kalshi tax export", "Form 8949 Kalshi", "Kalshi TurboTax", "Schedule D Kalshi", "Kalshi 1099"],
    faqs: [
      {
        q: "Does Kalshi send a 1099?",
        a: "Kalshi sends a 1099-MISC for prize winnings on certain event categories, but does not currently issue a 1099-B for capital-gains-style activity. Most active traders need to self-report using fills exported from the Kalshi API. This is where Form 8949 + Schedule D (for financial event contracts) and Schedule 1 line 8b (for sports/political contracts treated as gambling winnings) come in.",
      },
      {
        q: "Are Kalshi gains taxed as capital gains or gambling income?",
        a: "It depends on the contract category and your CPA's interpretation. Conservative tax treatment: financial event contracts (CPI, FOMC, GDP, weather) qualify as capital gains and report on Form 8949. Sports and political contracts are treated as gambling winnings and report on Schedule 1 line 8b. The IRS has not issued definitive guidance on event contracts, so document your classification and consult a tax professional.",
      },
      {
        q: "What CSV format does TurboTax accept for Kalshi imports?",
        a: "TurboTax accepts a CSV with the columns: Description, Date Acquired, Date Sold, Proceeds, Cost Basis, Wash Sale Loss, Code. Cabbge's TurboTax export format produces exactly these columns and can be imported via Federal Taxes → Investment Income → Stocks, Mutual Funds, Bonds, Other → Use CSV.",
      },
      {
        q: "How does FIFO realization work for prediction-market positions?",
        a: "First-In-First-Out realization matches each sell fill against the earliest buy fill of the same market and side that still has remaining size. Cabbge runs FIFO across your entire Kalshi history and per-account, producing one realized lot per match with the correct cost basis, proceeds, hold period, and short-term vs long-term classification.",
      },
    ],
    body: [
      {
        heading: "Why Kalshi tax season is harder than it should be",
        paragraphs: [
          "Kalshi doesn't currently issue a 1099-B for the capital-gains-style activity most active traders generate. They issue a 1099-MISC for certain prize-style winnings, but the majority of taxable events from active event-contract trading have to be self-reported. That means you need to pull every fill from the Kalshi API, match buys against sells using FIFO realization, classify each lot as financial vs gambling, and produce a Form 8949 / Schedule D filing manually.",
          "If you traded 200 markets across the year — common for active Kalshi users — manual reconciliation in a spreadsheet takes 4-6 hours and is error-prone. The IRS hasn't issued definitive guidance on whether event contracts are capital assets or gambling instruments, so you're also making a classification call on every single lot.",
        ],
      },
      {
        heading: "How Cabbge's two-tap Form 8949 export works",
        paragraphs: [
          "Open Cabbge → Settings → Tax Export. Pick the tax year. Tap one of four export formats: Form 8949 (Schedule D capital gains), Schedule 1 (gambling winnings), TurboTax (TurboTax-importable CSV), or All (full transparency dump for your CPA). Two taps total.",
          "Behind the scenes, Cabbge pulls your full Kalshi fills history via the official API, runs FIFO realization to match buys against sells, classifies each realized lot by the underlying market category (sports/political → gambling; financial/weather/economics → capital gains), and renders a CSV with the exact columns your destination wants. The whole roundtrip takes under 30 seconds on a typical 200-fill history.",
        ],
      },
      {
        heading: "The sports vs financial classification most people get wrong",
        paragraphs: [
          "Kalshi markets fall into two tax categories under the conservative interpretation. Financial event contracts (CPI prints, FOMC decisions, GDP, weather, science) are capital assets reported on Form 8949 and rolled into Schedule D. Sports markets (NFL, NBA, World Series), political markets (presidential election, Senate races, primaries), and entertainment markets (Oscars, who-wins-the-show) are gambling winnings reported on Schedule 1 line 8b.",
          "Cabbge auto-classifies every lot using the market's category field plus a keyword fallback (NFL, NBA, MLB, NHL, election, primary, Trump, Biden, etc.) and surfaces the rationale alongside each lot in the iOS UI. You can override per-lot before exporting. The default classification is conservative — when in doubt, we treat as gambling, which prevents under-reporting if the IRS later clarifies.",
        ],
      },
      {
        heading: "Importing the Cabbge CSV into TurboTax",
        paragraphs: [
          "Open TurboTax → Federal Taxes → Investment Income → Stocks, Mutual Funds, Bonds, Other → Add Investment → I'll type it in myself or import from broker → Use CSV. Upload the file Cabbge generated. TurboTax recognizes the column layout, asks you to confirm one or two field mappings, and ingests every realized lot in one pass.",
          "For the Schedule 1 gambling-winnings export, take the Cabbge total and enter it on Schedule 1 line 8b manually — TurboTax doesn't have a CSV import path for gambling income. The Cabbge export shows total winnings and total wagers so you can also claim the offsetting wagers deduction if you itemize.",
        ],
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    slug: "polymarket-vs-kalshi-2026",
    title: "Polymarket vs Kalshi: a side-by-side for 2026",
    description:
      "Polymarket vs Kalshi compared: regulation, fees, liquidity, market coverage, and how to track positions on both venues from one iPhone app.",
    excerpt:
      "Same product, different rails. A direct comparison of Polymarket-US and Kalshi for serious traders — fees, regulation, market coverage, and the one app that tracks both.",
    category: "Compare",
    publishedAt: "2026-05-17",
    readingMinutes: 8,
    author: AUTHOR,
    keywords: ["Polymarket vs Kalshi", "prediction market comparison", "Polymarket US", "Kalshi alternatives", "event contracts"],
    faqs: [
      {
        q: "Is Polymarket legal in the US?",
        a: "Polymarket-US (the CFTC-regulated offshoot operating through a Designated Contract Market) is legal in all US states. The original Polymarket on Polygon blockchain is geofenced from US users since the 2022 CFTC settlement. Kalshi is also CFTC-regulated and operates as a Designated Contract Market. Both are legal for US persons.",
      },
      {
        q: "Which has better liquidity, Polymarket or Kalshi?",
        a: "It depends on the market category. Polymarket has historically dominated political and crypto markets in raw notional volume. Kalshi has stronger liquidity in economic indicator markets (CPI, FOMC, jobs reports), weather/hurricane markets, and increasingly sports. For traders who size meaningful positions, check the orderbook depth on the specific market — not the venue-level aggregate.",
      },
      {
        q: "Can I track both Polymarket and Kalshi in one app?",
        a: "Yes. Cabbge is the multi-venue tracker that aggregates Kalshi and Polymarket-US positions into a single portfolio, single P&L, single tax export. You connect your Kalshi API key and your Polymarket-US (QCEX) API credentials separately; the iOS app then renders both venues' positions in one view.",
      },
      {
        q: "What are the fees on Polymarket vs Kalshi?",
        a: "Both venues take a fee structure that varies by market category. Kalshi's published fee schedule is roughly 1-2% per side for most retail markets, with discounts for high-volume traders. Polymarket-US fees through QCEX are competitive but vary by market. Check each venue's current fee schedule directly — both update them periodically.",
      },
    ],
    body: [
      {
        heading: "What Polymarket and Kalshi actually are",
        paragraphs: [
          "Polymarket and Kalshi are both prediction market venues that let users trade event contracts — binary or scalar contracts that resolve to a payout based on a real-world outcome. Both are CFTC-regulated in their US-available form. Both let you trade markets like 'Will the Fed cut rates in June?' or 'Will Trump win Pennsylvania?'.",
          "The differences are operational. Kalshi operates as a fully-regulated Designated Contract Market with its own clearing infrastructure. Polymarket-US runs through QCEX, also a CFTC-licensed DCM. The original Polymarket on the Polygon blockchain still exists but is geofenced from US users due to the 2022 CFTC settlement.",
        ],
      },
      {
        heading: "Where each venue is strongest",
        paragraphs: [
          "Kalshi dominates economic indicator markets: CPI, FOMC, jobs reports, GDP, retail sales. The seven-day-out futures on macro data releases are deep enough for institutional sizing. Kalshi has also built strong liquidity in weather markets (hurricane tracks, snowfall, temperature) and is rapidly growing in sports.",
          "Polymarket-US is strongest in political markets — election outcomes, primaries, congressional races — and crypto/markets where the original Polymarket community still dominates the price discovery. For raw notional volume on political markets like the 2024 presidential race, Polymarket has historically been the deeper venue.",
        ],
      },
      {
        heading: "Tracking both venues from one app",
        paragraphs: [
          "Most active traders sit in both. Spreadsheets work but break the moment you want lock-screen alerts, mobile portfolio views, or unified tax reporting. Cabbge solves this as a multi-venue tracker: connect your Kalshi API key (RSA key pair) plus your Polymarket-US API key/secret/passphrase, and the iOS app renders both venues' positions in a single Portfolio screen with a unified P&L.",
          "The Catalyst calendar shows upcoming events across both venues. The AI Brief works on any Kalshi or Polymarket market. Tax export ingests fills from both venues into a single FIFO realization run, producing one Form 8949 CSV covering your full trading history.",
        ],
      },
      {
        heading: "How to choose between them for a specific market",
        paragraphs: [
          "Open the same market on both venues (the contract titles usually match closely). Compare three things: orderbook depth at your intended size, current best bid-ask spread, and the fee schedule for the specific category. For a $500 position on a political market, Polymarket-US is often tighter. For a $500 position on the next FOMC decision, Kalshi is usually deeper.",
          "Both venues are growing fast. Six months from now the answer may flip on specific market categories. The benefit of running a multi-venue tracker is you don't have to pre-commit — Cabbge shows both prices on the same market in the AI Search results so you can route to whichever venue is tighter at the moment.",
        ],
      },
    ],
  },

  // -----------------------------------------------------------------
  {
    slug: "kalshi-live-activities",
    title: "Live Activities for Kalshi: why your lock screen matters",
    description:
      "Live Activities and WidgetKit make Kalshi positions visible without unlocking. How it works, what it costs in battery, and which markets to wire to your lock screen.",
    excerpt:
      "Every Kalshi trader checks their phone too often. Live Activities flip the equation — your positions check in with you, instead of the other way around.",
    category: "Workflow",
    publishedAt: "2026-05-17",
    readingMinutes: 5,
    author: AUTHOR,
    keywords: ["Kalshi Live Activity", "Kalshi widget", "ActivityKit Kalshi", "Kalshi lock screen", "Kalshi iPhone widget"],
    faqs: [
      {
        q: "What is a Live Activity?",
        a: "A Live Activity is an iOS 16.1+ feature that lets an app display real-time information on the lock screen and in the Dynamic Island without requiring the user to unlock or open the app. Live Activities update via push notifications and can persist for up to 12 hours.",
      },
      {
        q: "Can Kalshi positions show on the lock screen?",
        a: "Yes, via apps like Cabbge that implement ActivityKit. A Cabbge Live Activity displays the current YES price of a market you've subscribed to, the price change since open, the resolution countdown, and tap-through to the full market detail. You can run multiple Live Activities at once — one per market.",
      },
      {
        q: "Does running Live Activities drain my battery?",
        a: "Minimally. Live Activities are updated via push notifications, not by the app polling — so the battery cost is identical to receiving a few extra push notifications per hour. Apple's ActivityKit framework rate-limits update frequency to prevent abuse. Cabbge updates a Live Activity on meaningful price moves, not on every micro-tick.",
      },
      {
        q: "What's the difference between a Live Activity and a widget?",
        a: "A widget is a static or semi-static view on the home screen that updates a few times per hour. A Live Activity is a real-time persistent view on the lock screen and Dynamic Island that updates as events happen. For prediction markets, widgets work well for daily portfolio summary; Live Activities work for active markets you're watching minute-to-minute.",
      },
    ],
    body: [
      {
        heading: "What Live Activities mean for prediction-market traders",
        paragraphs: [
          "The default workflow for an active Kalshi trader is: unlock phone, open browser, navigate to Kalshi, find market, refresh, close, lock phone. Repeat every 20 minutes. The reason: prediction markets move on news, and news doesn't have a notification API.",
          "Live Activities flip this. Instead of you checking on your positions, your positions check in with you. A Cabbge Live Activity sits on your lock screen showing the current YES price of a market you care about, updates when the price moves meaningfully, and disappears when the market resolves. You unlock your phone half as often.",
        ],
      },
      {
        heading: "Which markets to wire to Live Activities",
        paragraphs: [
          "Three categories where Live Activities pay off the most. First: positions you've sized heavily into where intraday moves matter — a $500+ position on a 24-hour-to-resolution market deserves real-time visibility. Second: catalyst windows where you want to react to news — an FOMC decision or a CPI release in the next 2 hours warrants a Live Activity even without an open position. Third: weather markets where the underlying data (NHC hurricane forecasts) updates on a schedule — a Live Activity for the next hurricane advisory release saves you twenty browser tab refreshes.",
          "Cabbge lets you start a Live Activity from any market's detail screen with a single tap. You can run up to five Live Activities concurrently before iOS starts deprioritizing them.",
        ],
      },
      {
        heading: "Battery and bandwidth cost",
        paragraphs: [
          "Live Activities are updated via push notifications, not by the app polling. The battery cost is roughly equivalent to receiving a handful of extra push notifications per hour. Apple's ActivityKit rate-limits update frequency, so even a high-frequency market won't drain meaningful battery.",
          "Cabbge sends Live Activity updates only on meaningful events: a price move greater than a configurable threshold (default 5 cents), a relevant news article published, or a scheduled catalyst window opening. The default settings are tuned to update a Live Activity 3-8 times per day for an active market — net battery impact under 2%.",
        ],
      },
    ],
  },
];

export function findPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
