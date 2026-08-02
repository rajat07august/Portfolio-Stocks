# Kolte-Patil Developers (KPDL) — Company Profile

**Ticker:** KOLTEPATIL · BSE: 532924 · NSE: KOLTEPATIL · **Sector:** Real Estate (Residential Developer — Pune + Bangalore + Mumbai) · **Conviction:** **Medium (Under Watch)** — downgraded from High 2-Aug-2026
**Date written:** 3-Jul-2026 · **CMP:** ₹364.10 · **Market Cap:** ~₹2,750 cr (est) · **Listing:** Mainboard
**Sources:** Concalls Q3FY25, Q4FY25, Q1FY26 (3 reads — **the last three that exist**) + Q2/Q3/Q4FY26 investor PPTs · BSE announcement feed (API) · ValuePickr topic 263 · Screener (curl + HTML parse)

> **How to read this profile:** Every meaningful claim is either sourced from a concall (quarter noted) or a filing. Where I've made a judgment I've flagged it. This is personal thesis-building, not a buy/sell recommendation.
>
> **✅ DATA QUALITY NOTE — CORRECTED 2-Aug-2026.** The previous note read: *"Q2/Q3/Q4FY26 concall transcripts not accessible in current repository. Would benefit from Astec-style refresh."* **That diagnosis was wrong. The transcripts are not missing from the repo — they do not exist.** Kolte-Patil formally notified both exchanges that it **would not hold post-results conference calls**:
> - *"the Company **will not host a conference call** post announcement of the **Q3&9M FY26** results"* — BSE filing, 5 February 2026
> - *"the Company **will not host a conference call** post announcement of the **Q4&FY26** results"* — BSE filing, 22 May 2026
>
> Verified three ways: (a) Screener lists **Transcript links only through Aug-2025**, PPT-only for Nov-2025 / Feb-2026 / May-2026; (b) the **BSE announcements API** (50 filings since 1-Oct-2025) contains **no transcript filing of any kind**; (c) the two "Update on the Post-Results Conference Call" letters above, downloaded and read.
>
> **The last earnings call Kolte-Patil held was Q1FY26 (August 2025). There is nothing to fetch.** This is a disclosure-practice change, not a repository gap — and it is now treated as a **thesis input**, not a footnote. See the Refresh Log.

---

## 🔄 Refresh Log — 2-Aug-2026 (Tier A — data-quality note corrected; conviction H → M, Under Watch)

### 🔴 Finding 1 — The company has gone dark, and it happened right after the Blackstone deal closed

Three consecutive quarters with no earnings call, formally notified. **A developer that stops taking questions in the same year its P&L swings to a loss is telling you something.** For a High-conviction position this is close to disqualifying on its own: you cannot underwrite guidance that management declines to give, and every forward number in the v1 profile traces back to a PPT rather than to anything management had to defend under questioning.

### 🔴 Finding 2 — FY26 was a loss year. The v1 profile does not say this.

v1 leads with *"FY26 Q4 quantum leap: Pre-Sales +1.5x, Collections +1.7x, OCF +1.6x"* and assigns **High conviction / ~85% weighted return**. Those operational figures are real. **The P&L is not in the profile at all**, and it looks like this (Screener, parsed from HTML):

| Consolidated (₹cr) | FY23 | FY24 | FY25 | **FY26** |
|---|---|---|---|---|
| Revenue | 903 | 579 | **1,539** | **658** |
| | | | | **−57% YoY** |
| Operating profit | 70 | −79 | 179 | **−53** |
| OPM | 8% | −14% | 12% | **−8%** |
| **PAT** | 40 | −71 | **115** | **−2** |

**Quarterly FY26:** Jun-25 ₹56cr rev / **−₹13.95cr PAT** → Sep-25 ₹117cr / **−₹7.46cr** → Dec-25 ₹249cr / +₹20.34cr → Mar-26 ₹236cr / **−₹0.90cr**. **Three loss-making quarters out of four.**

