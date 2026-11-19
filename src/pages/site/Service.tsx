import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Leaf, Sparkles, Hammer, Droplets, Flame, SearchCheck, Package } from "lucide-react";
import { IMG } from "../../data/seed";
import { SectionHead } from "./Home";

export function PageHero({ eyebrow, title, sub, img, crumb }: { eyebrow: string; title: string; sub: string; img: string; crumb: string }) {
  return (
    <section className="relative bg-steel-950 text-white overflow-hidden">
      <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 kenburns" />
      <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/85 to-steel-950/30" />
      <div className="relative max-w-[1240px] mx-auto px-4 lg:px-6 py-16 sm:py-24">
        <div className="text-xs text-white/50 mb-4"><Link to="/site" className="hover:text-white">Home</Link> <span className="mx-1.5">/</span> {crumb}</div>
        <div className="eyebrow text-flame mb-3">{eyebrow}</div>
        <h1 className="display text-[36px] leading-[42px] sm:text-[52px] sm:leading-[56px] font-extrabold max-w-[760px]">{title}</h1>
        <p className="text-white/70 text-[16px] leading-[26px] mt-5 max-w-[600px]">{sub}</p>
        <Link to="/site/quote" className="mt-8 h-12 px-6 rounded-md bg-flame hover:bg-flame-600 text-white font-semibold inline-flex items-center gap-2">Get a quote <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}

export default function Service() {
  return (
    <>
      <PageHero crumb="Powder coating" eyebrow="Powder coating" title="A finish that outlasts paint, inside and out" sub="Powder coating is a dry powder applied electrostatically and baked into a hard, even layer. It resists chips, fading and corrosion far better than wet paint." img={IMG.hero} />
      <section className="max-w-[1240px] mx-auto px-4 lg:px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { i: ShieldCheck, t: "Tougher", d: "Resists chipping, scratching and corrosion, for outdoor and high-wear items." },
            { i: Sparkles, t: "Even, premium finish", d: "Consistent colour and sheen with no runs or drips, even on complex shapes." },
            { i: Leaf, t: "Cleaner process", d: "No solvents. Overspray powder can be recovered and reused." },
            { i: Droplets, t: "Every finish", d: "Gloss, satin, matt, textured and metallic finishes in hundreds of colours." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-line p-6">
              <b.i size={22} className="text-flame" />
              <div className="font-semibold mt-4">{b.t}</div>
              <p className="text-sm text-ink-3 mt-1.5 leading-[21px]">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-steel-50 border-y border-line">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-20">
          <SectionHead eyebrow="Our process" title="Prep is everything" sub="A finish is only as good as the preparation underneath it. Every job follows the same checked process." />
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-10">
            {[
              { i: SearchCheck, t: "Inspect", d: "Check material, condition and masking needs." },
              { i: Hammer, t: "Prepare", d: "Strip old coatings, clean and pre-treat the surface." },
              { i: Droplets, t: "Coat", d: "Apply powder electrostatically in our spray booth." },
              { i: Flame, t: "Cure", d: "Bake in the 7 m oven to the powder's cure schedule." },
              { i: Package, t: "Check & pack", d: "Inspect finish and coverage, then wrap for collection." },
            ].map((s, k) => (
              <li key={s.t} className="rounded-2xl bg-white border border-line p-5">
                <div className="flex items-center justify-between"><s.i size={20} className="text-flame" /><span className="text-xs text-ink-5 font-semibold">0{k + 1}</span></div>
                <div className="font-semibold mt-4">{s.t}</div>
                <p className="text-sm text-ink-3 mt-1 leading-[20px]">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="max-w-[1240px] mx-auto px-4 lg:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <img src={IMG.oven} alt="Coated sections leaving the oven" className="rounded-2xl shadow-pop w-full aspect-[4/3] object-cover" />
        <div>
          <SectionHead eyebrow="What we coat" title="Steel and aluminium, small to 7 m" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8 text-sm">
            {["Aluminium extrusions", "Window and door frames", "Steel beams and posts", "Balustrades and handrails", "Gates and fence panels", "Pergolas and screens", "Alloy wheels", "Ute trays and canopies", "Roll bars and bull bars", "Bike and motorbike frames", "Outdoor furniture", "Brackets and small parts"].map((t) => (
              <div key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-flame" /> {t}</div>
            ))}
          </div>
          <p className="text-xs text-ink-4 mt-6">Not sure if your item can be coated? Send a photo with your quote request and we'll tell you.</p>
        </div>
      </section>
    </>
  );
}
