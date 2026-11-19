import { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Building2, Car, Trees, Wrench, Plus, Trash2, Camera, Check, ArrowLeft, ArrowRight, ShieldCheck, Clock, MessageSquare, PartyPopper, Search, X } from "lucide-react";
import { COLOURS, IMG, type Enquiry } from "../../data/seed";
import { useStore } from "../../state/store";
import { cx } from "../../components/ui";

const TYPES = [
  { v: "Trade", i: Building2, d: "Extrusions, frames, steelwork, volume orders" },
  { v: "Automotive", i: Car, d: "Wheels, trays, canopies, bars, frames" },
  { v: "Landscaping", i: Trees, d: "Gates, fences, screens, planters" },
  { v: "Custom", i: Wrench, d: "Furniture and one-off jobs" },
] as const;
const STEPS = ["What", "Items", "Colour", "Timing", "Details"];

type Item = Enquiry["items"][number];

export default function QuotePage() {
  const [sp] = useSearchParams();
  const { addEnquiry } = useStore();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<Enquiry["type"]>("Landscaping");
  const [items, setItems] = useState<Item[]>([
    { desc: "Steel slat driveway gate", qty: 1, size: "3.6 m × 1.8 m", material: "Steel", condition: "New / raw" },
    { desc: "Matching fence panels", qty: 8, size: "2.4 m × 1.8 m", material: "Steel", condition: "New / raw" },
  ]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [colour, setColour] = useState(sp.get("colour") ?? "Monument");
  const [finish, setFinish] = useState("Satin");
  const [brand, setBrand] = useState("No preference");
  const [cq, setCq] = useState("");
  const [neededBy, setNeededBy] = useState("2026-12-05");
  const [logistics, setLogistics] = useState<Enquiry["logistics"]>("Drop-off");
  const [suburb, setSuburb] = useState("Hallam");
  const [name, setName] = useState("Jack Morris");
  const [company, setCompany] = useState("Morris Landscapes");
  const [phone, setPhone] = useState("0411 XXX 274");
  const [email, setEmail] = useState("jack@morrislandscapes.com.au");
  const [pref, setPref] = useState<Enquiry["contactPref"]>("SMS");
  const [trade, setTrade] = useState(true);
  const [msg, setMsg] = useState("Residential job. Client wants it done before Christmas.");
  const [done, setDone] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const colours = useMemo(() => COLOURS.filter((c) => c.name.toLowerCase().includes(cq.toLowerCase())), [cq]);
  const selC = COLOURS.find((c) => c.name === colour);
  const setItem = (k: number, patch: Partial<Item>) => setItems((l) => l.map((x, i) => (i === k ? { ...x, ...patch } : x)));

  const submit = () => {
    const d = new Date(neededBy);
    const nb = isNaN(d.getTime()) ? "Flexible" : `${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()]} ${d.getDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()]}`;
    const id = addEnquiry({ name, company: company || undefined, type, phone, email, suburb, items, colour, finish, brand, neededBy: nb, logistics, contactPref: pref, message: msg, photos: photos.length ? photos : [IMG.gate], trade });
    setDone(id);
  };

  if (done)
    return (
      <section className="max-w-[720px] mx-auto px-4 py-20 text-center anim-up">
        <div className="w-16 h-16 rounded-full bg-good-bg text-good inline-flex items-center justify-center"><PartyPopper size={28} /></div>
        <h1 className="display text-[34px] font-extrabold mt-6">Thanks {name.split(" ")[0]}, request received</h1>
        <p className="text-ink-3 mt-3">Your reference is <b className="text-ink">{done}</b>. We'll review your photos and reply by {pref === "Call" ? "phone" : pref.toLowerCase()} within one business day.</p>
        <div className="mt-8 rounded-2xl border border-line p-6 text-left">
          <div className="text-sm font-semibold mb-3">What happens next</div>
          {["We check your items, sizes and photos", "You get an itemised quote with GST and turnaround", "Drop off (or we pick up), and we text you when it's ready"].map((t, k) => (
            <div key={t} className="flex gap-3 py-2 text-sm"><span className="w-6 h-6 rounded-full bg-flame-50 text-flame text-xs font-bold inline-flex items-center justify-center shrink-0">{k + 1}</span>{t}</div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-ink text-white p-5 text-left flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <div className="eyebrow text-flame mb-1">Demo</div>
            <div className="text-sm text-white/80">See this request arrive in the HSR team's CMS inbox.</div>
          </div>
          <Link to="/cms/enquiries" className="h-11 px-5 rounded-md bg-flame text-white text-sm font-semibold inline-flex items-center gap-2 self-start">Open the CMS <ArrowRight size={15} /></Link>
        </div>
      </section>
    );

  return (
    <section className="bg-steel-50 min-h-[80vh]">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-12 sm:py-16">
        <div className="eyebrow text-flame mb-2">Get a quote</div>
        <h1 className="display text-[32px] leading-[38px] sm:text-[42px] sm:leading-[48px] font-extrabold">Tell us about your job</h1>
        <p className="text-ink-3 mt-2">Takes about two minutes. Photos and rough sizes help us price it accurately.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mt-8">
          <div data-tour="quote-form" className="rounded-2xl bg-white border border-line shadow-card overflow-hidden">
            <div className="flex border-b border-line overflow-x-auto">
              {STEPS.map((s, k) => (
                <button key={s} onClick={() => k < step && setStep(k)} className={cx("flex-1 min-w-[96px] h-14 px-3 text-sm flex items-center justify-center gap-2 border-b-2 -mb-px", k === step ? "border-flame text-ink font-semibold" : k < step ? "border-transparent text-ink-2" : "border-transparent text-ink-4")}>
                  <span className={cx("w-6 h-6 rounded-full text-xs inline-flex items-center justify-center", k < step ? "bg-good text-white" : k === step ? "bg-flame text-white" : "bg-steel-100 text-ink-4")}>{k < step ? <Check size={13} /> : k + 1}</span>
                  {s}
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-7 min-h-[420px]">
              {step === 0 && (
                <div className="anim-fade">
                  <div className="font-semibold mb-4">What kind of job is it?</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TYPES.map((t) => (
                      <button key={t.v} onClick={() => setType(t.v)} className={cx("text-left rounded-xl border-2 p-5 transition-all", type === t.v ? "border-flame bg-flame-50" : "border-line hover:border-ink-5")}>
                        <t.i size={24} className={type === t.v ? "text-flame" : "text-ink-3"} />
                        <div className="font-semibold mt-3">{t.v}</div>
                        <div className="text-sm text-ink-4 mt-0.5">{t.d}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="anim-fade space-y-4">
                  <div className="font-semibold">What needs coating?</div>
                  {items.map((it, k) => (
                    <div key={k} className="rounded-xl border border-line p-4 grid grid-cols-2 sm:grid-cols-6 gap-3">
                      <label className="col-span-2 sm:col-span-3"><span className="text-xs text-ink-3">Item</span><input className="input mt-1" value={it.desc} onChange={(e) => setItem(k, { desc: e.target.value })} /></label>
                      <label><span className="text-xs text-ink-3">Qty</span><input className="input mt-1" type="number" min={1} value={it.qty} onChange={(e) => setItem(k, { qty: Number(e.target.value) })} /></label>
                      <label className="sm:col-span-2"><span className="text-xs text-ink-3">Rough size</span><input className="input mt-1" value={it.size} onChange={(e) => setItem(k, { size: e.target.value })} placeholder="e.g. 2.4 m × 1.8 m" /></label>
                      <label className="sm:col-span-2"><span className="text-xs text-ink-3">Material</span>
                        <select className="input mt-1" value={it.material} onChange={(e) => setItem(k, { material: e.target.value })}>{["Steel", "Aluminium", "Aluminium alloy", "Not sure"].map((m) => <option key={m}>{m}</option>)}</select>
                      </label>
                      <label className="sm:col-span-3"><span className="text-xs text-ink-3">Condition</span>
                        <select className="input mt-1" value={it.condition} onChange={(e) => setItem(k, { condition: e.target.value })}>{["New / raw", "Previously painted", "Previously powder coated", "Rust", "Light corrosion"].map((m) => <option key={m}>{m}</option>)}</select>
                      </label>
                      <div className="flex items-end">
                        <button onClick={() => setItems((l) => l.filter((_, i) => i !== k))} disabled={items.length === 1} className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-line-3 text-ink-4 hover:text-crit disabled:opacity-30" aria-label="Remove item"><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setItems((l) => [...l, { desc: "", qty: 1, size: "", material: "Steel", condition: "New / raw" }])} className="h-10 px-4 rounded-md border border-dashed border-ink-5 text-sm font-medium inline-flex items-center gap-2 hover:border-flame hover:text-flame"><Plus size={15} /> Add another item</button>

                  <div className="pt-2">
                    <div className="font-semibold mb-2">Photos</div>
                    <div className="flex flex-wrap gap-3">
                      {photos.map((p, k) => (
                        <div key={k} className="relative w-24 h-24 rounded-lg overflow-hidden ring-1 ring-line">
                          <img src={p} alt="" className="w-full h-full object-cover" />
                          <button onClick={() => setPhotos((l) => l.filter((_, i) => i !== k))} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white inline-flex items-center justify-center" aria-label="Remove photo"><X size={13} /></button>
                        </div>
                      ))}
                      <button onClick={() => fileRef.current?.click()} className="w-24 h-24 rounded-lg border-2 border-dashed border-line-3 hover:border-flame text-ink-4 hover:text-flame flex flex-col items-center justify-center gap-1 text-xs">
                        <Camera size={20} /> Add photos
                      </button>
                      {!photos.length && <button onClick={() => setPhotos([IMG.gate])} className="self-center text-xs text-flame underline">Use a sample photo (demo)</button>}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { const f = Array.from(e.target.files ?? []); setPhotos((l) => [...l, ...f.map((x) => URL.createObjectURL(x))]); }} />
                    <div className="text-2xs text-ink-4 mt-2">Up to 10 photos. A shot of the whole item and any damaged areas helps.</div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="anim-fade">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="font-semibold">Colour and finish</div>
                    <div className="flex items-center gap-2 h-9 px-3 rounded-md border border-line-3 w-56"><Search size={14} className="text-ink-4" /><input value={cq} onChange={(e) => setCq(e.target.value)} placeholder="Search colours" className="flex-1 outline-none text-sm bg-transparent" /></div>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-[240px] overflow-y-auto scroll-thin pr-1">
                    {colours.map((c) => (
                      <button key={c.name} onClick={() => { setColour(c.name); if (!c.finishes.includes(finish)) setFinish(c.finishes[0]); }} className={cx("rounded-lg p-1 border text-left", colour === c.name ? "border-flame ring-2 ring-flame/20" : "border-transparent hover:border-line-3")}>
                        <div className="aspect-square rounded-md ring-1 ring-black/10" style={{ background: c.hex }} />
                        <div className="text-[10.5px] font-medium mt-1 truncate">{c.name}</div>
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-xs text-ink-3 mb-1.5">Finish</div>
                      <div className="flex flex-wrap gap-2">
                        {["Gloss", "Satin", "Matt", "Texture", "Metallic"].map((f) => (
                          <button key={f} disabled={!!selC && !selC.finishes.includes(f)} onClick={() => setFinish(f)} className={cx("h-9 px-3.5 rounded-md border text-sm disabled:opacity-30", finish === f ? "bg-ink text-white border-ink" : "border-line-3")}>{f}</button>
                        ))}
                      </div>
                    </div>
                    <label><span className="text-xs text-ink-3">Powder brand preference</span>
                      <select className="input mt-1.5" value={brand} onChange={(e) => setBrand(e.target.value)}>{["No preference", "Dulux", "Interpon", "Oxytech"].map((b) => <option key={b}>{b}</option>)}</select>
                    </label>
                  </div>
                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-steel-50 p-3">
                    <span className="w-10 h-10 rounded-md ring-1 ring-black/10" style={{ background: selC?.hex }} />
                    <div className="text-sm"><b>{colour}</b> · {finish} <span className="text-ink-4">· not sure? Tell us in the notes and we'll help.</span></div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="anim-fade space-y-5">
                  <div className="font-semibold">Timing and drop-off</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label><span className="text-xs text-ink-3">Needed by</span><input type="date" className="input mt-1.5" value={neededBy} onChange={(e) => setNeededBy(e.target.value)} /></label>
                    <label><span className="text-xs text-ink-3">Your suburb</span><input className="input mt-1.5" value={suburb} onChange={(e) => setSuburb(e.target.value)} /></label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["Drop-off", "Pick-up requested"] as const).map((l) => (
                      <button key={l} onClick={() => setLogistics(l)} className={cx("text-left rounded-xl border-2 p-4", logistics === l ? "border-flame bg-flame-50" : "border-line")}>
                        <div className="font-semibold text-sm">{l === "Drop-off" ? "I'll drop it off" : "Please pick it up"}</div>
                        <div className="text-xs text-ink-4 mt-0.5">{l === "Drop-off" ? "Bring it to the workshop during opening hours" : "Available for larger trade and landscaping jobs"}</div>
                      </button>
                    ))}
                  </div>
                  <label className="block"><span className="text-xs text-ink-3">Anything else we should know?</span><textarea rows={3} className="input mt-1.5" value={msg} onChange={(e) => setMsg(e.target.value)} /></label>
                </div>
              )}

              {step === 4 && (
                <div className="anim-fade space-y-4">
                  <div className="font-semibold">Your details</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label><span className="text-xs text-ink-3">Name</span><input className="input mt-1.5" value={name} onChange={(e) => setName(e.target.value)} /></label>
                    <label><span className="text-xs text-ink-3">Business (optional)</span><input className="input mt-1.5" value={company} onChange={(e) => setCompany(e.target.value)} /></label>
                    <label><span className="text-xs text-ink-3">Mobile</span><input className="input mt-1.5" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
                    <label><span className="text-xs text-ink-3">Email</span><input className="input mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                  </div>
                  <div>
                    <div className="text-xs text-ink-3 mb-1.5">Best way to reach you</div>
                    <div className="flex gap-2">{(["SMS", "Call", "Email"] as const).map((p) => <button key={p} onClick={() => setPref(p)} className={cx("h-9 px-4 rounded-md border text-sm", pref === p ? "bg-ink text-white border-ink" : "border-line-3")}>{p}</button>)}</div>
                  </div>
                  <label className="flex items-center gap-2.5 text-sm"><input type="checkbox" checked={trade} onChange={(e) => setTrade(e.target.checked)} className="w-4 h-4 accent-[#FF5A1F]" /> I'm a trade customer and interested in a trade account</label>
                  <p className="text-2xs text-ink-4 flex gap-1.5"><ShieldCheck size={13} className="shrink-0" /> We only use your details to reply to this request. See our privacy policy.</p>
                </div>
              )}
            </div>

            <div className="px-5 sm:px-7 py-4 border-t border-line bg-steel-50 flex items-center justify-between">
              <button onClick={() => setStep(step - 1)} disabled={step === 0} className="h-11 px-4 rounded-md text-sm font-medium inline-flex items-center gap-2 disabled:opacity-0"><ArrowLeft size={16} /> Back</button>
              {step < 4 ? (
                <button onClick={() => setStep(step + 1)} className="h-11 px-6 rounded-md bg-ink text-white text-sm font-semibold inline-flex items-center gap-2 hover:bg-steel-700">Continue <ArrowRight size={16} /></button>
              ) : (
                <button onClick={submit} className="h-11 px-6 rounded-md bg-flame text-white text-sm font-semibold inline-flex items-center gap-2 hover:bg-flame-600">Send quote request <ArrowRight size={16} /></button>
              )}
            </div>
          </div>

          <aside data-tour="quote-side" className="space-y-4 lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl bg-ink text-white p-6">
              <Clock size={20} className="text-flame" />
              <div className="display text-[20px] font-bold mt-3">Reply within one business day</div>
              <p className="text-sm text-white/60 mt-1.5">You'll get an itemised quote with GST and an expected turnaround.</p>
            </div>
            <div className="rounded-2xl bg-white border border-line p-6">
              <div className="text-sm font-semibold mb-3">Your request</div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between gap-3"><span className="text-ink-4">Type</span><span>{type}</span></div>
                <div className="flex justify-between gap-3"><span className="text-ink-4">Items</span><span>{items.reduce((a, i) => a + (Number(i.qty) || 0), 0)} pieces</span></div>
                <div className="flex justify-between gap-3"><span className="text-ink-4">Colour</span><span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded ring-1 ring-black/10" style={{ background: selC?.hex }} />{colour} {finish}</span></div>
                <div className="flex justify-between gap-3"><span className="text-ink-4">Photos</span><span>{photos.length}</span></div>
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-line p-6 text-sm flex gap-3">
              <MessageSquare size={18} className="text-flame shrink-0" />
              <span className="text-ink-3">Prefer to talk? Call us on <b className="text-ink">04XX XXX XXX</b>, Monday to Friday.</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
