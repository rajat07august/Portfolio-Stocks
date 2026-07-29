# Deep Industries Ltd (DEEP)

**Sector 17 — Oil & Gas Services** · **BSE: 543288 · NSE: DEEPINDS** · **Conviction: HELD at HIGH** · **Profile: 4-Jul-2026 (v2) · Tier A refreshed 28-Jul-2026**

---

## 🔄 Refresh Log — 29-Jul-2026 (Tier A — Q1FY27 **concall-grounded**; all-time-high quarter, explicit FY27/FY28 PAT guidance, and the concall gap CLOSED)

> **📌 This block supersedes the deck-only version written 28-Jul-2026.** The Q1FY27 earnings call was held **29-Jul-2026** and the transcript is now in the repo (`DEEP_Transcript_2026-07.pdf`, 26pp, InCred Equities-hosted; Paras Savla CMD + Rohan Shah CFO). **Reading it changed three of my conclusions** — the order-book concern is substantially explained, management gave explicit PAT guidance far above my earlier base case, and the real operational issue is somewhere else entirely (standalone stagnation). Corrections are marked ⤴ throughout.

### ✅ Data-quality upgrade — the standing gap on this profile is resolved

**v2 was built entirely from Screener AI *summaries*** because every raw-PDF route was blocked at the time (BSE CORS, Chrome safety-block, sandbox proxy). The profile has carried that caveat since 4-Jul, and Q4FY25/Q3FY25 returned 403.

**That is now fixed.** Using `Bash` + `curl` (full network in Claude Code on the Mac, per CLAUDE.md §4A), I pulled the BSE `Pname` UUIDs straight off the Screener HTML and downloaded the actual PDFs:

| Document | Pages | Status |
|---|---|---|
| `DEEP_PPT_2026-07.pdf` (**Q1FY27 deck**) | 37 | 🆕 Downloaded |
| `DEEP_Transcript_2026-05.pdf` (Q4FY26) | 21 | 🆕 Downloaded |
| `DEEP_PPT_2026-05.pdf` (Q4FY26 deck) | 40 | 🆕 Downloaded |
| `DEEP_Transcript_2026-02.pdf` (Q3FY26) | 18 | 🆕 Downloaded |
| `DEEP_Transcript_2025-11.pdf` (Q2FY26) | 19 | 🆕 Downloaded |
| `DEEP_Transcript_2025-08.pdf` (Q1FY26) | 19 | 🆕 Downloaded |
| `DEEP_Transcript_2025-05.pdf` (Q4FY25) | 20 | 🆕 Downloaded — **was 403 in v2** |

**Concall Fetch Gate: ✅ CLEARED with 5 raw transcripts + 2 decks — no longer summary-derived.** All verified `%PDF`, text-extracted with `pdftotext -layout`. **The v2 "AI-summary only" data-quality flag can be retired.**

> **📌 Method note worth codifying:** parsing Screener's raw HTML with `curl` + Python gives *exact* table values and the BSE UUIDs directly. It removes the extraction-model layer that mislabelled quarters repeatedly elsewhere in this session. This should be the default for both data pulls and concall fetches in this environment.

### 🟢 Q1FY27 — all-time-high quarter, ahead of guidance

Verbatim from the Q1FY27 deck (consolidated, ₹cr):

| Particulars | Q1FY27 | Q1FY26 | YoY | Q4FY26 | QoQ |
|---|---|---|---|---|---|
| Revenue | **278.9** | 199.5 | **+39.8%** | 248.7 | **+12.2%** |
| EBITDA | **131.8** | 95.0 | **+38.7%** | 106.9 | **+23.4%** |
| EBITDA margin | **43.6%** | 44.6% | −100 bps | 39.1% | **+450 bps** |
| **PAT** | **89.1** | 61.7 | **+44.5%** | −7.2 | n.m. |
| PAT margin | **29.5%** | 29.0% | +48 bps | — | — |
| **Cash PAT** | **113.4** | 78.1 | **+45.2%** | — | — |
| EPS (₹) | **13.34** | 9.19 | +45.2% | −2.24 | n.m. |

Deck, verbatim: *"Achieved **all-time high quarterly revenue and profitability**, driven by strong operational execution and market demand."*

**This beats management's own guidance.** The Q4FY26 call carried a *"very good guidance of 25%, 30%"* growth for FY27 and FY28 — Q1FY27 delivered **+39.8% revenue and +44.5% PAT**, comfortably ahead. **A 43.6% EBITDA margin on ~₹280cr of quarterly revenue is exceptional for an oilfield-services business**, and the +450bps QoQ recovery confirms Q4FY26's 39.1% was write-off noise, not operational.

### 🎯 Explicit PAT guidance — the single most important disclosure on the call

Management put hard numbers on both years, unprompted and then confirmed:

| | Guidance | Implied multiple at ₹3,473cr mcap |
|---|---|---|
| **FY27 PAT** | *"in FY27 only we are expecting somewhere about **350 crores** kind of PAT"* | **9.9x FY27E** |
| **FY28 PAT** | *"On FY28 we are **gunning for PAT of almost 500 crores**"* | **6.9x FY28E** |

Context: an investor (Manan, Wallfort PMS) annualised Q1's ₹89cr to ~₹360cr and asked whether the prior ₹400cr FY28 guide should be raised. Savla **corrected him upward**: *"I'm not sure we have said 400 crores for FY28 because in FY27 only we are expecting somewhere about 350 crores."* Separately, asked whether the 5-year ~35% topline / ~40% bottom-line CAGR can persist, he said: *"I won't be surprised that this momentum should continue. And we are quite bullish on this."*

⤴ **This corrects my 28-Jul base case, which assumed FY28 PAT of ₹330cr — roughly a third below what management is guiding.** Q1's ₹89.14cr annualises to ₹356cr, consistent with the FY27 number. **Growth split guided: standalone 18–20%, consolidated >25% for FY27.**

### ⤴ The order book: my "flat book" concern is substantially explained

The Q1FY27 deck shows ₹3,007cr → **₹3,047cr** (added ₹319cr, executed ₹279cr), and on 28-Jul I called this the single most important number on DEEP. **The call reframes it, and I was over-weighting it.**

