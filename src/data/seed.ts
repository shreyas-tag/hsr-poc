// All data is sample data for the concept. Names of people and companies are fictional.

export const TODAY = "Thursday 19 November 2026";
export const BUSINESS = {
  name: "HSR Powder Coating",
  legal: "HSR Powder Coating and Fabrication Pty Ltd",
  phone: "04XX XXX XXX",
  email: "hello@hsrpowdercoating.com.au",
  address: "Unit X, Sample Street, Melbourne VIC",
  hours: "Mon–Fri 7:00–4:30 · Sat by appointment",
  abn: "ABN XX XXX XXX XXX",
};

export const IMG = {
  hero: "./img/hero.jpg",
  oven: "./img/oven.jpg",
  wheels: "./img/wheels.jpg",
  gate: "./img/gate.jpg",
  ute: "./img/ute.jpg",
  swatches: "./img/swatches.jpg",
  trade: "./img/trade.jpg",
};

export type Colour = { name: string; hex: string; group: "Colorbond-matched" | "Standard" | "Specialty"; finishes: string[] };
export const COLOURS: Colour[] = [
  { name: "Night Sky", hex: "#1D1E20", group: "Colorbond-matched", finishes: ["Matt", "Satin"] },
  { name: "Monument", hex: "#323233", group: "Colorbond-matched", finishes: ["Matt", "Satin"] },
  { name: "Woodland Grey", hex: "#4A4F4A", group: "Colorbond-matched", finishes: ["Matt", "Satin"] },
  { name: "Basalt", hex: "#62666A", group: "Colorbond-matched", finishes: ["Matt", "Satin"] },
  { name: "Windspray", hex: "#888B8A", group: "Colorbond-matched", finishes: ["Matt", "Satin"] },
  { name: "Shale Grey", hex: "#BDBFBA", group: "Colorbond-matched", finishes: ["Satin"] },
  { name: "Surfmist", hex: "#E4E2D5", group: "Colorbond-matched", finishes: ["Satin", "Gloss"] },
  { name: "Paperbark", hex: "#CABFA4", group: "Colorbond-matched", finishes: ["Satin"] },
  { name: "Dune", hex: "#B1ADA3", group: "Colorbond-matched", finishes: ["Matt", "Satin"] },
  { name: "Pale Eucalypt", hex: "#7C846A", group: "Colorbond-matched", finishes: ["Satin"] },
  { name: "Manor Red", hex: "#5E1D0E", group: "Colorbond-matched", finishes: ["Satin"] },
  { name: "Deep Ocean", hex: "#364152", group: "Colorbond-matched", finishes: ["Satin"] },
  { name: "Jet Black", hex: "#0D0D0D", group: "Standard", finishes: ["Gloss", "Satin", "Matt", "Texture"] },
  { name: "Pure White", hex: "#F4F4F0", group: "Standard", finishes: ["Gloss", "Satin"] },
  { name: "Primrose", hex: "#E9DCB5", group: "Standard", finishes: ["Gloss", "Satin"] },
  { name: "Charcoal", hex: "#3C3F44", group: "Standard", finishes: ["Satin", "Texture"] },
  { name: "Signal Orange", hex: "#E8551E", group: "Standard", finishes: ["Gloss"] },
  { name: "Traffic Red", hex: "#B5121B", group: "Standard", finishes: ["Gloss"] },
  { name: "Safety Yellow", hex: "#F2B705", group: "Standard", finishes: ["Gloss"] },
  { name: "Racing Green", hex: "#1F3D2B", group: "Standard", finishes: ["Gloss", "Satin"] },
  { name: "Satin Bronze", hex: "#7A5A3A", group: "Specialty", finishes: ["Metallic"] },
  { name: "Gunmetal", hex: "#4B5056", group: "Specialty", finishes: ["Metallic", "Matt"] },
  { name: "Silver Pearl", hex: "#B8BCC2", group: "Specialty", finishes: ["Metallic"] },
  { name: "Candy Red", hex: "#8E0F1A", group: "Specialty", finishes: ["Gloss"] },
  { name: "Copper Kinetic", hex: "#8A4F2E", group: "Specialty", finishes: ["Metallic"] },
  { name: "Anodic Champagne", hex: "#A99A7C", group: "Specialty", finishes: ["Metallic"] },
];
export const colourHex = (n: string) => COLOURS.find((c) => c.name === n)?.hex ?? "#888";

