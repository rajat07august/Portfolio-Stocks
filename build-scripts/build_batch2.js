// Batch 2: Defence / Engineering / Auto — Equity Deep-Dive Report
// 14 stocks: SMEs first, then main-board
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  TabStopType, TabStopPosition, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak
} = require('docx');

const border = { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" };
const borders = { top: border, bottom: border, left: border, right: border };

const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, bold: true })] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, bold: true })] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t, bold: true })] });
const P  = (t) => new Paragraph({ children: [new TextRun(t)], spacing: { after: 120 } });
const Bul = (t) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun(t)], spacing: { after: 80 } });
const PB = () => new Paragraph({ children: [new PageBreak()] });
const Spacer = () => new Paragraph({ children: [new TextRun("")] });

function tc(text, opts = {}) {
  const { bold = false, shade = null, width = 2340, align = AlignmentType.LEFT, color = null } = opts;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: shade ? { fill: shade, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ alignment: align, children: [new TextRun({ text: String(text), bold, color: color || undefined })] })]
  });
}

function summaryTable(rows) {
  const headers = ["Stock", "Sector", "Mcap (₹Cr) [Source]", "Thesis (1-line)"];
  const colWidths = [1700, 1700, 2000, 3960];
  const tableWidth = colWidths.reduce((a, b) => a + b, 0);
  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: "1F4E79", type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: "FFFFFF" })] })]
    }))
  });
  const dataRows = rows.map((r, idx) => new TableRow({
    children: r.map((cell, i) => tc(cell, { width: colWidths[i], shade: idx % 2 === 1 ? "F2F2F2" : null }))
  }));
  return new Table({ width: { size: tableWidth, type: WidthType.DXA }, columnWidths: colWidths, rows: [headerRow, ...dataRows] });
}

function factTable(rows) {
  const colWidths = [3000, 6360];
  const tableWidth = 9360;
  return new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows.map((r, idx) => new TableRow({
      children: [
        tc(r[0], { bold: true, width: colWidths[0], shade: "F2F2F2" }),
        tc(r[1], { width: colWidths[1] })
      ]
    }))
  });
}

const cover = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 240 },
    children: [new TextRun({ text: "Equity Watchlist Deep-Dive", bold: true, size: 56 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text: "Batch 2: Defence / Engineering / Auto", bold: true, size: 36 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 },
    children: [new TextRun({ text: "14 stocks — SMEs first, then main-board", italics: true, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text: "Prepared for: Rajat", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text: "Date: April 2026", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 },
    children: [new TextRun({ text: "Lens: Near-term catalysts (6-18 mo) | Valuation / margin of safety | Sector tailwinds", italics: true, size: 22 })] }),
  PB()
];

const methodology = [
  H1("Methodology — Source Notes"),
  P("Same structure as Batch 1. Per your request, every market cap quoted in this report is sourced and the source is named inline. Sources are third-party stock data aggregators that quote Screener / NSE / BSE data — Tickertape, Groww, Trendlyne, Business Standard, MarketsMojo, Whalesbook, ScanX, etc. Where the same stock has different market caps reported on different days within April 2026, both numbers are mentioned with their respective dates so you can reconcile vs. live Screener once you allowlist the domain."),
  P("Numbers should be re-checked on Screener.in before any action — markets move daily; the analysis here is directional."),
  P("Important caveat: 4 of 14 names are SME-platform listed (OBSC Perfection, Sunita Tools, Yash Highvoltage, Systematic Industries) — low free-float and limited public coverage. Position-sizing matters more than entry multiples for these."),
  PB()
];

const execSummary = [
  H1("Executive Summary — Batch 2"),
  P("All 14 names quick-scan with sourced market caps."),
  summaryTable([
    ["OBSC Perfection (SME)", "Auto + Defence precision", "935.55 (Business Standard, 29-Apr-26)", "₹1,200 Cr OB; pivoting to defence/marine; Q3 FY26 rev +70.5%."],
    ["Sunita Tools (SME)", "Precision tools → Defence", "590-643 (April 2026, multi-source)", "Faridabad shell-line live; Middle East defence MOU; speculative pivot."],
    ["Yash Highvoltage (SME)", "Transformer bushings", "1,995.70 (Business Standard, 30-Apr-26)", "240% 1-yr return; T&D capex pure-play; rich valuation."],
    ["Systematic Industries (SME)", "OFC / OPGW + power lines", "431-457 (Tickertape / IndMoney, Apr-26)", "IPO Sep-25; 54% rev growth H1; new OFC/OPGW thrust."],
    ["Paras Defence", "Defence optics + Drones + Space", "6,401 (Trendlyne via search, Apr-26)", "Drone JV with Heven (Israel); marquee but small base; volatile."],
    ["Azad Engineering", "Aerospace + Energy + Defence forgings", "13,981 (Business Standard, Apr-26)", "OB ₹6,500 Cr+ (10x rev); MHI 8-yr deal; Baker Hughes win."],
    ["AXISCADES", "Aerospace ER&D + EMS", "8,248 (BW Businessworld, early Apr-26)", "9M FY26 rev ₹886 Cr +25%; $18mn OEM deal; aero +28%."],
    ["Dynamatic Tech", "Aerospace + Hydraulics + Auto", "6,737.11 (MarketsMojo, 9-Apr-26)", "Boeing/Airbus tier-1; Q3 FY26 +35% rev; FY26 PAT thin (₹43 Cr)."],
    ["DEE Devp Engineers", "Process piping + Seamless pipe", "2,968 (Trendlyne, Apr-26)", "FY26 OB ₹1,940 Cr; FY27 target ₹1,500 Cr rev; +88% 1-yr return."],
    ["Happy Forgings", "Forgings (CV + tractor + farm)", "12,521 (Trendlyne, Apr-26)", "EBITDA margin 28.6%; FY26 muted on US Class 8 drag."],
    ["Sansera Engineering", "Auto forging + ADS + Aerospace", "15,762 (Solidarity / Mangalkeshav, Oct-25/Apr-26)", "Q3 FY26 +25% rev; ADS target ₹1,300 Cr by FY30."],
    ["Rossell Techsys", "Aerospace/defence EMS exports", "2,734.5 (MarketsMojo, 6-Mar-26)", "99% exports; OB ₹700 Cr; Q3 FY26 +71% rev — but PAT thin."],
    ["Steel Strips Wheels", "Auto wheels (steel + alu)", "3,366 (Yahoo, 29-Apr-26)", "FY26 rev ₹3,708 Cr (post-acquisition); Q3 PAT -2.3%."],
    ["Wheels India", "Auto wheels (CV/tractor/earth)", "3,000 (Trendlyne, Apr-26)", "Q3 FY26 PAT +44%; CV/tractor cycle exposure; air-susp leader."]
  ]),
  PB()
];

function stockSection(meta) {
  const pieces = [];
  pieces.push(H1(meta.name));
  pieces.push(new Paragraph({
    children: [ new TextRun({ text: meta.tag, italics: true, color: "595959" }) ],
    spacing: { after: 200 }
  }));
  pieces.push(factTable(meta.facts));
  pieces.push(Spacer());
  pieces.push(H3("Business in Plain English"));
  meta.business.forEach(p => pieces.push(P(p)));
  pieces.push(H3("Sector Tailwinds"));
  meta.tailwinds.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("MOAT"));
  meta.moat.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("Growth Drivers"));
  meta.growth.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("Order Book / Revenue Visibility"));
  meta.orderbook.forEach(p => pieces.push(P(p)));
  pieces.push(H3("Management Execution"));
  meta.management.forEach(p => pieces.push(P(p)));
  pieces.push(H3("Key Risks"));
  meta.risks.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("Valuation Snapshot"));
  meta.valuation.forEach(p => pieces.push(P(p)));
  pieces.push(H3("Near-Term Catalysts (6-18 months)"));
  meta.catalysts.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("Margin-of-Safety View"));
  meta.mos.forEach(p => pieces.push(P(p)));
  pieces.push(PB());
  return pieces;
}

