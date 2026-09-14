import { useState } from "react";

const models = [
  {
    name: "Vocu V3.0",
    provider: "Vocu",
    color: "#9B6ABB",
    elo: 1616,
    winRate: 57,
    naturalness: 5,
    emotionalRange: 4,
    latency: 3,
    cloning: 2,
    languages: 2,
    price: 3,
    openSource: false,
    tags: ["#1 TTS Arena Feb 2026", "1,616 ELO", "57% win rate", "Proprietary"],
  },
  {
    name: "Inworld TTS MAX",
    provider: "Inworld",
    color: "#5A8ABB",
    elo: 1569,
    winRate: 61,
    naturalness: 5,
    emotionalRange: 4,
    latency: 4,
    cloning: 3,
    languages: 3,
    price: 5,
    openSource: false,
    tags: ["#4 TTS Arena", "1,569 ELO", "$10/M chars", "Sub-250ms latency"],
  },
  {
    name: "Hume Octave",
    provider: "Hume AI",
    color: "#BB7A5A",
    elo: 1558,
    winRate: 64,
    naturalness: 4,
    emotionalRange: 5,
    latency: 4,
    cloning: 2,
    languages: 3,
    price: 4,
    openSource: false,
    tags: ["#6 TTS Arena", "64% win rate (highest)", "Emotion-native LLM", "$7.60/M chars"],
  },
  {
    name: "ElevenLabs Flash v2.5",
    provider: "ElevenLabs",
    color: "#6AAB7A",
    elo: 1547,
    winRate: 56,
    naturalness: 5,
    emotionalRange: 5,
    latency: 5,
    cloning: 5,
    languages: 5,
    price: 2,
    openSource: false,
    tags: ["#7 TTS Arena", "75ms TTFA", "70+ languages", "Best voice cloning"],
  },
  {
    name: "MiniMax Speech-02-HD",
    provider: "MiniMax",
    color: "#AB6A6A",
    elo: 1541,
    winRate: 57,
    naturalness: 4,
    emotionalRange: 4,
    latency: 3,
    cloning: 3,
    languages: 4,
    price: 2,
    openSource: false,
    tags: ["#9 TTS Arena", "1,541 ELO", "Strong multilingual", "$100/M chars"],
  },
  {
    name: "Cartesia Sonic 3",
    provider: "Cartesia",
    color: "#8A8ABB",
    elo: 1490,
    winRate: 52,
    naturalness: 4,
    emotionalRange: 3,
    latency: 5,
    cloning: 4,
    languages: 3,
    price: 3,
    openSource: false,
    tags: ["40ms TTFA (fastest)", "State Space Model", "Real-time native", "~$50/M chars"],
  },
  {
    name: "OpenAI GPT-4o-mini TTS",
    provider: "OpenAI",
    color: "#7AAA9A",
    elo: 1480,
    winRate: 50,
    naturalness: 4,
    emotionalRange: 4,
    latency: 3,
    cloning: 2,
    languages: 4,
    price: 5,
    openSource: false,
    tags: ["Steerable via prompts", "13 built-in voices", "GPT ecosystem", "$0.60/M chars (mini)"],
  },
  {
    name: "Kokoro 82M v1.0",
    provider: "Open Source",
    color: "#AABB6A",
    elo: 1059,
    winRate: 42,
    naturalness: 3,
    emotionalRange: 2,
    latency: 4,
    cloning: 2,
    languages: 2,
    price: 5,
    openSource: true,
    tags: ["Open-weight", "82M params (tiny)", "ELO 1,059", "$0.70/M chars"],
  },
];

