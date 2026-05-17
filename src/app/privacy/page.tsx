import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Cabbge's privacy policy — what we collect, what we don't, and exactly how your Kalshi/Polymarket API keys are handled.",
  alternates: { canonical: "https://cabbge.com/privacy" },
};

export default function Privacy() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-tertiary)] mb-5">Legal</p>
        <h1 className="text-5xl font-bold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-text-tertiary)] mb-12">Last updated: May 17, 2026</p>

        <Section title="The short version">
          Cabbge is built to be the kind of finance app you'd actually trust with your trading
          credentials. We collect the minimum we need to run the product. We don't run third-party
          analytics, ad networks, or behavioral profiling. We don't sell or share your data. Your
          Kalshi and Polymarket API keys are encrypted with AWS KMS the moment you submit them and
          are never stored in plaintext.
        </Section>

        <Section title="What we collect">
          <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-secondary)]">
            <li><strong className="text-white">Email address</strong> — collected when you sign in with Apple. Used only to support account recovery and to email you tax export receipts if you ask. Linked to your account, not used for tracking.</li>
            <li><strong className="text-white">Apple user identifier</strong> — used to authenticate your account. Linked to your account, not used for tracking.</li>
            <li><strong className="text-white">Purchase history</strong> — your Cabbge Pro subscription status and renewal date. Linked to your account, not used for tracking.</li>
            <li><strong className="text-white">API credentials you provide</strong> — Kalshi API key + private key, Polymarket-US API credentials, Manifold key. Encrypted with AWS KMS before persistence; never stored in plaintext.</li>
            <li><strong className="text-white">Trading data fetched on your behalf</strong> — positions, fills, cash balances, performance history. Stored only insofar as we cache it for rendering speed; never analyzed, sold, or shared.</li>
          </ul>
        </Section>

        <Section title="What we don't collect">
          <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-secondary)]">
            <li>No location data.</li>
            <li>No third-party analytics SDKs (no Mixpanel, no Amplitude, no Segment, no Firebase Analytics).</li>
            <li>No advertising identifiers (no IDFA, no Google Advertising ID).</li>
            <li>No behavioral or interaction tracking.</li>
            <li>No contacts, photos, calendar, or microphone access.</li>
          </ul>
        </Section>

        <Section title="How your API key is secured">
          When you submit your Kalshi or Polymarket API key, it travels over TLS to our backend
          (Supabase Edge Functions). The backend immediately wraps the key with AWS KMS using
          envelope encryption — the wrapped blob is what we store. To make an API call on your
          behalf, we briefly unwrap the key into process memory, make the call, and discard. The
          plaintext key never appears in logs, never persists to disk, and never leaves our
          infrastructure. You can disconnect any account at any time from Settings, which deletes
          the encrypted blob immediately.
        </Section>

        <Section title="Third-party services we use">
          <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-secondary)]">
            <li><strong className="text-white">Supabase</strong> — auth + Edge Function hosting + Postgres database.</li>
            <li><strong className="text-white">AWS KMS</strong> — encryption for your API keys.</li>
            <li><strong className="text-white">Kalshi API + Polymarket-US API</strong> — read-only access using your credentials.</li>
            <li><strong className="text-white">OpenAI</strong> — generates AI briefs and search results. Market metadata is sent; your trading history is not.</li>
            <li><strong className="text-white">Apple Push Notification service</strong> — delivers your notifications.</li>
            <li><strong className="text-white">FRED + National Weather Service</strong> — public data sources for the catalyst calendar.</li>
          </ul>
        </Section>

        <Section title="Children's privacy">
          Cabbge is rated 17+ on the App Store and is not directed to anyone under 18.
        </Section>

        <Section title="Your rights">
          You can delete your account at any time from Settings — this removes your email, your
          encrypted API keys, and all cached trading data from our infrastructure. You can also
          email <a className="text-[var(--color-cabbge-accent)]" href="mailto:help@cabbge.com">help@cabbge.com</a> with any privacy question or request.
        </Section>

        <Section title="Changes to this policy">
          We'll update this policy if our data practices change. We'll surface material changes via
          in-app notice; trivial wording fixes will just appear here.
        </Section>

        <footer className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between text-sm">
          <a href="/" className="text-[var(--color-text-secondary)] hover:text-white transition">← Cabbge home</a>
          <a href="mailto:help@cabbge.com" className="text-[var(--color-text-secondary)] hover:text-white transition">help@cabbge.com</a>
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