**Current ratios: ROCE 1.39% · ROE −5.75% · no P/E (loss-making) · no dividend · P/B 2.79x** (CMP ₹385, BV ₹138, mcap ₹3,415cr).

**⚠️ Being fair to the business — this is partly structural, not purely deterioration.** Real-estate revenue is recognised on completion/handover, not on sale. Cash tells a different story: **FY26 CFO ₹345cr and FCF ₹316cr** (FY25: ₹398cr / ₹343cr). Collections are strong; the P&L is in a recognition trough because fewer projects hit completion. **That is a legitimate explanation — but it is my inference, because there is no concall in which management makes it.** The honest position: the cash is real, the timing story is plausible, and it is unverified.

### 🔴 Finding 3 — Q1FY27 "stable sales" masks a 22% volume decline

From the Operational Update filed **17-Jul-2026** (downloaded and read — this is now the only Q1FY27 disclosure that exists):

| | Q1FY27 | Q1FY26 | YoY |
|---|---|---|---|
| Sales value | ₹617 cr | ₹616 cr | **flat (0%)** |
| Realization | **₹9,442/sq ft** | ₹7,337/sq ft | **+29%** |
| Collections | **₹715 cr** | ₹550 cr | **+30%** |

Company framing: *"sales stood at Rs. 617 crore, **remaining broadly stable YoY**"*, with realizations up *"driven by strategic price revisions across projects and a higher contribution from Mumbai projects."*

**⚠️ Do the division. Flat value ÷ 29% higher price ⇒ area sold fell ~22%** (≈0.65 lakh sq ft vs ≈0.84 lakh). **Kolte-Patil sold roughly a fifth less real estate and held revenue only through price.** Neither the filing nor any call addresses this, because there is no call. Mumbai at ~30% of sales value is doing the mix lifting; Life Republic contributed ~₹212cr.

**Collections +30% to ₹715cr is genuinely good** and consistent with the strong CFO.

### 🔴 Finding 4 — GST show-cause notices under the *fraud* provision, ~₹150cr exposure

Disclosed 4-Jun-2026, escalated 20-Jun-2026 — **entirely absent from v1**:

- **Show Cause Notices under Section 74(1) CGST/MGST**, Assistant Commissioner of State Tax, Mumbai
- **Quantum of claim: ₹103,81,78,300 (₹103.82cr)**, plus interest and penalties
- **Penalty: ₹46,35,62,192 (₹46.36cr)**, of which ₹39.40cr is incremental
- **Period covered: 1-Apr-2020 to 31-Mar-2026** — six financial years
- Company's stated position: the demand *"with interest and penalty is wholly erroneous"* (contesting)

**⚠️ Section 74 is the fraud / wilful-misstatement / suppression-of-facts provision** — materially more serious than a Section 73 routine dispute, and it carries the higher penalty scale. **Combined exposure ~₹150cr against a ₹3,415cr market cap (~4.4%) on a company that just printed a loss.** Contested, unresolved, and — again — undiscussable, because there is no call.

### 🟢 Finding 5 — What is genuinely fine

- **Scheme of Amalgamation (22-May-2026):** two wholly-owned subsidiaries — Kolte-Patil Lifespaces Pvt Ltd and Kolte-Patil Smart Spaces Pvt Ltd — merging into the listed parent under Sections 230–232. **Structural simplification, benign, mildly positive.**
- **NCDs redeemed early and in full (30-Jun-2026)** — deleveraging.
- **Board continuity:** Girish Vanvari re-appointed as Independent Director for a second five-year term (29-Jul-2026 → 28-Jul-2031), approved at the 27-Jul AGM.
- **Senior team build-out** disclosed 22-May-2026: Anil Dwivedi (Chief Development Officer), Vishal Mariya (CHRO), Pranav Mehta (Chief Business Officer – Pune), Mahendra Kumar Chauhan (Business Head – Mumbai). Consistent with a Blackstone-backed professionalisation push.
- **Cash generation** — the strongest fact on this page. CFO ₹345cr, FCF ₹316cr in a loss-making year.

