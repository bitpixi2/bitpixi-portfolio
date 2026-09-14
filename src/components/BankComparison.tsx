import { useState } from "react";

const bankData = [
  {
    name: "Bendigo Bank",
    jointAccount: 2, regionalBranches: 5, businessAccount: 3, appQuality: 3,
    homeLoanSat: 87.7, migrantSupport: 1, lgbtqInclusion: 3, communityReinvest: 5,
    tags: ["AWEI Gold 2025", "500+ Community Banks", "$416M reinvested", "87.7% home loan satisfaction"],
  },
  {
    name: "CBA",
    jointAccount: 5, regionalBranches: 5, businessAccount: 5, appQuality: 5,
    homeLoanSat: 76.1, migrantSupport: 5, lgbtqInclusion: 4, communityReinvest: 2,
    tags: ["Pre-arrival from overseas", "RPM-listed for joint accounts", "15.9M customers", "Largest branch network"],
  },
  {
    name: "Westpac",
    jointAccount: 5, regionalBranches: 4, businessAccount: 4, appQuality: 4,
    homeLoanSat: 68.7, migrantSupport: 5, lgbtqInclusion: 4, communityReinvest: 2,
    tags: ["RPM-listed for joint accounts", "Pre-arrival (needs AU address)", "Canstar Outstanding Value", "Former AWEI Employer of Year"],
  },
  {
    name: "NAB",
    jointAccount: 2, regionalBranches: 4, businessAccount: 4, appQuality: 4,
    homeLoanSat: 71.8, migrantSupport: 4, lgbtqInclusion: 5, communityReinvest: 2,
    tags: ["AWEI Platinum 2024+2025", "$0 fees permanently", "In-person only after arrival", "400+ branches"],
  },
  {
    name: "ANZ",
    jointAccount: 4, regionalBranches: 3, businessAccount: 4, appQuality: 4,
    homeLoanSat: 70.3, migrantSupport: 4, lgbtqInclusion: 4, communityReinvest: 2,
    tags: ["RPM-listed for joint accounts", "Moving to Australia program", "Mardi Gras sponsor", "ANZ Plus app"],
  },
  {
    name: "Bank Australia",
    jointAccount: 2, regionalBranches: 2, businessAccount: 2, appQuality: 3,
    homeLoanSat: 78.0, migrantSupport: 1, lgbtqInclusion: 3, communityReinvest: 5,
    tags: ["Customer-owned", "Ethical charter", "No fossil fuel lending", "78% home loan satisfaction"],
  },
];

type BankKey = keyof typeof bankData[0];

const categories: { key: BankKey; label: string; short: string; desc: string; isPct?: boolean }[] = [
  { key: "jointAccount", label: "Joint Account\n(Temp Visa)", short: "Joint Account (Temp Visa)", desc: "Willingness to open joint accounts for temporary visa holders, per RPM Lawyers" },
  { key: "regionalBranches", label: "Regional\nBranches", short: "Regional Branches", desc: "Branch presence in rural and regional Australia" },
  { key: "businessAccount", label: "Business\nAccount", short: "Business Account", desc: "Ease of opening a business account as a new arrival" },
  { key: "appQuality", label: "App\nQuality", short: "App Quality", desc: "Mobile banking app simplicity and usability" },
  { key: "homeLoanSat", label: "Home Loan\nSatisfaction", short: "Home Loan Satisfaction", desc: "Roy Morgan customer satisfaction % (March 2024)", isPct: true },
  { key: "migrantSupport", label: "Migrant\nSupport", short: "Migrant Support", desc: "Dedicated programs, pre-arrival accounts, migration teams" },
  { key: "lgbtqInclusion", label: "LGBTQ+\nInclusion", short: "LGBTQ+ Inclusion", desc: "AWEI tier status and history of LGBTQ+ inclusion initiatives" },
  { key: "communityReinvest", label: "Community\nReinvestment", short: "Community Reinvestment", desc: "Profits reinvested into local communities" },
];