export type EnquiryStatus = "New" | "Contacted" | "Quoted" | "Won" | "Lost";
export type Enquiry = {
  id: string;
  name: string;
  company?: string;
  type: "Trade" | "Automotive" | "Landscaping" | "Custom";
  phone: string;
  email: string;
  suburb: string;
  items: { desc: string; qty: number; size: string; material: string; condition: string }[];
  colour: string;
  finish: string;
  brand: string;
  neededBy: string;
  logistics: "Drop-off" | "Pick-up requested";
  contactPref: "SMS" | "Call" | "Email";
  message: string;
  photos: string[];
  received: string;
  source: string;
  status: EnquiryStatus;
  notes: { at: string; by: string; text: string }[];
  trade?: boolean;
};

export const SEED_ENQUIRIES: Enquiry[] = [
  {
    id: "E-1048", name: "Mark Thompson", company: "Thompson Windows & Doors", type: "Trade", phone: "0412 XXX 318", email: "mark@thompsonwd.com.au", suburb: "Dandenong South",
    items: [{ desc: "Aluminium window extrusions, 6.5 m lengths", qty: 60, size: "6.5 m long", material: "Aluminium", condition: "New / raw" }],
    colour: "Monument", finish: "Satin", brand: "Dulux", neededBy: "Fri 28 Nov", logistics: "Drop-off", contactPref: "Call",
    message: "Regular monthly volume if turnaround is good. Can you do full 6.5 m lengths in one go?", photos: [IMG.trade], received: "Today, 8:42 am", source: "Google search", status: "New", notes: [], trade: true,
  },
  {
    id: "E-1047", name: "Liam O'Brien", type: "Automotive", phone: "0433 XXX 902", email: "liam.ob@gmail.com", suburb: "Narre Warren",
    items: [{ desc: "Alloy wheels, 18 inch, tyres removed", qty: 4, size: "18 in", material: "Aluminium alloy", condition: "Previously painted" }],
    colour: "Satin Bronze", finish: "Metallic", brand: "No preference", neededBy: "Within 2 weeks", logistics: "Drop-off", contactPref: "SMS",
    message: "Kerb rash on two wheels. Do you strip the old paint?", photos: [IMG.wheels], received: "Today, 7:15 am", source: "Instagram", status: "New", notes: [],
  },
  {
    id: "E-1046", name: "Sarah Nguyen", company: "Greenline Landscapes", type: "Landscaping", phone: "0401 XXX 557", email: "sarah@greenlinelandscapes.com.au", suburb: "Berwick",
    items: [
      { desc: "Steel slat fence panels", qty: 14, size: "2.4 m × 1.8 m", material: "Steel", condition: "New / raw" },
      { desc: "Sliding gate", qty: 1, size: "4.2 m × 1.8 m", material: "Steel", condition: "New / raw" },
    ],
    colour: "Night Sky", finish: "Satin", brand: "Interpon", neededBy: "Wed 3 Dec", logistics: "Pick-up requested", contactPref: "Email",
    message: "Residential job, client wants a durable finish. Can you collect from our yard?", photos: [IMG.gate], received: "Yesterday, 3:20 pm", source: "Google Maps", status: "Quoted",
    notes: [{ at: "Yesterday, 4:05 pm", by: "Harshal", text: "Called Sarah. Quote Q-0312 sent. Pick-up Monday possible." }], trade: true,
  },
  {
    id: "E-1045", name: "Dave Kowalski", type: "Automotive", phone: "0422 XXX 140", email: "davek@outlook.com", suburb: "Pakenham",
    items: [{ desc: "Aluminium ute tray and canopy", qty: 1, size: "1.8 m × 1.8 m tray", material: "Aluminium", condition: "Light corrosion" }],
    colour: "Jet Black", finish: "Texture", brand: "Dulux", neededBy: "Flexible", logistics: "Drop-off", contactPref: "Call",
    message: "Tray and canopy off the car. Want a tough textured black.", photos: [IMG.ute], received: "Mon 17 Nov", source: "Referral", status: "Contacted",
    notes: [{ at: "Tue 18 Nov", by: "Harshal", text: "Left voicemail. Will try again Thursday." }],
  },
  {
    id: "E-1044", name: "Priya Sharma", type: "Custom", phone: "0450 XXX 771", email: "priya.s@gmail.com", suburb: "Cranbourne",
    items: [{ desc: "Outdoor table and 6 chairs", qty: 7, size: "Table 1.8 m", material: "Steel", condition: "Rust, previously coated" }],
    colour: "Woodland Grey", finish: "Satin", brand: "No preference", neededBy: "Before Christmas", logistics: "Drop-off", contactPref: "SMS",
    message: "Old setting from my parents. Hoping to bring it back to life.", photos: [], received: "Fri 14 Nov", source: "Facebook", status: "Won", notes: [{ at: "Fri 14 Nov", by: "Harshal", text: "Accepted. Job HSR-0216 created." }],
  },
  {
    id: "E-1043", name: "Tom Reid", company: "Reid Steel Fabrications", type: "Trade", phone: "0418 XXX 626", email: "tom@reidsteel.com.au", suburb: "Keysborough",
    items: [{ desc: "Balustrade panels", qty: 22, size: "1.2 m × 1.0 m", material: "Steel", condition: "New / raw" }],
    colour: "Surfmist", finish: "Satin", brand: "Dulux", neededBy: "Tue 25 Nov", logistics: "Drop-off", contactPref: "Call",
    message: "Apartment job. Will send more if this goes well.", photos: [], received: "Wed 12 Nov", source: "Google search", status: "Won", notes: [{ at: "Thu 13 Nov", by: "Harshal", text: "Trade account opened, 14-day terms." }], trade: true,
  },
  {
    id: "E-1042", name: "Emily Carter", type: "Custom", phone: "0466 XXX 093", email: "emily.carter@icloud.com", suburb: "Frankston",
    items: [{ desc: "Small garden gate", qty: 1, size: "1.0 m × 1.2 m", material: "Steel", condition: "Rust" }],
    colour: "Deep Ocean", finish: "Satin", brand: "No preference", neededBy: "Flexible", logistics: "Drop-off", contactPref: "Email",
    message: "Just one small gate, is it worth it?", photos: [], received: "Mon 10 Nov", source: "Google search", status: "Lost", notes: [{ at: "Tue 11 Nov", by: "Harshal", text: "Lost: went with a cheaper spray paint option." }],
  },
];