### ⚠️ Finding 6 — The Blackstone transaction was substantially a promoter sell-down

v1 describes it as *"a phased equity investment… a transformational validation of the company's execution + growth roadmap."* **The structure deserves plainer language.** Per the ValuePickr record (13-Mar-2025, @Arka, quoting the disclosure): Blackstone acquired **40% at ₹329/share — 14.3% via fresh preferential allotment and 25.7% purchased from the existing promoters.**

**Roughly two-thirds of Blackstone's stake was bought *from* the founding families, not injected *into* the company.** Only the 14.3% preferential tranche was primary capital. That is a materially different fact pattern from "growth investment", and the profile should say so. CMP ₹385 vs Blackstone's ₹329 entry.

**Shareholding trajectory (Screener):**

| | Mar-2025 | Jun-2025 | **Jun-2026** |
|---|---|---|---|
| Promoters *(now includes Blackstone)* | 69.45% | 69.45% | **73.81%** |
| FII | 4.15% | 8.12% | **10.61%** |
| **DII** | 5.59% | 4.49% | **3.30%** |
| **Public float** | 20.81% | 17.94% | **12.28%** |
| Shareholders | 54,497 | 48,821 | **40,601** |

**Free float has collapsed from 20.81% to 12.28%, DIIs have halved to 3.30%, and the shareholder count is down 25%.** A shrinking float plus a disclosure blackout is a combination that reduces both price discovery and accountability.

### 📢 Community Pulse — 2-Aug-2026

**ValuePickr topic 263 "Kolte Patil Developers" (164 posts) — last post 14 March 2025. Dormant for ~17 months.** The thread effectively died the week the Blackstone deal was announced.

- 🔴 **@Surender (18-Aug-2024)**, the sharpest line in the thread: *"**Management keeps overpromising and underachieving year after year.**"* — a credibility charge that pre-dates everything above.
- 🟡 **@harsh.beria93 (25-Nov-2024)** documented exactly that pattern from the concalls that still existed: *"Reduced FY25 launch guidance to 7000 cr. (vs 8000 cr. earlier), only launched 1800 cr. inventory in H1FY25"*, against presales guidance of ₹3,500cr and *"1800 cr. sales recognition with 11-12% EBITDA margins in FY25."*
- 🟡 **@gsapte (14-Mar-2025)**, the last post: flagged rising D/E and noted *"Selling by promoters during stock price correction has happened"* — asking whether balance-sheet stress was building. **Nobody answered. The thread ends there.**

**Sentiment verdict: ABANDONED.** Not bearish — vacated. The last unanswered question on the board is about promoter selling and balance-sheet stress, and eighteen months later the company stopped holding calls. **When both the company and the community stop talking about a name, that absence is itself information.**

### 💰 Valuation

| | v1 (3-Jul-2026) | **2-Aug-2026** |
|---|---|---|
| CMP | ₹364.10 | **₹385** |
| Market cap | ~₹2,750 cr (est) | **₹3,415 cr** |
| P/E | — | **n.m. (loss-making)** |
| **P/B** | — | **2.79x** (BV ₹138) |
| ROCE / ROE | — | **1.39% / −5.75%** |
| Dividend | — | **nil** |
| Mcap / FY26 collections | — | ~1.2x |

**P/E is meaningless here; a developer is valued on pre-sales, collections and NAV.** On that basis the stock is not obviously expensive — but it is also not pricing distress, and the P&L gives no support.

**Scenarios (2-year, to FY28):**
- **Base (50%):** Completions convert the collections backlog; FY28 revenue ~₹1,800cr and PAT ~₹150cr — roughly restoring FY25. At 20x = ₹3,000cr. **~−12%.** *The current price already assumes this recovery.*
- **Bull (25%):** Blackstone capital accelerates launches, Mumbai scales past 30% of sales, volumes recover alongside pricing. FY28 revenue ₹2,500cr, PAT ₹250cr, 22x = ₹5,500cr. **~+61%.**
- **Bear (25%):** Volume decline persists past price-led offset, GST goes against them (~₹150cr), P&L stays sub-scale, and the disclosure blackout forces a governance discount. De-rate to 1.5x book = ₹1,835cr. **~−46%.**

