// Batch 3: Specialty Chem / Pharma — 5 stocks
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
    children: [new TextRun({ text: "Batch 3: Specialty Chemicals / Pharma", bold: true, size: 36 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 },
    children: [new TextRun({ text: "5 stocks — SMEs first, then main-board", italics: true, size: 24 })] }),
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
  P("Same structure as Batches 1-2. Every market cap is sourced inline (Screener-via-search, MarketsMojo, Yahoo Finance, Whalesbook, ScanX, Bajaj Finserv, Tickertape, etc.) along with the as-of date."),
  P("This batch covers 5 names spanning specialty chemicals (CSM exporter Anupam Rasayan), agrochem turnaround (Astec Lifesciences, Godrej group), pharma excipient (Accent Microcell), small-cap pharma (Haleos Labs — formerly SMS Lifesciences India per ticker linkage), and packaging (EPL — formerly Essel Propack)."),
  P("2 of 5 names are SME / micro-cap / smaller-coverage — Accent Microcell and Haleos Labs. Position-sizing matters more than entry multiples for these."),
  PB()
];

const execSummary = [
  H1("Executive Summary — Batch 3"),
  summaryTable([
    ["Accent Microcell (SME)", "MCC pharma excipient", "1,042 (Screener via WebSearch, Apr-26)", "MCC for pharma+food+industrial; 200+ customers; small-cap."],
    ["Haleos Labs (SME)", "Pharma APIs/intermediates", "379.42 (MarketsMojo, Q3 FY26)", "Q3 FY26 record sales ₹95 Cr; PAT ₹6.6 Cr; ROE weak; margin pressure."],
    ["Anupam Rasayan", "Specialty Chem CSM (export-led)", "15,193 (Yahoo / Screener, late-25/early-26)", "H1 FY26 rev +122% YoY; Q3 standalone rev +89%, PAT +150%; CSM tailwind."],
    ["Astec Lifesciences", "Agrochem AI + Pharma int. (Godrej)", "1,618.58 (Bajaj Finserv, 28-Apr-26)", "FY26 turnaround narrative; loss narrowed; Godrej Agrovet 67% promoter."],
    ["EPL Ltd", "Laminated tubes (global largest)", "7,247 (Screener / MarketsMojo, +17.9% 1-yr)", "Q2 FY26 record sales ₹1,206 Cr / PAT ₹104 Cr; global packaging leader."]
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

// 1. ACCENT MICROCELL
const accent = stockSection({
  name: "1. Accent Microcell Ltd (NSE SME)",
  tag: "Sector: Microcrystalline Cellulose (Pharma / Food / Industrial Excipients) | Listed: 2024 NSE SME | Status: Niche pharma-input multibagger candidate",
  facts: [
    ["Market Cap", "₹1,042 Cr (Screener via WebSearch, Apr-26)"],
    ["Customer base", "200+ customers across 10+ sectors, India + global"],
    ["Product portfolio", "High-purity Microcrystalline Cellulose (MCC) — pharma binder/filler/stabilizer"],
    ["Global MCC market (2026)", "USD 1.59 bn → USD 2.66 bn by 2033 (CAGR 7.6%)"],
    ["Pharma share of MCC", "~36% (Coherent Market Insights)"],
    ["Indian peers", "Sigachi Industries, Chemfield Cellulose"]
  ],
  business: [
    "Accent Microcell manufactures high-purity Microcrystalline Cellulose (MCC) — a refined cellulose derivative that's a critical excipient (binder, filler, stabilizer, disintegrant) in tablet formulations. MCC is one of the most widely used pharmaceutical excipients globally — present in the majority of solid-dose tablets. Beyond pharma, MCC is used in nutraceuticals, food (as anti-caking agent, thickener), cosmetics, and industrial applications.",
    "Accent serves 200+ customers across 10+ sectors in India and globally, competing with Sigachi Industries (the listed Indian benchmark) and global majors like FMC Corporation, JRS Pharma, DFE Pharma. The business is volume × purity × pricing — high-spec pharma-grade MCC commands premium over food / industrial grade."
  ],
  tailwinds: [
    "Global MCC market USD 1.59 bn (2026) → USD 2.66 bn by 2033 at 7.6% CAGR (Coherent Market Insights).",
    "Indian pharma export growth at 8-10% annually — solid-dose tablets are the dominant export form → MCC demand.",
    "Nutraceutical / dietary supplement boom in India + global.",
    "China+1 sourcing for pharma excipients — Indian MCC players can take share from Chinese suppliers (Mingtai, Anhui Sunhere).",
    "Generic regulatory tightening (USFDA, EU GMP) requires high-purity excipients — premium grade Indian players benefit.",
    "Food MCC growth from clean-label / plant-based product trends."
  ],
  moat: [
    "Cellulose chemistry depth — MCC manufacturing requires precision pulp processing + acid hydrolysis + spray-drying; capital + know-how barrier.",
    "Pharma customer qualification cycles 2-3 years for excipient suppliers; once qualified, switching costs are high.",
    "Product diversification across pharma + food + cosmetics + industrial reduces single-segment cyclicality.",
    "200+ customer base reduces concentration risk.",
    "Honest caveat: Sigachi Industries is the larger listed comparable (~₹2,000-3,000 Cr Mcap range historically); Accent is a smaller scale player. MCC is also commoditising at the lower-grade end."
  ],
  growth: [
    "Pharma MCC: India's solid-dose pharma export growth → direct MCC demand multiplier.",
    "Capacity expansion: SME IPO proceeds (2024) deployed in capacity addition.",
    "Geographic expansion: India + global mix shifting toward higher-margin export grades.",
    "Product premiumisation: high-purity / specialty MCC grades for pharmaceutical / nutraceutical applications.",
    "Possible adjacencies: croscarmellose sodium, hydroxypropyl methylcellulose (HPMC), other cellulosic excipients."
  ],
  orderbook: [
    "MCC business is annual / quarterly contract-based with pharma customers; not a formal order book.",
    "Customer concentration is moderate — 200+ active customers reduces single-account risk.",
    "Visibility 6-12 months from existing customer schedules + spot orders."
  ],
  management: [
    "First-generation promoter family from Gujarat industrial cluster.",
    "Promises kept: SME IPO in 2024 — early period; track record being established. Q-on-Q execution disclosures available via NSE filings.",
    "Capital allocation: IPO proceeds for capacity + working capital; debt managed.",
    "Communication: limited investor relations cadence (typical for SME); quarterly results timely.",
    "Watch-out: SME platform → governance / disclosure quality is the key tracking item."
  ],
  risks: [
    "SME platform → low free-float, governance, liquidity risk.",
    "Customer concentration in pharma — generic pricing pressure can compress MCC pricing.",
    "Competition from Sigachi Industries (larger scale) + Chinese suppliers.",
    "Currency exposure on exports.",
    "Pulp / chemical input cost volatility.",
    "Cellulose source supply (cotton linter / wood pulp) — geographic vulnerability."
  ],
  valuation: [
    "FY26E revenue ~₹250-350 Cr (estimate); PAT ~₹35-50 Cr.",
    "Mcap ~₹1,042 Cr → FY26 P/E ~21-30x.",
    "Comparable: Sigachi Industries ~25-30x historically, global excipient peers (FMC, JRS) at MNC multiples 25-35x.",
    "Directional view: reasonable for niche pharma input + global tailwind. SME platform discount is justified."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — full-year revenue growth.",
    "Major export contract / global pharma customer addition.",
    "Capacity expansion announcement.",
    "Migration from SME to mainboard.",
    "Adjacency product launch (HPMC, croscarmellose).",
    "Possibly RM imports clarification (pulp / cotton linter)."
  ],
  mos: [
    "MoS moderate — niche product + secular global tailwind + smaller scale.",
    "Position sizing: 1-2% portfolio fit for SME exposure.",
    "Watch for mainboard migration as derisking event.",
    "3-5 year horizon for global excipient cycle to play."
  ]
});

// 2. HALEOS LABS
const haleos = stockSection({
  name: "2. Haleos Labs Ltd (formerly SMS Lifesciences India)",
  tag: "Sector: Pharma APIs / Intermediates | Listed: NSE SME / small-cap | Status: Margin recovery quarter, weak ROE",
  facts: [
    ["Market Cap (Q3 FY26)", "₹379.42 Cr (MarketsMojo)"],
    ["Q3 FY26 Net Profit", "₹6.62 Cr (+21.02% YoY, +8.52% QoQ)"],
    ["Q3 FY26 Net Sales", "₹94.78 Cr (record quarterly; +16.48% QoQ from ₹81.37)"],
    ["Q3 FY26 Operating Margin", "14.82% (compressed -187 bps from 16.69% in Q2)"],
    ["Q3 FY26 Revenue Growth", "+12.03% YoY"],
    ["ROE", "8.63% (categorised 'weak' for pharma manufacturers)"],
    ["Note", "URLs link to 'sms-lifesciences-india' — Haleos Labs is the recent rename"]
  ],
  business: [
    "Haleos Labs (formerly SMS Lifesciences India) is a small-cap Indian pharmaceutical manufacturer focused on Active Pharmaceutical Ingredients (APIs) and pharma intermediates. The company supplies to formulation manufacturers in India + export markets. Product portfolio includes a mix of regulated-market (USFDA / EU) and emerging-market (semi-regulated Asia, Africa, LatAm) products.",
    "Recent rebranding from SMS Lifesciences to Haleos Labs signals a positioning shift; investor disclosures still partly use the old name. Manufacturing is in Hyderabad."
  ],
  tailwinds: [
    "China+1 in API sourcing — global formulators reducing Chinese API dependency.",
    "Indian PLI scheme for APIs (₹15,000 Cr) — direct beneficiary if products are in scheme.",
    "Generic pharma volume growth + price pressure — APIs are commoditised but volume tailwind real.",
    "USFDA / EU GMP scrutiny on Chinese plants → Indian makers gain.",
    "Specialty / niche API segments (anti-cancer, anti-diabetic, CNS) higher-margin growth pockets."
  ],
  moat: [
    "USFDA / EU regulatory filings on key APIs — 5-7 year cycle to establish.",
    "Product portfolio diversification across therapeutic areas.",
    "Cost competitive Hyderabad manufacturing base.",
    "Honest caveat: small scale (₹95 Cr quarterly = ~₹350 Cr annual); ROE 8.63% is sub-par for pharma; margin pressure visible. This is a margin-recovery story, not a structural compounder yet."
  ],
  growth: [
    "Q3 FY26 record quarterly sales suggests volume momentum.",
    "Product mix shift toward specialty APIs (if successful) drives margin expansion.",
    "Possible PLI-scheme product additions.",
    "Capacity expansion / debottlenecking ongoing.",
    "Export market — North America + Europe + LatAm contracts."
  ],
  orderbook: [
    "API business is annual / spot-order driven; no formal OB.",
    "Customer base in pharma formulators — visibility 3-6 months typically.",
    "Regulatory product filings provide multi-year revenue runway."
  ],
  management: [
    "Promoter family (small / micro-cap profile); disclosure cadence moderate.",
    "Promises kept: rebranding initiative + Q3 record sales suggest operational engagement.",
    "Capital allocation: small-cap; capex limited; debt manageable.",
    "Watch-out: ROE at 8.63% is weak for pharma — operational improvement is the key thesis.",
    "Communication: limited investor relations infrastructure; concalls may not be regular."
  ],
  risks: [
    "Weak ROE (8.63%) — capital deployed inefficiently relative to peers.",
    "Margin compression (-187 bps Q3 vs Q2) — input cost / pricing pressure.",
    "API price volatility — global generic price pressure cyclical.",
    "Customer concentration in formulators.",
    "Regulatory: any USFDA / WHO inspection issue is binary.",
    "Smaller scale vs larger Indian API peers (Aarti Drugs, Granules, Divi's, Laurus, Neuland)."
  ],
  valuation: [
    "FY26E revenue ~₹360-400 Cr (annualised Q3 + Q4 growth); PAT ~₹25-30 Cr.",
    "Mcap ~₹379 Cr → FY26 P/E ~13-15x.",
    "Comparable: Aarti Drugs ~25-30x, Granules ~15-18x, Neuland ~25-30x. Haleos at lowest multiples reflecting size + margin profile.",
    "Directional view: cheap on metrics but the 'cheap for a reason' tag applies — needs sustained margin recovery."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — confirms margin recovery trajectory.",
    "FY27 H1 — first full year post-rebrand.",
    "Major USFDA filing approval / commercial launch.",
    "PLI-scheme product approval.",
    "Capacity expansion announcement.",
    "Possible promoter / strategic stake action."
  ],
  mos: [
    "MoS exists on absolute multiples but ROE / margin profile is weak.",
    "Position sizing: 0.5-1% portfolio max.",
    "Watch for 2-3 quarters of sustained margin expansion before adding aggressively.",
    "Hard stop: any USFDA/regulatory issue → exit immediately."
  ]
});

// 3. ANUPAM RASAYAN
const anupam = stockSection({
  name: "3. Anupam Rasayan India Ltd",
  tag: "Sector: Specialty Chemicals (CSM / Custom Synthesis) | Listed: Mar-2021 | Status: Hyper-growth CSM player",
  facts: [
    ["Market Cap", "₹15,193 Cr (Yahoo Finance / Screener, late-25 / early-26)"],
    ["Q3 FY26 Standalone Revenue", "₹4,013.67 mn / ₹401.37 Cr (+89% YoY)"],
    ["Q3 FY26 PAT", "₹479.19 mn / ₹47.92 Cr (+150% YoY)"],
    ["H1 FY26 Consol Revenue", "₹1,229 Cr (+122% YoY)"],
    ["H1 FY26 milestone", "Surpassed FY25 full-year revenue in 6 months"],
    ["Segments", "Life Science specialty chemicals (agrochem + personal care + pharma) + polymer additives"]
  ],
  business: [
    "Anupam Rasayan is a leading Indian Custom Synthesis & Manufacturing (CSM) specialty chemicals company. CSM means: global agrochem / pharma / specialty MNCs (Syngenta, BASF, Bayer, Dow, Adama, FMC, Sumitomo) outsource patented or non-patented chemistry to Anupam who manufactures under long-term contracts (typically 5-10 years).",
    "Two segments: (1) Life Science Specialty Chemicals — agrochemical intermediates + personal care + pharma intermediates; (2) Other Specialty Chemicals — polymer additives, specialty performance chemicals. Customer base is largely export-led; manufacturing in Sachin (Surat) + Jhagadia (Gujarat)."
  ],
  tailwinds: [
    "Global CSM market projected at USD 25 bn+ by 2027; India share growing on China+1.",
    "Agrochem cycle recovery: post-2023 destocking, FY25-26 has seen demand rebound; Anupam's H1 +122% rev growth reflects this.",
    "Patented agrochem launches by global majors → CSM revenue shift to Indian players.",
    "Specialty chemicals export tailwind: India's specialty chem exports projected USD 30 bn+ by FY30.",
    "Polymer additives (specialty engineering plastics) growing with EV / electronics localisation.",
    "Long-term LOI contracts with multinationals provide revenue visibility."
  ],
  moat: [
    "Long-term CSM contracts (5-10 years) with global majors — annuity-style revenue.",
    "Multi-step complex chemistry capability (8+ step synthesis routes) — hard for new entrants.",
    "Integrated manufacturing across Sachin + Jhagadia with pilot-to-commercial scale-up infrastructure.",
    "Customer base of 35+ global majors reduces single-customer risk.",
    "USFDA / WHO / Reach compliant facilities.",
    "Honest caveat: CSM is competitive (PI Industries, Navin Fluorine, SRF specialty, Vinati Organics, Aarti Industries — all bigger). Anupam's edge is multi-step complexity + customer diversification."
  ],
  growth: [
    "Q3 FY26 standalone +89% / PAT +150% — operational leverage kicking in.",
    "H1 FY26 consolidated +122% revenue → FY26 likely closes at 80-100% growth.",
    "Capacity ramp at Jhagadia post-FY25 commissioning.",
    "New molecule additions (LOI book has been growing) — typically 6-12 month lag from LOI to revenue.",
    "Geographic expansion + new customer additions."
  ],
  orderbook: [
    "Anupam discloses 'committed contracted revenue' = signed LOI book; typically multi-year and visibility 4-7 years out.",
    "LOI book reportedly USD 1.5+ bn+ historically (~₹12,500+ Cr) per FY25 disclosures.",
    "Visibility: very high — committed multi-year contracts with global majors."
  ],
  management: [
    "Anand Desai (Promoter Chairman) and Mona Desai (Promoter Director) — first-generation; founded 1984.",
    "Promises kept: post-FY24 weak year (agrochem destock), FY26 recovery has been sharp — H1 +122% rev.",
    "Capital allocation: post-IPO (Mar-2021) capex plan executed; debt reasonable; no major dilution.",
    "Communication: detailed concalls; explicit LOI book disclosures; transparent on customer mix.",
    "Watch-out: H1 FY26 +122% growth is partly base-effect of FY25 weakness; sustainable run-rate is 30-40%."
  ],
  risks: [
    "Customer concentration: top 5-7 global majors likely 60%+ revenue.",
    "Agrochem cycle volatility — CSM revenue can swing 30-50% year-to-year.",
    "Currency: significant export exposure; INR appreciation hurts.",
    "Working capital — CSM has high inventory + receivables.",
    "Regulatory: USFDA / EU REACH compliance is critical; any audit issue is binary.",
    "Competitive: PI Industries, Navin Fluorine, SRF, Aarti Industries, Vinati all aggressive."
  ],
  valuation: [
    "FY26E revenue ~₹2,400-2,600 Cr; PAT ~₹220-280 Cr.",
    "Mcap ~₹15,193 Cr → FY26 P/E ~55-65x — rich.",
    "FY27E revenue ~₹3,200-3,500 Cr (assuming 30% growth normalises); PAT ~₹400-450 Cr → P/E ~35-40x.",
    "Comparable: PI Industries ~40-45x, Navin Fluorine ~50-55x, SRF specialty ~30-35x.",
    "Directional view: premium for hyper-growth + LOI book; reasonable on FY28E if execution holds."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26) — full-year ₹2,400+ Cr revenue, ~₹250 Cr PAT confirmation.",
    "LOI book milestone update.",
    "New large multi-year CSM contract announcement.",
    "Jhagadia capacity ramp (full commercial production).",
    "Possibly polymer additives / specialty product mix shift.",
    "Any acquisition / international expansion."
  ],
  mos: [
    "Moderate MoS — H1 FY26 +122% momentum is justifying premium; needs continued execution.",
    "Best entry: 15-20% pullback creates ~30-35x forward P/E entry.",
    "Position sizing: 2-3% portfolio fit; 3-year horizon for full CSM cycle.",
    "Among the highest-quality specialty chem names in your watchlist."
  ]
});

// 4. ASTEC LIFESCIENCES
const astec = stockSection({
  name: "4. Astec Lifesciences Ltd",
  tag: "Sector: Agrochem AI + Pharma intermediates | Status: Godrej group; FY26 turnaround narrative",
  facts: [
    ["Market Cap", "₹1,618.58 Cr (Bajaj Finserv, 28-Apr-26)"],
    ["FY26 Revenue", "₹453.2 Cr (vs FY25 ₹386.93 Cr / +17.5%)"],
    ["FY26 Net Loss", "₹80.9 Cr (improvement from FY25 loss of ~₹134 Cr)"],
    ["Q4 FY26 Net Sales", "₹158.62 Cr (+27.18% QoQ)"],
    ["Q4 FY26 Net Loss", "₹7.76 Cr (improvement from Q3 ₹15.70 Cr loss)"],
    ["EBITDA Trajectory", "FY25 EBITDA loss ₹61 Cr → FY26 near break-even"],
    ["Promoter", "Godrej Agrovet 67.03%"]
  ],
  business: [
    "Astec Lifesciences is a Godrej group company specialising in: (1) Agrochemical Active Ingredients (AIs) — manufacturing patented + off-patent agrochem AIs for global agrochem majors; (2) Pharma intermediates — supplying to formulators and CSM customers. Capacity at Mahad (Maharashtra), Dombivali, Hyderabad.",
    "FY25 saw deep losses (EBITDA loss ₹61 Cr) due to agrochem destocking + capacity underutilisation + raw material pricing. FY26 is the visible turnaround year — losses narrowed sharply, EBITDA at near break-even, Q-on-Q sales improving."
  ],
  tailwinds: [
    "Agrochem cycle recovery: post-FY24 destocking, demand has begun recovering in FY26.",
    "China+1 in agrochem AI — global majors diversifying away from Chinese suppliers.",
    "Indian agrochem export growth at 8-10% annually.",
    "Off-patent agrochem opportunities (post-2026 patent expiries) opening for Indian generic AI makers.",
    "Godrej parent ecosystem provides marketing + raw material synergies.",
    "Pharma intermediates demand from generic API makers."
  ],
  moat: [
    "Godrej group lineage = governance + capital backing + Godrej Agrovet captive customer.",
    "Multi-step agrochem AI synthesis capability across multiple chemistry platforms.",
    "Long-term relationships with global agrochem majors (Syngenta, FMC, BASF, Bayer).",
    "Capacity at Mahad / Dombivali / Hyderabad provides geographic spread.",
    "Honest caveat: PI Industries, UPL, Bharat Rasayan, Sumitomo Chemical India are bigger / more profitable; Astec is the recovery story, not the structural compounder yet."
  ],
  growth: [
    "Margin recovery: EBITDA loss ₹61 Cr → near break-even FY26 → likely positive FY27.",
    "Revenue growth +17.5% in FY26; FY27 likely 20-25% as cycle normalises.",
    "Off-patent product launches (2026-28 has multiple molecules going off-patent).",
    "Capacity utilisation improvement — operational leverage on existing assets.",
    "Pharma intermediates ramp."
  ],
  orderbook: [
    "Agrochem AI is mostly contract-based with global customers; visibility 6-12 months.",
    "Off-patent products are spot-driven.",
    "Godrej Agrovet captive procurement provides base load."
  ],
  management: [
    "Godrej group governance — board has Godrej Agrovet representation; board reshuffle in FY26 announced.",
    "Promises kept: FY26 turnaround tracking — losses narrowed every quarter, sales ramping QoQ.",
    "Capital allocation: capex muted during turnaround; balance sheet preserved.",
    "Communication: quarterly results + concalls; Godrej Agrovet's parent disclosures often more detailed.",
    "Watch-out: turnaround can take 4-6 quarters from FY26 trough; full normalisation likely FY27-28."
  ],
  risks: [
    "Agrochem cycle reversal — if global cycle weakens again, recovery extends.",
    "Customer concentration (Godrej Agrovet + global majors).",
    "Raw material / energy cost volatility.",
    "FY26 still loss-making; valuation depends on margin trajectory.",
    "Regulatory: USFDA / EU compliance audits.",
    "Competition: PI, Bharat Rasayan, Sumitomo Chemical, UPL — all larger."
  ],
  valuation: [
    "FY26 reported loss ₹80.9 Cr; Mcap ₹1,618 Cr → P/E not meaningful (loss).",
    "EV / Sales ~3.5-4x on FY26 sales — not cheap on revenue multiple.",
    "FY27E rev ~₹550-600 Cr; if EBITDA margin recovers to 12-15% (from 0%), PAT could be ₹40-60 Cr → forward P/E 27-40x.",
    "Comparable: PI Industries ~40-45x (premium), Bharat Rasayan ~25-30x, Sumitomo Chemical India ~50-55x.",
    "Directional view: turnaround narrative; valuation requires patience for margin recovery."
  ],
  catalysts: [
    "Q1 FY27 results (Jul-26) — first profitable quarter (expected).",
    "Off-patent agrochem product launches.",
    "Major contract wins from global agrochem majors.",
    "Godrej Agrovet strategic actions (consolidation / restructuring).",
    "Board reshuffle outcome (announced AGM).",
    "Cyclical agrochem inflation."
  ],
  mos: [
    "MoS depends on margin recovery; current loss-making → speculative.",
    "Best entry: only after 1-2 profitable quarters confirm sustainable turnaround.",
    "Position sizing: 1-1.5% portfolio max during turnaround.",
    "Better risk-reward in Anupam Rasayan within this batch for specialty chem exposure."
  ]
});

// 5. EPL LTD
const epl = stockSection({
  name: "5. EPL Ltd (formerly Essel Propack)",
  tag: "Sector: Laminated Plastic Tubes (Beauty / Pharma / Food / Oral / Home) | Status: Global packaging leader, steady compounder",
  facts: [
    ["Market Cap", "₹7,247 Cr (Screener / MarketsMojo, +17.9% 1-yr)"],
    ["Q2 FY26 Net Sales", "₹1,205.90 Cr (+11.02% YoY, +8.85% QoQ)"],
    ["Q2 FY26 Net Profit", "₹104.30 Cr (+19.89% YoY, +4.30% QoQ)"],
    ["FY25 Q4 Net Profit", "₹114 Cr (+411% YoY base effect)"],
    ["Annual capacity", "~8 billion tubes globally"],
    ["Manufacturing footprint", "USA, Mexico, Colombia, Brazil, Poland, Germany, Egypt, China, Philippines, India"],
    ["Promoter", "Blackstone (post 2019 buyout from Essel Group)"]
  ],
  business: [
    "EPL (formerly Essel Propack) is the world's largest global specialty packaging company manufacturing laminated plastic tubes for beauty & cosmetics, pharma & health, food, oral care, and home care brands. Customer base is a who's-who of FMCG MNCs: Colgate, P&G, Unilever, L'Oréal, GSK, Henkel, Estée Lauder, Johnson & Johnson, plus regional FMCG and contract manufacturers.",
    "Globally diversified manufacturing footprint across 11 countries reduces geographic concentration. Blackstone-owned (since 2019) when private equity acquired controlling stake from the Goenka family. The business is volume + premiumisation (aluminum-barrier laminated tubes for premium brands)."
  ],
  tailwinds: [
    "FMCG packaging shift from PE / metal cans to laminated tubes for premium positioning.",
    "Beauty & personal care premiumisation — aluminum-barrier tubes (ABL) for premium toothpaste, cosmetics.",
    "Global pharma packaging growth: ointment tubes, pharma applications.",
    "Sustainability / recyclability push — EPL invested in mono-material / recyclable tube tech.",
    "China+1: global FMCG MNCs diversifying packaging supply away from Chinese suppliers.",
    "Indian premium FMCG (Dabur, ITC, Patanjali, HUL) growing → domestic tube demand."
  ],
  moat: [
    "Global largest scale — 8 bn tubes / year capacity is 2-3x next competitor (Albea, Berry Global).",
    "11-country manufacturing footprint = local-for-local supply to global customers.",
    "Blackstone backing = capital + governance + operational rigour since 2019.",
    "Decades-long relationships with global FMCG majors; specification + supplier-of-choice positioning.",
    "Sustainability tech (Platina mono-material tubes) — early mover in recyclable packaging.",
    "Honest caveat: laminated tubes are not deeply differentiated; competition with Albea (Europe), Berry Global, Huhtamaki on quality + price."
  ],
  growth: [
    "Q2 FY26 +11% revenue / +20% PAT — operating leverage delivering.",
    "Premiumisation: ABL (Aluminum Barrier Laminate) mix shift drives margin expansion.",
    "Geographic mix: Americas + EMEA + AMESA balanced.",
    "Capacity expansion in select geographies.",
    "Sustainable / mono-material tube launch ramping."
  ],
  orderbook: [
    "FMCG packaging is annual / quarterly contract-based; not formal OB.",
    "Long customer relationships provide multi-year visibility.",
    "Geographic spread reduces single-country risk."
  ],
  management: [
    "Blackstone-owned (Anand Kripalu - CEO appointed 2019 post-buyout); operational rigour upgraded post-acquisition.",
    "Promises kept: post-buyout, EPL has delivered consistent revenue + margin improvement; FY25 Q4 +411% PAT growth (partly base-effect, but trend solid).",
    "Capital allocation: capex disciplined; debt managed; dividends paid.",
    "Communication: detailed concalls; investor presentations cover segmental + geographic mix.",
    "Watch-out: Blackstone exit overhang — eventually they will sell the stake; could create supply-side overhang on stock."
  ],
  risks: [
    "Customer concentration: top 5-6 FMCG majors likely 50%+ revenue.",
    "Raw material — polymer (HDPE, LDPE), aluminum foil price volatility.",
    "Currency: significant cross-border exposure.",
    "Sustainability transition risk — if mono-material tech doesn't scale, premium pricing capped.",
    "Blackstone exit overhang — large secondary supply when PE exits.",
    "FMCG cycle slowdown — particularly impacting beauty/personal care premium segment."
  ],
  valuation: [
    "FY26E revenue ~₹4,800-5,000 Cr; PAT ~₹420-470 Cr.",
    "Mcap ~₹7,247 Cr → FY26 P/E ~16-17x.",
    "Comparable: Polyplex ~15-18x, Huhtamaki India ~20-25x, Cosmo First ~10-12x.",
    "Directional view: reasonable valuation for global packaging leader; not stretched."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26).",
    "Blackstone exit timeline / strategic action.",
    "New customer announcements (premium beauty / pharma).",
    "Sustainability product traction (Platina, mono-material tubes).",
    "Capacity expansion / new geography.",
    "Possible buyback / special dividend."
  ],
  mos: [
    "Reasonable MoS — ₹17x P/E for global market leader is fair.",
    "Best entry: any 10-15% pullback (especially around Blackstone exit news).",
    "Position sizing: 2-3% portfolio fit.",
    "Steady compounder profile — defensive component within batch."
  ]
});

const closing = [
  H1("Batch 3 — Closing Synthesis"),
  H2("Top 2 Conviction Picks"),
  Bul("Anupam Rasayan — H1 FY26 +122% revenue, Q3 standalone +89% / PAT +150%; CSM tailwind durable; multi-year LOI book. Premium valuation but justified by growth."),
  Bul("EPL Ltd — global packaging leader with steady compounder profile; ₹17x P/E is fair; defensive component."),
  H2("Speculative / Turnaround"),
  Bul("Astec Lifesciences — Godrej-group turnaround narrative; losses narrowing each quarter; needs 2-3 profitable quarters before adding."),
  Bul("Accent Microcell — niche pharma excipient + global tailwind, but SME platform discount; 1-2% sizing only."),
  Bul("Haleos Labs — weak ROE (8.63%); margin compression; cheap but cheap-for-a-reason. Smallest position only."),
  H2("Cycle / Catalyst Calendar"),
  Bul("May-26: Q4 + FY26 results across all 5 names — material data points for all."),
  Bul("Q1 FY27 (Jul-26): Astec first profitable quarter (expected) → key for turnaround thesis."),
  Bul("FY27 H2: Anupam capacity ramp + new LOI announcements likely."),
  Bul("Off-patent agrochem cycle 2026-28 — Astec + (separately) UPL / PI beneficiaries."),
  H2("Risk Concentration"),
  Bul("3/5 names export-heavy (Anupam, Astec, EPL) — currency + global cycle exposure."),
  Bul("2/5 SME / micro-cap (Accent, Haleos) — governance + liquidity overhang."),
  Bul("Pharma / agrochem regulatory risk applies across the batch."),
  Bul("Limit total Batch-3 exposure to 8-12% of portfolio."),
  P("End of Batch 3. Batch 4 (EMS / Electronics / Tech — 7 stocks) follows.")
];

// Build doc
const doc = new Document({
  creator: "Claude (Cowork Mode) for Rajat",
  title: "Equity Watchlist Deep-Dive — Batch 3",
  description: "Detailed deep-dive on 5 stocks: Specialty Chemicals / Pharma",
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
      children: [new TextRun({ text: "Equity Watchlist — Batch 3: Specialty Chem / Pharma", italics: true, size: 18, color: "808080" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Page ", size: 18, color: "808080" }),
                 new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080" })] })] }) },
    children: [
      ...cover, ...methodology, ...execSummary,
      ...accent, ...haleos, ...anupam, ...astec, ...epl,
      ...closing
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(__dirname + "/Equity_Watchlist_Batch3_SpecialtyChemPharma.docx", buf);
  console.log("Wrote Equity_Watchlist_Batch3_SpecialtyChemPharma.docx (size:", buf.length, "bytes)");
});
