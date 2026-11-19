export type Step = { route?: string; target?: string; click?: string; title: string; body: string };
export type Tour = { title: string; steps: Step[]; end?: string; endLabel?: string };
export type TourId = "site" | "cms" | "ws" | "brand";

export const TOURS: Record<TourId, Tour> = {
  site: {
    title: "Website",
    end: "/cms/enquiries",
    endLabel: "See it in the CMS",
    steps: [
      { route: "/site", target: "hero", title: "A first impression that looks established", body: "Bold, industrial and fast on mobile. The headline says who you coat, and the two buttons that matter (quote and call) are always one tap away." },
      { route: "/site", target: "stats", title: "Proof without pretending", body: "A new business has no reviews yet, so we lead with real capability: the 7 m × 3 m × 3 m oven, the powder brands you use and a clear promise on quote replies." },
      { route: "/site", target: "audiences", title: "A path for each customer", body: "Trade, automotive, and landscaping and custom jobs each get their own page with the words those customers search for. This is what brings in Google traffic." },
      { route: "/site", target: "oven", title: "Your biggest selling point, front and centre", body: "Full-length extrusions, beams and gates in one pass. Most competitors can't say this, so the site makes a feature of it." },
      { route: "/site", target: "process", title: "How it works, in four steps", body: "Customers know exactly what happens: send photos, get a quote, drop off, collect when you text them. Fewer phone calls asking the same questions." },
      { route: "/site/colours", target: "colour-grid", title: "An interactive colour selector", body: "Competitors link to a PDF. Here customers search and filter colours by finish, then pick one straight into their quote request. You control which colours show from the CMS." },
      { route: "/site/quote", target: "quote-form", title: "The quote form does the selling", body: "Since prices vary by job, the form collects what you need to price it: item type, quantities, rough sizes, condition, photos, colour, finish and deadline. Try submitting one." },
      { route: "/site/quote", target: "quote-side", title: "Built for trust", body: "Customers see what happens next and how quickly you reply. Every request lands in your CMS inbox and on your phone as an alert." },
    ],
  },
  cms: {
    title: "CMS",
    end: "/ws",
    endLabel: "Next: Workshop System",
    steps: [
      { route: "/cms/dashboard", target: "cms-kpis", title: "Your website at a glance", body: "New enquiries, how many turned into quotes and jobs, and where customers found you. You log in from your phone or laptop." },
      { route: "/cms/dashboard", target: "cms-latest", title: "Latest enquiries first", body: "Every quote request from the website shows here the moment it arrives, with an email and SMS alert to you." },
      { route: "/cms/enquiries", target: "enq-table", title: "The enquiries inbox", body: "Search and filter by status: New, Contacted, Quoted, Won or Lost. Nothing gets lost in a text thread or a notebook." },
      { route: "/cms/enquiries", click: "enq-row-first", target: "drawer", title: "Everything needed to price the job", body: "Items, quantities, sizes, condition, photos, colour, finish, deadline and whether they'll drop off. Call, SMS or email the customer in one tap." },
      { route: "/cms/enquiries", target: "enq-status", title: "Track every lead", body: "Move the status along and add notes, so you always know who to follow up and why a job was won or lost." },
      { route: "/cms/enquiries", target: "enq-quote", title: "One click to a quote", body: "With the Workshop System module, the enquiry becomes a priced quote with GST, ready to send. Without it, you reply by email from here." },
      { route: "/cms/content", target: "content-tabs", title: "Update the website yourself", body: "Gallery photos, services text, colours, FAQs, business details and a notice banner. No developer needed for day-to-day changes." },
      { route: "/cms/content", click: "tab-banner", target: "banner-editor", title: "Example: a holiday closure notice", body: "Switch the banner on, type the message, and it appears across the website straight away. Try it, then open the website to see it." },
    ],
  },
  ws: {
    title: "Workshop System",
    end: "/brand",
    endLabel: "Next: Logo concepts",
    steps: [
      { route: "/ws", target: "today-kpis", title: "Your workshop, today", body: "Jobs due, jobs ready to collect, what's in the oven and money owed, on one screen when you open it in the morning." },
      { route: "/ws", target: "today-due", title: "Nothing slips", body: "Jobs due in the next two days and jobs waiting for collection, with one tap to text the customer." },
      { route: "/ws/jobs", target: "jobs-board", title: "Every job, every stage", body: "Received → pre-treatment → coating → curing → quality check → ready → collected. Each card shows the colour, quantity and due date." },
      { route: "/ws/jobs", click: "job-card-first", target: "drawer", title: "The job card", body: "Customer, items, colour, finish, powder brand, the quote it came from, a quality checklist and a printable job tag with a QR code for the shop floor." },
      { route: "/ws/batching", target: "batch-groups", title: "Colour batching: built for powder coating", body: "Jobs waiting to coat are grouped by colour and finish, so you fill each oven load with one colour and avoid wasteful colour changes." },
      { route: "/ws/batching", target: "batch-loads", title: "Plan oven loads", body: "See how full each load is, its cure profile, and send it to the oven. Jobs move to the next stage automatically." },
      { route: "/ws/quotes/Q-0312", target: "quote-builder", title: "Quotes in minutes", body: "Pick items from your price list, adjust quantities and rates, add GST, and send a branded PDF by email or SMS. Accepted quotes become jobs." },
      { route: "/ws/invoices", target: "xero-banner", title: "Invoices flow into Xero", body: "Create the invoice when the job is ready. It's sent to the customer and synced to Xero for your accountant: no double entry." },
      { route: "/ws/floor", target: "floor-grid", title: "Shop-floor mode", body: "A simple tablet view for the workshop: scan the job tag, tap to move the job to the next stage. Customers get an automatic SMS when it's ready." },
      { route: "/ws/reports", target: "reports", title: "Know your numbers", body: "Revenue by week, jobs by customer type and the colours you use most, to plan powder stock and spot your best customers." },
    ],
  },
  brand: {
    title: "Logo concepts",
    end: "/",
    endLabel: "Back to overview",
    steps: [
      { route: "/brand", target: "logo-1", title: "Direction 1: Spray Fan", body: "Built from the cone of powder leaving a spray gun. Graphite and flame orange: confident, modern, easy to read on a van or a shirt." },
      { route: "/brand", target: "logo-2", title: "Direction 2: Coat Layers", body: "An H made of stacked, offset layers, the way coats build up. Navy and teal: clean and technical, suited to trade and architectural customers." },
      { route: "/brand", target: "logo-3", title: "Direction 3: Hex Nut", body: "A hex nut badge that works for coating today and fabrication later. Black and safety yellow: tough and workshop-ready." },
      { route: "/brand", target: "logo-apps", title: "Seen in real use", body: "Each direction on a business card, an app icon and a workshop sign, so you can judge it where it will actually live." },
      { route: "/brand", target: "logo-next", title: "These are starting points", body: "The logo package refines your favourite: 3 directions, 2 rounds of changes, and final files for print, web and signage." },
    ],
  },
};
