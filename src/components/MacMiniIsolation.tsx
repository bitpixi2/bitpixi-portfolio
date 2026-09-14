import { useState, useEffect } from "react";

const layers = [
  {
    id: "hardware",
    name: "Physical Hardware",
    belief: "Separate machine = separate risk",
    reality: "Same LAN, same blast radius. Router admin panel accessible from both machines.",
    isolation: 3,
    leakage: 7,
    leakPaths: ["LAN lateral movement", "Router admin access", "Shared printer/NAS", "ARP spoofing surface"],
    color: "hsl(var(--chart-green, 142 60% 50%))",
    colorRaw: "142 60% 50%",
  },
  {
    id: "macos",
    name: "macOS Kernel",
    belief: "I'll lock it down with a firewall",
    reality: "ContentFilterExclusionList exempts trustd, CommCenter, Maps from ALL user firewalls & VPNs.",
    isolation: 2,
    leakage: 8,
    leakPaths: ["OCSP certificate checks (trustd)", "App launch telemetry to Apple", "Little Snitch / LuLu bypassed", "VPN tunnel bypassed at kernel level"],
    color: "hsl(var(--destructive))",
    colorRaw: "0 60% 50%",
  },
  {
    id: "network",
    name: "Network Discovery",
    belief: "It's just on my home Wi-Fi",
    reality: "mDNS broadcasts hostname (inc. your name) on UDP 5353 — even in Lockdown Mode.",
    isolation: 2,
    leakage: 8,
    leakPaths: ["Bonjour / mDNS broadcast (UDP 5353)", "AWDL peer-to-peer links", "Hostname leaks real name", "Browser-based mDNS timing attack"],
    color: "hsl(var(--destructive))",
    colorRaw: "0 60% 50%",
  },
  {
    id: "icloud",
    name: "iCloud / Apple Services",
    belief: "I won't sign in",
    reality: "macOS resolves mask.icloud.com regardless. mDNSResponder saturates CPU attempting it.",
    isolation: 3,
    leakage: 7,
    leakPaths: ["mask.icloud.com background resolution", "Keychain sync if signed in", "Universal Clipboard bridging", "Handoff / AirDrop cross-device"],
    color: "hsl(30 60% 55%)",
    colorRaw: "30 60% 55%",
  },
  {
    id: "agent",
    name: "Agent Permissions",
    belief: "I'll limit what it can do",
    reality: "Useful operations require shell, browser, and file access. Autonomy × Access = Risk.",
    isolation: 1,
    leakage: 9,
    leakPaths: ["Shell access (nmap, curl, ssh, nc)", "Browser with logged-in sessions", "File system read/write", "Persistent memory (injectable)"],
    color: "hsl(var(--destructive))",
    colorRaw: "0 60% 50%",
  },
  {
    id: "integrations",
    name: "External Integrations",
    belief: "It's just Telegram",
    reality: "Every messaging/email integration is an egress channel. Exfil looks like normal HTTP 200.",
    isolation: 1,
    leakage: 9,
    leakPaths: ["Telegram / Discord / Slack egress", "Email as exfiltration channel", "OAuth token scope creep", "Natural language payloads (invisible to DLP)"],
    color: "hsl(var(--destructive))",
    colorRaw: "0 60% 50%",
  },
];

const trifecta = [
  { label: "Private Data Access", desc: "Emails, files, credentials, browser history, chat messages", icon: "🔓", color: "hsl(var(--destructive))" },
  { label: "Untrusted Content", desc: "Web browsing, incoming messages, third-party skills, Moltbook posts", icon: "☠️", color: "hsl(30 60% 55%)" },
  { label: "External Communication", desc: "Sends emails, posts messages, makes API calls, exfiltrates via natural language", icon: "📡", color: "hsl(270 40% 58%)" },
  { label: "Persistent Memory", desc: "Time-shifted injection: plant Monday, detonate Thursday", icon: "🧠", color: "hsl(180 30% 48%)" },
];

