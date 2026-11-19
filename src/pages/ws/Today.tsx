import { Link, useNavigate } from "react-router-dom";
import { Flame, MessageSquare, ArrowRight, KanbanSquare, CalendarClock, PackageCheck, Wallet, Inbox, Timer } from "lucide-react";
import { Card, CardHead, Kpi, PageHead, Pill, statusTone, Swatch, Button } from "../../components/ui";
import { useStore, aud } from "../../state/store";
import { STAGES, colourHex } from "../../data/seed";

export default function Today() {
  const { jobs, loads, invoices, enquiries, toast } = useStore();
  const nav = useNavigate();
  const active = jobs.filter((j) => j.stage !== "Collected");
  const due = active.filter((j) => j.dueSoon || j.due.startsWith("Thu 20") || j.due.startsWith("Fri 21")).filter((j) => j.stage !== "Ready");
  const ready = jobs.filter((j) => j.stage === "Ready");
  const owed = invoices.filter((i) => i.status !== "Paid").reduce((a, i) => a + i.amount, 0);
  const inOven = loads.find((l) => l.status === "In oven");
  const newEnq = enquiries.filter((e) => e.status === "New");
  return (
    <>
      <PageHead eyebrow="Thursday 19 November" title="Today in the workshop" right={<Button variant="secondary" onClick={() => nav("/ws/jobs")}><KanbanSquare size={15} /> Jobs board</Button>} />
      <div data-tour="today-kpis" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi accent label="Active jobs" value={active.length} foot={`${aud(active.reduce((a, j) => a + j.value, 0))} of work in progress (ex GST)`} icon={<KanbanSquare size={16} />} />
        <Kpi label="Due in the next 2 days" value={due.length} foot="not yet ready" icon={<CalendarClock size={16} className="text-ink-4" />} />
        <Kpi label="Ready to collect" value={ready.length} foot="customers notified by SMS" icon={<PackageCheck size={16} className="text-ink-4" />} />
        <Kpi label="Owed to you" value={aud(owed)} foot={`${invoices.filter((i) => i.status === "Overdue").length} invoice overdue · incl. GST`} icon={<Wallet size={16} className="text-ink-4" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4 mt-4">
        <div data-tour="today-due" className="space-y-4">
          <Card pad={false}>
            <div className="px-5 py-4 border-b border-line flex items-center justify-between"><div className="text-sm font-semibold">Due soon</div><Pill tone="warn" dot={false}>{due.length} jobs</Pill></div>
            <div className="divide-y divide-line-2">
              {due.map((j) => (
                <div key={j.id} className="px-5 py-3 flex items-center gap-3">
                  <Swatch hex={colourHex(j.colour)} size={30} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{j.company ?? j.customer} <span className="font-mono text-2xs text-ink-4 font-normal">{j.id}</span></div>
                    <div className="text-xs text-ink-4 truncate">{j.qty} × {j.items} · {j.colour} {j.finish}</div>
                  </div>
                  <div className="text-right shrink-0"><Pill tone={statusTone(j.stage)}>{j.stage}</Pill><div className="text-2xs text-crit font-medium mt-1">Due {j.due}</div></div>
                </div>
              ))}
            </div>
          </Card>
          <Card pad={false}>
            <div className="px-5 py-4 border-b border-line flex items-center justify-between"><div className="text-sm font-semibold">Ready to collect</div><Pill tone="good" dot={false}>{ready.length} jobs</Pill></div>
            <div className="divide-y divide-line-2">
              {ready.map((j) => (
                <div key={j.id} className="px-5 py-3 flex items-center gap-3">
                  <Swatch hex={colourHex(j.colour)} size={30} />
                  <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate">{j.company ?? j.customer}</div><div className="text-xs text-ink-4 truncate">{j.qty} × {j.items}</div></div>
                  <Button size="sm" onClick={() => toast(`Reminder SMS sent to ${j.customer}.`)}><MessageSquare size={13} /> Remind</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card data-tour="today-oven" className="bg-steel-950 border-steel-950 text-white">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold flex items-center gap-2"><Flame size={16} className="text-flame" /> Oven now</div>
              {inOven && <Pill tone="flame">In oven</Pill>}
            </div>
            {inOven ? (
              <>
                <div className="flex items-center gap-3 mt-4">
                  <Swatch hex={colourHex(inOven.colour)} size={40} className="ring-white/20" />
                  <div><div className="display text-[22px] font-bold">{inOven.colour} {inOven.finish}</div><div className="text-xs text-white/50">{inOven.id} · {inOven.cure} · started {inOven.start}</div></div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-flame rounded-full" style={{ width: "62%" }} /></div>
                <div className="flex justify-between text-2xs text-white/50 mt-1.5"><span className="inline-flex items-center gap-1"><Timer size={11} /> 4 min left</span><span>{inOven.jobs.length} job</span></div>
              </>
            ) : <div className="text-sm text-white/50 mt-3">Oven is free.</div>}
            <Link to="/ws/batching" className="mt-5 h-9 px-3 rounded-md bg-white/10 hover:bg-white/15 text-sm inline-flex items-center gap-1.5">Plan next loads <ArrowRight size={14} /></Link>
          </Card>
          <Card>
            <CardHead title="Jobs by stage" />
            <div className="space-y-2.5">
              {STAGES.slice(0, 6).map((s) => {
                const n = jobs.filter((j) => j.stage === s).length;
                return (
                  <div key={s} className="flex items-center gap-3 text-sm">
                    <span className="w-28 text-ink-3 text-xs">{s}</span>
                    <div className="flex-1 h-2 rounded-full bg-steel-100 overflow-hidden"><div className="h-full rounded-full bg-ink" style={{ width: `${(n / Math.max(1, active.length)) * 100}%` }} /></div>
                    <span className="w-5 text-right tnum text-xs font-semibold">{n}</span>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card>
            <CardHead title="New website enquiries" right={<Link to="/cms/enquiries" className="text-xs font-semibold text-flame">Open inbox</Link>} />
            {newEnq.map((e) => (
              <Link key={e.id} to={`/cms/enquiries?open=${e.id}`} className="flex items-center gap-3 py-2 border-t border-line-2 first:border-t-0">
                <Inbox size={15} className="text-flame" />
                <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{e.name}</div><div className="text-2xs text-ink-4 truncate">{e.items[0].qty} × {e.items[0].desc}</div></div>
                <span className="text-2xs text-ink-4">{e.received}</span>
              </Link>
            ))}
            {!newEnq.length && <div className="text-xs text-ink-4">All caught up.</div>}
          </Card>
        </div>
      </div>
    </>
  );
}