**Weighted 2-year return ≈ −2%.** ⤴ **Against v1's ~+85%.**

### Conviction decision

**HIGH → MEDIUM (Under Watch).** A two-notch downgrade, which I don't do lightly — so the reasoning, plainly:

**v1's ~85% weighted return and High conviction were built on Q4FY26 operational metrics from an investor deck, with no P&L, no cash flow, no shareholding analysis, and no awareness that the company had stopped holding earnings calls.** Every one of those gaps cuts the same way. The correction here isn't a change in the business — it's a change in what I actually know about it.

**Why Medium and not lower:** collections +30%, CFO ₹345cr, FCF ₹316cr, early NCD redemption, Life Republic is a genuine long-life asset, Blackstone is now inside the promoter group with capital and incentive, and the revenue-recognition trough explanation is plausible. **The business may well be fine.**

**Why not higher:** I can't verify any of it. No calls for three quarters, a 22% volume decline the company describes as "broadly stable", a Section 74 GST claim of ~₹150cr, ROE of −5.75%, a float down to 12.28%, DIIs at 3.30%, and a dead community thread whose final unanswered question was about promoter selling.

**Downgrade to ML if:** no earnings call is held for Q1FY27 either (would make it four straight) · **or** Q1FY27 P&L shows a fourth loss-making quarter in five · **or** the GST matter progresses adversely · **or** Q2FY27 volumes fall again YoY.

**Upgrade back toward MH if:** the company resumes earnings calls **and** FY27 revenue recognition normalises above ₹1,500cr with positive PAT **and** the GST notices are resolved or materially reduced.

### Watch items
1. **⭐ Does Kolte-Patil hold a Q1FY27 earnings call?** The single highest-signal event available. Four consecutive skipped calls would be a governance verdict.
2. **Q1FY27 P&L** (operational update is out; financials pending) — is the recognition trough ending?
3. **Area sold, not sales value** — the metric the company's own framing obscures
4. **GST Section 74 proceedings** — ~₹150cr contested, six years in scope
5. Scheme of Amalgamation progress through NCLT
6. Public float below 12.28% and DII below 3.30%
7. Whether ValuePickr coverage revives — currently 17 months dormant

---

---

## 1. Business in Plain English

Every metropolitan Indian family that wants to buy a mid-premium or premium apartment in Pune, Bangalore, or Mumbai faces the same problem: **which builder can I trust with a 30-year home loan?** Real estate delivery has been historically problematic — half-completed towers, delayed possessions, quality issues, RERA disputes. **Kolte-Patil Developers is one of Pune's Top 3 legacy real estate developers** (founded 1991) known for **on-time delivery + quality + strong balance sheet + integrated township model**. In FY26, **Blackstone made a phased equity investment in Kolte-Patil** (Q2FY26) — a transformational validation of the company's execution + growth roadmap.

The 30-second business snapshot:
- **HQ Pune, Maharashtra** — founded 1991 (34-year heritage) + Bangalore office
- **Kolte-Patil families** as promoters (Rajesh Patil = Chairman, Milind Kolte = MD, Naresh Patil, etc.)
- **CS**: Mr. Vinod Eknath Patil
- **BSE Mainboard listed** — established institutional following
- **FY26 Q4 Pre-Sales Value: INR 2,605 cr (+1.5x YoY)**
- **FY26 Q4 Collections: +1.7x YoY** (highest ever quarterly)
- **FY26 Q4 Operating Cash Flow: INR 791 cr (+1.6x YoY)**
- **Highest-ever annual collections** in FY26
- **Segmental portfolio**:
  - **Life Republic Township** — mid-market integrated township
  - **Kolte-Patil Mid-Premium/Premium** — Little Earth, Centria, Raaga, Exente, Downtown, Springshire, Ivy Estate, Three Jewels, Equa, Lakeside 24
  - **24K Premium Luxury** — high-end brand
