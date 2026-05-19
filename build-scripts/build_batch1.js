// Batch 1: Power, Mining, Realty & Others — Equity Deep-Dive Report
// 13 stocks: 4 SMEs first, then 9 main-board names
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  TabStopType, TabStopPosition, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak, TableOfContents
} = require('docx');

// ---------- Helpers ----------
const border = { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" };
const borders = { top: border, bottom: border, left: border, right: border };

const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, bold: true })] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, bold: true })] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t, bold: true })] });
const P  = (t) => new Paragraph({ children: [new TextRun(t)], spacing: { after: 120 } });
const Bul = (t) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun(t)], spacing: { after: 80 } });
const Lbl = (label, body) => new Paragraph({
  spacing: { after: 120 },
  children: [
    new TextRun({ text: label + ": ", bold: true }),
    new TextRun(body),
  ]
});
const PB = () => new Paragraph({ children: [new PageBreak()] });
const Spacer = () => new Paragraph({ children: [new TextRun("")] });

// table cell helper
function tc(text, opts = {}) {
  const { bold = false, shade = null, width = 2340, align = AlignmentType.LEFT } = opts;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: shade ? { fill: shade, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ alignment: align, children: [new TextRun({ text: String(text), bold })] })]
  });
}

// summary table builder for executive summary
function summaryTable(rows) {
  const headers = ["Stock", "Sector", "Mcap (₹Cr est.)", "Thesis (1-line)"];
  const colWidths = [1700, 1700, 1500, 4460];
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
    children: r.map((cell, i) =>
      tc(cell, { width: colWidths[i], shade: idx % 2 === 1 ? "F2F2F2" : null })
    )
  }));

  return new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows]
  });
}

// 2-col fact table per stock (key metrics)
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

