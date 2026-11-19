import { Link } from "react-router-dom";
import { ArrowRight, Camera, FileText, Truck, BellRing, Ruler, Layers, Paintbrush, Clock, Check, Plus, Minus, Building2 } from "lucide-react";
import { useState } from "react";
import { IMG, COLOURS } from "../../data/seed";
import { useStore } from "../../state/store";
import { cx } from "../../components/ui";

export function SectionHead({ eyebrow, title, sub, light, center }: { eyebrow: string; title: string; sub?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={cx("max-w-[720px]", center && "mx-auto text-center")}>
      <div className="eyebrow text-flame mb-3">{eyebrow}</div>
      <h2 className={cx("display text-[30px] leading-[36px] sm:text-[40px] sm:leading-[46px] font-extrabold", light ? "text-white" : "text-ink")}>{title}</h2>
      {sub && <p className={cx("text-[15px] leading-6 mt-3", light ? "text-white/60" : "text-ink-3")}>{sub}</p>}
    </div>
  );
}

const AUD = [
  { to: "/site/who/trade", img: IMG.trade, t: "Trade & fabricators", d: "Window makers, builders, shopfitters and steel fabricators. Long lengths, repeat volume, account terms." },
  { to: "/site/who/automotive", img: IMG.wheels, t: "Automotive", d: "Wheels, ute trays, canopies, roll bars and frames, stripped, prepped and finished to last." },
  { to: "/site/who/landscaping", img: IMG.gate, t: "Landscaping & custom", d: "Gates, fence panels, screens, planters and outdoor furniture, plus the one-off jobs." },
];

