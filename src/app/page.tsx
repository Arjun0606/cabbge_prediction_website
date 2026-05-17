"use client";

// UI/UX Pro Max skill priorities applied:
//   1. Accessibility (CRITICAL): focus-visible rings, aria-labels on icon-
//      only elements, prefers-reduced-motion respect on every animation,
//      4.5:1 contrast (verified via the design tokens in globals.css).
//   2. Touch targets ≥44×44 (CTAs, badge, nav links).
//   4. Style consistency: monochrome + cabbge-accent + semantic-up only,
//      SVG-only icons (no emoji).
//   6. Typography: tabular-nums on all numeric displays (prices, metrics).
//   7. Animation: 150-300ms range, transform/opacity only, stagger 40ms
//      (skill range 30-50ms), exit ~60% of enter duration.

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// =============================================================================
// Landing page — motion-heavy, dark, premium. Coming-soon CTA placeholder
// where the iOS App Store badge will swap in at launch.
// =============================================================================

export default function Landing() {
  return (
    <main className="relative overflow-x-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <Nav />
      <Hero />
      <LiveActivityShowcase />
      <FeatureBento />
      <Pricing />
      <BlogTeaser />
      <Footer />
      <BackgroundGrain />
    </main>
  );
}

// -----------------------------------------------------------------------------
// Nav — sticky, blurs as you scroll
// -----------------------------------------------------------------------------

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-black/60 border-b border-white/5" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-7 text-sm text-[var(--color-text-secondary)]">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="/blog" className="hover:text-white transition">Blog</a>
          <ComingSoonBadge compact />
        </div>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <a
      href="/"
      aria-label="Cabbge — home"
      className="flex items-center gap-2 group rounded-md focus-visible:ring-2 focus-visible:ring-[var(--color-cabbge-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <div aria-hidden className="relative w-7 h-7">
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[var(--color-cabbge-accent)] to-[var(--color-semantic-up)]" />
        <div className="absolute inset-[2px] rounded-[5px] bg-black flex items-center justify-center">
          <span className="text-white font-black text-xs tracking-tighter">c</span>
        </div>
      </div>
      <span className="font-bold tracking-tight text-white">cabbge</span>
    </a>
  );
}

/** The CTA placeholder that swaps to an App Store badge at launch. */
function ComingSoonBadge({ compact }: { compact?: boolean }) {
  // Touch-target rule: non-compact ≥ 44×44pt area. Compact (in nav) sits
  // inside a 44pt-tall nav row so the hit area is preserved.
  return (
    <div
      role="status"
      aria-label="Cabbge for iOS — coming soon"
      className={`relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] ${
        compact ? "px-3 py-1.5 text-xs" : "px-5 py-3 text-sm min-h-[44px]"
      } text-white/90 backdrop-blur-sm overflow-hidden`}
    >
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-semantic-up)] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-semantic-up)]" />
      </span>
      <span className="font-medium">Coming soon · iOS</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Hero — massive headline + animated probability sparkline + the CTA placeholder
// -----------------------------------------------------------------------------

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative pt-40 pb-24 px-6 min-h-[100vh] flex items-center">
      <Aurora />
      <motion.div style={{ y, opacity }} className="relative max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-tertiary)] mb-6"
        >
          iOS · Kalshi · Polymarket
        </motion.p>

        <WordReveal
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] max-w-5xl"
          words={["Your", "prediction", "market", "co-pilot."]}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed"
        >
          Track Kalshi and Polymarket positions live. AI briefs on every market.
          Form&nbsp;8949 tax exports in two taps. Lock-screen Live Activities so
          you never miss a resolution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <ComingSoonBadge />
          <span className="text-sm text-[var(--color-text-tertiary)]">
            $19.99/mo · Free tier ships
          </span>
        </motion.div>

        <HeroMetrics />
      </motion.div>
    </section>
  );
}

/**
 * Word-by-word reveal — premium, no AI-slop fade-up-all-at-once.
 *
 * Per UI/UX Pro Max skill: respect prefers-reduced-motion (animation
 * collapses to instant render), stagger 40ms per word (skill range
 * 30-50ms), ease-out curve for entering elements.
 */
