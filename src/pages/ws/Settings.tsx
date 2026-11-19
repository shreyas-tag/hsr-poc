import { useState } from "react";
import { Check, X, Plug, GripVertical, Plus } from "lucide-react";
import { Card, PageHead, Segmented, Avatar, Pill, Button } from "../../components/ui";
import { useStore, aud } from "../../state/store";
import { PRICE_LIST, STAGES } from "../../data/seed";

export default function WsSettings() {
  const [tab, setTab] = useState<"users" | "prices" | "stages" | "sms" | "integrations">("users");
  const { toast } = useStore();
  return (
    <>
      <PageHead title="Settings" sub="Set up once to match how you work. Changeable any time." />
      <Segmented className="mb-4" value={tab} onChange={setTab} options={[{ value: "users", label: "Users" }, { value: "prices", label: "Price list" }, { value: "stages", label: "Job stages" }, { value: "sms", label: "SMS templates" }, { value: "integrations", label: "Integrations" }]} />
      {tab === "users" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center justify-between mb-4"><div className="text-sm font-semibold">Users</div><Button size="sm" onClick={() => toast("Invite sent.")}><Plus size={13} /> Add user</Button></div>
            {[{ n: "Harshal Gaikar", r: "Owner", d: "Everything, including prices, invoices and settings" }, { n: "Workshop staff", r: "Shop floor (optional)", d: "Jobs board and shop-floor mode only; no prices or money" }].map((u) => (
              <div key={u.n} className="flex items-center gap-3 py-3 border-t border-line-2 first:border-t-0">
                <Avatar name={u.n} size={34} />
                <div className="flex-1"><div className="text-sm font-semibold">{u.n}</div><div className="text-xs text-ink-4">{u.d}</div></div>
                <Pill tone={u.r === "Owner" ? "dark" : "neutral"} dot={false}>{u.r}</Pill>
              </div>
            ))}
            <p className="text-2xs text-ink-4 mt-3">Add more users later at no extra licence cost.</p>
          </Card>
          <Card pad={false}>
            <div className="px-5 py-3.5 border-b border-line text-sm font-semibold">What each role can do</div>
            <table className="tbl">
              <thead><tr><th>Permission</th><th className="text-center">Owner</th><th className="text-center">Shop floor</th></tr></thead>
              <tbody>{[["See and move jobs", true, true], ["Shop-floor mode and job tags", true, true], ["Quotes and prices", true, false], ["Invoices and Xero", true, false], ["Reports", true, false], ["Settings and users", true, false]].map(([p, a, b]) => (
                <tr key={p as string}><td>{p}</td><td className="text-center">{a ? <Check size={15} className="inline text-good" /> : <X size={15} className="inline text-ink-5" />}</td><td className="text-center">{b ? <Check size={15} className="inline text-good" /> : <X size={15} className="inline text-ink-5" />}</td></tr>
              ))}</tbody>
            </table>
          </Card>
        </div>
      )}
      {tab === "prices" && (
        <Card pad={false}>
          <div className="px-5 py-3.5 border-b border-line flex items-center justify-between"><div className="text-sm font-semibold">Price list</div><span className="text-2xs text-ink-4">Sample rates for the demo. Used in quotes only, never shown on the website.</span></div>
          <table className="tbl"><thead><tr><th>Item</th><th>Unit</th><th className="text-right">Rate (ex GST)</th></tr></thead>
            <tbody>{PRICE_LIST.map((p) => <tr key={p.item}><td>{p.item}</td><td className="text-ink-3">{p.unit}</td><td className="text-right tnum">{aud(p.rate, 2)}</td></tr>)}</tbody>
          </table>
        </Card>
      )}
      {tab === "stages" && (
        <Card className="max-w-[560px]">
          <div className="text-sm font-semibold mb-3">Job stages</div>
          {STAGES.map((s) => <div key={s} className="flex items-center gap-3 py-2.5 border-t border-line-2 first:border-t-0 text-sm"><GripVertical size={15} className="text-ink-5" />{s}{s === "Ready" && <Pill tone="good" dot={false} className="ml-auto">Sends SMS</Pill>}</div>)}
        </Card>
      )}
      {tab === "sms" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[["Job received", "Hi {first_name}, we've received your items (job {job}). We'll text you when they're ready. – HSR Powder Coating"], ["Job ready", "Hi {first_name}, good news: job {job} is ready to collect. We're open Mon–Fri 7:00–4:30. – HSR Powder Coating"], ["Quote sent", "Hi {first_name}, your quote {quote} is ready: {link}. Tap Accept to book it in. – HSR"], ["Payment reminder", "Hi {first_name}, a friendly reminder that invoice {invoice} is due. Pay online: {link}. Thanks! – HSR"]].map(([t, b]) => (
            <Card key={t}><div className="text-sm font-semibold mb-2">{t}</div><textarea rows={3} className="input text-sm" defaultValue={b} /></Card>
          ))}
        </div>
      )}
      {tab === "integrations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[["Xero", "Invoices, customers and payments sync both ways", "Connected"], ["SMS gateway", "Job updates and reminders by text, charged per message", "Connected"], ["Email", "Quotes and invoices from your own domain", "Connected"], ["Website CMS", "Enquiries flow straight in as quote drafts", "Connected"], ["Card payments", "Pay-by-link on invoices (Stripe or Square)", "Optional"], ["Google Business Profile", "Review requests after collection", "Optional"]].map(([n, d, s]) => (
            <Card key={n} className="flex gap-3"><Plug size={18} className="text-flame shrink-0" /><div className="flex-1"><div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">{n}</span><Pill tone={s === "Connected" ? "good" : "neutral"}>{s}</Pill></div><div className="text-xs text-ink-4 mt-1">{d}</div></div></Card>
          ))}
        </div>
      )}
    </>
  );
}
