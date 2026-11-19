import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  SEED_ENQUIRIES, SEED_JOBS, SEED_QUOTES, SEED_INVOICES, SEED_CUSTOMERS, SEED_LOADS, GALLERY, FAQS, BUSINESS, STAGES,
  type Enquiry, type Job, type Quote, type Invoice, type Customer, type Load, type EnquiryStatus, type Stage, type Line,
} from "../data/seed";

type Toast = { id: number; text: string };
type Banner = { on: boolean; text: string };
type GalleryItem = (typeof GALLERY)[number] & { featured?: boolean };

export const lineTotal = (lines: Line[]) => lines.reduce((a, l) => a + l.qty * l.rate, 0);
export const withGst = (n: number) => n * 1.1;
export const aud = (n: number, d = 0) => `$${n.toLocaleString("en-AU", { minimumFractionDigits: d, maximumFractionDigits: d })}`;

type Store = {
  enquiries: Enquiry[];
  jobs: Job[];
  quotes: Quote[];
  invoices: Invoice[];
  customers: Customer[];
  loads: Load[];
  banner: Banner;
  business: typeof BUSINESS;
  gallery: GalleryItem[];
  faqs: typeof FAQS;
  hiddenColours: string[];
  toasts: Toast[];
  toast: (t: string) => void;
  addEnquiry: (e: Omit<Enquiry, "id" | "received" | "status" | "notes" | "source">) => string;
  setEnquiryStatus: (id: string, s: EnquiryStatus) => void;
  addNote: (id: string, text: string) => void;
  newQuote: (from?: string) => string;
  saveQuote: (q: Quote) => void;
  sendQuote: (id: string) => void;
  acceptQuote: (id: string) => string | undefined;
  moveJob: (id: string, stage: Stage) => void;
  nextStage: (id: string) => void;
  setQc: (id: string, qc: boolean[]) => void;
  createLoad: (jobIds: string[], colour: string, finish: string) => string;
  startLoad: (id: string) => void;
  finishLoad: (id: string) => void;
  createInvoice: (jobId: string) => string;
  markPaid: (id: string) => void;
  setBanner: (b: Banner) => void;
  setBusiness: (b: typeof BUSINESS) => void;
  setGallery: (g: GalleryItem[]) => void;
  setFaqs: (f: typeof FAQS) => void;
  toggleColour: (name: string) => void;
  reset: () => void;
};