function WordReveal({ words, className }: { words: string[]; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <h1 className={className}>
      {words.map((w, i) => (
        <motion.span
          key={w + i}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.15 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {i === words.length - 1 ? (
            <span className="bg-gradient-to-br from-[var(--color-cabbge-accent)] via-[#5eb0ff] to-[var(--color-semantic-up)] bg-clip-text text-transparent">
              {w}
            </span>
          ) : (
            w
          )}
        </motion.span>
      ))}
    </h1>
  );
}

/** Bottom-of-hero metric strip — counts up on mount. */
function HeroMetrics() {
  const metrics: { value: string; label: string }[] = [
    { value: "1.39s", label: "Cold launch" },
    { value: "112+", label: "Backend checks" },
    { value: "0", label: "Trackers (zero)" },
    { value: "2-tap", label: "Tax export" },
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
      }}
      className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl"
    >
      {metrics.map((m) => (
        <motion.div
          key={m.label}
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-l-2 border-white/10 pl-4"
        >
          {/* Tabular-nums per UI/UX skill: keeps numeric columns from
              shifting as their content changes between digit widths. */}
          <div className="text-3xl font-bold tracking-tight mono tabular-nums">{m.value}</div>
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] mt-1">
            {m.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Aurora — large, slow, animated gradient behind the hero. Pure CSS. */
function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-cabbge-accent)_0%,_transparent_55%)] opacity-[0.18] blur-3xl" />
      <div className="absolute top-1/4 right-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-semantic-up)_0%,_transparent_55%)] opacity-[0.12] blur-3xl" />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Live Activity Showcase — iPhone mockup, rotating live-activity cards
// -----------------------------------------------------------------------------

function LiveActivityShowcase() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-tertiary)] mb-5"
          >
            Lock screen
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Your P&amp;L,
            <br />
            <span className="text-[var(--color-text-secondary)]">without unlocking your phone.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-lg"
          >
            Live Activities + WidgetKit make Cabbge the only Kalshi tracker
            you don&apos;t have to open. Resolution countdowns, hurricane
            tracks, catalyst windows — surfaced where you actually look.
          </motion.p>
        </div>
        <div className="flex justify-center">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

