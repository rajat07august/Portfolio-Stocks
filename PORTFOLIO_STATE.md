# PORTFOLIO_STATE.md — Watchlist One-Liners

**Owner:** Rajat · **Last updated:** 23-Jul-2026 (Transrail Lighting added; new Sector 19 Power T&D EPC / Turnkey; RAJESH moved from Sector 13; 50 stocks across 19 sectors) · **Purpose:** Quick-glance thesis + conviction per stock. Load in every new session per CLAUDE.md first-turn checklist.

---

## 📊 CMP Snapshot — 3-Aug-2026 (full bulk refresh, all 52 stocks)

**Method:** `curl` + direct HTML parse of Screener for all 52 names — no extraction model in the loop. All 52 fetched successfully; the five that previously returned empty ratios to anonymous requests (accent, netweb, obsc, sathlokhar, systematic) resolved via the **plain-URL fallback** (`/company/{TICKER}/` instead of `/consolidated/`). Those five are marked `*` and their **ratios are standalone**; CMP and market cap are company-level and unaffected.

**Portfolio-wide:** average move **+3.9%**, median **+2.4%** since the last stored value. Aggregate market cap **₹431,215cr**.

**Biggest movers:**

| Direction | Stock | Prev | New | Change |
|---|---|---|---|---|
| 🔺 | DIACABS | ₹224 | ₹349 | **+55.8%** |
| 🔺 | SYSTEMATIC | ₹188 | ₹225 | +19.7% |
| 🔺 | AIMTRON | ₹1,373 | ₹1,632 | +18.9% |
| 🔺 | SANSERA | ₹3,237 | ₹3,787 | +17.0% |
| 🔺 | HAPPY | ₹1,618 | ₹1,908 | +17.9% |
| 🔺 | DEEP | ₹543 | ₹627 | +15.5% |
| 🔺 | KOLTE | ₹385 | ₹430 | +11.7% |
| 🔺 | NETWEB | ₹4,364 | ₹4,816 | +10.4% |
| 🔻 | NITTA | ₹1,882 | ₹1,612 | −14.3% |
| 🔻 | HALEOS | ₹1,599 | ₹1,439 | −10.0% |
| 🔻 | ASTEC | ₹683 | ₹619 | −9.4% |
| 🔻 | DEE | ₹715 | ₹623 | −12.9% |
| 🔻 | KAVERI | ₹842 | ₹772 | −8.3% |

**✅ DASHBOARD MCAP BUG — FIXED 3-Aug-2026.** The 31-Jul note estimated 28 of 50 names materially wrong; the full parse found **38 of 52 more than 10% off**, with the aggregate reading **₹353,755cr against a live ₹431,215cr (−18.0%)**. Worst offenders were ORIANA (+151%), RAJESH (+93%), KMEW (−69%), ECL (+57%), DIACABS (−51%), OBSC (−51%), NLC (−43%). **All 52 `stocks[].mcap`, `mcapDisp`, `mcapSource` and `CMP_DATA` entries have been rewritten from live Screener values.** The KPI strip and market-cap chart now compute off correct data for the first time.

**Full table (3-Aug-2026):**

| Sector | Stock | CMP | Mcap (₹cr) | P/E | Q1FY27 |
|---|---|---|---|---|---|
| 1 | AXISCADES | ₹1,632 | 6,938 | 87.8 | — |
| 1 | AZAD | ₹2,456 | 15,857 | 119 | 🕐 tomorrow |
| 1 | DYNAMATIC | ₹11,351 | 7,707 | 154 | 🕐 tomorrow |
| 1 | PARAS | ₹1,317 | 10,621 | 124 | 🕐 tomorrow |
| 1 | ROSSELL | ₹1,067 | 4,027 | 152 | ✅ Q1FY27 · **refreshed 12-Aug-26** |
| 2 | INSECTICIDES | ₹659 | 1,921 | 13.9 | 🕐 11 August 2026 |
| 2 | KAVERI | ₹772 | 3,973 | 13.4 | 🕐 13 August 2026 |
| 3 | AMIC | ₹1,891 | 2,184 | 77.3 | — |
| 3 | HAPPY | ₹1,908 | 18,006 | 55.0 | ✅ Q1FY27 · **refreshed 12-Aug-26** |
| 3 | OBSC* | ₹731 | 1,889 | 70.0 | — |
| 3 | SANSERA | ₹3,787 | 23,634 | 70.3 | 🕐 12 August 2026 |
| 3 | SSWL | ₹308 | 4,843 | 22.8 | ✅ Q1FY27 |
| 3 | SUNITA | ₹954 | 599 | 94.6 | — |
| 3 | WHEELS | ₹1,400 | 3,421 | 20.9 | ✅ Q1FY27 |
| 4 | ANUPAM | ₹1,213 | 13,833 | 81.3 | — |
| 4 | ASTEC | ₹619 | 1,381 | — | ✅ Q1FY27 |
| 4 | DCMSHRIRAM | ₹1,008 | 15,728 | 11.5 | ✅ Q1FY27 |
| 5 | AIMTRON | ₹1,632 | 3,401 | 74.0 | — |
| 5 | AVALON | ₹1,774 | 11,880 | 88.9 | ✅ Q1FY27 |
| 5 | CONCORDCS (Control Sys) | ₹2,550 | 2,648 | 62.4 | — |
| 5 | NETWEB* | ₹4,816 | 27,421 | 105 | ✅ Q1FY27 |
| 5 | SYRMA | ₹1,418 | 27,337 | 73.6 | ✅ Q1FY27 |
| 6 | DEE | ₹623 | 4,688 | 57.2 | ✅ Q1FY27 · **refreshed 12-Aug-26** |
| 6 | EIL | ₹240 | 13,513 | 19.5 | 🕐 13 August 2026 |
| 6 | SATHLOKHAR* | ₹344 | 895 | 8.72 | ✅ Q1FY27 |
| 7 | CARE | ₹1,725 | 5,201 | 30.4 | 🕐 tomorrow |
| 7 | MONARCH | ₹388 | 3,078 | 17.0 | 🕐 10 August 2026 |
| 8 | AURIONPRO | ₹727 | 4,021 | 19.2 | ✅ Q1FY27 |
| 8 | DATAMATICS | ₹856 | 5,064 | 20.0 | ✅ Q1FY27 |
| 8 | MPSLTD | ₹2,764 | 4,727 | 25.8 | ✅ Q1FY27 |
| 9 | KMEW | ₹2,519 | 6,384 | 81.0 | 🕐 14 August 2026 |
| 10 | GMDC | ₹594 | 18,902 | 33.1 | ✅ Q1FY27 |
| 10 | GPIL | ₹244 | 16,379 | 20.1 | 🕐 tomorrow |
| 11 | EPL | ₹229 | 7,356 | 17.9 | 🕐 11 August 2026 |
| 11 | GARWARE | ₹7,338 | 17,042 | 43.9 | ✅ Q1FY27 · **refreshed 12-Aug-26** |
| 11 | HALDYN | ₹134 | 725 | 23.4 | ✅ Q1FY27 |
| 11 | MAYUR | ₹775 | 3,370 | 16.3 | ✅ Q1FY27 |
| 12 | ACCENT* | ₹514 | 1,234 | 28.1 | — |
| 12 | CONCORDBIO (Biotech) | ₹1,375 | 14,408 | 51.9 | ✅ Q1FY27 |
| 12 | HALEOS | ₹1,439 | 437 | 27.6 | ✅ Q1FY27 |
| 12 | NITTA | ₹1,612 | 1,461 | 14.1 | ✅ Q1FY27 · **refreshed 12-Aug-26** |
| 13 | NLC | ₹302 | 41,953 | 11.9 | 🕐 tomorrow |
| 13 | ORIANA | ₹1,468 | 2,983 | 11.8 | — |
| 14 | DIACABS | ₹349 | 20,860 | 132 | 🕐 13 August 2026 |
| 14 | SYSTEMATIC* | ₹225 | 502 | 23.9 | — |
| 14 | YASH | ₹989 | 2,831 | 72.8 | — |
| 15 | KOLTE | ₹430 | 3,841 | — | 🕐 10 August 2026 |
| 16 | ECL | ₹72 | 4,468 | 23.6 | 🕐 tomorrow |
| 17 | DEEP | ₹627 | 4,019 | 9.69 | ✅ Q1FY27 |
| 18 | CARYSIL | ₹1,214 | 3,441 | 34.7 | 🕐 10 August 2026 |
| 19 | RAJESH | ₹862 | 1,551 | 10.8 | — |
| 19 | TRANSRAILL | ₹491 | 6,594 | 15.8 | 🕐 today |

**Q1FY27 reporting status: 22 of 52 reported.** Thirty have not; a heavy cluster lands **3–14 August** (see the ✅/🕐 column above). SME half-yearly reporters (AMIC, OBSC, SUNITA, AIMTRON, CONCORDCS, SYSTEMATIC, YASH, RAJESH, ACCENT) have no Q1 by construction — next print is H1FY27 in Sep–Oct.

**Anomalies:**
- **ASTEC** printed a **Q1FY27 loss (revenue ₹84cr, PAT −₹19cr)** — still no P/E. Already ML.
- **KOLTE** shows no P/E (loss-making TTM) — consistent with the 2-Aug refresh.
- **DCMSHRIRAM P/E now reads 11.5x**, still distorted by the prior-period tax credits flagged on 29-Jul. Normalized is ~24x.

### 💼 HELD POSITIONS (disclosed by Rajat, 6-Aug-2026)

**Rajat is invested in: DCMSHRIRAM · MAYUR · DATAMATICS.**

**What this changes:**
- These three get **deeper treatment** — audio is machine-transcribed immediately rather than deferred to the next refresh (see CLAUDE.md §4A two-tier audio policy).
- Conviction changes and downgrade triggers on these three carry real consequence, so **state them plainly and early** rather than burying them in a refresh log.
- The rest of the watchlist remains research/candidate coverage.

*If holdings change, update this block — the audio policy and refresh prioritisation both key off it.*

