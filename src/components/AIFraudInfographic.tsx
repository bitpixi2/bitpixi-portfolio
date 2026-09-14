import { useState, useEffect } from "react";

const LEAD = "#C4A868";
const BG = "hsl(var(--background))";
const BORDER = "hsl(var(--border))";
const FAINT = "hsl(var(--muted))";
const TEXT = "hsl(var(--foreground))";
const TEXT2 = "hsl(var(--muted-foreground))";
const TEXT3 = "hsl(var(--muted-foreground) / 0.5)";
const RED = "#C45858";
const AMBER = "#C49858";
const TEAL = "#58A0A0";

const surgeData = [
  { year: "2023", value: 100, label: "Baseline" },
  { year: "2024", value: 520, label: "5.2x" },
  { year: "2025", value: 1310, label: "13.1x" },
];

const statCards = [
  { value: "$16.6B", label: "FBI-reported losses", sub: "IC3 2024 Annual Report", color: RED },
  { value: "82.6%", label: "of phishing emails now AI-generated", sub: "KnowBe4 2025 Phishing Threat Trends", color: AMBER },
  { value: "442%", label: "surge in vishing attacks", sub: "DeepStrike 2025", color: "#A868C4" },
  { value: "1,210%", label: "increase in AI-enabled fraud", sub: "2023–2025, Feedzai AI Trends in Fraud", color: RED },
];

const timeline = [
  { period: "H1 2024", event: "AI-generated phishing surpasses human-written phishing in click-through rates", source: "KnowBe4", color: AMBER },
  { period: "H2 2024", event: "FBI IC3 records $16.6B in cybercrime losses — highest ever reported", source: "FBI IC3 Annual Report", color: RED },
  { period: "Q1 2025", event: "Voice cloning fraud losses hit $410M in first half; vishing up 442%", source: "DeepStrike / Pindrop", color: "#A868C4" },
  { period: "Q2 2025", event: "Hybrid attacks combine AI phishing + voice spoofing + deepfake video in single campaigns", source: "ANSecurity / Brightside AI", color: TEAL },
  { period: "H2 2025", event: "AI-enabled fraud reaches 1,210% of 2023 baseline; banks deploy real-time deepfake detection", source: "Feedzai / Vectra AI", color: LEAD },
];

const attackBreakdown = [
  { type: "AI Phishing (Email/SMS)", pct: 48, color: AMBER },
  { type: "Voice Spoofing / Vishing", pct: 22, color: "#A868C4" },
  { type: "Deepfake Video", pct: 14, color: TEAL },
  { type: "Credential Stuffing (AI-assisted)", pct: 10, color: "#6AAB7A" },
  { type: "Other AI-enabled", pct: 6, color: TEXT3 },
];