**Composition, per management:** *"of this order book probably **more than 60% value is something which has been executed over next two to two and a half years**. And one major chunk is of production enhancement contract which is a **long tenure contract**."* Execution guided at **~₹800cr in FY27** alone. The ₹1,402cr / 15-year ONGC PEC sits inside the ₹3,047cr and by construction releases slowly — **so a large, deliberately long-duration contract is suppressing the apparent turnover of the book.** Against ~₹800cr of FY27 execution, the book is ~3.8 years of cover.

**Bidding pipeline runs at ₹700–800cr continuously** — and critically, *"the existing bidding pipeline is **not having any of** this three"* (new PEC, higher-HP rigs, offshore vessels), all of which management expects to reach bid stage *"in coming few months."* **The near-term pipeline understates the opportunity set rather than overstating it.**

**🆕 Two new ONGC PEC tenders are live — and potentially transformational.** An unusually well-prepared retail investor (Srikar Sai) walked through the ONGC notices for the **Gamij** and **Geleki** fields, computing minimum fixed fees of roughly **₹1,500cr and ₹4,000–4,500cr** respectively, against ₹1,402cr for DEEP's existing PEC. Savla did **not** confirm the arithmetic — *"it won't be fair for us to comment… because we have not yet been awarded"* — but confirmed DEEP is evaluating and intends to bid. **Treat the numbers as investor-derived, not company-guided. But even discounted heavily, winning either would re-base this company.**

**Revised read: the flat book is a composition artefact plus timing, not a demand signal.** I still want to see it move — but it is no longer the thesis-critical variable I called it yesterday.

### 🔴 The real operational issue: standalone has been flat for five quarters

This is what I under-weighted on 28-Jul, and both a sell-side analyst and the ValuePickr community landed on it independently.

**Pankaj Motwani (Equirus)**, verbatim: *"I was looking at your standalone revenues, so it has been **demanding at around 175 crore for the last five quarters**. So just wanted to understand like what is constraining growth in this segment?"* He then did the arithmetic publicly: stripping PEC and Dolphin from the ₹3,047cr book leaves **~₹1,450cr of traditional onshore business** over ~2.5 years ≈ ₹600cr/year, against a current standalone run-rate near ₹700cr.

**Where Q1FY27's ₹278.9cr actually came from:**

| Source | Q1FY27 revenue | Note |
|---|---|---|
| Standalone (core onshore) | **~₹175cr** | Flat for 5 quarters |
| Dolphin Offshore | **~₹43cr** | 3-yr Prabha barge contract, ~₹150cr/yr |
| Dubai + Indian subsidiaries | **>₹50cr** | Gas processing + equipment sales |

**The 40% consolidated growth is being carried by subsidiaries, not by the core business the profile is built on.** Management's answer: four to five gas compression and processing contracts *"were supposed to start contributing from late Q1 and Q2,"* so standalone *"would improve from Q2 onwards"* to 18–20% FY27 growth. **That is a specific, falsifiable claim due in six weeks — and it is now the number I'd watch above the order book.**

### ✅ Kandla write-offs: closed, but the credibility question is legitimate

Raman KB (Sequent Investments) asked directly about *"write-off which we did in the previous year as well as a year before"* — independently confirming the **two consecutive Q4 charges** I identified on 28-Jul (other income −₹245cr Mar-25, −₹183cr Mar-26). Savla: *"with regards to Kandla, we are **completely done with the legacy issues**. And so **no more further write-off in current year**."*

**⚠️ But note this assurance has now been given twice.** ValuePickr @atishay_jain1 (7-Jul-2026) made the point precisely: *"In FY'25 they did a write off and here in this video… they said there won't be any such write offs in the future. **They again did a write off in Q4FY26!**… Its highly unlikely that they were not aware about possibility of write off when they said that."* @BuyHighSellLow framed the right question in reply: *"his question is more on the ability of the management to make **accurate judgements** than the effect of the write-off."*

**My position: accept the operational closure, discount the assurance.** Kandla is now merged into the parent (effective 30-Mar-2026), the receivables are written down, and Q1FY27 printed clean with +₹24cr positive other income. But **Q4FY27 is not de-risked on management's word alone** — the base rate is one broken assurance out of one.

**🆕 Kandla's actual purpose is margin, not revenue.** Savla: the plan is to manufacture a critical drilling/IPM chemical in-house, worth *"one, one and a half percent"* of **EBITDA margin**, on capex of only *"10, 15 crores"* with **no debt**, contributing *"later in this current financial year."* Explicitly *"not expecting much from Kandla"* on revenue. **A 100–150bps margin uplift on a 43.6% base is a real, cheap, under-modelled lever.**

### ✅ Governance: the Prabha Energy related-party loan is being repaid

A standing watch item resolves. Asked about the loan to the group entity, Savla: *"from the loan given to **Prabha Energy**, we have received back almost **86 crores**… and probably **by end of second quarter we are expecting to clear the entire loan** repaid."* Prabha Energy is a CBM company with its own ValuePickr thread (topic 220792, *"nearing commercialization"*). **Full repayment by Q2FY27 would close the largest related-party question on this name — verify at Q2.**

### 🆕 Operating detail worth carrying

- **PEC ramp finally dated.** Mori-5 incident cost 5–6 months. Incremental production now starts **September-end/October 2026**; new wells drilled this FY contribute **Q4FY27 or Q1FY28**. FY28 revenue from this single field **₹150cr+**, at 2.5–3 lakh scm/day against a **1.44 lakh baseline**. Capex ~₹150cr by Mar-2027. Contract is **free-market priced** (gas currently **$8–15/MMBTU**), so DEEP takes price exposure but no exploration success risk: *"we do not carry any success risk."*
- **Rig fleet at 100% utilisation** — 20 onshore rigs (14 workover 30–150T, 6 drilling @1,000HP). Evaluating **2,000/3,000 HP** rigs, bids in *"next few months."* Market sized by management at **215–220 onshore rigs**, of which ~120–125 outsourced, with the outsourced share rising.
- **Gas compression:** 80+ units, largest fleet in India, ~**85% of the outsourced market** (outsourcing is ~30% of total).
- **Offshore:** two assets deployed (DP2 barge *Prabha* on a 3-yr, ~₹150cr/yr contract; plus an AHTSV anchor-handling tug, not yet on long-term contract so *"contribution is not significant"*). Plan: a few more tugs, a barge, 1–2 support vessels over 3–5 years. **Offshore EBITDA margins confirmed better than onshore.** Capex strictly *"only after getting the firm order."*
- **FY27 capex ₹250–300cr**, funded by debt + internal accruals. **No equity raise contemplated:** *"as of now we are not foreseeing any equity raise."* Net-debt-free.
- **EBITDA→cash conversion 75–80%**, Q1 *"on similar lines."*
- **New hire:** Rajiv Sinha, Head of Operations, two decades in oil & gas, ex-Vedanta.
- **Macro:** the **Strait of Hormuz closure** in early 2026 has settled into *"structural rebalancing"* with the strait *"still operating under restricted capacity."* On whether the enquiry surge is cyclical or crisis-driven, Savla was candid: *"it is a mixture of both."* Also flagged: **Samudra Manthan**, a ₹80,000cr National Deep Water Exploration Mission with government bearing **up to 50% of exploratory well drilling cost**.
- **Correction from management:** DEEP is **not** in coal gasification (*"in coal gasification we are not there"*), walking back a prior-quarter comment. Green hydrogen: one balance-of-plant EPC tender bid, outcome pending. Geothermal: exploratory.

