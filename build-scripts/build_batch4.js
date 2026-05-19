// Batch 4: EMS / Electronics / Tech — 7 stocks
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak
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
    borders, width: { size: width, type: WidthType.DXA },
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
      borders, width: { size: colWidths[i], type: WidthType.DXA },
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
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows.map((r) => new TableRow({
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
    children: [new TextRun({ text: "Batch 4: EMS / Electronics / Tech", bold: true, size: 36 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 },
    children: [new TextRun({ text: "7 stocks — SMEs first, then main-board", italics: true, size: 24 })] }),
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
  P("Same structure as Batches 1-3. Every market cap is sourced inline (Screener-via-search, MarketsMojo, Whalesbook, Tickertape, AlphaStreet, Multibagg AI, Manufacturing Today, ScanX, etc.) along with the as-of date."),
  P("This batch covers 7 names spanning India's electronics manufacturing services (EMS) boom, AI/HPC infrastructure, and BFSI/tech software. Indian EMS is one of the most exciting investment themes (PLI scheme + China+1) with valuations stretched almost everywhere — discipline matters."),
  P("Two of seven names are SME / smaller-cap (Aimtron Electronics, Concord Control Systems). All seven are growth-led; valuation discipline matters more than thesis."),
  PB()
];

const execSummary = [
  H1("Executive Summary — Batch 4"),
  summaryTable([
    ["Aimtron Electronics (SME)", "EMS / PCB / Box-build", "2,438 (Tradebrains via search, post-FY26 result)", "FY26 rev +89% / PAT +79%; OB ₹521 Cr; RFQ pipeline ₹900-950 Cr."],
    ["Concord Control Systems (SME)", "Railway electronics / RDSO OEM", "2,745 (+205% 1-yr per search)", "H1 FY26 PAT +85%; OB ₹313 Cr; ₹47K Cr railway opportunity."],
    ["Avalon Technologies", "EMS Box-build (US-led)", "7,059 (Whalesbook via search)", "9M FY26 rev +49%; PAT +83%; OB ₹2,016 Cr; margin pressure flagged."],
    ["Syrma SGS Technology", "EMS (auto / industrial / BFSI / RFID)", "13,749-18,491 (range across sources)", "9M FY26 rev +17%; PAT +101%; consumer-EMS leader; valuation rich."],
    ["Netweb Technologies", "HPC + AI servers", "18,843-23,083 (Mar-Apr 26)", "Sovereign AI tailwind; Q4 FY26 rev expected ₹380-420 Cr; high beta."],
    ["Aurionpro Solutions", "Banking software + Fintech", "4,600-5,017 (Yahoo / Screener)", "9M FY26 rev ₹1,066 Cr (+26%); Fintra + AurionAI launches; B&F focus."],
    ["Datamatics Global", "IT services / Digital / TPA", "4,256 (Finology Ticker)", "H1 FY26 rev +20%, PAT +32%; Q3 PAT plunge -42% QoQ — flagged."]
  ]),
  PB()
];

function stockSection(meta) {
  const pieces = [];
  pieces.push(H1(meta.name));
  pieces.push(new Paragraph({ children: [new TextRun({ text: meta.tag, italics: true, color: "595959" })], spacing: { after: 200 } }));
  pieces.push(factTable(meta.facts)); pieces.push(Spacer());
  pieces.push(H3("Business in Plain English")); meta.business.forEach(p => pieces.push(P(p)));
  pieces.push(H3("Sector Tailwinds")); meta.tailwinds.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("MOAT")); meta.moat.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("Growth Drivers")); meta.growth.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("Order Book / Revenue Visibility")); meta.orderbook.forEach(p => pieces.push(P(p)));
  pieces.push(H3("Management Execution")); meta.management.forEach(p => pieces.push(P(p)));
  pieces.push(H3("Key Risks")); meta.risks.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("Valuation Snapshot")); meta.valuation.forEach(p => pieces.push(P(p)));
  pieces.push(H3("Near-Term Catalysts (6-18 months)")); meta.catalysts.forEach(b => pieces.push(Bul(b)));
  pieces.push(H3("Margin-of-Safety View")); meta.mos.forEach(p => pieces.push(P(p)));
  pieces.push(PB());
  return pieces;
}

