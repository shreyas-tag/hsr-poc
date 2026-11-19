import { useState } from "react";
import { ScanLine, ArrowRight, MessageSquare } from "lucide-react";
import { Pill, statusTone, cx } from "../../components/ui";
import { useStore } from "../../state/store";
import { STAGES, colourHex, type Stage } from "../../data/seed";

const FLOOR: Stage[] = ["Received", "Pre-treatment", "Coating", "Curing", "Quality check"];

export default function Floor() {
  const { jobs, nextStage, toast } = useStore();
  const [stage, setStage] = useState<Stage | "All">("All");
  const list = jobs.filter((j) => FLOOR.includes(j.stage) && (stage === "All" || j.stage === stage));
  return (
    <div className="rounded-2xl bg-steel-950 text-white p-4 sm:p-6 -m-1 min-h-[70vh]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="eyebrow text-flame">Shop-floor mode · tablet</div>
          <div className="display text-[26px] font-bold mt-1">Jobs on the floor</div>
        </div>
        <button onClick={() => toast("Camera opened: scan a job tag QR code.")} className="h-14 px-6 rounded-xl bg-flame text-white text-base font-semibold inline-flex items-center gap-2.5"><ScanLine size={22} /> Scan job tag</button>
      </div>
      <div className="flex gap-2 mt-5 overflow-x-auto pb-1">
        {(["All", ...FLOOR] as const).map((s) => (
          <button key={s} onClick={() => setStage(s)} className={cx("h-11 px-4 rounded-lg text-sm font-medium whitespace-nowrap", stage === s ? "bg-white text-ink" : "bg-white/10 text-white/70")}>{s} {s !== "All" && <span className="opacity-60 ml-1">{jobs.filter((j) => j.stage === s).length}</span>}</button>
        ))}
      </div>
      <div data-tour="floor-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-5">
        {list.map((j) => {
          const nxt = STAGES[STAGES.indexOf(j.stage) + 1];
          return (
            <div key={j.id} className="rounded-2xl bg-steel-850 border border-white/10 overflow-hidden">
              <div className="h-2" style={{ background: colourHex(j.colour) }} />
              <div className="p-5">
                <div className="flex items-center justify-between"><span className="display text-[22px] font-bold">{j.id}</span><Pill tone={statusTone(j.stage)}>{j.stage}</Pill></div>
                <div className="text-white/80 mt-1">{j.company ?? j.customer}</div>
                <div className="text-sm text-white/50 mt-0.5">{j.qty} × {j.items}</div>
                <div className="flex items-center gap-2 mt-3 text-sm"><span className="w-5 h-5 rounded ring-1 ring-white/20" style={{ background: colourHex(j.colour) }} />{j.colour} {j.finish} · {j.brand}</div>
                <button onClick={() => { nextStage(j.id); toast(nxt === "Ready" ? `${j.id} ready. SMS sent to ${j.customer}.` : `${j.id} → ${nxt}`); }} className="mt-5 w-full h-14 rounded-xl bg-white text-ink text-base font-semibold inline-flex items-center justify-center gap-2 active:scale-[.98]">
                  Move to {nxt} <ArrowRight size={18} />
                </button>
                {j.stage === "Quality check" && <div className="text-2xs text-white/45 mt-2 flex items-center gap-1.5"><MessageSquare size={11} /> Customer gets an SMS automatically when marked Ready</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
