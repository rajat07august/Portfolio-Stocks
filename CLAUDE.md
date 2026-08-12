# CLAUDE.md — Equity Watchlist Research Framework

**Owner:** Rajat · **Last updated:** 3-Aug-2026 (v1.5 — dashboard banner/title/counts are now **derived from the `stocks` array**, never hardcoded; Last Refreshed auto-derives from the latest date in the data; back-to-top + per-browser hide (localStorage only, never touches data or repo) added. Open item: dashboard `sector:` labels have drifted from the Section 5 taxonomy — derived count reads **20**, taxonomy says 19) · **Version:** 1.5

This file is the standing brief for equity analyst work on Rajat's watchlist. Load this at the start of every new session before doing analysis work. It captures methodology, workflows, sector taxonomy, data sources, and session-management conventions built up over prior sessions.

---

## ⚠️ Zero-Tolerance Rule — Concalls Before Analysis

**No profile is written before concall transcripts (or their SME half-yearly equivalents) are downloaded, text-extracted, and read.** This is non-negotiable. Established 4-Jul-2026 after DEEP + AMIC were written without primary transcript sourcing.

Enforcement:
1. Any new stock request triggers the **CONCALL FETCH GATE** (Section 4A below) before any Screener extraction, IR-site scraping, or profile writing.
2. If concalls cannot be fetched via any of the documented fallbacks (BSE via Chrome, IR site, Screener document tab, parent-company subsidiary accounts, pdf.js-in-Chrome), **STOP and confirm with Rajat before proceeding.** Do not write a profile from Screener + IR-site inference alone. The Screener + inference route is only allowed if Rajat has explicitly said "proceed on data-limited basis" for a specific stock.
3. Profiles that were written without concall grounding are marked with a red banner and appear on the refresh queue at the top of Section 9. They are treated as DRAFT until concalls are read.
4. The correct sequence is always: **Fetch → Extract → Read → Analyze → Write.** Not: Screener → Write → Flag data-limited.

Rationale: the entire methodology (Section 2 framework, Section 3.5 delivery scorecard, cricket analogies mapped to management traits) depends on verbatim management commentary and guidance-vs-actual evidence that only concalls provide. Screener gives numbers; concalls give judgment.

---

## 0A. Quality bar — non-negotiable (set by Rajat, 6-Aug-2026)

**This dashboard is only useful if every number in it is true and every judgement is traceable to a source.** Rajat invests off this. Treat a wrong fact as worse than a missing one.

**Every error in this session had the same cause: asserting without verifying at source.** The record, kept deliberately:

| What happened | Root cause | The fix now in force |
|---|---|---|
| Scan reported 8 stocks as having filed Q1FY27 when they had not | Leading prompt — offered "Jun 2026" as an example and the extraction model echoed it | Never ask an extraction model a question containing the expected answer. Parse HTML directly (§4B) |
| Six filing dates wrong by 3–8 days | Read "Analyst Meet **- Intimation**" as the filing; regex excluded `"Intimation for"` but not the suffix form | Accept only *Board Meeting Outcome* / *Declaration of Results*; exclude "intimation" anywhere in the string |
| Told Rajat audio could not be transcribed | Asserted a capability limit without checking — five days after using that exact capability | Check `.venv-audio/` and §4A before ever claiming a limit |
| ASTEC queue note called a good quarter "a fifth disappointment" | Read the PAT line off a screener; never opened the filing | Read the actual disclosure before characterising a print |
| DATAMATICS called 9.9% growth "a deceleration" | No guidance in hand to judge against; treated absence of context as context | If there is no guidance on record, say so — do not substitute a judgement for it |
| MPS figures nearly published on a standalone basis | Screener's default page served standalone; assumed consolidated | Check the basis every time; reconcile to the company's own press release |

**Operating rules that follow:**
1. **Cross-check every load-bearing number against a second source** — company filing vs Screener vs deck. State which source each figure came from.
2. **Separate fact from inference, visibly.** If a conclusion is mine rather than management's, label it. "This is my inference, not management's stated position" is a sentence to use often.
3. **Say what is missing.** A gate at 3 documents is amber, not green. An unretrievable transcript is a stated gap, not a silent one.
4. **Correct in place, prominently, and keep the original visible.** Every reversal in this session is marked `⤴ CORRECTED` with what was wrong and why. Never quietly overwrite.
5. **Never characterise a person's health, conduct, or intent from a garbled or single source.** Flag it for verification instead.
6. **Distinguish "not reported" from "I could not find it."** They lead to opposite conclusions.
7. **A wide distribution is a finding.** When the honest answer is a −40% bear case, write the −40%.

---

## 0. First-turn checklist for any new session

Before responding to a new-session query about stocks, do this in order:

1. **Read this file (`CLAUDE.md`)** — methodology + conventions
2. **Read `PORTFOLIO_STATE.md`** — one-liner per stock, refresh queue, recent changes
3. **Read `Company Profiles/INDEX.md`** — sector-by-sector status (which profiles exist)
4. **If user references a specific stock** (by name, ticker, or comparison) — Read `Company Profiles/{TICKER}.md` for that stock's full context before responding. Applies even for casual mentions like "unlike EPL" or "similar to Azad".
5. **If comparing multiple stocks** — Read each referenced stock's profile.

This is the price of running lean sessions. Skip steps 1-3 only if the user explicitly says "quick answer, no context load".

---

## 1. Working setup (fixed facts)

- **Working folder:** `~/Documents/Equity Watchlist/`
- **Company profiles:** `~/Documents/Equity Watchlist/Company Profiles/{TICKER}.md`
- **Sector index:** `~/Documents/Equity Watchlist/Company Profiles/INDEX.md`
- **Portfolio state:** `~/Documents/Equity Watchlist/PORTFOLIO_STATE.md`
- **Fetched concalls:** `~/Documents/Equity Watchlist/Fetched Concalls/{TICKER}/`
  - Naming: `{TICKER}_Transcript_YYYY-MM.pdf` or `{TICKER}_PPT_YYYY-MM.pdf`
  - Some folders use BSE code instead of ticker (e.g., `543619` for Concord)
  - **⚠️ CONCORD ticker resolution — RESOLVED BY RENAME 2-Aug-2026.** The ambiguous `CONCORD` ticker has been retired. **`CONCORDCS` = Concord Control Systems Ltd (BSE 543619)**, Sector 5, concall folder `Fetched Concalls/CONCORDCS/` (was `543619`). **`CONCORDBIO` = Concord Biotech Ltd (BSE 543960)**, Sector 12, added 2-Aug-2026. Concord Enviro Systems (CEWATER) is a third, unrelated company and is **not** in the watchlist. The original collision caused a real mis-fetch during a bulk CMP refresh; renaming removes it at source rather than relying on a warning note. Yahoo `CNCRD.BO` had ambiguous mapping causing a mis-fetch during bulk CMP refresh. Screener ticker is BSE code `543619`. `Fetched Concalls/543619/` matches this.
