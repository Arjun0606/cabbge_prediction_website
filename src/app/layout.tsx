import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://cabbge.com";
const TITLE = "Cabbge — Kalshi & Polymarket on your lock screen";
const DESCRIPTION =
  "Track your Kalshi and Polymarket positions live. AI briefs on every market, Form 8949 tax exports in two taps, Live Activities + widgets, multi-venue portfolio in one app. iOS, $19.99/mo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Cabbge" },
  description: DESCRIPTION,
  applicationName: "Cabbge",
  authors: [{ name: "Arjun Varma", url: SITE }],
  creator: "Arjun Varma",
  publisher: "Cabbge",
  keywords: [
    "Kalshi tracker", "Polymarket tracker", "prediction market app",
    "event contracts", "Kalshi portfolio", "Kalshi tax export", "Form 8949 Kalshi",
    "political betting tracker", "Kalshi iOS app", "Kalshi Live Activity",
    "Polymarket iOS", "prediction market portfolio", "Kalshi AI brief",
  ],
  category: "finance",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: "Cabbge",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cabbge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@cabbge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/icon-1024.png", sizes: "1024x1024", type: "image/png" },
      { url: "/logo.png", sizes: "any", type: "image/png" },
    ],
    apple: [{ url: "/icon-1024.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Structured data — emitted as JSON-LD in <head>. Three schemas:
 *   Organization     — brand identity, sameAs links
 *   SoftwareApplication — App Store-style metadata for AI engines + Google
 *   WebSite          — search action (for sitelinks search box)
 */
const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#org`,
    name: "Cabbge",
    url: SITE,
    logo: `${SITE}/logo.png`,
    sameAs: [
      "https://twitter.com/cabbge",
      "https://github.com/Arjun0606/cabbge",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "help@cabbge.com",
      availableLanguage: ["English"],
    },
  },
  // SoftwareApplication shape follows the geo-seo-claude skill's
  // `schema/software-saas.json` template: AggregateOffer wrapping the
  // three tier Offers, featureList for AI-engine indexing, screenshot,
  // softwareVersion, and sameAs hooks for brand-authority signals.
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE}/#app`,
    name: "Cabbge",
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Portfolio Tracker",
    operatingSystem: "iOS 17+",
    description: DESCRIPTION,
    url: SITE,
    image: `${SITE}/og-image.png`,
    screenshot: `${SITE}/og-image.png`,
    softwareVersion: "1.0.0",
    datePublished: "2026-06-01",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "159.99",
      priceCurrency: "USD",
      offerCount: "3",
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        { "@type": "Offer", name: "Cabbge Pro Monthly", price: "19.99", priceCurrency: "USD", availability: "https://schema.org/InStock", priceSpecification: { "@type": "UnitPriceSpecification", price: "19.99", priceCurrency: "USD", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } } },
        { "@type": "Offer", name: "Cabbge Pro Annual", price: "159.99", priceCurrency: "USD", availability: "https://schema.org/InStock", priceSpecification: { "@type": "UnitPriceSpecification", price: "159.99", priceCurrency: "USD", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "ANN" } } },
      ],
    },
    featureList: [
      "Live Activities on the lock screen for Kalshi positions",
      "AI Brief on any prediction market (OpenAI gpt-5-nano)",
      "Form 8949, Schedule 1, TurboTax CSV tax exports",
      "Multi-venue portfolio (Kalshi + Polymarket-US)",
      "AWS KMS-encrypted API keys",
      "Five daily push triggers (morning brief, pre-catalyst, resolution, news-on-position, evening digest)",
      "AI-native semantic market search",
      "Hurricane and weather Live Activities",
      "Home screen widgets",
      "FIFO realized P&L with short/long-term split",
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "1", bestRating: "5", worstRating: "1" },
    author: { "@id": `${SITE}/#org` },
    publisher: { "@id": `${SITE}/#org` },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#site`,
    name: "Cabbge",
    url: SITE,
    publisher: { "@id": `${SITE}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD for AI engines (ChatGPT, Perplexity, Claude, Google AIO) and traditional SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        {/* Hint to AI crawlers: this site has an llms.txt manifest */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site summary" />
        <link rel="alternate" type="application/rss+xml" href="/blog/feed.xml" title="Cabbge blog" />
      </head>
      <body>{children}</body>
    </html>
  );
}