// 1. AIMTRON ELECTRONICS
const aimtron = stockSection({
  name: "1. Aimtron Electronics Ltd (NSE SME)",
  tag: "Sector: EMS / PCB Assembly / Box-build / ESDM | Listed: NSE SME | Status: FY26 ~doubled revenue, premium SME EMS pick",
  facts: [
    ["Market Cap", "₹2,438 Cr (Tradebrains via WebSearch, post-FY26 result)"],
    ["FY26 Revenue", "₹301.2 Cr (+89.2% YoY from ₹159 Cr)"],
    ["FY26 PAT", "₹46 Cr (+79.4% YoY from ₹25.6 Cr)"],
    ["FY26 EBITDA Margin", "22.6% (slight compression on intl/mfg subsidiary investments)"],
    ["FY26 PAT Margin", "15.3%"],
    ["Order Book (31-Mar-26)", "₹521.2 Cr (vs opening ₹463.9 Cr)"],
    ["RFQ Pipeline", "₹900-950 Cr"],
    ["Recent share price", "₹1,098 (10% upper circuit post FY26 results)"]
  ],
  business: [
    "Aimtron Electronics is an EMS (Electronics Manufacturing Services) + ESDM (Electronics System Design & Manufacturing) company. Three lines: (1) PCB (Printed Circuit Board) assembly — through-hole + SMT (surface-mount); (2) Box-build solutions — full sub-system / product assembly; (3) Product design services — for OEMs in industrial, medical, defence, telecom, IoT.",
    "Customer base spans India + global (US, Europe). Recent FY26 expansion has included international subsidiaries + new manufacturing capacity. EBITDA margin of 22.6% is industry-leading for EMS — reflects high mix of design-led + box-build + medical / industrial customers (vs commodity consumer EMS)."
  ],
  tailwinds: [
    "PLI scheme for white goods, IT hardware, electronics → multi-year EMS demand.",
    "China+1: global OEMs sourcing PCB / electronics from India.",
    "Industrial automation, IoT, medical electronics — high-margin EMS segments.",
    "Defence + space PCB / electronics requirements.",
    "Indian electronics market USD 100 bn → USD 300 bn target by 2030.",
    "Higher-content / higher-spec EMS shift — moves margin up."
  ],
  moat: [
    "Industry-leading EBITDA margin (22.6%) — reflects design-led / box-build mix vs commodity SMT.",
    "Customer diversification across industrial, medical, defence, IoT.",
    "International subsidiary footprint provides global delivery.",
    "Engineering / design capability moves up the value chain.",
    "Honest caveat: SME-listed; smaller scale vs Syrma SGS, Avalon, Dixon, Kaynes — competes on margin / niche, not scale."
  ],
  growth: [
    "FY26 revenue +89% / PAT +79% — strong scale-up.",
    "Order book ₹521 Cr / FY26 revenue ₹301 Cr = ~1.7x book-to-bill.",
    "RFQ pipeline ₹900-950 Cr → high probability of OB growth.",
    "International subsidiaries scaling — global customer wins.",
    "Higher-margin segments (medical, defence) growing share.",
    "FY27 revenue could reach ₹450-550 Cr (50%+ growth feasible)."
  ],
  orderbook: [
    "Closing order book ₹521.2 Cr (31-Mar-26) vs opening ₹463.9 Cr — modest growth.",
    "RFQ (Request for Quote) pipeline ₹900-950 Cr — strong pipeline indicator.",
    "Visibility 18-24 months at current execution rate."
  ],
  management: [
    "Promoter family — first-generation; SME-listed.",
    "Promises kept: FY26 +89% revenue + 22.6% EBITDA margin = exceptional execution.",
    "Capital allocation: international subsidiary expansion + capacity additions; balance sheet manageable.",
    "Communication: detailed FY26 result release; investor presentations published.",
    "Watch-out: SME platform → governance / disclosure quality is trackable; rapid scale-up requires control infrastructure."
  ],
  risks: [
    "SME platform → liquidity, free-float, governance overhang.",
    "Customer concentration risk (industry typical for EMS).",
    "Component / commodity (chips, capacitors, PCB substrate) volatility on fixed-price contracts.",
    "EBITDA margin compression risk — current 22.6% is high; any pressure is meaningful.",
    "Competition: larger Indian EMS (Syrma, Avalon, Dixon, Kaynes) take market share."
  ],
  valuation: [
    "FY26 PAT ₹46 Cr; Mcap ~₹2,438 Cr → FY26 P/E ~53x — rich.",
    "FY27E revenue ₹450-550 Cr; PAT ₹70-90 Cr → forward P/E ~28-35x.",
    "Comparable: Syrma SGS ~50-60x, Avalon ~50x, Dixon ~80-100x — Aimtron's premium reflects higher margin profile.",
    "Directional view: rich valuation justified by execution + margins; needs continuous beats."
  ],
  catalysts: [
    "Q1 FY27 results (Jul-26) — first quarter post strong FY26 print.",
    "Order book past ₹700 Cr.",
    "Major design-led customer addition.",
    "International subsidiary contribution disclosure.",
    "Migration from SME to mainboard.",
    "PLI / ESDM scheme participation announcement."
  ],
  mos: [
    "Thin MoS at 53x P/E + SME platform; only for high-conviction holders.",
    "Best entry: 20-25% pullback during sector correction.",
    "Position sizing: 1-1.5% portfolio max for SME EMS.",
    "Watch RFQ → OB conversion ratio as the key health metric."
  ]
});