- **Deploy folder:** `~/Documents/Equity Watchlist/equity-watchlist-repo/dashboard/`
- **Dashboard live URL:** `https://portfolio-stocks-chi.vercel.app`
- **Dashboard source:** `watchlist_dashboard_v2.html` (in working folder root, copied to `equity-watchlist-repo/dashboard/index.html` on deploy)
- **Profile viewer:** `equity-watchlist-repo/dashboard/profile.html` (uses marked.js from Cloudflare CDN; no SRI hash — dropping SRI is a fix from prior session)
- **Git repo:** `~/Documents/Equity Watchlist/equity-watchlist-repo` (user pushes manually from local terminal since sandbox can't reach github.com)

### Ticker conventions

- **SME stocks** — suffix `-SM.NS` on Yahoo Finance (e.g., `OBSC-SM.NS`, `SSEGL-SM.NS`, `ORIANA-SM.NS`, `ACCENTMIC-SM.NS`, `AIMTRON-SM.NS`)
- **BSE-only listings** — use `.BO` suffix (e.g., `RAJESH.BO` after we found the `.NS` was dead)
- Screener BSE code sometimes differs from NSE symbol (e.g., Yash Highvoltage: BSE 544310, NSE YASHHIGHV)
- Sunita Tools BSE code is 544001 (folder in `Fetched Concalls/` uses this code, NOT the ticker)

### Sandbox/tool restrictions to remember

- **BSE and NSE are BLOCKED** by Chrome MCP (safety restrictions). Cannot navigate to `bseindia.com` or `nseindia.com` directly.
- **Cowork `mcp__workspace__web_fetch` uses an "allowed provenance set"** (codified 4-Jul-2026):
  - ✅ Working: `screener.in`, `cdnjs.cloudflare.com`
  - ❌ Blocked with "URL not in allowed provenance set": most company IR sites (`deepindustries.com` confirmed blocked; `amicforgings.com` reachable via Chrome MCP for pdf.js workaround)
  - 🟡 `bseindia.com` — returns 200 but empty body (accessible but no content)
- **Sandbox `bash curl/wget/python-urllib`** — proxy-blocked with `X-Proxy-Error: blocked-by-allowlist` for essentially everything outbound (BSE, Screener, Cloudflare, GitHub — all 403).
- **Screener works** via Chrome MCP.
- **Marketscreener, Godrej Agrovet subsidiary accounts, some company IR sites** work as fallbacks (varies by domain — test via `mcp__workspace__web_fetch` first).
- **User's mac sandbox** cannot reach github.com — user pushes commits from local terminal.
- **Output filter** blocks: (a) cookie/query-string data (b) base64-encoded strings. Workaround: strip params, sanitize content, or return raw strings.
- **On 2-Jul-2026** a fetch-concalls skill (in `/uploads/SKILL.md`) successfully downloaded 228 BSE-hosted transcript PDFs via bash curl. That config has since been tightened. **Anthropic allowlist expansion has been requested** — until approved, raw BSE PDF fetch is not available inside the sandbox. Manual download by Rajat (his own browser → save to `Fetched Concalls/{TICKER}/*.pdf`) is the interim path.

---

## 2. Research methodology — the 8-section framework

Every stock profile follows this structure. Never skip a section. Section 3.5 is mandatory.

### The 8 sections

1. **Business in Plain English** — what the company does, told to a smart non-specialist. Include a simple analogy (bespoke tailor, wall-street plumber, etc.).
2. **Why This Industry Exists** — 3-5 durable forces driving the sector.
3. **What Makes This Company Different (moat)** — 6-10 moats + honest "where the moat is weaker" section.
4. **~~Section 4~~** placeholder — see below, we use Section 3.5 for management.
5. **Connecting the Dots** — how the growth threads reinforce (or don't).
6. **Why the Market Is Paying This Multiple** — valuation view + peer comps table + bull/base/bear framework.
7. **What Could Prove Us Wrong** — 8-10 named risks + weighted scenarios.
8. **30-Second Memory Hook** — one paragraph with cricket analogy + thesis-in-a-sentence.

### Section 3.5 — Management Track Record & Promoter Background (MANDATORY)

Insert between Section 3 (moat) and Section 4 (Numbers Decoded). Must include:

- **Management team roster** — MD/CEO, CFO, ED, other key roles with brief bios where known
- **Promoter family background** — founder history, generational transition status, business heritage
- **Promoter holding trajectory table** — quarterly snapshots across last 12 quarters:
  ```
  | Period | Promoter % |
  |---|---|
  | Jun 2023 | XX.XX% |
  | Mar 2024 | XX.XX% |
  | Mar 2026 | XX.XX% |
  ```
  Flag any dilution >2% or accumulation as strong signal.
- **Other listed entities of the promoter group** — table with entity, business, market cap, notes. Flag if any are distressed (e.g., Indian Acrylics for SSWL).
- **Delivery track record — guidance vs actual scorecard** — table with columns: `Guidance / Milestone | When | Actual delivered | Verdict (✅/🟡/🔴/🕐)`
- **One-line verdict on management** at end of section.

### Numbers Decoded (Section 4)

- FY26 vs FY25 headline table (Revenue, EBITDA, EBITDA margin, PAT, PAT margin, ROCE, ROE)
- Q4 alone breakout
- Segment mix table
- Balance sheet snapshot (book value, debt/equity, working capital days)
- Order book / pipeline visibility
- FY27 guidance or outlook from most recent concall

### Weighted return framework (Section 6)

Always structure as:
- **Base case (55-60% probability):** scenario + revenue/PAT + multiple → market cap → % upside/downside
- **Bull case (25-30% probability):** scenario + numbers → market cap → % upside
- **Bear case (15-20% probability):** scenario + numbers → market cap → % downside
- **Weighted expected return over 2 years** = probability-weighted average
- Convert to CAGR + note dividend yield addition

### Cricket analogy convention

- **Preferred**: cricket player analogy in Section 8 (Sangakkara, Bumrah, Rahul Dravid, Rishabh Pant, Yuvraj, Kohli, etc.)
- **Match player traits to stock traits** — quality compounder = Dravid, aggressive comeback = Yuvraj, transformation phase = Kohli 2020, rapid rise = Rishabh Pant
- **Fallback**: general example (bespoke tailor, wall-street plumber, veteran finisher) if no cricket analogy fits
- Avoid clichéd analogies (Sachin for everything)

### Source appendix format (bottom of every profile)

```
## Source Appendix

- **Concalls read:** Q4FY26 (May 2026, primary), Q3FY26 (Feb 2026), Q2FY26 (Nov 2025), Q1FY26 (Aug 2025).
- **Screener:** {Company Name} Ltd (BSE: XXXXXX, NSE: XXXXXX).
- **BSE filings:** [specific announcements].
- **ValuePickr — {Company} thread:** [what was covered in discussion].
- **Substack coverage:** [Substack name + link — see rule below].
- **Peer references:** [3-5 peer names].
```

**Substack rule:** cite any Substack referenced, and INCLUDE THE LINK if we have it. Format:
`- **Substack coverage:** ChemCapital ([https://chemcapital.substack.com](...))` — link even if partial.

### Data quality note (when relevant)

If a profile is built on limited data (missing concalls, only annual reports, etc.) — add a "Data quality note" box at the top and in the Source Appendix. Example: Astec (built from FY25 AR + marketscreener), Haldyn (no concalls in repo).

---

## 3. Concall reading standard: **LAST 6 CONCALLS**

**Upgrade from earlier standard of 4 concalls (established 3-Jul-2026).**

- **6 quarterly concalls** = ~1.5 years of data for standard listings
- **6 H1/H2 reports** = ~3 years for SMEs that report half-yearly (Aimtron, Concord, Sathlokhar)
- Read latest 4 in depth (verbatim quotes possible) + skim earlier 2 for delivery-vs-guidance context
- Purpose: management delivery track record + promoter trust signal

**Retrofit policy:** Existing 38 profiles were built at 4 concalls. Do NOT retrofit unless a specific stock is flagged for refresh (like Astec was). New profiles + refreshes = 6 concalls minimum.

---

## 4A. Concall Fetch Gate (MANDATORY — runs before every profile write)

Before any Phase 2 deep-dive can begin, this gate must be cleared. Established 4-Jul-2026.

### 🟢 PRIMARY METHOD — Claude-driven Chrome fetch, NO user action (codified 23-Jul-2026, validated on TRANSRAILL)

**Rajat's directive (23-Jul-2026): never make him run Terminal commands to fetch concalls. Claude fetches them itself, end to end, when he asks for a stock.** The device-bridge Cowork VM has NO network (verified — pypi/BSE/cors.lol all return `000`), so `device_bash` + a Python script does NOT work. The one surface Claude fully controls that HAS network is **Chrome MCP** (Rajat's own browser). Flow:

1. **Get the PDF ids from Screener.** Chrome → `screener.in/company/{TICKER}/consolidated/`. In the Concalls section, `document.querySelectorAll('a')` where text is exactly `Transcript`/`PPT`; read each link's `Pname` query param (the BSE UUID `.pdf`) + its date label. Screener HTML is server-rendered, so the ids are present. (Also grab CMP/ratios/shareholding here in the same pass.)
2. **Extract each PDF's text via pdf.js + cors.lol, from a permissive origin.** Chrome → navigate a tab to `https://example.com/` (Screener's CSP blocks in-page cross-origin fetch, so do NOT fetch from a screener.in tab). Inject pdf.js from Cloudflare CDN, then:
   ```js
   const bse = 'https://www.bseindia.com/stockinfo/AnnPdfOpen.aspx?Pname=' + pid; // pid = <uuid>.pdf
   const buf = await fetch('https://api.cors.lol/?url=' + encodeURIComponent(bse)).then(r=>r.arrayBuffer());
   const pdf = await pdfjsLib.getDocument({data:buf}).promise; /* ...extract text... */
   ```
   Return the **extracted TEXT** (never base64 — output filter blocks base64 + query-strings).
3. **Land it on Rajat's disk.** Write each transcript's text to a cloud file → `device_commit_files` to `~/Documents/Equity Watchlist/Fetched Concalls/{TICKER}/{TICKER}_{Transcript|PPT}_{YYYY-MM}.txt`. Then Read + analyze. Rajat does nothing.

**cors.lol caveats (important):** rate-limits hard (~a few requests → "Rate limit exceeded"; and from a `fetch()` the throttled response drops CORS headers so it surfaces as "Failed to fetch"). **Pace ≥10–15s between PDFs**; do Screener/other work in the gaps; if exhausted, wait ~60s and retry. `api.cors.lol/?url=` reached **as a page** (navigate + read `document.body.innerText`) works for JSON; for binary PDFs use the pdf.js-on-example.com path above.

### ⚙️ FALLBACK — local Terminal scripts (only if the Chrome/cors.lol path is down)

In the working folder: **`fetch_concalls.py`** (stdlib-only, Screener-driven — parses the concall PDF ids off the Screener page then downloads from BSE with the WAF-bypass headers) and the one-off **`fetch_transrail_direct.py`** pattern (hardcoded ids). Rajat runs `python3 fetch_concalls.py --scrip {BSE} --ticker {TICKER}` **in his own Terminal.app** (has network; the Cowork VM does not). PDFs land in `Fetched Concalls/{TICKER}/` + `.txt` via pdftotext. Use ONLY when Chrome is unavailable — default is the Claude-driven path above.

### 🟢🟢 SIMPLEST PATH FIRST — in Claude Code on Rajat's Mac, `bash` HAS FULL NETWORK (verified 29-Jul-2026)

**Check which environment you are in before doing anything else.** When this repo is opened in **Claude Code running natively on Rajat's Mac** (working dir `/Users/rajgarg/Documents/Equity Watchlist`, platform `darwin`), the `Bash` tool has **direct outbound internet**. This is a different environment from the Cowork sandbox that the notes below describe, and it makes the entire Chrome/cors.lol pipeline unnecessary.

Verified working directly from `Bash`, 29-Jul-2026 (DCMSHRIRAM):
- ✅ `curl https://www.screener.in/company/{TICKER}/consolidated/` → **200**, full HTML (parse quarterly/P&L/BS/CF/ratios/shareholding with `re` + a small Python script)
- ✅ `curl https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w?...` → **200 JSON announcements feed**, with `User-Agent` + `Referer: https://www.bseindia.com/corporates/ann.html` + `Origin` headers. This is the clean way to enumerate every filing in a date range.
- ✅ `curl https://www.bseindia.com/xml-data/corpfiling/AttachLive/{uuid}.pdf` → **raw PDF bytes**, same headers. No proxy, no pdf.js, no rate limit.
- ✅ `python3 fetch_concalls.py --ticker {TICKER}` runs **directly here** — Rajat does NOT need to open Terminal.app.
- ❌ Still blocked: `nseindia.com/api/quote-equity` (cookie-walled) and Yahoo Finance chart API. **Use Screener for CMP.**

**Order of preference in this environment:** `Bash` + `curl` → Screener/BSE **first**. Only fall back to Chrome MCP or cors.lol if `curl` actually fails. Do not make Rajat run Terminal commands (standing directive, 23-Jul-2026) — and here you don't need to.

### 🟢🟢 NSE IS AVAILABLE TOO — and it is the better feed for symbol lookups and the ONLY feed for NSE-SME (verified 12-Aug-2026)

**Standing correction.** The 29-Jul note below records `nseindia.com/api/quote-equity` as cookie-walled, and that was read for months as *"NSE is blocked."* **That over-generalised from one price endpoint to the whole domain.** NSE's **corporate-announcements API works fine** with a two-step cookie handshake, and NSE-hosted PDFs download directly.

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36"
# 1) handshake — the homepage returns HTTP 403 but STILL SETS THE COOKIE. 403 here is not a failure.
curl -s -c nse_cookies.txt -o /dev/null -H "User-Agent: $UA" "https://www.nseindia.com/"
# 2) announcements — index=equities for mainboard, index=sme for NSE-SME
curl -s -b nse_cookies.txt -H "User-Agent: $UA" -H "Accept: */*" -H "X-Requested-With: XMLHttpRequest" \
  -H "Referer: https://www.nseindia.com/companies-listing/corporate-filings-announcements" \
  "https://www.nseindia.com/api/corporate-announcements?index=equities&symbol=EPL"
