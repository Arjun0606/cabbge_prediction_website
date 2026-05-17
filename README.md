# cabbge_prediction_website

The marketing site, blog, and legal pages for **Cabbge** — the iOS portfolio tracker for Kalshi and Polymarket-US.

Production target: `https://cabbge.com`

## Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **Motion (Framer Motion v12)** for entrance animations + scroll-driven parallax
- **TypeScript** (strict)
- Static-rendered (`next build` outputs 13 static routes including SSG blog posts)

## What's in here

- **`/`** — motion-heavy landing with hero, pure-CSS iPhone mockup running a rotating Live Activity preview, bento feature grid, pricing, blog teaser
- **`/blog`** — index of field notes
- **`/blog/[slug]`** — SEO-optimized posts with `Article` + `FAQPage` JSON-LD, citability-formatted content blocks (134-167 word answer rule per [geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude))
- **`/privacy`** — App Store-compliant privacy policy
- **`/terms`** — terms of service
- **`/robots.txt`** — generated from `app/robots.ts`. Explicit ALLOW for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended, Bytespider, CCBot
- **`/sitemap.xml`** — generated from `app/sitemap.ts`
- **`/llms.txt`** — LLM-friendly site summary per the [llms.txt standard](https://llmstxt.org)
- **`/llms-full.txt`** — comprehensive content corpus for AI engines (scores 90-100 on the geo-seo-claude llms.txt rubric when both files are present)

## SEO / GEO posture

Built against the [geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude) skill's scoring methodology:

| Sub-score | Weight | Wired |
|-----------|:---:|---|
| AI Citability | 25% | Citability-formatted blocks (134-167 words), definition patterns, attributed claims, statistical density. `/llms.txt` + `/llms-full.txt`. AI crawlers explicitly allowed. |
| Brand Authority | 20% | `sameAs` links in Organization JSON-LD. *Outstanding work: Wikipedia + YouTube + Reddit presence.* |
| Content Quality / E-E-A-T | 20% | Named author with bio link, published + modified dates, transparent citations, HTTPS, visible contact + privacy policy. |
| Technical Foundations | 15% | Static rendering, semantic HTML, single H1 per page, descriptive titles + meta descriptions, canonical URLs. |
| Structured Data | 10% | `Organization` + `SoftwareApplication` (with `AggregateOffer`, `featureList`, `screenshot`, `softwareVersion`) + `WebSite` (`SearchAction`) + `Article` + `FAQPage`. |
| Platform Optimization | 10% | OG + Twitter Card meta, finance-category JSON-LD. |

## UI / UX posture

Built against the [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) priority-ordered rules:

| Priority | Rule | Applied |
|:---:|---|---|
| 1 (CRITICAL) | Accessibility | Site-wide focus ring in `globals.css`, `useReducedMotion()` in animated components, ARIA labels on icon-only elements, 4.5:1 contrast tokens |
| 2 (CRITICAL) | Touch | CTAs `min-h-[44px]`, generous nav spacing |
| 4 (HIGH) | Style consistency | Monochrome + cabbge-accent + semantic-up palette, zero emoji in UI, SVG-only icons |
| 6 (MEDIUM) | Typography | `tabular-nums` on every numeric display |
| 7 (MEDIUM) | Animation | 150-300ms, transform/opacity only, 40ms stagger (skill range 30-50ms), `[0.16, 1, 0.3, 1]` ease-out |

## Develop

```bash
bun install
bun run dev          # http://localhost:3000
bun x next build     # production build
bun x tsc --noEmit   # typecheck
```

## Deploy

```bash
vercel --prod
```

Then point `cabbge.com` apex A/AAAA records at the Vercel deploy.

## Swap "Coming Soon" → App Store badge at launch

The hero CTA is currently a placeholder `ComingSoonBadge` component. At launch, edit `src/app/page.tsx`:

```tsx
// Before
<ComingSoonBadge />

// After
<a href="https://apps.apple.com/us/app/cabbge/idXXXXXXXX" aria-label="Download Cabbge on the App Store">
  <Image src="/app-store-badge.svg" alt="" width={180} height={60} />
</a>
```

The component is referenced in two places (hero + nav-compact); update both.

## License

Proprietary. © 2026 Arjun Varma. All rights reserved.
