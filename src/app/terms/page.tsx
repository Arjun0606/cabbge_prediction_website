import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Cabbge's terms of service — independent third-party tracker for prediction markets; not affiliated with Kalshi or Polymarket.",
  alternates: { canonical: "https://cabbge.com/terms" },
};

export default function Terms() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-tertiary)] mb-5">Legal</p>
        <h1 className="text-5xl font-bold tracking-tight mb-3">Terms of Service</h1>
        <p className="text-sm text-[var(--color-text-tertiary)] mb-12">Last updated: May 17, 2026</p>

        <Section title="Acceptance">
          By using Cabbge you agree to these terms. If you don't, don't use the app.
        </Section>

        <Section title="What Cabbge is">
          Cabbge is an independent third-party portfolio tracker for prediction markets. It is not
          a broker, exchange, or financial advisor. It connects to Kalshi and Polymarket-US via
          official APIs using credentials you provide, and renders your existing positions and
          trading history in a mobile interface.
        </Section>

        <Section title="What Cabbge is not">
          <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-secondary)]">
            <li><strong className="text-white">Not affiliated with Kalshi.</strong> Kalshi and the Kalshi logo are trademarks of KalshiEX LLC.</li>
            <li><strong className="text-white">Not affiliated with Polymarket.</strong> Polymarket is a trademark of its owners.</li>
            <li><strong className="text-white">Not a regulated broker or exchange.</strong> Cabbge does not place trades, hold funds, or take custody of any asset.</li>
            <li><strong className="text-white">Not a tax advisor.</strong> The Form 8949 and Schedule 1 exports are convenience formats. Always consult a licensed CPA.</li>
            <li><strong className="text-white">Not financial advice.</strong> The AI Brief surfaces market context and facts. It does not recommend trades.</li>
          </ul>
        </Section>

        <Section title="Your responsibilities">
          You're responsible for the security of your Kalshi and Polymarket account credentials,
          for the accuracy of tax filings you produce using Cabbge's exports, for compliance with
          all applicable laws in your jurisdiction, and for not using Cabbge in any way that
          violates Kalshi's or Polymarket's terms of service.
        </Section>

        <Section title="Subscription and refunds">
          Cabbge Pro is sold via the Apple App Store at $19.99/month or $159.99/year. Subscriptions
          auto-renew until cancelled in iOS Settings → Apple ID → Subscriptions. All refund
          requests are handled by Apple per the App Store's standard refund policy.
        </Section>

        <Section title="Service availability">
          Cabbge depends on the Kalshi API, the Polymarket-US API, Apple Push Notification service,
          OpenAI's API, and our hosting infrastructure. When any of those have outages, parts of
          Cabbge may be unavailable. We aim for 99.5% uptime but make no guarantee.
        </Section>

        <Section title="Limitation of liability">
          Cabbge is provided as-is. We do not warrant the accuracy of any data fetched from
          third-party APIs (Kalshi balances, fills, market prices), and we are not liable for any
          trading decision you make based on information surfaced in the app.
        </Section>

        <Section title="Termination">
          You can stop using Cabbge at any time. Delete your account from Settings to remove your
          encrypted API keys and cached data from our infrastructure. We may terminate access if
          you violate these terms or use Cabbge in a way that puts other users at risk.
        </Section>

        <Section title="Changes">
          We may update these terms. Material changes will be surfaced via in-app notice.
        </Section>

        <Section title="Contact">
          Questions? <a className="text-[var(--color-cabbge-accent)]" href="mailto:help@cabbge.com">help@cabbge.com</a>.
        </Section>

        <footer className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between text-sm">
          <a href="/" className="text-[var(--color-text-secondary)] hover:text-white transition">← Cabbge home</a>
          <a href="/privacy" className="text-[var(--color-text-secondary)] hover:text-white transition">Privacy →</a>
        </footer>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold tracking-tight mb-5">{title}</h2>
      <div className="text-[var(--color-text-secondary)] leading-[1.75]">{children}</div>
    </section>
  );
}