function AnimatedNumber({ target, prefix = "", suffix = "", color, delay = 0 }: { target: string; prefix?: string; suffix?: string; color: string; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const num = parseFloat(target.replace(/[^0-9.]/g, ""));
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
    : target.includes(",")
    ? Math.round(val).toLocaleString()
    : Math.round(val).toString();

  return (
    <span style={{ color, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
      {prefix}{fmt}{suffix}
    </span>
  );
}

export default function AIFraudInfographic() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const maxSurge = 1400;
  const barW = 72;
  const chartH = 220;

  return (
    <div className="text-foreground" style={{ fontFamily: "'SF Pro Text','Helvetica Neue',-apple-system,sans-serif", padding: "36px 0", WebkitFontSmoothing: "antialiased" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* Header */}
        <div className="border-b border-border" style={{ marginBottom: 40, paddingBottom: 28 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: RED, fontWeight: 500, marginBottom: 12 }}>
            Threat Intelligence Brief
          </div>
          <h2 className="text-foreground" style={{ fontSize: 24, fontWeight: 600, margin: 0, letterSpacing: -0.4, lineHeight: 1.3 }}>
            The 1,210% Surge: AI-Enabled Fraud 2023–2025
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: 12, marginTop: 10, lineHeight: 1.6, maxWidth: 520 }}>
            How AI tools turned phishing, vishing, and deepfakes from niche threats into industrialized fraud at scale.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 1, marginBottom: 40 }}>
          {statCards.map((s, i) => (
            <div key={i} className="border border-border" style={{ padding: "22px 18px", background: `${s.color}06`, borderTop: `2px solid ${s.color}40` }}>
              <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 8 }}>
                <AnimatedNumber
                  target={s.value.replace(/[^0-9.,]/g, "")}
                  prefix={s.value.startsWith("$") ? "$" : ""}
                  suffix={s.value.endsWith("%") ? "%" : s.value.endsWith("B") ? "B" : ""}
                  color={s.color}
                  delay={i * 200}
                />
              </div>
              <div className="text-foreground" style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.4, marginBottom: 6 }}>{s.label}</div>
              <div className="text-muted-foreground" style={{ fontSize: 9, letterSpacing: 0.3, opacity: 0.6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Surge Chart */}
        <div className="border border-border" style={{ padding: "28px 24px", marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: LEAD, fontWeight: 500, marginBottom: 4 }}>AI-Enabled Fraud Growth</div>
          <div className="text-muted-foreground" style={{ fontSize: 10, marginBottom: 28, opacity: 0.6 }}>
            Indexed to 2023 baseline (100) — Feedzai 2025 AI Trends in Fraud
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 32, height: chartH, position: "relative" }}>
            {[0, 250, 500, 750, 1000, 1250].map(v => (
              <div key={v} className="border-b border-border" style={{ position: "absolute", left: 0, right: 0, bottom: `${(v / maxSurge) * 100}%`, borderBottomColor: v === 0 ? undefined : 'hsl(var(--border) / 0.3)' }}>
                <span className="text-muted-foreground" style={{ fontSize: 8, position: "absolute", left: -4, bottom: 2, fontVariantNumeric: "tabular-nums", opacity: 0.5 }}>{v === 0 ? "" : `${v}`}</span>
              </div>
            ))}

            {surgeData.map((d, i) => {
              const h = (d.value / maxSurge) * chartH;
              const isLast = i === surgeData.length - 1;
              return (
                <div key={d.year} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isLast ? RED : AMBER, fontVariantNumeric: "tabular-nums" }}>{d.label}</div>
                  <div style={{ width: barW, height: loaded ? h : 0, background: `linear-gradient(to top, ${isLast ? RED : AMBER}30, ${isLast ? RED : AMBER}08)`, border: `1px solid ${isLast ? RED : AMBER}40`, borderBottom: "none", transition: `height 1s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.2}s`, position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: isLast ? RED : AMBER }} />
                  </div>
                  <div className="text-foreground" style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>{d.year}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attack Breakdown */}
        <div className="border border-border" style={{ padding: "28px 24px", marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: LEAD, fontWeight: 500, marginBottom: 4 }}>AI-Enabled Fraud by Attack Vector</div>
          <div className="text-muted-foreground" style={{ fontSize: 10, marginBottom: 24, opacity: 0.6 }}>
            Approximate distribution — KnowBe4, DeepStrike, APWG Quarterly Reports 2025
          </div>

          <div style={{ display: "flex", height: 18, width: "100%", marginBottom: 20, overflow: "hidden" }}>
            {attackBreakdown.map((a, i) => (
              <div key={i} style={{ width: loaded ? `${a.pct}%` : "0%", height: "100%", background: a.color, transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.1}s`, borderRight: i < attackBreakdown.length - 1 ? `2px solid hsl(var(--background))` : "none" }} />
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {attackBreakdown.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, background: a.color, flexShrink: 0 }} />
                <span className="text-foreground" style={{ fontSize: 11, fontWeight: 500, flex: 1 }}>{a.type}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: a.color, fontVariantNumeric: "tabular-nums", minWidth: 36, textAlign: "right" }}>{a.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="border border-border" style={{ padding: "28px 24px", marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: LEAD, fontWeight: 500, marginBottom: 20 }}>Escalation Timeline</div>
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div className="bg-border" style={{ position: "absolute", left: 3, top: 4, bottom: 4, width: 1 }} />
            {timeline.map((t, i) => (
              <div key={i} style={{ marginBottom: i < timeline.length - 1 ? 24 : 0, position: "relative" }}>
                <div style={{ position: "absolute", left: -20, top: 4, width: 7, height: 7, background: t.color }} />
                <div style={{ fontSize: 9, fontWeight: 600, color: t.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{t.period}</div>
                <div className="text-foreground" style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5, marginBottom: 3 }}>{t.event}</div>
                <div className="text-muted-foreground" style={{ fontSize: 9, opacity: 0.5 }}>{t.source}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div style={{ border: `1px solid ${RED}30`, padding: "22px 24px", marginBottom: 32, background: `${RED}06`, borderLeft: `3px solid ${RED}60` }}>
          <div className="text-foreground" style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.6 }}>
            Humans detect AI-generated voice with only <span style={{ color: RED, fontWeight: 700 }}>54% accuracy</span> — barely better than a coin flip. Meanwhile, AI phishing emails achieve
            <span style={{ color: AMBER, fontWeight: 700 }}> 14x higher click-through rates</span> than human-written campaigns. The economics of fraud have permanently shifted.
          </div>
          <div className="text-muted-foreground" style={{ fontSize: 9, marginTop: 10, opacity: 0.5 }}>
            Pindrop deepfake detection research (2025), KnowBe4 phishing benchmarks (2025)
          </div>
        </div>

        {/* Sources */}
        <div className="border-t border-border text-muted-foreground" style={{ padding: "18px 0", fontSize: 10, lineHeight: 1.8, letterSpacing: 0.2, fontStyle: "italic", opacity: 0.6 }}>
          Sources: KnowBe4 2025 Phishing Threat Trends Report, FBI IC3 2024 Annual Report, Vectra AI scam analysis (Feb 2026), Brightside AI risk analysis, Feedzai 2025 AI Trends in Fraud, ANSecurity hybrid attack research, APWG Quarterly Reports, DeepStrike vishing statistics 2025.
        </div>
      </div>
    </div>
  );
}
