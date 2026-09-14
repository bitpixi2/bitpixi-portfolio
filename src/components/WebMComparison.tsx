import { useState } from "react";

const data = [
  { label: "Feature", webm: "High", mp4: "Moderate", gif: "Low" },
  { label: "Compression", webm: "Small", mp4: "Moderate", gif: "Large" },
  { label: "Quality", webm: "High", mp4: "High", gif: "Low" },
  { label: "Browser Support", webm: "Modern browsers", mp4: "Universal", gif: "Universal" },
  { label: "Best Use Case", webm: "Web streaming, animations", mp4: "General-purpose video", gif: "Simple animations" },
];

const ratingColor = (val: string) => {
  const v = val.toLowerCase();
  if (["high", "small", "universal"].includes(v)) return "#16a34a";
  if (["moderate", "modern browsers"].includes(v)) return "#d97706";
  if (["low", "large"].includes(v)) return "#dc2626";
  return "#475569";
};

export default function WebMComparison() {
  const [hovered, setHovered] = useState<number | null>(null);

  const formats = [
    { key: "webm" as const, name: "WebM" },
    { key: "mp4" as const, name: "MP4" },
    { key: "gif" as const, name: "GIF" },
  ];

  return (
    <div className="w-full max-w-[720px] overflow-x-auto">

      {/* Column headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "130px 1fr 1fr 1fr",
        gap: 0,
        marginBottom: 0,
        minWidth: 500,
      }}>
        <div />
        {formats.map((f) => (
          <div key={f.key} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 0",
          }}>
            <span style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1e293b",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}>{f.name}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #d1d5db",
        overflow: "hidden",
        minWidth: 500,
      }}>
        {data.map((row, i) => (
          <div
            key={row.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "130px 1fr 1fr 1fr",
              borderBottom: i < data.length - 1 ? "1px solid #e5e7eb" : "none",
              background: hovered === i ? "#f9fafb" : "transparent",
              transition: "background 0.12s ease",
            }}
          >
            <div style={{
              padding: "13px 14px",
              fontSize: 12,
              fontWeight: 700,
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid #e5e7eb",
              background: hovered === i ? "#f3f4f6" : "#f9fafb",
              transition: "background 0.12s ease",
            }}>
              {row.label}
            </div>

            {formats.map((f) => {
              const val = row[f.key];
              const isUseCase = row.label === "Best Use Case";
              return (
                <div key={f.key} style={{
                  padding: "13px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRight: f.key !== "gif" ? "1px solid #f3f4f6" : "none",
                }}>
                  {isUseCase ? (
                    <span style={{
                      fontSize: 12,
                      color: "#334155",
                      lineHeight: 1.4,
                    }}>{val}</span>
                  ) : (
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: ratingColor(val),
                      background: ratingColor(val) + "0d",
                      padding: "3px 10px",
                      border: `1px solid ${ratingColor(val)}30`,
                    }}>{val}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        marginTop: 14,
        fontSize: 10,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}>
        {[
          { label: "Best", color: "#16a34a" },
          { label: "Moderate", color: "#d97706" },
          { label: "Weakest", color: "#dc2626" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{
              width: 8,
              height: 8,
              background: l.color,
              opacity: 0.7,
            }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
