import { RefreshCw, CheckCircle2, Send } from "lucide-react";
import { Card, Kpi, PageHead, Pill, statusTone, Button } from "../../components/ui";
import { useStore, aud } from "../../state/store";

export default function Invoices() {
  const { invoices, markPaid, toast } = useStore();
  const owed = invoices.filter((i) => i.status !== "Paid").reduce((a, i) => a + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((a, i) => a + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "Paid").reduce((a, i) => a + i.amount, 0);
  return (
    <>
      <PageHead title="Invoices" sub="Created from finished jobs, sent to customers and synced to Xero automatically." />
      <div data-tour="xero-banner" className="rounded-xl border border-[#13B5EA]/30 bg-[#13B5EA]/[0.07] p-4 mb-4 flex flex-wrap items-center gap-4">
        <span className="w-10 h-10 rounded-full bg-[#13B5EA] text-white inline-flex items-center justify-center text-[11px] font-bold">xero</span>
        <div className="flex-1 min-w-[220px]">
          <div className="text-sm font-semibold">Connected to Xero</div>
          <div className="text-xs text-ink-3">Invoices, customers and payments sync both ways. Last sync 2 minutes ago. GST coded for BAS.</div>
        </div>
        <Button size="sm" onClick={() => toast("Synced with Xero. 0 changes.")}><RefreshCw size={13} /> Sync now</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <Kpi accent label="Owed to you" value={aud(owed)} foot="incl. GST" />
        <Kpi label="Overdue" value={aud(overdue)} foot="reminder SMS scheduled" />
        <Kpi label="Paid this month" value={aud(paid)} foot="matched in Xero" />
      </div>
      <Card pad={false}>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[820px]">
            <thead><tr><th>Invoice</th><th>Customer</th><th>Job</th><th>Issued</th><th>Due</th><th className="text-right">Amount inc. GST</th><th>Status</th><th>Xero</th><th /></tr></thead>
            <tbody>{invoices.map((i) => (
              <tr key={i.id}>
                <td className="font-mono text-xs">{i.id}</td>
                <td className="font-semibold">{i.customer}</td>
                <td className="font-mono text-xs text-ink-3">{i.job}</td>
                <td className="text-sm text-ink-3">{i.date}</td>
                <td className="text-sm text-ink-3">{i.due}</td>
                <td className="text-right tnum font-semibold">{aud(i.amount, 2)}</td>
                <td><Pill tone={statusTone(i.status)}>{i.status}</Pill></td>
                <td><span className="inline-flex items-center gap-1 text-xs text-good"><CheckCircle2 size={13} /> {i.xero}</span></td>
                <td className="text-right whitespace-nowrap">
                  {i.status !== "Paid" && (
                    <>
                      <button onClick={() => toast(`Reminder sent to ${i.customer}.`)} className="p-1.5 rounded hover:bg-steel-100 text-ink-4" title="Send reminder"><Send size={14} /></button>
                      <button onClick={() => { markPaid(i.id); toast(`${i.id} marked paid and updated in Xero.`); }} className="ml-1 h-7 px-2.5 rounded-md border border-line-3 text-xs hover:bg-steel-50">Mark paid</button>
                    </>
                  )}
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
