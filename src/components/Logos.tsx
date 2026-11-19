import type { ReactNode } from "react";

export type LogoId = "arc" | "layers" | "hex";
type Mode = "light" | "dark";

export const CONCEPTS: Record<LogoId, { name: string; idea: string; palette: { name: string; hex: string }[]; type: string; feel: string[] }> = {
  arc: {
    name: "Spray Fan",
    idea: "The cone of powder leaving a spray gun, split into three bands like coats of colour. Simple enough to read at a glance on a van, a shirt or a phone screen.",
    palette: [{ name: "Graphite", hex: "#15181D" }, { name: "Flame orange", hex: "#FF5A1F" }, { name: "Steel", hex: "#9AA3AE" }, { name: "Off-white", hex: "#F4F4F1" }],
    type: "Archivo Extended (headings) · Inter (text)",
    feel: ["Confident", "Modern", "Energetic"],
  },
  layers: {
    name: "Coat Layers",
    idea: "An H built from offset layers, the way coats of powder build up on metal. Precise and technical, it speaks to trade and architectural customers.",
    palette: [{ name: "Deep navy", hex: "#0E2A47" }, { name: "Electric teal", hex: "#13B5A6" }, { name: "Mist", hex: "#DCE4EA" }, { name: "White", hex: "#FFFFFF" }],
    type: "Archivo (headings) · Inter (text)",
    feel: ["Precise", "Clean", "Trustworthy"],
  },
  hex: {
    name: "Hex Nut",
    idea: "A hex nut badge: unmistakably industrial, and it stretches naturally to fabrication when that service launches. Bold in black and safety yellow.",
    palette: [{ name: "Black", hex: "#111111" }, { name: "Safety yellow", hex: "#F5B400" }, { name: "Concrete", hex: "#B9B6AE" }, { name: "Paper", hex: "#F7F5F0" }],
    type: "Archivo Extended Black (headings) · Inter (text)",
    feel: ["Tough", "Workshop-ready", "Memorable"],
  },
};

export function LogoIcon({ id, mode = "light", size = 64 }: { id: LogoId; mode?: Mode; size?: number }) {
  if (id === "arc") {
    const bg = mode === "dark" ? "#FF5A1F" : "#15181D";
    const fg = mode === "dark" ? "#15181D" : "#FFFFFF";
    const ac = mode === "dark" ? "#FFFFFF" : "#FF5A1F";
    const cx = 13, cy = 32;
    const pt = (r: number, deg: number) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)].map((v) => v.toFixed(2)).join(" ");
    const band = (a1: number, a2: number, r1 = 9, r2 = 41) => `M ${pt(r1, a1)} L ${pt(r2, a1)} A ${r2} ${r2} 0 0 1 ${pt(r2, a2)} L ${pt(r1, a2)} A ${r1} ${r1} 0 0 0 ${pt(r1, a1)} Z`;
    const dots: [number, number, number][] = [[46, -20, 1.6], [48, -8, 2], [47, 6, 1.7], [45.5, 18, 1.4], [50.5, -14, 1.1], [51, 12, 1.2]];
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Spray Fan logo icon">
        <rect width="64" height="64" rx="14" fill={bg} />
        <rect x="5" y="28.5" width="9" height="7" rx="2" fill={ac} />
        <path d={band(-26, -9.5)} fill={fg} />
        <path d={band(-8, 8)} fill={fg} opacity=".62" />
        <path d={band(9.5, 26)} fill={ac} />
        {dots.map(([r, a, d], k) => { const [x, y] = pt(r, a).split(" ").map(Number); return <circle key={k} cx={x} cy={y} r={d} fill={k % 2 ? ac : fg} opacity=".9" />; })}
      </svg>
    );
  }
  if (id === "layers") {
    const main = mode === "dark" ? "#FFFFFF" : "#0E2A47";
    const teal = "#13B5A6";
    const bg = mode === "dark" ? "#0E2A47" : "#FFFFFF";
    const H = (dx: number, dy: number, fill: string, op = 1, stroke?: string) => (
      <g transform={`translate(${dx} ${dy}) skewX(-8)`} opacity={op}>
        <rect x="15" y="12" width="10" height="38" rx="2" fill={stroke ? "none" : fill} stroke={stroke} strokeWidth={stroke ? 1.6 : 0} />
        <rect x="37" y="12" width="10" height="38" rx="2" fill={stroke ? "none" : fill} stroke={stroke} strokeWidth={stroke ? 1.6 : 0} />
        <rect x="22" y="26.5" width="18" height="9" rx="1.5" fill={stroke ? "none" : fill} stroke={stroke} strokeWidth={stroke ? 1.6 : 0} />
      </g>
    );
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Coat Layers logo icon">
        <rect width="64" height="64" rx="14" fill={bg} stroke={mode === "dark" ? "none" : "#DCE4EA"} />
        {H(9, 6, teal, 1, teal)}
        {H(6.5, 3.5, teal, 0.9)}
        {H(3, 0, main)}
      </svg>
    );
  }
  const black = mode === "dark" ? "#F5B400" : "#111111";
  const yel = mode === "dark" ? "#111111" : "#F5B400";
  const pts = (r: number) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k - Math.PI / 2; return `${(32 + r * Math.cos(a)).toFixed(2)},${(32 + r * Math.sin(a)).toFixed(2)}`; }).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Hex Nut logo icon">
      <polygon points={pts(31)} fill={black} />
      <polygon points={pts(25.5)} fill="none" stroke={yel} strokeWidth="2" />
      <text x="32" y="37.6" textAnchor="middle" fontFamily="Archivo Variable, Inter Variable, sans-serif" fontWeight="900" fontSize="15" fill={mode === "dark" ? "#111111" : "#FFFFFF"} style={{ fontStretch: "125%" }} letterSpacing="0.5">HSR</text>
      <rect x="21" y="42.5" width="22" height="2.2" rx="1.1" fill={yel} />
    </svg>
  );
}