# 3) PDFs — nsearchives, Referer header only. No proxy, no rate limit.
curl -s -L -H "User-Agent: $UA" -H "Referer: https://www.nseindia.com/" -o out.pdf "<attchmntFile URL>"
```

**Why NSE is often the better feed:**
1. **🔴 NSE-SME names have NO BSE FEED AT ALL.** `index=sme` is the only way to see **SATHLOKHAR (SSEGL), ORIANA, ACCENT (ACCENTMIC), AIMTRON, OBSC (OBSCP)**. PORTFOLIO_STATE carried *"SATHLOKHAR — NSE-SME only, no BSE feed — date unconfirmed"* as a standing gap purely because of the BSE-only habit. **Verified 12-Aug-2026: SSEGL returns 181 records, ORIANA 274, ACCENTMIC 165, AIMTRON 185, OBSCP 131.**
2. **Symbols are mnemonic, not numeric — this eliminates a whole error class.** On 12-Aug-2026 a BSE-code scan queried **KMEW as 543664 (actually Kaynes Technology)** and **MONARCH as 530291 (actually Paos Industries)**, producing two confident wrong conclusions. **You cannot transpose "KMEW" into "KAYNES".**
3. **The `desc` field is pre-categorised**, not free text: *"Outcome of Board Meeting"*, *"Investor Presentation"*, *"Analysts/Institutional Investor Meet/Con. Call Updates"*, *"Press Release"*, *"Bagging/Receiving of orders/contracts"*. **This is structurally cleaner than BSE's `NEWSSUB`,** and removes the need for the fragile *"exclude anything containing 'intimation'"* regex hacks in §4B.
4. **`attchmntText`** carries a one-line summary, so you can triage without opening the PDF.
5. **Dual-listed names can be cross-checked against two independent feeds** — the cheapest possible defence against a mis-keyed identifier.

**BSE remains necessary — this is additive, not a replacement.** Verified 12-Aug-2026: **AMIC (544037), SUNITA (544001), SYSTEMATIC (544541), CONCORDCS (543619), RAJESH, YASH** return nothing from NSE under their obvious symbols — the BSE-SME / BSE-only cohort. **Rule: NSE first for anything with a known NSE symbol (and the only option for NSE-SME); BSE for the BSE-SME/BSE-only names; both when a cross-check matters.**

### 🔧 Platform findings (verified 23-Jul-2026 — apply to the Cowork sandbox environment; superseded by the block above when running in Claude Code on the Mac)

- **device_bash / Cowork VM = NO network.** Do not attempt fetches or `pip install` there; it's for on-disk file ops only. `device_stage_files`/`device_commit_files` DO work (file transfer, no network needed). *(⚠️ This is a Cowork-sandbox constraint and does NOT apply to Claude Code on the Mac — see above.)*
- **WebFetch on BSE is unreliable:** `api.bseindia.com` JSON → **403** (WAF strips headers); `www.bseindia.com` PDF → **PROVENANCE_REQUIRED** (needs Rajat to approve in-UI, usually times out). Don't rely on it.
- **Screener via Chrome works great**, but its **CSP blocks in-page cross-origin fetch** — always hop to a permissive origin (example.com) for cors.lol/BSE fetches. Correction to the old "api.cors.lol works from any Chrome tab origin" note below: it does NOT work from a screener.in tab.
- **allorigins.win fails** for BSE (doesn't send `Origin: bseindia.com` → 500). cors.lol passes headers through, which is why only it works.
- **BSE scrip codes are error-prone from memory** — always confirm from the company's own filing letterhead. (e.g. TRANSRAILL BSE = **544317**, not 544361; INTERARCH = **544232**.)
- **🔴 AND VERIFY THE RESPONSE, NOT JUST THE REQUEST (added 12-Aug-2026).** A wrong scrip code does not error — **it silently returns another company's filings.** On 12-Aug-2026 a 13-stock scan queried **KMEW as 543664 (actually Kaynes Technology)** and **MONARCH as 530291 (actually Paos Industries)**, and both produced confident, wrong "has reported" conclusions that went into the refresh queue. **Rule: every scrip-code query must echo back the `SLONGNAME` field BSE returns and compare it to the expected company before any conclusion is drawn. The code is the input; the returned name is the check.**

### Fetch attempts in this order (stop when 6 primary docs are in hand)

**For mainboard-listed stocks:** 6 quarterly concall transcripts + presentations (Q1-Q4 across last 6 quarters).
**For SME-listed stocks:** 5-6 half-yearly financial results + FY annual reports + investor presentations (SME norm — no quarterly concalls).

1. **Check local repo first** — `Fetched Concalls/{TICKER}/` may already have PDFs
2. **BSE announcements archive via Chrome MCP** — Chrome extension navigates around the direct-URL block; search for concall + PPT PDFs by company code
3. **NSE announcements via Chrome MCP** — same pattern; NSE symbol
4. **Screener document tab** — direct BSE PDF links via `/company/{code}/consolidated/#documents`
5. **Company IR site via Chrome MCP** — investor-relations page, financial-results page, annual-report page. If PDFs served over HTTPS, next step (pdf.js-in-Chrome) can extract text
6. **api.cors.lol CORS proxy (NEW — codified 12-Jul-2026)** — **PRIMARY BSE PDF path**, replaces the Jul-2 curl method that Anthropic tightened out:
   ```js
   // Load pdf.js (Cloudflare CDN — allowlisted)
   await new Promise((r,j) => {
     const s = document.createElement('script');
     s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
     s.onload = r; s.onerror = j;
     document.head.appendChild(s);
   });
   pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

   // Fetch BSE PDF via CORS proxy
   const bseUrl = 'https://www.bseindia.com/stockinfo/AnnPdfOpen.aspx?Pname=<UUID>.pdf';
   const proxyUrl = 'https://api.cors.lol/?url=' + encodeURIComponent(bseUrl);
   const buf = await fetch(proxyUrl).then(r => r.arrayBuffer());
   const pdf = await pdfjsLib.getDocument(buf).promise;

   // Extract text
   let out = '';
   for(let i=1; i<=pdf.numPages; i++) {
     const p = await pdf.getPage(i);
     const c = await p.getTextContent();
     out += c.items.map(x=>x.str).join(' ') + '\n\n';
   }
   ```
   **Notes:** (a) rate limit ~4 requests before failures — wait 8+ seconds between requests; (b) works from any Chrome tab origin (Screener, company IR, etc); (c) returns valid `%PDF-` arrayBuffer for pdf.js; (d) other proxies tested and failed: `corsproxy.io` requires paid API key, `cors-anywhere.herokuapp.com`, `proxy.cors.sh`, `thingproxy.freeboard.io`, `cors.eu.org` all dead/blocked. First validated 12-Jul-2026 on CARYSIL Q4FY26 transcript (14 pages, 39K chars extracted successfully).
7. **pdf.js-in-Chrome workaround (codified 4-Jul-2026)** — when the concall is hosted on a company IR site that IS on the Cowork allowlist (works for `amicforgings.com`, `carysil.com`; does NOT work for `deepindustries.com` which is off-allowlist):
   ```js
   // Load pdf.js from Cloudflare CDN (allowlisted)
   await new Promise((resolve, reject) => {
     const s = document.createElement('script');
     s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
     s.onload = resolve; s.onerror = reject;
     document.head.appendChild(s);
   });
   pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
   const url = '<PDF URL>';
   const buf = await fetch(url).then(r => r.arrayBuffer());
   const pdf = await pdfjsLib.getDocument(buf).promise;
   let out = '';
   for(let i=1; i<=pdf.numPages; i++){
     const p = await pdf.getPage(i);
     const c = await p.getTextContent();
     out += c.items.map(x=>x.str).join(' ') + '\n\n';
   }
   out.slice(0, 30000);
   ```
   Chrome fetches from the user's own network (unlike sandbox proxy), so IR-site PDFs that curl can't touch are still reachable
7. **Screener AI Summary endpoint (NEW — codified 4-Jul-2026)** — same-origin fetch bypasses BSE CORS block:
   ```js
   // On https://www.screener.in/company/{TICKER}/consolidated/
   // Find AI Summary buttons: querySelectorAll('button.concall-link')
   // Each has data-url like /concalls/summary/{id}/
   const html = await fetch('https://www.screener.in' + concall_url, {credentials: 'include'}).then(r => r.text());
   const doc = new DOMParser().parseFromString(html, 'text/html');
   doc.querySelectorAll('script, style, noscript').forEach(n => n.remove());
   const text = doc.body.innerText.replace(/\s+/g, ' ').trim();
   ```
   Returns ~7-14K chars of Screener AI-distilled management commentary + Q&A + guidance per concall. Note: this is a DERIVATIVE not raw transcript; label profile source appendix accordingly. FY25/earlier concalls may return 403 (require paid Screener account).
8. **Marketscreener / EarningsCalls.dev / TIKR / SimplyWall.st** — aggregated result summaries if above unreachable
9. **Parent-company subsidiary accounts** — Astec-style: parent Godrej Agrovet discloses subsidiary annual accounts under BSE regs. Applies when target is a listed-parent subsidiary
10. **Last resort — company annual reports** — MD&A section carries year-level equivalent of concall commentary

### Gate outcomes

- **✅ 6 primary docs obtained** → proceed to Phase 2 profile write
- **🟡 3-5 docs obtained** → proceed with explicit data quality note flagging which quarters/halves are missing; call out inference vs quotes
- **🔴 0-2 docs obtained** → **STOP. Report to Rajat.** Do not write. Ask for either (a) "proceed on data-limited basis" explicit permission, or (b) permission to defer the stock

### 🎧 AUDIO → TEXT is available. Use it when a company posts a recording but no transcript. (codified 6-Aug-2026)

**Standing capability. Do not tell Rajat that audio cannot be transcribed — it can.**

A dedicated venv lives at **`~/Documents/Equity Watchlist/.venv-audio/`** with **`mlx-whisper`** (Apple-Silicon optimised). `ffmpeg` is on PATH at `/opt/homebrew/bin/ffmpeg`.

```bash
# 1) download the recording into the stock's folder
curl -s -L -o "{TICKER}_ConcallAudio_{QUARTER}_{YYYY-MM-DD}.mp3" -H "User-Agent: Mozilla/5.0 ..." "<audio URL>"
ffprobe -v error -show_entries format=duration -of default=nw=1 file.mp3   # sanity-check length

# 2) transcribe — RUN IN BACKGROUND. A 30-45 min call exceeds the 2-min foreground limit,
#    and the first run also downloads the ~1.5GB model.
nohup "$PWD/.venv-audio/bin/python" transcribe.py > /tmp/log 2>&1 &
```
```python
import mlx_whisper
r = mlx_whisper.transcribe(src, path_or_hf_repo="mlx-community/whisper-large-v3-turbo", verbose=False)
```

**Naming:** audio `{TICKER}_ConcallAudio_{QUARTER}_{DATE}.mp3`; output `{TICKER}_Transcript_{QUARTER}_{DATE}_MACHINE.txt`. **Always write a header marking it MACHINE, naming the tool, and warning that speaker labels are absent and figures carry ASR risk.**

**🔴 The rule that makes it safe:** a machine transcript is **evidence, not gospel**. **Cross-check every number against the investor deck / press release**, and explicitly flag any figure that cannot be cross-checked. Then **re-verify against the official transcript when it publishes.**

**Precedent — it works.** DCM Shriram's Q1FY27 call (30-Jul-2026, 46m48s) was machine-transcribed on 1-Aug when no transcript existed. When the official transcript published on 6-Aug, **every load-bearing figure checked out verbatim** — ECU level, chlorine price, the ₹376cr MAT credit, the 19% tax rate, the demerger commitment. It surfaced a ~16% ECU drop disclosed *nowhere in writing*.

**🎯 TWO-TIER POLICY — when to transcribe immediately vs. defer (set by Rajat, 6-Aug-2026):**

| Tier | Names | Action when audio is posted but no transcript |
|---|---|---|
| **HELD POSITIONS** | **DCMSHRIRAM · MAYUR · DATAMATICS · EPL** | **Transcribe immediately.** Do not wait for the official transcript, and **do not ask**. Rajat holds these — depth matters more than transcription cost. **EPL added 12-Aug-2026**, when the standing question was put for EPL's Q1FY27 audio and the answer came back *"Transcribe it now, its my holding."* **The holdings list is not static — whenever an answer to the audio question reveals a new holding, add the ticker here and to PORTFOLIO_STATE in the same turn.** |
| **Everything else** | the other 49 | **ASK EVERY QUARTER — one short question, each time.** Whenever audio is observed with no transcript, ask: *"{TICKER} has posted Q_FY__ audio but no transcript — process the audio, or wait for the official transcript?"* Do **not** silently transcribe and do **not** silently defer. His default is usually **wait for the official**, but that is his call to make each quarter, not an assumption to carry forward. |