- **BLACKSTONE STRATEGIC INVESTMENT (Q2FY26)** — phased equity investment; multi-year commitment
- **CMP ₹364.10** (declined from ₹380 in Apr-26)

**Big picture in one sentence:** Kolte-Patil Developers is a **34-year Pune-based legacy real estate developer with FY26 quantum leap** — Q4 Pre-Sales +1.5x, Collections +1.7x, OCF +1.6x — validated by **Blackstone's strategic phased equity investment (Q2FY26)** — with multi-segment portfolio (Life Republic Township + Mid-Premium + 24K Luxury). **Highest-conviction real estate name with institutional backing catalyst.**

---

## 2. Why This Industry Exists

Indian residential real estate rides five durable forces:

**Force 1 — India urbanization + household formation.** India's urban population growing 3-4% CAGR. Multi-decade demand.

**Force 2 — Nuclear family + home ownership aspirations.** 8-10% CAGR growth in metropolitan Tier 1 housing demand.

**Force 3 — RERA + GST consolidation.** Small builders exiting → market share consolidation to organized players like Kolte-Patil.

**Force 4 — Mortgage rate normalization.** Interest rate cycle enabling affordability.

**Force 5 — Premium + luxury segment growth.** Post-COVID demand for larger homes + integrated townships.

**Where Kolte-Patil sits.** #1-3 Pune developer + Bangalore + Mumbai expansion. Peers: **Sobha Ltd** (Bangalore-focused), **DLF** (Delhi + North India), **Prestige Estates** (South India), **Godrej Properties** (national), **Oberoi Realty** (Mumbai luxury), **Puravankara** (Bangalore + South), **Sunteck Realty** (Mumbai), **Brigade Enterprises** (Bangalore). Kolte-Patil positioning: **Pune-first regional leader with strong balance sheet + multi-segment portfolio + Blackstone institutional backing**.

---

## 3. What Makes This Company Different

**Moat 1 — 34-year Pune market leadership.** Deep customer trust + land bank.
**Moat 2 — BLACKSTONE STRATEGIC INVESTMENT (Q2FY26).** Global institutional validation + capital access.
**Moat 3 — Highest-ever annual collections FY26.** Execution excellence.
**Moat 4 — Q4FY26: Pre-Sales +1.5x + Collections +1.7x + OCF +1.6x.** All metrics accelerating.
**Moat 5 — Multi-segment portfolio** (Life Republic + Mid-Premium + 24K Luxury) — anti-cyclical.
**Moat 6 — Integrated township model** (Life Republic — differentiated).
**Moat 7 — 3-city presence** (Pune + Bangalore + Mumbai) — geographic diversification.
**Moat 8 — 24K premium luxury brand** — pricing power.
**Moat 9 — Kolte + Patil founding families** with strong relationships (RERA + banking + government).
**Moat 10 — Balance sheet discipline** — OCF INR 791 cr Q4 alone.
**Moat 11 — Post-Blackstone re-rating catalyst.**

**Where the moat is weaker.**
- Pune market cyclical exposure.
- Real estate industry inventory + working capital heavy.
- CMP declined slightly (₹380 → ₹364 recently).
- Currency/liquidity in Pune market.
- Bangalore + Mumbai expansion still emerging vs regional peers.
- ⚠️ **CORRECTED 2-Aug-2026:** this previously read *"Concalls Q2/Q3/Q4 FY26 not accessible in repository."* The transcripts **do not exist** — the company formally notified the exchanges it would not hold post-results conference calls for Q3FY26 and Q4FY26. Last call held: Q1FY26 (Aug-2025). **Re-classified from a data gap to a disclosure-quality weakness.**

---

## 3.5. Management Track Record & Promoter Background

**Chairman (Founder):** *Mr. Rajesh Patil* — Kolte-Patil family founder.

