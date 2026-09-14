import { useState, useEffect } from "react";

const LEAD = "#C4A868";
const RED = "#C45858";
const AMBER = "#C49858";
const TEAL = "#58A0A0";
const PURPLE = "#A868C4";

const boaStats = [
  { value: "57M", label: "Verified digital users", color: RED },
  { value: "169", label: "Petabytes of data", suffix: "PB", color: RED },
  { value: "1.5B", label: "Erica AI interactions", color: AMBER },
  { value: "3rd", label: "Largest mainframe globally", color: RED },
];

const bendigoStats = [
  { value: "2.9M", label: "Customers served", color: TEAL },
  { value: "15", label: "Min deploy time (was days)", suffix: "min", color: TEAL },
  { value: "99.9", label: "Availability uptime", suffix: "%", color: TEAL },
  { value: "90", label: "Less human effort in migration", suffix: "%", color: PURPLE },
];

const comparisonRows = [
  {
    category: "Core Language",
    boa: "COBOL (1959)",
    bendigo: "Modern cloud-native",
    boaColor: RED,
    bendigoColor: TEAL,
  },
  {
    category: "Infrastructure",
    boa: "Private data centres (23 remaining)",
    bendigo: "Google Cloud / GKE",
    boaColor: AMBER,
    bendigoColor: TEAL,
  },
  {
    category: "Processing",
    boa: "Batch overnight",
    bendigo: "Real-time",
    boaColor: RED,
    bendigoColor: TEAL,
  },
  {
    category: "Database",
    boa: "Legacy relational / mainframe",
    bendigo: "MongoDB Atlas",
    boaColor: AMBER,
    bendigoColor: PURPLE,
  },
  {
    category: "Server Count",
    boa: "70,000 (down from 200K)",
    bendigo: "Managed Kubernetes pods",
    boaColor: RED,
    bendigoColor: TEAL,
  },
  {
    category: "Cloud Strategy",
    boa: "Evaluating hybrid (IBM collab)",
    bendigo: "Cloud-first since migration",
    boaColor: AMBER,
    bendigoColor: TEAL,
  },
];

const migrationStats = [
  { label: "Legacy test runtime", before: "80+ hours", after: "5 minutes", color: TEAL },
  { label: "Migration cost", before: "Full budget", after: "1/10th cost", color: PURPLE },
  { label: "Human effort", before: "100%", after: "10%", color: TEAL },
];