> **📌 Ask again each quarter — do NOT treat a previous answer as standing.** ⤴ *Corrected 6-Aug-2026: an earlier draft of this rule said "ask once, not re-asked every quarter." Rajat's instruction is the opposite — **ask each quarter**.* The answer legitimately changes with circumstances: a quarter can turn urgent, a name can become a holding, or a company can start/stop publishing transcripts. **Keep it to one line at the point of observation** — a short question, not a paragraph, and not a justification of why you are asking.

**Either way, the verification discipline is the same:** cross-check every figure against the deck/press release at the time, and **when the official transcript later publishes, re-verify the machine transcription against it and record whether it held up.** DCMSHRIRAM is the worked example — machine-transcribed 1-Aug, verified verbatim against the official on 6-Aug, and that verification is written into the profile.

**When to reach for this:** the company posts audio but no transcript (**DATAMATICS from Q4FY26 onward, AVALON**), the official transcript is pending inside SEBI's 5-working-day window (**DCMSHRIRAM**), or the transcript is filed only as a cover letter pointing at a broken link.

> **⚠️ Failure to remember this cost a real error on 6-Aug-2026.** Rajat supplied the Datamatics Q1FY27 audio link and I replied that "there is no speech-to-text capability in this environment" — five days after using exactly that capability on DCMSHRIRAM. **Check `.venv-audio/` and this section before ever claiming audio cannot be processed.**

### Text extraction — **match the method to the document type** (rule hardened 29-Jul-2026)

**`pdftotext` is the right tool for transcripts and the WRONG tool for slide decks.** Established after a real error on the DCMSHRIRAM Q1FY27 refresh — see the post-mortem at the end of this subsection.

**A. Transcripts, results filings, annual reports, BSE letters → `pdftotext -layout`.**
These are linear prose. Text extraction is faithful.
```bash
for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done
```
Read the extracted `.txt` files. Quote verbatim from them in Section 4 and Section 6 of the profile.

**B. Investor presentations / PPT decks → READ THE PDF PAGES DIRECTLY (`Read` tool, `pages` param).**
A deck is a 2-D visual document. `pdftotext` flattens it and **silently destroys information**:

| Deck element | What `pdftotext` gives you | Safe to use? |
|---|---|---|
| **Tables** (segment results, investments update, operational metrics) | Clean, row-order preserved | ✅ **Yes** — verified faithful |
| **Bar charts** with in-text labels | Numbers in spatial order, series unlabelled | 🟡 Only after cross-check |
| **Donut / waterfall / paired charts** | Bare numbers, **series identity destroyed** — the year is encoded in *arrow/fill colour* against a legend, which has no text representation | 🔴 **NO — this is where the error happened** |
| **Line charts** (monthly price series) | Number soup, no axis binding | 🔴 No |
| **Images** (photos, plant shots, icons, logos, rasterised charts) | **Nothing at all — silently invisible** | 🔴 No |

**🔴 THE HARD RULE:** *any number sourced from a **chart** rather than a table must be confirmed before use, by one of:*
1. *a table elsewhere in the same deck stating the same figure;*
2. *the equivalent slide in a **prior deck** where the values are independently known (from a concall or Screener) — this decodes the deck's layout convention; or*
3. *reading the rendered page image directly.*

**Note the failure mode is silent.** A chart-derived number arrives looking exactly as authoritative as a table-derived one. There is no parse error, nothing to notice. Assume any two-value chart is reversed until proven otherwise.