const threatScenarios = [
  {
    attack: "Prompt injection via browsed webpage",
    vector: "Agent reads hidden text in product review",
    layer: "Agent Permissions",
    mitigated: false,
    why: "No amount of hardware isolation prevents the agent from following injected instructions",
  },
  {
    attack: "Memory poisoning via Moltbook post",
    vector: "Malicious instruction fragment written to persistent memory",
    layer: "Integrations",
    mitigated: false,
    why: "Time-shifted: payload dormant until context aligns. No detection mechanism exists",
  },
  {
    attack: "Lateral movement to primary machine",
    vector: "Compromised agent scans LAN via mDNS, probes open ports",
    layer: "Network Discovery",
    mitigated: "partial" as const,
    why: "VLAN segmentation blocks this. Consumer routers do not support it by default",
  },
  {
    attack: "Credential exfiltration via email",
    vector: "Agent sends OAuth tokens or API keys in normal-looking email",
    layer: "Integrations",
    mitigated: false,
    why: "Looks identical to legitimate email. DLP cannot parse natural language intent",
  },
  {
    attack: "Crypto wallet drain via context manipulation",
    vector: "Injected instruction redirects ETH transfer to attacker address",
    layer: "Agent Permissions",
    mitigated: false,
    why: "Blockchain transactions are irreversible. No chargeback, no fraud department",
  },
  {
    attack: "Supply chain via malicious OpenClaw skill",
    vector: "Trojan skill package on ClawHub/MoltHub executes on install",
    layer: "Agent Permissions",
    mitigated: false,
    why: "No signed skill verification. CVE-2026-25253 documented RCE via skills",
  },
  {
    attack: "Apple telemetry fingerprinting",
    vector: "trustd OCSP requests reveal IP, location, running applications",
    layer: "macOS Kernel",
    mitigated: false,
    why: "ContentFilterExclusionList bypasses all user firewalls and VPNs at kernel level",
  },
];

