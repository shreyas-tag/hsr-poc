import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Phone, MessageSquare, Mail, FileText, Send, Truck, CalendarDays, MapPin, Paintbrush, Download, Building2 } from "lucide-react";
import { Card, Drawer, PageHead, Pill, statusTone, Button, Swatch, cx, Segmented } from "../../components/ui";
import { useStore } from "../../state/store";
import { colourHex, type EnquiryStatus } from "../../data/seed";

const STATUSES: (EnquiryStatus | "All")[] = ["All", "New", "Contacted", "Quoted", "Won", "Lost"];

export default function Enquiries() {
  const { enquiries, setEnquiryStatus, addNote, newQuote, toast } = useStore();
  const [sp, setSp] = useSearchParams();
  const nav = useNavigate();
  const [f, setF] = useState<(typeof STATUSES)[number]>("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(sp.get("open"));
  const [note, setNote] = useState("");
  const [tpl, setTpl] = useState<"sms" | "email">("sms");
  useEffect(() => { if (sp.get("open")) { setOpen(sp.get("open")); setSp({}, { replace: true }); } }, [sp, setSp]);
  const list = enquiries.filter((e) => (f === "All" || e.status === f) && `${e.name} ${e.company ?? ""} ${e.id} ${e.suburb} ${e.items.map((i) => i.desc).join(" ")}`.toLowerCase().includes(q.toLowerCase()));
  const e = enquiries.find((x) => x.id === open);
  const first = e?.name.split(" ")[0];

  return (
    <>
      <PageHead title="Enquiries" sub="Every quote request from the website, Google and social, in one inbox." right={<Button variant="secondary" onClick={() => toast("Exported 7 enquiries to CSV.")}><Download size={15} /> Export</Button>} />
      <Card data-tour="enq-table" pad={false}>
        <div className="p-3 sm:p-4 flex flex-wrap items-center gap-3 border-b border-line">
          <div className="flex gap-1 overflow-x-auto">
            {STATUSES.map((s) => {
              const n = s === "All" ? enquiries.length : enquiries.filter((x) => x.status === s).length;
              return (
                <button key={s} onClick={() => setF(s)} className={cx("h-8 px-3 rounded-full text-xs whitespace-nowrap border", f === s ? "bg-ink text-white border-ink" : "border-line-3 text-ink-3 hover:border-ink-5")}>
                  {s} <span className={f === s ? "text-white/60" : "text-ink-5"}>{n}</span>
                </button>
              );
            })}
          </div>
          <div className="ml-auto flex items-center gap-2 h-9 px-3 rounded-md border border-line-3 w-full sm:w-72 focus-within:border-flame">
            <Search size={14} className="text-ink-4" />
            <input value={q} onChange={(ev) => setQ(ev.target.value)} placeholder="Search name, item, suburb" className="flex-1 outline-none text-sm bg-transparent" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[860px]">
            <thead><tr><th>Enquiry</th><th>Customer</th><th>Job</th><th>Colour</th><th>Needed by</th><th>Received</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((x, k) => (
                <tr key={x.id} onClick={() => setOpen(x.id)} data-tour={k === 0 ? "enq-row-first" : undefined} className="cursor-pointer">
                  <td><div className="font-mono text-xs text-ink-3">{x.id}</div><div className="text-2xs text-ink-4">{x.source}</div></td>
                  <td>
                    <div className="font-semibold flex items-center gap-1.5">{x.name}{x.trade && <span className="text-[10px] px-1.5 rounded bg-info-bg text-info font-semibold">TRADE</span>}</div>
                    <div className="text-xs text-ink-4">{x.company ?? x.suburb}</div>
                  </td>
                  <td><div className="text-sm">{x.type}</div><div className="text-xs text-ink-4 max-w-[220px] truncate">{x.items.map((i) => `${i.qty} × ${i.desc}`).join(", ")}</div></td>
                  <td><span className="inline-flex items-center gap-2 text-sm"><Swatch hex={colourHex(x.colour)} size={16} />{x.colour}</span><div className="text-xs text-ink-4">{x.finish}</div></td>
                  <td className="text-sm">{x.neededBy}</td>
                  <td className="text-xs text-ink-3 whitespace-nowrap">{x.received}</td>
                  <td><Pill tone={statusTone(x.status)}>{x.status}</Pill></td>
                </tr>
              ))}
              {!list.length && <tr><td colSpan={7} className="text-center text-ink-4 py-10">No enquiries match.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer
        open={!!e}
        onClose={() => setOpen(null)}
        width={620}
        title={e && (
          <div className="flex items-center gap-3">
            <div><div className="font-semibold">{e.name}</div><div className="text-xs text-ink-4">{e.id} · {e.received} · {e.source}</div></div>
            <Pill tone={statusTone(e.status)}>{e.status}</Pill>
          </div>
        )}
        footer={e && (
          <>
            <Button variant="secondary" onClick={() => { toast(`Reply sent to ${first} by ${tpl === "sms" ? "SMS" : "email"}.`); if (e.status === "New") setEnquiryStatus(e.id, "Contacted"); }}><Send size={15} /> Send reply</Button>
            <Button variant="flame" data-tour="enq-quote" onClick={() => { const id = newQuote(e.id); nav(`/ws/quotes/${id}`); }}><FileText size={15} /> Create quote in Workshop System</Button>
          </>
        )}
      >
        {e && (
          <div className="p-5 space-y-6">
            <div className="grid grid-cols-3 gap-2">
              {[{ i: Phone, l: "Call", v: e.phone }, { i: MessageSquare, l: "SMS", v: e.phone }, { i: Mail, l: "Email", v: e.email }].map((a) => (
                <button key={a.l} onClick={() => toast(`${a.l}: ${a.v}`)} className="rounded-xl border border-line p-3 text-left hover:border-ink-5">
                  <a.i size={16} className="text-flame" />
                  <div className="text-sm font-semibold mt-2">{a.l}</div>
                  <div className="text-2xs text-ink-4 truncate">{a.v}</div>
                </button>
              ))}
            </div>
            {e.company && <div className="flex items-center gap-2 text-sm"><Building2 size={15} className="text-ink-4" /> {e.company} {e.trade && <Pill tone="info" dot={false}>Trade account requested</Pill>}</div>}

            <div>
              <div className="text-xs font-semibold text-ink-3 uppercase tracking-wider mb-2">Items</div>
              <div className="rounded-xl border border-line overflow-hidden">
                <table className="tbl">
                  <thead><tr><th>Item</th><th>Qty</th><th>Size</th><th>Condition</th></tr></thead>
                  <tbody>{e.items.map((i) => <tr key={i.desc}><td><div className="font-medium">{i.desc}</div><div className="text-2xs text-ink-4">{i.material}</div></td><td className="tnum">{i.qty}</td><td className="text-sm">{i.size}</td><td className="text-sm">{i.condition}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-steel-50 p-3 flex gap-2.5"><Paintbrush size={16} className="text-ink-4 mt-0.5" /><div><div className="text-2xs text-ink-4">Colour & finish</div><div className="flex items-center gap-1.5 font-medium"><Swatch hex={colourHex(e.colour)} size={14} />{e.colour} {e.finish}</div><div className="text-2xs text-ink-4">Brand: {e.brand}</div></div></div>
              <div className="rounded-xl bg-steel-50 p-3 flex gap-2.5"><CalendarDays size={16} className="text-ink-4 mt-0.5" /><div><div className="text-2xs text-ink-4">Needed by</div><div className="font-medium">{e.neededBy}</div></div></div>
              <div className="rounded-xl bg-steel-50 p-3 flex gap-2.5"><Truck size={16} className="text-ink-4 mt-0.5" /><div><div className="text-2xs text-ink-4">Logistics</div><div className="font-medium">{e.logistics}</div></div></div>
              <div className="rounded-xl bg-steel-50 p-3 flex gap-2.5"><MapPin size={16} className="text-ink-4 mt-0.5" /><div><div className="text-2xs text-ink-4">Suburb · prefers</div><div className="font-medium">{e.suburb} · {e.contactPref}</div></div></div>
            </div>

            {e.message && <div className="rounded-xl border-l-4 border-flame bg-flame-50/60 p-4 text-sm text-ink-2">"{e.message}"</div>}

            {!!e.photos.length && (
              <div>
                <div className="text-xs font-semibold text-ink-3 uppercase tracking-wider mb-2">Photos ({e.photos.length})</div>
                <div className="grid grid-cols-3 gap-2">{e.photos.map((p, k) => <img key={k} src={p} alt="" className="rounded-lg aspect-[4/3] object-cover w-full" />)}</div>
              </div>
            )}

            <div data-tour="enq-status" className="rounded-xl border border-line p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">Status</div>
                <select className="input w-auto h-9 text-sm" value={e.status} onChange={(ev) => { setEnquiryStatus(e.id, ev.target.value as EnquiryStatus); toast(`Marked as ${ev.target.value}.`); }}>
                  {STATUSES.slice(1).map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="mt-4 space-y-2.5">
                {e.notes.map((n, k) => (
                  <div key={k} className="text-sm flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink-5 mt-2 shrink-0" /><div><div>{n.text}</div><div className="text-2xs text-ink-4">{n.by} · {n.at}</div></div></div>
                ))}
                {!e.notes.length && <div className="text-xs text-ink-4">No notes yet.</div>}
              </div>
              <form onSubmit={(ev) => { ev.preventDefault(); if (note.trim()) { addNote(e.id, note.trim()); setNote(""); } }} className="flex gap-2 mt-3">
                <input className="input h-9 text-sm" placeholder="Add a note, e.g. called, left voicemail" value={note} onChange={(ev) => setNote(ev.target.value)} />
                <Button size="sm" className="h-9">Add</Button>
              </form>
            </div>

            <div className="rounded-xl border border-line p-4">
              <div className="flex items-center justify-between mb-3"><div className="text-sm font-semibold">Quick reply</div><Segmented value={tpl} onChange={setTpl} options={[{ value: "sms", label: "SMS" }, { value: "email", label: "Email" }]} /></div>
              <textarea key={`${e.id}-${tpl}`} rows={tpl === "sms" ? 3 : 5} className="input text-sm" defaultValue={tpl === "sms"
                ? `Hi ${first}, thanks for your enquiry (${e.id}). We've got your photos and will send a quote today. – Harshal, HSR Powder Coating`
                : `Hi ${first},\n\nThanks for your enquiry (${e.id}) for ${e.items.map((i) => `${i.qty} × ${i.desc.toLowerCase()}`).join(" and ")} in ${e.colour} ${e.finish.toLowerCase()}.\n\nWe'll send you an itemised quote shortly.\n\nRegards,\nHarshal Gaikar\nHSR Powder Coating`} />
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