**Legend:**
- **Conviction:** H = High · MH = Medium-High · M = Medium · ML = Medium-Low · spec = Speculative
- **Weighted return** = 2-year probability-weighted (base + bull + bear scenarios from profile), before dividend
- **Format:** `TICKER (Sector #) · conviction · weighted 2yr return + div yield · key watch · CMP as of date`

**Rule:** When user references any specific stock in conversation, Read `Company Profiles/{TICKER}.md` for full context before responding. This file is for triage + comparison; the profile is for depth.

---

## Sector 1 — Aerospace & Defence (5/5 profiled ✅)

- **AXISCADES** · **M (Under Watch)** *(was MH)* · **~36% + 0% div** · **Tier A refreshed 28-Jul-26 (FY26-grounded)** · **🆕 Selling ENTIRE engineering services business to Akkodis in 2 phases — Phase 1 USD 30.63M (signed 26-May, closes Q2FY27, extraordinary gain ₹175cr = ₹41/share); Phase 2 Aerospace Engg Services USD 206.30M (board-approved 12-Jun, 51% at first close Q3FY27, tranched + $52.58M contingent). Combined ~₹2,250cr = 35% of mcap** · Funding **Power 930** (₹9,000cr revenue by FY2030) + MAC/DAC/DAL builds + Telangana land ₹39.42cr (completed 24-Jul) · **⚠️ FY26 PAT ₹72cr −4.3% while EBITDA +24.6% — 3-leg bridge (₹142cr Q4 revenue deferral w/ >₹40cr EBITDA hit, ₹17.78cr exceptionals, 96% Q4 tax rate from German DTA non-recognition); missed own EBITDA plan ₹215→₹178cr; CFO −₹1cr, FCF −₹135cr; promoter 67.95%→58.03%, DII bought a 8.56% block in Mar-24 then exited to 1.96%; 8.77x book, no dividend; Power 930 needs ~90% CAGR FY28-30 — analyst challenged on call, answer was conviction not arithmetic** · CMP ₹1,497 · *Section 3.5 roster/promoter retrofit still pending*
- **AZAD** · MH · ~35% + minimal div · Ashwin's carrom-ball niche in aero forging · CMP ~₹2,000+ (3-Jul-26) *[retrofit Section 3.5 pending]*
- **DYNAMATIC** · M · ~15% + 0% div · Veteran all-rounder — UK Hydraulics rationalization · Interest coverage 2.0x watched
- **PARAS** · ML · −10% to 22% band + 0% div · 125x P/E, order book +6% vs revenue +30% (concerning) · 5.74% dilution flagged
- **ROSSELL** · **M (Under Watch)** *(dashboard said MH, profile said M — reconciled to M)* · **~+15.4% / 2yr**, bear **−70%** · **Tier A refreshed 12-Aug-2026.** Q1FY27 revenue ₹154.7cr **+78%**, PBT +139%, operating margin 14.4% (best in 5 quarters), order book **₹715 → ₹800cr**, **first semiconductor order landed 7-Aug**. 🔴 **But PAT fell 6.5% QoQ while operating profit rose 37.6%** — interest ₹7.68 → ₹9.78cr, now **42% of EBITDA**, up every quarter for 8 quarters. 🔴 **Revenue tracking at a third of guidance** — 80-90% guided (₹873-922cr), Q1 annualises **+27.6%**. 🔴 **EBITDA band 17-22% missed 3 years running** (14.6% / 13.6% / 15.1%); FY26 revenue +87% with margin **down** 100bps. 🔴 **CFO negative 3 straight years, −₹83cr FY26**, debt ₹409cr = **2.6x net worth**, **QIP still unexecuted**. ⤴ Corrected v1's "promoter holding completely stable, family conviction very high" — **promoters sold 4.9% (₹166cr) to Kotak MF at ₹900 on 31-Jul**, MD among the sellers; 74.80% → 69.90%. **152x earnings, 26x book — no valuation floor if FY27 lands near ₹650cr.** **Watch: Q2FY27 revenue vs ₹239cr/qtr · margin vs 17% · QIP pricing.**

## Sector 2 — Agri-Inputs & Seeds (2/2 profiled ✅)

- **INSECTICIDES** · H · ~65% + 0.30% div · 13.8x P/E, cheapest agrochemicals + Corteva/Nissan partnerships · Monsoon dependency
- **KAVERI** · H · ~35% + 0.54% div · 16.0x P/E, cheapest quality agri · Maize +40%, Cotton new hybrid share 10.3% → 30.05%, Exports +90%

## Sector 3 — Auto Components & Forgings (7/7 profiled ✅)

- **AMIC** · M · ~+22% + 0% div · 50-yr Chamaria family, peer-best 30% OPM + 23.5% ROCE, Phase 1 ₹150cr capex commissioned 15-Jun-26 · **72x P/E — thin MoS at CMP ₹1,770 (16-Jul-26)** *[SME, half-yearly reporting only]*
- **HAPPY** · **H → MH (Under Watch)** *(v1 header said High while its own Section 6 said "~5% CAGR, priced-in"; card said MH — all reconciled)* · **~+12% / 2yr** (≈5.8% CAGR), bear **−34%** · 0.21% div · **Tier A refreshed 12-Aug-2026. Best execution in the batch, marked down on price alone.** Q1FY27 **highest-ever** revenue ₹449cr **+27%** and PAT ₹91cr **+39%**; EBITDA margin **31.3%, fourth straight quarter >30%**; volumes **+23.1%** against late-teen guidance — **beat on both lines**. Only **~30% of the new OEM price rise landed in Q1**; rest from Q2. Industrial **+50%**, PV **+70%** (exports doubled), domestic CV **+18% vs industry 10%**. Machining 90% of mix. **Forging utilisation just 59%** — ~50% volume growth without new presses. **₹950cr order book** incl. ₹250cr data-centre forgings at **₹800-1,000/kg vs ₹253 blended** (FY29). CFO **114% of op profit**; **ICRA AA reaffirmed**. 🔴 **But 55.0x and 8.4x book, 3% off the high** — stock **+27.3%** since v1 while TTM PAT rose 8%; ROCE 23%→18% and not yet turned; **float 4.12%** with DII down five straight quarters; **no VP thread, no Substack — zero second opinion.** ⚠️ CV exports **−12%** on DDP transit. **Upgrade back to H on a de-rate to ≤45x with delivery intact.**
- **OBSC** · MH · ~30-35% + minimal div · Fast growth (54% FY26) but extreme illiquidity (2,273 shareholders)
- **SANSERA** · M · ~5% + 0.10% div · ADS +155% but 60.4x P/E · 5.12% promoter dilution
- **SSWL** · H · ~55% + 0.5% div · Rahul Dravid mid-career · Bhuj capex INR 500cr commissioning FY28 · **Q1FY27 refreshed 16-Jul-26**: Rev +27%, PAT +43% YoY; alloy 62L / knuckles 11L FY27E; Hyundai 74% concentration flag; US tariff export headwind named but June normalizing · **CMP ₹295 (28-Jul-26, +10% since 16-Jul; P/E 21.8x, P/B 2.56x)** · *28-Jul note: now trades at a premium P/E to Wheels India for the first time — justified on growth (+27% vs +18%) and margin (11.0% vs 7.5%), still cheaper on book*
- **SUNITA** · spec · high uncertainty · 10.23% dilution + 1,733 shareholders · Small position only
- **WHEELS** · **M (Under Watch)** *(was MH)* · **~14% + 1.04% div** · TSF/TVS group, 65-yr heritage, ~20.5x P/E · **Tier A refreshed 28-Jul-26** · **🧩 Conversion model documented (v1 omission):** windmill/large-castings machining runs on **customer-supplied RM** — no material in revenue, asset turn ~1:1, *"clean double-digit or even higher"* ROIC, *"healthy IT type of margins."* ~20% of book; **benefit still ahead — Industrial Components EBIT −30% YoY Q3FY26 while carrying the new depreciation** · **✅ CFO ₹477cr +19%, FCF positive 4 straight yrs, D/E 0.74x, ROCE 18.8%/ROE 15.8%, promoter 58.31% flat 12Q, no end-market >22%** · **⚠️ ₹400cr equity raise approved 10-Jul-26 (~11.8% dilution, NO use of proceeds disclosed) reversing Jan-26 "fund capex thro accruals" commitment; DII 18.81%→6.39% (−3.25ppt in Jun-26 qtr) as shareholder count +29%; Q1FY27 PAT −33.9% QoQ; OPM range-bound 6.8–8.1% for 8 qtrs; 3Y sales CAGR 6%** · CMP ₹1,390 (28-Jul-26, −7.04% on the day) · *Downgrade trigger to ML: raise priced at discount, or Q2FY27 OPM ≤7.5%, or use-of-proceeds not returns-accretive*

## Sector 4 — Chemicals (Diversified & Specialty) (3/3 profiled ✅)