// 1. OBSC PERFECTION
const obsc = stockSection({
  name: "1. OBSC Perfection Ltd (NSE SME)",
  tag: "Sector: Precision metal components (Auto + Defence + Marine + Telecom) | Listed: Sep-2024 IPO | Status: Auto-anc with defence pivot",
  facts: [
    ["Market Cap", "₹935.55 Cr (Business Standard, 29-Apr-26 quote of ₹379)"],
    ["Q3 FY26 Revenue Growth", "+70.5% YoY"],
    ["H1 FY26", "Revenue +32% YoY; EBITDA +38%; PAT +45%"],
    ["Order Book", "~₹1,200 Cr (Trade Brains, 2026)"],
    ["Recent orders", "₹22.6 Cr machined parts 7-yr nomination (Apr-26); ₹3.4 Cr US marine export"],
    ["Customers", "Auto Tier-1 suppliers + Defence + Marine + Telecom infra OEMs"]
  ],
  business: [
    "OBSC Perfection manufactures precision-machined metal components — gears, shafts, valve bodies, fittings — for Tier-1 auto suppliers (who in turn supply OEMs like Tata Motors, M&M, Maruti) and increasingly for defence, marine, and telecom infrastructure customers. Founded 2017 in Maharashtra; came to the SME platform in Sep-2024.",
    "Revenue is tooling-and-component manufacture for assemblies; the new growth leg is non-auto (defence + marine + telecom) where margins are higher and customer relationships are longer-tenured."
  ],
  tailwinds: [
    "Auto-ancillary localisation push: PLI auto-comp scheme + China+1 sourcing → Indian Tier-2/3 part makers winning incremental wallet share.",
    "Defence indigenisation: MoD's 75% domestic procurement target by FY27 + iDEX scheme.",
    "Marine: Indian Navy + Coast Guard fleet expansion + commercial shipbuilding revival (per the KMEW thesis).",
    "Telecom infra: 5G rollout + BharatNet → component demand for towers, transmission gear.",
    "Replacement market for precision components — long tail of demand."
  ],
  moat: [
    "Multi-vertical capability — not pure auto-anc; defence + marine + telecom diversification reduces cyclical risk.",
    "Long-cycle contracts: 7-year nomination orders (recent ₹22.6 Cr) provide annuity-like visibility.",
    "Precision machining capacity is capital-intensive → entry barrier for new players.",
    "Honest caveat: at this scale (~₹250-350 Cr revenue), the moat is execution and customer-stickiness, not technology. Sansera, Bharat Forge, Endurance Tech are upstream peers."
  ],
  growth: [
    "Order book of ~₹1,200 Cr on TTM revenue base of ~₹250 Cr = ~4-5 years visibility.",
    "Recent ₹22.6 Cr 7-yr nomination order signals long-cycle programmes ahead.",
    "Defence + marine + telecom mix scaling — higher-margin verticals than auto-anc.",
    "FY27 revenue could double if order conversion holds at current pace."
  ],
  orderbook: [
    "Order book ~₹1,200 Cr (Trade Brains, FY26 disclosure). Composition: largely auto + emerging defence/marine.",
    "Recent additions: ₹22.6 Cr long-cycle nomination (Apr-26), ₹3.4 Cr export to US marine customer.",
    "Visibility: 4-5 years at current execution rate."
  ],
  management: [
    "First-generation promoter from Maharashtra industrial belt; SME IPO in Sep-2024 — track record short but execution since IPO has been credible (Q3 FY26 +70.5% rev growth).",
    "Promises kept: H1 FY26 +32% revenue, EBITDA margin holding — meets/beats IPO offer doc forecasts.",
    "Capital allocation: SME IPO proceeds deployed for capacity expansion; debt managed.",
    "Watch-out: SME-listed → governance risk; investor disclosure quality should be tracked. Quarterly results have been timely so far."
  ],
  risks: [
    "SME platform → low free float, limited liquidity, governance overhang.",
    "Auto-anc cyclical: passenger vehicle / commercial vehicle slowdown directly hits volumes.",
    "Customer concentration: top 3-5 customers likely 60%+ of revenue.",
    "Execution risk on defence/marine programs — different qualification cycles, longer working capital.",
    "Working capital balloon if Tier-1 customers stretch payment cycles.",
    "Competition from larger players (Sansera, OBSC's own customers internalising machining) ramping."
  ],
  valuation: [
    "FY26E revenue ~₹350-400 Cr; PAT estimate ~₹35-50 Cr at current margin trajectory.",
    "Mcap ~₹935 Cr → FY26 P/E ~19-25x.",
    "Comparable: Sansera ~25-30x, Bharat Forge ~30-35x, Mahindra CIE ~15-18x — OBSC at lower end given size.",
    "Directional view: reasonable for the OB-led growth profile if execution holds; SME platform discount is justified."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26) — full-year ₹400 Cr+ revenue confirmation.",
    "Order book milestone past ₹1,500 Cr.",
    "Defence ministry / Navy direct order disclosure.",
    "Possible migration from SME to Mainboard.",
    "New customer addition in marine / telecom verticals."
  ],
  mos: [
    "MoS thin given valuation + SME risk; entry only on order-book milestones.",
    "Position sizing: 1-1.5% of portfolio max.",
    "Watch for mainboard migration as the de-risking catalyst.",
    "Hard stop: any quarter of decelerating order inflow + receivable expansion → reduce."
  ]
});

// 2. SUNITA TOOLS
const sunita = stockSection({
  name: "2. Sunita Tools Ltd (BSE SME)",
  tag: "Sector: Precision tools / mould bases → Defence (artillery shells) | Status: Speculative defence pivot",
  facts: [
    ["Market Cap", "₹590.36-643.70 Cr range (Tickertape / IndMoney, April 2026)"],
    ["52-wk High/Low", "₹1,123.85 / ₹552.45 (10-Apr-26 source)"],
    ["Recent share price", "₹879 (Sep-25), ₹966.20 (25-Feb-26 close)"],
    ["Defence MOU", "Middle East firm for M107 (155mm) artillery shell order"],
    ["Faridabad 2nd factory", "Rented for shell production; Line 2 commercial Oct-26"],
    ["Legacy biz", "Mould bases, ground plates, precision CNC parts (auto/pharma/electronics)"]
  ],
  business: [
    "Sunita Tools is a 1988-vintage Mumbai-based engineering company that traditionally made ground plates, mould bases, and precision CNC-machined parts for moulding tools used in automotive, pharma, electronics, and consumer goods plants. Customers are mould-makers and OEM tooling departments.",
    "FY26 strategic pivot: signed MOU with a Middle East partner for M107 (155mm artillery shells) defence orders, rented a second factory in Faridabad explicitly for shell production with commercial Line 2 targeted by Oct-26. This is a meaningful change in business mix — from precision tools to defence ammunition manufacturing."
  ],
  tailwinds: [
    "Indian defence ammunition: MoD pushing private sector ammunition production via SOPs; large-calibre artillery shells (155mm) demand from Indian Army + export.",
    "Middle East / global ammunition shortage post-2022 conflicts → Indian private suppliers benefit from offset opportunities.",
    "Tool & die / mould industry growth at 8-10% CAGR with manufacturing capex.",
    "Plastic injection mould demand from EV battery housings, electronics enclosures.",
    "Pharma & food packaging mould demand."
  ],
  moat: [
    "Precision tooling capability — long lead time to develop quality control + customer trust.",
    "First-mover among small private players in 155mm shell manufacturing (most peers are PSUs - Munitions India, OFB).",
    "Asset-base in two cities (Mumbai + Faridabad) gives geographic flexibility.",
    "Honest caveat: very small scale; M107 capability still being proven; defence ammunition is a regulated sector with high entry barriers — Sunita's MOU with a Middle East partner is what enables their entry, but execution risk is high. This is a speculative pivot, not a proven defence player."
  ],
  growth: [
    "Faridabad shell line 2 commercial Oct-26 — defines FY27 H2 onwards revenue.",
    "Middle East shell order value not disclosed but the MOU implies meaningful order pipeline.",
    "Legacy mould-base business steady at ~10% growth.",
    "Possible follow-on defence orders if Line 2 execution succeeds."
  ],
  orderbook: [
    "Specific order book size not disclosed publicly.",
    "MOU with Middle East firm provides initial defence shell order — value not announced in detail.",
    "Legacy mould business is project-based, no order book per se."
  ],
  management: [
    "Family-run business; long history (since 1988) in moulds and tools.",
    "Recent corporate action — defence pivot, Faridabad rental, Middle East MOU — shows ambition but execution is unproven in the new vertical.",
    "Capital allocation: rental of factory (vs. owned) is capital-light for the defence pilot — sensible.",
    "Communication: limited investor presentation cadence; quarterly disclosures are basic. Investor relations would benefit from upgrade.",
    "Watch-out: defence pivot + Middle East partner + 155mm shell capability is a high-execution-risk strategy. Investors should track whether Line 2 commercial milestone is met by Oct-26."
  ],
  risks: [
    "SME / micro-cap → liquidity, governance, and disclosure risk.",
    "Defence pivot is speculative — first commercial shell production is still a year away.",
    "Middle East partner reliance — political / sanctions / payment risk.",
    "Capability/quality issues in 155mm shell manufacturing — defence customers reject easily.",
    "Legacy mould business margins under pressure from larger peers.",
    "Promoter holding / family disputes (typical for small Indian SMEs)."
  ],
  valuation: [
    "FY26E revenue (legacy + early defence) ~₹100-150 Cr; PAT ~₹10-20 Cr.",
    "Mcap ~₹590-640 Cr → FY26 P/E 30-50x range — very rich for the size.",
    "Valuation reflects defence pivot expectations, not current earnings.",
    "Directional view: speculative; speculative bets like this require small position sizing + clear milestone tracking."
  ],
  catalysts: [
    "Oct-26 Faridabad Line 2 commercial commissioning.",
    "First M107 shell delivery announcement.",
    "Disclosure of Middle East order value.",
    "Q4 FY26 results (May-26) — quarterly cadence.",
    "MoD / Indian Army order — would be a major re-rating event."
  ],
  mos: [
    "Very thin MoS — speculative pivot at rich valuation.",
    "Position sizing: 0.5-1% portfolio max.",
    "Hard stop: Oct-26 commissioning slip → exit.",
    "Best for high-risk-tolerance investors only."
  ]
});