export const STAGES = ["Received", "Pre-treatment", "Coating", "Curing", "Quality check", "Ready", "Collected"] as const;
export type Stage = (typeof STAGES)[number];

export type Job = {
  id: string;
  customer: string;
  company?: string;
  type: Enquiry["type"];
  items: string;
  qty: number;
  colour: string;
  finish: string;
  brand: string;
  stage: Stage;
  due: string;
  dueSoon?: boolean;
  value: number;
  space: number; // % of an oven load the job takes
  load?: string;
  quote?: string;
  notes?: string;
  qc?: boolean[];
};

export const SEED_JOBS: Job[] = [
  { id: "HSR-0221", customer: "Tom Reid", company: "Reid Steel Fabrications", type: "Trade", items: "Balustrade panels 1.2 × 1.0 m", qty: 22, colour: "Surfmist", finish: "Satin", brand: "Dulux", stage: "Coating", due: "Tue 25 Nov", value: 1980, space: 45, quote: "Q-0309" },
  { id: "HSR-0220", customer: "Coastline Pergolas", company: "Coastline Pergolas", type: "Trade", items: "Pergola beams and posts, up to 6.8 m", qty: 18, colour: "Monument", finish: "Satin", brand: "Dulux", stage: "Pre-treatment", due: "Mon 24 Nov", dueSoon: true, value: 2640, space: 60 },
  { id: "HSR-0219", customer: "Josh Patel", type: "Automotive", items: "Alloy wheels 20 in", qty: 4, colour: "Gunmetal", finish: "Metallic", brand: "Oxytech", stage: "Quality check", due: "Fri 21 Nov", dueSoon: true, value: 720, space: 10 },
  { id: "HSR-0218", customer: "Bayside Fencing", company: "Bayside Fencing", type: "Landscaping", items: "Aluminium pool fence panels", qty: 16, colour: "Night Sky", finish: "Satin", brand: "Interpon", stage: "Ready", due: "Thu 20 Nov", value: 1520, space: 40 },
  { id: "HSR-0217", customer: "Ben Fraser", type: "Automotive", items: "Roll bar and bull bar", qty: 2, colour: "Jet Black", finish: "Texture", brand: "Dulux", stage: "Curing", due: "Fri 21 Nov", value: 540, space: 15, load: "L-031" },
  { id: "HSR-0216", customer: "Priya Sharma", type: "Custom", items: "Outdoor table and 6 chairs", qty: 7, colour: "Woodland Grey", finish: "Satin", brand: "Dulux", stage: "Received", due: "Fri 12 Dec", value: 690, space: 20, quote: "Q-0307" },
  { id: "HSR-0215", customer: "Metro Shopfit", company: "Metro Shopfit", type: "Trade", items: "Display frames and brackets", qty: 40, colour: "Jet Black", finish: "Matt", brand: "Interpon", stage: "Coating", due: "Mon 24 Nov", value: 1360, space: 30 },
  { id: "HSR-0214", customer: "Hills Gates Co.", company: "Hills Gates Co.", type: "Landscaping", items: "Driveway gates (pair) + pedestrian gate", qty: 3, colour: "Monument", finish: "Matt", brand: "Dulux", stage: "Pre-treatment", due: "Wed 26 Nov", value: 980, space: 35 },
  { id: "HSR-0213", customer: "Chris Nolan", type: "Automotive", items: "Motorbike frame and swingarm", qty: 2, colour: "Candy Red", finish: "Gloss", brand: "Oxytech", stage: "Received", due: "Fri 28 Nov", value: 650, space: 12 },
  { id: "HSR-0212", customer: "Thompson Windows & Doors", company: "Thompson Windows & Doors", type: "Trade", items: "Window extrusions 6.5 m", qty: 48, colour: "Surfmist", finish: "Satin", brand: "Dulux", stage: "Collected", due: "Tue 18 Nov", value: 2210, space: 55 },
  { id: "HSR-0211", customer: "Greenline Landscapes", company: "Greenline Landscapes", type: "Landscaping", items: "Planter boxes and screens", qty: 9, colour: "Pale Eucalypt", finish: "Satin", brand: "Interpon", stage: "Ready", due: "Wed 19 Nov", value: 860, space: 25 },
  { id: "HSR-0210", customer: "Sam Wright", type: "Custom", items: "Spiral stair stringers and treads", qty: 14, colour: "Night Sky", finish: "Satin", brand: "Interpon", stage: "Pre-treatment", due: "Thu 27 Nov", value: 1150, space: 35 },
];

