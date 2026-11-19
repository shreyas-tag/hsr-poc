import { useEffect, type ButtonHTMLAttributes, type ReactNode } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useStore } from "../state/store";

export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "flame" | "secondary" | "ghost" | "dark" | "outline-light"; size?: "sm" | "md" | "lg" };
export function Button({ variant = "secondary", size = "md", className, children, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap select-none active:scale-[.98]",
        size === "sm" && "h-8 px-3 text-xs",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-[15px]",
        variant === "primary" && "bg-ink text-white hover:bg-steel-700",
        variant === "flame" && "bg-flame text-white hover:bg-flame-600 shadow-[0_8px_20px_-8px_rgba(255,90,31,.7)]",
        variant === "secondary" && "bg-white text-ink border border-line-3 hover:border-ink-4 hover:bg-steel-50",
        variant === "ghost" && "text-ink-2 hover:bg-steel-100",
        variant === "dark" && "bg-steel-800 text-white hover:bg-steel-700 border border-white/10",
        variant === "outline-light" && "border border-white/25 text-white hover:bg-white/10",
        className
      )}
    >
      {children}
    </button>
  );
}

export type Tone = "neutral" | "good" | "warn" | "crit" | "info" | "flame" | "dark";
const tones: Record<Tone, string> = {
  neutral: "bg-steel-100 text-ink-2",
  good: "bg-good-bg text-good",
  warn: "bg-warn-bg text-warn",
  crit: "bg-crit-bg text-crit",
  info: "bg-info-bg text-info",
  flame: "bg-flame-100 text-flame-700",
  dark: "bg-ink text-white",
};
export function Pill({ tone = "neutral", children, dot = true, className }: { tone?: Tone; children: ReactNode; dot?: boolean; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2 h-[22px] text-2xs font-medium whitespace-nowrap", tones[tone], className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  );
}
export const statusTone = (s: string): Tone =>
  (({
    New: "flame", Contacted: "info", Quoted: "warn", Won: "good", Lost: "neutral",
    Draft: "neutral", Sent: "info", Accepted: "good", Declined: "neutral",
    Received: "neutral", "Pre-treatment": "info", Coating: "flame", Curing: "warn", "Quality check": "info", Ready: "good", Collected: "neutral",
    Paid: "good", "Awaiting payment": "warn", Overdue: "crit", Synced: "good", Pending: "warn",
    Planned: "neutral", "In oven": "flame", Done: "good",
  }) as Record<string, Tone>)[s] ?? "neutral";

export function Card({ children, className, pad = true, ...rest }: { children: ReactNode; className?: string; pad?: boolean } & React.HTMLAttributes<HTMLElement>) {
  return <section {...rest} className={cx("bg-panel border border-line rounded-xl shadow-card min-w-0", pad && "p-5", className)}>{children}</section>;
}
export function CardHead({ title, sub, right, className }: { title: ReactNode; sub?: ReactNode; right?: ReactNode; className?: string }) {
  return (
    <div className={cx("flex items-start justify-between gap-3 mb-4", className)}>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {sub && <p className="text-xs text-ink-4 mt-0.5">{sub}</p>}
      </div>
      {right && <div className="shrink-0 flex items-center gap-2">{right}</div>}
    </div>
  );
}
export function Kpi({ label, value, foot, accent, icon }: { label: string; value: ReactNode; foot?: ReactNode; accent?: boolean; icon?: ReactNode }) {
  return (
    <div className={cx("rounded-xl border p-4 min-w-0", accent ? "bg-ink text-white border-ink" : "bg-panel border-line shadow-card")}>
      <div className={cx("flex items-center justify-between text-xs", accent ? "text-white/60" : "text-ink-4")}>
        <span>{label}</span>
        {icon}
      </div>
      <div className="display text-[28px] leading-9 font-bold tnum mt-1.5">{value}</div>
      {foot && <div className={cx("text-2xs mt-1", accent ? "text-white/50" : "text-ink-4")}>{foot}</div>}
    </div>
  );
}

export function Modal({ open, onClose, title, children, width = 640, footer }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; width?: number; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-steel-950/50 backdrop-blur-[2px] anim-fade" onClick={onClose} />
      <div role="dialog" aria-modal className="relative bg-white rounded-2xl shadow-pop w-full anim-up flex flex-col max-h-[calc(100vh-24px)]" style={{ maxWidth: width }}>
        <header className="flex items-center justify-between px-5 h-14 border-b border-line shrink-0">
          <div className="text-[15px] font-semibold">{title}</div>
          <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-md hover:bg-steel-100 text-ink-3"><X size={18} /></button>
        </header>
        <div className="p-5 overflow-y-auto scroll-thin">{children}</div>
        {footer && <footer className="px-5 py-3.5 border-t border-line flex justify-end gap-2 shrink-0">{footer}</footer>}
      </div>
    </div>
  );
}

