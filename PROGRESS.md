# ERC Defense Site - Progress Notes

**Last Updated:** March 11, 2026

## What's Complete

### Infrastructure
- [x] Converted static HTML site to 11ty (Eleventy)
- [x] Created data-driven page generation system
- [x] Set up `_data/keywords.json` for internal keyword tracking
- [x] Set up `_data/pages.json` for page definitions
- [x] Created SEO-optimized template (`seo-pages.njk`)
- [x] Added FAQ schema markup for all pages
- [x] Added CSS for callouts, takeaways, related pages

### Tier 1 Pages (Complete with full content)
All 11 priority 1 pages have comprehensive, rankable content:

| Page | Slug | Volume | Status |
|------|------|--------|--------|
| IRS Letter 6612 | `/irs-letter-6612/` | 1,000 | ✅ Complete |
| Letter 105-C Denied | `/irs-letter-105c-erc-denied/` | 500 | ✅ Complete |
| Letter 6577-C Clawback | `/irs-letter-6577c-erc-clawback/` | 400 | ✅ Complete |
| ERC Claim Denied | `/erc-claim-denied/` | 200 | ✅ Complete |
| How to Appeal | `/how-to-appeal-erc-denial/` | 150 | ✅ Complete |
| ERC Refund Delayed | `/erc-refund-delayed/` | 720 | ✅ Complete |
| Preparer Gone | `/erc-company-out-of-business/` | 150 | ✅ Complete |
| ERC Audit Attorney | `/erc-audit-attorney/` | 90 | ✅ Complete |
| IRS Audit Help | `/irs-audit-help/` | 170 | ✅ Complete |
| ERC Clawback | `/erc-clawback/` | 180 | ✅ Complete |
| Form 4564 | `/irs-form-4564-erc/` | 80 | ✅ Complete |

---

## Tier 2 Pages (Complete)

All 11 tier 2 pages now have comprehensive, rankable content:

| Page | Slug | Volume | Status |
|------|------|--------|--------|
| ERC Audit Penalties | `/erc-audit-penalties/` | 90 | ✅ Complete |
| ERC Mills Warning Signs | `/erc-mills-warning-signs/` | 200 | ✅ Complete |
| Withdraw ERC Claim | `/withdraw-erc-claim/` | 120 | ✅ Complete |
| ERC Statute of Limitations | `/erc-audit-statute-of-limitations/` | 40 | ✅ Complete |
| Letter 106-C (Partial Denial) | `/irs-letter-106c-partial-denial/` | 150 | ✅ Complete |
| Check ERC Refund Status | `/check-erc-refund-status/` | 500 | ✅ Complete |
| ERC Fraud Penalties | `/erc-fraud-penalties/` | 80 | ✅ Complete |
| ERC Voluntary Disclosure | `/erc-voluntary-disclosure/` | 100 | ✅ Complete |
| ERC for Restaurants | `/erc-for-restaurants/` | 200 | ✅ Complete |
| ERC for Medical Practices | `/erc-for-medical-practices/` | 150 | ✅ Complete |
| ERC for Construction | `/erc-for-construction/` | 120 | ✅ Complete |

---

## Tier 3 Pages (Complete)

23 tier 3 pages now have comprehensive, rankable content:

### 3A: Industry Pages (8 pages)
| Page | Slug | Status |
|------|------|--------|
| Hotels & Hospitality | `/erc-hotels-hospitality/` | ✅ Complete |
| Gyms & Fitness Centers | `/erc-gyms-fitness-centers/` | ✅ Complete |
| Retail Stores | `/erc-retail-stores/` | ✅ Complete |
| Churches & Nonprofits | `/erc-churches-nonprofits/` | ✅ Complete |
| Manufacturing | `/erc-manufacturing/` | ✅ Complete |
| Auto Dealers | `/erc-auto-dealers/` | ✅ Complete |
| Salons & Spas | `/erc-salons-spas/` | ✅ Complete |
| Daycare & Childcare | `/erc-daycare-childcare/` | ✅ Complete |

