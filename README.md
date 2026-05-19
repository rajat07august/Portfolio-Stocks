# Equity Watchlist — 39 Indian Stocks

Personal investment-research repository covering 39 stocks from a Screener.in watchlist, organised into four sector batches with detailed deep-dive Word reports and a live HTML dashboard.

**Status as of 16 May 2026.** Built with Claude (Cowork mode).

---

## 🚀 Deploy

- **GitHub:** [`PUSH_INSTRUCTIONS.md`](PUSH_INSTRUCTIONS.md) — repo is pre-initialised; just `git push -u origin main`.
- **Vercel** (live URL): [`VERCEL_DEPLOY.md`](VERCEL_DEPLOY.md) — `vercel.json` configured to serve only the `dashboard/` folder, so your reports and build scripts stay private.

## 📊 Live Dashboard

[`dashboard/index.html`](dashboard/index.html) — Open in any browser. Self-contained single file (~100 KB) with:

- All 39 stocks across 4 batches in one view.
- Three interactive Chart.js visualisations (sector doughnut, conviction breakdown, market-cap buckets) — click to filter.
- KPI strip (Total / SME / Mainboard / High-Conviction / Sectors).
- Filter toolbar (batch, listing, conviction, search) and sortable summary table.
- One card per stock with **CMP**, business summary, source-cited metrics, thesis points, key risks, near-term catalysts, valuation, margin-of-safety view.
- Dated **"Changes Since Baseline"** log per stock — appended on every refresh.

The dashboard is regenerated bi-weekly by an automated job that re-fetches results / order book / news per stock and updates the changes log + CMP.

---

## 📄 Detailed Word Reports (one per sector batch)

| Batch | Sector Theme | Stocks | File |
|:---:|---|:---:|---|
| 1 | Power, Mining, Realty & Others | 13 | [`reports/Equity_Watchlist_Batch1_PowerMiningRealtyOthers.docx`](reports/Equity_Watchlist_Batch1_PowerMiningRealtyOthers.docx) |
| 2 | Defence / Engineering / Auto | 14 | [`reports/Equity_Watchlist_Batch2_DefenceEngineeringAuto.docx`](reports/Equity_Watchlist_Batch2_DefenceEngineeringAuto.docx) |
| 3 | Specialty Chemicals / Pharma | 5 | [`reports/Equity_Watchlist_Batch3_SpecialtyChemPharma.docx`](reports/Equity_Watchlist_Batch3_SpecialtyChemPharma.docx) |
| 4 | EMS / Electronics / Tech | 7 | [`reports/Equity_Watchlist_Batch4_EMSElectronicsTech.docx`](reports/Equity_Watchlist_Batch4_EMSElectronicsTech.docx) |

Each batch document follows the same template per stock: business in plain English, sector tailwinds, MOAT, growth drivers, order book / revenue visibility, management execution, key risks, valuation snapshot, near-term catalysts (6–18 months), margin-of-safety view, plus an executive summary table at the top and a closing synthesis at the end.

---

## 🛠 Build Scripts

`build-scripts/` contains the Node.js scripts (using [`docx`](https://www.npmjs.com/package/docx)) that generate each batch's Word report from the underlying stock data. Useful if you want to:

- Regenerate reports after updating company-level commentary or metrics.
- Adapt the template to your own watchlist.

To rebuild:

```bash
npm install -g docx
cd build-scripts
NODE_PATH=$(npm root -g) node build_batch1.js
NODE_PATH=$(npm root -g) node build_batch2.js
NODE_PATH=$(npm root -g) node build_batch3.js
NODE_PATH=$(npm root -g) node build_batch4.js
```

Outputs land in the same folder; copy the `.docx` files to `reports/` to commit.

---

## 📐 Stock Coverage

**Sectors (12):** Renewable Energy & Power · Metals & Mining · Water / Civil / Marine Infra · Real Estate · Specialty Materials & Packaging · Financial Services · Aerospace & Defence · Auto Components & Forgings · Power T&D / Electrical Components · Specialty Chem & Pharma · EMS / Electronics / AI · BFSI / IT Software.

**Listing split:** 11 SME / SME-recent, 28 main-board.

**Lens:** near-term catalysts (6–18 months), valuation / margin of safety, sector tailwinds.

---

## 🔁 Refresh Cadence

The HTML dashboard is wired up to be auto-refreshed bi-weekly (1st & 15th of every month, 9 AM local). Each run:

1. Pulls latest CMP, quarterly results, order book updates, concall transcripts, regulatory news per stock.
2. Appends a dated entry to that stock's `changes:` array in the dashboard JS.
3. Updates the page header's "Last Refreshed" / "Next Refresh" dates.
4. Posts a chat summary listing which stocks had material updates, top 5 most material changes, and any `[THESIS WATCH]` events.

(The refresh runs inside Cowork — this repo just holds the latest snapshot. To re-enable the schedule in a new environment, recreate the scheduled task with the same prompt.)

---

## ⚠️ Disclaimer

This repository is for personal investment research and education only. **It is not a buy/sell recommendation** and not professional financial advice. Market caps and metrics are sourced from publicly available stock-data aggregators (Tickertape, Groww, Trendlyne, Business Standard, MarketsMojo, Yahoo Finance, Whalesbook, ScanX) at the time of refresh — verify on Screener.in / NSE / BSE before any decision. SME-listed names carry materially higher governance and liquidity risk than main-board peers.

---

## 📁 Folder Structure

```
.
├── README.md                          # This file
├── .gitignore
├── dashboard/
│   ├── index.html                     # Main live dashboard (all 39 stocks)
│   └── v1_batch1_only.html           # Earlier prototype (Batch 1 only)
├── reports/
│   ├── Equity_Watchlist_Batch1_*.docx
│   ├── Equity_Watchlist_Batch2_*.docx
│   ├── Equity_Watchlist_Batch3_*.docx
│   └── Equity_Watchlist_Batch4_*.docx
└── build-scripts/
    ├── build_batch1.js
    ├── build_batch2.js
    ├── build_batch3.js
    └── build_batch4.js
```
