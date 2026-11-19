import { useState } from "react";
import { X } from "lucide-react";
import { useStore } from "../../state/store";
import { cx } from "../../components/ui";
import { SectionHead } from "./Home";

export default function Gallery() {
  const { gallery } = useStore();
  const [cat, setCat] = useState("All");
  const [lb, setLb] = useState<number | null>(null);
  const cats = ["All", "Trade", "Automotive", "Landscaping", "Custom"];
  const list = gallery.filter((g) => cat === "All" || g.cat === cat);
  return (
    <section className="max-w-[1240px] mx-auto px-4 lg:px-6 py-16 sm:py-20">
      <SectionHead eyebrow="Gallery" title="Recent work" sub="A selection of finished jobs. Updated by the HSR team from the CMS." />
      <div className="flex flex-wrap gap-2 mt-8">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cx("h-9 px-4 rounded-full text-sm border transition-colors", cat === c ? "bg-ink text-white border-ink" : "border-line-3 hover:border-ink-4")}>{c}</button>
        ))}
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-8 [column-fill:_balance]">
        {list.map((g, k) => (
          <button key={g.src + k} onClick={() => setLb(k)} className="relative block w-full mb-4 rounded-xl overflow-hidden group break-inside-avoid text-left">
            <img src={g.src} alt={g.title} className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 to-transparent text-white">
              <div className="text-2xs uppercase tracking-wider text-flame font-semibold">{g.cat}</div>
              <div className="text-sm font-medium">{g.title}</div>
            </div>
          </button>
        ))}
      </div>
      {lb !== null && list[lb] && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 anim-fade" onClick={() => setLb(null)}>
          <button className="absolute top-4 right-4 text-white p-2" aria-label="Close"><X size={24} /></button>
          <figure className="max-w-[1100px] w-full">
            <img src={list[lb].src} alt={list[lb].title} className="w-full max-h-[80vh] object-contain rounded-lg" />
            <figcaption className="text-white/80 text-sm mt-3 text-center">{list[lb].title}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
