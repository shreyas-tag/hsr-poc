import { Check, Printer, MessageSquare, ArrowRight, Receipt, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Drawer, Pill, statusTone, Swatch, Button, cx } from "../../components/ui";
import { useStore, aud } from "../../state/store";
import { STAGES, colourHex } from "../../data/seed";

const QC = ["Coverage checked, no bare spots", "Film thickness within spec", "Colour and gloss match sample", "Masked areas clean", "Wrapped and labelled for collection"];

export function QrCode({ seed, size = 84 }: { seed: string; size?: number }) {
  const n = 21;
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) { h = (h * 1103515245 + 12345) >>> 0; cells.push(((h >> 16) & 1) === 1); }
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  const s = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Job QR code">
      <rect width={size} height={size} fill="#fff" />
      {cells.map((on, i) => {
        const x = i % n, y = Math.floor(i / n);
        if (finder(x, y)) return null;
        return on ? <rect key={i} x={x * s} y={y * s} width={s} height={s} fill="#0F1115" /> : null;
      })}
      {[[0, 0], [n - 7, 0], [0, n - 7]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x * s} y={y * s} width={7 * s} height={7 * s} fill="#0F1115" />
          <rect x={(x + 1) * s} y={(y + 1) * s} width={5 * s} height={5 * s} fill="#fff" />
          <rect x={(x + 2) * s} y={(y + 2) * s} width={3 * s} height={3 * s} fill="#0F1115" />
        </g>
      ))}
    </svg>
  );
}

export function JobDrawer({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { jobs, moveJob, nextStage, setQc, createInvoice, toast, quotes } = useStore();
  const nav = useNavigate();
  const j = jobs.find((x) => x.id === id);
  const qc = j?.qc ?? QC.map(() => false);
  const si = j ? STAGES.indexOf(j.stage) : 0;
  return (
    <Drawer
      open={!!j}
      onClose={onClose}
      width={600}
      title={j && <div className="flex items-center gap-3"><div><div className="font-semibold">{j.company ?? j.customer}</div><div className="text-xs text-ink-4 font-mono">{j.id}{j.quote && ` · from ${j.quote}`}</div></div><Pill tone={statusTone(j.stage)}>{j.stage}</Pill></div>}
      footer={j && (
        <>
          <Button onClick={() => toast(`SMS sent to ${j.customer}: job ${j.id} is ${j.stage === "Ready" ? "ready to collect" : "in progress"}.`)}><MessageSquare size={15} /> Text customer</Button>
          {j.stage === "Ready" ? (
            <Button variant="flame" onClick={() => { const inv = createInvoice(j.id); toast(`${inv} created and synced to Xero.`); onClose(); nav("/ws/invoices"); }}><Receipt size={15} /> Create invoice</Button>
          ) : j.stage !== "Collected" ? (
            <Button variant="flame" onClick={() => { nextStage(j.id); toast(`${j.id} moved to ${STAGES[si + 1]}.`); }}>Move to {STAGES[si + 1]} <ArrowRight size={15} /></Button>
          ) : null}
        </>
      )}
    >
      {j && (
        <div className="p-5 space-y-6">
          <div>
            <div className="text-xs font-semibold text-ink-3 uppercase tracking-wider mb-3">Progress</div>
            <div className="flex items-center">
              {STAGES.map((s, k) => (
                <div key={s} className="flex-1 flex flex-col items-center relative">
                  {k > 0 && <span className={cx("absolute top-[11px] right-1/2 w-full h-0.5", k <= si ? "bg-flame" : "bg-steel-200")} />}
                  <button onClick={() => moveJob(j.id, s)} title={s} className={cx("relative z-10 w-6 h-6 rounded-full text-[10px] font-bold inline-flex items-center justify-center border-2", k < si ? "bg-flame border-flame text-white" : k === si ? "bg-white border-flame text-flame" : "bg-white border-steel-200 text-ink-5")}>
                    {k < si ? <Check size={12} /> : k + 1}
                  </button>
                  <span className={cx("text-[10px] mt-1.5 text-center leading-tight", k === si ? "text-ink font-semibold" : "text-ink-4")}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Items", `${j.qty} × ${j.items}`],
              ["Customer type", j.type],
              ["Colour", <span key="c" className="inline-flex items-center gap-1.5"><Swatch hex={colourHex(j.colour)} size={14} />{j.colour} {j.finish}</span>],
              ["Powder", j.brand],
              ["Due", j.due],
              ["Value (ex GST)", aud(j.value)],
              ["Oven load", j.load ?? "Not yet batched"],
              ["Quote", j.quote ? <button key="q" className="text-flame font-medium" onClick={() => { onClose(); nav(`/ws/quotes/${j.quote}`); }}>{j.quote}</button> : "—"],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-lg bg-steel-50 px-3 py-2.5"><div className="text-2xs text-ink-4">{k}</div><div className="font-medium mt-0.5">{v}</div></div>
            ))}
          </div>
          <div className="rounded-xl border border-line p-4">
            <div className="text-sm font-semibold mb-3">Quality check</div>
            {QC.map((q, k) => (
              <label key={q} className="flex items-center gap-3 py-1.5 text-sm cursor-pointer">
                <input type="checkbox" checked={qc[k]} onChange={() => setQc(j.id, qc.map((x, i) => (i === k ? !x : x)))} className="w-4 h-4 accent-[#FF5A1F]" />
                <span className={qc[k] ? "text-ink-4 line-through" : ""}>{q}</span>
              </label>
            ))}
            <div className="text-2xs text-ink-4 mt-2">{qc.filter(Boolean).length} of {QC.length} checked{j.stage === "Quality check" && qc.every(Boolean) && " · ready to mark as Ready"}</div>
          </div>
          <div className="rounded-xl border border-dashed border-line-3 p-4 flex items-center gap-4">
            <QrCode seed={j.id} />
            <div className="flex-1 min-w-0">
              <div className="text-2xs text-ink-4 uppercase tracking-wider">Job tag</div>
              <div className="display text-[20px] font-bold">{j.id}</div>
              <div className="text-xs text-ink-3 truncate">{j.company ?? j.customer} · {j.colour} {j.finish} · Due {j.due}</div>
            </div>
            <Button size="sm" onClick={() => toast("Job tag sent to printer.")}><Printer size={14} /> Print</Button>
          </div>
          {j.quote && quotes.find((q) => q.id === j.quote) && (
            <div className="flex items-center gap-2 text-xs text-ink-4"><FileText size={13} /> Linked to quote {j.quote}, accepted by the customer.</div>
          )}
        </div>
      )}
    </Drawer>
  );
}