// 3. YASH HIGHVOLTAGE
const yash = stockSection({
  name: "3. Yash Highvoltage Ltd (BSE SME)",
  tag: "Sector: Transformer Bushings (OIP, RIP, High-Current) | Listed: BSE SME | Status: T&D capex pure-play, rich valuation",
  facts: [
    ["Market Cap", "₹1,995.70 Cr (Business Standard / IndMoney, 30-Apr-26)"],
    ["Recent share price", "₹692 (BSE, 27-Apr-26)"],
    ["1-yr return", "+240.92% (rich rally)"],
    ["Last-month return", "+58.73%"],
    ["Plant", "Savli, Vadodara, Gujarat"],
    ["Capacity", "2,500 OIP + 500 HC + 1,500 RIP bushings + 1,200 FRP cylinders/guard rings"],
    ["Founded / Public", "Incorporated 2002; converted to public 2018"]
  ],
  business: [
    "Yash Highvoltage manufactures transformer bushings — the high-voltage insulators that bring electrical energy out of transformer enclosures. Three product lines: OIP (Oil-Impregnated Paper) bushings — traditional, large transformers; RIP (Resin-Impregnated Paper) — newer, dry-type; and HC (High-Current) bushings — for HVDC and large-power applications. Plus FRP cylinders and guard rings.",
    "Customers are transformer makers (Bharat Heavy Electricals, ABB, Siemens, CG Power, GE T&D, Voltamp) who in turn supply utilities and industrial customers. Bushings are a critical small component of every transformer; Yash is among the few Indian manufacturers."
  ],
  tailwinds: [
    "Indian T&D capex: ₹9.15 lakh Cr planned in 2022-32 plan → transformer demand → bushing demand.",
    "RDSS distribution scheme: 25 cr+ smart meters + new transformers.",
    "Renewable evacuation grid: Khavda, Dholera, Banaskantha solar parks need new substations + transformers.",
    "Replacement cycle: India has 15-20% of transformer fleet > 25 years old — replacement demand.",
    "Export potential: Bushings are exportable; global T&D capex (Middle East, Africa) growing."
  ],
  moat: [
    "Specialised manufacturing — bushings require precision insulation engineering; few Indian players (CG Power, Voltamp historically), Yash is among them at this scale.",
    "Local supplier preference: Indian transformer makers want indigenous bushings to avoid import dependency on ABB / Trench Group / Hitachi.",
    "Capacity at Vadodara is sized for the next 2-3 years' demand without new capex.",
    "Honest caveat: bushings are a small ticket-size product; Yash competes with global majors who have brand + scale; pricing power moderate."
  ],
  growth: [
    "T&D capex multi-year tailwind.",
    "Capacity utilisation has scope to ramp; current capacity is recently expanded.",
    "Export market — Middle East / Africa grid expansion provides volume.",
    "RIP bushing share gain — newer technology, displacing OIP in some applications."
  ],
  orderbook: [
    "Order book size not transparently disclosed for SME.",
    "Customer base of large transformer makers provides recurring annual orders.",
    "Visibility: 6-12 months of revenue typically visible from existing customer schedules."
  ],
  management: [
    "Promoter family from Vadodara industrial cluster.",
    "Promises kept: massive 240% 1-yr stock return suggests good operational delivery, but it has been a momentum-driven rally too.",
    "Capital allocation: capacity expansion at Savli has been on schedule; debt managed.",
    "Watch-out: rapid rally + SME platform = governance / disclosure scrutiny needs to keep pace.",
    "Communication: limited; SME-cap → investor relations underdeveloped."
  ],
  risks: [
    "Valuation rich — 1-yr return of 240% has stretched multiples.",
    "T&D capex cycle moderation — if RDSS / utility capex slows, demand impact.",
    "Customer concentration: 3-4 transformer makers likely 70%+ of revenue.",
    "Commodity input — copper, aluminum, paper insulation — fixed-price contracts erode margin if costs rise.",
    "SME platform — low free-float, governance, liquidity.",
    "Competition from ABB / Trench Group / global majors with deep technical edge."
  ],
  valuation: [
    "FY26E revenue ~₹150-200 Cr (estimated based on capacity + utilisation); PAT ~₹30-50 Cr.",
    "Mcap ~₹1,996 Cr → FY26 P/E 40-65x — very rich for SME.",
    "Comparable: CG Power (much larger) ~50-60x, Voltamp ~25-30x.",
    "Directional view: rally has discounted multi-year tailwind already; near-term upside limited from current levels."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — confirms growth run-rate.",
    "Capacity expansion announcement (post-current capacity utilisation).",
    "Major export contract win.",
    "Mainboard migration.",
    "Possible OFS / promoter sale (would be overhang)."
  ],
  mos: [
    "MoS very thin at current levels — momentum-driven rally has stretched multiples.",
    "Best entry: meaningful drawdown (20-30%) post any quarterly miss.",
    "Position sizing: 1% portfolio max for SME at this valuation.",
    "Sector tailwind is real but valuation premium is steep."
  ]
});

// 4. SYSTEMATIC INDUSTRIES
const systematic = stockSection({
  name: "4. Systematic Industries Ltd (NSE SME)",
  tag: "Sector: OFC + OPGW + Power Transmission Lines | Listed: Sep-2025 IPO | Status: Hyper-growth fibre/grid play",
  facts: [
    ["Market Cap", "₹431.32-457.8 Cr range (April 2026, Tickertape/IndMoney)"],
    ["Earlier Mcap", "₹358.6 Cr (21-Feb-26); ₹380.41 Cr (8-Apr-26)"],
    ["IPO", "Sep-2025: 59,28,000 equity shares (₹55.28L fresh + ₹4L OFS)"],
    ["H1 FY26 Revenue Growth", "+54% YoY"],
    ["Targeted growth", "25-30% annual from new OFC & OPGW products"],
    ["Balance sheet", "Nearly debt-free"],
    ["Recent share price", "₹193.15 (23-Apr-26)"]
  ],
  business: [
    "Systematic Industries makes Optical Fiber Cables (OFC), Optical Ground Wire (OPGW), and conventional power-transmission line conductors. OPGW is a specialty cable that doubles as a ground wire on overhead transmission lines and as an optical-fiber backbone — used by utilities for grid telecommunications. OFC serves telecom infrastructure; conductor / power transmission cables serve utilities.",
    "Customer base: Indian utilities (PowerGrid, state transcos), private telecom / data players, and cable distributors. The new growth thrust is OFC + OPGW where the company has invested in modern manufacturing."
  ],
  tailwinds: [
    "5G + BharatNet rollout = OFC demand in millions of fiber-km.",
    "Renewable evacuation = OPGW demand on every transmission line.",
    "T&D capex of ₹9.15 lakh Cr in 2022-32 → transmission conductor demand.",
    "Data centre boom = backbone fiber demand.",
    "Export market — Middle East / Africa fiber rollouts growing.",
    "Paperless / digital push by govt drives fiber penetration in interior."
  ],
  moat: [
    "Backward integrated cable + conductor manufacturing.",
    "Modern OPGW capacity — niche specialty product, fewer Indian competitors (Sterlite Tech, KEI, Polycab in OFC; few in OPGW).",
    "Debt-free balance sheet → can self-fund expansion.",
    "Honest caveat: OFC is becoming commoditised; OPGW is niche but small market; Systematic competes with much larger Sterlite Tech."
  ],
  growth: [
    "H1 FY26 +54% revenue → strong base; second-half should sustain 30-40% growth.",
    "OFC + OPGW capacity ramp → product mix shift toward higher-margin specialty products.",
    "Export contracts in pipeline (per IPO offer doc).",
    "FY27 revenue could double from FY26 if conversion holds."
  ],
  orderbook: [
    "Specific order book not disclosed; cable / OFC / OPGW is contract-based with utilities + telecom.",
    "Visibility 6-9 months from existing customer schedules.",
    "OPGW orders (specialty) have longer cycle — 12-18 months."
  ],
  management: [
    "First-generation promoter; IPO Sep-2025 at small size.",
    "Promises kept: H1 FY26 +54% revenue exceeds IPO offer doc 30-35% guidance.",
    "Capital allocation: IPO proceeds used for OFC/OPGW capacity, working capital — sensible.",
    "Debt-free balance sheet is a positive signal.",
    "Communication: limited (recent listing); investor presentations basic but improving.",
    "Watch-out: SME platform; rapid scale-up needs control infrastructure to keep pace."
  ],
  risks: [
    "OFC commoditisation — pricing pressure from Chinese imports + Sterlite scale.",
    "OPGW market is small; single customer concentration risk.",
    "Telecom capex cycle: 5G rollout decelerating post-FY27 → OFC volume normalises.",
    "T&D capex slowdown — RDSS / state utility delays affect orders.",
    "SME platform liquidity / governance.",
    "Working capital — cable industry has 4-6 month receivable cycles."
  ],
  valuation: [
    "FY26E revenue ~₹250-300 Cr (post H1 +54%); PAT ~₹25-35 Cr.",
    "Mcap ~₹431-457 Cr → FY26 P/E 13-18x — reasonable for the growth profile.",
    "Comparable: Sterlite Tech ~25-30x (much larger), KEI Industries ~30-35x, Polycab ~30-40x.",
    "Directional view: cheaper than peers but smaller scale + SME discount; reasonable entry zone for incremental positions."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26) — confirms full-year growth.",
    "Major OPGW contract win from PowerGrid / state transco.",
    "Mainboard migration.",
    "Export contract — Middle East / Africa.",
    "Capacity expansion announcement.",
    "5G phase-2 rollout / BharatNet phase-3 award."
  ],
  mos: [
    "Reasonable MoS at current levels — valuation is not stretched given growth.",
    "Position sizing: 1-2% portfolio fit for SME with strong fundamentals.",
    "Watch for mainboard migration as the de-risking catalyst."
  ]
});

// 5. PARAS DEFENCE
const paras = stockSection({
  name: "5. Paras Defence and Space Technologies Ltd",
  tag: "Sector: Defence Optronics + Drones + Space Components | Status: Marquee defence small-cap, drone JV catalyst",
  facts: [
    ["Market Cap", "₹6,401 Cr (search-quoted Trendlyne/Finology, Apr-26)"],
    ["1-yr return", "+16.8% (laggard vs broader defence rally)"],
    ["Q3 FY26 PAT", "₹18.21 Cr (+21.1% YoY from ₹15.04 Cr)"],
    ["Q1 FY26 PAT", "₹14.27 Cr (+1.14%); Total income ₹95.57 Cr (+13.62%)"],
    ["Drone JV", "With Heven (Israel) for hybrid drones"],
    ["Capabilities", "Defence optics, EMP shielding, satellite components, drone systems, naval electronic systems"]
  ],
  business: [
    "Paras Defence makes a portfolio of defence + space products: optical & electro-optical systems (sights, sensors for tanks, naval ships, missiles), EMP/EMI/HEMP shielding, satellite components (mirrors, gimbals, structural parts), drone systems, and naval electronic systems. Customers are DRDO, ISRO, defence PSUs (BEL, BDL, HAL, Mishra Dhatu Nigam), and Indian Navy directly.",
    "Drone JV with Israeli player Heven is a meaningful FY26 development — gets Paras into the high-growth military drone segment."
  ],
  tailwinds: [
    "Indian defence indigenisation: 75% domestic procurement target by FY27.",
    "Optronics is a high-priority segment under iDEX + Make-In-India for defence.",
    "Drone warfare imperative post-Ukraine: Indian Army modernisation budget for drones rising sharply.",
    "Space sector: ISRO + private space cos like Skyroot / Pixxel growing → satellite components demand.",
    "Defence exports: govt has pushed export targets to ₹50,000 Cr by FY29.",
    "Fast-track procurement for emergency capital procurement."
  ],
  moat: [
    "Optronics is a niche, IP-heavy capability — Paras has been investing for 15+ years; few private Indian competitors.",
    "Tier-1 defence customer relationships (DRDO labs, BEL, BDL); long qualification cycles create entry barrier.",
    "Drone JV with Israeli partner gives technology + market access.",
    "Honest caveat: still small-cap; revenue growth is lumpy because defence orders are large + episodic. MTAR Tech, Astra Microwave, Data Patterns are comparable defence small-caps."
  ],
  growth: [
    "Q3 FY26 PAT +21% suggests recovery from FY25 weakness.",
    "Drone JV — first product launches likely FY27.",
    "EMP shielding orders for satellites + defence platforms.",
    "Optronics for new platforms (Tejas Mk2, AMCA, naval frigates).",
    "Space components for ISRO + private space + commercial geo-stationary missions."
  ],
  orderbook: [
    "Specific OB not disclosed in granular form for FY26.",
    "Recent contracts include 18-month execution defence orders.",
    "Visibility: 12-18 months of work tied to ongoing programmes."
  ],
  management: [
    "Sharad Shah (Chairman) and Munjal Shah (MD) — first-generation founders with engineering depth.",
    "Promises kept on capability building (optronics, EMP, drones); revenue execution has been lumpy due to defence procurement cycles.",
    "Capital allocation: post-IPO (Oct-21) proceeds deployed in capacity + R&D.",
    "Watch-out: stock has been volatile; FY24-25 had margin pressure; FY26 recovery underway.",
    "Communication: detailed concalls; transparent on order pipeline."
  ],
  risks: [
    "Defence order cyclicality — Q-on-Q lumpiness; can have weak quarters.",
    "MoD procurement delays — order awards push out frequently.",
    "Margin pressure: defence cost-plus pricing limits upside.",
    "Drone JV execution — Israel-India geopolitics, technology transfer challenges.",
    "Smaller scale vs MTAR / Data Patterns — multiple stays compressed.",
    "Working capital intensity — defence customers slow payers."
  ],
  valuation: [
    "FY26E revenue ~₹400-450 Cr; PAT ~₹65-80 Cr.",
    "Mcap ~₹6,401 Cr → FY26 P/E 80-100x — very rich.",
    "Comparable: MTAR Tech ~50-60x, Data Patterns ~70-80x, Astra Microwave ~60-70x.",
    "Directional view: rich multiples; needs sustained earnings growth + drone JV ramp to justify."
  ],
  catalysts: [
    "Q4 FY26 results (May-26).",
    "Drone JV first product launch.",
    "Major defence order announcement (optronics for new platform).",
    "Defence ministry budget Apr-26 — capital procurement allocation.",
    "Possible export order win.",
    "ISRO satellite commission contracts."
  ],
  mos: [
    "MoS thin at current valuation; need pullback or multi-quarter earnings beats.",
    "Best entry: 20-30% drawdown creates ~60-70x P/E entry — still rich but more reasonable.",
    "Position sizing: 1.5-2.5% portfolio fit; long-term theme.",
    "Defence basket diversifier — pair with HAL, BDL, BEL for portfolio balance."
  ]
});

