import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Plus, Trash2, Eye, Send, CheckCircle2, ArrowLeft, FileText, Inbox } from "lucide-react";
import { Card, PageHead, Pill, statusTone, Button, Swatch, Modal, Field, cx } from "../../components/ui";
import { useStore, aud, lineTotal } from "../../state/store";
import { COLOURS, PRICE_LIST, colourHex, type Quote } from "../../data/seed";

export default function Quotes() {
  const { quotes, newQuote } = useStore();
  const nav = useNavigate();
  const [f, setF] = useState("All");
  const list = quotes.filter((q) => f === "All" || q.status === f);
  const sent = quotes.filter((q) => q.status === "Sent").reduce((a, q) => a + lineTotal(q.lines) * 1.1, 0);
  const acc = quotes.filter((q) => q.status === "Accepted").length;
  const dec = quotes.filter((q) => q.status === "Declined").length;
  return (
    <>
      <PageHead title="Quotes" sub={`${aud(sent)} awaiting customer reply · ${acc + dec ? Math.round((acc / (acc + dec)) * 100) : 0}% acceptance rate`} right={<Button variant="flame" onClick={() => nav(`/ws/quotes/${newQuote()}`)}><Plus size={15} /> New quote</Button>} />
      <Card pad={false} data-tour="quotes-table">
        <div className="p-3 flex gap-1 border-b border-line overflow-x-auto">
          {["All", "Draft", "Sent", "Accepted", "Declined"].map((s) => (
            <button key={s} onClick={() => setF(s)} className={cx("h-8 px-3 rounded-full text-xs border whitespace-nowrap", f === s ? "bg-ink text-white border-ink" : "border-line-3 text-ink-3")}>{s}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="tbl min-w-[760px]">
            <thead><tr><th>Quote</th><th>Customer</th><th>Colour</th><th>Date</th><th className="text-right">Total inc. GST</th><th>Status</th><th>Job</th></tr></thead>
            <tbody>{list.map((q) => (
              <tr key={q.id} onClick={() => nav(`/ws/quotes/${q.id}`)} className="cursor-pointer">
                <td><div className="font-mono text-xs">{q.id}</div>{q.enquiry && <div className="text-2xs text-ink-4 inline-flex items-center gap-1"><Inbox size={10} /> {q.enquiry}</div>}</td>
                <td><div className="font-semibold">{q.company ?? q.customer}</div>{q.company && <div className="text-xs text-ink-4">{q.customer}</div>}</td>
                <td><span className="inline-flex items-center gap-1.5 text-sm"><Swatch hex={colourHex(q.colour)} size={14} />{q.colour} {q.finish}</span></td>
                <td className="text-sm text-ink-3">{q.date}</td>
                <td className="text-right tnum font-semibold">{aud(lineTotal(q.lines) * 1.1, 2)}</td>
                <td><Pill tone={statusTone(q.status)}>{q.status}</Pill></td>
                <td className="font-mono text-xs text-ink-3">{q.job ?? "—"}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

export function QuoteBuilder() {
  const { id } = useParams();
  const { quotes, saveQuote, sendQuote, acceptQuote, toast, enquiries } = useStore();
  const nav = useNavigate();
  const src = quotes.find((x) => x.id === id);
  const [q, setQ] = useState<Quote | undefined>(src);
  const [preview, setPreview] = useState(false);
  useEffect(() => { setQ(src); }, [src?.id, src?.status]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!q) return <Card className="text-sm">Quote not found. <Link to="/ws/quotes" className="text-flame">Back to quotes</Link></Card>;
  const sub = lineTotal(q.lines);
  const gst = sub * 0.1;
  const upd = (p: Partial<Quote>) => { const n = { ...q, ...p }; setQ(n); saveQuote(n); };
  const setLine = (k: number, p: Partial<Quote["lines"][number]>) => upd({ lines: q.lines.map((l, i) => (i === k ? { ...l, ...p } : l)) });
  const enq = enquiries.find((e) => e.id === q.enquiry);
  const locked = q.status === "Accepted" || q.status === "Declined";

  return (
    <>
      <button onClick={() => nav("/ws/quotes")} className="text-xs text-ink-4 hover:text-ink inline-flex items-center gap-1 mb-3"><ArrowLeft size={13} /> All quotes</button>
      <PageHead title={`Quote ${q.id}`} sub={`${q.company ?? q.customer} · ${q.date}`} right={<Pill tone={statusTone(q.status)}>{q.status}</Pill>} />
      <div data-tour="quote-builder" className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <div className="space-y-4">
          <Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Customer"><input className="input" disabled={locked} value={q.customer} onChange={(e) => upd({ customer: e.target.value })} /></Field>
              <Field label="Business"><input className="input" disabled={locked} value={q.company ?? ""} onChange={(e) => upd({ company: e.target.value })} /></Field>
              <Field label="Colour">
                <div className="flex gap-2 items-center"><Swatch hex={colourHex(q.colour)} size={36} className="rounded-md" />
                  <select className="input" disabled={locked} value={q.colour} onChange={(e) => upd({ colour: e.target.value })}>{COLOURS.map((c) => <option key={c.name}>{c.name}</option>)}</select>
                </div>
              </Field>
              <Field label="Finish"><select className="input" disabled={locked} value={q.finish} onChange={(e) => upd({ finish: e.target.value })}>{["Gloss", "Satin", "Matt", "Texture", "Metallic"].map((f) => <option key={f}>{f}</option>)}</select></Field>
            </div>
            {enq && (
              <div className="mt-4 rounded-lg bg-flame-50 border border-flame/20 p-3 text-sm flex gap-3">
                <Inbox size={16} className="text-flame shrink-0 mt-0.5" />
                <div><b>From website enquiry {enq.id}:</b> {enq.items.map((i) => `${i.qty} × ${i.desc} (${i.size}, ${i.condition.toLowerCase()})`).join("; ")}. Needed by {enq.neededBy}. {enq.photos.length} photo{enq.photos.length !== 1 && "s"}.</div>
              </div>
            )}
          </Card>
          <Card pad={false}>
            <div className="px-5 py-3.5 border-b border-line flex items-center justify-between">
              <div className="text-sm font-semibold">Line items</div>
              {!locked && (
                <select className="input w-auto h-9 text-xs" value="" onChange={(e) => { const p = PRICE_LIST.find((x) => x.item === e.target.value); if (p) upd({ lines: [...q.lines.filter((l) => l.item || l.rate), { item: p.item, qty: 1, unit: p.unit, rate: p.rate }] }); }}>
                  <option value="">+ Add from price list</option>
                  {PRICE_LIST.map((p) => <option key={p.item} value={p.item}>{p.item} · {aud(p.rate, 2)}/{p.unit}</option>)}
                </select>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="tbl min-w-[640px]">
                <thead><tr><th>Description</th><th className="w-24">Qty</th><th className="w-20">Unit</th><th className="w-28">Rate</th><th className="w-28 text-right">Amount</th><th className="w-10" /></tr></thead>
                <tbody>
                  {q.lines.map((l, k) => (
                    <tr key={k}>
                      <td><input className="w-full outline-none text-sm bg-transparent" disabled={locked} value={l.item} placeholder="Description" onChange={(e) => setLine(k, { item: e.target.value })} /></td>
                      <td><input type="number" className="input h-8 text-sm" disabled={locked} value={l.qty} onChange={(e) => setLine(k, { qty: Number(e.target.value) })} /></td>
                      <td className="text-xs text-ink-4">{l.unit}</td>
                      <td><div className="flex items-center gap-1"><span className="text-ink-4 text-sm">$</span><input type="number" step="0.5" className={cx("input h-8 text-sm", !l.rate && "border-flame")} disabled={locked} value={l.rate} onChange={(e) => setLine(k, { rate: Number(e.target.value) })} /></div></td>
                      <td className="text-right tnum font-medium">{aud(l.qty * l.rate, 2)}</td>
                      <td>{!locked && <button onClick={() => upd({ lines: q.lines.filter((_, i) => i !== k) })} className="p-1 text-ink-5 hover:text-crit" aria-label="Remove"><Trash2 size={14} /></button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!locked && <div className="px-5 py-3 border-t border-line-2"><button onClick={() => upd({ lines: [...q.lines, { item: "", qty: 1, unit: "each", rate: 0 }] })} className="text-sm font-medium text-flame inline-flex items-center gap-1.5"><Plus size={14} /> Add custom line</button></div>}
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-ink-3">Subtotal</span><span className="tnum">{aud(sub, 2)}</span></div>
              <div className="flex justify-between"><span className="text-ink-3">GST (10%)</span><span className="tnum">{aud(gst, 2)}</span></div>
              <div className="flex justify-between pt-3 mt-1 border-t border-line text-base font-bold"><span>Total</span><span className="tnum">{aud(sub + gst, 2)}</span></div>
            </div>
            <div className="text-2xs text-ink-4 mt-3">Valid for {q.validDays} days · Turnaround confirmed on acceptance</div>
            <div className="grid gap-2 mt-5">
              <Button onClick={() => setPreview(true)}><Eye size={15} /> Preview PDF</Button>
              {(q.status === "Draft" || q.status === "Sent") && (
                <Button variant="primary" onClick={() => { sendQuote(q.id); toast(`Quote ${q.id} sent to ${q.customer} by email and SMS.`); }} disabled={q.lines.some((l) => !l.rate)}>
                  <Send size={15} /> {q.status === "Sent" ? "Resend quote" : "Send quote"}
                </Button>
              )}
              {q.status === "Sent" && (
                <Button variant="flame" onClick={() => { const jid = acceptQuote(q.id); toast(`Accepted. Job ${jid} created.`); nav("/ws/jobs"); }}>
                  <CheckCircle2 size={15} /> Mark accepted → create job
                </Button>
              )}
              {q.job && <Button onClick={() => nav("/ws/jobs")}><FileText size={15} /> View job {q.job}</Button>}
            </div>
            {q.lines.some((l) => !l.rate) && q.status === "Draft" && <div className="text-2xs text-flame mt-2">Add a rate to every line before sending.</div>}
          </Card>
          <Card className="text-xs text-ink-3 space-y-2">
            <div className="text-sm font-semibold text-ink">How customers accept</div>
            <p>The quote email and SMS include a link. The customer taps "Accept", and the job is created here automatically, ready to book in.</p>
          </Card>
        </div>
      </div>

      <Modal open={preview} onClose={() => setPreview(false)} title={`Quote ${q.id} · PDF preview`} width={760} footer={<><Button onClick={() => setPreview(false)}>Close</Button><Button variant="primary" onClick={() => toast("PDF downloaded.")}>Download PDF</Button></>}>
        <div className="bg-steel-100 p-3 sm:p-6 rounded-lg">
          <div className="bg-white shadow-card mx-auto max-w-[620px] p-8 text-[12.5px]">
            <div className="flex justify-between items-start">
              <div><div className="display-wide text-[22px] font-extrabold">HSR<span className="text-flame">.</span></div><div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 font-semibold">Powder Coating</div></div>
              <div className="text-right text-[11px] text-ink-3"><div className="display text-[20px] font-bold text-ink">QUOTE</div><div>{q.id} · {q.date}</div><div>Valid {q.validDays} days</div></div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-7 text-[11.5px]">
              <div><div className="text-ink-4 uppercase text-[9.5px] tracking-wider mb-1">Prepared for</div><div className="font-semibold">{q.company ?? q.customer}</div>{q.company && <div>{q.customer}</div>}</div>
              <div><div className="text-ink-4 uppercase text-[9.5px] tracking-wider mb-1">Finish</div><div className="flex items-center gap-1.5 font-semibold"><Swatch hex={colourHex(q.colour)} size={12} />{q.colour} {q.finish}</div></div>
            </div>
            <table className="w-full mt-6 text-[11.5px]">
              <thead><tr className="border-b-2 border-ink text-left"><th className="py-2">Description</th><th className="py-2 text-right">Qty</th><th className="py-2 text-right">Rate</th><th className="py-2 text-right">Amount</th></tr></thead>
              <tbody>{q.lines.map((l, k) => <tr key={k} className="border-b border-line"><td className="py-2">{l.item || "—"}</td><td className="py-2 text-right tnum">{l.qty} {l.unit !== "each" && l.unit}</td><td className="py-2 text-right tnum">{aud(l.rate, 2)}</td><td className="py-2 text-right tnum">{aud(l.qty * l.rate, 2)}</td></tr>)}</tbody>
            </table>
            <div className="ml-auto w-56 mt-4 space-y-1 text-[11.5px]">
              <div className="flex justify-between"><span>Subtotal</span><span className="tnum">{aud(sub, 2)}</span></div>
              <div className="flex justify-between"><span>GST 10%</span><span className="tnum">{aud(gst, 2)}</span></div>
              <div className="flex justify-between font-bold text-[13px] border-t border-ink pt-1.5 mt-1.5"><span>Total AUD</span><span className="tnum">{aud(sub + gst, 2)}</span></div>
            </div>
            <div className="mt-8 rounded bg-steel-50 p-3 text-[10.5px] text-ink-3 leading-4">Prices include preparation and one coat in the colour shown unless stated. Stripping of existing coatings is quoted separately after inspection. Turnaround is confirmed when the job is booked in.</div>
            <div className="mt-6 pt-3 border-t border-line text-[10px] text-ink-4 flex justify-between"><span>HSR Powder Coating and Fabrication Pty Ltd · ABN XX XXX XXX XXX</span><span>hsrpowdercoating.com.au</span></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