- **ANUPAM** · M · ~9-12% CAGR + minimal div · 85x P/E, 7.4% ROCE, 23% margin missed 26-28% guide · Bliss GVS integration risk
- **ASTEC** · **HELD at ML (Turnaround Play)** · **~14% + 0% div** · **Tier A refreshed 6-Aug-2026 (Q1FY27, filed 31-Jul)** · **⤴ MY QUEUE NOTE WAS WRONG — I called this 'another loss quarter, a fifth disappointment' from the PAT line alone. It is the BEST quarter of the turnaround so far** · **🟢 Q1FY27: EBITDA reached BREAKEVEN (₹0.1cr vs −₹10.5cr); loss after tax nearly halved to −₹18.7cr from −₹33.0cr; Enterprise revenue ₹51.8cr +42% YoY. Total income ₹84.3cr −8.0%. TTM operating profit +₹6cr — positive for the first time since FY23. Borrowings ₹555cr → ₹449cr** · **⚠️ QoQ the loss MORE than doubled (−₹8cr → −₹19cr) and operating profit slipped +₹9cr → −₹1cr — but Q1 is seasonally weakest (Mar-26 did ₹159cr revenue vs Jun-26's ₹84cr), so YoY is the fair read** · **🔴 THE GAP THAT MATTERS: EBITDA breakeven ≠ profitability. Interest ~₹31cr + depreciation ~₹44cr means Astec needs ~₹75-80cr EBITDA just to reach PAT breakeven, from a base of ~₹6cr. CFO still −₹81cr — NOT self-funding** · **🔓 CONCALL GATE: Astec has held NO earnings call since Nov-2022 — nearly 4 years. Cleared via the documented Godrej Agrovet parent fallback: Astec Q1FY27 press release + GOAGRO Q4FY26 transcript + GOAGRO Q1FY27 deck. 🟡 3 primary docs — management commentary is second-hand via the parent** · **👤 Board reconstituted: Vishal Sharma Non-Exec Chairperson, Mathew Eipe ID, Arijit Mukherjee (COO) promoted to ED and 'will be leading the business'; Burjis Godrej is Chairman Designate. Group leadership installed** · **⚠️ TWO TENSIONS: (1) parent guided 'CDMO-led growth' but Q1FY27 CDMO FELL 42% (₹54.6→₹31.8cr) while Enterprise rose 42% — mix flipped; (2) GOAGRO's own deck classifies Astec under 'Reboot / Transform', NOT 'double-down on growth / invest'** · **⚠️ VALUATION PRICES SUCCESS: 3.54x book on negative ROE, 3.1x TTM sales. Even a full return to FY22 economics (₹677cr rev, 23% OPM, ₹90cr PAT) justifies roughly today's ₹1,381cr mcap at 15-17x. The option is not cheap** · CMP ₹619 (−12.8% since v1, 34% off ₹942 high) · *Upgrade to M on two quarters of positive operating profit + CFO positive + CDMO recovering alongside Enterprise*
- **DCMSHRIRAM** · **M (Under Watch)** *(was MH)* · **~9.7% (2yr) + 1.07% div** · **Tier A refreshed 29-Jul-26 — Q1FY27 print + FY26 Annual Report** · **🔴 THE SCREEN IS LYING: headline P/E 12.0x, normalized P/E ~23.8x.** Two straight quarters of prior-period tax credits (₹474.3cr Sec 80-IA in Q1FY27 after the Q4 ITAT reversal) have put ~₹600cr of non-operating profit into TTM PAT (₹1,436cr reported vs ₹1,096cr TTM PBT). Reported Q1FY27 PAT ₹693cr; **company's own "effective normal PAT" ₹147cr** (+29%). **Distortion sits in the screen until Q4FY27.** ⚠️ **Also corrects the 16-Jul block, which used underlying FY26 PAT ~₹850cr — actual is ~₹665cr**, which is what drives the downgrade · **⚠️ Bioseed FAILED the kharif test v1 set: rev −26%, PBDIT +₹42cr → −₹9cr, plus a disclosed inventory glut pressuring margins all FY27; Sugar l-f-l PBDIT −25% once LY's −₹36cr one-off is stripped; ethanol hit the 20% blending ceiling with OMC requirement DOWN 13% (1,206→1,050cr ltrs) = structural, not cyclical; Fenesta order book +4% vs revenue +22% and capital employed +107%; shareholders −11.8% YoY to 54,377; CHRO resigned 24-Jul** · **✅ Operating quarter was fine — PBT before exceptional +14.4%, PBDIT +12%, Chemicals & Vinyl PBIT +31%, Vinyl PBDIT +88% on new PVC customs duty (16-Jul) + MIP (24-Jul); **ROCE up 40bps to 13.6% (first uptick since FY24)**; WC days 25 (decade low); FCF +₹354cr; ICRA AA+/Stable; promoter 66.53% for 12 unbroken quarters** · **🆕 Serentica (KKR) 58MW RE deal ₹104.4cr/26% → group RE 176MW; Teknor Apex 50:50 vinyl-compounds JV; salt works 208,000 MTPA acquisition Q3FY27 (backward integration into caustic feedstock)** · **🟡 Net debt ₹1,649cr is UP 11.3% YoY** (down ₹118cr off the FY26-end ₹1,767cr peak) — *first reported backwards; donut-chart series-assignment error in PDF text extraction, caught + corrected 29-Jul, conviction unaffected* · **🔴 Section 3.5 roster corrected — v1 omitted Vikram S. Shriram, Vice Chairman & MD** · CMP ₹1,050 · *Re-upgrade to MH at ~₹790-800 (18x normalized) or when ROCE turns up through 14%; downgrade to ML if Bioseed still loss-making in Q2FY27* · **✅ CONCALL GATE CLOSED 1-Aug-26; FULLY VERIFIED 6-Aug-26** — the call was read on 1-Aug from the company's own 46-min audio (machine-transcribed locally, mlx-whisper) because the official transcript was late; it published 6-Aug and **every load-bearing figure checked out verbatim** — ECU, chlorine, the ₹376cr MAT credit, the 19% tax rate, the demerger commitment, the 85% chlorine tie-up and the Bioseed quote. *(Roster note: Vikram S. Shriram, Vice Chairman & MD, was NOT on the call — Ajay, Ajit, Aditya + Amit Agarwal took it.)* **Two of the downgrade's five legs came back weaker:** **(a) normalized P/E is ~21.5x, not ~23.8x** — company elected **Sec 115BAA w.e.f FY26-27** so forward P&L tax is **25%, not 33%**, and **cash tax is 19% for 5-10 yrs** on a **₹376cr MAT credit** (i.e. the ₹474cr credit is partly REAL future cash, not pure paper); **(b) ethanol ceiling softened** — policy signals on blending beyond E20, spot sugar ₹4,450 vs ₹4,137 realised. **🆕 DEMERGER IS LIVE — "we are clear we will move ahead… moving on it quite aggressively," objective to file the application with the government WITHIN FY27.** Now the #1 catalyst; the conglomerate-discount unlock. **🆕 Chlorine integration → 50% captive / 85% tied up post AlCl₃+CaCl₂, against a chlorine price of MINUS ₹7-8,000/t** — reframes those projects as margin-from-liability, a real moat. **🔴 ECU CONFIRMED "just below ₹30,000" vs ₹35,761 Q1 avg = −16%** — ✅ *verified 6-Aug-26 against the official transcript, which published that day; Aditya Shriram (Deputy MD) verbatim, and chlorine confirmed at **minus ₹7,000-8,000/t**. Disclosed nowhere in writing — it exists only in the call. **Biggest single threat to Q2FY27**, in the segment that carried Q1*. **🔴 Bioseed FY27 is written off, not delayed — "the large part of it is lost"**; 15-20% all-India sowing shortfall, worse in DCM's markets. ✅ Net debt ₹1,649cr vs ₹1,481cr and ROCE "slightly improved" 13.2→13.6% **confirmed verbatim** — validates the 29-Jul donut-chart correction. FY27 net debt guided ~₹1,450cr, debt/EBITDA 1.1x with a hard 1.5x ceiling, AA+. ECH util only ~70% (headroom). WEF **Lighthouse** award at Bharuch (9 chemical cos worldwide). **HELD at M — weighted 2yr return revised ~8.5% → ~9.7%.** *Upgrade to MH if the demerger application is actually filed, or ECU confirmed ≥₹33,000 with Q2FY27 commissionings on time*

## Sector 5 — EMS / Electronics (5/5 profiled ✅)

- **AIMTRON** · H · ~85% + 0% div · SME ESDM, 89% FY26 revenue growth · Mainboard migration ~1 year, AIC US subsidiary integration
- **AVALON** · **M (Under Watch — valuation)** · **~9% + 0% div** · **Tier A refreshed 6-Aug-2026 (Q1FY27, filed 28-Jul)** · **🟢 Q1FY27 rev ₹484cr +49.8% YoY, EBITDA ₹58cr +93.9% at 12.0% margin (+272bps), PAT ₹35cr +145.3%. Order book ₹2,208cr +23.4% (14-mo avg execution). NWC 142→117 days. India mfg at 16.7% EBITDA / 11.1% PAT. 🆕 Box-build hit 60% of revenue for the first time (from ~54%)** · **⚠️ BUT THE QoQ IS FLAT: vs Q4FY26 revenue +0.9%, PAT −15.3%. The +49.8% is against Q1FY26, the weakest of the last eight quarters. Plateaued near ₹480cr/quarter for two quarters** · **⚠️ Cash conversion is the persistent weakness — CFO/OP 5%/54%/39%/53% across FY23-26, never above 54%. For a WC-hungry EMS that is what bites** · **⚠️ 88.9x P/E, 16.4x book (highest P/B in watchlist); multiple fell from 107x only because earnings grew, not because price improved; within 5% of ₹1,872 high** · **⚠️ PROMOTER SELL-DOWN v1 missed: 50.57% → 44.60% in Jun-2025 quarter (−6ppt), flat since. DIIs absorbed it and kept buying to 24.72% — strongest institutional backing in Sector 5 (vs AXISCADES 1.96%, AURIONPRO 1.47%)** · **FY27 guide 24-27% growth; FY29 target ~₹3,200cr; US mfg breakeven guided 'later part of FY27' (losses ~₹5cr/qtr). US = 62% of revenue but only 23% of manufacturing** · CMP ₹1,774 · *Downgrade to ML if Q2FY27 revenue misses ₹500cr, or US breakeven slips, or CFO/OP stays <50%*
- **CONCORDCS** *(renamed from CONCORD 2-Aug-2026)* · H · ~55% + 0% div · 3.3x revenue order book · **Extreme illiquidity (1,914 shareholders)**
- **NETWEB** · **H (Under Watch — valuation)** · **~21% + 0.07% div** · **Tier A refreshed 28-Jul-26 — Q1FY27 reported, best operating quarter in the watchlist this cycle** · **🟢 Rev ₹820cr +172.13% YoY, PAT ₹85.3cr +179.94%, EBITDA margin 14.70% vs 13-13.5% guide (+222bps QoQ); AI Systems ₹511cr = 62.29% of revenue growing +484.20% (was 43.4% of FY26); order book ₹2,507cr +19% QoQ with L1 ₹848cr (+183%) = ₹3,355cr total; ROCE 37.5% / ROE 32.8%** · **⚠️ VALUATION IS THE RISK: 95.3x P/E, 34.4x book (v1 header carried ESTIMATES — stock is ~50% above what v1 assumed). Interest cost ₹1cr→₹12cr in 4 quarters (10% of PBT); "zero-net-debt" status GONE, now 0.41x net debt/EBITDA; WC-hungry hardware scale-up and Q1 cash flow not in the deck** · CMP ₹4,364 · *Bear case −55% needs only growth normalising, not failure — trim-on-strength is legitimate* · **Q1FY27 call 29-Jul, transcript pending**
- **SYRMA** · M · ~10% + 0.11% div · 82x P/E priced-in · ODM +80%, 6-vertical diversification

## Sector 6 — Engineering / EPC (3/3 profiled ✅)

- **DEE** · **H → MH (Under Watch)** · **~+21% / 2yr**, bear **−56%** · 0% div (never paid) · **Tier A refreshed 12-Aug-2026, Q1FY27 call machine-transcribed at Rajat's instruction.** Revenue ₹294.5cr **+31.6%**, EBITDA margin **16.9% (record)**, **order book ₹2,428cr +92.5% YoY** incl. a **₹386.86cr BPCL order**. 🟢 **₹300cr preferential issue allotted 8-Jul at ₹502** to WhiteOak/Ashoka/Kotak/ValueQuest/360 ONE — **₹224.5cr already repaid**, net debt ₹718cr → **guided ₹400-425cr**. ⤴ Promoter 70.18% → 65.13% is **dilution, not a sale — Bansal subscribed ~₹20cr and his absolute holding rose.** 🔴 But PAT **−41.9% QoQ** on ₹17.2cr interest (allotment post-dated the 30-Jun balance sheet, so relief starts Q2); **₹1,500cr guidance needs ~₹402cr/qtr vs a best-ever ₹361.6cr**; **>19% margin commitment sits 210bps above the Q1 print**; GE HRSG delayed. 🎧 Audio yielded guidance in no filing (margin, net debt, inflow, Siemens, nuclear Q2FY27). **Watch: Q2 revenue + whether the ₹25cr deferral reverses · margin vs 19% · net debt at H1.**
- **INTERARCH** · **MH** *(new, 12-Aug-2026)* · **~+31% / 2yr** (≈14.5% CAGR) + 0.74% div, bear **−41%** · **Interarch Building Solutions** (formerly Products), **BSE 544232**, stock #53, Sector 6. India's **largest integrated PEB maker — 2,21,000 MTPA** across six plants, adding **31% capacity by Q4FY27**; built for **Micron Sanand** and **Tata Electronics Assam**. FY26 revenue ₹1,898cr **+31%**, PAT ₹135cr, **ROCE 22.8%, borrowings ₹18cr**. At **20.8x and 39% below the 52-week high**. 🔴 **Q1FY27 revenue +20.7% but PAT dead flat** (other income ₹9.9→₹3.0cr); **FY26 CFO −₹19cr on ₹135cr PAT**, WC days 21→59 — management blames one ₹124cr delayed receivable. 🆕 6-Aug board: **₹250cr QIP (raised from ₹100cr in five months)**, **5-for-1 split**, **Canada JV with ER Steel 76:24 with a 100% offtake**. Kheda Gujarat Phase 1 commissioned July, the month promised in May. **Reports standalone only. Watch: H1FY27 operating cash flow above all.**
- **EIL** · **MH (Under Watch)** *(was H)* · **~12% + 1.79% div** · **Tier A refreshed 28-Jul-26 (FY26-grounded)** · **⚠️ EARNINGS QUALITY: Dec-25 quarter alone was ₹347cr = 50% of FY26's ₹692cr consolidated PAT, driven by a liquidated-damages provision reversal on ONE project + a >₹200cr change order + ₹24cr NRL dividend — all management-confirmed. Screener con: "earnings include other income of ₹242cr" = 35% of PAT. Normalized PAT ~₹495-540cr → real P/E ~23-25x, NOT the headline 18.1x** · **⚠️ Order inflow FY26 ₹7,979cr vs ₹8,214cr = DOWN 2.9% (book rose on slow execution, not demand); FY27 inflow guided FLAT at ~₹8,000cr; 5Y sales CAGR 4.55%; Middle East big-ticket decisions delayed** · **✅ Order book all-time-high ₹15,109cr (3.8x rev, >₹10,000cr consultancy at 20-25% margin), ROCE 30.6%/ROE 23.8%, borrowings ₹17cr, CFO ₹319cr (3x YoY), payout 39%, Ramagundam at 100% capacity** · CMP ₹223 · *Upgrade back to H at ~₹180-190 (17x normalized)*
- **SATHLOKHAR** · H · ~80-120% + 0% div · SME, PEB inauguration Aug 2026 + Class 1A PWD · One-person management risk

## Sector 7 — Financial Services (2/2 profiled ✅)

- **CARE** · H · ~28% + 1.34% div · #2 credit rating agency + international expansion · 220% dividend (INR 22/share)
- **MONARCH** · H (watch) · ~65% + 0.29% div · 46% 5Y PAT CAGR but **TTM 21% (deceleration)**, FY26 PAT ₹181cr (+21.4%) · **⚠️ Q1-Q4 FY26 PAT stuck ₹45-46cr plateau, Debtor Days 70→210 (3x jump, Screener CON flag), governance penalties disclosed** · **✅ Promoter +1.08ppt to 53.86% (accumulating), Monarch Cap Venture WOS incorporated 13-May-26, MF launch Sep 2026 target** · CMP ₹363 · **Tier A refreshed 16-Jul-26; no concalls exist for this company**

## Sector 8 — IT / Software & Platforms (3/3 profiled ✅) *[definition broadened 2-Aug-2026]*

- **AURIONPRO** · **M (Under Watch)** *(was MH under review — trigger fired)* · **~37% + 0.55% div** · **Tier A refreshed 28-Jul-26 — Q1FY27 is one of only 3 real Q1FY27 prints in the watchlist** · **🔴 Q1FY27: rev ₹358cr +6.2% YoY but PAT ₹45cr −11.8% YoY / −26.2% QoQ — first YoY PAT decline in the profile. EBITDA 17.0% and PAT 12.6% BOTH below management's reaffirmed 20-21% / 15-16% bands, one quarter into the year they called "a strong FY27." Stock −10.38% on the day, −38% in 1yr. OPM has fallen 6 straight quarters (21%→17%); annual OPM down every year FY22-26 (22→20)** · **⚠️ FCF −₹114cr, CFO −64%; promoter 26.86% (−3.93ppt/3yr); DII just 1.47% — Indian institutions won't own it despite 34% 5Y profit CAGR; SEBI PIT show-cause unresolved; TTM profit growth 8% vs 5Y 34%** · **✅ Almost debt-free (₹61cr vs ₹1,738cr equity), order book >₹1,800cr (1.28x rev), US$33M win, TProcess flap-gate IP acquired (USD 1.07M), mgmt pre-warned the Q1 MEA drag accurately** · CMP ₹748 · **Scorecard verdict: candour high, calibration poor — trust the narrative, discount the numbers** · *Q1FY27 concall held 28-Jul, transcript pending — read on file*
- **MPSLTD** · **MH** · **~32% + 0% forward div** · **NEW 2-Aug-2026, stock #51** · **🟢 Q1FY27 strongest quarter ever: rev ₹224.24cr +20.4%, EBITDA ₹76.96cr +53.0% (margin 27.0%→34.3%), PAT ₹50.39cr +43.0% — on headcount +<3%. Ex-AJE underlying +28.4%. Research margin 45.1%; Education +42.2% (Unbound first full qtr, clients 404→841); Corporate Learning margin 16.9%→25.3% after 33% headcount cut** · **🎯 Guidance: FY27 EBITDA 'comfortably cross ₹300cr' (a FLOOR, acquisitions over and above); FY28 ~₹1,500cr rev / ~₹450cr EBITDA. Rule of 50 cleared. 25% of revenue outcome-based, 45% recurring** · **⭐ Best capital allocator in the watchlist: Arora family took over Oct-2011 at ~₹37/sh (~₹60cr mcap, loss-making); >₹650cr returned FY19-25 + 2 buybacks; promoter 68.34% flat 8 quarters, zero dilution; walked away from a deal over customer-facing 'shortcuts'** · **⚠️ DIVIDEND TRAP: Screener's 3.07% yield is TRAILING — FY26 payout was 0% (FY24 108%, FY25 95%), suspended for M&A** · **⚠️ AI is the bear case (drove the 2025-26 drawdown); organic growth only early-teens ex-Unbound; Corporate Learning 6-7% vs 12-13% market; FY28 target needs unannounced M&A; institutions just 3.5%; within 3% of 52w high** · **⚠️ USE CONSOLIDATED — Screener default page is STANDALONE and understates revenue ~45%** · CMP ₹2,721 · 25.4x / 7.8x book / ROCE 39.3% / ROE 31.2%
- **DATAMATICS** · **MH (Under Watch)** *(reconciled — profile header said MH, this file said H; the two had drifted)* · **~18% + 0.59% div** · **Tier A refreshed 6-Aug-2026 (Q1FY27, filed 5-Aug)** · **🟢 Q1FY27: rev ₹513.9cr +9.9% YoY, EBITDA ₹101.1cr +33.1% with margin 19.7% (+343bps), PAT ₹72.3cr +43.5%** · **🎯 vs GUIDANCE (⤴ corrected 6-Aug after Rajat supplied the Q4FY26 transcript): management guided ~8% FY27 revenue growth ('high single digits'... 'Yes, 8% would be approximately correct') and 18.7% + 50-100bps margin. Q1FY27 delivered 9.9% growth = BEAT, and 19.7% margin = TOP of the guided band. My first read called 9.9% 'a deceleration' — WITHDRAWN, I had no guidance to judge against** · **⚠️ But ~8% IS the guided growth rate, and management explicitly capped margins ('I don't see that moving substantially higher'). Forward algorithm ≈ 8% revenue + small margin = 10-12% earnings growth — that is what ~20x ex-cash buys. The +60% QoQ PAT is tax normalisation (Q4FY26 39% rate vs 21%)** · **🔴 FY26 FACT v1 MISSED: operating profit surged 60% (margin 13%→19%) and reported PAT still FELL ₹206cr→₹195cr — other income swung +₹78cr → −₹9cr (forex on an export book) and depreciation nearly doubled ₹48→₹84cr on TNQ amortisation. Other income swings ±₹28cr a quarter; judge on operating margin, not PAT** · **💪 BALANCE SHEET IS THE STRENGTH: net cash + investments ₹710cr (14% of mcap, up from v1's ₹639cr); FY26 CFO ₹324cr, FCF ₹285cr, CFO/OP 108% — best conversion of anything refreshed this cycle (vs MAYUR 86%, AVALON 53%, ASTEC negative)** · **🆕 TNQ Tech now WHOLLY owned — Lumina Datamatics completed the second 20% tranche 31-Jul-2026 (80% closed Dec-2024). Deal completion, not new M&A** · **🔗 SECTOR READ-ACROSS: Lumina's Publishing business is directly adjacent to MPSLTD (added to Sector 8 on 2-Aug). MPS earns 31.2% ROE at 25.4x; DATAMATICS 16.4% at ~20x. Watch as a pair, not two independent positions** · **⚠️ NOBODY INSTITUTIONAL OWNS IT: FII 0.50% (halved from 1.15%) + DII 0.10% = 0.60% combined — the LOWEST in the watchlist, below AURIONPRO (1.47%) and AXISCADES (1.96%). Promoter immovable at 66.33% for 7 quarters. No active ValuePickr thread either (topics dormant since 2023/2024) — nothing external tests this thesis** · **⚠️ v1's 'cheapest mid-cap IT' no longer clearly true at ~20x ex-cash (~23x headline on TTM PAT ₹217cr). 24% off ₹1,120 high** · **🔴 DISCLOSURE DEGRADED TO AUDIO-ONLY: IR page carries 27 transcript PDFs ending at Q3FY26 but 38 audio recordings through Q1FY27 — Datamatics stopped publishing written transcripts after Q3FY26. The 28-May-2026 BSE cover letter says the Q4FY26 transcript 'has been made available on the website'; it is not linked there (observation, not a compliance claim). ✅ Q4FY26 transcript SUPPLIED MANUALLY by Rajat 6-Aug-2026 — gate now CLEARED with 6 transcripts, and reading it reversed the central conclusion. 🆕 It also revealed a ₹24cr FY26 Labor Code one-off, a subsidiary with ~₹26cr negative net worth (recovery guided ~2yrs), and management's own split attribution of the margin gain ('partly the TNQ and partly due to our own operational efficiency'). ✅ **Q1FY27 CALL NOW READ** — audio machine-transcribed locally; 9.9%, ₹513.9cr, ~₹2,000cr base and 19-20% margin all cross-check to the press release · **🎯 FY27 guidance REAFFIRMED at high single digits ('We are maintaining that'); management explicitly steered analysts AWAY from the 43% PAT number toward the 9.9% revenue line — confirming this profile's read** · **🆕 ₹3,000cr revenue ambition in 3-4 years from ~₹2,000cr, 'a mixture of organic and inorganic'; ~60% of deals won this year are AI-led** · **🔴 CEO NAMES TWO RISKS HIMSELF: customers automating in-house instead of outsourcing ('outsourcing budgets will shrink... pressure on all companies in the outsourcing world, in India particularly') and the shift to captives/GCCs** · **🔴 DEAL DURATION SHORTENING: AI projects run '3, 6, 9 months, not a 3 or 5 year type deal' vs traditional large annuities — a quality-of-earnings change arguing for a LOWER multiple on the same profit** · CMP ₹856 · *Downgrade to M if revenue stays <10% for two more quarters, or EBITDA margin <18%, or FII <0.30%*

## Sector 9 — Marine Services (1/1 profiled ✅)

- **KMEW** · ML · ~0-5% (priced for perfection) + 0% div · Green Tug 15-year annuities INR 650cr · 13.5% dilution over 3 years

## Sector 10 — Metals & Mining (2/2 profiled ✅)

- **GMDC** · M · ~15% + 1.67% div · Gujarat Govt PSU, 6 new lignite mines + Baitarani coal · **Data-limited, needs refresh** *[concalls only through Q4FY25]*
- **GPIL** · MH · ~10-15% + 0.39% div · Full vertical integration + Q4FY26 momentum turn (+91% QoQ EBITDA) · 23% EBITDA margin

## Sector 11 — Packaging & Materials (4/4 profiled ✅)

- **EPL** · **H (Under Watch)** *(held — only non-downgrade of the 28-Jul batch)* · **~36% + 0% forward div** · **Tier A refreshed 28-Jul-26 (FY26-grounded)** · **✅ SEVEN consecutive quarters of 20%+ EBITDA margin, all regions in guided band; FY26 rev ₹4,763cr (+13%), EBITDA +15.8% and EBIT +18% (EBIT growing FASTER than EBITDA — rebuts the depreciation-translation critique), net debt/EBITDA down to 0.52x, CFO ₹723cr, promoter sell-down FINISHED and flat 3 quarters at 26.38%, DII +3.6ppt to 13.80% absorbing FII selling** · **⚠️ DIVIDEND SUSPENDED until Indovida merger completes ("cannot declare dividend till the merger is completed") — payout 66%→44%→21%; the 2.11% yield is TRAILING, forward is zero. NO merger filing since May. Q4 PAT ex-exceptionals only +1%. Capex ₹480cr vs ~₹370cr depreciation → FCF ₹439→₹250cr. 5Y stock CAGR 0%** · CMP ₹236 · *Downgrade to MH if merger delayed past FY27 or margin streak breaks*
- **GARWARE** · **MH (Under Watch)** · **~+23% / 2yr** + 0.16% div · **Tier A refreshed 12-Aug-2026.** Q1FY27 best quarter ever — rev ₹633cr **+28%**, PAT ₹133cr **+60%**, operating margin **27.2% (record)**; the company's "30.3% EBITDA" includes ₹20cr other income. Beats FY27 guidance (min ₹2,500cr rev, 25%±2%) one quarter in. **But: CFO resigned 15-May, seat vacant 83 days, interim CFO only since 6-Aug; Joint MD Mrs. Sarita Garware Ramsay died 9-Jul after 24 years.** ⤴ Corrected v1's chairman error (CMD is **Dr. S. B. Garware**, not Vayu Garware) and v1's "FY26 highest ever" framing (FY26 revenue +0.5%, EBITDA −1.5%). Anti-dumping on Chinese PPF is a **DGTR recommendation, not a notified duty**. 43.9x, bear case −30%, margin at the top of the guided band. **Watch: permanent CFO · does 27% hold in Q2 · gazette notification · GHS 9-of-50 studios.** 🟡 Q1FY27 concall was 7-Aug — **transcript not yet filed, re-read next refresh**
- **HALDYN** · spec · 20-30% wide band + 0.59% div · Small-cap glass containers · **Data-limited, needs refresh** *[no concalls in repo]*
- **MAYUR** · **HELD at H** · **~27% + 0.65% div** · **Tier A refreshed 6-Aug-2026 (Q1FY27, filed 5-Aug — NOT 28-Jul as the queue first said)** · **🎯 THE PRINT ANSWERS THE Q4 MARGIN QUESTION: Q4FY26's 31% OPM was an anomaly and Q1FY27 reverted to 22%.** Analysts pushed Bagaria three times on sustainability last quarter ('used to seeing 24-25%, all of a sudden 33% plus'); he refused to name a number — which now reads as caution, not evasion. 22% sits inside the historical 20-23% band: normalisation, not deterioration · **🟢 Q1FY27 rev ₹269cr +24.5% YoY (−1.5% QoQ), PAT ₹56cr +36.6% YoY. FY26 rev ₹967cr +9.9% with PAT +28.9% — profit growing 3x revenue on export mix. TTM revenue crossed ₹1,000cr for the first time** · **🟢 Quality intact: CFO ₹133cr, FCF ₹110cr, CFO/OP 86% (5-yr: 114/94/108/86%). ROE 17-18% stable across a decade. ROCE 24.7%** · **🟢 PROMOTER BUYING — 58.59% → 58.77%; FII 3.18% → 4.78%; shareholder count −6.5% to 37,381. Cleanest register in the refresh batch** · **🟢 Board changes are ROUTINE, not churn (correcting my own queue note): Arun Bagaria re-appointed ED 5yrs from 1-Aug-2027; Ratan Kumar Roongta's ID tenure completes 27-Sep-2026 on schedule; Vinod Kumar Haritwal appointed Non-Exec ID 6-Aug-2026. AGM 18-Sep; dividend record date 21-Aug** · **⚠️ ~21% of PBT is other income (₹23cr of ₹74cr in Q1FY27) — the operating business is smaller than headline PAT implies** · **⚠️ Export = 42.5% of revenue (guided 40-45%) — the source of the margin gains AND the exposure. v1's Trump-tariff overhang unresolved** · **⚠️ VP topic 226 (843 posts) dormant since 20-May-2026 — no community reaction to Q4 margin spike or Q1FY27** · **FY27 guide: domestic 8-10%, export 15-20% growth** · CMP ₹775, **16.3x** (was 20x at v1 — multiple compressed while earnings grew), P/B 2.97x, 15% off ₹907 high but +49% over 1yr · **🎧 Q1FY27 CALL READ (audio machine-transcribed 6-Aug; consolidated rev ₹269.23cr / PBT ₹74.12cr / PAT ₹56.12cr all cross-check to Screener exactly)** · **✅ MANAGEMENT CONFIRMS THE MARGIN CALL AND NAMES THE CAUSE: Q4FY26's 31% was 'abnormally high because of abnormally high increase in FOREIGN EXCHANGE rates... a one-time increase'; sustainable margin is '25% or plus 1% or 2%' and 'the present quarter's margin will be sustainable and expected to continue.' The reversion is normalisation — now verified, not inferred** · **🔴 Why margin didn't expand despite export OEM +40% (₹53cr→₹74cr): Gulf War shipping costs up FOUR TIMES; raw material volatility since March; and price hikes requested from US OEM customers but deliberately NOT pushed ('we haven't pushed') because prices softened and USD appreciation already helped. Cost-side and self-limited pricing, not a demand failure** · **⚠️ Volume growth only ~2%; footwear muted as sole prices went up 2-3x** · **🏭 Utilisation 75-78%; PVC capacity ~3.5M metres/month (3.5-4.2M by thickness); NEW LINE ORDERED, production Feb-Mar 2027 adding 5 lakh metres; capex ~₹50cr FY26-27** · **🆕 THE TARIFF ANSWER — OVERSEAS PLANT UNDER ACTIVE CONSIDERATION: 'We definitely need to put more plants somewhere outside India. But because of all this Trump tariffs, the West Asia war... we have not taken a final call... it could be Mexico, the US, or some other NAFTA areas.' Two expansions weighed, one overseas one domestic. This is management's answer to the tariff overhang and it is UNDECIDED — now the item to track above margin** · **🕐 A question on Chairman Suresh Poddar's health was raised on the call; the machine transcript is too garbled to characterise the reply — flagged for verification against an official transcript, not treated as a finding** · *Downgrade to MH if OPM <20% for two quarters, or export share <38%, or tariffs target synthetic leather*

## Sector 12 — Pharma & Excipients (4/4 profiled ✅)

- **ACCENT** · MH · 80-120% + minimal div · SME pharma excipient, premium mix shift · Unit 3 Phase 1 delays, extreme illiquidity (3,054 shareholders)
- **CONCORDBIO** · **M** · **~9% + 0.53% div** · **NEW 2-Aug-2026, stock #52** · **⚠️ NOT the same company as CONCORDCS (Concord Control Systems) in Sector 5** · **🔬 Fermentation-based API specialist — immunosuppressants (tacrolimus, mycophenolate, cyclosporine), oncology, anti-infectives. A space ValuePickr calls 'a graveyard for Indian companies' that couldn't match Chinese scale; Concord survived. 4 units cleared by US FDA/EU GMP/Russian GMP/NAFDAC/WHO-GMP** · **🔴 FY26 was a trough: rev ₹1,055cr −12%, EBITDA margin 42%→35%, PAT ₹259cr −30%, ROE 12.5%. Five external causes (US tariff freeze, CDSCO approval delay costing ~3 months of EU supply, Middle East tender ~₹25cr suspended, US Veterans Affairs tender unfinalised, bulk→staggered ordering). DECLINE WAS VOLUME NOT PRICE — mgmt confirmed no price growth** · **🟢 Q1FY27 recovery: rev ₹257cr +26.2%, EBITDA ₹82cr +34.2%, PAT ₹58cr +31.0%, exports +46% — ahead of the '>18%' FY27 guide** · **🟢 ~₹3,000cr peak capacity vs ₹1,055cr delivered; units at 77%/30%/53%; forward capex only ₹20-30cr p.a.; debt-free, ₹414cr cash, CFO ₹267cr at 100% conversion (rose while PAT fell 30%). Injectables (₹10-12cr/qtr) + Stellon US sub (₹5-10cr/qtr) fully expensed — ex-both, FY26 margin was 39% not 35%** · **⚠️ THE PROBLEM IS PRICE: 53.1x trailing on 12.5% ROE and 7.3x book — most demanding multiple-vs-returns in the watchlist. 3-yr profit CAGR ZERO. Both 'temporary' tenders still frozen a year on. Bear −43% needs only a stalled recovery** · **⚠️ Q1FY27 transcript NOT yet filed; VP thread only 13 posts, dormant since Dec-2025** · CMP ₹1,409 (−18% 1yr, 22% off ₹1,804 high) · Promoter 44.08% flat 7 quarters
- **HALEOS** · spec · ~30% wide band + 0.09% div · Ex-SMS Lifesciences, weak ROE 8.44% + declining shareholder count · **Data-limited (only Q4FY25 PPT)** *[refresh pending]*
- **NITTA** · **H → MH (Under Watch)** · **~+18.5% / 2yr** + 0.43% div · **Tier A refreshed 12-Aug-2026.** Q1FY27 PAT +31.6% YoY **but revenue only +1.5% and −26% QoQ**; the margin is a **gel-bone spread**, not repricing — hide substitution cut input cost while cutting gelatin realisation. **3-yr sales CAGR is 1%.** 🔴 **SION cut −47% (5-Jun-26)**, company on Duty Drawback from July and calls it immaterial — **Q1 contains none of it; Q2FY27 (late Oct) is the test.** 🔴 **Supreme Court final hearing Sept-2026**, ₹18.20cr contingent, ₹1.49cr provided. 🔴 Subsidiary **Bamni Proteins shut by pollution board, not a going concern**; Reva consent "in process". ⤴ Corrected v1: **no promoter family — the Indian co-promoter is KSIDC, a Government of Kerala PSU**; the product-mix table was inferred (single reported segment); and **concalls don't exist to fetch** (zero IR filings in 83 filings over 2 years). Quality intact: 27.7% ROCE, borrowings ₹4cr, CFO 113% of OP. Peer Narmada Gelatines: same ROCE at 11.5x with 2.03% yield. **Watch: Q2FY27 margin · SC ruling · Gelatin Expansion date.**

## Sector 13 — Power & Renewables (2/2 profiled ✅)

- **NLC** · H · ~45% + 1.17% div · Navratna PSU, all-time-high FY26 across every metric + renewable pivot · 72.20% GoI (stable post-Mar-24 OFS)
- **ORIANA** · MH (under watch) · ~50% + 0% div · SME renewable EPC, FY26 rev +84% + PAT +59% + 39.6% ROE (elite) · Founder trio since 2013 · **Tier A refreshed 16-Jul-26:** 15-Jul-26 postal ballot for **1:5 stock split + Section 186 limit ₹10,000cr expansion** · **🆕 30-Mar-26 SECI Green Ammonia 10-yr PPA ₹3,135cr (world's largest floating solar + 20GWh BESS 2030 target)** · **⚠️ Actis deal delayed (Q1FY27 pending), no mainboard migration update, community critical of concall transparency, borrowings 8x YoY to ₹261cr, Substack flagged promoter NDU governance** · CMP ₹1,468 (−52% from Nov-25 peak ₹3,064)
- *(RAJESH → moved to Sector 19, Power T&D EPC / Turnkey, 23-Jul-2026)*

## Sector 14 — Power T&D Components (3/3 profiled ✅)

- **YASH** · H · ~55-65% + 0.11% div · 40-42% guided CAGR + 96% repeat order rate + 28.6% ROCE · Greenfield RIP core H2FY27
- **SYSTEMATIC** · M · ~65% WR + 96% repeat orders but data-limited; needs concall refresh · Q4FY26 PPT + 1 concall in repo
- **DIACABS** · spec · ~+9% + 0% div · Post-CIRP turnaround under GSEC promoter (2022); India's largest single-location cable manufacturing; Q3FY26 PAT +250% YoY, 7th cable line commissioned May 2026, CBI/ED cases discharged unlocking ~₹1,900cr assets · **105x P/E, negative book value ₹-13.6, MPS non-compliance fined, NO concall transcripts** = speculative high-variance bet

## Sector 15 — Real Estate (1/1 profiled ✅)

- **KOLTE** · **M (Under Watch)** *(was H — two-notch downgrade)* · **~−2% + 0% div** · **Tier A refreshed 2-Aug-2026** · **🔴 DATA-QUALITY NOTE CORRECTED — the missing concalls are not a repo gap, they DON'T EXIST.** Kolte-Patil filed formal notices that it *"will not host a conference call"* post Q3FY26 (5-Feb-26) and Q4FY26 (22-May-26). **Last earnings call: Q1FY26, Aug-2025 — three straight quarters dark.** Verified via Screener concall list + BSE announcements API (50 filings, zero transcripts) + both letters read · **🔴 FY26 WAS A LOSS YEAR, absent from v1: revenue ₹658cr −57% YoY, OP −₹53cr, PAT −₹2cr, ROE −5.75%, ROCE 1.39%, no P/E, no dividend. 3 of 4 quarters loss-making** · **🔴 Q1FY27 op update (17-Jul): sales value ₹617cr FLAT, realization +29% → AREA SOLD FELL ~22%; company calls it "broadly stable"** · **🔴 GST Section 74 (fraud/suppression provision) SCNs: claim ₹103.82cr + penalty ₹46.36cr ≈ ₹150cr = 4.4% of mcap, covering FY21-FY26, contested** · **⚠️ Blackstone deal was substantially a PROMOTER SELL-DOWN — 40% at ₹329/sh, of which 25.7% bought FROM promoters and only 14.3% fresh primary capital. Float 20.81%→12.28%, DII 5.59%→3.30%, shareholders −25%** · **🟢 Genuine positives: collections +30% to ₹715cr, CFO ₹345cr, FCF ₹316cr in a loss year (real-estate recognition trough is a plausible explanation — but UNVERIFIED, since there's no call); NCDs redeemed early; WOS amalgamation scheme; senior team build-out** · **📢 ValuePickr topic 263 DORMANT 17 months (last post 14-Mar-2025); final unanswered post asked about promoter selling + balance-sheet stress. @Surender: "Management keeps overpromising and underachieving year after year"** · CMP ₹385 · P/B 2.79x · *Downgrade to ML if no Q1FY27 call (4th straight) or a 4th loss quarter in 5*

## Sector 16 — Water Infrastructure (1/1 profiled ✅)

- **ECL** · MH · ~30-40% + 1.80% div · Trading at 0.81x book value · JJM 2.0 (INR 8.69 lakh cr through Dec 2028) confirmed catalyst · Kejriwal promoter INCREASED 44.08% → 50.14%

## Sector 17 — Oil & Gas Services (1/1 profiled ✅) *[new sector, added 4-Jul-2026]*

- **DEEP** · **HELD at H (higher conviction)** · **~49% + 0.56% div** · **Tier A refreshed 29-Jul-26 — CONCALL-GROUNDED (Q1FY27 transcript, 26pp, read in full; supersedes the 28-Jul deck-only read)** · **🎯 EXPLICIT GUIDANCE: FY27 PAT ~₹350cr (9.9x), FY28 PAT ~₹500cr (6.9x) — "gunning for PAT of almost 500 crores". FY27 growth: standalone 18-20%, consolidated >25%** · **🟢 Q1FY27 all-time high: rev ₹278.9cr +40%, EBITDA ₹131.8cr at 43.6%, PAT ₹89.1cr +44.5%. Rigs at 100% utilisation; 85% of outsourced gas-compression market; net-debt-free; no equity raise planned; capex ₹250-300cr FY27 backed by firm orders only** · **⤴ ORDER BOOK CONCERN DOWNGRADED: ₹3,047cr is >60% executing over 2-2.5yrs with ~₹800cr in FY27; the 15-yr ₹1,402cr PEC is long-tenure by design. Bidding pipeline ₹700-800cr EXCLUDES new PEC/higher-HP rigs/offshore — all bidding within months** · **🔴 THE REAL ISSUE: standalone flat at ~₹175cr for 5 quarters — the 40% growth is subsidiaries (Dolphin ₹43cr + Dubai/Indian subs >₹50cr). Equirus AND the VP community flagged it same-day. Mgmt says 4-5 new gas compression/processing contracts fix it from Q2 — FALSIFIABLE IN 6 WEEKS, now the #1 watch item** · **⚠️ Write-off assurance already broken once (said "no more" after FY25, then wrote off again Q4FY26); given again now. ⚠️ Bastion Research forensic Substack "Deep Value or Value Trap?" exists and is UNREAD — carrying an unquantified known-unknown** · **✅ Prabha Energy related-party loan: ₹86cr received back, full repayment guided by end-Q2FY27. ✅ Kandla to add 100-150bps EBITDA margin on ₹10-15cr capex, no debt. 🆕 Two new ONGC PEC tenders (Gamij, Geleki) being evaluated — investor-derived min fixed fees ~₹1,500cr and ~₹4,000-4,500cr, NOT company-confirmed** · **✅ CONCALL GAP CLOSED — 6 raw transcripts + 2 decks now on disk; v2 AI-summary-only flag RETIRED** · CMP ₹543 · P/E 8.37x, P/B 1.74x, ROE 19.4%

## Sector 18 — Home Building Products (Kitchen & Bath) (1/1 profiled ✅) *[new sector, added 12-Jul-2026]*

- **CARYSIL** · H · ~+9% + 0.20% div · India's premier premium kitchen platform (formerly Acrysil, renamed 2023); FY26 income ₹932cr (+14%), EBITDA ₹185cr (+30%), PAT ₹98cr (+53%); mgmt Q4FY26: "transition from Quartz Sink manufacturer to one-stop integrated kitchen and bathroom solution"; Kohler/Häfele/GROHE OEM tie-ups; Home Depot won new FY26; $1B aspiration; 15-20% forward guidance · v1 RAW transcript-grounded via NEW api.cors.lol method

## Sector 19 — Power T&D EPC / Turnkey (2/2 profiled ✅) *[new sector, added 23-Jul-2026]*

- **RAJESH** · H · ~170% + 0.12% div · Gujarat T&D EPC, 48.6% ROCE + order book INR 3,326cr (2.7x rev) at 10.7x P/E · SME illiquidity (6,172 shareholders) · *(moved from Sector 13)*
- **TRANSRAILL** · MH (initial) · ~+50% (2yr) + 0.17% div · Founder-led (Digambar Bagde, since 1984) backward-integrated T&D turnkey EPC; FY26 rev ₹6,880cr (+30%), PAT ₹404cr, ROCE 25.8%, 15.5x P/E; order book ₹16,361cr (2.4x); CFO doubled to ₹817cr, net debt −30%, CRISIL AA-; CEO ex-KEC, board incl ex-POWERGRID CMD I.S. Jha · **⚠️ FY27 margin guided down to ~11%, order-inflow miss (₹8,520cr vs ₹10,000cr guide), DII/PE (Asiana Fund) exit 15%→6.5%, QIP fund-raise pending** · v1 transcript-grounded via all 4 FY26 concalls + deck (Claude-driven Chrome fetch) · CMP ₹481 (−44% off ₹856 high, 23-Jul-26)

---

## Portfolio-level notes

### Highest conviction picks (H rating, weighted return > 25%)

1. **RAJESH** — Sector 14 · ~170% + 0.12% div · Extraordinary upside, 48.6% ROCE + 10.7x P/E · SME illiquidity constraint
2. **DEEP** — Sector 17 · ~90% + 0.66% div · **70%+ market share Post-Exploration Services** + 7.86x adj P/E on 21.8% adj ROE + Mgmt Q4FY26 25-30% forward guidance FY27+FY28, ₹3,000cr revolving OB incl 15-yr PEC contract · v2 transcript-grounded
3. **ORIANA** — Sector 13 · ~85% + 0% div · SME renewable EPC, 39.6% ROE + 12.5x P/E · SME illiquidity constraint
4. **MONARCH** — Sector 7 · ~85% + 0.29% div · 46% PAT CAGR + FY27 roadmap
5. **INSECTICIDES** — Sector 2 · ~65% + 0.30% div · Cheapest agrochemicals + partnerships
5. ~~**NITTA**~~ — **downgraded H → MH 12-Aug-2026**; weighted return cut ~60% → ~+18.5% (bear −42%). See the refresh note above.
6. **YASH** — Sector 14 · ~55-65% + 0.11% div · 40-42% CAGR + 28.6% ROCE compounder-with-momentum
7. **NLC** — Sector 13 · ~45% + 1.17% div · Navratna PSU + all-time-high FY26 + RE pivot
8. **MAYUR** — Sector 11 · ~45% + 0.57% div · 51-year founder + 20x P/E on 24.7% ROCE
9. **KAVERI** — Sector 2 · ~35% + 0.54% div · Multi-crop diversification + cheapest quality agri
10. **ECL** — Sector 16 · ~30-40% + 1.80% div · JJM 2.0 catalyst + 0.81x book value
11. **NETWEB** — Sector 5 · ~30% + minimal · AI Systems +459% + INR 2,400cr order book
12. **CARE** — Sector 7 · ~28% + 1.34% div · #2 rating agency + 220% dividend
13. **EIL** — Sector 6 · ~25% + 1.68% div · Value + quality Maharatna anchor
14. **EPL** — Sector 11 · ~25% + 2.11% div · World's #1 tube maker + Indovida catalyst

### Value anchor picks (P/E < 20x + ROCE/ROE > 15%)

- **DEEP** (8.0x, 16.5% ROCE + 19.4% ROE) — **cheapest quality stock in entire watchlist** — deep value + niche monopoly
- **RAJESH** (10.7x, 48.6% ROCE) — cheapest quality T&D EPC in watchlist
- **ORIANA** (12.5x, 39.6% ROCE) — cheapest quality RE EPC
- **NLC** (12.1x, 17.5% ROE + 1.17% div) — cheapest Navratna PSU
- **INSECTICIDES** (13.8x, 15.9% ROCE)
- **MONARCH** (15.1x, 27.7% ROCE)
- **KAVERI** (16.0x, 18.8% ROCE)
- **NITTA** (14.1x, 27.7% ROCE) — cheap on returns, **but 1% 3-yr sales CAGR and two live regulatory threads (SION, Supreme Court Sept-26)**. Peer Narmada Gelatines is 11.5x on identical ROCE.
- **EPL** (18.5x, 17.8% ROCE)
- **EIL** (19.3x, 30.6% ROCE)
- **MAYUR** (20.0x, 24.7% ROCE)
- **DATAMATICS** (20.3x, 20.8% ROCE)
- **WHEELS** (~20.5x, 18.8% ROCE + 15.8% ROE + 1.04% div — best returns-ratios in Sector 3, but **P/B 3.26x is rich vs SSWL 2.56x, and ~11.8% dilution is pending**; see 28-Jul-26 refresh)

### Speculative / small positions only

- **SUNITA** (SME, extreme illiquidity, 10.23% dilution)
- **HALDYN** (data-limited, small cap)
- **CONCORD** (illiquid — 1,914 shareholders)
- **ACCENT** (SME — 3,054 shareholders)
- **ASTEC** (turnaround, ongoing losses)
- **HALEOS** (SME-like, weak returns ROE 8.44%, declining shareholder count, data-limited)

### 🆕 New stock queue — pending Rajat's go-ahead

- **INTERARCH — Interarch Building Solutions Ltd** (NSE: INTERARCH; Screener ticker `INTERARCH`) · **Sector 6 — Engineering / EPC** *(confirmed by Rajat 2-Aug-2026; no new sector needed, taxonomy stays at 19)*
  - **Decision (2-Aug-2026): do the FULL workflow — card + 8-section deep-dive together — AFTER the 6-Aug-2026 Q1FY27 print, on Rajat's request.** Deliberately not started early: the rightmost quarter is Mar-2026, so anything written before 6-Aug goes stale immediately.
  - **Groundwork already verified (2-Aug-2026, via `curl` + HTML parse — no extraction model):**
    - CMP ₹1,809 · Mcap ₹3,034cr · **P/E 22.2x** · P/B 3.45x (BV ₹525) · **ROCE 22.8% / ROE 16.8%** · div yield 0.69% · FV ₹10 · 52w high ₹2,763 (**~34% off high**)
    - FY26: revenue **₹1,898cr (+30.5%)**, OPM 9.3%, **PAT ₹135cr (+25%)**. 4-yr ramp ₹1,124 → ₹1,293 → ₹1,454 → ₹1,898cr
    - Near-debt-free: borrowings ₹18cr vs net worth ₹881cr; total assets ₹1,301cr
    - **🔴 Lead question for the deep-dive: FY26 CFO went NEGATIVE at −₹19cr against ₹135cr PAT; CFO/OP collapsed 93% (FY24) → 60% (FY25) → 15% (FY26); FCF −₹138cr.** Working-capital build on 30% growth is the likely explanation, but it must be confirmed from the concalls, not assumed.
    - **Concall gate: clearable immediately.** 6 quarters of Transcript + PPT on BSE (May-2026 Q4FY26, Feb-2026, Nov-2025, Aug-2025, May-2025, Feb-2025), all `AnnPdfOpen?Pname=` UUIDs captured and fetchable via the §4A curl method. An AlphaStreet transcript mirror also exists for Q4FY26.
    - **Q1FY27 results: 6-Aug-2026** (Screener "Upcoming result date"). No `Fetched Concalls/INTERARCH/` folder yet.
  - **On the go-ahead:** fetch all 6 concalls + the Q1FY27 transcript/deck → read → write profile → wire to dashboard as stock #51.


### 🔄 Q1FY27 Tier A refresh queue — set 3-Aug-2026

**Already refreshed on their Q1FY27 print (8):** SSWL · WHEELS · AURIONPRO · DEEP · NETWEB · MPSLTD · CONCORDBIO · DCMSHRIRAM *(DCMSHRIRAM's Q1FY27 concall transcript is still pending — re-read when filed)*

**Queue — 14 names with a Q1FY27 print, in FILING-DATE ORDER per §4B** (oldest first):

**⚠️ FILING DATES CORRECTED 6-Aug-2026 — the previous ordering was wrong.** The first pass derived dates from the *Analyst / Investor Meet* notice on the assumption it lands on results day. **It does not — that notice is an advance intimation and precedes results by roughly a week.** My exclusion regex caught `"Intimation for"` but missed the `"- Intimation"` suffix form, so advance notices were read as filings. Six dates moved: **AVALON 28-Jul → 4-Aug (+7d)**, **HAPPY 28-Jul → 4-Aug (+7d)**, **DEE 29-Jul → 4-Aug (+6d)**, **MAYUR 28-Jul → 5-Aug (+8d)**, **DATAMATICS 31-Jul → 5-Aug (+5d)**, **GARWARE 3-Aug → 6-Aug (+3d)**. Seven were already correct. **Every date below now comes from an explicit `Board Meeting Outcome` or `Declaration of Un-Audited Financial Results` filing**, except the two marked unconfirmed. Rule going forward: **exclude anything containing "intimation" in any position, and accept only outcome/declaration filings.**

| # | Filed | Stock | Q1FY27 sales / PAT | Note |
|---|---|---|---|---|
| ~~1~~ | 2026-07-28 | ~~**ROSSELL**~~ | ₹154.46cr / ₹7.14cr | ✅ **DONE 12-Aug-2026** — revenue tracking at a third of guidance, interest at 42% of EBITDA, **promoter sold 4.9% to Kotak MF**; concall gate closed (folder was empty); **M (Under Watch)** |
| 2 | 2026-07-29 | **SYRMA** | ₹1,589cr / ₹106cr | Largest revenue in batch; "82x priced-in". A **QIP was on the Q1 board agenda** |
| ~~3~~ | 2026-07-31 | ~~**ASTEC**~~ | ₹84cr / −₹19cr | ✅ **DONE 6-Aug-2026** — EBITDA breakeven, loss halved; gate cleared via Godrej Agrovet parent; HELD at ML |
| 4 | 2026-07-31 | **GMDC** | ₹907cr / ₹163cr | On the standing data-refresh queue since FY25; first print to act on |
| ~~5~~ | 2026-07-31 | ~~**NITTA**~~ | ₹141cr / ₹25cr | ✅ **DONE 12-Aug-2026** — SION cut + SC hearing + Bamni non-going-concern + ownership correction; **H → MH (Under Watch)** |
| 6 | 2026-08-03 | **HALDYN** | ₹139cr / ₹10cr | Was on the "no concalls exist" list; now has a print to work from |
| 7 | 2026-08-04 | **AVALON** | ₹484cr / ₹35cr | ✅ **DONE 6-Aug-2026** — HELD at M (Under Watch, valuation) |
| ~~8~~ | 2026-08-04 | ~~**DEE**~~ | ₹294cr / ₹16cr | ✅ **DONE 12-Aug-2026** — ₹300cr recapitalisation + order book +92.5%; **Q1FY27 audio machine-transcribed**; **H → MH (Under Watch)** |
| ~~9~~ | 2026-08-04 | ~~**HAPPY**~~ | ₹449cr / ₹91cr | ✅ **DONE 12-Aug-2026** — highest-ever quarter, beat guidance on both lines; **H → MH on valuation, not execution** (55x, 8.4x book) |
| ~~10~~ | 2026-08-05 | ~~**DATAMATICS**~~ | ₹514cr / ₹72cr | ✅ **DONE 6-Aug-2026** — margin-led quarter; ⤴ "deceleration" call reversed to a BEAT once guidance was in hand; MH Under Watch |
| ~~11~~ | 2026-08-05 | ~~**MAYUR**~~ | ₹269cr / ₹56cr | ✅ **DONE 6-Aug-2026** — Q4's 31% margin anomaly reverted to 22%; promoter buying; HELD at H |
| ~~12~~ | 2026-08-06 | ~~**GARWARE**~~ | ₹633cr / ₹133cr | ✅ **DONE 12-Aug-2026** — record quarter + four-event management-change cluster documented; MH (Under Watch) |
| 13 | — | **HALEOS** | ₹72.94cr / ₹1.84cr | Near-zero PAT; `spec`, data-limited. **Filing date unconfirmed** — BSE feed empty for the window |
| 14 | — | **SATHLOKHAR** | ₹205cr / ₹21cr | NSE-SME only, **no BSE feed** — date unconfirmed |

**🆕 SECOND WAVE — reported 7–11 Aug 2026, verified from BSE `Board Meeting Outcome` filings on 12-Aug-2026:**

| # | Filed | Stock | Note |
|---|---|---|---|
| 15 | 2026-08-07 | **KMEW** | Sector 9 (sole member). Not refreshed since 3-Jul-2026 |
| 16 | 2026-08-10 | **CARYSIL** | Sector 18 (sole member). Not refreshed since the 12-Jul-2026 v1 |
| 17 | 2026-08-10 | **KOLTE** | **Refreshed 2-Aug-2026, but that predates this print.** M (Under Watch) after the FY26 loss year + ₹150cr GST claim |
| 18 | 2026-08-11 | **EPL** | **H (Under Watch)** — 7 straight 20%+ margin quarters; dividend suspended pending merger |
| 19 | 2026-08-11 | **INSECTICIDES** | Sector 2. Not refreshed since 3-Jul-2026 |
| 20 | 2026-08-11 | **MONARCH** | Refreshed 18-Jul-2026 — PAT plateau + debtor days 70→210 were the open flags |

**Still not reported as at 12-Aug-2026:** DIACABS, EIL, KAVERI, SANSERA.

⚠️ **HALEOS and SATHLOKHAR dates unconfirmed** — HALEOS's BSE feed returned empty for the Q1FY27 window (the only hit was a 2-Jun newspaper ad, which is the Q4FY26 results notice, not Q1FY27); SATHLOKHAR is NSE-SME with no BSE feed. Both placed last, which is an arbitrary choice rather than a derived one.

**Second wave — reporting 3–14 Aug** (refresh after): AZAD, DYNAMATIC, PARAS, NLC, GPIL, ECL, CARE, TRANSRAILL *(3-Aug)* · KOLTE, MONARCH, CARYSIL *(10-Aug)* · EPL, INSECTICIDES *(11-Aug)* · SANSERA *(12-Aug)* · EIL, DIACABS, KAVERI *(13-Aug)* · KMEW *(14-Aug)*.


### Data refresh queue (Astec-style workflow)

1. **GMDC** — Concalls needed (only Q4FY25 in repo)
2. **Monarch** — Concalls needed
3. **Haldyn** — Concalls needed
4. **HALEOS** — Only Q4FY25 PPT available; FY26 concalls needed
5. ~~**NITTA** — No concalls in repository~~ → **RESOLVED 12-Aug-2026, but not as expected: Nitta Gelatin India does not hold earnings calls at all.** Verified across 83 BSE filings Aug-2024→Aug-2026 — zero transcripts, zero call intimations, zero investor presentations; Screener shows no Concalls section. **The FY26 Annual Report is the standing substitute** and was read in full for the refresh. Next step is the Tokyo-listed parent's own investor material.
6. **AXISCADES + AZAD** — Retrofit Section 3.5 (written before mandatory)

**RESOLVED (removed from queue after 4-Jul-2026 v2 rewrites):**
- ~~DEEP~~ — v2 transcript-grounded from 4 concall AI Summaries + tradebrains/scanx news corroboration (Screener endpoint bypasses BSE CORS block)
- ~~AMIC~~ — v2 transcript-grounded from 7 primary docs (RHP + AR FY25 + AR FY24 + 4 half-yearly filings) via pdf.js-in-Chrome workaround; SME norm is half-yearly not concalls

**CORRECTIONS to earlier audit (4-Jul-2026):**
- SUNITA, ACCENT, RAJESH, SATHLOKHAR were mis-flagged in the earlier audit due to a wrong BSE-code-to-ticker mapping. Source appendix verification confirms all 4 are ALREADY read to the appropriate SME half-yearly standard. No refresh needed.
- Genuine current gaps: HALEOS (1 PPT only), HALDYN (mainboard w/ no concall culture), MONARCH (mainboard concalls not fetched). **NITTA removed 12-Aug-2026 — confirmed the company holds no earnings calls; not a fetch gap.**
- Anthropic allowlist expansion request submitted (feedback template provided) — will enable raw BSE PDF fetch when approved

### Sector completion

- ✅ Complete (19 sectors): 1–19
- **Total: 52 of 52 profiles complete** (49 prior + Transrail Lighting added 23-Jul-2026; new Sector 19 Power T&D EPC / Turnkey created, RAJESH moved in from Sector 13)

---

*End of PORTFOLIO_STATE.md. Update at session-end with any conviction changes, thesis pivots, or refresh events.*