// 6. AZAD ENGINEERING
const azad = stockSection({
  name: "6. Azad Engineering Ltd",
  tag: "Sector: Aerospace + Energy + Defence Precision Components | Listed: Dec-2023 IPO | Status: High-conviction order-book compounder",
  facts: [
    ["Market Cap", "₹13,981 Cr (Business Standard, Apr-26); range ₹10,495-13,884 Cr"],
    ["9M FY26 Revenue", "₹432.98 Cr (+32% YoY)"],
    ["9M FY26 PAT", "₹97.03 Cr (already exceeds full-year FY25 ₹88.52 Cr)"],
    ["Order Book", "₹6,500+ Cr (~10x FY26E revenue)"],
    ["Marquee deals", "MHI 8-yr contract for gas turbine components; Baker Hughes deal (recent)"],
    ["1-month return", "+51% (rally on new plant + Baker Hughes news)"],
    ["End-markets", "Aerospace OEMs, energy turbines, defence missiles"]
  ],
  business: [
    "Azad Engineering manufactures precision-forged and machined components for aerospace (engines, airframes), energy (gas turbine + steam turbine blades, vanes), and defence (missile components, naval equipment). Customers are global OEMs: GE Aerospace, Mitsubishi Heavy Industries, Siemens Energy, Baker Hughes, Honeywell, Pratt & Whitney, Eaton.",
    "Manufacturing footprint in Hyderabad. Promoter Rakesh Chopdar built the company over 15+ years pre-IPO; came to mainboard Dec-2023 at ~₹524 IPO price; has been a multibagger."
  ],
  tailwinds: [
    "Global aerospace supply chain restructuring — OEMs moving away from China; India is preferred alternative.",
    "Engine spares + new-build demand for narrow-body fleet (LEAP, GTF) — multi-year visibility.",
    "Energy transition: gas turbines for grid balancing + LNG; turbine blade demand strong.",
    "Defence indigenisation — missile components localising.",
    "Commercial aerospace order backlog at Boeing/Airbus is multi-decade — Tier-2 forging suppliers benefit.",
    "China+1 supply chain shift creates structural opportunity."
  ],
  moat: [
    "Long qualification cycles in aerospace/energy precision components — 5-7 years to qualify with one OEM.",
    "Once qualified, sole-source / second-source positions provide annuity-like revenue.",
    "Integrated forging + machining + finishing capability.",
    "Engineering depth: ability to make rotating turbine blades from exotic alloys (Inconel, titanium) is rare.",
    "Marquee customer base — GE, MHI, Siemens, Baker Hughes — provides credibility moat for new wins.",
    "Honest caveat: small scale vs global peers; growth is order-led, not technology-led monopoly."
  ],
  growth: [
    "Order book ₹6,500 Cr / FY26E rev ₹600 Cr = ~10x book-to-bill — exceptional visibility.",
    "MHI 8-year contract is annuity revenue.",
    "Baker Hughes new deal (FY26) adds energy-services exposure.",
    "New plant ramp adds capacity.",
    "FY27 revenue could reach ₹800-1,000 Cr (~50% growth).",
    "FY28-30 vision implicit in order book: ₹1,500-2,000 Cr annual revenue."
  ],
  orderbook: [
    "₹6,500+ Cr at end of 9M FY26 (per Business Standard / Whalesbook reporting). Visibility: 10x FY26 revenue.",
    "Marquee programmes: MHI 8-yr gas turbine, Baker Hughes, GE/Honeywell aerospace.",
    "Composition: aerospace + energy + defence diversified.",
    "OB likely to grow further — bid pipeline of high-quality global OEMs."
  ],
  management: [
    "Rakesh Chopdar (founder-CEO) — first-generation promoter; engineering background; track record of execution since 2008.",
    "Promises kept: 9M FY26 PAT already exceeded FY25 full-year — strong execution.",
    "Capital allocation: post-IPO proceeds deployed for capacity expansion; debt low; no major dilution.",
    "Communication: investor presentations are detailed; concall transparency good.",
    "Watch-out: rapid scale-up + order book growth requires execution + margins + working capital discipline. Far better track record than typical small-cap defence/aero."
  ],
  risks: [
    "Customer concentration: top 5-6 OEMs likely 70%+ of revenue.",
    "Currency: large export revenue → INR appreciation risk.",
    "Aerospace cycle: any global aviation slowdown hits delivery schedules.",
    "Aluminium / titanium / nickel-alloy raw material price volatility.",
    "Talent retention: niche skills, attrition can hit execution.",
    "Capacity ramp execution risk."
  ],
  valuation: [
    "FY26E revenue ~₹600-650 Cr; PAT ~₹130-150 Cr.",
    "Mcap ~₹14,000 Cr → FY26 P/E 95-105x — very rich.",
    "Comparable: MTAR Tech ~50-60x, Aequs (private), Data Patterns ~70-80x.",
    "FY28E revenue ~₹1,000-1,200 Cr; PAT ~₹220-260 Cr → forward P/E ~55-65x.",
    "Directional view: premium reflects highest-quality OB + customer pedigree; multibagger if execution holds."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26) — full-year ₹600 Cr+ revenue, ₹130 Cr+ PAT confirmation.",
    "Order book milestone past ₹7,500 Cr.",
    "New customer addition (Pratt & Whitney / Rolls-Royce / Safran).",
    "Capacity expansion announcement / new plant commissioning.",
    "Possible MSCI/Nifty inclusion."
  ],
  mos: [
    "MoS thin at 100x P/E — entirely growth-driven valuation.",
    "Best entry: 25-35% pullback during a market correction = 60-70x forward P/E entry.",
    "Position sizing: 2-3% portfolio fit for highest-conviction defence/aero exposure.",
    "Among top 3 names in Batch 2 for long-term wealth creation, but valuation discipline matters."
  ]
});