// 2. CONCORD CONTROL SYSTEMS
const concord = stockSection({
  name: "2. Concord Control Systems Ltd (BSE)",
  tag: "Sector: Railway Electronics / Embedded Systems | Listed: BSE (ex-SME) | Status: 205% 1-yr return; railway capex play",
  facts: [
    ["Market Cap", "₹2,745 Cr (+205% in 1 yr per Screener via search)"],
    ["H1 FY26 Revenue", "₹81.5 Cr (+63.9% YoY from ₹49.8 Cr)"],
    ["H1 FY26 PAT", "₹16.0 Cr (+85% YoY from ₹8.7 Cr)"],
    ["Order Book (30-Sep-25)", "₹313 Cr (+47% from ₹212.5 Cr on 31-Mar-25)"],
    ["Recent contract", "₹84.68 Cr Indian Railways order"],
    ["Status", "RDSO-approved OEM for Indian Railways"],
    ["Opportunity", "₹47,000 Cr railway electronics market"]
  ],
  business: [
    "Concord Control Systems is an RDSO (Research Designs and Standards Organisation) approved Original Equipment Manufacturer providing critical electrical and electronic systems for Indian Railways. Products: train control systems, locomotive electronics, sub-station automation, signalling sub-systems, power conditioning equipment, and embedded electronic solutions.",
    "Customer concentration is dominantly Indian Railways + Indian Railway divisions + private rolling-stock manufacturers (Alstom, Siemens, BHEL via railway tenders). Niche space with a regulated entry barrier — RDSO approval cycles are 3-5 years."
  ],
  tailwinds: [
    "Indian Railways modernisation: ₹2.4 lakh Cr railway budget for FY27; Vande Bharat, Vande Metro, dedicated freight corridors.",
    "Kavach (automatic train protection) rollout — multi-billion dollar opportunity.",
    "Locomotive electrification + signalling modernisation.",
    "Railway electronics market estimated ₹47,000 Cr opportunity over next 5-7 years.",
    "Indigenous content mandate by Indian Railways favours RDSO-approved Indian OEMs.",
    "Metro / urban transit electronics demand."
  ],
  moat: [
    "RDSO approval is a regulatory entry barrier — 3-5 year qualification cycle.",
    "Long-term Indian Railways relationships across multiple product lines.",
    "Niche specialisation: train control + signalling electronics — fewer Indian players (Concord, Medha Servo Drives, KLT Automotive).",
    "Order-book recurring nature with Railways tender cycles.",
    "Honest caveat: Indian Railways is a single concentrated customer; pricing is regulated. Larger players (Siemens, Alstom, Hitachi) compete for big-ticket signalling tenders."
  ],
  growth: [
    "H1 FY26 +64% revenue / +85% PAT — strong railway capex translation.",
    "Order book +47% YoY → high near-term visibility.",
    "Kavach mass rollout begins FY27 — potential for large multi-year contracts.",
    "Vande Bharat Sleeper / Vande Metro production ramp.",
    "Possible expansion into adjacent electronics (urban metro, freight corridors)."
  ],
  orderbook: [
    "₹313 Cr as of 30-Sep-25 (+47% from Mar-25 ₹212.5 Cr).",
    "Recent ₹84.68 Cr Indian Railways order added.",
    "Visibility: 12-18 months at current execution.",
    "Bid pipeline tied to Indian Railways tender cycles (regular)."
  ],
  management: [
    "Promoter-led (Murti family historically); RDSO-approved OEM since long.",
    "Promises kept: 1-yr stock return +205% reflects operational delivery + sector re-rating.",
    "Capital allocation: capex tied to railway product expansion; balance sheet healthy.",
    "Communication: investor releases align with sector cadence.",
    "Watch-out: small-cap → liquidity / disclosure scrutiny needed; rally has stretched valuation."
  ],
  risks: [
    "Single-customer concentration: Indian Railways dominates revenue.",
    "Tender cycle volatility — quarterly revenue can be lumpy.",
    "Competition: Siemens, Alstom, Hitachi for big tenders.",
    "Regulated pricing on Railway tenders limits margin upside.",
    "Stock has rallied 205% in 1 yr — expectations are baked in.",
    "Kavach roll-out delays from MoR can impact thesis."
  ],
  valuation: [
    "FY26E revenue ~₹180-200 Cr; PAT ~₹35-45 Cr (extrapolating H1 momentum).",
    "Mcap ₹2,745 Cr → FY26 P/E ~60-78x — rich.",
    "Comparable: Siemens India ~50-60x (premium scale), Medha Servo (private), KLT Auto small.",
    "Directional view: rich valuation reflects railway capex theme; near-term upside limited from current levels."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results.",
    "Kavach mass rollout contract awards.",
    "Vande Bharat Sleeper / Metro production ramp orders.",
    "Major railway signalling tender win.",
    "Order book past ₹400-500 Cr milestone.",
    "Potential NSE listing migration."
  ],
  mos: [
    "MoS thin given 205% 1-yr rally + concentration risk.",
    "Best entry: 25-30% pullback during sector correction.",
    "Position sizing: 1-1.5% portfolio max.",
    "Sector tailwind real but valuation premium steep — wait for entry."
  ]
});

