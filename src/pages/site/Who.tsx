import { useParams, Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { IMG } from "../../data/seed";
import { PageHero } from "./Service";
import { SectionHead } from "./Home";

const DATA = {
  trade: {
    crumb: "Trade & fabricators", eyebrow: "For trade", img: IMG.trade,
    title: "A coating partner that keeps up with your jobs",
    sub: "Window and door makers, builders, shopfitters and steel fabricators: full-length coating, colour-batched runs and account terms.",
    points: ["Full-length extrusions and sections up to 7 m", "Colour-batched scheduling for repeat colours", "Trade account terms and priority booking", "Job status by SMS: received, in progress, ready", "Consistent finish across every batch"],
    items: ["Aluminium extrusions", "Window and door frames", "Shopfit frames and brackets", "Structural steel", "Balustrades", "Pergola beams and posts"],
  },
  automotive: {
    crumb: "Automotive", eyebrow: "For automotive", img: IMG.wheels,
    title: "Wheels, trays and parts that look and last like new",
    sub: "Alloy wheels, ute trays and canopies, roll bars, bull bars and frames, stripped, prepped and coated in a finish that handles the road.",
    points: ["Stripping of old paint or powder coat", "Gloss, satin, matt, textured and metallic finishes", "Careful masking of bearing and mounting surfaces", "Durable textured finishes for trays and bars", "SMS when ready to collect"],
    items: ["Alloy wheels", "Ute trays and canopies", "Roll bars and bull bars", "Car and bike frames", "Brackets and engine parts", "Tool boxes"],
  },
  landscaping: {
    crumb: "Landscaping & custom", eyebrow: "For landscaping & custom", img: IMG.gate,
    title: "Gates, fences and outdoor pieces, built for Aussie weather",
    sub: "Landscapers and homeowners: fence panels, gates, screens, planters and outdoor furniture, plus the custom one-off jobs.",
    points: ["Colorbond-matched colours to suit the home", "Large gates and long fence runs", "Restoration of rusty or old furniture", "Pick-up available for larger jobs", "Help choosing colour and finish"],
    items: ["Slat fence panels", "Driveway and pedestrian gates", "Pool fencing", "Privacy screens", "Planter boxes", "Outdoor tables and chairs"],
  },
} as const;

export default function Who() {
  const { seg = "trade" } = useParams();
  const d = DATA[(seg as keyof typeof DATA)] ?? DATA.trade;
  return (
    <>
      <PageHero crumb={d.crumb} eyebrow={d.eyebrow} title={d.title} sub={d.sub} img={d.img} />
      <section className="max-w-[1240px] mx-auto px-4 lg:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <SectionHead eyebrow="Why HSR" title="What you can expect" />
          <ul className="mt-8 space-y-4">
            {d.points.map((p) => (
              <li key={p} className="flex gap-3"><span className="mt-0.5 w-6 h-6 rounded-full bg-flame-50 text-flame inline-flex items-center justify-center shrink-0"><Check size={14} /></span><span className="text-[15px]">{p}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-steel-50 border border-line p-8">
          <div className="eyebrow text-flame mb-3">Common jobs</div>
          <div className="grid grid-cols-2 gap-3">
            {d.items.map((t) => <div key={t} className="rounded-xl bg-white border border-line px-4 py-3 text-sm font-medium">{t}</div>)}
          </div>
          <Link to="/site/quote" className="mt-8 h-12 px-6 rounded-md bg-ink text-white font-semibold inline-flex items-center gap-2 hover:bg-steel-700">Request a quote <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