### 3B: Eligibility Deep-Dives (6 pages)
| Page | Slug | Status |
|------|------|--------|
| Gross Receipts Test | `/gross-receipts-test/` | ✅ Complete |
| Government Order Test | `/government-order-test/` | ✅ Complete |
| Essential Business ERC | `/essential-business-erc/` | ✅ Complete |
| Recovery Startup Business | `/recovery-startup-business/` | ✅ Complete |
| PPP & ERC Coordination | `/ppp-erc-coordination/` | ✅ Complete |
| Full vs Partial Suspension | `/full-vs-partial-suspension/` | ✅ Complete |

### 3C: State-Specific Pages (5 pages)
| Page | Slug | Status |
|------|------|--------|
| California ERC | `/erc-california/` | ✅ Complete |
| Texas ERC | `/erc-texas/` | ✅ Complete |
| Florida ERC | `/erc-florida/` | ✅ Complete |
| New York ERC | `/erc-new-york/` | ✅ Complete |
| Illinois ERC | `/erc-illinois/` | ✅ Complete |

### 3D: Situation-Specific Pages (4 pages)
| Page | Slug | Status |
|------|------|--------|
| Already Received ERC, Worried | `/already-received-erc-worried/` | ✅ Complete |
| ERC Promoter Scam Victim | `/erc-promoter-scam-victim/` | ✅ Complete |
| ERC 2020 vs 2021 Rules | `/erc-2020-vs-2021-rules/` | ✅ Complete |
| Infrastructure Act Changes | `/infrastructure-act-erc-changes/` | ✅ Complete |

---

## Future: Tier 4 Pages

Remaining pages to build (~70 more identified in original research):
- Additional IRS notice types
- More state-specific pages
- Long-tail keyword variations
- Additional industry verticals

---

## Commands to Resume

```bash
# Navigate to project
cd "/Users/beef/Repository/qualifi-repo/ERC Audit/erc-defense-site"

# Start dev server
npx @11ty/eleventy --serve --port 8084

# Build only
npx @11ty/eleventy
```

## File Locations

- **Keywords data:** `src/_data/keywords.json`
- **Pages data:** `src/_data/pages.json`
- **Page template:** `src/seo-pages.njk`
- **CSS:** `src/css/style.css`
- **11ty config:** `.eleventy.js`

## Content Structure for Each Page

Each page in `pages.json` should have:
```json
{
  "id": "unique-id",
  "title": "SEO Title",
  "slug": "url-slug",
  "hub": "hub-id",
  "keyword": "keyword-id-from-keywords-json",
  "priority": 2,
  "status": "draft",
  "description": "Meta description",
  "h1": "Page H1",
  "tag": "Badge text",
  "content": {
    "urgency": "Optional red banner text",
    "intro": "Lead paragraph",
    "sections": [
      {
        "heading": "H2 Section Title",
        "content": "<p>HTML content</p>",
        "list": [{"title": "Bold", "description": "Text"}],
        "steps": [{"title": "Step", "description": "Text"}],
        "warning": "Warning callout text",
        "tip": "Tip callout text"
      }
    ],
    "takeaways": ["Bullet 1", "Bullet 2"],
    "relatedPages": [{"slug": "page-slug", "title": "Title", "tag": "Tag"}],
    "ctaText": "Custom CTA text"
  },
  "faqs": [
    {"question": "Q?", "answer": "A."}
  ]
}
```

---

## Total Page Count

- **Core pages:** 8 (home, about, contact, services, risks, privacy, terms, disclaimer)
- **Tier 1 SEO pages:** 11 (complete with full content)
- **Tier 2 SEO pages:** 11 (complete with full content)
- **Tier 3 SEO pages:** 23 (complete with full content)
- **Future tiers:** ~70 more identified

**Current total:** 53 pages (all with comprehensive, rankable content)