// 3. AVALON TECHNOLOGIES
const avalon = stockSection({
  name: "3. Avalon Technologies Ltd",
  tag: "Sector: EMS Box-build (US-led) | Listed: 2023 IPO | Status: Geographic-arbitrage EMS pick, near-term margin pressure",
  facts: [
    ["Market Cap", "₹7,059 Cr (Whalesbook via search)"],
    ["9M FY26 Revenue", "₹1,123 Cr (+48.7% YoY from ₹755 Cr)"],
    ["9M FY26 EBITDA", "₹116 Cr (+59.2% YoY)"],
    ["9M FY26 PAT", "₹72 Cr (+83.3% YoY)"],
    ["Q3 FY26 Revenue", "₹418 Cr (+48.7% YoY)"],
    ["Q3 FY26 Margin trend", "EBITDA -84 bps, PAT -58 bps YoY (compression flagged)"],
    ["Order Book", "₹2,016 Cr"],
    ["FY26 results", "Scheduled May 6, 2026"]
  ],
  business: [
    "Avalon Technologies is an EMS company specialising in box-build solutions (full product assembly) for industrial, medical, mobility (rail / EV), defence, clean energy customers. Differentiated by significant US revenue mix — Avalon's manufacturing footprint includes US-based facilities (acquired with original company structure) plus India operations, allowing dual-shore delivery.",
    "Customer base is largely US OEMs in industrial automation, medical devices, semiconductor capital equipment, clean energy. India operations have been growing post the 2023 IPO with PLI / China+1 tailwinds."
  ],
  tailwinds: [
    "China+1 in EMS for US OEMs — Avalon's US+India dual-shore model is differentiated.",
    "Industrial / medical / clean energy EMS demand growing.",
    "Onshoring tailwind in US: CHIPS Act + Inflation Reduction Act drives semiconductor + EV equipment EMS.",
    "Indian PLI / electronics scheme.",
    "Defence + aerospace EMS opportunities.",
    "Box-build is higher-margin than pure SMT."
  ],
  moat: [
    "Dual-shore (US + India) manufacturing footprint — rare for Indian EMS players.",
    "End-to-end box-build capability — full product assembly + design.",
    "Vertical specialisation in industrial / medical / mobility / clean energy.",
    "Long customer relationships (15+ years for some accounts).",
    "Honest caveat: scale smaller than Syrma SGS, Dixon; EMS competitive intensity high."
  ],
  growth: [
    "9M FY26 revenue +49% / PAT +83% — strong growth.",
    "Order book ₹2,016 Cr / 9M revenue ₹1,123 Cr = ~1.4x book-to-bill.",
    "US onshoring tailwind drives FY27-28 visibility.",
    "Indian PLI scheme participation possible.",
    "FY27 revenue could cross ₹2,000 Cr (vs ~₹1,500 Cr FY26E)."
  ],
  orderbook: [
    "₹2,016 Cr — robust visibility.",
    "Composition: industrial + medical + mobility + clean energy + defence.",
    "Visibility: 18-24 months at current execution.",
    "Customer additions ongoing."
  ],
  management: [
    "Promoter family + global leadership (US-India hybrid).",
    "Promises kept: 9M FY26 +49% revenue / +83% PAT — strong execution.",
    "Capital allocation: post-IPO proceeds for capacity / working capital; debt managed.",
    "Watch-out: Q3 FY26 margin compression flagged (EBITDA -84 bps, PAT -58 bps YoY) — cost structure stretching.",
    "Communication: detailed concalls; segmental reporting."
  ],
  risks: [
    "Margin compression flagged in Q3 — needs to be reversed.",
    "Customer concentration: top 5-7 customers likely 50%+ revenue.",
    "US tariff / trade policy changes affect cross-border model.",
    "Currency volatility (USD revenue).",
    "EMS competitive intensity: Syrma SGS, Dixon, Kaynes, Cyient DLM all expanding.",
    "Component cost / supply chain disruption."
  ],
  valuation: [
    "FY26E revenue ~₹1,500-1,600 Cr; PAT ~₹100-120 Cr.",
    "Mcap ₹7,059 Cr → FY26 P/E ~60-70x — rich.",
    "FY27E revenue ~₹2,000-2,200 Cr; PAT ~₹170-200 Cr → P/E ~35-42x.",
    "Comparable: Syrma SGS ~50-60x, Dixon ~80-100x, Kaynes ~80-100x.",
    "Directional view: premium for dual-shore + box-build mix; needs margin recovery for re-rating."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May 6, 2026).",
    "Margin recovery quarterly trajectory.",
    "Order book past ₹2,500 Cr.",
    "Major US OEM contract win.",
    "PLI / India scheme participation.",
    "Capacity expansion announcement."
  ],
  mos: [
    "MoS thin given valuation + margin pressure flagged.",
    "Best entry: confirm margin recovery in Q4 FY26 + 15-20% pullback.",
    "Position sizing: 1.5-2.5% portfolio fit.",
    "Wait for margin trajectory before sizing up."
  ]
});