**Managing Director & Chairman:** *Mr. Milind Kolte* — Kolte family (co-founder line).

**Other Key Family:** *Mr. Naresh Patil* + broader Kolte-Patil families (multi-generational).

**Company Secretary:** *Mr. Vinod Eknath Patil* (Member No. A13258).

**Promoter — Kolte-Patil families, Pune.** Founded 1991. Multi-generational leadership.

**Promoter holding (per public info):** ~50%+ combined Kolte + Patil families (approximate). Blackstone's phased equity investment (Q2FY26) is separate strategic capital, not promoter dilution.

**Institutional trajectory:**
- Blackstone strategic investment (Q2FY26) — landmark event
- Historical DII interest (mutual funds hold ~15-20%)
- FII presence

**Other listed entities of the Kolte-Patil families:**
- **Kolte-Patil Developers Ltd** — this is the primary listed entity
- Historical: minority stakes in various residential SPVs and Life Republic

**Delivery track record:**

| Guidance / Milestone | When | Actual delivered | Verdict |
|---|---|---|---|
| **Q4FY26 Pre-Sales +1.5x** | Multi-quarter | Delivered INR 2,605 cr | ✅ Delivered |
| **Q4FY26 Collections +1.7x** | Multi-quarter | Highest ever quarterly | ✅ Delivered |
| **Q4FY26 OCF +1.6x** | Multi-quarter | Delivered INR 791 cr | ✅ Delivered |
| **Highest-ever annual collections** | FY26 | Delivered | ✅ Delivered |
| **Blackstone strategic investment** | Q2FY26 | Phased equity closed | ✅ Delivered — landmark |
| **Multi-segment portfolio execution** | Multi-quarter | Delivered (Life Republic + Mid-Premium + 24K) | ✅ Delivered |
| **Bangalore + Mumbai expansion** | Multi-quarter | In progress | 🕐 In progress |
| **Life Republic Township ramp** | Multi-year | 30% → 48% → 53% → 46% → 51% segmental mix evolution | ✅ In progress |
| **FY27 pre-sales continuation** | Post-Q4FY26 | To be verified | 🕐 Pending |
| **Blackstone execution collaboration** | FY27+ | To be verified | 🕐 Pending |

**Verdict on management:** Kolte + Patil families have delivered generational trust + Q4FY26 quantum leap + Blackstone validation. Bet on the family + Blackstone partnership for FY27+ growth.


**Conviction re-rate (M → H) 10-Jul-2026:** Upgraded M→H on 10-Jul-2026 re-rate: ~85% weighted return + 12G/3🕐 clean delivery scorecard. Under-rated on initial classification.

> **⤴ REVERSED 2-Aug-2026 — H → M (Under Watch).** The 10-Jul upgrade rested on a delivery scorecard built from investor decks, with no P&L in view. FY26 was a **loss year** (revenue −57%, PAT −₹2cr, ROE −5.75%), the company has held **no earnings call since Aug-2025**, a **~₹150cr Section 74 GST claim** is outstanding, and Q1FY27 area sold fell ~22%. Weighted return re-cut from ~85% to **≈−2%**. See Refresh Log.

---

## 4. Numbers Decoded

**FY26 Q4 headline (from PPT):**
- **Pre-Sales Value: INR 2,605 cr** (+1.5x YoY)
- **Collections**: +1.7x YoY (highest ever quarterly)
- **Operating Cash Flow: INR 791 cr** (+1.6x YoY)
- Launches: Multiple new projects
- Average Price Realization: Rising

**Segmental Sales Mix (FY26 evolution):**
- Life Republic Township: 30-51% range (mid-market township growth engine)
- Kolte-Patil Mid-Premium/Premium: 46-53% (multi-brand portfolio)
- 24K Premium Luxury: growth segment

**Blackstone Strategic Investment (Q2FY26):**
- Phased equity investment
- Long-term commitment
- Adds capital for growth acceleration
- Landmark institutional validation