export type Line = { item: string; qty: number; unit: string; rate: number };
export type Quote = { id: string; customer: string; company?: string; enquiry?: string; date: string; status: "Draft" | "Sent" | "Accepted" | "Declined"; lines: Line[]; colour: string; finish: string; validDays: number; job?: string };

export const PRICE_LIST: { item: string; unit: string; rate: number }[] = [
  { item: "Aluminium extrusion, per lineal metre", unit: "m", rate: 6.5 },
  { item: "Steel section, per lineal metre", unit: "m", rate: 7.5 },
  { item: "Alloy wheel up to 18 in (incl. strip)", unit: "each", rate: 165 },
  { item: "Alloy wheel 19–22 in (incl. strip)", unit: "each", rate: 195 },
  { item: "Fence panel up to 2.4 × 1.8 m", unit: "each", rate: 58 },
  { item: "Sliding or swing gate up to 4.5 m", unit: "each", rate: 260 },
  { item: "Balustrade panel up to 1.2 m", unit: "each", rate: 85 },
  { item: "Ute tray, complete", unit: "each", rate: 950 },
  { item: "Ute canopy, complete", unit: "each", rate: 1150 },
  { item: "Flat sheet or panel, per m²", unit: "m²", rate: 38 },
  { item: "Chemical strip of old coating", unit: "hr", rate: 85 },
  { item: "Masking and plugging", unit: "hr", rate: 75 },
  { item: "Pick-up and delivery (metro)", unit: "trip", rate: 90 },
];