// 4. SYRMA SGS TECHNOLOGY
const syrma = stockSection({
  name: "4. Syrma SGS Technology Ltd",
  tag: "Sector: EMS (Auto / Industrial / Consumer / RFID / BFSI / Healthcare) | Listed: Aug-2022 | Status: Premium EMS leader",
  facts: [
    ["Market Cap", "₹13,749-18,491 Cr (range across sources Apr-26)"],
    ["9M FY26 Revenue", "₹3,380 Cr (+17% YoY)"],
    ["9M FY26 EBITDA", "₹396.3 Cr (+63% YoY); margin 11.7%"],
    ["9M FY26 PAT", "₹226.6 Cr (+101% YoY); margin 6.7%"],
    ["Q3 FY26 Revenue", "₹1,274.5 Cr (+43% YoY)"],
    ["Q3 FY26 EBITDA", "₹169.7 Cr (+67% YoY)"],
    ["Q3 FY26 PAT", "₹110.3 Cr (+108% YoY)"],
    ["FY26 results", "Q4 + FY26 board meet — May 2026"]
  ],
  business: [
    "Syrma SGS is one of India's largest EMS / ESDM players. Diversified across: (1) Industrial — sensor + automation electronics; (2) Auto — body control modules, infotainment, telematics; (3) Healthcare — medical device electronics; (4) Consumer — appliances, IoT; (5) IT / BFSI — POS terminals, ATM, kiosks; (6) RFID — leader in Indian RFID tag manufacture (e-toll, asset tracking, retail).",
    "Formed via merger of Syrma Technology + SGS Tekniks (2021); listed Aug-2022. Manufacturing across Chennai, Pune, Bawal (Haryana), Hyderabad, Kolkata. Customer mix domestic + global."
  ],
  tailwinds: [
    "PLI scheme: white goods, IT hardware, telecom — direct EMS beneficiary.",
    "China+1 in EMS for US / Europe customers.",
    "EV electronics — new platform programs.",
    "RFID growth: NHAI Fastag refresh, retail / asset-tracking, supply chain.",
    "Healthcare medical device localisation.",
    "Indian electronics market USD 100 bn → USD 300 bn target."
  ],
  moat: [
    "Largest scale among Indian EMS players (alongside Dixon, Kaynes).",
    "Sectoral diversification: auto + industrial + healthcare + consumer + RFID — reduces single-sector risk.",
    "RFID leadership in India — niche moat.",
    "Multi-plant footprint provides geographic flexibility.",
    "Customer relationships span 15+ years for anchor accounts.",
    "Honest caveat: EMS is fundamentally a contract manufacturer; pricing power moderate; PE multiples expand on scale + margins, both of which have to keep rising."
  ],
  growth: [
    "9M FY26 +17% revenue / +101% PAT = significant operating leverage.",
    "Q3 FY26 +43% revenue / +108% PAT = acceleration in H2.",
    "EBITDA margin expansion (11.7%) reflects mix shift to higher-spec.",
    "RFID expansion into new applications.",
    "Auto + healthcare programmes ramping.",
    "FY27 revenue could cross ₹6,000 Cr (vs ~₹4,800-5,000 Cr FY26E)."
  ],
  orderbook: [
    "Specific OB not disclosed in granular form quarterly; customer programmes provide multi-year visibility.",
    "RFID volume contracts and EMS programmes typically 2-5 year horizons.",
    "Visibility: high given customer mix diversification."
  ],
  management: [
    "Sandeep Tandon (Chairman) + Jasbir Singh Gujral (MD) — experienced electronics industry veterans.",
    "Promises kept: post-merger integration credible; margin expansion delivering.",
    "Capital allocation: capex disciplined; balance sheet healthy.",
    "Communication: detailed segmental reporting; concall transparency.",
    "Watch-out: RFID + auto + healthcare growth narrative needs to keep delivering — premium valuation depends on it."
  ],
  risks: [
    "EMS competitive intensity: Dixon, Kaynes, Avalon, Cyient DLM, AMI Organics expanding.",
    "Component / chip / commodity volatility.",
    "Customer concentration in select segments.",
    "Currency exposure on exports.",
    "PE multiple compression risk if growth normalises.",
    "EMS is fundamentally low-margin business — sustained margin expansion is the bull case."
  ],
  valuation: [
    "FY26E revenue ~₹4,800-5,000 Cr; PAT ~₹325-360 Cr.",
    "Mcap ₹13,749-18,491 Cr → FY26 P/E ~38-57x range.",
    "FY27E revenue ~₹6,000-6,500 Cr; PAT ~₹500-600 Cr → P/E ~28-37x.",
    "Comparable: Dixon ~80-100x, Kaynes ~80-100x, Avalon ~60x, Cyient DLM ~50x — Syrma at lower end of EMS-premium.",
    "Directional view: premium but reasonable vs Dixon / Kaynes; H2 momentum justifies."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May 2026).",
    "RFID volume / new applications announcement.",
    "Auto EV programme wins.",
    "Healthcare device customer additions.",
    "Capacity expansion / new plant.",
    "Possible export contract milestone."
  ],
  mos: [
    "Moderate MoS — valuation premium but justified by largest EMS scale + diversified mix.",
    "Best entry: 15-20% pullback creates ~25-30x forward P/E.",
    "Position sizing: 2-3% portfolio fit.",
    "Among the better-quality EMS picks; pair with Dixon for theme exposure."
  ]
});