const Ctx = createContext<Store | null>(null);
let tid = 1;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(SEED_ENQUIRIES);
  const [jobs, setJobs] = useState<Job[]>(SEED_JOBS);
  const [quotes, setQuotes] = useState<Quote[]>(SEED_QUOTES);
  const [invoices, setInvoices] = useState<Invoice[]>(SEED_INVOICES);
  const [customers, setCustomers] = useState<Customer[]>(SEED_CUSTOMERS);
  const [loads, setLoads] = useState<Load[]>(SEED_LOADS);
  const [banner, setBanner] = useState<Banner>({ on: false, text: "Closed 24 Dec – 5 Jan for the holidays. Quotes still answered by email." });
  const [business, setBusiness] = useState(BUSINESS);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY.map((g, i) => ({ ...g, featured: i < 4 })));
  const [faqs, setFaqs] = useState(FAQS);
  const [hiddenColours, setHidden] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((text: string) => {
    const id = tid++;
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);

  const addEnquiry: Store["addEnquiry"] = (e) => {
    const id = `E-${1049 + enquiries.filter((x) => Number(x.id.slice(2)) >= 1049).length}`;
    setEnquiries((list) => [{ ...e, id, received: "Just now", status: "New", notes: [], source: "Website quote form" }, ...list]);
    return id;
  };
  const setEnquiryStatus = (id: string, s: EnquiryStatus) => setEnquiries((l) => l.map((e) => (e.id === id ? { ...e, status: s } : e)));
  const addNote = (id: string, text: string) =>
    setEnquiries((l) => l.map((e) => (e.id === id ? { ...e, notes: [...e.notes, { at: "Just now", by: "Harshal", text }] } : e)));

  const newQuote = (from?: string) => {
    const n = 313 + quotes.filter((q) => Number(q.id.slice(2)) >= 313).length;
    const id = `Q-0${n}`;
    const e = enquiries.find((x) => x.id === from);
    const q: Quote = {
      id, customer: e?.name ?? "New customer", company: e?.company, enquiry: e?.id, date: "Today", status: "Draft",
      colour: e?.colour ?? "Monument", finish: e?.finish ?? "Satin", validDays: 30,
      lines: e ? e.items.map((it) => ({ item: it.desc, qty: it.qty, unit: "each", rate: 0 })) : [{ item: "", qty: 1, unit: "each", rate: 0 }],
    };
    setQuotes((l) => [q, ...l]);
    if (e && e.status === "New") setEnquiryStatus(e.id, "Contacted");
    return id;
  };
  const saveQuote = (q: Quote) => setQuotes((l) => l.map((x) => (x.id === q.id ? q : x)));
  const sendQuote = (id: string) => {
    setQuotes((l) => l.map((x) => (x.id === id ? { ...x, status: "Sent" } : x)));
    const q = quotes.find((x) => x.id === id);
    if (q?.enquiry) setEnquiryStatus(q.enquiry, "Quoted");
  };
  const acceptQuote = (id: string) => {
    const q = quotes.find((x) => x.id === id);
    if (!q) return;
    const jid = `HSR-0${222 + jobs.filter((j) => Number(j.id.slice(5)) >= 222).length}`;
    const total = lineTotal(q.lines);
    setJobs((l) => [
      { id: jid, customer: q.customer, company: q.company, type: "Trade", items: q.lines.map((x) => x.item).filter(Boolean).join(", ") || "Items", qty: q.lines.reduce((a, x) => a + (x.unit === "each" ? x.qty : 0), 0) || 1, colour: q.colour, finish: q.finish, brand: "Dulux", stage: "Received", due: "Fri 5 Dec", value: Math.round(total), space: 30, quote: q.id },
      ...l,
    ]);
    setQuotes((l) => l.map((x) => (x.id === id ? { ...x, status: "Accepted", job: jid } : x)));
    if (q.enquiry) setEnquiryStatus(q.enquiry, "Won");
    if (!customers.some((c) => c.name === q.customer)) {
      const e = enquiries.find((x) => x.id === q.enquiry);
      setCustomers((l) => [{ name: q.customer, company: q.company, type: e?.type ?? "Custom", phone: e?.phone ?? "—", email: e?.email ?? "—", suburb: e?.suburb ?? "—", trade: !!e?.trade, terms: e?.trade ? "14 days" : "Pay on collection", jobs: 1, spend: 0, last: "In progress" }, ...l]);
    }
    return jid;
  };

  const moveJob = (id: string, stage: Stage) => setJobs((l) => l.map((j) => (j.id === id ? { ...j, stage } : j)));
  const nextStage = (id: string) =>
    setJobs((l) => l.map((j) => (j.id === id ? { ...j, stage: STAGES[Math.min(STAGES.indexOf(j.stage) + 1, STAGES.length - 1)] } : j)));
  const setQc = (id: string, qc: boolean[]) => setJobs((l) => l.map((j) => (j.id === id ? { ...j, qc } : j)));

  const createLoad = (jobIds: string[], colour: string, finish: string) => {
    const id = `L-0${32 + loads.filter((x) => Number(x.id.slice(3)) >= 32).length}`;
    const cure = finish === "Texture" ? "200 °C · 10 min" : finish === "Metallic" ? "190 °C · 12 min" : "180 °C · 15 min";
    setLoads((l) => [{ id, colour, finish, cure, jobs: jobIds, status: "Planned" }, ...l]);
    setJobs((l) => l.map((j) => (jobIds.includes(j.id) ? { ...j, load: id, stage: "Coating" } : j)));
    return id;
  };
  const startLoad = (id: string) => {
    const ld = loads.find((x) => x.id === id);
    setLoads((l) => l.map((x) => (x.id === id ? { ...x, status: "In oven", start: "Now" } : x)));
    if (ld) setJobs((l) => l.map((j) => (ld.jobs.includes(j.id) ? { ...j, stage: "Curing" } : j)));
  };
  const finishLoad = (id: string) => {
    const ld = loads.find((x) => x.id === id);
    setLoads((l) => l.map((x) => (x.id === id ? { ...x, status: "Done" } : x)));
    if (ld) setJobs((l) => l.map((j) => (ld.jobs.includes(j.id) ? { ...j, stage: "Quality check" } : j)));
  };

  const createInvoice = (jobId: string) => {
    const j = jobs.find((x) => x.id === jobId);
    const id = `INV-0${189 + invoices.filter((x) => Number(x.id.slice(5)) >= 189).length}`;
    if (j) setInvoices((l) => [{ id, customer: j.company ?? j.customer, job: j.id, date: "Today", due: "Thu 3 Dec", amount: Math.round(withGst(j.value)), status: "Awaiting payment", xero: "Synced" }, ...l]);
    return id;
  };
  const markPaid = (id: string) => setInvoices((l) => l.map((x) => (x.id === id ? { ...x, status: "Paid" } : x)));
  const toggleColour = (name: string) => setHidden((h) => (h.includes(name) ? h.filter((x) => x !== name) : [...h, name]));

  const reset = () => {
    setEnquiries(SEED_ENQUIRIES); setJobs(SEED_JOBS); setQuotes(SEED_QUOTES); setInvoices(SEED_INVOICES); setCustomers(SEED_CUSTOMERS); setLoads(SEED_LOADS);
    setBanner({ on: false, text: "Closed 24 Dec – 5 Jan for the holidays. Quotes still answered by email." }); setBusiness(BUSINESS);
    setGallery(GALLERY.map((g, i) => ({ ...g, featured: i < 4 }))); setFaqs(FAQS); setHidden([]);
  };

  const value = useMemo<Store>(
    () => ({
      enquiries, jobs, quotes, invoices, customers, loads, banner, business, gallery, faqs, hiddenColours, toasts, toast,
      addEnquiry, setEnquiryStatus, addNote, newQuote, saveQuote, sendQuote, acceptQuote, moveJob, nextStage, setQc,
      createLoad, startLoad, finishLoad, createInvoice, markPaid, setBanner, setBusiness, setGallery, setFaqs, toggleColour, reset,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enquiries, jobs, quotes, invoices, customers, loads, banner, business, gallery, faqs, hiddenColours, toasts]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error("StoreProvider missing");
  return s;
};