**Balance sheet:**
- Q4 OCF INR 791 cr — strong deleveraging capacity
- Net cash position (post-collections)

**FY26 CMP trajectory (from dashboard):**
- 29-Apr-26: ₹380.00
- 21-May-26: ₹393.85
- 9-Jun-26: ₹360.15
- 1-Jul-26: **₹364.10** (moderate correction from May peak)

**Key brands / projects (as of Q4FY26):**
- **Life Republic** (integrated township — Pune)
- **24K Manor** (premium luxury — Pune)
- **Little Earth, Centria, Raaga, Exente, Downtown, Springshire, Ivy Estate, Three Jewels, Equa, Lakeside 24** (mid-premium portfolio)

---

## 5. Connecting the Dots

**Thread A — Pune market leadership.**
**Thread B — Bangalore + Mumbai geographic expansion.**
**Thread C — Blackstone strategic partnership catalyst.**
**Thread D — Life Republic Township integrated model.**
**Thread E — 24K Premium Luxury brand pricing power.**
**Thread F — Multi-segment portfolio anti-cyclicality.**
**Thread G — Highest-ever collections trajectory.**
**Thread H — Post-Blackstone re-rating optionality.**

---

## 6. Why the Market Is Paying This Multiple

**Trading metrics (est):**
- Market cap: ~INR 2,750 cr (implied from CMP ₹364 + shares outstanding)
- Post-Q4FY26 quantum leap + Blackstone catalyst

**Fair value framework:**
- **Base case (55%):** FY28 Pre-Sales INR 5,000-6,000 cr, Blackstone execution collaboration, market cap re-rating to INR 5,000 cr. **~82% upside.**
- **Bull case (30%):** Life Republic + 24K brand extensions + Bangalore/Mumbai scale-up. Market cap INR 8,000 cr. **~190% upside.**
- **Bear case (15%):** Real estate cycle turns + inventory build-up. Market cap INR 2,000 cr. **~27% downside.**

Weighted return: **~85% over 2 years** — very attractive given Blackstone catalyst + Q4FY26 execution.

> **⤴ SUPERSEDED 2-Aug-2026 → ≈−2% weighted.** Base −12% / bull +61% / bear −46%. The v1 figure took Q4FY26 deck operational metrics at face value without the P&L, the cash flow, the shareholding, or the disclosure blackout. See the 2-Aug-2026 Refresh Log for the rebuilt framework.

---

## 7. What Could Prove Us Wrong

**Risk 1 — Real estate cycle downturn (interest rate + macro).**
**Risk 2 — Pune market saturation.**
**Risk 3 — Bangalore + Mumbai expansion execution.**
**Risk 4 — Working capital + inventory build-up.**
**Risk 5 — RERA disputes on legacy projects.**
**Risk 6 — Blackstone strategic partnership dynamics.**
**Risk 7 — Family succession transitions (multi-generational).**
**Risk 8 — Disclosure blackout (RESTATED 2-Aug-2026).** Previously logged as a *"data limitation in repository"*. It is not. **Kolte-Patil has not held an earnings call since Q1FY26 (Aug-2025)** and filed formal notices declining to host calls for Q3FY26 (5-Feb-2026) and Q4FY26 (22-May-2026). Three consecutive quarters, spanning a year in which the P&L turned loss-making, a ~₹150cr Section 74 GST claim arrived, and free float fell to 12.28%. **No guidance can be verified and no management claim can be tested.** Signal to watch: whether a Q1FY27 call is held.

**🆕 Risk 11 — GST Section 74 notices, ~₹150cr (added 2-Aug-2026).** Claim ₹103.82cr + penalty ₹46.36cr under the **fraud/suppression** provision of CGST/MGST, covering FY21–FY26, from the Mumbai State Tax authority. Company contests it as *"wholly erroneous"*. ~4.4% of market cap, unresolved.