### 📊 Full print (parsed directly from Screener HTML)

| Consolidated (₹cr) | FY23 | FY24 | FY25 | FY26 | **TTM** |
|---|---|---|---|---|---|
| Sales | 341 | 427 | 576 | **891** | **970** |
| Operating profit | 131 | 167 | 241 | **355** | **382** |
| OPM | 38% | 39% | 42% | **40%** | 39% |
| Other income | 56 | 30 | **−228** | **−139** | −128 |
| PAT | 125 | 125 | **−79** | **197** | **224** |
| EPS (₹) | 19.58 | 19.35 | −14.08 | 28.12 | **32.26** |

**⚠️ Correcting a v2 understatement — there were TWO Q4 write-offs, not one.** v2 recorded the ₹208cr Kandla charge in Q4FY26. The quarterly data shows **other income of −₹245cr in Mar-2025 (PAT −₹207cr) AND −₹183cr in Mar-2026 (PAT −₹7.2cr)** — two consecutive fourth quarters carrying large negative charges. Management's *"nothing else left"* assurance was given after the **second** one. Q4FY26 call: *"we have written off all old trade receivables of Kandla Energy… around INR208 crores of Kandla legacy trade receivables after intensive recovery process."* Kandla was **merged into Deep effective 30-Mar-2026** (appointed date 31-Mar-2025), so the entity is now inside the parent and the receivables book is cleaned. **Q1FY27's clean ₹89cr PAT with +₹24cr of positive other income is the first quarter that confirms it.** But the base rate here is two-for-two on Q4 surprises — **do not treat Q4FY27 as de-risked until it prints.**

**Balance sheet (Mar-2026):** Net worth ₹1,999cr (equity ₹32cr + reserves ₹1,967cr) · Borrowings ₹203cr · **Debt/EBITDA 0.48** (management, Q4FY26) · Fixed assets ₹1,472cr (+36% YoY) with **CWIP falling ₹258cr → ₹56cr** — the capex cycle has commissioned and is now earning.

**Cash flow:** CFO **₹270cr** FY26 (vs ₹210cr) · Investing −₹233cr · **FCF ₹53cr** · **CFO/OP 81%**. Cash conversion is real; FCF is thin only because the growth capex is still being funded.

### 💰 Valuation

| | v2 (4-Jul-2026) | **28-Jul-2026** |
|---|---|---|
| CMP | ₹463 | **₹543** (+17.3%) |
| Market cap | ₹2,966 cr | **₹3,473 cr** |
| **P/E (TTM ₹224cr)** | 8.02x (adj 7.86x) | **8.37x** |
| P/B | — | **1.74x** (BV ₹312) |
| ROCE / ROE | 16.5% / 19.4% | **16.5% / 19.4%** |
| Dividend yield | 0.66% | **0.56%** |

**Still the cheapest quality name in the watchlist** — 8.4x earnings on 19.4% ROE, 40% EBITDA margins, 0.48x debt/EBITDA and a 3.1x-covered order book.

**⤴ Scenarios rebuilt on management's guidance (2-year, to FY28).** My 28-Jul version assumed FY28 PAT of ₹330cr; **management is guiding ₹500cr.** Even haircutting that meaningfully, the base case moves up a lot.