export function Drawer({ open, onClose, title, children, width = 560, footer }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; width?: number; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-steel-950/40 anim-fade" onClick={onClose} />
      <aside role="dialog" aria-modal className="absolute right-0 top-0 h-full w-full bg-white shadow-pop anim-slide flex flex-col" style={{ maxWidth: width }}>
        <header className="h-16 px-5 flex items-center justify-between border-b border-line shrink-0">
          <div className="min-w-0">{title}</div>
          <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-md hover:bg-steel-100 text-ink-3"><X size={18} /></button>
        </header>
        <div className="flex-1 overflow-y-auto scroll-thin" data-tour="drawer">{children}</div>
        {footer && <footer className="px-5 py-3.5 border-t border-line flex flex-wrap justify-end gap-2 shrink-0 bg-steel-50">{footer}</footer>}
      </aside>
    </div>
  );
}

export function Field({ label, children, hint, className }: { label: string; children: ReactNode; hint?: string; className?: string }) {
  return (
    <label className={cx("block", className)}>
      <span className="block text-xs font-medium text-ink-2 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-2xs text-ink-4 mt-1">{hint}</span>}
    </label>
  );
}

export function Avatar({ name, size = 28, dark }: { name: string; size?: number; dark?: boolean }) {
  const ini = name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  return (
    <span style={{ width: size, height: size, fontSize: Math.max(10, size * 0.38) }} className={cx("inline-flex items-center justify-center rounded-full font-semibold shrink-0", dark ? "bg-steel-700 text-white" : "bg-steel-100 text-ink-2")}>
      {ini}
    </span>
  );
}

export function Segmented<T extends string>({ value, onChange, options, className }: { value: T; onChange: (v: T) => void; options: { value: T; label: ReactNode }[]; className?: string }) {
  return (
    <div className={cx("inline-flex p-1 bg-steel-100 rounded-lg", className)}>
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} className={cx("h-8 px-3 text-xs rounded-md transition-all", value === o.value ? "bg-white shadow-card font-semibold text-ink" : "text-ink-3 hover:text-ink")}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="fixed z-[90] bottom-5 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center pointer-events-none w-[min(92vw,460px)]">
      {toasts.map((t) => (
        <div key={t.id} className="anim-up pointer-events-auto bg-ink text-white text-sm rounded-xl px-4 py-3 shadow-pop flex items-center gap-2.5 w-full">
          <CheckCircle2 size={17} className="text-flame shrink-0" /> {t.text}
        </div>
      ))}
    </div>
  );
}

export function PageHead({ title, sub, right, eyebrow }: { title: string; sub?: ReactNode; right?: ReactNode; eyebrow?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        {eyebrow && <div className="eyebrow text-flame mb-1.5">{eyebrow}</div>}
        <h1 className="display text-[26px] leading-8 font-bold text-ink">{title}</h1>
        {sub && <p className="text-sm text-ink-3 mt-1 max-w-[70ch]">{sub}</p>}
      </div>
      {right && <div className="flex flex-wrap items-center gap-2">{right}</div>}
    </div>
  );
}

export function Swatch({ hex, size = 18, className }: { hex: string; size?: number; className?: string }) {
  return <span className={cx("inline-block rounded-[5px] ring-1 ring-black/10 shrink-0", className)} style={{ width: size, height: size, background: hex }} />;
}

/** Plain text name used until the logo is chosen. Clearly a placeholder. */
export function Wordmark({ dark, compact }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={cx("display-wide font-extrabold tracking-tight leading-none", compact ? "text-[17px]" : "text-[19px]", dark ? "text-white" : "text-ink")}>
        HSR<span className="text-flame">.</span>
      </span>
      <span className={cx("hidden sm:block leading-[1.05] text-[10px] font-semibold uppercase tracking-[0.18em]", dark ? "text-white/70" : "text-ink-3")}>
        Powder<br />Coating
      </span>
      <span className={cx("hidden md:inline-flex text-[9px] uppercase tracking-wider rounded px-1.5 py-0.5 border", dark ? "border-white/20 text-white/45" : "border-line-3 text-ink-4")}>Logo placeholder</span>
    </span>
  );
}