// 7. AXISCADES
const axiscades = stockSection({
  name: "7. AXISCADES Technologies Ltd",
  tag: "Sector: Aerospace ER&D + EMS | Status: ER&D platform with EMS optionality",
  facts: [
    ["Market Cap", "₹8,248 Cr (BW Businessworld, early-Apr-26)"],
    ["Q3 FY26 Revenue", "₹343 Cr (+25% YoY)"],
    ["9M FY26 Revenue", "₹886 Cr; EBITDA ₹144 Cr; PAT ₹72 Cr"],
    ["Q3 FY26 EBITDA", "₹63 Cr (+55.3% YoY)"],
    ["Aerospace revenue", "+28% YoY in Q3"],
    ["Recent deal", "$18 mn aerospace OEM contract (3-5 year execution)"],
    ["DAL facility", "165,000 sq ft Devanahalli aero land — fully operational with 2 global OEM partnerships"],
    ["Promoter", "JVC of Tata-promoted entity (Tata-Boeing era roots)"]
  ],
  business: [
    "AXISCADES is a global engineering services + EMS player focused on aerospace, defence, automotive, industrial heavy machinery. Three businesses: (1) ER&D services — design, engineering, simulation, FEA/CFD for aerospace & defence customers (Boeing, Airbus, Honeywell, GE, BAE, Lockheed, HAL); (2) EMS — electronic manufacturing for defence + industrial; (3) Aerospace components manufacturing via Devanahalli Aero Land (DAL) facility — 165,000 sq ft with fixed-asset partnerships with global OEMs.",
    "Revenue mix tilting toward higher-margin aerospace services + manufacturing. The DAL facility is the differentiated asset that brings exclusivity with two global OEMs."
  ],
  tailwinds: [
    "Aerospace ER&D outsourcing: global OEMs offshoring 25-30% of design work to India.",
    "Defence indigenisation + private participation in defence platforms (Tejas Mk2, AMCA, naval ships).",
    "Make-In-India aerospace components manufacturing.",
    "AI/ML adoption in engineering services drives margin expansion.",
    "China+1 in industrial / defence engineering services."
  ],
  moat: [
    "DAL facility is a structural moat — exclusive global OEM partnerships create stickiness.",
    "20+ years of relationship with Boeing / Airbus / GE / Lockheed.",
    "Tata Group lineage + governance pedigree.",
    "Capability across simulation, design, manufacturing — full-stack player.",
    "Honest caveat: ER&D services is competitive (KPIT, Cyient, L&T Tech, Tata Tech, HCL Tech). AXISCADES' aerospace specialization differentiates."
  ],
  growth: [
    "Aerospace +28% YoY in Q3 → driving overall growth.",
    "DAL facility ramp — 2 global OEM partnerships still scaling.",
    "$18 mn OEM deal (3-5 yr execution) adds visible revenue.",
    "Defence + space ER&D pipeline strong.",
    "EMS-side defence electronics growing."
  ],
  orderbook: [
    "Order book / signed mandates not consolidated number in public.",
    "ER&D services have multi-year master service agreements (MSAs) with anchor customers.",
    "$18 mn aerospace OEM deal disclosed Q2-Q3.",
    "DAL facility has long-term partnership commitments."
  ],
  management: [
    "Tata Group lineage; current leadership has been executing aerospace pivot effectively over 5+ years.",
    "Promises kept: Q3 FY26 EBITDA +55% vs revenue +25% → operating leverage delivering.",
    "DAL facility commissioning on schedule.",
    "Capital allocation: capex disciplined; balance sheet healthy.",
    "Communication: detailed concalls; segment-wise reporting good.",
    "Watch-out: stock has had 100%+ rally over 2-3 years — execution must continue to justify."
  ],
  risks: [
    "Customer concentration: top 5 aerospace customers likely 60%+ revenue.",
    "Currency: ER&D services is INR cost / USD revenue — currency favorable but volatile.",
    "Global aerospace cycle — any slowdown hits.",
    "ER&D outsourcing competition from KPIT, Cyient, Tata Tech, L&T Tech.",
    "Talent attrition in aerospace engineers.",
    "EMS-side margin pressure typical of contract manufacturing."
  ],
  valuation: [
    "FY26E revenue ~₹1,200-1,250 Cr (annualised 9M run-rate); PAT ~₹95-110 Cr.",
    "Mcap ~₹8,248 Cr → FY26 P/E ~75-85x — rich.",
    "Comparable: KPIT Tech ~55-60x, Tata Tech ~40-50x, L&T Tech Services ~40-45x.",
    "AXISCADES trades premium for aerospace specialization + DAL exclusivity.",
    "Directional view: rich valuation; needs sustained 25%+ growth + margin expansion to justify."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26).",
    "DAL facility full ramp (FY27).",
    "New major OEM deal announcement.",
    "Defence platform participation (Tejas Mk2 / AMCA).",
    "AI / digital tools commercialisation in ER&D.",
    "Possible Tata Group consolidation events (Tata Tech alignment)."
  ],
  mos: [
    "MoS thin given valuation premium.",
    "Best entry: 20% pullback creates ~60x forward P/E — still premium but more reasonable.",
    "Position sizing: 1.5-2% portfolio fit.",
    "Long-term aerospace ER&D theme is durable; valuation discipline matters."
  ]
});

// 8. DYNAMATIC TECHNOLOGIES
const dynamatic = stockSection({
  name: "8. Dynamatic Technologies Ltd",
  tag: "Sector: Aerospace + Hydraulics + Auto Components | Status: Boeing/Airbus tier-1; thin earnings, capacity ramp story",
  facts: [
    ["Market Cap", "₹6,737.11 Cr (MarketsMojo, 9-Apr-26)"],
    ["FY26 Revenue", "₹1,426.6 Cr"],
    ["FY26 PAT", "₹43.04 Cr (margin thin)"],
    ["Q3 FY26 Net Sales", "₹424.87 Cr (+34.7% YoY, +8.28% QoQ — record quarter)"],
    ["Aero programmes", "Flap Track Beam for Airbus A330 + A320 family (single largest export contract)"],
    ["Customers", "Boeing, Airbus, Bell, Spirit AeroSystems, Bell-Boeing V-22, Eaton, Magna, Renault, Volkswagen"]
  ],
  business: [
    "Dynamatic Technologies is a precision-engineering company with three businesses: (1) Aerospace — Tier-1 supplier to Airbus + Boeing for assemblies (Flap Track Beam for A320/A330 is signature); (2) Hydraulics — high-pressure components for industrial + agriculture + commercial vehicles; (3) Auto Components — components for global auto OEMs (Renault, VW, Magna, Eaton).",
    "Promoter is Udayant Malhoutra family. Recent years have seen capex pivot toward higher-margin aerospace; hydraulics business is steady annuity; auto is cyclical."
  ],
  tailwinds: [
    "Global aerospace recovery — narrow-body production ramp at Airbus + Boeing.",
    "Indian aerospace ecosystem development (Airbus + Boeing supplier base in Bengaluru/Hyderabad).",
    "Defence + space optionality — emerging via partnerships.",
    "Hydraulics demand from infra, agriculture mechanisation, commercial vehicles.",
    "Auto recovery (PV + CV)."
  ],
  moat: [
    "Aerospace tier-1 qualification with Boeing + Airbus is rare in India — multi-year qualification cycles.",
    "Flap Track Beam is signature single-source program.",
    "Vertical integration of forging + machining + assembly capability.",
    "Hydraulics business is annuity with industrial customer relationships.",
    "Honest caveat: scale vs global aerospace tier-1s (Spirit AeroSystems, Triumph) is small; auto-comp business commoditised."
  ],
  growth: [
    "Q3 FY26 +35% YoY = aerospace ramp visible.",
    "Aerospace capacity expansion at Bengaluru.",
    "New Airbus contracts add visibility.",
    "Hydraulics demand recovery in industrial / agri mechanisation.",
    "Possible defence / space contract wins."
  ],
  orderbook: [
    "Aerospace programmes are multi-year; visibility 5-10 years on existing programmes (A320/A330 Flap Track Beam).",
    "New Airbus contract (announced 2024) adds ~5 years visibility.",
    "Auto + hydraulics — annual / project-based."
  ],
  management: [
    "Udayant Malhoutra family — long history; some governance perception drag historically.",
    "Promises kept: aerospace ramp on schedule; FY26 revenue at ₹1,427 Cr is record.",
    "Capital allocation: aerospace capex prioritised; debt managed.",
    "Watch-out: PAT thin (₹43 Cr on ₹1,427 Cr revenue) — margin profile weak vs. peers; need margin recovery to justify Mcap.",
    "Communication: quarterly investor calls; transcripts available."
  ],
  risks: [
    "PAT margin compression — FY26 PAT at 3% of revenue is too low for the Mcap.",
    "Aerospace cycle: any Boeing/Airbus production slowdown hits.",
    "Auto + hydraulics commodity nature.",
    "Currency fluctuation on aerospace exports.",
    "Single-program risk — Flap Track Beam alone is significant exposure to A320/A330.",
    "Larger global tier-1 competition."
  ],
  valuation: [
    "FY26 reported PAT ₹43 Cr; Mcap ₹6,737 Cr → FY26 P/E ~155x — extremely rich on current earnings.",
    "Forward (FY28E) revenue ~₹1,800-2,000 Cr; PAT ~₹150-200 Cr → P/E ~35-45x.",
    "Story is margin recovery + aerospace ramp.",
    "Directional view: only justifiable if margin trajectory recovers; speculative until then."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results — margin trajectory critical.",
    "New Airbus / Boeing contract announcement.",
    "Aerospace plant capacity ramp.",
    "Possible defence/space contract.",
    "Hydraulics business turnaround / sale.",
    "Promoter / strategic stake change."
  ],
  mos: [
    "MoS very thin — Mcap is a leap of faith on margin recovery.",
    "Best entry: 25-35% drawdown post any margin disappointment.",
    "Position sizing: 1-1.5% portfolio max.",
    "Better risk-reward in Azad / Sansera within this batch."
  ]
});

// 9. DEE DEVELOPMENT ENGINEERS
const dee = stockSection({
  name: "9. DEE Development Engineers Ltd",
  tag: "Sector: Process Piping + Heavy Fabrication + Power | Listed: 2024 IPO | Status: Order-book compounder + new seamless pipe plant",
  facts: [
    ["Market Cap", "₹2,968 Cr (Trendlyne via search, Apr-26)"],
    ["1-yr return", "+88.8%"],
    ["FY26 Order Book (31-Mar-26)", "₹1,940.07 Cr"],
    ["FY26 Order Inflow", "₹1,869.67 Cr"],
    ["FY26 Execution", "₹1,158.22 Cr"],
    ["FY27 Revenue Target", "₹1,500 Cr"],
    ["FY27 Order Pipeline", "₹4,000-5,000 Cr"],
    ["Mar-26 Inflow", "₹155.70 Cr; L1 ₹209 Cr"],
    ["Capex", "New seamless pipe plant"]
  ],
  business: [
    "DEE Development Engineers makes process piping solutions — high-pressure, high-temperature pipes and fittings for refineries, petrochemicals, power plants, fertilizers, oil & gas, and chemical/specialty plants. Customers are EPC contractors (L&T Hydrocarbon, Toyo, Tecnimont, Linde) and direct end-users (Indian Oil, BPCL, GAIL, Reliance).",
    "Listed in 2024 (IPO at ₹203). Promoter is Krishan Lalit Bansal family. Announced new seamless pipe plant capex which is a meaningful capacity addition + technology upgrade."
  ],
  tailwinds: [
    "Refinery + petchem capex: Reliance Jamnagar, IOC, BPCL, ONGC capex cycle reviving.",
    "Fertilizer revival: govt subsidy restructure + new urea plants.",
    "Power capex: thermal modernisation + new units (NTPC, JSW Energy).",
    "Oil & gas pipeline rollout: gas grid expansion under PMUY.",
    "Specialty chemicals capex (drives high-spec piping demand).",
    "Defence + nuclear expansion (boutique high-spec piping)."
  ],
  moat: [
    "Engineering capability: high-pressure / high-spec piping is technical; few Indian players (DEE, ISGEC, Tata Projects' fabrication arm).",
    "Long customer relationships with EPC / end-users.",
    "Vertical integration with new seamless pipe plant — moves up the value chain.",
    "Honest caveat: process piping is project-based + cyclical; competition fragmented; pricing pressure is real."
  ],
  growth: [
    "Order book ₹1,940 Cr / FY26 execution ₹1,158 Cr = 1.7x book-to-bill.",
    "FY27 target ₹1,500 Cr revenue (~30% growth).",
    "FY27 pipeline ₹4-5K Cr — even 20-25% conversion adds ₹1K Cr to OB.",
    "Seamless pipe plant ramp adds capacity + margin.",
    "Refinery capex revival drives multi-year tailwind."
  ],
  orderbook: [
    "₹1,940.07 Cr at end FY26 (Apr-2026 disclosure).",
    "Inflow: ₹1,870 Cr in FY26.",
    "L1: ₹209 Cr awaiting award.",
    "Pipeline: ₹4-5K Cr active bidding.",
    "Visibility: 18-24 months at current execution rate."
  ],
  management: [
    "Krishan Bansal family — first-generation; track record across the company's 35+ year history.",
    "Promises kept: post-IPO (2024) FY26 OB delivery and inflow have exceeded IPO offer doc guidance.",
    "Capital allocation: seamless pipe plant capex announced; debt managed.",
    "Communication: investor presentations are detailed; quarterly disclosures regular.",
    "Watch-out: rapid scale-up (88% 1-yr return) means valuation has discounted execution."
  ],
  risks: [
    "Refinery / petchem capex cyclicality.",
    "Customer concentration: large EPC contractors take 50%+ of revenue.",
    "Steel input price volatility.",
    "Competition fragmented: many small fabricators undercut on price.",
    "Working capital — process piping has 6-9 month receivable cycles.",
    "Seamless pipe plant execution risk."
  ],
  valuation: [
    "FY26E revenue ~₹1,160 Cr; PAT ~₹85-100 Cr (estimate based on margin trend).",
    "Mcap ~₹2,968 Cr → FY26 P/E ~30-35x.",
    "FY27E revenue ₹1,500 Cr (mgmt target); PAT ~₹130-150 Cr → P/E ~20-23x.",
    "Comparable: ISGEC ~30x, Praj Industries ~25-30x, Anup Engineering ~30-35x.",
    "Directional view: fairly valued for growth profile; near-term entry discipline matters."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26).",
    "FY27 H1 OB conversion + inflow run-rate.",
    "Seamless pipe plant commissioning.",
    "Major refinery / petchem order announcement.",
    "Defence / nuclear contract (would be re-rating).",
    "Inclusion in mid/small-cap indices."
  ],
  mos: [
    "Reasonable MoS at ~30x P/E for 30%+ growth.",
    "Best entry: 10-15% pullback to FY27 P/E ~18-20x is attractive.",
    "Position sizing: 2-3% portfolio fit.",
    "Among better fundamentals + valuation in this batch."
  ]
});