export default function Home() {
  const { gallery, faqs } = useStore();
  const [open, setOpen] = useState(0);
  return (
    <>
      <section data-tour="hero" className="relative bg-steel-950 text-white overflow-hidden">
        <img src={IMG.hero} alt="Powder coating long aluminium extrusions in a spray booth" className="absolute inset-0 w-full h-full object-cover kenburns" />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/80 to-steel-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-transparent to-transparent" />
        <div className="relative max-w-[1240px] mx-auto px-4 lg:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-[640px] anim-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-flame" /> Now taking bookings · Trade accounts available
            </div>
            <h1 className="display text-[42px] leading-[46px] sm:text-[64px] sm:leading-[66px] font-extrabold">
              Tough finishes.<br />Big parts.<br /><span className="text-flame">No runaround.</span>
            </h1>
            <p className="text-white/70 text-[16px] leading-[26px] mt-6 max-w-[540px]">
              From full-length aluminium extrusions to a single set of wheels, we prep, coat and cure in-house with quality powders from Dulux, Interpon and Oxytech.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/site/quote" className="h-12 px-6 rounded-md bg-flame hover:bg-flame-600 text-white font-semibold inline-flex items-center gap-2 shadow-[0_10px_28px_-10px_rgba(255,90,31,.8)]">
                Get a quote <ArrowRight size={17} />
              </Link>
              <Link to="/site/colours" className="h-12 px-6 rounded-md border border-white/25 hover:bg-white/10 font-semibold inline-flex items-center gap-2">
                Browse colours
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-white/65">
              {["Quotes from photos", "Colorbond-matched colours", "SMS when your job is ready"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5"><Check size={15} className="text-flame" /> {t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-tour="stats" className="relative z-10 max-w-[1240px] mx-auto px-4 lg:px-6 -mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden shadow-pop bg-white border border-line">
          {[
            { icon: Ruler, v: "7 m", l: "Long-part oven", d: "Full lengths in one pass" },
            { icon: Layers, v: "3 × 3 m", l: "Oven opening", d: "Width × height for big frames" },
            { icon: Paintbrush, v: "3", l: "Premium powder brands", d: "Dulux · Interpon · Oxytech" },
            { icon: Clock, v: "1 day", l: "Quote reply", d: "Send photos, get a price" },
          ].map((s, k) => (
            <div key={s.l} className={cx("p-5 sm:p-6", k % 2 === 1 && "border-l border-line", k >= 2 && "border-t lg:border-t-0 border-line", k === 2 && "lg:border-l")}>
              <s.icon size={20} className="text-flame" />
              <div className="display text-[30px] sm:text-[36px] font-extrabold mt-3 tnum">{s.v}</div>
              <div className="text-sm font-semibold text-ink">{s.l}</div>
              <div className="text-xs text-ink-4 mt-0.5">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section data-tour="audiences" className="max-w-[1240px] mx-auto px-4 lg:px-6 py-20 sm:py-24">
        <SectionHead eyebrow="Who we coat" title="Built for the trade, the road and the backyard" sub="Three kinds of customers, one standard of finish. Pick yours to see what we coat and how we work with you." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {AUD.map((a) => (
            <Link key={a.to} to={a.to} className="group relative rounded-2xl overflow-hidden h-[380px] bg-steel-900 text-white">
              <img src={a.img} alt={a.t} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="display text-[24px] font-bold">{a.t}</h3>
                <p className="text-sm text-white/70 mt-2 leading-[21px]">{a.d}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame mt-4">Learn more <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section data-tour="oven" className="bg-steel-950 text-white">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[560px]">
            <img src={IMG.oven} alt="Large curing oven with coated beams on a trolley" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute left-5 bottom-5 rounded-xl bg-steel-950/80 backdrop-blur px-4 py-3 border border-white/10">
              <div className="text-2xs text-white/50 uppercase tracking-wider">Oven size</div>
              <div className="display text-[22px] font-bold tnum">7.0 × 3.0 × 3.0 m</div>
            </div>
          </div>
          <div className="px-4 lg:px-14 py-16 lg:py-20 flex flex-col justify-center">
            <SectionHead eyebrow="The big oven" title="Full lengths. One pass. No joins." sub="Most extrusions and beams arrive in long lengths. Our 7 m oven coats them whole, so trade customers get consistent colour along the full length and faster turnaround." light />
            <ul className="mt-8 space-y-4">
              {[
                ["Long extrusions and sections", "Aluminium extrusions, steel beams and posts up to 7 m"],
                ["Large frames and gates", "Driveway gates, pergola frames and fence runs up to 3 m high"],
                ["Colour-batched runs", "Trade orders scheduled by colour for efficient, consistent loads"],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1 w-6 h-6 rounded-full bg-flame/15 text-flame inline-flex items-center justify-center shrink-0"><Check size={14} /></span>
                  <div><div className="font-semibold">{t}</div><div className="text-sm text-white/55">{d}</div></div>
                </li>
              ))}
            </ul>
            <Link to="/site/quote" className="mt-10 self-start h-12 px-6 rounded-md bg-white text-ink font-semibold inline-flex items-center gap-2 hover:bg-steel-100">Quote a long-length job <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section data-tour="process" className="max-w-[1240px] mx-auto px-4 lg:px-6 py-20 sm:py-24">
        <SectionHead eyebrow="How it works" title="From photo to finished, in four steps" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { icon: Camera, t: "Send photos", d: "Tell us what you have, rough sizes and the colour you want. Photos help us price it accurately." },
            { icon: FileText, t: "Get your quote", d: "A clear, itemised quote with GST and an expected turnaround, by email or SMS." },
            { icon: Truck, t: "Drop off", d: "Bring it in, or ask about pick-up for larger trade and landscaping jobs." },
            { icon: BellRing, t: "We text you when it's ready", d: "Prepped, coated, cured and checked. We SMS you the moment it's ready to collect." },
          ].map((s, k) => (
            <div key={s.t} className="relative rounded-2xl border border-line p-6 bg-white hover:shadow-pop transition-shadow">
              <span className="absolute right-5 top-5 display-wide text-[13px] font-bold text-steel-300">0{k + 1}</span>
              <div className="w-11 h-11 rounded-xl bg-flame-50 text-flame inline-flex items-center justify-center"><s.icon size={20} /></div>
              <div className="font-semibold text-ink mt-5">{s.t}</div>
              <p className="text-sm text-ink-3 mt-1.5 leading-[21px]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-steel-50 border-y border-line">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead eyebrow="Colours" title="Hundreds of colours, every finish" sub="Colorbond-matched colours, classic blacks and whites, and specialty metallics, in gloss, satin, matt and textured finishes." />
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mt-8 max-w-[440px]">
              {COLOURS.slice(0, 16).map((c) => (
                <div key={c.name} title={c.name} className="aspect-square rounded-lg ring-1 ring-black/10 hover:scale-110 transition-transform" style={{ background: c.hex }} />
              ))}
            </div>
            <Link to="/site/colours" className="mt-8 inline-flex h-11 px-5 rounded-md bg-ink text-white text-sm font-semibold items-center gap-2 hover:bg-steel-700">Open the colour selector <ArrowRight size={15} /></Link>
          </div>
          <img src={IMG.swatches} alt="Powder coat colour sample panels" className="rounded-2xl shadow-pop w-full aspect-[4/3] object-cover" />
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-4 lg:px-6 py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Recent work" title="Finished, cured and checked" />
          <Link to="/site/gallery" className="text-sm font-semibold inline-flex items-center gap-1.5 text-ink hover:text-flame">View the gallery <ArrowRight size={15} /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          {gallery.filter((g) => g.featured).slice(0, 4).map((g, k) => (
            <figure key={g.src + k} className={cx("relative rounded-xl overflow-hidden group", k === 0 && "col-span-2 row-span-2")}>
              <img src={g.src} alt={g.title} className={cx("w-full object-cover group-hover:scale-105 transition-transform duration-700", k === 0 ? "h-full min-h-[300px]" : "aspect-[4/3]")} />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-medium">{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-4 lg:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-flame text-white">
          <div className="absolute inset-0 hatch opacity-60" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 p-8 sm:p-12 items-center">
            <div>
              <Building2 size={28} />
              <h2 className="display text-[30px] leading-[36px] sm:text-[36px] sm:leading-[42px] font-extrabold mt-4">Trade account? Let's talk volume.</h2>
              <p className="text-white/85 mt-3 max-w-[560px]">Fabricators, window makers, builders and landscapers get account terms, priority scheduling and colour-batched runs.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/site/quote" className="h-12 px-6 rounded-md bg-white text-ink font-semibold inline-flex items-center gap-2 hover:bg-steel-100">Apply for a trade account <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-4 lg:px-6 py-20 sm:py-24">
        <SectionHead eyebrow="Questions" title="Good to know" center />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.slice(0, 4).map((f, k) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === k ? -1 : k)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                <span className="font-semibold text-ink">{f.q}</span>
                {open === k ? <Minus size={18} className="text-flame shrink-0" /> : <Plus size={18} className="shrink-0" />}
              </button>
              {open === k && <p className="pb-5 -mt-1 text-sm text-ink-3 leading-[22px] anim-fade">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-steel-950 text-white">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="display text-[28px] sm:text-[34px] font-extrabold">Ready for a price?</h2>
            <p className="text-white/60 mt-1.5">Send a few photos and rough sizes. We'll reply within one business day.</p>
          </div>
          <Link to="/site/quote" className="h-12 px-6 rounded-md bg-flame hover:bg-flame-600 text-white font-semibold inline-flex items-center gap-2 self-start">Get a quote <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