export const SEED_QUOTES: Quote[] = [
  {
    id: "Q-0312", customer: "Sarah Nguyen", company: "Greenline Landscapes", enquiry: "E-1046", date: "Wed 18 Nov", status: "Sent", colour: "Night Sky", finish: "Satin", validDays: 30,
    lines: [
      { item: "Fence panel up to 2.4 × 1.8 m", qty: 14, unit: "each", rate: 58 },
      { item: "Sliding or swing gate up to 4.5 m", qty: 1, unit: "each", rate: 260 },
      { item: "Pick-up and delivery (metro)", qty: 2, unit: "trip", rate: 90 },
    ],
  },
  {
    id: "Q-0311", customer: "Coastline Pergolas", company: "Coastline Pergolas", date: "Mon 17 Nov", status: "Accepted", colour: "Monument", finish: "Satin", validDays: 30, job: "HSR-0220",
    lines: [{ item: "Steel section, per lineal metre", qty: 320, unit: "m", rate: 7.5 }, { item: "Masking and plugging", qty: 3, unit: "hr", rate: 75 }],
  },
  {
    id: "Q-0310", customer: "Hills Gates Co.", company: "Hills Gates Co.", date: "Fri 14 Nov", status: "Accepted", colour: "Monument", finish: "Matt", validDays: 30, job: "HSR-0214",
    lines: [{ item: "Sliding or swing gate up to 4.5 m", qty: 3, unit: "each", rate: 260 }, { item: "Chemical strip of old coating", qty: 2, unit: "hr", rate: 85 }],
  },
  {
    id: "Q-0309", customer: "Tom Reid", company: "Reid Steel Fabrications", enquiry: "E-1043", date: "Thu 13 Nov", status: "Accepted", colour: "Surfmist", finish: "Satin", validDays: 30, job: "HSR-0221",
    lines: [{ item: "Balustrade panel up to 1.2 m", qty: 22, unit: "each", rate: 85 }, { item: "Masking and plugging", qty: 1.5, unit: "hr", rate: 75 }],
  },
  {
    id: "Q-0308", customer: "Ryan Mitchell", date: "Wed 12 Nov", status: "Declined", colour: "Jet Black", finish: "Gloss", validDays: 30,
    lines: [{ item: "Alloy wheel 19–22 in (incl. strip)", qty: 4, unit: "each", rate: 195 }],
  },
];

export type Invoice = { id: string; customer: string; job: string; date: string; due: string; amount: number; status: "Paid" | "Awaiting payment" | "Overdue" | "Draft"; xero: "Synced" | "Pending" };
export const SEED_INVOICES: Invoice[] = [
  { id: "INV-0188", customer: "Thompson Windows & Doors", job: "HSR-0212", date: "Tue 18 Nov", due: "Tue 2 Dec", amount: 2431, status: "Awaiting payment", xero: "Synced" },
  { id: "INV-0187", customer: "Greenline Landscapes", job: "HSR-0209", date: "Fri 14 Nov", due: "Fri 28 Nov", amount: 1188, status: "Awaiting payment", xero: "Synced" },
  { id: "INV-0186", customer: "Daniel Lee", job: "HSR-0208", date: "Thu 13 Nov", due: "Thu 13 Nov", amount: 726, status: "Paid", xero: "Synced" },
  { id: "INV-0185", customer: "Metro Shopfit", job: "HSR-0205", date: "Mon 3 Nov", due: "Mon 17 Nov", amount: 1617, status: "Overdue", xero: "Synced" },
  { id: "INV-0184", customer: "Coastline Pergolas", job: "HSR-0203", date: "Fri 31 Oct", due: "Fri 14 Nov", amount: 2904, status: "Paid", xero: "Synced" },
  { id: "INV-0183", customer: "Ben Fraser", job: "HSR-0201", date: "Wed 29 Oct", due: "Wed 29 Oct", amount: 462, status: "Paid", xero: "Synced" },
];