function AnimatedNumber({ target, prefix = "", suffix = "", color, delay = 0 }: { target: string; prefix?: string; suffix?: string; color: string; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return;
    const t = setTimeout(() => {
      const dur = 1200;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(eased * num);
        if (progress < 1) requestAnimationFrame(tick);
      };
      tick();
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);

  const fmt = target.includes(".")
    ? val.toFixed(1)
    : Math.round(val).toLocaleString();

  return (
    <span style={{ color, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
      {prefix}{fmt}{suffix}
    </span>
  );
}

export default function BankInfrastructureComparison() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div className="my-12 -mx-6 md:mx-0 text-foreground" style={{ fontFamily: "'SF Pro Text','Helvetica Neue',-apple-system,sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* Header */}
        <div className="border-b border-border" style={{ marginBottom: 32, paddingBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: LEAD, fontWeight: 500, marginBottom: 12 }}>
            Infrastructure Comparison
          </div>
          <h2 className="text-foreground" style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: -0.4, lineHeight: 1.3 }}>
            Bank of America vs Bendigo Bank
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: 12, marginTop: 8, lineHeight: 1.6, maxWidth: 520 }}>
            Legacy mainframe scale vs cloud-native agility — two approaches to the same backend challenges.
          </p>
        </div>

        {/* Two-column stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
          {/* BofA Column */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: RED, fontWeight: 600, marginBottom: 12 }}>
              Bank of America
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {boaStats.map((s, i) => (
                <div key={i} className="border border-border" style={{ padding: "16px 14px", background: `${s.color}06`, borderTop: `2px solid ${s.color}40` }}>
                  <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 6 }}>
                    <span style={{ color: s.color, fontWeight: 700 }}>{s.value}</span>
                  </div>
                  <div className="text-foreground" style={{ fontSize: 10, fontWeight: 500, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bendigo Column */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 12 }}>
              Bendigo Bank
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {bendigoStats.map((s, i) => (
                <div key={i} className="border border-border" style={{ padding: "16px 14px", background: `${s.color}06`, borderTop: `2px solid ${s.color}40` }}>
                  <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 6 }}>
                    <span style={{ color: s.color, fontWeight: 700 }}>{s.value}</span>
                  </div>
                  <div className="text-foreground" style={{ fontSize: 10, fontWeight: 500, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="border border-border" style={{ padding: "28px 24px", marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: LEAD, fontWeight: 500, marginBottom: 20 }}>
            Side-by-Side Comparison
          </div>

          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 0, marginBottom: 8 }}>
            <div className="text-muted-foreground" style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}></div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: RED }}>BofA</div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: TEAL }}>Bendigo</div>
          </div>

          {/* Table rows */}
          {comparisonRows.map((row, i) => (
            <div key={i} className="border-t border-border" style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 0, padding: "12px 0" }}>
              <div className="text-muted-foreground" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{row.category}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: row.boaColor, opacity: 0.85 }}>{row.boa}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: row.bendigoColor, opacity: 0.85 }}>{row.bendigo}</div>
            </div>
          ))}
        </div>

        {/* Migration Impact */}
        <div className="border border-border" style={{ padding: "28px 24px", marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: LEAD, fontWeight: 500, marginBottom: 4 }}>
            Bendigo Migration Impact
          </div>
          <div className="text-muted-foreground" style={{ fontSize: 10, marginBottom: 24, opacity: 0.6 }}>
            AI-assisted migration from legacy relational DB → MongoDB Atlas
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {migrationStats.map((stat, i) => (
              <div key={i}>
                <div className="text-foreground" style={{ fontSize: 10, fontWeight: 600, marginBottom: 8, letterSpacing: 0.5 }}>{stat.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Before bar */}
                  <div style={{ flex: 1, position: "relative" }}>
                    <div style={{
                      width: loaded ? "100%" : "0%",
                      height: 20,
                      background: `${RED}20`,
                      border: `1px solid ${RED}30`,
                      transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.15}s`,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 8,
                    }}>
                      <span style={{ fontSize: 9, fontWeight: 600, color: RED, whiteSpace: "nowrap" }}>{stat.before}</span>
                    </div>
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: 10, flexShrink: 0 }}>→</span>
                  {/* After bar */}
                  <div style={{ flex: 1, position: "relative" }}>
                    <div style={{
                      width: loaded ? "15%" : "0%",
                      height: 20,
                      background: `${stat.color}20`,
                      border: `1px solid ${stat.color}40`,
                      transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.15 + 0.3}s`,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 8,
                      minWidth: "fit-content",
                    }}>
                      <span style={{ fontSize: 9, fontWeight: 600, color: stat.color, whiteSpace: "nowrap" }}>{stat.after}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div style={{ border: `1px solid ${TEAL}30`, padding: "22px 24px", marginBottom: 32, background: `${TEAL}06`, borderLeft: `3px solid ${TEAL}60` }}>
          <div className="text-foreground" style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.6 }}>
            Both banks need the same things: <strong style={{ color: LEAD }}>transaction integrity</strong>, <strong style={{ color: LEAD }}>regulatory compliance</strong>, <strong style={{ color: LEAD }}>high availability</strong>, and <strong style={{ color: LEAD }}>security</strong>. BofA has scale and decades of battle-tested COBOL — but paralysing technical debt. Bendigo has agility and modern tooling — but not the same depth of infrastructure.
          </div>
          <div className="text-muted-foreground" style={{ fontSize: 9, marginTop: 10, opacity: 0.5 }}>
            The difference is not what they need. It's how they get there.
          </div>
        </div>

        {/* Sources */}
        <div className="border-t border-border text-muted-foreground" style={{ padding: "18px 0", fontSize: 10, lineHeight: 1.8, letterSpacing: 0.2, fontStyle: "italic", opacity: 0.6 }}>
          Sources: BofA Q3 earnings, CIO Dive, SWOTAnalysis.com, Bendigo/Google Cloud (Nov 2025), MongoDB case study (Jun 2024), IBM DevOps.
        </div>
      </div>
    </div>
  );
}