const categories = [
  { key: "naturalness", label: "Voice\nNaturalness", short: "Voice Naturalness", desc: "How human and natural the generated speech sounds in blind tests" },
  { key: "emotionalRange", label: "Emotional\nRange", short: "Emotional Range", desc: "Ability to convey tone, emotion, laughter, pauses, and prosody" },
  { key: "latency", label: "Latency\n(Speed)", short: "Latency (Speed)", desc: "Time to first audio byte — critical for real-time conversation" },
  { key: "cloning", label: "Voice\nCloning", short: "Voice Cloning", desc: "Quality and ease of replicating a specific voice from samples" },
  { key: "languages", label: "Language\nBreadth", short: "Language Breadth", desc: "Number and quality of supported languages and accents" },
  { key: "price", label: "Price\nValue", short: "Price Value", desc: "Cost efficiency — higher score means more affordable at scale" },
];

const LEAD = "#C4A868";
const BG = "hsl(var(--background))";
const BORDER = "hsl(var(--border))";
const FAINT = "hsl(var(--muted))";
const TEXT = "hsl(var(--foreground))";
const TEXT2 = "hsl(var(--muted-foreground))";
const TEXT3 = "hsl(var(--muted-foreground) / 0.5)";

function Blocks({ score, max = 5, color, lead }: { score: number; max?: number; color: string; lead: boolean }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: max }, (_, i) => (
        <div key={i} style={{
          width: 8, height: 8,
          background: i < score ? (lead ? LEAD : color) : FAINT,
        }} />
      ))}
    </div>
  );
}

