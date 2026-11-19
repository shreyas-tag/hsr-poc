import { useNavigate } from "react-router-dom";
import { Globe, Inbox, Factory, Palette, ArrowRight, Compass, RotateCcw, FileText, MessageSquare, ClipboardList, Flame, BellRing, Receipt, BookOpen } from "lucide-react";
import { DemoBar } from "../components/DemoBar";
import { useTour } from "../components/Tour";
import { useStore } from "../state/store";
import { LogoIcon } from "../components/Logos";
import { IMG } from "../data/seed";
import type { TourId } from "../data/tours";

const UNITS: { n: string; title: string; text: string; to: string; tour: TourId; icon: typeof Globe; img?: string; tag: string }[] = [
  { n: "01", title: "Website", text: "A modern, fast website built to win quotes: who you coat, your 7 m oven, a colour selector and a smart quote form with photos.", to: "/site", tour: "site", icon: Globe, img: IMG.hero, tag: "Module 2" },
  { n: "02", title: "CMS", text: "Your back office for the website: every quote request in one inbox, lead status and notes, and simple editing of photos, text and colours.", to: "/cms", tour: "cms", icon: Inbox, img: IMG.trade, tag: "Module 2" },
  { n: "03", title: "Workshop System", text: "Run the workshop: quotes with GST, jobs by stage, colour batching for oven loads, shop-floor mode, SMS updates and invoices into Xero.", to: "/ws", tour: "ws", icon: Factory, img: IMG.oven, tag: "Module 3" },
  { n: "04", title: "Logo concepts", text: "Three early logo directions with colours, type and real-world mock-ups, as a starting point for your brand.", to: "/brand", tour: "brand", icon: Palette, tag: "Module 1" },
];

const FLOW = [
  { icon: Globe, label: "Quote request on website" },
  { icon: Inbox, label: "Lands in CMS inbox" },
  { icon: FileText, label: "Priced quote with GST" },
  { icon: ClipboardList, label: "Accepted → job" },
  { icon: Flame, label: "Batched into oven load" },
  { icon: BellRing, label: "\"Ready\" SMS to customer" },
  { icon: Receipt, label: "Invoice synced to Xero" },
];

export default function Hub() {
  const nav = useNavigate();
  const { start } = useTour();
  const { reset, toast } = useStore();
  return (
    <div className="min-h-full bg-steel-950 text-white">
      <DemoBar />
      <section className="relative overflow-hidden">
        <img src={IMG.hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35 kenburns" />
        <div className="absolute inset-0 bg-gradient-to-b from-steel-950/70 via-steel-950/80 to-steel-950" />
        <div className="absolute inset-0 hatch" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="anim-up">
            <div className="eyebrow text-flame mb-4">Concept walkthrough · prepared for Harshal Gaikar</div>
            <h1 className="display text-[38px] leading-[42px] sm:text-[56px] sm:leading-[60px] font-extrabold max-w-[880px]">
              HSR Powder Coating, <span className="text-white/45">online and organised from day one.</span>
            </h1>
            <p className="text-white/65 text-[15px] leading-6 mt-5 max-w-[640px]">
              A website that wins quotes, a CMS to manage enquiries and content, and a Workshop System that runs jobs from quote to invoice. Click through freely, or take a guided tour of each part.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={() => start("site")} className="h-12 px-6 rounded-md bg-flame hover:bg-flame-600 text-white font-semibold inline-flex items-center gap-2 shadow-[0_10px_28px_-10px_rgba(255,90,31,.8)]">
                <Compass size={18} /> Start the guided tour
              </button>
              <button onClick={() => nav("/site")} className="h-12 px-6 rounded-md border border-white/20 hover:bg-white/10 font-semibold inline-flex items-center gap-2">
                Open the website <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UNITS.map((u, k) => (
            <article key={u.n} className="group relative rounded-2xl border border-white/10 bg-steel-900 overflow-hidden anim-up" style={{ animationDelay: `${k * 70}ms` }}>
              <div className="relative h-44 overflow-hidden">
                {u.img ? (
                  <img src={u.img} alt="" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center gap-6 bg-gradient-to-br from-steel-800 to-steel-900">
                    <LogoIcon id="arc" size={64} />
                    <LogoIcon id="layers" mode="dark" size={64} />
                    <LogoIcon id="hex" size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-steel-900 via-steel-900/30 to-transparent" />
                <div className="absolute left-5 top-4 flex items-center gap-2">
                  <span className="display-wide text-[13px] font-bold text-flame">{u.n}</span>
                  <span className="text-[10px] uppercase tracking-wider rounded px-1.5 py-0.5 bg-white/10 text-white/70">{u.tag}</span>
                </div>
              </div>
              <div className="p-5 pt-1">
                <div className="flex items-center gap-2.5">
                  <u.icon size={19} className="text-flame" />
                  <h2 className="display text-[22px] font-bold">{u.title}</h2>
                </div>
                <p className="text-white/60 text-sm leading-[21px] mt-2 min-h-[63px]">{u.text}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => start(u.tour)} className="h-10 px-4 rounded-md bg-white text-ink text-sm font-semibold inline-flex items-center gap-2 hover:bg-steel-100">
                    <Compass size={16} className="text-flame" /> Guided tour
                  </button>
                  <button onClick={() => nav(u.to)} className="h-10 px-4 rounded-md border border-white/15 text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/10">
                    Explore <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-steel-900/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
          <div className="eyebrow text-flame mb-2">How it connects</div>
          <h2 className="display text-[26px] font-bold">One flow, from first click to paid invoice</h2>
          <p className="text-white/55 text-sm mt-1.5 max-w-[640px]">Try it: submit a quote on the website, find it in the CMS inbox, then turn it into a quote and a job in the Workshop System.</p>
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {FLOW.map((f, k) => (
              <div key={f.label} className="relative rounded-xl border border-white/10 bg-steel-850 p-3.5">
                <div className="flex items-center justify-between">
                  <f.icon size={18} className="text-flame" />
                  <span className="text-[10px] text-white/35 tnum">{String(k + 1).padStart(2, "0")}</span>
                </div>
                <div className="text-[12.5px] leading-[17px] mt-3 text-white/85">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: BookOpen, t: "Sample content", d: "Customers, jobs and numbers are made up to show how it works. Your real details replace them at build." },
          { icon: Palette, t: "Placeholder name and images", d: "\"HSR.\" in plain text stands in until you choose a logo. Photos are AI-generated concept images; we'll use your workshop photos." },
          { icon: MessageSquare, t: "Built around you", d: "Stages, price list, SMS wording and reports are set up to match how you work, agreed in a short planning call." },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border border-white/10 p-5">
            <x.icon size={18} className="text-flame" />
            <div className="font-semibold mt-3">{x.t}</div>
            <p className="text-white/55 text-sm mt-1 leading-[21px]">{x.d}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/45">
          <span>Prepared by Axera Digital for HSR Powder Coating and Fabrication Pty Ltd · Concept only</span>
          <button onClick={() => { reset(); toast("Demo data reset."); }} className="inline-flex items-center gap-1.5 hover:text-white">
            <RotateCcw size={13} /> Reset demo data
          </button>
        </div>
      </footer>
    </div>
  );
}