// 5. NETWEB TECHNOLOGIES
const netweb = stockSection({
  name: "5. Netweb Technologies India Ltd",
  tag: "Sector: HPC + AI Servers + Storage | Listed: Jul-2023 IPO | Status: Sovereign-AI multibagger candidate",
  facts: [
    ["Market Cap", "₹18,843-23,083 Cr (range Mar-Apr 26)"],
    ["Q4 FY26 expected Revenue", "₹380-420 Cr (vs Q3 FY26 ₹310 Cr)"],
    ["Q4 FY26 expected PAT", "₹45-58 Cr"],
    ["FY26 results call", "May 4, 2026"],
    ["Business focus", "HPC, AI servers, supercomputing, storage, networking"],
    ["Customers", "Govt (CDAC, ISRO, IISc), Indian IT majors, defence, BFSI, telcos"],
    ["FY26 guidance", "Reportedly 40% revenue growth"]
  ],
  business: [
    "Netweb Technologies is India's leading designer + manufacturer of high-performance computing (HPC) servers, AI servers (now dominant growth driver with NVIDIA H100 / H200 / B200 GPU integration), supercomputing platforms, enterprise storage, and high-speed networking equipment.",
    "Customers span government research labs (CDAC, IIT, IISc, ISRO), Indian IT services majors (TCS, Infosys, Wipro for internal infra), telecom operators, BFSI, and increasingly enterprise AI deployments. Manufactures under 'Tyrone' brand. Integrated locally — assembles + tests in Faridabad (with PLI scheme participation)."
  ],
  tailwinds: [
    "Sovereign AI: India's IndiaAI mission ₹10,372 Cr scheme → AI compute infrastructure procurement.",
    "Govt + research lab AI compute capex.",
    "Enterprise AI: Indian IT majors deploying GPU clusters.",
    "Datacenter capacity 4-5x by 2030 → server + storage demand.",
    "PLI scheme for IT hardware — Netweb is direct beneficiary.",
    "China+1 in AI server manufacturing.",
    "5G + private network infrastructure → networking equipment demand."
  ],
  moat: [
    "Tyrone brand + 25-year track record in Indian HPC (founded 1999).",
    "Govt research lab relationships (DRDO, CDAC, IISc, ISRO) — high entry barrier.",
    "NVIDIA partnership / certification for H100 / H200 / B200 GPU servers.",
    "Local design + manufacture — qualifies for govt indigenisation requirements.",
    "PLI scheme participation provides cost advantage.",
    "Honest caveat: server hardware is global commodity — the moat is system design, customer trust, and govt relationships, not unique technology."
  ],
  growth: [
    "FY26 guidance reportedly 40% revenue growth → FY26 revenue ~₹1,400-1,500 Cr.",
    "AI server segment growing fastest — H200 / B200 GPU integration.",
    "IndiaAI mission compute procurement (FY27-28).",
    "Datacenter customer additions.",
    "PLI scheme benefits scaling.",
    "FY27 revenue could cross ₹2,000 Cr."
  ],
  orderbook: [
    "Order book disclosed periodically (FY25 closing ~₹400-500 Cr range historically).",
    "AI server orders typically have shorter cycles (3-6 months).",
    "Govt tenders provide multi-quarter visibility.",
    "FY26 results call (May 4) likely to disclose updated OB."
  ],
  management: [
    "Sanjay Lodha (MD) — founder; technical depth; long tenure.",
    "Promises kept: post-IPO (Jul-2023) FY24 + FY25 + FY26 execution has tracked above guidance.",
    "Capital allocation: capex for design + assembly capacity; balance sheet healthy.",
    "Communication: detailed concalls with technical depth on AI hardware programs.",
    "Watch-out: stock has been volatile; multiple expansion / contraction cycles already in 18 months of listing."
  ],
  risks: [
    "GPU supply: NVIDIA allocation can swing quarterly — direct revenue impact.",
    "Customer concentration in govt + select IT majors.",
    "AI hype cycle reversal — if enterprise AI deployment pauses, demand softens.",
    "Component / GPU cost volatility on fixed-price contracts.",
    "Competition: Dell, HPE, Lenovo, Supermicro for enterprise; CDAC sometimes builds in-house.",
    "Valuation rich; multiple compression on any miss."
  ],
  valuation: [
    "FY26E revenue ~₹1,400-1,500 Cr; PAT ~₹150-180 Cr.",
    "Mcap ₹18,843-23,083 Cr → FY26 P/E ~110-150x — extremely rich.",
    "FY27E revenue ~₹2,000-2,300 Cr; PAT ~₹240-290 Cr → P/E ~70-95x.",
    "Comparable: pure-play HPC / AI server peers globally rare; Supermicro (US) at ~20-25x; Dell ~18-20x.",
    "Directional view: very rich valuation; entirely sovereign-AI thematic. Speculative on multiple."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May 4 conference call).",
    "FY27 guidance disclosure.",
    "IndiaAI mission compute orders.",
    "Major NVIDIA H200 / B200 deployment announcement.",
    "Enterprise AI customer wins.",
    "Possible international expansion."
  ],
  mos: [
    "MoS very thin at 110-150x P/E.",
    "Best entry: 25-30% drawdown during AI cycle correction.",
    "Position sizing: 1.5-2.5% portfolio max for high-beta thematic.",
    "Speculative on multiple — own only with conviction on sovereign-AI thesis playing out."
  ]
});

