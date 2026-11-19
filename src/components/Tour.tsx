import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, X, Compass } from "lucide-react";
import { TOURS, type TourId } from "../data/tours";
import { cx } from "./ui";

type Ctx = { start: (id: TourId) => void; active: TourId | null };
const TourCtx = createContext<Ctx>({ start: () => {}, active: null });
export const useTour = () => useContext(TourCtx);

export function TourProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<TourId | null>(null);
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [ready, setReady] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const raf = useRef(0);

  const start = useCallback((id: TourId) => {
    setI(0);
    setActive(id);
  }, []);
  const stop = useCallback(() => {
    setActive(null);
    setRect(null);
  }, []);

  const tour = active ? TOURS[active] : null;
  const step = tour?.steps[i];

  // navigate + click + find target
  useEffect(() => {
    if (!step) return;
    setReady(false);
    setRect(null);
    let cancelled = false;
    const go = async () => {
      if (step.route && loc.pathname !== step.route) nav(step.route);
      await new Promise((r) => setTimeout(r, 120));
      if (step.click) {
        for (let t = 0; t < 25 && !cancelled; t++) {
          const c = document.querySelector<HTMLElement>(`[data-tour="${step.click}"]`);
          if (c) { c.click(); break; }
          await new Promise((r) => setTimeout(r, 80));
        }
        await new Promise((r) => setTimeout(r, 260));
      }
      if (!step.target) { if (!cancelled) setReady(true); return; }
      for (let t = 0; t < 40 && !cancelled; t++) {
        const el = document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
        if (el) {
          el.scrollIntoView({ block: "center", behavior: "smooth" });
          await new Promise((r) => setTimeout(r, 380));
          if (!cancelled) setReady(true);
          return;
        }
        await new Promise((r) => setTimeout(r, 80));
      }
      if (!cancelled) setReady(true);
    };
    go();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, i]);

  // follow target position
  useLayoutEffect(() => {
    if (!step?.target || !ready) return;
    const tick = () => {
      const el = document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
      setRect(el ? el.getBoundingClientRect() : null);
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf.current);
  }, [step, ready]);

  useEffect(() => {
    if (!active) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") stop();
      if (e.key === "ArrowRight") setI((x) => Math.min(x + 1, (tour?.steps.length ?? 1) - 1));
      if (e.key === "ArrowLeft") setI((x) => Math.max(x - 1, 0));
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [active, tour, stop]);

  const last = tour ? i === tour.steps.length - 1 : false;
  const pad = 8;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const mobile = vw < 700;
  let cardStyle: React.CSSProperties = {};
  if (!mobile) {
    const W = 380;
    if (rect) {
      const below = vh - rect.bottom > 250;
      const top = below ? rect.bottom + pad + 14 : Math.max(16, rect.top - pad - 14 - 230);
      const left = Math.min(Math.max(16, rect.left + rect.width / 2 - W / 2), vw - W - 16);
      cardStyle = { top, left, width: W };
      if (rect.height > vh * 0.6) cardStyle = { top: Math.max(16, Math.min(rect.top + 24, vh - 280)), left: Math.min(rect.right - W - 24, vw - W - 16), width: W };
    } else cardStyle = { top: vh / 2 - 120, left: vw / 2 - W / 2, width: W };
  }

  return (
    <TourCtx.Provider value={{ start, active }}>
      {children}
      {tour && step && (
        <div className="fixed inset-0 z-[80] pointer-events-none">
          {rect && ready ? (
            <div
              className="absolute rounded-xl ring-2 ring-flame transition-all duration-200"
              style={{ top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2, boxShadow: "0 0 0 9999px rgba(8,10,13,.58)" }}
            />
          ) : (
            <div className="absolute inset-0 bg-steel-950/55 anim-fade" />
          )}
          <div
            className={cx("pointer-events-auto bg-white rounded-2xl shadow-pop border border-line anim-up", mobile ? "fixed left-3 right-3 bottom-3" : "fixed")}
            style={mobile ? undefined : cardStyle}
            key={`${active}-${i}`}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="eyebrow text-flame">{tour.title} · {i + 1} of {tour.steps.length}</span>
                <button onClick={stop} aria-label="Close guide" className="p-1 -mr-1 rounded hover:bg-steel-100 text-ink-4"><X size={16} /></button>
              </div>
              <div className="text-[15px] font-semibold text-ink leading-6">{step.title}</div>
              <p className="text-sm text-ink-3 mt-1.5 leading-[21px]">{step.body}</p>
            </div>
            <div className="px-5 pb-4 flex items-center gap-3">
              <div className="flex gap-1 flex-1">
                {tour.steps.map((_, k) => (
                  <span key={k} className={cx("h-1 rounded-full transition-all", k === i ? "w-5 bg-flame" : k < i ? "w-2 bg-flame/40" : "w-2 bg-steel-200")} />
                ))}
              </div>
              {i > 0 && (
                <button onClick={() => setI(i - 1)} className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-line-3 hover:bg-steel-50" aria-label="Back">
                  <ArrowLeft size={15} />
                </button>
              )}
              <button
                onClick={() => (last ? (stop(), tour.end && nav(tour.end)) : setI(i + 1))}
                className="h-9 px-4 inline-flex items-center gap-1.5 rounded-md bg-ink text-white text-sm font-medium hover:bg-steel-700"
              >
                {last ? tour.endLabel ?? "Finish" : "Next"} {!last && <ArrowRight size={15} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </TourCtx.Provider>
  );
}

export function TourLauncher({ tour, dark, raised }: { tour: TourId; dark?: boolean; raised?: boolean }) {
  const { start, active } = useTour();
  if (active) return null;
  return (
    <button
      onClick={() => start(tour)}
      className={cx(
        raised ? "bottom-[76px] md:bottom-4" : "bottom-4",
        "fixed z-40 right-4 h-11 pl-3 pr-4 rounded-full inline-flex items-center gap-2 text-sm font-semibold shadow-pop transition-transform hover:-translate-y-0.5",
        dark ? "bg-white text-ink" : "bg-ink text-white"
      )}
    >
      <span className="relative inline-flex">
        <Compass size={18} className="text-flame" />
        <span className="absolute inset-0 rounded-full pulse-ring" />
      </span>
      Guided tour
    </button>
  );
}