export function LogoLockup({ id, mode = "light", scale = 1, stacked }: { id: LogoId; mode?: Mode; scale?: number; stacked?: boolean }) {
  const s = (n: number) => n * scale;
  const colors = {
    arc: { word: mode === "dark" ? "#FFFFFF" : "#15181D", tag: mode === "dark" ? "#FF8A5C" : "#FF5A1F" },
    layers: { word: mode === "dark" ? "#FFFFFF" : "#0E2A47", tag: "#13B5A6" },
    hex: { word: mode === "dark" ? "#FFFFFF" : "#111111", tag: mode === "dark" ? "#F5B400" : "#8A7400" },
  }[id];
  const tag = id === "hex" ? "Powder Coating · Fabrication" : "Powder Coating";
  return (
    <div className={stacked ? "inline-flex flex-col items-center text-center" : "inline-flex items-center"} style={{ gap: s(12) }}>
      <LogoIcon id={id} mode={mode} size={s(stacked ? 64 : 52)} />
      <div className="leading-none">
        <div style={{ fontFamily: "Archivo Variable, sans-serif", fontWeight: id === "hex" ? 900 : 800, fontStretch: id === "layers" ? "100%" : "125%", fontSize: s(30), letterSpacing: id === "layers" ? "-0.01em" : "0.01em", color: colors.word, lineHeight: 1 }}>
          HSR
        </div>
        <div style={{ fontFamily: "Inter Variable, sans-serif", fontWeight: 600, fontSize: s(10.5), letterSpacing: "0.22em", textTransform: "uppercase", color: colors.tag, marginTop: s(6) }}>{tag}</div>
      </div>
    </div>
  );
}

export function BusinessCard({ id, side }: { id: LogoId; side: "front" | "back" }) {
  const c = CONCEPTS[id].palette;
  const dark = c[0].hex;
  if (side === "front")
    return (
      <Card bg={dark}>
        <div className="h-full flex items-center justify-center"><LogoLockup id={id} mode="dark" scale={0.78} /></div>
      </Card>
    );
  return (
    <Card bg={c[3].hex}>
      <div className="h-full flex flex-col justify-between p-5">
        <LogoIcon id={id} size={30} />
        <div>
          <div className="text-[13px] font-semibold" style={{ color: dark }}>Harshal Gaikar</div>
          <div className="text-[9.5px] uppercase tracking-[0.16em] mt-0.5" style={{ color: c[1].hex === "#F5B400" ? "#8A7400" : c[1].hex }}>Director</div>
          <div className="text-[9.5px] mt-2 leading-[14px]" style={{ color: dark, opacity: 0.75 }}>04XX XXX XXX · hello@hsrpowdercoating.com.au<br />hsrpowdercoating.com.au</div>
        </div>
      </div>
    </Card>
  );
}
function Card({ bg, children }: { bg: string; children: ReactNode }) {
  return <div className="rounded-lg shadow-pop overflow-hidden" style={{ background: bg, width: 252, height: 144 }}>{children}</div>;
}

export function Sign({ id }: { id: LogoId }) {
  const c = CONCEPTS[id].palette;
  return (
    <div className="relative rounded-lg overflow-hidden w-full max-w-[420px] h-[150px]" style={{ background: "repeating-linear-gradient(90deg,#8E949B 0 10px,#A3A9B0 10px 20px)" }}>
      <div className="absolute inset-x-6 top-6 bottom-9 rounded-md shadow-pop flex items-center justify-center" style={{ background: c[0].hex }}>
        <LogoLockup id={id} mode="dark" scale={0.85} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-5 bg-black/25" />
    </div>
  );
}
