import { useState } from "react";
import { Heart, Check } from "lucide-react";
import { DemoBar } from "../components/DemoBar";
import { TourLauncher } from "../components/Tour";
import { CONCEPTS, LogoIcon, LogoLockup, BusinessCard, Sign, type LogoId } from "../components/Logos";
import { cx, Segmented } from "../components/ui";
import { useStore } from "../state/store";

const IDS: LogoId[] = ["arc", "layers", "hex"];

export default function Brand() {
  const [fav, setFav] = useState<LogoId | null>(null);
  const [app, setApp] = useState<LogoId>("arc");
  const { toast } = useStore();
  return (
    <div className="min-h-full bg-[#F3F2EF]">
      <DemoBar />
      <header className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="eyebrow text-flame mb-2">Module 1 · Logo and brand</div>
        <h1 className="display text-[34px] leading-[40px] sm:text-[44px] sm:leading-[50px] font-extrabold max-w-[800px]">Three early directions for the HSR logo</h1>
        <p className="text-ink-3 mt-3 max-w-[680px] text-[15px] leading-6">
          Quick concepts to start the conversation, not final artwork. Pick the direction that feels most like your business; the logo package then refines it with two rounds of changes and delivers final files.
        </p>
      </header>

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-5">
        {IDS.map((id, k) => {
          const c = CONCEPTS[id];
          const dark = c.palette[0].hex;
          return (
            <article key={id} data-tour={`logo-${k + 1}`} className="rounded-2xl bg-white border border-line overflow-hidden shadow-card">
              <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="min-h-[220px] flex items-center justify-center p-8 bg-white border-b sm:border-b-0 sm:border-r border-line">
                    <LogoLockup id={id} />
                  </div>
                  <div className="min-h-[220px] flex items-center justify-center p-8" style={{ background: dark }}>
                    <LogoLockup id={id} mode="dark" />
                  </div>
                </div>
                <div className="p-6 lg:border-l border-line flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-2xs text-ink-4 uppercase tracking-wider">Direction {k + 1}</div>
                      <h2 className="display text-[24px] font-bold">{c.name}</h2>
                    </div>
                    <button
                      onClick={() => { setFav(id); toast(`"${c.name}" marked as your favourite.`); }}
                      className={cx("h-9 px-3 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors", fav === id ? "bg-flame text-white border-flame" : "border-line-3 hover:border-ink-4")}
                    >
                      {fav === id ? <Check size={14} /> : <Heart size={14} />} {fav === id ? "Favourite" : "I like this"}
                    </button>
                  </div>
                  <p className="text-sm text-ink-3 mt-2 leading-[21px]">{c.idea}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.feel.map((f) => <span key={f} className="text-2xs px-2 py-1 rounded-full bg-steel-100 text-ink-2">{f}</span>)}
                  </div>
                  <div className="mt-auto pt-5 grid grid-cols-4 gap-2">
                    {c.palette.map((p) => (
                      <div key={p.hex}>
                        <div className="h-10 rounded-md ring-1 ring-black/10" style={{ background: p.hex }} />
                        <div className="text-[10.5px] font-medium mt-1.5 leading-tight">{p.name}</div>
                        <div className="text-[10px] text-ink-4 font-mono">{p.hex}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-2xs text-ink-4 mt-3">Type: {c.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 py-3 border-t border-line bg-steel-50 overflow-x-auto">
                <span className="text-2xs text-ink-4 shrink-0">Icon sizes</span>
                {[56, 40, 28, 18].map((s) => <LogoIcon key={s} id={id} size={s} />)}
                <span className="w-px h-6 bg-line-3 shrink-0" />
                {[40, 28].map((s) => <LogoIcon key={`d${s}`} id={id} size={s} mode="dark" />)}
              </div>
            </article>
          );
        })}
      </section>

      <section data-tour="logo-apps" className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-10">
        <div className="rounded-2xl bg-white border border-line p-6 shadow-card">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <div className="eyebrow text-flame mb-1">In real use</div>
              <h2 className="display text-[24px] font-bold">Business card, app icon and workshop sign</h2>
            </div>
            <Segmented value={app} onChange={setApp} options={IDS.map((i) => ({ value: i, label: CONCEPTS[i].name }))} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col items-center gap-4">
              <BusinessCard id={app} side="front" />
              <BusinessCard id={app} side="back" />
              <span className="text-2xs text-ink-4">Business card, front and back</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-[230px] h-[300px] rounded-[34px] bg-gradient-to-b from-[#2A3A55] to-[#141C2A] p-5 shadow-pop">
                <div className="grid grid-cols-4 gap-3.5 mt-6">
                  {Array.from({ length: 12 }).map((_, k) =>
                    k === 5 ? (
                      <div key={k} className="flex flex-col items-center gap-1"><LogoIcon id={app} size={40} mode={app === "layers" ? "dark" : "light"} /><span className="text-[8px] text-white/80">HSR</span></div>
                    ) : (
                      <div key={k} className="flex flex-col items-center gap-1"><div className="w-10 h-10 rounded-[10px] bg-white/12 bg-white/10" /><span className="h-1.5 w-6 rounded bg-white/15" /></div>
                    )
                  )}
                </div>
              </div>
              <span className="text-2xs text-ink-4">App icon and social profile picture</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <Sign id={app} />
              <span className="text-2xs text-ink-4">Workshop sign</span>
            </div>
          </div>
        </div>
      </section>

      <section data-tour="logo-next" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="rounded-2xl bg-ink text-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6">
          <div>
            <h2 className="display text-[24px] font-bold">What the logo package includes</h2>
            <p className="text-white/60 text-sm mt-2 leading-[21px]">
              These concepts are a starting point. Tell us which direction you like (or what you'd change) and we take it from there.
            </p>
          </div>
          <ul className="text-sm space-y-2 text-white/85">
            {["3 directions, 2 rounds of changes", "Final logo in full colour, black and white", "Files for print, web, signage and social", "Colour palette and fonts on a one-page brand sheet", "Business card and email signature design"].map((t) => (
              <li key={t} className="flex gap-2"><Check size={16} className="text-flame shrink-0 mt-0.5" /> {t}</li>
            ))}
          </ul>
        </div>
      </section>
      <TourLauncher tour="brand" />
    </div>
  );
}