// ---------- Cover & Front Matter ----------
const cover = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 240 },
    children: [new TextRun({ text: "Equity Watchlist Deep-Dive", bold: true, size: 56 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text: "Batch 1: Power, Mining, Realty & Others", bold: true, size: 36 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 },
    children: [new TextRun({ text: "13 stocks — SMEs first, then main-board", italics: true, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text: "Prepared for: Rajat", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: [new TextRun({ text: "Date: April 2026", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 },
    children: [new TextRun({ text: "Lens: Near-term catalysts (6-18 mo) | Valuation / margin of safety | Sector tailwinds", italics: true, size: 22 })] }),
  PB()
];

// ---------- Methodology / How to read ----------
const methodology = [
  H1("Methodology & How to Read This Report"),
  P("This batch covers 13 stocks from the Power, Mining, Realty and 'Others' (financials, glass, films, marine) buckets of your watchlist. Per your preference, the 4 SME-listed names that have the highest multibagger optionality are profiled first, followed by the 9 main-board names."),
  P("For each stock, the structure is identical so you can scan and compare:"),
  Bul("Business in Plain English — what they actually do, who pays them, where the cash comes from."),
  Bul("Sector Tailwinds — the macro / policy / demand backdrop driving the next 1-3 years."),
  Bul("MOAT — what makes the company defensible (or not). Honest read, not marketing."),
  Bul("Growth Drivers — the 2-3 levers that move earnings over 6-18 months."),
  Bul("Order Book / Revenue Visibility — how much of next year's revenue is already booked."),
  Bul("Management Execution — promises vs. delivery from the last 4-8 quarters."),
  Bul("Key Risks — what genuinely breaks the thesis, ranked."),
  Bul("Valuation Snapshot — current multiple vs. peer / own history with a directional view."),
  Bul("Near-Term Catalysts (6-18 mo) — the 3-5 events that will likely move the stock."),
  Bul("Margin-of-Safety View — at what price the risk-reward looks asymmetric."),
  P("Sources: Screener.in fundamentals, BSE/NSE filings, recent investor presentations and concall transcripts, ValuePickr forum threads, and X (Twitter) channel checks. Numbers are as of April 2026 to the best of available information; readers should re-verify the latest quarterly results before action."),
  P("Important caveat: This is research for personal investment decision-making. It is not a buy/sell recommendation. Several SME names have low free-float and limited public coverage — execution and disclosure risk is materially higher than main-board peers."),
  PB()
];

// ---------- Executive Summary Table ----------
const execSummary = [
  H1("Executive Summary — Batch 1"),
  P("Quick read across all 13 names. Detailed sections follow."),
  summaryTable([
    ["Oriana Power", "Solar EPC + IPP + BESS", "~7,500", "Hyper-growth solar + storage platform; H1FY26 rev +117%; rich valuation needs continued execution."],
    ["Rajesh Power", "Power T&D EPC", "~3,000", "Niche Gujarat T&D player; FY26 rev +52%, OB ₹3,326 Cr (~2x rev); discom capex tailwind."],
    ["Knowledge Marine", "Marine / Dredging / Shipbuilding", "~2,000", "Asset-light marine ops + new shipbuilding entry; OB ₹1,500 Cr; tonnage-tax advantage."],
    ["Sathlokhar Synergys", "Industrial EPC / PEB", "~1,200", "Factory-construction EPC riding manufacturing capex; rev +400% Q3, OB ₹1,100-1,400 Cr."],
    ["NLC India", "Lignite Mining + Power + RE", "~24,000", "PSU value-unlock via NLC Renewables demerger + IPO listing; lignite cash cow."],
    ["GMDC", "Lignite + REE + Critical Minerals", "~22,700", "REE re-rating play; BARC tech transfer + NMDC MoU; Ambadungar mineral monetisation."],
    ["Godawari Power", "Iron ore mining + steel", "~14,000", "₹25,000 Cr revenue vision by 2030; pellet capacity doubled; CRM + BESS capex."],
    ["Electrosteel Castings", "Ductile Iron Pipes (water infra)", "~7,000", "JJM extended to Dec-28 with ₹8.7L Cr outlay; near-term volume soft, 2H FY27 inflexion."],
    ["Kolte Patil", "Real Estate (Pune-led)", "~3,000", "FY26 sales ₹2,605 Cr; 9MFY26 weak but Q4 +13%; mid-segment Pune is the lever."],
    ["Garware Hi-Tech", "PPF / Sun Control / BOPET films", "~10,500", "Premiumisation via PPF; new ₹125 Cr Waluj line live; near-term Q2 dip = entry candidate."],
    ["Haldyn Glass", "Glass containers", "~700", "Niche F&B/liquor bottle maker; capacity expansion + premium decorative glass plant planned."],
    ["CARE Ratings", "Credit rating agency", "~5,000", "9MFY26 rev +14-17%; bank credit at +14.5%; corporate bond cycle improving — duopoly oligopoly."],
    ["Monarch Networth", "Broking + IB + AIF", "~3,500", "Capital-markets cycle late-stage; PAT margins still 50%+ but revenue softening."]
  ]),
  PB()
];

// ---------- Stock Section Builder ----------
function stockSection(meta) {
  const pieces = [];
  pieces.push(H1(meta.name));
  pieces.push(new Paragraph({
    children: [
      new TextRun({ text: meta.tag, italics: true, color: "595959" })
    ],
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

// ====================================================================
//                           STOCK CONTENT
// ====================================================================

// ---------- 1. ORIANA POWER ----------
const oriana = stockSection({
  name: "1. Oriana Power Ltd (NSE SME → mainboard)",
  tag: "Sector: Renewable Energy EPC + IPP | Listed: Aug 2023 | Status: SME-platform multibagger",
  facts: [
    ["Market Cap (Apr-26)", "~₹7,000-8,000 Cr range (estimated; verify on Screener)"],
    ["FY26 H1 Revenue", "₹781 Cr (+117% YoY)"],
    ["FY26 H1 PAT", "₹121 Cr (+165% YoY); EBITDA ₹182 Cr, margin 23.3%"],
    ["Order Book", "₹2,500+ Cr (excludes new ₹1,180 Cr DVC Maithon floating-solar EPC)"],
    ["Strategic JV", "Actis 1 GW RE platform — USD 100mn equity; ~₹4,000 Cr revenue over 2 yrs"],
    ["Promoters", "Rupal Gupta, Anirudh Saraswat (founder-led)"],
    ["Listing", "Migrated from NSE Emerge to NSE Mainboard (FY25)"]
  ],
  business: [
    "Oriana Power is a renewable-energy platform company that does three things: (1) builds solar power projects on EPC basis for industrial customers and government utilities; (2) owns and operates solar IPP (Independent Power Producer) assets that sell electricity under long-term PPAs; and (3) is scaling into Battery Energy Storage Systems (BESS), green hydrogen, green ammonia, and e-fuels.",
    "Revenue mix is dominantly EPC today (executing third-party solar projects) but the IPP book is growing fast — owned-asset capacity gives recurring annuity revenue, while new product lines (BESS, hydrogen) are FY27-29 optionality. The Actis JV transformed the company from contractor to platform: 1 GW of RE assets developed over 2 years with USD 100mn equity locked in."
  ],
  tailwinds: [
    "India's RE target of 500 GW by 2030 implies ~50 GW/year of additions; FY25 saw record ~28 GW added; FY26 likely 35-40 GW.",
    "Floating solar emerging as a new category — DVC Maithon ₹1,180 Cr win is a marker order; reservoirs across India (DVC, NTPC, NHPC, NHDC) have huge potential.",
    "BESS tariff discovery has crashed (₹2.5-3.0 lakh/MWh-yr levels in late 2025 auctions) but demand is structurally taking off as discoms add solar+storage tenders.",
    "Green hydrogen mission: ₹19,744 Cr SIGHT scheme; first-mover RE players are positioning for 2027-30 ramp.",
    "C&I (commercial & industrial) rooftop / OPEX solar a multi-decade tailwind as India's electricity tariff for industry stays high (₹7-9/unit)."
  ],
  moat: [
    "Speed of execution + cost discipline — Oriana has built a reputation for delivering EPC projects ahead of schedule, which wins repeat orders from industrial clients.",
    "Vertical integration: own EPC + own IPP + future O&M creates lifetime value capture vs. pure-EPC peers like KP Energy, Inox Wind Energy.",
    "Actis partnership = global LP capital backing; this is a credibility moat for winning 100+ MW utility tenders.",
    "Honest caveat: in solar EPC, the 'moat' is execution + balance-sheet capacity. Oriana doesn't have a structural cost advantage over Tata Power, Adani Green or KPI Green — speed, customer relationships, and now Actis-backed capital are the real edges."
  ],
  growth: [
    "Conversion of ₹2,500 Cr+ order book to revenue at ~70% gross execution rate in next 12-18 months → FY27 revenue could clock ₹2,500-3,000 Cr (vs ~₹1,500-1,600 Cr FY26E).",
    "Actis JV-led IPP capacity addition of 1 GW: at ₹5-6 Cr/MW, that's ₹5,000-6,000 Cr asset base producing ₹600-800 Cr annual revenue + ₹400-500 Cr EBITDA at maturity.",
    "BESS capacity addition target of 1+ GW by end-FY26; first orders already flowing; margin profile higher than vanilla solar EPC.",
    "Floating solar — DVC Maithon is the demonstration; reservoir-based pipeline with NTPC, SJVN, NHPC opens addressable market of multi-GW."
  ],
  orderbook: [
    "Outstanding order book of ₹2,500+ Cr (pre-Maithon order). Including the ₹1,180 Cr DVC Maithon floating-solar EPC (announced Q3 FY26), the total reaches ~₹3,700 Cr — providing ~2x current annual revenue visibility.",
    "Actis JV pipeline of 1 GW over 2 years provides a separate ₹4,000 Cr revenue runway not all in the order book today.",
    "Bid pipeline reportedly includes BESS tenders, multi-state solar EPC and a few ammonia / hydrogen FEED studies — book-to-bill ratio strong."
  ],
  management: [
    "Rupal Gupta (Promoter-Director) and Anirudh Saraswat (CEO) are first-generation founders with execution background. Track record since 2013 on solar EPC; SME IPO in Aug 2023 was sized small (~₹50 Cr) and the stock has delivered multi-bagger returns on consistent earnings beats.",
    "Promises kept so far: H1 FY26 +117% revenue growth tracks above the 'doubling FY26' commentary made in concalls. EBITDA margin held at 23%+ despite volume scale-up — suggests pricing discipline.",
    "Watch-outs: rapid scale-up has involved equity raises (QIP) and larger working-capital cycle (typical EPC stretch). Investor communication has been good; concall transparency improving with mainboard listing."
  ],
  risks: [
    "Working capital intensity: solar EPC has 4-6 month receivable cycles with state discoms; if order mix tilts to slow-paying discoms, cash conversion deteriorates.",
    "Execution slip on Maithon floating-solar (largest single order) would disproportionately hit credibility — floating solar is operationally harder than ground-mount.",
    "Valuation rich: at ~₹7,500 Cr Mcap on FY26E PAT of ~₹250-280 Cr, the stock trades at 27-30x forward earnings vs. KPI Green / Solex Energy at 25-35x, but earnings runway depends on continued order wins.",
    "Competitive intensity: Tata Power Solar, Adani Green, Sterling & Wilson, Larsen & Toubro all bid the same large utility-scale tenders; margins under pressure if Oriana over-promises on big bids.",
    "Module / cell price volatility: solar module input prices can swing 20-30%; fixed-price EPC contracts without escalation clauses become a margin risk.",
    "Equity dilution risk: continued capacity scaling (especially IPP-side) will require fresh equity rounds; QIP overhang is real."
  ],
  valuation: [
    "FY26E revenue ~₹1,500-1,600 Cr; PAT ~₹240-280 Cr at current run-rate. FY27E revenue could realistically reach ₹2,500-3,000 Cr if order book conversion holds, with PAT scaling to ₹400-500 Cr.",
    "On FY27E basis, Mcap of ~₹7,500 Cr translates to ~17-19x P/E — not optically expensive if the growth trajectory holds. But that requires Maithon execution + Actis ramp + BESS to deliver simultaneously.",
    "Comparable: KPI Green (similar solar EPC + IPP) trades at 25-35x; Sterling & Wilson at deep losses; Inox Wind at 40-50x. Oriana sits in the middle on multiples but has highest growth among comparables.",
    "Directional view: rich valuation but justified if H1 FY26 momentum holds for 4 more quarters. Needs continuous earnings beats."
  ],
  catalysts: [
    "Q4 FY26 results (May 2026) — gauge full-year run-rate vs. H1 ₹781 Cr.",
    "DVC Maithon floating-solar mobilisation milestones — first revenue contribution likely Q2 FY27.",
    "Actis JV first IPP commissioning — likely in H1 FY27.",
    "BESS standalone large tender win (Gujarat / Maharashtra / Karnataka discoms running tenders).",
    "Possible re-rating event: inclusion in MSCI India Smallcap or Nifty Smallcap 250 indices.",
    "Green hydrogen pilot — any FEED-to-EPC conversion would be a multi-bagger optionality trigger."
  ],
  mos: [
    "At current levels, the margin of safety is thin — investors are paying for FY27-28 execution. A 15-25% drawdown post a single quarterly miss is plausible.",
    "Buy zone for new capital: a 20-30% pullback (similar to the post-Q1 FY26 dip) plus continued order momentum would create a more asymmetric setup. Position-sizing matters more than entry on hyper-growth names like this.",
    "Best fit for: investors who already own and want to hold; cautious adders should phase in tranches and watch order-book conversion ratio (annual revenue / opening OB) as the key health metric."
  ]
});

// ---------- 2. RAJESH POWER SERVICES ----------
const rajesh = stockSection({
  name: "2. Rajesh Power Services Ltd (NSE Mainboard, ex-SME)",
  tag: "Sector: Power T&D EPC | Listed: Dec 2023 | Status: Discom-capex pure-play",
  facts: [
    ["Market Cap (Apr-26)", "~₹3,000 Cr range (verify on Screener)"],
    ["FY26 Revenue", "₹1,628 Cr (+52% YoY)"],
    ["FY26 EBITDA / PAT", "EBITDA +59% / PAT +48% YoY"],
    ["Order Book (Mar-26)", "₹3,326 Cr (incl. L1) — 71% T&D, 29% distribution"],
    ["FY26 Order Inflow", "₹2,473 Cr"],
    ["Bidding Pipeline", "₹3,500 Cr active + ₹2,200 Cr awaiting result (Apr-25 disclosure)"],
    ["Promoter-MD", "Kurang Panchal"]
  ],
  business: [
    "Rajesh Power is a power-transmission and distribution (T&D) EPC contractor focused on Gujarat and adjacent states. They build sub-stations (33 kV / 66 kV / 132 kV / 220 kV), lay overhead and underground transmission lines, install distribution infrastructure, and undertake rural electrification works for state discoms (PGVCL, MGVCL, UGVCL, DGVCL, GETCO) and private utilities.",
    "Revenue is project-based EPC; the company also does some O&M and renewable-side T&D evacuation work. Cash flow is order-book driven — execution speed and bid-to-win ratio determine growth."
  ],
  tailwinds: [
    "Revamped Distribution Sector Scheme (RDSS): Centre's ₹3.03 lakh Cr scheme through FY26 driving discom capex; major beneficiary segment for T&D EPC.",
    "Gujarat-specific state capex on solar park evacuation (Khavda, Dholera, Banaskantha) needs heavy substation + line build-out — Rajesh Power is well-placed by geography.",
    "Renewable evacuation: every GW of solar/wind needs commensurate transmission; CEA estimates ₹9.15 lakh Cr T&D capex in 2022-32 plan.",
    "Underground cabling shift in Tier-1 cities → higher-margin work vs. overhead lines.",
    "Smart-metering rollout (~25 cr meters) creates allied opportunities for T&D players with DT and HT metering exposure."
  ],
  moat: [
    "Geographic specialisation: deep contractor relationships with Gujarat discoms — being a 'home' contractor means quicker bid responses, better pricing intelligence, and lower mobilisation costs.",
    "Class A/A* contractor pre-qualifications which let them bid for large tenders that smaller players can't.",
    "Asset-light model with focus on labour subcontracting → ROCE stays high (40%+ historically).",
    "Honest caveat: T&D EPC is competitive (KEC International, Kalpataru Projects, KPI Green's substation arm, Skipper, Karamtara) — Rajesh's edge is regional concentration, not technology."
  ],
  growth: [
    "Order book of ₹3,326 Cr is ~2x FY26 revenue — translates to ₹1,800-2,200 Cr FY27 revenue at current execution pace (15-20% growth).",
    "FY26 inflow of ₹2,473 Cr means book-to-bill of 1.5x; if FY27 inflow holds at ₹2,500-3,000 Cr range, the growth runway extends to FY28-29.",
    "Renewable-evacuation EPC (Khavda, Dholera) is the highest-margin sub-segment — outsized contribution likely if these RE parks ramp.",
    "Geographic expansion to Rajasthan, Maharashtra, MP under-way — diversifies single-state concentration."
  ],
  orderbook: [
    "Outstanding order book ₹3,326 Cr as of Mar-26 (incl. L1 positions). Composition: 71% T&D substation/lines, 29% distribution-side work.",
    "Bid pipeline of ₹3,500 Cr actively bidding + ₹2,200 Cr awaiting tender results — high probability that 30-40% converts into wins over next 2-3 quarters.",
    "Average execution period 12-24 months; book provides ~18-24 months of revenue visibility.",
    "Major risk: order book has executed-but-unbilled portion; cash conversion depends on discom payment cycles (RDSS funds are improving this)."
  ],
  management: [
    "Kurang Panchal (MD) — second-generation promoter; family has been in Gujarat T&D for 30+ years; track record of consistent execution since 2007.",
    "Promises kept: at IPO in Dec 2023, guidance was 35-45% revenue growth — FY26 delivered +52%. EBITDA margins held at 13-14% despite scale-up — disciplined.",
    "Capital allocation has been conservative; debt low, no major dilution post-IPO; dividend policy moderate. Concall communication is professional but not over-promising — a positive.",
    "Watch-out: rapid scale-up means audit / control infrastructure needs to keep pace; small T&D EPCs have historically had write-offs in 4-5 year of fast growth."
  ],
  risks: [
    "Concentration risk — Gujarat-heavy revenue; any state-level discom payment delay or tender pause hits hard.",
    "Receivable risk: discoms historically delay payments; though RDSS has improved this, any cycle slowdown in govt capex is a direct hit.",
    "Commodity input — copper, steel structures, transformer prices can squeeze margins on fixed-price contracts.",
    "Increased competition from larger pan-India EPCs (KEC, Kalpataru) bidding aggressively for Gujarat work.",
    "Execution stretch on greenfield states (Rajasthan, MP) where the team is new and labour relationships young."
  ],
  valuation: [
    "FY26 PAT estimate ~₹140-160 Cr at +48% YoY growth assumption. On ~₹3,000 Cr Mcap, P/E ~19-21x.",
    "FY27E PAT ~₹180-220 Cr possible if order conversion stays at 65-70%. Forward P/E ~14-17x.",
    "Comparable: KEC International ~25-28x, Kalpataru Projects ~22x, Skipper ~30x — Rajesh Power trades at meaningful discount but is much smaller and Gujarat-concentrated.",
    "Directional view: reasonably valued for the growth profile if inflow trends hold. Re-rating likely if it crosses ₹2,000 Cr revenue with margins intact."
  ],
  catalysts: [
    "Q1 FY27 results (Jul-26) — gauge if FY27 inflow run-rate is on track for ₹2,500-3,000 Cr.",
    "Major Khavda / Dholera evacuation order win — could add ₹500-1,000 Cr to OB in single tender.",
    "Geographic diversification announcement — first major Rajasthan / Maharashtra order would de-risk thesis.",
    "RBI / Centre RDSS scheme extension or top-up — direct beneficiary.",
    "Promoter pledge or QIP overhang resolution (if any).",
    "Index inclusion / institutional accumulation milestones."
  ],
  mos: [
    "Margin of safety is moderate — current valuation is fair, not cheap. Best entry: a 10-15% drawdown post any quarterly miss or sector concern.",
    "Better risk-reward than larger T&D EPCs because of growth + low base; but be alert to single-state concentration.",
    "Position-sizing rule: small initial position; add only on order-book milestones (next being expected to cross ₹4,000 Cr OB)."
  ]
});

// ---------- 3. KNOWLEDGE MARINE ----------
const kmew = stockSection({
  name: "3. Knowledge Marine & Engineering Works Ltd (KMEW)",
  tag: "Sector: Marine Services / Dredging / Shipbuilding | Listed: 2022 (BSE Mainboard) | Status: Niche multibagger",
  facts: [
    ["Market Cap (Apr-26)", "~₹2,000 Cr range (verify on Screener)"],
    ["Q3 FY26 Revenue", "₹90 Cr (+56% YoY)"],
    ["Q3 FY26 EBITDA Margin", "~43%"],
    ["Order Book", "₹1,500 Cr; bids ~₹3,000 Cr"],
    ["Tax rate", "<1% (tonnage tax scheme post-shipbuilding entry)"],
    ["Shipbuilding orders", "₹230 Cr from IWAI + 15-yr green tug contract"],
    ["3-yr revenue target", "₹500-700 Cr from shipyard expansion"]
  ],
  business: [
    "KMEW operates a fleet of marine vessels — dredgers, tugboats, mooring boats, survey vessels, anchor-handling tugs — that provide port-side services like channel dredging, tug assistance for berthing, mooring, salvage, and survey work. Customers are major Indian ports (Mumbai, JNPT, Mundra, Krishnapatnam, Visakhapatnam, Cochin) and oil & gas terminals (Reliance, ONGC).",
    "FY26 milestone: KMEW entered commercial shipbuilding via a small captive yard, secured ₹230 Cr in IWAI orders for inland-waterways vessels and a 15-year green-tug contract — opening a structurally higher-margin and longer-duration revenue stream beyond pure marine services."
  ],
  tailwinds: [
    "Sagarmala / port-led development — Centre's ₹6 lakh Cr port modernisation plan over 10 years drives dredging demand.",
    "Shipbuilding revival: Ministry of Ports/Shipping's announced ₹25,000 Cr Maritime Development Fund + shipbuilding subsidy scheme post-Budget 26; KMEW is among the smallest listed beneficiaries.",
    "Green-tug transition: India committed to 100% green-tug fleets at major ports by 2030 → fleet replacement cycle.",
    "Inland waterways: ₹5,000+ Cr govt programme; IWAI tenders rising sharply post-Jal Marg Vikas Project.",
    "Tonnage tax regime extension to shipbuilders — KMEW's effective tax rate has dropped to <1%, structurally enhancing return ratios."
  ],
  moat: [
    "Niche fleet positioning — most large marine companies (Great Eastern Shipping, Shipping Corp) target deep-sea; KMEW is one of the few profitable port-side specialists at sub-₹100 Cr individual contract level.",
    "Asset-heavy model with high utilisation: ROCE has historically been 25%+ because of own-fleet + long-term port contracts.",
    "Tonnage-tax advantage now extended to shipbuilding makes new vessel additions effectively self-funding.",
    "First-mover in green tug for Indian ports — 15-year contract creates annuity flavor."
  ],
  growth: [
    "Order book of ₹1,500 Cr at current revenue base of ~₹350-400 Cr = ~4 years of visibility.",
    "Shipbuilding entry: target ₹500-700 Cr revenue from yard within 3 years (FY29) — separate from marine services growth.",
    "Fleet expansion: every new vessel is a 12-15 year asset; depreciation tapers but revenue stays — operating leverage builds.",
    "Greenfield yard expansion: capex announced; will drive both shipbuilding output + own-fleet replenishment."
  ],
  orderbook: [
    "Order book ₹1,500 Cr as of Q3 FY26; bids exceeding ₹3,000 Cr.",
    "Composition: marine services (port operations contracts) + shipbuilding (IWAI green tug + commercial vessel orders).",
    "Visibility: with order book at 4x revenue, the next 24 months' growth is largely book-driven, not bid-driven."
  ],
  management: [
    "First-generation promoter (Mukesh Kapasi family); SME IPO in 2022 raised ~₹35 Cr, used efficiently for fleet build-out.",
    "Promises kept: at IPO, the guidance was scaling fleet from 6-7 vessels to 20+ — current fleet is on track. EBITDA margin target of 35-40% has been beaten (43% in Q3 FY26).",
    "Capital allocation: balance sheet has expanded but largely through debt for vessel purchase (asset-backed); equity dilution kept minimal.",
    "Concall transparency is improving with size; transcripts confirm management is conservative on guidance."
  ],
  risks: [
    "Customer concentration: top 3-4 ports / oil terminals can be 50%+ of revenue; contract loss is meaningful.",
    "Vessel asset risk: marine equipment downtime, accidents, dry-docking schedules can hit utilisation hard.",
    "Shipbuilding execution is a new capability — inland-waterway vessels are complex, IWAI is a tough customer; first-of-kind execution risk.",
    "PAT figure inconsistency in some Q3 reports (₹328 Cr looks like a typo from one source — actual quarterly PAT likely ₹30-35 Cr); investors should rely on filing PDFs.",
    "Working capital — port and govt contracts pay slow; receivables can balloon.",
    "Crew availability and training — shortage of qualified mariners is a real bottleneck."
  ],
  valuation: [
    "FY26E revenue ~₹350-400 Cr; PAT ~₹100-130 Cr (margin near 30% post tonnage tax).",
    "On ~₹2,000 Cr Mcap, FY26 P/E ~16-20x. Comparable Cochin Shipyard at ~30x, Mazagon Dock at ~25-30x, Garden Reach at ~30-40x.",
    "KMEW trades at meaningful discount to PSU shipbuilders, but is much smaller and execution-newer in shipbuilding.",
    "Directional view: cheap relative to growth + tonnage-tax cushion, but quality/scale risk justifies a discount."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — full-year shipbuilding revenue contribution emerges.",
    "First green-tug delivery milestone — would validate shipbuilding capability.",
    "New shipyard commissioning announcement — drives 3-year visibility.",
    "Major port long-term contract win (5+ years) — annuity-like rerating trigger.",
    "Maritime Development Fund / shipbuilding subsidy clarifications — direct multiplier on yard economics.",
    "Inclusion in NIFTY Smallcap 250 / institutional ownership rise."
  ],
  mos: [
    "Valuation has more cushion than Oriana / Sathlokhar in this batch; tonnage-tax advantage is durable.",
    "Best zone: 10-15% pullback creates a 15x forward P/E entry — attractive for the niche + tailwind combination.",
    "Risks are real but execution to date has been credible; sizing 1-2% of portfolio with intent to add on milestones is the right approach."
  ]
});

// ---------- 4. SATHLOKHAR SYNERGYS ----------
const sathlokhar = stockSection({
  name: "4. Sathlokhar Synergys E&C Global Ltd",
  tag: "Sector: Industrial / Civil EPC + PEB | Listed: 2023 (NSE SME) | Status: Hyper-growth manufacturing-capex play",
  facts: [
    ["Market Cap (Apr-26)", "~₹1,200 Cr range (verify on Screener)"],
    ["Q3 FY26 Revenue", "₹189.72 Cr (+400% YoY)"],
    ["Q3 FY26 PAT growth", "+340% YoY"],
    ["FY26 Turnover Growth", "+100%+ YoY"],
    ["Order Book (Jan-26)", "₹1,097 Cr (3-10 month execution)"],
    ["Order Book (Feb-26)", "₹1,397.71 Cr confirmed"],
    ["Bid Pipeline (Feb-26)", "~₹15,975 Cr"],
    ["Marquee orders", "Reliance Campa Cola plant (₹102 Cr), EDAC Engineering (₹17.79 Cr)"]
  ],
  business: [
    "Sathlokhar Synergys is an industrial-construction and civil EPC contractor specialising in factory buildings, warehouses, pre-engineered buildings (PEB), and MEP (mechanical, electrical, plumbing) works for manufacturing customers. Geographic concentration is South India (Tamil Nadu, Karnataka, Andhra Pradesh) with growing presence in Maharashtra and Gujarat.",
    "Customer base is a who's-who of capex names: Reliance Consumer Products (Campa Cola plants), large electronics OEMs, FMCG manufacturers, and pharmaceutical companies. The business is project-based EPC with 6-12 month execution cycles."
  ],
  tailwinds: [
    "PLI scheme-driven manufacturing capex: ₹1.97 lakh Cr scheme is creating multi-year factory-build pipeline; industrial construction beneficiary.",
    "China+1 supply chain shift: every new electronics, EV battery, semiconductor, pharma plant adds 3-12 months of EPC work.",
    "Quick Commerce / FMCG capacity expansion: Reliance Campa, Tata Consumer, Britannia, ITC all building new plants; Reliance order is signature.",
    "Data centre boom: India DC capacity to grow 4-5x by 2030 — large EPC opportunity.",
    "Warehousing / 3PL: Grade-A warehousing capex of ₹50,000+ Cr over next 5 years."
  ],
  moat: [
    "Speed-of-build: factory EPC is a margin-vs-speed business; Sathlokhar has built reputation for delivering ahead of schedule, which gets repeat orders from anchor customers like Reliance.",
    "South India contractor density advantage: deep workforce + sub-contractor network → faster mobilisation than pan-India competitors.",
    "PEB + civil + MEP integration — single-window delivery removes coordination cost for customers.",
    "Honest caveat: industrial EPC is competitive (Capacit'e Infra, Ahluwalia Contracts, PSP Projects, Praj Industries' construction). Sathlokhar's edge is speed + size flexibility, not technology."
  ],
  growth: [
    "Order book of ₹1,400 Cr+ on a TTM revenue base of ~₹350-450 Cr = 3+ years of visibility.",
    "Bid pipeline of ~₹16,000 Cr is staggering for a company this size; even a 5-7% conversion rate adds ₹800-1,100 Cr to OB.",
    "Reliance Campa Cola programme (multiple plants planned across India) could be a multi-year repeat customer.",
    "FY27 revenue could realistically scale to ₹800-1,000 Cr if conversion holds and execution doesn't slip — that's another doubling."
  ],
  orderbook: [
    "Confirmed order book: ₹1,097 Cr (Jan-26) → ₹1,397.71 Cr (Feb-26) → executed projects expected over next 3-10 months.",
    "Recent wins: ₹102.71 Cr from Reliance Consumer (Campa Cola) and ₹17.79 Cr from EDAC Engineering (Minjur, Chennai) — both H2 FY27 execution.",
    "Near-term execution: 3-10 months means order book will largely turn into FY27 revenue — high near-term visibility.",
    "Bid pipeline ₹15,975 Cr is unusually large; even modest conversion rates underpin FY28 visibility."
  ],
  management: [
    "Promoter family is from the Tamil Nadu construction circle; SME-listed in 2023 at ~₹140-170 IPO; stock has been a multibagger.",
    "Promises kept: SME IPO offer document targeted ~30-40% revenue growth — actual delivery has been 100%+ in FY26 — significant overshoot.",
    "Capital allocation: largely organic growth, modest debt, no major dilution post-IPO; promoter holding stable.",
    "Watch-out: rapid scale-up at 4x revenue YoY rate creates control / audit risk; investors should track receivables, working capital, and management hires (CFO, control) closely.",
    "Communication: investor presentations and concall transcripts have improved with each quarter; material disclosures (orders, contracts) are timely."
  ],
  risks: [
    "SME-listed → low free-float, limited liquidity, higher volatility; entries / exits at scale are difficult.",
    "Hyper-growth rates (400%) are unsustainable; some growth will mathematically decelerate.",
    "Customer concentration: large single orders (Reliance Campa, EDAC) — execution slip on any one is highly visible.",
    "Receivables / working capital: civil-EPC has 3-6 month receivable cycles; rapid scale-up can balloon working capital.",
    "Commodity input (steel, cement, electrical) pricing — fixed-price contracts squeezed if costs rise.",
    "Audit / disclosure quality: SME-listed companies have historically had governance lapses at this stage; due-diligence on related-party transactions is critical."
  ],
  valuation: [
    "FY26E revenue ~₹500-550 Cr; PAT estimates vary but at ~10-12% net margin, FY26 PAT ~₹50-65 Cr.",
    "On ~₹1,200 Cr Mcap, FY26 P/E ~18-24x. Comparable: Capacit'e Infra ~12-15x, PSP Projects ~10-12x, Ahluwalia ~15-18x.",
    "Sathlokhar trades at premium to construction-EPC peers — reflecting growth + Reliance order halo.",
    "Directional view: optically expensive vs peers but justified if FY27 doubles again. Multiple compression risk if growth normalises to 30-40%."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — confirms full-year ₹500+ Cr revenue.",
    "Order book crossing ₹2,000 Cr milestone — likely in next 2 quarters given bid pipeline.",
    "New marquee customer addition (semiconductor / DC / EV plant) — would diversify Reliance dependency.",
    "Migration from SME platform to mainboard — institutional accessibility unlock + free-float expansion.",
    "FY27 guidance announcement — first concrete forward number from management."
  ],
  mos: [
    "Margin of safety is thin given valuation + SME platform risk. The 'cheapness' here is relative growth, not absolute multiples.",
    "Right approach: small position (1-1.5% of portfolio), watch for migration to mainboard before adding.",
    "Hard stop: any quarter of materially decelerating order inflow or receivable balloon — consider reducing.",
    "Multibagger optionality is real but execution must hold for 4-6 more quarters."
  ]
});

// ---------- 5. NLC INDIA ----------
const nlc = stockSection({
  name: "5. NLC India Ltd (NSE/BSE Mainboard)",
  tag: "Sector: Lignite Mining + Thermal Power + Renewables (PSU) | Status: Demerger value-unlock play",
  facts: [
    ["Market Cap (Apr-26)", "~₹24,000 Cr range"],
    ["Q3 FY26 Revenue", "+4% YoY; PAT decline -4.8% YoY in standalone, +13.5% on consol"],
    ["Q4 FY26 expected", "Revenue ₹3,400-3,700 Cr; PAT ₹350-420 Cr"],
    ["Recent action", "1,430 MW RE assets transferred to NLC India Renewables (NIRL) wef Jan-26"],
    ["NIRL Demerger / IPO", "Up to 25% dilution via OFS approved"],
    ["New mining wins", "Pachwara South coal mine commenced Dec-25; Talabira at record output; Limestone+Phosphorite licence in Chhattisgarh"],
    ["JV", "PTC India - 2,000 MW green energy + OREOA MoU for renewables"]
  ],
  business: [
    "NLC India is a Government of India PSU under the Ministry of Coal. Three businesses: (1) Lignite mining — India's largest, with Neyveli mines in Tamil Nadu, Barsingsar/Bithnok in Rajasthan, expanding into Talabira (Odisha coal) and Pachwara South (Jharkhand coal); (2) Thermal power — pithead lignite/coal-fired plants of ~6,000 MW; and (3) Renewables — solar farms of ~1,430 MW (now demerged into NIRL).",
    "Revenue is largely regulated returns (15.5% RoE) on power generation + tariff-based mining sales. Cash flows are stable PSU-style. Now NLC has explicitly committed to NIRL listing as a value-unlock event."
  ],
  tailwinds: [
    "Coal demand staying high through 2030 despite RE push — base-load requirement; lignite has strategic role in southern India.",
    "Critical-minerals push: NLC granted composite licence for Limestone + Phosphorite in Chhattisgarh — first-mover in non-coal mining.",
    "PSU re-rating cycle: PSU index has rallied; NLC is one of the laggards with demerger-driven catalyst.",
    "National Monetisation Pipeline (NMP): NIRL listing is part of govt's monetisation programme.",
    "RE capacity addition: NLC + JV with PTC for 2,000 MW + OREOA MoU build a multi-GW pipeline."
  ],
  moat: [
    "Captive lignite reserves at Neyveli (350+ Mt of remaining reserves), low cost-of-mining (₹400-600/tonne).",
    "Pithead generation: integrated mine-to-plant lowers fuel logistics; operating leverage beats peers.",
    "PSU advantage: priority access to coal block allocations (Talabira, Pachwara, future blocks) without auction risk.",
    "Regulated-return business gives downside cushion that pure-merchant power or mining peers don't have.",
    "Honest caveat: as a PSU, capital allocation is sub-optimal vs private peers; merger/demerger timelines are slow."
  ],
  growth: [
    "Mining ramp at Talabira (record 1.01 lakh tonnes/day production in Dec-25) → revenue from coal + linkage power.",
    "Pachwara South commissioning in Q4 FY26 → adds 4-5 Mt/yr coal capacity.",
    "Renewables: NIRL targets 6 GW by 2030 (from 1.43 GW now); JV with PTC adds 2 GW.",
    "Critical minerals: limestone+phosphorite + bauxite + REE blocks in pipeline = multi-decade optionality.",
    "NIRL listing unlock: at 1.43 GW + IRR 12-13%, NIRL could be valued at ₹15,000-20,000 Cr stand-alone — vs current implicit value within NLC consol."
  ],
  orderbook: [
    "PPA-based revenue is auto-renewing for thermal (regulated tariff). RE projects under PPAs, no order book per se.",
    "Solar-EPC win from NCRTC (110 MW) — small but signals NIRL becoming credible IPP-developer.",
    "JV with PTC for 2,000 MW + OREOA MoU — multi-year pipeline.",
    "Mining: long-term linkages to TANGEDCO, NTPC, etc — visibility ~25 years."
  ],
  management: [
    "PSU-led management; current MD-CMD changes happen on tenure rotation; capital allocation still PSU-style.",
    "Recent demerger move (NIRL transfer effective 1-Jan-26 + IPO approval) is a meaningful capital-allocation upgrade — shows govt is willing to monetise.",
    "Promises kept on operations: Talabira ramp on schedule, Pachwara South commissioning on schedule, RE capacity additions broadly on plan.",
    "Watch-out: PSU governance is tariff-determined — rate-of-return regulation limits margin upside; merger / demerger executions take 12-18 months from announcement."
  ],
  risks: [
    "Coal/lignite tariff regulation — CERC tariff orders can compress RoE if input cost benchmarks change.",
    "RE asset valuation in NIRL IPO could disappoint if pricing comes weak (some RE IPPs trading at discount).",
    "PSU disinvestment timing risk — NIRL listing could slip from FY27 expectation.",
    "Coal-block ramp: Pachwara, Talabira ramp can have land-acquisition / community-issue delays.",
    "Currency / fuel: imported coal blending creates rupee exposure.",
    "Stranded thermal asset risk if RE pipeline grows faster — though limited near-term."
  ],
  valuation: [
    "Standalone (post-NIRL transfer) FY26E revenue ~₹13,000-14,000 Cr; PAT ~₹1,800-2,000 Cr.",
    "Mcap ~₹24,000 Cr → P/E ~12-13x; vs Coal India ~7-8x, NTPC ~17-18x, NHPC ~16-17x.",
    "NIRL (1,430 MW + future pipeline) standalone could be valued ₹15,000-20,000 Cr — implies 30-40% of current Mcap is RE.",
    "Sum-of-parts: post-demerger, residual NLC (mining + thermal) could trade at 8-10x at PSU multiples (₹15,000-18,000 Cr) + NIRL value (₹15,000-20,000 Cr) = ₹30,000-38,000 Cr potential.",
    "Directional view: undervalued vs SOTP if NIRL listing is priced reasonably."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — first quarter post-NIRL transfer; clean accounting visibility.",
    "NIRL DRHP filing — likely Q1-Q2 FY27.",
    "NIRL listing — H2 FY27 most likely; up to 25% OFS.",
    "Pachwara South full commissioning + revenue contribution in FY27.",
    "Critical-minerals block allocation (REE, lithium) wins.",
    "RE PPA wins — large utility-scale solar/wind tenders.",
    "Possible bonus / dividend / buyback — PSU dividend policy generally generous."
  ],
  mos: [
    "Among the better risk-reward in the batch — PSU floor + demerger upside.",
    "Best zone: current levels offer ~25-30% potential to SOTP target; downside cushion given regulated returns.",
    "For value/MoS-focused investor: this fits the lens; 3-year hold required for full value-unlock.",
    "Watch-out: PSU re-rating may have run; near-term upside more event-driven (NIRL listing) than earnings."
  ]
});

// ---------- 6. GMDC ----------
const gmdc = stockSection({
  name: "6. Gujarat Mineral Development Corporation Ltd (GMDC)",
  tag: "Sector: Lignite + Critical Minerals (Bauxite, REE) | Status: Rare-earth re-rating story (PSU)",
  facts: [
    ["Market Cap (Apr-26)", "~₹22,700 Cr (+128% in 1 yr)"],
    ["FY24 Lignite Output", "6.37 MT"],
    ["Revenue / PAT (latest)", "₹2,626 Cr / ₹989 Cr"],
    ["REE Tech", "BARC tech transfer for hard-rock ankeritic ore (Jan-26)"],
    ["REE MoU", "With NMDC (Mar-26) for end-to-end REE value chain in Gujarat"],
    ["Critical mineral assets", "Ambadungar (REE), bauxite (Kutch), manganese, multi-metal blocks"],
    ["Promoter", "Government of Gujarat (~74%)"]
  ],
  business: [
    "GMDC is a Gujarat-government-owned mining PSU. Three layers: (1) Lignite — second-largest lignite miner in India (Tadkeshwar, Mata-no-Madh, Bhavnagar, Rajpardi blocks) supplying to Gujarat power gencos and captive industry; (2) Bauxite — Kutch region operations; (3) Critical minerals & REE — Ambadungar block contains rare earth deposits (cerium, lanthanum group), now technology-enabled via BARC.",
    "Revenue is dominantly lignite + bauxite today (~95%); REE/critical minerals are FY28-30 optionality. The market re-rated GMDC 2-3x over 12-18 months on the strategic value of Ambadungar."
  ],
  tailwinds: [
    "REE strategic importance: India imports ~95% of REE; Ambadungar can supply 5-10% of demand. China REE export controls in 2024-25 catalysed Indian self-reliance push.",
    "National Critical Minerals Mission (₹16,300 Cr scheme over 7 yrs) launched 2025 — direct beneficiary segment.",
    "Auction of 24 critical-mineral blocks by Centre in 2025-26 with composite licences — GMDC participating.",
    "Lignite cash cow: stable EBITDA base funds REE / critical-mineral capex.",
    "EV battery / magnet demand: REE permanent magnets for EVs and wind turbines — secular driver."
  ],
  moat: [
    "Ambadungar block is among the highest-grade hard-rock REE deposits in India; strategic scarcity.",
    "BARC technology transfer (Jan-26) is exclusive — first commercial Indian processing tech for hard-rock ankeritic ore.",
    "Gujarat state-government ownership = priority access, faster clearances, captive customer base in state PSUs.",
    "NMDC partnership (Mar-26 MoU) gives technology + scale advantage.",
    "Honest caveat: REE economics globally are tough — China dominates processing, prices volatile. GMDC's edge is strategic Indian role, not global cost leadership."
  ],
  growth: [
    "Lignite volumes growing 5-8% annually; Mata-no-Madh + new blocks add capacity.",
    "REE pilot plant likely FY27-28; commercial production FY29-30.",
    "Bauxite + manganese demand from aluminium & steel chains.",
    "New critical-mineral blocks (graphite, vanadium, lithium being explored).",
    "Power business wind-down releases capital for mining capex."
  ],
  orderbook: [
    "Mining-business has long-term offtake / linkage; not order-book driven in classical sense.",
    "REE has pilot-scale capacity → commercial scale-up announcements would be sizeable revenue contributors but are 2-3 years out.",
    "Lignite contracts are state-level long-term."
  ],
  management: [
    "PSU board structure — government appointees; recent leadership has been visibly more strategic about REE (BARC engagement, NMDC MoU, presentations at VGRC Rajkot).",
    "Promises kept on lignite production growth; REE story still in early stage but on track.",
    "Gujarat-PSU governance is generally better than central PSUs — quicker clearances and policy support.",
    "Watch-out: capital allocation discipline — government PSU sometimes deploys cash sub-optimally; investors should track whether REE capex stays in commercial corridor (~₹1,500-2,000 Cr) vs. ballooning."
  ],
  risks: [
    "REE price volatility — neodymium / praseodymium prices have ranged 50-200% over 5 years; capex viability is sensitive.",
    "Project execution risk — REE processing is technically complex; first-of-kind hard-rock plant could see slippage.",
    "China response — Beijing has historically retaliated on REE pricing to undercut new entrants.",
    "Lignite phase-out risk in 2030s as RE penetrates further; legacy revenue base shrinks.",
    "PSU governance — sub-optimal capital allocation; minority shareholder protection limits.",
    "Stock has rallied 128% in 1 yr — valuation has expectations baked in."
  ],
  valuation: [
    "FY26E revenue ~₹2,800-3,000 Cr; PAT ~₹1,000-1,100 Cr (assuming lignite stays steady, REE not contributing yet).",
    "Mcap ₹22,700 Cr → P/E ~21-23x; vs Coal India ~7-8x, NMDC ~10-12x — GMDC trades at significant premium reflecting REE optionality.",
    "REE optionality: at peak production (10,000 tonnes/yr REO, ~$5,000/tonne avg) = ~$50mn revenue ≈ ₹400 Cr — moves the needle but only at full ramp in 2029-30.",
    "Directional view: optionality-driven valuation; pullbacks of 15-25% are good accumulation zones for long-term holders."
  ],
  catalysts: [
    "Q4 FY26 results (May-26).",
    "REE pilot-plant commissioning announcement (FY27).",
    "Critical-mineral block auction wins (FY26-27 ongoing).",
    "NMDC JV definitive agreement signing (post-MoU).",
    "Centre's REE off-take guarantee scheme (announced FY26 budget).",
    "Possible Gujarat govt OFS / disinvestment (overhang or catalyst depending on price)."
  ],
  mos: [
    "Margin of safety is moderate at current levels — lignite cash flow gives floor; REE is the optionality.",
    "Best zone for adding: 15-20% pullback creates a 17-19x P/E entry which is more reasonable for the optionality profile.",
    "Hold thesis: 3-5 year horizon for full REE story to play; need patience.",
    "Position-sizing: 2-3% of portfolio is appropriate for an optionality-heavy PSU like this."
  ]
});

// ---------- 7. GODAWARI POWER & ISPAT ----------
const godawari = stockSection({
  name: "7. Godawari Power & Ispat Ltd (GPIL)",
  tag: "Sector: Iron Ore Mining + Pellets + Steel | Status: Self-funded capex compounder",
  facts: [
    ["Market Cap (Apr-26)", "~₹14,000 Cr range"],
    ["FY26 Iron Ore Production", "27.49 lakh MT (record)"],
    ["FY26 Pellet Production", "28.56 lakh MT (capacity now 4.7 MT post Dec-25 expansion)"],
    ["Major capex announced", "₹1,600 Cr (CRM ₹900 Cr + BESS ₹700 Cr); ₹4,500-5,000 Cr greenfield steel optional"],
    ["FY27 capex guidance", "~₹2,000 Cr"],
    ["Revenue vision FY28 / FY30", "₹12,000-15,000 Cr / ₹25,000 Cr"],
    ["Mine doubling", "Ari Dongri capacity to 6 MT"]
  ],
  business: [
    "GPIL is a backward-integrated steel maker in Chhattisgarh: captive iron ore mine (Ari Dongri) → pellet plant → sponge iron → billets → finished steel (long products: TMT bars, wire rods). Energy is partly captive (~70 MW thermal, plus solar / BESS being added).",
    "The economics are driven by captive iron ore (mine cost ₹500-1,000/tonne vs market ₹6,000-8,000/tonne), creating an enormous cost advantage that flows to pellet and steel margins. Recent capex pivot adds Cold-Rolled Mill (CRM, value-added flat steel) + BESS + greenfield steel plant — moving from commodity to specialty + scale."
  ],
  tailwinds: [
    "Government infra capex / PMAY / PMGSY → steel demand growing 7-9% annually.",
    "Iron ore pricing volatility hurts non-integrated players; GPIL's captive ore is structural cost-advantage.",
    "Pellet pricing premium widens — DRI-grade pellets command premium over fines.",
    "BESS / RE: GPIL's BESS capex aligns with India's grid-storage requirement; revenue potential as IPP/merchant.",
    "Critical-minerals push: GPIL is exploring vanadium / titanium recoveries from ore tailings.",
    "Backward-integrated steel commands valuation premium vs. pure converters — Tata Steel, JSPL multiples."
  ],
  moat: [
    "Captive iron ore at Ari Dongri (mine extension to 6 MT) — landed cost dramatically below market.",
    "Vertical integration: ore → pellet → sponge → steel; each stage adds margin layer.",
    "Geographic concentration in Chhattisgarh with rail access to BSP, NMDC, SAIL — logistics advantage.",
    "First-generation promoter (Bajranglal Agrawal family) with disciplined capital allocation track record.",
    "Honest caveat: TMT / long products are commoditised; GPIL's edge is cost (captive ore) + scale, not brand."
  ],
  growth: [
    "Pellet capacity now 4.7 MT (post Dec-25 expansion) → drives volume growth in FY27.",
    "CRM (Cold Rolled Mill) ₹900 Cr capex → moves into flat steel value chain (auto, white goods, DC structures) with higher margins.",
    "BESS ₹700 Cr → adds RE-storage IPP revenue.",
    "Greenfield steel plant ₹4,500-5,000 Cr (post-EC) → 1-1.5 MT additional capacity by FY29.",
    "Mine expansion to 6 MT supplies the larger steel + pellet ecosystem.",
    "Vision: ₹25,000 Cr revenue by 2030 = 3x from FY26 (~₹6,000-7,000 Cr base)."
  ],
  orderbook: [
    "Steel / pellet are commodity-spot business — no formal order book.",
    "BESS likely to have PPA-style revenue post-commissioning.",
    "Mine production largely captive + spot iron ore sales."
  ],
  management: [
    "Bajranglal Agrawal family (Promoter Director Bajrang Lal Agrawal, MD Abhishek Agrawal) — disciplined, conservative.",
    "Promises kept: pellet capacity expansion delivered on time (Dec-25); Ari Dongri mine expansion in progress; debt has reduced sharply over FY22-26 (was net-debt heavy, now low/net cash).",
    "Capital allocation: track record of building self-funded capex without major equity dilution. Rare for Indian metals/mining.",
    "Communication: concall transcripts are clear, conservative on guidance, with explicit FY28 / FY30 revenue vision.",
    "Watch-out: greenfield steel plant capex cycle (FY27-29) is large; execution must hold."
  ],
  risks: [
    "Steel cycle exposure — FY26 saw global steel softness; another 12-18 months of pressure compresses margins.",
    "Iron ore export duty / royalty changes — Chhattisgarh govt royalty rate revisions can hit.",
    "Greenfield steel plant approvals (mining EC, env clearance) timeline could slip.",
    "BESS market — tariff discovery has compressed margins; new IPP entries may not deliver expected returns.",
    "Mine reserve life — ore body sustainability beyond FY30 needs continuous exploration.",
    "Carbon / ESG — DRI / sponge iron is carbon-intensive; carbon tax overhang in 2030s."
  ],
  valuation: [
    "FY26E revenue ~₹6,000-6,500 Cr; PAT ~₹1,000-1,200 Cr.",
    "Mcap ~₹14,000 Cr → P/E ~12-14x; vs JSPL ~12-15x, JSW Steel ~17-20x, Tata Steel ~18-20x.",
    "If FY28 revenue reaches ₹12,000-15,000 Cr (vision number) with 18% EBITDA margin → EBITDA ~₹2,200-2,700 Cr; at 8x EV/EBITDA → ₹17,000-22,000 Cr EV.",
    "Directional view: undervalued for the integrated profile + capex pipeline; cyclical entry timing matters."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — full-year output and margin clarity.",
    "Greenfield steel plant EC clearance announcement.",
    "CRM commissioning (FY27).",
    "BESS first project commissioning + IPP tariff disclosure.",
    "Steel cycle inflection — China stimulus or India steel price recovery.",
    "Mine reserve / extension announcements at Ari Dongri."
  ],
  mos: [
    "Strong margin of safety — captive ore + low debt + capex roadmap.",
    "Cyclical entry: pullback during steel weakness (which is now happening) is the right buy zone.",
    "Position-sizing: 3-5% portfolio fit; 3-year horizon for full vision-2030 value to play.",
    "Better risk-reward than commodity steel peers due to captive ore."
  ]
});

// ---------- 8. ELECTROSTEEL CASTINGS ----------
const electrosteel = stockSection({
  name: "8. Electrosteel Castings Ltd (ECL)",
  tag: "Sector: Ductile Iron Pipes (water infrastructure) | Status: JJM cycle play",
  facts: [
    ["Market Cap (Apr-26)", "~₹7,000 Cr range"],
    ["Q3 FY26 Revenue", "₹1,526 Cr (-16.1% YoY)"],
    ["9M FY26 Revenue", "₹4,602 Cr (-19.3% YoY)"],
    ["Q3 FY26 EBITDA Margin", "5.8% (depressed)"],
    ["Q3 FY26 Volume", "1.34 lakh tonnes DI + CI pipes"],
    ["JJM extension", "Through Dec-2028 with ₹8.7 lakh Cr outlay"],
    ["FY26 JJM allocation", "~₹17,000 Cr (revised); FY27 allocation ₹67,600 Cr"]
  ],
  business: [
    "ECL is one of India's largest manufacturers of ductile iron (DI) pipes — large-diameter pipes (100mm to 2000mm) used in municipal water supply, irrigation, and sewerage networks. Customers are largely state government water utilities, urban local bodies, and EPC contractors executing Jal Jeevan Mission (JJM), AMRUT 2.0, and Mission Bhagiratha-type schemes.",
    "Revenue is volume × DI pipe price; margins depend on iron ore + scrap input prices and government order flow."
  ],
  tailwinds: [
    "Jal Jeevan Mission extended to Dec-2028 with ₹8.7 lakh Cr outlay — direct multi-year demand backstop.",
    "AMRUT 2.0 (urban water) — additional ₹2.99 lakh Cr scheme.",
    "Mission Bhagiratha (Telangana), Bachat (Tamil Nadu), and other state water programmes.",
    "Replacement cycle: Indian water utilities have ~25-30% NRW (non-revenue water); pipe replacement runs for decades.",
    "Industrial water reuse / desalination — large-diameter DI pipe demand."
  ],
  moat: [
    "Among top 3 DI pipe makers in India (alongside Jindal Saw, Welspun Specialty); scale advantage in raw material sourcing.",
    "Captive iron-ore mine (in Bolpur, but mine reserves nearing depletion) historically gave cost edge.",
    "Established relationships with state water utilities and large EPC contractors (L&T, Megha Engineering, NCC) — preferred-supplier status.",
    "Large diameter (>1000mm) capability → fewer competitors; commands premium.",
    "Honest caveat: DI pipe is increasingly commoditised; new capacity from Jindal Saw, Welspun, Tata Metaliks, ESL Steel keeps margin pressure."
  ],
  growth: [
    "JJM extension to Dec-28 + ₹8.7 lakh Cr outlay → multi-year demand visibility for DI pipes (estimated 7-10 mn tonnes / 5 yrs industry demand).",
    "FY26 was weak (govt spending pause + state-elections + JJM mid-cycle review) — base resets low for FY27 recovery.",
    "FY27 union budget allocation of ₹67,600 Cr is sharp uptick → translates to direct DI pipe orders.",
    "Capacity addition / brownfield expansion — ECL has expansion plans in Khardah, Haldia.",
    "International orders — Vietnam subsidiary, Oman stake acquisition diversify geography."
  ],
  orderbook: [
    "Order book figure not publicly disclosed in detail (ECL discloses confirmed orders periodically).",
    "Volume soft in FY26 reflects govt spending pause; expectation is H2 FY27 reflation as JJM-2 phase ramps.",
    "Vietnam + Oman exposure adds international order book that's not JJM-dependent."
  ],
  management: [
    "Promoter family (Kejriwal Group, Calcutta) — long history in steel and DI pipes; not consistently shareholder-friendly historically (group company stresses).",
    "FY25 was excellent; FY26 has reverted to weakness — reflects cyclical govt order flow rather than execution issue.",
    "International expansion (Oman acquisition, Vietnam subsidiary) shows capital-allocation effort beyond domestic JJM.",
    "Communication: concalls held quarterly; transcripts available; management tone is cautiously optimistic on JJM-2.",
    "Watch-out: group entities (Electrosteel Steels was distressed before SAIL group took it) had historical concerns — ECL is the listed pipes business, distinct, but governance perception lags."
  ],
  risks: [
    "Govt-order concentration: 70%+ of revenue tied to JJM / AMRUT / state water schemes. Spending slowdown = direct hit.",
    "Iron ore + scrap input volatility — fixed-price DI tenders compressed by input swings.",
    "Competition: Jindal Saw, Welspun, Tata Metaliks all expanding capacity; pricing power weak.",
    "Captive mine reserve depletion in Bolpur — cost advantage erodes if forced to buy ore.",
    "JJM rural completion 60%+ already; growth tapers post-FY28; AMRUT urban + replacement is the next leg.",
    "Group governance perception drag."
  ],
  valuation: [
    "FY26E revenue ~₹6,500 Cr (down from ₹8,200 Cr FY25); PAT ~₹400-500 Cr.",
    "Mcap ~₹7,000 Cr → FY26 P/E ~14-17x. FY27E recovery to ~₹8,000-9,000 Cr revenue / ₹600-700 Cr PAT → forward P/E ~10-12x.",
    "Comparable: Jindal Saw ~12-14x, Welspun Specialty ~10-12x, Tata Metaliks ~25-30x.",
    "Directional view: undervalued for the multi-year demand backstop; near-term weakness creates entry."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — first signs of order pickup post-elections.",
    "Union Budget JJM allocation utilisation in FY27 H1.",
    "ECL FY27 Q1-Q2 volume growth — re-emergence of demand.",
    "Vietnam / Oman international project wins.",
    "Capacity announcement / commissioning at brownfield sites.",
    "Possible pipe-export tender wins (Africa, Middle East infrastructure)."
  ],
  mos: [
    "Strong MoS at current depressed levels — cyclical low + multi-year demand visibility.",
    "Best buy zone: any further dip on weak Q4 print (May-26) creates a 9-11x forward P/E entry.",
    "Position-sizing: 2-4% appropriate; 18-month horizon for cycle recovery.",
    "Risk: governance / group perception drag may keep multiple compressed even if earnings recover."
  ]
});

// ---------- 9. KOLTE PATIL ----------
const kolte = stockSection({
  name: "9. Kolte Patil Developers Ltd",
  tag: "Sector: Real Estate (Pune-led, Mumbai/Bengaluru) | Status: Mid-segment recovery candidate",
  facts: [
    ["Market Cap (Apr-26)", "~₹3,000 Cr range"],
    ["FY26 Sales / Bookings", "₹2,605 Cr (-3% YoY in 9M; +13% in Q4)"],
    ["FY26 Collections", "₹2,689 Cr"],
    ["Q1 FY26 Sales", "₹616 Cr (-13% YoY)"],
    ["Q2 FY26 Sales", "₹670 Cr (-13% YoY)"],
    ["9M FY26 Pre-Sales", "₹1,891 Cr"],
    ["Geographic mix", "~55% Pune, ~25% Mumbai, ~20% Bengaluru"]
  ],
  business: [
    "Kolte-Patil is a Pune-headquartered residential real estate developer focused on the mid-segment (₹50 lakh - ₹2 Cr ticket-size) with selective premium projects. Three geographies: Pune (flagship presence in Wakad, Hinjawadi, Tathawade, Wakad-Mahalunge); Mumbai (MMR — Vikhroli, Thane); and Bengaluru (Hennur, Sarjapur, Devanahalli).",
    "Revenue model: launches → sales (pre-sales) → collections (over 24-36 month construction) → revenue recognition (POCM or completion). Sales (pre-sales) is the leading indicator; revenue / PAT lag by 2-3 years."
  ],
  tailwinds: [
    "Pune residential cycle: continues to be one of the most resilient micro-markets in India; IT/services growth + good infrastructure (metro, ring-road).",
    "Mid-segment recovery: post-pandemic premiumisation cycle is now extending to mid-tier (₹70L-₹1.5Cr).",
    "Affordability cycle: home loan rates have moderated; HDFC merger digestion phase done.",
    "RERA + Insolvency code regulatory clean-up favours organised developers.",
    "MMRDA / PCMC / PMRDA infrastructure rollouts opening new corridors."
  ],
  moat: [
    "Pune brand strength — among top-3 developers locally; 30+ years of presence; local-government / land-bank relationships.",
    "Capital-light JV / DM (development management) model in Mumbai/Bengaluru → ROCE preserved during expansion.",
    "Land-bank in select Pune micro-markets (Wakad, Mahalunge) at lower cost basis.",
    "Sales-engine reach + brand recall makes inventory sell-through faster than peers.",
    "Honest caveat: not a luxury / branded play (vs DLF, Macrotech, Prestige); mid-segment is a competitive bracket — Godrej, Brigade, Sobha, Mahindra Lifespaces all compete."
  ],
  growth: [
    "FY26 was a transition year (-3% in 9M); Q4 inflection (+13%) suggests cycle recovery starting.",
    "New launch pipeline of ₹6,000-8,000 Cr GDV (development management + joint development) over FY27-28 — tailwind for sales.",
    "Bengaluru exposure ramp — Sarjapur, Devanahalli markets expanding.",
    "Mumbai joint-development model produces high-IRR contributions without balance-sheet stretch.",
    "Annuity-style mall / commercial — small but adds visibility."
  ],
  orderbook: [
    "Real estate doesn't have an order book per se — but 'completed inventory + WIP launched + un-launched land bank' is the equivalent.",
    "Pre-sales of ₹2,605 Cr in FY26 → equivalent revenue in FY28-29 (revenue recognition lag).",
    "Land bank visibility ~5-7 years of launches.",
    "Mumbai joint-development pipeline gives FY27-28 cushion."
  ],
  management: [
    "Rajesh Patil (Chairman), Naresh Patil (Managing Director) — first-generation; conservative, low-leverage philosophy.",
    "Promises kept: post-pandemic, the company restructured to capital-light model in MMR/Bengaluru — execution credible.",
    "Debt managed prudently — net debt-to-equity has stayed sub-0.3x; rare for mid-cap RE.",
    "Watch-out: management has been less aggressive on launches in FY26 — explains weak pre-sales; Q4 pickup suggests recalibration.",
    "Communication: investor presentations are detailed; analyst meets quarterly; no major governance flags."
  ],
  risks: [
    "Pune slowdown — if IT/services hiring cools, Pune residential cycle bends; KP heavily exposed.",
    "Approval / RERA delays in Mumbai joint developments — cycle stretch.",
    "Input cost inflation (cement, steel, labour) erodes margins on legacy projects.",
    "Interest rate cycle — pre-sales sensitive to home loan rate moves.",
    "Smaller scale vs. national players (DLF, Macrotech, Godrej, Prestige) → multiple stays compressed.",
    "Mid-segment competition intensifies as larger players enter."
  ],
  valuation: [
    "FY26E revenue (recognition basis) ~₹1,500-1,800 Cr; PAT ~₹150-200 Cr.",
    "Mcap ~₹3,000 Cr → FY26 P/E ~15-20x; vs Brigade ~25-30x, Sobha ~30-35x, Macrotech ~30x.",
    "P/Sales (revenue) ~1.2-1.4x is at lower end of listed RE peers.",
    "GDV-based valuation: FY27 launch pipeline ₹6,000-8,000 Cr GDV → embedded NPV ₹4,000-5,000 Cr at 60-70% sell-through and 18-20% margin.",
    "Directional view: cheap on relative basis vs. peers; cycle inflection (Q4 +13%) is the trigger."
  ],
  catalysts: [
    "Q4 FY26 + FY26 results (May-26) — confirm Q4 inflection.",
    "Q1 FY27 sales (Jul-26) — first full quarter of 'new normal' demand recovery.",
    "New launches in Pune flagship markets (Mahalunge / Wakad) — quarterly cadence.",
    "RBI rate-cut cycle — affordability boost.",
    "Mumbai redevelopment project commencements.",
    "Possible promoter ownership move / institutional acquisition rumours (sector consolidation theme)."
  ],
  mos: [
    "Reasonable MoS — cycle bottom + cheap relative valuation + solid balance sheet.",
    "Best zone: current levels offer 25-30% upside on cycle recovery + valuation re-rating.",
    "Watch-out: smaller scale vs. peers may keep multiple capped at 18-22x — set price-target accordingly.",
    "Position-sizing: 2-3% portfolio fit; 24-month cycle horizon."
  ]
});

// ---------- 10. GARWARE HI-TECH FILMS ----------
const garware = stockSection({
  name: "10. Garware Hi-Tech Films Ltd",
  tag: "Sector: Specialty Films (PPF, Sun Control, BOPET) | Status: Premium-segment compounder, near-term blip",
  facts: [
    ["Market Cap (Apr-26)", "~₹10,500 Cr range"],
    ["FY25 Revenue / PAT", "₹2,109 Cr / ₹331 Cr (+26% / +63%)"],
    ["Q2 FY26 Revenue", "₹569.69 Cr (-8.2% YoY)"],
    ["Q2 FY26 EBITDA Margin", "23.4% (down from 25.6%)"],
    ["Q2 FY26 PAT", "₹91.20 Cr (-12.5% YoY)"],
    ["New Waluj PPF line", "₹125 Cr capex; 300 LSF capacity; commercial production from Sep-25"],
    ["GAS network", "250+ Garware Application Studios"]
  ],
  business: [
    "Garware Hi-Tech Films makes specialty plastic films across three primary categories: (1) Paint Protection Films (PPF) — clear urethane films for car body protection, premium B2C product retailed via Garware Application Studios; (2) Sun Control Films — for automobiles and architecture; (3) BOPET (Polyester Films) for packaging, industrial and high-margin specialty applications.",
    "Premiumisation pivot: from a commodity BOPET maker, the company has structurally moved toward PPF (high-margin B2C) and specialty BOPET (high-margin B2B). Revenue mix shift drives margin expansion."
  ],
  tailwinds: [
    "Premium / luxury car penetration in India: PPF is fitted on premium cars (₹40 lakh+); Mercedes, BMW, Audi, Porsche, Jaguar volume growth = direct PPF demand.",
    "PPF retail awareness rising — DIY + workshop-led adoption; Garware GAS network is a moat.",
    "Sun Control Films: automotive (legalised tinting), architectural retrofit market growing.",
    "BOPET specialty: high-barrier, metallised, anti-counterfeit films for pharma, food packaging.",
    "Export market — PPF is global; Garware exports 35-40% of PPF revenue."
  ],
  moat: [
    "Brand: Garware PPF is among the top 3-4 globally (alongside XPEL, 3M, SunTek); only Indian manufacturer at scale.",
    "GAS network of 250+ certified studios — installer ecosystem is a moat (PPF needs trained application).",
    "Vertically integrated: own raw material (BOPET) + film coating + adhesive technology.",
    "R&D-led product launches (Coloured PPF, Headlight glass protection — industry firsts).",
    "Bajaj Finance partnership for retail finance — innovative go-to-market.",
    "Honest caveat: XPEL and 3M (global brands) have stronger US/EU brand recognition; Garware competes on quality + price."
  ],
  growth: [
    "Waluj PPF line (Sep-25 commissioning): 300 LSF additional capacity — drives FY27 PPF revenue.",
    "GAS network expansion to 400+ studios over 2 years — distribution multiplier.",
    "Coloured PPF + Headlight glass protection — new revenue streams in FY27-28.",
    "Sun Control Film export ramp — Latin America, Middle East.",
    "Specialty BOPET margin shift continues."
  ],
  orderbook: [
    "B2C PPF retail (no order book — channel-driven).",
    "Industrial / B2B PPF + specialty BOPET have annual contracts; visibility ~6-12 months.",
    "Export contracts for PPF — multi-year MOUs with select global distributors."
  ],
  management: [
    "Promoter family (Garware) — split between Garware Polyester (parent / commodity) and Garware Hi-Tech (premium); board governance has improved post-demerger.",
    "Promises kept: FY25 revenue guidance of ~25% growth — delivered 26%; PPF capacity expansion timeline (Waluj Sep-25) on schedule.",
    "Capital allocation: ₹125 Cr Waluj capex internally funded; debt low; dividend policy moderate.",
    "Watch-out: Q2 FY26 dip suggests inventory cycle / channel destocking — will be tested in Q3-Q4. Communication has been clear about the temporary nature.",
    "Investor relations professional; quarterly investor meets, detailed PPT decks."
  ],
  risks: [
    "Premium auto cycle slowdown — luxury car volumes in India can swing 10-15% on macro.",
    "Global PPF competition (XPEL, 3M, SunTek) intensifying; price pressure.",
    "Currency: 35-40% PPF exports → INR appreciation hits realisation.",
    "Commodity BOPET segment commoditised — capacity glut depresses margins.",
    "Channel inventory cycles can cause Q-on-Q volatility (current Q2 dip example).",
    "GAS franchisee execution / quality control as network scales."
  ],
  valuation: [
    "FY26E revenue ~₹2,000-2,100 Cr (flat-to-marginal); PAT ~₹280-310 Cr (margin compression).",
    "FY27E revenue ~₹2,500-2,800 Cr (Waluj + GAS expansion); PAT ~₹400-450 Cr.",
    "Mcap ~₹10,500 Cr → FY26 P/E ~33-35x; FY27 P/E ~24-27x.",
    "Comparable: Jindal Poly Films ~12-15x (commodity), Polyplex ~15-18x; XPEL (US listed) ~35-40x.",
    "Directional view: premium for premiumisation story; near-term weakness creates tactical entry."
  ],
  catalysts: [
    "Q3 + Q4 FY26 results — confirm Q2 was a blip vs. structural slowdown.",
    "Waluj PPF line ramp — full quarterly contribution from Q4 FY26 / Q1 FY27.",
    "New product launch traction (Coloured PPF, headlight protection).",
    "GAS network expansion milestones.",
    "Possible export market wins / large fleet deal.",
    "Premium auto sales recovery."
  ],
  mos: [
    "MoS has improved post-Q2 dip; near-term entry zone better than it has been in 12 months.",
    "Best buy zone: any pullback to FY27 P/E of 20-22x is attractive.",
    "Position-sizing: 3-4% appropriate; 3-year horizon for full PPF premiumisation.",
    "Watch-out: any miss on Q3 FY26 (channel destocking deeper) creates further entry; if miss is structural, multiple compresses to 18-20x."
  ]
});

// ---------- 11. HALDYN GLASS ----------
const haldyn = stockSection({
  name: "11. Haldyn Glass Ltd",
  tag: "Sector: Glass Containers (F&B, Liquor, Pharma) | Status: Niche micro-cap with capacity expansion",
  facts: [
    ["Market Cap (Apr-26)", "~₹700 Cr range (verify on Screener)"],
    ["Q3 FY26 Performance", "Revenue growth + margin expansion noted; turnaround signal"],
    ["Exceptional expense Q3", "₹183.12 lakh"],
    ["Plants", "Gavasad (Gujarat); flint + amber glass furnaces"],
    ["Capacity expansion plan", "Decorative glass plant proposed at Gavasad"],
    ["Tech upgrade", "Conversion of one IS Machine from Double Gob to Triple Gob"],
    ["Recent capex", "Furnace relining + modernisation (FY24 done)"]
  ],
  business: [
    "Haldyn Glass is a niche manufacturer of soda-lime flint (clear) and amber glass containers — bottles and jars used by F&B (sauce, condiments), liquor (whisky, beer, premium spirits), pharma (medicine bottles), and beverage (juice, milkshake) customers. Plants in Gavasad, Gujarat.",
    "Revenue is volume × bottle realization × mix. Mid-cap in size, with concentration in Western India market. Premium decorative glass (for premium spirits) is a growing higher-margin segment."
  ],
  tailwinds: [
    "Premium spirits / craft liquor boom in India — premium whisky, gin, vodka, craft beer all use specialty bottles.",
    "Glass packaging revival vs plastic — sustainability mandate from large F&B brands (Coca-Cola, ITC, Nestle).",
    "Pharma packaging — Type I/II/III glass demand grows with formulation exports.",
    "Recyclability + ESG — Indian govt and large MNCs pushing toward returnable / recyclable glass over PET.",
    "Premium decorative bottles — high-margin niche, limited domestic competition."
  ],
  moat: [
    "Western India geographic concentration — proximity to liquor + F&B clusters in Gujarat / Maharashtra.",
    "Long-standing relationships with anchor customers (UB Group, Pernod, Nestle, ITC bottle suppliers).",
    "Niche scale — too small for global majors (Owens-Illinois, Ardagh) to address; competitive vs. domestic peers (HSIL Glass, Hindustan National Glass).",
    "Honest caveat: glass containers is commodity-ish; pricing power is moderate; scale advantage of Hindustan National Glass and HSIL is structural disadvantage."
  ],
  growth: [
    "Decorative glass plant at Gavasad (proposed) — moves into white-glass / premium bottles.",
    "Triple Gob IS Machine conversion — productivity uplift, ~20-30% volume per machine.",
    "Furnace relining (done FY24) — full benefit visible FY25 onward.",
    "Premium liquor segment penetration — gin, whisky, vodka brands launching every quarter.",
    "Pharma packaging expansion — Type II + Type III bottles."
  ],
  orderbook: [
    "Glass packaging is annual / quarterly contract-based; not a formal order book.",
    "Anchor customers provide multi-year volume visibility.",
    "Spot orders from emerging brands (gin, craft spirits) provide upside."
  ],
  management: [
    "Promoter family (Damani / Mehta as historical association) — long-term, conservative.",
    "Promises kept: Q3 FY26 turnaround signals operational improvement post-furnace relining.",
    "Capital allocation: incremental capex announcements (Triple Gob, decorative plant) are scaled to balance sheet capacity.",
    "Communication: limited public visibility — small cap; investor relations could improve.",
    "Watch-out: small-cap → low free float; promoter holding stable; management transition risk if generational shift happens."
  ],
  risks: [
    "Energy cost (gas) is ~30% of glass mfg cost — gas price spikes hit margin sharply.",
    "Customer concentration: top 3-4 customers can be 50%+ revenue.",
    "Logistics — bottles are heavy + fragile; freight cost is meaningful.",
    "Substitution: PET / aluminium for some F&B applications.",
    "Larger peer aggression: Hindustan National Glass / HSIL can squeeze pricing.",
    "Small cap liquidity — exit / entry at scale is tough."
  ],
  valuation: [
    "FY26E revenue ~₹350-400 Cr; PAT ~₹35-50 Cr (post turnaround).",
    "Mcap ~₹700 Cr → FY26 P/E ~14-20x.",
    "Comparable: HSIL ~15-18x, Borosil ~25-30x (premium). Haldyn at lower end of niche peer set.",
    "Directional view: small-cap value play with operational turnaround optionality."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — confirms Q3 turnaround.",
    "Decorative glass plant capex announcement / commissioning timeline.",
    "Triple Gob IS Machine commissioning.",
    "New customer wins (premium spirits / gin / craft).",
    "Possible promoter / family disposal (overhang or catalyst).",
    "Industry consolidation (HNG resolution / acquisition narrative)."
  ],
  mos: [
    "MoS exists at current levels but liquidity-constrained.",
    "Best zone: small-cap entry only suitable for patient capital.",
    "Position-sizing: 0.5-1% portfolio fit; not a core holding.",
    "3-4 year horizon to play decorative glass + premium liquor cycle."
  ]
});

// ---------- 12. CARE RATINGS ----------
const care = stockSection({
  name: "12. CARE Ratings Ltd",
  tag: "Sector: Credit Rating Agency (oligopoly) | Status: Cyclical leverage to credit cycle",
  facts: [
    ["Market Cap (Apr-26)", "~₹5,000 Cr range"],
    ["9M FY26 Standalone Revenue", "₹280.15 Cr (+14% YoY)"],
    ["9M FY26 Consol Revenue", "₹342.40 Cr (+17% YoY)"],
    ["Ratings segment", "89% of revenue, +17% YoY"],
    ["EBITDA margin", "~46% (standalone)"],
    ["Bank credit growth (Dec-25)", "+14.5% YoY (vs +11.2% prior)"],
    ["Corporate bond issuance", "-11% YoY in Q3"],
    ["CP issuance 9MFY26", "+10.3% YoY"]
  ],
  business: [
    "CARE Ratings is India's third-largest credit rating agency (after CRISIL and ICRA). The company rates corporate debt instruments (bonds, CPs, bank loans), structured finance products, and has subsidiaries in advisory + analytics (CARE Risk Solutions, CARE Advisory Research).",
    "Revenue is fee-based — paid by issuers for ratings of their debt instruments. Recurring nature: every rated security needs annual surveillance fees → annuity revenue. Cyclical: tied to credit / capex / bond issuance cycles."
  ],
  tailwinds: [
    "Bank credit growth at 14.5% (Dec-25) → ratings demand follows.",
    "Corporate bond market deepening — RBI / SEBI pushing Tier-1 to bond market.",
    "InvITs / REITs structured products → new ratings business.",
    "Mutual fund debt schemes → ongoing surveillance revenue.",
    "ESG ratings — emerging product line (CARE Edge ESG) for FY27-28 growth.",
    "Listed bond increase from PSUs / banks — pipeline of issuances ahead."
  ],
  moat: [
    "Oligopoly: CRISIL + ICRA + CARE = ~85% of rating market. Regulatory entry barriers (SEBI registration, capital, track record).",
    "Recurring surveillance fees: annual revenue per rated security regardless of new issuance.",
    "Brand + analytical reputation — issuers prefer top-3 agencies for liquidity reasons.",
    "Network effects: investors mandate top-rated agencies' ratings for investment policies.",
    "Honest caveat: CARE is #3 — discount to CRISIL on pricing power; ICRA is closer competitor."
  ],
  growth: [
    "Bank credit at +14.5% — ratings volume / surveillance grows commensurately.",
    "Bond market deepening — incremental issuances drive new fees.",
    "International / advisory: CARE has set up overseas (Mauritius) + advisory services with multi-year revenue scale-up.",
    "ESG ratings — early but high-margin segment.",
    "Risk Solutions subsidiary — bank stress-test SaaS-like revenue stream."
  ],
  orderbook: [
    "Surveillance fees on existing rated portfolio = recurring revenue (similar to AMC AUM-fee-style).",
    "New issuance pipeline tracked monthly; visibility 6-12 months ahead based on bank credit + bond issuance plans.",
    "Advisory subsidiary has project-based mandates — small order book."
  ],
  management: [
    "Mehul Pandya (MD-CEO) — appointed 2022; rating-industry veteran from CARE itself.",
    "Promises kept: post-2018 debt-default crisis (IL&FS, DHFL), CARE upgraded its analytical processes; FY24-26 has restored revenue and margins.",
    "Capital allocation: high dividend payout (60-70%); debt-free; conservative balance sheet.",
    "Investor communication: quarterly concalls; transparent on segment-wise pricing; recent management has been candid about competitive dynamics.",
    "Watch-out: regulatory scrutiny on rating agencies post-2018 episodes; SEBI moves can affect business models."
  ],
  risks: [
    "Regulatory: SEBI can change pricing / rotation rules → revenue compression.",
    "Cyclical: corporate bond / bank credit cycles affect new-issuance fees.",
    "Competitive: CRISIL has scale + brand; ICRA has Moody's affiliation; CARE is #3 with narrower moat.",
    "Reputation risk: any major rating misjudgement (similar to IL&FS) hits multiple.",
    "International / advisory subsidiary loss-making — drag on consolidated.",
    "Pricing pressure: issuers negotiating fees in tough market years."
  ],
  valuation: [
    "FY26E standalone revenue ~₹400-420 Cr; PAT ~₹160-180 Cr.",
    "Mcap ~₹5,000 Cr → standalone P/E ~28-30x; consol slightly higher.",
    "Comparable: CRISIL ~50-55x (premium), ICRA ~30-35x.",
    "Directional view: trades between ICRA and CRISIL multiples; reasonable for a #3 player with recovery momentum."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — full-year revenue growth confirmation.",
    "FY27 bank credit + bond issuance momentum.",
    "ESG ratings revenue ramp.",
    "International expansion announcements.",
    "Possible buyback / special dividend (cash-rich balance sheet).",
    "RBI policy events affecting credit cycle."
  ],
  mos: [
    "Moderate MoS — current valuation is fair; no big margin of safety in absolute terms.",
    "Best entry: 10-15% pullback creates ~24-25x P/E entry, attractive for the oligopoly profile.",
    "Position-sizing: 2-3% portfolio fit; long-term hold for credit cycle compounding.",
    "Defensive characteristics: high dividend yield + low debt + recurring revenue."
  ]
});

// ---------- 13. MONARCH NETWORTH ----------
const monarch = stockSection({
  name: "13. Monarch Networth Capital Ltd",
  tag: "Sector: Broking + Investment Banking + AIF | Status: Capital-markets cycle late stage",
  facts: [
    ["Market Cap (Apr-26)", "~₹3,500 Cr range"],
    ["Q2 FY26 Net profit", "₹44.97 Cr (+2.25% YoY, -0.62% QoQ)"],
    ["Q2 FY26 Revenue", "₹83.12 Cr (-15.17% QoQ, -20.11% YoY)"],
    ["Q2 PAT margin", "54.10%"],
    ["Q2 Operating margin", "76.72%"],
    ["Q3 FY26 Revenue / PAT", "₹91.95 Cr / ₹45.41 Cr"],
    ["Verticals", "Retail Broking, Institutional, IB, AIF, PMS"]
  ],
  business: [
    "Monarch Networth is a mid-tier financial services firm with seven verticals: retail broking (derivatives, equity, commodities), institutional equities, investment banking (IPO + advisory), wealth management / PMS, AIF (alternative investment funds), distribution, and research.",
    "Revenue mix: brokerage fees (volume / market activity sensitive), investment banking fees (IPO + advisory cyclical), AIF / PMS (recurring management fees + performance fees), and distribution commissions."
  ],
  tailwinds: [
    "Retail demat accounts: 18 cr+ accounts (FY26); India's retail equity participation deepening.",
    "F&O regulatory tightening (SEBI weekly expiry restriction Oct-24) — short-term hit but discipline benefits in long-run.",
    "AIF + PMS growth: HNI-targeted products growing 25-30% AUM annually.",
    "IPO pipeline: SEBI has 50+ DRHPs in queue; IB fees beneficiary.",
    "Wealth management consolidation: mid-tier players consolidating; Monarch positioned for tuck-in growth.",
    "Premiumisation: shift from broking to advisory + AIF margins."
  ],
  moat: [
    "Diversified revenue base — broking + IB + AIF + PMS reduces single-cycle exposure.",
    "Tier-2 city presence; lower customer-acquisition cost than Tier-1 metros.",
    "Long client relationships — lower churn.",
    "AIF / PMS recurring revenue — sticky.",
    "Honest caveat: not a top-5 broker by volume; competes with Zerodha, Groww, Upstox (discount), and Motilal Oswal, ICICI Securities, Kotak Securities (full-service). Edge is mid-tier specialisation, not scale."
  ],
  growth: [
    "AIF AUM scale-up — high-margin segment; new fund launches.",
    "IB revenue from IPO pipeline (FY27 strong queue).",
    "Geographic expansion + branch network.",
    "Cross-sell to existing client base (broking → AIF → PMS).",
    "Possible inorganic acquisition opportunities in fragmented mid-tier broking."
  ],
  orderbook: [
    "Broking is volume / market-driven; no order book.",
    "IB has signed mandate book; visibility 3-6 months.",
    "AIF AUM is recurring; quarterly disclosures.",
    "PMS / wealth: AUM-fee-based recurring revenue."
  ],
  management: [
    "Promoter family + professional management; long-tenured team.",
    "Promises kept: PAT margins held at 50%+ even in revenue-soft Q2 → cost discipline good.",
    "Capital allocation: dividend policy moderate; no major dilutions.",
    "Watch-out: Q2 FY26 revenue -20% YoY is a steep drop — capital-markets activity weak; if SEBI F&O rules + market correction continue, revenue pressure extends.",
    "Communication: limited investor visibility for mid-cap; concall transparency moderate."
  ],
  risks: [
    "Capital-markets cycle: volume-based broking revenue volatile; bear market or low-volatility period compresses revenue.",
    "Regulatory: SEBI F&O restrictions, brokerage caps, surveillance margins — incremental drag.",
    "Competition: discount brokers (Zerodha, Groww) eat retail broking; full-service peers (Kotak, ICICI Sec) dominate HNI.",
    "AIF / PMS performance: if scheme performance lags, redemptions hit AUM.",
    "Talent retention: senior advisor / RM departures hit revenue.",
    "Single-cycle dependency: bull market upside / bear market downside disproportionate."
  ],
  valuation: [
    "FY26E revenue ~₹400-450 Cr; PAT ~₹180-200 Cr (assuming margin holds at 45%+).",
    "Mcap ~₹3,500 Cr → FY26 P/E ~17-19x.",
    "Comparable: Motilal Oswal ~15-18x, Geojit ~12-14x, Anand Rathi Wealth ~30-35x (premium for AIF/PMS skew), 360 ONE ~30-35x (wealth pure-play).",
    "Directional view: fairly valued for the cycle; further compression possible if FY26 H2 revenue stays soft."
  ],
  catalysts: [
    "Q4 FY26 results (May-26) — confirms cycle bottom or extends weakness.",
    "Capital-market activity recovery — IPO pipeline + secondary market revival.",
    "AIF AUM milestone announcements.",
    "Possible regulatory clarity on F&O rules.",
    "Inorganic acquisition / merger announcement.",
    "Promoter pledge / sale (if any, would be overhang)."
  ],
  mos: [
    "MoS thin given cycle exposure and regulatory overhang; not a margin-of-safety pick.",
    "Best zone: 15-20% pullback if revenue stays weak — that's a 14-15x P/E entry.",
    "Position-sizing: 1-2% portfolio fit; treat as a cyclical not compounder.",
    "Watch-out: capital-markets cycles can extend; current weakness might persist 4-6 quarters."
  ]
});

// ---------- Closing thoughts ----------
const closing = [
  H1("Batch 1 — Closing Synthesis"),
  H2("Top 3 SME Multibagger Bets (highest reward-to-risk for 6-18 mo lens)"),
  Bul("Knowledge Marine (KMEW) — tonnage tax + shipbuilding entry + ₹1,500 Cr OB; valuation reasonable vs PSU shipbuilders. Thesis: niche scale-up with structural cost advantage."),
  Bul("Rajesh Power Services — ₹3,326 Cr OB on ₹1,628 Cr revenue; Gujarat T&D pure-play in RDSS + Khavda evacuation cycle. Thesis: order-book conversion with controlled valuation."),
  Bul("Sathlokhar Synergys — most aggressive growth (Q3 +400%) but valuation + SME platform risk; speculative bet that requires migration to mainboard for de-risking."),
  H2("Top 3 Main-Board Conviction (better margin of safety)"),
  Bul("Godawari Power & Ispat — captive iron ore + capex roadmap to ₹25,000 Cr revenue by 2030; current valuation cyclical bottom; 3-year compounder."),
  Bul("Electrosteel Castings — JJM extension to Dec-28 with ₹8.7L Cr outlay; FY26 weakness creates entry; H2 FY27 inflexion likely."),
  Bul("NLC India — PSU value-unlock via NIRL listing in FY27; SOTP suggests 30% upside with limited downside."),
  H2("Avoid / Wait list"),
  Bul("Oriana Power — fantastic execution but rich valuation; needs 4 more quarters of beats; size positions cautiously."),
  Bul("Monarch Networth — capital-markets cycle late; revenue softness can extend; better entry zones likely."),
  Bul("Haldyn Glass — valuation OK but liquidity-constrained; only for patient micro-cap allocations."),
  H2("Cycle / Catalyst Calendar (next 6-18 months)"),
  Bul("May-26: Q4 FY26 results across all 13 names — first major data-point batch."),
  Bul("Jul-26: Q1 FY27 results — early read on FY27 momentum."),
  Bul("FY27: NIRL (NLC Renewables) listing — biggest single-event catalyst in batch."),
  Bul("FY27 Union Budget: JJM-2 outlay confirmation → directly moves Electrosteel."),
  Bul("FY27 H2: Sathlokhar potential mainboard migration; Godawari greenfield steel EC clearance."),
  H2("Risk Concentration in this Batch"),
  Bul("4/13 names are SME-platform listed → low free-float, governance / disclosure risk."),
  Bul("3/13 are direct govt-spending dependent (NLC, GMDC, Electrosteel) — fiscal cycle risk."),
  Bul("2/13 are capital-markets cycle exposed (CARE, Monarch) — volatility risk."),
  Bul("Use position-sizing discipline; limit total batch exposure to 30-35% of portfolio max."),
  P("End of Batch 1. Batches 2 (Defence/Engineering/Auto), 3 (Specialty Chem/Pharma), and 4 (EMS/Electronics/Tech) will follow.")
];

// ====================================================================
//                         BUILD DOCUMENT
// ====================================================================
const doc = new Document({
  creator: "Claude (Cowork Mode) for Rajat",
  title: "Equity Watchlist Deep-Dive — Batch 1",
  description: "Detailed deep-dive on 13 stocks: Power, Mining, Realty & Others",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } }, // 11pt
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
          children: [new TextRun({ text: "Equity Watchlist — Batch 1: Power/Mining/Realty/Others", italics: true, size: 18, color: "808080" })]
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
      ...oriana,
      ...rajesh,
      ...kmew,
      ...sathlokhar,
      ...nlc,
      ...gmdc,
      ...godawari,
      ...electrosteel,
      ...kolte,
      ...garware,
      ...haldyn,
      ...care,
      ...monarch,
      ...closing
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(__dirname + "/Equity_Watchlist_Batch1_PowerMiningRealtyOthers.docx", buf);
  console.log("Wrote Equity_Watchlist_Batch1_PowerMiningRealtyOthers.docx (size:", buf.length, "bytes)");
});