// 10. HAPPY FORGINGS
const happy = stockSection({
  name: "10. Happy Forgings Ltd",
  tag: "Sector: Forgings (CV + Tractor + Off-Highway) | Status: Premium quality forging franchise, FY26 muted",
  facts: [
    ["Market Cap", "₹12,521 Cr (Trendlyne via search, Apr-26); some sources ₹10,334 Cr"],
    ["Q1 FY26 Revenue", "₹350 Cr (+3.6% YoY)"],
    ["Q2 FY26 Revenue", "₹377.39 Cr (+4.5% YoY)"],
    ["Q1 FY26 EBITDA Margin", "28.6% (industry-leading)"],
    ["Tractor Q1 growth", "+9% YoY"],
    ["FY26 thesis", "MHCV growth + tractor + ICE + non-auto segment expansion"],
    ["Drag", "US Class 8 truck market weakness"]
  ],
  business: [
    "Happy Forgings is a leading manufacturer of complex forged + machined components for commercial vehicles (engine, transmission, chassis), tractors, off-highway (construction, mining), and increasingly industrial / non-auto segments. Customers: Tata Motors, M&M, Ashok Leyland, Volvo, Daimler, Cummins, Caterpillar, Eicher, Bharat Forge (downstream).",
    "Promoter: Paritosh Kumar Garg family. IPO in Dec-2023 at ₹850 — has been a steady performer. Industry-leading EBITDA margins (28%+) reflect high-quality machining content + customer mix."
  ],
  tailwinds: [
    "Indian MHCV recovery: post-FY25 weakness, FY26-27 cycle uptick expected.",
    "Tractor cycle: monsoon + rural recovery + govt schemes drive volumes.",
    "PV / SUV growth: smaller forging components.",
    "Non-auto: industrial machinery, oil & gas, defence, wind energy → diversification.",
    "Export demand from US/EU CV markets (despite Class 8 short-term weakness).",
    "Premium / high-content components shift (auto industry shifting to BS6.2, EV adjacencies)."
  ],
  moat: [
    "Quality / precision: Happy Forgings has industry-leading EBITDA margins reflecting high-content machined components vs. raw forgings.",
    "Customer mix premium: Tier-1 OEMs + global names.",
    "Capacity at Ludhiana with full-stack capability (forging + machining + treatment).",
    "Investment in non-auto segments (industrial + railway) reduces auto-cyclical exposure.",
    "Honest caveat: Bharat Forge is the giant in this space; Happy is mid-cap with niche premium positioning. Sansera, MM Forgings, Ramkrishna Forgings are direct comparables."
  ],
  growth: [
    "Domestic MHCV recovery — Happy expects to outperform industry growth.",
    "Tractor +9% YoY momentum continues.",
    "Non-auto / industrial segment ramping.",
    "Export market — global CV recovery in FY27 (Class 8 cycle mean-reversion).",
    "Margin expansion via higher value-add machined components."
  ],
  orderbook: [
    "Forging is annual contract / SOP-based — no formal OB.",
    "Customer programs typically 3-5 year visibility.",
    "Pre-bookings disclosed in concalls indicate FY27 ramp."
  ],
  management: [
    "Paritosh Garg family — second-generation; engineering depth.",
    "Promises kept: industry-leading margins through cycle; FY26 muted growth reflects cycle, not execution.",
    "Capital allocation: capex disciplined; debt low; dividend policy moderate.",
    "Communication: detailed quarterly concalls; segment-wise disclosures.",
    "Watch-out: FY26 revenue growth at 3-5% is below trend; need cycle uptick to drive growth narrative."
  ],
  risks: [
    "MHCV cycle prolonged weakness.",
    "US Class 8 weakness drag continues.",
    "Steel + alloy input price volatility.",
    "Tractor cycle dependency on monsoon.",
    "Customer concentration: Tata Motors, M&M, Ashok Leyland likely 60%+ revenue.",
    "Slowdown in capex from CV OEMs."
  ],
  valuation: [
    "FY26E revenue ~₹1,500 Cr; PAT ~₹250-280 Cr (margin slightly compressed).",
    "Mcap ~₹12,500 Cr → FY26 P/E ~45-50x.",
    "FY27E revenue ~₹1,800-2,000 Cr; PAT ~₹350-400 Cr → P/E ~30-35x.",
    "Comparable: Bharat Forge ~50-60x (premium for size), Sansera ~25-30x, MM Forgings ~25x.",
    "Directional view: premium for quality + margins; FY26 muted entry creates moderate MoS."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26).",
    "MHCV cycle inflexion in FY27.",
    "US Class 8 truck cycle recovery.",
    "Non-auto segment milestone (industrial / wind / oil & gas customer addition).",
    "Capacity expansion announcement.",
    "Possible export contract wins."
  ],
  mos: [
    "Moderate MoS — current valuation is premium but not stretched given quality.",
    "Best entry: 15-20% pullback creates ~25-28x forward P/E entry.",
    "Position sizing: 2-3% portfolio fit; 18-24 month cycle horizon.",
    "Better earnings quality than most batch peers; cycle entry is the key."
  ]
});

// 11. SANSERA ENGINEERING
const sansera = stockSection({
  name: "11. Sansera Engineering Ltd",
  tag: "Sector: Auto Forging + ADS (Aerospace/Defence/Semicon) | Status: Diversified forging compounder",
  facts: [
    ["Market Cap", "₹15,762 Cr (Solidarity / Mangalkeshav, Oct-25/Apr-26)"],
    ["Q3 FY26 Revenue", "₹908 Cr (+25% YoY) — record quarterly"],
    ["Q3 FY26 EBITDA", "₹164 Cr (+29% YoY); margin 18.1% (record)"],
    ["FY26 ADS Target", "₹300 Cr"],
    ["FY27 ADS Target", "~₹600 Cr"],
    ["FY30 ADS Vision", "~₹1,300 Cr"],
    ["Stock recent high", "+85% from Mar-25 low"]
  ],
  business: [
    "Sansera Engineering is a precision-forged components specialist with three segments: (1) Auto-ICE — connecting rods, rocker arms, finger followers, balancer shafts, gear shifter forks for 2W, PV, CV; (2) Auto-EV / non-engine — components agnostic to powertrain (suspension, steering, chassis, brake); (3) ADS — Aerospace, Defence, Semiconductor — high-margin diversification.",
    "Listed in 2021. Promoter: S Sekhar Vasan. Customer base: Maruti Suzuki, M&M, Tata Motors, Honda, Bajaj, Yamaha, Continental, Bosch, Eaton, Pratt & Whitney, BHEL, etc."
  ],
  tailwinds: [
    "Auto recovery + EV transition (non-engine components are EV-agnostic).",
    "ADS growth — aerospace + defence + semiconductor secular themes.",
    "China+1 supply chain shift in auto + non-auto.",
    "Premium / high-content components in EV chassis, suspension.",
    "Export market for forging — North America, Europe."
  ],
  moat: [
    "Diversified end-market exposure (auto-ICE + auto-EV + ADS) reduces single-segment risk.",
    "ADS pivot is meaningful: FY30 vision of ₹1,300 Cr ADS revenue would be ~30%+ of total.",
    "Vertical integration: forging + machining + heat treatment + final assembly.",
    "Customer relationships span 20+ years.",
    "Honest caveat: similar diversification effort as Bharat Forge / MM Forgings; Sansera is mid-cap. ADS scale-up is still early."
  ],
  growth: [
    "Q3 FY26 +25% revenue, +29% EBITDA = strong operating leverage.",
    "ADS segment scaling: ₹300 Cr FY26 → ₹600 Cr FY27 → ₹1,300 Cr FY30.",
    "Auto-EV non-engine components growing.",
    "Capacity additions on schedule.",
    "Export ramp + global aerospace tier-1 wins (Pratt & Whitney etc.)."
  ],
  orderbook: [
    "Auto: customer programs 3-5 yr SOP.",
    "ADS: long-cycle aerospace + semiconductor contracts.",
    "Visibility 12-24 months on overall business; longer on aerospace."
  ],
  management: [
    "S Sekhar Vasan + Subramonia Sekhar — long-tenured; engineering & commercial depth.",
    "Promises kept: ADS segment pivot (started FY22) is on schedule; FY30 vision articulated and tracking.",
    "Capital allocation: capex disciplined; aerospace + defence capacity additions.",
    "Communication: detailed segmental reporting; concall transcripts available.",
    "Watch-out: 85% rally in 12 months has stretched multiples; execution must hold."
  ],
  risks: [
    "Auto cycle exposure remains (despite ADS diversification).",
    "EV transition uncertainty for connecting rods, rocker arms (ICE-specific).",
    "Steel + aluminum input volatility.",
    "ADS segment execution risk — long qualification cycles.",
    "Competition: Bharat Forge, MM Forgings, Mahindra CIE, Endurance Tech.",
    "Currency exposure on exports."
  ],
  valuation: [
    "FY26E revenue ~₹3,300-3,500 Cr; PAT ~₹350-400 Cr.",
    "Mcap ~₹15,762 Cr → FY26 P/E ~40-45x.",
    "FY27E revenue ~₹4,000+ Cr; PAT ~₹450-500 Cr → P/E ~32-35x.",
    "Comparable: Bharat Forge ~50-60x, MM Forgings ~25x, Mahindra CIE ~15-18x.",
    "Directional view: premium for ADS optionality; reasonable if FY30 vision plays out."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26).",
    "ADS quarterly milestone — FY27 H1 trajectory.",
    "New aerospace OEM win.",
    "Auto-EV component program win.",
    "Capacity expansion announcement.",
    "Possible international acquisition."
  ],
  mos: [
    "Moderate MoS — valuation premium but justified by ADS diversification.",
    "Best entry: 15-20% pullback creates ~30-32x forward P/E.",
    "Position sizing: 2-3% portfolio fit.",
    "Among the better-quality auto-anc franchises in the batch."
  ]
});