export default function VoiceModelComparison() {
  const [view, setView] = useState("radar");
  const [sel, setSel] = useState(new Set(models.map(m => m.name)));
  const [hModel, setHModel] = useState<string | null>(null);
  const [hCat, setHCat] = useState<string | null>(null);

  const toggle = (n: string) => {
    const s = new Set(sel);
    if (s.has(n)) { if (s.size > 1) s.delete(n); } else s.add(n);
    setSel(s);
  };

  const vis = models.filter(m => sel.has(m.name));

  const S = 280, cx = S / 2, cy = S / 2, R = S / 2 - 36;
  const pol = (a: number, r: number) => ({ x: cx + r * Math.cos(a - Math.PI / 2), y: cy + r * Math.sin(a - Math.PI / 2) });
  const pts = (m: typeof models[0]) => categories.map((c, i) => pol((2 * Math.PI * i) / categories.length, (m[c.key as keyof typeof m] as number / 5) * R));
  const path = (p: { x: number; y: number }[]) => p.map((pt, i) => `${i ? "L" : "M"}${pt.x} ${pt.y}`).join(" ") + "Z";

  const lbl: React.CSSProperties = { fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: LEAD, fontWeight: 500 };

  return (
    <div className="text-foreground" style={{
      fontFamily: "'SF Pro Text','Helvetica Neue',-apple-system,sans-serif",
      padding: "36px 0", WebkitFontSmoothing: "antialiased",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <div className="border-b border-border" style={{ marginBottom: 40, paddingBottom: 28 }}>
          <div style={{ ...lbl, marginBottom: 12 }}>Voice AI Landscape 2026</div>
          <h2 className="text-foreground" style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: -0.4 }}>
            TTS Model Comparison: Can You Tell Which Voice Is Real?
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: 12, marginTop: 10, lineHeight: 1.6, maxWidth: 520 }}>
            The top models scored by blind human preference in the TTS Arena (Feb 2026).
            <br />
            ELO ratings from Artificial Analysis and HuggingFace TTS Arena leaderboards.
          </p>
        </div>

        {/* Model toggles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {models.map(m => {
            const on = sel.has(m.name);
            return (
              <button key={m.name} onClick={() => toggle(m.name)} style={{
                padding: "5px 14px", border: `1px solid ${on ? m.color : "hsl(var(--border))"}`,
                background: on ? `${m.color}18` : "transparent",
                color: on ? m.color : "hsl(var(--muted-foreground))", cursor: "pointer",
                fontSize: 11, fontWeight: 500, letterSpacing: 0.3,
                transition: "all 0.15s", fontFamily: "inherit",
              }}>
                {m.name}
              </button>
            );
          })}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", border: `1px solid ${BORDER}`, width: "fit-content", marginBottom: 32 }}>
          {["radar", "matrix", "bars"].map((v, i) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "7px 22px", border: "none",
              borderRight: i < 2 ? `1px solid ${BORDER}` : "none",
              background: view === v ? FAINT : "transparent",
              color: view === v ? LEAD : "hsl(var(--muted-foreground))",
              cursor: "pointer", fontSize: 10, fontWeight: 500,
              textTransform: "uppercase", letterSpacing: 2, fontFamily: "inherit",
              transition: "all 0.12s",
            }}>
              {v}
            </button>
          ))}
        </div>

        {/* RADAR */}
        {view === "radar" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
            <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
              {[1,2,3,4,5].map(r => (
                <polygon key={r}
                  points={categories.map((_, i) => { const p = pol((2*Math.PI*i)/categories.length, (r/5)*R); return `${p.x},${p.y}`; }).join(" ")}
                  fill="none" stroke={r === 5 ? "hsl(var(--border))" : "hsl(var(--border) / 0.4)"} strokeWidth={r === 5 ? 0.8 : 0.4}
                />
              ))}
              {categories.map((_, i) => {
                const e = pol((2*Math.PI*i)/categories.length, R);
                return <line key={i} x1={cx} y1={cy} x2={e.x} y2={e.y} stroke="hsl(var(--border) / 0.4)" strokeWidth={0.4} />;
              })}
              {vis.map(m => {
                const p = pts(m), dim = hModel !== null && hModel !== m.name;
                return (
                  <g key={m.name}>
                    <path d={path(p)}
                      fill={`${m.color}15`} stroke={m.color}
                      strokeWidth={hModel === m.name ? 1.8 : 1.2}
                      opacity={dim ? 0.12 : 0.8}
                      style={{ transition: "all 0.2s", cursor: "pointer" }}
                      onMouseEnter={() => setHModel(m.name)}
                      onMouseLeave={() => setHModel(null)}
                    />
                    {p.map((pt, i) => (
                      <rect key={i} x={pt.x-2} y={pt.y-2} width={4} height={4}
                        fill={m.color} opacity={dim ? 0.12 : 0.9}
                        style={{ transition: "all 0.2s" }}
                      />
                    ))}
                  </g>
                );
              })}
              {categories.map((c, i) => {
                const p = pol((2*Math.PI*i)/categories.length, R + 24);
                return (
                  <text key={c.key} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                    fontSize={7.5} fill={TEXT2} fontWeight={500} letterSpacing={0.3}>
                    {c.label.split("\n").map((l, li) => (
                      <tspan key={li} x={p.x} dy={li ? 9 : 0}>{l}</tspan>
                    ))}
                  </text>
                );
              })}
            </svg>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              {vis.map(m => (
                <div key={m.name}
                  onMouseEnter={() => setHModel(m.name)} onMouseLeave={() => setHModel(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
                    opacity: hModel !== null && hModel !== m.name ? 0.25 : 1, transition: "opacity 0.15s",
                  }}>
                  <div style={{ width: 8, height: 8, background: m.color }} />
                  <span style={{ fontSize: 10, color: TEXT2, fontWeight: 500, letterSpacing: 0.3 }}>{m.name}</span>
                </div>
              ))}
            </div>

            {/* ELO Rankings */}
            <div className="border border-border" style={{ width: "100%", maxWidth: 500, padding: "20px 22px" }}>
              <div style={{ ...lbl, fontSize: 9, marginBottom: 4 }}>TTS Arena ELO Rankings</div>
              <div style={{ fontSize: 10, color: TEXT3, marginBottom: 18 }}>HuggingFace TTS Arena, February 2026 — blind human preference votes</div>
              {[...vis].sort((a, b) => b.elo - a.elo).map((m, i) => {
                const maxElo = Math.max(...vis.map(v => v.elo));
                const minElo = Math.min(...vis.map(v => v.elo));
                const range = maxElo - minElo || 1;
                const pct = 30 + ((m.elo - minElo) / range) * 70;
                return (
                  <div key={m.name} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 11, fontWeight: 500, color: m.color, letterSpacing: 0.2 }}>{m.name}</span>
                      <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                        <span style={{ fontSize: 9, color: TEXT3, fontVariantNumeric: "tabular-nums" }}>{m.winRate}% win</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: m.elo === maxElo ? LEAD : TEXT2, fontVariantNumeric: "tabular-nums" }}>{m.elo}</span>
                      </div>
                    </div>
                    <div style={{ width: "100%", height: 3, background: FAINT, overflow: "hidden" }}>
                      <div style={{
                        width: `${pct}%`, height: "100%", background: m.color,
                        transition: `width 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.07}s`,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MATRIX */}
        {view === "matrix" && (
          <div style={{ overflowX: "auto" }} className="border border-border">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{
                    padding: "14px 16px", textAlign: "left", color: TEXT3,
                    fontWeight: 500, fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase",
                    borderBottom: `1px solid ${BORDER}`, position: "sticky", left: 0, background: BG, zIndex: 1,
                  }}>Capability</th>
                  {vis.map(m => (
                    <th key={m.name} style={{
                      padding: "14px 8px", textAlign: "center", color: m.color,
                      fontWeight: 600, borderBottom: `1px solid ${m.color}35`,
                      fontSize: 10, minWidth: 78, letterSpacing: 0.2,
                    }}>
                      <div>{m.name.split(" ").slice(0, -1).join(" ") || m.name}</div>
                      <div style={{ fontSize: 8, color: TEXT3, fontWeight: 400, marginTop: 2 }}>{m.name.split(" ").slice(-1)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* ELO row */}
                <tr style={{ background: "hsl(var(--muted))" }}>
                  <td style={{
                    padding: "16px", borderBottom: `1px solid hsl(var(--border))`,
                    position: "sticky", left: 0, background: "hsl(var(--muted))", zIndex: 1,
                  }}>
                    <div style={{ fontWeight: 500, color: TEXT, fontSize: 12 }}>Arena ELO</div>
                    <div style={{ fontSize: 10, color: TEXT3, marginTop: 3 }}>Blind human preference score (Feb 2026)</div>
                  </td>
                  {vis.map(m => {
                    const top = m.elo === Math.max(...vis.map(v => v.elo));
                    return (
                      <td key={m.name} style={{ padding: "16px 8px", textAlign: "center", borderBottom: `1px solid hsl(var(--border))` }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: top ? LEAD : TEXT2, fontVariantNumeric: "tabular-nums" }}>
                          {m.elo}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                {categories.map(cat => {
                  const mx = Math.max(...vis.map(m => m[cat.key as keyof typeof m] as number));
                  return (
                    <tr key={cat.key}
                      onMouseEnter={() => setHCat(cat.key)} onMouseLeave={() => setHCat(null)}
                      style={{ background: hCat === cat.key ? "hsl(var(--muted))" : "transparent", transition: "background 0.12s" }}>
                      <td style={{
                        padding: "16px", borderBottom: `1px solid hsl(var(--border))`,
                        position: "sticky", left: 0, background: hCat === cat.key ? "hsl(var(--muted))" : BG, zIndex: 1,
                      }}>
                        <div style={{ fontWeight: 500, color: TEXT, fontSize: 12 }}>{cat.short}</div>
                        <div style={{ fontSize: 10, color: TEXT3, marginTop: 3, lineHeight: 1.4 }}>{cat.desc}</div>
                      </td>
                      {vis.map(m => {
                        const top = (m[cat.key as keyof typeof m] as number) === mx;
                        return (
                          <td key={m.name} style={{ padding: "16px 8px", textAlign: "center", borderBottom: `1px solid hsl(var(--border))` }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <Blocks score={m[cat.key as keyof typeof m] as number} color={m.color} lead={top} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {/* Tags row */}
                <tr>
                  <td style={{ padding: "16px", position: "sticky", left: 0, background: BG, zIndex: 1 }}>
                    <div style={{ fontWeight: 500, color: TEXT, fontSize: 12 }}>Key Facts</div>
                  </td>
                  {vis.map(m => (
                    <td key={m.name} style={{ padding: "14px 6px", textAlign: "center", verticalAlign: "top" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {m.tags.map((t, i) => (
                          <span key={i} style={{
                            fontSize: 8.5, padding: "3px 4px",
                            background: `${m.color}10`, color: `${m.color}cc`,
                            fontWeight: 500, letterSpacing: 0.2,
                          }}>{t}</span>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* ELO as first bar section */}
            <div style={{ border: `1px solid ${BORDER}`, padding: "18px 20px" }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, letterSpacing: 0.2 }}>Arena ELO Score</div>
                <div style={{ fontSize: 10, color: TEXT3, marginTop: 3 }}>HuggingFace TTS Arena blind human preference (Feb 2026)</div>
              </div>
              {[...vis].sort((a, b) => b.elo - a.elo).map((m, i) => {
                const maxElo = Math.max(...vis.map(v => v.elo));
                const top = m.elo === maxElo;
                return (
                  <div key={m.name} style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 500,
                      color: top ? m.color : `${m.color}80`,
                      minWidth: 130, textAlign: "right", letterSpacing: 0.2,
                    }}>{m.name}</span>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1, height: 3, background: FAINT, overflow: "hidden" }}>
                        <div style={{
                          width: `${(m.elo / 1700) * 100}%`,
                          height: "100%",
                          background: top ? m.color : `${m.color}60`,
                          transition: `width 0.5s ease ${i * 0.05}s`,
                        }} />
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 600,
                        color: top ? LEAD : TEXT3,
                        minWidth: 40, fontVariantNumeric: "tabular-nums",
                      }}>{m.elo}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {categories.map(cat => {
              const mx = Math.max(...vis.map(m => m[cat.key as keyof typeof m] as number));
              return (
                <div key={cat.key} style={{ border: `1px solid ${BORDER}`, padding: "18px 20px" }}>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, letterSpacing: 0.2 }}>{cat.short}</div>
                    <div style={{ fontSize: 10, color: TEXT3, marginTop: 3 }}>{cat.desc}</div>
                  </div>
                  {[...vis].sort((a, b) => (b[cat.key as keyof typeof b] as number) - (a[cat.key as keyof typeof a] as number)).map((m, i) => {
                    const top = (m[cat.key as keyof typeof m] as number) === mx;
                    return (
                      <div key={m.name} style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 500,
                          color: top ? m.color : `${m.color}80`,
                          minWidth: 130, textAlign: "right", letterSpacing: 0.2,
                        }}>{m.name}</span>
                        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ flex: 1, height: 3, background: FAINT, overflow: "hidden" }}>
                            <div style={{
                              width: `${((m[cat.key as keyof typeof m] as number)/5)*100}%`,
                              height: "100%",
                              background: top ? m.color : `${m.color}60`,
                              transition: `width 0.5s ease ${i * 0.05}s`,
                            }} />
                          </div>
                          <span style={{
                            fontSize: 10, fontWeight: 600,
                            color: top ? LEAD : TEXT3,
                            minWidth: 40, fontVariantNumeric: "tabular-nums",
                          }}>{m[cat.key as keyof typeof m] as number}/5</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        <div style={{
          marginTop: 32, padding: "18px 0", borderTop: `1px solid ${BORDER}`,
          fontSize: 10, color: TEXT3, lineHeight: 1.8, letterSpacing: 0.2,
        }}>
          ELO scores from HuggingFace TTS Arena leaderboard (February 2026) based on blind human preference votes.
          Capability scores (1-5) synthesized from Artificial Analysis benchmarks, Labelbox evaluation of 500 prompts,
          Cartesia comparison data, Softcery voice agent guide, and published provider specifications.
          Latency based on reported TTFA (Time to First Audio): 5 = sub-100ms, 4 = sub-250ms, 3 = sub-500ms.
          Price value inverted: 5 = cheapest per million characters, 1 = most expensive.
          <span style={{ color: LEAD }}> ■</span> Gold indicates category leader among visible models.
        </div>
      </div>
    </div>
  );
}