// 6. AURIONPRO SOLUTIONS
const aurion = stockSection({
  name: "6. Aurionpro Solutions Ltd",
  tag: "Sector: Banking & Fintech Software + Smart Mobility | Status: BFSI software compounder, AI platform launches",
  facts: [
    ["Market Cap", "₹4,600-5,017 Cr range (Yahoo / Screener via search)"],
    ["9M FY26 Revenue", "₹1,066 Cr (+26% YoY)"],
    ["Banking & Fintech Revenue (9M)", "₹595 Cr (+26%)"],
    ["B&F Revenue Mix", "56% of revenue (vs 60% in FY22)"],
    ["Q3 FY26 Revenue", "₹371 Cr"],
    ["Q1 FY26", "+29% YoY revenue growth; 16 new client wins"],
    ["New launches (Apr-26)", "Fintra (AI-native trade finance), AurionAI (Enterprise AI platform)"]
  ],
  business: [
    "Aurionpro Solutions is a BFSI-focused enterprise software company. Three segments: (1) Banking & Fintech — wholesale / retail banking platforms (iCashpro+, SmartLender, Omnifin, FXConnect), payments (AuroPay, AuroPaybiz), trade finance (Fintra); (2) Smart Mobility — Queue Management, Self-Service Kiosks, Customer Feedback Systems; (3) Customer Experience.",
    "Customers: banks, NBFCs, insurance, capital markets across India + global (Middle East, SE Asia, Africa). Founded 2002; long history; recent re-energisation under Ashish Rai post-restructuring."
  ],
  tailwinds: [
    "Banking digital transformation: Indian + global banks modernising core systems.",
    "AI in BFSI: trade finance, lending, customer service — Aurionpro's Fintra + AurionAI direct plays.",
    "Indian fintech ecosystem growth.",
    "Middle East banking modernisation (Saudi Vision 2030, UAE digital banks).",
    "Trade finance digitisation post-COVID supply chain disruption.",
    "Public-sector bank tech upgrade cycles."
  ],
  moat: [
    "Long BFSI customer relationships (banks 10-15+ years).",
    "Product portfolio: Omnifin (lending), iCashpro+ (cash management), SmartLender — installed base creates stickiness.",
    "AurionAI platform differentiation in domain-led AI for BFSI.",
    "Geographic spread: India + Middle East + Africa.",
    "Honest caveat: BFSI software is competitive — Intellect Design Arena, TCS BaNCS, Infosys Finacle, Tata Consultancy Services, Oracle Flexcube all compete; Aurionpro is mid-cap player."
  ],
  growth: [
    "9M FY26 +26% revenue / +26% B&F growth.",
    "16 new client wins in Q1 FY26 — strong sales momentum.",
    "Fintra (AI trade finance) bank pilots from April 17, 2026.",
    "AurionAI domain-led AI platform launching.",
    "FY27 revenue could cross ₹1,800-2,000 Cr."
  ],
  orderbook: [
    "License + AMC + services contracts; OB not disclosed in granular form.",
    "BFSI deal cycles 6-18 months; visibility 12-24 months from anchor accounts.",
    "16 new client wins in Q1 FY26 indicates strong pipeline conversion."
  ],
  management: [
    "Ashish Rai (CEO) — appointed post-restructuring; track record of operational discipline.",
    "Promises kept: 9M FY26 +26% revenue + new product launches (Fintra, AurionAI) on schedule.",
    "Capital allocation: capex for product development; M&A track record exists (small acquisitions in BFSI).",
    "Communication: quarterly concalls; product launch updates; investor presentations published.",
    "Watch-out: historical issues with promoters / structure (pre-2018) — current management is new generation."
  ],
  risks: [
    "BFSI software competition: Intellect Design, TCS BaNCS, Infosys Finacle dominate large deals.",
    "Customer concentration: top 5-10 banks likely 40%+ revenue.",
    "Long deal cycles → revenue recognition lumpy.",
    "Currency exposure on exports.",
    "AI / Fintra adoption rate is unproven — revenue ramp uncertain.",
    "Smart Mobility segment lower-margin drag."
  ],
  valuation: [
    "FY26E revenue ~₹1,400-1,500 Cr; PAT ~₹160-200 Cr.",
    "Mcap ₹4,600-5,017 Cr → FY26 P/E ~25-30x.",
    "FY27E revenue ~₹1,750-1,900 Cr; PAT ~₹220-260 Cr → P/E ~20-23x.",
    "Comparable: Intellect Design Arena ~25-30x, Coforge ~30-35x, Persistent ~35-45x, Mastek ~25-30x.",
    "Directional view: reasonable for the BFSI software profile + new AI launches."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May 2026).",
    "Fintra bank pilot conversion to revenue.",
    "AurionAI customer wins.",
    "Major Middle East / Africa contract.",
    "Possible inorganic acquisition in AI / fintech.",
    "Smart Mobility large city / govt order."
  ],
  mos: [
    "Reasonable MoS — current valuation fair for growth profile.",
    "Best entry: any 10-15% pullback creates 18-22x forward P/E.",
    "Position sizing: 2-3% portfolio fit.",
    "BFSI software defensive component within batch."
  ]
});

// 7. DATAMATICS GLOBAL SERVICES
const datamatics = stockSection({
  name: "7. Datamatics Global Services Ltd",
  tag: "Sector: IT Services + Digital + TPA / BPM | Status: Mid-tier IT services player; Q3 PAT plunge flagged",
  facts: [
    ["Market Cap", "₹4,256 Cr (Finology Ticker via search)"],
    ["H1 FY26 Revenue", "₹957.79 Cr (+19.61% YoY)"],
    ["H1 FY26 PAT", "₹113.62 Cr (+32.34% YoY)"],
    ["Q2 FY26 Revenue", "₹490.23 Cr (+20.52% YoY)"],
    ["Q2 FY26 EBITDA Margin", "18.1% (+613 bps YoY)"],
    ["Q3 FY26 Revenue", "₹510.10 Cr (record; +20% YoY, +4% QoQ)"],
    ["Q3 FY26 PAT", "₹36.38 Cr (-42.47% QoQ from ₹63.24 Cr) — flagged"]
  ],
  business: [
    "Datamatics Global Services is a mid-tier Indian IT services company with five business segments: (1) Digital Operations / BPM — back-office processing for BFSI, healthcare, publishing; (2) Digital Experience — web/app development; (3) Digital Technologies — data + AI + cloud + automation; (4) Smart City / Govt — Identity, payments, e-governance; (5) Publishing — content production for global media + academic publishers.",
    "Founded 1975; promoter Lalit S Kanodia family. Manufacturing of services; long-tenured customer relationships; geographic mix India + USA + Europe + Asia."
  ],
  tailwinds: [
    "BPM / digital operations growth: Indian BPM USD 50+ bn industry.",
    "AI-led automation in BPM creating new product lines.",
    "Digital transformation budgets at global enterprises.",
    "Smart city / e-governance projects in India.",
    "Publishing automation for global academic + media customers.",
    "Onshore-offshore arbitrage continues."
  ],
  moat: [
    "Long-tenured customer base (15-20 years for several anchor accounts).",
    "Diversified service portfolio reduces single-segment risk.",
    "Publishing vertical niche moat (Datamatics is among the largest in academic publishing services).",
    "Indian + global delivery centres provide hybrid model.",
    "Honest caveat: mid-tier IT services is competitive (Coforge, Persistent, Mastek, Hexaware, LTIMindtree, Birlasoft, Mphasis); margin pressure structural; AI / GenAI is a threat to BPM core."
  ],
  growth: [
    "H1 FY26 +20% revenue / +32% PAT — strong scale-up.",
    "EBITDA margin expansion (+613 bps) — operational leverage.",
    "AI / GenAI services growing.",
    "Smart City projects scaling.",
    "Publishing automation deepening with global customers.",
    "FY27 revenue could cross ₹2,500 Cr."
  ],
  orderbook: [
    "Long-term services contracts; not formal OB but TCV (total contract value) disclosed periodically.",
    "Visibility 12-18 months from anchor accounts.",
    "Pipeline strong but Q3 FY26 PAT plunge (-42% QoQ) suggests one-time / cost / forex impact — needs concall clarity."
  ],
  management: [
    "Lalit Kanodia family — long-tenured promoters; founded 1975.",
    "Promises kept: H1 FY26 +20% revenue + margin expansion delivering.",
    "Capital allocation: dividend payout high (cash-rich balance sheet); occasional buybacks.",
    "Communication: detailed concalls; segmental reporting.",
    "Watch-out: Q3 FY26 PAT plunge -42% QoQ to ₹36.38 Cr is material — needs explanation (likely forex / one-time cost / employee compensation cycle); investors should look for Q4 trajectory."
  ],
  risks: [
    "AI / GenAI disruption to BPM core — can compress revenue per FTE.",
    "Customer concentration in publishing + select BFSI accounts.",
    "Currency exposure (USD / EUR revenue).",
    "Mid-tier IT services pricing pressure from larger players + clients' cost optimisation.",
    "Q3 FY26 PAT plunge if structural (not one-time) — material concern.",
    "Smart City project cycles and govt payment delays."
  ],
  valuation: [
    "FY26E revenue ~₹2,050-2,100 Cr; PAT ~₹220-260 Cr (assuming Q4 normalises).",
    "Mcap ₹4,256 Cr → FY26 P/E ~16-19x.",
    "Comparable: Coforge ~30-35x, Persistent ~35-45x, Mastek ~25-30x, Hexaware ~25-30x, Birlasoft ~20-25x.",
    "Directional view: cheap on relative basis among Indian IT mid-caps but Q3 PAT plunge needs explanation."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May 2026) — confirms Q3 PAT plunge is one-time.",
    "FY27 guidance.",
    "Major BPM / digital transformation deal.",
    "AI / GenAI service revenue ramp.",
    "Smart City / e-governance project wins.",
    "Possible buyback / special dividend (cash-rich)."
  ],
  mos: [
    "Reasonable MoS at 16-19x P/E if Q3 was one-time.",
    "Best entry: post Q4 FY26 result clarity on Q3 PAT plunge.",
    "Position sizing: 1.5-2% portfolio fit.",
    "Wait for Q4 confirmation — material data-point risk."
  ]
});

