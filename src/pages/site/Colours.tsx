import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Check, ArrowRight, Info } from "lucide-react";
import { COLOURS } from "../../data/seed";
import { useStore } from "../../state/store";
import { cx } from "../../components/ui";
import { SectionHead } from "./Home";

export default function Colours() {
  const { hiddenColours } = useStore();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("All");
  const [finish, setFinish] = useState("All");
  const [pick, setPick] = useState<string | null>("Monument");
  const list = COLOURS.filter((c) => !hiddenColours.includes(c.name) && (group === "All" || c.group === group) && (finish === "All" || c.finishes.includes(finish)) && c.name.toLowerCase().includes(q.toLowerCase()));
  const sel = COLOURS.find((c) => c.name === pick);
  return (
    <section className="max-w-[1240px] mx-auto px-4 lg:px-6 py-16 sm:py-20">
      <SectionHead eyebrow="Colour selector" title="Find your colour" sub="Search and filter by range and finish, then add your pick straight to a quote request." />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 mt-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <div className="flex items-center gap-2 h-10 px-3 rounded-md border border-line-3 w-full sm:w-64 focus-within:border-flame">
              <Search size={15} className="text-ink-4" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search colours" className="flex-1 outline-none text-sm bg-transparent" />
            </div>
            <select value={group} onChange={(e) => setGroup(e.target.value)} className="input w-auto h-10 text-sm">
              {["All", "Colorbond-matched", "Standard", "Specialty"].map((g) => <option key={g}>{g}</option>)}
            </select>
            <select value={finish} onChange={(e) => setFinish(e.target.value)} className="input w-auto h-10 text-sm">
              {["All", "Gloss", "Satin", "Matt", "Texture", "Metallic"].map((g) => <option key={g}>{g}</option>)}
            </select>
            <span className="text-xs text-ink-4 ml-auto">{list.length} colours</span>
          </div>
          <div data-tour="colour-grid" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {list.map((c) => (
              <button key={c.name} onClick={() => setPick(c.name)} className={cx("text-left rounded-xl border p-1.5 transition-all", pick === c.name ? "border-flame ring-2 ring-flame/20" : "border-line hover:border-ink-4")}>
                <div className="relative aspect-square rounded-lg ring-1 ring-black/10" style={{ background: `linear-gradient(140deg, rgba(255,255,255,.18), rgba(0,0,0,.12)), ${c.hex}` }}>
                  {pick === c.name && <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white text-flame inline-flex items-center justify-center"><Check size={13} /></span>}
                </div>
                <div className="text-xs font-semibold mt-1.5 px-0.5 truncate">{c.name}</div>
                <div className="text-[10.5px] text-ink-4 px-0.5 truncate">{c.finishes.join(" · ")}</div>
              </button>
            ))}
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 self-start rounded-2xl border border-line overflow-hidden shadow-card">
          {sel ? (
            <>
              <div className="h-48" style={{ background: `linear-gradient(140deg, rgba(255,255,255,.2), rgba(0,0,0,.18)), ${sel.hex}` }} />
              <div className="p-5">
                <div className="text-2xs uppercase tracking-wider text-ink-4">{sel.group}</div>
                <div className="display text-[24px] font-bold">{sel.name}</div>
                <div className="flex flex-wrap gap-1.5 mt-3">{sel.finishes.map((f) => <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-steel-100">{f}</span>)}</div>
                <button onClick={() => nav(`/site/quote?colour=${encodeURIComponent(sel.name)}`)} className="mt-5 w-full h-11 rounded-md bg-flame hover:bg-flame-600 text-white font-semibold inline-flex items-center justify-center gap-2">
                  Use in my quote <ArrowRight size={16} />
                </button>
                <p className="text-2xs text-ink-4 mt-4 flex gap-1.5"><Info size={13} className="shrink-0 mt-px" /> Screen colours are a guide only. Ask to see a physical sample before you decide.</p>
              </div>
            </>
          ) : (
            <div className="p-6 text-sm text-ink-4">Pick a colour to see it larger.</div>
          )}
        </aside>
      </div>
    </section>
  );
}