const bankColors: Record<string, string> = {
  "Bendigo Bank": "hsl(var(--foreground))",
  "CBA": "hsl(var(--foreground) / 0.75)",
  "Westpac": "hsl(var(--foreground) / 0.6)",
  "NAB": "hsl(var(--foreground) / 0.5)",
  "ANZ": "hsl(var(--foreground) / 0.4)",
  "Bank Australia": "hsl(var(--foreground) / 0.3)",
};

const bankAccents: Record<string, string> = {
  "Bendigo Bank": "#8B5060",
  "CBA": "#C4A84A",
  "Westpac": "#A05058",
  "NAB": "#A05050",
  "ANZ": "#4A6A9B",
  "Bank Australia": "#4A8068",
};

function Blocks({ score, max = 5, isTop }: { score: number; max?: number; isTop: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 ${
            i < score
              ? isTop
                ? 'bg-foreground'
                : 'bg-foreground/40'
              : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
}

export default function BankComparison() {
  const [view, setView] = useState<"radar" | "matrix" | "bars">("radar");
  const [sel, setSel] = useState(new Set(bankData.map(b => b.name)));
  const [hBank, setHBank] = useState<string | null>(null);
  const [hCat, setHCat] = useState<string | null>(null);

  const toggle = (n: string) => {
    const s = new Set(sel);
    if (s.has(n)) { if (s.size > 1) s.delete(n); } else s.add(n);
    setSel(s);
  };

  const vis = bankData.filter(b => sel.has(b.name));
  const rCats = categories.filter(c => !c.isPct);

  const S = 280, cx = S / 2, cy = S / 2, R = S / 2 - 36;
  const pol = (a: number, r: number) => ({ x: cx + r * Math.cos(a - Math.PI / 2), y: cy + r * Math.sin(a - Math.PI / 2) });
  const pts = (b: typeof bankData[0]) => rCats.map((c, i) => pol((2 * Math.PI * i) / rCats.length, ((b[c.key] as number) / 5) * R));
  const pathStr = (p: { x: number; y: number }[]) => p.map((pt, i) => `${i ? "L" : "M"}${pt.x} ${pt.y}`).join(" ") + "Z";

  return (
    <div className="border border-border p-6 md:p-8 my-12 -mx-6 md:mx-0" style={{ background: 'hsl(var(--background))' }}>
      <div className="max-w-[860px] mx-auto">

        <div className="mb-10 border-b border-border pb-7">
          <div className="text-[10px] uppercase tracking-[4px] text-muted-foreground font-mono font-medium mb-3">
            Immigrant Banking Survival Guide
          </div>
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            Australian Bank Comparison
          </h2>
          <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed max-w-[480px]">
            What actually matters when you're on a partner visa in regional Australia.
            <br />
            Data from Roy Morgan, AWEI 2025, RPM Lawyers, Finder.com.au.
          </p>
        </div>

        {/* Bank toggles */}
        <div className="flex flex-wrap gap-1.5 mb-7">
          {bankData.map(b => {
            const on = sel.has(b.name);
            return (
              <button key={b.name} onClick={() => toggle(b.name)}
                className={`px-3.5 py-1.5 text-[11px] font-medium tracking-wide border transition-all font-sans cursor-pointer ${
                  on
                    ? 'border-foreground/40 bg-foreground/5 text-foreground'
                    : 'border-border text-muted-foreground/50 hover:border-border hover:text-muted-foreground'
                }`}
              >
                {b.name}
              </button>
            );
          })}
        </div>

        {/* View tabs */}
        <div className="flex border border-border w-fit mb-8">
          {(["radar", "matrix", "bars"] as const).map((v, i) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-5 py-1.5 text-[10px] uppercase tracking-widest font-medium font-sans cursor-pointer transition-all ${
                i < 2 ? 'border-r border-border' : ''
              } ${
                view === v
                  ? 'bg-muted text-foreground'
                  : 'bg-transparent text-muted-foreground/50 hover:text-muted-foreground'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* RADAR */}
        {view === "radar" && (
          <div className="flex flex-col items-center gap-7">
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
              {[1,2,3,4,5].map(r => (
                <polygon key={r}
                  points={rCats.map((_, i) => { const p = pol((2*Math.PI*i)/rCats.length, (r/5)*R); return `${p.x},${p.y}`; }).join(" ")}
                  fill="none" stroke={r === 5 ? "hsl(var(--border))" : "hsl(var(--muted))"} strokeWidth={r === 5 ? 0.8 : 0.4}
                />
              ))}
              {rCats.map((_, i) => {
                const e = pol((2*Math.PI*i)/rCats.length, R);
                return <line key={i} x1={cx} y1={cy} x2={e.x} y2={e.y} stroke="hsl(var(--muted))" strokeWidth={0.4} />;
              })}
              {vis.map(b => {
                const p = pts(b), dim = hBank !== null && hBank !== b.name;
                const accent = bankAccents[b.name];
                return (
                  <g key={b.name}>
                    <path d={pathStr(p)}
                      fill={`${accent}15`} stroke={accent}
                      strokeWidth={hBank === b.name ? 1.8 : 1.2}
                      opacity={dim ? 0.12 : 0.8}
                      style={{ transition: "all 0.2s", cursor: "pointer" }}
                      onMouseEnter={() => setHBank(b.name)}
                      onMouseLeave={() => setHBank(null)}
                    />
                    {p.map((pt, i) => (
                      <rect key={i} x={pt.x-2} y={pt.y-2} width={4} height={4}
                        fill={accent} opacity={dim ? 0.12 : 0.9}
                        style={{ transition: "all 0.2s" }}
                      />
                    ))}
                  </g>
                );
              })}
              {rCats.map((c, i) => {
                const p = pol((2*Math.PI*i)/rCats.length, R + 24);
                return (
                  <text key={c.key} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                    fontSize={7.5} fill="hsl(var(--muted-foreground))" fontWeight={500} letterSpacing={0.3}>
                    {c.label.split("\n").map((l, li) => (
                      <tspan key={li} x={p.x} dy={li ? 9 : 0}>{l}</tspan>
                    ))}
                  </text>
                );
              })}
            </svg>

            <div className="flex flex-wrap gap-4 justify-center">
              {vis.map(b => (
                <div key={b.name}
                  onMouseEnter={() => setHBank(b.name)} onMouseLeave={() => setHBank(null)}
                  className="flex items-center gap-1.5 cursor-pointer transition-opacity"
                  style={{ opacity: hBank && hBank !== b.name ? 0.25 : 1 }}
                >
                  <div className="w-2 h-2" style={{ background: bankAccents[b.name] }} />
                  <span className="text-[10px] text-muted-foreground font-medium tracking-wide">{b.name}</span>
                </div>
              ))}
            </div>

            {/* Home loan satisfaction sub-chart */}
            <div className="w-full max-w-[460px] border border-border p-5">
              <div className="text-[9px] uppercase tracking-[4px] text-muted-foreground font-mono font-medium mb-1">Home Loan Customer Satisfaction</div>
              <div className="text-[10px] text-muted-foreground/60 mb-4">Roy Morgan Research, March 2024</div>
              {[...vis].sort((a, b) => b.homeLoanSat - a.homeLoanSat).map((b, i) => (
                <div key={b.name} className="mb-3.5">
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] font-medium tracking-wide" style={{ color: bankAccents[b.name] }}>{b.name}</span>
                    <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">{b.homeLoanSat}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-muted overflow-hidden">
                    <div
                      className="h-full transition-[width] duration-500"
                      style={{
                        width: `${b.homeLoanSat}%`,
                        background: bankAccents[b.name],
                        transitionDelay: `${i * 70}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MATRIX */}
        {view === "matrix" && (
          <div className="overflow-x-auto border border-border">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="p-3.5 text-left text-muted-foreground/60 font-medium text-[9px] uppercase tracking-widest border-b border-border sticky left-0 bg-background z-10">
                    Feature
                  </th>
                  {vis.map(b => (
                    <th key={b.name} className="p-3.5 text-center font-semibold text-[11px] tracking-wide border-b border-border min-w-[82px]"
                      style={{ color: bankAccents[b.name], borderBottomColor: `${bankAccents[b.name]}35` }}>
                      {b.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => {
                  const mx = Math.max(...vis.map(b => b[cat.key] as number));
                  return (
                    <tr key={cat.key}
                      onMouseEnter={() => setHCat(cat.key)} onMouseLeave={() => setHCat(null)}
                      className={`transition-colors ${hCat === cat.key ? 'bg-muted/30' : ''}`}>
                      <td className={`p-4 border-b border-muted sticky left-0 z-10 ${hCat === cat.key ? 'bg-muted/30' : 'bg-background'}`}>
                        <div className="font-medium text-foreground text-xs">{cat.short}</div>
                        <div className="text-[10px] text-muted-foreground/60 mt-0.5 leading-snug">{cat.desc}</div>
                      </td>
                      {vis.map(b => {
                        const v = b[cat.key] as number, top = v === mx;
                        return (
                          <td key={b.name} className="p-4 text-center border-b border-muted">
                            {cat.isPct ? (
                              <span className={`font-semibold text-sm tabular-nums ${top ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                                {v}%
                              </span>
                            ) : (
                              <div className="flex justify-center">
                                <Blocks score={v} isTop={top} />
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                <tr>
                  <td className="p-4 sticky left-0 bg-background z-10">
                    <div className="font-medium text-foreground text-xs">Key Differentiators</div>
                  </td>
                  {vis.map(b => (
                    <td key={b.name} className="p-3.5 text-center align-top">
                      <div className="flex flex-col gap-1">
                        {b.tags.map((t, i) => (
                          <span key={i} className="text-[9px] px-1 py-0.5 bg-muted text-muted-foreground font-medium tracking-wide">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* BARS */}
        {view === "bars" && (
          <div className="flex flex-col gap-px">
            {categories.map(cat => {
              const mx = Math.max(...vis.map(b => b[cat.key] as number));
              return (
                <div key={cat.key} className="border border-border p-5">
                  <div className="mb-3.5">
                    <div className="text-xs font-semibold text-foreground tracking-wide">{cat.short}</div>
                    <div className="text-[10px] text-muted-foreground/60 mt-0.5">{cat.desc}</div>
                  </div>
                  {[...vis].sort((a, b) => (b[cat.key] as number) - (a[cat.key] as number)).map((b, i) => {
                    const v = b[cat.key] as number;
                    const top = v === mx;
                    return (
                      <div key={b.name} className="mb-2.5 flex items-center gap-3.5">
                        <span className={`text-[11px] font-medium min-w-[95px] text-right tracking-wide ${top ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                          {b.name}
                        </span>
                        <div className="flex-1 flex items-center gap-2.5">
                          <div className="flex-1 h-[3px] bg-muted overflow-hidden">
                            <div
                              className="h-full transition-[width] duration-500"
                              style={{
                                width: cat.isPct ? `${v}%` : `${(v / 5) * 100}%`,
                                background: top ? bankAccents[b.name] : `${bankAccents[b.name]}60`,
                                transitionDelay: `${i * 50}ms`,
                              }}
                            />
                          </div>
                          <span className={`text-[10px] font-semibold min-w-[34px] tabular-nums ${top ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                            {cat.isPct ? `${v}%` : `${v}/5`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-border text-[10px] text-muted-foreground/60 leading-relaxed tracking-wide">
          Scores (1–5) based on publicly available data, published policies, and reported experiences.
          Joint account scores based on RPM Lawyers migration guidance (Sept 2022) and bank eligibility criteria.
          Home loan satisfaction from Roy Morgan Research, March 2024.
          LGBTQ+ inclusion based on AWEI 2024–2025 tier status (Platinum, Gold, Silver, Bronze).
          Migrant support scored on dedicated programs, pre-arrival availability, and migration team access.
          <span className="text-foreground"> ■</span> Filled blocks indicate category leader among visible banks.
        </div>
      </div>
    </div>
  );
}