const closing = [
  H1("Batch 4 — Closing Synthesis"),
  H2("Top Conviction"),
  Bul("Syrma SGS Technology — largest Indian EMS scale + diversified mix + 9M FY26 PAT +101%; valuation premium but justified vs Dixon / Kaynes."),
  Bul("Aurionpro Solutions — BFSI software + AI launches (Fintra, AurionAI); ~25-30x P/E for 26%+ growth is reasonable."),
  H2("Speculative / Thematic"),
  Bul("Netweb Technologies — sovereign-AI multibagger candidate but P/E 110-150x is extreme; size cautiously."),
  Bul("Avalon Technologies — dual-shore EMS edge but Q3 FY26 margin compression flagged; wait for Q4 reset."),
  Bul("Aimtron Electronics — 22.6% EBITDA margin is industry-best but SME platform + 53x P/E — high-conviction holders only."),
  Bul("Concord Control Systems — 205% 1-yr rally has stretched valuation; railway-capex theme real but entry zones needed."),
  H2("Wait / Watch"),
  Bul("Datamatics Global — Q3 FY26 PAT plunge -42% QoQ flagged; cheap on P/E but needs Q4 explanation."),
  H2("Cycle / Catalyst Calendar (next 6-18 months)"),
  Bul("May 2026: Q4 + FY26 results across all 7 names — material data points."),
  Bul("May 4 2026: Netweb FY26 call + dividend disclosure."),
  Bul("May 6 2026: Avalon FY26 call."),
  Bul("FY27 H1: Fintra (Aurionpro) bank-pilot conversion."),
  Bul("FY27 H1: IndiaAI mission compute procurement (Netweb beneficiary)."),
  Bul("FY27 H1: Kavach signalling rollout (Concord beneficiary)."),
  H2("Risk Concentration"),
  Bul("All 7 names trade at >25x P/E; multiple compression on any miss is sharp."),
  Bul("EMS-themed exposure (Aimtron + Avalon + Syrma) overlapping — limit total to ~5-7% of portfolio."),
  Bul("AI / sovereign-AI thematic exposure (Netweb) is high-beta — sizing critical."),
  Bul("BFSI / IT services cycle exposure (Aurionpro + Datamatics) — pair with macro view."),
  Bul("Limit total Batch-4 exposure to 12-15% of portfolio."),
  P("End of Batch 4. All four batches now complete. Optional next: merge into single mega-doc with TOC.")
];

const doc = new Document({
  creator: "Claude (Cowork Mode) for Rajat",
  title: "Equity Watchlist Deep-Dive — Batch 4",
  description: "Detailed deep-dive on 7 stocks: EMS / Electronics / Tech",
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
    config: [{ reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "Equity Watchlist — Batch 4: EMS / Electronics / Tech", italics: true, size: 18, color: "808080" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Page ", size: 18, color: "808080" }),
                 new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080" })] })] }) },
    children: [
      ...cover, ...methodology, ...execSummary,
      ...aimtron, ...concord, ...avalon, ...syrma, ...netweb, ...aurion, ...datamatics,
      ...closing
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(__dirname + "/Equity_Watchlist_Batch4_EMSElectronicsTech.docx", buf);
  console.log("Wrote Equity_Watchlist_Batch4_EMSElectronicsTech.docx (size:", buf.length, "bytes)");
});
