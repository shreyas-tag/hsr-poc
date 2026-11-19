import { useState } from "react";
import { CalendarDays, AlertTriangle } from "lucide-react";
import { PageHead, Pill, statusTone, Swatch, Segmented, Card, cx } from "../../components/ui";
import { useStore, aud } from "../../state/store";
import { STAGES, colourHex } from "../../data/seed";
import { JobDrawer } from "./JobDrawer";

export default function Jobs() {
  const { jobs } = useStore();
  const [view, setView] = useState<"board" | "list">("board");
  const [open, setOpen] = useState<string | null>(null);
  const [type, setType] = useState("All");
  const list = jobs.filter((j) => type === "All" || j.type === type);
  let firstSet = false;
  return (
    <>
      <PageHead title="Jobs" sub={`${jobs.filter((j) => j.stage !== "Collected").length} active jobs. Click a job to open its job card.`} right={<>
        <select className="input w-auto h-9 text-sm" value={type} onChange={(e) => setType(e.target.value)}>{["All", "Trade", "Automotive", "Landscaping", "Custom"].map((t) => <option key={t}>{t}</option>)}</select>
        <Segmented value={view} onChange={setView} options={[{ value: "board", label: "Board" }, { value: "list", label: "List" }]} />
      </>} />
      {view === "board" ? (
        <div data-tour="jobs-board" className="flex gap-3 overflow-x-auto pb-4 scroll-thin -mx-1 px-1">
          {STAGES.map((s) => {
            const col = list.filter((j) => j.stage === s);
            return (
              <div key={s} className="w-[268px] shrink-0 rounded-xl bg-steel-100/70 border border-line">
                <div className="px-3 h-11 flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-2 flex items-center gap-2"><span className={cx("w-2 h-2 rounded-full", s === "Ready" ? "bg-good" : s === "Coating" ? "bg-flame" : s === "Curing" ? "bg-warn" : "bg-ink-5")} />{s}</span>
                  <span className="text-2xs text-ink-4 tnum">{col.length}</span>
                </div>
                <div className="p-2 pt-0 space-y-2 min-h-[120px]">
                  {col.map((j) => {
                    const tour = !firstSet && s !== "Received" ? (firstSet = true, "job-card-first") : undefined;
                    return (
                      <button key={j.id} data-tour={tour} onClick={() => setOpen(j.id)} className="w-full text-left rounded-lg bg-white border border-line shadow-card hover:shadow-pop hover:-translate-y-0.5 transition-all overflow-hidden">
                        <div className="h-1.5" style={{ background: colourHex(j.colour) }} />
                        <div className="p-3">
                          <div className="flex items-center justify-between"><span className="font-mono text-2xs text-ink-4">{j.id}</span><span className="text-[10px] px-1.5 py-0.5 rounded bg-steel-100 text-ink-3">{j.type}</span></div>
                          <div className="text-sm font-semibold mt-1.5 leading-5">{j.company ?? j.customer}</div>
                          <div className="text-xs text-ink-4 mt-0.5 line-clamp-2">{j.qty} × {j.items}</div>
                          <div className="flex items-center gap-1.5 mt-2.5 text-xs"><Swatch hex={colourHex(j.colour)} size={14} />{j.colour} <span className="text-ink-4">{j.finish}</span></div>
                          <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-line-2 text-2xs">
                            <span className={cx("inline-flex items-center gap-1", j.dueSoon ? "text-crit font-semibold" : "text-ink-4")}>{j.dueSoon ? <AlertTriangle size={11} /> : <CalendarDays size={11} />} {j.due}</span>
                            <span className="tnum text-ink-3 font-medium">{aud(j.value)}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card pad={false} data-tour="jobs-board">
          <div className="overflow-x-auto">
            <table className="tbl min-w-[860px]">
              <thead><tr><th>Job</th><th>Customer</th><th>Items</th><th>Colour</th><th>Stage</th><th>Due</th><th className="text-right">Value</th></tr></thead>
              <tbody>{list.map((j) => (
                <tr key={j.id} onClick={() => setOpen(j.id)} className="cursor-pointer">
                  <td className="font-mono text-xs">{j.id}</td><td className="font-semibold">{j.company ?? j.customer}</td><td className="text-sm text-ink-3">{j.qty} × {j.items}</td>
                  <td><span className="inline-flex items-center gap-1.5 text-sm"><Swatch hex={colourHex(j.colour)} size={14} />{j.colour} {j.finish}</span></td>
                  <td><Pill tone={statusTone(j.stage)}>{j.stage}</Pill></td><td className={cx("text-sm", j.dueSoon && "text-crit font-semibold")}>{j.due}</td><td className="text-right tnum">{aud(j.value)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Card>
      )}
      <JobDrawer id={open} onClose={() => setOpen(null)} />
    </>
  );
}