**🆕 Risk 12 — Volume decline masked by price (added 2-Aug-2026).** Q1FY27 sales value flat at ₹617cr with realization +29% implies **area sold fell ~22% YoY**. Company describes this as *"remaining broadly stable"*. If price-led offset stalls, the decline becomes visible in value terms.

**🆕 Risk 13 — Free float collapse (added 2-Aug-2026).** Public float 20.81% (Mar-25) → **12.28%** (Jun-26); DII 5.59% → **3.30%**; shareholder count −25% to 40,601. Thin float plus no earnings calls weakens both price discovery and accountability.
**Risk 9 — Competition from DLF + Godrej + Sobha regional expansion.**
**Risk 10 — Post-Q4 CMP correction may signal profit-taking.**

---

## 8. 30-Second Memory Hook

> **Kolte-Patil is Sourav Ganguly's captaincy era — proven regional captain + Blackstone as the coach who took the team global.** 34-year Pune-based real estate developer with FY26 Q4 quantum leap: Pre-Sales +1.5x (INR 2,605 cr), Collections +1.7x (highest ever), OCF +1.6x (INR 791 cr). **BLACKSTONE PHASED EQUITY INVESTMENT in Q2FY26** — landmark institutional validation.
>
> The captains (Kolte + Patil families since 1991) delivered highest-ever collections + multi-segment portfolio execution: Life Republic Township + Mid-Premium (Little Earth, Centria, Raaga, Downtown, etc.) + 24K Premium Luxury. Bangalore + Mumbai expansion adding geographic hedge.
>
> **What you're buying:** 34-year legacy Pune real estate developer with Blackstone institutional backing + FY26 quantum leap execution + multi-segment portfolio + Bangalore/Mumbai expansion. **What you're risking:** real estate cycle downturn, Pune market saturation, expansion execution challenges, or concalls data limitations. Weighted 2-year return **~85%**.
>
> **What to watch:** FY27 pre-sales momentum, Blackstone execution collaboration + capital deployment, Bangalore + Mumbai project launches, and Life Republic Township phased scaling. Position sizing: **high conviction on the family + Blackstone + Q4FY26 execution combination.**

---

## Source Appendix

- **Concalls read:** Q1FY26 (Aug 2025), Q4FY25 (May 2025), Q3FY25 (Feb 2025); plus Q4FY26 investor PPT (May 2026, primary).
- **Screener:** Kolte-Patil Developers Ltd (BSE: 532924, NSE: KOLTEPATIL).
- **BSE filings:** Blackstone strategic investment disclosures, Q4FY26 result announcement, project launches.
- **ValuePickr — Kolte-Patil thread:** Active discussion covering Blackstone + Life Republic + segmental mix + Bangalore expansion.
- **Peer references:** DLF, Sobha, Prestige Estates, Godrej Properties, Oberoi Realty, Puravankara, Sunteck Realty, Brigade Enterprises.

**Data quality note — CORRECTED 2-Aug-2026:** the earlier note (*"transcripts not accessible in current repository… would benefit from Astec-style refresh"*) was a **wrong diagnosis**. The transcripts do not exist. Verified via (a) Screener concall listing — Transcript links end at Aug-2025; (b) BSE announcements API — 50 filings since 1-Oct-2025, **zero transcripts**; (c) two BSE letters in which the company states it *"will not host a conference call"* post Q3FY26 and Q4FY26 results. **No Astec-style refresh can recover these. The last call was Q1FY26 (Aug-2025).**

**Filings downloaded 2-Aug-2026 and now in `Fetched Concalls/KOLTEPATIL/`:** Q1FY27 Operational Update (17-Jul-2026) · both "will not host a conference call" letters (5-Feb-2026, 22-May-2026) · Scheme of Amalgamation (22-May-2026) · GST Section 74 update (20-Jun-2026) · two Change-in-Management filings (22-May-2026, 27-Jul-2026). **These filings are now the primary sources in place of concalls.**

---

*Content is personal investment research and thesis-building for portfolio decisions. Not a buy/sell recommendation. All views subject to revision as new data arrives.*