function Bar({ value, max, color, delay, loaded }: { value: number; max: number; color: string; delay: number; loaded: boolean }) {
  const pct = (value / max) * 100;
  return (
    <div className="h-2 w-full bg-muted rounded-sm overflow-hidden">
      <div
        className="h-full rounded-sm transition-all duration-1000 ease-out"
        style={{
          width: loaded ? `${pct}%` : "0%",
          background: color,
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

export default function MacMiniIsolation() {
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [view, setView] = useState<"layers" | "trifecta" | "threat">("layers");

  useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);

  return (
    <div className="bg-background border border-border p-6 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 border-b border-border pb-6">
          <div className="text-[10px] tracking-[4px] uppercase text-destructive font-mono font-medium mb-3">
            Isolation Analysis
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground leading-tight mb-2">
            Your "Isolated" Mac Mini Is Not Isolated
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            Six layers of leakage between your dedicated AI agent hardware
            and the network, Apple, and the open internet.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {([
            { id: "layers" as const, label: "Isolation Layers" },
            { id: "trifecta" as const, label: "Lethal Trifecta + Memory" },
            { id: "threat" as const, label: "Threat Model" },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => { setView(t.id); setSelected(null); }}
              className={`px-4 py-2 text-[11px] font-medium tracking-wide border transition-colors font-mono ${
                view === t.id
                  ? 'border-foreground/30 bg-foreground/5 text-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* LAYERS VIEW */}
        {view === "layers" && (
          <div className="space-y-3">
            {layers.map((layer, i) => (
              <div
                key={layer.id}
                onClick={() => setSelected(selected === i ? null : i)}
                className={`border p-4 md:p-5 cursor-pointer transition-all ${
                  selected === i ? 'border-foreground/20 bg-foreground/[0.02]' : 'border-border hover:border-foreground/10'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground">{i + 1}</span>
                      <span className="text-sm font-medium text-foreground">{layer.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic mb-1">"{layer.belief}"</p>
                    <p className="text-xs text-foreground/70 leading-relaxed">{layer.reality}</p>
                  </div>

                  {/* Score Bars */}
                  <div className="w-full md:w-40 space-y-2 flex-shrink-0">
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                        <span>Isolation</span>
                        <span>{layer.isolation}/10</span>
                      </div>
                      <Bar value={layer.isolation} max={10} color="hsl(var(--muted-foreground))" delay={i * 100} loaded={loaded} />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                        <span>Leakage</span>
                        <span>{layer.leakage}/10</span>
                      </div>
                      <Bar value={layer.leakage} max={10} color={layer.color} delay={i * 100 + 50} loaded={loaded} />
                    </div>
                  </div>
                </div>

                {/* Expanded: Leak Paths */}
                {selected === i && (
                  <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {layer.leakPaths.map((path, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-foreground/70">
                        <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: layer.color }} />
                        {path}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Summary */}
            <div className="border-l-[3px] border-foreground/20 pl-4 py-3 mt-6">
              <p className="text-xs text-foreground/70 leading-relaxed">
                <strong className="text-foreground">Average isolation score: 2.0/10. Average leakage: 8.0/10.</strong>{" "}
                A dedicated Mac Mini reduces blast radius but does not create meaningful isolation
                without VLAN segmentation, no iCloud, and strict egress controls.
              </p>
            </div>
          </div>
        )}

        {/* TRIFECTA VIEW */}
        {view === "trifecta" && (
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Simon Willison's Lethal Trifecta: when an agent combines
              all three factors below, it becomes vulnerable by design. OpenClaw adds a fourth:
              persistent memory as an attack accelerant.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {trifecta.map((t, i) => (
                <div key={i} className="border border-border p-4">
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{t.label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed mb-3">{t.desc}</div>
                  <div className="text-[10px] font-mono tracking-wide" style={{ color: t.color }}>
                    {i < 3 ? "OpenClaw: Active" : "OpenClaw: Active (4th vector)"}
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-border p-5">
              <div className="text-sm font-medium text-foreground mb-3">Decision Framework</div>
              <div className="text-xs text-foreground/70 leading-relaxed space-y-1">
                <p><strong className="text-foreground">Safe:</strong> Pick any two. Block the third.</p>
                <p><strong className="text-foreground">Risky:</strong> All three active without mitigations.</p>
                <p><strong className="text-foreground">Critical:</strong> All three + persistent memory = time-shifted injection surface.</p>
                <blockquote className="border-l-2 border-border pl-3 mt-4 italic text-muted-foreground">
                  "If your agent must access private data and communicate externally, do not expose it to
                  untrusted content. You cannot safely have all three. Pick two." — Simon Willison
                </blockquote>
              </div>
            </div>
          </div>
        )}

        {/* THREAT MODEL VIEW */}
        {view === "threat" && (
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Real-world attack scenarios against a "dedicated" Mac Mini running OpenClaw.
              Each row shows the attack vector, the layer it exploits, and whether typical
              user mitigations actually help.
            </p>

            <div className="space-y-3">
              {threatScenarios.map((threat, i) => (
                <div key={i} className="border border-border p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-sm font-medium text-foreground">{threat.attack}</span>
                    <span className={`text-[10px] font-mono tracking-wide flex-shrink-0 px-2 py-0.5 border ${
                      threat.mitigated === false
                        ? 'text-destructive border-destructive/30'
                        : 'text-muted-foreground border-border'
                    }`}>
                      {threat.mitigated === false ? "Not Mitigated" : "Partial"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    <strong className="text-foreground/70">Vector:</strong> {threat.vector}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">
                    <strong className="text-foreground/70">Layer:</strong> {threat.layer}
                  </p>
                  <p className="text-xs text-foreground/60 italic leading-relaxed">{threat.why}</p>
                </div>
              ))}
            </div>

            <div className="border-l-[3px] border-destructive/40 pl-4 py-3 mt-6">
              <p className="text-xs text-foreground/70 leading-relaxed">
                <strong className="text-foreground">Of 7 realistic attack scenarios, 5 are completely unmitigated by
                dedicated hardware alone.</strong> Only network lateral movement is partially addressable,
                and only with VLAN segmentation that most home users lack.
              </p>
              <p className="text-[10px] text-muted-foreground mt-2">
                Palo Alto Networks, Adversa AI, Simon Willison, IACR, Anthropic SCONE-bench (Feb 2026)
              </p>
            </div>
          </div>
        )}

        {/* Footer Sources */}
        <div className="mt-8 pt-4 border-t border-border text-[10px] text-muted-foreground leading-relaxed italic">
          Sources: Palo Alto Networks OpenClaw & Moltbook security analysis (Feb 2026), Adversa AI OpenClaw
          security guide (Feb 2026), Simon Willison "Lethal Trifecta" framework (Jul 2025), Jeffrey Paul macOS
          telemetry analysis, Fingerprint mDNS brute-force research, Apple Community Lockdown Mode mDNS
          disclosure, IACR "AI Agents in Cryptoland" (2025), Anthropic SCONE-bench (Feb 2026).
        </div>
      </div>
    </div>
  );
}