// 12. ROSSELL TECHSYS
const rossell = stockSection({
  name: "12. Rossell Techsys Ltd",
  tag: "Sector: Aerospace + Defence EMS (99% exports) | Status: Hyper-growth contract manufacturer, thin PAT",
  facts: [
    ["Market Cap", "₹2,734.5 Cr (MarketsMojo, 6-Mar-26); ₹2,518 Cr (early-Feb-26)"],
    ["Q1 FY26 Net Sales", "₹87.22 Cr (+94.3% YoY)"],
    ["Q2 FY26 Net Sales", "₹125.17 Cr (+145% YoY)"],
    ["Q3 FY26 Net Sales", "₹129.93 Cr (+71.55% YoY)"],
    ["FY26 Revenue (full year)", "₹262.36 Cr (figure looks low vs Q1-Q3 sum — verify)"],
    ["FY26 PAT", "₹7.91 Cr (low margin)"],
    ["H1 FY26", "Revenue ₹212.2 Cr; 99% exports"],
    ["Order Book", "₹700 Cr (~₹7 bn) across 30 customers in 8 countries"]
  ],
  business: [
    "Rossell Techsys (Bengaluru-based) is a contract design, engineering, and electronics manufacturing services (EMS) provider focused on aerospace, defence, and adjacent industries. Customers: Boeing, Lockheed Martin, BAE Systems, GE Aviation, Honeywell, Raytheon, Rolls-Royce, plus 25+ global aerospace + defence OEMs. ~99% of revenue is exports.",
    "Promoter: Rossell India (legacy tea company) demerged the techsys business; now pure-play. The growth story is about scaling aerospace EMS in India — the next decade of supply-chain shift from China + Western higher-cost regions to India."
  ],
  tailwinds: [
    "Global aerospace + defence supply chain shift to India — Lockheed, Boeing, GE all qualifying Indian suppliers.",
    "Defence offset obligations on imports drive Indian sub-contracting.",
    "Make-In-India aerospace components.",
    "EMS-side cost arbitrage continues vs. US/EU.",
    "Defence + space + commercial aerospace simultaneous demand growth.",
    "India's defence export target of ₹50,000 Cr by FY29."
  ],
  moat: [
    "Aerospace EMS qualification cycles are 3-5 years; once qualified, position is sticky.",
    "30 customers across 8 countries reduces single-customer risk.",
    "99% export = currency tailwind + global aerospace cycle exposure.",
    "Niche capability — Indian aerospace EMS is small ecosystem; Rossell among the few private players.",
    "Honest caveat: PAT margins are very thin (~3%); contract manufacturing nature; pricing power weak."
  ],
  growth: [
    "Triple-digit revenue growth (+94%, +145%, +72% across Q1-Q3 FY26) — exceptional ramp.",
    "Order book ₹700 Cr ~ 1.5x annual revenue → near-term visibility.",
    "Customer additions across 8 countries.",
    "Aerospace cycle global tailwind.",
    "Margin recovery as scale builds — FY27 PAT could double from FY26."
  ],
  orderbook: [
    "₹700 Cr (~₹7 bn) order book across 30 customers in 8 countries (H1 FY26).",
    "Visibility: 12-18 months at current execution pace.",
    "Composition: aerospace (Boeing, Lockheed, BAE) + defence + space.",
    "Bid pipeline strong with global OEM qualification cycles."
  ],
  management: [
    "Rossell India promoter (Harsh Gupta) — demerged the techsys business; current leadership focused on aerospace EMS.",
    "Promises kept: 70-145% YoY revenue growth across quarters → execution credible.",
    "Capital allocation: capex / capacity expansion ongoing; debt managed.",
    "Watch-out: PAT margins thin (₹7.9 Cr on ₹262 Cr revenue) — operational leverage critical going forward.",
    "Communication: investor presentations published; concalls held.",
    "Note: full-year FY26 revenue figure of ₹262 Cr appears inconsistent with Q1-Q3 sum (~₹342 Cr) — investors should verify against company filings; may be standalone vs consol distinction."
  ],
  risks: [
    "Margin profile: 3% PAT margin too thin — any input cost shock hits hard.",
    "Currency exposure (99% exports) cuts both ways.",
    "Customer concentration: top 5-6 customers likely 60%+ revenue.",
    "Aerospace cycle: Boeing/Airbus production cuts hit immediately.",
    "EMS commoditisation pressure long-term.",
    "Execution scale-up: tripling revenue annually creates control / quality risks."
  ],
  valuation: [
    "FY26 PAT ₹7.91 Cr; Mcap ₹2,735 Cr → FY26 P/E ~345x — extreme.",
    "FY27E revenue ~₹400-450 Cr (assuming +50% growth normalises); PAT ~₹20-30 Cr at improved margin → P/E ~90-130x.",
    "Comparable: pure-play aerospace EMS rare; data poor on direct comps.",
    "Directional view: very rich; entirely growth + margin recovery story; speculative."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results — full-year revenue + margin clarity.",
    "Operating leverage / margin expansion from FY27.",
    "Major OEM long-term agreement.",
    "Order book milestone past ₹1,000 Cr.",
    "Capacity expansion / new facility announcement.",
    "Defence-related Indian platform participation."
  ],
  mos: [
    "MoS very thin given valuation extremes + thin margins.",
    "Best entry: only after 30%+ drawdown + clear margin trajectory.",
    "Position sizing: 1% portfolio max.",
    "Speculative high-beta defence/aero exposure."
  ]
});

// 13. STEEL STRIPS WHEELS
const ssw = stockSection({
  name: "13. Steel Strips Wheels Ltd (SSWL)",
  tag: "Sector: Auto Wheels (Steel + Aluminum) | Status: Recently consolidated; cycle-exposed",
  facts: [
    ["Market Cap", "₹3,366 Cr (Yahoo Finance / Tickertape, 29-Apr-26)"],
    ["FY26 Revenue", "₹3,708.17 Cr (+210.28% YoY — likely post-acquisition consolidation)"],
    ["FY26 PAT", "₹129.37 Cr (-3.9% YoY)"],
    ["Q3 FY26 Revenue", "₹1,320.81 Cr (+22.9% YoY)"],
    ["Q3 FY26 PAT", "₹46.61 Cr (-2.3% YoY)"],
    ["Segment growth (Feb-26)", "2W/3W +97% YoY; Tractor +35% YoY"],
    ["Note", "210% revenue jump suggests M&A-driven consol — verify business basis"]
  ],
  business: [
    "Steel Strips Wheels is one of India's largest manufacturers of automotive steel wheel rims for cars, two-wheelers, three-wheelers, commercial vehicles, tractors, and earth-moving equipment. Plants across India + a venture into aluminum wheels in recent years.",
    "Customer base: Maruti Suzuki, Hyundai, Tata Motors, M&M, Ashok Leyland, John Deere, plus 2W/3W OEMs (Bajaj, TVS, Hero MotoCorp). Promoter: Garg family (Kapurthala-based)."
  ],
  tailwinds: [
    "Indian auto cycle recovery — PV growth + 2W rebound.",
    "Tractor cycle uptick post-monsoon.",
    "Premiumisation: alloy wheel adoption growing in PV.",
    "EV + adventure 2W shift to alloy wheels.",
    "Export market — global OEMs sourcing from India."
  ],
  moat: [
    "Largest Indian wheel manufacturer scale (alongside Wheels India).",
    "Multi-segment capability (PV/CV/tractor/2W/EME).",
    "Customer relationships 20+ years.",
    "Recent capacity additions.",
    "Honest caveat: wheels is commoditised; pricing power weak; competition with Wheels India + Allied Auto + global imports."
  ],
  growth: [
    "FY26 +210% revenue suggests M&A-driven consolidation (likely AMW Autocomponent or similar acquisition).",
    "2W/3W +97% in Feb-26 — segment momentum.",
    "Tractor +35% — rural recovery.",
    "Alloy wheel mix shift drives margins.",
    "Export ramp."
  ],
  orderbook: [
    "Wheels are program-based with OEMs; visibility 12-24 months on existing programs.",
    "No formal OB disclosed."
  ],
  management: [
    "Garg family — promoter; long-tenured.",
    "Promises kept: revenue scale-up via acquisitions; alloy capacity ramp.",
    "Capital allocation: M&A-driven; debt has likely increased post-acquisition.",
    "Communication: quarterly results / press releases; not detailed concalls.",
    "Watch-out: PAT down 4% on +210% revenue suggests acquisition is dilutive near-term; integration is critical."
  ],
  risks: [
    "Auto cycle exposure direct.",
    "Steel input cost.",
    "Customer concentration (Maruti, M&M, Tata likely 50%+).",
    "M&A integration risk — recent consolidation can deliver synergies or surprise downside.",
    "Aluminum import / price volatility.",
    "Competition: Wheels India, global imports."
  ],
  valuation: [
    "FY26 reported PAT ₹129 Cr; Mcap ₹3,366 Cr → FY26 P/E ~26x.",
    "FY27E revenue ~₹4,000 Cr; PAT ~₹160-180 Cr → P/E ~18-21x.",
    "Comparable: Wheels India ~25-30x, Bharat Forge ~50-60x, MM Forgings ~25x.",
    "Directional view: in-line valuation; M&A integration is the swing factor."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26) — confirms M&A integration progress.",
    "Auto cycle recovery in FY27.",
    "Alloy wheel revenue mix expansion.",
    "Possible export contract wins.",
    "Debt reduction post-M&A."
  ],
  mos: [
    "Moderate MoS at current levels — cycle-exposed at fair valuation.",
    "Best entry: cyclical pullback creates ~15-18x forward P/E.",
    "Position sizing: 1-2% portfolio fit.",
    "Watch M&A integration closely; if synergies materialise, could re-rate."
  ]
});

