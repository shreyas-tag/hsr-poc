import { useState } from "react";
import { Search, Building2, User } from "lucide-react";
import { Card, PageHead, Pill, Button, Drawer, cx } from "../../components/ui";
import { useStore, aud } from "../../state/store";

export default function Customers() {
  const { customers, jobs, toast } = useStore();
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = customers.filter((c) => (f === "All" || (f === "Trade accounts" ? c.trade : !c.trade)) && `${c.name} ${c.company ?? ""} ${c.suburb}`.toLowerCase().includes(q.toLowerCase()));
  const c = customers.find((x) => x.name === open);
  const cj = c ? jobs.filter((j) => j.customer === c.name || j.company === c.company || j.company === c.name) : [];
  return (
    <>
      <PageHead title="Customers" sub={`${customers.length} customers · ${customers.filter((x) => x.trade).length} trade accounts`} />
      <Card pad={false}>
        <div className="p-3 sm:p-4 flex flex-wrap gap-3 items-center border-b border-line">
          <div className="flex gap-1">{["All", "Trade accounts", "Retail"].map((s) => <button key={s} onClick={() => setF(s)} className={cx("h-8 px-3 rounded-full text-xs border", f === s ? "bg-ink text-white border-ink" : "border-line-3 text-ink-3")}>{s}</button>)}</div>
          <div className="ml-auto flex items-center gap-2 h-9 px-3 rounded-md border border-line-3 w-full sm:w-64"><Search size={14} className="text-ink-4" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" className="flex-1 outline-none text-sm bg-transparent" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[820px]">
            <thead><tr><th>Customer</th><th>Type</th><th>Contact</th><th>Terms</th><th className="text-right">Jobs</th><th className="text-right">Spend (ex GST)</th><th>Last job</th></tr></thead>
            <tbody>{list.map((x) => (
              <tr key={x.name} onClick={() => setOpen(x.name)} className="cursor-pointer">
                <td><div className="flex items-center gap-2.5"><span className="w-8 h-8 rounded-lg bg-steel-100 inline-flex items-center justify-center text-ink-3">{x.trade ? <Building2 size={15} /> : <User size={15} />}</span><div><div className="font-semibold">{x.company ?? x.name}</div>{x.company && x.company !== x.name && <div className="text-xs text-ink-4">{x.name}</div>}</div></div></td>
                <td><span className="text-sm">{x.type}</span> {x.trade && <Pill tone="info" dot={false} className="ml-1">Trade</Pill>}</td>
                <td className="text-xs text-ink-3"><div>{x.phone}</div><div>{x.email}</div></td>
                <td className="text-sm">{x.terms}</td>
                <td className="text-right tnum">{x.jobs}</td>
                <td className="text-right tnum font-medium">{aud(x.spend)}</td>
                <td className="text-sm text-ink-3">{x.last}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
      <Drawer open={!!c} onClose={() => setOpen(null)} title={c && <div><div className="font-semibold">{c.company ?? c.name}</div><div className="text-xs text-ink-4">{c.suburb} · {c.terms}</div></div>} footer={<Button variant="flame" onClick={() => toast("SMS sent.")}>Send SMS</Button>}>
        {c && (
          <div className="p-5 space-y-5">
            <div className="grid grid-cols-3 gap-2">
              {[["Jobs", String(c.jobs)], ["Spend", aud(c.spend)], ["Terms", c.terms]].map(([k, v]) => <div key={k} className="rounded-lg bg-steel-50 p-3"><div className="text-2xs text-ink-4">{k}</div><div className="font-semibold">{v}</div></div>)}
            </div>
            <div className="text-sm space-y-1"><div>{c.name}</div><div className="text-ink-3">{c.phone}</div><div className="text-ink-3">{c.email}</div></div>
            <div>
              <div className="text-xs font-semibold text-ink-3 uppercase tracking-wider mb-2">Jobs</div>
              {cj.map((j) => <div key={j.id} className="flex justify-between py-2 border-t border-line-2 text-sm"><span><span className="font-mono text-2xs text-ink-4 mr-2">{j.id}</span>{j.qty} × {j.items}</span><Pill>{j.stage}</Pill></div>)}
              {!cj.length && <div className="text-xs text-ink-4">History from earlier jobs appears here.</div>}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