export type Customer = { name: string; company?: string; type: Enquiry["type"]; phone: string; email: string; suburb: string; trade: boolean; terms: string; jobs: number; spend: number; last: string };
export const SEED_CUSTOMERS: Customer[] = [
  { name: "Mark Thompson", company: "Thompson Windows & Doors", type: "Trade", phone: "0412 XXX 318", email: "mark@thompsonwd.com.au", suburb: "Dandenong South", trade: true, terms: "14 days", jobs: 4, spend: 8640, last: "Tue 18 Nov" },
  { name: "Tom Reid", company: "Reid Steel Fabrications", type: "Trade", phone: "0418 XXX 626", email: "tom@reidsteel.com.au", suburb: "Keysborough", trade: true, terms: "14 days", jobs: 1, spend: 0, last: "In progress" },
  { name: "Sarah Nguyen", company: "Greenline Landscapes", type: "Landscaping", phone: "0401 XXX 557", email: "sarah@greenlinelandscapes.com.au", suburb: "Berwick", trade: true, terms: "14 days", jobs: 3, spend: 2930, last: "Wed 19 Nov" },
  { name: "Coastline Pergolas", company: "Coastline Pergolas", type: "Trade", phone: "03 9XXX 4410", email: "orders@coastlinepergolas.com.au", suburb: "Mordialloc", trade: true, terms: "30 days", jobs: 5, spend: 11280, last: "In progress" },
  { name: "Metro Shopfit", company: "Metro Shopfit", type: "Trade", phone: "03 9XXX 2271", email: "accounts@metroshopfit.com.au", suburb: "Clayton", trade: true, terms: "14 days", jobs: 3, spend: 4150, last: "In progress" },
  { name: "Bayside Fencing", company: "Bayside Fencing", type: "Landscaping", phone: "0409 XXX 380", email: "jobs@baysidefencing.com.au", suburb: "Cheltenham", trade: true, terms: "14 days", jobs: 2, spend: 1520, last: "Ready" },
  { name: "Hills Gates Co.", company: "Hills Gates Co.", type: "Landscaping", phone: "0438 XXX 912", email: "hello@hillsgates.com.au", suburb: "Belgrave", trade: true, terms: "COD", jobs: 1, spend: 0, last: "In progress" },
  { name: "Josh Patel", type: "Automotive", phone: "0421 XXX 655", email: "joshp@gmail.com", suburb: "Springvale", trade: false, terms: "Pay on collection", jobs: 1, spend: 0, last: "In progress" },
  { name: "Ben Fraser", type: "Automotive", phone: "0414 XXX 027", email: "benfraser@outlook.com", suburb: "Officer", trade: false, terms: "Pay on collection", jobs: 2, spend: 462, last: "In progress" },
  { name: "Priya Sharma", type: "Custom", phone: "0450 XXX 771", email: "priya.s@gmail.com", suburb: "Cranbourne", trade: false, terms: "Pay on collection", jobs: 1, spend: 0, last: "In progress" },
];

export type Load = { id: string; colour: string; finish: string; cure: string; jobs: string[]; status: "Planned" | "In oven" | "Done"; start?: string };
export const SEED_LOADS: Load[] = [
  { id: "L-031", colour: "Jet Black", finish: "Texture", cure: "200 °C · 10 min", jobs: ["HSR-0217"], status: "In oven", start: "1:40 pm" },
  { id: "L-030", colour: "Night Sky", finish: "Satin", cure: "180 °C · 15 min", jobs: ["HSR-0218"], status: "Done", start: "9:10 am" },
  { id: "L-029", colour: "Pale Eucalypt", finish: "Satin", cure: "180 °C · 15 min", jobs: ["HSR-0211"], status: "Done", start: "Wed 3:00 pm" },
];

export const GALLERY = [
  { src: IMG.trade, cat: "Trade", title: "Window extrusions, Surfmist satin" },
  { src: IMG.wheels, cat: "Automotive", title: "Alloy wheels in four finishes" },
  { src: IMG.gate, cat: "Landscaping", title: "Slat fence and gate, Night Sky" },
  { src: IMG.ute, cat: "Automotive", title: "Ute tray and canopy, textured black" },
  { src: IMG.oven, cat: "Trade", title: "Pergola beams out of the 7 m oven" },
  { src: IMG.swatches, cat: "Custom", title: "Colour sample panels" },
  { src: IMG.hero, cat: "Trade", title: "Long extrusions in the spray booth" },
];

export const FAQS = [
  { q: "How big can you coat?", a: "Our oven takes parts up to 7 m long, 3 m wide and 3 m high, so full-length extrusions, beams, gates and fence panels go through in one pass." },
  { q: "How long does it take?", a: "It depends on the job and colour. We confirm a turnaround on your quote, and text you when your job is ready to collect." },
  { q: "Can you strip old paint or powder coat?", a: "Yes. Previously coated or rusty items need stripping and preparation first; we'll include it in the quote after seeing photos." },
  { q: "Which colours do you offer?", a: "Hundreds of colours from Dulux, Interpon and Oxytech, including Colorbond-matched colours, in gloss, satin, matt, textured and metallic finishes." },
  { q: "Why don't you list prices?", a: "Every job is different: size, quantity, condition and colour all change the price. Send photos and rough sizes and we'll come back with a clear quote." },
  { q: "Do you offer trade accounts?", a: "Yes. Fabricators, builders, window makers and landscapers can apply for a trade account with account terms and priority scheduling." },
];
