import { useState } from "react";
import { Flame, Layers, Play, CheckCircle2, Ruler, Info } from "lucide-react";
import { Card, PageHead, Pill, statusTone, Swatch, Button, cx } from "../../components/ui";
import { useStore } from "../../state/store";
import { colourHex } from "../../data/seed";

export default function Batching() {
  const { jobs, loads, createLoad, startLoad, finishLoad, toast } = useStore();
  const waiting = jobs.filter((j) => !j.load && (j.stage === "Received" || j.stage === "Pre-treatment" || j.stage === "Coating"));
  const groups = Object.values(
    waiting.reduce<Record<string, { colour: string; finish: string; jobs: typeof waiting }>>((a, j) => {
      const k = `${j.colour}|${j.finish}`;
      (a[k] ??= { colour: j.colour, finish: j.finish, jobs: [] }).jobs.push(j);
      return a;
    }, {})
  ).sort((a, b) => b.jobs.reduce((s, j) => s + j.space, 0) - a.jobs.reduce((s, j) => s + j.space, 0));
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const space = (ids: string[]) => jobs.filter((j) => ids.includes(j.id)).reduce((a, j) => a + j.space, 0);

  return (
    <>
      <PageHead title="Colour batching" sub="Group jobs by colour and finish to fill each oven load with one colour, cutting colour changes and wasted powder." />
      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_1fr] gap-4">
        <div data-tour="batch-groups" className="space-y-3">
          <div className="flex items-center justify-between"><div className="text-sm font-semibold">Waiting to coat, by colour</div><span className="text-xs text-ink-4">{waiting.length} jobs · {groups.length} colours</span></div>
          {groups.map((g) => {
            const ids = g.jobs.map((j) => j.id);
            const chosen = ids.filter((i) => sel[i] ?? true);
            const pct = space(chosen);
            return (
              <Card key={g.colour + g.finish} pad={false} className="overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-14 h-14 rounded-xl ring-1 ring-black/10 shrink-0" style={{ background: `linear-gradient(140deg, rgba(255,255,255,.2), rgba(0,0,0,.15)), ${colourHex(g.colour)}` }} />
                  <div className="flex-1 min-w-0">
                    <div className="display text-[18px] font-bold">{g.colour} <span className="text-ink-4 font-semibold">{g.finish}</span></div>
                    <div className="text-xs text-ink-4">{g.jobs.length} job{g.jobs.length > 1 ? "s" : ""} · cure {g.finish === "Texture" ? "200 °C · 10 min" : g.finish === "Metallic" ? "190 °C · 12 min" : "180 °C · 15 min"}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-steel-100 overflow-hidden"><div className={cx("h-full rounded-full", pct > 100 ? "bg-crit" : pct >= 70 ? "bg-good" : "bg-warn")} style={{ width: `${Math.min(100, pct)}%` }} /></div>
                      <span className="text-2xs tnum text-ink-3 w-24 text-right">{pct}% of a load</span>
                    </div>
                  </div>
                  <Button variant={pct >= 70 ? "flame" : "secondary"} size="sm" disabled={!chosen.length || pct > 100} onClick={() => { const id = createLoad(chosen, g.colour, g.finish); toast(`${id} planned: ${g.colour} ${g.finish}, ${chosen.length} job${chosen.length > 1 ? "s" : ""}.`); }}>
                    <Layers size={14} /> Create load
                  </Button>
                </div>
                <div className="border-t border-line-2 divide-y divide-line-2">
                  {g.jobs.map((j) => (
                    <label key={j.id} className="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer hover:bg-steel-50">
                      <input type="checkbox" checked={sel[j.id] ?? true} onChange={() => setSel({ ...sel, [j.id]: !(sel[j.id] ?? true) })} className="w-4 h-4 accent-[#FF5A1F]" />
                      <span className="font-mono text-2xs text-ink-4 w-16">{j.id}</span>
                      <span className="flex-1 min-w-0 truncate"><b className="font-semibold">{j.company ?? j.customer}</b> <span className="text-ink-4">· {j.qty} × {j.items}</span></span>
                      <Pill tone={statusTone(j.stage)}>{j.stage}</Pill>
                      <span className="text-2xs text-ink-4 w-10 text-right tnum">{j.space}%</span>
                    </label>
                  ))}
                </div>
              </Card>
            );
          })}
          {!groups.length && <Card className="text-sm text-ink-4">Nothing waiting to coat.</Card>}
        </div>

        <div className="space-y-3">
          <Card className="bg-steel-950 border-steel-950 text-white">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-flame/15 text-flame inline-flex items-center justify-center"><Ruler size={19} /></span>
              <div><div className="text-2xs text-white/50 uppercase tracking-wider">Oven capacity</div><div className="display text-[20px] font-bold tnum">7.0 × 3.0 × 3.0 m</div></div>
            </div>
            <p className="text-xs text-white/50 mt-3 flex gap-1.5"><Info size={13} className="shrink-0 mt-px" /> "% of a load" is estimated from each job's size when it's booked in. Adjustable per job.</p>
          </Card>
          <div data-tour="batch-loads" className="space-y-3">
            <div className="text-sm font-semibold">Oven loads</div>
            {loads.map((l) => {
              const pct = space(l.jobs);
              return (
                <Card key={l.id} className={cx(l.status === "In oven" && "ring-2 ring-flame/40")}>
                  <div className="flex items-center gap-3">
                    <Swatch hex={colourHex(l.colour)} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2"><span className="font-semibold">{l.colour} {l.finish}</span><Pill tone={statusTone(l.status)}>{l.status}</Pill></div>
                      <div className="text-xs text-ink-4">{l.id} · {l.cure}{l.start && ` · started ${l.start}`}</div>
                    </div>
                    {l.status === "Planned" && <Button size="sm" variant="flame" onClick={() => { startLoad(l.id); toast(`${l.id} is in the oven. Jobs moved to Curing.`); }}><Play size={13} /> Start</Button>}
                    {l.status === "In oven" && <Button size="sm" onClick={() => { finishLoad(l.id); toast(`${l.id} done. Jobs moved to Quality check.`); }}><CheckCircle2 size={13} /> Done</Button>}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-steel-100 overflow-hidden"><div className="h-full rounded-full bg-ink" style={{ width: `${Math.min(100, pct)}%` }} /></div>
                    <span className="text-2xs text-ink-4 tnum">{pct}% full</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {l.jobs.map((id) => { const j = jobs.find((x) => x.id === id); return <span key={id} className="text-2xs px-2 py-1 rounded-md bg-steel-100">{id} · {j?.company ?? j?.customer}</span>; })}
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-4 px-1"><Flame size={13} className="text-flame" /> Tip: run light colours before dark ones on the same day to keep cleaning between colours quick.</div>
        </div>
      </div>
    </>
  );
}