// 14. WHEELS INDIA
const wheels = stockSection({
  name: "14. Wheels India Ltd",
  tag: "Sector: Auto Wheels (CV/Tractor/Earth-mover) + Air Suspension + Hydraulics | Status: TVS-group quality compounder",
  facts: [
    ["Market Cap", "₹3,000 Cr (Trendlyne via search, Apr-26)"],
    ["Q3 FY26 PAT", "₹36.07 Cr (+44.05% YoY)"],
    ["Q3 FY26 Revenue", "₹1,371.45 Cr (+21.92% YoY)"],
    ["Q2 FY26 PAT", "₹30.99 Cr (+29.12% YoY)"],
    ["Q2 FY26 Revenue", "₹1,263.97 Cr (+7.44% YoY)"],
    ["Promoter", "TVS Group (Sundaram-Clayton lineage)"],
    ["Other businesses", "Air suspension systems (market leader in buses + lift axles for trucks); hydraulic cylinders; fabricated components"]
  ],
  business: [
    "Wheels India is a TVS Group company — among India's largest steel and aluminum wheel manufacturers for commercial vehicles, passenger cars, agricultural tractors, and construction/earth-moving equipment. Plus market-leading positions in: (a) air suspension systems for buses + lift-axle systems for trucks; (b) hydraulic cylinders for industrial / construction; (c) fabricated components for windmills, railways.",
    "Customer base: Maruti, Hyundai, Tata Motors, M&M, Ashok Leyland, JCB, Caterpillar, Volvo, John Deere, Kobelco, Sany, plus rail / windmill / industrial customers."
  ],
  tailwinds: [
    "Indian CV cycle recovery in FY26-27.",
    "Tractor cycle post-monsoon.",
    "Construction / mining capex (govt infra spending).",
    "EV bus + electric truck adoption — air suspension demand.",
    "Premiumisation: alloy wheels in PV.",
    "Wind energy capacity expansion → fabricated tower components.",
    "Defence + railway hydraulics."
  ],
  moat: [
    "TVS Group lineage = governance + customer relationships moat.",
    "Multi-segment (auto + air-suspension + hydraulics + fabrications) reduces single-segment cyclicality.",
    "Air suspension is duopoly in India (with Knorr-Bremse) — pricing power.",
    "Long customer relationships across CV / tractor / EME OEMs.",
    "Honest caveat: wheels itself is commoditised (vs SSWL); air suspension is the real value pool. Wheels India trades at lower multiple than premium auto-ancs reflecting mix."
  ],
  growth: [
    "Q3 FY26 +44% PAT growth = margin expansion + volume.",
    "Air suspension demand from EV bus + premium truck.",
    "Hydraulics from infra capex revival.",
    "Wind energy fabrication ramp (govt's 30 GW/yr renewable target).",
    "Possibly export market expansion."
  ],
  orderbook: [
    "Auto: program-based 3-5 year OEM relationships.",
    "Air suspension: replacement + new bus orders.",
    "Hydraulics: project-based OEM contracts.",
    "Wind: customer-aligned production schedules."
  ],
  management: [
    "TVS Group ethos: long-term, conservative, customer-first.",
    "Promises kept: Q2 FY26 +29% PAT, Q3 FY26 +44% PAT — margin recovery clearly visible.",
    "Capital allocation: capex disciplined; balance sheet healthy; dividend policy moderate.",
    "Communication: quarterly results consistent; concalls held.",
    "Watch-out: TVS Group governance is a positive vs SSWL or other family-run peers."
  ],
  risks: [
    "Auto cycle exposure (CV + tractor + earth-mover).",
    "Steel + aluminum input.",
    "Customer concentration in CV / tractor segments.",
    "Air suspension competition from Knorr-Bremse.",
    "Wind energy capex cyclicality.",
    "Possible PV margin pressure from import competition."
  ],
  valuation: [
    "FY26E revenue ~₹4,800-5,000 Cr; PAT ~₹130-150 Cr.",
    "Mcap ~₹3,000 Cr → FY26 P/E ~20-23x.",
    "Comparable: SSWL ~26x, Sundaram-Clayton ~30-35x, Endurance Tech ~30-35x.",
    "Directional view: undervalued vs TVS-group quality + air-suspension franchise."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26).",
    "EV bus order pipeline → air suspension uplift.",
    "Wind energy fabrication contracts.",
    "Auto cycle recovery in FY27.",
    "Alloy wheel premiumisation.",
    "Possible TVS Group strategic actions (consolidation, demerger)."
  ],
  mos: [
    "Reasonable MoS — TVS group + air suspension franchise + cycle entry point.",
    "Best entry: current levels offer 25-30% upside on cycle recovery + multiple expansion.",
    "Position sizing: 2-3% portfolio fit.",
    "Among the better risk-reward in this batch."
  ]
});

const closing = [
  H1("Batch 2 — Closing Synthesis"),
  H2("Top 3 SME / Smaller-cap Multibagger Bets"),
  Bul("OBSC Perfection — ₹1,200 Cr OB on ~₹250 Cr revenue base; defence/marine pivot; SME → mainboard migration likely catalyst."),
  Bul("Systematic Industries — debt-free + 54% H1 revenue growth + OFC/OPGW thrust; reasonable valuation vs peers."),
  Bul("Yash Highvoltage — sector tailwind real (T&D capex) but 240% rally has stretched valuation; wait for entry zones."),
  H2("Top 3 Main-Board Conviction"),
  Bul("Azad Engineering — ₹6,500 Cr OB (10x rev), MHI 8-yr contract, Baker Hughes win; expensive but quality + visibility."),
  Bul("Sansera Engineering — ADS pivot to ₹1,300 Cr by FY30; Q3 FY26 +25% rev / +29% EBITDA; quality compounder."),
  Bul("Wheels India — TVS-group quality + air-suspension franchise + cycle entry; undervalued vs peer set."),
  H2("Avoid / Wait / Speculative"),
  Bul("Sunita Tools — defence pivot is speculative; commercial Line 2 still 6 months away; SME governance risk."),
  Bul("Rossell Techsys — extreme valuation (P/E 345x) on thin margins; high-beta exposure only."),
  Bul("Dynamatic Tech — FY26 PAT thin (₹43 Cr on ₹1,427 Cr rev); P/E 155x is excessive; margin recovery unproven."),
  Bul("Paras Defence — quality story but P/E ~100x is rich; pullbacks needed."),
  H2("Cycle / Catalyst Calendar (next 6-18 months)"),
  Bul("May-26: Q4 FY26 results across all 14 names."),
  Bul("Oct-26: Sunita Tools Faridabad Line 2 commissioning — defining moment for defence pivot."),
  Bul("FY27 H1: Drone JV first product launches (Paras Defence)."),
  Bul("FY27 H1: Major aerospace OEM contract announcements (Azad, Sansera, Rossell, AXISCADES)."),
  Bul("FY27 H2: Sansera ADS revenue scaling to ₹600 Cr trajectory."),
  Bul("Auto cycle: MHCV recovery + tractor cycle uptick — multiple beneficiaries."),
  H2("Risk Concentration in this Batch"),
  Bul("4/14 names are SME/SME-recent (OBSC, Sunita, Yash, Systematic) → governance + liquidity overhang."),
  Bul("8/14 names trade at >50x P/E → re-rating risk if growth disappoints."),
  Bul("Auto cycle exposure across Happy Forgings, SSWL, Wheels India, Sansera."),
  Bul("Use position-sizing discipline — limit total Batch-2 exposure to 35-40% of portfolio."),
  P("End of Batch 2. Batches 3 (Specialty Chem/Pharma) and 4 (EMS/Electronics/Tech) will follow.")
];

// ====================================================================
//                         BUILD DOCUMENT
// ====================================================================
const doc = new Document({
  creator: "Claude (Cowork Mode) for Rajat",
  title: "Equity Watchlist Deep-Dive — Batch 2",
  description: "Detailed deep-dive on 14 stocks: Defence / Engineering / Auto",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "1F4E79", font: "Calibri" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "2E75B6", font: "Calibri" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 23, bold: true, color: "1F4E79", font: "Calibri" },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Equity Watchlist — Batch 2: Defence/Engineering/Auto", italics: true, size: 18, color: "808080" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 18, color: "808080" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080" })
          ]
        })]
      })
    },
    children: [
      ...cover,
      ...methodology,
      ...execSummary,
      ...obsc,
      ...sunita,
      ...yash,
      ...systematic,
      ...paras,
      ...azad,
      ...axiscades,
      ...dynamatic,
      ...dee,
      ...happy,
      ...sansera,
      ...rossell,
      ...ssw,
      ...wheels,
      ...closing
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(__dirname + "/Equity_Watchlist_Batch2_DefenceEngineeringAuto.docx", buf);
  console.log("Wrote Equity_Watchlist_Batch2_DefenceEngineeringAuto.docx (size:", buf.length, "bytes)");
});
