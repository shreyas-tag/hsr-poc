import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Image as ImageIcon, FileText, Palette, HelpCircle, Megaphone, Building, Search, Upload, Star, Trash2, GripVertical, Eye, EyeOff, Plus, ExternalLink, Check } from "lucide-react";
import { Card, PageHead, Button, Field, Swatch, cx, Modal } from "../../components/ui";
import { useStore } from "../../state/store";
import { COLOURS, IMG } from "../../data/seed";

const TABS = [
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "pages", label: "Pages & services", icon: FileText },
  { id: "colours", label: "Colours", icon: Palette },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "banner", label: "Notice banner", icon: Megaphone },
  { id: "business", label: "Business details", icon: Building },
  { id: "seo", label: "Search (SEO)", icon: Search },
] as const;
type TabId = (typeof TABS)[number]["id"];

export default function Content() {
  const [sp] = useSearchParams();
  const [tab, setTab] = useState<TabId>((sp.get("tab") as TabId) || "gallery");
  return (
    <>
      <PageHead title="Website content" sub="Change photos, text and details yourself. Changes go live on the website straight away." right={<Link to="/site"><Button variant="secondary"><ExternalLink size={15} /> View website</Button></Link>} />
      <div data-tour="content-tabs" className="flex gap-1 overflow-x-auto bg-white border border-line rounded-xl p-1.5 mb-4">
        {TABS.map((t) => (
          <button key={t.id} data-tour={`tab-${t.id}`} onClick={() => setTab(t.id)} className={cx("h-9 px-3.5 rounded-lg text-sm inline-flex items-center gap-2 whitespace-nowrap", tab === t.id ? "bg-ink text-white font-semibold" : "text-ink-3 hover:bg-steel-50")}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>
      {tab === "gallery" && <GalleryTab />}
      {tab === "pages" && <PagesTab />}
      {tab === "colours" && <ColoursTab />}
      {tab === "faqs" && <FaqTab />}
      {tab === "banner" && <BannerTab />}
      {tab === "business" && <BusinessTab />}
      {tab === "seo" && <SeoTab />}
    </>
  );
}

function GalleryTab() {
  const { gallery, setGallery, toast } = useStore();
  const [up, setUp] = useState(false);
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div><div className="text-sm font-semibold">Gallery photos ({gallery.length})</div><div className="text-xs text-ink-4">Starred photos show on the home page. Drag to reorder.</div></div>
        <Button variant="flame" onClick={() => setUp(true)}><Upload size={15} /> Upload photos</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {gallery.map((g, k) => (
          <div key={g.src + k} className="group rounded-xl border border-line overflow-hidden bg-white">
            <div className="relative">
              <img src={g.src} alt="" className="w-full aspect-[4/3] object-cover" />
              <span className="absolute left-2 top-2 p-1 rounded bg-white/90 text-ink-4 cursor-grab"><GripVertical size={14} /></span>
              <button onClick={() => setGallery(gallery.map((x, i) => (i === k ? { ...x, featured: !x.featured } : x)))} className={cx("absolute right-2 top-2 w-7 h-7 rounded-full inline-flex items-center justify-center", g.featured ? "bg-flame text-white" : "bg-white/90 text-ink-4")} aria-label="Feature on home page">
                <Star size={14} fill={g.featured ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="p-3">
              <input className="w-full text-sm font-medium outline-none" defaultValue={g.title} />
              <div className="flex items-center justify-between mt-1.5">
                <select className="text-xs text-ink-3 outline-none bg-transparent" defaultValue={g.cat}>{["Trade", "Automotive", "Landscaping", "Custom"].map((c) => <option key={c}>{c}</option>)}</select>
                <button onClick={() => { setGallery(gallery.filter((_, i) => i !== k)); toast("Photo removed."); }} className="p-1 rounded text-ink-5 hover:text-crit" aria-label="Delete"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal open={up} onClose={() => setUp(false)} title="Upload photos" width={520} footer={<><Button onClick={() => setUp(false)}>Cancel</Button><Button variant="flame" onClick={() => { setGallery([{ src: IMG.ute, cat: "Automotive", title: "New upload: canopy in textured black", featured: true }, ...gallery]); setUp(false); toast("1 photo added to the gallery and home page."); }}>Add to gallery</Button></>}>
        <div className="rounded-xl border-2 border-dashed border-line-3 p-8 text-center">
          <Upload size={26} className="mx-auto text-flame" />
          <div className="text-sm font-semibold mt-2">Drop photos here or choose from your phone</div>
          <div className="text-xs text-ink-4 mt-1">JPG or PNG. We resize and optimise them automatically.</div>
        </div>
        <div className="flex items-center gap-3 mt-4 rounded-lg bg-steel-50 p-3"><img src={IMG.ute} alt="" className="w-14 h-10 rounded object-cover" /><div className="text-sm flex-1">canopy-black.jpg <span className="text-ink-4">· 2.1 MB → 240 KB</span></div><Check size={16} className="text-good" /></div>
      </Modal>
    </Card>
  );
}

function PagesTab() {
  const { toast } = useStore();
  const [title, setTitle] = useState("Tough finishes. Big parts. No runaround.");
  const [sub, setSub] = useState("From full-length aluminium extrusions to a single set of wheels, we prep, coat and cure in-house with quality powders from Dulux, Interpon and Oxytech.");
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
      <Card>
        <div className="flex items-center gap-2 mb-4">{["Home", "Powder coating", "Trade", "Automotive", "Landscaping", "About"].map((p, k) => <span key={p} className={cx("text-xs px-2.5 py-1 rounded-full", k === 0 ? "bg-ink text-white" : "bg-steel-100 text-ink-3")}>{p}</span>)}</div>
        <div className="space-y-4">
          <Field label="Home page headline"><input className="input" value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
          <Field label="Introduction"><textarea rows={4} className="input" value={sub} onChange={(e) => setSub(e.target.value)} /></Field>
          <Field label="Hero image"><div className="flex items-center gap-3"><img src={IMG.hero} alt="" className="w-24 h-14 rounded-md object-cover" /><Button size="sm">Replace</Button></div></Field>
          <Button variant="flame" onClick={() => toast("Home page updated.")}>Save changes</Button>
        </div>
      </Card>
      <Card pad={false} className="overflow-hidden">
        <div className="px-4 py-2.5 border-b border-line text-xs text-ink-4 flex items-center gap-2"><Eye size={13} /> Live preview</div>
        <div className="relative bg-steel-950 text-white p-8 min-h-[300px]">
          <img src={IMG.hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="relative max-w-[420px]">
            <div className="display text-[30px] leading-[34px] font-extrabold">{title}</div>
            <p className="text-sm text-white/70 mt-3">{sub}</p>
            <span className="inline-flex mt-5 h-9 px-4 rounded-md bg-flame text-sm font-semibold items-center">Get a quote</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ColoursTab() {
  const { hiddenColours, toggleColour } = useStore();
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div><div className="text-sm font-semibold">Colours on the website</div><div className="text-xs text-ink-4">{COLOURS.length - hiddenColours.length} of {COLOURS.length} shown in the colour selector. Hide colours you don't stock.</div></div>
        <Button><Plus size={15} /> Add colour</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
        {COLOURS.map((c) => {
          const off = hiddenColours.includes(c.name);
          return (
            <div key={c.name} className={cx("flex items-center gap-3 rounded-lg border p-2.5", off ? "border-line opacity-55" : "border-line")}>
              <Swatch hex={c.hex} size={30} />
              <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{c.name}</div><div className="text-2xs text-ink-4 truncate">{c.group} · {c.finishes.join(", ")}</div></div>
              <button onClick={() => toggleColour(c.name)} className={cx("h-8 px-2.5 rounded-md text-xs inline-flex items-center gap-1.5 border", off ? "border-line-3 text-ink-4" : "border-good/30 text-good bg-good-bg")}>
                {off ? <EyeOff size={13} /> : <Eye size={13} />} {off ? "Hidden" : "Shown"}
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function FaqTab() {
  const { faqs, setFaqs, toast } = useStore();
  return (
    <Card>
      <div className="flex items-center justify-between mb-4"><div className="text-sm font-semibold">Frequently asked questions</div><Button onClick={() => setFaqs([...faqs, { q: "New question", a: "Answer" }])}><Plus size={15} /> Add question</Button></div>
      <div className="space-y-3">
        {faqs.map((f, k) => (
          <div key={k} className="rounded-xl border border-line p-4 flex gap-3">
            <GripVertical size={16} className="text-ink-5 mt-2 shrink-0" />
            <div className="flex-1 space-y-2">
              <input className="input h-9 font-semibold text-sm" value={f.q} onChange={(e) => setFaqs(faqs.map((x, i) => (i === k ? { ...x, q: e.target.value } : x)))} />
              <textarea rows={2} className="input text-sm" value={f.a} onChange={(e) => setFaqs(faqs.map((x, i) => (i === k ? { ...x, a: e.target.value } : x)))} />
            </div>
            <button onClick={() => setFaqs(faqs.filter((_, i) => i !== k))} className="p-1.5 h-8 rounded text-ink-5 hover:text-crit" aria-label="Delete"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
      <Button variant="flame" className="mt-4" onClick={() => toast("FAQs saved. Live on the website.")}>Save FAQs</Button>
    </Card>
  );
}

function BannerTab() {
  const { banner, setBanner, toast } = useStore();
  const [text, setText] = useState(banner.text);
  return (
    <div data-tour="banner-editor" className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Card>
        <div className="flex items-center justify-between">
          <div><div className="text-sm font-semibold">Notice banner</div><div className="text-xs text-ink-4">A strip across the top of every page. Use it for holiday closures or special notices.</div></div>
          <button onClick={() => { setBanner({ on: !banner.on, text }); toast(banner.on ? "Banner hidden." : "Banner is now live on the website."); }} className={cx("relative w-12 h-7 rounded-full transition-colors shrink-0", banner.on ? "bg-flame" : "bg-steel-200")} aria-label="Toggle banner">
            <span className={cx("absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all", banner.on ? "left-6" : "left-1")} />
          </button>
        </div>
        <Field label="Message" className="mt-5"><textarea rows={3} className="input" value={text} onChange={(e) => setText(e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Field label="Show from"><input type="date" className="input" defaultValue="2026-12-15" /></Field>
          <Field label="Until"><input type="date" className="input" defaultValue="2027-01-05" /></Field>
        </div>
        <div className="flex gap-2 mt-5">
          <Button variant="flame" onClick={() => { setBanner({ on: true, text }); toast("Banner is now live on the website."); }}>Save and show</Button>
          <Link to="/site"><Button><ExternalLink size={15} /> See it on the website</Button></Link>
        </div>
      </Card>
      <Card pad={false} className="overflow-hidden">
        <div className="px-4 py-2.5 border-b border-line text-xs text-ink-4 flex items-center gap-2"><Eye size={13} /> Preview</div>
        <div className="bg-flame text-white text-[13px] h-10 flex items-center justify-center gap-2 px-4 text-center"><Megaphone size={14} /> {text}</div>
        <div className="bg-steel-950 h-14 flex items-center px-5 text-white display-wide font-extrabold">HSR<span className="text-flame">.</span></div>
        <div className="h-40 relative"><img src={IMG.hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" /></div>
      </Card>
    </div>
  );
}

function BusinessTab() {
  const { business, setBusiness, toast } = useStore();
  const [b, setB] = useState(business);
  return (
    <Card className="max-w-[760px]">
      <div className="text-sm font-semibold mb-4">Business details</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Phone"><input className="input" value={b.phone} onChange={(e) => setB({ ...b, phone: e.target.value })} /></Field>
        <Field label="Email"><input className="input" value={b.email} onChange={(e) => setB({ ...b, email: e.target.value })} /></Field>
        <Field label="Workshop address" className="sm:col-span-2"><input className="input" value={b.address} onChange={(e) => setB({ ...b, address: e.target.value })} /></Field>
        <Field label="Opening hours" className="sm:col-span-2"><input className="input" value={b.hours} onChange={(e) => setB({ ...b, hours: e.target.value })} /></Field>
        <Field label="ABN"><input className="input" value={b.abn} onChange={(e) => setB({ ...b, abn: e.target.value })} /></Field>
        <Field label="Legal name"><input className="input" value={b.legal} onChange={(e) => setB({ ...b, legal: e.target.value })} /></Field>
      </div>
      <Button variant="flame" className="mt-5" onClick={() => { setBusiness(b); toast("Details updated across the website."); }}>Save details</Button>
    </Card>
  );
}

function SeoTab() {
  return (
    <Card>
      <div className="text-sm font-semibold mb-1">How each page appears on Google</div>
      <div className="text-xs text-ink-4 mb-5">Titles and descriptions are set up at launch around the searches your customers use. You can fine-tune them here.</div>
      <div className="space-y-4">
        {[
          ["Home", "Powder Coating Melbourne | Large 7 m Oven | HSR Powder Coating", "Powder coating for trade, automotive and landscaping. Full-length extrusions up to 7 m, Colorbond-matched colours, quotes from photos."],
          ["Automotive", "Wheel & Ute Tray Powder Coating | HSR Powder Coating", "Alloy wheels, ute trays, canopies and bars stripped and powder coated in gloss, satin, matt, textured and metallic finishes."],
          ["Landscaping", "Gate & Fence Powder Coating | HSR Powder Coating", "Durable powder coating for gates, fence panels, screens and outdoor furniture in Colorbond-matched colours."],
        ].map(([p, t, d]) => (
          <div key={p} className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 rounded-xl border border-line p-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-ink-3">{p}</div>
              <input className="input h-9 text-sm" defaultValue={t} />
              <textarea rows={2} className="input text-sm" defaultValue={d} />
            </div>
            <div className="rounded-lg bg-steel-50 p-4">
              <div className="text-2xs text-ink-4">hsrpowdercoating.com.au › {p.toLowerCase()}</div>
              <div className="text-[15px] text-[#1a0dab] mt-0.5 leading-5">{t}</div>
              <div className="text-xs text-ink-3 mt-1 leading-[18px]">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