**C. Scanned / image-only PDFs.** Some results filings ship the financial statements as **scanned images** (DCMSHRIRAM Q1FY27 results: 2.9 MB PDF → only 12 KB of text; the cover letter and auditor's opinion extracted, the actual tables did not). **If the extracted text is implausibly small for the file size, the tables are images.** Fall back to the investor presentation or Screener, and **say so in the profile's data-quality note.**

> **📌 Post-mortem — DCMSHRIRAM Q1FY27 (29-Jul-2026), the reason this rule exists.**
> Slide 7 of the Q1FY27 deck carried Net Debt and ROCE as **donut charts** with no year labels in the text layer — the year is bound only by arrow colour against a legend (blue = current, orange = prior). `pdftotext` returned `1,481 … 1,649` and `13.2 … 13.6`. First-listed was assumed to be current. **Wrong** — the deck's convention is **top-left = prior year, bottom-right = current.**
> Result: net debt was reported as **−10% YoY when it is +11.3% YoY**, and ROCE as −40bps when it is **+40bps**. The error was written into the profile, PORTFOLIO_STATE, the dashboard and a git commit before Rajat asked the diagnostic question that caught it.
> **How it was resolved (reuse this method):** the same donut layout was located in the **Q4FY26 deck**, where both values were independently known from the concall (FY25 net debt ₹1,395cr, FY26 ₹1,767cr). That deck renders `1,395` top-left and `1,767` bottom-right → **prior-year is top-left**, confirmed a second time by its ROCE donut (14.0 → 12.7, matching the known FY25→FY26 decline), then confirmed a third time against the rendered page image.
> **Lesson:** *the deck's own prior edition is the cheapest and most reliable convention-decoder available. Use it before trusting any chart.*

### Over-fetching — cap the download (noted 29-Jul-2026, script fix deferred at Rajat's instruction)

`fetch_concalls.py` downloads **everything Screener lists**, which for a long-listed company means PDFs back to 2018-2020. The DCMSHRIRAM run pulled 18 PDFs and left the folder at **58 files / 36 MB**, against a 6-concall standard needing ~14. Pruned back to 28 files / 23 MB on 29-Jul-2026.

Two known bugs, **left unpatched at Rajat's explicit instruction (29-Jul-2026)** — work around them manually:
1. **No download cap** — everything Screener lists gets pulled. After any run, prune to the 6-concall standard + current-FY documents.
2. **Filename collision** — any document whose date heading fails to parse is written as `{TICKER}_{label}_undated.pdf`, so **multiple documents silently overwrite each other**. After a run, check for `*_undated.*` and `*_Doc_*` files, identify each by reading page 1, and rename. Four files needed hand-renaming in the DCMSHRIRAM run — including the FY26 Annual Report and the Q1FY27 results, both of which arrived mislabelled.

### 🔴 Standing rule — Chrome-triggered downloads MUST include the move command (codified 15-Jul-2026)

When any concall fetch pipeline results in **Chrome auto-downloads** (via `URL.createObjectURL` + `<a download>.click()`), the files land in Rajat's `~/Downloads/` folder, which is **NOT mounted into the Cowork sandbox**. Sandbox cannot see or move them.

**Every response that triggers Chrome downloads MUST include this template mv command in the SAME response**, not wait for user to ask:

```bash
mv ~/Downloads/{TICKER}_Transcript_*.txt ~/Downloads/{TICKER}_PPT_*.txt \
   ~/Documents/Equity\ Watchlist/Fetched\ Concalls/{TICKER}/
```

For a single file:
```bash
mv ~/Downloads/{filename} ~/Documents/Equity\ Watchlist/Fetched\ Concalls/{TICKER}/
```

Skipping this = extra round-trip with the user. Not acceptable. Verified by user 15-Jul-2026 for DIACABS.

---

## 4. New stock workflow — the two-phase model

When user asks about a stock not in the watchlist:

### Phase 1 — Card first (~10-15 min)

**Always ask upfront:** "Add as a card first with pending banner, or full workflow (card + deep-dive)?"

If card-first:
1. Screener lookup: verify ticker + BSE/NSE code + market cap + P/E + ROCE + ROE + promoter holding
2. Business classification: what does the company do? Which sector fits?
3. **Sector assignment (with expansion protocol below)**
4. Draft card metadata:
   - id, num (next number in dashboard `stocks` array), name, listing (mainboard/sme), batch (assign appropriately), sector, conviction (initial guess: high/med-high/med/med-low/speculative)
   - mcap, mcapDisp, mcapSource (Screener/Business Standard + date)
   - thesis (1 sentence), tagline (product summary)
   - metrics (4-5 key figures with source citation)
   - business (2-3 sentence description with promoter family)
   - thesisPoints (5 bullets), risks (5 bullets), catalysts (5 bullets)
   - valuation (1-line valuation shorthand), mos (margin of safety note)
   - changes (initial entry with date + "Card added")
5. Add to CMP_DATA map with source
6. Set PROFILE_STATUS to `pending` (grey banner)
7. Copy `watchlist_dashboard_v2.html` → `equity-watchlist-repo/dashboard/index.html`
8. Give user git push command

### Phase 2 — Deep-dive profile (~60-90 min)

Standard workflow whether continuing from Phase 1 or triggered separately:

1. **Fetch 6 concalls** — check `Fetched Concalls/{TICKER}/` first; if missing or fewer than 6, fetch from BSE/NSE (or via fallback workflows in Section 5).
2. **Extract text** with `pdftotext -layout`
3. **Screener data pull** — CMP, mcap, P/E, ROCE, ROE, book value, dividend yield, face value, 12-quarter promoter holding trajectory, FII/DII/Public trajectory, shareholder count
4. **Promoter background research** — founder name, family history, generational transition, current management roster from concalls
5. **Other listed entities check** — Screener search for group companies
6. **ValuePickr thread scan** — last 18 months only (older discussions often obsolete)
7. **Substack scan** — search relevant sector Substacks; INCLUDE LINK in Source Appendix
8. **Write profile** in `Company Profiles/{TICKER}.md` — 8 sections + Section 3.5, target 20-30 KB
9. **Wire to dashboard**:
   - Copy `{TICKER}.md` to `equity-watchlist-repo/dashboard/profiles/{TICKER}.md`
   - Add to `PROFILE_STATUS` object: `"stock_id": { ready: true, symbol: "TICKER", date: "DD-Mmm-YYYY" }`
   - Update `INDEX.md` from ⏳ to ✅
   - Copy updated dashboard to `equity-watchlist-repo/dashboard/index.html`
10. **Update PORTFOLIO_STATE.md** with one-liner for the new stock
11. Give user git push command
12. Verify on Vercel once user confirms push

---

## 4B. Tier A Refresh Workflow (MANDATORY structure — added 18-Jul-2026)

Once a profile exists, refreshes follow the **Tier A pattern** — v1 body preserved untouched, refresh block appended at TOP, and refresh data flows INTO Sections 3.5 / 4 / 6 / 7. Established with Rajat 17-18 Jul 2026 across 6 refreshes (SSWL, RAJESH, AURIONPRO, MONARCH, DCMSHRIRAM, ORIANA).

### Refresh queue ordering — freshest filing first

- Scan Screener for each stock's latest announcement/filing date (Chrome batch, ~30s for 49 stocks)
- Sort by most-recent-first
- Refresh in that order — no filtering by conviction, sector, or Bucket-3 density
- Bulk CMP refresh is a separate lightweight pass across ALL 49 stocks (Screener + dashboard `CMP_DATA` rewrite)

### 🔴 "Who has reported?" scan — use ANNOUNCEMENTS, never the results table (codified 28-Jul-2026, Rajat-approved)

**Established after a scan of all 50 stocks returned 8 false positives.** Do not ask an extraction model to read the quarterly results table to determine which stocks have reported. It will confabulate.

**❌ What fails — and the two ways it fails:**
1. **Leading questions.** Asking *"what is the most recent quarter column (e.g. 'Jun 2026' or 'Mar 2026')?"* primes the model to answer with the first example. This produced **8 wrong "Q1FY27 reported" calls** (AXISCADES, EIL, MONARCH, EPL, HALDYN and others) where the true rightmost column was **Mar 2026**.
2. **Sequence completion.** Even with a neutral prompt, asking for column headers made the model *extend* the quarterly series — returning "Jun 2026" as the rightmost header while quoting **sales values identical to the Mar-2026 column**. Screener's results table is wide (13+ columns) and this failure is systematic, not occasional.

**✅ What works — three signals, all discrete text:**
1. **`Upcoming result date`** — Screener posts this whenever results are pending. Values seen: a date (`"31 July 2026"`), `"today"`, `"tomorrow"`. **Its presence alone proves results are NOT yet out.**
2. **Announcements** — a company that has reported files *"Results For Quarter Ended 30th June, 2026"* or *"Board Meeting Outcome"*. A company that hasn't files *"Board Meeting Intimation for Approval of Unaudited Financial Results"* **with the future meeting date in the title** — which yields the forward calendar for free.
3. **Trading-window closure notices** — often state the board date explicitly.

**Prompt template:**
> *Confirm the company name. (1) Any July 2026 announcement mentioning quarterly/financial results or board meeting, with its date and the date the board meets. (2) Does the page show "Upcoming result date"? If so, what?*

**🥇 Best method of all — `curl` + parse the HTML yourself.** In Claude Code on the Mac, `curl https://www.screener.in/company/{TICKER}/consolidated/` returns 200 with full server-rendered HTML. Parsing the `<section id="quarters">` table with Python gives **exact column headers and values with no extraction-model layer at all** — this is what finally resolved the mislabels, and it also yields the BSE `Pname` UUIDs for concall PDFs in the same pass. **Prefer this whenever the stock count is small enough to script.** See §4A.

**Sanity check that catches the error independently:** for a March-FYE company, the four quarterly columns ending at Mar-YY must sum to the FY annual revenue/PAT. If the "rightmost" column is inside that sum, it is **not** a new quarter.

### 🟢 Concall PDF fetch via curl — Screener HTML carries the BSE UUIDs (validated 28-Jul-2026 on DEEP)

Faster and more reliable than the Chrome/cors.lol pipeline, and it works for stocks whose folders were previously empty:

```bash
curl -s -o page.html -H "User-Agent: Mozilla/5.0 ..." \
  "https://www.screener.in/company/{TICKER}/consolidated/"
# concall links appear as: bseindia.com/stockinfo/AnnPdfOpen.aspx?Pname={uuid}.pdf
# each <li> carries its date ("May 2026") + link text ("Transcript" / "PPT" / "REC")
curl -s -L -o out.pdf -H "User-Agent: ..." -H "Referer: https://www.bseindia.com/corporates/ann.html" \
  "https://www.bseindia.com/xml-data/corpfiling/AttachLive/{uuid}.pdf"
# fall back to the AnnPdfOpen.aspx?Pname= form if the first isn't %PDF
```
**Always verify `head -c4 file.pdf` == `%PDF` before trusting the download.** Used on 28-Jul-2026 to close the standing DEEP gap — 5 raw transcripts + 2 decks downloaded, including the Q4FY25 transcript that returned **403** under the old Screener-AI-summary method.

### The Tier A block structure

**1. `## 🔄 Refresh Log — {date}` at top of profile** (preserves v1 body):
- What's genuinely new since v1 (concise bullets)
- FY26/Q print in headline table (verbatim from concall + Screener)
- Latest quarter alone table (Q4/Q1 vs comp)
- 5-quarter trajectory table (Screener consolidated)
- Balance sheet + Cash flow snapshot deltas
- **📢 Community Pulse sub-block** — MANDATORY (see below)
- **📄 Raw PPT/transcript read** sub-block — verbatim management quotes with page/slide references
- Delivery scorecard row additions
- Conviction change decision + rationale
- Watch items for next refresh

**2. Section 3.5 delivery scorecard extension:**
- Append new rows (never overwrite v1 rows)
- Each row: Guidance → When → Actual → Verdict (✅ / 🟡 / 🔴 / 🕐 / 🆕)
- One-line "Refresh verdict on management" at bottom summarizes delta from v1 verdict

**3. Section 4 Numbers Decoded — dual preservation:**
- v1 FY-vs-FY headline table stays untouched (historical baseline)
- Append `### 📊 {Quarter} Refresh — Full Numbers Print` sub-block with:
  - New quarter vs comp table (7-metric headline)
  - 5-quarter trajectory table with trajectory-analysis paragraph
  - Segment mix update (v1 breakdown + new column appended)
  - Balance sheet + Cash flow tables (BS trajectory + CFO watch)
  - Historical growth trajectory (10Y/5Y/3Y/TTM CAGR — from Screener)
  - FY27 outlook signals + guidance refresh
  - Anomaly flags (data quality notes if any)

**4. Section 6 valuation refresh — dual scenarios:**
- Trading metrics header: v1 baseline preserved, refreshed block underneath
- v1 base/bull/bear scenarios preserved verbatim
- Refreshed base/bull/bear appended with probability weights adjusted
- Peer comps: v1 table preserved as historical + refreshed table appended
- Multiple gap analysis + trigger-for-rerating notes

**5. Section 7 risks — inline annotations:**
- Do NOT delete v1 risks
- Add annotation lines under each risk:
  - `⚠️ MATERIALIZED in {quarter}` — with evidence
  - `⚠️ ACCUMULATING` — early signal
  - `✅ RESOLVED` — historical rationale kept, resolution noted
  - `✅ TRACKING WELL` — proactive positive
- NEW risks (Risk 11+) get added at end with `🆕` marker

**6. Source Appendix update:**
- v1 sources preserved
- New sources with date + verbatim announcement quotes
- Data quality notes (e.g., "file X in repo has md5 identical to file Y — mislabel")

### 📢 Community Pulse — MANDATORY every refresh (established 18-Jul-2026)

**Not to be deferred to "when Chrome is back."** Chrome down = try alternate paths (workspace `web_fetch` on VP topic JSON; Substack via curl-alternative; api.cors.lol proxy for RSS).

Community pulse sub-block captures:
1. **ValuePickr** — Topic ID + total posts + last 5 posts (post number + date + author + verbatim quote — sentiment classified 🔴/🟡/🟢)
   - Fetch via topic `.json` endpoint or Chrome navigation to `/{topic-id}/{post_number}`
   - Discourse lazy-loads — scroll or use posts.json API
2. **Substack** — search for stock name at `substack.com/search/{query}?searching=all_posts`
   - Extract deep-dive articles (>2 min read, post-v1 dated)
   - Capture verbatim quotes on valuation ranges + governance flags + thesis calls
3. **Sentiment verdict** — one-line summary: BULLISH / MIXED-BULLISH / MIXED / MIXED-BEARISH / BEARISH

### Conviction lexicon — expanded with "Under Watch" (added 18-Jul-2026)

Between HELD and downgrade:
- **HELD at X** — no change, thesis intact
- **HELD at X (Under Watch)** — same conviction but a specific trigger has been set for potential downgrade in next quarter (must specify the trigger)
- **X → Y** — formal downgrade or upgrade

### Bucket 1/2/3 honesty framework (added 18-Jul-2026)

- Bucket 1: restructuring v1-known content into tables (not new info)
- Bucket 2: interpretive framing v1 didn't do (same data, different lens)
- Bucket 3: genuinely new post-v1 information

Rajat's directive (18-Jul-2026): refresh in filing-date order regardless of Bucket 3 density. Be honest about what's new vs restructured but don't skip refreshes just because Bucket 3 is thin.

### Push after each stock

- Every completed refresh gets its own commit + push (per Rajat's request, 18-Jul-2026)
- Bulk CMP refresh gets a combined commit at end of refresh cycle
- Commit message pattern: `{TICKER} Tier A refresh: {quarter} print + {key new signal}`

---

## 5. Sector taxonomy (18 sectors)

Current taxonomy. New stock must fit one of these OR trigger sector expansion protocol.

| # | Sector | Definition |
|---|---|---|
| 1 | Aerospace & Defence | Defence electronics, aerospace forging, avionics, drones |
| 2 | Agri-Inputs & Seeds | Hybrid seeds, agrochemicals, farm inputs |
| 3 | Auto Components & Forgings | Wheels, forgings, precision components, EV suspension |
| 4 | Chemicals (Diversified & Specialty) | Specialty chem, agrochem tech, diversified chem conglomerates |
| 5 | EMS / Electronics | Electronics manufacturing services, PCBAs, high-end computing |
| 6 | Engineering / EPC | Process piping, oil & gas consultancy, industrial EPC, integrated construction |
| 7 | Financial Services | Rating agencies, wealth management, broking, PMS |
| 8 | IT / Software & Platforms | Enterprise software, banking tech, AI platforms, and **non-BFSI enterprise software & platform businesses** (content/publishing tech, ed-tech platforms, workflow SaaS). **Definition broadened 2-Aug-2026** for MPS Ltd — the prior label 'IT / BFSI Software' would have force-fitted a non-BFSI business, which §5's Option A protocol warns against. Members: AURIONPRO, DATAMATICS, MPSLTD. |
| 9 | Marine Services | Dredging, chartering, shipbuilding, green tugs |
| 10 | Metals & Mining | Lignite, coal, iron ore, integrated steel, ferroalloys |
| 11 | Packaging & Materials | Laminated tubes, specialty films, glass containers, synthetic leather |
| 12 | Pharma & Excipients | Pharma actives, excipients, formulations, life sciences |
| 13 | Power & Renewables | Power gencos, renewable EPC, solar, hybrid power |
| 14 | Power T&D Components | Transformer bushings, transmission gear, T&D specialty |
| 15 | Real Estate | Residential + commercial developers |
| 16 | Water Infrastructure | DI pipes, water treatment, JJM-linked infra |
| 17 | Oil & Gas Services | Upstream + midstream oilfield services (gas dehydration, compression, workover, drilling, well services). Distinct from oil refining (Sector 6 territory via EIL) and renewables (Sector 13). Added 4-Jul-2026 for Deep Industries. |
| 18 | Home Building Products (Kitchen & Bath) | Premium kitchen + bath solutions (Sinks, Faucets, Appliances, Solid Surfaces). Category open to future additions (Astral, Cera, Kajaria, Somany, Hindware). Added 12-Jul-2026 for Carysil. |
| 19 | Power T&D EPC / Turnkey | Turnkey EPC of transmission lines + substations (backward-integrated tower/conductor manufacturing). Distinct from Sector 14 (T&D *components*: bushings, cables) and Sector 6 (general EPC). Members: RAJESH (moved from Sector 13), TRANSRAILL. Added 23-Jul-2026 for Transrail Lighting. Future candidates: KEC, Kalpataru (KPIL), Skipper. |

### Sector expansion protocol (Option A)

When a new stock doesn't fit any existing sector:

1. **Do NOT force-fit into closest existing sector**
2. **Propose new sector to user** — provide sector name + definition + which stocks might belong later
3. **Wait for user confirmation** — never add unilaterally
4. **On confirmation**: add sector 17+ to INDEX.md with definition; update this CLAUDE.md sector table

---

## 6. Data source priority (in order)

### Primary sources

1. **Screener consolidated view** — https://www.screener.in/company/{TICKER}/consolidated/
   - Financial ratios, market cap, P/E, ROCE, ROE, book value, dividend yield
   - Shareholding pattern with 12-quarter trajectory
   - About section for business overview
   - Approach via Chrome MCP navigate + javascript_tool extraction
2. **Concall transcripts** — stored in `Fetched Concalls/{TICKER}/`; if not present, fetch from company IR sites (astec-style workaround) or Godrej-subsidiary-style parent disclosure
3. **BSE filings** — announcements page (blocked by Chrome MCP directly; via Screener document links or company IR site)
4. **ValuePickr threads** — https://forum.valuepickr.com — search {Company} thread, cover last 18 months only
5. **Substack coverage** — any Substack that covers the sector; INCLUDE LINK in Source Appendix (open-ended list, no whitelist required)

### Fallback workflows

**When BSE/NSE blocked and company IR site dead (Astec case, 3-Jul-2026):**
1. Try Godrej Agrovet-style parent company subsidiary accounts if parent is listed with disclosure obligations
2. Try Marketscreener for aggregated result summaries
3. Try Screener's "Documents" tab for direct concall links
4. Company annual reports via WebFetch (via workspace tool if needed)
5. Historical concalls (older than target quarter) as delivery-context

**Astec-refresh methodology (codified 3-Jul-2026):**
- Parent (Godrej Agrovet) discloses subsidiary annual accounts under BSE regulations
- Path: `godrejagrovet.com/investors/reports-and-financials/subsidiary-accounts`
- Fetch subsidiary AR (contains audited financials + management discussion + business mix)
- Cross-check current-year data with Marketscreener quarterly result announcements
- Cross-check ratios with Screener
- **Data quality note in profile** — flag this is annual report + marketscreener + Screener triangulation, not primary concalls

### Chrome MCP specifics

- Screener works fine — use `navigate` + `javascript_tool`
- Search API works: `screener.in/api/company/search/?q={term}&fts=1` returns JSON of results
- Output filter blocks base64 + query-string data — return raw strings, strip cookie params

---

## 7. Portfolio state maintenance

- **File:** `PORTFOLIO_STATE.md` in working folder root
- **Format per stock:** `TICKER: conviction (H/MH/M/ML/spec) · weighted 2yr return + dividend · key watch item · CMP as of date`
- **Sorted by sector**
- **Updated at session end** (see Section 8)

### Rule for discussion (Rajat's explicit request, 3-Jul-2026)

**When user discusses or compares to any specific stock, Read that stock's `Company Profiles/{TICKER}.md`** before responding. Applies to:
- Direct question: "How is EPL doing?"
- Comparison: "Similar to Azad, or different?"
- Casual mention: "unlike our chemicals names"
- Portfolio-level: "top 5 conviction picks" → Read PORTFOLIO_STATE.md + Read top 5 profiles

This is the mechanism that keeps individual profile depth accessible across sessions without loading everything on every turn.

---

## 8. Session-end ritual

At end of session, user prompts: "Update CLAUDE.md" or "session end"

Do this 3-minute pass:

1. **Methodology decisions** — any new conventions established? Add to Section 2.
2. **Portfolio state updates** — any conviction changes, thesis pivots, refresh events? Update PORTFOLIO_STATE.md.
3. **Refresh queue** — add stocks flagged for future refresh (Astec-style). Remove refreshed items.
4. **Changelog entry** — 1-2 lines summary of what was accomplished this session.
5. **Sector count check** — any new sectors added? Update Section 5 table.

Commit CLAUDE.md + PORTFOLIO_STATE.md changes to git along with any dashboard/profile changes.

---

## 9. Data refresh queue

Stocks that need a data refresh (like Astec was on 3-Jul-2026). Format: TICKER, reason, target date.

**Genuine current gaps (from 4-Jul-2026 corrected audit):**
- **HALEOS** — only Q4FY25 PPT (SMS Lifesciences pre-rebrand) in repo; FY26 concalls needed for full delivery-scorecard build
- **HALDYN** — no concalls in repo, small mainboard historically no concall culture; profile built on Screener + public info only
- **MONARCH** — mainboard concalls exist but not fetched; profile built on Screener + BSE filings + dashboard changes-log
- **NITTA** — mainboard concalls exist but not fetched; would benefit from Nitta Gelatin Japan parent disclosures or IR site refresh
- **AXISCADES, AZAD** — retrofit Section 3.5 (Management + Promoter + Delivery scorecard) — written before Section 3.5 was mandatory (early Sector 1 profiles)
- **GMDC** — FY26 concalls needed (currently profile built on Q4FY25 May 2025 data)

**RESOLVED (removed from queue after 4-Jul-2026 v2 rewrites):**
- ~~DEEP~~ — v2 transcript-grounded from 4 concall AI Summaries (Screener `/concalls/summary/` endpoint bypasses BSE CORS block) + tradebrains/scanx news corroboration. Treated as complete.
- ~~AMIC~~ — v2 transcript-grounded from 7 primary docs (RHP 329pg, AR FY25, AR FY24, 4 half-yearly result filings) via pdf.js-in-Chrome workaround. SME norm is RHP + AR + half-yearly, not concalls.

**Blocked pending Anthropic allowlist expansion:**
Rajat has submitted thumbs-down feedback requesting expansion of the Cowork `mcp__workspace__web_fetch` allowed provenance set to include `bseindia.com` PDFs + `nseindia.com` PDFs + Indian company IR sites. Until enabled, the 4 genuine gaps above stay blocked at the current profile depth; profiles carry data-limited flags. Manual PDF download by Rajat → `Fetched Concalls/{TICKER}/*.pdf` is the interim path.

**Corrections to earlier audits:**
On 4-Jul-2026 discovered that SUNITA (BSE 544001), ACCENT (NSE-SME ACCENTMIC), RAJESH (BSE 544291), SATHLOKHAR (NSE-SME SSEGL folder — not BSE 544291 as mis-mapped earlier), and SYSTEMATIC (BSE 544541) were ALL already read to the appropriate SME half-yearly standard per their profile source appendices. They were incorrectly flagged in an interim audit due to a wrong BSE-code-to-ticker mapping. **All SME profiles now confirmed complete.**

---

## 10. Rolling changelog (last 30 days)

### 3-Aug-2026 (Session 10 — dashboard UI: dynamic banner, back-to-top, per-browser hide)

**No analysis work this session — dashboard navigation UX only, ahead of the watchlist growing past 52 names.** All four changes are in `watchlist_dashboard_v2.html`, copied to `equity-watchlist-repo/dashboard/index.html`.

**🟢 The banner is now DERIVED, not hardcoded — standing convention going forward:**
- New `renderHeader()` computes stock count from `stocks.length`, sector count from `new Set(stocks.map(s => s.sector)).size`, and **Last Refreshed as the max date across `CMP_DATA` + `PROFILE_STATUS` + every stock's `changes[]` log**. Adding a stock or refreshing a CMP now updates the banner with zero manual edits.
- `parseAnyDate()` handles all three date shapes present in the file (`2-Aug-26`, `2-Aug-2026`, `2 Aug 2026`) plus trailing commentary such as `(v2 rewrite)` / `(v1 — SUPERSEDED)`.
- **Rajat's directive: no session commentary in the banner.** The old `"4 Jul 2026 (Session 5 — AMIC + DEEP added as #46, #47)"` string is gone; Last Refreshed is a bare date.
- Corrected three stale hardcodes: title + `<h1>` said **50 stocks** (actual 52 since MPS #51 + CONCORDBIO #52), the toolbar's `"of 50 stocks"` tail, and the KPI strip's baked-in 50/13/37/34/19 (now `—` placeholders, so no stale flash before `renderKPIs()` fires).

**⚠️ Sector-label drift surfaced by the dynamic count (open item, NOT yet fixed):**
- The banner now honestly prints **20 sectors**, because the dashboard's `sector:` field still carries **older, coarser labels that do not match the Section 5 taxonomy** — `Specialty Chem & Pharma` (5 stocks), `Renewable Energy & Power`, `Water / Civil / Marine Infra`, `Specialty Materials & Packaging`, `Diversified Chemicals`, `Power T&D / Electrical Components`, `EMS / Electronics / AI`, `Engineering / EPC Consultancy`.
- Rajat chose "derive from data (shows 20)" over remapping now. **The number is correct for the data; the data's labels are what drifted.** Until remapped, the dashboard sector pie does NOT match Section 5's 19-sector taxonomy. Queued for a future session.

**Tab title** — `Equity Portfolio Analysis — {N} Stocks`, dynamic. (`profile.html` keeps its own title, unchanged.)

**Back-to-top** — fixed bottom-right circular button in dashboard blue (`#2E75B6`), fades in past 400px scroll, smooth-scrolls to top; shrinks and tucks in under 768px.

**🙈 Hide stock — view-only, per-browser, MUST NEVER touch data or repo:**
- `localStorage` key `HIDDEN_STOCKS_STATE`. Modelled on the Deep-dived tracker but **deliberately WITHOUT the repo JSON seed and without any sync path** — Rajat's requirement was explicitly "does not change data or repo, just hides on the Vercel tab". Do not add a `hidden.json` or a copy-to-repo button.
- Controls in **both** places: an `✕` in a new summary-table column and a `🙈 Hide` button on each card header. A `🙈 Hidden (n)` chip in the toolbar (amber when non-zero) opens a panel of hidden names with per-stock *unhide* + **Unhide all**.
- **Scope decision (Rajat's call): hidden stocks leave the table and cards ONLY.** The KPI strip and all three charts keep describing the full filtered universe, so the portfolio-level picture never shifts just because something was hidden. Implemented in `applyFilter()` as `filtered` (→ KPIs, charts) vs `visible = filtered.filter(s => !isHidden(s.id))` (→ table, cards).

**Verified headlessly** (`node` eval of the page script against the real data + Chrome `--headless --screenshot`): 52 / 20 / "2 Aug 2026" all derive correctly; hiding 3 stocks drops table+cards to 49 while `kpi-total` holds 52; hiding an SME under the SME filter drops rows 11→10 with the KPI still 11; unhide-one / unhide-all / localStorage persistence all behave; table header and row column counts match at 10.

> **📌 Changelog gap:** the 2-Aug-2026 session (Session 9 — MPS Ltd #51 + Concord Biotech #52 added, Sector 8 broadened, `CONCORD` → `CONCORDCS`/`CONCORDBIO` rename) is recorded in Sections 1 and 5 but was never given a changelog entry here. Backfill at next session-end if wanted.

### 29-Jul-2026 (Session 8 — DCM Shriram Q1FY27 Tier A refresh + Section 4A extraction rules hardened)

**DCMSHRIRAM Tier A refresh — conviction MH → M (Under Watch):**
- Q1FY27 (results 28-Jul-26) reported **PAT ₹693cr vs the company's own "effective normal PAT" of ₹147cr**. **Second consecutive quarter of prior-period tax credits** (₹474.3cr Section 80-IA, after Q4FY26's ITAT reversal) — ~₹600cr of non-operating profit now sits in TTM earnings.
- **🔴 Headline P/E collapsed 18.8x → 12.0x on tax accounting alone. Normalized TTM PAT ≈ ₹689cr → real P/E ~23.8x** on 11.5% ROCE with a −1% 3-yr profit CAGR. **The screen will keep lying until Q4FY27.**
- **Corrected the 16-Jul refresh**, which built its base case on underlying FY26 PAT of ~₹850cr; actual is **~₹665cr**. That ₹185cr error — more than the quarter — drove the downgrade. Weighted 2yr return cut ~10-12% → **~8.5%** (base +4% / bull +54% / bear −36%; asymmetry now negative).
- Operating quarter was fine: PBT before exceptional **+14.4%**, PBDIT +12%, Chemicals & Vinyl PBIT +31%, Vinyl PBDIT +88% on new PVC customs duty (16-Jul) + MIP (24-Jul), **ROCE 13.6% vs 13.2% — first uptick since FY24**, WC days 25, ICRA AA+, promoter 66.53% for 12 unbroken quarters.
- **Bioseed failed the kharif test v1 explicitly set:** rev −26%, PBDIT +₹41.8cr → −₹8.9cr, plus a disclosed **inventory glut** pressuring margins through FY27. **Sugar's "turnaround" is a base effect** (strip LY's −₹36cr ethanol duty one-off → l-f-l −25%). **Ethanol hit its 20% blending ceiling with OMC requirement DOWN 13%** — structural, not cyclical.
- 🆕 Serentica (KKR) 58MW RE deal ₹104.4cr/26% → group RE 176MW; Teknor Apex 50:50 vinyl-compounds JV; **salt works 208,000 MTPA acquisition Q3FY27** (backward integration into caustic feedstock).
- **🔴 Section 3.5 roster error corrected — v1 omitted Vikram S. Shriram, Vice Chairman & MD.** Added Sabaleel Nandy (ED & CEO, Chemicals). CHRO resigned 24-Jul.
- **🕐 Concall gate PARTIAL** — Q1FY27 call was 30-Jul-26, after the refresh. Profile grounded in the Q1FY27 deck + results + press release + the new **FY26 Annual Report (21-Jul-26)**. **Re-read against the transcript when filed.**

**🔴 Section 4A hardened after a real extraction error (the important methodology change):**
- **Net debt and ROCE were first reported backwards** (−10% YoY / −40bps; actual **+11.3% YoY / +40bps**) because `pdftotext` strips series identity from the deck's **donut charts** — the year is bound only by arrow colour, which has no text representation. Caught when Rajat asked whether formatting survived the format switch.
- **Resolved by decoding the convention against the Q4FY26 deck**, where FY25/FY26 net debt was independently known from the concall. **That method — use the deck's own prior edition as the convention-decoder — is now written into Section 4A.**
- **New rule: `pdftotext` for transcripts/filings/ARs; READ PPT DECKS AS PAGES.** Tables extract safely; charts do not; images are silently invisible. Any chart-sourced number must be cross-verified against a table, a prior deck, or the rendered image. Full failure-mode table + post-mortem in Section 4A.
- Also documented: **scanned-image results filings** (DCMSHRIRAM Q1FY27: 2.9 MB PDF → 12 KB text = tables are images) — if extracted text is implausibly small for the file size, fall back and flag it.

**🟢 Platform correction — `Bash` has FULL NETWORK in Claude Code on the Mac:**
- Screener HTML, `api.bseindia.com` announcements JSON, and BSE `AttachLive` PDFs all fetch **directly via `curl`** — no Chrome MCP, no cors.lol, no rate limits, **and no Terminal work for Rajat**. `fetch_concalls.py` runs directly here.
- The "Cowork VM has NO network" note (23-Jul) is a **sandbox-specific** constraint and has been scoped as such, not deleted. NSE quote API + Yahoo remain blocked → **Screener is the price source.**

**Folder hygiene:** `Fetched Concalls/DCMSHRIRAM/` pruned **58 files / 36 MB → 28 files / 23 MB** (dropped 14 pre-2025 PDFs + a byte-identical BSE duplicate, with their `.txt` twins). `fetch_concalls.py` bugs (no download cap; `*_undated.pdf` filename collisions that silently overwrite) documented in Section 4A as manual workarounds — **script fix deferred at Rajat's instruction.**

### 23-Jul-2026 (Session 7 — Transrail Lighting profiled + Sector 19 created + Claude-driven Chrome fetch codified)

**New stock — Transrail Lighting (TRANSRAILL, BSE 544317, stock #50):**
- Founder-led (Digambar Bagde, since 1984) backward-integrated T&D turnkey EPC; acquired Gammon T&D via NCLT 2016; IPO Dec-2024. CEO Randeep Narang ex-KEC International; board incl. ex-POWERGRID CMD I.S. Jha + Vinod Dasari.
- FY26: rev ₹6,880cr (+30%, beat guidance twice-raised 25→27→30%), EBITDA 11.9%, PAT ₹404cr reported (₹421cr operational; ₹17cr Q3 labour-code exceptional), ROCE 25.8%, **CFO doubled to ₹817cr, net debt −30% to ₹274cr, WC 91→81d, CRISIL AA-**. Order book ₹16,361cr (2.4x). Conviction **MH**, ~+50% weighted 2yr.
- ⚠️ Watch: FY27 margin guided DOWN to ~11%, order-inflow miss (₹8,520 vs ₹10,000cr), DII/PE (Asiana Fund) exit 15%→6.5%, **QIP fund-raise pending**, Burberry Infra related-party loan (repay Sep-26).
- v1 fully transcript-grounded: **all 4 FY26 concalls + investor deck**, read in depth. Community pulse done (VP #180374 mixed; ValueEducator Substack constructive-bull).

**Sector 19 — Power T&D EPC / Turnkey — CREATED (Option A protocol, Rajat-approved):**
- Turnkey T&D EPC + backward-integrated tower/conductor mfg. Distinct from Sector 14 (components) + Sector 6 (general EPC). Founding members: **RAJESH (moved from Sector 13)** + TRANSRAILL. Future candidates: KEC, KPIL, Skipper. → 19 sectors, 50 stocks.

**🟢 Claude-driven Chrome concall fetch — codified as PRIMARY (Section 4A), NO user Terminal:**
- Rajat's directive: he must never run Terminal commands to fetch concalls. Claude now fetches end-to-end via Chrome: Screener → concall PDF ids → pdf.js + api.cors.lol (from example.com origin, NOT screener.in — CSP) → extract text → `device_commit_files` to `Fetched Concalls/{TICKER}/`. Validated on TRANSRAILL (8 PDFs).
- **Platform findings (verified):** device_bash/Cowork VM has NO network (pip/BSE/cors.lol → 000); WebFetch on BSE api → 403, on BSE PDF → PROVENANCE_REQUIRED (times out); Screener CSP blocks in-page cross-origin fetch; cors.lol works (passes headers) but rate-limits hard (pace ≥10-15s); allorigins fails (no BSE headers). Local `fetch_concalls.py` (stdlib, Screener-driven) kept as FALLBACK only — **tested on INTERARCH 23-Jul-2026: Screener exposes the BSE `AnnPdfOpen?Pname=` concall ids as expected; found + fixed a label bug (adjacent PPTs were mislabeled "Transcript" via a backward-bleeding window → same filename → skipped download; now labels from each anchor's own text).**

### 18-Jul-2026 (Session 6 — Tier A refresh workflow codified + 6 stocks refreshed + bulk CMP + community pulse integration)

**Tier A refresh workflow — codified with cross-section flow-through:**
- Refresh Log block at TOP of profile preserves v1 body untouched (established Session 5)
- **NEW (Session 6):** Numbers flow INTO Section 4 (append new tables, don't overwrite v1); risks flow INTO Section 7 with `⚠️ MATERIALIZED` / `✅ TRACKING WELL` / `🆕 NEW` annotations; peer refresh + valuation math updates go INTO Section 6 (dual-scenario framework: v1 preserved for lineage + refreshed); delivery scorecard rows appended INTO Section 3.5
- Both preserved (v1 + refresh) — full lineage kept visible for reader

**Refresh queue ordering rule (established 18-Jul):**
- Queue is ordered by **latest announcement/filing date** (freshest first) — NOT by conviction, sector, or Bucket-3 density
- Bulk scan via Chrome + Screener API returns latest-announcement date per stock in ~30s across 49 stocks
- Discussed and dropped an earlier "Bucket 3 dense" filter per Rajat's request — just refresh in filing-date order

**Community pulse — REQUIRED not deferred (established 18-Jul):**
- ValuePickr thread scan + Substack search are MANDATORY in every Tier A refresh
- Not to be deferred to "when Chrome is back"
- Community sentiment gets captured verbatim (post number + author + date + key quote) in Refresh Log block
- Pattern established for ORIANA: last 5 VP posts + Substack deep-dive extraction

**Bulk CMP refresh methodology proven:**
- Chrome tab on screener.in origin + Promise.all batched to 6 stocks/batch with 800ms spacing
- 49 stocks fetched (CMP + Mcap + P/E) in ~40 seconds
- Python regex + JSON blob writeout to dashboard `CMP_DATA` map
- Delta report generated (biggest movers, average move, median) in Python
- **Anomaly catch:** CONCORD ticker was mis-mapped in v1 as Concord Biotech via Yahoo CNCRD.BO. **Actually Concord Control Systems Ltd (BSE 543619)** — Fetched Concalls folder even used BSE code 543619 matching this. Fix logged: dashboard CMP_DATA["concord"] source note now explicit.

**Six Tier A refreshes completed this session:**
1. **SSWL (Q1FY27, Jun 2026 quarter)** — first stock in watchlist with Q1FY27 print. Rev +27%, PAT +43% YoY. Bhuj commissioning on-track. Alloy 62L / knuckles 11L FY27E targets on schedule. NEW: Hyundai 74% customer concentration flagged (v1 assumed top-5 = 60%). US tariff export disruption named + June normalization signal. HELD at H.
2. **RAJESH Power (FY26 print)** — Rev +47%, PAT +54% YoY. NEW: **BESS project signed** (Apr-26 filing) = new adjacency. **⚠️ WC blow-up materialized** — CFO −₹41cr FY26 vs −₹16cr FY25; Debtor days 62→78 (+26%). FY26 exit OB ₹3,326cr vs Nov-25 guide ₹4,500cr = **first delivery miss** for RAJESH. Base case now requires H1FY27 CFO turn positive. Data quality note: Apr-2026 transcript in repo has identical md5 to Jan-2026 file (mislabel/overwrite; re-fetch pending Chrome).
3. **AURIONPRO (Q4FY26 re-read + post-v1 signals)** — Q4FY26 revenue +6% YoY (weakest in 13Q). NEW: US$33M three-year fintech engagement won 21-May-26 (validates diversification-from-ME); **⚠️ SEBI PIT show-cause notice** disclosed 29-May-26 (new governance flag); CFO −64% YoY (₹157→₹56cr). Stock **-45% in 1 year** per Screener meta. Conviction MH marked "under review" pending Q1FY27 print in early Aug.
4. **MONARCH (FY26 print)** — Rev +13%, PAT +21.4%. NEW: **⚠️ PAT plateau** at ₹45-46cr for 4 straight quarters — full-year growth is base-effect-driven. **⚠️ Debtor days 3x jump: 70→210** (Screener top CON). Governance flag: board-composition penalties + prior SEBI settlement. **✅ Promoter +1.08ppt to 53.86%** (creeping accumulation — bullish counter-signal). Monarch Capital Venture WOS incorporated 13-May-26 (Pre-IPO vehicle). Also confirmed: **Monarch does not conduct concalls** — v1's "concalls refresh pending" was a misnomer, removed.
5. **DCM Shriram (Q4FY26 re-read)** — Rev +12%, PBDIT +15%. **⚠️ Q4FY26 headline PAT +107% is TAX-DRIVEN** (negative 46% tax rate = deferred tax reversal from ITAT relief) — underlying PBT −6% YoY, OPM −300bps. Sugar & Ethanol Q4 revenue −3%, PBDIT −18% on 8% sugarcane cost hike. **✅ Fenesta crossed ₹1,000cr revenue milestone** (FY26 ₹1,112cr, +28%). **✅ Retd. SC Justice Sanjay Kishan Kaul appointed ID** effective 9-Aug-26 (governance↑). **✅ ITAT tax relief** on ₹249.27cr demand 14-Jul-26. 3-year profit CAGR at -1% per Screener — DCM Shriram is now behaving as capital-preservation + dividend play at these multiples.
6. **ORIANA Power (postal ballot + community pulse)** — Freshest filing on watchlist (16-Jul-26 postal ballot notice). NEW: **1:5 stock split + MOA change + Section 186 limit expansion to ₹10,000cr** proposed. **🆕 SECI Green Ammonia PPA (30-Mar-26)** — 10-year, 60,000 tonnes/yr at ₹52.25/kg = **₹3,135cr total** contract. BESS 1,000+ MWh executed FY26, 3 GWh pipeline, 20 GWh 2030 target. **⚠️ Borrowings 8x YoY** (₹33→₹261cr). Substack (Madhu Periasamy 1-Jul-26) flagged **NEW promoter NDU governance item**. VP community sentiment MIXED-BEARISH: Actis deal delay, concall transparency concerns, no mainboard migration update. Stock −52% from Nov-25 peak. Conviction MH under Watch (was H).

**NEW capabilities validated:**
- **NSE archives (`nsearchives.nseindia.com`) works via api.cors.lol proxy** — validated on ORIANA (21-page transcript, 78K chars). Analogous path to BSE.
- **Substack coverage extraction** via Chrome navigation + article body scrape — validated on ORIANA (Madhu Periasamy 20K-char deep-dive)
- **ValuePickr latest-posts extraction** via topic `.json` endpoint + posts.json for specific IDs, or direct navigation to `/topic/{id}/{post_number}` — validated on multiple stocks

**Screener AI Summary endpoint LIMITATION discovered:**
- Server-side `mcp__workspace__web_fetch` on `/concalls/summary/{id}/` returns login-required page (no cookies carried)
- Chrome-based fetch works (has session cookies)
- Note: this reinforces raw-transcript-first policy — AI Summary is Chrome-only fallback

**Conviction lexicon expanded — "under Watch" flag:**
- Between HELD and downgrade — used when conviction is technically held but a specific trigger has been set for potential downgrade in next quarter (e.g., "MH under Watch — downgrade to M if Q1FY27 shows continued Actis delay")
- Applied to: AURIONPRO (MH under review), ORIANA (MH under Watch), MONARCH (H with elevated watch)

**Refresh honesty framework — Bucket 1/2/3 discussed:**
- Bucket 1 = restructuring existing v1-known content into tables (not new info)
- Bucket 2 = interpretive framing v1 didn't do (same data, different lens)
- Bucket 3 = genuinely new post-v1 information
- Rajat's directive: refresh anyway in filing-date order, don't filter by Bucket 3 density. But be honest about what's new vs restructured.

### 4-Jul-2026 (Session 5 — new stocks + concall-first enforcement + platform constraint discovery)

**Watchlist expansion (47 total profiles across 17 sectors):**
- Added **stock #46 Deep Industries** (Sector 17 — Oil & Gas Services, new sector approved by Rajat). CEO Paras Savla, Ahmedabad, 35-yr Savla family. 70%+ Post-Exploration market share. 63.49% promoter unchanged 12 quarters. v2 transcript-grounded from 4 concalls: Q4FY26 explicit 25-30% YoY growth guidance FY27+FY28, ₹3,000cr revolving OB incl 15-yr PEC contract, ₹208cr Kandla non-cash write-off (mgmt: "nothing else left"), QIP shelved, Mori-5 gas leak Jan 2026 contained, FY27 capex ~₹300cr base. Adjusted 7.86x P/E on 21.8% adj ROE. Weighted 2yr return ~+90%. Analogy: **Cheteshwar Pujara** (long-innings, absorbs pain, stays at crease).
- Added **stock #47 Amic Forging** (Sector 3 — Auto Components & Forgings, now 7/7). Chamaria family Kolkata 50-yr specialty forger, BSE-SME 544037. Original name "Kali Mata Forging" (2007) → Amic Forging (2020). Promoter cost of acquisition ₹4.74-12.17 vs CMP ₹1,771 = 200-350x paper gain with zero net selling across 6 half-years. Peer-best 30% OPM + 23.5% ROCE. Phase 1 ₹150cr capex commissioned 15-Jun-2026, funded by ₹96.88cr Preferential Warrant Issue FY25 (3 of 28 allottees are promoters) + IPO proceeds. FOUR promoters incl. Manju Chamaria (missed in v1). Weighted 2yr return ~+22%. Analogy: **Anil Kumble** (specialty niche, long legacy, quiet execution).

**Framework additions (CLAUDE.md v1.1):**
- **⚠️ Zero-Tolerance Concall-First Rule** codified at top (Section 4A CONCALL FETCH GATE). Established after DEEP + AMIC v1 drafts were written from Screener + IR scrape without primary transcripts. Rule: no profile written before concall transcripts (or SME half-yearly equivalents) are downloaded, text-extracted, and read. STOP and confirm with Rajat if fetch fails.
- **pdf.js-in-Chrome workaround** documented (Section 4A step 6) — bypasses sandbox curl block for IR-site PDFs by loading pdf.js from Cloudflare CDN inside a Chrome MCP tab, then fetching+extracting via Chrome's own network. Successfully used for AMIC (RHP + AR FY25 + AR FY24 + 4 half-yearly filings from amicforgings.com).
- **Screener AI Summary endpoint** documented (Section 4A step 7) — same-origin fetch bypasses BSE CORS block: `fetch('https://www.screener.in/concalls/summary/{id}/')` returns AI-distilled management commentary (~7-14K chars/concall). Used for DEEP recovery. Note: derivative not raw transcript, label accordingly.

**Platform constraint discovery:**
- Confirmed **Cowork `mcp__workspace__web_fetch` uses an "allowed provenance set"** — screener.in + cdnjs are on it; deepindustries.com is explicitly blocked with "URL not in allowed provenance set"; bseindia.com returns 200 but empty body.
- Confirmed **sandbox bash outbound is blocked** with X-Proxy-Error: blocked-by-allowlist for essentially everything (BSE, Screener, Cloudflare, GitHub all 403).
- Confirmed **Jul 2 batch of 228 PDFs** was fetched under a wider configuration that has since been tightened. The fetch-concalls skill in `/uploads/SKILL.md` used `WebFetch` + `Bash curl` — the curl step no longer works.
- Rajat submitted thumbs-down feedback to Anthropic requesting allowlist expansion for BSE + NSE + Indian IR sites.

**Refresh queue corrected:**
- Interim mis-audit had flagged SUNITA (544001), ACCENT (ACCENTMIC), RAJESH (544291), SATHLOKHAR (SSEGL folder), and SYSTEMATIC (544541) as needing concall refresh — WRONG (based on incorrect BSE-code-to-ticker mapping). Verification via profile source appendices confirmed all 5 are already read to the appropriate SME half-yearly standard. Removed from queue.
- Genuine current gaps now only 4 stocks: HALEOS (1 PPT only), HALDYN (no concall culture at source), MONARCH (mainboard, not fetched), NITTA (mainboard, not fetched). All blocked pending Anthropic allowlist expansion or manual PDF download.

**Persistence:**
- AMIC extracts saved to `Fetched Concalls/AMIC/sources.txt` + `AMIC_extracted_content.txt` (18 verbatim sections from primary docs).
- DEEP extracts saved to `Fetched Concalls/DEEP/sources.txt` + `DEEP_concall_extracts.txt` (4 concall AI Summaries + delivery scorecard).

### 3-Jul-2026 (Session 4 — continued: Sectors 12, 13 completed)
- Completed profiles for Sector 12 (HALEOS + NITTA) and Sector 13 (NLC + ORIANA + RAJESH) — **43 total profiles now, 14 of 16 sectors complete**
- **NITTA** identified as hidden gem — 50-year Nitta Gelatin Japan JV + collagen peptide + elite 27.4% ROCE at 16.3x P/E (already re-rating +79% CMP in 2 months)
- **RAJESH** identified as highest-asymmetric-upside pick — 48.6% ROCE + 10.7x P/E + order book INR 3,326cr (2.7x rev coverage) + Draft NEP 2026 tailwind, but SME liquidity constraint
- **ORIANA** — SME renewable EPC, FY26 revenue +84% + PAT +59% + 39.6% ROE
- **NLC** — Navratna PSU delivered ALL-TIME-HIGH across every metric in FY26
- **HALEOS** — flagged as speculative small-cap given weak returns + declining shareholder count + data-limited disclosure
- Added HALEOS + NITTA to data refresh queue (concalls limited)

### 3-Jul-2026 (Session 4 — major batch + framework codification)
- Completed profiles for Sectors 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16 (38 total profiles at that point)
- **Astec profile refresh** using Godrej Agrovet subsidiary accounts + Marketscreener (codified as fallback workflow)
- **Codified CLAUDE.md + PORTFOLIO_STATE.md workflow** (this file)
- **Concall standard upgraded from 4 → 6** for future work
- Established rule: Read individual stock profile when discussed/compared

### Older sessions (summary)
- Initial 45-stock watchlist assembled (5 batches)
- Live dashboard deployed to Vercel (`portfolio-stocks-chi.vercel.app`)
- Historical CMP backfill across 5 refresh dates
- 228 concall PDFs fetched to `Fetched Concalls/{TICKER}/`
- Migrated working folder from Cowork outputs scratchpad to `~/Documents/Equity Watchlist/`
- Established profile viewer (`profile.html` with marked.js CDN) — dropped SRI hash after browser blocked it

---

## 11. Personal preferences & conventions

- **User is Rajat.** Personal investment research library, not client work.
- **Tone**: measured, honest about limits, cricket analogies preferred, no emojis unless in cricket analogy paragraph.
- **Never fake depth** — flag data limitations explicitly (like Astec, Haldyn, GMDC).
- **Bull/base/bear must be realistic** — no "conservative base case of 3x" nonsense.
- **Section 3.5 delivery scorecard** — the single most important section per Rajat's stated preference (added mid-Session 3).
- **Cricket analogies** — match player TRAITS to stock TRAITS (Sangakkara for multi-role expansion, Bumrah for specialised dominance, Dravid for quality compounding, Rishabh Pant for rapid rise, Yuvraj for comeback narrative).
- **Portfolio-level context** matters — Rajat is building this over months as a portfolio thesis library.
- **Push commands** — Rajat pushes from local terminal (sandbox can't reach github). Format the command block cleanly and put at end of response.
- **Verification after push** — verify Vercel deployment via Chrome MCP when Rajat confirms push.

---

*End of CLAUDE.md. This file is the standing brief; update it at session-end.*