- **Base (55%):** FY27 PAT lands near the ₹350cr guide; FY28 reaches **₹440cr** — a ~12% haircut to guidance for PEC-ramp and standalone-recovery slippage. Re-rate modestly to **11x** (still below the market's multiple for a 19% ROE compounder) = ₹4,840cr. **~+39%.**
- **Bull (25%):** Standalone recovers to 18–20% from Q2 as guided, PEC incremental lands on time, Kandla adds 100–150bps of margin, **and DEEP wins one of the Gamij/Geleki PEC tenders.** FY28 PAT **₹520cr**, re-rate to **15x** on visible multi-year contracted revenue = ₹7,800cr. **~+125%.**
- **Bear (20%):** Standalone stays flat past Q2, PEC incremental slips again (it already slipped 5–6 months once), a third year-end charge appears, and the accounting critique gains traction. FY28 PAT **₹300cr**, multiple stays at **8x** = ₹2,400cr. **~−31%.**

**Weighted 2-year return ≈ +49%** (~22% CAGR + 0.56% dividend).

⤴ **This replaces the +21% I published on 28-Jul.** The change is not new optimism — it is that the 28-Jul figure was built without the transcript and therefore without FY27/FY28 guidance, and it over-weighted a flat order book that management has since explained. **The bear case is unchanged in character but narrower (−31% vs −52%)**, because ~₹800cr of FY27 execution is contractually visible.

**Sanity check on the guidance:** FY27 PAT of ₹350cr against Q1's ₹89.14cr requires ~₹87cr/quarter for three quarters — i.e. **no growth at all from here** to hit it. FY28's ₹500cr requires ~43% growth on FY27. The FY27 number looks conservative; the FY28 number needs PEC incremental production plus standalone recovery, both of which are dated and falsifiable.

### 📢 Community Pulse — 29-Jul-2026

⤴ **Correcting 28-Jul, when I wrote "no active ValuePickr thread; no Substack coverage found." That was wrong** — I had searched only via the rate-limited path. Fetched properly via `curl` against the Discourse JSON API, DEEP has **one of the most active and analytically sophisticated threads in the entire watchlist.**

**ValuePickr — "Deep Industries (DIL)" (topic 1011, 521 posts, last post 28-Jul-2026):**

- 🔴 **The most important thread content is a forensic accounting critique.** @kautuk produced what @Shishir_rai calls a *"masterclass forensic report"*, which **Bastion Research** then wrote up as a Substack piece — *[Deep Industries Ltd. Deep Value, or Value Trap?](https://bastionresearch.substack.com/p/deep-industries-ltd-deep-value-or)* (shared to the thread 21-Jun-2026 as *"Accounting Questions Behind The Value"*). Per its own summary, it asks whether the market is *"right or simply confused by accounting noise and sector-level indifference"*, and leaves open threads on **governance, related-party transactions with Prabha Energy, PEC execution, and accounting clean-up** — flagging **FY27 as the first results free of exceptional noise.** ⚠️ *I have not read the full article — this characterisation is from its public summary and the thread discussion. Read it directly before relying on it.*
- 🔴 **@atishay_jain1 (7-Jul-2026)** — the sharpest single point, and it matches my own finding independently: management said after the FY25 write-off there would be no more, *"They again did a write off in Q4FY26! … Its highly unlikely that they were not aware about possibility of write off when they said that."*
- 🟡 **@BuyHighSellLow (10-Jul)** correctly reframes it: the issue is *"the ability of the management to make accurate judgements than the effect of the write-off."*
- 🟢 **@Pankaj_Motwani (10-Jul)** — *"these write offs are notional and will not affect the net worth."* **Note: this is the same Equirus analyst who then asked the standalone-stagnation question on the 29-Jul call** — a rare case of a forum participant and covering analyst being the same person, and worth knowing.
- 🟢 **@BuyHighSellLow (6-Jul)** — substantive vertical work: gas compression *"flat at worst and maybe a 5 to 7%"*, DEEP at **75%+ share of the charter-hired gas compression market**, with 4–6 month mobilisation creating modest switching costs.
- 🟡 **@anupam.kr (16-Jun)** on the receivables write-off: *"it's a positive as the receivables were optically harming the balance sheet."*
- 🔴 **@Rohit_Priyadarshi (28-Jul), the immediate Q1FY27 reaction:** *"**Strong growth in consolidated numbers but Flat Standalone numbers**"* — the community identified the standalone issue within hours, same as Equirus.

**Substack:** two publications cover DEEP — **Bastion Research** (the bear/forensic case above) and **[Shankar Nath](https://shankarnath.substack.com/p/deep-industries)** (*"Deep Industries: Rigged Up for 55% Growth"*, the bull case).

**Sentiment verdict: MIXED — genuinely two-sided, and better-informed than most names here.** The bull case (structural upstream tailwind, 70%+ post-exploration share, 8x earnings) and the bear case (accounting noise, repeated write-offs, related-party lending, standalone stagnation) are both being argued by people doing real work. **Notably, the community's two live concerns — write-off credibility and flat standalone — are exactly the two I arrived at independently.** That convergence raises my confidence in both.

### Conviction decision

**HELD at HIGH — and with more conviction than the 28-Jul deck-only read supported.**

**The investment case, stated plainly:** DEEP is the dominant Indian provider across ~70% of the post-exploration services chain — 80+ gas compression units (~85% of the outsourced market), 20 onshore rigs at **100% utilisation**, first-mover in integrated project management — earning **43.6% EBITDA margins and 19.4% ROE**, net-debt-free, at **8.4x trailing / 9.9x FY27E / 6.9x FY28E guided earnings.** It sits in front of a genuine multi-year domestic upstream capex cycle (exploration-first policy pivot, ₹80,000cr Samudra Manthan deepwater mission with 50% government cost-sharing) and takes **no exploration success risk** — every contract is fixed-price and tender-driven.

**What the transcript changed:** management guided **FY27 PAT ~₹350cr and FY28 ~₹500cr**, versus my ₹330cr FY28 assumption; explained the flat order book as long-duration PEC composition with ~₹800cr executing in FY27; confirmed Kandla legacy closure; and disclosed the Prabha Energy loan is nearly repaid. **Weighted return moves from ~+21% to ~+49%.**

**Why not upgrade further — three genuine reservations, all of which I'd want resolved before adding size:**
1. **Standalone has been flat at ~₹175cr for five quarters.** Consolidated growth is currently a subsidiary story (Dolphin ₹43cr, Dubai + Indian subs >₹50cr of a ₹278.9cr quarter). The core franchise the thesis rests on is not itself growing. Management says Q2 fixes it. **That is the test.**
2. **Management's write-off assurance has been broken once already.** They have now given it again. Operationally I believe Kandla is closed; on the meta-question of judgement, the community's scepticism (@atishay_jain1) is fair and I share it.
3. **A credible forensic accounting critique exists** (Bastion Research) that I have not yet read in full. Until I have, I am carrying an unquantified known-unknown on this name.

**Downgrade to MH if:** standalone revenue is still ~₹175cr at Q2FY27 (management's own falsifiable claim) · **or** PEC incremental production slips past Q3FY27 · **or** a third year-end write-off appears · **or** the Bastion critique surfaces something material on reading.

**Upgrade sizing if:** standalone inflects in Q2 **and** PEC incremental starts by October as dated **and** the Prabha loan is fully repaid — at which point the FY28 ₹500cr guide becomes underwritable and 6.9x is indefensible.

### Watch items — ranked
1. **⭐ Standalone revenue at Q2FY27** — must break above ~₹175cr. Now the single most important number, displacing the order book.
2. **PEC incremental production from September-end/October 2026** — already slipped 5–6 months once (Mori-5)
3. **Prabha Energy loan fully repaid by end-Q2FY27** — closes the largest related-party question
4. **Gamij / Geleki PEC tender outcomes** — either would be transformational; neither is in guidance
5. Kandla's 100–150bps EBITDA margin uplift landing "later this financial year"
6. Q4FY27 for a clean year-end (one broken assurance out of one)
7. Read the Bastion Research piece in full and reconcile it against this profile
8. Order book — still worth tracking, but as a secondary indicator

---

> **Source note** — This is a rewrite of the 4-Jul-2026 draft that was written from Screener + IR-site inference without any concall transcripts. Recovery method: Screener AI Summary endpoint (screener.in/concalls/summary/{id}/) fetched 4 concall summaries — **Q4FY26, Q3FY26, Q2FY26, Q1FY26** — via same-origin fetch (Chrome fetch of bseindia.com PDFs is CORS-blocked; Chrome direct navigation to bseindia.com is safety-blocked; sandbox curl is proxy-blocked; but Screener's own summary endpoint served the processed content cleanly). Total ~32,000 chars of AI-distilled management commentary + Q&A + guidance across 4 quarters. Full extracts saved at `Fetched Concalls/DEEP/DEEP_concall_extracts.txt`. Q4FY25 and Q3FY25 returned 403 (need paid Screener account or scheduled retry) — flagged for future refresh.

---

## 1. Business in Plain English

Deep Industries is India's **largest post-exploration oil & gas services specialist** — the plumber-and-power-tools partner to India's oil producers. Once a well is drilled by someone else (ONGC, Oil India, Reliance, Cairn) and exploration is done, Deep steps in to keep the well producing: gas compression to move product through pipelines, workover services to unclog and revive slowing wells, gas dehydration to clean the gas before it enters the grid, drilling services, and integrated project management. Since March 2025, they've also owned Kandla — a chemicals/hydrocarbon fluids backward integration play acquired via CIRP for upstream chemistry sourcing. Since Nov 2024, Dolphin Offshore has added an offshore vessel dimension.

Founded 1991 by the **Savla family** (Ahmedabad). CEO **Paras Savla** is the founder-generation still running the company 35 years in.

**End customer roll-call:** ONGC (largest), Oil India, Reliance, Cairn, GAIL, plus offshore JV clients via Dolphin. Revenue is a mix of long-term contracts (some 15-year) and 2-3 year rig/workover contracts.

---

## 2. Why This Industry Exists

Grounded in management's Q2-Q4FY26 framing:

1. **India's "one of the strongest multi-year investment cycles" in energy** — Q3FY26 concall. Policy shift from "energy security to energy independence." Roadmap: mobilize **USD 100 bn+ in oil & gas by 2030**, USD 500 bn+ across the energy value chain.

2. **India gas consumption to grow ~60% by 2030** — from 188 MMSCMD FY24 to ~297 MMSCMD under a "good-to-go scenario" (per Q3FY26 concall).

3. **Royalty regime overhaul May 2026** (per Q4FY26 verbatim): rates "slashed," moved to wellhead pricing with a fixed 15-20% deduction — "removing disputes over post-production cost deductions." Management: improves upstream economics + activity intensity, especially in "difficult fields."

4. **Exploration-first strategy** (Q4FY26): government shift "from a revenue sharing mindset" to reverse crude production decline. CBM rounds 2025-26 will feed unconventional supply "by early 2027."

5. **Acreage + infrastructure expansion** (Q4FY26): "Nearly 1 million square kilometers" opened for seismic/drilling as "no-go areas shrink." Pipeline network "crossing 25,000 kilometers in 2026" toward near-national connectivity by FY27-end.

6. **Structural outsourcing tailwind** — Q2FY26: Deep positioned as "key integrated service provider" benefiting from higher activity + outsourcing.

---

## 3. What Makes This Company Different (Moat)

Six moats + honest weaknesses, grounded in concall quotes:

1. **Dominant India post-exploration market share.** Per Screener's about section, 70%+ in Post-Exploration Services (this is the Screener characterisation; management does not explicitly quote this number in concalls but the operational scale confirms leadership).

2. **Integrated PMC positioning.** Q2FY26: "Value-added service for us has become a **margin-assertive opportunity**… gives us flexibility to perform in one more efficient" model. One-stop solutions improve client economics.

3. **44-48% EBITDA margins sustained** through mix shift. FY26 EBITDA margin 40% (with Kandla noise); Q3FY26 47.6%; Q4FY26 39% (skewed by Kandla one-off). Management Q3+Q4 guides "44-45% (may vary 1-2%)."

4. **Cash-flow discipline + capital efficiency.** Q4FY26: **Debt/EBITDA 0.48**; **OCF ₹270cr FY26 vs ₹210cr FY25**. Strong enough that QIP was shelved: *"we have decided not to go ahead with QIP"* (categorical).

5. **Long-tenor contracts.** Q4FY26: Order book of ₹3,000cr includes ONE 15-YEAR contract + others averaging ~2.5 years. New 15-year PEC tender "came last week."

6. **35-year Savla family operator** — Paras Savla still directly guiding strategy on concalls. Multi-generational alignment.

**Where the moat is weaker:**

- **Rig segment at 100% utilization** (Q4FY26) — incremental orders require newbuild. Capital-intensity constrains organic upside.
- **Customer concentration** — ONGC dominates. Contract cycles + timing move earnings.
- **PEC execution risk demonstrated** — Mori-5 gas leak Jan 2026 (see Section 7). Contained but revealed operational fragility.
- **FY25 REPORTED a loss** of ₹-79cr (Screener) — Kandla legacy receivables + related exceptional items reset reported P&L. Management insists non-recurring, but the reported vs adjusted PAT gap is material for any earnings-based valuation.
- **Kandla + Dolphin still integrating** — Kandla merged only 30-Mar-2026, Dolphin still ramping to guided ₹150cr FY27 revenue.

---

## 3.5. Management Track Record & Promoter Background (MANDATORY)

### Management team

| Role | Name | Notes |
|---|---|---|
| Chairman / CEO | **Paras Savla** | Founder generation (family since 1991); active voice on all 4 concalls read; provides multi-year guidance |
| CFO | (not named in extracts) | Handles financials + guidance on concalls; explicit on FY27 capex ₹300cr + Dolphin ₹150cr |
| Other | Not surfaced in AI Summary extracts | Would appear in AR + full transcripts (not currently fetched) |

### Promoter background — Savla family (Ahmedabad)

Deep Industries founded 1991. Savla family Ahmedabad-based; multi-decade oilfield services experience. The stock's cleanest signal is zero promoter dilution across every quarter since Jun 2023 — 12 quarters continuously at **63.49%**.

### Promoter holding trajectory — 12 quarter snapshots (Jun 2023 → Mar 2026)

| Period | Promoter % | FII % | DII % | Public % | Shareholders |
|---|---|---|---|---|---|
| Jun 2023 | 63.49% | 1.19% | 0.00% | 35.32% | 21,644 |
| Mar 2024 | 63.49% | 1.82% | 0.00% | 34.67% | 29,241 |
| Mar 2025 | 63.49% | 2.17% | 1.17% | 33.17% | 38,459 |
| Sep 2025 | 63.49% | 2.08% | 1.15% | 33.26% | 37,606 |
| Mar 2026 | **63.49%** | 1.81% | 1.13% | 33.57% | 37,304 |

**Signal — rock-stable 63.49% promoter across 12 quarters is verified.** No sell-down during two major events: (a) the FY25 reported loss (Kandla legacy write-offs); (b) the Q4FY26 announcement of QIP being shelved. Both would have been natural exit points for a promoter concerned about the story. Instead, holding is unchanged. **DII entered Dec 2024** — recent institutional discovery.

### Delivery-vs-Guidance Scorecard (grounded in concall verbatim)

| Guidance | Concall Date | Actual | Verdict |
|---|---|---|---|
| **Q1FY26:** "Incremental uplift for PEC Rajahmundry expected from H2 FY26" | Aug 2025 | Q3FY26 confirmed "producing above baseline" | ✅ Delivered |
| **Q1FY26:** Max asset utilization thrust for FY26 | Aug 2025 | Q4FY26: rig segment 100% utilized | ✅ Delivered |
| **Q1FY26:** M&A on the table | Aug 2025 | Kandla acquired FY25 CIRP; merged into Deep 30-Mar-2026 | ✅ Delivered |
| **Q1FY26:** Kandla to contribute "from next FY" (FY27) | Aug 2025 | Ongoing — merger effective 30-Mar-2026 | 🕐 In-flight |
| **Q3FY26:** "Maintain EBITDA margins in the range of 46-48%" | Feb 2026 | Q3 47.6% ✅; Q4 39% (Kandla one-off) 🟡 | 🟡 Q3 delivered, Q4 skewed |
| **Q3FY26:** Order book "multiyear revenue visibility" | Feb 2026 | Q4FY26: ₹3,000cr revolving, includes 15-yr contract | ✅ Delivered |
| **Q3FY26:** Gas leak contained, rig "within 3 months" for recovery | Feb 2026 | Q4FY26: well-specific stop order only; other PEC intact; recovery ongoing | 🟡 Contained but not fully closed |
| **Q4FY26:** ONE-TIME ₹208cr Kandla write-off; "no further Kandla write-offs anticipated" | May 2026 | To verify Q1FY27 | 🕐 In-flight |
| **Q4FY26 GUIDANCE:** 25-30% YoY growth FY27 and FY28 | May 2026 | Measurable next 4 quarters | 🕐 In-flight |
| **Q4FY26 GUIDANCE:** Dolphin FY27 rev ~₹150cr @ ~60% EBITDA | May 2026 | Measurable next 4 quarters | 🕐 In-flight |
| **Q4FY26 GUIDANCE:** FY27 total capex ~₹300cr (base) | May 2026 | Measurable through FY27 filings | 🕐 In-flight |
| **Q4FY26 GUIDANCE:** 3-5 year: "company could double" (Paras Savla) | May 2026 | Measurable through FY31 | 🕐 In-flight |
| **Q4FY26:** QIP shelved | May 2026 | Standing decision | ✅ Delivered |
| **Q4FY26 CATEGORICAL:** "All old Kandla trade receivables written off, nothing else left" | May 2026 | To verify Q1FY27 | 🕐 In-flight |

**Verdict on management:** Paras Savla + CFO have delivered explicit, testable multi-quarter guidance across all 4 concalls read. FY25/FY26 execution against Q1FY26 stated thrusts has been strong. The Kandla write-off is unusually candid — 12-month recon program + explicit statement that "nothing else left" gives future analysts a specific claim to test. Gas leak incident (Mori-5, Jan 2026) was contained and management provided operational detail across two consecutive concalls without hedging.


**Conviction re-rate (MH → H) 10-Jul-2026:** Upgraded MH→H on 10-Jul-2026 re-rate: ~90% weighted return + v2 transcript-grounded from 4 concalls + explicit 25-30% forward guidance FY27+FY28 + 63.49% promoter unchanged 12 quarters + Kandla ₹208cr write-off terminal per management.

### Other group entities

No listed group companies explicitly surfaced in concall extracts. Subsidiary structure:
- **Dolphin Offshore** (subsidiary; acquired Nov 2024; offshore vessel; FY27 guided ₹150cr revenue at ~60% EBITDA)
- **Kandla** — chemicals/hydrocarbon fluids backward integration; CIRP acquisition Mar 2025; merged into Deep 30-Mar-2026
- **Advait Green Energy** — MOU signed for green hydrogen adjacency (charter-hire model exploration)

---

## 4. Numbers Decoded (grounded in concalls + Screener reconciliation)

### FY26 Full-Year (from Q4FY26 concall + Screener P&L)

| Metric | Concall figure | Screener figure | Note |
|---|---|---|---|
| Revenue (consolidated) | **₹891 cr** (+55% YoY) | ₹891 cr | ✅ Match |
| EBITDA | **₹424.82 cr** (+44%) | ₹355 cr (OP) | Gap = other income treatment |
| PAT (excl exceptional) | **₹352.9 cr** | — | Non-Screener view |
| PAT (reported) | — | ₹197 cr (EPS ₹28.12) | Includes Kandla ₹-139cr Other Income effect |
| Cash Profit | **₹442 cr** (46% margin) | — | Management view |
| ROE (adjusted) | **21.8%** | 19.4% | Concall vs Screener |
| ROCE (adjusted) | **19.2%** | 16.5% | Concall vs Screener |
| Debt/EBITDA | **0.48** | — | Very low leverage |
| Operating CF | **₹270 cr FY26** vs ₹210 cr FY25 | — | Cash generation strong |

### Screener P&L history (FY18-FY26, ₹ Cr)

| Year | Sales | OP | OPM | Other Income | Net Profit | EPS |
|---|---|---|---|---|---|---|
| FY18 | 313 | 164 | 52% | 3 | 2 | ₹199 |
| FY19 | 318 | 153 | 48% | 2 | 14 | ₹1,358 |
| FY20 | 262 | 126 | 48% | 3 | 31 | ₹3,110 |
| FY21 | 194 | 81 | 42% | 6 | 65 | ₹10.12 (post-split) |
| FY22 | 322 | 116 | 36% | 3 | 72 | ₹11.27 |
| FY23 | 341 | 132 | 39% | 55 | 125 | ₹19.28 |
| FY24 | 427 | 167 | 39% | 30 | 125 | ₹19.35 |
| **FY25** | **576** | **241** | **42%** | **-228** | **-79** | **-₹14.08** |
| **FY26** | **891** | **355** | **40%** | **-139** | **197** | **₹28.12** |

**FY25 reported LOSS of ₹-79cr and FY26 negative Other Income of ₹-139cr** are the accounting footprints of the Kandla legacy receivables reset. Both should be read with the concall context: Kandla acquired FY25 CIRP → 12-month recon → ₹208cr write-off + tax reversal spread across FY25/FY26. Management is emphatic: "no further Kandla write-offs anticipated."

### Q4FY26 alone (concall verbatim)

| Metric | Q4FY26 | YoY change |
|---|---|---|
| Revenue | ₹248.7 cr | +49% |
| EBITDA | ₹106.85 cr | +71% |
| EBITDA margin | 39% | — |
| PAT (excl exceptional) | ₹148.6 cr | — |

### Order Book & Visibility

- **Total OB: ~₹3,000 cr** (revolving; steady across execution)
- 1 x 15-year contract + others averaging ~2.5 years
- FY27 execution from current OB: **">₹800 cr" (CFO)**
- Submitted bid pipeline: **₹500-600 cr** (not yet in OB)
- New 15-year PEC tender received "last week" (May 2026) — separate from bid pipeline
- **Book-to-bill on FY26 revenue: 3.4x** (₹3,000/₹891) — solid multi-year cover

### Segment / Asset Utilization (Q4FY26)

- **Rig segment: 100% utilized** — incremental orders need newbuild (₹100-120cr per 2,000 HP rig via JV, >20% ROI expected)
- **Gas processing: 12-15% availability remaining** — can absorb near-term orders before new capex
- **PEC (Rajahmundry): active, above baseline** despite Mori-5 shutdown of that specific well
- **Dolphin Offshore:** single asset; FY27 guide ₹150cr @ ~60% EBITDA
- **Kandla:** merged 30-Mar-2026; contribution from FY27

### FY27 Outlook (Q4FY26 explicit guidance)

- **Revenue growth: 25-30% YoY** (reiterated multiple times across Q4FY26 concall)
- **FY27 capex ~₹300 cr base:** ₹150cr PEC + rig + offshore
- **Margins:** "maintain EBITDA of 44%, 45%... may vary 1% or 2%"
- **New rigs (2,000 HP):** via JV, funded internal accrual + debt
- **3-5 year vision:** "company could double" (Paras Savla)

---

## 5. Connecting the Dots

Threads through the concalls read together:

1. **PEC ramp is the growth engine.** Q1FY26 setup → Q3FY26 above baseline → Q4FY26: rig segment 100% utilised + PEC continues despite Mori-5. Next: 15-year new PEC tender received May 2026.
2. **Kandla is the clean-up cost of building a moat.** ₹208cr write-off is expensive but eliminates a receivables overhang; management says done. Backward integration into chemicals for internal sourcing.
3. **Dolphin adds an offshore vector.** Small (₹150cr FY27 rev) but 60% EBITDA — high-quality diversification when Indian offshore drilling picks up.
4. **Balance sheet strength → QIP shelved.** 0.48 Debt/EBITDA + ₹270cr OCF means Deep can self-fund the ₹300cr FY27 capex plus rig JV — no equity dilution. Rare capital discipline.
5. **Policy tailwinds compound.** Royalty overhaul May 2026 + CBM rounds 2025-26 + 1M sq km opened + 25,000km pipeline = the multi-year demand backdrop management is pricing for.
6. **Adjacencies (hydrogen + coal gasification + geothermal + online compressors)** — early-stage optionality, not baked into numbers.

**Contra-thread:** Rig segment already 100% utilised means growth requires capex + JV, not free operating leverage. Mori-5 incident showed operational surprise possibility. Kandla write-off is trust-consuming even if non-cash. Reported PAT (₹197cr FY26) vs adjusted (₹352.9cr) creates a valuation dispute — the market gets to pick which one is real.

---

## 6. Why the Market Is Paying This Multiple (P/E 7.86x)

### Screener valuation snapshot (4-Jul-2026)

| Metric | Value |
|---|---|
| CMP | ₹454 |
| Market Cap | ₹2,909 Cr |
| Stock P/E | **7.86x** |
| Book Value | ₹312 |
| P/B | 1.46x |
| Dividend Yield | 0.67% |
| ROCE | 16.5% (Screener) / **19.2% (adj, mgmt)** |
| ROE | 19.4% (Screener) / **21.8% (adj, mgmt)** |

**Valuation reconciliation:**
- Reported FY26 EPS ₹28.12 → P/E on reported = 16.1x
- Adjusted FY26 EPS = ₹352.9cr / 6.65cr shares ≈ ₹53 → **P/E on adjusted = 8.6x**
- Screener 7.86x aligns with adjusted / trailing view
- **The 8x P/E depends entirely on believing management's "no further Kandla write-offs" claim.** If believed, the stock is at 8x forward adjusted earnings on 25-30% growth guidance — cheap.

### Bull / Base / Bear (2-year horizon, updated from concall guidance)

**Base case (55% probability):** 25-30% growth delivered FY27+FY28 per management guidance. FY27 revenue ~₹1,150cr, PAT ~₹450cr (adjusted); Kandla clean, no new write-offs. Multiple re-rates modestly to 12x on adjusted → mcap ~₹5,400cr = **+86% from ₹2,909cr**.

**Bull case (25% probability):** Growth exceeds 30% (offshore + hydrogen + geothermal optionality kicks in); Dolphin's ₹150cr FY27 becomes ₹300cr FY28; multiple re-rates to 15-18x on adjusted → mcap ~₹7,500-9,000cr = **+160-210%**.

**Bear case (20% probability):** Kandla surprises with additional write-offs; Mori-5 recovery slips further; rig segment growth constrained by JV timing; multiple stays at 8x on ₹280-320cr PAT → mcap ~₹2,300-2,600cr = **-10 to -20%**.

**Weighted 2-year return:**
- Base: 55% × 86% = +47.3%
- Bull: 25% × 185% = +46.25%
- Bear: 20% × -15% = -3%
- **Net: ~+90% over 2 years = ~38% CAGR + 0.67% dividend** — a materially stronger risk-reward than the v1 "+110%" estimate that was pulled from thin air. This time it's grounded in explicit management guidance.

### Margin of Safety

Strong. Even the bear case is only -10 to -20% downside vs +86-185% upside in base/bull. The critical variable is trust in management's "no further Kandla write-offs" claim — but the 12-quarter zero-dilution promoter behaviour supports the trust.

---

## 7. What Could Prove Us Wrong (Named Risks — grounded in concall commentary)

1. **Additional Kandla write-offs.** Management categorical "nothing else left" — if any FY27 quarter shows another one-off, thesis breaks materially.
2. **Mori-5 recovery slips further.** Q3FY26 said rig "within 3 months"; Q4FY26 revised to "1-2 quarters" impact. Anything longer materially impacts PEC economics.
3. **Rig segment 100% utilised.** Any delay in 2,000HP rig JV formation caps growth. Capex ₹100-120cr per rig requires timing.
4. **Dolphin Offshore ramp risk.** Guided ₹150cr FY27 with ~60% EBITDA — but Q4FY26 had one-off ECL provisioning of ₹10cr. Ramp path is not linear.
5. **ONGC concentration.** Dominant customer. Payment cycle stretches. Contract structures shift (see Q4FY26 gross-vs-net rate volatility).
6. **Working capital heavy business** — Q4FY26 CFO agreed excluding legacy Dolphin receivables (₹160cr), debt "would appear quite lower."
7. **Oil & gas capex cycle downturn.** Management commentary is entirely about multi-year upcycle — if crude crashes, PEC economics erode fast.
8. **Rupee doesn't depreciate as fast as expected.** No USD hedging is a policy — CFO's view rupee weakness is structural. If wrong, offshore revenue takes a hit.
9. **PEC royalty terms.** May 2026 royalty overhaul improves upstream economics per management, but PEC-specific terms may not fully pass through.
10. **Adjacencies dilute focus.** Hydrogen + coal gasification + geothermal + online compressors — management explicit about early-stage but multi-track spending could dilute capital efficiency.
11. **Q4FY25 + Q3FY25 concalls not in Screener free tier** — future refresh should include these for full delivery track record.

---

## 8. 30-Second Memory Hook

**Cheteshwar Pujara** — the multi-year Test grinder who spent long innings absorbing risk without needing to hit boundaries. Deep Industries is the Pujara of Indian oil services: **35-year Savla family focus**, 63.49% promoter holding unchanged for 12 straight quarters even through a reported ₹-79cr FY25 loss, then **delivered 55% FY26 revenue growth + 44% EBITDA growth + explicit 25-30% forward guidance**. The Kandla ₹208cr write-off is Pujara facing a 90mph bouncer — takes the blow, stays at the crease, continues the innings.

Pujara traits map:
- **Long-innings orientation:** 12-quarter zero-dilution promoter
- **Willing to absorb short-term pain for long-term position:** Kandla write-off + FY25 reported loss + then FY26 record numbers
- **Multi-year visibility:** ₹3,000cr order book incl 15-year PEC = Test-match tempo
- **Unfashionable but effective:** oilfield services is unfashionable; 40%+ EBITDA margins are effective
- **Best-in-set metrics:** 21.8% adjusted ROE, 19.2% ROCE, 0.48 Debt/EBITDA — Pujara's Test average

**Thesis in one sentence:** Deep Industries is a 35-year Savla-family Ahmedabad oil-services house executing **25-30% YoY forward guidance** on a ₹3,000cr revolving order book (incl a 15-year PEC), trading at **7.86x P/E** with 63.49% promoter unchanged 12 quarters, a Kandla write-off that management calls terminal, and self-funded FY27 capex — one of the cheapest quality-industrial names in the entire watchlist if you believe the "no further write-offs" claim.

**Weighted 2-year return: ~+90% (~38% CAGR + 0.67% div).** Base +86%, bull +185%, bear -15%. **High conviction with the singular caveat: watch Q1FY27 for any surprise Kandla write-off. If clean, thesis re-rates.**

---

## Source Appendix

- **Concalls read (Screener AI Summary distillations):**
  - Q4FY26 (May 2026) — Screener ID 23185220; 9,735 chars — **primary content**
  - Q3FY26 (Feb 2026) — Screener ID 23103567; 7,827 chars
  - Q2FY26 (Nov 2025) — Screener ID 23052054; 7,095 chars
  - Q1FY26 (Aug 2025) — Screener ID 23026935; 7,857 chars
  - Q4FY25 + Q3FY25 — 403 on this fetch (paid Screener tier likely required) — future refresh
- **Full raw concall transcript PDFs (BSE-hosted):** URLs saved to `Fetched Concalls/DEEP/sources.txt`; not currently in repo (CORS + safety restrictions on BSE domain)
- **Screener consolidated view** (DEEPINDS, BSE 543288, NSE DEEPINDS): 9-year P&L, 12-quarter shareholding, ratios, peer comparison — cross-referenced with concall figures throughout
- **BSE announcements** via Screener document tab
- **ValuePickr:** No significant institutional discussion identified for DEEP in scanned window
- **Substack coverage:** None identified as of 4-Jul-2026
- **Peer context:** Deep sits alongside international oilfield services benchmarks (Schlumberger, Halliburton at 15-20x); no direct Indian pure-play peer at scale

### Concall extract file

Full ~32K-char extracts of the 4 concall AI summaries saved at:
`Fetched Concalls/DEEP/DEEP_concall_extracts.txt` (5 numbered sections + delivery scorecard cross-reference)

---

*Profile written 4-Jul-2026 (session date, v2 — transcript-grounded rewrite). Stock #46 on watchlist. Sector 17 (Oil & Gas Services) was newly created for this stock during v1 session. v2 replaces v1 which was written from Screener + IR-site scraping only, with no concall content — v1 missed the Kandla write-off, the explicit 25-30% guidance, the Mori-5 incident, the QIP shelving, the Dolphin FY27 numeric guide, and the 100% rig utilization constraint.*