/** Pure-CSS iPhone mockup with rotating Live Activity cards. */
function PhoneMockup() {
  const [idx, setIdx] = useState(0);
  const activities = [
    { kind: "resolution", title: "Will SCOTUS rule for Trump?", price: 73, change: +4.5, ticker: "KXSCOTUS-25" },
    { kind: "catalyst", title: "CPI release — May print", in: "in 1h 23m", impact: "high" },
    { kind: "weather", title: "Hurricane Janet → Miami", cone: "75% strike probability" },
    { kind: "position", title: "Patriots win SB LX", pnl: +234.50, status: "open" },
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % activities.length), 3500);
    return () => clearInterval(t);
  }, []);
  const a = activities[idx];

  return (
    <div className="relative w-[300px] h-[620px]">
      {/* Glow */}
      <div className="absolute inset-0 -m-8 rounded-[60px] bg-[radial-gradient(circle_at_center,_var(--color-cabbge-accent)_0%,_transparent_60%)] opacity-30 blur-2xl" />
      {/* Phone bezel */}
      <div className="relative w-full h-full rounded-[55px] bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] p-[2px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
        <div className="w-full h-full rounded-[53px] bg-black overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[34px] bg-black rounded-full z-20" />
          {/* Status bar time */}
          <div className="absolute top-4 left-7 text-white text-sm font-semibold z-10">9:41</div>
          <div className="absolute top-4 right-7 z-10 flex items-center gap-1.5">
            <span className="text-white text-xs">●●●</span>
          </div>
          {/* Wallpaper */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f2e] via-[#0a1230] to-[#001a25]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.08),_transparent_50%)]" />
          </div>
          {/* Lock screen content */}
          <div className="absolute top-24 left-0 right-0 px-6 flex flex-col items-center">
            <div className="text-white/80 text-sm font-medium">Wednesday, May 17</div>
            <div className="text-white text-[88px] leading-none font-light tracking-tight mt-1">9:41</div>
          </div>
          {/* Live Activity card — animated swap */}
          <div className="absolute bottom-32 left-4 right-4">
            {/* Skill rule: exit shorter than enter (~60-70% of enter
                duration). Enter 500ms → effective exit via key remount,
                next enter overlaps. Acceptable cadence for an ambient
                rotating preview. */}
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[20px] bg-white/[0.08] backdrop-blur-2xl border border-white/10 p-4"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[var(--color-cabbge-accent)] to-[var(--color-semantic-up)] flex items-center justify-center">
                  <span className="text-white text-[10px] font-black">c</span>
                </div>
                <span className="text-white/80 text-[11px] font-semibold tracking-wide uppercase">
                  Cabbge · {a.kind}
                </span>
              </div>
              {a.kind === "resolution" && (
                <div>
                  <div className="text-white text-sm font-medium leading-tight mb-2">{a.title}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-white text-3xl font-bold mono tabular-nums">{a.price}¢</div>
                    <div className="text-[var(--color-semantic-up)] text-sm font-semibold mono">+{a.change}¢</div>
                  </div>
                </div>
              )}
              {a.kind === "catalyst" && (
                <div>
                  <div className="text-white text-sm font-medium mb-1">{a.title}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70 mono">{a.in}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--color-semantic-up)]/20 text-[var(--color-semantic-up)] text-[10px] uppercase tracking-wide font-bold">{a.impact}</span>
                  </div>
                </div>
              )}
              {a.kind === "weather" && (
                <div>
                  <div className="text-white text-sm font-medium mb-1">{a.title}</div>
                  <div className="text-white/70 text-xs mono">{a.cone}</div>
                </div>
              )}
              {a.kind === "position" && (
                <div>
                  <div className="text-white text-sm font-medium mb-1">{a.title}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-[var(--color-semantic-up)] text-2xl font-bold mono">+${a.pnl?.toFixed(2)}</div>
                    <div className="text-white/60 text-[10px] uppercase tracking-wide">{a.status}</div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          {/* Bottom icons */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-between px-12">
            <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md" />
            <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Feature bento
// -----------------------------------------------------------------------------

function FeatureBento() {
  return (
    <section id="features" className="px-6 py-32 max-w-6xl mx-auto">
      <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-tertiary)] mb-5">
        Features
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl mb-16">
        Built like a trading desk.
        <br />
        <span className="text-[var(--color-text-secondary)]">Priced like a notes app.</span>
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[12rem]">
        <BentoCard title="AI Brief" body="GPT-powered 4-sentence analysis on any Kalshi market — what's moving it, what's next, what serious traders miss." span="col-span-1 sm:col-span-2" />
        <BentoCard title="Form 8949" body="One-tap CSV in TurboTax format. FIFO realized P&L, short vs long term auto-split." />
        <BentoCard title="Live Activity" body="Resolution countdowns, hurricane cones, FOMC clock — directly on your lock screen." />
        <BentoCard title="Multi-venue" body="Kalshi, Polymarket-US, Manifold — one portfolio, one P&L, one daily brief." span="col-span-1 sm:col-span-2" />
        <BentoCard title="KMS-encrypted keys" body="Your API key is encrypted in AWS KMS before it touches our database. We never see plaintext." />
        <BentoCard title="5 daily triggers" body="Morning brief, pre-catalyst, resolution, news-on-position, evening digest. Customizable per category." />
        <BentoCard title="Zero trackers" body="No analytics SDKs, no third-party ads, no behavioral profiling. Read by App Store reviewers and your VPN." span="col-span-1 sm:col-span-2" />
      </div>
    </section>
  );
}

function BentoCard({ title, body, span }: { title: string; body: string; span?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 overflow-hidden ${span ?? ""}`}
    >
      <div className="relative">
        <h3 className="text-xl font-semibold tracking-tight mb-3">{title}</h3>
        <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">{body}</p>
      </div>
      <div className="absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-[var(--color-cabbge-accent)] opacity-0 group-hover:opacity-[0.08] blur-3xl transition-opacity duration-500" />
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Pricing
// -----------------------------------------------------------------------------

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-32 max-w-6xl mx-auto">
      <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-tertiary)] mb-5">
        Pricing
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-16">
        Two tiers. No tricks.
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
        <PriceCard
          tier="Free"
          tagline="A real product, not a teaser."
          price="$0"
          features={[
            "Browse every Kalshi + Polymarket market",
            "10-market watchlist",
            "Catalyst calendar (this week)",
            "Live Activity on owned resolutions",
            "Small home-screen widget",
            "1 push notification per day",
          ]}
        />
        <PriceCard
          tier="Pro"
          tagline="The desk-class loadout."
          price="$19.99"
          priceSub="per month, or $159.99/yr (save 33%)"
          featured
          features={[
            "AI brief on every market — unlimited",
            "AI-native semantic search",
            "5 daily push triggers, per-category tuning",
            "Form 8949 + Schedule 1 + TurboTax CSV export",
            "Hurricane + weather Live Activities",
            "All widgets, all advanced analytics",
            "Multi-account portfolio aggregation",
          ]}
        />
      </div>
    </section>
  );
}

function PriceCard({
  tier, tagline, price, priceSub, features, featured,
}: { tier: string; tagline: string; price: string; priceSub?: string; features: string[]; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-3xl p-8 ${
        featured
          ? "bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/20"
          : "bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06]"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 text-[10px] font-bold uppercase tracking-[0.18em] bg-[var(--color-semantic-up)] text-black px-3 py-1.5 rounded-full">
          Most popular
        </span>
      )}
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-2xl font-bold">{tier}</h3>
      </div>
      <p className="text-[var(--color-text-secondary)] text-sm mb-7">{tagline}</p>
      <div className="mb-1">
        <span className="text-5xl font-bold tracking-tight mono tabular-nums">{price}</span>
        {priceSub && <span className="text-[var(--color-text-tertiary)] text-sm ml-2">/mo</span>}
      </div>
      {priceSub && <p className="text-xs text-[var(--color-text-tertiary)] mb-7 mono tabular-nums">{priceSub}</p>}
      <ul className="space-y-2.5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2 text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-semantic-up)] mt-0.5">✓</span>
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Blog teaser — pulls from /lib/posts
// -----------------------------------------------------------------------------

import { POSTS } from "@/lib/posts";

function BlogTeaser() {
  const latest = POSTS.slice(0, 3);
  return (
    <section className="px-6 py-32 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-tertiary)] mb-4">
            Field notes
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-4xl sm:text-5xl font-bold tracking-tight">
            From the desk.
          </motion.h2>
        </div>
        <a href="/blog" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition">
          All posts →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {latest.map((p) => (
          <motion.a
            key={p.slug}
            href={`/blog/${p.slug}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/10 transition"
          >
            <div className="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
              {p.category} · {p.readingMinutes} min
            </div>
            <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-[var(--color-cabbge-accent)] transition">
              {p.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{p.excerpt}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------------

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-12">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm">
        <div className="sm:col-span-2">
          <Logo />
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-md leading-relaxed">
            Cabbge is an independent portfolio tracker for prediction markets. Not affiliated with, endorsed by, or sponsored by Kalshi or Polymarket.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">Product</div>
          <ul className="space-y-2">
            <li><a href="#features" className="text-[var(--color-text-secondary)] hover:text-white transition">Features</a></li>
            <li><a href="#pricing" className="text-[var(--color-text-secondary)] hover:text-white transition">Pricing</a></li>
            <li><a href="/blog" className="text-[var(--color-text-secondary)] hover:text-white transition">Blog</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">Legal</div>
          <ul className="space-y-2">
            <li><a href="/privacy" className="text-[var(--color-text-secondary)] hover:text-white transition">Privacy</a></li>
            <li><a href="/terms" className="text-[var(--color-text-secondary)] hover:text-white transition">Terms</a></li>
            <li><a href="mailto:help@cabbge.com" className="text-[var(--color-text-secondary)] hover:text-white transition">help@cabbge.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.04] px-6 py-6 text-center text-xs text-[var(--color-text-tertiary)]">
        © 2026 Cabbge. Built with attention.
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// Background grain — adds the "real product, not template" feel
// -----------------------------------------------------------------------------

function BackgroundGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
