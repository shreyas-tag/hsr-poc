import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight, Target, Gauge, Handshake } from "lucide-react";
import { IMG } from "../../data/seed";
import { useStore } from "../../state/store";
import { SectionHead } from "./Home";

export function About() {
  return (
    <>
      <section className="max-w-[1240px] mx-auto px-4 lg:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHead eyebrow="About HSR" title="A new powder coating shop, set up to do it properly" sub="HSR Powder Coating is locally owned and run, with a large-format oven, a modern spray booth and quality powders from Dulux, Interpon and Oxytech. We started HSR to give trade, automotive and landscaping customers a coater that's easy to deal with: clear quotes, honest turnaround and a finish that lasts." />
          <p className="text-[15px] text-ink-3 leading-6 mt-4">Fabrication services are coming soon, so you'll be able to have items made and coated in one place.</p>
          <Link to="/site/quote" className="mt-8 h-12 px-6 rounded-md bg-flame text-white font-semibold inline-flex items-center gap-2">Get a quote <ArrowRight size={16} /></Link>
        </div>
        <img src={IMG.oven} alt="HSR oven" className="rounded-2xl shadow-pop w-full aspect-[4/3] object-cover" />
      </section>
      <section className="bg-steel-50 border-t border-line">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { i: Target, t: "Finish first", d: "Prep and checks on every job, big or small." },
            { i: Gauge, t: "Straight answers", d: "Clear quotes and a turnaround we stick to." },
            { i: Handshake, t: "Easy to deal with", d: "SMS updates, quick replies and trade terms." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl bg-white border border-line p-6"><v.i size={22} className="text-flame" /><div className="font-semibold mt-4">{v.t}</div><p className="text-sm text-ink-3 mt-1">{v.d}</p></div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Contact() {
  const { business } = useStore();
  return (
    <section className="max-w-[1240px] mx-auto px-4 lg:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <SectionHead eyebrow="Contact" title="Come and see us" sub="Drop-offs during opening hours. For quotes, the online form is the fastest way." />
        <div className="mt-8 space-y-4">
          {[
            { i: Phone, l: "Phone", v: business.phone },
            { i: Mail, l: "Email", v: business.email },
            { i: MapPin, l: "Workshop", v: business.address },
            { i: Clock, l: "Hours", v: business.hours },
          ].map((r) => (
            <div key={r.l} className="flex gap-4 rounded-xl border border-line p-4">
              <span className="w-10 h-10 rounded-lg bg-flame-50 text-flame inline-flex items-center justify-center shrink-0"><r.i size={18} /></span>
              <div><div className="text-xs text-ink-4">{r.l}</div><div className="font-medium">{r.v}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden min-h-[380px] bg-steel-100 border border-line">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#D8DDE3 1px, transparent 1px), linear-gradient(90deg, #D8DDE3 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,.7) 40%, rgba(255,255,255,.7) 46%, transparent 46%), linear-gradient(20deg, transparent 58%, rgba(255,255,255,.8) 58%, rgba(255,255,255,.8) 62%, transparent 62%)" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
          <div className="rounded-lg bg-ink text-white text-xs font-semibold px-3 py-1.5 shadow-pop">HSR Powder Coating</div>
          <MapPin size={34} className="text-flame -mt-1" fill="#FF5A1F" stroke="#fff" />
        </div>
        <div className="absolute bottom-3 left-3 text-2xs text-ink-4 bg-white/80 rounded px-2 py-1">Google Map goes here once the address is confirmed</div>
      </div>
    </section>
  );
}
